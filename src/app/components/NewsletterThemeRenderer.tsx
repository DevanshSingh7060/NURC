import React from 'react';
import { Article } from '../data/newslettersData';
import { Quote, BarChart3, Newspaper, Award, Briefcase } from 'lucide-react';

interface Props {
  article: Article;
  theme: 'Original' | 'Executive' | 'FT' | 'Modern' | 'Corporate';
}

export const NewsletterThemeRenderer: React.FC<Props> = ({ article, theme }) => {
  
  // 1. Original Theme
  if (theme === 'Original') {
    return (
      <div className="bg-[#FAF9F6] text-[#1A1A1A] p-8 md:p-12 rounded-2xl border border-[#E5E7EB] shadow-sm max-w-[800px] mx-auto transition-all" style={{ fontFamily: 'var(--font-body)' }}>
        {/* Header */}
        <div className="border-b border-[#E5E7EB] pb-6 mb-8 text-center md:text-left">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white" style={{ background: 'var(--nurc-teal)' }}>
            {article.category}
          </span>
          <h1 className="mt-4 mb-2 text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--nurc-navy)' }}>
            {article.title}
          </h1>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {article.date} · {article.readTime}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {article.content.map((block, idx) => {
            if (block.type === 'section') {
              return (
                <div key={idx} className="space-y-3">
                  {block.heading && (
                    <h2 className="text-sm font-bold uppercase tracking-wider border-l-2 pl-3" style={{ color: 'var(--nurc-teal)', borderColor: 'var(--nurc-gold)' }}>
                      {block.heading} {block.tag && `· ${block.tag}`}
                    </h2>
                  )}
                  <p className="text-sm md:text-base leading-relaxed text-[#374151]">
                    {block.text}
                  </p>
                </div>
              );
            }
            if (block.type === 'data') {
              return (
                <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-6 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] flex items-center gap-1.5">
                    <BarChart3 size={13} style={{ color: 'var(--nurc-teal)' }} />
                    {block.heading || 'Intelligence Data Pool'}
                  </h3>
                  <ul className="space-y-2">
                    {block.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#374151] leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: 'var(--nurc-teal)' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            if (block.type === 'quote') {
              return (
                <div key={idx} className="border-l-4 pl-6 py-2 italic my-6" style={{ borderColor: 'var(--nurc-gold)' }}>
                  <p className="text-lg md:text-xl font-medium leading-relaxed" style={{ fontFamily: 'var(--font-display)', color: 'var(--nurc-navy)' }}>
                    "{block.text}"
                  </p>
                  {block.attribution && (
                    <cite className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2 not-italic">
                      — {block.attribution}
                    </cite>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  // 2. Executive Brief (McKinsey minimal style)
  if (theme === 'Executive') {
    return (
      <div className="bg-white text-[#111111] p-8 md:p-12 rounded-xl border border-gray-100 max-w-[800px] mx-auto transition-all" style={{ fontFamily: 'var(--font-heading)' }}>
        {/* Header */}
        <div className="border-b-2 border-[#0A2540] pb-6 mb-8">
          <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-2">
            NURC EXECUTIVE BRIEFING · {article.category.toUpperCase()}
          </div>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-2" style={{ fontFamily: 'var(--font-display)', color: '#0A2540' }}>
            {article.title}
          </h1>
          <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
            {article.date} · Curated for Board Members
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10">
          {article.content.map((block, idx) => {
            if (block.type === 'section') {
              return (
                <div key={idx} className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#0A2540] md:pt-1">
                      {block.heading || 'Briefing'}
                    </h2>
                    {block.tag && (
                      <span className="text-[10px] text-muted-foreground font-semibold block mt-1 uppercase">
                        {block.tag}
                      </span>
                    )}
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-sm md:text-[15px] leading-relaxed font-light text-[#222222]">
                      {block.text}
                    </p>
                  </div>
                </div>
              );
            }
            if (block.type === 'data') {
              return (
                <div key={idx} className="grid md:grid-cols-4 gap-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <div className="md:col-span-1">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0A2540] flex items-center gap-1">
                      <Award size={12} />
                      Metrics
                    </h3>
                  </div>
                  <div className="md:col-span-3">
                    <ul className="space-y-3">
                      {block.items?.map((item, i) => (
                        <li key={i} className="text-sm font-light text-[#333333] leading-relaxed">
                          <strong>{item.split(':')[0]}:</strong>{item.split(':')[1] || ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
            if (block.type === 'quote') {
              return (
                <div key={idx} className="grid md:grid-cols-4 gap-4 my-6">
                  <div className="md:col-span-1"></div>
                  <div className="md:col-span-3 border-l border-gray-300 pl-6 py-1">
                    <p className="text-base font-light italic leading-relaxed text-[#0A2540]">
                      "{block.text}"
                    </p>
                    {block.attribution && (
                      <span className="block text-xs font-bold text-muted-foreground mt-2 uppercase tracking-wider">
                        {block.attribution}
                      </span>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  // 3. Financial Times Theme (Soft Beige Newspaper Layout)
  if (theme === 'FT') {
    return (
      <div className="bg-[#FAF4EB] text-[#2B2927] p-8 md:p-12 rounded-2xl border-2 border-[#EADFCB] shadow-sm max-w-[800px] mx-auto transition-all" style={{ fontFamily: 'Georgia, serif' }}>
        {/* Header */}
        <div className="border-b-4 border-double border-[#2B2927] pb-6 mb-8 text-center">
          <div className="text-[11px] font-bold tracking-widest uppercase mb-1 flex items-center justify-center gap-1 text-[#5E2B25]">
            <Newspaper size={12} />
            NURC ANALYST BRIEFING · {article.category.toUpperCase()}
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight my-4" style={{ color: '#2B2927' }}>
            {article.title}
          </h1>
          <div className="text-xs italic text-[#555] uppercase tracking-wider">
            {article.date} · Published in London & Mumbai
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {article.content.map((block, idx) => {
            if (block.type === 'section') {
              return (
                <div key={idx} className="space-y-3 pb-6 border-b border-[#EADFCB] last:border-0 last:pb-0">
                  {block.heading && (
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#5E2B25] flex items-center gap-1.5">
                      {block.heading} {block.tag && `/ ${block.tag}`}
                    </h2>
                  )}
                  <p className="text-sm md:text-[15px] leading-relaxed text-[#3C3A38]">
                    {block.text}
                  </p>
                </div>
              );
            }
            if (block.type === 'data') {
              return (
                <div key={idx} className="border-2 border-[#2B2927] p-6 my-6 bg-[#FCF8F2] space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#5E2B25] text-center border-b border-[#2B2927] pb-2">
                    FINANCIAL INTELLIGENCE REPORT
                  </h3>
                  <ul className="divide-y divide-[#EADFCB]">
                    {block.items?.map((item, i) => (
                      <li key={i} className="py-2 flex items-start justify-between gap-4 text-xs text-[#3C3A38] font-mono leading-normal">
                        <span>{item.split(':')[0]}</span>
                        <span className="font-bold text-right shrink-0">{item.split(':')[1] || '✓'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            if (block.type === 'quote') {
              return (
                <div key={idx} className="text-center py-6 my-6 border-y border-[#EADFCB]">
                  <p className="text-lg md:text-xl font-semibold italic text-[#5E2B25]">
                    "{block.text}"
                  </p>
                  {block.attribution && (
                    <cite className="block text-xs font-bold uppercase mt-2 not-italic text-[#2B2927]">
                      — {block.attribution}
                    </cite>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  // 4. Modern Intelligence Theme (Morning Brew Inspired Cards)
  if (theme === 'Modern') {
    return (
      <div className="bg-[#FFFFFF] text-[#2D3748] p-6 md:p-8 rounded-3xl border border-gray-200 max-w-[800px] mx-auto shadow-md transition-all" style={{ fontFamily: 'var(--font-heading)' }}>
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-teal-700 to-[#0A2540] text-white p-6 rounded-2xl mb-8 text-center">
          <div className="inline-block bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            ⚡ {article.category}
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
            {article.title}
          </h1>
          <p className="text-xs mt-2 text-teal-100 font-medium">
            {article.date} · {article.readTime} reading time
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {article.content.map((block, idx) => {
            if (block.type === 'section') {
              return (
                <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition-all">
                  {block.heading && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-5 bg-teal-600 rounded-full shrink-0" />
                      <h2 className="text-sm font-bold uppercase tracking-wider text-[#0A2540]">
                        {block.heading} {block.tag && `· ${block.tag}`}
                      </h2>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed text-gray-700">
                    {block.text}
                  </p>
                </div>
              );
            }
            if (block.type === 'data') {
              return (
                <div key={idx} className="bg-[#E0E7E3]/30 border border-[#E0E7E3] rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-2">
                    🎯 Quick Scanning Stats
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {block.items?.map((item, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 text-xs shadow-sm">
                        <span className="font-semibold text-gray-800 block mb-1">
                          {item.split(':')[0]}
                        </span>
                        <span className="text-teal-600 font-bold">
                          {item.split(':')[1] || 'Key Indicator'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            if (block.type === 'quote') {
              return (
                <div key={idx} className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 my-4 text-center">
                  <p className="text-base font-semibold italic text-amber-900">
                    "{block.text}"
                  </p>
                  {block.attribution && (
                    <cite className="block text-xs font-bold text-amber-700 mt-2 not-italic">
                      — {block.attribution}
                    </cite>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  // 5. Corporate Digest Theme (High Density layout for Analysts)
  return (
    <div className="bg-[#F8F9FA] text-[#212529] p-6 rounded-lg border border-[#DEE2E6] max-w-[800px] mx-auto transition-all" style={{ fontFamily: 'monospace, sans-serif' }}>
      {/* Header */}
      <div className="border-b border-[#212529] pb-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground gap-2">
          <span>CATALOG: {article.category}</span>
          <span>DATE: {article.date}</span>
        </div>
        <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight mt-2 text-black leading-none">
          {article.title}
        </h1>
        <div className="text-[10px] text-muted-foreground mt-1">
          NURC RAW INTELLIGENCE FEED · ID: {article.category.slice(0,3).toUpperCase()}-DIGEST
        </div>
      </div>

      {/* Bulleted summary for quick analyst scan */}
      <div className="bg-white border border-[#DEE2E6] p-4 mb-6 rounded">
        <div className="text-xs font-bold uppercase tracking-widest text-[#0A2540] mb-2 border-b pb-1">
          CORE INTELLIGENCE SUMMARY
        </div>
        <ul className="list-disc pl-4 text-xs space-y-1 text-[#212529]">
          {article.content.filter(b => b.type === 'section').map((block, i) => (
            <li key={i}>
              <strong>{block.heading}:</strong> {block.text?.slice(0, 100)}...
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {article.content.map((block, idx) => {
          if (block.type === 'section') {
            return (
              <div key={idx} className="space-y-1">
                {block.heading && (
                  <h2 className="text-xs font-black uppercase tracking-wider text-black">
                    [{block.heading}] {block.tag && `/ [${block.tag}]`}
                  </h2>
                )}
                <p className="text-xs md:text-sm leading-relaxed text-[#212529]">
                  {block.text}
                </p>
              </div>
            );
          }
          if (block.type === 'data') {
            return (
              <div key={idx} className="bg-white border border-[#DEE2E6] p-4 rounded space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-black">
                  [DATA POOL DATA_ARRAY]
                </h3>
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-1.5">
                  {block.items?.map((item, i) => (
                    <div key={i} className="text-xs flex items-start gap-1 font-mono">
                      <span className="text-[#006D7A] font-bold">»</span>
                      <span className="text-[#333]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          if (block.type === 'quote') {
            return (
              <div key={idx} className="bg-white border-l-2 border-[#0A2540] p-4 rounded text-xs italic text-[#333]">
                <p>"{block.text}"</p>
                {block.attribution && (
                  <div className="text-[10px] font-bold mt-2 uppercase tracking-wide font-mono not-italic text-black">
                    SOURCE: {block.attribution}
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
