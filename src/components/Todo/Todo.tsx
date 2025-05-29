import { observer } from 'mobx-react-lite';

import TaskForm from '../TaskForm';
import TaskList from '../TaskList';
import { useCallback, useMemo } from 'react';
import tasksStore from '@/store/tasksStore';
import TodoFooter from '../TodoFooter';

import classes from './Todo.module.scss';
import { sortTasks } from '@/utils/sortTasks';
import filterStore from '@/store/filterStore';
import { filterTasks } from '@/utils/filterTasks';

const Todo: React.FC = observer(() => {
  const { tasks } = tasksStore;
  const { filter } = filterStore;

  const filteredTasks = useMemo(() => filterTasks(tasks, filter), [filter, tasks]);
  const sortedTasks = useMemo(() => {
    return sortTasks(filteredTasks, 'createdAt', 'desc');
  }, [filteredTasks]);

  const createHandler = useCallback((title: string) => {
    tasksStore.add({ title });
  }, []);

  return (
    <div className={classes.component}>
      <TaskForm onCreate={createHandler} />
      <div className={classes.body}>
        <TaskList tasks={sortedTasks} filter={filter} />
      </div>
      <TodoFooter tasks={tasks} filter={filter} />
    </div>
  );
});

export default Todo;
