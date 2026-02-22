import { MapPin, Target, Users } from "lucide-react";

const About = () => (
  <div className="min-h-screen">
    <section className="hero-gradient text-primary-foreground py-16 px-4">
      <div className="container mx-auto text-center max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Tentang SIG Fotokopi Dramaga</h1>
        <p className="text-primary-foreground/80">
          Sistem Informasi Geografis berbasis web untuk membantu masyarakat menemukan jasa fotokopi di wilayah Dramaga, Bogor.
        </p>
      </div>
    </section>

    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: MapPin, title: "Lokasi Akurat", desc: "Pemetaan lokasi fotokopi dengan koordinat yang tepat menggunakan teknologi GIS." },
            { icon: Target, title: "Pencarian Mudah", desc: "Filter berdasarkan layanan, jam buka, dan lokasi terdekat dengan cepat." },
            { icon: Users, title: "Untuk Semua", desc: "Didesain untuk mahasiswa, dosen, dan masyarakat umum di wilayah Dramaga." },
          ].map((item) => (
            <div key={item.title} className="bg-card rounded-xl p-6 card-shadow text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-8 card-shadow">
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
