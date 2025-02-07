document.getElementById('convert-btn').addEventListener('click', function() {
    const numberInput = document.getElementById('number').value.trim();
    const output = document.getElementById('output');
  
    // Clear any previous animations
    output.classList.remove('animate');
  
    // Validation
    if (numberInput === '') {
      displayMessage("Please enter a valid number");
      return;
    }
  
    const number = parseInt(numberInput, 10);
  
    if (isNaN(number)) {
      displayMessage("Please enter a valid number");
      return;
    }
  
    if (number < 1) {
      displayMessage("Please enter a number greater than or equal to 1");
      return;
    }
  
    if (number > 3999) {
      displayMessage("Please enter a number less than or equal to 3999");
      return;
    }
  
    // Conversion
    const roman = convertToRoman(number);
    displayMessage(roman);
  });
  
  function displayMessage(message) {
    const output = document.getElementById('output');
    output.textContent = message;
    // Triggering animation by re-adding the class
    output.classList.remove('animate');
    void output.offsetWidth; // Trigger reflow
    output.classList.add('animate');
  }
  
  function convertToRoman(num) {
    const romanNumerals = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
  
    let roman = '';
  
    for (let key in romanNumerals) {
      while (num >= romanNumerals[key]) {
        roman += key;
        num -= romanNumerals[key];
      }
    }
  
    return roman;
  }