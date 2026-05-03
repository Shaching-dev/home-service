import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Button variant="destructive" size="lg">
        Click me
      </Button>

      <Button variant="outline">Hello ching</Button>
    </div>
  );
};

export default Home;
