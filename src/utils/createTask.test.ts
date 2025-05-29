import { describe, it, expect, vi } from 'vitest';
import { createTask } from './createTask';
import type { TaskCreateForm } from '@/models/task/TaskCreateForm';

describe('createTask', () => {
  beforeAll(() => {
    vi.stubGlobal('crypto', {
      randomUUID: () => 'mock-uuid-123',
    });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('creates a task with correct structure', () => {
    const mockForm: TaskCreateForm = { title: 'Test task' };
    const result = createTask(mockForm);

    expect(result).toEqual({
      id: 'mock-uuid-123',
      title: 'Test task',
      completed: false,
      createdAt: expect.any(String),
    });
  });

  it('generates a valid UUID for id', () => {
    const mockForm: TaskCreateForm = { title: 'Test UUID' };
    const result = createTask(mockForm);

    expect(result.id).toBe('mock-uuid-123');
    expect(typeof result.id).toBe('string');
  });

  it('sets completed to false by default', () => {
    const mockForm: TaskCreateForm = { title: 'Test completed' };
    const result = createTask(mockForm);

    expect(result.completed).toBe(false);
  });

  it('generates createdAt as a valid ISO string', () => {
    const mockForm: TaskCreateForm = { title: 'Test date' };
    const result = createTask(mockForm);

    expect(typeof result.createdAt).toBe('string');
    expect(result.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

    const date = new Date(result.createdAt);
    expect(date.toString()).not.toBe('Invalid Date');
    expect(date.getTime()).toBeLessThanOrEqual(Date.now());
  });
});
