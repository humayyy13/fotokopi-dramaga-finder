import heroImage from '../assets/hero-illustration.png';

const HeroIllustration = () => {
    return (
        <div className="w-full max-w-lg mx-auto lg:mr-0 animate-fade-in relative" style={{ animationDelay: "0.2s" }}>
            {/* Soft decorative background blob - Cream variant */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#f5ebd6] rounded-full blur-[80px] -z-10" />

            {/* Kerty (Kertas Terbang) */}
            <div className="absolute -top-6 -left-6 bg-[#f5ebd6] p-3 rounded-2xl shadow-sm border border-border/50 animate-float-wave group hover:scale-110 transition-transform" style={{ animationDelay: "0s" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="group-hover:animate-wiggle" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    {/* Cute Face */}
                    <circle cx="9" cy="13" r="1.5" fill="#333333" stroke="none"/>
                    <circle cx="15" cy="13" r="1.5" fill="#333333" stroke="none"/>
                    <path d="M10.5 16c1 1.5 2 1.5 3 0" strokeWidth="1.5"/>
                </svg>
            </div>
            
            {/* Tinti (Botol Tinta Ceria) */}
            <div className="absolute top-1/2 -right-10 bg-[#f5ebd6] p-3 rounded-full shadow-sm border border-border/50 animate-float-wave group hover:scale-110 transition-transform" style={{ animationDelay: "1.5s" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="group-hover:animate-bounce-soft" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {/* Bottle Shape */}
                    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <path d="M6 10h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10z"></path>
                    {/* Ink drops */}
                    <path d="M12 2v2" strokeWidth="2"/>
                    {/* Cute Face */}
                    <circle cx="9.5" cy="15" r="1.2" fill="#333333" stroke="none"/>
                    <circle cx="14.5" cy="15" r="1.2" fill="#333333" stroke="none"/>
                    <path d="M11 18c.5 1 1.5 1 2 0" strokeWidth="1.5"/>
                </svg>
            </div>

            {/* Kopi (Mesin Photo Copy Bongsor) */}
            <div className="absolute -bottom-8 left-10 bg-[#f5ebd6] p-3 rounded-xl shadow-sm border border-border/50 animate-float-wave group hover:scale-110 transition-transform" style={{ animationDelay: "0.8s" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="group-hover:animate-wiggle" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {/* Copier Shape */}
                    <rect x="5" y="10" width="14" height="12" rx="2" fill="white" />
                    <path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                    <path d="M5 14h14" />
                    {/* Cute Face */}
                    <circle cx="9" cy="17" r="1.5" fill="#333333" stroke="none"/>
                    <circle cx="15" cy="17" r="1.5" fill="#333333" stroke="none"/>
                    <path d="M10.5 20c1 1.5 2 1.5 3 0" strokeWidth="1.5"/>
                </svg>
            </div>

            <img 
                src={heroImage} 
                alt="Ilustrasi Mesin Photo Copy GIS" 
                className="w-full h-auto mix-blend-multiply relative z-10"
            />
        </div>
    );
};

export default HeroIllustration;
