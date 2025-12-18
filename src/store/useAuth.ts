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

export const useAuth = create<AuthState>((set) => ({
    user: null,
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
}));