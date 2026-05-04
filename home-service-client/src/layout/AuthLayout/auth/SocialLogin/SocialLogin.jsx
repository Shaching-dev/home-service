import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth/useAuth";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    // console.log("hello");

    try {
      const res = await signInWithGoogle();
      console.log(res.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
        <FcGoogle size={22} />
        Login with Google
      </Button>
    </div>
  );
};

export default SocialLogin;
