import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import { PageHeader, DataTable, FormCard, Field, type Column } from '../components';
import { useAdmin, fmtDate, type MasterForm } from '../store';

export function MasterFormView() {
  const { data, remove } = useAdmin();

  const columns: Column<MasterForm>[] = [
    { key: 'formName', header: 'Form Name', sortValue: (r) => r.formName.toLowerCase(),
      render: (r) => <span className="font-medium text-[var(--nurc-navy)]">{r.formName}</span> },
    { key: 'fields', hideBelow: 'md', header: 'Captions',
      render: (r) => (
        <div className="flex flex-wrap gap-1">
          {r.formCaption.split('\n').map((c) => c.trim()).filter(Boolean).slice(0, 5).map((c, i) => (
            <Badge key={i} variant="outline">{c}</Badge>
          ))}
        </div>
      ) },
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
            onClick={() => { if (confirm(`Delete form "${r.formName}"?`)) { remove('masterForms', r.id); toast.success('Form deleted'); } }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Master Forms" description="Reusable form templates and their field captions." actionLabel="Add Master Form" actionTo="/admin/master-forms/add" />
      <DataTable columns={columns} rows={data.masterForms} searchKeys={['formName']} searchPlaceholder="Search forms…" />
    </div>
  );
}

export function MasterFormAdd() {
  const { create } = useAdmin();
  const navigate = useNavigate();
  const [formName, setFormName] = useState('');
  const [formCaption, setFormCaption] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) { toast.error('Form name is required'); return; }
    create('masterForms', { formName: formName.trim(), formCaption });
    toast.success('Master form added');
    navigate('/admin/master-forms');
  };

  return (
    <div>
      <PageHeader title="Add Master Form" backTo="/admin/master-forms" />
      <FormCard title="Master form details" onSubmit={submit} submitLabel="Add Form" backTo="/admin/master-forms">
        <Field label="Form Name" htmlFor="fn" required>
          <Input id="fn" value={formName} onChange={(e) => setFormName(e.target.value)} maxLength={50} placeholder="e.g. Contact Enquiry" />
        </Field>
        <Field label="Form Captions" htmlFor="fc" hint="One field caption per line.">
          <Textarea id="fc" rows={10} value={formCaption} onChange={(e) => setFormCaption(e.target.value)} placeholder={'Name\nEmail\nPhone\nMessage'} />
        </Field>
      </FormCard>
    </div>
  );
}
