import type { SortDirection } from '@/models/common/SortDirection';
import type { TaskDto } from '@/models/task/TaskDto';

type SortField = 'createdAt' | 'updatedAt';

export const sortTasks = (tasks: TaskDto[], field: SortField, direction: SortDirection = 'asc'): TaskDto[] => {
  return [...tasks].sort((a, b) => {
    const dateA = field === 'updatedAt' ? a.updatedAt || a.createdAt : a.createdAt;
    const dateB = field === 'updatedAt' ? b.updatedAt || b.createdAt : b.createdAt;

    if (dateA < dateB) {
      return direction === 'asc' ? -1 : 1;
    }
    if (dateA > dateB) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
