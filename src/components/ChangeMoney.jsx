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
      <h2 className="box-title">Request Change</h2>
      <div className="row-container">
        <span className="x-bills large">$</span>
        <input
          className="count-input"
          type="number"
          value={changeAmount}
          onChange={handleChange}
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





