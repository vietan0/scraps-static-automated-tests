import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { fetchIss as mockFetchIss } from './api';
import GetIss from './GetIss';

vi.mock('./api');
vi.mocked(mockFetchIss).mockResolvedValue({
  name: 'iss me mario',
  id: '25533',
  latitude: -104.82,
});

test('api works', async () => {
  render(<GetIss />);
  const fetchBtn = screen.getByText('Fetch ISS');

  fireEvent.click(fetchBtn);
  expect(mockFetchIss).toHaveBeenCalledOnce();
  await waitFor(() => {
    const name = screen.getByText(/name/i);
    const id = screen.getByText(/id/i);
    const latitude = screen.getByText(/latitude/i);

    expect(name).toHaveTextContent(/mario/i);
    expect(id).toHaveTextContent('25533');
    expect(latitude).toHaveTextContent(/-104.82/);
  });
});
