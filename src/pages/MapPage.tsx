import { useState, useMemo, useCallback, useEffect } from "react";
import { useShops } from "@/context/ShopContext";
import MapView from "@/components/MapView";
import { useGeolocation } from "@/hooks/useGeolocation";
import { haversineDistance, formatDistance, isWithinRadius } from "@/lib/geo-utils";
import {
  Star,
  Search,
  MapPin,
  Map as MapIcon,
  Navigation,
  Flame,
  Crosshair,
  X,
  Loader2,
  Compass,
} from "lucide-react";

const MapPage = () => {
  const { shops, loading, getShop } = useShops();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    openNow: false,
    printWarna: false,
    jilid: false,
    laminating: false,
  });

  // ── Geolocation ──
  const { lat: userLat, lng: userLng, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();
  const userLocation = userLat != null && userLng != null ? { lat: userLat, lng: userLng } : null;

  // ── Routing ──
  const [routeToShopId, setRouteToShopId] = useState<string | null>(null);
  const routeToShop = routeToShopId ? getShop(routeToShopId) || null : null;

  // ── Heatmap ──
  const [showHeatmap, setShowHeatmap] = useState(false);

  // ── Buffer Analysis ──
  const [bufferMode, setBufferMode] = useState(false);
  const [bufferCenter, setBufferCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [bufferRadius, setBufferRadius] = useState(500);

  // ── Register global navigate callback for popup buttons ──
  useEffect(() => {
    (window as any).__navigateToShop = (shopId: string) => {
      if (userLocation) {
        setRouteToShopId(shopId);
      }
    };
    return () => {
      delete (window as any).__navigateToShop;
    };
  }, [userLocation]);

  const isOpenNow = (openTime: string, closeTime: string) => {
    const now = new Date();
    const [oh, om] = openTime.split(":").map(Number);
    const [ch, cm] = closeTime.split(":").map(Number);
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins >= oh * 60 + om && mins <= ch * 60 + cm;
  };

  const filtered = useMemo(() => {
    let result = shops;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)
      );
    }

    result = result.filter((s) => {
      if (filters.openNow && !isOpenNow(s.openTime, s.closeTime)) return false;
      if (filters.printWarna && !s.services.printWarna) return false;
      if (filters.jilid && !s.services.jilid) return false;
      if (filters.laminating && !s.services.laminating) return false;
      return true;
    });

    // Buffer filter
    if (bufferCenter) {
      result = result.filter((s) =>
        isWithinRadius(s.lat, s.lng, bufferCenter.lat, bufferCenter.lng, bufferRadius)
      );
    }

    return result;
  }, [shops, filters, search, bufferCenter, bufferRadius]);

  const toggleFilter = (key: keyof typeof filters) =>
    setFilters((f) => ({ ...f, [key]: !f[key] }));

  const handleBufferCenterSet = useCallback(
    (latlng: { lat: number; lng: number }) => {
      setBufferCenter(latlng);
    },
    []
  );

  const resetBuffer = () => {
    setBufferMode(false);
    setBufferCenter(null);
  };

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

        {/* Search Bar */}
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
          {/* GPS Location Button */}
          <div className="mb-4">
            <button
              onClick={requestLocation}
              disabled={geoLoading}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                userLocation
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
              }`}
            >
              {geoLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Compass className="h-4 w-4" />
              )}
              {userLocation ? "📍 Lokasi aktif" : "Aktifkan Lokasi Saya"}
            </button>
            {geoError && (
              <p className="text-xs text-red-500 mt-1.5">{geoError}</p>
            )}
          </div>

          {/* ── Tool Buttons ── */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                showHeatmap
                  ? "bg-orange-50 text-orange-600 border-orange-200 shadow-sm"
                  : "bg-white text-muted-foreground border-border/60 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              Heatmap
            </button>
            <button
              onClick={() => {
                if (bufferMode) {
                  resetBuffer();
                } else {
                  setBufferMode(true);
                }
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                bufferMode
                  ? "bg-red-50 text-red-600 border-red-200 shadow-sm"
                  : "bg-white text-muted-foreground border-border/60 hover:border-red-300 hover:text-red-500"
              }`}
            >
              <Crosshair className="h-3.5 w-3.5" />
              Buffer
            </button>
          </div>

          {/* ── Buffer Controls ── */}
          {bufferMode && (
            <div className="mb-4 p-3 bg-red-50/50 rounded-xl border border-red-100 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-red-700 flex items-center gap-1.5">
                  <Crosshair className="h-4 w-4" />
                  Analisis Buffer
                </h4>
                <button
                  onClick={resetBuffer}
                  className="p-1 rounded-md hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-red-600/70">
                {bufferCenter
                  ? `📍 Titik terpilih — ${filtered.length} toko dalam radius`
                  : "Klik pada peta untuk memilih titik pusat analisis"}
              </p>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-red-700">Radius</label>
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-md">
                    {bufferRadius >= 1000
                      ? `${(bufferRadius / 1000).toFixed(1)} km`
                      : `${bufferRadius}m`}
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={bufferRadius}
                  onChange={(e) => setBufferRadius(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-[10px] text-red-400 mt-0.5">
                  <span>100m</span>
                  <span>2 km</span>
                </div>
              </div>
              {bufferCenter && (
                <button
                  onClick={() => setBufferCenter(null)}
                  className="w-full py-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Reset Titik
                </button>
              )}
            </div>
          )}

          {/* ── Routing Active ── */}
          {routeToShop && (
            <div className="mb-4 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-blue-700 flex items-center gap-1.5">
                  <Navigation className="h-4 w-4" />
                  Navigasi Aktif
                </h4>
                <button
                  onClick={() => setRouteToShopId(null)}
                  className="p-1 rounded-md hover:bg-blue-100 text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-blue-600">
                Menuju <span className="font-semibold">{routeToShop.name}</span>
                {userLocation && (
                  <span className="ml-1 text-blue-500">
                    ({formatDistance(haversineDistance(userLocation.lat, userLocation.lng, routeToShop.lat, routeToShop.lng))})
                  </span>
                )}
              </p>
            </div>
          )}

          {/* ── Filters ── */}
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
                  {key === "openNow" ? "Buka Sekarang" : key === "printWarna" ? "Print Warna" : key === "laminating" ? "Foto Copy Warna" : key.charAt(0).toUpperCase() + key.slice(1)}
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

          {/* ── Shop List ── */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-10 px-4 bg-secondary/30 rounded-2xl border border-dashed border-border">
                <MapPin className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">Tidak temukan lokasi</p>
                <p className="text-xs text-muted-foreground mt-1">Coba sesuaikan kata kunci atau filter pencarian Anda.</p>
              </div>
            ) : (
              filtered.map((shop) => {
                const dist = userLocation
                  ? haversineDistance(userLocation.lat, userLocation.lng, shop.lat, shop.lng)
                  : null;
                return (
                  <button
                    key={shop.id}
                    onClick={() => setSelectedId(shop.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                      selectedId === shop.id
                        ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                        : "border-border/60 bg-white hover:border-primary/40 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-foreground mb-1">{shop.name}</p>
                      {dist != null && (
                        <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-md whitespace-nowrap flex items-center gap-0.5">
                          <MapPin className="h-2.5 w-2.5" />
                          {formatDistance(dist)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{shop.address}</p>
                    <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      <span className="text-xs font-semibold">{shop.rating}</span>
                      <span className="text-muted-foreground text-xs mx-1">•</span>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">{shop.hours}</span>
                      {userLocation && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRouteToShopId(shop.id);
                          }}
                          className="ml-auto text-[10px] font-semibold text-blue-500 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
                        >
                          <Navigation className="h-2.5 w-2.5" />
                          Navigasi
                        </button>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </aside>

      {/* Map */}
      <div className="flex-1 w-full h-[50vh] lg:h-[calc(100vh-64px)] relative z-0">
        <MapView
          shops={filtered}
          allShops={shops}
          selectedId={selectedId}
          onMarkerClick={setSelectedId}
          userLocation={userLocation}
          routeToShop={routeToShop}
          showHeatmap={showHeatmap}
          bufferMode={bufferMode}
          bufferCenter={bufferCenter}
          bufferRadius={bufferRadius}
          onBufferCenterSet={handleBufferCenterSet}
        />
      </div>
    </div>
  );
};

export default MapPage;
