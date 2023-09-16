import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

// test('dispenses change correctly', async () => {
//   const mockChangeMoney = jest.fn();
//   const { getByLabelText, getByText } = render(
//     <ChangeMoney onChangeMoney={mockChangeMoney} total={32} />
//   );

//   fireEvent.change(getByLabelText('Change Amount'), { target: { value: '11' } });

//   fireEvent.click(getByText('Dispense Change'));

//   await waitFor(() => {
//     expect(mockChangeMoney).toHaveBeenCalledWith(11);
//   });
// });

// test('raises error for unmakeable change', async () => {
//   const mockChangeMoney = jest.fn();
//   const { getByLabelText, getByText } = render(
//     <ChangeMoney onChangeMoney={mockChangeMoney} total={32} />
//   );

//   fireEvent.change(getByLabelText('Change Amount'), { target: { value: '14' } });

//   fireEvent.click(getByText('Dispense Change'));

//   await waitFor(() => {
//     expect(mockChangeMoney).toHaveBeenCalledWith(14);
//     expect(getByText('Sorry, cannot make change.')).toBeInTheDocument();
//   });
// });
