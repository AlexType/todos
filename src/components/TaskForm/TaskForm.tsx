import { useState } from "react";

import classes from "./TaskForm.module.scss";
import Input from "antd/es/input/Input";
import EnterOutlined from "@ant-design/icons/EnterOutlined";

const TaskForm = () => {
  const [text, setText] = useState("");

  return (
    <div className={classes.container}>
      <Input
        value={text}
        size='large'
        placeholder="Введите новую задачу"
        onChange={(e) => setText(e.target.value)}
        prefix={<EnterOutlined />}
      />
    </div>
  );
};

export default TaskForm;
