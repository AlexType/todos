import { makeAutoObservable } from 'mobx';
import { createTask } from '@/utils/createTask';
import type { TaskCreateForm } from '@/models/task/TaskCreateForm';
import type { TaskDto } from '@/models/task/TaskDto';
import type { TaskUpdateForm } from '@/models/task/TaskUpdateForm';
import { updateTask } from '@/utils/updateTask';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/loadFromLocalStorage';

const TASKS_STORAGE_KEY = 'tasks';

class TasksStore {
  private _tasks: TaskDto[] = loadFromLocalStorage(TASKS_STORAGE_KEY, []);

  get tasks() {
    return this._tasks;
  }

  constructor() {
    makeAutoObservable(this);
    this.saveTasks();
  }

  private saveTasks() {
    saveToLocalStorage(TASKS_STORAGE_KEY, this._tasks);
  }

  add = (form: TaskCreateForm) => {
    const task = createTask(form);
    this._tasks = [...this._tasks, task];
    this.saveTasks();
  };

  update = (id: string, form: TaskUpdateForm): boolean => {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    const updatedTask = updateTask(this.tasks[index], form);
    this._tasks = [...this.tasks.slice(0, index), updatedTask, ...this.tasks.slice(index + 1)];
    this.saveTasks();

    return true;
  };

  remove = (id: string) => {
    this._tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  };

  clearCompleted = () => {
    this._tasks = this.tasks.filter((task) => !task.completed);
    this.saveTasks();
  };
}

const tasksStore = new TasksStore();

export default tasksStore;
