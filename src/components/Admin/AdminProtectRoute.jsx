import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const profile = useSelector((state) => state.user.profile);
  const isAdmin = useSelector((state) => state.user.profile?.isAdmin);

  if (!profile || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default  ProtectedRoute;