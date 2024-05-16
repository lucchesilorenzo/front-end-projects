// Selecting the display element from the DOM
const display = document.querySelector(".display");

// Variables to store the first number, second number, and the operator
let num1 = "";
let num2 = "";
let operator = "";

// Function to append numbers to the current operand
function appendNumber(num) {
  if (operator === "") {
    // If no operator is selected, append the number to num1
    num1 += num;
    display.value = num1;
  } else {
    // If an operator is selected, append the number to num2
    num2 += num;
    display.value = num2;
  }
}

// Function to append a decimal point to the current operand
function appendDecimal() {
  if (operator === "") {
    // Append decimal to num1 if it does not already contain a decimal
    if (!num1.includes(".")) {
      num1 += ".";
      display.value = num1;
    }
  } else {
    // Append decimal to num2 if it does not already contain a decimal
    if (!num2.includes(".")) {
      num2 += ".";
      display.value = num2;
    }
  }
}

// Function to set the operator for the calculation
function setOperator(op) {
  if (num1 !== "") {
    operator = op; // Set the operator if num1 is not empty
  }
}

// Function to perform the calculation
function calculate() {
  if (num1 !== "" && operator !== "" && num2 !== "") {
    // Parse num1 and num2 to floating-point numbers
    let n1 = parseFloat(num1);
    let n2 = parseFloat(num2);
    let result;

    // Perform the calculation based on the selected operator
    switch (operator) {
      case "+":
        result = n1 + n2;
        break;
      case "-":
        result = n1 - n2;
        break;
      case "*":
        result = n1 * n2;
        break;
      case "/":
        result = n1 / n2;
        break;
    }

    // Display the result and prepare for further calculations
    display.value = result;
    num1 = result.toFixed(2).toString(); // Store the result in num1 for chaining calculations
    num2 = "";
    operator = "";
  }
}

// Function to reset all variables and clear the display
function resetAll() {
  num1 = "";
  num2 = "";
  operator = "";
  display.value = ""; // Clear the display
}
