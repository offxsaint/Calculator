function Operator() {
    const add =  (a, b) => {
        return a + b;
    }
    const subtract = (a, b) => {
        return a - b;
    }
    const divide = (a, b) => {
        if(b == 0) {
            throw Error;
        }
        return a / b;
    }
    const multiply = (a, b) => {
        return a * b;
    }
    return {
        "+": add,
        "-": subtract,
        "/": divide,
        "*": multiply
    };

    function calculate(expression) {
        const [a, op, b] = expression.split(" ")
        return this[this.getOperatorName(op)](parseFloat(a), parseFloat(b));
    };

}
