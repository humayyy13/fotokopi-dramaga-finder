import { useShops } from "@/context/ShopContext";
import { Store, Star, MapPin, Clock, TrendingUp } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

const AdminDashboard = () => {
  const { shops } = useShops();
  const avgRating = shops.length
    ? (shops.reduce((a, s) => a + s.rating, 0) / shops.length).toFixed(1)
    : "0";

  // ── Toko buka sekarang ──
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const openNowCount = shops.filter((s) => {
    const [oh, om] = s.openTime.split(":").map(Number);
    const [ch, cm] = s.closeTime.split(":").map(Number);
    return nowMins >= oh * 60 + om && nowMins <= ch * 60 + cm;
  }).length;

  // ── Toko rating tertinggi ──
  const topShop = shops.length
    ? shops.reduce((best, s) => (s.rating > best.rating ? s : best), shops[0])
    : null;

  // ── Pie Chart data: distribusi layanan ──
  const serviceData = [
    { name: "Photo Copy", value: shops.filter((s) => s.services.fotokopi).length },
    { name: "Print Warna", value: shops.filter((s) => s.services.printWarna).length },
    { name: "Jilid", value: shops.filter((s) => s.services.jilid).length },
    { name: "Foto Copy Warna", value: shops.filter((s) => s.services.laminating).length },
  ];

  // ── Bar Chart data: distribusi rating ──
  const ratingBuckets = [
    { range: "0-1", count: 0 },
    { range: "1-2", count: 0 },
    { range: "2-3", count: 0 },
    { range: "3-4", count: 0 },
    { range: "4-5", count: 0 },
  ];
  shops.forEach((s) => {
    const idx = Math.min(Math.floor(s.rating), 4);
    ratingBuckets[idx].count += 1;
  });

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-[#f5ebd6] rounded-xl flex items-center justify-center shadow-sm border border-border/50 animate-bounce-soft">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="animate-wiggle" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <circle cx="9" cy="13" r="1.5" fill="#333333" stroke="none"/>
            <circle cx="15" cy="13" r="1.5" fill="#333333" stroke="none"/>
            <path d="M10.5 16c1 1.5 2 1.5 3 0" strokeWidth="1.5"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8 mt-2">
        {[
          {
            title: "Total Toko",
            value: shops.length,
            icon: Store,
            bgClass: "bg-blue-600",
            mutedClass: "text-blue-100",
            iconBg: "bg-white/20",
            delay: "0s",
          },
          {
            title: "Rata-rata Rating",
            value: avgRating,
            icon: Star,
            bgClass: "bg-rose-600",
            mutedClass: "text-rose-100",
            iconBg: "bg-white/20",
            delay: "0.15s",
          },
          {
            title: "Buka Sekarang",
            value: openNowCount,
            icon: Clock,
            bgClass: "bg-amber-500",
            mutedClass: "text-amber-100",
            iconBg: "bg-white/20",
            delay: "0.3s",
          },
          {
            title: "Rating Tertinggi",
            value: topShop ? topShop.rating : "-",
            icon: TrendingUp,
            bgClass: "bg-emerald-600",
            mutedClass: "text-emerald-100",
            iconBg: "bg-white/20",
            delay: "0.45s",
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className={`${stat.bgClass} rounded-2xl p-5 shadow-sm border border-black/5 animate-float-wave hover:shadow-md transition-shadow`}
            style={{ animationDelay: stat.delay }}
          >
            <div className="flex items-start gap-3 text-white">
              <div className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="mt-0.5">
                <p className="text-2xl font-bold tracking-tight mb-0.5">{stat.value}</p>
                <p className={`text-xs font-medium ${stat.mutedClass}`}>{stat.title}</p>
              </div>
            </div>
            {stat.title === "Rating Tertinggi" && topShop && (
              <p className="text-[11px] text-white/70 mt-2 truncate">🏆 {topShop.name}</p>
            )}
          </div>
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart — Distribusi Layanan */}
        <div className="bg-card rounded-xl p-5 card-shadow">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Distribusi Layanan
          </h2>
          {shops.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  style={{ fontSize: 11, fontWeight: 600 }}
                >
                  {serviceData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 12, fontSize: 12, border: "1px solid #e5e7eb" }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, fontWeight: 500 }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-12">Belum ada data</p>
          )}
        </div>

        {/* Bar Chart — Distribusi Rating */}
        <div className="bg-card rounded-xl p-5 card-shadow">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            Distribusi Rating
          </h2>
          {shops.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ratingBuckets} barCategoryGap="20%">
                <XAxis
                  dataKey="range"
                  tick={{ fontSize: 12, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 12, fontSize: 12, border: "1px solid #e5e7eb" }}
                  cursor={{ fill: "rgba(59,130,246,0.08)" }}
                />
                <Bar dataKey="count" name="Jumlah Toko" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-12">Belum ada data</p>
          )}
        </div>
      </div>

      {/* ── Toko Terbaru ── */}
      <div className="bg-card rounded-xl p-5 card-shadow">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
          Toko Terbaru
        </h2>
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
