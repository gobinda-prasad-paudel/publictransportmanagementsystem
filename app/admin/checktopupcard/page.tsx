"use client";

import React from "react"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TOPUP_CARDS, TopupCard } from "@/lib/constants";
import { Search, CheckCircle, XCircle, AlertTriangle, CreditCard } from "lucide-react";

export default function CheckTopupCardPage() {
  const [searchType, setSearchType] = useState<"batch" | "card">("card");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<TopupCard | null>(null);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSearchResult(null);

    let card: TopupCard | undefined;

    if (searchType === "batch") {
      card = TOPUP_CARDS.find((c) => c.product_batch_id === searchValue);
    } else {
      card = TOPUP_CARDS.find((c) => c.topup_card_number === searchValue);
    }

    if (!card) {
      setError(`No topup card found with the provided ${searchType === "batch" ? "batch ID" : "card number"}.`);
      return;
    }

    setSearchResult(card);
    setShowDialog(true);
  };

  const isExpired = searchResult
    ? new Date(searchResult.expiry_date) < new Date()
    : false;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Check Topup Card</h1>
        <p className="text-muted-foreground">Verify the status of a topup card</p>
      </div>

      {/* Search Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Search className="h-5 w-5 text-primary" />
            Search Card
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Search by batch ID or card number to check the status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Type */}
            <div className="space-y-3">
              <Label className="text-foreground">Search By</Label>
              <RadioGroup
                value={searchType}
                onValueChange={(value) => setSearchType(value as "batch" | "card")}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="text-foreground cursor-pointer">
                    Topup Card Number (8 digit)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="batch" id="batch" />
                  <Label htmlFor="batch" className="text-foreground cursor-pointer">
                    Product Batch ID
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <Label htmlFor="search" className="text-foreground">
                {searchType === "batch" ? "Product Batch ID" : "Topup Card Number"}
              </Label>
              <Input
                id="search"
                type="text"
                placeholder={
                  searchType === "batch"
                    ? "Enter product batch ID (e.g., 15891000)"
                    : "Enter 8-digit card number"
                }
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-input border-border text-foreground"
                required
              />
            </div>

            {error && (
              <Alert className="border-destructive/50 bg-destructive/10">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Sample Cards for Testing */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Sample Cards for Testing</CardTitle>
          <CardDescription className="text-muted-foreground">
            Use these card numbers to test the search functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TOPUP_CARDS.map((card) => (
              <div
                key={card.topup_card_id}
                className="rounded-lg border border-border bg-muted/30 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="font-mono text-sm text-foreground">
                    {card.topup_card_number}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Batch: {card.product_batch_id}
                </div>
                <div className="text-xs text-muted-foreground">
                  Status: {card.is_used ? "Used" : "Available"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Result Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Card Status</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Topup card verification result
            </DialogDescription>
          </DialogHeader>

          {searchResult && (
            <div className="space-y-6">
              {/* Status Indicators */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
                  <div className="mb-2">
                    {searchResult ? (
                      <CheckCircle className="mx-auto h-8 w-8 text-primary" />
                    ) : (
                      <XCircle className="mx-auto h-8 w-8 text-destructive" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-foreground">Valid</div>
                  <div className="text-xs text-muted-foreground">Card exists in system</div>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
                  <div className="mb-2">
                    {searchResult.is_used ? (
                      <XCircle className="mx-auto h-8 w-8 text-destructive" />
                    ) : (
                      <CheckCircle className="mx-auto h-8 w-8 text-primary" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {searchResult.is_used ? "Used" : "Available"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {searchResult.is_used ? "Already redeemed" : "Can be used"}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
                  <div className="mb-2">
                    {isExpired ? (
                      <XCircle className="mx-auto h-8 w-8 text-destructive" />
                    ) : (
                      <CheckCircle className="mx-auto h-8 w-8 text-primary" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {isExpired ? "Expired" : "Valid"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Expires: {new Date(searchResult.expiry_date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
                <h4 className="font-semibold text-foreground">Card Details</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Card Number:</span>
                    <span className="font-mono text-foreground">{searchResult.topup_card_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Batch ID:</span>
                    <span className="font-mono text-foreground">{searchResult.product_batch_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Balance:</span>
                    <span className="text-primary font-semibold">Rs. {searchResult.balance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Generated On:</span>
                    <span className="text-foreground">
                      {new Date(searchResult.generated_on).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expiry Date:</span>
                    <span className={isExpired ? "text-destructive" : "text-foreground"}>
                      {new Date(searchResult.expiry_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
