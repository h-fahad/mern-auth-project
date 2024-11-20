import axiosInstance from "./axiosInstance";

// Login function
export const findUserChats = async (userId) => {
  const response = await axiosInstance.get(`/chats/${userId}`);
  return response.data;
};
