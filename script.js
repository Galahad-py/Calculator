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
        return "Nice try";
    }
    return num1 / num2;
}


function operate (num1, num2, operator) {
    let result;
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
        default:
            result = "Invalid operator";
    }

    if (isNaN(result) || result === null) {
        return null;
    }
    return (typeof result === "number") ? parseFloat(result.toFixed(5)) : result
}

// variables to store value
let displayValue = '';
let firstNumber = null;
let secondNumber = null;
let operator = null;
let result = null;
let justCalculated = false;
const MAX_DIGITS = 20;

// elements
const displayArea = document.getElementById('display-area');
const decimalButton = document.querySelector('.buttonDot');

// button click event handling 
document.querySelectorAll('.button-area button').forEach(button => {
    button.addEventListener('click', function () {
        handleButtonClick(this.innerText);

    });
}); 
        

function handleButtonClick(buttonText) {
        // handle numbers
        if (!isNaN(buttonText)) {
            if (justCalculated) {
                displayValue = '';
                justCalculated = false;
            }
    
            if (displayValue.length < MAX_DIGITS) {
                displayValue += buttonText;
                displayArea.textContent = displayValue;
            }
        }
        // handle decimal 
        else if (buttonText === '.' && !displayValue.includes('.')) {
            displayValue += buttonText;
            displayArea.textContent = displayValue;
            decimalButton.disabled  = true;
        }        
        // handle percentage 
        else if (buttonText === '%') {
            if (displayValue !== '') {
                displayValue = (parseFloat(displayValue) / 100).toString();
                displayArea.textContent = displayValue;
            }
        }        
        // handle operators 
        else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
            if (firstNumber !== null && operator !== null) {
                secondNumber = parseFloat(displayValue);
                result = operate(firstNumber, secondNumber, operator);

                // only update display if result is valid(not null)
                if (result !== null) {
                    displayArea.textContent = result;
                    firstNumber = result;
                } 
                } else {
                    firstNumber = parseFloat(displayValue);
                }
            operator = buttonText;
            displayValue = '';
            justCalculated = false;
            decimalButton.disabled  = false;
        }        
        // handle equals
        else if (buttonText === '=') {
            if (firstNumber !== null && operator !== null) {
                secondNumber = parseFloat(displayValue);
                result = operate(firstNumber, secondNumber, operator);

                if (result !== null) {
                    displayArea.textContent = result;
                    firstNumber= result;
                }
                displayValue = ''; //reset displayValue
                justCalculated = true;
                operator = null;
                decimalButton.disabled = false;  
            }
        }        
        // handle clear
        else if (buttonText === "CE") {
            displayValue = '';
            firstNumber = null;
            secondNumber = null;
            operator = null;
            displayArea.textContent = "0";
            decimalButton.disabled  = false;
            justCalculated = false;
        }       
        // handle backspace
        else if (buttonText === "⌫") {
            if (displayValue.length > 0) {
                displayValue = displayValue.slice(0, -1); //removes last character
                displayArea.textContent = displayValue || 0; //"0" if empty show 0
            }
        }
        
}

function enableDecimalButton() {
    if (!displayValue.includes('.')) {
        decimalButton.disabled = false
    }
}

// keyboard support
document.addEventListener('keydown', function (event) {
    let key = event.key;

    if (!isNaN(key)) {
        handleButtonClick(key);
    } else if (key === '.') {
        handleButtonClick('.');
    } else if (key === '%') {
        handleButtonClick('%');
    } else if (key === '+') {
        handleButtonClick('+');
    } else if (key === '-') {
        handleButtonClick('-');
    } else if (key === '*') {
        handleButtonClick('*');
    } else if (key === '/') {
        handleButtonClick('/');
    } else if (key === 'Enter') {
        handleButtonClick('=');
    } else if (key === 'Backspace') {
        handleButtonClick('⌫');
    } else if (key === 'Escape') {
        handleButtonClick('CE');
    } 
});

