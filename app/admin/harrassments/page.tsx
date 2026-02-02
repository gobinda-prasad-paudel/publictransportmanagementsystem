"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { HARASSMENTS, Harassment } from "@/lib/constants";
import { MessageSquareWarning, Eye, CheckCircle, Clock, XCircle } from "lucide-react";

export default function HarassmentsPage() {
  const [harassments] = useState(HARASSMENTS);

  const activeHarassments = harassments.filter((h) => h.status === "pending");
  const resolvedHarassments = harassments.filter((h) => h.status !== "pending");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-500">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-primary/20 text-primary">
            <CheckCircle className="mr-1 h-3 w-3" /> Resolved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/20 text-destructive">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const columns = [
    { header: "ID", accessorKey: "harrassmentId" as const },
    { header: "Bus ID", accessorKey: "bus_id" as const },
    { header: "Route", accessorKey: "route_number" as const },
    { header: "Customer ID", accessorKey: "customer_id" as const },
    { header: "Contact", accessorKey: "customer_contact" as const },
    {
      header: "Filed At",
      cell: (row: Harassment) => new Date(row.filed_at).toLocaleString(),
    },
    { header: "Travel ID", accessorKey: "travelling_id" as const },
    { header: "Driver", accessorKey: "driver_name" as const },
    {
      header: "Status",
      cell: (row: Harassment) => getStatusBadge(row.status),
    },
    {
      header: "Actions",
      cell: (row: Harassment) => (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/harrassments/${row.harrassmentId}`}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Harassment Reports</h1>
        <p className="text-muted-foreground">Review and manage harassment complaints</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border border-l-4 border-l-yellow-500">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeHarassments.length}</p>
              <p className="text-sm text-muted-foreground">Pending Reports</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border border-l-4 border-l-primary">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {harassments.filter((h) => h.status === "resolved").length}
              </p>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border border-l-4 border-l-destructive">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
              <XCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {harassments.filter((h) => h.status === "rejected").length}
              </p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Harassment Reports */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquareWarning className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-foreground">Active Reports</CardTitle>
            {activeHarassments.length > 0 && (
              <Badge className="ml-2 bg-yellow-500/20 text-yellow-500">
                {activeHarassments.length} Pending
              </Badge>
            )}
          </div>
          <CardDescription className="text-muted-foreground">
            Reports awaiting review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={activeHarassments}
            emptyMessage="No pending harassment reports"
          />
        </CardContent>
      </Card>

      {/* All Reports */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">All Reports</CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete history of harassment reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={harassments} />
        </CardContent>
      </Card>
    </div>
  );
}
