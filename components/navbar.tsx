"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Bus, MapPin, CreditCard, User, Shield, Info, Code, X, Home } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/liveTransportMap", label: "Live Map", icon: MapPin },
  { href: "/topup", label: "Topup", icon: CreditCard },
  { href: "/description", label: "About", icon: Info },
  { href: "/developer", label: "Developer", icon: Code },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary">
            <Bus className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-foreground">Project Sahaj</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-2 py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" size="sm" asChild className="bg-transparent">
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
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-[300px] bg-background p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Bus className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <SheetTitle className="text-lg font-bold">Project Sahaj</SheetTitle>
                </Link>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10"
                      onClick={() => setIsOpen(false)}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Footer Buttons */}
              <div className="p-4 border-t border-border space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <User className="mr-3 h-5 w-5" />
                    User Login
                  </Link>
                </Button>
                <Button className="w-full justify-start" asChild>
                  <Link href="/admin/auth/login" onClick={() => setIsOpen(false)}>
                    <Shield className="mr-3 h-5 w-5" />
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
