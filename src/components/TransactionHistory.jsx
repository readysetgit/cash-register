// TransactionHistory.js
import React from 'react';
import "./TransactionHistory.scss";

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function TransactionHistory({ transactions }) {
    return (
      <div className="transaction-history">
        <h2>Transaction History</h2>
        <div className="all-transactions">
          {transactions.map((transaction, index) => (
            <div className={`transaction-pane ${getTransactionClassName(transaction.type)}`} key={index}>
              <span className="transaction-type">{transaction.type}</span>
              <div className="money-time">
                <span className="transaction-amount">${transaction.amount}</span>
                <span className="transaction-timestamp">{formatTimestamp(transaction.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Define a function to get the transaction class name based on its type
  function getTransactionClassName(type) {
    switch (type) {
      case 'Added':
        return 'added-transaction';
      case 'Removed':
        return 'removed-transaction';
      case 'Change':
        return 'changed-transaction';
      default:
        return '';
    }
  }
  
  export default TransactionHistory;
