import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/app/components/ui/select';
import { PageHeader, DataTable, FormCard, Field, FieldGrid, type Column } from '../components';
import { useAdmin, fmtDate, type Company } from '../store';

export function CompaniesView() {
  const { data, remove } = useAdmin();
  const updateName = (id: string) => data.updates.find((u) => u.id === id)?.title ?? '—';

  const columns: Column<Company>[] = [
    { key: 'name', header: 'Company Name', sortValue: (r) => r.name.toLowerCase(),
      render: (r) => (
        <div>
          <p className="font-medium text-[var(--nurc-navy)]">{r.name}</p>
          <p className="text-xs text-muted-foreground">Known as {r.shortName}</p>
        </div>
      ) },
    { key: 'updateId', header: 'Update Section', render: (r) => <Badge variant="secondary">{updateName(r.updateId)}</Badge> },
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
            onClick={() => { if (confirm(`Delete company "${r.name}"?`)) { remove('companies', r.id); toast.success('Company deleted'); } }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Companies" description="Auto manufacturers and corporate entities." actionLabel="Add Company" actionTo="/admin/companies/add" />
      <DataTable columns={columns} rows={data.companies} searchKeys={['name', 'shortName', 'country']} searchPlaceholder="Search companies…" />
    </div>
  );
}

export function CompaniesAdd() {
  const { data, create } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', shortName: '', country: '', updateId: '', summary: '', description: '', pageName: '', logo: '', banner: '',
  });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    create('companies', {
      name: form.name.trim(), shortName: form.shortName.trim(), country: form.country.trim(),
      updateId: form.updateId, summary: form.summary.trim(), description: form.description.trim(),
      pageName: form.pageName.trim() || form.name.trim().toLowerCase().replace(/\s+/g, '-'),
      logo: form.logo.trim(), banner: form.banner.trim(),
    });
    toast.success('Company added');
    navigate('/admin/companies');
  };

  return (
    <div>
      <PageHeader title="Add Auto Manufacturer" backTo="/admin/companies" />
      <FormCard title="Company details" onSubmit={submit} submitLabel="Add Company" backTo="/admin/companies">
        <FieldGrid>
          <Field label="Name" htmlFor="name" required>
            <Input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full legal name" />
          </Field>
          <Field label="Short Name" htmlFor="short">
            <Input id="short" value={form.shortName} onChange={(e) => set('shortName', e.target.value)} placeholder="Popularly known as" />
          </Field>
          <Field label="Country" htmlFor="country">
            <Input id="country" value={form.country} onChange={(e) => set('country', e.target.value)} />
          </Field>
          <Field label="Update Section">
            <Select value={form.updateId} onValueChange={(v) => set('updateId', v)}>
              <SelectTrigger><SelectValue placeholder="Select update" /></SelectTrigger>
              <SelectContent>{data.updates.map((u) => <SelectItem key={u.id} value={u.id}>{u.title}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Logo (filename / URL)" htmlFor="logo">
            <Input id="logo" value={form.logo} onChange={(e) => set('logo', e.target.value)} placeholder="e.g. bmw.png" />
          </Field>
          <Field label="Banner (filename / URL)" htmlFor="banner">
            <Input id="banner" value={form.banner} onChange={(e) => set('banner', e.target.value)} />
          </Field>
          <Field label="Page Name" htmlFor="page" hint="URL slug; auto-generated if left blank.">
            <Input id="page" value={form.pageName} onChange={(e) => set('pageName', e.target.value)} placeholder="company-slug" />
          </Field>
        </FieldGrid>
        <Field label="Summary" htmlFor="summary">
          <Input id="summary" value={form.summary} onChange={(e) => set('summary', e.target.value)} />
        </Field>
        <Field label="Description" htmlFor="desc">
          <Textarea id="desc" rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} />
        </Field>
      </FormCard>
    </div>
  );
}
