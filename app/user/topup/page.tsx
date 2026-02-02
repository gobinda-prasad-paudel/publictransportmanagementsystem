"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone, Building, CheckCircle2, Wallet } from "lucide-react";
import { MOCK_USERS } from "@/lib/constants";

const TOPUP_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

export default function UserTopupPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [cardCode, setCardCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const user = MOCK_USERS[0];

  const handleTopup = async () => {
    const amount = selectedAmount || Number(customAmount);
    if (!amount || amount < 50) return;

    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setSelectedAmount(null);
      setCustomAmount("");
    }, 3000);
  };

  const handleCardTopup = async () => {
    if (!cardCode || cardCode.length < 10) return;

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
              New Balance: Rs. {(user.balance + (selectedAmount || Number(customAmount) || 500)).toFixed(2)}
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

      <Tabs defaultValue="online" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="online">Online Payment</TabsTrigger>
          <TabsTrigger value="card">Top Up Card</TabsTrigger>
        </TabsList>

        <TabsContent value="online" className="space-y-6">
          {/* Select Amount */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Select Amount</CardTitle>
              <CardDescription>Choose a preset amount or enter a custom value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {TOPUP_AMOUNTS.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className="h-16 text-lg"
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                  >
                    Rs. {amount}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-4">
                <Label htmlFor="custom" className="text-muted-foreground whitespace-nowrap">
                  Custom Amount:
                </Label>
                <Input
                  id="custom"
                  type="number"
                  placeholder="Enter amount (min Rs. 50)"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="bg-secondary border-border"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment option</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                <div className={`flex items-center space-x-3 p-4 rounded-lg border ${paymentMethod === 'esewa' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value="esewa" id="esewa" />
                  <Label htmlFor="esewa" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">eSewa</p>
                      <p className="text-sm text-muted-foreground">Pay with eSewa wallet</p>
                    </div>
                  </Label>
                </div>

                <div className={`flex items-center space-x-3 p-4 rounded-lg border ${paymentMethod === 'khalti' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value="khalti" id="khalti" />
                  <Label htmlFor="khalti" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Khalti</p>
                      <p className="text-sm text-muted-foreground">Pay with Khalti wallet</p>
                    </div>
                  </Label>
                </div>

                <div className={`flex items-center space-x-3 p-4 rounded-lg border ${paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Building className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-muted-foreground">Connect Bank / Mobile Banking</p>
                    </div>
                  </Label>
                </div>

                <div className={`flex items-center space-x-3 p-4 rounded-lg border ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Debit/Credit Card</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard accepted</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Summary and Pay Button */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Top Up Amount</span>
                  <span className="text-foreground">Rs. {(selectedAmount || Number(customAmount) || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="text-foreground">Rs. 0.00</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">Rs. {(selectedAmount || Number(customAmount) || 0).toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handleTopup}
                disabled={(!selectedAmount && !customAmount) || isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary-foreground" />
                    Processing...
                  </span>
                ) : (
                  `Pay Rs. ${(selectedAmount || Number(customAmount) || 0).toFixed(2)}`
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

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
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={cardCode}
                  onChange={(e) => setCardCode(e.target.value.toUpperCase())}
                  className="bg-secondary border-border text-center text-lg tracking-wider"
                  maxLength={19}
                />
                <p className="text-sm text-muted-foreground">
                  Scratch the card to reveal the 16-digit code
                </p>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleCardTopup}
                disabled={cardCode.length < 10 || isProcessing}
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

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Where to buy Top Up Cards</CardTitle>
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
      </Tabs>
    </div>
  );
}
