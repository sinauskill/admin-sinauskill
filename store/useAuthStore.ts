import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface User {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface AuthStore {
  user?: User | null;
  mode: "dark" | "light";
  setUser: (user: User) => void;
  updateUser: (user: User, data: Partial<User>) => void;
  setMode: (mode: "dark" | "light") => void;
  clear: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      mode: "dark",
      setUser: (user: User) => set({ user }),
      updateUser: (data) =>
        set((state) => ({ user: { ...state.user, ...data } })),
      setMode: (mode: "dark" | "light") => {
        set({
          mode: mode,
        });
      },
      clear: () =>
        set({
          user: null,
        }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
