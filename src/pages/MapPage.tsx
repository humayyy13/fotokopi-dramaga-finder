import { useState, useMemo } from "react";
import { useShops } from "@/context/ShopContext";
import MapView from "@/components/MapView";
import { Star, Search, MapPin, Map as MapIcon } from "lucide-react";

const MapPage = () => {
  const { shops, loading } = useShops();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    openNow: false,
    printWarna: false,
    jilid: false,
    laminating: false,
  });

  const isOpenNow = (openTime: string, closeTime: string) => {
    const now = new Date();
    const [oh, om] = openTime.split(":").map(Number);
    const [ch, cm] = closeTime.split(":").map(Number);
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins >= oh * 60 + om && mins <= ch * 60 + cm;
  };

  const filtered = useMemo(() => {
    let result = shops;

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)
      );
    }

    // Filter by services & hours
    return result.filter((s) => {
      if (filters.openNow && !isOpenNow(s.openTime, s.closeTime)) return false;
      if (filters.printWarna && !s.services.printWarna) return false;
      if (filters.jilid && !s.services.jilid) return false;
      if (filters.laminating && !s.services.laminating) return false;
      return true;
    });
  }, [shops, filters, search]);

  const toggleFilter = (key: keyof typeof filters) =>
    setFilters((f) => ({ ...f, [key]: !f[key] }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <MapIcon className="h-10 w-10 text-primary opacity-50" />
          <p className="text-muted-foreground font-medium">Memuat data peta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Sidebar */}
      <aside className="w-full lg:w-96 bg-card border-r flex flex-col h-[50vh] lg:h-[calc(100vh-64px)] shadow-sm z-10">

        {/* Search Bar - Fixed at top of sidebar */}
        <div className="p-4 border-b bg-white border-border/50 sticky top-0 z-20">
          <div className="relative shadow-sm rounded-xl bg-secondary/50 border border-border/60 p-1.5 flex items-center transition-all hover:bg-secondary focus-within:bg-secondary focus-within:ring-1 focus-within:ring-primary">
            <Search className="absolute left-4 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Cari fotokopi atau alamat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-transparent border-none text-foreground text-sm focus:outline-none focus:ring-0 placeholder:text-muted-foreground/70"
            />
          </div>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <h2 className="font-bold text-lg mb-4 text-foreground">Filter Peta</h2>
          <div className="space-y-3 mb-8">
            {(["openNow", "printWarna", "jilid", "laminating"] as const).map((key) => (
              <label key={key} className="flex items-center gap-3 text-sm cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters[key]}
                  onChange={() => toggleFilter(key)}
                  className="rounded-md border-border/60 text-primary focus:ring-primary w-4 h-4 transition-colors"
                />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                  {key === "openNow" ? "Buka Sekarang" : key === "printWarna" ? "Print Warna" : key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-foreground">
              Hasil Pencarian
            </h3>
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
              {filtered.length} Toko
            </span>
          </div>

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-10 px-4 bg-secondary/30 rounded-2xl border border-dashed border-border">
                <MapPin className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">Tidak temukan lokasi</p>
                <p className="text-xs text-muted-foreground mt-1">Coba sesuaikan kata kunci atau filter pencarian Anda.</p>
              </div>
            ) : (
              filtered.map((shop) => (
                <button
                  key={shop.id}
                  onClick={() => setSelectedId(shop.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${selectedId === shop.id
                      ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                      : "border-border/60 bg-white hover:border-primary/40 hover:shadow-sm"
                    }`}
                >
                  <p className="font-bold text-foreground mb-1">{shop.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{shop.address}</p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="text-xs font-semibold">{shop.rating}</span>
                    <span className="text-muted-foreground text-xs mx-1">•</span>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">{shop.hours}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Map */}
      <div className="flex-1 w-full h-[50vh] lg:h-[calc(100vh-64px)] relative z-0">
        <MapView shops={filtered} selectedId={selectedId} onMarkerClick={setSelectedId} />
      </div>
    </div>
  );
};

export default MapPage;
