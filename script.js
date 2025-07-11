const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let inputSequence = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value !== undefined) {
      inputSequence += value;
      display.innerText = inputSequence;
    }
  });
});

document.getElementById("clear").addEventListener("click", () => {
  inputSequence = "";
  display.innerText = "0";
});

document.getElementById("equals").addEventListener("click", () => {
  try {
    // Evaluate the expression in sequence, not by operator precedence
    const tokens = inputSequence.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);

    if (!tokens) {
      display.innerText = "Error";
      return;
    }

    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNum = parseFloat(tokens[i + 1]);

      if (isNaN(nextNum)) {
        display.innerText = "Error";
        return;
      }

      if (operator === "+") result += nextNum;
      else if (operator === "-") result -= nextNum;
      else if (operator === "*") result *= nextNum;
      else if (operator === "/") result /= nextNum;
    }

    display.innerText = result;
    inputSequence = result.toString(); // Allow chaining
  } catch {
    display.innerText = "Error";
    inputSequence = "";
  }
});