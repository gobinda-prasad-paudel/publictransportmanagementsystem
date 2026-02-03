"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Smartphone, Building, CheckCircle2, Wallet, Clock, AlertCircle } from "lucide-react";
import { MOCK_USERS, SAMPLE_TOPUP_CARDS } from "@/lib/constants";

export default function UserTopupPage() {
  const [cardCode, setCardCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const user = MOCK_USERS[0];

  const handleCardTopup = async () => {
    if (!cardCode || cardCode.length < 8) return;

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    setCardCode("");

    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="border-border bg-card max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Top Up Successful!
            </h2>
            <p className="text-muted-foreground mb-4">
              Your balance has been updated successfully.
            </p>
            <p className="text-lg font-semibold text-primary">
              New Balance: Rs. {(user.balance + 500).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Top Up Balance</h1>
        <p className="text-muted-foreground">
          Add funds to your transit card
        </p>
      </div>

      {/* Current Balance */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/20 rounded-full">
              <Wallet className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-3xl font-bold text-foreground">
                Rs. {user.balance.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="card" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="card">Top Up Card</TabsTrigger>
          <TabsTrigger value="online">Online Payment</TabsTrigger>
        </TabsList>

        {/* Top Up Card Tab */}
        <TabsContent value="card" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Redeem Top Up Card</CardTitle>
              <CardDescription>
                Enter the code from your physical top up card purchased at authorized dealers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cardCode">Card Code</Label>
                <Input
                  id="cardCode"
                  placeholder="XXXX-XXXX"
                  value={cardCode}
                  onChange={(e) => setCardCode(e.target.value.toUpperCase())}
                  className="bg-secondary border-border text-center text-lg tracking-wider"
                  maxLength={9}
                />
                <p className="text-sm text-muted-foreground">
                  Scratch the card to reveal the 8-digit code
                </p>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleCardTopup}
                disabled={cardCode.length < 8 || isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary-foreground" />
                    Validating...
                  </span>
                ) : (
                  "Redeem Card"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Sample Top Up Cards Display */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Sample Top Up Cards</CardTitle>
              <CardDescription>
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
                    {/* Mini Card Design */}
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
                      {card.status === "used" && card.usedBy && (
                        <div className="flex justify-between items-center pt-2 border-t border-border">
                          <span className="text-sm text-muted-foreground">Used by</span>
                          <span className="text-sm text-muted-foreground">{card.usedBy}</span>
                        </div>
                      )}
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

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Where to Buy Top Up Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  All Sahaj authorized dealers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Major bus terminals and stations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Partner retail stores across Kathmandu
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Nepal Bank and partner bank branches
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Online Payment Tab - Coming Soon */}
        <TabsContent value="online" className="space-y-6">
          <Card className="border-border bg-card">
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

                {/* Alternative Action */}
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    In the meantime, you can top up using physical cards:
                  </p>
                  <Button variant="outline" className="bg-transparent" onClick={() => {
                    const tabsList = document.querySelector('[role="tablist"]');
                    const cardTab = tabsList?.querySelector('[value="card"]') as HTMLButtonElement;
                    cardTab?.click();
                  }}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Use Top Up Card
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
