let INPUT1 = "0";
let INPUT2 = "";
let CURRENT_INPUT = 1; // default to input 1
let OPERATOR = undefined;
/* Only switch input after the first operator is selected. 
Used with CURRENT_INPUT variable*/
let SWITCH_INPUT = true;
/* Unallow input after clicking equals, allow again after an 
operator is selected */
let ALLOW_DIGIT_INPUT = true;
/* Unallow input after clicking an operator, allow again after an 
a digit is input */
let ALLOW_OPERATOR_INPUT = true;

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
  return num2 === 0 ? "NaN" : num1 / num2;
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

  const add_btn = document.querySelector("#add");
  add_btn.addEventListener("click", () => updateOperator("add"));
  const subtract_btn = document.querySelector("#subtract");
  subtract_btn.addEventListener("click", () => updateOperator("subtract"));
  const multiply_btn = document.querySelector("#multiply");
  multiply_btn.addEventListener("click", () => updateOperator("multiply"));
  const divide_btn = document.querySelector("#divide");
  divide_btn.addEventListener("click", () => updateOperator("divide"));
  const equals_btn = document.querySelector("#equals");
  equals_btn.addEventListener("click", () => calculate());
  const delete_btn = document.querySelector("#delete");
  delete_btn.addEventListener("click", () => deleteDigit());
  const allClear_btn = document.querySelector("#clear");
  allClear_btn.addEventListener("click", () => clear());
  const decimal_btn = document.querySelector("#decimal");
  decimal_btn.addEventListener("click", () => addDecimal());
}

function updateInput(inputNum, digitStr) {
  if (!ALLOW_DIGIT_INPUT) return;
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
  ALLOW_OPERATOR_INPUT = true;
  console.log(INPUT1 + " " + INPUT2);
}

function updateOperator(desiredOperation) {
  /* If an operator has already been selected, 
  calculate the previous operation first */
  if (OPERATOR !== undefined) {
    calculate();
  }
  if (ALLOW_OPERATOR_INPUT === true) {
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
    ALLOW_OPERATOR_INPUT = false;
  }

  ALLOW_DIGIT_INPUT = true;

  /* Switch input variable after only first operator is input.
  For cases with more than one operator, INPUT1 stores the result*/
  if (SWITCH_INPUT === true) {
    if (CURRENT_INPUT === 1) {
      CURRENT_INPUT = 2;
    } else if (CURRENT_INPUT === 2) {
      CURRENT_INPUT = 1;
    }
  }
}

function calculate() {
  // Only run if INPUT2 exists
  if (!INPUT2) return;

  // INPUT1 now stores the result.
  INPUT1 = operate(OPERATOR, INPUT1, INPUT2);
  DISPLAY_TEXT.textContent = INPUT1;
  // Reset INPUT2, OPERATOR and change SWITCH_INPUT, ALLOW_DIGIT_INPUT to false
  INPUT2 = "0";
  OPERATOR = undefined;
  SWITCH_INPUT = false;
  ALLOW_DIGIT_INPUT = false;
}

function deleteDigit() {
  // Remove 1 digit at a time using slice method
  let currentContent = DISPLAY_TEXT.textContent;
  DISPLAY_TEXT.textContent = currentContent.slice(0, -1);
  if (CURRENT_INPUT === 1) {
    INPUT1 = INPUT1.slice(0, -1);
  }
  if (CURRENT_INPUT === 2) {
    INPUT2 = INPUT2.slice(0, -1);
  }
}

function clear() {
  // Reset to initial values
  INPUT1 = "0";
  INPUT2 = "";
  CURRENT_INPUT = 1;
  OPERATOR = undefined;
  SWITCH_INPUT = true;
  ALLOW_DIGIT_INPUT = true;
  DISPLAY_TEXT.textContent = "0";
}

function addDecimal() {
  if (CURRENT_INPUT === 1 && !INPUT1.includes(".")) {
    INPUT1 += ".";
    DISPLAY_TEXT.textContent += ".";
  }
  if (CURRENT_INPUT === 2 && !INPUT2.includes(".")) {
    INPUT2 += ".";
    DISPLAY_TEXT.textContent += ".";
  }
}

window.onload = () => {
  setButtons();
};
