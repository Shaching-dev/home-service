// src/services/authService.js
import axios from "axios";
import { toast } from "sonner";

export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

  try {
    const res = await axios.post(import.meta.env.VITE_image_api_key, formData);
    return res.data.secure_url;
  } catch (err) {
    // We throw the error so the UI can catch it
    toast.error(err);
  }
};

export const handleUserRegistration = async (data, hooks) => {
  const { registerWithEmail, updateUserProfile } = hooks;

  // START BOTH AT THE SAME TIME
  // 1. Firebase Auth Request
  // 2. Cloudinary Upload Request
  const [firebaseRes, photoURL] = await Promise.all([
    registerWithEmail(data.email, data.password),
    uploadToCloudinary(data.photo[0]),
  ]);

  // 3. Update Profile (Only starts after both above finish)
  await updateUserProfile({
    displayName: data.name,
    photoURL: photoURL,
  });

  return firebaseRes.user;
};
