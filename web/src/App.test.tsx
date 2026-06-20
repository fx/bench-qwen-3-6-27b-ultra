import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders the landing page by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Slop Simulator' })).toBeInTheDocument();
  });
});
