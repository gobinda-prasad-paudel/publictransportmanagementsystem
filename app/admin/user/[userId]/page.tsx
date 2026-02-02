"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/data-table";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  USERS,
  CARDS,
  TRAVEL_HISTORY,
  TRANSACTIONS,
  TOPUP_CARDS,
  User,
  Card as CardType,
  TravelHistory,
} from "@/lib/constants";
import {
  User as UserIcon,
  Wallet,
  CreditCard,
  History,
  Shield,
  Trash2,
  Save,
  AlertCircle,
  CheckCircle,
  QrCode,
  Pause,
  Play,
  Unlink,
} from "lucide-react";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  // Find user
  const user = USERS.find((u) => u.userId === userId);

  const [formData, setFormData] = useState<Partial<User>>(
    user || {
      full_name: "",
      email: "",
      phone_number: "",
      document_type: "citizenship",
      document_number: "",
      document_issued_from: "",
      date_of_birth: new Date(),
    }
  );
  const [showDeleteConfirm1, setShowDeleteConfirm1] = useState(false);
  const [showDeleteConfirm2, setShowDeleteConfirm2] = useState(false);
  const [showUnlinkConfirm1, setShowUnlinkConfirm1] = useState(false);
  const [showUnlinkConfirm2, setShowUnlinkConfirm2] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold text-foreground">User Not Found</h2>
        <p className="text-muted-foreground">The user with ID {userId} does not exist.</p>
        <Button onClick={() => router.push("/admin/users")}>Back to Users</Button>
      </div>
    );
  }

  // Get user's cards, travel history, and topup history
  const userCards = CARDS.filter((c) => c.cardlinkedAccountid === userId);
  const userTravelHistory = TRAVEL_HISTORY.filter((t) => t.userId === userId).slice(-10);
  const userTopupHistory = TRANSACTIONS.filter(
    (t) => t.userId === userId && t.transaction_type === "topup"
  ).slice(-5);

  const totalTopupAmount = TRANSACTIONS.filter(
    (t) => t.userId === userId && t.transaction_type === "topup"
  ).reduce((sum, t) => sum + t.amount, 0);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    setSuccess("User information updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDeleteStep1 = () => {
    setShowDeleteConfirm1(false);
    setShowDeleteConfirm2(true);
  };

  const handleDeleteStep2 = () => {
    setShowDeleteConfirm2(false);
    setSuccess("User has been deactivated successfully.");
    setTimeout(() => router.push("/admin/users"), 2000);
  };

  const handleUnlinkStep1 = (cardId: string) => {
    setSelectedCard(cardId);
    setShowUnlinkConfirm1(true);
  };

  const handleUnlinkStep2 = () => {
    setShowUnlinkConfirm1(false);
    setShowUnlinkConfirm2(true);
  };

  const handleUnlinkFinal = () => {
    setShowUnlinkConfirm2(false);
    setSuccess(`Card ${selectedCard} has been unlinked from this account.`);
    setSelectedCard(null);
    setTimeout(() => setSuccess(""), 3000);
  };

  // Travel history columns
  const travelColumns = [
    { header: "ID", accessorKey: "travelId" as const },
    {
      header: "Date",
      cell: (row: TravelHistory) => new Date(row.travelled_on).toLocaleDateString(),
    },
    {
      header: "Time",
      cell: (row: TravelHistory) => new Date(row.travelled_on).toLocaleTimeString(),
    },
    { header: "From", accessorKey: "from" as const },
    { header: "To", accessorKey: "to" as const },
    {
      header: "Price",
      cell: (row: TravelHistory) => <span className="text-primary">Rs. {row.price}</span>,
    },
    { header: "Mode", accessorKey: "payment_mode" as const },
  ];

  // Topup history columns
  const topupColumns = [
    { header: "ID", accessorKey: "transactionId" as const },
    {
      header: "Date",
      cell: (row: (typeof TRANSACTIONS)[0]) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Time",
      cell: (row: (typeof TRANSACTIONS)[0]) => new Date(row.createdAt).toLocaleTimeString(),
    },
    {
      header: "Amount",
      cell: (row: (typeof TRANSACTIONS)[0]) => (
        <span className="text-primary">Rs. {row.amount}</span>
      ),
    },
    {
      header: "Card Number",
      cell: (row: (typeof TRANSACTIONS)[0]) => {
        const card = TOPUP_CARDS.find((c) => c.topup_card_number === row.reference_id);
        return card?.topup_card_number || row.reference_id;
      },
    },
  ];

  // Cards columns
  const cardColumns = [
    { header: "Card ID", accessorKey: "cardId" as const },
    {
      header: "Issued Date",
      cell: (row: CardType) => new Date(row.Cardlinkeddate).toLocaleDateString(),
    },
    {
      header: "Status",
      cell: (row: CardType) => (
        <div className="flex gap-2">
          {row.Isfreezed && (
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
              Frozen
            </Badge>
          )}
          {!row.Is_card_active && (
            <Badge variant="destructive" className="bg-destructive/20 text-destructive">
              Inactive
            </Badge>
          )}
          {row.Is_card_active && !row.Isfreezed && (
            <Badge className="bg-primary/20 text-primary">Active</Badge>
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      cell: (row: CardType) => (
        <div className="flex gap-2">
          {row.Is_card_active && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {}}
                className={row.Isfreezed ? "text-primary" : "text-yellow-500"}
              >
                {row.Isfreezed ? (
                  <>
                    <Play className="mr-1 h-3 w-3" /> Resume
                  </>
                ) : (
                  <>
                    <Pause className="mr-1 h-3 w-3" /> Freeze
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUnlinkStep1(row.cardId)}
                className="text-destructive"
              >
                <Unlink className="mr-1 h-3 w-3" /> Unlink
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Details</h1>
          <p className="text-muted-foreground">View and manage user information</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.push("/admin/users")}>
            Back to Users
          </Button>
        </div>
      </div>

      {success && (
        <Alert className="border-primary/50 bg-primary/10">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">{success}</AlertDescription>
        </Alert>
      )}

      {/* QR Code and Balance */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <QrCode className="h-5 w-5 text-primary" />
              User QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-xs text-muted-foreground p-2">
                <QrCode className="h-16 w-16 mx-auto mb-2 text-primary" />
                QR Data:<br />
                {JSON.stringify({ userId: user.userId, name: user.full_name })}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Scan for user identification</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Wallet className="h-5 w-5 text-primary" />
              Account Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-2">Rs. {user.balance}</div>
            <p className="text-sm text-muted-foreground">Available balance</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Shield className="h-5 w-5 text-primary" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Verified:</span>
                <Badge className={user.is_verified ? "bg-primary/20 text-primary" : "bg-muted"}>
                  {user.is_verified ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active:</span>
                <Badge className={user.is_active ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"}>
                  {user.is_active ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Information Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <UserIcon className="h-5 w-5 text-primary" />
            Profile Information
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Update user profile details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-foreground">User ID</Label>
              <Input value={user.userId} disabled className="bg-muted border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Full Name</Label>
              <Input
                value={formData.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Email</Label>
              <Input
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Phone Number</Label>
              <Input
                value={formData.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Document Type</Label>
              <Select
                value={formData.document_type}
                onValueChange={(value) => handleChange("document_type", value)}
              >
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="citizenship">Citizenship</SelectItem>
                  <SelectItem value="national_id">National ID Card</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Document Number</Label>
              <Input
                value={formData.document_number}
                onChange={(e) => handleChange("document_number", e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Document Issued From</Label>
              <Input
                value={formData.document_issued_from}
                onChange={(e) => handleChange("document_issued_from", e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Date of Birth</Label>
              <Input
                type="date"
                value={new Date(formData.date_of_birth || "").toISOString().split("T")[0]}
                onChange={(e) => handleChange("date_of_birth", e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Account Created By</Label>
              <Input value={user.account_created_by_admin_id} disabled className="bg-muted border-border text-foreground" />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={handleUpdate}>
              <Save className="mr-2 h-4 w-4" />
              Update User
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteConfirm1(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Travel History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <History className="h-5 w-5 text-primary" />
            Travel History (Latest 10)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={travelColumns} data={userTravelHistory} emptyMessage="No travel history" />
        </CardContent>
      </Card>

      {/* Topup History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Wallet className="h-5 w-5 text-primary" />
              Topup History (Latest 5)
            </CardTitle>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Amount Topped Up</p>
              <p className="text-xl font-bold text-primary">Rs. {totalTopupAmount}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={topupColumns} data={userTopupHistory} emptyMessage="No topup history" />
        </CardContent>
      </Card>

      {/* Linked Cards */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CreditCard className="h-5 w-5 text-primary" />
            Linked Cards (Latest 5)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={cardColumns} data={userCards.slice(-5)} emptyMessage="No cards linked" />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialogs */}
      <ConfirmDialog
        open={showDeleteConfirm1}
        onOpenChange={setShowDeleteConfirm1}
        title="Delete User"
        description="Are you sure you want to delete this user? This will deactivate their account."
        confirmText="Continue"
        onConfirm={handleDeleteStep1}
        variant="destructive"
      />
      <ConfirmDialog
        open={showDeleteConfirm2}
        onOpenChange={setShowDeleteConfirm2}
        title="Confirm Deletion"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete User"
        onConfirm={handleDeleteStep2}
        variant="destructive"
      />

      {/* Unlink Card Confirmation Dialogs */}
      <ConfirmDialog
        open={showUnlinkConfirm1}
        onOpenChange={setShowUnlinkConfirm1}
        title="Unlink Card"
        description={`Are you sure you want to unlink card ${selectedCard} from this user?`}
        confirmText="Continue"
        onConfirm={handleUnlinkStep2}
        variant="destructive"
      />
      <ConfirmDialog
        open={showUnlinkConfirm2}
        onOpenChange={setShowUnlinkConfirm2}
        title="Confirm Unlink"
        description={`Are you sure you want to unlink card ${selectedCard} from this user?`}
        confirmText="Unlink Card"
        onConfirm={handleUnlinkFinal}
        variant="destructive"
      />
    </div>
  );
}
