import { toNano } from '@ton/core';
import { VilitigoCounter } from '../wrappers/VilitigoCounter';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const vilitigoCounter = provider.open(
        VilitigoCounter.createFromConfig(
            { owner: provider.sender().address! },
            await compile('VilitigoCounter')
        )
    );
    await vilitigoCounter.sendDeploy(provider.sender(), toNano('0.15'));
    await provider.waitForDeploy(vilitigoCounter.address);
    console.log('Deployed to:', vilitigoCounter.address.toString());
}
