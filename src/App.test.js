import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

import { successToast, errorToast } from "./services/toast";

jest.mock("./services/toast", () => ({
  successToast: jest.fn(),
  errorToast: jest.fn(),
}));

describe("App component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display an error toast after adding 3 bills of $20 and trying to remove 5 bills of $20", async () => {
    render(<App />);

    
    const addMoneyInput20 = screen.getAllByTestId("money-input-20");
    const addButton = screen.getByText("Add Money");
    await fireEvent.change(addMoneyInput20[0], { target: { value: "3" } });
    await fireEvent.click(addButton);

    
    const removeMoneyInput20 = screen.getAllByTestId("money-input-20");
    const removeButton = screen.getByText("Remove Money");
    await fireEvent.change(removeMoneyInput20[0], { target: { value: "5" } });
    await fireEvent.click(removeButton);

    expect(errorToast).toHaveBeenCalledWith(
      "You cannot remove more bills than available."
    );
  });

  it("should display a success toast after trying to add $20", async () => {
    render(<App />);

    const addMoneyInput20 = screen.getAllByTestId("money-input-20");
    const addButton = screen.getByText("Add Money");

    
    await fireEvent.change(addMoneyInput20[0], { target: { value: "1" } });
    await fireEvent.click(addButton);

    
    expect(successToast).toHaveBeenCalledWith("Added money to the register!");
  });

  it("should display a success toast after adding $20 and removing $20", async () => {
    render(<App />);

    
    const addMoneyInput20 = screen.getAllByTestId("money-input-20");
    const addButton = screen.getByText("Add Money");
    await fireEvent.change(addMoneyInput20[0], { target: { value: "1" } });
    await fireEvent.click(addButton);

    
    const removeMoneyInput20 = screen.getAllByTestId("money-input-20");
    const removeButton = screen.getByText("Remove Money");
    await fireEvent.change(removeMoneyInput20[0], { target: { value: "1" } });
    await fireEvent.click(removeButton);

    
    expect(successToast).toHaveBeenCalledWith("Money removed from register!");
  });

  it("should display an error toast after trying to remove $20 when there is no $20 bill", async () => {
    render(<App />);

   
    const removeMoneyInput20 = screen.getAllByTestId("money-input-20");
    const removeButton = screen.getByText("Remove Money");
    await fireEvent.change(removeMoneyInput20[0], { target: { value: "1" } });
    await fireEvent.click(removeButton);

    
    expect(errorToast).toHaveBeenCalledWith("You cannot remove more bills than available.");
  });

  it("should dispense change and display success toast with dispensed change string", async () => {
    render(<App />);

    
    const addMoneyInput10 = screen.getAllByTestId("money-input-10");
    const addMoneyInput5 = screen.getAllByTestId("money-input-5");
    const addButton = screen.getByText("Add Money");

    await fireEvent.change(addMoneyInput10[0], { target: { value: "10" } });
    await fireEvent.change(addMoneyInput5[0], { target: { value: "10" } });
    await fireEvent.click(addButton);

    // Get the input field and button for dispensing change
    const changeAmountInput = screen.getByTestId("change-amount-input");
    const changeButton = screen.getByText("Dispense Change");

    // Fill in the input field and click the Dispense Change button
    await fireEvent.change(changeAmountInput, { target: { value: "25" } });
    await fireEvent.click(changeButton);

    
    expect(successToast).toHaveBeenCalledTimes(2); 
    expect(successToast).toHaveBeenNthCalledWith(
      1,
      "Added money to the register!"
    );
    expect(successToast).toHaveBeenNthCalledWith(
      2,
      "Change Dispensed: 1 x $5, 2 x $10"
    );
  });

  it("should display an error toast when change cannot be dispensed", async () => {
    render(<App />);

    
    const changeAmountInput = screen.getByTestId("change-amount-input");
    const changeButton = screen.getByText("Dispense Change");

    
    await fireEvent.change(changeAmountInput, { target: { value: "7" } });
    await fireEvent.click(changeButton);

    
    expect(errorToast).toHaveBeenCalledWith(
      "Sorry, cannot make change with available denominations."
    );
  });


});
