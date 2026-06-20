import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { DemoPage } from './DemoPage';

function wrap(ui: React.ReactElement) {
  return <HashRouter>{ui}</HashRouter>;
}

describe('DemoPage', () => {
  it('renders the demo board', () => {
    render(wrap(<DemoPage />));
    expect(screen.getByText('SLOP')).toBeInTheDocument();
  });
});
