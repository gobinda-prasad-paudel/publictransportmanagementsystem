"use client";

import { useEffect, useRef, useState } from "react";
import { BusLocation, KATHMANDU_LOCATIONS } from "@/lib/constants";
import { Bus, MapPin, Navigation } from "lucide-react";

interface MapProps {
  buses?: BusLocation[];
  showUserLocation?: boolean;
  routeFrom?: string;
  routeTo?: string;
  height?: string;
}

export function TransportMap({
  buses = [],
  showUserLocation = false,
  routeFrom,
  routeTo,
  height = "500px",
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (showUserLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError("Unable to access your location. Please enable location access.");
        }
      );
    }
  }, [showUserLocation]);

  // Calculate positions for buses on the map
  const getPosition = (lat: number, lng: number) => {
    // Kathmandu valley bounds approximately
    const minLat = 27.6;
    const maxLat = 27.8;
    const minLng = 85.25;
    const maxLng = 85.45;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const fromLocation = routeFrom ? KATHMANDU_LOCATIONS.find(l => l.name === routeFrom) : null;
  const toLocation = routeTo ? KATHMANDU_LOCATIONS.find(l => l.name === routeTo) : null;

  return (
    <div
      ref={mapRef}
      className="relative w-full rounded-xl border border-border bg-card overflow-hidden"
      style={{ height }}
    >
      {/* Map Background with Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-muted">
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Map Title */}
      <div className="absolute top-4 left-4 z-10 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
        <div className="flex items-center gap-2">
          <Navigation className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Kathmandu Valley</span>
        </div>
      </div>

      {/* Location markers */}
      {KATHMANDU_LOCATIONS.map((location) => {
        const pos = getPosition(location.lat, location.lng);
        const isRoutePoint = location.name === routeFrom || location.name === routeTo;
        return (
          <div
            key={location.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <div className={`relative ${isRoutePoint ? 'z-20' : 'z-10'}`}>
              <MapPin
                className={`h-4 w-4 ${
                  isRoutePoint
                    ? location.name === routeFrom
                      ? "text-green-400"
                      : "text-red-400"
                    : "text-muted-foreground/50"
                }`}
              />
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-card/95 backdrop-blur-sm rounded px-2 py-1 text-xs whitespace-nowrap border border-border z-30">
                {location.name}
              </div>
            </div>
          </div>
        );
      })}

      {/* Route line */}
      {fromLocation && toLocation && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
          <line
            x1={`${getPosition(fromLocation.lat, fromLocation.lng).x}%`}
            y1={`${getPosition(fromLocation.lat, fromLocation.lng).y}%`}
            x2={`${getPosition(toLocation.lat, toLocation.lng).x}%`}
            y2={`${getPosition(toLocation.lat, toLocation.lng).y}%`}
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 4"
            className="text-primary"
          />
        </svg>
      )}

      {/* Bus markers */}
      {buses.map((bus) => {
        const pos = getPosition(bus.latitude, bus.longitude);
        return (
          <div
            key={bus.bus_id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <div className="relative">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30 animate-pulse"
                style={{ transform: `rotate(${bus.heading}deg)` }}
              >
                <Bus className="h-4 w-4 text-primary-foreground" style={{ transform: `rotate(-${bus.heading}deg)` }} />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 text-xs whitespace-nowrap border border-border shadow-lg z-40 min-w-[150px]">
                <div className="font-semibold text-foreground">{bus.bus_number}</div>
                <div className="text-muted-foreground">{bus.current_location}</div>
                <div className="text-muted-foreground">Speed: {bus.speed} km/h</div>
                <div className="text-muted-foreground">Driver: {bus.driver_name}</div>
              </div>
            </div>
          </div>
        );
      })}

      {/* User location */}
      {showUserLocation && userLocation && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-40"
          style={{
            left: `${getPosition(userLocation.lat, userLocation.lng).x}%`,
            top: `${getPosition(userLocation.lat, userLocation.lng).y}%`,
          }}
        >
          <div className="relative">
            <div className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow-lg">
              <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-50"></div>
            </div>
          </div>
        </div>
      )}

      {/* Location error */}
      {showUserLocation && locationError && (
        <div className="absolute bottom-4 left-4 right-4 bg-destructive/20 border border-destructive rounded-lg px-4 py-3 text-sm text-destructive z-50">
          {locationError}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border z-10">
        <div className="flex flex-col gap-2 text-xs">
          {buses.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Active Bus</span>
            </div>
          )}
          {routeFrom && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-green-400" />
              <span className="text-muted-foreground">From: {routeFrom}</span>
            </div>
          )}
          {routeTo && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-red-400" />
              <span className="text-muted-foreground">To: {routeTo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
