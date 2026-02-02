"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DataTable } from "@/components/data-table";
import { ROUTES, Route as RouteType } from "@/lib/constants";
import { Search, Route, Eye, Plus, ArrowRight } from "lucide-react";

export default function RoutesPage() {
  const [searchType, setSearchType] = useState<"route" | "bus">("route");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<RouteType[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = searchValue.toLowerCase();
    let results: RouteType[] = [];

    if (searchType === "route") {
      results = ROUTES.filter((r) => r.routeId.toString() === query);
    } else {
      results = ROUTES.filter((r) => r.bus_number.toLowerCase().includes(query));
    }

    setSearchResults(results);
    setHasSearched(true);
  };

  const routeColumns = [
    { header: "Route ID", accessorKey: "routeId" as const },
    { header: "Bus Number", accessorKey: "bus_number" as const },
    {
      header: "Route",
      cell: (row: RouteType) => (
        <div className="flex items-center gap-2 text-foreground">
          {row.from}
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          {row.to}
        </div>
      ),
    },
    {
      header: "Created",
      cell: (row: RouteType) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: (row: RouteType) => (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/route/${row.routeId}`}>
            <Eye className="mr-2 h-4 w-4" />
            Details
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Routes</h1>
          <p className="text-muted-foreground">Manage bus routes in the system</p>
        </div>
        <Button asChild>
          <Link href="/admin/addroutes">
            <Plus className="mr-2 h-4 w-4" />
            Add Route
          </Link>
        </Button>
      </div>

      {/* Search Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Search className="h-5 w-5 text-primary" />
            Search Routes
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Search for routes by route ID or bus number
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-foreground">Search By</Label>
              <RadioGroup
                value={searchType}
                onValueChange={(value) => setSearchType(value as "route" | "bus")}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="route" id="route" />
                  <Label htmlFor="route" className="text-foreground cursor-pointer">
                    Route ID
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bus" id="bus" />
                  <Label htmlFor="bus" className="text-foreground cursor-pointer">
                    Bus Number
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-4">
              <Input
                placeholder={`Search by ${searchType === "route" ? "route ID" : "bus number"}...`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-input border-border text-foreground"
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Search Results ({searchResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={routeColumns}
              data={searchResults}
              emptyMessage="No routes found matching your search"
            />
          </CardContent>
        </Card>
      )}

      {/* All Routes */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Route className="h-5 w-5 text-primary" />
            All Routes
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete list of all registered routes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={routeColumns} data={ROUTES} />
        </CardContent>
      </Card>
    </div>
  );
}
