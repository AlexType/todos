// hooks/useTasksStore.ts
import { useState, useEffect } from 'react';
import { createTask } from '@/utils/createTask';
import type { TaskCreateForm } from '@/models/task/TaskCreateForm';
import type { TaskDto } from '@/models/task/TaskDto';
import type { TaskUpdateForm } from '@/models/task/TaskUpdateForm';
import { updateTask } from '@/utils/updateTask';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/loadFromLocalStorage';

const TASKS_STORAGE_KEY = 'tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskDto[]>(loadFromLocalStorage(TASKS_STORAGE_KEY, []));

  useEffect(() => {
    saveToLocalStorage(TASKS_STORAGE_KEY, tasks);
  }, [tasks]);

  const addTask = (form: TaskCreateForm) => {
    const task = createTask(form);
    setTasks((prev) => [...prev, task]);
  };

  const updateTaskById = (id: string, form: TaskUpdateForm) => {
    setTasks((prev) => {
      const index = prev.findIndex((task) => task.id === id);
      if (index === -1) return prev;

      return [...prev.slice(0, index), updateTask(prev[index], form), ...prev.slice(index + 1)];
    });
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  return {
    tasks,
    addTask,
    updateTaskById,
    removeTask,
    clearCompletedTasks,
  };
};
