const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector('.interest-rate');
const loanTenureInput = document.querySelector('.loan-tenure');

const loanEMIValue = document.querySelector(".loan-emi .value")
const totalInterestValue = document.querySelector(".total-interest .value")
const totalAmountValue = document.querySelector(".total-amount .value")

const calculateBtn = document.querySelector('.calculate-button');

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 12 / 100;
let myChart

const checkInput = (input) => {
    let loanAmountValue = loanAmountInput.value;
    let interestRateValue = interestRateInput.value;
    let loanTenureValue = loanTenureInput.value;

    let regex = /^[0-9]+$/;
    if (!loanAmountValue.match(regex)) {
       loanAmountInput.value = "10000"; 
    }
    if (!loanTenureValue.match(regex)) {
        loanTenureInput.value = "12"
    }
    let regexDecimal = /^(\d*\.)?\d+$/;
    if (!interestRateValue.match(regexDecimal)) {
        interestRateInput.value = "7.5"
    }
};

const displayChart = (totalInterestPayableValue, totalAmountValue) => {
    const ctx = document.getElementById('pie-chart').getContext('2d');
    myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Total Interest', 'Principla Interest'],
        datasets: [{
          data: [totalInterestPayableValue, totalAmountValue],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'],
          borderWidth: 0,
        }]
      },
    });
};

const updateChart = (totalInterestPayableValue, loanAmount) => {
    myChart.data.datasets[0].data[0] = totalInterestPayableValue;
    myChart.data.datasets[0].data[1] = loanAmount;
    myChart.update();

};

const calculateEMI = () => {

    checkInput();
    refreshData();

    let emi = loanAmount * interest * (Math.pow(1 + interest, loanTenure) / (Math.pow(1 + interest, loanTenure) - 1));
    return emi;
};


const updateData = (emi) => {
    loanEMIValue.innerHTML = Math.round(emi);
    
    let totalAmount = Math.round(emi * loanTenure);
    totalAmountValue.innerHTML = totalAmount;

    let totalInterestPayable = Math.round(totalAmount - loanAmount);
    totalInterestValue.innerHTML = totalInterestPayable;
    console.log(totalInterestPayable);

    if (myChart) {
        updateChart(totalInterestPayable, loanAmount);
    } else {
        displayChart(totalInterestPayable,totalAmount);
    }
};

const refreshData = () => {
    loanAmount = parseFloat(loanAmountInput.value);
    interestRate = parseFloat(interestRateInput.value);
    loanTenure = parseFloat(loanTenureInput.value);
    interest = interestRate / 12 / 100;
};

const init = () => {
    let emi = calculateEMI();
    updateData(emi);
};

init();



calculateBtn.addEventListener('click', init);