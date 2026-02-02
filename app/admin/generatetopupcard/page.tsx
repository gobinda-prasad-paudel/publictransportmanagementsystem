"use client";

import React from "react"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DataTable } from "@/components/data-table";
import { generateUniqueId, TopupCard } from "@/lib/constants";
import { CreditCard, Download, CheckCircle, Loader2 } from "lucide-react";

// Initial batch ID
let currentBatchId = 15891002;

export default function GenerateTopupCardPage() {
  const [numberOfCards, setNumberOfCards] = useState("");
  const [amount, setAmount] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCards, setGeneratedCards] = useState<TopupCard[]>([]);
  const [currentBatch, setCurrentBatch] = useState("");
  const [success, setSuccess] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setSuccess("");

    // Simulate generation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const count = parseInt(numberOfCards);
    const cardAmount = parseInt(amount);
    const batchId = currentBatchId.toString();
    currentBatchId++;

    const newCards: TopupCard[] = [];
    const now = new Date();
    const expiryDate = new Date(now);
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);

    for (let i = 0; i < count; i++) {
      newCards.push({
        topup_card_id: `TC${Date.now()}${i}`,
        topup_card_number: generateUniqueId(),
        product_batch_id: batchId,
        balance: cardAmount,
        is_used: false,
        used_by_user_id: null,
        generated_on: now,
        expiry_date: expiryDate,
        generated_by_admin_id: "ADM001",
        createdAt: now,
        updatedAt: now,
      });
    }

    setGeneratedCards(newCards);
    setCurrentBatch(batchId);
    setSuccess(`Successfully generated ${count} topup cards with batch ID ${batchId}`);
    setIsGenerating(false);
  };

  const handleDownloadPDF = () => {
    // Create printable content
    const content = `
      Project Sahaj - Topup Cards
      Batch ID: ${currentBatch}
      Generated On: ${new Date().toLocaleDateString()}
      Expiry Date: ${generatedCards[0]?.expiry_date.toLocaleDateString()}
      
      Total Cards: ${generatedCards.length}
      Amount per Card: Rs. ${generatedCards[0]?.balance}
      
      Card Numbers:
      ${generatedCards.map((card, i) => `${i + 1}. ${card.topup_card_number}`).join('\n')}
    `;

    // Create blob and download
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `topup_cards_batch_${currentBatch}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const cardColumns = [
    { header: "#", cell: (_: TopupCard, index?: number) => (index ?? 0) + 1 },
    { header: "Card Number", accessorKey: "topup_card_number" as const },
    { header: "Batch ID", accessorKey: "product_batch_id" as const },
    {
      header: "Balance",
      cell: (row: TopupCard) => <span className="text-primary">Rs. {row.balance}</span>,
    },
    {
      header: "Status",
      cell: (row: TopupCard) => (
        <span className={row.is_used ? "text-muted-foreground" : "text-primary"}>
          {row.is_used ? "Used" : "Available"}
        </span>
      ),
    },
    {
      header: "Generated On",
      cell: (row: TopupCard) => new Date(row.generated_on).toLocaleDateString(),
    },
    {
      header: "Expiry Date",
      cell: (row: TopupCard) => new Date(row.expiry_date).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Generate Topup Cards</h1>
        <p className="text-muted-foreground">Create new topup cards for distribution</p>
      </div>

      {/* Generation Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CreditCard className="h-5 w-5 text-primary" />
            New Batch
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter the details to generate a new batch of topup cards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="count" className="text-foreground">
                  Number of Cards
                </Label>
                <Input
                  id="count"
                  type="number"
                  placeholder="Enter number of cards"
                  value={numberOfCards}
                  onChange={(e) => setNumberOfCards(e.target.value)}
                  min="1"
                  max="100"
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-foreground">
                  Amount per Card (Rs.)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="50"
                  step="50"
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> Each batch will have a unique product_batch_id 
                starting from 15891000. Cards will have a default expiry of 2 years from generation date.
              </p>
            </div>

            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Generate Cards
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Message */}
      {success && (
        <Alert className="border-primary/50 bg-primary/10">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">{success}</AlertDescription>
        </Alert>
      )}

      {/* Generated Cards Table */}
      {generatedCards.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Generated Cards - Batch {currentBatch}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {generatedCards.length} cards generated successfully
                </CardDescription>
              </div>
              <Button onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={cardColumns} 
              data={generatedCards.map((card, index) => ({ ...card, _index: index }))} 
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
