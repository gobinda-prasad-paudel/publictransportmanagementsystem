"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TransportMap } from "@/components/map";
import { ROUTES, Route as RouteType } from "@/lib/constants";
import { Route, MapPin, Save, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

export default function RouteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const routeId = parseInt(params.routeId as string);

  const route = ROUTES.find((r) => r.routeId === routeId);

  const [formData, setFormData] = useState<Partial<RouteType>>(
    route || {
      from: "",
      to: "",
      bus_number: "",
    }
  );
  const [success, setSuccess] = useState("");

  if (!route) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold text-foreground">Route Not Found</h2>
        <p className="text-muted-foreground">The route with ID {routeId} does not exist.</p>
        <Button onClick={() => router.push("/admin/routes")}>Back to Routes</Button>
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    setSuccess("Route information updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Route Details</h1>
          <p className="text-muted-foreground">View and manage route information</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin/routes")}>
          Back to Routes
        </Button>
      </div>

      {success && (
        <Alert className="border-primary/50 bg-primary/10">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">{success}</AlertDescription>
        </Alert>
      )}

      {/* Route Summary */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Route className="h-5 w-5 text-primary" />
            Route Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4 py-6">
            <div className="text-center">
              <MapPin className="mx-auto h-8 w-8 text-green-500 mb-2" />
              <p className="text-lg font-semibold text-foreground">{route.from}</p>
              <p className="text-sm text-muted-foreground">Start</p>
            </div>
            <div className="flex-1 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-green-500 to-red-500"></div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Bus: {route.bus_number}
              </p>
            </div>
            <div className="text-center">
              <MapPin className="mx-auto h-8 w-8 text-red-500 mb-2" />
              <p className="text-lg font-semibold text-foreground">{route.to}</p>
              <p className="text-sm text-muted-foreground">End</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            Route Map
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Visual representation of the route
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransportMap
            routeFrom={route.from}
            routeTo={route.to}
            height="400px"
          />
        </CardContent>
      </Card>

      {/* Edit Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Route Information</CardTitle>
          <CardDescription className="text-muted-foreground">
            Update route details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-foreground">Route ID</Label>
              <Input
                value={route.routeId}
                disabled
                className="bg-muted border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Bus Number</Label>
              <Input
                value={formData.bus_number}
                onChange={(e) => handleChange("bus_number", e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">From</Label>
              <Input
                value={formData.from}
                onChange={(e) => handleChange("from", e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">To</Label>
              <Input
                value={formData.to}
                onChange={(e) => handleChange("to", e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleUpdate}>
              <Save className="mr-2 h-4 w-4" />
              Update Route
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
