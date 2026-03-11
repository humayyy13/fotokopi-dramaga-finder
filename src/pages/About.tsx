const LocationIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="42" rx="10" ry="3" fill="#1E3A8A" fillOpacity="0.1" />
    <path d="M24 40C24 40 38 28 38 16C38 8.268 31.732 2 24 2C16.268 2 10 8.268 10 16C10 28 24 40 24 40Z" fill="#DBEAFE" />
    <circle cx="24" cy="16" r="8" fill="#3B82F6" />
    <circle cx="24" cy="16" r="3" fill="#EFF6FF" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="14" fill="#E9D5FF" />
    <circle cx="20" cy="20" r="10" fill="#A855F7" />
    <rect x="29" y="32" width="6" height="16" rx="3" transform="rotate(-45 29 32)" fill="#D8B4FE" />
    <circle cx="20" cy="20" r="4" fill="#F3E8FF" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="20" r="6" fill="#A7F3D0" />
    <path d="M6 38C6 33 10 29 16 29H18" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" />

    <circle cx="34" cy="20" r="6" fill="#A7F3D0" />
    <path d="M42 38C42 33 38 29 32 29H30" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" />

    <circle cx="24" cy="16" r="8" fill="#10B981" />
    <path d="M12 40C12 33 16 26 24 26C32 26 36 33 36 40H12Z" fill="#34D399" />
  </svg>
);

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
            { icon: LocationIcon, title: "Lokasi Akurat", desc: "Pemetaan lokasi fotokopi dengan koordinat yang tepat menggunakan teknologi GIS.", delay: "0s", bg: "bg-blue-50" },
            { icon: SearchIcon, title: "Pencarian Mudah", desc: "Filter berdasarkan layanan, jam buka, dan lokasi terdekat dengan cepat.", delay: "0.2s", bg: "bg-purple-50" },
            { icon: UsersIcon, title: "Untuk Semua", desc: "Didesain untuk mahasiswa, dosen, dan masyarakat umum di wilayah Dramaga.", delay: "0.4s", bg: "bg-teal-50" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 text-center group border border-slate-100 animate-float-wave"
              style={{ animationDelay: item.delay }}
            >
              <div className={`mx-auto flex items-center justify-center w-20 h-20 rounded-3xl ${item.bg} mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <item.icon className="h-10 w-10 drop-shadow-sm transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border/30 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-5 text-foreground">Deskripsi Sistem</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-5">
            SIG Fotokopi Dramaga adalah aplikasi web berbasis Sistem Informasi Geografis (SIG) yang dirancang untuk memetakan dan menampilkan lokasi jasa fotokopi di wilayah Dramaga, Kabupaten Bogor. Aplikasi ini memanfaatkan teknologi peta interaktif untuk memberikan informasi yang akurat dan mudah diakses.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            Dengan fitur pencarian dan filter yang lengkap, pengguna dapat dengan mudah menemukan toko fotokopi terdekat berdasarkan layanan yang dibutuhkan, seperti print warna, jilid, dan foto copy warna. Sistem ini juga menyediakan informasi jam operasional dan rating dari setiap toko.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default About;
