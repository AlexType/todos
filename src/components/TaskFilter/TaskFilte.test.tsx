import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskFilter from './TaskFilter';
import filterStore from '@/store/filterStore';

vi.mock('@/store/filterStore', () => ({
  default: {
    setFilter: vi.fn(),
  },
}));

describe('TaskFilter', () => {
  it('should render all filter options', () => {
    render(<TaskFilter filter="all" />);

    expect(screen.getByLabelText('Все')).toBeInTheDocument();
    expect(screen.getByLabelText('Активные')).toBeInTheDocument();
    expect(screen.getByLabelText('Завершенные')).toBeInTheDocument();
  });

  it('should display current filter as checked', () => {
    render(<TaskFilter filter="active" />);
    expect(screen.getByLabelText('Активные')).toBeChecked();
  });

  it('should call filterStore.setFilter when option is selected', () => {
    render(<TaskFilter filter="all" />);
    fireEvent.click(screen.getByLabelText('Завершенные'));
    expect(filterStore.setFilter).toHaveBeenCalledWith('completed');
  });

  it('should render as Radio buttons', () => {
    render(<TaskFilter filter="all" />);
    expect(document.querySelector('.ant-radio-group')).toBeInTheDocument();
    expect(document.querySelectorAll('.ant-radio-button-wrapper')).toHaveLength(3);
  });

  it('should be memoized', () => {
    const { rerender, container } = render(<TaskFilter filter="all" />);
    const firstRender = container.querySelector('.ant-radio-group');
    rerender(<TaskFilter filter="all" />);
    const secondRender = container.querySelector('.ant-radio-group');
    expect(firstRender).toBe(secondRender);
  });
});
