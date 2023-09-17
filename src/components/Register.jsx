import React from "react";
import "./Register.scss";
import {formatLargeNumber} from "../utils/FormatLargerNumber.js"
// Function to format large numbers
// function formatLargeNumber(number) {
//   if (number >= 1e12) {
//     return `${(number / 1e12).toFixed(1)}T`; // Trillion
//   } else if (number >= 1e9) {
//     return `${(number / 1e9).toFixed(1)}B`; // Billion
//   } else if (number >= 1e6) {
//     return `${(number / 1e6).toFixed(1)}M`; // Million
//   } else if (number >= 1e4) {
//     return `${(number / 1e3).toFixed(1)}K`; // Thousand
//   } else {
//     return number.toString();
//   }
// }

function Register({ total, denominations }) {
  const formattedTotal = formatLargeNumber(total);

  return (
    <React.Fragment>
      <h1 className="the-cash-register">THE CASH REGISTER</h1>
      <div className="the-register">
        <div>
          <h1 className="text-saying-total">TOTAL</h1>
          <p className="total-amount-text">
            <span className="dollar-sign">$</span>
            <span data-testid="total-display" className="actual-dollars">
              {formattedTotal}
            </span>
          </p>
        </div>
        <div className="all-denoms">
          {Object.entries(denominations).map(([denomination, count]) => (
            <div className="denom-container" key={denomination}>
              <span data-testid={`denom-type-${denomination}`} className="denom-type">${denomination}</span>
              <span
                data-testid={`denom-count-${denomination}`}
                className={count > 0 ? "denom-count non-zero" : "denom-count"}
              >
                x{count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
