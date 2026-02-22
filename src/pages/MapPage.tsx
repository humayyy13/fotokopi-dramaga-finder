import { useState, useMemo } from "react";
import { useShops } from "@/context/ShopContext";
import MapView from "@/components/MapView";
import { Star } from "lucide-react";

const MapPage = () => {
  const { shops } = useShops();
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
    return shops.filter((s) => {
      if (filters.openNow && !isOpenNow(s.openTime, s.closeTime)) return false;
      if (filters.printWarna && !s.services.printWarna) return false;
      if (filters.jilid && !s.services.jilid) return false;
      if (filters.laminating && !s.services.laminating) return false;
      return true;
    });
  }, [shops, filters]);

  const toggleFilter = (key: keyof typeof filters) =>
    setFilters((f) => ({ ...f, [key]: !f[key] }));

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-card border-r p-4 overflow-y-auto lg:max-h-[calc(100vh-64px)]">
        <h2 className="font-bold text-lg mb-4">Filter</h2>
        <div className="space-y-2 mb-6">
          {(["openNow", "printWarna", "jilid", "laminating"] as const).map((key) => (
            <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters[key]}
                onChange={() => toggleFilter(key)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              {key === "openNow" ? "Buka Sekarang" : key === "printWarna" ? "Print Warna" : key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        <h3 className="font-semibold text-sm mb-2 text-muted-foreground">
          {filtered.length} Toko
        </h3>
        <div className="space-y-2">
          {filtered.map((shop) => (
            <button
              key={shop.id}
              onClick={() => setSelectedId(shop.id)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedId === shop.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-secondary"
              }`}
            >
              <p className="font-medium text-sm">{shop.name}</p>
              <p className="text-xs text-muted-foreground">{shop.address}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs">{shop.rating}</span>
                <span className="text-xs text-muted-foreground ml-2">{shop.hours}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Map */}
      <div className="flex-1 min-h-[400px] lg:min-h-[calc(100vh-64px)]">
        <MapView shops={filtered} selectedId={selectedId} />
      </div>
    </div>
  );
};

export default MapPage;
