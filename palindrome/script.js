const textInput = document.getElementById('text-input');
const detectButton = document.getElementById('check-btn');
const resultDisplay = document.getElementById('result');

const detectPalindrome = (text) => {
    // Check for empty input first
    if (!text) {
        alert('Please input a value');
        return;
    }

    // Clear previous result
    resultDisplay.replaceChildren();

    // Clean up the input text - remove non-alphanumeric chars and convert to lowercase
    const cleanText = text.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    
    // Check if it's a palindrome by comparing with its reverse
    const isPalindrome = cleanText === [...cleanText].reverse().join('');
    
    // Create result message using the original input text
    const resultMessage = `${text} ${isPalindrome ? 'is' : 'is not'} a palindrome`;

    // Display the result
    const resultElement = document.createElement('p');
    resultElement.textContent = resultMessage;
    resultDisplay.appendChild(resultElement);
    resultDisplay.classList.remove('hidden');
}

// Event Listeners
textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        detectPalindrome(textInput.value);
    }
});

detectButton.addEventListener('click', () => {
    detectPalindrome(textInput.value);
});
