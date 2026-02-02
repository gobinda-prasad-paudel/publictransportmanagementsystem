"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import {
  USERS,
  TRANSACTIONS,
  TOPUP_CARDS,
  ROUTES,
  EMERGENCY_SOS,
  HARASSMENTS,
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
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Project Sahaj Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === "up" && (
                  <>
                    <ArrowUpRight className="mr-1 h-3 w-3 text-primary" />
                    <span className="text-primary">{stat.change}</span>
                  </>
                )}
                {stat.trend === "down" && (
                  <>
                    <ArrowDownRight className="mr-1 h-3 w-3 text-destructive" />
                    <span className="text-destructive">{stat.change}</span>
                  </>
                )}
                {stat.trend === "neutral" && (
                  <span className="text-muted-foreground">{stat.change}</span>
                )}
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Recent Transactions</CardTitle>
              <CardDescription className="text-muted-foreground">
                Latest transactions across the system
              </CardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={transactionColumns} data={recentTransactions} />
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">System Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Topup Cards Generated</span>
              <span className="font-semibold text-foreground">{TOPUP_CARDS.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Used Topup Cards</span>
              <span className="font-semibold text-foreground">
                {TOPUP_CARDS.filter((c) => c.is_used).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Verified Users</span>
              <span className="font-semibold text-foreground">
                {USERS.filter((u) => u.is_verified).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Resolved Emergencies</span>
              <span className="font-semibold text-foreground">
                {EMERGENCY_SOS.filter((e) => e.is_resolved).length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Topup Value</span>
              <span className="font-semibold text-primary">
                Rs. {TRANSACTIONS.filter((t) => t.transaction_type === "topup").reduce((sum, t) => sum + t.amount, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Travel Revenue</span>
              <span className="font-semibold text-foreground">
                Rs. {TRANSACTIONS.filter((t) => t.transaction_type === "travel").reduce((sum, t) => sum + t.amount, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">User Balances</span>
              <span className="font-semibold text-foreground">
                Rs. {USERS.reduce((sum, u) => sum + u.balance, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
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
