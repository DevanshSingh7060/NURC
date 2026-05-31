import { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Filter, Search, Download, Bookmark, Share2, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useReaderMode } from './ReaderModeContext';
import { Link, useSearchParams } from 'react-router';

const categories = ['All', 'Automotive', 'Banking', 'Finance', 'Insurance', 'Healthcare', 'Energy', 'Technology', 'Infrastructure'];
const years = ['All', '2026', '2025'];
const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const timeRanges = [
  { value: 'all', label: 'All Time' },
  { value: '30days', label: 'Last 30 Days' },
  { value: '6months', label: 'Last 6 Months' },
  { value: '1year', label: 'Last Year' }
];

export function NewsletterPage() {
  const { openReader } = useReaderMode();
  const { newsletters, savedArticles, toggleSaveArticle } = useApp();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeYear, setActiveYear] = useState('All');
  const [activeMonth, setActiveMonth] = useState('All');
  const [activeRange, setActiveRange] = useState('all');
  const [activeImportance, setActiveImportance] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getNewsletterImportance = (nl: any) => {
    return (nl.id === 'nl-auto-1247' || nl.id === 'nl-banking-892' || nl.category === 'Energy') ? 'High Impact' : 'Normal';
  };

  // Sync category selection with URL parameters from dashboard
  useEffect(() => {
    if (categoryParam) {
      const matched = categories.find(c => c.toLowerCase() === categoryParam.toLowerCase());
      if (matched) {
        setActiveCategory(matched);
      }
    }
  }, [categoryParam]);

  // Filter Logic
  const filtered = newsletters.filter(nl => {
    // 1. Category filter
    if (activeCategory !== 'All' && nl.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }

    // 1b. Importance filter
    if (activeImportance !== 'All' && getNewsletterImportance(nl) !== activeImportance) {
      return false;
    }

    // 2. Year filter
    if (activeYear !== 'All') {
      const year = new Date(nl.date).getFullYear().toString();
      if (year !== activeYear) return false;
    }

    // 3. Month filter
    if (activeMonth !== 'All') {
      const dateObj = new Date(nl.date);
      const monthName = months[dateObj.getMonth() + 1]; // 1-indexed (months[0] is 'All')
      if (monthName !== activeMonth) return false;
    }

    // 4. Time range filter
    if (activeRange !== 'all') {
      const date = new Date(nl.date);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (activeRange === '30days' && diffDays > 30) return false;
      if (activeRange === '6months' && diffDays > 180) return false;
      if (activeRange === '1year' && diffDays > 365) return false;
    }

    // 5. Keyword search (Headline, summary, text keywords, highlights, category)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = nl.title.toLowerCase().includes(query);
      const matchSummary = nl.summary.toLowerCase().includes(query);
      const matchCategory = nl.category.toLowerCase().includes(query);
      const matchHighlights = nl.highlights.some(h => h.toLowerCase().includes(query));
      
      // Deep search matching paragraph contents
      const matchContent = nl.article.content.some(block => 
        (block.text && block.text.toLowerCase().includes(query)) ||
        (block.heading && block.heading.toLowerCase().includes(query)) ||
        (block.tag && block.tag.toLowerCase().includes(query)) ||
        (block.items && block.items.some(item => item.toLowerCase().includes(query)))
      );

      return matchTitle || matchSummary || matchCategory || matchHighlights || matchContent;
    }

    return true;
  });

  const handleShare = (id: string) => {
    const readerUrl = `${window.location.origin}/reader/${id}`;
    navigator.clipboard?.writeText(readerUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (id: string) => {
    const nl = newsletters.find(n => n.id === id);
    if (!nl) return;

    let textContent = `NURC MEDIANEXT BRIEFING\n`;
    textContent += `=========================\n`;
    textContent += `Title: ${nl.article.title}\n`;
    textContent += `Sector: ${nl.category}\n`;
    textContent += `Issue: ${nl.issue} | Date: ${nl.date}\n`;
    textContent += `Read Time: ${nl.readTime}\n\n`;

    nl.article.content.forEach(block => {
      if (block.type === 'section') {
        textContent += `[${block.heading || 'Briefing'} ${block.tag ? ` - ${block.tag}` : ''}]\n`;
        textContent += `${block.text}\n\n`;
      } else if (block.type === 'data') {
        textContent += `[Data Indicators]\n`;
        block.items?.forEach(item => {
          textContent += ` - ${item}\n`;
        });
        textContent += `\n`;
      } else if (block.type === 'quote') {
        textContent += `"${block.text}"\n`;
        if (block.attribution) {
          textContent += ` -- ${block.attribution}\n`;
        }
        textContent += `\n`;
      }
    });

    textContent += `-------------------------\n`;
    textContent += `NURC MediaNext · Curated Intelligence Since 2002\n`;
    textContent += `Unauthorised distribution is prohibited. Confidential briefing for active subscribers.`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NURC_${nl.category}_Issue_${nl.issue.replace('#', '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Archive Hero Section */}
      <section className="py-16 border-b border-border" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: 'var(--nurc-gold)' }} />
            <span className="text-xs font-bold uppercase tracking-widest text-[#006D7A]" style={{ letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
              Corporate Intelligence Archive
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="mb-4 text-3xl md:text-5xl font-bold tracking-tight text-navy" style={{ fontFamily: 'var(--font-display)', color: 'var(--nurc-navy)', lineHeight: 1.2 }}>
                Analyst Briefings Index
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[560px]">
                Search and filter NURC's historical catalog of daily sector intelligence briefings. Log in to download full PDF formatted documents and view briefings under your active layout system.
              </p>
            </div>
            <Link
              to="/subscribe"
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 text-sm cursor-pointer"
              style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
            >
              Subscribe for Full Access
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Advanced Search & Filtering Accordion Bar */}
      <section className="border-b border-border bg-card sticky top-16 z-30 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          
          {/* Keyword Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground shrink-0" size={16} />
            <input
              type="text"
              placeholder="Search headlines, summaries, paragraphs or indicators (e.g. 'Electric Vehicles', 'SEBI', 'Apollo')..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring text-xs transition-all animate-none"
            />
          </div>

          {/* Selector Rows */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
            
            {/* Category / Industry Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full" style={{ scrollbarWidth: 'thin' }}>
              <Filter size={13} className="text-muted-foreground shrink-0" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="shrink-0 px-3 py-1 rounded-full font-bold transition-all border cursor-pointer"
                  style={{
                    background: activeCategory === cat ? 'var(--nurc-navy)' : 'transparent',
                    color: activeCategory === cat ? '#fff' : 'var(--nurc-navy)',
                    borderColor: activeCategory === cat ? 'var(--nurc-navy)' : 'var(--border)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-border hidden sm:block" />

            {/* Importance Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground font-semibold">Importance:</span>
              <div className="flex gap-1">
                {['All', 'High Impact', 'Normal'].map(imp => (
                  <button
                    key={imp}
                    onClick={() => setActiveImportance(imp)}
                    className="px-2.5 py-0.5 rounded font-bold transition-all border text-[11px] cursor-pointer"
                    style={{
                      background: activeImportance === imp ? 'var(--nurc-gold)' : 'transparent',
                      color: activeImportance === imp ? '#fff' : 'var(--nurc-navy)',
                      borderColor: activeImportance === imp ? 'var(--nurc-gold)' : 'var(--border)'
                    }}
                  >
                    {imp}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-4 w-px bg-border hidden sm:block" />

            {/* Year Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground font-semibold">Year:</span>
              <div className="flex gap-1">
                {years.map(yr => (
                  <button
                    key={yr}
                    onClick={() => setActiveYear(yr)}
                    className="px-2.5 py-0.5 rounded font-bold transition-all border text-[11px] cursor-pointer"
                    style={{
                      background: activeYear === yr ? 'var(--nurc-teal)' : 'transparent',
                      color: activeYear === yr ? '#fff' : 'var(--nurc-navy)',
                      borderColor: activeYear === yr ? 'var(--nurc-teal)' : 'var(--border)'
                    }}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-4 w-px bg-border hidden md:block" />

            {/* Month Selector Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground font-semibold">Month:</span>
              <select
                value={activeMonth}
                onChange={e => setActiveMonth(e.target.value)}
                className="border border-border rounded bg-background px-2 py-0.5 font-semibold text-[11px] cursor-pointer"
              >
                {months.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="h-4 w-px bg-border hidden lg:block" />

            {/* Time range selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground font-semibold">Range:</span>
              <select
                value={activeRange}
                onChange={e => setActiveRange(e.target.value)}
                className="border border-border rounded bg-background px-2 py-0.5 font-semibold text-[11px] cursor-pointer"
              >
                {timeRanges.map(tr => (
                  <option key={tr.value} value={tr.value}>{tr.label}</option>
                ))}
              </select>
            </div>

          </div>

        </div>
      </section>

      {/* Grid Archive View */}
      <section className="py-12 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-4 text-xs font-semibold text-muted-foreground flex justify-between items-center">
            <span>Showing {filtered.length} matching briefings</span>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-teal hover:underline font-bold" style={{ color: 'var(--nurc-teal)' }}>Clear Search</button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white border rounded-2xl p-8 space-y-3 animate-none">
              <p className="text-muted-foreground font-medium">No archived briefings matched your selected keyword or filter options.</p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setActiveYear('All');
                  setActiveMonth('All');
                  setActiveRange('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-muted text-navy cursor-pointer"
                style={{ color: 'var(--nurc-navy)' }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {filtered.map(nl => {
                const isSaved = savedArticles.includes(nl.id);
                const isHighImpact = getNewsletterImportance(nl) === 'High Impact';
                return (
                  <div
                    key={nl.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200"
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 24px rgba(0,0,0,0.06)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      {/* Accent strip */}
                      <div className="h-1" style={{ background: nl.color }} />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3.5">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded text-white shrink-0" style={{ background: nl.color }}>
                            {nl.category}
                          </span>
                          
                          {/* Importance Badge */}
                          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                            isHighImpact
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-50 text-slate-600 border border-slate-200'
                          }`}>
                            {isHighImpact ? '🔥 High Impact' : '📋 Briefing'}
                          </span>
                        </div>

                        <h3 className="font-bold text-base tracking-tight text-navy mb-2 line-clamp-1" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                          {nl.title}
                        </h3>

                        <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground font-semibold mb-4">
                          <span>{nl.date}</span>
                          <span>•</span>
                          <span>Issue {nl.issue}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-teal" style={{ color: 'var(--nurc-teal)' }}>
                            <Clock size={11} />
                            {nl.readTime} read
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                          {nl.summary}
                        </p>

                        <div className="space-y-1.5 mb-5 border-t border-border/50 pt-3">
                          {nl.highlights.slice(0, 2).map((h, hi) => (
                            <div key={hi} className="flex items-center gap-1.5 text-[11px] text-foreground font-medium">
                              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: nl.color }} />
                              <span className="truncate">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom action drawer */}
                    <div className="px-6 pb-6 pt-4 border-t border-border bg-muted/40 flex items-center justify-between gap-2">
                      <button
                        onClick={() => openReader(nl.article, nl.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90 shrink-0 cursor-pointer"
                        style={{ background: nl.color, fontFamily: 'var(--font-heading)' }}
                      >
                        <BookOpen size={13} />
                        Read Briefing
                      </button>
                      
                      <div className="flex gap-1">
                        <button
                          onClick={() => toggleSaveArticle(nl.id)}
                          className="p-2 border border-border rounded-lg text-muted-foreground hover:text-navy hover:bg-muted transition-all cursor-pointer bg-white"
                          title={isSaved ? 'Remove from bookmarks' : 'Save briefing'}
                        >
                          <Bookmark size={13} fill={isSaved ? 'currentColor' : 'none'} style={{ color: isSaved ? 'var(--nurc-teal)' : 'inherit' }} />
                        </button>
                        <button
                          onClick={() => handleShare(nl.id)}
                          className="p-2 border border-border rounded-lg text-muted-foreground hover:text-navy hover:bg-muted transition-all cursor-pointer bg-white"
                          title="Copy share link"
                        >
                          <Share2 size={13} style={{ color: copiedId === nl.id ? 'var(--nurc-teal)' : 'inherit' }} />
                        </button>
                        <button
                          onClick={() => handleDownload(nl.id)}
                          className="p-2 border border-border rounded-lg text-muted-foreground hover:text-navy hover:bg-muted transition-all cursor-pointer bg-white"
                          title="Download briefing file"
                        >
                          <Download size={13} />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
