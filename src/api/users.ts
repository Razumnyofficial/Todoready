import apiUsers from "./apiUsers";

export const getUsers = async () => {
  const response = await apiUsers.get("/users");
  return response;
};
