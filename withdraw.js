const { TonClient, WalletContractV4, toNano, Address } = require("@ton/ton");
const { mnemonicToPrivateKey } = require("@ton/crypto");
const mod = require("./contract/build/VilitigoCounter_VilitigoCounter.ts");

const ADDRESS = "EQCt4zv8F2-s0eMAy-SD0Nk5CoH1V9ilzx0K8QqT0xAzyWrd";

async function main() {
    if (!process.env.MNEMONIC) throw new Error("MNEMONIC not set");
    if (!process.env.TONCENTER_API_KEY) throw new Error("TONCENTER_API_KEY not set");
    const client = new TonClient({ endpoint: "https://toncenter.com/api/v2/jsonRPC", apiKey: process.env.TONCENTER_API_KEY });
    const keyPair = await mnemonicToPrivateKey(process.env.MNEMONIC.trim().split(" "));
    const wallet = WalletContractV4.create({ publicKey: keyPair.publicKey, workchain: 0 });
    const walletContract = client.open(wallet);
    console.log("Wallet:", wallet.address.toString());
    const addr = Address.parse(ADDRESS);
    console.log("Contract balance:", Number(await client.getBalance(addr)) / 1e9, "GRAM");
    const contract = client.open(mod.VilitigoCounter.fromAddress(addr));
    await contract.send(
        walletContract.sender(keyPair.secretKey),
        { value: toNano("0.05") },
        { $$type: "AdminWithdraw", queryId: 0n, amount: toNano("0.5") }
    );
    console.log("AdminWithdraw отправлен: 0.5 на кошелёк владельца. Tonkeeper через ~30 сек.");
}
main().catch(e => { console.error("FAILED:", e.message); process.exit(1); });
