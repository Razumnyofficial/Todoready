import { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import TitleTasks from "./components/TitileTask";

import Header from "./components/Header";
import {
  getfetchData,
  // newTask,
  deleteTask,
  updateTask,
} from "./components/api/todos";
import { Todo } from "./components/types/todos";

function Page() {
  // const [newTodo, setnewTodo] = useState<string>("");
  const [filterParams, setFilterParams] = useState<boolean | null>(null);
  const [tasksData, setTasksData] = useState<Todo[]>([]);

  const fetchData = async () => {
    try {
      const data = await getfetchData();
      setTasksData(data);
    } catch (err) {
      console.error("Ошибка при загрузке задач", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const addTask = async () => {
  //   if (!newTodo.trim()) {
  //     alert("название задачи не может быть пустым");
  //     return;
  //   }
  //   if (newTodo.length < 2 || newTodo.length > 64) {
  //     alert("название задачи должно быть от 2 до 64 символов");
  //     return;
  //   }

  //   try {
  //     const response = await newTask({
  //       title: newTodo,
  //       isDone: false,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed add Task");
  //     }
  //     console.log("Задача появиласбь:", response);

  //     await fetchData();
  //     setnewTodo("");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const removeTask = async (id: number) => {
    try {
      const response = await deleteTask(id);
      console.log("Задача удалилась:", response);
      await fetchData();
    } catch (error) {
      console.error("Ошибка при удалении задачи", error);
    }
  };

  const fetchUpdateTask = async (
    id: number,
    updatedTitle: string,
    updatedDone?: boolean
  ) => {
    const updatedTask = { title: updatedTitle, isDone: updatedDone };

    try {
      const response = await updateTask(id, updatedTask);

      if (!response?.ok) {
        throw new Error("Failed to update task");
      }
      await fetchData();
      console.log(response);
    } catch (error) {
      console.log("ошибка при обновлении задачи", error);
    }
  };

  return (
    <div className="App">
      <div className="backgroundapp">
        <Header fetchData={fetchData} />
        <TitleTasks setFilterParams={setFilterParams} />
        <Tasks
          info={tasksData}
          fetchupdateTask={fetchUpdateTask}
          removeItem={removeTask}
          filterParams={filterParams}
        />
      </div>
    </div>
  );
}

export default Page;
