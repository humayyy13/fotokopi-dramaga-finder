import { useEffect, useRef } from "react";
import L from "leaflet";
import { Shop } from "@/data/shops";

// Fix default marker icon
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const highlightIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [1, -40],
  className: "highlighted-marker",
});

interface MapViewProps {
  shops: Shop[];
  selectedId?: string | null;
  className?: string;
}

const MapView = ({ shops, selectedId, className = "" }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([-6.5518, 106.722], 15);
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
      const marker = L.marker([shop.lat, shop.lng], {
        icon: selectedId === shop.id ? highlightIcon : defaultIcon,
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width:180px;padding:4px">
          <h3 style="font-weight:600;font-size:14px;margin:0 0 4px">${shop.name}</h3>
          <p style="font-size:12px;color:#666;margin:0 0 4px">${shop.address}</p>
          <p style="font-size:12px;margin:0 0 6px">⭐ ${shop.rating} · ${shop.hours}</p>
          <a href="/shop/${shop.id}" style="font-size:12px;color:hsl(0,0%,28%);font-weight:500">Lihat Detail →</a>
        </div>
      `);

      if (selectedId === shop.id) {
        marker.openPopup();
        map.setView([shop.lat, shop.lng], 16);
      }

      markersRef.current.push(marker);
    });
  }, [shops, selectedId]);

  return <div ref={containerRef} className={`w-full h-full min-h-[400px] rounded-xl ${className}`} />;
};

export default MapView;
