import type { TaskCreateForm } from "@/models/task/TaskCreateForm";
import type { TaskDto } from "@/models/task/TaskDto";

export const createTask = (form: TaskCreateForm): TaskDto => {
  return {
    completed: false,
    createdAt: new Date().toISOString(),
    id: crypto.randomUUID(),
    title: form.title,
  };
};
