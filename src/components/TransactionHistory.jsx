import React from 'react';
import "./TransactionHistory.scss";
import Download from "@mui/icons-material/Download";
import { IconButton, Button } from "@mui/material";

function downloadCSV(transactions) {
  // Create a CSV string with a header row
  let csvContent = "Type,Amount,Date,Change Dispensed\n";

  // Loop through transactions and add each one to the CSV
  transactions.forEach((transaction) => {
    const { type, changeInAmount, timestamp, removedDenominations } = transaction;
    const formattedTimestamp = formatTimestamp(timestamp);
    const changeDispensed = type === 'Change' && removedDenominations
      ? formatRemovedDenominations(removedDenominations)
      : '';
    csvContent += `${type},${changeInAmount},${formattedTimestamp},"${changeDispensed}"\n`;
  });

  // Create a Blob containing the CSV data
  const blob = new Blob([csvContent], { type: "text/csv" });

  // Create a download link and trigger the download
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "transactions.csv";
  link.click();
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

function TransactionHistory({ transactions }) {
  // Reverse the transactions array to display them in reverse order
  const reversedTransactions = [...transactions].reverse();

  return (
    <div className="transaction-history">
      <div className="history-header">
        <h2>Transactions</h2>
        <Button variant="filled" className="download-icon" disabled={reversedTransactions.length < 1} startIcon={<Download />} onClick={() => downloadCSV(transactions)}>
          Download
        </Button>
      </div>
      <div className="history-body">
        {reversedTransactions.length === 0 ? (
          <div className="no-transactions">No past transactions</div>
        ) : (
          <div className="all-transactions">
            {reversedTransactions.map((transaction, index) => (
              <div
                className={`transaction-pane ${getTransactionClassName(
                  transaction.type
                )}`}
                key={index}
              >
                <span
                  className={`transaction-type ${getAmountColorClass(
                    transaction.type
                  )}`}
                >
                  {transaction.type}
                </span>
                <div className="money-time">
                  <span
                    className={`transaction-amount ${getAmountColorClass(
                      transaction.type
                    )}`}
                  >
                    ${transaction.changeInAmount}
                  </span>
                  {transaction.type === 'Change' && transaction.removedDenominations && (
                    <span className="change-dispensed">
                      ( {formatRemovedDenominations(transaction.removedDenominations)} )
                    </span>
                  )}
                  <span className="transaction-timestamp">
                    {formatTimestamp(transaction.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Define a function to format removed denominations
function formatRemovedDenominations(removedDenominations) {
  return Object.keys(removedDenominations).map((denomination) => (
    `${removedDenominations[denomination]} x $${denomination}`
  )).join(', ');
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

// Define a function to get the amount color class based on its type
function getAmountColorClass(type) {
  switch (type) {
    case 'Added':
      return 'added-amount';
    case 'Removed':
      return 'removed-amount';
    case 'Change':
      return 'changed-amount';
    default:
      return '';
  }
}

export default TransactionHistory;
