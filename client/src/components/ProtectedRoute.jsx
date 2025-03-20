import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../hooks/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />; // 未登入則重導向登入頁面
  }

  return children;
}
