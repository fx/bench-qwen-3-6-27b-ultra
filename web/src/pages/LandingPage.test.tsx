import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';

function wrap(ui: React.ReactElement) {
  return <HashRouter>{ui}</HashRouter>;
}

describe('LandingPage', () => {
  it('renders the landing page hero', () => {
    render(wrap(<LandingPage />));
    expect(screen.getByText(/fully autonomous slop engine/i)).toBeInTheDocument();
  });

  it('renders the demo CTA buttons', () => {
    render(wrap(<LandingPage />));
    const buttons = screen.getAllByRole('button', { name: /try the demo/i });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });
});
