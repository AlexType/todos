import classes from './TodoFooter.module.scss';
import type { TaskDto } from '@/models/task/TaskDto';
import TaskFilter from '../TaskFilter';
import Button from 'antd/es/button';
import ClearOutlined from '@ant-design/icons/ClearOutlined';
import type { TaskFilterType } from '@/models/task/TaskFilterType';
import { pluralForm } from '@/utils/pluralForm';
import { useTodoContext } from '@/context/TodoContext';

type Props = {
  tasks: TaskDto[];
  filter: TaskFilterType;
};

const TodoFooter: React.FC<Props> = ({ tasks, filter }) => {
  const ctx = useTodoContext()
  const leftTotal = tasks.filter((task) => !task.completed).length;
  const pluralLeft = pluralForm(leftTotal, ['задача', 'задачи', 'задач']);
  const canClear = tasks.some((task) => task.completed);

  return (
    <div className={classes.component}>
      <span className={classes.left}>
        Осталось: {leftTotal} {pluralLeft}
      </span>
      <TaskFilter filter={filter} onChange={ctx.changeFilter} />
      <Button variant="outlined" icon={<ClearOutlined />} disabled={!canClear} onClick={ctx.clearCompletedTasks}>
        Очистить выполненные
      </Button>
    </div>
  );
};

export default TodoFooter;
