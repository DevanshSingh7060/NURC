import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { PageHeader, DataTable, FormCard, Field, type Column } from '../components';
import { useAdmin, fmtDate, type Source } from '../store';

export function SourcesView() {
  const { data, remove } = useAdmin();

  const columns: Column<Source>[] = [
    { key: 'source', header: 'Source', sortValue: (r) => r.source.toLowerCase(),
      render: (r) => <span className="font-medium text-[var(--nurc-navy)]">{r.source}</span> },
    { key: 'addDate', hideBelow: 'md', header: 'Add Date', sortValue: (r) => r.addDate, render: (r) => fmtDate(r.addDate) },
    { key: 'lastUpdated', hideBelow: 'lg', header: 'Last Updated', sortValue: (r) => r.lastUpdated, render: (r) => fmtDate(r.lastUpdated) },
    {
      key: 'actions', header: '', className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="size-8" title="Edit" onClick={() => toast.info('Edit is a demo action.')}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" title="Delete"
            onClick={() => { if (confirm(`Delete source "${r.source}"?`)) { remove('sources', r.id); toast.success('Source deleted'); } }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Story Sources" description="Publications and outlets cited in stories." actionLabel="Add Source" actionTo="/admin/sources/add" />
      <DataTable columns={columns} rows={data.sources} searchKeys={['source']} searchPlaceholder="Search sources…" />
    </div>
  );
}

export function SourcesAdd() {
  const { create } = useAdmin();
  const navigate = useNavigate();
  const [source, setSource] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source.trim()) { toast.error('Source is required'); return; }
    create('sources', { source: source.trim() });
    toast.success('Source added');
    navigate('/admin/sources');
  };

  return (
    <div>
      <PageHeader title="Add Story Source" backTo="/admin/sources" />
      <FormCard title="Source details" onSubmit={submit} submitLabel="Add Source" backTo="/admin/sources">
        <Field label="Source" htmlFor="source" required>
          <Input id="source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g. Business Standard" maxLength={50} />
        </Field>
      </FormCard>
    </div>
  );
}
