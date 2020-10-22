//Objekt skapas med variabler som används för att visa på displayen och lagra uttryck.
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

//Funktion för att visa den siffra som klickats på. Detta på displayen.
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

//Som inputDigit, decimal(en punkt) visas på skärmen.
function inputDecimal(dot) {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

//Hanterat när 'operator' knapp trycks i olika kombination. T.ex. lägg till siffra/siffror och subtraktionstecken.
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }
  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

//Meddelar vad som händer när en 'operator' knapp används. T.ex. används '+' regristreras ett plus(+).
function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

//Återställer vid tryck på clearknappen(btn-clear).
function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

//updateDisplay snappar up skärmen(.screen) och sätter värdet till noll(enligt calculator objektet).
function updateDisplay() {
  const display = document.querySelector(".screen");
  display.value = calculator.displayValue;
}
updateDisplay();

//Kod används för att snappa upp(med querySelector) knapparna och deras olika typ.
const keys = document.querySelector(".buttons");
keys.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("btn-yellow")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("btn-decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("btn-clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }
  inputDigit(target.value);
  updateDisplay();
});
