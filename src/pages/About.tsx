import { Instagram } from "lucide-react";

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


    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: LocationIcon, title: "Lokasi Akurat", desc: "Pemetaan lokasi photo copy dengan koordinat yang tepat menggunakan teknologi GIS.", delay: "0s", bg: "bg-blue-50" },
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

          {/* Profil Pengembang */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Pengembang Sistem</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex-shrink-0">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-pink-100 shadow-lg relative group">
                <div className="absolute inset-0 bg-pink-500/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="/syifa_avatar.png" alt="Syifa Humairoh" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-extrabold text-foreground mb-2">Syifa Humairoh</h3>
              <p className="text-pink-600 font-semibold mb-4 text-lg">Web Developer</p>
              <p className="text-slate-600 leading-relaxed mb-6 text-base md:text-lg">
                Sistem Informasi Geografis (SIG) Photo copy Dramaga ini dikembangkan oleh Syifa Humairoh, mahasiswi Informatika semester 6 di STIKOM El Rahma. Platform ini dirancang secara khusus untuk memetakan lokasi layanan Photo copy di wilayah Dramaga, sehingga dapat mempermudah mahasiswa maupun masyarakat umum dalam menemukan tempat Photo copy terdekat dengan cepat dan akurat.
              </p>
              <div className="flex justify-center md:justify-start">
                <a href="https://instagram.com/syifa_hmrh13" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-pink-50 text-slate-600 hover:text-pink-600 rounded-full transition-all duration-300 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 group">
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">@syifa_hmrh13</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
