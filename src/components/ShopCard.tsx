import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Shop } from "@/data/shops";

const ShopCard = ({ shop }: { shop: Shop }) => (
  <Link
    to={`/shop/${shop.id}`}
    className="block bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
  >
    <div className="h-40 bg-primary/10 flex items-center justify-center">
      {shop.image ? (
        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-4xl">🏪</span>
      )}
    </div>
    <div className="p-5">
      <h3 className="font-semibold text-lg mb-1">{shop.name}</h3>
      <p className="text-sm text-muted-foreground mb-2">{shop.address}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{shop.rating}</span>
        </div>
        <span className="text-xs bg-secondary px-2 py-1 rounded-md">{shop.hours}</span>
      </div>
      <div className="flex flex-wrap gap-1 mt-3">
        {shop.services.printWarna && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Print Warna</span>}
        {shop.services.jilid && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Jilid</span>}
        {shop.services.laminating && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Foto Copy Warna</span>}
      </div>
    </div>
  </Link>
);

export default ShopCard;
