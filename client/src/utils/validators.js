// src/utils/validators.js

// Check if the email is in a valid format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Check if the password meets criteria (e.g., minimum length, at least one special character)
  export const isValidPassword = (password) => {
    // Minimum 8 characters, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Check if a field is empty
  export const isNotEmpty = (value) => {
    return value.trim().length > 0;
  };
  