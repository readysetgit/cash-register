import React, { useState } from 'react';
import './ChangeMoney.scss';

function ChangeMoney({ onChangeMoney, total }) {
  const [changeAmount, setChangeAmount] = useState(0);

  const handleChange = (event) => {
    // Ensure that the input value is rounded down to the nearest whole number
    const newValue = Math.max(0, Math.floor(event.target.value));
    setChangeAmount(newValue);
  };

  const handleDispenseChange = () => {
    onChangeMoney(changeAmount); // No need to parse as it's already a number
    setChangeAmount(0);
  };

  return (
    <div className="change-money-container">
      <h2 className="box-title">Request Change</h2>
      <div className="row-container">
        <span className="x-bills large">$</span>
        <input
          className="count-input"
          type="number"
          value={changeAmount}
          onChange={handleChange}
          step="1" // Enforce whole number values
        />
      </div>
      <button
        className="register-btn"
        disabled={!changeAmount}
        onClick={handleDispenseChange}
      >
        Dispense Change
      </button>
    </div>
  );
}

export default ChangeMoney;





