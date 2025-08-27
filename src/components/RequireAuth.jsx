import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { user, checking } = useAuth();
  const loc = useLocation();

  if (checking) return null; // o un loader

  if (!user) {
    return <Navigate to="/login" replace state={{ from: loc }} />;
  }
  return children;
}
