import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shop } from "@/data/shops";

interface ShopFormProps {
  initial?: Shop;
  onSubmit: (shop: Shop) => void | Promise<void>;
  title: string;
}

const ShopForm = ({ initial, onSubmit, title }: ShopFormProps) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<Shop, "id">>({
    name: initial?.name || "",
    address: initial?.address || "",
    lat: initial?.lat || -6.5518,
    lng: initial?.lng || 106.722,
    rating: initial?.rating || 4.0,
    hours: initial?.hours || "",
    openTime: initial?.openTime || "08:00",
    closeTime: initial?.closeTime || "21:00",
    services: initial?.services || { printWarna: false, jilid: false, laminating: false, fotokopi: true },
    image: initial?.image || "",
    description: initial?.description || "",
    whatsapp: initial?.whatsapp || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.address.trim()) e.address = "Alamat wajib diisi";
    if (form.rating < 0 || form.rating > 5) e.rating = "Rating 0-5";
    if (!form.openTime) e.openTime = "Wajib diisi";
    if (!form.closeTime) e.closeTime = "Wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const hours = `${form.openTime} - ${form.closeTime}`;
    await onSubmit({
      id: initial?.id || crypto.randomUUID(),
      ...form,
      hours,
    });
    navigate("/admin/shops");
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

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Rating (0-5)</label>
            <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => update("rating", parseFloat(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            {errors.rating && <p className="text-destructive text-xs mt-1">{errors.rating}</p>}
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Jam Buka</label>
            <input type="time" value={form.openTime} onChange={(e) => update("openTime", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Jam Tutup</label>
            <input type="time" value={form.closeTime} onChange={(e) => update("closeTime", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
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
                {key === "printWarna" ? "Print Warna" : key === "laminating" ? "Foto Copy Warna" : key === "fotokopi" ? "Photo Copy" : key.charAt(0).toUpperCase() + key.slice(1)}
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
          <label className="text-sm font-medium mb-1 block">Nomor WhatsApp (Cth: 6281234...)</label>
          <input type="text" value={form.whatsapp || ""} onChange={(e) => update("whatsapp", e.target.value)} placeholder="628..."
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            Simpan
          </button>
          <button type="button" onClick={() => navigate("/admin/shops")}
            className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-secondary/80 transition-colors">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopForm;
