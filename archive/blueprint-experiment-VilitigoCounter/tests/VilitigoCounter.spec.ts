import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { VilitigoCounter } from '../build/VilitigoCounter/VilitigoCounter_VilitigoCounter';
import '@ton/test-utils';

describe('VilitigoCounter', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let vilitigoCounter: SandboxContract<VilitigoCounter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        vilitigoCounter = blockchain.openContract(await VilitigoCounter.fromInit(0n, 0n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await vilitigoCounter.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: vilitigoCounter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and vilitigoCounter are ready to use
    });

    it('should increase counter', async () => {
        const increaseTimes = 3;
        for (let i = 0; i < increaseTimes; i++) {
            console.log(`increase ${i + 1}/${increaseTimes}`);

            const increaser = await blockchain.treasury('increaser' + i);

            const counterBefore = await vilitigoCounter.getCounter();

            console.log('counter before increasing', counterBefore);

            const increaseBy = BigInt(Math.floor(Math.random() * 100));

            console.log('increasing by', increaseBy);

            const increaseResult = await vilitigoCounter.send(
                increaser.getSender(),
                {
                    value: toNano('0.05'),
                },
                {
                    $$type: 'Add',
                    amount: increaseBy,
                }
            );

            expect(increaseResult.transactions).toHaveTransaction({
                from: increaser.address,
                to: vilitigoCounter.address,
                success: true,
            });

            const counterAfter = await vilitigoCounter.getCounter();

            console.log('counter after increasing', counterAfter);

            expect(counterAfter).toBe(counterBefore + increaseBy);
        }
    });
});
