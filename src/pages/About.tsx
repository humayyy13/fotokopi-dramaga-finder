import { MapPin, Target, Users } from "lucide-react";

const About = () => (
  <div className="min-h-screen">
    <section className="bg-background pt-24 pb-16 px-4 relative">
      <div className="container mx-auto text-center max-w-3xl relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-foreground animate-fade-in">Tentang SIG Fotokopi Dramaga</h1>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Sistem Informasi Geografis berbasis web untuk membantu masyarakat menemukan jasa fotokopi di wilayah Dramaga, Bogor.
        </p>
      </div>
    </section>

    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: MapPin, title: "Lokasi Akurat", desc: "Pemetaan lokasi fotokopi dengan koordinat yang tepat menggunakan teknologi GIS.", delay: "0s" },
            { icon: Target, title: "Pencarian Mudah", desc: "Filter berdasarkan layanan, jam buka, dan lokasi terdekat dengan cepat.", delay: "0.2s" },
            { icon: Users, title: "Untuk Semua", desc: "Didesain untuk mahasiswa, dosen, dan masyarakat umum di wilayah Dramaga.", delay: "0.4s" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md border border-border/30 text-center animate-float-wave"
              style={{ animationDelay: item.delay }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary text-primary mb-6">
                <item.icon className="h-8 w-8 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border/30 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Deskripsi Sistem</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            SIG Fotokopi Dramaga adalah aplikasi web berbasis Sistem Informasi Geografis (SIG) yang dirancang untuk memetakan dan menampilkan lokasi jasa fotokopi di wilayah Dramaga, Kabupaten Bogor. Aplikasi ini memanfaatkan teknologi peta interaktif untuk memberikan informasi yang akurat dan mudah diakses.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Dengan fitur pencarian dan filter yang lengkap, pengguna dapat dengan mudah menemukan toko fotokopi terdekat berdasarkan layanan yang dibutuhkan, seperti print warna, jilid, dan laminating. Sistem ini juga menyediakan informasi jam operasional dan rating dari setiap toko.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default About;
