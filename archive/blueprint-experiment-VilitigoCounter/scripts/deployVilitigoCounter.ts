import { toNano } from '@ton/core';
import { VilitigoCounter } from '../build/VilitigoCounter/VilitigoCounter_VilitigoCounter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const vilitigoCounter = provider.open(await VilitigoCounter.fromInit(BigInt(Math.floor(Math.random() * 10000)), 0n));

    await vilitigoCounter.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        null,
    );

    await provider.waitForDeploy(vilitigoCounter.address);

    console.log('ID', await vilitigoCounter.getId());
}
