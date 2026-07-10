// scripts/withdraw.ts — тестовый вывод из контракта vitiligo.ton, 09.07.2026
// Использует типизированную обёртку из билда — опкод не угадываем,
// его считает сам компилятор (наше правило: опкоды только из билда).
// РИСК ИЗВЕСТЕН: задеплоена старая версия контракта; если AdminWithdraw
// в ней отличался, сообщение просто отобьётся (потеря ~0.003 на комиссии,
// как в эксперименте с UpdateProfile) — безопасно и само себя докажет.
import { Address, toNano } from '@ton/core';
import { VilitigoCounter } from '../build/VilitigoCounter/tact_VilitigoCounter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const contract = provider.open(
        VilitigoCounter.fromAddress(
            Address.parse('EQCt4zv8F2-s0eMAy-SD0Nk5CoH1V9ilzx0K8QqT0xAzyWrd')
        )
    );

    await contract.send(
        provider.sender(),
        { value: toNano('0.05') }, // газ на доставку сообщения
        {
            $$type: 'AdminWithdraw',
            queryId: 0n,
            amount: toNano('0.5'), // ← тестовая сумма; после успеха меняй здесь
        }
    );

    console.log('AdminWithdraw отправлен: запрошено 0.5 на кошелёк владельца');
}
