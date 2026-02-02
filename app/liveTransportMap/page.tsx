"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TransportMap } from "@/components/map";
import { BUS_LOCATIONS, ROUTES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, MapPin, Clock, ArrowRight } from "lucide-react";

export default function LiveTransportMapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                Live Transport Map
              </h1>
              <p className="text-muted-foreground">
                Track buses in real-time across Kathmandu Valley
              </p>
            </div>

            {/* Map */}
            <TransportMap buses={BUS_LOCATIONS} height="600px" />
          </div>
        </section>

        {/* Active Buses */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Active Buses</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {BUS_LOCATIONS.map((bus) => {
                const route = ROUTES.find((r) => r.routeId === bus.routeId);
                return (
                  <Card key={bus.bus_id} className="bg-card border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-foreground">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                            <Bus className="h-4 w-4 text-primary-foreground" />
                          </div>
                          {bus.bus_number}
                        </CardTitle>
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          {bus.speed} km/h
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {bus.current_location}
                      </div>
                      {route && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-foreground">{route.from}</span>
                          <ArrowRight className="h-3 w-3" />
                          <span className="text-foreground">{route.to}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Updated: {new Date(bus.last_updated).toLocaleTimeString()}
                      </div>
                      <div className="pt-2 border-t border-border text-xs text-muted-foreground">
                        Driver: {bus.driver_name}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Routes */}
        <section className="border-t border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Available Routes</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {ROUTES.map((route) => (
                <Card key={route.routeId} className="bg-background border-border">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                        {route.routeId}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-foreground font-medium">
                          {route.from}
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          {route.to}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Bus: {route.bus_number}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      Active
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
