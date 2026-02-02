"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Bus, MapPin, CreditCard, User, Shield } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/liveTransportMap", label: "Live Map" },
  { href: "/topup", label: "Topup" },
  { href: "/description", label: "About" },
  { href: "/developer", label: "Developer" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Bus className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Project Sahaj</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">
              <User className="mr-2 h-4 w-4" />
              User Login
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/admin/auth/login">
              <Shield className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background">
            <div className="flex flex-col gap-6 pt-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <Bus className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Project Sahaj</span>
              </Link>
              
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label === "Live Map" && <MapPin className="h-4 w-4" />}
                    {link.label === "Topup" && <CreditCard className="h-4 w-4" />}
                    {link.label !== "Live Map" && link.label !== "Topup" && <Bus className="h-4 w-4" />}
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/login">
                    <User className="mr-2 h-4 w-4" />
                    User Login
                  </Link>
                </Button>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link href="/admin/auth/login">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
