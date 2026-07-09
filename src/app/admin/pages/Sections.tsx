import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/app/components/ui/select';
import { PageHeader, DataTable, FormCard, Field, type Column } from '../components';
import { useAdmin, fmtDate, type Section } from '../store';

export function SectionsView() {
  const { data, remove } = useAdmin();
  const [updateFilter, setUpdateFilter] = useState('all');

  const updateName = (id: string) => data.updates.find((u) => u.id === id)?.title ?? '—';
  const storyCount = (sectionId: string) => data.stories.filter((s) => s.sectionId === sectionId).length;

  const rows = updateFilter === 'all'
    ? data.sections
    : data.sections.filter((s) => s.updateId === updateFilter);

  const columns: Column<Section>[] = [
    {
      key: 'title', header: 'Section', sortValue: (r) => r.title.toLowerCase(),
      render: (r) => (
        <div>
          <p className="font-medium text-[var(--nurc-navy)]">{r.title}</p>
          <p className="text-xs text-muted-foreground">{updateName(r.updateId)}</p>
        </div>
      ),
    },
    { key: 'displayPosition', header: 'Position', sortValue: (r) => r.displayPosition,
      render: (r) => <Badge variant="secondary">{r.displayPosition}</Badge> },
    { key: 'stories', header: 'Stories', sortValue: (r) => storyCount(r.id),
      render: (r) => <span className="tabular-nums">{storyCount(r.id)}</span> },
    { key: 'addDate', header: 'Add Date', sortValue: (r) => r.addDate, render: (r) => fmtDate(r.addDate) },
    { key: 'lastUpdated', header: 'Last Updated', sortValue: (r) => r.lastUpdated, render: (r) => fmtDate(r.lastUpdated) },
    {
      key: 'actions', header: '', className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="size-8" title="Edit"
            onClick={() => toast.info('Edit is a demo action in this build.')}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" title="Delete"
            onClick={() => {
              if (confirm(`Delete section "${r.title}"?`)) { remove('sections', r.id); toast.success('Section deleted'); }
            }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Sections"
        description="Organise stories into sections within each update."
        actionLabel="Add Section"
        actionTo="/admin/sections/add"
      />
      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={['title']}
        searchPlaceholder="Search sections…"
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

export function SectionsAdd() {
  const { data, create } = useAdmin();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [position, setPosition] = useState('1');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { toast.error('Title is required'); return; }
    if (!updateId) { toast.error('Please select an update section'); return; }
    create('sections', { title: title.trim(), updateId, displayPosition: Number(position) || 1 });
    toast.success('Section added');
    navigate('/admin/sections');
  };

  return (
    <div>
      <PageHeader title="Add Section" backTo="/admin/sections" />
      <FormCard title="Section details" description="Create a new section under an update." onSubmit={submit} submitLabel="Add Section" backTo="/admin/sections">
        <Field label="Title" htmlFor="title" required>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Electric Vehicles" maxLength={100} />
        </Field>
        <Field label="Update Section" required>
          <Select value={updateId} onValueChange={setUpdateId}>
            <SelectTrigger><SelectValue placeholder="Select update" /></SelectTrigger>
            <SelectContent>
              {data.updates.map((u) => <SelectItem key={u.id} value={u.id}>{u.title}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Display Position" htmlFor="pos" hint="Lower numbers appear first.">
          <Input id="pos" type="number" min={1} value={position} onChange={(e) => setPosition(e.target.value)} className="w-32" />
        </Field>
      </FormCard>
    </div>
  );
}
