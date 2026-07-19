import { create } from "zustand";

// NOTE: Firebase ka raw auth user (uid, loading) AuthContext se milta hai — useAuth() hook.
// Ye store sirf Firestore se aaya profile data rakhta hai (fullName, email, avatar).

export const useAuthStore = create((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));
