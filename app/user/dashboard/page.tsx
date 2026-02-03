"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/confirm-dialog";
import {
  CreditCard,
  MapPin,
  Clock,
  TrendingUp,
  Bus,
  AlertTriangle,
  Bell,
  ArrowUpRight,
  Unlink,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { MOCK_USERS, MOCK_TRANSACTIONS, USER_RFID_CARDS } from "@/lib/constants";

export default function UserDashboard() {
  const [user, setUser] = useState(MOCK_USERS[0]);
  const [recentTransactions, setRecentTransactions] = useState(
    MOCK_TRANSACTIONS.slice(0, 5)
  );
  const [linkedCards, setLinkedCards] = useState(
    USER_RFID_CARDS.filter((card) => card.userId === "USR001" && card.isActive)
  );
  const [showUnlinkDialog, setShowUnlinkDialog] = useState(false);
  const [cardToUnlink, setCardToUnlink] = useState<string | null>(null);
  const [unlinkSuccess, setUnlinkSuccess] = useState(false);
  const [hiddenCards, setHiddenCards] = useState<Set<string>>(new Set());
  const [hiddenBalances, setHiddenBalances] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUnlinkCard = (cardId: string) => {
    setCardToUnlink(cardId);
    setShowUnlinkDialog(true);
  };

  const confirmUnlink = () => {
    if (cardToUnlink) {
      setLinkedCards((prev) => prev.filter((card) => card.cardId !== cardToUnlink));
      setShowUnlinkDialog(false);
      setCardToUnlink(null);
      setUnlinkSuccess(true);
      setTimeout(() => setUnlinkSuccess(false), 3000);
    }
  };

  const toggleCardVisibility = (cardId: string) => {
    setHiddenCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const toggleBalanceVisibility = (cardId: string) => {
    setHiddenBalances((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const formatCardNumber = (cardNumber: string, isHidden: boolean) => {
    if (isHidden) {
      return "****-****";
    }
    return cardNumber;
  };

  const formatBalance = (balance: number, isHidden: boolean) => {
    if (isHidden) {
      return "***.**";
    }
    return balance.toFixed(2);
  };

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
      {/* Success Message */}
      {unlinkSuccess && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-primary/20 border border-primary/30 text-primary">
          <CheckCircle className="h-5 w-5" />
          <span>Card unlinked successfully!</span>
        </div>
      )}

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
          <Button variant="outline" asChild className="bg-transparent">
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

      {/* RFID Cards Section - Visual Card Design */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">My Transit Cards</CardTitle>
          <CreditCard className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {linkedCards.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No cards linked to your account</p>
              <p className="text-sm mt-2">Visit an admin center to link a card</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {linkedCards.map((card) => (
                <div key={card.cardId} className="relative">
                  {/* Visual Card Design */}
                  <div className="relative w-full aspect-[1.6/1] rounded-2xl p-5 overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 50%, #1a3a1a 100%)",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    {/* Card Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
                    </div>

                    {/* Card Content */}
                    <div className="relative h-full flex flex-col justify-between">
                      {/* Top Row - Logo and Chip */}
                      <div className="flex items-start justify-between">
                        {/* Chip */}
                        <div className="w-12 h-9 rounded-md overflow-hidden"
                          style={{
                            background: "linear-gradient(135deg, #d4af37 0%, #f4e5b0 25%, #d4af37 50%, #f4e5b0 75%, #d4af37 100%)",
                          }}
                        >
                          <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-[1px] p-[2px]">
                            {[...Array(9)].map((_, i) => (
                              <div key={i} className="bg-yellow-800/30 rounded-[1px]" />
                            ))}
                          </div>
                        </div>
                        {/* Logo */}
                        <div className="text-right">
                          <p className="text-white/90 font-bold text-sm tracking-wider">SAHAJ</p>
                          <p className="text-white/60 text-[10px]">TRANSIT</p>
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="flex items-center gap-2">
                        <p className="text-white font-mono text-xl tracking-[0.2em]">
                          {formatCardNumber(card.cardNumber, hiddenCards.has(card.cardId))}
                        </p>
                        <button
                          onClick={() => toggleCardVisibility(card.cardId)}
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          {hiddenCards.has(card.cardId) ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {/* Bottom Row */}
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-white/50 text-[10px] uppercase tracking-wider">Balance</p>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-semibold text-lg">
                              Rs. {formatBalance(card.balance, hiddenBalances.has(card.cardId))}
                            </p>
                            <button
                              onClick={() => toggleBalanceVisibility(card.cardId)}
                              className="text-white/60 hover:text-white transition-colors"
                            >
                              {hiddenBalances.has(card.cardId) ? (
                                <Eye className="h-3 w-3" />
                              ) : (
                                <EyeOff className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white/50 text-[10px] uppercase tracking-wider">Issued</p>
                          <p className="text-white/80 text-sm">
                            {card.issuedOn.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contactless Icon */}
                    <div className="absolute top-5 right-16">
                      <svg className="w-6 h-6 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a10 10 0 0 1 0 20" strokeLinecap="round" />
                        <path d="M12 6a6 6 0 0 1 0 12" strokeLinecap="round" />
                        <path d="M12 10a2 2 0 0 1 0 4" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-between mt-3 px-1">
                    <Badge variant="default" className="bg-primary/20 text-primary">
                      {card.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleUnlinkCard(card.cardId)}
                    >
                      <Unlink className="h-4 w-4 mr-1" />
                      Unlink Card
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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

      {/* Unlink Card Confirmation Dialog */}
      <ConfirmDialog
        open={showUnlinkDialog}
        onOpenChange={setShowUnlinkDialog}
        title="Unlink Card"
        description={`Are you sure you want to unlink card ${cardToUnlink}? This action cannot be undone and you will need to visit an admin center to re-link this card.`}
        confirmText="Unlink Card"
        cancelText="Cancel"
        onConfirm={confirmUnlink}
        variant="destructive"
      />
    </div>
  );
}
