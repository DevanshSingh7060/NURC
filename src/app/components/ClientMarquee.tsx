import React from 'react';

// Import PNG logos from src/Logo (used for the automotive and new clients)
import mercedesBenzLogo from '../../Logo/Mercedes Benz.png';
import bmwLogo from '../../Logo/BMW.png';
import marutiSuzukiLogo from '../../Logo/Maruti Suzuki.png';
import mahindraLogo from '../../Logo/Mahindra.png';
import tataLogo from '../../Logo/Tata.png';
import hyundaiLogo from '../../Logo/Hyundai.png';
import volvoLogo from '../../Logo/Volvo.png';
import tvsLogo from '../../Logo/TVS.png';

// Import newly uploaded logos
import tataAiaLogo from '../../Logo/TATA AIA.png';
import sonaBlwLogo from '../../Logo/SONA BW.png';
import barclaysLogo from '../../Logo/Barclays Bank PLC.png';
import siamLogo from '../../Logo/Society of Indian Automobile Manufacturers.svg';
import carrierLogo from '../../Logo/Carrier Airconditioning and Refrigeration.avif';
import libertyLogo from '../../Logo/Liberty General Insurance.png';
import boschLogo from '../../Logo/BOSCH.png';
import unoMindaLogo from '../../Logo/UNO MINDA.png';
import apolloLogo from '../../Logo/APOLLO.png';
import castrolLogo from '../../Logo/CASTROL.png';
import sbiLifeLogo from '../../Logo/SBI Life.png';

interface MarqueeItem {
  name: string;
  logoType: 'image' | 'svg';
  src?: string;
  Logo?: React.ComponentType<any>;
}

const items: MarqueeItem[] = [
  { logoType: 'image', src: mercedesBenzLogo, name: 'Mercedes-Benz' },
  { logoType: 'image', src: bmwLogo, name: 'BMW' },
  { logoType: 'image', src: tataLogo, name: 'Tata Motors' },
  { logoType: 'image', src: mahindraLogo, name: 'Mahindra' },
  { logoType: 'image', src: volvoLogo, name: 'Volvo' },
  { logoType: 'image', src: hyundaiLogo, name: 'Hyundai' },
  { logoType: 'image', src: marutiSuzukiLogo, name: 'Maruti Suzuki' },
  { logoType: 'image', src: tvsLogo, name: 'TVS' },
  {
    logoType: 'svg',
    name: 'Deutsche Bank',
    Logo: () => (
      <svg className="w-auto text-[#0018A8]" style={{ height: '54px' }} viewBox="0 0 160 50" fill="currentColor">
        <rect x="10" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="4" />
        <line x1="16" y1="34" x2="34" y2="16" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
        <text x="52" y="32" fill="currentColor" fontSize="15" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="0.2">Deutsche Bank</text>
      </svg>
    )
  },
  {
    logoType: 'svg',
    name: 'HDFC Life',
    Logo: () => (
      <svg className="w-auto text-[#0054A6]" style={{ height: '54px' }} viewBox="0 0 160 50">
        <rect x="10" y="8" width="20" height="20" fill="none" stroke="#ED1C24" strokeWidth="3.5" />
        <rect x="20" y="18" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <text x="50" y="26" fill="#000000" fontSize="15" fontWeight="bold" fontFamily="sans-serif">HDFC Life</text>
      </svg>
    )
  },
  // New companies
  { logoType: 'image', src: tataAiaLogo, name: 'TATA AIA' },
  { logoType: 'image', src: sonaBlwLogo, name: 'SONA BLW / SONA COMSTAR' },
  { logoType: 'image', src: barclaysLogo, name: 'Barclays Bank PLC' },
  { logoType: 'image', src: siamLogo, name: 'Society of Indian Automobile Manufacturers (SIAM)' },
  { logoType: 'image', src: carrierLogo, name: 'Carrier Airconditioning' },
  { logoType: 'image', src: libertyLogo, name: 'Liberty General Insurance' },
  { logoType: 'image', src: boschLogo, name: 'BOSCH' },
  { logoType: 'image', src: unoMindaLogo, name: 'UNO MINDA' },
  { logoType: 'image', src: apolloLogo, name: 'Apollo Tyres' },
  { logoType: 'image', src: castrolLogo, name: 'Castrol India' },
  { logoType: 'image', src: sbiLifeLogo, name: 'SBI Life' }
];

interface Props {
  label?: string;
  compact?: boolean;
}

export function ClientMarquee({ label = "Trusted by India’s Leading Industry Leaders", compact = false }: Props) {
  // Duplicate the entire logo array internally to implement [logos][logos] behavior
  const duplicatedItems = [...items, ...items];

  return (
    <section className="bg-[#FFFFFF] select-none py-8">
      {label && !compact && (
        <h3
          className="text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '19px',
            fontWeight: 600,
            color: '#1F2937',
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}
        >
          {label}
        </h3>
      )}

      {/* Infinite scrolling marquee wrapper */}
      <div className="nurc-marquee-wrap">
        {/* Infinite scrolling track */}
        <div className="nurc-marquee-track">
          {/* First Group */}
          <div className="nurc-marquee-group">
            {duplicatedItems.map((item, i) => (
              <div key={`group-1-${i}`} className="flex items-center justify-center shrink-0">
                {item.logoType === 'image' ? (
                  <img
                    src={item.src}
                    alt={`${item.name} logo`}
                    className="nurc-marquee-logo-img"
                    draggable={false}
                    loading="eager"
                  />
                ) : (
                  <div className="nurc-marquee-logo-img flex items-center justify-center">
                    {item.Logo && <item.Logo />}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Second Group (for seamless looping) */}
          <div className="nurc-marquee-group" aria-hidden="true">
            {duplicatedItems.map((item, i) => (
              <div key={`group-2-${i}`} className="flex items-center justify-center shrink-0">
                {item.logoType === 'image' ? (
                  <img
                    src={item.src}
                    alt={`${item.name} logo`}
                    className="nurc-marquee-logo-img"
                    draggable={false}
                    loading="eager"
                  />
                ) : (
                  <div className="nurc-marquee-logo-img flex items-center justify-center">
                    {item.Logo && <item.Logo />}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

