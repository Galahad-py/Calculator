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
    if (num2 === 0) {
        return "Cannot divide by Zero";
    }
    return num1 / num2;
}


function operate (num1, num2, operator) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    } else {
        return "Invalid operator";
    } 
}

// variables to store value
let displayValue = '';
let firstNumber = null;
let secondNumber = null;
let operator = null;

// elements
const displayArea = document.getElementById('display-area');

// button click event handling 
document.querySelectorAll('.button-area button').forEach(button => {
    button.addEventListener('click', function () {
        const buttonText = this.innerText;
        

        // handle numbers
        if (!isNaN(buttonText)) {
            displayValue += buttonText;
            displayArea.textContent = displayValue;
            
        } 

        // handle operators 
        else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
            firstNumber = parseFloat(displayValue);
            operator = buttonText;
            displayValue = '';
            
        }

        // handle equals
        else if (buttonText === '=') {
            secondNumber = parseFloat(displayValue);
            const result = operate(firstNumber, secondNumber, operator);
            displayArea.textContent = result;
            displayValue = '' //reset displayValue
            
        }

        // handle clear
        else if (buttonText === "clear") {
            displayValue = '';
            firstNumber = null;
            secondNumber = null;
            operator = null;
            displayArea.textContent = "0";
            
        }
    })
});

