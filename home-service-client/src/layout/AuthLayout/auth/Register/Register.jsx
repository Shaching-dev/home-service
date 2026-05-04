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
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useState } from "react";
import { Eye, EyeClosed, ImageIcon, LoaderCircle, X } from "lucide-react";
import useAuth from "@/hooks/useAuth/useAuth";
// import axios from "axios";
import { toast } from "sonner";
import { handleUserRegistration } from "../authService/authService";
import { getFriendlyErrorMessage } from "@/utils/authErrors/authErrors";

const Register = () => {
  const authHooks = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setFileError("File must be less than 10MB");
      return;
    }
    setFileError("");
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  const clearImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    // setFileError("");
    setValue("photo", null);
  };

  const { onChange: rhfOnChange, ...restPhotoRegister } = register("photo", {
    required: "Photo is required",
    validate: {
      lessThan2MB: (files) =>
        !files ||
        !files[0] ||
        files[0].size < 10 * 1024 * 1024 ||
        "Max 10MB allowed",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Creating your account");

    try {
      await handleUserRegistration(data, authHooks);
      toast.success("Account created successfully!", { id: toastId });
    } catch (err) {
      console.error(err);
      const message = err.code
        ? getFriendlyErrorMessage(err.code)
        : err.message;
      toast.error(message, { id: toastId });
    } finally {
      setIsSubmitting(false);
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
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6 my-5">
              <div className="mx-auto">
                <label className=" px-5 text-[16px]">Profile Picture</label>
                <div className="relative w-25 h-25 md:w-30 md:h-30 mt-4">
                  {preview ? (
                    <>
                      <img
                        className="w-full h-full object-cover rounded-full border-4 border-chart-2 shadow-xl"
                        src={preview}
                        alt="preview"
                      />
                      <Button
                        onClick={clearImage}
                        className={`absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl w-8 h-8 flex items-center justify-center text-xl shadow-lg transition`}
                      >
                        <X />
                      </Button>
                    </>
                  ) : (
                    <>
                      <label className="cursor-pointer w-full h-full rounded-2xl flex flex-col items-center justify-center bg-white/70 border-2 border-dashed border-[#0e2c4e]/40 hover:border-[#0e2c4e] hover:bg-white/90 transition-all duration-200">
                        <ImageIcon />
                        <span>Upload Photo</span>

                        <Input
                          onChange={(e) => {
                            handleImageChange(e);
                            rhfOnChange(e);
                          }}
                          {...restPhotoRegister}
                          id="picture"
                          type="file"
                          accept="image/*"
                          className={`hidden`}
                        />
                      </label>
                    </>
                  )}
                </div>

                {fileError && (
                  <p className="text-red-500 text-sm mt-2">{fileError}</p>
                )}
                {errors.photo && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.photo.message}
                  </p>
                )}
              </div>

              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  {...register("name", { required: true })}
                  id="name"
                  type="text"
                  placeholder="Enter your name."
                  required
                />
              </div>

              {/* email */}
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
                <div className="relative">
                  <Input
                    {...register("password", { required: true })}
                    id="password"
                    className={` py-3 text-black`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    required
                  />

                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    size="sm"
                    variant="ghost"
                    className={`absolute right-5 cursor-pointer`}
                  >
                    {showPassword ? <EyeClosed size={25} /> : <Eye size={25} />}
                  </Button>
                </div>
              </div>
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? (
                <span className="animate-spin">
                  <LoaderCircle />
                </span>
              ) : (
                <span>Register</span>
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

export default Register;
