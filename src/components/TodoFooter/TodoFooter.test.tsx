import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoFooter from './TodoFooter';
import tasksStore from '@/store/tasksStore';
import type { TaskDto } from '@/models/task/TaskDto';

vi.mock('../TaskFilter', () => ({
  default: vi.fn(() => <div>TaskFilter Mock</div>),
}));

vi.mock('@/store/tasksStore', () => ({
  default: {
    clearCompleted: vi.fn(),
  },
}));

vi.mock('@/utils/pluralForm', () => ({
  pluralForm: vi.fn((count) => {
    if (count === 1) return 'задача';
    if (count >= 2 && count <= 4) return 'задачи';
    return 'задач';
  }),
}));

describe('TodoFooter', () => {
  const mockTasks: TaskDto[] = [
    { id: '1', title: 'Task 1', completed: false, createdAt: '' },
    { id: '2', title: 'Task 2', completed: true, createdAt: '' },
    { id: '3', title: 'Task 3', completed: false, createdAt: '' },
  ];

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

  it('should call clearCompleted when button clicked', () => {
    render(<TodoFooter tasks={mockTasks} filter="all" />);
    const button = screen.getByRole('button', { name: /очистить/i });
    button.click();
    expect(tasksStore.clearCompleted).toHaveBeenCalled();
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
});
