let currentInput = "";

function appendToDisplay(value) {
    const lastChar = currentInput.slice(-1);

    // Verificar si el ultimo carcter es un operador y el valor actual es un operador
    if ((value === '+' || value === '-' || value === '*' || value === '/') && (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/')) {
        // No agregar otro operador consecutivo
        return;
    }

    currentInput += value;
    document.getElementById('display').value = currentInput;
}

function clearDisplay() {
    currentInput = "";
    document.getElementById('display').value = "";
}

function calculateResult() {
    const lastChar = currentInput.slice(-1);
    
    // Verificar si el último caracter es un nmero antes de calcular
    if (isNumber(lastChar)) {
        let result = 0;
        let operators = [];
        let numbers = [];

        // Obtener los operadores y numeros de la entrada
        currentInput.split(/([+\-*/])/).forEach((item) => {
            if (item === '+' || item === '-' || item === '*' || item === '/') {
                operators.push(item);
            } else {
                numbers.push(parseFloat(item));
            }
        });

        
        while (operators.includes('*') || operators.includes('/')) {
            for (let i = 0; i < operators.length; i++) {
                if (operators[i] === '*' || operators[i] === '/') {
                    if (operators[i] === '*') {
                        numbers[i] *= numbers[i + 1];
                    } else {
                        if (numbers[i + 1] !== 0) {
                            numbers[i] /= numbers[i + 1];
                        } else {
                            document.getElementById('display').value = "Error";
                            return;
                        }
                    }
                    numbers.splice(i + 1, 1);
                    operators.splice(i, 1);
                    i--;
                }
            }
        }

        
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] === '+') {
                numbers[i] += numbers[i + 1];
            } else {
                numbers[i] -= numbers[i + 1];
            }
        }

        result = numbers[0];
        document.getElementById('display').value = result;
        currentInput = result.toString();
    }
}

function isNumber(char) {
    
    return !isNaN(parseFloat(char)) && isFinite(char);
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    document.getElementById('display').value = currentInput;
}

function power() {
    try {
        const value = eval(currentInput);
        const result = Math.pow(value, 2); 
        document.getElementById('display').value = result;
        currentInput = result.toString();
    } catch (error) {
        document.getElementById('display').value = "Error";
        currentInput = "";
    }
}