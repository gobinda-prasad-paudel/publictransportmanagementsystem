"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Phone,
  MapPin,
  Shield,
  CheckCircle2,
  Clock,
  Send,
} from "lucide-react";
import { MOCK_USERS } from "@/lib/constants";

export default function UserSOSPage() {
  const user = MOCK_USERS[0];
  const [sosMessage, setSosMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sosHistory, setSosHistory] = useState([
    {
      id: "SOS001",
      date: "2024-01-15 14:30",
      message: "Suspicious activity on bus",
      status: "resolved",
      location: "Route 23 - Ratnapark",
    },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendSOS = async () => {
    if (!sosMessage.trim()) return;

    setIsSending(true);
    // Simulate sending SOS
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newSOS = {
      id: `SOS${String(sosHistory.length + 1).padStart(3, "0")}`,
      date: new Date().toLocaleString(),
      message: sosMessage,
      status: "pending",
      location: "Current Location",
    };

    setSosHistory([newSOS, ...sosHistory]);
    setSosMessage("");
    setIsSending(false);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 5000);
  };

  const emergencyContacts = [
    { name: "Police", number: "100", icon: Shield },
    { name: "Ambulance", number: "102", icon: Phone },
    { name: "Sahaj Helpline", number: "1660-01-SAHAJ", icon: Phone },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Emergency SOS</h1>
        <p className="text-muted-foreground">
          Send emergency alerts or report safety concerns
        </p>
      </div>

      {showSuccess && (
        <Card className="border-primary bg-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">SOS Alert Sent!</p>
                <p className="text-sm text-muted-foreground">
                  Our team has been notified and will respond shortly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick SOS */}
        <Card className="border-destructive/50 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Quick Emergency Alert
            </CardTitle>
            <CardDescription>
              Press the button below to send an immediate SOS with your location
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="destructive"
              size="lg"
              className="w-full h-24 text-xl"
              onClick={() => {
                setSosMessage("Emergency! Need immediate assistance.");
                handleSendSOS();
              }}
              disabled={isSending}
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                  Sending SOS...
                </span>
              ) : (
                <>
                  <AlertTriangle className="mr-2 h-6 w-6" />
                  EMERGENCY SOS
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Your current location will be automatically shared with
              authorities
            </p>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
            <CardDescription>
              Quick dial numbers for emergency services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact) => (
              <a
                key={contact.number}
                href={`tel:${contact.number}`}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <contact.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {contact.number}
                    </p>
                  </div>
                </div>
                <Phone className="h-5 w-5 text-primary" />
              </a>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Report */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Report an Issue</CardTitle>
          <CardDescription>
            Provide details about the situation for our response team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe the emergency or safety concern in detail..."
            value={sosMessage}
            onChange={(e) => setSosMessage(e.target.value)}
            className="min-h-32 bg-secondary border-border"
          />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Your location will be shared: Kathmandu, Nepal</span>
          </div>
          <Button
            onClick={handleSendSOS}
            disabled={!sosMessage.trim() || isSending}
            className="w-full"
          >
            {isSending ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary-foreground" />
                Sending...
              </span>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* SOS History */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Recent SOS Alerts</CardTitle>
          <CardDescription>Your previous emergency reports</CardDescription>
        </CardHeader>
        <CardContent>
          {sosHistory.length > 0 ? (
            <div className="space-y-4">
              {sosHistory.map((sos) => (
                <div
                  key={sos.id}
                  className="flex items-start justify-between p-4 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        sos.status === "resolved"
                          ? "bg-primary/20"
                          : "bg-yellow-500/20"
                      }`}
                    >
                      {sos.status === "resolved" ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{sos.message}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {sos.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {sos.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={sos.status === "resolved" ? "default" : "secondary"}
                    className={
                      sos.status === "resolved"
                        ? "bg-primary/20 text-primary"
                        : "bg-yellow-500/20 text-yellow-500"
                    }
                  >
                    {sos.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No previous SOS alerts</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Safety Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span>
                Always keep your phone charged and accessible during travel
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span>
                Share your live location with family members during long trips
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span>
                Report any suspicious activity immediately to the driver or
                authorities
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span>
                Stay alert and aware of your surroundings, especially at night
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
