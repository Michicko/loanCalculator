const loanForm = document.querySelector('#loan-form');
const interestInput = document.querySelector('#interest');
const yearsInput = document.querySelector('#years');
const loanInput = document.querySelector('#amount');

loanInput.focus();

// Event Listeners
loanForm.addEventListener('submit', calculateResult);

function calculateResult(e) {
    document.querySelector("#results").style.display = 'none';
    const { pv, i, n } = getParameters();
    const a = i / (Math.pow((1 + i), n) - 1);
    const monthlyPayment = Math.floor((i + a) * pv).toFixed(2);

    if (isFinite(monthlyPayment)) {
        const totalPayment = n * monthlyPayment;
        const totalInterest = totalPayment - pv;
        activateLoader();
        displayResult(monthlyPayment, totalPayment, totalInterest);
    } else {
        showError('Please Check your numbers');
    }
    
    e.preventDefault();
}

// Get getParameters
function getParameters() {
  const pv = parseInt(loanInput.value);
  const i = parseFloat(interestInput.value) / 1200;
  const n = parseInt(yearsInput.value) * 12;

  return {
    pv,
    i,
    n,
  };
}

// Show results
function displayResult(monthlyPayment, totalPayment, totalInterest) {
    document.querySelector('#monthly-payment').value = `${monthlyPayment}`;
    document.querySelector('#total-payment').value = `${totalPayment}`;
    document.querySelector('#total-interest').value = `${totalInterest}`;
}

// activate loader
function activateLoader() {
    const loader = document.querySelector('#loading');
    const results = document.querySelector('#results');
    loader.style.display = 'block';
    setTimeout(() => {
        loader.style.display = "none";
        results.style.display = 'block';
    }, 1500);
}

// Show error
function showError(msg) {
    const container = document.querySelector('.card');
    const loanForm = document.querySelector("#loan-form");
    const p = document.createElement('p');
    p.classList = 'mx-auto msg-error';
    p.appendChild(document.createTextNode(msg));
    container.insertBefore(p, loanForm);
    setTimeout(() => {
        p.remove();
    }, 2000);
}