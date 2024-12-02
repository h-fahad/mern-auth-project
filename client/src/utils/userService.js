import axiosInstance from "./axiosInstance";

// Login function
export const getUsers = async (userId) => {
  const response = await axiosInstance.get("/users/" + userId);
  return response.data;
};
