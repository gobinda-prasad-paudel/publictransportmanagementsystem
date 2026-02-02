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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  Search,
  TrendingUp,
  TrendingDown,
  Bus,
  CreditCard,
  Calendar,
} from "lucide-react";
import { MOCK_TRANSACTIONS } from "@/lib/constants";

export default function UserTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const filteredTransactions = MOCK_TRANSACTIONS.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalTopup = MOCK_TRANSACTIONS.filter((t) => t.type === "topup").reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const totalSpent = MOCK_TRANSACTIONS.filter((t) => t.type === "fare").reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const handleExport = () => {
    // Simulate export
    const csvContent = [
      ["Date", "Description", "Type", "Amount", "Status"],
      ...filteredTransactions.map((t) => [
        t.date,
        t.description,
        t.type,
        t.amount,
        t.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Transaction History
          </h1>
          <p className="text-muted-foreground">
            View and manage your payment history
          </p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Top Up</p>
                <p className="text-2xl font-bold text-primary">
                  Rs. {totalTopup.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-primary/20 rounded-full">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-destructive">
                  Rs. {totalSpent.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-destructive/20 rounded-full">
                <TrendingDown className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {MOCK_TRANSACTIONS.length}
                </p>
              </div>
              <div className="p-3 bg-chart-2/20 rounded-full">
                <CreditCard className="h-6 w-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-40 bg-secondary border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="topup">Top Up</SelectItem>
                <SelectItem value="fare">Fare</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full md:w-40 bg-secondary border-border">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">
                    Description
                  </TableHead>
                  <TableHead className="text-muted-foreground">Type</TableHead>
                  <TableHead className="text-muted-foreground">
                    Amount
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="hover:bg-secondary/30"
                  >
                    <TableCell className="text-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {transaction.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "topup"
                              ? "bg-primary/20"
                              : "bg-chart-5/20"
                          }`}
                        >
                          {transaction.type === "topup" ? (
                            <CreditCard className="h-4 w-4 text-primary" />
                          ) : (
                            <Bus className="h-4 w-4 text-chart-5" />
                          )}
                        </div>
                        <span className="text-foreground">
                          {transaction.description}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.type === "topup"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          transaction.type === "topup"
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary text-foreground"
                        }
                      >
                        {transaction.type === "topup" ? "Top Up" : "Fare"}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`font-semibold ${
                        transaction.type === "topup"
                          ? "text-primary"
                          : "text-destructive"
                      }`}
                    >
                      {transaction.type === "topup" ? "+" : "-"}Rs.{" "}
                      {transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          transaction.status === "completed"
                            ? "border-primary text-primary"
                            : "border-yellow-500 text-yellow-500"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
