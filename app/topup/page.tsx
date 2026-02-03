"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, CheckCircle, AlertCircle, ArrowRight, Wallet, Clock, Building, Smartphone } from "lucide-react";
import { SAMPLE_TOPUP_CARDS } from "@/lib/constants";

export default function TopupPage() {
  const router = useRouter();
  const [isLoggedIn] = useState(false);
  const [topupCardNumber, setTopupCardNumber] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (!topupCardNumber) {
      setMessage({ type: "error", text: "Please enter a valid topup card number" });
      return;
    }

    setMessage({ type: "success", text: "Topup successful! Your balance has been updated." });
    setTopupCardNumber("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                <CreditCard className="h-4 w-4" />
                Topup System
              </div>
              <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Topup Your Account
              </h1>
              <p className="text-muted-foreground">
                Add balance to your Sahaj transport card using our easy topup system
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">How Topup Works</h2>
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      1
                    </div>
                    <CardTitle className="text-foreground">Buy a Topup Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      Purchase a topup recharge card from authorized vendors or online through our platform.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      2
                    </div>
                    <CardTitle className="text-foreground">Enter Card Number</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      Log in to your account and enter the 8-digit topup card number to redeem your balance.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      3
                    </div>
                    <CardTitle className="text-foreground">Start Travelling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      Your balance is instantly credited. Use your RFID card to pay for bus rides across Kathmandu Valley.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Topup Methods */}
        <section className="border-t border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Tabs defaultValue="card" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 bg-secondary">
                  <TabsTrigger value="card">Top Up Card</TabsTrigger>
                  <TabsTrigger value="online">Online Payment</TabsTrigger>
                </TabsList>

                {/* Top Up Card Tab */}
                <TabsContent value="card" className="space-y-6">
                  {/* Topup Form */}
                  <Card className="bg-background border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <CreditCard className="h-5 w-5 text-primary" />
                        Topup Your Account
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {isLoggedIn
                          ? "Enter your topup card number to add balance"
                          : "Login to topup your account"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {message && (
                        <Alert
                          className={`mb-4 ${
                            message.type === "success"
                              ? "border-primary/50 bg-primary/10 text-primary"
                              : "border-destructive/50 bg-destructive/10 text-destructive"
                          }`}
                        >
                          {message.type === "success" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                          <AlertDescription>{message.text}</AlertDescription>
                        </Alert>
                      )}

                      <form onSubmit={handleTopup} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber" className="text-foreground">
                            Topup Card Number
                          </Label>
                          <Input
                            id="cardNumber"
                            placeholder="Enter 8-digit card number (XXXX-XXXX)"
                            value={topupCardNumber}
                            onChange={(e) => setTopupCardNumber(e.target.value)}
                            maxLength={9}
                            className="bg-input border-border text-foreground"
                          />
                        </div>

                        {isLoggedIn ? (
                          <Button type="submit" className="w-full">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Redeem Topup Card
                          </Button>
                        ) : (
                          <Button type="button" className="w-full" onClick={() => router.push("/login")}>
                            Login to Topup
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </form>
                    </CardContent>
                  </Card>

                  {/* Sample Top Up Cards */}
                  <Card className="bg-background border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Sample Top Up Cards</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Available top up cards with their status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {SAMPLE_TOPUP_CARDS.map((card) => (
                          <div
                            key={card.id}
                            className={`relative p-4 rounded-xl border ${
                              card.status === "used"
                                ? "border-muted bg-muted/20"
                                : "border-primary/30 bg-primary/5"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${
                                  card.status === "used" ? "bg-muted" : "bg-primary/20"
                                }`}>
                                  <CreditCard className={`h-5 w-5 ${
                                    card.status === "used" ? "text-muted-foreground" : "text-primary"
                                  }`} />
                                </div>
                                <div>
                                  <p className={`font-mono text-sm ${
                                    card.status === "used" ? "text-muted-foreground" : "text-foreground"
                                  }`}>
                                    {card.cardNumber}
                                  </p>
                                  <p className="text-xs text-muted-foreground">Card Code</p>
                                </div>
                              </div>
                              <Badge
                                variant={card.status === "used" ? "secondary" : "default"}
                                className={card.status === "used" ? "" : "bg-primary/20 text-primary"}
                              >
                                {card.status === "used" ? "Used" : "Available"}
                              </Badge>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Amount</span>
                                <span className={`font-semibold ${
                                  card.status === "used" ? "text-muted-foreground" : "text-primary"
                                }`}>
                                  Rs. {card.amount}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Expiry</span>
                                <span className="text-sm text-foreground">
                                  {card.expiryDate.toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>

                            {card.status === "used" && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="rotate-[-15deg] border-2 border-destructive/50 text-destructive/50 text-xs font-bold px-3 py-1 rounded">
                                  REDEEMED
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Where to Buy */}
                  <Card className="bg-background border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Where to Buy Top Up Cards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          All Sahaj authorized dealers
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          Major bus terminals and stations
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          Partner retail stores across Kathmandu
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          Nepal Bank and partner bank branches
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Online Payment Tab - Coming Soon */}
                <TabsContent value="online">
                  <Card className="bg-background border-border">
                    <CardContent className="p-8">
                      <div className="text-center space-y-6">
                        {/* Coming Soon Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30">
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <span className="text-yellow-500 font-medium">Coming Soon</span>
                        </div>

                        {/* Icon */}
                        <div className="w-24 h-24 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
                          <AlertCircle className="h-12 w-12 text-muted-foreground" />
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                          <h2 className="text-2xl font-bold text-foreground">
                            Online Payment Currently Unavailable
                          </h2>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            We are working hard to bring you online payment options including eSewa, Khalti, and bank transfers. Please use physical top up cards for now.
                          </p>
                        </div>

                        {/* Payment Methods Preview */}
                        <div className="pt-6 border-t border-border">
                          <p className="text-sm text-muted-foreground mb-4">Payment methods coming soon:</p>
                          <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 opacity-50">
                              <div className="w-8 h-8 bg-green-600/50 rounded-lg flex items-center justify-center">
                                <Smartphone className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm text-muted-foreground">eSewa</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 opacity-50">
                              <div className="w-8 h-8 bg-purple-600/50 rounded-lg flex items-center justify-center">
                                <Smartphone className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm text-muted-foreground">Khalti</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 opacity-50">
                              <div className="w-8 h-8 bg-blue-600/50 rounded-lg flex items-center justify-center">
                                <Building className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm text-muted-foreground">Bank Transfer</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 opacity-50">
                              <div className="w-8 h-8 bg-orange-600/50 rounded-lg flex items-center justify-center">
                                <CreditCard className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm text-muted-foreground">Card Payment</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
