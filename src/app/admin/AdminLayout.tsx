import React, { useState, Suspense } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import {
  LayoutDashboard,
  LayoutList,
  Newspaper,
  Users,
  Radio,
  Rss,
  Building2,
  MapPin,
  Car,
  FileText,
  Menu,
  X,
  ExternalLink,
  RotateCcw,
  Zap,
  Megaphone,
  Captions,
  Mail,
} from 'lucide-react';
import { Toaster } from '@/app/components/ui/sonner';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/app/components/ui/utils';
import { AdminProvider, useAdmin } from './store';

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  end?: boolean;
}

const NAV: NavItem[] = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Updates', to: '/admin/updates', icon: Megaphone },
  { label: 'Sections', to: '/admin/sections', icon: LayoutList },
  { label: 'Stories', to: '/admin/stories', icon: Newspaper },
  { label: 'Clients', to: '/admin/clients', icon: Users },
  { label: 'Send Newsletters', to: '/admin/newsletters', icon: Mail },
  { label: 'Story Sources', to: '/admin/sources', icon: Radio },
  { label: 'News Agencies', to: '/admin/news-agencies', icon: Rss },
  { label: 'Companies', to: '/admin/companies', icon: Building2 },
  { label: 'Cities', to: '/admin/cities', icon: MapPin },
  { label: 'Vehicles', to: '/admin/vehicles', icon: Car },
  { label: 'Master Forms', to: '/admin/master-forms', icon: FileText },
  { label: 'Form Captions', to: '/admin/form-captions', icon: Captions },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
        <span className="flex size-9 items-center justify-center rounded-lg bg-[var(--nurc-gold)] font-bold text-[var(--nurc-navy)]">
          N
        </span>
        <div className="leading-tight">
          <p className="font-semibold text-white">NURC</p>
          <p className="text-[11px] uppercase tracking-widest text-[var(--nurc-gold)]">
            Admin Console
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-[var(--nurc-gold)] text-[var(--nurc-navy)] shadow-sm'
                  : 'text-white/70 hover:bg-white/10 hover:text-white',
              )
            }
          >
            <item.icon className="size-[18px] shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <a
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
        >
          <ExternalLink className="size-[18px]" /> View Website
        </a>
      </div>
    </div>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  const { resetData } = useAdmin();
  const { pathname } = useLocation();
  const crumb = pathname.replace('/admin', '').split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu}>
          <Menu className="size-5" />
        </Button>
        <div className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
          <Link to="/admin" className="hover:text-[var(--nurc-teal)]">
            Admin
          </Link>
          {crumb.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="opacity-40">/</span>
              <span
                className={
                  i === crumb.length - 1
                    ? 'font-medium capitalize text-[var(--nurc-navy)]'
                    : 'capitalize'
                }
              >
                {c.replace(/-/g, ' ')}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (confirm('Reset all admin data back to the seeded sample set?')) resetData();
          }}
          className="gap-1.5"
        >
          <RotateCcw className="size-3.5" /> <span className="hidden sm:inline">Reset data</span>
        </Button>
        <div className="flex items-center gap-2 rounded-full border bg-card py-1 pl-1 pr-3">
          <span className="flex size-7 items-center justify-center rounded-full bg-[var(--nurc-navy)] text-xs font-semibold text-white">
            VP
          </span>
          <span className="hidden text-sm font-medium text-[var(--nurc-navy)] sm:inline">
            Vimal Parashar
          </span>
        </div>
      </div>
    </header>
  );
}

function AdminShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-[var(--nurc-navy)] lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-[var(--nurc-navy)]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-3 text-white hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-5" />
            </Button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="py-20 text-center text-sm text-muted-foreground">Loading…</div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export function AdminRoot() {
  return (
    <AdminProvider>
      <AdminShell />
      <Toaster position="top-right" richColors />
    </AdminProvider>
  );
}
