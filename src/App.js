import React, { useState } from "react";
import Register from "./components/Register";

import ChangeMoney from "./components/ChangeMoney";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import { errorToast, successToast } from "./services/toast";
import AddRemoveMoney from "./components/AddRemoveMoney";
import TransactionHistory from "./components/TransactionHistory";
import Footer from "./components/Footer";

function App() {
  const initialRegisterState = {
    total: 0,
    denominations: { 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 },
  };

  const [registerState, setRegisterState] = useState(initialRegisterState);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const addTransactionToHistory = (
    type,
    amount,
    changeInAmount,
    removedDenominations
  ) => {
    let transaction;
    if (removedDenominations) {
      transaction = {
        type,
        amount,
        changeInAmount,
        removedDenominations: removedDenominations,
        timestamp: new Date().toLocaleString(),
      };
    } else {
      transaction = {
        type,
        amount,
        changeInAmount,
        timestamp: new Date().toLocaleString(),
      };
    }
    setTransactionHistory([...transactionHistory, transaction]);
  };

  const addMoneyToRegister = (amountsToAdd) => {
    const updatedDenominations = { ...registerState.denominations };

    for (const denomination in amountsToAdd) {
      updatedDenominations[denomination] +=
        parseInt(amountsToAdd[denomination], 10) || 0;
    }

    const updatedTotal = calculateTotal(updatedDenominations);
    const changeInAmount = calculateTotal(amountsToAdd);

    setRegisterState({
      total: updatedTotal,
      denominations: updatedDenominations,
    });
    addTransactionToHistory("Added", updatedTotal, changeInAmount);
    successToast("Added money to the register!");
  };

  const removeMoneyFromRegister = (amountsToRemove) => {
    const updatedDenominations = { ...registerState.denominations };

    for (const denomination in amountsToRemove) {
      updatedDenominations[denomination] -=
        parseInt(amountsToRemove[denomination], 10) || 0;
    }

    const updatedTotal = calculateTotal(updatedDenominations);
    const changeInAmount = calculateTotal(amountsToRemove);

    setRegisterState({
      total: updatedTotal,
      denominations: updatedDenominations,
    });
    addTransactionToHistory(
      "Removed",
      calculateTotal(updatedDenominations),
      changeInAmount
    );
    successToast("Money removed from register!");
  };

  const calculateTotal = (denominations) => {
    let total = 0;
    for (const denomination in denominations) {
      total += denomination * (denominations[denomination] || 0);
    }
    return total;
  };

  const dispenseChange = (changeAmount) => {
    const availableDenominations = { ...registerState.denominations };
    const changeDenominations = {};
    const amountToRemove = changeAmount;

    const sortedDenominations = Object.keys(availableDenominations)
      .map(Number)
      .sort((a, b) => b - a);
    for (const denomination of sortedDenominations) {
      // Stop if change is fully dispensed
      if (changeAmount <= 0) break; 

      const count = Math.min(
        availableDenominations[denomination],
        Math.floor(changeAmount / denomination)
      );

      if (count > 0) {
        changeDenominations[denomination] = count;
        availableDenominations[denomination] -= count;
        changeAmount -= denomination * count;
      }
    }

    // Check if change can be made
    if (changeAmount > 0) {
      errorToast("Sorry, cannot make change with available denominations.");
      return;
    }

    // Store removed Denominations
    const removedDenominations = {};
    for (const denomination in changeDenominations) {
      removedDenominations[denomination] = changeDenominations[denomination];
    }

    setRegisterState({
      total: registerState.total - amountToRemove,
      denominations: availableDenominations,
    });

    addTransactionToHistory(
      "Change",
      registerState.total - amountToRemove,
      amountToRemove,
      removedDenominations
    );

    const dispensedChangeString = Object.keys(removedDenominations)
      .map(
        (denomination) =>
          `${removedDenominations[denomination]} x $${denomination}`
      )
      .join(", ");

    successToast(`Change Dispensed: ${dispensedChangeString}`);
  };

  return (
    <div className="App">
      <Register
        total={registerState.total}
        denominations={registerState.denominations}
      />
      <div className="all-actions-container">
        <AddRemoveMoney
          onAddMoney={addMoneyToRegister}
          onRemoveMoney={removeMoneyFromRegister}
          denominations={registerState.denominations}
        />
        <ChangeMoney
          onChangeMoney={dispenseChange}
          total={registerState.total}
          denominations={registerState.denominations}
        />
      </div>

      <TransactionHistory transactions={transactionHistory} />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
