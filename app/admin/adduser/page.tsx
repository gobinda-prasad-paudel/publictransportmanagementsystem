"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { USERS, generateUniqueId } from "@/lib/constants";
import { UserPlus, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

export default function AddUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    document_type: "",
    document_number: "",
    document_issued_from: "",
    card_number: "",
    date_of_birth: "",
  });
  const [success, setSuccess] = useState<{ message: string; userId: string } | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(null);
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if email already exists
    const existingUser = USERS.find(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (existingUser) {
      setError("A user with this email already exists.");
      setIsLoading(false);
      return;
    }

    // Generate user ID
    const userId = `USR${generateUniqueId().slice(0, 6)}`;

    // In a real app, this would save to database
    setSuccess({
      message: "User successfully created!",
      userId: userId,
    });
    setIsLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New User</h1>
        <p className="text-muted-foreground">Create a new user account in the system</p>
      </div>

      {/* Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <UserPlus className="h-5 w-5 text-primary" />
            User Information
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill in the required details to create a new user account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <Alert className="mb-6 border-primary/50 bg-primary/10">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                {success.message}
                <Button
                  variant="link"
                  className="ml-2 h-auto p-0 text-primary"
                  onClick={() => router.push(`/admin/user/${success.userId}`)}
                >
                  Visit User <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-6 border-destructive/50 bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-foreground">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="full_name"
                  placeholder="Enter full name"
                  value={formData.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone_number" className="text-foreground">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone_number"
                  type="tel"
                  placeholder="+977-98XXXXXXXX"
                  value={formData.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="date_of_birth" className="text-foreground">
                  Date of Birth
                </Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleChange("date_of_birth", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              {/* Document Type */}
              <div className="space-y-2">
                <Label htmlFor="document_type" className="text-foreground">
                  Document Type
                </Label>
                <Select
                  value={formData.document_type}
                  onValueChange={(value) => handleChange("document_type", value)}
                >
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="citizenship">Citizenship</SelectItem>
                    <SelectItem value="national_id">National ID Card</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Document Number */}
              <div className="space-y-2">
                <Label htmlFor="document_number" className="text-foreground">
                  Document Number
                </Label>
                <Input
                  id="document_number"
                  placeholder="Enter document number"
                  value={formData.document_number}
                  onChange={(e) => handleChange("document_number", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              {/* Issued From */}
              <div className="space-y-2">
                <Label htmlFor="document_issued_from" className="text-foreground">
                  Document Issued From
                </Label>
                <Input
                  id="document_issued_from"
                  placeholder="e.g., Kathmandu, Nepal"
                  value={formData.document_issued_from}
                  onChange={(e) => handleChange("document_issued_from", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              {/* Card Number */}
              <div className="space-y-2">
                <Label htmlFor="card_number" className="text-foreground">
                  Card Number (Optional)
                </Label>
                <Input
                  id="card_number"
                  placeholder="Enter card number if issued"
                  value={formData.card_number}
                  onChange={(e) => handleChange("card_number", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>

            {/* Document Upload (placeholder) */}
            <div className="space-y-2">
              <Label className="text-foreground">Document Upload</Label>
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Drag and drop document file here, or click to browse
                </p>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-2 bg-transparent"
                />
              </div>
            </div>

            {/* Created By */}
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Account Created By:</span>
                <span className="text-foreground font-medium">ADM001 (Main Admin)</span>
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Generate User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
