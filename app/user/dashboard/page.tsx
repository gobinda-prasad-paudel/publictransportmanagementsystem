"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  MapPin,
  Clock,
  TrendingUp,
  Bus,
  AlertTriangle,
  Bell,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { MOCK_USERS, MOCK_TRANSACTIONS, MOCK_ROUTES } from "@/lib/constants";

export default function UserDashboard() {
  const [user, setUser] = useState(MOCK_USERS[0]);
  const [recentTransactions, setRecentTransactions] = useState(
    MOCK_TRANSACTIONS.slice(0, 5)
  );

  useEffect(() => {
    // Simulate fetching user data
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const stats = [
    {
      title: "Current Balance",
      value: `Rs. ${user.balance.toFixed(2)}`,
      icon: CreditCard,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Trips This Month",
      value: "24",
      icon: Bus,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Total Spent",
      value: "Rs. 1,250.00",
      icon: TrendingUp,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      title: "Favorite Route",
      value: "Route 23",
      icon: MapPin,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: "Low balance alert - Please top up your card",
      type: "warning",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "Route 23 - Service delay expected",
      type: "info",
      time: "4 hours ago",
    },
    {
      id: 3,
      message: "Monthly pass expires in 5 days",
      type: "warning",
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user.name}
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your transit activity
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/user/topup">Top Up Balance</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/user/sos">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Emergency SOS
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">
              Recent Transactions
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/user/transactions">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "topup"
                          ? "bg-primary/20"
                          : "bg-destructive/20"
                      }`}
                    >
                      {transaction.type === "topup" ? (
                        <TrendingUp className="h-4 w-4 text-primary" />
                      ) : (
                        <Bus className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${
                      transaction.type === "topup"
                        ? "text-primary"
                        : "text-destructive"
                    }`}
                  >
                    {transaction.type === "topup" ? "+" : "-"}Rs.{" "}
                    {transaction.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">
              Notifications
            </CardTitle>
            <Bell className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <div
                    className={`p-2 rounded-full ${
                      notification.type === "warning"
                        ? "bg-yellow-500/20"
                        : "bg-blue-500/20"
                    }`}
                  >
                    {notification.type === "warning" ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Bell className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 bg-transparent"
              asChild
            >
              <Link href="/user/routes">
                <MapPin className="h-6 w-6" />
                <span>View Routes</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 bg-transparent"
              asChild
            >
              <Link href="/user/transactions">
                <Clock className="h-6 w-6" />
                <span>Transaction History</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 bg-transparent"
              asChild
            >
              <Link href="/user/profile">
                <CreditCard className="h-6 w-6" />
                <span>My Profile</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 bg-transparent"
              asChild
            >
              <Link href="/user/report">
                <AlertTriangle className="h-6 w-6" />
                <span>Report Issue</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
