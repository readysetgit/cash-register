import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddRemoveMoney from "../components/AddRemoveMoney";

describe("AddRemoveMoney component works", () => {
  it("should add $1 and then remove $1", async () => {
    const mockAddMoney = jest.fn();
    const mockRemoveMoney = jest.fn();

    render(
      <AddRemoveMoney
        onAddMoney={mockAddMoney}
        onRemoveMoney={mockRemoveMoney}
        denominations={{
          20: 10,
          10: 10,
          5: 10,
          2: 10,
          1: 10,
        }}
      />
    );

    // Add $1
    await fireEvent.change(screen.getByTestId("money-input-1"), {
      target: { value: "1" },
    });
    await fireEvent.click(screen.getByTestId("add-money-button"));

    // Remove $1
    await fireEvent.change(screen.getByTestId("money-input-1"), {
      target: { value: "1" },
    });
    await fireEvent.click(screen.getByTestId("remove-money-button"));

    expect(mockAddMoney).toHaveBeenCalledWith({ 1: 1, 2: 0, 5: 0, 10: 0, 20: 0 });
    expect(mockRemoveMoney).toHaveBeenCalledWith({ 1: 1, 2: 0, 5: 0, 10: 0, 20: 0 });
  });

  it("should add $2 and then remove $2", async () => {
    const mockAddMoney = jest.fn();
    const mockRemoveMoney = jest.fn();

    render(
      <AddRemoveMoney
        onAddMoney={mockAddMoney}
        onRemoveMoney={mockRemoveMoney}
        denominations={{
          20: 10,
          10: 10,
          5: 10,
          2: 10,
          1: 10,
        }}
      />
    );

    // Add $1
    await fireEvent.change(screen.getByTestId("money-input-2"), {
      target: { value: "1" },
    });
    await fireEvent.click(screen.getByTestId("add-money-button"));

    // Remove $1
    await fireEvent.change(screen.getByTestId("money-input-2"), {
      target: { value: "1" },
    });
    await fireEvent.click(screen.getByTestId("remove-money-button"));

    expect(mockAddMoney).toHaveBeenCalledWith({ 1: 0, 2: 1, 5: 0, 10: 0, 20: 0 });
    expect(mockRemoveMoney).toHaveBeenCalledWith({ 1: 0, 2: 1, 5: 0, 10: 0, 20: 0 });
  });

  it("should add $5 and then remove $5", async () => {
    const mockAddMoney = jest.fn();
    const mockRemoveMoney = jest.fn();

    render(
      <AddRemoveMoney
        onAddMoney={mockAddMoney}
        onRemoveMoney={mockRemoveMoney}
        denominations={{
          20: 10,
          10: 10,
          5: 10,
          2: 10,
          1: 10,
        }}
      />
    );

    // Add $1
    await fireEvent.change(screen.getByTestId("money-input-5"), {
      target: { value: "1" },
    });
    await fireEvent.click(screen.getByTestId("add-money-button"));

    // Remove $1
    await fireEvent.change(screen.getByTestId("money-input-5"), {
      target: { value: "1" },
    });
    await fireEvent.click(screen.getByTestId("remove-money-button"));

    expect(mockAddMoney).toHaveBeenCalledWith({ 1: 0, 2: 0, 5: 1, 10: 0, 20: 0 });
    expect(mockRemoveMoney).toHaveBeenCalledWith({ 1: 0, 2: 0, 5: 1, 10: 0, 20: 0 });
  });

  it("should add $10 and then remove $10", async () => {
    const mockAddMoney = jest.fn();
    const mockRemoveMoney = jest.fn();

    render(
      <AddRemoveMoney
        onAddMoney={mockAddMoney}
        onRemoveMoney={mockRemoveMoney}
        denominations={{
          20: 10,
          10: 10,
          5: 10,
          2: 10,
          1: 10,
        }}
      />
    );

    // Add $1
    await fireEvent.change(screen.getByTestId("money-input-10"), {
      target: { value: "1" },
    });
    await fireEvent.click(screen.getByTestId("add-money-button"));

    // Remove $1
    await fireEvent.change(screen.getByTestId("money-input-10"), {
      target: { value: "1" },
    });
    await fireEvent.click(screen.getByTestId("remove-money-button"));

    expect(mockAddMoney).toHaveBeenCalledWith({ 1: 0, 2: 0, 5: 0, 10: 1, 20: 0 });
    expect(mockRemoveMoney).toHaveBeenCalledWith({ 1: 0, 2: 0, 5: 0, 10: 1, 20: 0 });
  });

  it("should add $20 and then remove $20", async () => {
    const mockAddMoney = jest.fn();
    const mockRemoveMoney = jest.fn();

    render(
      <AddRemoveMoney
        onAddMoney={mockAddMoney}
        onRemoveMoney={mockRemoveMoney}
        denominations={{
          20: 10,
          10: 10,
          5: 10,
          2: 10,
          1: 10,
        }}
      />
    );

    // Add $1
    await fireEvent.change(screen.getByTestId("money-input-20"), {
      target: { value: "1" },
    });
    await fireEvent.click(screen.getByTestId("add-money-button"));

    // Remove $1
    await fireEvent.change(screen.getByTestId("money-input-20"), {
      target: { value: "1" },
    });
    await fireEvent.click(screen.getByTestId("remove-money-button"));

    expect(mockAddMoney).toHaveBeenCalledWith({ 1: 0, 2: 0, 5: 0, 10: 0, 20: 1 });
    expect(mockRemoveMoney).toHaveBeenCalledWith({ 1: 0, 2: 0, 5: 0, 10: 0, 20: 1 });
  });

  it("should add 5 bills of each denomination", async () => {
    const mockAddMoney = jest.fn();
    const mockRemoveMoney = jest.fn();

    render(
      <AddRemoveMoney
        onAddMoney={mockAddMoney}
        onRemoveMoney={mockRemoveMoney}
        denominations={{
          20: 10,
          10: 10,
          5: 10,
          2: 10,
          1: 10,
        }}
      />
    );

    // Add 5 bills of each denomination
    await fireEvent.change(screen.getByTestId("money-input-20"), {
      target: { value: "5" },
    });
    await fireEvent.change(screen.getByTestId("money-input-10"), {
      target: { value: "5" },
    });
    await fireEvent.change(screen.getByTestId("money-input-5"), {
      target: { value: "5" },
    });
    await fireEvent.change(screen.getByTestId("money-input-2"), {
      target: { value: "5" },
    });
    await fireEvent.change(screen.getByTestId("money-input-1"), {
      target: { value: "5" },
    });
    await fireEvent.click(screen.getByTestId("add-money-button"));

    expect(mockAddMoney).toHaveBeenCalledWith({
      1: 5,
      2: 5,
      5: 5,
      10: 5,
      20: 5,
    });
  });

  it("Make a call to remove 5 bills of $20 after adding 3 bills of $20", async () => {
    const mockAddMoney = jest.fn();
    const mockRemoveMoney = jest.fn();

    render(
      <AddRemoveMoney
        onAddMoney={mockAddMoney}
        onRemoveMoney={mockRemoveMoney}
        denominations={{
          20: 10,
          10: 10,
          5: 10,
          2: 10,
          1: 10,
        }}
      />
    );

    // Add 3 bills of $20
    await fireEvent.change(screen.getByTestId("money-input-20"), {
      target: { value: "3" },
    });
    await fireEvent.click(screen.getByTestId("add-money-button"));

    // Try to remove 5 bills of $20 
    await fireEvent.change(screen.getByTestId("money-input-20"), {
      target: { value: "5" },
    });
    await fireEvent.click(screen.getByTestId("remove-money-button"));

    expect(mockAddMoney).toHaveBeenCalledWith({ 1: 0, 2: 0, 5: 0, 10: 0, 20: 3 });
    expect(mockRemoveMoney).toHaveBeenCalledWith({ 1: 0, 2: 0, 5: 0, 10: 0, 20: 5 });
  });
});
