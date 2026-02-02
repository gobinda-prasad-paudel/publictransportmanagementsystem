"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Bus,
  LayoutDashboard,
  MessageSquareWarning,
  LogOut,
  Wallet,
  Receipt,
  Route,
  User,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Top Up",
    href: "/user/topup",
    icon: Wallet,
  },
  {
    title: "Transactions",
    href: "/user/transactions",
    icon: Receipt,
  },
  {
    title: "Routes",
    href: "/user/routes",
    icon: Route,
  },
  {
    title: "Profile",
    href: "/user/profile",
    icon: User,
  },
  {
    title: "Emergency SOS",
    href: "/user/sos",
    icon: ShieldAlert,
  },
  {
    title: "Report Issue",
    href: "/user/report",
    icon: MessageSquareWarning,
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userAuth");
      window.location.href = "/login";
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Bus className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-sidebar-foreground">Project Sahaj</span>
            <span className="text-xs text-sidebar-foreground/60">User Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Back to Home & Logout */}
        <div className="border-t border-sidebar-border p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            asChild
          >
            <Link href="/">
              <Bus className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
