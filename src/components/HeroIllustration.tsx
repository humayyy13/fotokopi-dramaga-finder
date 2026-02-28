const HeroIllustration = () => {
    return (
        <div className="w-full max-w-lg mx-auto lg:mr-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <svg
                viewBox="0 0 500 400"
                className="w-full h-auto drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* City Skyline Background (Minimal, low opacity) */}
                <path d="M40 350 V180 h45 v-40 h55 v80 h35 v-60 h65 v140 h-200 z" fill="#1a4d33" fillOpacity="0.04" />
                <path d="M240 350 V140 h50 v40 h40 v-30 h60 v200 h-150 z" fill="#1a4d33" fillOpacity="0.06" />

                {/* Main Photocopy Shop Building */}
                <rect x="90" y="200" width="320" height="150" rx="16" fill="#ffffff" />
                <rect x="90" y="200" width="320" height="150" rx="16" stroke="#1a4d33" strokeOpacity="0.08" strokeWidth="2" />

                {/* Shop Awning / Roof Accent (Mustard Yellow) */}
                <path d="M80 200 Q 250 170 420 200 v 24 H 80 z" fill="#eec829" />
                <path d="M80 224 h 340 v 6 a 4 4 0 0 1 -4 4 H 84 a 4 4 0 0 1 -4 -4 z" fill="#d4b220" />

                {/* Shop Window */}
                <rect x="120" y="240" width="130" height="85" rx="8" fill="#f4f0eb" />
                <rect x="130" y="250" width="110" height="65" rx="4" fill="#e8e4db" />

                {/* Door */}
                <rect x="280" y="240" width="60" height="110" rx="6" fill="#1a4d33" />
                <rect x="285" y="245" width="50" height="40" rx="4" fill="#f4f0eb" fillOpacity="0.2" />
                <circle cx="330" cy="295" r="4" fill="#ffffff" />
                <rect x="280" y="345" width="60" height="5" fill="#143c27" />

                {/* Modern Photocopier Machine next to window */}
                <rect x="360" y="270" width="45" height="80" rx="6" fill="#f4f0eb" stroke="#1a4d33" strokeOpacity="0.15" strokeWidth="2" />
                <rect x="360" y="260" width="45" height="15" rx="4" fill="#1a4d33" />
                {/* Paper sorting tray */}
                <path d="M 365 250 l 30 0 l -4 10 l -22 0 z" fill="#eec829" />
                <rect x="365" y="285" width="35" height="8" rx="2" fill="#e8e4db" />
                <rect x="365" y="300" width="35" height="8" rx="2" fill="#e8e4db" />
                <rect x="365" y="315" width="35" height="8" rx="2" fill="#e8e4db" />

                {/* Dynamic Element: Papers flying */}
                <rect x="380" y="235" width="18" height="24" rx="2" fill="#ffffff" stroke="#1a4d33" strokeOpacity="0.15" transform="rotate(15 389 247)" />
                <rect x="370" y="220" width="18" height="24" rx="2" fill="#ffffff" stroke="#1a4d33" strokeOpacity="0.15" transform="rotate(-12 379 232)" />
                <rect x="390" y="205" width="18" height="24" rx="2" fill="#ffffff" stroke="#1a4d33" strokeOpacity="0.15" transform="rotate(25 399 217)" />

                {/* Minimal Plants/Decor */}
                <path d="M 70 350 c 0 -35 15 -45 25 -45 c 10 0 25 10 25 45 z" fill="#1a4d33" fillOpacity="0.85" />
                <path d="M 60 350 c 0 -25 10 -35 20 -35 c 10 0 20 10 20 35 z" fill="#1a4d33" fillOpacity="0.6" />

                <path d="M 430 350 c 0 -25 -15 -35 -25 -35 c -10 0 -25 10 -25 35 z" fill="#1a4d33" fillOpacity="0.75" />

                {/* Shop Sign Background */}
                <rect x="180" y="150" width="140" height="36" rx="18" fill="#1a4d33" />
                {/* Sign Text */}
                <text x="250" y="174" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="1">FOTOKOPI</text>

                {/* Ground Line */}
                <path d="M 30 350 h 440" stroke="#1a4d33" strokeOpacity="0.1" strokeWidth="2" strokeLinecap="round" />

                {/* Abstract Clouds / Shapes in sky */}
                <rect x="80" y="60" width="60" height="16" rx="8" fill="#1a4d33" fillOpacity="0.04" />
                <rect x="110" y="50" width="40" height="16" rx="8" fill="#1a4d33" fillOpacity="0.04" />
                <rect x="350" y="80" width="70" height="16" rx="8" fill="#eec829" fillOpacity="0.1" />
            </svg>
        </div>
    );
};

export default HeroIllustration;
