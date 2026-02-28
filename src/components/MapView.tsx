import { useEffect, useRef } from "react";
import L from "leaflet";
import { Shop } from "@/data/shops";

interface MapViewProps {
  shops: Shop[];
  selectedId?: string | null;
  className?: string;
  onMarkerClick?: (id: string) => void;
}

// Create custom SVG markers using Leaflet's divIcon
const createCustomIcon = (isHighlighted: boolean) => {
  const color = isHighlighted ? "#eec829" : "#1a4d33"; // Mustard Yellow for highlight, Dark Green for default
  const scale = isHighlighted ? 1.2 : 1;
  const zIndex = isHighlighted ? 1000 : 1;

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

const MapView = ({ shops, selectedId, className = "", onMarkerClick }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Dramaga focus
    const map = L.map(containerRef.current).setView([-6.5610, 106.7210], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    shops.forEach((shop) => {
      const isSelected = selectedId === shop.id;
      const marker = L.marker([shop.lat, shop.lng], {
        icon: createCustomIcon(isSelected),
        zIndexOffset: isSelected ? 1000 : 0,
      }).addTo(map);

      // Add click event to trigger sidebar highlight
      marker.on("click", () => {
        if (onMarkerClick) {
          onMarkerClick(shop.id);
        }
      });

      marker.bindPopup(`
        <div style="min-width:200px;padding:2px;font-family:system-ui,-apple-system,sans-serif;">
          <h3 style="font-weight:700;font-size:15px;margin:0 0 6px;color:#1a4d33">${shop.name}</h3>
          <p style="font-size:13px;color:#666;margin:0 0 8px;line-height:1.4">${shop.address}</p>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;">
            <span style="display:flex;align-items:center;gap:2px;font-weight:600;font-size:13px;color:#eec829;">
              ★ ${shop.rating}
            </span>
            <span style="color:#a1a1aa;font-size:12px;">•</span>
            <span style="font-size:12px;font-weight:500;color:#1a4d33;background:#1a4d331a;padding:2px 6px;border-radius:4px;">
              ${shop.hours}
            </span>
          </div>
          <a href="/shop/${shop.id}" style="display:block;text-align:center;background:#1a4d33;color:white;text-decoration:none;font-size:13px;font-weight:600;padding:8px;border-radius:6px;transition:opacity 0.2s;">
            Lihat Detail
          </a>
        </div>
      `, {
        className: 'custom-popup rounded-xl shadow-lg border-0',
        closeButton: true,
      });

      if (isSelected) {
        marker.openPopup();
        map.setView([shop.lat, shop.lng], 16, { animate: true, duration: 0.5 });
      }

      markersRef.current.push(marker);
    });

    // Auto fit bounds if there are markers and no specific marker is actively selected
    if (shops.length > 0 && !selectedId) {
      const group = new L.FeatureGroup(markersRef.current);
      // Ensure we don't zoom in *too* much if there's only 1 or 2 close markers
      map.fitBounds(group.getBounds(), { padding: [50, 50], maxZoom: 15, animate: true });
    } else if (shops.length === 0) {
      // Default back to Dramaga if no results
      map.setView([-6.5610, 106.7210], 14, { animate: true });
    }
  }, [shops, selectedId, onMarkerClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className={`w-full h-full z-0 ${className}`} />

      {/* Global styles for Leaflet custom elements */}
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
      `}</style>
    </div>
  );
};

export default MapView;
