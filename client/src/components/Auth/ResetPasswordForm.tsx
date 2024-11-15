// src/pages/ResetPasswordForm.js

import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../utils/authService";
import {
  CssVarsProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";
import { isValidPassword } from "../../utils/validators";
import AlertMessage from "../Alert";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      setMessage(
        "Password must be at least 8 characters long and contain a letter and a number."
      );
      return;
    }

    try {
      await resetPassword(token, password);
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <CssVarsProvider>
      {alert.message && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: "", message: "" })}
        />
      )}
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
        <Typography component="h1" level="h3" textAlign="center">
          Reset Password
        </Typography>
        <FormControl required>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" fullWidth sx={{ mt: 2 }}>
          Reset Password
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

export default ResetPasswordForm;
