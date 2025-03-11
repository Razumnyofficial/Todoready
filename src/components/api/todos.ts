import axios from "axios";

export const getfetchData = async () => {
  const response = await axios.get("https://easydev.club/api/v1/todos");
  const data = response.data.data;

  return data;
};

export const getfetchInfo = async () => {
  const response = await axios.get("https://easydev.club/api/v1/todos");
  const info = response.data.info;

  return info;
};

export const newTask = async (newTask: { isDone: boolean; title: string }) => {
  const response = await axios.post(
    "https://easydev.club/api/v1/todos",
    newTask,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
  // try {
  //   const response = await fetch("https://easydev.club/api/v1/todos", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newTask),
  //   });

  //   return response;
  // } catch (err) {
  //   console.error(err);
  //   throw err;
  // }
};

export const deleteTask = async (id: number) => {
  const response = await axios.delete(
    `https://easydev.club/api/v1/todos/${id}`
  );

  return response;
  // try {
  //   const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
  //     method: "DELETE",
  //   });

  //   return response;
  // } catch (error) {
  //   console.error("Ошибка при удалении задачи", error);
  // }
};

export const updateTask = async (
  id: number,
  updatedTask: {
    isDone?: boolean;
    title: string;
  }
) => {
  const response = await axios.put(
    `https://easydev.club/api/v1/todos/${id}`,
    updatedTask
  );
  return response;
  // try {
  //   const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
  //     method: "PUT", // используем PATCH для частичного обновления
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedTask),
  //   });

  //   return response;
  // } catch (error) {
  //   console.log("ошибка при обновлении задачи", error); // логируем error;
  // }
};
