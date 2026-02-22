import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Shop } from "@/data/shops";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

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
  const center: [number, number] = [-6.5518, 106.722];

  return (
    <MapContainer
      center={center}
      zoom={15}
      className={`w-full h-full min-h-[400px] rounded-xl ${className}`}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {shops.map((shop) => (
        <Marker
          key={shop.id}
          position={[shop.lat, shop.lng]}
          icon={selectedId === shop.id ? highlightIcon : defaultIcon}
        >
          <Popup>
            <div className="p-1 min-w-[180px]">
              <h3 className="font-semibold text-sm mb-1">{shop.name}</h3>
              <p className="text-xs text-muted-foreground mb-1">{shop.address}</p>
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs">{shop.rating}</span>
                <span className="text-xs ml-2">{shop.hours}</span>
              </div>
              <Link
                to={`/shop/${shop.id}`}
                className="text-xs text-primary font-medium hover:underline"
              >
                Lihat Detail →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
