"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Usuario = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "cliente";
};

type AuthContextType = {
  user: Usuario | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregamento inicial (ex: checar localStorage ou API)
  useEffect(() => {
    try {
      const storedUser = null; // substitua por lógica real (ex: localStorage)
      if (storedUser) {
        setUser(storedUser);
      }
    } finally {
      setLoading(false); // garante que sempre finalize
    }
  }, []);

  const login = async (email: string, senha: string) => {
    setLoading(true);
    try {
      // Exemplo simples de login fake
      if (email === "admin@aurora.com" && senha === "123456") {
        setUser({ id: "1", nome: "Admin", email, role: "admin" });
      } else {
        setUser({ id: "2", nome: "Cliente", email, role: "cliente" });
      }
    } finally {
      setLoading(false); // garante que volte para false
    }
  };

  const logout = () => {
    setUser(null);
    setLoading(false); // sempre volta para false
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
