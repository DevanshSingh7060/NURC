import { createContext, useContext, useState, ReactNode } from 'react';
import { safeStorage } from '../lib/safeStorage';

export interface ContentBlock {
  type: 'section' | 'paragraph' | 'data' | 'quote';
  heading?: string;
  tag?: string;
  text?: string;
  items?: string[];
  attribution?: string;
}

export interface Article {
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  readTime: string;
  content: ContentBlock[];
}

export interface ReaderSettings {
  fontSize: 'small' | 'medium' | 'large';
  lineSpacing: 'compact' | 'standard' | 'relaxed';
  readingMode: 'default' | 'night' | 'dark';
}

interface ReaderModeContextType {
  isOpen: boolean;
  showSharePrompt: boolean;
  article: Article | null;
  newsletterId: string | null;
  settings: ReaderSettings;
  openReader: (article: Article, id?: string) => void;
  closeReader: () => void;
  dismissSharePrompt: () => void;
  updateSettings: (s: Partial<ReaderSettings>) => void;
}

const ReaderModeContext = createContext<ReaderModeContextType | null>(null);

export function ReaderModeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSharePrompt, setShowSharePrompt] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [newsletterId, setNewsletterId] = useState<string | null>(null);

  const [settings, setSettings] = useState<ReaderSettings>(() => {
    const saved = safeStorage.getItem('nurc_reader_preferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.fontSize && parsed.lineSpacing && parsed.readingMode) {
          return parsed;
        }
      } catch (e) {
        // Fallback
      }
    }
    return {
      fontSize: 'medium',
      lineSpacing: 'standard',
      readingMode: 'default',
    };
  });

  const openReader = (a: Article, id?: string) => {
    setArticle(a);
    setNewsletterId(id || null);
    setIsOpen(true);
    setShowSharePrompt(false);
    document.body.style.overflow = 'hidden';
  };

  const closeReader = () => {
    setIsOpen(false);
    setNewsletterId(null);
    document.body.style.overflow = '';
    /* Show share prompt briefly after a reader session */
    setShowSharePrompt(true);
    setTimeout(() => setShowSharePrompt(false), 9000);
  };

  const dismissSharePrompt = () => setShowSharePrompt(false);

  const updateSettings = (s: Partial<ReaderSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...s };
      safeStorage.setItem('nurc_reader_preferences', JSON.stringify(next));
      return next;
    });
  };

  return (
    <ReaderModeContext.Provider
      value={{
        isOpen,
        showSharePrompt,
        article,
        newsletterId,
        settings,
        openReader,
        closeReader,
        dismissSharePrompt,
        updateSettings,
      }}
    >
      {children}
    </ReaderModeContext.Provider>
  );
}

export function useReaderMode() {
  const ctx = useContext(ReaderModeContext);
  if (!ctx) throw new Error('useReaderMode must be used within ReaderModeProvider');
  return ctx;
}

export { ReaderModeContext };

export const SAMPLE_AUTO_ARTICLE: Article = {
  title: 'Auto Industry Weekly',
  subtitle: 'Issue #1,247 · May 27, 2025',
  category: 'Automotive Intelligence',
  date: 'May 27, 2025',
  readTime: '12 min read',
  content: [
    {
      type: 'section',
      heading: 'POLICY UPDATE',
      tag: 'Government & Regulation',
      text: `India's Ministry of Heavy Industries has extended the FAME III subsidies for commercial electric vehicles through March 2027, a move that analysts say will accelerate fleet electrification among logistics and public transport operators. The revised scheme offers up to ₹15,000 per kWh for commercial EV batteries, up from ₹10,000 under FAME II. State governments of Maharashtra, Karnataka, and Tamil Nadu have announced parallel incentives that could effectively reduce total acquisition cost of a commercial EV by 22–28% compared to an equivalent diesel vehicle.`,
    },
    {
      type: 'section',
      heading: 'INDUSTRY NEWS',
      tag: 'Corporate Performance',
      text: `Tata Motors reported Q4 FY25 revenues of ₹1.19 lakh crore, up 12.3% year-on-year, driven by strong Jaguar Land Rover performance in North America and surging domestic EV sales. The Tata Punch EV and Nexon EV together accounted for 67% of all passenger EVs sold in India in March 2025. Management guided for 18% revenue growth in FY26, citing JLR order backlog of 168,000 units and a pipeline of six new EV launches across its India portfolio through FY27.`,
    },
    {
      type: 'section',
      heading: 'COMPETITOR INTELLIGENCE',
      tag: 'Market Movements',
      text: `Hyundai India has officially broken ground on its second manufacturing facility in Talegaon, Maharashtra. The ₹6,000 crore plant will have an annual capacity of 200,000 units and will produce both ICE and battery-electric vehicles on a shared platform. Production is expected to commence in Q3 FY27. This positions Hyundai to directly challenge Maruti Suzuki's dominance in the mid-premium segment, particularly as Hyundai's new Creta EV has already captured 34% of the ₹15–25 lakh EV bracket.`,
    },
    {
      type: 'data',
      heading: 'NUMBERS THAT MATTER',
      tag: 'Market Data',
      items: [
        'Passenger vehicle wholesales: 3,89,260 units in April 2025 (+8.2% YoY)',
        'EV penetration in PV segment: 7.1% in April 2025 vs. 4.2% in April 2024',
        'Two-wheeler exports: 5,12,000 units in April 2025 (+14.7% YoY)',
        'Auto component exports: ₹18,320 crore in Q4 FY25 (+9.8% YoY)',
        'Used car market size: ₹3.67 lakh crore estimated for FY25',
        'EV charging infrastructure: 12,147 public charging points as of May 2025',
      ],
    },
    {
      type: 'quote',
      text: 'The convergence of FAME III extension, aggressive OEM investment, and improving charging infrastructure suggests India is approaching an inflection point. We estimate EV penetration will cross 15% in the passenger segment by FY28.',
      attribution: 'NURC Research Desk, Automotive Division',
    },
    {
      type: 'section',
      heading: "EDITOR'S INTELLIGENCE NOTE",
      tag: 'Strategic Briefing',
      text: `This week's numbers confirm what we have been tracking for the past three quarters: India's automotive sector is undergoing a structural transformation, not a cyclical upturn. The divergence between premium and mass-market segments is widening, and OEMs that straddle both are facing significant product portfolio decisions. We recommend watching Maruti Suzuki's board meeting scheduled for mid-June closely — the company's revised EV strategy, expected to be presented then, could be the most consequential announcement in Indian automotive policy since the 2021 FAME II revision.`,
    },
  ],
};

export const SAMPLE_BANKING_ARTICLE: Article = {
  title: 'Banking & Finance Digest',
  subtitle: 'Issue #892 · May 27, 2025',
  category: 'Financial Intelligence',
  date: 'May 27, 2025',
  readTime: '10 min read',
  content: [
    {
      type: 'section',
      heading: 'RBI POLICY UPDATE',
      tag: 'Regulatory',
      text: `The Reserve Bank of India's Monetary Policy Committee held the repo rate steady at 6.25% in its May 2025 meeting, signalling a prolonged pause before any rate cuts. Governor Sanjay Malhotra cited persistent core inflation at 4.8% and global currency volatility as key factors. Analysts now push back their first rate-cut expectation to Q3 FY26, revising from earlier Q1 FY26 projections.`,
    },
    {
      type: 'data',
      heading: 'BANKING SECTOR METRICS',
      tag: 'Key Indicators',
      items: [
        'Gross NPA ratio (system-wide): 2.8% in March 2025 — 12-year low',
        'Credit growth (YoY): 14.2% as of April 2025',
        'CASA ratio (private banks avg.): 41.3%',
        'Net interest margins under pressure: -18 bps on average vs. FY24',
        'Digital payment volumes: ₹18.3 lakh crore via UPI in April 2025',
      ],
    },
  ],
};
