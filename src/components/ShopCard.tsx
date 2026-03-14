import { Star, MapPin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Shop } from "@/data/shops";
import { formatDistance, getWaLink } from "@/lib/geo-utils";

interface ShopCardProps {
  shop: Shop;
  distance?: number | null; // distance in meters
}

const ShopCard = ({ shop, distance }: ShopCardProps) => (
  <div className="block bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 relative group">
    <Link to={`/shop/${shop.id}`} className="absolute inset-0 z-0" aria-label={`Detail toko ${shop.name}`}></Link>
    <div className="h-40 bg-primary/10 flex items-center justify-center relative pointer-events-none">
      {shop.image ? (
        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-4xl">🏪</span>
      )}
      {distance != null && (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-blue-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
          <MapPin className="h-3 w-3" />
          {formatDistance(distance)}
        </span>
      )}
    </div>
    <div className="p-5 relative z-10">
      <h3 className="font-semibold text-lg mb-1">{shop.name}</h3>
      <p className="text-sm text-muted-foreground mb-2">{shop.address}</p>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{shop.rating}</span>
        </div>
        <span className="text-xs bg-secondary px-2 py-1 rounded-md">{shop.hours}</span>
        {shop.whatsapp && (
          <a
            href={getWaLink(shop.whatsapp, shop.name)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-auto inline-flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white p-1.5 rounded-md transition-colors"
            title="Chat WhatsApp"
          >
            <MessageSquare className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      <div className="flex flex-wrap gap-1 mt-3">
        {shop.services.printWarna && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Print Warna</span>}
        {shop.services.jilid && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Jilid</span>}
        {shop.services.laminating && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Foto Copy Warna</span>}
      </div>
    </div>
  </div>
);

export default ShopCard;
