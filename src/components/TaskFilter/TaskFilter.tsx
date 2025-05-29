import type { CheckboxGroupProps } from 'antd/es/checkbox';
import type { TaskFilterType } from '@/models/task/TaskFilterType';
import React from 'react';
import { Group } from 'antd/es/radio';

type Props = {
  filter: TaskFilterType;
  onChange: (value: TaskFilterType) => void;
};

const TaskFilter: React.FC<Props> = ({ filter, onChange }) => {
  const options: CheckboxGroupProps<TaskFilterType>['options'] = [
    { label: 'Все', value: 'all' },
    { label: 'Активные', value: 'active' },
    { label: 'Завершенные', value: 'completed' },
  ];

  return (
    <Group
      block
      options={options}
      value={filter}
      onChange={(event) => onChange(event.target.value as TaskFilterType)}
      optionType="button"
    />
  );
};

export default React.memo(TaskFilter);
