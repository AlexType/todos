import type { TaskFilterType } from '@/models/task/TaskFilterType';
import type { TaskUpdateForm } from '@/models/task/TaskUpdateForm';
import { createContext, useContext } from 'react';

export type TodoContextValue = {
  updateTask: (id: string, form: TaskUpdateForm) => void;
  removeTask: (id: string) => void;
  clearCompletedTasks: () => void;
  changeFilter: (value: TaskFilterType) => void;
};

const TodoContext = createContext<TodoContextValue>({} as TodoContextValue);

export const CommentFormProvider = TodoContext.Provider;

export const useTodoContext = () => useContext(TodoContext);

export default TodoContext;
