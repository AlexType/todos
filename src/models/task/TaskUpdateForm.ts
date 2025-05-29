import type { TaskDto } from './TaskDto';

export type TaskUpdateForm = Omit<Partial<TaskDto>, 'id'>;
