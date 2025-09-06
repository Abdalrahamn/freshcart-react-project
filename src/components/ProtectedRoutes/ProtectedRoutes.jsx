import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext.jsx";
import { Navigate } from "react-router-dom";

let ProtectedRoutes = ({ children }) => {
  let { token } = useContext(TokenContext);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutes;
