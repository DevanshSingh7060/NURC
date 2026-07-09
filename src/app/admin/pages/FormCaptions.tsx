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
import { PageHeader, DataTable, FormCard, Field, FieldGrid, type Column } from '../components';
import { useAdmin, fmtDate, type FormCaption } from '../store';

export function FormCaptionsView() {
  const { data, remove } = useAdmin();
  const [formFilter, setFormFilter] = useState('all');

  const formName = (id: string) => data.masterForms.find((m) => m.id === id)?.formName ?? '—';
  const rows = formFilter === 'all' ? data.formCaptions : data.formCaptions.filter((c) => c.masterFormId === formFilter);

  const columns: Column<FormCaption>[] = [
    { key: 'keyword', header: 'Keyword', sortValue: (r) => r.keyword.toLowerCase(),
      render: (r) => <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{r.keyword}</code> },
    { key: 'caption', header: 'Caption', sortValue: (r) => r.caption.toLowerCase(),
      render: (r) => <span className="font-medium text-[var(--nurc-navy)]">{r.caption}</span> },
    { key: 'form', hideBelow: 'sm', header: 'Master Form', render: (r) => <Badge variant="secondary">{formName(r.masterFormId)}</Badge> },
    { key: 'lastUpdated', hideBelow: 'lg', header: 'Last Updated', sortValue: (r) => r.lastUpdated, render: (r) => fmtDate(r.lastUpdated) },
    {
      key: 'actions', header: '', className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="size-8" title="Edit" onClick={() => toast.info('Edit is a demo action.')}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" title="Delete"
            onClick={() => { if (confirm(`Delete caption "${r.caption}"?`)) { remove('formCaptions', r.id); toast.success('Caption deleted'); } }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Form Captions" description="Field caption labels mapped to master forms."
        actionLabel="Add Caption" actionTo="/admin/form-captions/add" />
      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={['keyword', 'caption']}
        searchPlaceholder="Search captions…"
        toolbar={
          <Select value={formFilter} onValueChange={setFormFilter}>
            <SelectTrigger className="w-[200px] bg-background"><SelectValue placeholder="All forms" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All master forms</SelectItem>
              {data.masterForms.map((m) => <SelectItem key={m.id} value={m.id}>{m.formName}</SelectItem>)}
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}

export function FormCaptionsAdd() {
  const { data, create } = useAdmin();
  const navigate = useNavigate();
  const [masterFormId, setMasterFormId] = useState('');
  const [keyword, setKeyword] = useState('');
  const [caption, setCaption] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!masterFormId) { toast.error('Please select a master form'); return; }
    if (!keyword.trim()) { toast.error('Keyword is required'); return; }
    create('formCaptions', { masterFormId, keyword: keyword.trim(), caption: caption.trim() || keyword.trim() });
    toast.success('Caption added');
    navigate('/admin/form-captions');
  };

  return (
    <div>
      <PageHeader title="Add Form Caption" backTo="/admin/form-captions" />
      <FormCard title="Caption details" description="Map a field keyword to a display caption for a master form." onSubmit={submit} submitLabel="Add Caption" backTo="/admin/form-captions">
        <Field label="Master Form" required>
          <Select value={masterFormId} onValueChange={setMasterFormId}>
            <SelectTrigger><SelectValue placeholder="Select a master form" /></SelectTrigger>
            <SelectContent>{data.masterForms.map((m) => <SelectItem key={m.id} value={m.id}>{m.formName}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <FieldGrid>
          <Field label="Keyword" htmlFor="kw" required hint="Machine field name, e.g. email">
            <Input id="kw" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="email" />
          </Field>
          <Field label="Caption" htmlFor="cap" hint="Label shown to users.">
            <Input id="cap" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Email Address" />
          </Field>
        </FieldGrid>
      </FormCard>
    </div>
  );
}
