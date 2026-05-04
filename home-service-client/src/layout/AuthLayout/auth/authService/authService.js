// src/services/authService.js
import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

  try {
    const res = await axios.post(import.meta.env.VITE_image_api_key, formData);
    return res.data.secure_url;
  } catch (err) {
    console.log(err);
  }
};

export const handleUserRegistration = async (data, hooks) => {
  const { registerWithEmail, updateUserProfile } = hooks;

  // 1. Create User in Firebase
  const firebaseRes = await registerWithEmail(data.email, data.password);

  // 2. Upload Image (Only if registration succeeds)
  let photoURL = "";
  if (data.photo?.[0]) {
    photoURL = await uploadToCloudinary(data.photo[0]);
  }

  // 3. Update Profile
  await updateUserProfile({
    displayName: data.name,
    photoURL: photoURL,
  });

  return firebaseRes.user;
};
