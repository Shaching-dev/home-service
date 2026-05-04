import { Button } from "@/components/ui/button";
import Logo from "@/utils/Logo/Logo";
import { NavLink, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <h3 className="text-2xl text-center">
        Welcome to <Logo />
      </h3>

      <div className="flex justify-center items-center mt-10 space-x-5">
        <NavLink to="/auth/login">
          {({ isActive }) => (
            <Button
              asChild
              size="lg"
              className={`px-3 ${
                isActive
                  ? "bg-primary px-5 rounded-2xl text-white"
                  : "bg-muted text-muted-foreground hover:bg-chart-2 hover:text-white"
              }`}
            >
              <span>Login</span>
            </Button>
          )}
        </NavLink>

        <NavLink to="/auth/register">
          {({ isActive }) => (
            <Button
              asChild
              size="lg"
              className={`px-3 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span>Register</span>
            </Button>
          )}
        </NavLink>
      </div>

      <div className="max-w-lg mx-auto mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
