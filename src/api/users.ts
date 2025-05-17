import axiosInstance from "./axiosInstance";
import { Roles } from "@/types/usersTypes";

export const getUsers = async (
  sortOrder?: string,
  sortBy?: string,
  search?: string,
  isBlocked?: boolean | null,
  limit?: number,
  offset?: number
) => {
  const response = await axiosInstance.get("/admin/users", {
    params: { sortOrder, sortBy, search, isBlocked, limit, offset },
  });
  return response;
};

export const getUser = async (id: number) => {
  const response = await axiosInstance.get(`/admin/users/${id}`);
  return response.data;
};

export const updateUser = async (
  id: number,
  payload: Partial<{ username: string; email: string; phoneNumber: string }>
) => {
  const response = await axiosInstance.put(`/admin/users/${id}`, payload);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete(`/admin/users/${id}`);
  return response.data;
};

export const blockUser = async (id: number) => {
  const response = await axiosInstance.post(`/admin/users/${id}/block`);
  return response.data;
};

export const unblockUser = async (id: number) => {
  const response = await axiosInstance.post(`/admin/users/${id}/unblock`);
  return response.data;
};

export const updateUserRoles = async (userId: number, roles: Roles[]) => {
  const response = await axiosInstance.put(`/admin/users/${userId}/rights`, {
    roles,
  });
  return response.data;
};
