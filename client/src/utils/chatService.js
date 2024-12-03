import axiosInstance from "./axiosInstance";

// fetch user chats function
export const findUserChats = async (userId) => {
  const response = await axiosInstance.get(`/chats/${userId}`);
  return response.data;
};

// fetch chat messages function
export const getChatMessagesById = async (chatId) => {
  const response = await axiosInstance.get(`/messages/${chatId}`);
  return response.data;
};
