let INPUT1 = "0";
let INPUT2 = "";
let CURRENT_INPUT = 1; // default to input 1
let OPERATOR = undefined;
let SWITCH = true;
const DISPLAY_TEXT = document.querySelector("#displayText");

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  if (operator === "add") {
    return add(+num1, +num2);
  } else if (operator === "subtract") {
    return subtract(+num1, +num2);
  } else if (operator === "multiply") {
    return multiply(+num1, +num2);
  } else if (operator === "divide") {
    return divide(+num1, +num2);
  }
}

function setButtons() {
  /* Whenever a number is pressed change the display text 
  and update the INPUT1 variable */
  const btn_0 = document.querySelector("#zero");
  // For zero, only update if another number has already been input
  btn_0.addEventListener("click", () => {
    if (CURRENT_INPUT === 1) {
      if (INPUT1 !== "0") {
        updateInput(CURRENT_INPUT, "0");
      }
    }
    // Only allow one zero to be input if the initial input is zero
    if (CURRENT_INPUT === 2) {
      if (INPUT2 !== "0") {
        updateInput(CURRENT_INPUT, "0");
      }
    }
  });
  const btn_1 = document.querySelector("#one");
  btn_1.addEventListener("click", () => updateInput(CURRENT_INPUT, "1"));
  const btn_2 = document.querySelector("#two");
  btn_2.addEventListener("click", () => updateInput(CURRENT_INPUT, "2"));
  const btn_3 = document.querySelector("#three");
  btn_3.addEventListener("click", () => updateInput(CURRENT_INPUT, "3"));
  const btn_4 = document.querySelector("#four");
  btn_4.addEventListener("click", () => updateInput(CURRENT_INPUT, "4"));
  const btn_5 = document.querySelector("#five");
  btn_5.addEventListener("click", () => updateInput(CURRENT_INPUT, "5"));
  const btn_6 = document.querySelector("#six");
  btn_6.addEventListener("click", () => updateInput(CURRENT_INPUT, "6"));
  const btn_7 = document.querySelector("#seven");
  btn_7.addEventListener("click", () => updateInput(CURRENT_INPUT, "7"));
  const btn_8 = document.querySelector("#eight");
  btn_8.addEventListener("click", () => updateInput(CURRENT_INPUT, "8"));
  const btn_9 = document.querySelector("#nine");
  btn_9.addEventListener("click", () => updateInput(CURRENT_INPUT, "9"));

  /* When an operator is pressed store number in INPUT2 */
  const add_btn = document.querySelector("#add");
  add_btn.addEventListener("click", () => updateOperator("add"));
  const subtract_btn = document.querySelector("#subtract");
  subtract_btn.addEventListener("click", () => updateOperator("subtract"));
  const multiply_btn = document.querySelector("#multiply");
  multiply_btn.addEventListener("click", () => updateOperator("multiply"));
  const divide_btn = document.querySelector("#divide");
  divide_btn.addEventListener("click", () => updateOperator("divide"));
}

function updateInput(inputNum, digitStr) {
  if (inputNum === 1) {
    if (INPUT1 === "0") {
      DISPLAY_TEXT.textContent = digitStr;
      INPUT1 = digitStr;
    } else {
      DISPLAY_TEXT.textContent += digitStr;
      INPUT1 += digitStr;
    }
  } else if (inputNum === 2) {
    DISPLAY_TEXT.textContent += digitStr;
    if (INPUT2 === "0") {
      INPUT2 = digitStr;
    } else {
      INPUT2 += digitStr;
    }
  }
}

function updateOperator(desiredOperation) {
  /* If an operator has already been selected, 
  calculate the previous operation first */
  if (OPERATOR !== undefined) {
    calculate();
  }
  if (desiredOperation === "add") {
    OPERATOR = "add";
    DISPLAY_TEXT.textContent += " + ";
  } else if (desiredOperation === "subtract") {
    OPERATOR = "subtract";
    DISPLAY_TEXT.textContent += " - ";
  } else if (desiredOperation === "multiply") {
    OPERATOR = "multiply";
    DISPLAY_TEXT.textContent += " × ";
  } else if (desiredOperation === "divide") {
    OPERATOR = "divide";
    DISPLAY_TEXT.textContent += " ÷ ";
  }

  /* Switch input variable after only first operator is input.
  For cases with more than one operator, INPUT1 stores the result*/
  if (SWITCH === true) {
    if (CURRENT_INPUT === 1) {
      CURRENT_INPUT = 2;
    } else if (CURRENT_INPUT === 2) {
      CURRENT_INPUT = 1;
    }
  }
}

function calculate() {
  // INPUT1 now stores the result.
  INPUT1 = operate(OPERATOR, INPUT1, INPUT2);
  DISPLAY_TEXT.textContent = INPUT1;
  // Reset INPUT2, OPERATOR and change SWITCH variables
  INPUT2 = "0";
  OPERATOR = undefined;
  SWITCH = false;
}

setButtons();
