"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HARASSMENTS, USERS } from "@/lib/constants";
import {
  MessageSquareWarning,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Bus,
  User,
  Phone,
  FileText,
  ImageIcon,
} from "lucide-react";

export default function HarassmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const harassmentId = params.id as string;

  const harassment = HARASSMENTS.find((h) => h.harrassmentId === harassmentId);
  const customer = harassment ? USERS.find((u) => u.userId === harassment.customer_id) : null;

  const [status, setStatus] = useState(harassment?.status || "pending");
  const [success, setSuccess] = useState("");

  if (!harassment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold text-foreground">Report Not Found</h2>
        <p className="text-muted-foreground">The harassment report with ID {harassmentId} does not exist.</p>
        <Button onClick={() => router.push("/admin/harrassments")}>Back to Reports</Button>
      </div>
    );
  }

  const handleResolve = () => {
    setStatus("resolved");
    setSuccess("Report has been marked as resolved.");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleReject = () => {
    setStatus("rejected");
    setSuccess("Report has been rejected.");
    setTimeout(() => setSuccess(""), 3000);
  };

  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-500">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-primary/20 text-primary">
            <CheckCircle className="mr-1 h-3 w-3" /> Resolved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/20 text-destructive">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Harassment Report Details</h1>
          <p className="text-muted-foreground">Review and take action on this report</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin/harrassments")}>
          Back to Reports
        </Button>
      </div>

      {success && (
        <Alert className="border-primary/50 bg-primary/10">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">{success}</AlertDescription>
        </Alert>
      )}

      {/* Status and Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquareWarning className="h-5 w-5 text-primary" />
              <CardTitle className="text-foreground">Report #{harassment.harrassmentId}</CardTitle>
              {getStatusBadge()}
            </div>
            {status === "pending" && (
              <div className="flex gap-3">
                <Button onClick={handleResolve}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Resolved
                </Button>
                <Button variant="destructive" onClick={handleReject}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Report Details Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bus Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Bus className="h-5 w-5 text-primary" />
              Bus Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bus ID:</span>
              <span className="font-medium text-foreground">{harassment.bus_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Route Number:</span>
              <span className="font-medium text-foreground">{harassment.route_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Travel ID:</span>
              <span className="font-mono text-foreground">{harassment.travelling_id}</span>
            </div>
          </CardContent>
        </Card>

        {/* Driver Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <User className="h-5 w-5 text-primary" />
              Driver Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Driver Name:</span>
              <span className="font-medium text-foreground">{harassment.driver_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Driver Number:</span>
              <span className="font-medium text-foreground">{harassment.driver_number}</span>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <User className="h-5 w-5 text-primary" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer ID:</span>
              <span className="font-medium text-foreground">{harassment.customer_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium text-foreground">{customer?.full_name || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contact:</span>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground">{harassment.customer_contact}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timing Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Clock className="h-5 w-5 text-primary" />
              Timing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Filed At:</span>
              <span className="font-medium text-foreground">
                {new Date(harassment.filed_at).toLocaleString()}
              </span>
            </div>
            {harassment.resolved_at && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resolved At:</span>
                <span className="font-medium text-foreground">
                  {new Date(harassment.resolved_at).toLocaleString()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Harassment Message */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FileText className="h-5 w-5 text-primary" />
            Harassment Message
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Description provided by the customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-foreground whitespace-pre-wrap">{harassment.message}</p>
          </div>
        </CardContent>
      </Card>

      {/* Evidence */}
      {harassment.evidence_file_url && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <ImageIcon className="h-5 w-5 text-primary" />
              Evidence
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              File uploaded as evidence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">{harassment.evidence_file_url}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
