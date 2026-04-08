import { render, screen } from '@testing-library/react';
import { Badge } from '../components/common/Badge/Badge';

describe('Badge Component', () => {
  it('renders children correctly', () => {
    render(<Badge>High</Badge>);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    const { container } = render(<Badge variant="success">Low</Badge>);
    const badgeElement = container.firstChild as HTMLElement;
    expect(badgeElement.className).toContain('badge-success');
  });
});
