import { create } from "zustand";

type User = {
  nome: string;
  email: string;
};

type AuthState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => {
  // Carregar usuário salvo no localStorage ao iniciar
  const storedUser =
    typeof window !== "undefined"
      ? localStorage.getItem("aurora_user")
      : null;

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    login: (user) => {
      localStorage.setItem("aurora_user", JSON.stringify(user));
      set({ user });
    },
    logout: () => {
      localStorage.removeItem("aurora_user");
      set({ user: null });
    },
  };
});
