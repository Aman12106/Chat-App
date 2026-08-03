import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,

  isAuthenticated: false,

  signupData: null,

  loading: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  setSignupData: (data) =>
    set({
      signupData: data,
    }),

  clearSignupData: () =>
    set({
      signupData: null,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),
}));

export default useAuthStore;