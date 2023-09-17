import React from 'react';
import "./Register.scss";

// Function to format large numbers
function formatLargeNumber(number) {
  if (number >= 1e12) {
    return `${(number / 1e12).toFixed(1)}T`; // Trillion
  } else if (number >= 1e9) {
    return `${(number / 1e9).toFixed(1)}B`; // Billion
  } else if (number >= 1e6) {
    return `${(number / 1e6).toFixed(1)}M`; // Million
  } else if (number >= 1e4) {
    return `${(number / 1e3).toFixed(1)}K`; // Thousand
  } else {
    return number.toString();
  }
}

function Register({ total, denominations }) {
  const formattedTotal = formatLargeNumber(total);

  return (
    <div className='the-register'>
      <p className='total-amount-text'>
        <span className='dollar-sign'>$</span>  
        <span data-testid="total-display" className='actual-dollars'>{formattedTotal}</span>
      </p>
      <div className='all-denoms'>
      {Object.entries(denominations).map(([denomination, count]) => (
        <div className='denom-container' key={denomination}>
            <span className='denom-type'>${denomination} </span>
            <span className={count > 0 ? 'denom-count non-zero' : 'denom-count'}>x{count}</span>
        </div>
      ))}
      </div>

    </div>
  );
}

export default Register;