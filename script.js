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

    return { 
        calculate(expression) {
        const [a, op, b] = expression;
        return operators[op](parseFloat(a), parseFloat(b));
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




