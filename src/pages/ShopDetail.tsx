import { useParams, Link } from "react-router-dom";
import { useShops } from "@/context/ShopContext";
import { getWaLink } from "@/lib/geo-utils";
import { Star, MapPin, ArrowLeft, Printer, BookOpen, Shield, Copy, ExternalLink, Navigation } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WeeklyHoursDisplay } from "@/components/WeeklyHoursDisplay";
import SEO from "@/components/SEO";

const ShopDetail = () => {
  const { id } = useParams();
  const { getShop } = useShops();
  const shop = getShop(id || "");

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Toko tidak ditemukan</h2>
          <Link to="/map" className="text-primary hover:underline">Kembali ke peta</Link>
        </div>
      </div>
    );
  }

  const serviceBadges = [
    { key: "fotokopi", label: "Photo Copy", icon: Copy, active: shop.services.fotokopi },
    { key: "printWarna", label: "Print Warna", icon: Printer, active: shop.services.printWarna },
    { key: "jilid", label: "Jilid", icon: BookOpen, active: shop.services.jilid },
    { key: "laminating", label: "Foto Copy Warna", icon: Shield, active: shop.services.laminating },
  ];

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`;

  const seoTitle = `${shop.name} — Photo Copy Dramaga`;
  const seoDescription = `${shop.name} di ${shop.address}. Rating ${shop.rating}. Lihat layanan, jam buka, dan rute menuju lokasi.`;

  const localBusinessLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: shop.name,
    address: { "@type": "PostalAddress", streetAddress: shop.address, addressLocality: "Dramaga", addressRegion: "Jawa Barat", addressCountry: "ID" },
    geo: { "@type": "GeoCoordinates", latitude: shop.lat, longitude: shop.lng },
    aggregateRating: { "@type": "AggregateRating", ratingValue: shop.rating, ratingCount: 1 },
    ...(shop.whatsapp ? { telephone: shop.whatsapp } : {}),
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <SEO title={seoTitle} description={seoDescription} path={`/shop/${shop.id}`} jsonLd={localBusinessLd} />
      <div className="container mx-auto max-w-3xl">
        <Link to="/map" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Peta
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

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <WeeklyHoursDisplay hours={shop.hours} />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{shop.address}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {shop.whatsapp && (
                <a
                  href={getWaLink(shop.whatsapp, shop.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Chat WhatsApp
                </a>
              )}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Navigation className="h-4 w-4" />
                Buka Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                to="/map"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <MapPin className="h-4 w-4" />
                Lihat di Peta
              </Link>
            </div>

            {/* Service badges */}
            <h2 className="font-semibold mb-3">Layanan</h2>
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
