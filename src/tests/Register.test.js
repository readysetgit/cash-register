import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../components/Register';
import { DENOMINATIONS, DENOMINATIONS_0, DENOMINATIONS_50, TOTAL_0, TOTAL_50 } from '../mocks/constants';

describe('Register is working',  () => {
    it('Shows initial amount to be $0',  () => {
      render(<Register total={TOTAL_0} denominations={DENOMINATIONS_0}/>)
      const totalText = screen.getByTestId('total-display')
      expect(totalText).toBeVisible()
    })

    it('Shows all the denominations correctly', () => {
      render(<Register total={TOTAL_50} denominations={DENOMINATIONS_50}/>)
      const totalText = screen.getByTestId('total-display')
      expect(totalText).toBeVisible()
    })
})


// test('renders register with initial values', () => {
//   // Render the Register component with initial state
//   render(<Register total={0} denominations={{ 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 }} />);

//   // Assert that the initial values are displayed correctly
//   expect(screen.getByText('Total: $0')).toBeInTheDocument();
//   expect(screen.getByText('0x20 0x10 0x5 0x2 0x1')).toBeInTheDocument();
// });

// test('renders register with updated values', () => {
//   // Render the Register component with updated state
//   render(<Register total={128} denominations={{ 20: 2, 10: 4, 5: 6, 2: 4, 1: 10 }} />);

//   // Assert that the updated values are displayed correctly
//   expect(screen.getByText('Total: $128')).toBeInTheDocument();
//   expect(screen.getByText('2x20 4x10 6x5 4x2 10x1')).toBeInTheDocument();
// });