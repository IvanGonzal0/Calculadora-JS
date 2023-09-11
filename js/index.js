let currentInput = "";

// Funcin para agregar un valor a la pantalla de visualizacion.
function appendToDisplay(value) {
    const lastChar = currentInput.slice(-1);

    // Verifico si el ultimo caracter es un operador y el valor actual
    if ((value === '+' || value === '-' || value === '*' || value === '/') && (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/')) {
        // No agregar otro operador consecutivo.
        return;
    }

    currentInput += value;
    document.getElementById('display').value = currentInput;
}

// Funcion para borrar la pantlla de visualizacion y restablecer la entrada
function clearDisplay() {
    currentInput = "";
    document.getElementById('display').value = "";
}

// Funcion para calcular el resultado de la expresion ingresada
function calculateResult() {
    const lastChar = currentInput.slice(-1);
    
    // Verifico si el ultimo caracter es un numero antes de calcular
    if (isNumber(lastChar)) {
        let result = 0;
        let operators = [];
        let numbers = [];

        // Obtengo los operadores y numeros de entrada
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

// Funcion para vereficar si un caracter es un numer
function isNumber(char) {
    return !isNaN(parseFloat(char)) && isFinite(char);
}

// Funcion para borrar el ultimo caracter de la entrada actual
function backspace() {
    currentInput = currentInput.slice(0, -1);
    document.getElementById('display').value = currentInput;
}

// Funcion para elevar al cuadrado el valor de la entrada actual
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
