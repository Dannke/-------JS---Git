import '../styles/style.css';
import '../styles/background.css'

document.getElementById('deposit-type').addEventListener('change', function() {
    const depositType = this.value;
    const depositTerm = document.getElementById('deposit-term');

    depositTerm.innerHTML = '<option value="" disabled selected>Выберите срок вклада</option>';

    if (depositType === 'replenishable') {
        depositTerm.innerHTML += '<option value="6m">6 месяцев - 20%</option>';
        depositTerm.innerHTML += '<option value="1y">1 год - 22%</option>';
        depositTerm.innerHTML += '<option value="1.5y">1,5 года - 15%</option>';
        depositTerm.innerHTML += '<option value="2y">2 года - 10%</option>';
    } else if (depositType === 'term') {
        depositTerm.innerHTML += '<option value="3m">3 месяца - 20%</option>';
        depositTerm.innerHTML += '<option value="6m">6 месяцев - 22%</option>';
        depositTerm.innerHTML += '<option value="9m">9 месяцев - 23%</option>';
        depositTerm.innerHTML += '<option value="1y">1 год - 24%</option>';
        depositTerm.innerHTML += '<option value="1.5y">1,5 года - 18%</option>';
        depositTerm.innerHTML += '<option value="2y">2 года - 15%</option>';
    }
});

document.getElementById('calculate-btn').addEventListener('click', function() {
    const depositType = document.getElementById('deposit-type').value;
    const depositTerm = document.getElementById('deposit-term').value;
    const depositAmount = parseFloat(document.getElementById('deposit-amount').value);

    if (!depositType) {
        alert("Пожалуйста, выберите вид вклада.");
        return;
    }

    if (!depositTerm) {
        alert("Пожалуйста, выберите срок вклада.");
        return;
    }

    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Пожалуйста, введите корректную сумму вклада.");
        return;
    }

    calculateDeposit(depositType, depositTerm, depositAmount);
});

function calculateDeposit(depositType, depositTerm, depositAmount) {
    let interestRate;

    // Определяем процентную ставку в зависимости от вида вклада и срока
    if (depositType === 'replenishable') {
        switch(depositTerm) {
            case '6m':
                interestRate = 0.20;
                break;
            case '1y':
                interestRate = 0.22;
                break;
            case '1.5y':
                interestRate = 0.15;
                break;
            case '2y':
                interestRate = 0.10;
                break;
        }
    } else if (depositType === 'term') {
        switch(depositTerm) {
            case '3m':
                interestRate = 0.20;
                break;
            case '6m':
                interestRate = 0.22;
                break;
            case '9m':
                interestRate = 0.23;
                break;
            case '1y':
                interestRate = 0.24;
                break;
            case '1.5y':
                interestRate = 0.18;
                break;
            case '2y':
                interestRate = 0.15;
                break;
        }
    }

    // Определяем количество лет на основе срока
    let termInYears;
    let termDisplay;
    switch(depositTerm) {
        case '3m':
            termInYears = 3 / 12;
            termDisplay = '3 месяца';
            break;
        case '6m':
            termInYears = 6 / 12;
            termDisplay = '6 месяцев';
            break;
        case '9m':
            termInYears = 9 / 12;
            termDisplay = '9 месяцев';
            break;
        case '1y':
            termInYears = 1;
            termDisplay = '1 год';
            break;
        case '1.5y':
            termInYears = 1.5;
            termDisplay = '1,5 года';
            break;
        case '2y':
            termInYears = 2;
            termDisplay = '2 года';
            break;
    }

    const finalAmount = depositAmount * Math.pow((1 + interestRate), termInYears);

    document.getElementById('result').innerText = 
        `Вы выбрали ${depositType === 'replenishable' ? 'пополняемый' : 'срочный'} вклад на срок ${termDisplay}.\n` +
        `Сумма вклада: ${depositAmount} руб.\n` +
        `Итоговая сумма с процентами: ${finalAmount.toFixed(2)} руб.`;
}