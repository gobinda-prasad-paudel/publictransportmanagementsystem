"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
import { USERS, User } from "@/lib/constants";
import { Search, Users, Eye, UserPlus } from "lucide-react";

export default function UsersPage() {
  const [searchType, setSearchType] = useState<"phone" | "document" | "name">("name");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = searchValue.toLowerCase();
    let results: User[] = [];

    switch (searchType) {
      case "phone":
        results = USERS.filter((u) => u.phone_number.toLowerCase().includes(query));
        break;
      case "document":
        results = USERS.filter((u) => u.document_number.toLowerCase().includes(query));
        break;
      case "name":
        results = USERS.filter((u) => u.full_name.toLowerCase().includes(query));
        break;
    }

    setSearchResults(results);
    setHasSearched(true);
  };

  const userColumns = [
    { header: "User ID", accessorKey: "userId" as const },
    { header: "Full Name", accessorKey: "full_name" as const },
    { header: "Email", accessorKey: "email" as const },
    { header: "Phone", accessorKey: "phone_number" as const },
    {
      header: "Status",
      cell: (row: User) => (
        <div className="flex gap-2">
          <Badge
            variant={row.is_verified ? "default" : "secondary"}
            className={row.is_verified ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}
          >
            {row.is_verified ? "Verified" : "Unverified"}
          </Badge>
          {!row.is_active && (
            <Badge variant="destructive" className="bg-destructive/20 text-destructive">
              Inactive
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: "Balance",
      cell: (row: User) => <span className="text-primary font-medium">Rs. {row.balance}</span>,
    },
    {
      header: "Actions",
      cell: (row: User) => (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/user/${row.userId}`}>
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
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">Manage and search for users in the system</p>
        </div>
        <Button asChild>
          <Link href="/admin/adduser">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>

      {/* Search Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Search className="h-5 w-5 text-primary" />
            Search Users
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Search for users by phone number, document number, or name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Type */}
            <div className="space-y-3">
              <Label className="text-foreground">Search By</Label>
              <RadioGroup
                value={searchType}
                onValueChange={(value) => setSearchType(value as "phone" | "document" | "name")}
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="name" id="name" />
                  <Label htmlFor="name" className="text-foreground cursor-pointer">
                    Name
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" />
                  <Label htmlFor="phone" className="text-foreground cursor-pointer">
                    Phone Number
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="document" id="document" />
                  <Label htmlFor="document" className="text-foreground cursor-pointer">
                    Document Number
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Search Input */}
            <div className="flex gap-4">
              <Input
                placeholder={`Search by ${searchType === "phone" ? "phone number" : searchType === "document" ? "document number" : "name"}...`}
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
              columns={userColumns}
              data={searchResults}
              emptyMessage="No users found matching your search criteria"
            />
          </CardContent>
        </Card>
      )}

      {/* All Users */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5 text-primary" />
            All Users
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete list of all registered users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={userColumns} data={USERS} />
        </CardContent>
      </Card>
    </div>
  );
}
