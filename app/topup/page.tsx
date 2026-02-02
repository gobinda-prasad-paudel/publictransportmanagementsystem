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
import { CreditCard, ShoppingCart, CheckCircle, AlertCircle, ArrowRight, Wallet } from "lucide-react";

const topupAmounts = [100, 200, 500, 1000];

const rechargeCards = [
  { id: 1, amount: 100, price: 100, description: "Basic recharge card" },
  { id: 2, amount: 200, price: 200, description: "Standard recharge card" },
  { id: 3, amount: 500, price: 500, description: "Premium recharge card" },
  { id: 4, amount: 1000, price: 1000, description: "Gold recharge card" },
];

export default function TopupPage() {
  const router = useRouter();
  const [isLoggedIn] = useState(false); // Would check localStorage in real app
  const [topupCardNumber, setTopupCardNumber] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
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

    // Simulate topup
    setMessage({ type: "success", text: "Topup successful! Your balance has been updated." });
    setTopupCardNumber("");
  };

  const handleBuyCard = (cardId: number) => {
    // In a real app, this would redirect to a payment gateway
    setMessage({ type: "success", text: "Redirecting to payment gateway..." });
    setTimeout(() => {
      setMessage({ type: "success", text: "This is a demo. In production, you would be redirected to a payment gateway." });
    }, 1500);
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

        {/* Buy Recharge Cards */}
        <section className="border-t border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Buy Recharge Cards</h2>
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {rechargeCards.map((card) => (
                  <Card key={card.id} className="bg-background border-border hover:border-primary/50 transition-colors">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Wallet className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl text-foreground">Rs. {card.amount}</CardTitle>
                      <CardDescription className="text-muted-foreground">{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        onClick={() => handleBuyCard(card.id)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Topup Account */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-md">
              <Card className="bg-card border-border">
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
                        placeholder="Enter 8-digit card number"
                        value={topupCardNumber}
                        onChange={(e) => setTopupCardNumber(e.target.value)}
                        maxLength={8}
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
