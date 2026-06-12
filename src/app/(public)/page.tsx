"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Navigation, Loader2, Instagram } from "lucide-react";
import { useShops } from "@/context/ShopContext";
import { useGeolocation } from "@/hooks/useGeolocation";
import { sortByDistance, haversineDistance } from "@/lib/geo-utils";
import ShopCard from "@/components/ShopCard";
import HeroIllustration from "@/components/HeroIllustration";
import CityscapeBackground from "@/components/CityscapeBackground";

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
    
    const element = document.getElementById("shop-list");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const element = document.getElementById("shop-list");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
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
                  href="/map"
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
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border/40 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Pengembang Sistem</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex-shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-pink-100 shadow-lg relative group">
                  <div className="absolute inset-0 bg-pink-500/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src="/syifa_avatar.png" alt="Syifa Humairoh" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-extrabold text-foreground mb-2">Syifa Humairoh</h3>
                <p className="text-pink-600 font-semibold mb-4 text-lg">Web Developer</p>
                <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
                  Sistem Informasi Geografis (SIG) Photo copy Dramaga ini dikembangkan oleh Syifa Humairoh, mahasiswi Informatika semester 6 di STIKOM El Rahma. Platform ini dirancang secara khusus untuk memetakan lokasi layanan Photo copy di wilayah Dramaga, sehingga dapat mempermudah mahasiswa maupun masyarakat umum dalam menemukan tempat Photo copy terdekat dengan cepat dan akurat.
                </p>
                <div className="flex justify-center md:justify-start">
                  <a href="https://instagram.com/syifa_hmrh13" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-background hover:bg-pink-50 text-foreground hover:text-pink-600 rounded-full transition-all duration-300 border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 group">
                    <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">@syifa_hmrh13</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
