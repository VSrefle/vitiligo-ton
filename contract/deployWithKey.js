const { TonClient, WalletContractV4, toNano } = require("@ton/ton");
const { mnemonicToPrivateKey } = require("@ton/crypto");
const mod = require("./build/VilitigoCounter_VilitigoCounter.ts");

async function deploy() {
    const mnemonic = process.env.MNEMONIC.trim();
    const client = new TonClient({
        endpoint: "https://toncenter.com/api/v2/jsonRPC",
        headers: { "X-API-Key": "40ffb5a044a25ae30d199ea21ede5caf8e09c952c1ca7bbfa5b52a3cc1991f6a" }
    });
    const keyPair = await mnemonicToPrivateKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: keyPair.publicKey, workchain: 0 });
    const walletContract = client.open(wallet);
    const balance = await walletContract.getBalance();
    console.log("Balance:", Number(balance)/1e9, "TON");

    const contract = await mod.VilitigoCounter.fromInit(wallet.address);
    console.log("Address:", contract.address.toString());
    const openedContract = client.open(contract);
    await openedContract.send(
        walletContract.sender(keyPair.secretKey),
        { value: toNano("0.15") },
        { $$type: "Deploy", queryId: 0n }
    );
    console.log("✅ DEPLOYED FOR REAL!");
    console.log("https://tonviewer.com/" + contract.address.toString());
}
deploy().catch(e => console.error("ERROR:", e.message));
