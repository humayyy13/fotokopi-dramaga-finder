const ClockIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" fill="#DBEAFE" />
    <circle cx="24" cy="24" r="14" fill="#3B82F6" />
    <path d="M24 16V24L30 30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PrinterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M14 16V8C14 6.8954 14.8954 6 16 6H32C33.1046 6 34 6.8954 34 8V16" fill="#DBEAFE" />
    <path d="M6 20C6 17.7909 7.7909 16 10 16H38C40.2091 16 42 17.7909 42 20V32C42 34.2091 40.2091 36 38 36H10C7.7909 36 6 34.2091 6 32V20Z" fill="#10B981" />
    <path d="M12 36V42C12 43.1046 12.8954 44 14 44H34C35.1046 44 36 43.1046 36 42V36" fill="#E2E8F0" />
    <rect x="16" y="30" width="16" height="18" fill="#FFFFFF" rx="1" />
    <rect x="20" y="34" width="8" height="2" rx="1" fill="#3B82F6" />
    <rect x="20" y="38" width="6" height="2" rx="1" fill="#F59E0B" />
    <rect x="20" y="42" width="10" height="2" rx="1" fill="#10B981" />
    <rect x="10" y="20" width="4" height="4" rx="2" fill="#A7F3D0" />
    <path d="M6 26H42" stroke="#059669" strokeWidth="2" strokeOpacity="0.3" />
  </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 10C12 7.7909 13.7909 6 16 6H34C36.2091 6 38 7.7909 38 10V38C38 40.2091 36.2091 42 34 42H16C13.7909 42 12 40.2091 12 38V10Z" fill="#FDBA74" />
    <path d="M12 10C12 7.7909 13.7909 6 16 6V42C13.7909 42 12 40.2091 12 38V10Z" fill="#F97316" />
    <rect x="6" y="12" width="10" height="4" rx="2" fill="#475569" />
    <rect x="6" y="20" width="10" height="4" rx="2" fill="#475569" />
    <rect x="6" y="28" width="10" height="4" rx="2" fill="#475569" />
    <rect x="6" y="36" width="10" height="4" rx="2" fill="#475569" />
    <rect x="20" y="16" width="12" height="3" rx="1.5" fill="#FFFFFF" />
    <rect x="20" y="24" width="8" height="3" rx="1.5" fill="#FFFFFF" />
  </svg>
);

const DocumentIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6C16.8954 6 16 6.8954 16 8V34C16 35.1046 16.8954 36 18 36H36C37.1046 36 38 35.1046 38 34V16L28 6H18Z" fill="#A7F3D0" />
    <path d="M28 6V16H38" fill="#6EE7B7" />
    <path d="M10 14C10 12.8954 10.8954 12 12 12H28L36 20V40C36 41.1046 35.1046 42 34 42H12C10.8954 42 10 41.1046 10 40V14Z" fill="#FDE047" />
    <path d="M28 12V20H36" fill="#FACC15" />
    <rect x="15" y="24" width="10" height="3" rx="1.5" fill="#EAB308" />
    <rect x="15" y="30" width="15" height="3" rx="1.5" fill="#EAB308" />
    <rect x="15" y="36" width="8" height="3" rx="1.5" fill="#EAB308" />
  </svg>
);

const features = [
  {
    icon: ClockIcon,
    title: "Jam Buka",
    desc: "Informasi jam operasional lengkap",
    bg: "bg-blue-50"
  },
  {
    icon: PrinterIcon,
    title: "Print Warna",
    desc: "Cetak berwarna berkualitas tinggi",
    bg: "bg-green-50"
  },
  {
    icon: BookIcon,
    title: "Jilid",
    desc: "Layanan penjilidan profesional",
    bg: "bg-orange-50"
  },
  {
    icon: DocumentIcon,
    title: "Foto Copy Warna",
    desc: "Layanan fotokopi warna berkualitas tinggi",
    bg: "bg-yellow-50"
  },
];

const FeatureCards = () => (
  <section className="py-24 px-4 bg-white/50">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground tracking-tight">Layanan Tersedia</h2>
        <p className="text-muted-foreground text-lg">Berbagai fitur yang ditawarkan oleh mitra fotokopi kami</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 text-center group border border-slate-100"
          >
            <div className={`mx-auto flex items-center justify-center w-20 h-20 rounded-3xl ${f.bg} mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <f.icon className="h-10 w-10 drop-shadow-sm transition-transform duration-300" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-foreground">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureCards;
