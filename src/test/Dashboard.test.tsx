import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Dashboard } from '../views/Dashboard/Dashboard';

// Mocking dnd as it's hard to test in jsdom
vi.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }: any) => <div>{children}</div>,
  Droppable: ({ children }: any) => children({
    droppableProps: {},
    innerRef: vi.fn(),
    placeholder: null
  }, {}),
  Draggable: ({ children }: any) => children({
    draggableProps: {},
    dragHandleProps: {},
    innerRef: vi.fn()
  }, { isDragging: false }),
}));

describe('Dashboard View', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the dashboard with empty state', () => {
    render(<Dashboard />);
    expect(screen.getByText('TaskFlow')).toBeInTheDocument();
    expect(screen.getByText('No tasks found. Start by creating one!')).toBeInTheDocument();
  });

  it('opens the modal when clicking "New Task"', () => {
    render(<Dashboard />);
    const newTaskBtn = screen.getByText('New Task');
    fireEvent.click(newTaskBtn);
    expect(screen.getByText('New Task', { selector: 'h2' })).toBeInTheDocument();
  });

  it('can create a new task', () => {
    render(<Dashboard />);
    
    // Open modal
    fireEvent.click(screen.getByText('New Task'));
    
    // Fill form
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'My New Task' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Task Description' } });
    
    // Submit
    fireEvent.click(screen.getByText('Create Task'));
    
    // Check if task appears
    expect(screen.getByText('My New Task')).toBeInTheDocument();
    expect(screen.getByText('Task Description')).toBeInTheDocument();
  });
});
