import { Link } from "react-router-dom";
import { useShops } from "@/context/ShopContext";
import { Pencil, Trash2, Plus, Star, Search, Download, ArrowUpDown, Filter } from "lucide-react";
import { useState, useMemo } from "react";

type SortKey = "name" | "rating" | "hours";
type SortDir = "asc" | "desc";

const AdminShopList = () => {
  const { shops, deleteShop } = useShops();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  // ── Search ──
  const [search, setSearch] = useState("");

  // ── Filter Layanan ──
  const [serviceFilter, setServiceFilter] = useState({
    fotokopi: false,
    printWarna: false,
    jilid: false,
    laminating: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  // ── Sort ──
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleDelete = async (id: string) => {
    await deleteShop(id);
    setConfirmId(null);
  };

  const toggleService = (key: keyof typeof serviceFilter) =>
    setServiceFilter((f) => ({ ...f, [key]: !f[key] }));

  const activeFilterCount = Object.values(serviceFilter).filter(Boolean).length;

  // ── Filtered + Sorted shops ──
  const filtered = useMemo(() => {
    let result = [...shops];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)
      );
    }

    // Filter services
    if (serviceFilter.fotokopi) result = result.filter((s) => s.services.fotokopi);
    if (serviceFilter.printWarna) result = result.filter((s) => s.services.printWarna);
    if (serviceFilter.jilid) result = result.filter((s) => s.services.jilid);
    if (serviceFilter.laminating) result = result.filter((s) => s.services.laminating);

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "rating") cmp = a.rating - b.rating;
      else if (sortKey === "hours") cmp = a.openTime.localeCompare(b.openTime);
      return sortDir === "desc" ? -cmp : cmp;
    });

    return result;
  }, [shops, search, serviceFilter, sortKey, sortDir]);

  // ── CSV Export ──
  const exportCSV = () => {
    const headers = [
      "Nama",
      "Alamat",
      "Latitude",
      "Longitude",
      "Rating",
      "Jam Buka",
      "Jam Tutup",
      "Photo Copy",
      "Print Warna",
      "Jilid",
      "Foto Copy Warna",
      "Deskripsi",
      "WhatsApp",
    ];

    const rows = filtered.map((s) => [
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.address.replace(/"/g, '""')}"`,
      s.lat,
      s.lng,
      s.rating,
      s.openTime,
      s.closeTime,
      s.services.fotokopi ? "Ya" : "Tidak",
      s.services.printWarna ? "Ya" : "Tidak",
      s.services.jilid ? "Ya" : "Tidak",
      s.services.laminating ? "Ya" : "Tidak",
      `"${(s.description || "").replace(/"/g, '""')}"`,
      `"${s.whatsapp || ""}"`,
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-toko-photo-copy-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Daftar Toko</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <Link
            to="/admin/shops/create"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" /> Tambah
          </Link>
        </div>
      </div>

      {/* Search + Filter + Sort Bar */}
      <div className="bg-card rounded-xl p-4 card-shadow mb-4 space-y-3">
        <div className="flex gap-2">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nama atau alamat toko..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
              showFilters || activeFilterCount > 0
                ? "bg-primary/10 text-primary border-primary/30"
                : "bg-background text-muted-foreground border-border hover:border-primary/30"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filter
            {activeFilterCount > 0 && (
              <span className="bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="flex items-center gap-1">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="name">Nama</option>
              <option value="rating">Rating</option>
              <option value="hours">Jam Buka</option>
            </select>
            <button
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="p-2 rounded-lg border border-border bg-background hover:bg-secondary transition-colors"
              title={sortDir === "asc" ? "Ascending" : "Descending"}
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filter Checkboxes */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 pt-1">
            {(
              [
                ["fotokopi", "Photo Copy"],
                ["printWarna", "Print Warna"],
                ["jilid", "Jilid"],
                ["laminating", "Foto Copy Warna"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={serviceFilter[key]}
                  onChange={() => toggleService(key)}
                  className="rounded"
                />
                {label}
              </label>
            ))}
          </div>
        )}

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> dari{" "}
            <span className="font-semibold text-foreground">{shops.length}</span> toko
          </span>
          {(search || activeFilterCount > 0) && (
            <button
              onClick={() => {
                setSearch("");
                setServiceFilter({ fotokopi: false, printWarna: false, jilid: false, laminating: false });
              }}
              className="text-primary hover:underline font-medium"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium">Nama</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Alamat</th>
                <th className="text-left px-4 py-3 font-medium">Rating</th>
                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Jam</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Layanan</th>
                <th className="text-right px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    Tidak ada toko ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((shop) => {
                  const services = [];
                  if (shop.services.fotokopi) services.push("FK");
                  if (shop.services.printWarna) services.push("PW");
                  if (shop.services.jilid) services.push("JL");
                  if (shop.services.laminating) services.push("FCW");

                  return (
                    <tr key={shop.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 font-medium">
                        <div className="flex items-center gap-2">
                          {shop.name}
                          {shop.whatsapp && (
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-semibold" title={shop.whatsapp}>WA</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{shop.address}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {shop.rating}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{shop.hours}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {services.map((s) => (
                            <span
                              key={s}
                              className="text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/admin/shops/edit/${shop.id}`}
                            className="p-2 rounded-lg hover:bg-secondary transition-colors"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          {confirmId === shop.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(shop.id)}
                                className="px-2 py-1 text-xs bg-destructive text-destructive-foreground rounded"
                              >
                                Hapus
                              </button>
                              <button
                                onClick={() => setConfirmId(null)}
                                className="px-2 py-1 text-xs bg-secondary rounded"
                              >
                                Batal
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmId(shop.id)}
                              className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminShopList;
