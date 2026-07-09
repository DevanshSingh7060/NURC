import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { PageHeader, DataTable, FormCard, Field, FieldGrid, type Column } from '../components';
import { useAdmin, fmtDate, type City } from '../store';

export function CitiesView() {
  const { data, remove } = useAdmin();

  const columns: Column<City>[] = [
    { key: 'name', header: 'City Name', sortValue: (r) => r.name.toLowerCase(),
      render: (r) => <span className="font-medium text-[var(--nurc-navy)]">{r.name}</span> },
    { key: 'shortName', header: 'Popularly Known As', render: (r) => r.shortName },
    { key: 'country', header: 'Country', sortValue: (r) => r.country, render: (r) => r.country },
    { key: 'lastUpdated', header: 'Last Update', sortValue: (r) => r.lastUpdated, render: (r) => fmtDate(r.lastUpdated) },
    {
      key: 'actions', header: '', className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="size-8" title="Edit" onClick={() => toast.info('Edit is a demo action.')}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" title="Delete"
            onClick={() => { if (confirm(`Delete city "${r.name}"?`)) { remove('cities', r.id); toast.success('City deleted'); } }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Cities" description="Geographic locations used across content." actionLabel="Add City" actionTo="/admin/cities/add" />
      <DataTable columns={columns} rows={data.cities} searchKeys={['name', 'shortName', 'country']} searchPlaceholder="Search cities…" />
    </div>
  );
}

export function CitiesAdd() {
  const { create } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', shortName: '', country: '', pageName: '' });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('City name is required'); return; }
    create('cities', {
      name: form.name.trim(), shortName: form.shortName.trim(), country: form.country.trim(),
      pageName: form.pageName.trim() || form.name.trim().toLowerCase().replace(/\s+/g, '-'),
    });
    toast.success('City added');
    navigate('/admin/cities');
  };

  return (
    <div>
      <PageHeader title="Add City" backTo="/admin/cities" />
      <FormCard title="City details" onSubmit={submit} submitLabel="Add City" backTo="/admin/cities">
        <FieldGrid>
          <Field label="Name" htmlFor="name" required>
            <Input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <Field label="Short Name" htmlFor="short" hint="Popularly known as">
            <Input id="short" value={form.shortName} onChange={(e) => set('shortName', e.target.value)} />
          </Field>
          <Field label="Country" htmlFor="country">
            <Input id="country" value={form.country} onChange={(e) => set('country', e.target.value)} />
          </Field>
          <Field label="Page Name" htmlFor="page" hint="URL slug; auto-generated if blank.">
            <Input id="page" value={form.pageName} onChange={(e) => set('pageName', e.target.value)} />
          </Field>
        </FieldGrid>
      </FormCard>
    </div>
  );
}
