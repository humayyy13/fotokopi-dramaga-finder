import { useParams, Link } from "react-router-dom";
import { useShops } from "@/context/ShopContext";
import { Star, Clock, MapPin, ArrowLeft, Printer, BookOpen, Shield, Copy } from "lucide-react";

const ShopDetail = () => {
  const { id } = useParams();
  const { getShop } = useShops();
  const shop = getShop(id || "");

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Toko tidak ditemukan</h2>
          <Link to="/" className="text-primary hover:underline">Kembali ke beranda</Link>
        </div>
      </div>
    );
  }

  const serviceBadges = [
    { key: "fotokopi", label: "Fotokopi", icon: Copy, active: shop.services.fotokopi },
    { key: "printWarna", label: "Print Warna", icon: Printer, active: shop.services.printWarna },
    { key: "jilid", label: "Jilid", icon: BookOpen, active: shop.services.jilid },
    { key: "laminating", label: "Foto Copy Warna", icon: Shield, active: shop.services.laminating },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Link>

        <div className="bg-card rounded-xl overflow-hidden card-shadow">
          {/* Image */}
          <div className="h-56 bg-primary/10 flex items-center justify-center">
            {shop.image ? (
              <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl">🏪</span>
            )}
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl font-bold">{shop.name}</h1>
              <div className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-sm">{shop.rating}</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{shop.description}</p>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>{shop.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{shop.address}</span>
              </div>
            </div>

            {/* Service badges */}
            <h3 className="font-semibold mb-3">Layanan</h3>
            <div className="flex flex-wrap gap-2">
              {serviceBadges.map((s) => (
                <div
                  key={s.key}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
                    s.active
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground line-through"
                  }`}
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
