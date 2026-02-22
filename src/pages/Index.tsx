import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Copy } from "lucide-react";
import { useShops } from "@/context/ShopContext";
import FeatureCards from "@/components/FeatureCards";
import ShopCard from "@/components/ShopCard";

const Index = () => {
  const { shops } = useShops();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return shops;
    const q = search.toLowerCase();
    return shops.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
    );
  }, [shops, search]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight animate-fade-in">
            Temukan Jasa Fotokopi Terdekat di Dramaga dengan Mudah
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Sistem Informasi Geografis untuk pencarian lokasi fotokopi di wilayah Dramaga, Bogor
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nama atau alamat fotokopi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card text-card-foreground border-0 shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 bg-card text-primary px-6 py-3 rounded-xl font-medium hover:bg-card/90 transition-colors shadow-lg"
            >
              <MapPin className="h-4 w-4" />
              Lihat Peta
            </Link>
            <button
              onClick={() => document.getElementById("shop-list")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors"
            >
              <Copy className="h-4 w-4" />
              Cari Fotokopi
            </button>
          </div>
        </div>
      </section>

      <FeatureCards />

      {/* Shop List */}
      <section id="shop-list" className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Daftar Fotokopi</h2>
          <p className="text-muted-foreground text-center mb-10">
            {filtered.length} toko ditemukan{search && ` untuk "${search}"`}
          </p>
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Tidak ada toko yang ditemukan.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
