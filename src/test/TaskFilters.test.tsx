import { TaskFilters } from '@/components/task/TaskFilter/TaskFilters';
import { render, screen, fireEvent } from '@testing-library/react';

describe('TaskFilters Component', () => {
  const mockProps = {
    searchQuery: '',
    onSearchChange: vi.fn(),
    statusFilter: 'All' as const,
    onStatusChange: vi.fn(),
    priorityFilter: 'All' as const,
    onPriorityChange: vi.fn(),
    viewMode: 'card' as const,
    onViewModeChange: vi.fn(),
  };

  it('calls onSearchChange when typing in search input', () => {
    render(<TaskFilters {...mockProps} />);
    const input = screen.getByLabelText('Search tasks');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('test query');
  });

  it('calls onStatusChange when selecting a status', () => {
    render(<TaskFilters {...mockProps} />);
    const select = screen.getByLabelText('Filter by status');
    fireEvent.change(select, { target: { value: 'Completed' } });
    expect(mockProps.onStatusChange).toHaveBeenCalledWith('Completed');
  });

  it('calls onViewModeChange when clicking view toggle buttons', () => {
    render(<TaskFilters {...mockProps} />);
    const listViewBtn = screen.getByLabelText('List view');
    fireEvent.click(listViewBtn);
    expect(mockProps.onViewModeChange).toHaveBeenCalledWith('list');
  });
});
