import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddMoney from '../components/AddMoney';
import { DENOMINATIONS_0, DENOMINATIONS_50, TOTAL_0 } from '../mocks/constants';

// Create fixtures for creating functions that I created internally
// add those functions in my render

const addMoneyToRegister = (amountsToAdd) => {
  const updatedDenominations =  DENOMINATIONS_0;

  for (const denomination in amountsToAdd) {
    updatedDenominations[denomination] += parseInt(amountsToAdd[denomination], 10);
  }

  const updatedTotal = calculateTotal(updatedDenominations);

  return [updatedTotal, updatedDenominations]
};

const calculateTotal = (denominations) => {
  let total = 0;
  for (const denomination in denominations) {
    total += denomination * denominations[denomination];
  }
  return total;
};

describe('AddMoney works as intended', () => {
    it('Able to add $20 to the register', () => {
      render(<AddMoney onAddMoney={addMoneyToRegister}/>)
      const addbutton = screen.getByTestId('add-money-btn');
      expect(totalText).toBeVisible()
    })

    it('Able to add $10 to the register', () => {
      throw new Error()
    })

    it('Able to add $5 to the register', () => {
      throw new Error()
    })

    it('Able to add $2 to the register', () => {
      throw new Error()
    })

    it('Able to add $1 to the register', () => {
      throw new Error()
    })
})




// test('Should be able to add any denomination of money to the register', () => {
//     throw new Error()
// })

// test('Should not be able to add negative denomination to the register', () => {
//     throw new Error()
// })

// test('Should be able to add any denomination of money to the register', () => {
//     throw new Error()
// })

// test('Should be able to add any denomination of money to the register', () => {
//     throw new Error()
// })




// test('adds money correctly', async () => {
//   const mockAddMoney = jest.fn();
//   const { getByLabelText, getByText } = render(<AddMoney onAddMoney={mockAddMoney} />);

//   fireEvent.change(getByLabelText('Add $20 Bills'), { target: { value: '2' } });
//   fireEvent.change(getByLabelText('Add $10 Bills'), { target: { value: '4' } });
//   fireEvent.change(getByLabelText('Add $5 Bills'), { target: { value: '6' } });
//   fireEvent.change(getByLabelText('Add $2 Bills'), { target: { value: '4' } });
//   fireEvent.change(getByLabelText('Add $1 Bills'), { target: { value: '10' } });

//   fireEvent.click(getByText('Add Money'));

//   await waitFor(() => {
//     expect(mockAddMoney).toHaveBeenCalledWith({
//       20: 2,
//       10: 4,
//       5: 6,
//       2: 4,
//       1: 10,
//     });
//   });
// });
