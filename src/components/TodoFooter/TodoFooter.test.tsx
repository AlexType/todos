import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoFooter from './TodoFooter';
import { useTodoContext } from '@/context/TodoContext';
import type { TaskDto } from '@/models/task/TaskDto';

// Мокируем зависимости
vi.mock('../TaskFilter', () => ({
  default: vi.fn(() => <div>TaskFilter Mock</div>),
}));

vi.mock('@/utils/pluralForm', () => ({
  pluralForm: vi.fn((count) => {
    if (count === 1) return 'задача';
    if (count >= 2 && count <= 4) return 'задачи';
    return 'задач';
  }),
}));

vi.mock('@/context/TodoContext', () => ({
  useTodoContext: vi.fn(() => ({
    clearCompletedTasks: vi.fn()
  }))
}));

describe('TodoFooter', () => {
  const mockTasks: TaskDto[] = [
    { id: '1', title: 'Task 1', completed: false, createdAt: '' },
    { id: '2', title: 'Task 2', completed: true, createdAt: '' },
    { id: '3', title: 'Task 3', completed: false, createdAt: '' },
  ];

  const mockClearCompleted = vi.fn();

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useTodoContext as any).mockImplementation(() => ({
      clearCompletedTasks: mockClearCompleted
    }));
    mockClearCompleted.mockClear();
  });

  it('should display correct count of remaining tasks', () => {
    render(<TodoFooter tasks={mockTasks} filter="all" />);
    expect(screen.getByText('Осталось: 2 задачи')).toBeInTheDocument();
  });

  it('should enable clear button when completed tasks exist', () => {
    render(<TodoFooter tasks={mockTasks} filter="all" />);
    const button = screen.getByRole('button', { name: /очистить/i });
    expect(button).not.toBeDisabled();
  });

  it('should disable clear button when no completed tasks', () => {
    const noCompletedTasks = mockTasks.filter((t) => !t.completed);
    render(<TodoFooter tasks={noCompletedTasks} filter="all" />);
    const button = screen.getByRole('button', { name: /очистить/i });
    expect(button).toBeDisabled();
  });

  it('should call clearCompletedTasks from context when button clicked', () => {
    render(<TodoFooter tasks={mockTasks} filter="all" />);
    const button = screen.getByRole('button', { name: /очистить/i });
    button.click();
    expect(mockClearCompleted).toHaveBeenCalled();
  });

  it('should render ClearOutlined icon', () => {
    render(<TodoFooter tasks={mockTasks} filter="all" />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('should show singular form when 1 task left', () => {
    const oneTask = [mockTasks[0]];
    render(<TodoFooter tasks={oneTask} filter="all" />);
    expect(screen.getByText('Осталось: 1 задача')).toBeInTheDocument();
  });

  it('should show plural form when 5+ tasks left', () => {
    const manyTasks = Array(5).fill(mockTasks[0]);
    render(<TodoFooter tasks={manyTasks} filter="all" />);
    expect(screen.getByText('Осталось: 5 задач')).toBeInTheDocument();
  });

  it('should render TaskFilter with correct props', () => {
    render(<TodoFooter tasks={mockTasks} filter="active" />);
    expect(screen.getByText('TaskFilter Mock')).toBeInTheDocument();
  });
});
