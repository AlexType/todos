/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskFilter from './TaskFilter';

vi.mock('antd/es/radio', () => ({
  Group: vi.fn(({ options, value, onChange }) => (
    <div className="ant-radio-group">
      {options.map((opt: any) => (
        <label key={opt.value}>
          <input
            type="radio"
            className="ant-radio-button-wrapper"
            checked={value === opt.value}
            onChange={() => onChange({ target: { value: opt.value } })}
          />
          {opt.label}
        </label>
      ))}
    </div>
  )),
}));

describe('TaskFilter', () => {
  const mockChangeFilter = vi.fn();

  it('should render all filter options', () => {
    render(<TaskFilter filter="all" onChange={mockChangeFilter} />);

    expect(screen.getByText('Все')).toBeInTheDocument();
    expect(screen.getByText('Активные')).toBeInTheDocument();
    expect(screen.getByText('Завершенные')).toBeInTheDocument();
  });

  it('should display current filter as checked', () => {
    render(<TaskFilter filter="active" onChange={mockChangeFilter} />);
    const activeRadio = screen.getByLabelText('Активные') as HTMLInputElement;
    expect(activeRadio.checked).toBe(true);
  });

  it('should call context.changeFilter when option is selected', () => {
    render(<TaskFilter filter="all" onChange={mockChangeFilter} />);
    fireEvent.click(screen.getByLabelText('Завершенные'));
    expect(mockChangeFilter).toHaveBeenCalledWith('completed');
  });

  it('should render as Radio buttons group', () => {
    render(<TaskFilter filter="all" onChange={mockChangeFilter} />);
    expect(document.querySelector('.ant-radio-group')).toBeInTheDocument();
    expect(document.querySelectorAll('.ant-radio-button-wrapper')).toHaveLength(3);
  });
});
