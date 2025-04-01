import "./header.css";
import { useState } from "react";
import { newTask } from "../../api/todos";
import { Input, Button, Form } from "antd";

interface HeaderProps {
  fetchData: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ fetchData }) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [form] = Form.useForm();

  const addTask = async () => {
    try {
      const response = await newTask({
        title: newTodo,
        isDone: false,
      });

      console.log("Задача появилась:", response);

      await fetchData();
      form.resetFields();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="header">
      <Form form={form} onFinish={addTask}>
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
          <Button type="primary" htmlType="submit" className="button">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Header;
