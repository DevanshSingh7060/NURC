import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router';
import { useApp, Subscriber } from '../context/AppContext';
import { useReaderMode } from './ReaderModeContext';
import { safeStorage } from '../lib/safeStorage';
import { useLeadModal } from '../context/LeadModalContext';
import { NewsletterThemeRenderer } from './NewsletterThemeRenderer';
import {
  User,
  Briefcase,
  FileText,
  Settings,
  Bookmark,
  CheckCircle,
  Bell,
  ArrowRight,
  Star,
  RefreshCw,
  BookOpen,
  Clock,
  Layout,
  HelpCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { SEOHead } from './shared/SEOHead';

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
    toggleSaveArticle,
  } = useApp();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab');
  const activeTab =
    activeTabParam === 'today' ||
    activeTabParam === 'archive' ||
    activeTabParam === 'subscriptions' ||
    activeTabParam === 'preferences' ||
    activeTabParam === 'account'
      ? activeTabParam
      : 'today';

  const setActiveTab = (tab: 'today' | 'archive' | 'subscriptions' | 'preferences' | 'account') => {
    setSearchParams({ tab });
  };

  const [activeSectorFilter, setActiveSectorFilter] = useState('All');

  // Archive Filters State
  const [archiveSearch, setArchiveSearch] = useState('');
  const [archiveSector, setArchiveSector] = useState('All');
  const [archiveDate, setArchiveDate] = useState('All');

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
        <div className="max-w-md w-full bg-white border border-border rounded-xl p-6 text-center space-y-4 shadow-sm">
          <User size={40} className="mx-auto text-muted-foreground" />
          <h1 className="text-xl font-bold text-nurc-navy font-heading">Subscribers Only</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Please log in or register a corporate subscription to access the NURC subscriber
            dashboard.
          </p>
          <div className="flex gap-3 pt-2">
            <Link
              to="/login"
              className="flex-1 h-12 flex items-center justify-center text-white text-sm font-semibold rounded-xl text-center bg-nurc-navy no-underline"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="flex-1 h-12 flex items-center justify-center border border-border text-sm font-semibold rounded-xl text-center text-nurc-navy no-underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter newsletters based on the active switcher sector tag
  const filteredNewsletters = (newsletters ?? []).filter((nl) => {
    if (activeSectorFilter === 'All') return true;
    return (
      nl.category &&
      (nl.category.toLowerCase() === activeSectorFilter.toLowerCase() ||
        nl.category.toLowerCase().includes(activeSectorFilter.toLowerCase()) ||
        activeSectorFilter.toLowerCase().includes(nl.category.toLowerCase()))
    );
  });

  // Today's Newsletter (first briefing of filtered list)
  const todayNewsletter = filteredNewsletters?.[0];

  // Yesterday's Newsletter (second briefing of filtered list)
  const yesterdayNewsletter = filteredNewsletters?.[1];

  // Previous Editions (remaining briefings of filtered list)
  const previousEditions = filteredNewsletters.slice(2);

  // Resume / Continue Reading Briefing
  const resumeBrief = continueReading
    ? (newsletters ?? []).find((n) => n.id === continueReading)
    : null;
  const resumePct = resumeBrief ? safeStorage.getItem(`nurc_scroll_pct_${resumeBrief.id}`) : null;
  const resumePctNum = resumePct ? Math.round(parseFloat(resumePct)) : 0;

  // Saved Briefings list for bookmark rendering
  const savedBriefs = (newsletters ?? []).filter((nl) => (savedArticles ?? []).includes(nl.id));

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
      toast.error('Please select at least one industry sector.');
      return;
    }
    updatePreferences(prefIndustries);
    setPrefSuccess('Intelligence feed preferences updated successfully.');
    setTimeout(() => setPrefSuccess(''), 2500);
  };

  const handlePrefIndustryToggle = (ind: string) => {
    setPrefIndustries((prev) =>
      prev.includes(ind) ? prev.filter((x) => x !== ind) : [...prev, ind],
    );
  };

  const handleSubscriptionUpgrade = () => {
    if (currentUser.plan === 'Essential') {
      updateSubscription('Executive', currentUser.industries, currentUser.theme);
      toast.success('Your subscription has been upgraded to Executive Access.');
    } else if (currentUser.plan === 'Executive') {
      updateSubscription('Enterprise', currentUser.industries, currentUser.theme);
      toast.success('Your subscription has been upgraded to Enterprise Access.');
    } else {
      toast.info(
        'For custom licensing or renewal changes, contact your account manager at contact@nurcmedianext.com.',
      );
    }
  };

  const handleSubscriptionDowngrade = () => {
    if (currentUser.plan === 'Enterprise') {
      updateSubscription('Executive', currentUser.industries, currentUser.theme);
      toast.success(
        'Your subscription will downgrade to Executive at the end of the current billing cycle.',
      );
    } else if (currentUser.plan === 'Executive') {
      updateSubscription('Essential', currentUser.industries, currentUser.theme);
      toast.success(
        'Your subscription will downgrade to Essential at the end of the current billing cycle.',
      );
    } else {
      toast.info('No downgrades available for Essential. Contact support to cancel.');
    }
  };

  const allIndustriesOptions = [
    'Automotive',
    'Banking',
    'Finance',
    'Insurance',
    'Healthcare',
    'Energy',
    'Metals',
    'Pharma',
    'Technology',
    'Infrastructure',
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8F9FA] pb-12">
      <SEOHead
        title="Dashboard | NURC MediaNext"
        description="Your personalized NURC MediaNext dashboard with curated intelligence, saved articles, and subscription management."
        canonicalUrl="/dashboard"
        noindex={true}
      />

      {/* Dashboard Top Banner */}
      <div className="bg-white border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase text-[#006D7A] tracking-[0.12em] font-heading">
                Intelligence Workspace
              </span>
              <div className="h-px w-8 bg-border" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-nurc-navy font-heading">
              Welcome back, {currentUser.fullName}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Account Status:{' '}
              <span className="text-green-600 font-bold uppercase">{currentUser.status}</span> ·
              Dispatch Schedule:{' '}
              <span className="text-navy font-bold uppercase">DAILY EDITION</span>
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-muted px-4 py-2.5 rounded-xl border border-border flex items-center gap-4 text-xs font-semibold shrink-0">
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider">
                Plan License
              </span>
              <span className="text-nurc-navy">{currentUser.plan} Access</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider">
                Renewal Date
              </span>
              <span className="text-nurc-navy">{currentUser.renewalDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab('today')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
              activeTab === 'today'
                ? 'bg-navy text-white shadow-sm border-navy'
                : 'bg-white border-border text-navy hover:bg-muted'
            }`}
            style={{
              background: activeTab === 'today' ? 'var(--nurc-navy)' : '#FFF',
              borderColor: activeTab === 'today' ? 'var(--nurc-navy)' : 'var(--border)',
              color: activeTab === 'today' ? '#FFF' : 'var(--nurc-navy)',
            }}
          >
            <BookOpen size={14} />
            Today's Newsletter
          </button>

          <button
            onClick={() => setActiveTab('archive')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
              activeTab === 'archive'
                ? 'bg-navy text-white shadow-sm border-navy'
                : 'bg-white border-border text-navy hover:bg-muted'
            }`}
            style={{
              background: activeTab === 'archive' ? 'var(--nurc-navy)' : '#FFF',
              borderColor: activeTab === 'archive' ? 'var(--nurc-navy)' : 'var(--border)',
              color: activeTab === 'archive' ? '#FFF' : 'var(--nurc-navy)',
            }}
          >
            <FileText size={14} />
            Archive / History
          </button>

          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
              activeTab === 'subscriptions'
                ? 'bg-navy text-white shadow-sm border-navy'
                : 'bg-white border-border text-navy hover:bg-muted'
            }`}
            style={{
              background: activeTab === 'subscriptions' ? 'var(--nurc-navy)' : '#FFF',
              borderColor: activeTab === 'subscriptions' ? 'var(--nurc-navy)' : 'var(--border)',
              color: activeTab === 'subscriptions' ? '#FFF' : 'var(--nurc-navy)',
            }}
          >
            <Layout size={14} />
            My Subscriptions
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
              color: activeTab === 'preferences' ? '#FFF' : 'var(--nurc-navy)',
            }}
          >
            <Settings size={14} />
            Preferences
          </button>

          <button
            onClick={() => setActiveTab('account')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
              activeTab === 'account'
                ? 'bg-navy text-white shadow-sm border-navy'
                : 'bg-white border-border text-navy hover:bg-muted'
            }`}
            style={{
              background: activeTab === 'account' ? 'var(--nurc-navy)' : '#FFF',
              borderColor: activeTab === 'account' ? 'var(--nurc-navy)' : 'var(--border)',
              color: activeTab === 'account' ? '#FFF' : 'var(--nurc-navy)',
            }}
          >
            <User size={14} />
            Account
          </button>
        </div>

        {/* Tab Contents */}
        <div className="lg:col-span-3 space-y-8">
          {/* TAB 1: TODAY'S NEWSLETTER */}
          {activeTab === 'today' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Premium Reading Analytics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-border p-6 rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-muted-foreground mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Consumed Briefings
                    </span>
                    <BookOpen size={16} className="text-[#006D7A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-nurc-navy leading-none">
                      {Math.max(5, (readArticles ?? []).length)}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Briefings fully analyzed
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-border p-6 rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-muted-foreground mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Saved Briefings
                    </span>
                    <Bookmark size={16} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-nurc-navy leading-none">
                      {(savedArticles ?? []).length}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Archived for team review
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-border p-6 rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-muted-foreground mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Followed Channels
                    </span>
                    <Layout size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-nurc-navy leading-none">
                      {(currentUser.industries ?? []).length}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Sectors tailored in real-time
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-border p-6 rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-muted-foreground mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Reading Time
                    </span>
                    <Clock size={16} className="text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-nurc-navy leading-none">
                      {Math.max(45, (readArticles ?? []).length * 8) + ' Mins'}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Monthly platform duration
                    </p>
                  </div>
                </div>
              </div>

              {/* Continue Reading Widget */}
              {resumeBrief && (
                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-fadeIn">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-amber-800 uppercase tracking-widest block">
                      Continue Reading ({resumePctNum}% Read)
                    </span>
                    <h4 className="font-bold text-sm text-nurc-navy">
                      {resumeBrief.title}{' '}
                      <span className="text-xs text-muted-foreground font-semibold">
                        ({resumeBrief.category})
                      </span>
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Pick up where you left off. Every opened briefing is tracked automatically.
                    </p>
                  </div>
                  <button
                    onClick={() => openReader(resumeBrief.article, resumeBrief.id)}
                    className="h-12 px-6 flex items-center justify-center bg-amber-600 text-white rounded-xl text-xs font-semibold hover:bg-amber-700 transition-colors shrink-0 text-center cursor-pointer"
                  >
                    Resume ({resumePctNum}% Read)
                  </button>
                </div>
              )}

              {/* Today's Newsletter featured card */}
              {todayNewsletter ? (
                <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="h-1.5" style={{ background: todayNewsletter.color }} />
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest text-white shrink-0"
                          style={{ background: todayNewsletter.color }}
                        >
                          {todayNewsletter.category}
                        </span>
                        <span className="text-[10px] text-red-600 font-extrabold uppercase tracking-widest shrink-0 animate-pulse bg-red-50 px-2 py-0.5 rounded">
                          ● Today's Briefing
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                        <Clock size={12} />
                        <span>
                          {todayNewsletter.readTime} read · {todayNewsletter.date}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-nurc-navy font-heading">
                      {todayNewsletter.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {todayNewsletter.summary}
                    </p>

                    <div className="space-y-2 mb-6 bg-muted/30 p-4 rounded-xl border border-border/40">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                        Today's Core Highlights
                      </div>
                      {todayNewsletter.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs font-semibold text-nurc-navy"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ background: todayNewsletter.color }}
                          />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <button
                        onClick={() => openReader(todayNewsletter.article, todayNewsletter.id)}
                        className="btn-nurc h-12 flex items-center gap-1.5 px-6 text-xs font-bold text-white rounded-xl shadow-sm cursor-pointer border-0"
                        style={{ background: todayNewsletter.color }}
                      >
                        Open Today's Newsletter
                        <ArrowRight size={13} />
                      </button>
                      <button
                        onClick={() => toggleSaveArticle(todayNewsletter.id)}
                        className="w-12 h-12 flex items-center justify-center border border-border rounded-xl text-muted-foreground hover:text-navy hover:bg-muted transition-all cursor-pointer bg-white"
                        title="Save to bookmarks"
                      >
                        <Bookmark
                          size={14}
                          fill={
                            savedArticles.includes(todayNewsletter.id) ? 'currentColor' : 'none'
                          }
                          style={{
                            color: savedArticles.includes(todayNewsletter.id)
                              ? 'var(--nurc-teal)'
                              : 'inherit',
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-border rounded-xl p-6 text-center space-y-3 shadow-sm">
                  <BookOpen className="mx-auto text-muted-foreground" size={32} />
                  <h4 className="font-bold text-nurc-navy">No briefings found</h4>
                  <p className="text-xs text-muted-foreground">
                    Check your sector preferences to make sure you are subscribed to active
                    newsletter channels.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ARCHIVE / HISTORY */}
          {activeTab === 'archive' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white border border-border rounded-xl p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="text-base font-bold text-nurc-navy font-heading">
                    Historical Briefing Archives
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Search and filter all previous daily dispatches across your licensed sector
                    channels.
                  </p>
                </div>

                {/* Filters Row */}
                <div className="grid sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <label
                      htmlFor="db-archive-search"
                      className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Search Title/Content
                    </label>
                    <input
                      id="db-archive-search"
                      type="text"
                      placeholder="e.g. FAME, RBI, GDP..."
                      value={archiveSearch}
                      onChange={(e) => setArchiveSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="db-archive-sector"
                      className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Filter by Sector
                    </label>
                    <select
                      id="db-archive-sector"
                      value={archiveSector}
                      onChange={(e) => setArchiveSector(e.target.value)}
                      className="w-full px-3 py-2 border border-border bg-card rounded-lg text-xs h-[34px] cursor-pointer"
                    >
                      <option value="All">All Sectors</option>
                      {currentUser.industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="db-archive-date"
                      className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Filter by Date
                    </label>
                    <select
                      id="db-archive-date"
                      value={archiveDate}
                      onChange={(e) => setArchiveDate(e.target.value)}
                      className="w-full px-3 py-2 border border-border bg-card rounded-lg text-xs h-[34px] cursor-pointer"
                    >
                      <option value="All">All Dates</option>
                      <option value="May 2025">May 2025</option>
                      <option value="May 2026">May 2026</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Archive Results Grid */}
              <div className="space-y-4">
                {(() => {
                  const filtered = (newsletters ?? []).filter((nl) => {
                    const matchSearch =
                      archiveSearch === '' ||
                      nl.title.toLowerCase().includes(archiveSearch.toLowerCase()) ||
                      (nl.summary &&
                        nl.summary.toLowerCase().includes(archiveSearch.toLowerCase()));
                    const matchSector =
                      archiveSector === 'All' ||
                      nl.category.toLowerCase().includes(archiveSector.toLowerCase()) ||
                      archiveSector.toLowerCase().includes(nl.category.toLowerCase());
                    const matchDate = archiveDate === 'All' || nl.date.includes(archiveDate);
                    return matchSearch && matchSector && matchDate;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="bg-white border border-border rounded-xl p-6 text-center space-y-2 shadow-sm">
                        <FileText className="mx-auto text-muted-foreground" size={30} />
                        <h4 className="font-bold text-nurc-navy">
                          No archived briefings match filters
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Try broadening your search keywords or adjusting the sector filter
                          settings.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="bg-white border border-border rounded-xl shadow-sm divide-y divide-border/40 overflow-hidden">
                      {filtered.map((nl) => (
                        <div
                          key={nl.id}
                          className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors"
                        >
                          <div className="space-y-1 text-left">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-widest text-white"
                                style={{ background: nl.color }}
                              >
                                {nl.category}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-semibold">
                                {nl.date}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-nurc-navy font-heading">
                              {nl.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-1 max-w-xl">
                              {nl.summary}
                            </p>
                          </div>
                          <div className="flex items-center gap-2.5 shrink-0">
                            <button
                              onClick={() => openReader(nl.article, nl.id)}
                              className="h-12 px-6 text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-all cursor-pointer border-0 flex items-center justify-center bg-nurc-teal"
                            >
                              Open in Reader Mode
                            </button>
                            <button
                              onClick={() => toggleSaveArticle(nl.id)}
                              className="w-12 h-12 flex items-center justify-center border border-border rounded-xl text-muted-foreground hover:text-navy hover:bg-muted transition-colors bg-white cursor-pointer"
                            >
                              <Bookmark
                                size={13}
                                fill={savedArticles.includes(nl.id) ? 'currentColor' : 'none'}
                                style={{
                                  color: savedArticles.includes(nl.id)
                                    ? 'var(--nurc-teal)'
                                    : 'inherit',
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TAB 3: MY SUBSCRIPTIONS */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Plan Information Card */}
              <div className="bg-white border border-border rounded-xl p-6 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-base font-bold pb-2 border-b border-border text-nurc-navy font-heading">
                    Active Subscription License Details
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Manage billing renewal dates, licence tiers, and upgrade limits below.
                  </p>
                </div>

                <div className="p-6 bg-muted/40 border border-border/80 rounded-xl grid sm:grid-cols-3 gap-5 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider mb-1">
                      License Plan Type
                    </span>
                    <span className="font-bold text-sm text-nurc-navy">
                      {currentUser.plan} Access
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider mb-1">
                      Assigned Channels
                    </span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {currentUser.industries.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider mb-1">
                      Renewal Status
                    </span>
                    <span className="text-green-600 font-bold uppercase text-sm">
                      Active through {currentUser.renewalDate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    to="/contact"
                    className="btn-nurc flex-1 h-12 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer border-0 text-center bg-nurc-teal no-underline"
                  >
                    Request Demo
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-nurc flex-1 h-12 border border-border text-xs font-bold rounded-xl cursor-pointer bg-white text-center flex items-center justify-center animate-none text-nurc-navy no-underline"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-nurc flex-1 h-12 border hover:bg-teal-50/30 text-xs font-bold rounded-xl cursor-pointer bg-white text-center flex items-center justify-center animate-none text-nurc-teal border-nurc-teal no-underline"
                  >
                    Schedule Consultation
                  </Link>
                </div>
              </div>

              {/* B2B Workspace widgets */}
              <div className="bg-[#0A2540] text-white rounded-xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-teal animate-fadeIn border-l-nurc-teal">
                <div className="space-y-1 text-left">
                  <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest block">
                    Corporate Account Portal
                  </span>
                  <h4 className="text-sm font-bold font-heading">
                    Establish Dedicated Sub-Workspaces for Team Members
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xl">
                    Share critical intelligence briefs, custom sector reports, and enjoy multi-user
                    seat discounting under enterprise licensing.
                  </p>
                </div>
                <button
                  onClick={openDemoModal}
                  className="h-12 px-6 text-white text-xs font-bold rounded-xl transition-all cursor-pointer border-0 shrink-0 flex items-center justify-center bg-nurc-teal"
                >
                  Schedule B2B Demo
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-6 animate-fadeIn">
              <form
                onSubmit={handlePrefSubmit}
                className="bg-white border border-border rounded-xl p-6 space-y-6 shadow-sm"
              >
                <div>
                  <h3 className="text-base font-bold text-nurc-navy font-heading">
                    Newsletter Sector Preferences
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Subscribe or unsubscribe from core industries. Feeds are mirrored instantly on
                    your dashboard.
                  </p>
                </div>

                {prefSuccess && (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3 text-green-800 text-sm">
                    <CheckCircle size={18} className="shrink-0 mt-0.5" />
                    <span>{prefSuccess}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {allIndustriesOptions.map((ind) => {
                    const active = prefIndustries.includes(ind);
                    return (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => handlePrefIndustryToggle(ind)}
                        className="px-3 py-2.5 text-xs font-bold rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between"
                        style={{
                          background: active ? 'var(--nurc-navy)' : 'transparent',
                          color: active ? '#fff' : 'var(--nurc-navy)',
                          borderColor: active ? 'var(--nurc-navy)' : 'var(--border)',
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
                  className="btn-nurc h-12 px-6 text-white text-xs font-bold rounded-xl cursor-pointer border-0 flex items-center justify-center animate-none bg-nurc-navy"
                >
                  Save Feed Preferences
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: ACCOUNT */}
          {activeTab === 'account' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Profile Details */}
              <form
                onSubmit={handleProfileSubmit}
                className="bg-white border border-border rounded-xl p-6 space-y-4 shadow-sm"
              >
                <h3 className="text-base font-bold pb-2 border-b border-border text-nurc-navy font-heading">
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
                    <label
                      htmlFor="db-fullName"
                      className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Full Name
                    </label>
                    <input
                      id="db-fullName"
                      type="text"
                      required
                      aria-required="true"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="db-email"
                      className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Business Email Address (Login)
                    </label>
                    <input
                      id="db-email"
                      type="email"
                      disabled
                      value={currentUser.email}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs opacity-60 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label
                      htmlFor="db-phone"
                      className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Contact Phone
                    </label>
                    <input
                      id="db-phone"
                      type="tel"
                      inputMode="tel"
                      required
                      aria-required="true"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-nurc h-12 px-6 text-white text-xs font-bold rounded-xl cursor-pointer border-0 flex items-center justify-center animate-none bg-nurc-navy"
                >
                  Save Profile Changes
                </button>
              </form>

              {/* Company Details */}
              <form
                onSubmit={handleCompanySubmit}
                className="bg-white border border-border rounded-xl p-6 space-y-4 shadow-sm"
              >
                <h3 className="text-base font-bold pb-2 border-b border-border text-nurc-navy font-heading">
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
                    <label
                      htmlFor="db-companyName"
                      className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Company Name
                    </label>
                    <input
                      id="db-companyName"
                      type="text"
                      required
                      aria-required="true"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="db-designation"
                      className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Designation / Role
                    </label>
                    <input
                      id="db-designation"
                      type="text"
                      required
                      aria-required="true"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="db-companyIndustry"
                      className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Company Primary Industry
                    </label>
                    <input
                      id="db-companyIndustry"
                      type="text"
                      required
                      aria-required="true"
                      value={companyIndustry}
                      onChange={(e) => setCompanyIndustry(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="db-website"
                      className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Corporate Website
                    </label>
                    <input
                      id="db-website"
                      type="url"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                      className="w-full px-4 py-2 border border-border bg-input-background rounded-lg text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-nurc h-12 px-6 text-white text-xs font-bold rounded-xl cursor-pointer border-0 flex items-center justify-center animate-none bg-nurc-navy"
                >
                  Save Corporate Profile
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
