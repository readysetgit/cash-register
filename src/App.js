import React, { useState } from 'react';
import Register from './components/Register';
import AddMoney from './components/AddMoney';
import RemoveMoney from './components/RemoveMoney';
import ChangeMoney from './components/ChangeMoney';
import "./App.scss";
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from './services/toast';
import AddRemoveMoney from './components/AddRemoveMoney';
import TransactionHistory from './components/TransactionHistory'; 
import Footer from './components/Footer';

function App() {
  const initialRegisterState = {
    total: 0,
    denominations: { 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 },
    // Todo: enums for each denomination
    // Todo: classes for each denom? 

  };

  const [registerState, setRegisterState] = useState(initialRegisterState);
  const [transactionHistory, setTransactionHistory] = useState([]); // State to store transaction history

  const addTransactionToHistory = (type, amount, changeInAmount) => {
    const transaction = { type, amount, changeInAmount, timestamp: new Date().toLocaleString() }; // Add a timestamp
    setTransactionHistory([...transactionHistory, transaction]);
  };

  const addMoneyToRegister = (amountsToAdd) => {
    const updatedDenominations = { ...registerState.denominations };

    for (const denomination in amountsToAdd) {
      updatedDenominations[denomination] += (parseInt(amountsToAdd[denomination], 10) || 0);
    }


    const updatedTotal = calculateTotal(updatedDenominations);
    const changeInAmount = calculateTotal(amountsToAdd)

    setRegisterState({ total: updatedTotal, denominations: updatedDenominations });
    addTransactionToHistory('Added', updatedTotal, changeInAmount);
    successToast('Added money to the register!')
  };

  const removeMoneyFromRegister = (amountsToRemove) => {
    const updatedDenominations = { ...registerState.denominations };

    for (const denomination in amountsToRemove) {
      updatedDenominations[denomination] -= (parseInt(amountsToRemove[denomination], 10) || 0);
    }

    const updatedTotal = calculateTotal(updatedDenominations);
    const changeInAmount = calculateTotal(amountsToRemove)

    setRegisterState({ total: updatedTotal, denominations: updatedDenominations });
    addTransactionToHistory('Removed', calculateTotal(updatedDenominations), changeInAmount);
    successToast('Money removed from register!')
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
    const amountToRemove = changeAmount

    // Create an array of available denominations sorted in descending order
    const sortedDenominations = Object.keys(availableDenominations).map(Number).sort((a, b) => b - a);
    for (const denomination of sortedDenominations) {
      if (changeAmount <= 0) break; // Stop if we've dispensed the required change
  
      const count = Math.min(availableDenominations[denomination], Math.floor(changeAmount / denomination));
  
      if (count > 0) {
        changeDenominations[denomination] = count;
        availableDenominations[denomination] -= count;
        changeAmount -= denomination * count;
      }
    }
  
    // Check if change can be made, and if not, handle the error case
    if (changeAmount > 0) {
      errorToast('Sorry, cannot make change with available denominations.')
      return;
    }

    // Update the state with the new cash register state
    setRegisterState({
      total: registerState.total - amountToRemove,
      denominations: availableDenominations, // Update denominations here
    });

    addTransactionToHistory('Change', registerState.total - amountToRemove, amountToRemove);
    successToast('Change Dispensed!')

  };

  return (
    <div className="App">
      {/* <h1>Cash Register Application</h1> */}
      <Register total={registerState.total} denominations={registerState.denominations} />
      {/* <AddMoney onAddMoney={addMoneyToRegister} />
      <RemoveMoney onRemoveMoney={removeMoneyFromRegister} denominations={registerState.denominations} /> */}
      <AddRemoveMoney onAddMoney={addMoneyToRegister} onRemoveMoney={removeMoneyFromRegister} denominations={registerState.denominations}/>
      <ChangeMoney onChangeMoney={dispenseChange} total={registerState.total} denominations={registerState.denominations} />
      <TransactionHistory transactions={transactionHistory} />
      <Footer />
      <ToastContainer />

    </div>
  );
}

export default App;