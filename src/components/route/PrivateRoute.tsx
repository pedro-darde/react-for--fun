import { useAuth } from "@/context/auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const { isLogged } = useAuth();
  // Your authentication logic goes here...

  return isLogged ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;
