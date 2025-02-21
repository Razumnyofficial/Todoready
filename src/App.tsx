import { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import TitleTasks from "./components/TitileTask";

import "./app.css";
import Header from "./components/Header";

function App() {
  const [inputName, setInputName] = useState<string>("");
  const [filterParams, setFilterParams] = useState<boolean | null>(null);
  const [TasksData, setTasksData] = useState<Todo[]>([]); // получение и состояние данных

  //Get запрос
  const fetchData = async () => {
    try {
      const response = await fetch("https://easydev.club/api/v1/todos");
      const { data } = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      setTasksData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // POST

  const addTask = async () => {
    if (!inputName.trim()) return;

    const newTask = {
      title: inputName,
      isDone: false,
    };

    try {
      const response = await fetch("https://easydev.club/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed add Task");
      }

      await fetchData();
      setInputName("");
    } catch (error) {
      console.error(error);
    }
  };

  const removeTask = async (id: number) => {
    try {
      const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasksData((prevTask) => prevTask.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи", error);
    }
  };

  const updateTask = async (
    id: number,
    updatedTitle: string,
    updatedDone?: boolean
  ) => {
    const updatedTask = { title: updatedTitle, isDone: updatedDone };

    try {
      const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: "PUT", // используем PATCH для частичного обновления
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      await fetchData();
    } catch (error) {
      console.error("ошибка при обновлении задачи", error);
    }
  };

  return (
    <div className="App">
      <div className="backgroundapp">
        <Header
          inputName={inputName}
          setInputName={setInputName}
          addTask={addTask}
        />
        <TitleTasks info={TasksData} setFilterParams={setFilterParams} />
        <Tasks
          info={TasksData}
          updateTask={updateTask}
          removeItem={removeTask}
          filterParams={filterParams}
        />
      </div>
    </div>
  );
}

export default App;

export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}
