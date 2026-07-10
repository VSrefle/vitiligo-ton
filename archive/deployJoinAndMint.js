const { TonClient, WalletContractV4, toNano, internal } = require("@ton/ton");
const { mnemonicToPrivateKey } = require("@ton/crypto");

// ── CONFIG ──
const ENDPOINT = "https://toncenter.com/api/v2/jsonRPC";
const TONCENTER_API_KEY = process.env.TONCENTER_API_KEY;
const MNEMONIC = process.env.MNEMONIC;

async function deploy() {
    if (!MNEMONIC) throw new Error("MNEMONIC env var not set");
    if (!TONCENTER_API_KEY) throw new Error("TONCENTER_API_KEY env var not set");

    const client = new TonClient({
        endpoint: ENDPOINT,
        apiKey: TONCENTER_API_KEY
    });

    const keyPair = await mnemonicToPrivateKey(MNEMONIC.trim().split(" "));
    const wallet = WalletContractV4.create({
        publicKey: keyPair.publicKey,
        workchain: 0
    });
    const walletContract = client.open(wallet);
    const balance = await walletContract.getBalance();

    console.log("Wallet:", wallet.address.toString());
    console.log("Balance:", Number(balance) / 1e9, "TON");

    if (Number(balance) < 0.25e9) {
        throw new Error("Insufficient balance — need at least 0.25 TON");
    }

    // NOTE: the contract in VilitigoCounterFinal.tact is declared as
    // `contract VilitigoCounter with Deployable, Ownable` — Tact names the
    // build output after that contract name, NOT after the .tact filename.
    // Confirmed earlier: `npx blueprint build` produced
    // build/VilitigoCounter_VilitigoCounter.ts / .abi
    // If this require() fails, run `ls build/` first and fix the path below.
    const mod = require("./build/VilitigoCounter_VilitigoCounter.ts");

    const contract = await mod.VilitigoCounter.fromInit(wallet.address);
    console.log("Contract address:", contract.address.toString());

    // Check if already deployed
    const state = await client.getContractState(contract.address);
    if (state.state === "active") {
        console.log("✅ Already deployed and active!");
        console.log("https://tonviewer.com/" + contract.address.toString());
        return;
    }

    const openedContract = client.open(contract);

    // Deploy
    console.log("Deploying...");
    await openedContract.send(
        walletContract.sender(keyPair.secretKey),
        { value: toNano("0.15") },
        { $$type: "Deploy", queryId: 0n }
    );

    console.log("Transaction sent. Waiting 30 seconds for confirmation...");
    await new Promise(r => setTimeout(r, 30000));

    // Verify deployment
    const newState = await client.getContractState(contract.address);
    if (newState.state === "active") {
        console.log("✅ DEPLOYED AND VERIFIED ACTIVE!");
    } else {
        console.log("⚠️  State:", newState.state, "— wait longer and check manually");
    }

    console.log("Address:", contract.address.toString());
    console.log("Tonviewer:", "https://tonviewer.com/" + contract.address.toString());
    console.log("");
    console.log("Next steps:");
    console.log("1. Get the JoinAndMint opcode from the ABI (see the node -e command in chat)");
    console.log("2. Update CONTRACT_ADDRESS and JOIN_AND_MINT_OPCODE in index.html to the values above");
    console.log("3. Update vitiligo.ton DNS to point to this new address");
}

deploy().catch(e => {
    console.error("ERROR:", e.message);
    process.exit(1);
});
