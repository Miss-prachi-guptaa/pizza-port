import { GoogleSignin } from "@react-native-google-signin/google-signin";
import api from "../api/client";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

/**
 * Google se idToken lo, apne Laravel backend ko bhejo verify karne ke liye.
 * Backend khud Google se verify karke apna token (Sanctum) issue karta hai.
 * Returns: { token, user }
 */
export async function signInWithGoogle() {
  await GoogleSignin.hasPlayServices();

  // Cached Google session clear karo, taaki har baar account-chooser popup dikhe
  // (warna last-used account se seedha silent sign-in ho jaata hai)
  try {
    await GoogleSignin.signOut();
  } catch (err) {
    // Agar pehle se koi session nahi tha to signOut fail ho sakta hai — ignore karo
  }

  const { data } = await GoogleSignin.signIn();
  const idToken = data?.idToken;

  if (!idToken) {
    throw new Error("Google se idToken nahi mila");
  }

  const response = await api.post("/auth/google", { idToken });
  return response.data; // { token, user }
}