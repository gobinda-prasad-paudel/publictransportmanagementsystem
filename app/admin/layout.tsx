"use client";

import React from "react"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/auth/login") {
      setIsLoading(false);
      return;
    }

    // Check authentication
    const authData = localStorage.getItem("adminAuth");
    if (!authData) {
      router.push("/admin/auth/login");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [pathname, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Login page doesn't need sidebar
  if (pathname === "/admin/auth/login") {
    return <>{children}</>;
  }

  // Protected routes with sidebar
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
