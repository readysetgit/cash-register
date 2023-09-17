import React, { useState, useEffect } from "react";
import "./AddRemoveMoney.scss";
import { errorToast } from "../services/toast";
import { IconButton } from "@mui/material";
import AddBox from "@mui/icons-material/AddCircle";
import Remove from "@mui/icons-material/RemoveCircle";
import {formatLargeNumber} from "../utils/FormatLargerNumber";


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
    calculateTotalAmount();
  }, [amountsToAdd]);

  const handleChange = (event) => {
    let { name, value } = event.target;

    const newValue = Math.max(0, parseInt(value, 10));
    setAmountsToAdd((prevAmounts) => ({
      ...prevAmounts,
      [name]: newValue,
    }));

    calculateTotalAmount();
  };

  const handleIncrease = (denomination) => {
    setAmountsToAdd((prevAmounts) => ({
      ...prevAmounts,
      [denomination]: (parseInt(prevAmounts[denomination], 10) || 0) + 1,
    }));

    calculateTotalAmount();
  };

  const handleDecrease = (denomination) => {
    const currentValue = parseInt(amountsToAdd[denomination], 10);
    if (currentValue > 0) {
      setAmountsToAdd((prevAmounts) => ({
        ...prevAmounts,
        [denomination]: currentValue - 1,
      }));

      
      calculateTotalAmount();
    }
  };

  const calculateTotalAmount = () => {
    
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
                data-testid={`money-input-${denomination}`} 
                type="number"
                name={denomination}
                value={amountsToAdd[denomination]}
                onChange={(event) => {
                  handleChange(event);
                }}
                min="0" 
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

      <div className="bottom-section">
        <p className="total-money">${formatLargeNumber(totalAmount)}</p>
        <div className="actions-container">
          <button
            className="register-btn add-money-btn"
            disabled={Object.values(amountsToAdd).every((value) => !value)}
            onClick={handleAddMoney}
            data-testid="add-money-button" 
          >
            Add Money
          </button>
          <button
            className="register-btn remove-money-btn"
            disabled={Object.values(amountsToAdd).every((value) => !value)}
            onClick={handleRemoveMoney}
            data-testid="remove-money-button" 
          >
            Remove Money
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRemoveMoney;
