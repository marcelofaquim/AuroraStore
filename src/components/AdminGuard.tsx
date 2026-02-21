"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    // Se não estiver logado ou não for admin → redireciona
    if (!session || session.user.role !== "admin") {
      router.push("/login");
    }  else {
       setIsAuthorized(true);
     }
  }, [session, status, router]);

  if (status === "loading" || !isAuthorized) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  return <>{children}</>;
}
