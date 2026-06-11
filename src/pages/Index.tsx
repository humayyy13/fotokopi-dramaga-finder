import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Copy, Navigation, Loader2 } from "lucide-react";
import { useShops } from "@/context/ShopContext";
import { useGeolocation } from "@/hooks/useGeolocation";
import { sortByDistance, haversineDistance } from "@/lib/geo-utils";
import FeatureCards from "@/components/FeatureCards";
import ShopCard from "@/components/ShopCard";
import HeroIllustration from "@/components/HeroIllustration";
import CityscapeBackground from "@/components/CityscapeBackground";

const LocationIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="42" rx="10" ry="3" fill="#1E3A8A" fillOpacity="0.1" />
    <path d="M24 40C24 40 38 28 38 16C38 8.268 31.732 2 24 2C16.268 2 10 8.268 10 16C10 28 24 40 24 40Z" fill="#DBEAFE" />
    <circle cx="24" cy="16" r="8" fill="#3B82F6" />
    <circle cx="24" cy="16" r="3" fill="#EFF6FF" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="14" fill="#E9D5FF" />
    <circle cx="20" cy="20" r="10" fill="#A855F7" />
    <rect x="29" y="32" width="6" height="16" rx="3" transform="rotate(-45 29 32)" fill="#D8B4FE" />
    <circle cx="20" cy="20" r="4" fill="#F3E8FF" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="20" r="6" fill="#A7F3D0" />
    <path d="M6 38C6 33 10 29 16 29H18" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" />

    <circle cx="34" cy="20" r="6" fill="#A7F3D0" />
    <path d="M42 38C42 33 38 29 32 29H30" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" />

    <circle cx="24" cy="16" r="8" fill="#10B981" />
    <path d="M12 40C12 33 16 26 24 26C32 26 36 33 36 40H12Z" fill="#34D399" />
  </svg>
);

const Index = () => {
  const { shops } = useShops();
  const [search, setSearch] = useState("");
  const [sortNearest, setSortNearest] = useState(false);
  const { lat, lng, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#about") {
        const element = document.getElementById("about");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNearestToggle = () => {
    if (!lat && !sortNearest) {
      requestLocation();
      setSortNearest(true);
    } else {
      setSortNearest(!sortNearest);
    }
  };

  const filtered = useMemo(() => {
    let result = shops;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)
      );
    }

    if (sortNearest && lat != null && lng != null) {
      return sortByDistance(result, lat, lng);
    }

    return result.map((s) => ({
      ...s,
      distance: lat != null && lng != null ? haversineDistance(lat, lng, s.lat, s.lng) : undefined,
    }));
  }, [shops, search, sortNearest, lat, lng]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 px-4 overflow-hidden">
        <CityscapeBackground />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left Column: Text & Search */}
            <div className="text-center lg:text-left order-2 lg:order-1 pt-4 lg:pt-0">
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold mb-6 leading-[1.15] tracking-tight text-foreground animate-fade-in">
                Temukan Jasa Photo Copy Terdekat di Dramaga
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mb-10 animate-fade-in max-w-2xl mx-auto lg:mx-0 leading-relaxed" style={{ animationDelay: "0.1s" }}>
                Sistem Informasi Geografis untuk pencarian lokasi photo copy di wilayah Dramaga, Bogor dengan cepat dan mudah.
              </p>

              {/* Search */}
              <div className="relative max-w-2xl mx-auto lg:mx-0 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="relative shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white border border-border/60 p-2 flex items-center h-16">
                  <Search className="absolute left-6 text-muted-foreground h-6 w-6" />
                  <input
                    type="text"
                    placeholder="Cari nama atau alamat photo copy..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-16 pr-4 h-full bg-transparent border-none text-foreground text-lg focus:outline-none focus:ring-0 placeholder:text-muted-foreground/70"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <button
                  onClick={handleNearestToggle}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 w-full sm:w-auto ${
                    sortNearest
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600"
                      : "bg-white border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/30 hover:shadow-lg"
                  } hover:-translate-y-1`}
                >
                  {geoLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Navigation className="h-5 w-5" />
                  )}
                  {sortNearest ? "Terdekat Aktif" : "Toko Terdekat"}
                </button>
                <Link
                  to="/map"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-primary/95 transition-all duration-300 w-full sm:w-auto"
                >
                  <MapPin className="h-5 w-5" />
                  Lihat Peta
                </Link>
              </div>

              {geoError && (
                <p className="text-sm text-red-500 mt-3 animate-fade-in">{geoError}</p>
              )}
            </div>

            {/* Right Column: Illustration */}
            <div className="order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none px-4 lg:px-0">
              <HeroIllustration />
            </div>

          </div>
        </div>
      </section>

      <FeatureCards />

      {/* Shop List */}
      <section id="shop-list" className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Daftar Photo Copy</h2>
          <p className="text-muted-foreground text-center mb-10">
            {filtered.length} toko ditemukan{search && ` untuk "${search}"`}
            {sortNearest && lat != null && " — diurutkan berdasarkan jarak terdekat"}
          </p>
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Tidak ada toko yang ditemukan.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((shop) => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  distance={"distance" in shop ? (shop as any).distance : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tentang Section */}
      <section id="about" className="py-20 px-4 bg-background border-t border-border/40 scroll-mt-16">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-foreground">Tentang SIG Photo Copy Dramaga</h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Sistem Informasi Geografis berbasis web untuk membantu masyarakat menemukan jasa photo copy di wilayah Dramaga, Bogor dengan akurat dan cepat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: LocationIcon, title: "Lokasi Akurat", desc: "Pemetaan lokasi photo copy dengan koordinat yang tepat menggunakan teknologi GIS.", bg: "bg-blue-50" },
              { icon: SearchIcon, title: "Pencarian Mudah", desc: "Filter berdasarkan layanan, jam buka, dan lokasi terdekat dengan cepat.", bg: "bg-purple-50" },
              { icon: UsersIcon, title: "Untuk Semua", desc: "Didesain untuk mahasiswa, dosen, dan masyarakat umum di wilayah Dramaga.", bg: "bg-teal-50" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 text-center group border border-border/50"
              >
                <div className={`mx-auto flex items-center justify-center w-16 h-16 rounded-2xl ${item.bg} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <item.icon className="h-8 w-8 drop-shadow-sm" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border/40 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-foreground">Deskripsi Sistem</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              SIG Photo Copy Dramaga adalah aplikasi web berbasis Sistem Informasi Geografis (SIG) yang dirancang untuk memetakan dan menampilkan lokasi jasa photo copy di wilayah Dramaga, Kabupaten Bogor. Aplikasi ini memanfaatkan teknologi peta interaktif untuk memberikan informasi yang akurat dan mudah diakses.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Dengan fitur pencarian dan filter yang lengkap, pengguna dapat dengan mudah menemukan toko photo copy terdekat berdasarkan layanan yang dibutuhkan, seperti print warna, jilid, dan foto copy warna. Sistem ini juga menyediakan informasi jam operasional dan rating dari setiap toko.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
