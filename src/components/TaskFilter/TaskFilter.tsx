import type { CheckboxGroupProps } from 'antd/es/checkbox';
import type { TaskFilterType } from '@/models/task/TaskFilterType';
import { Radio } from 'antd';
import filterStore from '@/store/filterStore';
import React from 'react';

type Props = {
  filter: TaskFilterType;
};

const TaskFilter: React.FC<Props> = ({ filter }) => {
  const options: CheckboxGroupProps<TaskFilterType>['options'] = [
    { label: 'Все', value: 'all' },
    { label: 'Активные', value: 'active' },
    { label: 'Завершенные', value: 'completed' },
  ];

  return (
    <Radio.Group
      block
      options={options}
      value={filter}
      onChange={(event) => filterStore.setFilter(event.target.value as TaskFilterType)}
      optionType="button"
    />
  );
};

export default React.memo(TaskFilter);
