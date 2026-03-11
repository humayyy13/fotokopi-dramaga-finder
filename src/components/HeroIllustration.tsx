const HeroIllustration = () => {
    return (
        <div className="w-full max-w-lg mx-auto lg:mr-0 animate-fade-in relative" style={{ animationDelay: "0.2s" }}>
            {/* Soft decorative background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#f4f7f4] rounded-full blur-[80px] -z-10" />

            <svg
                viewBox="0 0 500 450"
                className="w-full h-auto drop-shadow-2xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Modern Abstract Shapes Background */}
                <circle cx="250" cy="225" r="180" fill="#fcfaf8" />
                <circle cx="250" cy="225" r="180" stroke="#166534" strokeOpacity="0.05" strokeWidth="2" />

                <path d="M70 225 c0-99 81-180 180-180 c99 0 180 81 180 180 c0 99 -81 180 -180 180" fill="#e8f3ee" opacity="0.6" />

                {/* Left Plant */}
                <path d="M 120 370 C 100 370, 80 340, 100 300 C 130 300, 130 340, 120 370 Z" fill="#14532d" opacity="0.8" />
                <path d="M 140 370 C 150 370, 160 330, 140 280 C 110 280, 100 330, 140 370 Z" fill="#166534" opacity="0.9" />

                {/* Right Plant */}
                <path d="M 380 370 C 400 370, 420 350, 400 320 C 370 320, 360 350, 380 370 Z" fill="#166534" opacity="0.7" />

                {/* Shop / Printer Base - Cream / White minimalist block */}
                <rect x="140" y="190" width="220" height="180" rx="24" fill="#ffffff" />
                <rect x="140" y="190" width="220" height="180" rx="24" stroke="#166534" strokeOpacity="0.06" strokeWidth="4" />

                {/* Dark Green Top Accent */}
                <path d="M 140 214 Q 140 190 164 190 H 336 Q 360 190 360 214 V 220 H 140 Z" fill="#166534" />

                {/* Yellow Accent Line */}
                <rect x="140" y="220" width="220" height="6" fill="#fde68a" />

                {/* UI Element on Printer/Shop - Paper Output */}
                <rect x="180" y="250" width="140" height="85" rx="12" fill="#f5f7f5" />

                {/* Glowing Scanner light or shop window */}
                <rect x="190" y="260" width="120" height="40" rx="8" fill="#e8f3ee" />
                <path d="M 190 280 L 310 280" stroke="#86efac" strokeWidth="4" strokeOpacity="0.5" />

                {/* Output tray */}
                <rect x="200" y="315" width="100" height="8" rx="4" fill="#d1e0d7" />

                {/* Minimalist Floating Papers */}
                {/* Paper 1 */}
                <g transform="translate(240, 80) rotate(-10)">
                    <rect x="0" y="0" width="50" height="70" rx="4" fill="#ffffff" stroke="#166534" strokeWidth="2" strokeOpacity="0.1" />
                    <rect x="10" y="15" width="30" height="4" rx="2" fill="#166534" fillOpacity="0.2" />
                    <rect x="10" y="25" width="20" height="4" rx="2" fill="#166534" fillOpacity="0.2" />
                    <rect x="10" y="45" width="15" height="10" rx="2" fill="#4ade80" fillOpacity="0.4" />
                </g>

                {/* Paper 2 */}
                <g transform="translate(160, 110) rotate(-35)">
                    <rect x="0" y="0" width="45" height="60" rx="4" fill="#ffffff" stroke="#166534" strokeWidth="2" strokeOpacity="0.1" />
                    <rect x="8" y="15" width="22" height="4" rx="2" fill="#166534" fillOpacity="0.2" />
                    <rect x="8" y="25" width="28" height="4" rx="2" fill="#166534" fillOpacity="0.2" />
                </g>

                {/* Paper 3 */}
                <g transform="translate(320, 130) rotate(20)">
                    <rect x="0" y="0" width="40" height="55" rx="4" fill="#ffffff" stroke="#166534" strokeWidth="2" strokeOpacity="0.1" />
                    <rect x="8" y="12" width="24" height="4" rx="2" fill="#fde68a" />
                    <rect x="8" y="22" width="18" height="4" rx="2" fill="#166534" fillOpacity="0.2" />
                </g>

                {/* Abstract geometric shapes matching the theme */}
                <circle cx="120" cy="150" r="12" fill="#fde68a" opacity="0.8" />
                <rect x="370" y="100" width="16" height="16" rx="4" fill="#4ade80" opacity="0.6" transform="rotate(25 370 100)" />
                <path d="M 120 220 L 130 200 L 110 200 Z" fill="#86efac" opacity="0.5" />

                {/* Base Shadow */}
                <ellipse cx="250" cy="380" rx="140" ry="10" fill="#166534" opacity="0.08" />
            </svg>
        </div>
    );
};

export default HeroIllustration;
