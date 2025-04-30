import apiUsers from "./apiUsers";

export const getUsers = async () => {
    const response = await apiUsers.get("/users");
    return response;
};

export const getUser = async (id: number) => {
    const response = await apiUsers.get(`/users/${id}`)
    return response.data;
}
export const updateUser = async (id: number, payload: Partial<{ username: string; email: string; phoneNumber: string }>) => {
    const response = await apiUsers.put(`/users/${id}`, payload);
    return response.data;
};
export const deleteUser = async (id: number) => {
    const response = await apiUsers.delete(`/users/${id}`)
    return response.data

}


export const blockUser = async (id: number) => {
    const response = await apiUsers.post(`/users/${id}/block`)
    return response.data
}
export const unblockUser = async (id: number) => {
    const response = await apiUsers.post(`/users/${id}/unblock`);
    return response.data
}
