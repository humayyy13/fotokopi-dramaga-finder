import { Clock, Palette, BookOpen, FileText } from "lucide-react";

const features = [
  { icon: Clock, title: "Jam Buka", desc: "Informasi jam operasional lengkap" },
  { icon: Palette, title: "Print Warna", desc: "Cetak berwarna berkualitas tinggi" },
  { icon: BookOpen, title: "Jilid", desc: "Layanan penjilidan profesional" },
  { icon: FileText, title: "Laminating", desc: "Laminasi dokumen penting Anda" },
];

const FeatureCards = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3 text-foreground tracking-tight">Layanan Tersedia</h2>
        <p className="text-muted-foreground">Berbagai fitur yang ditawarkan oleh mitra fotokopi kami</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 text-center group border border-border/30"
          >
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <f.icon className="h-8 w-8 stroke-[1.5]" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureCards;
