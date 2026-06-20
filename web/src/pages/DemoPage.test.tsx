import { render, screen } from '@testing-library/react';
import { DemoPage } from './DemoPage';

describe('DemoPage', () => {
  it('renders the demo page heading', () => {
    render(<DemoPage />);
    expect(screen.getByRole('heading', { name: 'Demo' })).toBeInTheDocument();
  });

  it('renders the demo description', () => {
    render(<DemoPage />);
    expect(screen.getByText(/agentic project tracker/)).toBeInTheDocument();
  });
});
