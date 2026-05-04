import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <div className="w-full">
      <Button variant="outline" className="w-full">
        <FcGoogle size={70} />
        Login with Google
      </Button>
    </div>
  );
};

export default SocialLogin;
