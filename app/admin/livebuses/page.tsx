"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LeafletMap } from "@/components/leaflet-map";
import { BUS_LOCATIONS, ROUTES } from "@/lib/constants";
import {
  Bus,
  MapPin,
  Users,
  Shield,
  AlertTriangle,
  Clock,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export default function AdminLiveBusesPage() {
  const [highlightOverCapacity, setHighlightOverCapacity] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  const overCapacityBuses = BUS_LOCATIONS.filter(
    (bus) => bus.current_passengers > bus.max_capacity
  );
  const totalPassengers = BUS_LOCATIONS.reduce(
    (sum, bus) => sum + bus.current_passengers,
    0
  );
  const totalCapacity = BUS_LOCATIONS.reduce(
    (sum, bus) => sum + bus.max_capacity,
    0
  );
  const avgSafetyRating = (
    BUS_LOCATIONS.reduce((sum, bus) => sum + bus.safety_rating, 0) /
    BUS_LOCATIONS.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Live Buses Map</h1>
          <p className="text-muted-foreground">
            Monitor all active buses in real-time
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="highlight"
              checked={highlightOverCapacity}
              onCheckedChange={setHighlightOverCapacity}
            />
            <Label htmlFor="highlight" className="text-sm text-muted-foreground">
              Highlight Over Capacity
            </Label>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="bg-transparent">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Buses</p>
                <p className="text-2xl font-bold text-foreground">{BUS_LOCATIONS.length}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Bus className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Passengers</p>
                <p className="text-2xl font-bold text-foreground">
                  {totalPassengers}/{totalCapacity}
                </p>
              </div>
              <div className="p-3 rounded-full bg-chart-2/10">
                <Users className="h-5 w-5 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Over Capacity</p>
                <p className="text-2xl font-bold text-destructive">
                  {overCapacityBuses.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Safety Rating</p>
                <p className="text-2xl font-bold text-foreground">{avgSafetyRating}/9</p>
              </div>
              <div className="p-3 rounded-full bg-chart-4/10">
                <Shield className="h-5 w-5 text-chart-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Live Map View</CardTitle>
              <CardDescription className="text-muted-foreground">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </CardDescription>
            </div>
            {overCapacityBuses.length > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {overCapacityBuses.length} bus(es) over capacity
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <LeafletMap
            buses={BUS_LOCATIONS}
            height="500px"
            highlightOverCapacity={highlightOverCapacity}
            showPassengerInfo={true}
            showSafetyRating={true}
          />
        </CardContent>
      </Card>

      {/* Bus List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">All Active Buses</CardTitle>
          <CardDescription className="text-muted-foreground">
            Detailed view of all buses currently in operation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Bus</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Location</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Route</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Passengers</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Safety</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Speed</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Driver</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {BUS_LOCATIONS.map((bus) => {
                  const route = ROUTES.find((r) => r.routeId === bus.routeId);
                  const isOverCapacity = bus.current_passengers > bus.max_capacity;
                  return (
                    <tr key={bus.bus_id} className="border-b border-border hover:bg-secondary/50">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-full ${isOverCapacity ? 'bg-destructive/20' : 'bg-primary/20'}`}>
                            <Bus className={`h-4 w-4 ${isOverCapacity ? 'text-destructive' : 'text-primary'}`} />
                          </div>
                          <span className="font-medium text-foreground">{bus.bus_number}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {bus.current_location}
                        </div>
                      </td>
                      <td className="p-3">
                        {route ? (
                          <div className="flex items-center gap-1 text-sm text-foreground">
                            {route.from}
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            {route.to}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`font-medium ${isOverCapacity ? 'text-destructive' : 'text-foreground'}`}>
                          {bus.current_passengers}/{bus.max_capacity}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-2 rounded-full ${
                                  i < bus.safety_rating ? 'bg-primary' : 'bg-muted'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-1">{bus.safety_rating}/9</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          {bus.speed} km/h
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {bus.driver_name}
                      </td>
                      <td className="p-3">
                        {isOverCapacity ? (
                          <Badge variant="destructive">Over Capacity</Badge>
                        ) : (
                          <Badge variant="default" className="bg-primary/20 text-primary">
                            Normal
                          </Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
