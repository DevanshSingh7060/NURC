import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Pencil, Mail } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/app/components/ui/select';
import { PageHeader, DataTable, FormCard, Field, FieldGrid, type Column } from '../components';
import { useAdmin, fmtDate, type Client } from '../store';

export function ClientsView() {
  const { data, remove, update } = useAdmin();
  const [statusFilter, setStatusFilter] = useState('all');

  const rows = statusFilter === 'all' ? data.clients : data.clients.filter((c) => c.status === statusFilter);

  const columns: Column<Client>[] = [
    {
      key: 'organization', header: 'Client', sortValue: (r) => r.organization.toLowerCase(),
      render: (r) => (
        <div>
          <p className="font-medium text-[var(--nurc-navy)]">{r.organization}</p>
          <p className="text-xs text-muted-foreground">{r.contactPerson} · {r.emailAddress}</p>
        </div>
      ),
    },
    {
      key: 'status', header: 'Status', sortValue: (r) => r.status,
      render: (r) => (
        <Select value={r.status} onValueChange={(v) => { update('clients', r.id, { status: v as Client['status'] }); toast.success(`Marked ${v}`); }}>
          <SelectTrigger className="h-8 w-[120px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Suspend">Suspend</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    { key: 'telephoneNumber', header: 'Phone', render: (r) => <span className="text-sm">{r.telephoneNumber}</span> },
    { key: 'addDate', header: 'Add Date', sortValue: (r) => r.addDate, render: (r) => fmtDate(r.addDate) },
    { key: 'lastUpdated', header: 'Last Updated', sortValue: (r) => r.lastUpdated, render: (r) => fmtDate(r.lastUpdated) },
    {
      key: 'actions', header: '', className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="size-8" title="Send Newsletter" onClick={() => toast.info('Send Newsletter is a demo action.')}>
            <Mail className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8" title="Edit" onClick={() => toast.info('Edit is a demo action.')}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" title="Delete"
            onClick={() => { if (confirm(`Delete client "${r.organization}"?`)) { remove('clients', r.id); toast.success('Client deleted'); } }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Clients" description="Manage subscriber organisations and their status." actionLabel="Add Client" actionTo="/admin/clients/add" />
      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={['organization', 'contactPerson', 'emailAddress']}
        searchPlaceholder="Search clients…"
        toolbar={
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Suspend">Suspend</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}

export function ClientsAdd() {
  const { create } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    organization: '', contactPerson: '', emailAddress: '', password: '',
    telephoneNumber: '', address: '', status: 'Active',
  });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.organization.trim()) { toast.error('Organization is required'); return; }
    if (!form.emailAddress.trim()) { toast.error('Email is required'); return; }
    create('clients', {
      organization: form.organization.trim(),
      contactPerson: form.contactPerson.trim(),
      emailAddress: form.emailAddress.trim(),
      password: form.password || '••••••',
      telephoneNumber: form.telephoneNumber.trim(),
      address: form.address.trim(),
      status: form.status as Client['status'],
    });
    toast.success('Client added');
    navigate('/admin/clients');
  };

  return (
    <div>
      <PageHeader title="Add Client" backTo="/admin/clients" />
      <FormCard title="Client details" onSubmit={submit} submitLabel="Add Client" backTo="/admin/clients">
        <Field label="Organization" htmlFor="org" required>
          <Input id="org" value={form.organization} onChange={(e) => set('organization', e.target.value)} placeholder="Company name" />
        </Field>
        <FieldGrid>
          <Field label="Contact Person" htmlFor="cp">
            <Input id="cp" value={form.contactPerson} onChange={(e) => set('contactPerson', e.target.value)} />
          </Field>
          <Field label="Email Address" htmlFor="em" required>
            <Input id="em" type="email" value={form.emailAddress} onChange={(e) => set('emailAddress', e.target.value)} />
          </Field>
          <Field label="Password" htmlFor="pw">
            <Input id="pw" type="password" value={form.password} onChange={(e) => set('password', e.target.value)} placeholder="Set login password" />
          </Field>
          <Field label="Telephone Number" htmlFor="tel">
            <Input id="tel" value={form.telephoneNumber} onChange={(e) => set('telephoneNumber', e.target.value)} />
          </Field>
          <Field label="Status">
            <Select value={form.status} onValueChange={(v) => set('status', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Suspend">Suspend</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FieldGrid>
        <Field label="Address" htmlFor="addr">
          <Textarea id="addr" rows={3} value={form.address} onChange={(e) => set('address', e.target.value)} />
        </Field>
      </FormCard>
    </div>
  );
}
