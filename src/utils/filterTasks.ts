import type { TaskDto } from '@/models/task/TaskDto';
import type { TaskFilterType } from '@/models/task/TaskFilterType';

export const filterTasks = (tasks: TaskDto[], filter: TaskFilterType): TaskDto[] => {
  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.completed);
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'all':
    default:
      return tasks;
  }
};
