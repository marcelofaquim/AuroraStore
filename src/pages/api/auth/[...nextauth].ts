import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Usuario {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials): Promise<Usuario | null> {
        // Simulação de login (sem banco de dados)
        if (
          credentials?.email === "admin@aurora.com" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@aurora.com",
            role: "admin",
          };
        }

        if (
          credentials?.email === "cliente@aurora.com" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "2",
            name: "Cliente",
            email: "cliente@aurora.com",
            role: "cliente",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as Usuario).role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: token.role as string,
      } as Usuario;
      return session
    },
  },
  pages: {
    signIn: "/login", //pagina de login customizada
  }
});
