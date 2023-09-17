import React, { useState, useEffect } from "react";
import "./AddRemoveMoney.scss";
import { errorToast } from "../services/toast";
import { IconButton } from "@mui/material";
import AddBox from "@mui/icons-material/AddCircle";
import Remove from "@mui/icons-material/RemoveCircle";

// Function to format large numbers
function formatLargeNumber(number) {
  if (number >= 1e12) {
    return `${(number / 1e12).toFixed(1)}T`; // Trillion
  } else if (number >= 1e9) {
    return `${(number / 1e9).toFixed(1)}B`; // Billion
  } else if (number >= 1e6) {
    return `${(number / 1e6).toFixed(1)}M`; // Million
  } else if (number >= 1e5) {
    return `${(number / 1e3).toFixed(1)}K`; // Thousand
  } else {
    return number.toString();
  }
}

function AddRemoveMoney({ onAddMoney, onRemoveMoney, denominations }) {
  const [amountsToAdd, setAmountsToAdd] = useState({
    20: 0,
    10: 0,
    5: 0,
    2: 0,
    1: 0,
  });

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate the total amount whenever amountsToAdd changes
    calculateTotalAmount();
  }, [amountsToAdd]);

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
      [denomination]: (parseInt(prevAmounts[denomination], 10) || 0) + 1,
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
        errorToast("You cannot remove more bills than available.");
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
      <div className="top-section">
        <h2 className="box-title">Select Denominations</h2>
        <div className="all-labels">
          {Object.keys(amountsToAdd).map((denomination) => (
            <div className="row-container" key={denomination}>
              <span className="x-bills">${denomination} Bills</span>

              <IconButton
                aria-label="delete"
                className="decrease-btn"
                onClick={() => {
                  handleDecrease(denomination);
                }}
                disabled={!amountsToAdd[denomination]}
              >
                <Remove />
              </IconButton>
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
              <IconButton
                aria-label="delete"
                className="increase-btn"
                onClick={() => {
                  handleIncrease(denomination);
                }}
              >
                <AddBox />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      <div class="bottom-section">
        <p className="total-money">${formatLargeNumber(totalAmount)}</p>
        <div className="actions-container">
          <button
            className="register-btn add-money-btn"
            disabled={Object.values(amountsToAdd).every((value) => !value)}
            onClick={handleAddMoney}
          >
            Add Money
          </button>
          <button
            className="register-btn remove-money-btn"
            disabled={Object.values(amountsToAdd).every((value) => !value)}
            onClick={handleRemoveMoney}
          >
            Remove Money
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRemoveMoney;
