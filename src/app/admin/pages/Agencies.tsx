import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { PageHeader, DataTable, FormCard, Field, type Column } from '../components';
import { useAdmin, fmtDate, type Agency } from '../store';

export function AgenciesView() {
  const { data, remove } = useAdmin();

  const columns: Column<Agency>[] = [
    { key: 'agencyName', header: 'News Agency', sortValue: (r) => r.agencyName.toLowerCase(),
      render: (r) => <span className="font-medium text-[var(--nurc-navy)]">{r.agencyName}</span> },
    { key: 'addDate', header: 'Add Date', sortValue: (r) => r.addDate, render: (r) => fmtDate(r.addDate) },
    { key: 'lastUpdated', header: 'Last Updated', sortValue: (r) => r.lastUpdated, render: (r) => fmtDate(r.lastUpdated) },
    {
      key: 'actions', header: '', className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="size-8" title="Edit" onClick={() => toast.info('Edit is a demo action.')}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" title="Delete"
            onClick={() => { if (confirm(`Delete agency "${r.agencyName}"?`)) { remove('agencies', r.id); toast.success('Agency deleted'); } }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="News Agencies" description="Wire services and agencies that supply stories." actionLabel="Add Agency" actionTo="/admin/news-agencies/add" />
      <DataTable columns={columns} rows={data.agencies} searchKeys={['agencyName']} searchPlaceholder="Search agencies…" />
    </div>
  );
}

export function AgenciesAdd() {
  const { create } = useAdmin();
  const navigate = useNavigate();
  const [agencyName, setAgencyName] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agencyName.trim()) { toast.error('Agency name is required'); return; }
    create('agencies', { agencyName: agencyName.trim() });
    toast.success('Agency added');
    navigate('/admin/news-agencies');
  };

  return (
    <div>
      <PageHeader title="Add News Agency" backTo="/admin/news-agencies" />
      <FormCard title="Agency details" onSubmit={submit} submitLabel="Add Agency" backTo="/admin/news-agencies">
        <Field label="Agency" htmlFor="agency" required>
          <Input id="agency" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} placeholder="e.g. Reuters" maxLength={50} />
        </Field>
      </FormCard>
    </div>
  );
}
