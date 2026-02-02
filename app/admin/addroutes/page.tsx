"use client";

import React from "react"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TransportMap } from "@/components/map";
import { KATHMANDU_LOCATIONS } from "@/lib/constants";
import { Route, Plus, CheckCircle, MapPin } from "lucide-react";

let nextRouteId = 5;

export default function AddRoutesPage() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    bus_number: "",
  });
  const [success, setSuccess] = useState("");
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRouteId = nextRouteId++;
    
    setSuccess(`Route ${newRouteId} created successfully! ${formData.from} to ${formData.to}`);
    setShowMap(true);
    
    setTimeout(() => setSuccess(""), 5000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Route</h1>
        <p className="text-muted-foreground">Create a new bus route in the system</p>
      </div>

      {/* Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Plus className="h-5 w-5 text-primary" />
            Route Information
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill in the route details. Route ID will be auto-generated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <Alert className="mb-6 border-primary/50 bg-primary/10">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg bg-muted/50 p-4 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Route ID (Auto-generated):</span>
                <span className="text-foreground font-mono font-medium">{nextRouteId}</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="from" className="text-foreground">
                  From <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="from"
                  placeholder="e.g., Koteshwor"
                  value={formData.from}
                  onChange={(e) => handleChange("from", e.target.value)}
                  className="bg-input border-border text-foreground"
                  list="locations-from"
                  required
                />
                <datalist id="locations-from">
                  {KATHMANDU_LOCATIONS.map((loc) => (
                    <option key={loc.name} value={loc.name} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to" className="text-foreground">
                  To <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="to"
                  placeholder="e.g., Kalanki"
                  value={formData.to}
                  onChange={(e) => handleChange("to", e.target.value)}
                  className="bg-input border-border text-foreground"
                  list="locations-to"
                  required
                />
                <datalist id="locations-to">
                  {KATHMANDU_LOCATIONS.map((loc) => (
                    <option key={loc.name} value={loc.name} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bus_number" className="text-foreground">
                  Bus Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="bus_number"
                  placeholder="e.g., BUS-105"
                  value={formData.bus_number}
                  onChange={(e) => handleChange("bus_number", e.target.value)}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>
            </div>

            <Button type="submit">
              <Route className="mr-2 h-4 w-4" />
              Create Route
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Map Preview */}
      {showMap && formData.from && formData.to && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              Route Preview
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Visual representation of the route on the map
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TransportMap
              routeFrom={formData.from}
              routeTo={formData.to}
              height="400px"
            />
          </CardContent>
        </Card>
      )}

      {/* Available Locations */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Available Locations</CardTitle>
          <CardDescription className="text-muted-foreground">
            Suggested locations in Kathmandu Valley
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {KATHMANDU_LOCATIONS.map((loc) => (
              <span
                key={loc.name}
                className="rounded-full border border-border bg-muted/30 px-3 py-1 text-sm text-muted-foreground"
              >
                {loc.name}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
