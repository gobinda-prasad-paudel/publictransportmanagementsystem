"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserSidebar } from "@/components/user-sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth");
    if (userAuth) {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <UserSidebar />
      <main className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
