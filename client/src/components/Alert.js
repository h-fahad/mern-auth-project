// src/components/AlertMessage.js
import React from "react";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";

// Icon mapping for alert types
const alertIcons = {
  success: <CheckCircleIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
};

// Default color mapping for alert types
const alertColors = {
  success: "success",
  warning: "warning",
  error: "danger",
  info: "info",
};

const AlertMessage = ({ type = "info", message, onClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: 600,
        zIndex: 1000, // Ensure it is above other components
        mt: 2,
      }}
    >
      <Alert
        startDecorator={alertIcons[type]}
        color={alertColors[type]}
        variant="soft"
        endDecorator={
          onClose && (
            <IconButton
              variant="soft"
              size="sm"
              color={alertColors[type]}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          )
        }
      >
        {message}
      </Alert>
    </Box>
  );
};

export default AlertMessage;
