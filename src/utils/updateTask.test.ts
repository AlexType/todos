import { describe, it, expect, vi } from 'vitest';
import { updateTask } from './updateTask';
import type { TaskDto } from '@/models/task/TaskDto';
import type { TaskUpdateForm } from '@/models/task/TaskUpdateForm';

describe('updateTask', () => {
  const mockDate = '2024-01-01T00:00:00.000Z';

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(mockDate));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  const existingTask: TaskDto = {
    id: '1',
    title: 'Old Title',
    completed: false,
    createdAt: '2023-01-01T00:00:00.000Z',
  };

  it('should update task fields', () => {
    const form: TaskUpdateForm = {
      title: 'New Title',
      completed: true,
    };

    const result = updateTask(existingTask, form);

    expect(result).toEqual({
      id: '1',
      title: 'New Title',
      completed: true,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: mockDate,
    });
  });

  it('should preserve unchanged fields', () => {
    const form: TaskUpdateForm = {
      title: 'New Title',
    };

    const result = updateTask(existingTask, form);

    expect(result.completed).toBe(false);
    expect(result.createdAt).toBe('2023-01-01T00:00:00.000Z');
  });

  it('should set updatedAt to current time', () => {
    const form: TaskUpdateForm = {};
    const result = updateTask(existingTask, form);
    expect(result.updatedAt).toBe(mockDate);
  });

  it('should handle partial updates', () => {
    const form: TaskUpdateForm = {
      completed: true,
    };

    const result = updateTask(existingTask, form);

    expect(result.title).toBe('Old Title');
    expect(result.completed).toBe(true);
  });

  it('should return new object without mutating original', () => {
    const form: TaskUpdateForm = { title: 'New Title' };
    const result = updateTask(existingTask, form);

    expect(result).not.toBe(existingTask);
    expect(existingTask.title).toBe('Old Title');
  });
});
