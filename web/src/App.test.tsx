import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders the app shell', () => {
    render(<App />);
    // Default route should show landing page
    expect(screen.getByText(/fully autonomous slop engine/i)).toBeInTheDocument();
  });
});
