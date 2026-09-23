import React from 'react';

export default function GovtEmblem({ className = "w-8 h-8" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Official State Emblem of India Lion Capital & Ashoka Chakra Crest SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield Border */}
        <path 
          d="M50 5 L85 20 C85 55 50 92 50 92 C50 92 15 55 15 20 Z" 
          fill="url(#govtGrad)" 
          stroke="#F59E0B" 
          strokeWidth="2.5"
        />
        
        {/* Inner Golden Border */}
        <path 
          d="M50 10 L80 23 C80 52 50 85 50 85 C50 85 20 52 20 23 Z" 
          stroke="#FDE68A" 
          strokeWidth="1" 
          strokeOpacity="0.6"
        />

        {/* Ashoka Pillar Lion Head Silhouette in Center */}
        <path 
          d="M50 18 C55 18 58 22 58 26 C58 29 55 31 56 34 C57 37 60 38 60 41 C60 45 56 47 56 50 C56 53 58 55 56 58 L54 62 L46 62 L44 58 C42 55 44 53 44 50 C44 47 40 45 40 41 C40 38 43 37 44 34 C45 31 42 29 42 26 C42 22 45 18 50 18 Z" 
          fill="#FDE047"
        />

        {/* Ashoka Chakra 24-spoke Ring at Base */}
        <circle cx="50" cy="70" r="7" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="50" cy="70" r="1.5" fill="#38BDF8" />
        {/* Chakra Spokes */}
        <line x1="50" y1="63" x2="50" y2="77" stroke="#38BDF8" strokeWidth="0.8" />
        <line x1="43" y1="70" x2="57" y2="70" stroke="#38BDF8" strokeWidth="0.8" />
        <line x1="45" y1="65" x2="55" y2="75" stroke="#38BDF8" strokeWidth="0.8" />
        <line x1="45" y1="75" x2="55" y2="65" stroke="#38BDF8" strokeWidth="0.8" />

        {/* Gradients */}
        <defs>
          <linearGradient id="govtGrad" x1="50" y1="5" x2="50" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E3A8A" />
            <stop offset="0.5" stopColor="#0F172A" />
            <stop offset="1" stopColor="#020617" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
