import React from 'react';
import "./Register.scss";
function Register({ total, denominations }) {
  return (
    <div className='the-register'>
      <p className='total-amount-text'>
        <span className='dollar-sign'>$</span>  
        <span data-testid="total-display" className='actual-dollars'>{total}</span>
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