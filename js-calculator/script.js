document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  let formula = '';
  let lastResult = '';
  let newCalculation = true;

  const updateDisplay = (value) => {
    display.textContent = value || '0';
  };

  const clearCalculator = () => {
    formula = '';
    lastResult = '';
    newCalculation = true;
    updateDisplay('0');
  };

  const handleNumber = (number) => {
    if (newCalculation) {
      formula = '';
      newCalculation = false;
    }
    
    if (number === '0' && formula === '0') return;
    if (number !== '0' && formula === '0') formula = '';
    
    formula += number;
    updateDisplay(formula);
  };

  const handleDecimal = () => {
    if (newCalculation) {
      formula = '0';
      newCalculation = false;
    }

    const lastNumber = formula.split(/[-+×÷]/).pop();
    if (!lastNumber.includes('.')) {
      formula += formula === '' ? '0.' : '.';
      updateDisplay(formula);
    }
  };

  const handleOperator = (operator) => {
    if (formula === '' && operator !== '-') {
      if (lastResult) formula = lastResult;
      else return;
    }

    newCalculation = false;
    const lastChar = formula.slice(-1);
    const secondLastChar = formula.slice(-2, -1);
    
    // Handle consecutive operators
    if ('+-×÷'.includes(lastChar)) {
      if (operator === '-' && !('+-×÷'.includes(secondLastChar))) {
        formula += operator;
      } else {
        // Remove last operator and any trailing negative sign
        while ('+-×÷'.includes(formula.slice(-1))) {
          formula = formula.slice(0, -1);
        }
        formula += operator;
      }
    } else {
      formula += operator;
    }
    
    updateDisplay(formula);
  };

  const calculateResult = () => {
    if (formula === '') return;
    
    let expression = formula.replace(/×/g, '*').replace(/÷/g, '/');
    try {
      let result = Function('"use strict";return (' + expression + ')')();
      result = Math.round(result * 10000) / 10000;
      lastResult = result.toString();
      formula = lastResult;
      newCalculation = true;
      updateDisplay(lastResult);
    } catch (e) {
      updateDisplay('Error');
      formula = '';
      newCalculation = true;
    }
  };

  // Event Listeners
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      const { id } = e.target;
      
      if (id === 'clear') clearCalculator();
      else if (id === 'equals') calculateResult();
      else if (id === 'decimal') handleDecimal();
      else if (['add', 'subtract', 'multiply', 'divide'].includes(id)) {
        const operators = {
          add: '+', subtract: '-', multiply: '×', divide: '÷'
        };
        handleOperator(operators[id]);
      } else {
        handleNumber(e.target.textContent);
      }
    });
  });
});
