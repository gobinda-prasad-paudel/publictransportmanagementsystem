"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { USERS, USER_CREDENTIALS } from "@/lib/constants";
import { User, Mail, Phone, Calendar, AlertCircle, ArrowRight, Info } from "lucide-react";

export default function UserLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user by email
    const user = USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      setError("No account found with this email address.");
      setIsLoading(false);
      return;
    }

    if (!user.is_active) {
      setError("This account has been deactivated. Please contact admin.");
      setIsLoading(false);
      return;
    }

    if (!user.is_verified) {
      setError("This account is not verified. Please complete verification first.");
      setIsLoading(false);
      return;
    }

    // Verify phone and DOB
    if (user.phone_number !== phone) {
      setError("Phone number does not match our records.");
      setIsLoading(false);
      return;
    }

    const userDob = new Date(user.date_of_birth).toISOString().split("T")[0];
    if (userDob !== dob) {
      setError("Date of birth does not match our records.");
      setIsLoading(false);
      return;
    }

    // Login successful
    if (typeof window !== "undefined") {
      localStorage.setItem("userAuth", JSON.stringify({ userId: user.userId, email: user.email }));
    }
    router.push("/user/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <User className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">User Login</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to your Project Sahaj account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Demo Credentials */}
              <Alert className="mb-6 border-primary/30 bg-primary/10">
                <Info className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm text-primary">
                  <strong>Demo Credentials:</strong><br />
                  Email: {USER_CREDENTIALS.email}<br />
                  Phone: {USER_CREDENTIALS.phone_number}<br />
                  DOB: {USER_CREDENTIALS.date_of_birth}
                </AlertDescription>
              </Alert>

              {error && (
                <Alert className="mb-4 border-destructive/50 bg-destructive/10">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-input border-border text-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+977-98XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 bg-input border-border text-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-foreground">
                    Date of Birth
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="dob"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="pl-10 bg-input border-border text-foreground"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/create" className="text-primary hover:underline">
                    Create Account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
