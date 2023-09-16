import React, { useState } from 'react';
import './RemoveMoney.scss';
import {errorToast} from '../services/toast'
function RemoveMoney({ onRemoveMoney, denominations }) {
  const [amountsToRemove, setAmountsToRemove] = useState({
    20: 0,
    10: 0,
    5: 0,
    2: 0,
    1: 0,
  });

  const handleChange = (event) => {
    let { name, value } = event.target;

    // Prevent NAN values
    if (!value) {
        value = 0
    }
    // Prevent negative values
    const newValue = Math.max(0, parseInt(value, 10));

    setAmountsToRemove({ ...amountsToRemove, [name]: newValue });
  };

  const handleRemoveMoney = () => {
    for (const denomination in amountsToRemove) {
      if (amountsToRemove[denomination] > denominations[denomination]) {
        errorToast('You cannot remove more bills than available.')
        return;
      }
    }

    onRemoveMoney(amountsToRemove);
    setAmountsToRemove({
      20: 0,
      10: 0,
      5: 0,
      2: 0,
      1: 0,
    });
  };

  return (
    <div className="add-money-container">
      <div className="all-labels">
        {Object.keys(amountsToRemove).map((denomination) => (
          <div className="row-container" key={denomination}>
             <span className="x-bills">${denomination} Bills</span> 
              {/* <button
                className="btn-decrease"
                onClick={() => handleChange({ target: { name: denomination, value: Math.max(0, amountsToRemove[denomination] - 1) } })}
                disabled={amountsToRemove[denomination] === 0}
              >
                -
              </button> */}
              <input
                className="count-input"
                type="number"
                name={denomination}
                value={amountsToRemove[denomination]}
                onChange={handleChange}
                min="0"
              />
              {/* <button
                className="btn-increase"
                onClick={() => handleChange({ target: { name: denomination, value: parseInt(amountsToRemove[denomination], 10) + 1 } })}
              >
                +
              </button> */}
          </div>
        ))}
      </div>
      <button className="register-btn" disabled={Object.values(amountsToRemove).every((value) => value === 0)} onClick={handleRemoveMoney}>
        Remove Money
      </button>
    </div>
  );
}

export default RemoveMoney;