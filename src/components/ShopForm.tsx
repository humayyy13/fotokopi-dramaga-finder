import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shop } from "@/data/shops";
import { parseWeeklyHours, DAYS_ORDER, WeeklyHours, DayHours } from "@/lib/hours-utils";

interface ShopFormProps {
  initial?: Shop;
  onSubmit: (shop: Shop) => void | Promise<void>;
  title: string;
}

const ShopForm = ({ initial, onSubmit, title }: ShopFormProps) => {
  const router = useRouter();
  const [form, setForm] = useState<Omit<Shop, "id">>({
    name: initial?.name || "",
    address: initial?.address || "",
    lat: initial?.lat || -6.5518,
    lng: initial?.lng || 106.722,
    rating: initial?.rating || 4.0,
    hours: initial?.hours || "",
    openTime: initial?.openTime || "09:00",
    closeTime: initial?.closeTime || "19:00",
    services: initial?.services || { printWarna: false, jilid: false, laminating: false, fotokopi: true },
    image: initial?.image || "",
    whatsapp: initial?.whatsapp || "",
  });

  const [weeklyHours, setWeeklyHours] = useState<WeeklyHours>(() =>
    parseWeeklyHours(initial?.hours || "", initial?.openTime || "09:00", initial?.closeTime || "19:00")
  );

  const [waInput, setWaInput] = useState<string>(() => {
    const waVal = initial?.whatsapp || "";
    let clean = waVal.replace(/\D/g, "");
    if (clean.startsWith("62")) {
      return clean.slice(2);
    }
    if (clean.startsWith("0")) {
      return clean.slice(1);
    }
    return clean;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleWaChange = (val: string) => {
    let clean = val.replace(/\D/g, "");
    if (clean.startsWith("62")) {
      clean = clean.slice(2);
    } else if (clean.startsWith("0")) {
      clean = clean.slice(1);
    }
    setWaInput(clean);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.address.trim()) e.address = "Alamat wajib diisi";
    if (form.rating < 0 || form.rating > 5) e.rating = "Rating 0-5";

    const hasOpenDay = Object.values(weeklyHours).some((day) => !day.closed);
    if (!hasOpenDay) {
      e.hours = "Minimal harus ada satu hari yang buka";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const hours = JSON.stringify(weeklyHours);
    const firstOpenDay = DAYS_ORDER.find((day) => !weeklyHours[day].closed) || "Senin";
    const openTime = weeklyHours[firstOpenDay].open;
    const closeTime = weeklyHours[firstOpenDay].close;
    
    const whatsapp = waInput.trim() ? "62" + waInput.trim() : "";

    await onSubmit({
      id: initial?.id || crypto.randomUUID(),
      ...form,
      hours,
      openTime,
      closeTime,
      whatsapp,
    });
    router.push("/admin/shops");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((f) => ({ ...f, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const update = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleDayChange = (day: string, field: keyof DayHours, value: any) => {
    setWeeklyHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const applyToAllDays = (sourceDay: string) => {
    const source = weeklyHours[sourceDay];
    setWeeklyHours((prev) => {
      const next = { ...prev };
      DAYS_ORDER.forEach((day) => {
        next[day] = {
          ...source,
        };
      });
      return next;
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 card-shadow max-w-2xl space-y-5">
        <div>
          <label className="text-sm font-medium mb-1 block">Nama Toko *</label>
          <input value={form.name} onChange={(e) => update("name", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Alamat *</label>
          <input value={form.address} onChange={(e) => update("address", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Latitude</label>
            <input type="number" step="any" value={form.lat} onChange={(e) => update("lat", parseFloat(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Longitude</label>
            <input type="number" step="any" value={form.lng} onChange={(e) => update("lng", parseFloat(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Rating (0-5)</label>
          <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => update("rating", parseFloat(e.target.value))}
            className="w-full sm:w-1/3 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.rating && <p className="text-destructive text-xs mt-1">{errors.rating}</p>}
        </div>

        {/* Weekly Hours Editor Section */}
        <div className="border border-border rounded-xl p-4 bg-muted/20 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground block">Jam Operasional Per Hari</label>
            {errors.hours && <p className="text-destructive text-xs">{errors.hours}</p>}
          </div>

          <div className="space-y-2.5">
            {DAYS_ORDER.map((day) => {
              const item = weeklyHours[day];
              return (
                <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-card rounded-lg border border-border/60 hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-16 font-semibold text-sm">{day}</span>
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs bg-secondary/50 px-2.5 py-1 rounded-md border border-border/80 hover:bg-secondary transition-colors shrink-0">
                      <input
                        type="checkbox"
                        checked={item.closed}
                        onChange={(e) => handleDayChange(day, "closed", e.target.checked)}
                        className="rounded"
                      />
                      <span>Tutup</span>
                    </label>
                  </div>

                  {!item.closed ? (
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      <input
                        type="time"
                        value={item.open}
                        onChange={(e) => handleDayChange(day, "open", e.target.value)}
                        className="px-2 py-1 rounded border border-border bg-background text-xs focus:ring-1 focus:ring-primary w-24"
                      />
                      <span className="text-xs text-muted-foreground">s/d</span>
                      <input
                        type="time"
                        value={item.close}
                        onChange={(e) => handleDayChange(day, "close", e.target.value)}
                        className="px-2 py-1 rounded border border-border bg-background text-xs focus:ring-1 focus:ring-primary w-24"
                      />
                      <button
                        type="button"
                        onClick={() => applyToAllDays(day)}
                        className="text-[10px] font-semibold text-primary hover:text-primary-hover bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded transition-colors whitespace-nowrap ml-1"
                        title="Terapkan jam ini ke semua hari"
                      >
                        Terapkan ke Semua Hari
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-destructive font-medium bg-destructive/10 px-2.5 py-1 rounded-md">
                      Tutup
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Layanan</label>
          <div className="flex flex-wrap gap-4">
            {(["fotokopi", "printWarna", "jilid", "laminating"] as const).map((key) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.services[key]}
                  onChange={(e) => setForm((f) => ({ ...f, services: { ...f.services, [key]: e.target.checked } }))}
                  className="rounded" />
                {key === "printWarna" ? "Photo Copy Warna" : key === "laminating" ? "Print Ukuran Besar (A3/A3+)" : key === "fotokopi" ? "Photo Copy" : key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Gambar</label>
          <input type="file" accept="image/*" onChange={handleImageUpload}
            className="w-full text-sm" />
          {form.image && <img src={form.image} alt="Preview" className="mt-2 h-32 rounded-lg object-cover" />}
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Nomor WhatsApp *</label>
          <div className="flex rounded-lg overflow-hidden border border-border bg-background focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all max-w-md">
            <span className="flex items-center justify-center bg-secondary/80 px-3 text-sm text-muted-foreground font-semibold border-r border-border select-none">
              +62
            </span>
            <input
              type="text"
              value={waInput}
              onChange={(e) => handleWaChange(e.target.value)}
              placeholder="812345678..."
              className="w-full px-3 py-2 bg-transparent text-sm focus:outline-none"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Cukup masukkan kelanjutan nomornya saja (mulai dari angka 8)</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            Simpan
          </button>
          <button type="button" onClick={() => router.push("/admin/shops")}
            className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-secondary/80 transition-colors">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopForm;
