// TransactionHistory.js
import React from 'react';
import "./TransactionHistory.scss";

function TransactionHistory({ transactions }) {
  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <span className="transaction-type">{transaction.type}</span>
            <span className="transaction-amount">${transaction.amount}</span>
            <span className="transaction-timestamp">{transaction.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;