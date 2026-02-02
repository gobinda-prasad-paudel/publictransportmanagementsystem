"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EMERGENCY_SOS, EmergencySOS } from "@/lib/constants";
import { AlertTriangle, CheckCircle, Phone, MapPin, Clock } from "lucide-react";

export default function EmergencySOSPage() {
  const [emergencies, setEmergencies] = useState(EMERGENCY_SOS);
  const [success, setSuccess] = useState("");

  const activeEmergencies = emergencies.filter((e) => !e.is_resolved);
  const resolvedEmergencies = emergencies.filter((e) => e.is_resolved);

  const handleResolve = (sosId: string) => {
    setEmergencies((prev) =>
      prev.map((e) =>
        e.sosId === sosId
          ? {
              ...e,
              is_resolved: true,
              resolved_at: new Date(),
              resolved_by_admin_id: "ADM001",
            }
          : e
      )
    );
    setSuccess(`Emergency ${sosId} has been marked as resolved.`);
    setTimeout(() => setSuccess(""), 3000);
  };

  const activeColumns = [
    { header: "ID", accessorKey: "sosId" as const },
    { header: "Bus ID", accessorKey: "bus_id" as const },
    { header: "Route", accessorKey: "route_number" as const },
    {
      header: "Location",
      cell: (row: EmergencySOS) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-destructive" />
          {row.bus_location_name}
        </div>
      ),
    },
    {
      header: "Coordinates",
      cell: (row: EmergencySOS) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.latitude.toFixed(4)}, {row.longitude.toFixed(4)}
        </span>
      ),
    },
    { header: "Driver", accessorKey: "driver_name" as const },
    {
      header: "Contact",
      cell: (row: EmergencySOS) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          {row.driver_phone}
        </div>
      ),
    },
    {
      header: "Time",
      cell: (row: EmergencySOS) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          {new Date(row.pressed_at).toLocaleString()}
        </div>
      ),
    },
    {
      header: "Status",
      cell: (row: EmergencySOS) => (
        <Button
          size="sm"
          variant={row.is_resolved ? "outline" : "destructive"}
          onClick={() => !row.is_resolved && handleResolve(row.sosId)}
          disabled={row.is_resolved}
        >
          {row.is_resolved ? "Resolved" : "Mark as Resolved"}
        </Button>
      ),
    },
  ];

  const resolvedColumns = [
    { header: "ID", accessorKey: "sosId" as const },
    { header: "Bus ID", accessorKey: "bus_id" as const },
    { header: "Route", accessorKey: "route_number" as const },
    {
      header: "Location",
      cell: (row: EmergencySOS) => row.bus_location_name,
    },
    {
      header: "Coordinates",
      cell: (row: EmergencySOS) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.latitude.toFixed(4)}, {row.longitude.toFixed(4)}
        </span>
      ),
    },
    { header: "Driver", accessorKey: "driver_name" as const },
    { header: "Contact", accessorKey: "driver_phone" as const },
    {
      header: "Pressed At",
      cell: (row: EmergencySOS) => new Date(row.pressed_at).toLocaleString(),
    },
    {
      header: "Resolved At",
      cell: (row: EmergencySOS) =>
        row.resolved_at ? new Date(row.resolved_at).toLocaleString() : "-",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Emergency SOS Signals</h1>
        <p className="text-muted-foreground">Monitor and respond to emergency alerts from buses</p>
      </div>

      {success && (
        <Alert className="border-primary/50 bg-primary/10">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">{success}</AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card border-border border-l-4 border-l-destructive">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeEmergencies.length}</p>
              <p className="text-sm text-muted-foreground">Active Emergencies</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border border-l-4 border-l-primary">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{resolvedEmergencies.length}</p>
              <p className="text-sm text-muted-foreground">Resolved Emergencies</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Emergencies */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-foreground">Active Emergencies</CardTitle>
            {activeEmergencies.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {activeEmergencies.length} Active
              </Badge>
            )}
          </div>
          <CardDescription className="text-muted-foreground">
            Emergencies that require immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={activeColumns}
            data={activeEmergencies}
            emptyMessage="No active emergencies"
          />
        </CardContent>
      </Card>

      {/* Resolved Emergencies */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <CardTitle className="text-foreground">Resolved Emergencies</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Previously resolved emergency signals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={resolvedColumns}
            data={resolvedEmergencies}
            emptyMessage="No resolved emergencies"
          />
        </CardContent>
      </Card>
    </div>
  );
}
