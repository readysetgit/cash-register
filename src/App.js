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

function App() {
  const initialRegisterState = {
    total: 0,
    denominations: { 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 },
    // Todo: enums for each denomination
    // Todo: classes for each denom? 

  };

  const [registerState, setRegisterState] = useState(initialRegisterState);
  const [transactionHistory, setTransactionHistory] = useState([]); // State to store transaction history

  const addTransactionToHistory = (type, amount) => {
    const transaction = { type, amount, timestamp: new Date().toLocaleString() }; // Add a timestamp
    setTransactionHistory([...transactionHistory, transaction]);
  };

  const addMoneyToRegister = (amountsToAdd) => {
    const updatedDenominations = { ...registerState.denominations };

    for (const denomination in amountsToAdd) {
      updatedDenominations[denomination] += parseInt(amountsToAdd[denomination], 10);
    }

    const updatedTotal = calculateTotal(updatedDenominations);

    setRegisterState({ total: updatedTotal, denominations: updatedDenominations });
    addTransactionToHistory('Add Money', calculateTotal(updatedDenominations));
    successToast('Added money to the register!')
  };

  const removeMoneyFromRegister = (amountsToRemove) => {
    const updatedDenominations = { ...registerState.denominations };

    for (const denomination in amountsToRemove) {
      updatedDenominations[denomination] -= parseInt(amountsToRemove[denomination], 10);
    }

    const updatedTotal = calculateTotal(updatedDenominations);

    setRegisterState({ total: updatedTotal, denominations: updatedDenominations });
    addTransactionToHistory('Remove Money', calculateTotal(updatedDenominations));
    successToast('Money removed from register!')
  };

  const calculateTotal = (denominations) => {
    let total = 0;
    for (const denomination in denominations) {
      total += denomination * denominations[denomination];
    }
    return total;
  };

  const dispenseChange = (changeAmount) => {
    const availableDenominations = { ...registerState.denominations };
    const changeDenominations = {};
    const amountToRemove = changeAmount

    // Create an array of available denominations sorted in descending order
    const sortedDenominations = Object.keys(availableDenominations).map(Number).sort((a, b) => b - a);
    console.log(sortedDenominations)
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
    addTransactionToHistory('Dispense Change', amountToRemove);
    successToast('Change Dispensed!')

  };
  // Function to check if change can be made with available denominations
  // const canMakeChange = (denominations, changeAmount) => {
  //   // Create an array to track if a certain change amount can be made
  //   const dp = new Array(changeAmount + 1).fill(false);
  
  //   // Zero change can always be made
  //   dp[0] = true;
  
  //   // Iterate through each denomination
  //   for (const denomination in denominations) {
  //     let count = denominations[denomination]; 
      
  //     // Update dp array based on the current denomination
  //     for (let i = changeAmount; i >= denomination; i--) {
  //       if (dp[i - denomination] && count > 0) {
  //         dp[i] = true;
  //         count--;
  //       }
  //     }
  //   }
  
  //   // The changeAmount can be made if dp[changeAmount] is true
  //   return dp[changeAmount];
  // };

  return (
    <div className="App">
      {/* <h1>Cash Register Application</h1> */}
      <Register total={registerState.total} denominations={registerState.denominations} />
      {/* <AddMoney onAddMoney={addMoneyToRegister} />
      <RemoveMoney onRemoveMoney={removeMoneyFromRegister} denominations={registerState.denominations} /> */}
      <AddRemoveMoney onAddMoney={addMoneyToRegister} onRemoveMoney={removeMoneyFromRegister} denominations={registerState.denominations}/>
      <ChangeMoney onChangeMoney={dispenseChange} total={registerState.total} denominations={registerState.denominations} />
      <TransactionHistory transactions={transactionHistory} />
      <ToastContainer />

    </div>
  );
}

export default App;