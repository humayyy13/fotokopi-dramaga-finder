import React from "react";

const CityscapeBackground = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 z-0 pointer-events-none overflow-hidden h-full flex items-end opacity-80 mix-blend-multiply dark:mix-blend-normal dark:opacity-30">
      <svg 
        viewBox="0 0 1440 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto min-h-[300px] md:min-h-[400px] object-cover object-bottom"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* Distant Clouds */}
        <path d="M100 120 Q120 100 150 120 Q170 100 190 120 Q210 130 190 150 L100 150 Q80 140 100 120 Z" fill="#Eceadb" opacity="0.6"/>
        <path d="M1200 80 Q1230 50 1270 80 Q1300 60 1330 80 Q1360 100 1330 120 L1200 120 Q1170 100 1200 80 Z" fill="#Eceadb" opacity="0.6"/>
        
        {/* Distant Mountains / Hills */}
        <path d="M0 400 L0 300 Q 200 250 500 300 T 1000 280 T 1440 320 L1440 400 Z" fill="#Eae8d9" opacity="0.8"/>
        
        {/* Left Side: Factories (Moved to be more central) */}
        <g opacity="0.9">
          <rect x="350" y="240" width="40" height="160" fill="#Dcd8ca" fillOpacity="0" />
          <path d="M350 400 L350 240 L390 240 L390 400 Z" fill="#Dcd8ca" />
          <path d="M390 400 L390 280 L440 280 L440 400 Z" fill="#Dcd8ca" />
          <path d="M440 400 L440 260 L470 260 L470 400 Z" fill="#Dcd8ca" />
          {/* Factory Roofs */}
          <polygon points="350,240 390,200 390,240" fill="#Dcd8ca" />
          <polygon points="440,260 470,220 470,260" fill="#Dcd8ca" />
          
          {/* Smoke Stacks */}
          <rect x="410" y="180" width="10" height="100" fill="#Dcd8ca" />
          <rect x="430" y="150" width="12" height="130" fill="#Dcd8ca" />
          {/* Smoke */}
          <circle cx="415" cy="160" r="15" fill="#Eceadb" />
          <circle cx="436" cy="120" r="20" fill="#Eceadb" />
          <circle cx="420" cy="135" r="25" fill="#Eceadb" />
        </g>
        
        {/* Right Side: Modern Buildings (Moved to be more central) */}
        <g opacity="0.9">
          <rect x="850" y="200" width="60" height="200" fill="#Dcd8ca" />
          <rect x="930" y="150" width="80" height="250" fill="#Dcd8ca" />
          <rect x="1030" y="220" width="70" height="180" fill="#Dcd8ca" />
          <rect x="910" y="300" width="130" height="100" fill="#D1cfc0" />
          
          {/* Windows - Building 2 */}
          <rect x="950" y="170" width="10" height="15" fill="#F4f2e9" />
          <rect x="970" y="170" width="10" height="15" fill="#F4f2e9" />
          <rect x="990" y="170" width="10" height="15" fill="#F4f2e9" />
          <rect x="950" y="200" width="10" height="15" fill="#F4f2e9" />
          <rect x="970" y="200" width="10" height="15" fill="#F4f2e9" />
          <rect x="990" y="200" width="10" height="15" fill="#F4f2e9" />
          <rect x="950" y="230" width="10" height="15" fill="#F4f2e9" />
          <rect x="970" y="230" width="10" height="15" fill="#F4f2e9" />
          <rect x="990" y="230" width="10" height="15" fill="#F4f2e9" />
          
          {/* Windows - Building 1 */}
          <rect x="865" y="220" width="10" height="15" fill="#F4f2e9" />
          <rect x="885" y="220" width="10" height="15" fill="#F4f2e9" />
          <rect x="865" y="250" width="10" height="15" fill="#F4f2e9" />
          <rect x="885" y="250" width="10" height="15" fill="#F4f2e9" />
        </g>
        
        {/* Foreground Hills */}
        <path d="M-50 400 L-50 350 Q 150 320 350 360 T 800 370 T 1500 330 L1500 400 Z" fill="#E8e6d7" />
        <path d="M-50 400 L-50 370 Q 250 330 450 380 T 900 380 T 1500 350 L1500 400 Z" fill="#E3dfd3" />
        
        {/* Foreground Trees / Bushes */}
        <path d="M10 400 Q 10 350 60 350 Q 110 350 110 400 Z" fill="#4A7C59" /> {/* Darker green */}
        <path d="M40 400 Q 40 330 100 330 Q 160 330 160 400 Z" fill="#3E5A44" /> {/* Very dark green */}
        <path d="M120 400 Q 120 360 160 360 Q 200 360 200 400 Z" fill="#8DA68E" /> {/* Grey green */}
        
        <path d="M1100 400 Q 1100 340 1160 340 Q 1220 340 1220 400 Z" fill="#759374" />
        <path d="M1150 400 Q 1150 310 1240 310 Q 1330 310 1330 400 Z" fill="#8DA68E" />
        <path d="M1250 400 Q 1250 330 1320 330 Q 1390 330 1390 400 Z" fill="#3E5A44" />
        <path d="M1340 400 Q 1340 350 1400 350 Q 1460 350 1460 400 Z" fill="#4A7C59" />
      </svg>
    </div>
  );
};

export default CityscapeBackground;
