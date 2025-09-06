import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext.jsx";
import { Navigate } from "react-router-dom";

let AuthView = ({ children }) => {
  let { token } = useContext(TokenContext);
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
};
export default AuthView;
