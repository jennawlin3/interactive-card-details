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

const allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const allowedLetter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "y", "x", "z", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'X', 'Z', " "];

const maskNumber = "#### #### #### ####";
const maskMM = "##";
const maskYY = "##"
const maskCVC = "###"

let cardOwner = [];
let cardNumber = [];
let mmField =  [];
let yyField =  [];
let cvcNumber = [];


inputCardHolder.addEventListener("keydown", (e) => {
    /*if(e.key === 'tab') {
        return;
    }*/

    if(e) {
        if(inputCardHolder.classList.contains("error")) {
        inputCardHolder.classList.remove("error");
        errorMsg[0].classList.add("hide");
        }        
    }

    handleInputOwner(e.key, cardOwner, holderCard);
    inputCardHolder.value = cardOwner.join("");
    return cardOwner;
});

inputCardNumber.addEventListener("keydown", (e) => {
    if(e.key === 'tab') {
        return;
    }

    if(e) {
        if(inputCardNumber.classList.contains("error")) {
        inputCardNumber.classList.remove("error");
        errorMsg[1].classList.add("hide");
        }        
    }

    e.preventDefault();
    handleInput(maskNumber, e.key, cardNumber, numberCard);
    inputCardNumber.value = cardNumber.join("");
    return cardNumber;
});

inputMM.addEventListener("keydown", (e) => {

    if(e.key === 'tab') {
        return;
    }

    if(e) {
        if(inputMM.classList.contains("error")) {
        inputMM.classList.remove("error");
        errorMsg[2].classList.add("hide");
        }        
    }    

    e.preventDefault();
    handleInput(maskMM, e.key, mmField, mm);

    inputMM.value = mmField.join("");
    validateDate(mmField)
    return mmField.join("");
});


inputYY.addEventListener("keydown", (e) => {
    if(e.key === 'tab') {
        return;
    }

    if(e) {
        if(inputYY.classList.contains("error")) {
        inputYY.classList.remove("error");
        errorMsg[2].classList.add("hide");
        }        
    }

    e.preventDefault();
    handleInput(maskYY, e.key, yyField, yyCard);
    inputYY.value = yyField.join("");
    validateDate(yyField);
    return yyField;
});

inputCVC.addEventListener("keydown", (e) => {
    if(e.key === 'tab') {
        return;
    }

    if(e) {
        if(inputCVC.classList.contains("error")) {
        inputCVC.classList.remove("error");
        errorMsg[3].classList.add("hide");
        }        
    }

    e.preventDefault();
    handleInput(maskCVC, e.key, cvcNumber, cvcCard);
    inputCVC.value = cvcNumber.join("");
    return cvcNumber;
});

function handleInputOwner(key, arr, output) {

    if(key === 'Backspace' && arr.length > 0) {
        arr.pop();
        output.innerHTML = arr.join("");
        console.log(arr);
        return arr;
    }

    if(allowedLetter.includes(key)) {
        arr.push(key);
        output.innerHTML = arr.join("");
    } else {
        return;
    }

    console.log(arr);
    return arr;
}

function handleInput(mask, key, arr, output) {

    if(key === 'Backspace' && arr.length > 0) {
        arr.pop();
        output.innerHTML = arr.join("");
        console.log(arr);
        return arr;
    }

    if(allowedKeys.includes(key) && arr.length + 1 <= mask.length) {
        if(mask[arr.length] === "/" || mask[arr.length] === " ") {
            arr.push(mask[arr.length], key);
        } else {
            arr.push(key);
            if(output) {
              output.innerHTML = arr.join("");   
            }
        }       
    } 
    console.log(arr.length);
    return arr;
}

function validateDate(arr) {
    let array = arr.join("").toString()

    if(arr == mmField) {
        if(Number(array) >= 1 && Number(array) <= 12) {
            inputMM.classList.remove("error");
            return arr
        } else {
            console.log("caso 2")
            deleteCardDate(arr);
        }
    }
    // Limit on years digits (24/28)
    if(arr == yyField) {
        if(Number(array) >= 24 && Number(array) <= 28) {
            inputYY.classList.remove("error");
            return arr;
        } else {
            deleteCardDate(arr);
        }        
    }
}

function deleteCardDate(arr) {
    if(arr === mmField) {
        mmCard.innerHTML = "";
        inputMM.classList.add("error");
    }
    if(arr == yyField) {
        yyCard.innerHTML = "";
        inputYY.classList.add("error");
    }
}

function errorDiv() {
    if(inputCardHolder.value < 1) {
        errorMsg[0].classList.remove("hide");
        inputCardHolder.classList.add("error");
    } 

    if(inputCardNumber.value.length < 1) {
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

    if(inputCVC.value.length === 0) {
        errorMsg[3].classList.remove("hide");
        inputCVC.classList.add("error");
    } 
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(cardOwner !== [] && cardOwner.length <= 40 && cvcNumber !== [] && cvcNumber.length === 3 && mmField !== [] && mmField.length === 2 && yyField !== [] && yyField.length === 2 && cardNumber !== [] && cardNumber.length === 19) {
        successMsg.classList.remove("hide");
        formContainer.classList.add("hide");
        form.reset();
    } 

    if(cardOwner.length > 30) {
        inputCardHolder.classList.add("error");
        cardOwner = [];
        inputCardHolder.value = "";
    }
    errorDiv()
});

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