"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Clock,
  Bus,
  ArrowRight,
  Star,
  Navigation,
} from "lucide-react";
import { MOCK_ROUTES } from "@/lib/constants";
import Link from "next/link";

export default function UserRoutesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [favorites, setFavorites] = useState<string[]>(["R001", "R003"]);

  const filteredRoutes = MOCK_ROUTES.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.start.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.end.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || route.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleFavorite = (routeId: string) => {
    setFavorites((prev) =>
      prev.includes(routeId)
        ? prev.filter((id) => id !== routeId)
        : [...prev, routeId]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bus Routes</h1>
        <p className="text-muted-foreground">
          Browse and track available routes in Kathmandu Valley
        </p>
      </div>

      {/* Favorite Routes */}
      {favorites.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Favorite Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {MOCK_ROUTES.filter((r) => favorites.includes(r.id)).map(
                (route) => (
                  <div
                    key={route.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-full">
                        <Bus className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {route.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {route.start} - {route.end}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        route.status === "active" ? "default" : "secondary"
                      }
                      className={
                        route.status === "active"
                          ? "bg-primary/20 text-primary"
                          : "bg-yellow-500/20 text-yellow-500"
                      }
                    >
                      {route.status}
                    </Badge>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search routes, stops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40 bg-secondary border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" asChild>
              <Link href="/liveTransportMap">
                <Navigation className="mr-2 h-4 w-4" />
                Live Map
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Routes List */}
      <div className="grid gap-4">
        {filteredRoutes.map((route) => (
          <Card key={route.id} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Bus className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {route.name}
                      </h3>
                      <Badge
                        variant={
                          route.status === "active" ? "default" : "secondary"
                        }
                        className={
                          route.status === "active"
                            ? "bg-primary/20 text-primary"
                            : route.status === "delayed"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-destructive/20 text-destructive"
                        }
                      >
                        {route.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{route.start}</span>
                      <ArrowRight className="h-4 w-4" />
                      <span>{route.end}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {route.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bus className="h-4 w-4" />
                        {route.vehiclesOnRoute} buses active
                      </span>
                      <span className="font-medium text-primary">
                        Rs. {route.fare}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(route.id)}
                  >
                    <Star
                      className={`h-5 w-5 ${
                        favorites.includes(route.id)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/liveTransportMap?route=${route.id}`}>
                      Track Live
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Stops Preview */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Route Stops:
                </p>
                <div className="flex flex-wrap gap-2">
                  {route.stops.slice(0, 6).map((stop, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-border text-muted-foreground"
                    >
                      {stop}
                    </Badge>
                  ))}
                  {route.stops.length > 6 && (
                    <Badge
                      variant="outline"
                      className="border-border text-muted-foreground"
                    >
                      +{route.stops.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <Card className="border-border bg-card">
          <CardContent className="p-12 text-center">
            <Bus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">
              No routes found
            </p>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
