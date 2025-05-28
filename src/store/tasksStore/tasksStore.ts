import { makeAutoObservable } from 'mobx';
import { createTask } from '@/utils/createTask';
import type { TaskCreateForm } from '@/models/task/TaskCreateForm';
import type { TaskDto } from '@/models/task/TaskDto';
import { mockTasks } from '@/mocks/mockTasks';
import type { TaskUpdateForm } from '@/models/task/TaskUpdateForm';
import { updateTask } from '@/utils/updateTask';

class TasksStore {
  private _tasks: TaskDto[] = mockTasks;

  get tasks() {
    return this._tasks;
  }

  constructor() {
    makeAutoObservable(this);
  }

  add(form: TaskCreateForm) {

    const task = createTask(form);
    console.log(task);
    this._tasks = [...this._tasks, task];
  }

  update(id: string, form: TaskUpdateForm): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    const updatedTask = updateTask(this.tasks[index], form);
    this._tasks = [...this.tasks.slice(0, index), updatedTask, ...this.tasks.slice(index + 1)];

    return true;
  }

  remove(id: string) {
    this._tasks = this.tasks.filter((task) => task.id !== id);
  }
}

const tasksStore = new TasksStore();

export default tasksStore;
