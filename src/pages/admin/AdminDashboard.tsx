import { useShops } from "@/context/ShopContext";
import { Store, Star, MapPin } from "lucide-react";

const AdminDashboard = () => {
  const { shops } = useShops();
  const avgRating = shops.length ? (shops.reduce((a, s) => a + s.rating, 0) / shops.length).toFixed(1) : "0";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl p-5 card-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{shops.length}</p>
              <p className="text-sm text-muted-foreground">Total Toko</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-5 card-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgRating}</p>
              <p className="text-sm text-muted-foreground">Rata-rata Rating</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-5 card-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">Dramaga</p>
              <p className="text-sm text-muted-foreground">Wilayah</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-5 card-shadow">
        <h2 className="font-semibold mb-3">Toko Terbaru</h2>
        <div className="space-y-2">
          {shops.slice(-5).reverse().map((s) => (
            <div key={s.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="font-medium text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.address}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-sm">{s.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
