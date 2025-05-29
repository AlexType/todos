import { describe, it, expect } from 'vitest';
import { sortTasks } from './sortTasks';
import type { TaskDto } from '@/models/task/TaskDto';

describe('sortTasks', () => {
  const mockTasks: TaskDto[] = [
    { id: '1', title: 'Task 1', completed: false, createdAt: '2024-01-03', updatedAt: '2024-01-04' },
    { id: '2', title: 'Task 2', completed: true, createdAt: '2024-01-01', updatedAt: '2024-01-02' },
    { id: '3', title: 'Task 3', completed: false, createdAt: '2024-01-02', updatedAt: '2024-01-03' },
    { id: '4', title: 'Task 4', completed: true, createdAt: '2024-01-04', updatedAt: undefined },
  ];

  it('should sort by createdAt ascending', () => {
    const result = sortTasks(mockTasks, 'createdAt', 'asc');
    expect(result.map((t) => t.id)).toEqual(['2', '3', '1', '4']);
  });

  it('should sort by createdAt descending', () => {
    const result = sortTasks(mockTasks, 'createdAt', 'desc');
    expect(result.map((t) => t.id)).toEqual(['4', '1', '3', '2']);
  });

  it('should sort by updatedAt ascending', () => {
    const result = sortTasks(mockTasks, 'updatedAt', 'asc');
    expect(result.map((t) => t.id)).toEqual(['2', '3', '1', '4']);
  });

  it('should sort by updatedAt descending', () => {
    const result = sortTasks(mockTasks, 'updatedAt', 'desc');
    expect(result.map((t) => t.id)).toEqual(['1', '4', '3', '2']);
  });

  it('should use createdAt when updatedAt is missing', () => {
    const result = sortTasks(mockTasks, 'updatedAt', 'asc');
    expect(result[3].id).toBe('4');
  });

  it('should return new array without mutating original', () => {
    const result = sortTasks(mockTasks, 'createdAt');
    expect(result).not.toBe(mockTasks);
    expect(mockTasks.map((t) => t.id)).toEqual(['1', '2', '3', '4']);
  });

  it('should default to ascending sort', () => {
    const result = sortTasks(mockTasks, 'createdAt');
    expect(result.map((t) => t.id)).toEqual(['2', '3', '1', '4']);
  });
});
