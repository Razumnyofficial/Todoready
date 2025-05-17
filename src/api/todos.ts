import axiosInstance from "./axiosInstance";
import { FilterParams } from "../types/todos";

export const getfetchData = async (filter: FilterParams) => {
  const response = await axiosInstance.get(`/todos?filter=${filter}`);
  return response.data;
};

export const newTask = async (newTask: { isDone: boolean; title: string }) => {
  const response = await axiosInstance.post("/todos", newTask);
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response.data;
};

export const updateTask = async (
  id: number,
  updatedTask: {
    isDone?: boolean;
    title: string;
  }
) => {
  const response = await axiosInstance.put(`/todos/${id}`, updatedTask);
  return response.data;
};
