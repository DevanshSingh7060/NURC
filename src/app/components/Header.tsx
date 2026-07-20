import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router';
import { Menu, X, BookOpen, ChevronDown, User, Layout, Briefcase, FileText, Settings, Star, Bookmark, Home, Mail } from 'lucide-react';
import { useReaderMode, SAMPLE_AUTO_ARTICLE } from './ReaderModeContext';
import { useApp } from '../context/AppContext';
import nurcLogo from '../../Logo/nurc-logo.png';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Industries', to: '#', hasDropdown: true },
  { label: 'Services', to: '/services' },
  { label: 'Clients', to: '/clients' },
  { label: 'Resources', to: '/insights' },
  { label: 'About', to: '/about' },
];

const solutionsLinks = [
  { label: 'Automobiles', to: '/industries/auto' },
  { label: 'Banking', to: '/industries/banking' },
  { label: 'Insurance', to: '/industries/insurance' },
  { label: 'Mutual Funds', to: '/industries/mutual-funds' },
  { label: 'Infrastructure', to: '/industries/infrastructure' },
  { label: 'Energy', to: '/industries/energy' },
  { label: 'Metals & Minerals', to: '/industries/metals-minerals' },
  { label: 'FMCG', to: '/industries/fmcg' },
];

export function Header() {
  const { currentUser, logout, newsletters } = useApp();
  const { openReader, isOpen: readerOpen } = useReaderMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);

  // Lock body scroll when mobile navigation drawer is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Handle Escape key closure for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (readerOpen) return null;

  return (
    <header
      role="banner"
      className={`sticky top-0 border-b border-border bg-card/95 backdrop-blur-sm transition-all duration-200 ${
        mobileOpen ? 'z-[9999]' : 'z-40'
      }`}
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      {/* Single merged header bar */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 sm:h-20 relative">

        {/* Left side: Auth actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop-only Auth Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="hidden xl:inline text-xs font-semibold text-muted-foreground mr-2">
                  Welcome, {currentUser.fullName.split(' ')[0]}
                </span>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border transition-all hover:bg-muted"
                  style={{ borderColor: 'var(--border)', color: 'var(--nurc-navy)' }}
                >
                  <User size={14} />
                  Dashboard
                </Link>

                <button
                  onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                  className="p-2 rounded-lg hover:bg-muted text-navy hover:text-[var(--nurc-teal)] transition-all cursor-pointer bg-transparent border-0 flex items-center justify-center shrink-0"
                  style={{ color: 'var(--nurc-navy)' }}
                  title="Open Reader Mode"
                >
                  <BookOpen size={16} />
                </button>
                
                <Link
                  to="/contact"
                  className="btn-nurc flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer"
                  style={{ background: 'var(--nurc-teal)' }}
                >
                  Request Demo
                </Link>

                <button
                  onClick={() => logout()}
                  className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-muted text-red-600 transition-colors cursor-pointer bg-transparent border-0"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded text-sm font-semibold hover:text-[var(--nurc-teal)] transition-colors"
                  style={{ color: 'var(--nurc-navy)' }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-[var(--nurc-teal)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all btn-nurc shadow-sm"
                  style={{ background: 'var(--nurc-teal)' }}
                >
                  Sign Up
                </Link>
                <button
                  onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                  className="p-2 rounded-lg hover:bg-muted text-navy hover:text-[var(--nurc-teal)] transition-all cursor-pointer bg-transparent border-0 flex items-center justify-center shrink-0"
                  style={{ color: 'var(--nurc-navy)' }}
                  title="Open Reader Mode"
                >
                  <BookOpen size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
          {navLinks.map(link =>
            link.hasDropdown ? (
              <div key={link.label} className="relative" onMouseEnter={() => setSectorsOpen(true)} onMouseLeave={() => setSectorsOpen(false)}>
                <button
                  className="flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition-colors cursor-pointer"
                  style={{ color: 'var(--nurc-navy)' }}
                >
                  {link.label}
                  <ChevronDown size={14} />
                </button>
                {sectorsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                    {solutionsLinks.map(s => (
                      <Link
                        key={s.to}
                        to={s.to}
                        className="block px-4 py-2 text-sm hover:bg-muted transition-colors text-left font-medium"
                        style={{ color: 'var(--nurc-navy)' }}
                        onClick={() => setSectorsOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-muted'
                      : 'hover:bg-muted/60'
                  }`
                }
                style={{ color: 'var(--nurc-navy)' }}
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Right side: Hamburger (mobile) + Logo */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile hamburger menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors shrink-0 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} style={{ color: 'var(--nurc-navy)' }} /> : <Menu size={20} style={{ color: 'var(--nurc-navy)' }} />}
          </button>

          {/* Company logo */}
          <Link
            to="/"
            className="flex items-center shrink-0"
            onClick={() => setMobileOpen(false)}
            aria-label="NURC Media Next — Home"
          >
            <img
              src={nurcLogo}
              alt="NURC Media Next — 26 Years of Trust & Service"
              className="h-12 sm:h-16 w-auto"
              width={320}
              height={102}
            />
          </Link>
        </div>
      </div>

      <>
          {/* Slide-out Mobile Overlay Backdrop Blur - High Z-Index Layer */}
          <div 
            className={`fixed inset-0 lg:hidden bg-black/45 backdrop-blur-sm transition-opacity duration-300 ${
              mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9998,
            }}
          />
          
          {/* Slide-out Mobile Hamburger Drawer Container (Access from RIGHT, sliding transition) */}
          <div 
            className={`fixed top-0 bottom-0 right-0 w-[80vw] sm:w-[75vw] max-w-[380px] bg-card border-l border-border p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out transform lg:hidden ${
              mobileOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              width: '80vw',
              maxWidth: '380px',
              zIndex: 9999,
              background: '#FFFFFF',
              overflowY: 'auto',
              fontFamily: 'var(--font-heading)'
            }}
          >
            <div className="space-y-6 overflow-y-auto animate-none" style={{ scrollbarWidth: 'thin' }}>
              {/* Drawer Logo header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <div 
                    className="w-7 h-7 rounded flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: 'var(--nurc-navy)', fontFamily: 'var(--font-display)' }}
                  >
                    N
                  </div>
                  <div className="leading-none text-left">
                    <div className="font-bold text-navy text-sm" style={{ color: 'var(--nurc-navy)' }}>
                      NURC
                    </div>
                    <div className="font-semibold tracking-widest uppercase text-[8px]" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.12em' }}>
                      MediaNext
                    </div>
                  </div>
                </Link>
                <button 
                  onClick={() => setMobileOpen(false)} 
                  className="p-1 rounded hover:bg-muted text-muted-foreground cursor-pointer bg-transparent border-0"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links drawer list */}
              <nav className="flex flex-col gap-1 text-sm font-bold text-left" style={{ color: 'var(--nurc-navy)' }} aria-label="Mobile navigation">
                <Link 
                  to="/" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <Home size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Home
                </Link>

                {/* Solutions Collapsible */}
                <div>
                  <button 
                    onClick={() => setMobileSectorsOpen(!mobileSectorsOpen)}
                    className="w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center justify-between text-sm font-bold bg-transparent border-0 cursor-pointer text-left"
                    style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}
                  >
                    <span className="flex items-center gap-2.5">
                      <Briefcase size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                      Solutions
                    </span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${mobileSectorsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSectorsOpen && (
                    <div className="pl-8 flex flex-col gap-1.5 mt-1 border-l border-teal/20 ml-5">
                      {solutionsLinks.map(s => (
                        <Link 
                          key={s.to}
                          to={s.to}
                          className="px-3 py-1.5 rounded-lg hover:bg-muted transition-colors text-xs text-left font-semibold"
                          style={{ color: 'var(--nurc-navy)' }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>



                <Link 
                  to="/services" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <Settings size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Services
                </Link>

                <Link 
                  to="/insights" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <FileText size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Resources
                </Link>

                <Link 
                  to="/about" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  About
                </Link>

                <Link 
                  to="/contact" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <Mail size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Contact
                </Link>

                <div className="h-px bg-border my-2" />

                {!currentUser ? (
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Link 
                        to="/login" 
                        className="py-2.5 rounded-lg border border-border text-center hover:bg-muted transition-colors text-xs flex items-center justify-center font-bold" 
                        onClick={() => setMobileOpen(false)}
                        style={{ color: 'var(--nurc-navy)' }}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/signup" 
                        className="py-2.5 rounded-lg bg-navy text-white text-center hover:opacity-90 transition-opacity text-xs font-bold flex items-center justify-center" 
                        style={{ background: 'var(--nurc-navy)' }}
                        onClick={() => setMobileOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                    <button 
                      onClick={() => {
                        setMobileOpen(false);
                        openReader(SAMPLE_AUTO_ARTICLE);
                      }}
                      className="px-3 py-2.5 rounded-lg border border-teal text-teal hover:bg-teal/5 transition-all flex items-center justify-center gap-2 text-xs text-center font-bold bg-transparent cursor-pointer"
                      style={{ borderColor: 'var(--nurc-teal)', color: 'var(--nurc-teal)' }}
                    >
                      <BookOpen size={14} />
                      Reader Mode Preview
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <Link 
                      to="/dashboard" 
                      className="px-3 py-2 rounded-lg bg-teal/5 hover:bg-teal/10 transition-colors flex items-center gap-2.5 border border-teal/10" 
                      onClick={() => setMobileOpen(false)}
                    >
                      <Layout size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                      Dashboard
                    </Link>
                    
                    <Link 
                      to="/newsletters" 
                      className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                      onClick={() => setMobileOpen(false)}
                    >
                      <BookOpen size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                      Archive
                    </Link>

                    <Link 
                      to="/dashboard" 
                      className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                      onClick={() => setMobileOpen(false)}
                    >
                      <Settings size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                      Settings
                    </Link>

                    <div className="h-px bg-border my-2" />

                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="w-full text-center py-2.5 rounded-lg text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer bg-transparent"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </nav>
            </div>

            {/* Drawer footer details */}
            <div className="border-t border-border pt-4">
              {currentUser && (
                <div className="px-3 py-2 bg-[#F8F9FA] border rounded-xl text-xs text-muted-foreground leading-normal">
                  <span className="font-bold block text-navy" style={{ color: 'var(--nurc-navy)' }}>{currentUser.fullName}</span>
                  <span className="truncate block mt-0.5">{currentUser.email}</span>
                </div>
              )}
              <div className="text-[10px] text-center text-muted-foreground mt-2 leading-tight">
                © NURC MediaNext Private Ltd.<br />Delhi, India
              </div>
            </div>
          </div>
        </>
    </header>
  );
}
