import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../api/client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  // App start hote hi check karo — stored token valid hai kya
  async function checkAuthState() {
    try {
      const token = await SecureStore.getItemAsync("auth_token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch (err) {
      // Token invalid/expired — clear kar do
      await SecureStore.deleteItemAsync("auth_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  // Signup/Login/Google success ke baad ye call hoga
  async function login(token, userData) {
    await SecureStore.setItemAsync("auth_token", token);
    setUser(userData);
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // Token already invalid ho sakta hai, phir bhi local clear kar do
    }
    await SecureStore.deleteItemAsync("auth_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
