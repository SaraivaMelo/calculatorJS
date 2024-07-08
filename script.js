// Configuração da data e do relógio 

function addNum(num) {
    if (num < 10) {
        num = "0" + num
    }
    return num;
}

function setHour() {

    let myTime = new Date();

    let displayHour = document.querySelector('.hour');

    let myHourShow = addNum(myTime.getHours()) + ":" + addNum(myTime.getMinutes()) + ":" + addNum(myTime.getSeconds());

    displayHour.textContent = myHourShow;

    let setDate = myTime.toLocaleString('pt-BR', { dateStyle: 'short' });

    let displayDate = document.querySelector('.date');
    displayDate.textContent = setDate;
}

setInterval(setHour, 1000)
setHour();
// ==============================================================================================================================




function Calculator() {

    this.display = document.querySelector('.resultDisplay');
    this.operation = [];
    this.lastOp_ = '';
    this.lastNumber_ = '';

    this.start = () => {
        this.updateDisplay();
        this.keyBoard();
        this.clickBtn();
    }

    this.clickBtn = () => {
        document.addEventListener('click', (e) => {
            let el = e.target;

            this.analizeValue(el.innerText)
        })

        this.display.focus();

    }

    this.analizeValue = (el) => {
        switch (el) {
            case 'AC':
                this.clearDisplay();
                break;

            case 'CE':
                this.clearOne();

            case '+':
                this.operationCalc('+');
                break;
                
            case '-':
                this.operationCalc('-');
                break;

            case '/':
                this.operationCalc('/');
                break;

            case 'X':
                this.operationCalc('*');
                break;

            case '%':
                this.operationCalc('%');
                break;

            case '=':
                this.calc();
                break;

            case '.':
                this.addDot('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':

                this.operationCalc(parseInt(el));
                break;

            default:
                this.setError();
                break;
        }
    }
    
    this.clearDisplay = () => {
        this.operation = [];
        this.lastNumber_ = "";
        this.lastOp_ = "";
        this.updateDisplay();
    }
        

    this.clearOne = () => {
        this.operation.pop();
        this.updateDisplay();
    }

    this.inputDisplay = (value) => {

        if(value.toString().length > 10){
            this.setError();
            return false;
        }

        this.display.textContent = value;
    }
    
    this.setError = () => {

        this.display.innerHTML = "Error";
    }

    this.addDot = () =>{

        let lastOperation = this.getLastOp();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1 )  return


        if(this.changeOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.')
        }else{
            this.lastOperation(lastOperation.toString() + '.');
        }

        this.updateDisplay();
    }


    this.lastItem = (isOperator = true ) =>{
        
        let lastItem;

        for(let i = this.operation.length-1;  i >= 0; i--){

            if(this.changeOperator(this.operation[i]) == isOperator ){
                lastItem = this.operation[i]
                break;
            }
        
        }

        if(!lastItem){
            lastItem = (isOperator) ? this.lastOp_ : this.lastNumber_
        }
        return lastItem;

    }

    this.updateDisplay = () =>{

        let lastNumber = this.lastItem(false);

        if(!lastNumber) lastNumber =0;

        this.inputDisplay(lastNumber); 
    }


    this.operationCalc = (value) => {


        if(isNaN(this.getLastOp())){
            
            
            if(this.changeOperator(value)){
                
                this.lastOperation(value)
                
            }else{

                this.pushOperation(value);
                this.updateDisplay(value);
            }
           

        }else{

            if(this.changeOperator(value)){

                this.pushOperation(value);
                
            }else{
                
                let newValue = this.getLastOp().toString() + value.toString();
                this.lastOperation((newValue));
                
                this.updateDisplay();

            }
          
        }

    }

    this.getLastOp = () =>{
       return this.operation[this.operation.length - 1];
    }

    this.changeOperator = (operator) =>{

       return (['+', '-', '*', '%', '/'].indexOf(operator) > -1 )

    }

    this.lastOperation = (value) => {
        this.operation[this.operation.length - 1] = value;
    }

    this.pushOperation = (value) => {

        this.operation.push(value); 
        if(this.operation.length > 3){
           this.calc();
        }

    }

    this.calc = () => {

        let lastValue ;
        this.lastOp_ = this.lastItem();

        if(this.operation.length < 3){
            let firstItem = this.operation[0];
            this.operation = [firstItem, this.lastOp_, this.lastNumber_];
        }

        if(this.operation.length > 3){

            lastValue = this.operation.pop();
            this.lastNumber_ = this.getResult();
            
        }else if(this.operation.length == 3){

            this.lastNumber_ = this.lastItem(false);
            
        }


        let result = this.getResult();

        if(lastValue == '%'){

            result /= 100;

            this.operation = [result];

        }else{
            
            this.operation = [result];

            if(lastValue){
                this.operation.push(lastValue);
            }
        }



        this.updateDisplay();
    }
   
    this.getResult = () =>{
            return eval(this.operation.join(""));
       
    }

    this.keyBoard = () =>{
        document.addEventListener('keyup', e =>{

            switch (e.key) {
                case 'Escape':
                    this.clearDisplay();
                    break;
    
                case 'Backspace':
                    this.clearOne();
    
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    this.operationCalc(e.key);
                    break;

                case 'Enter':
                case '=':
                        this.calc();
                    break;
    
                case '.':
                case ',':
                    this.addDot('.');
                    break;
    
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
    
                    this.operationCalc(parseInt(e.key));
                    break;
    
            }
        })
    };
}

const calc = new Calculator();
calc.start();