import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Android Emulator se apne computer ke localhost (jaha Node/Express server chal raha hai)
// tak pahunchne ke liye 10.0.2.2 use karna padta hai — 127.0.0.1 emulator KHUD ko point karega.
// Physical device use karogi to iski jagah apne computer ka LAN IP daalna hoga (jaise 192.168.1.5).
const BASE_URL = "http://192.168.1.5:5000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Har request ke saath automatically token attach karo (agar hai to)
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;