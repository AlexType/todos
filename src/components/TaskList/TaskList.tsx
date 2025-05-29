import type { TaskDto } from '@/models/task/TaskDto';
import TaskItem from '../TaskItem';

import classes from './TaskList.module.scss';
import Empty from 'antd/es/empty';
import type { TaskFilterType } from '@/models/task/TaskFilterType';
import { useMemo } from 'react';

type Props = {
  tasks: TaskDto[];
  filter: TaskFilterType;
};

const TaskList: React.FC<Props> = ({ tasks, filter }) => {
  const emptyLabel = useMemo(() => {
    if (tasks.length) {
      return null;
    }

    const labelMap: Record<TaskFilterType, string> = {
      all: 'У вас нет задач',
      active: 'У вас нет активных задач',
      completed: 'У вас нет завершённых задач',
    };

    return labelMap[filter];
  }, [filter, tasks.length]);

  if (!tasks.length) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyLabel} />;
  }

  return (
    <ul className={classes.component}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
