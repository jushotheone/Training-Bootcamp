const formgroup = document.querySelectorAll(".form-group select"), // get all the select elements in the form group 
fromCurrency = document.querySelector(".from select"), // get the first select element in the form group
toCurrency = document.querySelector(".to select"), // get the second select element in the form group
getButton = document.querySelector("form button"); // get the button element in the form group

for(let i =0; i < formgroup.length; i++) {
    for(currency_code in country_code) {
        let selected;
        if(i == 0){
            selected = currency_code == "GBP" ? "selected" : "";
            console.log(selected);
        } else if(i == 1){
            selected = currency_code == "USD" ? "selected" : "";
            console.log(selected);
        }
        // create an option tag for each currency code in the country_code object and insert it into the form group
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // insert the option tag into the form group select element using insertAdjacentHTML method.
        formgroup[i].insertAdjacentHTML("beforeend", optionTag);
    }
    formgroup[i].addEventListener("change", e => {
        loadFlag(e.target); // call the loadFlag function
    })
}

function loadFlag(element) {
    for(code in country_code) {
        if(code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://www.flagsapi.com/${country_code[code]}/flat/64.png`;
        }
    }
}

// add an event listener to the form group
window.addEventListener("load", () => { // add an event listener to the button
    getExchangeRate(); // call the getExchangeRate function
});
// get the exchange rate API
getButton.addEventListener("click", e => { // add an event listener to the button
    e.preventDefault(); // prevent the default action of the form from happening
    getExchangeRate(); // call the getExchangeRate function
});

const exchangeIcon = document.querySelector(".form-group .icon"); // get the exchange rate icon
exchangeIcon.addEventListener("click", ()=> {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})



// create a function called getExchangeRate
function getExchangeRate() {
    const amount = document.querySelector(".amount input"); // get the amount entered by the user
    exchangeRateText = document.querySelector(".exchange-rate"); // get the exchange rate text    
    let amountVal = amount.value; // get the amount entered by the user
    if(amountVal == "" || amountVal == "0") { // check if the amount entered is empty or 0
        amount.value = "1"; // set the amount value to 1
        amountVal = 1; // set the amount value to 1
    } // end of if statement
    exchangeRateText.innerText = "Receiving exchange rate..."; // set the text content of the exchange rate text
    let url = `https://v6.exchangerate-api.com/v6/dcb063aad8ea4242a6e32141/latest/${fromCurrency.value}`; // set the url to the exchange rate API
    // fetch the url and convert the response to json
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]; // get the exchange rate for the selected currency
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2); // multiply the amount by the exchange rate and round it off to two decimal places
        
        exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`; // set the text content of the exchange rate text
        console.log(exchangeRateText.innerText);
}).catch(() => { // catch an error
    exchangeRateText.innerText = "Something went wrong. Please try again later"; // set the text content of the exchange rate text    
})
}