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
import { USERS } from "@/lib/constants";
import { UserPlus, Mail, Phone, Calendar, CreditCard, AlertCircle, ArrowRight, CheckCircle, Info } from "lucide-react";

export default function CreateAccountPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user by email (account must be created by admin first)
    const user = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      setError("No account found with this email. Please contact admin to create your account first.");
      setIsLoading(false);
      return;
    }

    if (user.is_verified) {
      setError("This account is already verified. Please login instead.");
      setIsLoading(false);
      return;
    }

    // Move to verification step
    setStep(2);
    setIsLoading(false);
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      setError("Account not found.");
      setIsLoading(false);
      return;
    }

    // Verify details
    if (user.phone_number !== phone) {
      setError("Phone number does not match the account records.");
      setIsLoading(false);
      return;
    }

    const userDob = new Date(user.date_of_birth).toISOString().split("T")[0];
    if (userDob !== dob) {
      setError("Date of birth does not match the account records.");
      setIsLoading(false);
      return;
    }

    // In real app, would update is_verified to true
    setSuccess("Account verified successfully! Redirecting to login...");
    
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <UserPlus className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">Create Account</CardTitle>
              <CardDescription className="text-muted-foreground">
                {step === 1 
                  ? "Enter your email to verify your account"
                  : "Complete verification with your details"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Info */}
              <Alert className="mb-6 border-primary/30 bg-primary/10">
                <Info className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm text-primary">
                  Your account must be created by an admin first. Use this form to verify your account using the email, phone number, card number, and date of birth provided by the admin.
                </AlertDescription>
              </Alert>

              {error && (
                <Alert className="mb-4 border-destructive/50 bg-destructive/10">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 border-primary/50 bg-primary/10">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-primary">{success}</AlertDescription>
                </Alert>
              )}

              {step === 1 && (
                <form onSubmit={handleEmailVerification} className="space-y-4">
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
                    <p className="text-xs text-muted-foreground">
                      Use the same email provided by admin when creating your account
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Checking..." : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerification} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Email</Label>
                    <Input
                      value={email}
                      disabled
                      className="bg-muted border-border text-foreground"
                    />
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
                    <Label htmlFor="card" className="text-foreground">
                      Card Number (if issued)
                    </Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="card"
                        type="text"
                        placeholder="Enter card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="pl-10 bg-input border-border text-foreground"
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

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isLoading}>
                      {isLoading ? "Verifying..." : "Verify Account"}
                    </Button>
                  </div>
                </form>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already verified?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Login here
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
