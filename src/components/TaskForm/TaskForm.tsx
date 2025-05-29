import { useState } from 'react';

import Input from 'antd/es/input';
import Button from 'antd/es/button';
import EnterOutlined from '@ant-design/icons/EnterOutlined';
import { Tooltip } from 'antd';

type Props = {
  onCreate?: (title: string) => void;
};

const TaskForm: React.FC<Props> = ({ onCreate }) => {
  const [text, setText] = useState('');
  const isDisabledAction = !text.trim().length;

  function createHandler() {
    if (!onCreate) {
      return;
    }

    onCreate(text);
    setText('');
  }

  function keyDownHandler(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      createHandler();
    }
  }

  return (
    <Input
      value={text}
      size="large"
      showCount
      maxLength={500}
      placeholder="Введите новую задачу"
      onChange={(e) => setText(e.target.value)}
      onKeyDown={keyDownHandler}
      suffix={
        <Tooltip placement="top" title="Создать задачу">
          <Button
            shape="circle"
            variant="outlined"
            icon={<EnterOutlined />}
            disabled={isDisabledAction}
            onClick={createHandler}
          />
        </Tooltip>
      }
    />
  );
};

export default TaskForm;
