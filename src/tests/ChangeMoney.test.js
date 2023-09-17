import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ChangeMoney from "../components/ChangeMoney";

describe("ChangeMoney component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not be able to click dispense change button if amount is 0", async () => {
    const onDispenseChange = jest.fn();

    render(<ChangeMoney onDispenseChange={onDispenseChange} total={0} />);

    const dispenseChangeButton = screen.getByTestId("dispense-change-button");
    await fireEvent.click(dispenseChangeButton);

    expect(onDispenseChange).not.toHaveBeenCalled();
  });
});
