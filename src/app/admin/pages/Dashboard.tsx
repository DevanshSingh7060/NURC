import { useMemo } from 'react';
import { Link } from 'react-router';
import {
  Newspaper, Users, LayoutList, Building2, Car, Radio, Rss, MapPin, FileText,
  TrendingUp, Plus, ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { StatCard } from '../components';
import { useAdmin, fmtDate } from '../store';

const PIE_COLORS = ['#0A2540', '#006D7A', '#C8B39E', '#0F3460', '#7FA99B', '#B08968'];

export function AdminDashboard() {
  const { data } = useAdmin();

  const stats = [
    { label: 'Stories', value: data.stories.length, icon: Newspaper, accent: '#006D7A', to: '/admin/stories' },
    { label: 'Clients', value: data.clients.length, icon: Users, accent: '#0A2540', to: '/admin/clients' },
    { label: 'Sections', value: data.sections.length, icon: LayoutList, accent: '#C8B39E', to: '/admin/sections' },
    { label: 'Companies', value: data.companies.length, icon: Building2, accent: '#0F3460', to: '/admin/companies' },
    { label: 'Vehicles', value: data.vehicles.length, icon: Car, accent: '#7FA99B', to: '/admin/vehicles' },
    { label: 'Story Sources', value: data.sources.length, icon: Radio, accent: '#B08968', to: '/admin/sources' },
    { label: 'News Agencies', value: data.agencies.length, icon: Rss, accent: '#006D7A', to: '/admin/news-agencies' },
    { label: 'Cities', value: data.cities.length, icon: MapPin, accent: '#0A2540', to: '/admin/cities' },
  ];

  // stories per update section (bar)
  const storiesByUpdate = useMemo(() => {
    return data.updates.map((u) => ({
      name: u.title.length > 12 ? u.title.slice(0, 12) + '…' : u.title,
      stories: data.stories.filter((s) => s.updateId === u.id).length,
    }));
  }, [data.updates, data.stories]);

  // client status distribution (pie)
  const clientStatus = useMemo(() => {
    const active = data.clients.filter((c) => c.status === 'Active').length;
    const suspend = data.clients.length - active;
    return [
      { name: 'Active', value: active },
      { name: 'Suspend', value: suspend },
    ];
  }, [data.clients]);

  const recentStories = useMemo(
    () => [...data.stories].sort((a, b) => +new Date(b.addDate) - +new Date(a.addDate)).slice(0, 6),
    [data.stories],
  );

  const updateName = (id: string) => data.updates.find((u) => u.id === id)?.title ?? '—';

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--nurc-navy)] to-[var(--nurc-navy-light)] p-8 text-white">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-medium text-[var(--nurc-gold)]">Welcome back, Vimal 👋</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">NURC MediaNext Console</h1>
          <p className="mt-2 text-white/70">
            Manage stories, clients, sections and the entire media catalogue from one premium dashboard.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="bg-[var(--nurc-gold)] text-[var(--nurc-navy)] hover:bg-[var(--nurc-gold)]/90">
              <Link to="/admin/stories/add"><Plus className="size-4" /> New Story</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
              <Link to="/admin/clients/add"><Plus className="size-4" /> New Client</Link>
            </Button>
          </div>
        </div>
        <TrendingUp className="absolute -right-6 -top-6 size-48 text-white/5" />
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} accent={s.accent} to={s.to} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-[var(--nurc-navy)]">Stories by Update Section</h3>
            <Badge variant="secondary">{data.stories.length} total</Badge>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={storiesByUpdate} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <Tooltip cursor={{ fill: 'rgba(0,109,122,0.06)' }} />
              <Bar dataKey="stories" fill="#006D7A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 font-semibold text-[var(--nurc-navy)]">Client Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={clientStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {clientStatus.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent stories */}
      <Card className="p-0">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h3 className="font-semibold text-[var(--nurc-navy)]">Recent Stories</h3>
          <Link to="/admin/stories" className="inline-flex items-center gap-1 text-sm text-[var(--nurc-teal)] hover:underline">
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <ul className="divide-y">
          {recentStories.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-[var(--nurc-sage)]/30">
              <div className="min-w-0">
                <p className="truncate font-medium text-[var(--nurc-navy)]">{s.heading}</p>
                <p className="text-xs text-muted-foreground">
                  {updateName(s.updateId)} · {s.author || 'Unknown'}
                </p>
              </div>
              <Badge variant="outline" className="shrink-0">{fmtDate(s.addDate)}</Badge>
            </li>
          ))}
          {recentStories.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-muted-foreground">No stories yet.</li>
          )}
        </ul>
      </Card>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {[
          { label: 'Add Section', to: '/admin/sections/add', icon: LayoutList },
          { label: 'Add Source', to: '/admin/sources/add', icon: Radio },
          { label: 'Add Agency', to: '/admin/news-agencies/add', icon: Rss },
          { label: 'Add City', to: '/admin/cities/add', icon: MapPin },
          { label: 'Add Master Form', to: '/admin/master-forms/add', icon: FileText },
        ].map((q) => (
          <Link
            key={q.to}
            to={q.to}
            className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--nurc-teal)]/40 hover:shadow-md"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-[var(--nurc-sage)] text-[var(--nurc-navy)]">
              <q.icon className="size-4" />
            </span>
            <span className="text-sm font-medium text-[var(--nurc-navy)]">{q.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
