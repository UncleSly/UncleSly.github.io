class Calculator{ 
    constructor(expressionTextElement, inputTextElement){ 
        this.expressionTextElement = expressionTextElement 
        this.inputTextElement = inputTextElement 
        this.clear() 
    } 
    clear(){ 
        this.inputTextElement.innerText = "" 
        this.currentOperand = " " 
        this.previousOperand = " " 
        this.operation = undefined 
    } 
    percent(){ 
        if(this.currentOperand == '') return 
        let percent = parseFloat(this.currentOperand) / 100 
        this.currentOperand = percent 
    } 
    negation(){ 
        if(this.currentOperand == '') return 
        let negation = parseFloat(this.currentOperand) 
        this.currentOperand = -Math.abs(negation) 
    } 
    delete(){ 
      this.currentOperand = this.currentOperand.toString().slice(0, -1) 
    } 
 
    appendNumber(value){ 
       if(value == "." && this.currentOperand.includes(".")) return 
        this.currentOperand = this.currentOperand.toString() + value.toString() 
    } 
 
    chooseOperation(sign){ 
        if(this.currentOperand == " ") return 
        if(this.previousOperand !== ""){ 
            this.compute() 
        } 
        this.operation = sign 
        this.previousOperand = this.currentOperand 
        this.currentOperand = " " 
    } 
     
    compute(){ 
        let computation  
        let prev = parseFloat(this.previousOperand) 
        let current = parseFloat(this.currentOperand) 
        if (isNaN(prev) || isNaN(current)) return 
 
        switch(this.operation){ 
            case "+": 
                computation = prev + current 
                break; 
            case "-": 
                computation = prev - current 
                break; 
            case "*": 
                computation = prev * current 
                break; 
            case "/": 
                computation = prev / current 
                break; 
            default: 
                return 
        } 
        this.currentOperand = computation 
        this.operation = undefined 
        this.previousOperand = " " 
    } 
     getDisplayNumber(num){ 
        const stringNumber = num.toString() 
        const intergerDigits = parseFloat(stringNumber.split(".")[0]) 
        const decimalDigits = stringNumber.split('.')[1] 
        let intergerDisplay 
        if(isNaN(intergerDigits)){ 
            intergerDisplay = "" 
        }else { 
            intergerDisplay = intergerDigits.toLocaleString('en', { 
                maximumFractionDigits: 0 
            }) 
        } 
        if(decimalDigits != null){ 
            return `${intergerDigits}.${decimalDigits}` 
        }else{ 
            return intergerDisplay 
        } 
     } 
 
    updateDisplay(){ 
        this.expressionTextElement.innerText = this.getDisplayNumber(this.currentOperand) 
        if(this.operation !=null) 
        this.inputTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` 
    } 
} 
 
 
 
 
 
 
const expression = document.getElementById('expression') 
const result = document.getElementById("result") 
 
let calculator = new Calculator(expression, result) 
 
const allClear = document.querySelector("[data-all-clear]") 
const numbers = document.querySelectorAll('[data-number]') 
const operators = document.querySelectorAll("[data-operator]") 
const equal = document.querySelector("[data-equal]") 
const backspace = document.getElementById("backspace") 
const percent = document.querySelector('[data-percent]') 
const negation = document.querySelector('[data-negation]') 
 
 
 
percent.addEventListener("click", () => { 
     calculator.percent() 
     calculator.updateDisplay() 
}) 
 negation.addEventListener('click', () =>{ 
    calculator.negation() 
    calculator.updateDisplay() 
 }) 
allClear.addEventListener("click", () =>{ 
    calculator.clear() 
    calculator.updateDisplay() 
}) 
equal.addEventListener("click", () =>{ 
    calculator.compute() 
    calculator.updateDisplay() 
}) 
backspace.addEventListener("click", () =>{ 
    calculator.delete()

calculator.updateDisplay() 
}) 
 
numbers.forEach(number => { 
    number.addEventListener('click', (e) =>{ 
        const {target} = e 
        calculator.appendNumber(target.dataset.number) 
        calculator.updateDisplay() 
    }) 
     
}) 
operators.forEach(sign => { 
    sign.addEventListener('click', (e) =>{ 
        const {target} = e 
        calculator.chooseOperation(target.dataset.operator) 
        calculator.updateDisplay() 
    }) 
     
})
