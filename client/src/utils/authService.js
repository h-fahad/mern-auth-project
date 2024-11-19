// src/utils/authService.js

import axiosInstance from "./axiosInstance";

// Login function
export const login = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("token");
};

// Signup function
export const signup = async (username, email, password) => {
  const response = await axiosInstance.post("/auth/signup", {
    username,
    email,
    password,
  });
  return response.data;
};

// Forgot password function
export const sendForgotPasswordEmail = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};

// Reset password function
export const resetPassword = async (token, password) => {
  const response = await axiosInstance.post(
    `/auth/reset-password?token=${token}`,
    { password }
  );
  return response.data;
};

// Other auth-related functions like forgotPassword, resetPassword can go here
