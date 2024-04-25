"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return <div>{children}</div>;
  }

  router.push("../")
  return
}

export default ProtectedPage;
