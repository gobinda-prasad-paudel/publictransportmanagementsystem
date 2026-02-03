"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  USERS,
  TRANSACTIONS,
  TOPUP_CARDS,
  ROUTES,
  EMERGENCY_SOS,
  HARASSMENTS,
  BUS_LOCATIONS,
} from "@/lib/constants";
import {
  Users,
  CreditCard,
  Route,
  AlertTriangle,
  MessageSquareWarning,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Bus,
  Shield,
  MapPin,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: USERS.length,
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Active Cards",
    value: TOPUP_CARDS.filter((c) => !c.is_used).length,
    change: "+5%",
    trend: "up",
    icon: CreditCard,
  },
  {
    title: "Active Routes",
    value: ROUTES.length,
    change: "0%",
    trend: "neutral",
    icon: Route,
  },
  {
    title: "Active Emergencies",
    value: EMERGENCY_SOS.filter((e) => !e.is_resolved).length,
    change: "-2",
    trend: "down",
    icon: AlertTriangle,
  },
  {
    title: "Pending Harassments",
    value: HARASSMENTS.filter((h) => h.status === "pending").length,
    change: "-1",
    trend: "down",
    icon: MessageSquareWarning,
  },
];

export default function AdminDashboardPage() {
  const recentTransactions = TRANSACTIONS.slice(-10).reverse();
  const overCapacityBuses = BUS_LOCATIONS.filter(
    (bus) => bus.current_passengers > bus.max_capacity
  );

  const transactionColumns = [
    { header: "ID", accessorKey: "transactionId" as const },
    {
      header: "User",
      cell: (row: (typeof TRANSACTIONS)[0]) => {
        const user = USERS.find((u) => u.userId === row.userId);
        return user?.full_name || row.userId;
      },
    },
    {
      header: "Type",
      cell: (row: (typeof TRANSACTIONS)[0]) => (
        <Badge
          variant={row.transaction_type === "topup" ? "default" : "secondary"}
          className={
            row.transaction_type === "topup"
              ? "bg-primary/20 text-primary"
              : "bg-accent/20 text-accent"
          }
        >
          {row.transaction_type}
        </Badge>
      ),
    },
    {
      header: "Amount",
      cell: (row: (typeof TRANSACTIONS)[0]) => (
        <span className={row.transaction_type === "topup" ? "text-primary" : "text-foreground"}>
          {row.transaction_type === "topup" ? "+" : "-"} Rs. {row.amount}
        </span>
      ),
    },
    {
      header: "Mode",
      cell: (row: (typeof TRANSACTIONS)[0]) => (
        <span className="text-muted-foreground">{row.payment_mode}</span>
      ),
    },
    {
      header: "Date",
      cell: (row: (typeof TRANSACTIONS)[0]) => (
        <span className="text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Project Sahaj Admin Panel</p>
        </div>
        <Button asChild>
          <Link href="/admin/livebuses">
            <MapPin className="mr-2 h-4 w-4" />
            Live Buses Map
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 sm:p-6 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center text-[10px] sm:text-xs flex-wrap">
                {stat.trend === "up" && (
                  <>
                    <ArrowUpRight className="mr-0.5 sm:mr-1 h-3 w-3 text-primary" />
                    <span className="text-primary">{stat.change}</span>
                  </>
                )}
                {stat.trend === "down" && (
                  <>
                    <ArrowDownRight className="mr-0.5 sm:mr-1 h-3 w-3 text-destructive" />
                    <span className="text-destructive">{stat.change}</span>
                  </>
                )}
                {stat.trend === "neutral" && (
                  <span className="text-muted-foreground">{stat.change}</span>
                )}
                <span className="ml-1 text-muted-foreground hidden sm:inline">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Buses Overview */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg text-foreground">Live Buses Overview</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                Current status of all active buses
              </CardDescription>
            </div>
            {overCapacityBuses.length > 0 && (
              <Badge variant="destructive" className="w-fit text-xs">
                <AlertTriangle className="mr-1 h-3 w-3" />
                {overCapacityBuses.length} Over Capacity
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {BUS_LOCATIONS.map((bus) => {
                const isOverCapacity = bus.current_passengers > bus.max_capacity;
                return (
                  <div
                    key={bus.bus_id}
                    className={`p-3 sm:p-4 rounded-lg border ${
                      isOverCapacity
                        ? "border-destructive bg-destructive/10"
                        : "border-border bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className={`p-1.5 sm:p-2 rounded-full ${isOverCapacity ? 'bg-destructive/20' : 'bg-primary/20'}`}>
                          <Bus className={`h-3 w-3 sm:h-4 sm:w-4 ${isOverCapacity ? 'text-destructive' : 'text-primary'}`} />
                        </div>
                        <span className="font-semibold text-foreground text-sm sm:text-base">{bus.bus_number}</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] sm:text-xs bg-primary/20 text-primary">
                        {bus.speed} km/h
                      </Badge>
                    </div>
                    
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Passengers:</span>
                        <span className={`font-medium ${isOverCapacity ? 'text-destructive' : 'text-foreground'}`}>
                          {bus.current_passengers}/{bus.max_capacity}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Safety:</span>
                        <div className="flex items-center gap-1">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full ${
                                  i < bus.safety_rating ? 'bg-primary' : 'bg-muted'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-foreground font-medium text-xs sm:text-sm">{bus.safety_rating}/9</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-muted-foreground pt-1 border-t border-border">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate text-xs">{bus.current_location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex justify-end">
            <Button variant="outline" size="sm" asChild className="bg-transparent text-xs sm:text-sm">
              <Link href="/admin/livebuses">
                View Full Map
                <ArrowUpRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-card border-border">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg text-foreground">Recent Transactions</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                Latest transactions across the system
              </CardDescription>
            </div>
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[600px] sm:min-w-0 px-4 sm:px-0">
              <DataTable columns={transactionColumns} data={recentTransactions} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg text-foreground">System Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Topup Cards Generated</span>
              <span className="font-semibold text-foreground">{TOPUP_CARDS.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Used Topup Cards</span>
              <span className="font-semibold text-foreground">
                {TOPUP_CARDS.filter((c) => c.is_used).length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Verified Users</span>
              <span className="font-semibold text-foreground">
                {USERS.filter((u) => u.is_verified).length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Resolved Emergencies</span>
              <span className="font-semibold text-foreground">
                {EMERGENCY_SOS.filter((e) => e.is_resolved).length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg text-foreground">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Topup Value</span>
              <span className="font-semibold text-primary">
                Rs. {TRANSACTIONS.filter((t) => t.transaction_type === "topup").reduce((sum, t) => sum + t.amount, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Travel Revenue</span>
              <span className="font-semibold text-foreground">
                Rs. {TRANSACTIONS.filter((t) => t.transaction_type === "travel").reduce((sum, t) => sum + t.amount, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">User Balances</span>
              <span className="font-semibold text-foreground">
                Rs. {USERS.reduce((sum, u) => sum + u.balance, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Available Card Balance</span>
              <span className="font-semibold text-foreground">
                Rs. {TOPUP_CARDS.filter((c) => !c.is_used).reduce((sum, c) => sum + c.balance, 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
