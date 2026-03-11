import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet.heat";
import { Shop } from "@/data/shops";
import { haversineDistance } from "@/lib/geo-utils";

interface MapViewProps {
  shops: Shop[];
  allShops?: Shop[]; // all shops for heatmap (unfiltered)
  selectedId?: string | null;
  className?: string;
  onMarkerClick?: (id: string) => void;
  userLocation?: { lat: number; lng: number } | null;
  routeToShop?: Shop | null;
  showHeatmap?: boolean;
  bufferMode?: boolean;
  bufferCenter?: { lat: number; lng: number } | null;
  bufferRadius?: number; // meters
  onBufferCenterSet?: (latlng: { lat: number; lng: number }) => void;
}

// ── Custom marker icons ──
const createCustomIcon = (isHighlighted: boolean, inBuffer?: boolean) => {
  const color = isHighlighted ? "#eec829" : inBuffer ? "#e74c3c" : "#1a4d33";
  const scale = isHighlighted ? 1.2 : 1;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="${30 * scale}" height="${40 * scale}" style="filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.25)); transform-origin: bottom center;">
      <path fill="${color}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: "custom-leaflet-marker",
    iconSize: [30 * scale, 40 * scale],
    iconAnchor: [15 * scale, 40 * scale],
    popupAnchor: [0, -40 * scale],
  });
};

const MapView = ({
  shops,
  allShops,
  selectedId,
  className = "",
  onMarkerClick,
  userLocation,
  routeToShop,
  showHeatmap,
  bufferMode,
  bufferCenter,
  bufferRadius = 500,
  onBufferCenterSet,
}: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const routeControlRef = useRef<any>(null);
  const heatLayerRef = useRef<L.Layer | null>(null);
  const bufferCircleRef = useRef<L.Circle | null>(null);
  const bufferMarkerRef = useRef<L.Marker | null>(null);

  // ── Initialize map ──
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current).setView([-6.561, 106.721], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ── User location marker (pulsing blue dot) ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const pulsingIcon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;width:24px;height:24px;">
            <div style="position:absolute;inset:0;border-radius:50%;background:rgba(59,130,246,0.25);animation:geo-pulse 2s ease-out infinite;"></div>
            <div style="position:absolute;top:4px;left:4px;width:16px;height:16px;border-radius:50%;background:#3B82F6;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: pulsingIcon,
        zIndexOffset: 2000,
      })
        .addTo(map)
        .bindPopup(
          '<div style="font-family:system-ui;font-weight:600;font-size:13px;color:#3B82F6;">📍 Lokasi Anda</div>'
        );
    }
  }, [userLocation]);

  // ── Shop markers ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    shops.forEach((shop) => {
      const isSelected = selectedId === shop.id;
      // Check if shop is inside buffer
      const inBuffer =
        bufferCenter && bufferRadius
          ? haversineDistance(
              bufferCenter.lat,
              bufferCenter.lng,
              shop.lat,
              shop.lng
            ) <= bufferRadius
          : false;

      const marker = L.marker([shop.lat, shop.lng], {
        icon: createCustomIcon(isSelected, inBuffer),
        zIndexOffset: isSelected ? 1000 : 0,
      }).addTo(map);

      marker.on("click", () => {
        if (onMarkerClick) onMarkerClick(shop.id);
      });

      // Distance text in popup if user location is available
      let distanceHtml = "";
      if (userLocation) {
        const dist = haversineDistance(
          userLocation.lat,
          userLocation.lng,
          shop.lat,
          shop.lng
        );
        const distText =
          dist < 1000
            ? `${Math.round(dist)}m`
            : `${(dist / 1000).toFixed(1)} km`;
        distanceHtml = `<span style="font-size:12px;font-weight:500;color:#3B82F6;background:#EFF6FF;padding:2px 6px;border-radius:4px;margin-left:4px;">📍 ${distText}</span>`;
      }

      marker.bindPopup(
        `
        <div style="min-width:220px;padding:2px;font-family:system-ui,-apple-system,sans-serif;">
          <h3 style="font-weight:700;font-size:15px;margin:0 0 6px;color:#1a4d33">${shop.name}</h3>
          <p style="font-size:13px;color:#666;margin:0 0 8px;line-height:1.4">${shop.address}</p>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap;">
            <span style="display:flex;align-items:center;gap:2px;font-weight:600;font-size:13px;color:#eec829;">
              ★ ${shop.rating}
            </span>
            <span style="color:#a1a1aa;font-size:12px;">•</span>
            <span style="font-size:12px;font-weight:500;color:#1a4d33;background:#1a4d331a;padding:2px 6px;border-radius:4px;">
              ${shop.hours}
            </span>
            ${distanceHtml}
          </div>
          <div style="display:flex;gap:6px;">
            <a href="/shop/${shop.id}" style="flex:1;text-align:center;background:#1a4d33;color:white;text-decoration:none;font-size:12px;font-weight:600;padding:8px;border-radius:6px;">
              Detail
            </a>
            ${
              userLocation
                ? `<button onclick="window.__navigateToShop && window.__navigateToShop('${shop.id}')" style="flex:1;text-align:center;background:#3B82F6;color:white;border:none;font-size:12px;font-weight:600;padding:8px;border-radius:6px;cursor:pointer;">
                    🧭 Navigasi
                  </button>`
                : ""
            }
          </div>
        </div>
      `,
        {
          className: "custom-popup rounded-xl shadow-lg border-0",
          closeButton: true,
        }
      );

      if (isSelected) {
        marker.openPopup();
        map.setView([shop.lat, shop.lng], 16, { animate: true, duration: 0.5 });
      }

      markersRef.current.push(marker);
    });

    if (shops.length > 0 && !selectedId) {
      const group = new L.FeatureGroup(markersRef.current);
      map.fitBounds(group.getBounds(), {
        padding: [50, 50],
        maxZoom: 15,
        animate: true,
      });
    } else if (shops.length === 0 && !bufferCenter) {
      map.setView([-6.561, 106.721], 14, { animate: true });
    }
  }, [shops, selectedId, onMarkerClick, userLocation, bufferCenter, bufferRadius]);

  // ── Routing ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old route
    if (routeControlRef.current) {
      try {
        map.removeControl(routeControlRef.current);
      } catch {
        /* ignore */
      }
      routeControlRef.current = null;
    }

    if (routeToShop && userLocation) {
      const control = (L as any).Routing.control({
        waypoints: [
          L.latLng(userLocation.lat, userLocation.lng),
          L.latLng(routeToShop.lat, routeToShop.lng),
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false, // hide the text instruction panel
        createMarker: () => null, // don't add extra markers
        lineOptions: {
          styles: [{ color: "#3B82F6", weight: 5, opacity: 0.8 }],
          extendToWaypoints: true,
          missingRouteTolerance: 10,
        },
      }).addTo(map);

      routeControlRef.current = control;
    }
  }, [routeToShop, userLocation]);

  // ── Heatmap ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null;
    }

    if (showHeatmap) {
      const heatData = (allShops || shops).map(
        (s) => [s.lat, s.lng, 1] as [number, number, number]
      );
      if (heatData.length > 0) {
        const heat = (L as any).heatLayer(heatData, {
          radius: 40,
          blur: 30,
          maxZoom: 17,
          max: 1,
          gradient: {
            0.2: "#2ecc71",
            0.4: "#f1c40f",
            0.6: "#e67e22",
            0.8: "#e74c3c",
            1.0: "#c0392b",
          },
        });
        heat.addTo(map);
        heatLayerRef.current = heat;
      }
    }
  }, [showHeatmap, allShops, shops]);

  // ── Buffer Analysis (circle + click handler) ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clean up
    if (bufferCircleRef.current) {
      map.removeLayer(bufferCircleRef.current);
      bufferCircleRef.current = null;
    }
    if (bufferMarkerRef.current) {
      map.removeLayer(bufferMarkerRef.current);
      bufferMarkerRef.current = null;
    }

    if (bufferCenter && bufferRadius) {
      // Draw circle
      bufferCircleRef.current = L.circle(
        [bufferCenter.lat, bufferCenter.lng],
        {
          radius: bufferRadius,
          color: "#e74c3c",
          fillColor: "#e74c3c",
          fillOpacity: 0.1,
          weight: 2,
          dashArray: "8, 4",
        }
      ).addTo(map);

      // Center marker
      const centerIcon = L.divIcon({
        className: "",
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#e74c3c;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      bufferMarkerRef.current = L.marker(
        [bufferCenter.lat, bufferCenter.lng],
        { icon: centerIcon, zIndexOffset: 1500 }
      ).addTo(map);

      // Fit to circle bounds
      map.fitBounds(bufferCircleRef.current.getBounds(), { padding: [30, 30] });
    }
  }, [bufferCenter, bufferRadius]);

  // ── Buffer click handler ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handler = (e: L.LeafletMouseEvent) => {
      if (bufferMode && onBufferCenterSet) {
        onBufferCenterSet({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    };

    if (bufferMode) {
      map.getContainer().style.cursor = "crosshair";
      map.on("click", handler);
    } else {
      map.getContainer().style.cursor = "";
    }

    return () => {
      map.off("click", handler);
      if (map.getContainer()) map.getContainer().style.cursor = "";
    };
  }, [bufferMode, onBufferCenterSet]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className={`w-full h-full z-0 ${className}`} />

      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 16px;
          padding: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .custom-popup .leaflet-popup-close-button {
          top: 12px;
          right: 12px;
          color: #9ca3af;
        }
        .custom-popup .leaflet-popup-close-button:hover {
          color: #1a4d33;
        }
        .custom-leaflet-marker {
          background: transparent;
          border: none;
          transition: transform 0.2s ease-in-out;
        }
        @keyframes geo-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        .leaflet-routing-container { display: none !important; }
      `}</style>
    </div>
  );
};

export default MapView;
