import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../components/Register";

describe("Register component", () => {
  it("should display the total amount correctly", () => {
    const total = 1000000; 
    const denominations = { 1: 10, 5: 20, 10: 15, 20: 5 };
    render(<Register total={total} denominations={denominations} />);
    
    const totalDisplay = screen.getByTestId("total-display");
    expect(totalDisplay).toHaveTextContent("1.0M");
  });

  it("should display denomination counts correctly", () => {
    const total = 50000; 
    const denominations = { 1: 10, 5: 20, 10: 15, 20: 5 };
    render(<Register total={total} denominations={denominations} />);
    
    expect(screen.getByTestId("denom-type-1")).toHaveTextContent("$1");
    expect(screen.getByTestId("denom-count-1")).toHaveTextContent("x10");
    
    expect(screen.getByTestId("denom-type-5")).toHaveTextContent("$5");
    expect(screen.getByTestId("denom-count-5")).toHaveTextContent("x20");
    
    expect(screen.getByTestId("denom-type-10")).toHaveTextContent("$10");
    expect(screen.getByTestId("denom-count-10")).toHaveTextContent("x15");
    
    expect(screen.getByTestId("denom-type-20")).toHaveTextContent("$20");
    expect(screen.getByTestId("denom-count-20")).toHaveTextContent("x5");
  });
});
