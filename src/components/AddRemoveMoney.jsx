import React, { useState } from 'react';
import './AddRemoveMoney.scss';
import {errorToast} from '../services/toast'


function AddRemoveMoney({ onAddMoney,onRemoveMoney, denominations }) {
  const [amountsToAdd, setAmountsToAdd] = useState({
    20: 0,
    10: 0,
    5: 0,
    2: 0,
    1: 0,
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const handleChange = (event) => {
    let { name, value } = event.target;

    const newValue = Math.max(0, parseInt(value, 10));
    setAmountsToAdd((prevAmounts) => ({
      ...prevAmounts,
      [name]: newValue,
    }));

    // Calculate the total amount
    calculateTotalAmount();
  };

  const handleIncrease = (denomination) => {
    setAmountsToAdd((prevAmounts) => ({
      ...prevAmounts,
      [denomination]: parseInt(prevAmounts[denomination], 10) + 1,
    }));

    // Calculate the total amount
    calculateTotalAmount();
  };

  const handleDecrease = (denomination) => {
    const currentValue = parseInt(amountsToAdd[denomination], 10);
    if (currentValue > 0) {
      setAmountsToAdd((prevAmounts) => ({
        ...prevAmounts,
        [denomination]: currentValue - 1,
      }));

      // Calculate the total amount
      calculateTotalAmount();
    }
  };

  const calculateTotalAmount = () => {
    // Calculate the total amount
    const calculatedTotal = Object.keys(amountsToAdd).reduce(
      (total, denomination) =>
        total + (amountsToAdd[denomination] || 0) * parseInt(denomination, 10),
      0
    );
    setTotalAmount(calculatedTotal);
  };

  const handleAddMoney = () => {
    onAddMoney(amountsToAdd);
    setAmountsToAdd({
      20: 0,
      10: 0,
      5: 0,
      2: 0,
      1: 0,
    });
    // Reset the total amount when money is added
    setTotalAmount(0);
  };

  const handleRemoveMoney = () => {
    for (const denomination in amountsToAdd) {
      if (amountsToAdd[denomination] > denominations[denomination]) {
        errorToast('You cannot remove more bills than available.')
        return;
      }
    }

    onRemoveMoney(amountsToAdd);
    setAmountsToAdd({
      20: 0,
      10: 0,
      5: 0,
      2: 0,
      1: 0,
    });
  };

  return (
    <div className="add-money-container">
      <h2 className="box-title">Select Denominations</h2>
      <div className="all-labels">
        {Object.keys(amountsToAdd).map((denomination) => (
          <div className="row-container" key={denomination}>
            <span className="x-bills">
              ${denomination} Bills

            </span>

            {/* <button
                className="btn-decrease"
                onClick={() => {
                  handleDecrease(denomination);
                }}
                disabled={amountsToAdd[denomination] === 0} // Disable when count is 0
              >
                -
              </button> */}
              <input
                className="count-input"
                type="number"
                name={denomination}
                value={amountsToAdd[denomination]}
                onChange={(event) => {
                  handleChange(event);
                }}
                min="0" // Prevent negative values
              />
              {/* <button
                className="btn-increase"
                onClick={() => {
                  handleIncrease(denomination);
                }}
              >
                +
              </button> */}
          </div>
        ))}
      </div>
      <div className='actions-container'>
        <button className="register-btn add-money-btn" disabled={Object.values(amountsToAdd).every((value) => !value )} onClick={handleAddMoney}>
            Add Money
        </button>
        <button className="register-btn remove-money-btn" disabled={Object.values(amountsToAdd).every((value) => !value )} onClick={handleRemoveMoney}>
            Remove Money
        </button>
      </div>

    </div>
  );
}

export default AddRemoveMoney;
