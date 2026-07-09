import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Pencil, Send } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/app/components/ui/select';
import { PageHeader, DataTable, FormCard, Field, FieldGrid, type Column } from '../components';
import { useAdmin, fmtDate, type Update } from '../store';

/* --------------------------- Updates: View --------------------------- */

export function UpdatesView() {
  const { data, remove } = useAdmin();

  const sectionCount = (id: string) => data.sections.filter((s) => s.updateId === id).length;
  const storyCount = (id: string) => data.stories.filter((s) => s.updateId === id).length;
  const subCount = (id: string) => data.publications.filter((p) => p.updateId === id).length;

  const columns: Column<Update>[] = [
    {
      key: 'title', header: 'Update', sortValue: (r) => r.title.toLowerCase(),
      render: (r) => (
        <div className="max-w-sm">
          <p className="font-medium text-[var(--nurc-navy)]">{r.title}</p>
          <p className="truncate text-xs text-muted-foreground">{r.summary}</p>
        </div>
      ),
    },
    { key: 'type', header: 'Type', sortValue: (r) => r.type,
      render: (r) => <Badge variant={r.type === 'SPECIAL' ? 'default' : 'secondary'}>{r.type}</Badge> },
    { key: 'sections', header: 'Sections', sortValue: (r) => sectionCount(r.id),
      render: (r) => <span className="tabular-nums">{sectionCount(r.id)}</span> },
    { key: 'stories', header: 'Stories', sortValue: (r) => storyCount(r.id),
      render: (r) => <span className="tabular-nums">{storyCount(r.id)}</span> },
    { key: 'subs', header: 'Publications', sortValue: (r) => subCount(r.id),
      render: (r) => <span className="tabular-nums">{subCount(r.id)}</span> },
    { key: 'lastUpdated', header: 'Last Updated', sortValue: (r) => r.lastUpdated, render: (r) => fmtDate(r.lastUpdated) },
    {
      key: 'actions', header: '', className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="size-8" title="Edit" onClick={() => toast.info('Edit is a demo action.')}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" title="Delete"
            onClick={() => { if (confirm(`Delete update "${r.title}"? Sections and stories keep their reference.`)) { remove('updates', r.id); toast.success('Update deleted'); } }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Updates" description="Top-level newsletter editions that contain sections and stories."
        actionLabel="Add Update" actionTo="/admin/updates/add">
        <Button asChild variant="outline"><Link to="/admin/updates/publish"><Send className="size-4" /> Publish</Link></Button>
      </PageHeader>
      <DataTable columns={columns} rows={data.updates} searchKeys={['title', 'summary']} searchPlaceholder="Search updates…" />
    </div>
  );
}

/* --------------------------- Updates: Add --------------------------- */

export function UpdatesAdd() {
  const { create } = useAdmin();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [type, setType] = useState<'NORMAL' | 'SPECIAL'>('NORMAL');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { toast.error('Title is required'); return; }
    create('updates', { title: title.trim(), summary: summary.trim(), type });
    toast.success('Update added');
    navigate('/admin/updates');
  };

  return (
    <div>
      <PageHeader title="Add Update" backTo="/admin/updates" />
      <FormCard title="Update details" description="Create a new update edition." onSubmit={submit} submitLabel="Add Update" backTo="/admin/updates">
        <Field label="Title" htmlFor="title" required>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={50} placeholder="e.g. Automobile" />
        </Field>
        <Field label="Type">
          <Select value={type} onValueChange={(v) => setType(v as 'NORMAL' | 'SPECIAL')}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="NORMAL">Normal</SelectItem>
              <SelectItem value="SPECIAL">Special</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Summary" htmlFor="summary">
          <Textarea id="summary" rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Short description of this update." />
        </Field>
      </FormCard>
    </div>
  );
}

/* --------------------------- Updates: Publish --------------------------- */

export function UpdatesPublish() {
  const { data, create } = useAdmin();
  const [updateId, setUpdateId] = useState('');
  const [clientId, setClientId] = useState('');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().slice(0, 10));

  const updateName = (id: string) => data.updates.find((u) => u.id === id)?.title ?? '—';
  const clientName = (id: string) => data.clients.find((c) => c.id === id)?.organization ?? 'All clients';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateId) { toast.error('Please select an update'); return; }
    create('publications', { updateId, clientId, publishDate: new Date(publishDate).toISOString() });
    toast.success(`Published "${updateName(updateId)}"`);
    setUpdateId(''); setClientId('');
  };

  const history = [...data.publications].sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate));

  return (
    <div>
      <PageHeader title="Publish Update" backTo="/admin/updates" />
      <FormCard title="Publish an update edition" description="Send/publish an update to a client on a chosen date." onSubmit={submit} submitLabel="Publish" backTo="/admin/updates">
        <FieldGrid>
          <Field label="Update" required>
            <Select value={updateId} onValueChange={setUpdateId}>
              <SelectTrigger><SelectValue placeholder="Select update" /></SelectTrigger>
              <SelectContent>{data.updates.map((u) => <SelectItem key={u.id} value={u.id}>{u.title}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Client" hint="Leave empty to publish to all clients.">
            <Select value={clientId} onValueChange={setClientId}>
              <SelectTrigger><SelectValue placeholder="All clients" /></SelectTrigger>
              <SelectContent>{data.clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.organization}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Publish Date">
            <Input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />
          </Field>
        </FieldGrid>
      </FormCard>

      <div className="mx-auto mt-6 max-w-3xl">
        <h3 className="mb-2 text-sm font-medium text-[var(--nurc-navy)]">Recent publications</h3>
        <div className="rounded-xl border bg-card divide-y">
          {history.length === 0 && <p className="px-4 py-6 text-center text-sm text-muted-foreground">No publications yet.</p>}
          {history.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="font-medium text-[var(--nurc-navy)]">{updateName(p.updateId)}</span>
              <span className="text-muted-foreground">{clientName(p.clientId)}</span>
              <Badge variant="outline">{fmtDate(p.publishDate)}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
