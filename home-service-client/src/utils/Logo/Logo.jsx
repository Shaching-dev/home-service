import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <span className="text-2xl">Quick Service</span>
    </Link>
  );
};

export default Logo;
