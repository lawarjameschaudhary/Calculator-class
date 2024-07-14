import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (key >= '0' && key <= '9') {
        showNumber(key);
      } else if (key === 'Enter') {
        calculateValue();
      } else if (key === 'Backspace') {
        handleDelete();
      } else if (key === 'Escape') {
        handleClear();
      } else if (['+', '-', '*', '/', '%', '.'].includes(key)) {
        showNumber(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const showNumber = (value) => {
    setDisplay((prev) => prev + value);
  };

  const handleClear = () => {
    setDisplay('');
    setResult('');
  };

  const handleDelete = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const calculateValue = () => {
    try {
      const calculatedResult = expressionCalculate(display);
      setResult(calculatedResult);
    } catch (e) {
      setResult('Error');
    }
  };

  const expressionCalculate = (expression) => {
    const tokens = expression.match(/(\d+|\D)/g);
    const numbers = [];
    const operators = [];

    const performOperation = () => {
      const b = numbers.pop();
      const a = numbers.pop();
      const op = operators.pop();

      if (op === '+') {
        numbers.push(a + b);
      } else if (op === '-') {
        numbers.push(a - b);
      } else if (op === '*') {
        numbers.push(a * b);
      } else if (op === '/') {
        numbers.push(a / b);
      } else if (op === '%') {
        numbers.push(a % b);
      } else {
        throw new Error('Unknown operator');
      }
    };

    for (const token of tokens) {
      if (!isNaN(token)) {
        numbers.push(parseFloat(token));
      } else {
        if (operators.length && (operators[operators.length - 1] === '*' || operators[operators.length - 1] === '/')) {
          performOperation();
        }
        operators.push(token);
      }
    }

    while (operators.length) {
      performOperation();
    }

    return numbers[0];
  };

  return (
    <div className='body h-screen flex justify-center items-center bg-gradient-to-r from-aalu from-10% via-paratha via-55% to-aalu to-90%'>
      <div className='h-thulo rounded-3xl bg-custonColor p-6 shadow-2xl'>
        <div className='grid mt-5 rounded-md'>
          <input type="text" name="number" id="num" value={display} className='p-11 bg-custonColor text-black text-right' readOnly />
          <input type="text" name="result" id="num-2" className='p-11 bg-custonColor text-right font-2xl font-sans font-bold' value={result} readOnly />
        </div>
        <div className='function-buttons'>
          <div className='mt-4 grid grid-cols-4 gap-5'>
            <button onClick={handleClear} className='bg-white rounded-md text-texts btn text-2xl text-bold p-2'>AC</button>
            <button onClick={handleDelete} className='bg-white rounded-md text-texts btn text-2xl'>
              <svg width="22" height="18" className='ml-5' viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.53505 1.11994e-08H21.0001C21.2653 1.11994e-08 21.5196 0.105357 21.7072 0.292893C21.8947 0.48043 22.0001 0.734784 22.0001 1V17C22.0001 17.2652 21.8947 17.5196 21.7072 17.7071C21.5196 17.8946 21.2653 18 21.0001 18H6.53505C6.37046 18 6.20841 17.9594 6.06327 17.8818C5.91813 17.8042 5.7944 17.6919 5.70305 17.555L0.370054 9.555C0.260415 9.39067 0.201904 9.19755 0.201904 9C0.201904 8.80245 0.260415 8.60933 0.370054 8.445L5.70305 0.445C5.7944 0.308084 5.91813 0.195832 6.06327 0.118205C6.20841 0.0405779 6.37046 -2.46193e-05 6.53505 1.11994e-08ZM7.07005 2L2.40405 9L7.07005 16H20.0001V2H7.07005ZM13.0001 7.586L15.8281 4.757L17.2431 6.172L14.4141 9L17.2431 11.828L15.8281 13.243L13.0001 10.414L10.1721 13.243L8.75705 11.828L11.5861 9L8.75705 6.172L10.1721 4.757L13.0001 7.586Z" fill="#858585" />
              </svg>
            </button>
            <button onClick={() => showNumber('/')} className='bg-cyan-100 rounded-md text-char btn'>/</button>
            <button onClick={() => showNumber('*')} className='bg-cyan-100 rounded-md text-char btn'>*</button>
          </div>
          <div className='mt-4 grid grid-cols-4 gap-5'>
            <button onClick={() => showNumber(7)} className='bg-white rounded-md text-bag btn p-4'>7</button>
            <button onClick={() => showNumber(8)} className='bg-white rounded-md text-bag btn'>8</button>
            <button onClick={() => showNumber(9)} className='bg-white rounded-md text-bag btn'>9</button>
            <button onClick={() => showNumber('-')} className='bg-cyan-100 rounded-md text-char btn'>-</button>
          </div>
          <div className='mt-4 grid grid-cols-4 gap-5'>
            <button onClick={() => showNumber(4)} className='bg-white rounded-md text-bag btn p-4'>4</button>
            <button onClick={() => showNumber(5)} className='bg-white rounded-md text-bag btn'>5</button>
            <button onClick={() => showNumber(6)} className='bg-white rounded-md text-bag btn'>6</button>
            <button onClick={() => showNumber('+')} className='bg-cyan-100 rounded-md text-char btn'>+</button>
          </div>
          <div className='mt-4 grid grid-cols-4 gap-5'>
            <button onClick={() => showNumber(1)} className='bg-white rounded-md text-bag btn p-4'>1</button>
            <button onClick={() => showNumber(2)} className='bg-white rounded-md text-bag btn'>2</button>
            <button onClick={() => showNumber(3)} className='bg-white rounded-md text-bag btn'>3</button>
            <button onClick={() => showNumber('%')} className='bg-white rounded-md text-bag btn'>%</button>
          </div>
          <div className='down-button mt-4 grid grid-cols-4 gap-5'>
            <button onClick={() => showNumber(0)} className='bg-white rounded-md text-bag btn p-4 col-span-2'>0</button>
            <button onClick={() => showNumber('.')} className='bg-white rounded-md text-bag btn p-4'>.</button>
            <button onClick={calculateValue} className='bg-white rounded-md text-bag btn p-4'>=</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
