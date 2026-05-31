import { useState } from 'react';
import { NavLink, Link } from 'react-router';
import { Menu, X, BookOpen, ChevronDown, User, Layout, Briefcase, FileText, Settings, Star, Bookmark } from 'lucide-react';
import { useReaderMode } from './ReaderModeContext';
import { useApp } from '../context/AppContext';

const navLinks = [
  { label: 'Newsletters', to: '/newsletters' },
  { label: 'Sectors', to: '/sector/auto', hasDropdown: true },
  { label: 'Clients', to: '/clients' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
];

const sectorLinks = [
  { label: 'Auto & Mobility', to: '/sector/auto' },
  { label: 'Banking & Finance', to: '/sector/banking' },
  { label: 'Infrastructure', to: '/sector/infrastructure' },
  { label: 'Energy & Power', to: '/sector/energy' },
  { label: 'Healthcare', to: '/sector/healthcare' },
  { label: 'FMCG & Retail', to: '/sector/fmcg' },
];

export function Header() {
  const { currentUser, logout, newsletters } = useApp();
  const { openReader, isOpen: readerOpen } = useReaderMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);

  if (readerOpen) return null;

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm"
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 relative">
        
        {/* Mobile hamburger menu toggle at Top Left */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors shrink-0 mr-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={20} style={{ color: 'var(--nurc-navy)' }} /> : <Menu size={20} style={{ color: 'var(--nurc-navy)' }} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 mr-auto lg:mr-0" onClick={() => setMobileOpen(false)}>
          <div
            className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'var(--nurc-navy)', fontFamily: 'var(--font-display)' }}
          >
            N
          </div>
          <div className="leading-none text-left">
            <div className="font-bold tracking-tight" style={{ color: 'var(--nurc-navy)', fontSize: '15px' }}>
              NURC
            </div>
            <div className="font-medium tracking-widest uppercase" style={{ fontSize: '9px', color: 'var(--nurc-teal)', letterSpacing: '0.15em' }}>
              MediaNext
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
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
                    {sectorLinks.map(s => (
                      <Link
                        key={s.to}
                        to={s.to}
                        className="block px-4 py-2 text-sm hover:bg-muted transition-colors text-left"
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

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="hidden xl:inline text-xs font-semibold text-muted-foreground mr-2">
                Welcome, {currentUser.fullName.split(' ')[0]}
              </span>
              <Link
                to="/dashboard"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border transition-all hover:bg-muted"
                style={{ borderColor: 'var(--border)', color: 'var(--nurc-navy)' }}
              >
                <User size={14} />
                Dashboard
              </Link>
              
              {/* Header Subscription CTA for logged in user */}
              <Link
                to="/subscribe"
                className="btn-nurc hidden md:flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer"
                style={{ background: currentUser.plan === 'None' ? 'var(--nurc-teal)' : 'var(--nurc-navy)' }}
              >
                {currentUser.plan === 'None' ? 'Get Started' : 'Upgrade Plan'}
              </Link>

              <button
                onClick={() => logout()}
                className="hidden md:block px-3 py-2 rounded-lg text-sm font-semibold hover:bg-muted text-red-600 transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                to="/login"
                className="px-3 py-2 rounded text-sm font-semibold hover:bg-muted/60 transition-colors"
                style={{ color: 'var(--nurc-navy)' }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden sm:inline-block px-3 py-2 rounded text-sm font-semibold hover:bg-muted/60 transition-colors mr-1"
                style={{ color: 'var(--nurc-navy)' }}
              >
                Sign Up
              </Link>
              <Link
                to="/newsletters"
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border transition-all hover:bg-muted"
                style={{ borderColor: 'var(--nurc-navy)', color: 'var(--nurc-navy)' }}
              >
                <BookOpen size={14} />
                Sample
              </Link>
              <Link
                to="/subscribe"
                className="btn-nurc hidden md:flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer"
                style={{ background: 'var(--nurc-teal)' }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Slide-out Mobile Overlay Backdrop Blur */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />
      
      {/* Slide-out Mobile Hamburger Drawer Container (Access from left, sliding transition) */}
      <div 
        className={`fixed top-0 bottom-0 left-0 w-72 bg-card border-r border-border p-6 flex flex-col justify-between z-50 shadow-2xl transition-transform duration-300 transform lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        <div className="space-y-6 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
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
            >
              <X size={18} />
            </button>
          </div>

          {/* Links drawer list */}
          <nav className="flex flex-col gap-1.5 text-sm font-bold text-left" style={{ color: 'var(--nurc-navy)' }}>
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard?tab=overview" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <Layout size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Dashboard
                </Link>
                
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    if (newsletters && newsletters[0]) {
                      openReader(newsletters[0].article, newsletters[0].id);
                    }
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5 cursor-pointer font-bold text-navy bg-transparent border-0"
                >
                  <BookOpen size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Today's Newsletter
                </button>

                <Link 
                  to="/dashboard?tab=overview" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <Briefcase size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  My Industries
                </Link>

                <Link 
                  to="/newsletters" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <FileText size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Archive
                </Link>

                <Link 
                  to="/dashboard?tab=overview" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <Bookmark size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Saved Newsletters
                </Link>

                <Link 
                  to="/subscribe" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <Star size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Subscription
                </Link>

                <Link 
                  to="/dashboard?tab=preferences" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <Layout size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Newsletter Appearance
                </Link>

                <Link 
                  to="/dashboard?tab=profile" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Profile
                </Link>

                <Link 
                  to="/dashboard?tab=preferences" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <Settings size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Settings
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/newsletters" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <FileText size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Archive Newsletters
                </Link>
                <Link 
                  to="/pricing" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <Star size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Pricing Plans
                </Link>
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2.5" 
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={15} className="text-teal" style={{ color: 'var(--nurc-teal)' }} />
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Drawer footer details & actions */}
        <div className="border-t border-border pt-4">
          {currentUser ? (
            <div className="space-y-3 text-left">
              <div className="px-3 py-2 bg-[#F8F9FA] border rounded-xl text-xs text-muted-foreground leading-normal">
                <span className="font-bold block text-navy" style={{ color: 'var(--nurc-navy)' }}>{currentUser.fullName}</span>
                <span className="truncate block mt-0.5">{currentUser.email}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer bg-transparent"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="/subscribe"
              className="block text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal cursor-pointer"
              style={{ background: 'var(--nurc-teal)' }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
