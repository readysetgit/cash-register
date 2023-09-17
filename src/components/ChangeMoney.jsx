import React, { useState } from 'react';
import './ChangeMoney.scss';

function ChangeMoney({ onChangeMoney, total }) {
  const [changeAmount, setChangeAmount] = useState(0);

  const handleChange = (event) => {
    let { name, value } = event.target;
    const newValue = Math.max(0, parseInt(value, 10));

    setChangeAmount(newValue);
  };

  const handleDispenseChange = () => {
    onChangeMoney(changeAmount); 
    setChangeAmount(0);
  };

  return (
    <div className="change-money-container">
      <div className='p20'>
        <h2 className="box-title">Request Change</h2>
        <div className="row-container">
          <span className="x-bills large">$</span>
          <input
            className="count-input"
            type="number"
            data-testid="change-amount-input"
            value={changeAmount}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="change-money-bottom">
        <button
          data-testid="dispense-change-button"
          className="register-btn dispense-change-btn"
          disabled={!changeAmount}
          onClick={handleDispenseChange}
        >
          Dispense Change
        </button>
      </div>

    </div>
  );
}

export default ChangeMoney;





