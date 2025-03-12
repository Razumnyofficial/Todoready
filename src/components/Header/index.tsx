import "./header.css";
import { useState } from "react";
import { newTask } from "../api/todos";

import { Input, Button, Form } from "antd";

interface HeaderProps {
  // newTodo: string;
  // setnewTodo: (value: string) => void;
  // addTask: (argument: { isDone: boolean; title: string }) => void;
  fetchData: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ fetchData }) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const addTask = async () => {
    // if (!newTodo.trim()) {
    //   alert("название задачи не может быть пустым");
    //   return;
    // }
    // if (newTodo.length < 2 || newTodo.length > 64) {
    //   alert("название задачи должно быть от 2 до 64 символов");
    //   return;
    // }

    try {
      const response = await newTask({
        title: newTodo,
        isDone: false,
      });

      console.log("Задача появиласбь:", response);

      await fetchData();
      setNewTodo("");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <div className="header">
      <Form
        onFinish={addTask} 
        initialValues={{ title: newTodo }} 
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Название задачи не может быть пустым", 
            },
            {
              min: 2,
              message: "Название задачи должно быть не менее 2 символов", 
            },
            {
              max: 64,
              message: "Название задачи должно быть не более 64 символов", 
            },
          ]}
        >
          <Input
            style={{ width: "400px", marginRight: "40px" }}
            placeholder="Введите название задачи"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button className="button" type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>

      {/* <Button type="primary" onClick={() => addTask()}>
        Добавить
      </Button> */}
      {/* <input
        className="input"
        placeholder="Task To Be Done..."
        type="text"
        value={newTodo}
        onChange={(e) => setnewTodo(e.target.value)}
      />
      <button className="btn_color" onClick={() => addTask()}>
        Add
      </button> */}
    </div>
  );
};

export default Header;
