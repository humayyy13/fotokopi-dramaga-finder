import heroImage from '../assets/hero-illustration.png';

const HeroIllustration = () => {
    return (
        <div className="w-full max-w-lg mx-auto lg:mr-0 animate-fade-in relative" style={{ animationDelay: "0.2s" }}>
            {/* Soft decorative background blob - Cream variant */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#f5ebd6] rounded-full blur-[80px] -z-10" />

            {/* Thematic Decorative Elements (Lucu/Cute) floating around the illustration */}
            <div className="absolute -top-6 -left-6 bg-white p-3 rounded-2xl shadow-sm border border-border/50 animate-float-wave" style={{ animationDelay: "0s" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                </svg>
            </div>
            
            <div className="absolute top-1/2 -right-10 bg-white p-3 rounded-full shadow-sm border border-border/50 animate-float-wave" style={{ animationDelay: "1.5s" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            </div>

            <div className="absolute -bottom-8 left-10 bg-white p-3 rounded-xl shadow-sm border border-border/50 animate-float-wave" style={{ animationDelay: "0.8s" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
            </div>

            <img 
                src={heroImage} 
                alt="Ilustrasi Mesin Fotokopi GIS" 
                className="w-full h-auto mix-blend-multiply relative z-10"
            />
        </div>
    );
};

export default HeroIllustration;
