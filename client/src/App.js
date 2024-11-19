// src/App.js
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "./routes";
import AuthContext from "./context/AuthContext"; // Import AuthContext for authentication state

const App = () => {
  const { isAuthenticated } = useContext(AuthContext); // Check authentication state

  // Function to render routes based on protection status
  const renderRoute = (route) => {
    // if (route.protected && !isAuthenticated) {
    //   // Redirect to login if not authenticated
    //   return <Navigate to="/login" replace />;
    // }
    const Component = route.component;
    return <Component />;
  };

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={renderRoute(route)} />
        ))}
        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
