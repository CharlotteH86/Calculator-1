const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}

function inputDigit(digit) {
    const {displayValue} = calculator;
    calculator.displayValue= displayValue === '0' ? digit : displayValue + digit;
}

function inputDecimal(dot) {
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}

function updateDisplay (){
    const display = document.querySelector('.screen');
    display.value = calculator.displayValue;
}
updateDisplay();

const keys = document.querySelector('.buttons');
keys.addEventListener('click', (event) => {
const { target } = event;

if (!target.matches('button')){
    return;
}

if(target.classList.contains('btn-yellow')){
    console.log('operator', target.value);
    return;
}

if(target.classList.contains('btn-decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
}

if (target.classList.contains('btn-clear')) {
    console.log('clear', target-value);
    return;
}
inputDigit(target.value);
updateDisplay();
});


