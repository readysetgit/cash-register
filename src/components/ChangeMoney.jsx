import React, { useState } from 'react';
import './ChangeMoney.scss';

function ChangeMoney({ onChangeMoney, total }) {
  const [changeAmount, setChangeAmount] = useState(0);

  const handleChange = (event) => {
    setChangeAmount(event.target.value);
  };

  const handleDispenseChange = () => {
    onChangeMoney(parseInt(changeAmount, 10));
    setChangeAmount(0);
  };

  return (
    <div className="change-money-container">
      <h2 className="box-title">Request Change</h2>
      <div class="row-container">
          <span className="x-bills large">$</span>
          <input className="count-input" type="number" value={changeAmount} onChange={handleChange} />
      </div>
      <button className="register-btn" disabled={changeAmount === 0} onClick={handleDispenseChange}>Dispense Change</button>
    </div>
  );
}

export default ChangeMoney;