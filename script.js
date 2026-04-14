let currentexpression = "";

function Operator() {
    const add =  (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const divide = (a, b) => {
        if(b == 0) {
            throw new Error("Cannot not dividde by zero!");
        }
        return a / b;
    }

    const multiply = (a, b) => a * b;

    const operators = {
        "+": add,
        "-": subtract,
        "/": divide,
        "*": multiply
    };

    const precedence = {
        "+": 1,
        "-": 1,
        "/": 2,
        "*": 2     
    }

    function applyOperator(a, b, op) {
        return operators[op](a, b);
    }

    function parseExpression(expression) {
        const tokens = [];
        let currentNumber = "";

        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];

            if((char >= "0" && char <= "9" || char === ".")) {
                currentNumber += char;
            } else if (char === "+" || char === "-" || char === "*" || char === "/") {
                if(currentNumber) {
                    tokens.push(parseFloat(currentNumber));
                    currentNumber = "";
                }
                tokens.push(char);
            }
        }

        if(currentNumber) {
            tokens.push(parseFloat(currentNumber))
        }
        return tokens;
    }

    function evaluateExpression (tokens) {
        const values = [];
        const ops = [];

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (typeof token === "number") {
                values.push(token);
            }
            else {
                while (ops.length > 0 && precedence[ops[ops.length - 1]] >= precedence[token]) {
                    const b = values.pop();
                    const a = values.pop();
                    const op = ops.pop();
                    values.push(applyOperator(a, b, op));
                }
                ops.push(token);
            }
        }

        while(ops.length > 0) {
            const b = values.pop();
            const a = values.pop();
            const op = ops.pop();
            values.push(applyOperator(a, b, op));
        }
        return values[0];
    }

    return { 
        calculate(expression) {
        const cleanExpression = expression.replace(/\s/g, '');
        const token = parseExpression(cleanExpression);
        const result = evaluateExpression(token);
        return Math.round(result * 1000000) / 1000000;
        }
    };
}

const calculator = Operator();

function addtoexpression(value) {
    if(value === "x") value = "*";
    if(value === "&divide;") value = "/";

    currentexpression += value;
    document.querySelector(".expression").innerHTML = currentexpression || "Click buttons to build Expression!";
    document.querySelector(".result").innerHTML = "";
}

function clearexpression() {
    currentexpression = "";
    document.querySelector(".expression").innerHTML = "Click buttons to build Expression";
    document.querySelector(".result").innerHTML = "";
}

function calculateexpression() {
    if(!currentexpression) {
        document.querySelector(".result").innerHTML = "Enter an Expression!";
        return;
    }

    try {
        const result = calculator.calculate(currentexpression);
        document.querySelector(".result").innerHTML = `${currentexpression} = ${result}`;
    }
    catch (error) {
        document.querySelector(".result").innerHTML = `Error`
    };
    
}




