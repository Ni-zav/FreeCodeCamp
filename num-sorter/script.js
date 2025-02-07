const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

// Add loading simulation
function simulateLoading() {
    checkBtn.disabled = true;
    resultsDiv.textContent = 'Checking...';
    resultsDiv.className = '';
    
    return new Promise(resolve => setTimeout(resolve, 500));
}

async function validatePhoneNumber(number) {
    if (number.length === 0) {
        alert('Please provide a phone number');
        return;
    }

    await simulateLoading();

    // Single regex pattern that matches all valid cases
    const phoneRegex = /^(1\s?)?((\(\d{3}\))|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;
    
    // Initial validation
    let isValid = phoneRegex.test(number);

    // Additional invalidation checks
    if (isValid) {
        const invalidChecks = [
            /^[02-9]/, // starts with anything but 1
            /^-/, // starts with dash
            /^11/, // starts with 11
            /^10\s/, // starts with 10 and space
            /[*&!@#$%^&*a-zA-Z?]/, // contains invalid characters
            /\(\d{3}\d/, // incorrect parentheses format
            /\d{3}\)/, // incorrect parentheses format
            /^\d{11}/, // too many digits without spaces
            /\(\d{3}$/, // unclosed parenthesis
            /^\d{3}\)/, // missing opening parenthesis
            /^1.*\d{11}/ // starts with 1 but has too many digits
        ];

        if (invalidChecks.some(check => check.test(number))) {
            isValid = false;
        }

        // Check for mismatched parentheses
        const openParens = (number.match(/\(/g) || []).length;
        const closeParens = (number.match(/\)/g) || []).length;
        if (openParens !== closeParens) {
            isValid = false;
        }
    }

    resultsDiv.textContent = `${isValid ? 'Valid' : 'Invalid'} US number: ${number}`;
    resultsDiv.className = isValid ? 'valid' : 'invalid';
    
    requestAnimationFrame(() => {
        resultsDiv.style.opacity = '1';
        checkBtn.disabled = false;
    });
}

checkBtn.addEventListener('click', () => {
    validatePhoneNumber(userInput.value);
});

clearBtn.addEventListener('click', () => {
    userInput.value = '';
    resultsDiv.textContent = '';
    resultsDiv.className = '';
});

// Add enter key support
userInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        validatePhoneNumber(userInput.value);
    }
});

// Add input validation feedback
userInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value.length > 0) {
        userInput.classList.add('has-content');
    } else {
        userInput.classList.remove('has-content');
    }
});

// Remove loading screen
window.addEventListener('load', () => {
    document.querySelector('.loading')?.remove();
});
