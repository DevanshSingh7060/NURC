import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router';
import { useApp, Subscriber } from '../context/AppContext';
import { useReaderMode } from './ReaderModeContext';
import { useLeadModal } from '../context/LeadModalContext';
import { NewsletterThemeRenderer } from './NewsletterThemeRenderer';
import { User, Briefcase, FileText, Settings, Bookmark, CheckCircle, Bell, ArrowRight, Star, RefreshCw, BookOpen, Clock, Layout, HelpCircle } from 'lucide-react';

const SAMPLE_PREVIEW_ARTICLE = {
  title: 'India Macro Intelligence Briefing',
  subtitle: 'Daily Corporate Briefing · May 30, 2026',
  category: 'Macro Economics',
  date: 'May 30, 2026',
  readTime: '3 min read',
  content: [
    {
      type: 'section' as const,
      heading: 'EXECUTIVE SUMMARY',
      tag: 'Market Dynamics',
      text: `India's corporate margins showed a structural expansion of +120 basis points in Q1 FY26. The improvement was driven by softer commodity input prices, optimized domestic logistics operations, and steady volume gains in core middle-income urban markets.`
    },
    {
      type: 'data' as const,
      heading: 'KEY MARKET METRICS',
      tag: 'Macro Statistics',
      items: [
        'Urban consumption growth: +8.4% YoY',
        'Private investment growth: +11.2% YoY',
        'Core inflation baseline: 4.8% held steady'
      ]
    },
    {
      type: 'quote' as const,
      text: 'The tailwinds supporting domestic earnings remain strong. High-single-digit volume growth will likely sustain across consumer products, financial services, and mobility sectors through Q3.',
      attribution: 'NURC Global Research Board, Macroeconomics Division'
    }
  ]
};

export function DashboardPage() {
  const { openReader } = useReaderMode();
  const { openDemoModal, openCoverageModal } = useLeadModal();
  const {
    currentUser,
    newsletters,
    savedArticles,
    readArticles,
    continueReading,
    updateProfile,
    updateCompany,
    updatePreferences,
    updateTheme,
    updateSubscription,
    toggleSaveArticle
  } = useApp();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab');
  const activeTab = (activeTabParam === 'overview' || activeTabParam === 'preferences' || activeTabParam === 'profile')
    ? activeTabParam
    : 'overview';

  const setActiveTab = (tab: 'overview' | 'preferences' | 'profile') => {
    setSearchParams({ tab });
  };

  const [activeSectorFilter, setActiveSectorFilter] = useState('All');

  // Profile Form State
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');

  // Company Form State
  const [companyName, setCompanyName] = useState(currentUser?.companyName || '');
  const [designation, setDesignation] = useState(currentUser?.designation || '');
  const [companyIndustry, setCompanyIndustry] = useState(currentUser?.industry || 'Technology');
  const [companyWebsite, setCompanyWebsite] = useState(currentUser?.companyWebsite || '');

  // Preference state
  const [prefIndustries, setPrefIndustries] = useState<string[]>(currentUser?.industries || []);

  const [profileSuccess, setProfileSuccess] = useState('');
  const [companySuccess, setCompanySuccess] = useState('');
  const [prefSuccess, setPrefSuccess] = useState('');

  // Safeguard: Redirect if not logged in
  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-[#F8F9FA]">
        <div className="max-w-md w-full bg-white border border-border rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <User size={40} className="mx-auto text-muted-foreground" />
          <h2 className="text-xl font-bold text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>Subscribers Only</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Please log in or register a corporate subscription to access the NURC subscriber dashboard.
          </p>
          <div className="flex gap-3 pt-2">
            <Link to="/login" className="flex-1 py-2 bg-navy text-white text-sm font-semibold rounded-lg" style={{ background: 'var(--nurc-navy)' }}>
              Log In
            </Link>
            <Link to="/signup" className="flex-1 py-2 border border-border text-navy text-sm font-semibold rounded-lg" style={{ color: 'var(--nurc-navy)' }}>
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter newsletters based on the active switcher sector tag
  const filteredNewsletters = (newsletters ?? []).filter(nl => {
    if (activeSectorFilter === 'All') return true;
    return nl.category && (
      nl.category.toLowerCase() === activeSectorFilter.toLowerCase() ||
      nl.category.toLowerCase().includes(activeSectorFilter.toLowerCase()) ||
      activeSectorFilter.toLowerCase().includes(nl.category.toLowerCase())
    );
  });

  // Today's Newsletter (first briefing of filtered list)
  const todayNewsletter = filteredNewsletters?.[0];
  
  // Yesterday's Newsletter (second briefing of filtered list)
  const yesterdayNewsletter = filteredNewsletters?.[1];

  // Previous Editions (remaining briefings of filtered list)
  const previousEditions = filteredNewsletters.slice(2);

  // Resume / Continue Reading Briefing
  const resumeBrief = continueReading ? (newsletters ?? []).find(n => n.id === continueReading) : null;
  const resumePct = resumeBrief ? localStorage.getItem(`nurc_scroll_pct_${resumeBrief.id}`) : null;
  const resumePctNum = resumePct ? Math.round(parseFloat(resumePct)) : 0;

  // Saved Briefings list for bookmark rendering
  const savedBriefs = (newsletters ?? []).filter(nl => (savedArticles ?? []).includes(nl.id));

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess('');
    updateProfile({ fullName, phone });
    setProfileSuccess('Profile details updated successfully.');
    setTimeout(() => setProfileSuccess(''), 2500);
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanySuccess('');
    updateCompany({ companyName, designation, industry: companyIndustry });
    setCompanySuccess('Corporate company details updated successfully.');
    setTimeout(() => setCompanySuccess(''), 2500);
  };

  const handlePrefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPrefSuccess('');
    if (prefIndustries.length === 0) {
      alert('Please select at least one industry sector.');
      return;
    }
    updatePreferences(prefIndustries);
    setPrefSuccess('Intelligence feed preferences updated successfully.');
    setTimeout(() => setPrefSuccess(''), 2500);
  };

  const handlePrefIndustryToggle = (ind: string) => {
    setPrefIndustries(prev =>
      prev.includes(ind) ? prev.filter(x => x !== ind) : [...prev, ind]
    );
  };

  const handleSubscriptionUpgrade = () => {
    if (currentUser.plan === 'Essential') {
      updateSubscription('Executive', currentUser.industries, currentUser.theme);
      alert('Your subscription has been successfully upgraded to Executive Access!');
    } else if (currentUser.plan === 'Executive') {
      updateSubscription('Enterprise', currentUser.industries, currentUser.theme);
      alert('Your subscription has been successfully upgraded to Enterprise Access!');
    } else {
      alert('For custom licensing or renewal changes, please contact your account manager at contact@nurcmedianext.com.');
    }
  };

  const handleSubscriptionDowngrade = () => {
    if (currentUser.plan === 'Enterprise') {
      updateSubscription('Executive', currentUser.industries, currentUser.theme);
      alert('Your subscription has been set to downgrade to Executive at the end of the current billing cycle.');
    } else if (currentUser.plan === 'Executive') {
      updateSubscription('Essential', currentUser.industries, currentUser.theme);
      alert('Your subscription has been set to downgrade to Essential at the end of the current billing cycle.');
    } else {
      alert('No downgrades available for Essential. Contact support to cancel.');
    }
  };

  const allIndustriesOptions = ['Automotive', 'Banking', 'Finance', 'Insurance', 'Healthcare', 'Energy', 'Metals', 'Pharma', 'Technology', 'Infrastructure'];
  
  const themesList = [
    { value: 'Original' as const, label: 'Original NURC', tag: 'Editorial' },
    { value: 'Executive' as const, label: 'Executive Brief', tag: 'McKinsey' },
    { value: 'FT' as const, label: 'Financial Times', tag: 'FT News' },
    { value: 'Modern' as const, label: 'Modern Intel', tag: 'Brew' },
    { value: 'Corporate' as const, label: 'Corp Digest', tag: 'Analyst' }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8F9FA] pb-12">
      
      {/* Dashboard Top Banner */}
      <div className="bg-white border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#006D7A]" style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-heading)' }}>
                Intelligence Workspace
              </span>
              <div className="h-px w-8 bg-border" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
              Welcome back, {currentUser.fullName}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Account Status: <span className="text-green-600 font-bold uppercase">{currentUser.status}</span> · Dispatch Schedule: <span className="text-navy font-bold uppercase">DAILY EDITION</span>
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-muted px-4 py-2.5 rounded-xl border border-border flex items-center gap-4 text-xs font-semibold shrink-0">
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider">Plan License</span>
              <span className="text-navy" style={{ color: 'var(--nurc-navy)' }}>{currentUser.plan} Access</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider">Renewal Date</span>
              <span className="text-navy" style={{ color: 'var(--nurc-navy)' }}>{currentUser.renewalDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-4 gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
              activeTab === 'overview'
                ? 'bg-navy text-white shadow-sm border-navy'
                : 'bg-white border-border text-navy hover:bg-muted'
            }`}
            style={{
              background: activeTab === 'overview' ? 'var(--nurc-navy)' : '#FFF',
              borderColor: activeTab === 'overview' ? 'var(--nurc-navy)' : 'var(--border)',
              color: activeTab === 'overview' ? '#FFF' : 'var(--nurc-navy)'
            }}
          >
            <FileText size={14} />
            Daily Intelligence Hub
          </button>
          
          <button
            onClick={() => setActiveTab('preferences')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
              activeTab === 'preferences'
                ? 'bg-navy text-white shadow-sm border-navy'
                : 'bg-white border-border text-navy hover:bg-muted'
            }`}
            style={{
              background: activeTab === 'preferences' ? 'var(--nurc-navy)' : '#FFF',
              borderColor: activeTab === 'preferences' ? 'var(--nurc-navy)' : 'var(--border)',
              color: activeTab === 'preferences' ? '#FFF' : 'var(--nurc-navy)'
            }}
          >
            <Settings size={14} />
            Preferences & Appearance
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
              activeTab === 'profile'
                ? 'bg-navy text-white shadow-sm border-navy'
                : 'bg-white border-border text-navy hover:bg-muted'
            }`}
            style={{
              background: activeTab === 'profile' ? 'var(--nurc-navy)' : '#FFF',
              borderColor: activeTab === 'profile' ? 'var(--nurc-navy)' : 'var(--border)',
              color: activeTab === 'profile' ? '#FFF' : 'var(--nurc-navy)'
            }}
          >
            <User size={14} />
            Corporate Account
          </button>
        </div>

        {/* Tab Contents */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* TAB 1: OVERVIEW (Daily Newsletter Mirror System!) */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Premium Reading Analytics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-border p-4 rounded-2xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-muted-foreground mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Consumed Briefings</span>
                    <BookOpen size={16} className="text-[#006D7A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy leading-none" style={{ color: 'var(--nurc-navy)' }}>
                      {Math.max(5, (readArticles ?? []).length)}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-1">Briefings fully analyzed</p>
                  </div>
                </div>

                <div className="bg-white border border-border p-4 rounded-2xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-muted-foreground mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Saved Briefings</span>
                    <Bookmark size={16} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy leading-none" style={{ color: 'var(--nurc-navy)' }}>
                      {(savedArticles ?? []).length}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-1">Archived for team review</p>
                  </div>
                </div>

                <div className="bg-white border border-border p-4 rounded-2xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-muted-foreground mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Followed Channels</span>
                    <Layout size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy leading-none" style={{ color: 'var(--nurc-navy)' }}>
                      {(currentUser.industries ?? []).length}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-1">Sectors tailored in real-time</p>
                  </div>
                </div>

                <div className="bg-white border border-border p-4 rounded-2xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-muted-foreground mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Reading Time</span>
                    <Clock size={16} className="text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy leading-none" style={{ color: 'var(--nurc-navy)' }}>
                      {Math.max(45, (readArticles ?? []).length * 8) + " Mins"}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-1">Monthly platform duration</p>
                  </div>
                </div>
              </div>

              {/* B2B Enterprise Workspaces Widget */}
              <div className="bg-[#0A2540] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-teal animate-fadeIn" style={{ borderLeftColor: 'var(--nurc-teal)' }}>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest block">Enterprise Workspace Access</span>
                  <h4 className="text-base font-bold font-heading" style={{ fontFamily: 'var(--font-heading)' }}>Establish Dedicated Sub-Workspaces for Team Members</h4>
                  <p className="text-xs text-slate-300 max-w-xl">
                    Share critical intelligence briefs, custom sector reports, and enjoy multi-user seat discounting under enterprise licensing.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <button
                    onClick={openDemoModal}
                    className="px-4 py-2.5 bg-teal text-white text-xs font-bold rounded-lg transition-all cursor-pointer border-0"
                    style={{ background: 'var(--nurc-teal)' }}
                  >
                    Schedule B2B Demo
                  </button>
                  <button
                    onClick={openCoverageModal}
                    className="px-4 py-2.5 bg-transparent border border-white/40 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
                  >
                    Request Custom Coverage
                  </button>
                </div>
              </div>
              
              {/* Continue Reading Widget */}
              {resumeBrief && (
                <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-amber-800 uppercase tracking-widest block">
                      Continue Reading ({resumePctNum}% Read)
                    </span>
                    <h4 className="font-bold text-sm text-navy" style={{ color: 'var(--nurc-navy)' }}>
                      {resumeBrief.title} <span className="text-xs text-muted-foreground font-semibold">({resumeBrief.category})</span>
                    </h4>
                    <p className="text-xs text-muted-foreground">Pick up where you left off. Every opened briefing is tracked automatically.</p>
                  </div>
                  <button
                    onClick={() => openReader(resumeBrief.article, resumeBrief.id)}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors shrink-0 text-center cursor-pointer"
                  >
                    Resume ({resumePctNum}% Read)
                  </button>
                </div>
              )}

              {/* Horizontally Scrollable Sector Switcher Chips */}
              <div className="bg-white border border-border rounded-2xl p-4 shadow-sm space-y-2">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Filter Feed by Sector
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {['All', ...currentUser.industries].map(sector => {
                    const isActive = activeSectorFilter === sector;
                    return (
                      <button
                        key={sector}
                        onClick={() => setActiveSectorFilter(sector)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                          isActive
                            ? 'bg-teal text-white border-teal shadow-sm'
                            : 'bg-muted border-border text-navy hover:bg-muted/80'
                        }`}
                        style={{
                          backgroundColor: isActive ? 'var(--nurc-teal)' : '',
                          borderColor: isActive ? 'var(--nurc-teal)' : '',
                          color: isActive ? '#FFFFFF' : 'var(--nurc-navy)',
                        }}
                      >
                        {sector}
                      </button>
                    );
                  })}
                </div>
              </div>

              {!todayNewsletter && (
                <div className="bg-white border border-border rounded-2xl p-10 text-center space-y-3 shadow-sm">
                  <BookOpen className="mx-auto text-muted-foreground" size={32} />
                  <h4 className="font-bold text-navy" style={{ color: 'var(--nurc-navy)' }}>No briefings found</h4>
                  <p className="text-xs text-muted-foreground">There are no briefings matching "{activeSectorFilter}" in your feed right now.</p>
                </div>
              )}

              {/* Today's Newsletter featured card (Large Featured Card) */}
              {todayNewsletter && (
                <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="h-1.5" style={{ background: todayNewsletter.color }} />
                  <div className="p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="inline-flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest text-white shrink-0" style={{ background: todayNewsletter.color }}>
                          {todayNewsletter.category}
                        </span>
                        <span className="text-[10px] text-red-600 font-extrabold uppercase tracking-widest shrink-0 animate-pulse bg-red-50 px-2 py-0.5 rounded">
                          ● Today's Briefing
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                        <Clock size={12} />
                        <span>{todayNewsletter.readTime} read · {todayNewsletter.date}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-navy mb-3" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                      {todayNewsletter.title}
                    </h2>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {todayNewsletter.summary}
                    </p>

                    <div className="space-y-2 mb-6 bg-muted/30 p-4 rounded-xl border border-border/40">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Today's Core Highlights</div>
                      {todayNewsletter.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-semibold text-navy" style={{ color: 'var(--nurc-navy)' }}>
                          <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: todayNewsletter.color }} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <button
                        onClick={() => openReader(todayNewsletter.article, todayNewsletter.id)}
                        className="btn-nurc flex items-center gap-1.5 px-6 py-3 text-xs font-bold text-white rounded-lg shadow-sm cursor-pointer"
                        style={{ background: todayNewsletter.color }}
                      >
                        Open Today's Newsletter
                        <ArrowRight size={13} />
                      </button>
                      <button
                        onClick={() => toggleSaveArticle(todayNewsletter.id)}
                        className="p-3 border border-border rounded-lg text-muted-foreground hover:text-navy hover:bg-muted transition-all cursor-pointer bg-white"
                        title="Save to bookmarks"
                      >
                        <Bookmark size={14} fill={savedArticles.includes(todayNewsletter.id) ? 'currentColor' : 'none'} style={{ color: savedArticles.includes(todayNewsletter.id) ? 'var(--nurc-teal)' : 'inherit' }} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* My Industries widget */}
              <div className="bg-white border border-border rounded-2xl p-6 space-y-4 shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                    Industry Hub Quick Access
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Click any followed sector to filter your current active dashboard briefing feed.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentUser.industries.map(ind => {
                    const isFiltering = activeSectorFilter === ind;
                    return (
                      <button
                        key={ind}
                        onClick={() => {
                          setActiveSectorFilter(ind);
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                          isFiltering 
                            ? 'bg-teal-50/50 border-teal shadow-sm' 
                            : 'bg-card border-border hover:border-teal hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="w-8 h-8 rounded-lg bg-teal/5 flex items-center justify-center text-teal" style={{ color: 'var(--nurc-teal)' }}>
                            <BookOpen size={14} />
                          </div>
                          {isFiltering && (
                            <span className="text-[8px] bg-teal text-white px-1.5 py-0.5 rounded font-extrabold uppercase tracking-widest shrink-0" style={{ background: 'var(--nurc-teal)' }}>
                              Active Filter
                            </span>
                          )}
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-navy tracking-tight" style={{ color: 'var(--nurc-navy)' }}>{ind}</h5>
                          <span className="text-[10px] text-muted-foreground">Click to browse updates</span>
                        </div>
                      </button>
                    );
                  })}
                  
                  {/* Custom Coverage Card Callout */}
                  <button
                    onClick={openCoverageModal}
                    className="p-4 rounded-xl border border-dashed border-border bg-muted/20 hover:bg-muted/40 hover:border-slate-400 text-left transition-all cursor-pointer flex flex-col justify-between h-28"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                      <HelpCircle size={14} />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-navy tracking-tight" style={{ color: 'var(--nurc-navy)' }}>Request Custom Coverage</h5>
                      <span className="text-[10px] text-indigo-600 font-semibold">Click to submit sector proposal</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Newsletters (Today, Yesterday, Previous) */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                    Recent Briefing Editions
                  </h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* Yesterday Card */}
                  {yesterdayNewsletter && (
                    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                      <div className="h-1" style={{ background: yesterdayNewsletter.color }} />
                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground uppercase">
                          <span>Yesterday · {yesterdayNewsletter.category}</span>
                          <span>{yesterdayNewsletter.date}</span>
                        </div>
                        <h5 className="font-bold text-sm text-navy" style={{ color: 'var(--nurc-navy)' }}>{yesterdayNewsletter.title}</h5>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{yesterdayNewsletter.summary}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-border/40">
                          <button onClick={() => openReader(yesterdayNewsletter.article, yesterdayNewsletter.id)} className="text-xs font-bold text-teal flex items-center gap-1 hover:underline cursor-pointer" style={{ color: 'var(--nurc-teal)' }}>
                            Read Briefing
                            <ArrowRight size={12} />
                          </button>
                          <span className="text-[10px] text-muted-foreground font-semibold">{yesterdayNewsletter.readTime} read</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Saved Articles List preview */}
                  <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b pb-2 mb-3">
                        <h5 className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--nurc-navy)' }}>
                          <Bookmark size={13} style={{ color: 'var(--nurc-gold)' }} />
                          Saved Bookmarks
                        </h5>
                        <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">{(savedBriefs ?? []).length} items</span>
                      </div>
                      {(savedBriefs ?? []).length === 0 ? (
                        <p className="text-xs text-muted-foreground py-6 text-center">Save briefings to access them offline here.</p>
                      ) : (
                        <div className="space-y-2 max-h-24 overflow-y-auto">
                          {(savedBriefs ?? []).slice(0, 2).map(nl => (
                            <button key={nl.id} onClick={() => openReader(nl.article, nl.id)} className="text-xs block font-semibold text-navy hover:underline truncate text-left w-full cursor-pointer" style={{ color: 'var(--nurc-navy)' }}>
                              • {nl.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <Link to="/newsletters" className="text-xs font-bold text-teal flex items-center gap-1 hover:underline pt-2 border-t" style={{ color: 'var(--nurc-teal)' }}>
                      Browse Historical Archives
                      <ArrowRight size={12} />
                    </Link>
                  </div>

                </div>

                {/* Previous Editions listing (List format) */}
                <div className="bg-white border border-border rounded-2xl p-6 space-y-3 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b pb-2 mb-2">Previous Editions</div>
                  <div className="divide-y divide-border/40">
                    {previousEditions.slice(0, 3).map(nl => (
                      <div key={nl.id} className="py-2.5 flex items-center justify-between text-xs gap-4">
                        <div className="truncate">
                          <button onClick={() => openReader(nl.article, nl.id)} className="font-bold text-navy hover:underline block truncate text-left cursor-pointer" style={{ color: 'var(--nurc-navy)' }}>
                            {nl.title}
                          </button>
                          <span className="text-[10px] text-muted-foreground font-semibold">{nl.category} · {nl.date}</span>
                        </div>
                        <button onClick={() => openReader(nl.article, nl.id)} className="text-teal font-bold shrink-0 text-[10px] hover:underline cursor-pointer" style={{ color: 'var(--nurc-teal)' }}>Read</button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: PREFERENCES (Theme selector with side-by-side no-reload live rendering!) */}
          {activeTab === 'preferences' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Sector settings */}
              <form onSubmit={handlePrefSubmit} className="bg-white border border-border rounded-2xl p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                    Newsletter Sector Preferences
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Subscribe or unsubscribe from core industries. Feeds are mirrored instantly on your dashboard.</p>
                </div>

                {prefSuccess && (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3 text-green-800 text-sm">
                    <CheckCircle size={18} className="shrink-0 mt-0.5" />
                    <span>{prefSuccess}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {allIndustriesOptions.map(ind => {
                    const active = prefIndustries.includes(ind);
                    return (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => handlePrefIndustryToggle(ind)}
                        className="px-3 py-2 text-xs font-bold rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between"
                        style={{
                          background: active ? 'var(--nurc-navy)' : 'transparent',
                          color: active ? '#fff' : 'var(--nurc-navy)',
                          borderColor: active ? 'var(--nurc-navy)' : 'var(--border)'
                        }}
                      >
                        <span>{ind}</span>
                        {active && <span>✓</span>}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  className="btn-nurc px-6 py-2.5 bg-navy text-white text-xs font-bold rounded-lg cursor-pointer"
                  style={{ background: 'var(--nurc-navy)' }}
                >
                  Save Feed Preferences
                </button>
              </form>

              {/* Theme Settings Switcher (Side-by-Side Interactive Layout Review!) */}
              <div className="bg-white border border-border rounded-2xl p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-base font-bold text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                    Dashboard Theme Management
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Select a layout aesthetic below to update your rendering style instantly across all briefings.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  {/* Left select buttons (5 cols) */}
                  <div className="lg:col-span-5 space-y-2">
                    {themesList.map(t => {
                      const active = currentUser.theme === t.value;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => {
                            updateTheme(t.value);
                          }}
                          className="w-full text-left px-3 py-2.5 border rounded-xl flex items-center justify-between transition-all hover:bg-muted cursor-pointer"
                          style={{
                            borderColor: active ? 'var(--nurc-teal)' : 'var(--border)',
                            background: active ? 'rgba(0,109,122,0.02)' : '#FFFFFF'
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px]" style={{ background: active ? 'var(--nurc-teal)' : 'transparent', color: '#fff', borderColor: active ? 'var(--nurc-teal)' : '#D1D5DB' }}>
                              {active ? '✓' : ''}
                            </div>
                            <span className="font-bold text-xs" style={{ color: 'var(--nurc-navy)' }}>{t.label}</span>
                          </div>
                          <span className="text-[8px] bg-slate-100 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-slate-500">
                            {t.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right live preview panel (7 cols) */}
                  <div className="lg:col-span-7 bg-[#F8F9FA] rounded-2xl border p-4 relative overflow-hidden">
                    <div className="absolute top-2 right-3 text-[8px] font-bold text-teal bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wider z-10" style={{ color: 'var(--nurc-teal)' }}>
                      Active Live Preview
                    </div>
                    
                    <div className="overflow-y-auto max-h-[300px] border border-border/40 rounded-lg bg-white">
                      <NewsletterThemeRenderer article={SAMPLE_PREVIEW_ARTICLE} theme={currentUser.theme} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ACCOUNT & SETTINGS */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Profile Details */}
              <form onSubmit={handleProfileSubmit} className="bg-white border border-border rounded-2xl p-8 space-y-4 shadow-sm">
                <h3 className="text-base font-bold pb-2 border-b border-border" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                  Personal Profile Details
                </h3>

                {profileSuccess && (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3 text-green-800 text-sm">
                    <CheckCircle size={18} className="shrink-0 mt-0.5" />
                    <span>{profileSuccess}</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Business Email Address (Login)</label>
                    <input
                      type="email"
                      disabled
                      value={currentUser.email}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs opacity-60 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-nurc px-5 py-2 bg-navy text-white text-xs font-bold rounded-lg cursor-pointer"
                  style={{ background: 'var(--nurc-navy)' }}
                >
                  Save Profile Changes
                </button>
              </form>

              {/* Company Details */}
              <form onSubmit={handleCompanySubmit} className="bg-white border border-border rounded-2xl p-8 space-y-4 shadow-sm">
                <h3 className="text-base font-bold pb-2 border-b border-border" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                  Corporate Company Particulars
                </h3>

                {companySuccess && (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3 text-green-800 text-sm">
                    <CheckCircle size={18} className="shrink-0 mt-0.5" />
                    <span>{companySuccess}</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Company Name</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Designation / Role</label>
                    <input
                      type="text"
                      required
                      value={designation}
                      onChange={e => setDesignation(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Company Primary Industry</label>
                    <input
                      type="text"
                      required
                      value={companyIndustry}
                      onChange={e => setCompanyIndustry(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Corporate Website</label>
                    <input
                      type="url"
                      value={companyWebsite}
                      onChange={e => setCompanyWebsite(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-nurc px-5 py-2 bg-navy text-white text-xs font-bold rounded-lg cursor-pointer"
                  style={{ background: 'var(--nurc-navy)' }}
                >
                  Save Corporate Profile
                </button>
              </form>

              {/* Plan Management */}
              <div className="bg-white border border-border rounded-2xl p-8 space-y-4 shadow-sm">
                <h3 className="text-base font-bold pb-2 border-b border-border text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                  Subscription License Management
                </h3>
                <div className="p-4 bg-muted border border-border/80 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-navy" style={{ color: 'var(--nurc-navy)' }}>License Plan Type</span>
                    <span className="font-bold text-teal" style={{ color: 'var(--nurc-teal)' }}>{currentUser.plan} Access</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-navy" style={{ color: 'var(--nurc-navy)' }}>Assigned Channels</span>
                    <span className="text-muted-foreground font-semibold">{currentUser.industries.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-navy" style={{ color: 'var(--nurc-navy)' }}>Renewal & Billing Status</span>
                    <span className="text-green-600 font-bold uppercase">Active through {currentUser.renewalDate}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {currentUser.plan !== 'Enterprise' && (
                    <button
                      onClick={handleSubscriptionUpgrade}
                      className="btn-nurc flex-1 py-2.5 bg-teal text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                      style={{ background: 'var(--nurc-teal)' }}
                    >
                      <RefreshCw size={12} />
                      Upgrade License Plan
                    </button>
                  )}
                  {currentUser.plan !== 'Essential' && (
                    <button
                      onClick={handleSubscriptionDowngrade}
                      className="btn-nurc flex-1 py-2.5 border border-border text-navy text-xs font-bold rounded-lg cursor-pointer"
                      style={{ color: 'var(--nurc-navy)' }}
                    >
                      Downgrade Plan
                    </button>
                  )}
                  <button
                    onClick={openDemoModal}
                    className="btn-nurc flex-1 py-2.5 border border-border text-[#006D7A] hover:bg-teal-50/30 text-xs font-bold rounded-lg cursor-pointer"
                    style={{ color: 'var(--nurc-teal)', borderColor: 'var(--nurc-teal)' }}
                  >
                    Schedule Enterprise Demo
                  </button>
                  <button
                    onClick={() => alert(`Your ${currentUser.plan} license has been renewed through next year!`)}
                    className="btn-nurc flex-1 py-2.5 border border-border text-navy text-xs font-bold rounded-lg cursor-pointer"
                    style={{ color: 'var(--nurc-navy)' }}
                  >
                    Renew Early (Save 20%)
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
