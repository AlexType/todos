import type { TaskDto } from "@/models/task/TaskDto";
import type { TaskUpdateForm } from "@/models/task/TaskUpdateForm";

export const updateTask = (existingTask: TaskDto, form: TaskUpdateForm): TaskDto => {
  return {
    ...existingTask,
    ...form,
    updatedAt: new Date().toISOString(),
  };
};
