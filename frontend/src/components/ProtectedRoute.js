import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    // Role not allowed → redirect to login
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
