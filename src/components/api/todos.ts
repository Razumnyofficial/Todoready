import axios from "axios";

export const getfetchData = async () => {
  const response = await axios.get("https://easydev.club/api/v1/todos?");
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
};

export const deleteTask = async (id: number) => {
  const response = await axios.delete(
    `https://easydev.club/api/v1/todos/${id}`
  );

  return response;
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
};
