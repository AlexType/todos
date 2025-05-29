import TaskForm from '../TaskForm';
import TaskList from '../TaskList';
import { useCallback, useMemo, useState } from 'react';
import TodoFooter from '../TodoFooter';

import classes from './Todo.module.scss';
import { sortTasks } from '@/utils/sortTasks';
import { filterTasks } from '@/utils/filterTasks';
import { useTasks } from '@/hooks/useTasks';
import { CommentFormProvider, type TodoContextValue } from '@/context/TodoContext';
import type { TaskFilterType } from '@/models/task/TaskFilterType';

const Todo: React.FC = () => {
  const tasksData = useTasks();
  const [filter, setFilter] = useState<TaskFilterType>('all');

  const ctx = useMemo<TodoContextValue>(
    () => ({
      changeFilter: setFilter,
      removeTask: tasksData.removeTask,
      updateTask: tasksData.updateTaskById,
      clearCompletedTasks: tasksData.clearCompletedTasks,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const filteredTasks = useMemo(() => filterTasks(tasksData.tasks, filter), [filter, tasksData.tasks]);
  const sortedTasks = useMemo(() => {
    return sortTasks(filteredTasks, 'createdAt', 'desc');
  }, [filteredTasks]);

  const createHandler = useCallback((title: string) => {
    tasksData.addTask({ title });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommentFormProvider value={ctx}>
      <div className={classes.component}>
        <TaskForm onCreate={createHandler} />
        <div className={classes.body}>
          <TaskList tasks={sortedTasks} filter={filter} />
        </div>
        <TodoFooter tasks={tasksData.tasks} filter={filter} />
      </div>
    </CommentFormProvider>
  );
};

export default Todo;
