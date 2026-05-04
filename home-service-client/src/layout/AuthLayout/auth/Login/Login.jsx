import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth/useAuth";
import { toast } from "sonner";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { getFriendlyErrorMessage } from "@/utils/authErrors/authErrors";

const Login = () => {
  const { signInwithEmail } = useAuth();
  const [isSubmiting, setIssubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const navigate = useNavigate();

  const handleLoginWithEmail = async (data) => {
    setIssubmitting(true);
    try {
      const res = await signInwithEmail(data.email, data.password);
      navigate(from, { replace: true });
      toast.success(`Welcome to ${res.user.displayName}`);
    } catch (err) {
      const message = err.code
        ? getFriendlyErrorMessage(err.code)
        : err.message;

      toast.error(message);
    } finally {
      setIssubmitting(false);
    }
  };

  return (
    <div>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link state={location.state} to={`/auth/register`}>
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLoginWithEmail)}>
            <div className="flex flex-col gap-6 my-5">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...register("password", { required: true })}
                  id="password"
                  className={` py-3 text-black`}
                  type="password"
                  placeholder="Enter Password"
                  required
                />
              </div>
            </div>
            <Button disabled={isSubmiting} type="submit" className="w-full">
              {isSubmiting ? (
                <span className="animate-spin">
                  <LoaderCircle />
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="">
          <SocialLogin />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
