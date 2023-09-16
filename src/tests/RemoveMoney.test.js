import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

// test('removes money correctly', async () => {
//   const mockRemoveMoney = jest.fn();
//   const { getByLabelText, getByText } = render(<RemoveMoney onRemoveMoney={mockRemoveMoney} />);

//   fireEvent.change(getByLabelText('Remove $20 Bills'), { target: { value: '1' } });
//   fireEvent.change(getByLabelText('Remove $10 Bills'), { target: { value: '4' } });
//   fireEvent.change(getByLabelText('Remove $5 Bills'), { target: { value: '3' } });
//   fireEvent.change(getByLabelText('Remove $2 Bills'), { target: { value: '10' } });

//   fireEvent.click(getByText('Remove Money'));

//   await waitFor(() => {
//     expect(mockRemoveMoney).toHaveBeenCalledWith({
//       20: 1,
//       10: 4,
//       5: 3,
//       2: 10,
//     });
//   });
// });
