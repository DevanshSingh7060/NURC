import React from 'react';
import { Article } from '../data/newslettersData';
import { Quote, BarChart3, Newspaper, Award, Briefcase } from 'lucide-react';

interface Props {
  article: Article;
  theme: 'Original' | 'Executive' | 'FT' | 'Modern' | 'Corporate';
}

export const NewsletterThemeRenderer: React.FC<Props> = ({ article }) => {
  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] p-8 md:p-12 rounded-xl border border-[#E5E7EB] shadow-sm max-w-[800px] mx-auto transition-all font-body">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-6 mb-8 text-center md:text-left">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-nurc-teal">
          {article.category}
        </span>
        <h1 className="mt-4 mb-2 text-3xl md:text-4xl font-bold leading-tight font-display text-nurc-navy">
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
                  <h2 className="text-sm font-bold uppercase tracking-wider border-l-2 pl-3 text-nurc-teal border-nurc-gold">
                    {block.heading} {block.tag && `· ${block.tag}`}
                  </h2>
                )}
                <p className="text-sm md:text-base leading-relaxed text-[#374151]">{block.text}</p>
              </div>
            );
          }
          if (block.type === 'data') {
            return (
              <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-6 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] flex items-center gap-1.5">
                  <BarChart3 size={13} className="text-nurc-teal" />
                  {block.heading || 'Intelligence Data Pool'}
                </h3>
                <ul className="space-y-2">
                  {block.items?.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[#374151] leading-relaxed"
                    >
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2 bg-nurc-teal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          if (block.type === 'quote') {
            return (
              <div key={idx} className="border-l-4 pl-6 py-2 italic my-6 border-nurc-gold">
                <p className="text-lg md:text-xl font-medium leading-relaxed font-display text-nurc-navy">
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
};
