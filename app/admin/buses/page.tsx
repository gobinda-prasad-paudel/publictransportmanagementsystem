"use client";

import React from "react"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bus, Plus, Pencil, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { BUSES, ROUTES, generateBusId, BUS_LOCATIONS } from "@/lib/constants";
import { ConfirmDialog } from "@/components/confirm-dialog";

interface BusFormData {
  busName: string;
  driverName: string;
  driverPhone: string;
  driverDOB: string;
  driverLicenseNumber: string;
  routeId: string;
}

const initialFormData: BusFormData = {
  busName: "",
  driverName: "",
  driverPhone: "",
  driverDOB: "",
  driverLicenseNumber: "",
  routeId: "",
};

export default function AdminBusesPage() {
  const [buses, setBuses] = useState(BUSES);
  const [formData, setFormData] = useState<BusFormData>(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBusId, setEditingBusId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [busToDelete, setBusToDelete] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  const handleInputChange = (field: keyof BusFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.busName || !formData.driverName || !formData.driverPhone || !formData.driverDOB || !formData.driverLicenseNumber || !formData.routeId) {
      showError("Please fill in all fields");
      return;
    }

    if (editingBusId) {
      // Update existing bus
      setBuses((prev) =>
        prev.map((bus) =>
          bus.busId === editingBusId
            ? {
                ...bus,
                busName: formData.busName,
                driverName: formData.driverName,
                driverPhone: formData.driverPhone,
                driverDOB: new Date(formData.driverDOB),
                driverLicenseNumber: formData.driverLicenseNumber,
                routeId: Number.parseInt(formData.routeId),
                updatedAt: new Date(),
              }
            : bus
        )
      );
      showSuccess("Bus updated successfully!");
    } else {
      // Add new bus
      const newBus = {
        busId: generateBusId(),
        busName: formData.busName,
        driverName: formData.driverName,
        driverPhone: formData.driverPhone,
        driverDOB: new Date(formData.driverDOB),
        driverLicenseNumber: formData.driverLicenseNumber,
        routeId: Number.parseInt(formData.routeId),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setBuses((prev) => [...prev, newBus]);
      showSuccess("Bus added successfully!");
    }

    setFormData(initialFormData);
    setEditingBusId(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (busId: string) => {
    const bus = buses.find((b) => b.busId === busId);
    if (bus) {
      setFormData({
        busName: bus.busName,
        driverName: bus.driverName,
        driverPhone: bus.driverPhone,
        driverDOB: bus.driverDOB.toISOString().split("T")[0],
        driverLicenseNumber: bus.driverLicenseNumber,
        routeId: bus.routeId.toString(),
      });
      setEditingBusId(busId);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = (busId: string) => {
    setBusToDelete(busId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (busToDelete) {
      setBuses((prev) => prev.filter((bus) => bus.busId !== busToDelete));
      showSuccess("Bus deleted successfully!");
      setBusToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  const getRouteInfo = (routeId: number) => {
    const route = ROUTES.find((r) => r.routeId === routeId);
    return route ? `${route.from} - ${route.to}` : "Unknown Route";
  };

  const getBusLiveInfo = (busId: string) => {
    return BUS_LOCATIONS.find((b) => b.bus_id === busId);
  };

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-primary/20 border border-primary/30 text-primary">
          <CheckCircle className="h-5 w-5" />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bus Management</h1>
          <p className="text-muted-foreground">
            Add, edit, and manage buses in the system
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setFormData(initialFormData);
            setEditingBusId(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Bus
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingBusId ? "Edit Bus" : "Add New Bus"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {editingBusId
                  ? "Update the bus and driver information below."
                  : "Fill in the details to add a new bus to the system."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="busName">Bus Name</Label>
                <Input
                  id="busName"
                  placeholder="e.g., Sajha Yatayat 106"
                  value={formData.busName}
                  onChange={(e) => handleInputChange("busName", e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driverName">Driver Name</Label>
                  <Input
                    id="driverName"
                    placeholder="Full name"
                    value={formData.driverName}
                    onChange={(e) => handleInputChange("driverName", e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverPhone">Driver Phone</Label>
                  <Input
                    id="driverPhone"
                    placeholder="+977-98XXXXXXXX"
                    value={formData.driverPhone}
                    onChange={(e) => handleInputChange("driverPhone", e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driverDOB">Driver Date of Birth</Label>
                  <Input
                    id="driverDOB"
                    type="date"
                    value={formData.driverDOB}
                    onChange={(e) => handleInputChange("driverDOB", e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverLicense">License Number</Label>
                  <Input
                    id="driverLicense"
                    placeholder="DL-XXXXX-XXX"
                    value={formData.driverLicenseNumber}
                    onChange={(e) => handleInputChange("driverLicenseNumber", e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="routeId">Assign Route</Label>
                <Select
                  value={formData.routeId}
                  onValueChange={(value) => handleInputChange("routeId", value)}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select a route" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {ROUTES.map((route) => (
                      <SelectItem key={route.routeId} value={route.routeId.toString()}>
                        Route {route.routeId}: {route.from} - {route.to}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingBusId ? "Update Bus" : "Add Bus"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setFormData(initialFormData);
                    setEditingBusId(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/20">
                <Bus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Buses</p>
                <p className="text-2xl font-bold text-foreground">{buses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-chart-2/20">
                <Bus className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Now</p>
                <p className="text-2xl font-bold text-foreground">{BUS_LOCATIONS.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-chart-4/20">
                <Bus className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Routes Covered</p>
                <p className="text-2xl font-bold text-foreground">{ROUTES.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Buses Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>All Buses</CardTitle>
          <CardDescription>
            Complete list of buses registered in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Bus ID</TableHead>
                  <TableHead className="text-muted-foreground">Bus Name</TableHead>
                  <TableHead className="text-muted-foreground">Driver</TableHead>
                  <TableHead className="text-muted-foreground">Phone</TableHead>
                  <TableHead className="text-muted-foreground">License</TableHead>
                  <TableHead className="text-muted-foreground">Route</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buses.map((bus) => {
                  const liveInfo = getBusLiveInfo(bus.busId);
                  return (
                    <TableRow key={bus.busId} className="border-border">
                      <TableCell className="font-mono text-foreground">
                        {bus.busId}
                      </TableCell>
                      <TableCell className="text-foreground">{bus.busName}</TableCell>
                      <TableCell className="text-foreground">{bus.driverName}</TableCell>
                      <TableCell className="text-muted-foreground">{bus.driverPhone}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-sm">
                        {bus.driverLicenseNumber}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {getRouteInfo(bus.routeId)}
                      </TableCell>
                      <TableCell>
                        {liveInfo ? (
                          <Badge className="bg-primary/20 text-primary">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEdit(bus.busId)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(bus.busId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Bus"
        description={`Are you sure you want to delete this bus? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
}
