import Checkbox from 'antd/es/checkbox/Checkbox';

import classes from './TaskItem.module.scss';
import clsx from 'clsx';
import type { TaskDto } from '@/models/task/TaskDto';
import Button from 'antd/es/button';
import Tooltip from 'antd/es/tooltip';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import React from 'react';
import { useTodoContext } from '@/context/TodoContext';

type Props = {
  task: TaskDto;
};

const TaskItem: React.FC<Props> = ({ task }) => {
  const ctx = useTodoContext();

  function changeCheckedHandler(isChecked: boolean) {
    ctx.updateTask(task.id, { completed: isChecked });
  }

  function deleteHandler() {
    ctx.removeTask(task.id);
  }

  return (
    <div
      className={clsx(classes.component, {
        [classes.isCompleted]: task.completed,
      })}
    >
      <Checkbox
        checked={task.completed}
        className={classes.checkbox}
        onChange={(e) => changeCheckedHandler(e.target.checked)}
      >
        {task.title}
      </Checkbox>

      <Tooltip placement="top" title="Удалить задачу">
        <Button danger size="small" type="text" icon={<DeleteOutlined />} onClick={deleteHandler} />
      </Tooltip>
    </div>
  );
};

export default React.memo(TaskItem);
