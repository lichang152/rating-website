import React, { useState } from 'react';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState(0);
  const [previousValue, setPreviousValue] = useState(0);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (number: string) => {
    if (waitingForOperand) {
      setDisplay(number);
      setCurrentValue(parseFloat(number));
      setWaitingForOperand(false);
    } else {
      const newDisplay = display === '0' ? number : display + number;
      setDisplay(newDisplay);
      setCurrentValue(parseFloat(newDisplay));
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (op: string) => {
    if (operator && !waitingForOperand) {
      calculate();
    }
    setPreviousValue(currentValue);
    setOperator(op);
    setWaitingForOperand(true);
  };

  const calculate = () => {
    if (!operator) return;

    let result = 0;
    switch (operator) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      case '*':
        result = previousValue * currentValue;
        break;
      case '/':
        result = previousValue / currentValue;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setCurrentValue(result);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleFunction = (func: string) => {
    let result = 0;
    switch (func) {
      case 'sin':
        result = Math.sin(currentValue * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(currentValue * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(currentValue * Math.PI / 180);
        break;
      case 'sqrt':
        result = Math.sqrt(currentValue);
        break;
      case 'pow':
        result = Math.pow(currentValue, 2);
        break;
      case 'log':
        result = Math.log10(currentValue);
        break;
      case 'ln':
        result = Math.log(currentValue);
        break;
      case 'abs':
        result = Math.abs(currentValue);
        break;
      case '1/x':
        result = 1 / currentValue;
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setCurrentValue(result);
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue(0);
    setPreviousValue(0);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);
      setCurrentValue(parseFloat(newDisplay));
    } else {
      setDisplay('0');
      setCurrentValue(0);
    }
  };

  return (
    <div className="scientific-calculator">
      <div className="calculator-display">
        <div className="display">{display}</div>
      </div>

      <div className="calculator-buttons">
        <div className="function-buttons">
          <button onClick={handleClear}>C</button>
          <button onClick={handleBackspace}>←</button>
          <button onClick={() => handleFunction('abs')}>abs</button>
          <button onClick={() => handleFunction('1/x')}>1/x</button>
          <button onClick={() => handleFunction('pow')}>x²</button>
          <button onClick={() => handleFunction('sqrt')}>√x</button>
        </div>

        <div className="trig-buttons">
          <button onClick={() => handleFunction('sin')}>sin</button>
          <button onClick={() => handleFunction('cos')}>cos</button>
          <button onClick={() => handleFunction('tan')}>tan</button>
          <button onClick={() => handleFunction('log')}>log</button>
          <button onClick={() => handleFunction('ln')}>ln</button>
          <button onClick={() => handleFunction('π')}>π</button>
          <button onClick={() => handleFunction('e')}>e</button>
        </div>

        <div className="number-buttons">
          <button onClick={() => handleNumber('7')}>7</button>
          <button onClick={() => handleNumber('8')}>8</button>
          <button onClick={() => handleNumber('9')}>9</button>
          <button onClick={() => handleOperator('/')}>÷</button>

          <button onClick={() => handleNumber('4')}>4</button>
          <button onClick={() => handleNumber('5')}>5</button>
          <button onClick={() => handleNumber('6')}>6</button>
          <button onClick={() => handleOperator('*')}>×</button>

          <button onClick={() => handleNumber('1')}>1</button>
          <button onClick={() => handleNumber('2')}>2</button>
          <button onClick={() => handleNumber('3')}>3</button>
          <button onClick={() => handleOperator('-')}>-</button>

          <button onClick={() => handleNumber('0')}>0</button>
          <button onClick={handleDecimal}>.</button>
          <button onClick={calculate}>=</button>
          <button onClick={() => handleOperator('+')}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;