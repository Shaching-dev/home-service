import useAuth from "@/hooks/useAuth/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  const location = useLocation();
  console.log("in the private route", location);

  if (authLoading) {
    return <h3>Loading please.............</h3>;
  }

  if (!user) {
    return (
      <Navigate
        to={`/auth/login`}
        state={{ from: location }}
        replace
      ></Navigate>
    );
  }

  return children;
};

export default PrivateRoute;
