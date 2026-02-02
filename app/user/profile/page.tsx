"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  CreditCard,
  Shield,
  Bell,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
} from "lucide-react";
import { MOCK_USERS } from "@/lib/constants";

export default function UserProfilePage() {
  const user = MOCK_USERS[0];
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: "Kathmandu, Nepal",
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    lowBalanceAlert: true,
    tripAlerts: false,
    promotions: false,
  });

  const handleSave = () => {
    setIsEditing(false);
    // Simulate save
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="card">RFID Card</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-foreground">
                    {user.name}
                  </h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center justify-center gap-2 mt-2 md:justify-start">
                    <Badge className="bg-primary/20 text-primary">
                      {user.type === "regular" ? "Regular User" : user.type}
                    </Badge>
                    <Badge variant="outline" className="border-primary text-primary">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      disabled={!isEditing}
                      className="pl-10 bg-secondary border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      disabled={!isEditing}
                      className="pl-10 bg-secondary border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      disabled={!isEditing}
                      className="pl-10 bg-secondary border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      disabled={!isEditing}
                      className="pl-10 bg-secondary border-border"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium text-foreground">{user.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="font-medium text-foreground">{user.id}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="card" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>RFID Card Details</CardTitle>
              <CardDescription>
                Your registered transit card information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Card Visual */}
              <div className="relative max-w-md mx-auto">
                <div className="aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-primary/80 to-primary p-6 text-primary-foreground">
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm opacity-80">Project Sahaj</p>
                        <p className="text-lg font-bold">Transit Card</p>
                      </div>
                      <CreditCard className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-lg tracking-wider font-mono">
                        {user.rfidCard}
                      </p>
                      <div className="flex justify-between items-end mt-2">
                        <div>
                          <p className="text-xs opacity-80">Card Holder</p>
                          <p className="font-medium">{user.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs opacity-80">Balance</p>
                          <p className="font-bold text-lg">
                            Rs. {user.balance.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Card Number</p>
                  <p className="font-mono font-medium text-foreground">
                    {user.rfidCard}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className="mt-1 bg-primary/20 text-primary">
                    Active
                  </Badge>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Card Type</p>
                  <p className="font-medium text-foreground capitalize">
                    {user.type}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Registered On</p>
                  <p className="font-medium text-foreground">{user.createdAt}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline">Report Lost Card</Button>
                <Button variant="outline">Request New Card</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="bg-secondary border-border"
                />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">
                      SMS Authentication
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Receive codes via SMS
                    </p>
                  </div>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to receive updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "emailNotifications",
                  label: "Email Notifications",
                  description: "Receive updates via email",
                },
                {
                  key: "smsNotifications",
                  label: "SMS Notifications",
                  description: "Receive updates via SMS",
                },
                {
                  key: "lowBalanceAlert",
                  label: "Low Balance Alert",
                  description: "Get notified when balance is low",
                },
                {
                  key: "tripAlerts",
                  label: "Trip Alerts",
                  description: "Real-time trip notifications",
                },
                {
                  key: "promotions",
                  label: "Promotions & Offers",
                  description: "Receive promotional updates",
                },
              ].map((setting) => (
                <div
                  key={setting.key}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        {setting.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={
                      notificationSettings[
                        setting.key as keyof typeof notificationSettings
                      ]
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        [setting.key]:
                          !prev[setting.key as keyof typeof notificationSettings],
                      }))
                    }
                  >
                    {notificationSettings[
                      setting.key as keyof typeof notificationSettings
                    ]
                      ? "Enabled"
                      : "Disabled"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
