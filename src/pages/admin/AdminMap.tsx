import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useShops } from "@/context/ShopContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Store, Pencil } from "lucide-react";

const DRAMAGA_CENTER: [number, number] = [-6.5518, 106.722];

const AdminMap = () => {
  const { shops, loading } = useShops();
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current, {
      center: DRAMAGA_CENTER,
      zoom: 15,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || loading) return;

    // Clear old markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current!.removeLayer(layer);
      }
    });

    const customIcon = L.divIcon({
      html: `<div style="background:#16a34a;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3" fill="#16a34a" stroke="white"/>
        </svg>
      </div>`,
      className: "",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
    });

    const bounds: [number, number][] = [];

    shops.forEach((shop) => {
      bounds.push([shop.lat, shop.lng]);

      const services = [];
      if (shop.services.fotokopi) services.push("Fotokopi");
      if (shop.services.printWarna) services.push("Print Warna");
      if (shop.services.jilid) services.push("Jilid");
      if (shop.services.laminating) services.push("Foto Copy Warna");

      const popupContent = `
        <div style="min-width:200px;font-family:system-ui,sans-serif;">
          <h3 style="font-size:14px;font-weight:700;margin:0 0 4px 0;">${shop.name}</h3>
          <p style="font-size:11px;color:#6b7280;margin:0 0 6px 0;">${shop.address}</p>
          <div style="display:flex;gap:8px;margin-bottom:6px;">
            <span style="font-size:11px;background:#fef3c7;color:#d97706;padding:2px 6px;border-radius:4px;">⭐ ${shop.rating}</span>
            <span style="font-size:11px;background:#dbeafe;color:#2563eb;padding:2px 6px;border-radius:4px;">🕐 ${shop.hours}</span>
          </div>
          <p style="font-size:10px;color:#9ca3af;margin:0 0 8px 0;">${services.join(" · ")}</p>
          <a href="/admin/shops/edit/${shop.id}" style="display:inline-flex;align-items:center;gap:4px;font-size:11px;background:#16a34a;color:white;padding:4px 10px;border-radius:6px;text-decoration:none;font-weight:600;">
            ✏️ Edit Toko
          </a>
        </div>
      `;

      L.marker([shop.lat, shop.lng], { icon: customIcon })
        .addTo(mapRef.current!)
        .bindPopup(popupContent);
    });

    if (bounds.length > 0) {
      mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
    }
  }, [shops, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <MapPin className="h-8 w-8 text-primary opacity-50" />
          <p className="text-muted-foreground text-sm">Memuat peta...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Peta Toko</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-semibold border border-emerald-200">
            <Store className="h-3.5 w-3.5" />
            {shops.length} Toko Terpetakan
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl card-shadow overflow-hidden border border-border/50">
        <div ref={containerRef} className="w-full h-[calc(100vh-200px)] min-h-[500px]" />
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        💡 Klik marker pada peta untuk melihat detail toko dan link edit.
      </p>
    </div>
  );
};

export default AdminMap;
