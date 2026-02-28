import { useShops } from "@/context/ShopContext";
import { Store, Star, MapPin } from "lucide-react";

const AdminDashboard = () => {
  const { shops } = useShops();
  const avgRating = shops.length ? (shops.reduce((a, s) => a + s.rating, 0) / shops.length).toFixed(1) : "0";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 mt-2">
        {[
          {
            title: "Total Toko",
            value: shops.length,
            icon: Store,
            bgClass: "bg-blue-600",
            textClass: "text-white",
            mutedClass: "text-blue-100",
            iconBg: "bg-white/20",
            delay: "0s",
          },
          {
            title: "Rata-rata Rating",
            value: avgRating,
            icon: Star,
            bgClass: "bg-rose-600",
            textClass: "text-white",
            mutedClass: "text-rose-100",
            iconBg: "bg-white/20",
            delay: "0.2s",
          },
          {
            title: "Wilayah",
            value: "Dramaga",
            icon: MapPin,
            bgClass: "bg-emerald-600",
            textClass: "text-white",
            mutedClass: "text-emerald-100",
            iconBg: "bg-white/20",
            delay: "0.4s",
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className={`${stat.bgClass} rounded-2xl p-6 shadow-sm border border-black/5 animate-float-wave hover:shadow-md transition-shadow`}
            style={{ animationDelay: stat.delay }}
          >
            <div className={`flex items-start gap-4 ${stat.textClass}`}>
              <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="mt-1">
                <p className="text-3xl font-bold tracking-tight mb-1">{stat.value}</p>
                <p className={`text-sm font-medium ${stat.mutedClass}`}>{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
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
