const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

function validatePhoneNumber(number) {
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
    return regex.test(number);
}

function showResult(isValid, number) {
    resultsDiv.textContent = `${isValid ? 'Valid' : 'Invalid'} US number: ${number}`;
    resultsDiv.className = isValid ? 'valid show' : 'invalid show';
}

checkBtn.addEventListener('click', () => {
    const number = userInput.value.trim();
    
    if (!number) {
        alert('Please provide a phone number');
        return;
    }

    const isValid = validatePhoneNumber(number);
    showResult(isValid, number);
});

clearBtn.addEventListener('click', () => {
    userInput.value = '';
    resultsDiv.textContent = '';
    resultsDiv.className = '';
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkBtn.click();
    }
});
