import { useState } from 'react';
import { BookOpen, Clock, Search } from 'lucide-react';
import { useReaderMode, SAMPLE_AUTO_ARTICLE, SAMPLE_BANKING_ARTICLE } from './ReaderModeContext';
import { SEOHead } from './shared/SEOHead';

const categories = [
  'All',
  'Strategy',
  'Market Analysis',
  'Policy & Regulation',
  'Technology',
  'Leadership',
];

const articles = [
  {
    title: "India's EV Transition: What the Next 5 Years Actually Look Like",
    category: 'Market Analysis',
    date: 'May 22, 2025',
    readTime: '15 min',
    summary:
      'A data-driven analysis of EV adoption trajectories across passenger vehicles, two-wheelers, and commercial vehicles, with scenario modelling through FY30.',
    image:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=300&fit=crop&auto=format',
    article: SAMPLE_AUTO_ARTICLE,
    featured: true,
  },
  {
    title: 'The NPA Cycle: Why Indian Banks Are Better Positioned Than They Look',
    category: 'Market Analysis',
    date: 'May 15, 2025',
    readTime: '12 min',
    summary:
      "Despite global headwinds, India's banking sector enters FY26 with its strongest balance sheets in a decade. Here's why the pessimists are wrong.",
    image:
      'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=600&h=300&fit=crop&auto=format',
    article: SAMPLE_BANKING_ARTICLE,
    featured: false,
  },
  {
    title: 'FAME III and the Inflection Point for Commercial EVs',
    category: 'Policy & Regulation',
    date: 'May 10, 2025',
    readTime: '10 min',
    summary:
      'A detailed breakdown of the FAME III framework, its financial mechanics, and the strategic implications for logistics companies and public transport operators.',
    image:
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&h=300&fit=crop&auto=format',
    article: SAMPLE_AUTO_ARTICLE,
    featured: false,
  },
  {
    title: "What India's Infrastructure Push Means for the Private Sector",
    category: 'Strategy',
    date: 'May 5, 2025',
    readTime: '14 min',
    summary:
      "The government's ₹11 lakh crore infrastructure pipeline creates specific windows of opportunity. Our analysts identify the 12 most actionable openings for private sector participants.",
    image:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=300&fit=crop&auto=format',
    article: SAMPLE_AUTO_ARTICLE,
    featured: false,
  },
  {
    title: 'How Leading CFOs Use Sector Intelligence to Sharpen Capital Allocation',
    category: 'Leadership',
    date: 'April 28, 2025',
    readTime: '11 min',
    summary:
      'Six CFOs across auto, banking, and infrastructure share how curated intelligence has shaped their capital allocation decisions in an uncertain macro environment.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop&auto=format',
    article: SAMPLE_AUTO_ARTICLE,
    featured: false,
  },
  {
    title: 'Decoding the Green Hydrogen PLI: Opportunity Map for Industry',
    category: 'Technology',
    date: 'April 20, 2025',
    readTime: '9 min',
    summary:
      "India's green hydrogen production-linked incentive scheme has opened. We map the opportunity across the value chain: production, storage, and end-use sectors.",
    image:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=300&fit=crop&auto=format',
    article: SAMPLE_AUTO_ARTICLE,
    featured: false,
  },
];

export function ResourcesPage() {
  const { openReader } = useReaderMode();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = articles.filter((a) => {
    const catMatch = activeCategory === 'All' || a.category === activeCategory;
    const searchMatch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Insights & Research | NURC MediaNext"
        description="Deep-read analysis from NURC's editorial team. Strategic intelligence across automotive, banking, infrastructure, energy, and healthcare sectors."
        canonicalUrl="/insights"
      />
      {/* Hero */}
      <section className="py-16 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-nurc-gold" />
            <span className="text-xs font-bold uppercase text-nurc-teal tracking-[0.14em] font-heading">
              Resources
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="mb-3 font-display text-[clamp(28px,4vw,42px)] font-bold text-nurc-navy leading-[1.2]">
                Intelligence Library
              </h1>
              <p className="text-muted-foreground text-[16px] leading-[1.75] max-w-[520px]">
                Deep-read analysis from NURC's editorial team. Every article is available in Reader
                Mode for a distraction-free experience.
              </p>
            </div>
            {/* Search */}
            <div className="relative shrink-0">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm w-64 outline-none transition-all font-body text-foreground"
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all font-heading"
                style={{
                  background: activeCategory === cat ? 'var(--nurc-navy)' : 'transparent',
                  color: activeCategory === cat ? '#fff' : 'var(--nurc-navy)',
                  border: `1px solid ${activeCategory === cat ? 'var(--nurc-navy)' : 'var(--border)'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured */}
          {featured && (
            <div className="rounded-2xl overflow-hidden border border-border bg-card mb-10 grid lg:grid-cols-2 transition-all duration-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]">
              <div className="relative overflow-hidden min-h-[280px]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                  width={600}
                  height={300}
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase bg-nurc-teal tracking-[0.1em] font-heading">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase mb-3 text-nurc-teal font-heading tracking-[0.12em]">
                  {featured.category}
                </span>
                <h2 className="mb-4 font-display text-[clamp(20px,2.5vw,28px)] font-bold text-nurc-navy leading-[1.25]">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground mb-6 text-[15px] leading-[1.75]">
                  {featured.summary}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs text-muted-foreground flex items-center gap-1 font-heading">
                    <Clock size={12} /> {featured.readTime}
                  </span>
                  <span className="text-xs text-muted-foreground">{featured.date}</span>
                </div>
                <button
                  onClick={() => openReader(featured.article)}
                  className="self-start flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 bg-nurc-teal font-heading"
                >
                  <BookOpen size={14} />
                  Open in Reader Mode
                </button>
              </div>
            </div>
          )}

          {/* Article grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-card border border-border transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-[3px]"
              >
                <div className="relative overflow-hidden h-[180px]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    width={600}
                    height={300}
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase text-nurc-teal font-heading tracking-[0.1em]">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-heading">
                      <Clock size={11} /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="mb-2 font-bold font-heading text-[15px] text-nurc-navy leading-[1.3]">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-[13px] leading-[1.65]">
                    {article.summary.slice(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                    <button
                      onClick={() => openReader(article.article)}
                      className="flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70 text-nurc-teal font-heading"
                    >
                      <BookOpen size={12} />
                      Read
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="font-heading">No articles found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
