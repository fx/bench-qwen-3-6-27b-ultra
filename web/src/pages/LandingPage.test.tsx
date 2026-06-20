import { render, screen } from '@testing-library/react';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('renders the landing page heading', () => {
    render(<LandingPage />);
    expect(screen.getByRole('heading', { name: 'Slop Simulator' })).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<LandingPage />);
    expect(screen.getByText(/fully autonomous slop engine/)).toBeInTheDocument();
  });
});
