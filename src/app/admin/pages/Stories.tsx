import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Pencil, ExternalLink, Copy } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import { Checkbox } from '@/app/components/ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/app/components/ui/select';
import { PageHeader, DataTable, FormCard, Field, FieldGrid, type Column } from '../components';
import { useAdmin, fmtDate, type Story } from '../store';

/* --------------------------- Stories: View --------------------------- */

export function StoriesView() {
  const { data, remove } = useAdmin();
  const [updateFilter, setUpdateFilter] = useState('all');

  const name = (coll: 'updates' | 'sections' | 'clients' | 'agencies' | 'sources', id: string) => {
    const map = {
      updates: data.updates.find((u) => u.id === id)?.title,
      sections: data.sections.find((s) => s.id === id)?.title,
      clients: data.clients.find((c) => c.id === id)?.organization,
      agencies: data.agencies.find((a) => a.id === id)?.agencyName,
      sources: data.sources.find((s) => s.id === id)?.source,
    } as const;
    return map[coll] ?? '—';
  };

  const rows = updateFilter === 'all' ? data.stories : data.stories.filter((s) => s.updateId === updateFilter);

  const columns: Column<Story>[] = [
    {
      key: 'heading', header: 'Story', sortValue: (r) => r.heading.toLowerCase(),
      render: (r) => (
        <div className="max-w-md">
          <p className="truncate font-medium text-[var(--nurc-navy)]">{r.heading}</p>
          <p className="truncate text-xs text-muted-foreground">
            {name('updates', r.updateId)} · {name('sections', r.sectionId)} · {r.author || 'Unknown'}
          </p>
        </div>
      ),
    },
    { key: 'client', header: 'Client', render: (r) => <span className="text-sm">{name('clients', r.clientId)}</span> },
    { key: 'source', header: 'Agency / Source',
      render: (r) => (
        <div className="text-xs text-muted-foreground">
          <div>{name('agencies', r.newsAgencyId)}</div>
          <div>{name('sources', r.storySourceId)}</div>
        </div>
      ) },
    { key: 'storyDate', header: 'Story Date', sortValue: (r) => r.storyDate, render: (r) => fmtDate(r.storyDate) },
    { key: 'lastUpdated', header: 'Last Updated', sortValue: (r) => r.lastUpdated, render: (r) => fmtDate(r.lastUpdated) },
    {
      key: 'actions', header: '', className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1">
          {r.storyLink && (
            <Button asChild variant="ghost" size="icon" className="size-8" title="Open link">
              <a href={r.storyLink} target="_blank" rel="noreferrer"><ExternalLink className="size-4" /></a>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="size-8" title="Copy" onClick={() => toast.info('Copy is a demo action.')}>
            <Copy className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8" title="Edit" onClick={() => toast.info('Edit is a demo action.')}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" title="Delete"
            onClick={() => { if (confirm(`Delete story "${r.heading}"?`)) { remove('stories', r.id); toast.success('Story deleted'); } }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Stories"
        description="Browse, search and manage all published stories."
        actionLabel="Add Story"
        actionTo="/admin/stories/add"
      >
        <Button asChild variant="outline"><Link to="/admin/stories/shortcuts">Manage Shortcuts</Link></Button>
      </PageHeader>
      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={['heading', 'author']}
        searchPlaceholder="Search stories…"
        toolbar={
          <Select value={updateFilter} onValueChange={setUpdateFilter}>
            <SelectTrigger className="w-[180px] bg-background"><SelectValue placeholder="All updates" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All updates</SelectItem>
              {data.updates.map((u) => <SelectItem key={u.id} value={u.id}>{u.title}</SelectItem>)}
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}

// small helper removed — Add button handled by PageHeader action

/* --------------------------- Stories: Add --------------------------- */

export function StoriesAdd() {
  const { data, create } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    heading: '', story: '', author: '', storyLink: '',
    storyDate: new Date().toISOString().slice(0, 10),
    updateId: '', sectionId: '', clientId: '', newsAgencyId: '', storySourceId: '', copyStory: false,
  });
  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  // sections filtered by selected update
  const sectionOptions = useMemo(
    () => data.sections.filter((s) => !form.updateId || s.updateId === form.updateId),
    [data.sections, form.updateId],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.heading.trim()) { toast.error('Heading is required'); return; }
    if (!form.updateId) { toast.error('Please select an update'); return; }
    create('stories', {
      heading: form.heading.trim(),
      story: form.story,
      author: form.author.trim(),
      storyLink: form.storyLink.trim(),
      storyDate: new Date(form.storyDate).toISOString(),
      updateId: form.updateId,
      sectionId: form.sectionId,
      clientId: form.clientId,
      newsAgencyId: form.newsAgencyId,
      storySourceId: form.storySourceId,
      displayPosition: data.stories.length + 1,
    });
    toast.success('Story added');
    navigate('/admin/stories');
  };

  return (
    <div>
      <PageHeader title="Add Story" backTo="/admin/stories" />
      <FormCard title="Story details" onSubmit={submit} submitLabel="Add Story" backTo="/admin/stories">
        <Field label="Heading" htmlFor="heading" required>
          <Input id="heading" value={form.heading} onChange={(e) => set('heading', e.target.value)} placeholder="Story headline" />
        </Field>
        <Field label="Story" htmlFor="story" hint="Rich text is stored as HTML in the live system.">
          <Textarea id="story" rows={6} value={form.story} onChange={(e) => set('story', e.target.value)} placeholder="Write the story body…" />
        </Field>
        <FieldGrid>
          <Field label="Story Date" htmlFor="date">
            <Input id="date" type="date" value={form.storyDate} onChange={(e) => set('storyDate', e.target.value)} />
          </Field>
          <Field label="Author" htmlFor="author">
            <Input id="author" value={form.author} onChange={(e) => set('author', e.target.value)} placeholder="Reporter name" />
          </Field>
          <Field label="Update" required>
            <Select value={form.updateId} onValueChange={(v) => { set('updateId', v); set('sectionId', ''); }}>
              <SelectTrigger><SelectValue placeholder="Select update" /></SelectTrigger>
              <SelectContent>{data.updates.map((u) => <SelectItem key={u.id} value={u.id}>{u.title}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Section">
            <Select value={form.sectionId} onValueChange={(v) => set('sectionId', v)} disabled={!form.updateId}>
              <SelectTrigger><SelectValue placeholder={form.updateId ? 'Select section' : 'Select update first'} /></SelectTrigger>
              <SelectContent>{sectionOptions.map((s) => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Client">
            <Select value={form.clientId} onValueChange={(v) => set('clientId', v)}>
              <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
              <SelectContent>{data.clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.organization}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="News Agency">
            <Select value={form.newsAgencyId} onValueChange={(v) => set('newsAgencyId', v)}>
              <SelectTrigger><SelectValue placeholder="Select agency" /></SelectTrigger>
              <SelectContent>{data.agencies.map((a) => <SelectItem key={a.id} value={a.id}>{a.agencyName}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Story Source">
            <Select value={form.storySourceId} onValueChange={(v) => set('storySourceId', v)}>
              <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
              <SelectContent>{data.sources.map((s) => <SelectItem key={s.id} value={s.id}>{s.source}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Story Link" htmlFor="link">
            <Input id="link" value={form.storyLink} onChange={(e) => set('storyLink', e.target.value)} placeholder="https://…" />
          </Field>
        </FieldGrid>
        <label className="flex items-center gap-2 text-sm text-[var(--nurc-navy)]">
          <Checkbox checked={form.copyStory} onCheckedChange={(v) => set('copyStory', Boolean(v))} />
          Copy this story to related sections
        </label>
      </FormCard>
    </div>
  );
}

/* --------------------------- Manage Shortcuts --------------------------- */

export function StoriesShortcuts() {
  const { data, setShortcuts } = useAdmin();
  const [value, setValue] = useState(data.shortcuts);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setShortcuts(value);
    toast.success('Shortcuts saved');
  };

  return (
    <div>
      <PageHeader title="Manage Shortcuts" backTo="/admin/stories" />
      <FormCard title="Story shortcuts" description="Comma-separated keyword shortcuts used across the newsroom." onSubmit={save} submitLabel="Save Shortcuts">
        <Field label="Shortcuts" htmlFor="sc" hint="Separate each shortcut with a comma.">
          <Textarea id="sc" rows={10} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div className="flex flex-wrap gap-2">
          {value.split(',').map((s) => s.trim()).filter(Boolean).map((s, i) => (
            <Badge key={i} variant="secondary">{s}</Badge>
          ))}
        </div>
      </FormCard>
    </div>
  );
}
