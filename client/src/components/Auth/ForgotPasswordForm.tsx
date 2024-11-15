// src/pages/ForgotPasswordForm.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendForgotPasswordEmail } from "../../utils/authService"; // Utility function to handle the request
import {
  CssVarsProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";
import AlertMessage from "../Alert";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendForgotPasswordEmail(email);
      setMessage(
        "If this email exists in our system, a reset link has been sent."
      );
      setAlert({ type: "success", message: "Reset link sent successfully!" });
      setTimeout(() => navigate("/login"), 5000); // Redirect after showing message
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      setAlert({ type: "error", message: "Failed to send reset link." });
    }
  };

  return (
    <CssVarsProvider>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 4,
          p: 3,
          borderRadius: "sm",
          boxShadow: "md",
          bgcolor: "background.body",
        }}
      >
        {alert.message && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: "", message: "" })}
          />
        )}
        <Typography component="h1" level="h3" textAlign="center">
          Forgot Password
        </Typography>
        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </FormControl>
        <Button type="submit" fullWidth sx={{ mt: 2 }}>
          Send Reset Link
        </Button>
        {message && (
          <Typography level="body-sm" sx={{ mt: 2, color: "text.secondary" }}>
            {message}
          </Typography>
        )}
      </Box>
    </CssVarsProvider>
  );
};

export default ForgotPasswordForm;
