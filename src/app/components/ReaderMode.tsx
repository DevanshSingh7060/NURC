import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { useReaderMode, ContentBlock, ReaderSettings } from './ReaderModeContext';
import { BookOpen, ArrowLeft, Printer, Bookmark, Share2, Download, X, Sun, Moon, Monitor } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NewsletterThemeRenderer } from './NewsletterThemeRenderer';

// Color configuration maps for the three Reading Comfort Modes (Independent of layout themes!)
const readingModeColors = {
  default: { bg: '#FAF9F6', text: '#1F2937', card: '#FFFFFF', border: '#E5E7EB', muted: '#4B5563' },
  night:   { bg: '#F4EAD7', text: '#3D352A', card: '#FAF4EB', border: '#EADFCB', muted: '#7A6D5C' },
  dark:    { bg: '#111111', text: '#F5F5F5', card: '#1C1C1E', border: '#2C2C2E', muted: '#8E8E93' },
};

const fontSizeMap: Record<ReaderSettings['fontSize'], string> = {
  small:  '15px',
  medium: '17px',
  large:  '19px',
};

// Line spacing is locked to standard/default (controls removed from UI completely)
const lineHeight = '1.65';

export function ReaderModeOverlay() {
  const { isOpen, article, newsletterId, settings, closeReader, updateSettings } = useReaderMode();
  const { savedArticles, toggleSaveArticle, currentUser, setContinueReading, markAsRead, newsletters } = useApp();
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Track scroll position dynamically with requestAnimationFrame and ResizeObserver
  useEffect(() => {
    const el = contentRef.current;
    if (!el || !isOpen || !newsletterId) return;

    let frameId: number;

    const handleScrollEvent = (e?: Event) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        let scrollTarget: any = null;
        
        if (e && e.target) {
          scrollTarget = e.target;
          if (scrollTarget === document) {
            scrollTarget = document.documentElement || document.body;
          }
        }

        const rootEl = document.getElementById('root');
        
        const targets = [
          {
            name: 'element',
            el: el,
            scrollTop: el.scrollTop || 0,
            scrollHeight: el.scrollHeight || 0,
            clientHeight: el.clientHeight || 0
          },
          {
            name: 'window',
            el: document.documentElement || document.body,
            scrollTop: window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            scrollHeight: document.documentElement.scrollHeight || document.body.scrollHeight || 0,
            clientHeight: document.documentElement.clientHeight || window.innerHeight || 0
          },
          {
            name: 'root',
            el: rootEl,
            scrollTop: rootEl?.scrollTop || 0,
            scrollHeight: rootEl?.scrollHeight || 0,
            clientHeight: rootEl?.clientHeight || 0
          }
        ];

        let activeTarget = null;
        if (scrollTarget) {
          if (scrollTarget === el) {
            activeTarget = targets[0];
          } else if (scrollTarget === rootEl) {
            activeTarget = targets[2];
          } else {
            activeTarget = {
              name: scrollTarget.id || scrollTarget.className || 'event-target',
              el: scrollTarget,
              scrollTop: scrollTarget.scrollTop || 0,
              scrollHeight: scrollTarget.scrollHeight || 0,
              clientHeight: scrollTarget.clientHeight || 0
            };
          }
        }

        if (!activeTarget || activeTarget.scrollHeight <= activeTarget.clientHeight) {
          activeTarget = targets[0]; // Default to element
          for (const target of targets) {
            if (target.scrollHeight > target.clientHeight && target.scrollTop > 0) {
              activeTarget = target;
              break;
            }
          }
          if (activeTarget.scrollTop === 0) {
            const scrollableTargets = targets.filter(t => t.scrollHeight > t.clientHeight + 10);
            if (scrollableTargets.length > 0) {
              activeTarget = scrollableTargets[0];
            }
          }
        }

        const { scrollTop, scrollHeight, clientHeight } = activeTarget;
        const scrollableHeight = scrollHeight - clientHeight;
        
        let pct = 0;
        if (scrollableHeight <= 0) {
          pct = 100; // Fallback Protection
        } else {
          const isAtBottom = Math.abs(scrollableHeight - scrollTop) < 10;
          pct = isAtBottom ? 100 : (scrollTop / scrollableHeight) * 100;
        }

        const roundedPct = Math.min(100, Math.max(0, pct));
        
        // Debug Logging
        console.log(`[ReaderMode Scroll Debug] Container: ${activeTarget.name} | ScrollTop: ${scrollTop} | ScrollHeight: ${scrollHeight} | ClientHeight: ${clientHeight} | ScrollableHeight: ${scrollableHeight} | Progress: ${roundedPct}%`);

        setProgress(roundedPct);
        
        localStorage.setItem(`nurc_scroll_pos_${newsletterId}`, scrollTop.toString());
        localStorage.setItem(`nurc_scroll_pct_${newsletterId}`, roundedPct.toString());
      });
    };

    el.addEventListener('scroll', handleScrollEvent, { passive: true });
    window.addEventListener('resize', handleScrollEvent, { passive: true });
    document.addEventListener('scroll', handleScrollEvent, { passive: true });
    if (document.body) document.body.addEventListener('scroll', handleScrollEvent, { passive: true });

    const rootEl = document.getElementById('root');
    if (rootEl) rootEl.addEventListener('scroll', handleScrollEvent, { passive: true });

    // Initial check & auto-restoration
    const savedPos = localStorage.getItem(`nurc_scroll_pos_${newsletterId}`);
    if (savedPos) {
      const scrollTop = parseFloat(savedPos);
      el.scrollTop = scrollTop;
    }
    
    handleScrollEvent();
    const t1 = setTimeout(handleScrollEvent, 100);
    const t2 = setTimeout(handleScrollEvent, 300);
    const t3 = setTimeout(handleScrollEvent, 600);

    // ResizeObserver tracks height shifts due to font-size updates or screen width resizes
    const resizeObserver = new ResizeObserver(() => {
      handleScrollEvent();
    });
    resizeObserver.observe(el);
    if (el.firstElementChild) {
      resizeObserver.observe(el.firstElementChild);
    }
    if (rootEl) resizeObserver.observe(rootEl);

    return () => {
      el.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('resize', handleScrollEvent);
      document.removeEventListener('scroll', handleScrollEvent);
      if (document.body) document.body.removeEventListener('scroll', handleScrollEvent);
      if (rootEl) rootEl.removeEventListener('scroll', handleScrollEvent);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [isOpen, newsletterId, settings.fontSize, article]);

  // Set continue reading indicators on mount/activation
  useEffect(() => {
    if (isOpen && newsletterId) {
      setContinueReading(newsletterId);
      markAsRead(newsletterId);
    }
  }, [isOpen, newsletterId, setContinueReading, markAsRead]);

  // Touch Swipe Handlers for Next/Prev briefings (Swipe Left/Right)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    if (Math.abs(diffX) > 85 && newsletterId && newsletters) {
      const activeIndex = newsletters.findIndex(n => n.id === newsletterId);
      if (activeIndex !== -1) {
        if (diffX > 0) {
          // Swipe Left: Next Newsletter
          const nextIndex = (activeIndex + 1) % newsletters.length;
          const nextNewsletter = newsletters[nextIndex];
          if (nextNewsletter) {
            useReaderMode().openReader(nextNewsletter.article, nextNewsletter.id);
          }
        } else {
          // Swipe Right: Previous Newsletter
          const prevIndex = (activeIndex - 1 + newsletters.length) % newsletters.length;
          const prevNewsletter = newsletters[prevIndex];
          if (prevNewsletter) {
            useReaderMode().openReader(prevNewsletter.article, prevNewsletter.id);
          }
        }
      }
    }
  };

  if (!isOpen || !article) return null;

  const fontSize = fontSizeMap[settings.fontSize || 'medium'];
  const activeTheme = currentUser?.theme || 'Original';
  const isSaved = newsletterId ? savedArticles.includes(newsletterId) : false;

  // Retrieve comfort colors mapping
  const modeColors = readingModeColors[settings.readingMode || 'default'];

  // Identify active newsletter and load takeaways
  const activeNewsletter = newsletters.find(n => n.id === newsletterId);
  const highlights = activeNewsletter?.highlights || [
    'Policy adjustments shaping market segment outcomes.',
    'Analyst indicators tracking competitor expansion pipelines.',
    'Macroeconomic corporate statistics driving Q3 executive choices.'
  ];

  const DEVELOPMENT_MODE = true;
  const isGuest = DEVELOPMENT_MODE ? !currentUser : (!currentUser || currentUser.plan === 'None');

  const handleShare = () => {
    const url = newsletterId 
      ? `${window.location.origin}/reader/${newsletterId}`
      : window.location.href;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!article) return;
    
    let textContent = `NURC MEDIANEXT BRIEFING\n`;
    textContent += `=========================\n`;
    textContent += `Title: ${article.title}\n`;
    textContent += `Sector: ${article.category}\n`;
    textContent += `Date: ${article.date}\n`;
    textContent += `Read Time: ${article.readTime}\n\n`;

    article.content.forEach(block => {
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
    link.download = `NURC_${article.category}_Issue_${article.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const decreaseFontSize = () => {
    if (settings.fontSize === 'large') updateSettings({ fontSize: 'medium' });
    else if (settings.fontSize === 'medium') updateSettings({ fontSize: 'small' });
  };

  const increaseFontSize = () => {
    if (settings.fontSize === 'small') updateSettings({ fontSize: 'medium' });
    else if (settings.fontSize === 'medium') updateSettings({ fontSize: 'large' });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col transition-all duration-300"
      style={{ background: modeColors.bg, fontFamily: 'var(--font-body)' }}
      id="reader-outer-wrapper"
    >
      <style>{`
        #reader-outer-wrapper {
          background-color: ${modeColors.bg} !important;
          color: ${modeColors.text} !important;
        }
        #reader-content-wrapper p,
        #reader-content-wrapper li,
        #reader-content-wrapper li span,
        #reader-content-wrapper span,
        #reader-content-wrapper blockquote,
        #reader-content-wrapper cite,
        #reader-content-wrapper font,
        #reader-content-wrapper strong,
        #reader-content-wrapper h1,
        #reader-content-wrapper h2,
        #reader-content-wrapper h3 {
          color: ${modeColors.text} !important;
        }
        #reader-content-wrapper p {
          font-size: ${fontSize} !important;
          line-height: ${lineHeight} !important;
        }
        #reader-content-wrapper li span {
          font-size: ${fontSize} !important;
          line-height: ${lineHeight} !important;
        }
        #reader-content-wrapper li {
          line-height: ${lineHeight} !important;
        }
        #reader-content-wrapper > div {
          background-color: ${modeColors.bg} !important;
          border-color: ${modeColors.border} !important;
          box-shadow: none !important;
        }
        #reader-content-wrapper .bg-white,
        #reader-content-wrapper .bg-gray-50,
        #reader-content-wrapper .bg-\\[\\#F8F9FA\\],
        #reader-content-wrapper .bg-\\[\\#FCF8F2\\],
        #reader-content-wrapper .bg-gradient-to-r {
          background: ${modeColors.card} !important;
          color: ${modeColors.text} !important;
          border-color: ${modeColors.border} !important;
        }
        #reader-content-wrapper border,
        #reader-content-wrapper div {
          border-color: ${modeColors.border} !important;
        }
        #reader-content-wrapper .text-muted-foreground,
        #reader-content-wrapper .text-gray-500,
        #reader-content-wrapper .text-gray-600 {
          color: ${modeColors.muted} !important;
        }
        @media (max-width: 640px) {
          #reader-content-wrapper {
            padding-left: 16px !important;
            padding-right: 16px !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div className="fixed top-0 left-0 right-0 h-1 shrink-0 z-50" style={{ background: modeColors.border }}>
        <div
          className="h-full transition-all duration-150"
          style={{ width: `${progress}%`, background: 'var(--nurc-teal)' }}
        />
      </div>

      <div
        className="shrink-0 flex items-center justify-between px-3 sm:px-5 py-3 border-b mt-1 print:hidden gap-1.5 transition-all duration-300"
        style={{ borderColor: modeColors.border, background: modeColors.bg }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <button
            onClick={closeReader}
            className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70 shrink-0 cursor-pointer bg-transparent border-0"
            style={{ color: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
            aria-label="Exit reader mode"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Exit</span>
          </button>
          <div className="h-4 w-px hidden sm:block" style={{ background: modeColors.border }} />
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs sm:text-sm font-bold truncate pr-1" style={{ color: modeColors.text, fontFamily: 'var(--font-heading)' }}>
              {article.title}
            </span>
            <span className="hidden md:inline text-[10px] sm:text-xs font-semibold shrink-0" style={{ color: modeColors.muted, fontFamily: 'var(--font-heading)' }}>
              · {article.readTime} · {Math.round(progress)}% Read
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-[#E5E7EB] p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-gray-300 transition-all shrink-0">
            {(['default', 'night', 'dark'] as const).map(mode => {
              const isActive = settings.readingMode === mode;
              const isHovered = hoveredMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => updateSettings({ readingMode: mode })}
                  onMouseEnter={() => setHoveredMode(mode)}
                  onMouseLeave={() => setHoveredMode(null)}
                  className="px-1.5 sm:px-3 py-1 rounded-md sm:rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1 border-0"
                  style={{
                    backgroundColor: isActive 
                      ? '#FFFFFF' 
                      : isHovered 
                        ? '#F3F4F6' 
                        : 'transparent',
                    color: isActive 
                      ? '#0A2540' 
                      : isHovered 
                        ? '#1F2937' 
                        : '#4B5563',
                    fontWeight: isActive ? 600 : 500,
                    boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.15)' : 'none',
                  }}
                  title={`Switch to ${mode} mode`}
                >
                  {mode === 'default' && <Sun size={13} className="shrink-0" />}
                  {mode === 'night' && <Moon size={13} className="shrink-0" />}
                  {mode === 'dark' && <Monitor size={13} className="shrink-0" />}
                  <span className="hidden sm:inline">
                    {mode === 'default' ? 'Default' : mode === 'night' ? 'Night' : 'Dark'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="h-4 w-px" style={{ background: modeColors.border }} />

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={decreaseFontSize}
              disabled={settings.fontSize === 'small'}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center text-xs font-bold transition-all hover:bg-black/5 cursor-pointer bg-transparent disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ color: modeColors.text, borderColor: modeColors.border }}
              title="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={increaseFontSize}
              disabled={settings.fontSize === 'large'}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center text-xs font-bold transition-all hover:bg-black/5 cursor-pointer bg-transparent disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ color: modeColors.text, borderColor: modeColors.border }}
              title="Increase text size"
            >
              A+
            </button>
          </div>

          <div className="h-4 w-px" style={{ background: modeColors.border }} />

          {newsletterId && (
            <button
              onClick={() => toggleSaveArticle(newsletterId)}
              className="p-1.5 sm:p-2 rounded-lg border transition-all hover:bg-black/5 cursor-pointer bg-transparent"
              style={{
                borderColor: isSaved ? 'var(--nurc-teal)' : modeColors.border,
                color: isSaved ? 'var(--nurc-teal)' : modeColors.muted,
                background: isSaved ? 'rgba(0,109,122,0.03)' : 'transparent'
              }}
              title={isSaved ? 'Remove Bookmark' : 'Save Briefing'}
            >
              <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          )}

          <button
            onClick={handleDownload}
            className="p-1.5 sm:p-2 rounded-lg border transition-all hover:bg-black/5 cursor-pointer bg-transparent"
            style={{ color: modeColors.text, borderColor: modeColors.border }}
            title="Download text brief"
          >
            <Download size={14} />
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 sm:p-2 rounded-lg border transition-all hover:bg-black/5 cursor-pointer bg-transparent flex items-center gap-1 sm:gap-1.5 text-xs font-bold"
            style={{ color: modeColors.text, borderColor: modeColors.border }}
            title="Copy share link"
          >
            <Share2 size={14} />
            <span className="hidden md:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={closeReader}
            className="p-1 sm:p-2 rounded-lg transition-opacity hover:opacity-70 cursor-pointer bg-transparent border-0"
            style={{ color: modeColors.muted }}
            aria-label="Close reader"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto pb-20 sm:pb-10" 
        ref={contentRef} 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="max-w-[800px] mx-auto px-6 py-14" id="reader-content-wrapper">
          
          <div 
            className="rounded-2xl p-6 mb-8 text-left space-y-3.5 border shadow-sm"
            style={{ 
              background: settings.readingMode === 'dark' ? '#1C1C1E' : 'rgba(212,183,143,0.06)', 
              borderColor: settings.readingMode === 'dark' ? '#2C2C2E' : 'var(--nurc-gold)' 
            }}
          >
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--nurc-gold)' }}>
              ★ Key Intelligence Takeaways
            </div>
            <ul className="space-y-2">
              {highlights.map((h, i) => (
                <li key={i} className="text-xs font-semibold leading-relaxed flex items-start gap-2 text-gray-800" style={{ color: modeColors.text }}>
                  <span className="shrink-0 mt-1" style={{ color: 'var(--nurc-gold)' }}>•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            {!isGuest && (
              <button
                onClick={() => {
                  const el = document.getElementById('full-briefing-start');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-2 text-xs font-bold hover:underline flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
                style={{ color: 'var(--nurc-teal)' }}
              >
                Read Full Intelligence Brief ↓
              </button>
            )}
          </div>
          <div id="full-briefing-start" />

          {isGuest ? (
            <div className="space-y-6">
              <div className="space-y-3 text-left">
                <h2 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--nurc-teal)' }}>
                  {article.content[0]?.heading || '01 · PREVIEW BRIEF'}
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-gray-700 font-medium">
                  {article.content[0]?.text || 'India\'s macro economic margins showed a structural expansion...'}
                </p>
              </div>

              <div className="relative pt-8 pb-24 border-t border-dashed border-gray-200 mt-8">
                <div className="select-none pointer-events-none opacity-20 filter blur-[4.5px] space-y-8 text-left">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3" />
                    <div className="h-3 bg-gray-300 rounded w-full" />
                    <div className="h-3 bg-gray-300 rounded w-5/6" />
                  </div>
                  <div className="space-y-2 bg-gray-50 p-6 rounded-2xl border">
                    <div className="h-4 bg-gray-300 rounded w-1/4" />
                    <div className="h-3 bg-gray-300 rounded w-full" />
                    <div className="h-3 bg-gray-300 rounded w-full" />
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-transparent via-transparent to-transparent">
                  <div className="max-w-md space-y-4 bg-white border border-gray-100 p-8 rounded-3xl shadow-2xl relative z-10">
                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto text-[var(--nurc-teal)] shadow-sm">
                      <span className="font-bold text-lg">🔒</span>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-sm text-navy uppercase tracking-wider" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                        Unlock Full Intelligence
                      </h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xs mx-auto">
                        You are viewing a complimentary preview briefing. Subscribe to NURC MediaNext to unlock daily C-Suite editions, full analyst libraries, and custom sector tracking models.
                      </p>
                    </div>
                    <div className="flex gap-2.5 pt-2">
                      <Link
                        to="/signup"
                        onClick={closeReader}
                        className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white text-center cursor-pointer shadow-sm border-0 transition-opacity hover:opacity-90"
                        style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
                      >
                        Create Account
                      </Link>
                      <Link
                        to="/pricing"
                        onClick={closeReader}
                        className="flex-1 py-2.5 border border-border text-navy rounded-xl text-xs font-bold text-center cursor-pointer hover:bg-gray-50 transition-colors"
                        style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}
                      >
                        View B2B Plans
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NewsletterThemeRenderer article={article} theme={activeTheme} />
          )}

        </div>
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 py-3 px-6 flex items-center justify-around shadow-xl">
        {newsletterId && (
          <button
            onClick={() => toggleSaveArticle(newsletterId)}
            className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-gray-500 hover:text-navy bg-transparent border-0 cursor-pointer"
          >
            <Bookmark size={14} fill={isSaved ? 'var(--nurc-teal)' : 'none'} style={{ color: isSaved ? 'var(--nurc-teal)' : 'inherit' }} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        )}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-gray-500 hover:text-navy bg-transparent border-0 cursor-pointer"
        >
          <Share2 size={14} style={{ color: copied ? 'var(--nurc-teal)' : 'inherit' }} />
          <span>Share</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-gray-500 hover:text-navy bg-transparent border-0 cursor-pointer"
        >
          <Download size={14} />
          <span>Download</span>
        </button>
        <button
          onClick={closeReader}
          className="flex flex-col items-center gap-0.5 text-[9px] font-bold text-red-500 bg-transparent border-0 cursor-pointer"
        >
          <X size={14} />
          <span>Exit</span>
        </button>
      </div>

      {isGuest && (
        <div 
          className="hidden md:flex fixed bottom-6 right-6 z-40 bg-white border border-border rounded-2xl p-5 shadow-2xl items-center justify-between gap-5 max-w-md animate-fadeIn" 
          style={{ borderLeft: '4px solid var(--nurc-teal)' }}
        >
          <div>
            <h5 className="font-bold text-xs text-navy uppercase tracking-wider" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
              Unlock B2B Intelligence
            </h5>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal max-w-[240px]">
              Subscribe to NURC MediaNext for daily C-Suite industry dispatches across all critical segments.
            </p>
          </div>
          <button
            onClick={() => {
              closeReader();
              window.location.hash = '/subscribe';
            }}
            className="px-4 py-2.5 rounded-lg text-xs font-bold text-white shrink-0 cursor-pointer border-0 shadow-sm"
            style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
}

export function SharePromptCard() {
  const { showSharePrompt, dismissSharePrompt, article } = useReaderMode();

  if (!showSharePrompt || !article) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 rounded-2xl p-5 w-72 border border-border print:hidden"
      style={{
        background: '#FFFFFF',
        boxShadow: '0 12px 40px rgba(0,0,0,0.14)',
        animation: 'none',
      }}
    >
      <button
        onClick={dismissSharePrompt}
        className="absolute top-3 right-3 p-1 rounded hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0"
        style={{ color: 'var(--muted-foreground)' }}
      >
        <X size={14} />
      </button>
      <p
        className="font-semibold mb-1 text-left"
        style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--nurc-navy)', paddingRight: '20px' }}
      >
        Found this useful?
      </p>
      <p className="text-muted-foreground mb-4 text-left" style={{ fontSize: '13px', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
        Share this sample with a colleague or subscribe for weekly access.
      </p>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            dismissSharePrompt();
          }}
          className="btn-nurc w-full py-2 rounded-lg text-sm font-semibold text-white transition-all cursor-pointer"
          style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
        >
          Copy Sample Link
        </button>
        <button
          onClick={dismissSharePrompt}
          className="btn-nurc w-full py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer"
          style={{ borderColor: 'var(--border)', color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
}
