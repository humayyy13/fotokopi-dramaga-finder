import { Clock, Printer, BookOpen, Shield } from "lucide-react";

const features = [
  { icon: Clock, title: "Jam Buka", desc: "Informasi jam operasional lengkap" },
  { icon: Printer, title: "Print Warna", desc: "Cetak berwarna berkualitas tinggi" },
  { icon: BookOpen, title: "Jilid", desc: "Layanan penjilidan profesional" },
  { icon: Shield, title: "Laminating", desc: "Laminasi dokumen penting Anda" },
];

const FeatureCards = () => (
  <section className="py-16 px-4">
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Layanan Tersedia</h2>
      <p className="text-muted-foreground text-center mb-10">Temukan toko dengan layanan yang Anda butuhkan</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-shadow duration-300 text-center group"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <f.icon className="h-7 w-7" />
            </div>
            <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureCards;
