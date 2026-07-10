import { Address, toNano } from '@ton/core';
import { VilitigoCounter } from '../build/VilitigoCounter/VilitigoCounter_VilitigoCounter';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('VilitigoCounter address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const vilitigoCounter = provider.open(VilitigoCounter.fromAddress(address));

    const counterBefore = await vilitigoCounter.getCounter();

    await vilitigoCounter.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Add',
            amount: 1n,
        }
    );

    ui.write('Waiting for counter to increase...');

    let counterAfter = await vilitigoCounter.getCounter();
    let attempt = 1;
    while (counterAfter === counterBefore) {
        ui.setActionPrompt(`Attempt ${attempt}`);
        await sleep(2000);
        counterAfter = await vilitigoCounter.getCounter();
        attempt++;
    }

    ui.clearActionPrompt();
    ui.write('Counter increased successfully!');
}
