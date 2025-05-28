import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (!useSelector((state)=>state.user.profile)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default  ProtectedRoute;