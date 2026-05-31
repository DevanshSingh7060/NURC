import React from 'react';

// Hand-designed, highly clean, scalable inline SVGs representing official brands
const BrandLogos = {
  MercedesBenz: () => (
    <svg className="h-8 w-auto text-black shrink-0 transition-all duration-300" viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M50,7.5 L50,50 L13.2,71.2 L50,50 L86.8,71.2 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="2.5" fill="currentColor" />
    </svg>
  ),
  BMW: () => (
    <svg className="h-8 w-auto shrink-0 transition-all duration-300" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="#1A1A1A" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="50" cy="50" r="32" fill="#FFFFFF" />
      <path d="M50,18 A32,32 0 0,0 18,50 L50,50 Z" fill="#0066B2" />
      <path d="M50,50 L82,50 A32,32 0 0,0 50,18 Z" fill="#FFFFFF" />
      <path d="M50,50 L50,82 A32,32 0 0,0 82,50 Z" fill="#0066B2" />
      <path d="M18,50 A32,32 0 0,0 50,82 L50,50 Z" fill="#FFFFFF" />
      {/* BMW Letters */}
      <text x="31" y="14" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-40 31 14)">B</text>
      <text x="47" y="11" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">M</text>
      <text x="63" y="14" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" transform="rotate(40 63 14)">W</text>
    </svg>
  ),
  Volvo: () => (
    <svg className="h-8 w-auto shrink-0 transition-all duration-300" viewBox="0 0 120 100">
      <circle cx="45" cy="55" r="30" fill="none" stroke="#002060" strokeWidth="6" />
      <path d="M66,34 L88,12 M88,12 L70,12 M88,12 L88,30" fill="none" stroke="#002060" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="10" y="45" width="70" height="20" fill="#002060" rx="3" />
      <text x="45" y="59" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="Georgia, serif" textAnchor="middle" letterSpacing="1">VOLVO</text>
    </svg>
  ),
  TataMotors: () => (
    <svg className="h-7 w-auto shrink-0 transition-all duration-300" viewBox="0 0 150 60">
      <ellipse cx="75" cy="30" rx="42" ry="25" fill="none" stroke="#00529B" strokeWidth="4.5" />
      <path d="M52,18 C65,18 70,36 75,46 C80,36 85,18 98,18 C83,18 80,32 75,41 C70,32 67,18 52,18 Z" fill="#00529B" />
      <text x="75" y="56" fill="#00529B" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.5">TATA</text>
    </svg>
  ),
  Mahindra: () => (
    <svg className="h-7 w-auto shrink-0 transition-all duration-300" viewBox="0 0 150 50">
      <path d="M25,45 L15,10 L30,30 L45,10 L35,45" fill="none" stroke="#E31837" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="56" y="38" fill="#E31837" fontSize="21" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">Mahindra</text>
    </svg>
  ),
  Bosch: () => (
    <svg className="h-8 w-auto shrink-0 transition-all duration-300" viewBox="0 0 160 50">
      {/* Magneto armature */}
      <circle cx="25" cy="25" r="18" fill="none" stroke="#E5002C" strokeWidth="3" />
      <circle cx="25" cy="25" r="9" fill="none" stroke="#E5002C" strokeWidth="3" />
      <line x1="25" y1="7" x2="25" y2="43" stroke="#E5002C" strokeWidth="3" />
      <rect x="20" y="22" width="10" height="6" fill="#E5002C" />
      <text x="52" y="34" fill="#000000" fontSize="24" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">BOSCH</text>
    </svg>
  ),
  MarutiSuzuki: () => (
    <svg className="h-8 w-auto shrink-0 transition-all duration-300" viewBox="0 0 160 50">
      {/* Suzuki stylized S */}
      <path d="M12,42 L32,42 C38,42 42,38 42,32 L42,28 L30,28 C26,28 22,24 22,20 L22,8 L42,8 L22,8 C16,8 12,12 12,18 L12,22 L24,22 C28,22 32,26 32,30 L32,42 Z" fill="#005CA9" />
      <text x="52" y="34" fill="#005CA9" fontSize="18" fontWeight="bold" fontFamily="sans-serif">SUZUKI</text>
    </svg>
  ),
  Hyundai: () => (
    <svg className="h-7 w-auto shrink-0 transition-all duration-300" viewBox="0 0 120 50">
      <ellipse cx="60" cy="25" rx="45" ry="20" fill="none" stroke="#002C5F" strokeWidth="4.5" transform="rotate(-8 60 25)" />
      <path d="M35,38 L42,12 L50,12 L45,38 Z M65,38 L72,12 L80,12 L75,38 Z M44,25 L69,22" stroke="#002C5F" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  ),
  Honda: () => (
    <svg className="h-8 w-auto shrink-0 transition-all duration-300" viewBox="0 0 100 50">
      <rect x="5" y="5" width="90" height="40" rx="6" fill="none" stroke="#8A8A8A" strokeWidth="3" />
      <path d="M28,10 L36,40 L45,40 L40,10 Z M62,10 L54,40 L45,40 L50,10 Z M38,24 L52,24" stroke="#E4002B" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  ),
  Crisil: () => (
    <svg className="h-7 w-auto shrink-0 transition-all duration-300" viewBox="0 0 150 50">
      <text x="10" y="38" fill="#0A529C" fontSize="30" fontWeight="900" fontFamily="sans-serif" letterSpacing="-1">CRISIL</text>
      <path d="M125,12 L140,25 L125,38 Z" fill="#F26F21" />
      <rect x="110" y="20" width="20" height="10" fill="#0A529C" />
    </svg>
  ),
  HDFCLife: () => (
    <svg className="h-7 w-auto shrink-0 transition-all duration-300" viewBox="0 0 160 50">
      {/* overlapping squares */}
      <rect x="10" y="8" width="20" height="20" fill="none" stroke="#ED1C24" strokeWidth="3.5" />
      <rect x="20" y="18" width="20" height="20" fill="none" stroke="#0054A6" strokeWidth="3.5" />
      <text x="50" y="26" fill="#000000" fontSize="15" fontWeight="bold" fontFamily="sans-serif">HDFC Life</text>
      <text x="50" y="38" fill="#888888" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">Sar utha ke jiyo!</text>
    </svg>
  ),
  DeutscheBank: () => (
    <svg className="h-8 w-auto shrink-0 transition-all duration-300" viewBox="0 0 160 50">
      <rect x="10" y="10" width="30" height="30" fill="none" stroke="#0018A8" strokeWidth="4" />
      <line x1="16" y1="34" x2="34" y2="16" stroke="#0018A8" strokeWidth="4.5" strokeLinecap="round" />
      <text x="52" y="32" fill="#0018A8" fontSize="15" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="0.2">Deutsche Bank</text>
    </svg>
  )
};

const items = [
  { Logo: BrandLogos.MercedesBenz, name: 'Mercedes-Benz', sector: 'Automotive' },
  { Logo: BrandLogos.BMW, name: 'BMW', sector: 'Automotive' },
  { Logo: BrandLogos.Volvo, name: 'Volvo', sector: 'Automotive' },
  { Logo: BrandLogos.TataMotors, name: 'Tata Motors', sector: 'Automotive' },
  { Logo: BrandLogos.Mahindra, name: 'Mahindra', sector: 'Automotive' },
  { Logo: BrandLogos.Bosch, name: 'Bosch', sector: 'Technology' },
  { Logo: BrandLogos.MarutiSuzuki, name: 'Maruti Suzuki', sector: 'Automotive' },
  { Logo: BrandLogos.Hyundai, name: 'Hyundai', sector: 'Automotive' },
  { Logo: BrandLogos.Honda, name: 'Honda', sector: 'Automotive' },
  { Logo: BrandLogos.Crisil, name: 'Crisil', sector: 'Finance' },
  { Logo: BrandLogos.HDFCLife, name: 'HDFC Life', sector: 'Banking' },
  { Logo: BrandLogos.DeutscheBank, name: 'Deutsche Bank', sector: 'Banking' }
];

interface Props {
  label?: string;
  compact?: boolean;
}

export function ClientMarquee({ label = "Trusted by Leaders at Global Enterprises", compact = false }: Props) {
  // Duplicate items for seamless layout looping
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <section
      className="nurc-marquee-wrap overflow-hidden bg-white select-none border-t border-b border-border py-6"
    >
      {label && !compact && (
        <p
          className="text-center mb-6"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--muted-foreground)',
          }}
        >
          {label}
        </p>
      )}

      {/* Infinite scrolling track */}
      <div 
        className="nurc-marquee-track flex items-center gap-16" 
        style={{ width: 'max-content', animationDuration: '38s' }}
      >
        {duplicatedItems.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center cursor-default filter grayscale contrast-75 opacity-55 hover:grayscale-0 hover:contrast-100 hover:opacity-100 transition-all duration-300 group shrink-0 px-2"
          >
            <div className="h-8 flex items-center justify-center">
              <item.Logo />
            </div>
            {!compact && (
              <span
                className="mt-2 text-[8px] font-bold tracking-widest text-[#B2B8C2] uppercase"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {item.sector}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
