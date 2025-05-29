import { describe, it, expect } from 'vitest';
import { filterTasks } from './filterTasks';
import type { TaskDto } from '@/models/task/TaskDto';
import type { TaskFilterType } from '@/models/task/TaskFilterType';

describe('filterTasks', () => {
  const mockTasks: TaskDto[] = [
    { id: '1', title: 'Task 1', completed: false, createdAt: '2024-01-01' },
    { id: '2', title: 'Task 2', completed: true, createdAt: '2024-01-02' },
    { id: '3', title: 'Task 3', completed: false, createdAt: '2024-01-03' },
  ];

  it('should return all tasks when filter is "all"', () => {
    const result = filterTasks(mockTasks, 'all');
    expect(result).toEqual(mockTasks);
  });

  it('should return only active tasks when filter is "active"', () => {
    const result = filterTasks(mockTasks, 'active');
    expect(result).toEqual([
      { id: '1', title: 'Task 1', completed: false, createdAt: '2024-01-01' },
      { id: '3', title: 'Task 3', completed: false, createdAt: '2024-01-03' },
    ]);
  });

  it('should return only completed tasks when filter is "completed"', () => {
    const result = filterTasks(mockTasks, 'completed');
    expect(result).toEqual([
      { id: '2', title: 'Task 2', completed: true, createdAt: '2024-01-02' },
    ]);
  });

  it('should return all tasks when filter is not specified', () => {
    const result = filterTasks(mockTasks, undefined as unknown as TaskFilterType);
    expect(result).toEqual(mockTasks);
  });
});
