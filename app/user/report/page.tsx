"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Send,
  Upload,
} from "lucide-react";
import { MOCK_ROUTES } from "@/lib/constants";

export default function UserReportPage() {
  const [reportType, setReportType] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [reports, setReports] = useState([
    {
      id: "RPT001",
      type: "harassment",
      date: "2024-01-10",
      description: "Conductor was rude and overcharged fare",
      status: "investigating",
      route: "Route 23",
    },
    {
      id: "RPT002",
      type: "service",
      date: "2024-01-05",
      description: "Bus did not stop at designated stop",
      status: "resolved",
      route: "Route 15",
    },
  ]);

  const reportTypes = [
    { value: "harassment", label: "Harassment / Misconduct" },
    { value: "overcharge", label: "Fare Overcharge" },
    { value: "service", label: "Service Issue" },
    { value: "safety", label: "Safety Concern" },
    { value: "cleanliness", label: "Cleanliness Issue" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async () => {
    if (!reportType || !description.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newReport = {
      id: `RPT${String(reports.length + 1).padStart(3, "0")}`,
      type: reportType,
      date: new Date().toISOString().split("T")[0],
      description: description,
      status: "pending",
      route: selectedRoute || "N/A",
    };

    setReports([newReport, ...reports]);
    setReportType("");
    setSelectedRoute("");
    setVehicleNumber("");
    setDescription("");
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-primary/20 text-primary";
      case "investigating":
        return "bg-yellow-500/20 text-yellow-500";
      default:
        return "bg-blue-500/20 text-blue-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Report an Issue</h1>
        <p className="text-muted-foreground">
          Help us improve by reporting problems or concerns
        </p>
      </div>

      {showSuccess && (
        <Card className="border-primary bg-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">Report Submitted!</p>
                <p className="text-sm text-muted-foreground">
                  Thank you for your feedback. We&apos;ll investigate and respond
                  within 48 hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Report Form */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Submit a Report</CardTitle>
          <CardDescription>
            Please provide as much detail as possible to help us investigate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type *</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="route">Route (Optional)</Label>
              <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select route" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_ROUTES.map((route) => (
                    <SelectItem key={route.id} value={route.name}>
                      {route.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle Number (Optional)</Label>
              <Input
                id="vehicle"
                placeholder="e.g., Ba 2 Kha 1234"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date of Incident</Label>
              <Input
                id="date"
                type="date"
                className="bg-secondary border-border"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Please describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Attachments (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports images and documents up to 5MB
              </p>
              <Button variant="outline" className="mt-4 bg-transparent">
                Browse Files
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!reportType || !description.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary-foreground" />
                Submitting...
              </span>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Previous Reports */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Your Reports</CardTitle>
          <CardDescription>Track the status of your submitted reports</CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 rounded-lg bg-secondary/50 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-full">
                        {report.type === "harassment" ? (
                          <AlertTriangle className="h-5 w-5 text-primary" />
                        ) : (
                          <MessageSquare className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground capitalize">
                          {report.type.replace("_", " ")} Report
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {report.id} - {report.date}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground pl-12">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-4 pl-12 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {report.route}
                    </span>
                    {report.status === "investigating" && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Under review
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No reports submitted yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Reporting Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span>
                Be as specific as possible - include dates, times, and locations
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span>
                If available, provide vehicle numbers or driver identification
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span>
                Attach photos or documents if they help illustrate the issue
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span>
                For emergencies, use the SOS feature for immediate assistance
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
