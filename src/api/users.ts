import apiUsers from "./apiUsers";

export const getUsers = async () => {
    const response = await apiUsers.get("/users");
    return response;
};

export const getUser = async (id: number) => {
    const response = await apiUsers.get(`/users/${id}`)
    return response.data;
}
