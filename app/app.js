const d = document;
const submitBtn = d.querySelector("#submit");
const continueBtn = d.querySelector("#continue-btn");
const numberCard = d.querySelector("#number-card");
const holderCard = d.querySelector("#cardholder-card");
const cvcCard = d.querySelector("#card-cvc");
const mmCard = d.querySelector("#mm");
const yyCard = d.querySelector("#yy");
const inputCardHolder = d.querySelector("#cardholder");
const inputCardNumber = d.querySelector("#cardnumber");
const inputMM = d.querySelector("#mm-field");
const inputYY = d.querySelector("#yy-field");
const inputCVC = d.querySelector("#cvc-field");
const successMsg = d.querySelector("#success-message");
const cardFields = d.querySelector("#card-fields");
const form = d.querySelector("form");
const formContainer = d.querySelector("#form-container");
const errorMsg = d.querySelectorAll(".error-msg");
const input = d.querySelectorAll("input");

const numberPattern = /[0-9]/;
const namePattern = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/g;

let cardOwner;
let cardNumber;
let mmField;
let yyField;
let cvcNumber;


inputCardHolder.addEventListener("input", (e) => {
    let value = e.target.value; 

    if(e) {
        handleInputOwner(value);       
    }
});

inputCardNumber.addEventListener("input", (e) => {
    let value = e.target.value;

    if(e) {
        handleInputCard(value);
        }     
});

inputMM.addEventListener("input", (e) => {
    let value = e.target.value;

    if(e) {
        validateMonth(value);
        }     
});

inputYY.addEventListener("input", (e) => {
    let value = e.target.value;

    if(e) {
        validateYear(value);
        }     
});

inputCVC.addEventListener("input", (e) => {
    let value = e.target.value;
    cvcNumber = "";
    if(value.length === 0) {
        inputCVC.classList.add("error");
        errorMsg[3].classList.remove("hide");
        cvcCard.textContent = value;
        
    } if(value.match(numberPattern)) {
        inputCVC.classList.remove("error");
        errorMsg[3].classList.add("hide");  
        cvcNumber = value;
        cvcCard.textContent = value;
        }    
});

function handleInputOwner(value) {
    cardOwner = "";

    if(value.length === 0) {
        inputCardHolder.classList.add("error");
        errorMsg[0].classList.remove("hide");
        holderCard.textContent = value;
    } else {
        inputCardHolder.classList.remove("error");
        errorMsg[0].classList.add("hide");

        if(value.match(namePattern)) {
            cardOwner = value;
            holderCard.textContent = cardOwner;
        }
    }
}

function handleInputCard(value) {
    cardNumber = "";
    let card = value.match(/.{1,4}(.$)?/g);

    if(value.length === 0) {
        inputCardNumber.classList.add("error");
        errorMsg[1].classList.remove("hide");
        numberCard.textContent = value;
    } 
    if(value.match(numberPattern)) {
        inputCardNumber.classList.remove("error");
        errorMsg[1].classList.add("hide");

        numberCard.textContent = card.join(" ");
        cardNumber = value;
        console.log(cardNumber);
    } 
}

function validateMonth(value) {
        mmField = "";

        if(value.length === 0 || Number(value) > 12) {
            inputMM.classList.add("error");
            errorMsg[2].classList.remove("hide");  
        } 
        if(value.match(numberPattern)) {
            inputMM.classList.remove("error");
            errorMsg[2].classList.add("hide");  
            mmField = value;
            
            if(Number(value) < 10 && Number(value) > 0) {
                number = "";
                value = "0" + value;
                mmCard.textContent = value;
            } else {
                value = value;
                mmCard.textContent = value;
            }
    }
}

function validateYear(value) {
        yyField = "";

        if(value.length === 0 || Number(value) < 24 || Number(value) > 28) {
            inputYY.classList.add("error");
            errorMsg[2].classList.remove("hide");  
        } 
        if(value.match(numberPattern)) {
            inputYY.classList.remove("error");
            errorMsg[2].classList.add("hide");  
            yyField = value;

            yyCard.textContent = value;
            }
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(cardOwner);
    console.log(cardNumber.length);
    console.log(mmField);
    console.log(yyField);
    console.log(cvcNumber);

    if(cardOwner !== [] && cardOwner.length > 4 && cvcNumber !== [] && cvcNumber.length === 3 && mmField !== [] && yyField !== [] && yyField.length === 2 && cardNumber !== [] && cardNumber.length === 16) {
        successMsg.classList.remove("hide");
        formContainer.classList.add("hide");
        form.reset();
    } else {
        errorDiv();
    }
});

function errorDiv() {
    if(inputCardHolder.value.length === 0) {
        errorMsg[0].classList.remove("hide");
        inputCardHolder.classList.add("error");
    } 

    if(inputCardNumber.value.length < 16) {
        errorMsg[1].classList.remove("hide");
        inputCardNumber.classList.add("error");
    }
        
    if(inputMM.value.length === 0) {
        errorMsg[2].classList.remove("hide");
        inputMM.classList.add("error");
    }

    if(inputYY.value.length === 0) {
        errorMsg[2].classList.remove("hide");
        inputYY.classList.add("error");
    } 

    if(inputCVC.value.length < 3) {
        errorMsg[3].classList.remove("hide");
        inputCVC.classList.add("error");
    } 
}

continueBtn.addEventListener("click", (e) => {
    if(e.target) {
        formContainer.classList.remove("hide");
        successMsg.classList.add("hide");
        resetAll();
        form.reset();
    }
});

function resetAll() {
    yyCard.innerHTML = "00";
    mmCard.innerHTML = "00";
    cvcCard.innerHTML = "000";
    holderCard.innerHTML = "Jane AppleSeed";
    numberCard.innerHTML = "0000 0000 0000 0000";
    cardOwner = [];
    cardNumber = [];
    mmField =  [];
    yyField =  [];
    cvcNumber = [];
}