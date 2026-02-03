"use client";

import { useEffect, useRef, useState } from "react";
import { BusLocation, KATHMANDU_LOCATIONS } from "@/lib/constants";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  buses?: BusLocation[];
  showUserLocation?: boolean;
  routeFrom?: string;
  routeTo?: string;
  height?: string;
  highlightOverCapacity?: boolean;
  showPassengerInfo?: boolean;
  showSafetyRating?: boolean;
}

export function LeafletMap({
  buses = [],
  showUserLocation = false,
  routeFrom,
  routeTo,
  height = "500px",
  highlightOverCapacity = false,
  showPassengerInfo = true,
  showSafetyRating = false,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || mapInstanceRef.current) return;

    const loadLeaflet = async () => {
      // Kathmandu center
      const center: [number, number] = [27.7172, 85.324];
      
      // Create map
      const map = L.map(mapRef.current!, {
        center,
        zoom: 13,
        zoomControl: true,
      });

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Add bus stop markers
      KATHMANDU_LOCATIONS.forEach((location) => {
        const isRoutePoint = location.name === routeFrom || location.name === routeTo;
        const markerColor = isRoutePoint
          ? location.name === routeFrom
            ? "#22c55e"
            : "#ef4444"
          : "#6b7280";

        const stopIcon = L.divIcon({
          className: "custom-marker",
          html: `<div style="
            width: 12px;
            height: 12px;
            background-color: ${markerColor};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        L.marker([location.lat, location.lng], { icon: stopIcon })
          .bindPopup(`<strong>${location.name}</strong>${isRoutePoint ? (location.name === routeFrom ? " (Start)" : " (End)") : ""}`)
          .addTo(map);
      });

      // Add route line if from and to are specified
      if (routeFrom && routeTo) {
        const fromLoc = KATHMANDU_LOCATIONS.find((l) => l.name === routeFrom);
        const toLoc = KATHMANDU_LOCATIONS.find((l) => l.name === routeTo);
        if (fromLoc && toLoc) {
          L.polyline(
            [
              [fromLoc.lat, fromLoc.lng],
              [toLoc.lat, toLoc.lng],
            ],
            {
              color: "#86efac",
              weight: 3,
              dashArray: "10, 10",
            }
          ).addTo(map);
        }
      }

      // Add bus markers
      buses.forEach((bus) => {
        const isOverCapacity = bus.current_passengers > bus.max_capacity;
        const bgColor = highlightOverCapacity && isOverCapacity ? "#ef4444" : "#86efac";
        const textColor = highlightOverCapacity && isOverCapacity ? "#ffffff" : "#1a2e1a";

        const busIcon = L.divIcon({
          className: "bus-marker",
          html: `<div style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background-color: ${bgColor};
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            transform: rotate(${bus.heading}deg);
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${textColor}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="transform: rotate(-${bus.heading}deg);">
              <path d="M8 6v6"/><path d="M16 6v6"/>
              <path d="M2 12h19.6"/>
              <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H6c-1.1 0-2.1.8-2.4 1.8l-1.4 5c-.1.4-.2.8-.2 1.2 0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3"/>
              <circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>
            </svg>
          </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        let popupContent = `
          <div style="min-width: 180px;">
            <strong style="font-size: 14px;">${bus.bus_number}</strong>
            <br/><span style="color: #666;">${bus.current_location}</span>
            <br/><span style="color: #666;">Speed: ${bus.speed} km/h</span>
            <br/><span style="color: #666;">Driver: ${bus.driver_name}</span>
        `;

        if (showPassengerInfo) {
          const passengerColor = isOverCapacity ? "#ef4444" : "#22c55e";
          popupContent += `<br/><span style="color: ${passengerColor}; font-weight: bold;">Passengers: ${bus.current_passengers}/${bus.max_capacity}</span>`;
        }

        if (showSafetyRating) {
          popupContent += `<br/><span style="color: #f59e0b;">Safety Rating: ${bus.safety_rating}/9</span>`;
        }

        popupContent += "</div>";

        L.marker([bus.latitude, bus.longitude], { icon: busIcon })
          .bindPopup(popupContent)
          .addTo(map);
      });

      // Show user location
      if (showUserLocation && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userIcon = L.divIcon({
              className: "user-marker",
              html: `<div style="
                width: 16px;
                height: 16px;
                background-color: #3b82f6;
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 0 0 2px #3b82f6, 0 4px 8px rgba(0,0,0,0.3);
              "></div>`,
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            });

            L.marker([position.coords.latitude, position.coords.longitude], { icon: userIcon })
              .bindPopup("<strong>Your Location</strong>")
              .addTo(map);
          },
          () => {
            console.log("[v0] Unable to get user location");
          }
        );
      }

      setIsLoaded(true);
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [buses, showUserLocation, routeFrom, routeTo, highlightOverCapacity, showPassengerInfo, showSafetyRating]);

  return (
    <div className="relative w-full rounded-xl border border-border overflow-hidden z-0" style={{ height }}>
      <div ref={mapRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">Loading map...</span>
          </div>
        </div>
      )}
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-border z-[1000]">
        <div className="flex flex-col gap-2 text-xs">
          {buses.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Active Bus</span>
            </div>
          )}
          {highlightOverCapacity && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Over Capacity</span>
            </div>
          )}
          {routeFrom && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-muted-foreground">From: {routeFrom}</span>
            </div>
          )}
          {routeTo && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-muted-foreground">To: {routeTo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
