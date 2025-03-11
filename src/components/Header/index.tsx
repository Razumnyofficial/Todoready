import "./header.css";
import { useState } from "react";
import { newTask } from "../api/todos";

import { Input, Button } from "antd";

interface HeaderProps {
  // newTodo: string;
  // setnewTodo: (value: string) => void;
  // addTask: (argument: { isDone: boolean; title: string }) => void;
  fetchData: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ fetchData }) => {
  const [newTodo, setnewTodo] = useState<string>("");
  const addTask = async () => {
    if (!newTodo.trim()) {
      alert("название задачи не может быть пустым");
      return;
    }
    if (newTodo.length < 2 || newTodo.length > 64) {
      alert("название задачи должно быть от 2 до 64 символов");
      return;
    }

    try {
      const response = await newTask({
        title: newTodo,
        isDone: false,
      });

      if (!response.ok) {
        throw new Error("Failed add Task");
      }
      console.log("Задача появиласбь:", response);

      await fetchData();
      setnewTodo("");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <div className="header">
      <Input
        style={{ width: "400px", marginRight: "40px" }}
        placeholder="Basic usage"
        value={newTodo}
        onChange={(e) => setnewTodo(e.target.value)}
      />
      <Button type="primary" onClick={() => addTask()}>
        Добавить
      </Button>
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
