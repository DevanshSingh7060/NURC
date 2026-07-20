import React, { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Filter, Quote, Star, ChevronDown } from 'lucide-react';
import { SEOHead } from './shared/SEOHead';

// Import PNG logos from src/Logo
import mercedesBenzLogo from '../../Logo/Mercedes Benz.png';
import bmwLogo from '../../Logo/BMW.png';
import tataLogo from '../../Logo/Tata.png';

// Import newly uploaded logos
import boschLogo from '../../Logo/BOSCH.png';
import unoMindaLogo from '../../Logo/UNO MINDA.png';
import apolloLogo from '../../Logo/APOLLO.png';
import tataAiaLogo from '../../Logo/TATA AIA.png';
import sbiLifeLogo from '../../Logo/SBI Life.png';
import barclaysLogo from '../../Logo/Barclays Bank PLC.png';
import castrolLogo from '../../Logo/CASTROL.png';
import carrierLogo from '../../Logo/Carrier Airconditioning and Refrigeration.avif';
import siamLogo from '../../Logo/Society of Indian Automobile Manufacturers.svg';

interface Sector {
  title: string;
  topLogos: {
    name: string;
    logoType: 'image' | 'svg';
    src?: string;
    Logo?: React.ComponentType<any>;
  }[];
  remainingCompanies: string[];
}

const sectorsData: Sector[] = [
  {
    title: 'Automobile OEMs',
    topLogos: [
      { name: 'Mercedes Benz', logoType: 'image', src: mercedesBenzLogo },
      { name: 'BMW India', logoType: 'image', src: bmwLogo },
      { name: 'Tata Motors', logoType: 'image', src: tataLogo },
    ],
    remainingCompanies: [
      'Maruti Suzuki',
      'Hero MotoCorp',
      'Mahindra & Mahindra',
      'Hyundai Motor India',
      'Honda Cars India',
      'Kia India',
      'MG Motor',
      'Toyota Kirloskar',
      'ISUZU Motors',
      'Volvo Group India',
      'TVS Motor',
      'Force Motors',
    ],
  },
  {
    title: 'Auto Components & Engineering',
    topLogos: [
      { name: 'Bosch', logoType: 'image', src: boschLogo },
      { name: 'Uno Minda', logoType: 'image', src: unoMindaLogo },
      { name: 'Apollo Tyres', logoType: 'image', src: apolloLogo },
    ],
    remainingCompanies: [
      'Lumax Industries',
      'Aptiv Components',
      'Visteon Electronics',
      'Lucas TVS',
      'Anand Automotive',
      'Yazaki India',
      'Timken India',
      'Exide Industries',
      'Lear Automotive',
      'Magna Automotive',
      'Nexteer Automotive',
      'Sundaram Clayton',
    ],
  },
  {
    title: 'Insurance',
    topLogos: [
      {
        name: 'HDFC Life',
        logoType: 'svg',
        Logo: () => (
          <svg className="w-auto text-[#0054A6] h-[30px]" viewBox="0 0 160 50">
            <rect
              x="10"
              y="8"
              width="20"
              height="20"
              fill="none"
              stroke="#ED1C24"
              strokeWidth="3.5"
            />
            <rect
              x="20"
              y="18"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            />
            <text
              x="50"
              y="26"
              fill="#000000"
              fontSize="15"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              HDFC Life
            </text>
          </svg>
        ),
      },
      { name: 'SBI Life', logoType: 'image', src: sbiLifeLogo },
      { name: 'Tata AIA', logoType: 'image', src: tataAiaLogo },
    ],
    remainingCompanies: [
      'Liberty General Insurance',
      'Zuno Insurance',
      'Star Union Dai-ichi',
      'Ageas Federal Life',
      'Universal Sompo',
      'Munich RE',
    ],
  },
  {
    title: 'Banking & Finance',
    topLogos: [
      {
        name: 'Deutsche Bank',
        logoType: 'svg',
        Logo: () => (
          <svg className="w-auto text-[#0018A8] h-[30px]" viewBox="0 0 160 50" fill="currentColor">
            <rect
              x="10"
              y="10"
              width="30"
              height="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
            <line
              x1="16"
              y1="34"
              x2="34"
              y2="16"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <text
              x="52"
              y="32"
              fill="currentColor"
              fontSize="15"
              fontWeight="900"
              fontFamily="Georgia, serif"
              letterSpacing="0.2"
            >
              Deutsche Bank
            </text>
          </svg>
        ),
      },
      { name: 'Barclays Bank', logoType: 'image', src: barclaysLogo },
      {
        name: 'Crisil',
        logoType: 'svg',
        Logo: () => (
          <div className="flex items-center justify-center font-black tracking-wider text-lg text-[#0A2540] h-8 select-none font-heading">
            CRISIL
          </div>
        ),
      },
    ],
    remainingCompanies: [
      'Mahindra Finance',
      'AVANSE Financial Services',
      'Sun Life Global Solutions',
      'Milliman India',
    ],
  },
  {
    title: 'Industrial / Manufacturing / Others',
    topLogos: [
      { name: 'Castrol India', logoType: 'image', src: castrolLogo },
      { name: 'Carrier Airconditioning', logoType: 'image', src: carrierLogo },
      { name: 'SIAM', logoType: 'image', src: siamLogo },
    ],
    remainingCompanies: [
      'Savita Oil Technologies',
      'National Engineering Industries',
      'AVL India',
      'Boston Consulting Group',
      'Eberspaecher Suetrak',
    ],
  },
];

const testimonials = [
  {
    quote:
      "NURC's Morning and Afternoon Newsletters stands out for its accuracy, comprehensiveness, and high consistency. The team tracks industry news accurately, which remains valuable source of information for automotive industry updates.",
    name: 'Shekhar Das Chowdhury',
    title: 'Head, Corporate Communications',
    company: 'Mercedes-Benz India',
    initials: 'SC',
  },
  {
    quote:
      "For us, staying informed with credible, timely, and relevant industry intelligence is an essential part of our communications and business updates. NURC MediaNext's Daily Newsletter has consistently been a dependable source of curated news, concisely presented and links, helping us keep pace with important developments.\n\nWhat sets the newsletter apart is the comprehensive coverage, combined with the ease of access, enables our team to quickly identify key trends, track industry movements, and stay connected with the evolving media landscape—all without having to sift through multiple sources.\n\nWe sincerely appreciate the professionalism, consistency, and commitment demonstrated by the NURC MediaNext team in delivering this service every day. We wish the entire team continued success and look forward to many more years of this excellent partnership.",
    name: 'Ajit Srinivasan',
    title: 'Deputy General Manager, Corporate Communications & PR',
    company: 'Isuzu India',
    initials: 'AS',
  },
  {
    quote:
      'NURC MediaNext has been a valuable news update partner for BMW Group India, providing timely, relevant and well-curated automotive and industry updates. Their daily newsletter and Synoptic Auto Update offer a crisp, easy-to-consume view of key developments, helping our teams stay informed in a fast-moving media and business environment. We appreciate their consistency, responsiveness and understanding of our information needs, and value NURC as a dependable source for structured news intelligence.',
    name: 'Satchit Gayakwad',
    title: 'Marketing, Network Performance and Customer Support Communication',
    company: 'Press and Corporate Affairs',
    initials: 'SG',
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = t.quote.split('\n\n');
  const isLong = t.quote.length > 300;

  return (
    <div className="rounded-xl p-6 bg-card border border-border">
      <Quote size={28} className="text-nurc-gold opacity-60 mb-4" />
      <div className="italic space-y-3 font-body text-[15px] leading-[1.75] text-nurc-navy">
        {!isLong || expanded ? (
          paragraphs.map((para, pi) => <p key={pi}>"{para}"</p>)
        ) : (
          <p className="line-clamp-4">"{paragraphs[0]}"</p>
        )}
      </div>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70 cursor-pointer bg-transparent border-0 p-0 text-nurc-teal font-heading"
          aria-expanded={expanded}
        >
          {expanded ? 'Read less' : 'Read more'}
          <ChevronDown
            size={14}
            className="transition-transform duration-200"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
          />
        </button>
      )}

      <div className="flex items-center gap-3 mt-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 bg-nurc-navy">
          {t.initials}
        </div>
        <div>
          <div className="font-semibold font-heading text-[14px] text-nurc-navy">{t.name}</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {t.title} · {t.company}
          </div>
        </div>
      </div>
      <div className="flex gap-0.5 mt-4">
        {[...Array(5)].map((_, si) => (
          <Star key={si} size={12} fill="var(--nurc-gold)" className="text-nurc-gold" />
        ))}
      </div>
    </div>
  );
}

export function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <SEOHead
        title="Our Clients | NURC MediaNext"
        description="Trusted by Fortune 500 organizations and leading Indian companies for over 18 years. Discover why India's top MNCs rely on NURC for daily industry news intelligence."
        canonicalUrl="/clients"
      />
      {/* Hero */}
      <section className="py-20 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-nurc-gold" />
            <span className="text-xs font-bold uppercase text-[var(--nurc-teal)] tracking-[0.14em] font-heading">
              Our Esteemed Clients
            </span>
            <div className="h-px w-12 bg-nurc-gold" />
          </div>
          <h1 className="mb-4 font-display text-[clamp(24px,4vw,42px)] font-bold text-nurc-navy leading-[1.15]">
            Trusted by India’s Leading Corporations
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 text-base md:text-lg leading-[1.8] max-w-[650px]">
            From Fortune 500 organizations to growing Indian companies — many of our esteemed
            clients have trusted our daily intelligence service for over 18 years.
          </p>
          {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { label: 'Sectors Covered', value: '7' },
              { label: 'Delivery', value: 'Daily' },
              { label: 'Client Tenure', value: '18+ Yrs' },
              { label: 'Free Trial', value: '15 Days' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-bold font-display text-[28px] text-nurc-navy">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs mt-0.5 font-heading">
                  {stat.label}
                </div>
              </div>
            ))} */}
          {/* </div> */}
        </div>
      </section>

      {/* Grid containing the 5 Sector Cards */}
      <section className="py-10 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {sectorsData.map((sector, sIdx) => (
              <div
                key={sIdx}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs flex flex-col hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-2 border-b border-gray-100 text-left font-heading text-nurc-navy">
                  {sector.title}
                </h3>

                {/* Top logos */}
                <div className="flex items-center gap-4 justify-start py-2 mb-4 min-h-[48px] overflow-hidden">
                  {sector.topLogos.map((logo, lIdx) => (
                    <div
                      key={lIdx}
                      className="h-9 flex items-center justify-center shrink-0 max-w-[100px]"
                    >
                      {logo.logoType === 'image' ? (
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="max-h-8 w-auto object-contain"
                          draggable={false}
                          loading="eager"
                        />
                      ) : (
                        logo.Logo && <logo.Logo />
                      )}
                    </div>
                  ))}
                </div>

                {/* Bullet list of remaining companies */}
                <ul className="text-left space-y-1.5 pl-4 list-disc text-gray-500 text-xs font-medium leading-relaxed flex-1">
                  {sector.remainingCompanies.map((company, cIdx) => (
                    <li key={cIdx} className="pl-0.5">
                      {company}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* View All Clients Button */}
          <div className="text-center mt-12">
            <Link
              to="/clients/all"
              className="inline-flex items-center justify-center text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-all btn-nurc shadow-sm text-sm bg-nurc-teal font-heading"
            >
              VIEW ALL CLIENTS
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-nurc-gold" />
              <span className="text-xs font-bold uppercase text-nurc-teal tracking-[0.14em] font-heading">
                Testimonials
              </span>
              <div className="h-px w-12 bg-nurc-gold" />
            </div>
            <h2 className="font-heading text-[clamp(26px,3.5vw,36px)] font-bold text-nurc-navy leading-[1.25]">
              What Industry Leaders Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-nurc-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold leading-[1.2]">
            Join India's Most Trusted Intelligence Network
          </h2>
          <p className="text-white/60 mb-6 text-sm md:text-base leading-[1.7]">
            Request a complimentary sample for your sector and see why India's top executives choose
            NURC.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 btn-nurc text-sm bg-nurc-teal font-heading"
          >
            Request Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
