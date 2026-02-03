"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LeafletMap } from "@/components/leaflet-map";
import { BUS_LOCATIONS, ROUTES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, MapPin, Clock, ArrowRight, Users, Shield } from "lucide-react";

export default function LiveTransportMapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-card py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6 md:mb-8 text-center">
              <h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Live Transport Map
              </h1>
              <p className="text-muted-foreground">
                Track buses in real-time across Kathmandu Valley
              </p>
            </div>

            {/* Leaflet Map */}
            <LeafletMap 
              buses={BUS_LOCATIONS} 
              height="500px" 
              showPassengerInfo={true}
              showSafetyRating={true}
            />
          </div>
        </section>

        {/* Active Buses */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-xl sm:text-2xl font-bold text-foreground">Active Buses</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {BUS_LOCATIONS.map((bus) => {
                const route = ROUTES.find((r) => r.routeId === bus.routeId);
                const isOverCapacity = bus.current_passengers > bus.max_capacity;
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
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        {bus.current_location}
                      </div>
                      {route && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-foreground">{route.from}</span>
                          <ArrowRight className="h-3 w-3 flex-shrink-0" />
                          <span className="text-foreground">{route.to}</span>
                        </div>
                      )}
                      
                      {/* Passenger Count */}
                      <div className={`flex items-center gap-2 text-sm font-medium ${isOverCapacity ? 'text-destructive' : 'text-primary'}`}>
                        <Users className="h-4 w-4 flex-shrink-0" />
                        <span>{bus.current_passengers}/{bus.max_capacity} passengers</span>
                        {isOverCapacity && (
                          <Badge variant="destructive" className="text-xs">Over</Badge>
                        )}
                      </div>

                      {/* Safety Rating */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 flex-shrink-0" />
                        <span>Safety: </span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-2 w-2 rounded-full ${
                                i < bus.safety_rating ? 'bg-primary' : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-foreground font-medium">{bus.safety_rating}/9</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 flex-shrink-0" />
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
        <section className="border-t border-border bg-card py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-xl sm:text-2xl font-bold text-foreground">Available Routes</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {ROUTES.map((route) => (
                <Card key={route.routeId} className="bg-background border-border">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold flex-shrink-0">
                        {route.routeId}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-foreground font-medium flex-wrap">
                          <span>{route.from}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span>{route.to}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Bus: {route.bus_number}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary flex-shrink-0">
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
