import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Send, Archive, MailCheck, Clock, MailOpen } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Card } from '@/app/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  PageHeader,
  DataTable,
  FormCard,
  Field,
  FieldGrid,
  StatCard,
  type Column,
} from '../components';
import { useAdmin, fmtDate, type Newsletter } from '../store';

const STATUS_STYLES: Record<Newsletter['status'], string> = {
  Queue: 'bg-amber-100 text-amber-800',
  Delivered: 'bg-sky-100 text-sky-800',
  Read: 'bg-emerald-100 text-emerald-800',
};

/* --------------------------- Newsletters: View / Log --------------------------- */

export function SendNewslettersView() {
  const { data, update, remove } = useAdmin();
  const [statusFilter, setStatusFilter] = useState('all');
  const [updateFilter, setUpdateFilter] = useState('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const updateName = (id: string) => data.updates.find((u) => u.id === id)?.title ?? '—';
  const clientName = (id: string) =>
    data.clients.find((c) => c.id === id)?.organization ?? 'All clients';

  const rows = useMemo(
    () =>
      data.newsletters.filter(
        (n) =>
          (statusFilter === 'all' || n.status === statusFilter) &&
          (updateFilter === 'all' || n.updateId === updateFilter),
      ),
    [data.newsletters, statusFilter, updateFilter],
  );

  const counts = useMemo(
    () => ({
      total: data.newsletters.length,
      queue: data.newsletters.filter((n) => n.status === 'Queue').length,
      delivered: data.newsletters.filter((n) => n.status === 'Delivered').length,
      read: data.newsletters.filter((n) => n.status === 'Read').length,
    }),
    [data.newsletters],
  );

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const resend = (ids: string[]) => {
    ids.forEach((id) =>
      update('newsletters', id, { status: 'Queue', sentDate: new Date().toISOString() }),
    );
    toast.success(`${ids.length} newsletter(s) re-queued for sending`);
    setSelected(new Set());
  };
  const del = (ids: string[]) => {
    if (!confirm(`Delete ${ids.length} newsletter record(s)?`)) return;
    ids.forEach((id) => remove('newsletters', id));
    toast.success(`${ids.length} record(s) deleted`);
    setSelected(new Set());
  };

  const columns: Column<Newsletter>[] = [
    {
      key: 'select',
      header: '',
      render: (r) => (
        <Checkbox
          checked={selected.has(r.id)}
          onCheckedChange={() => toggle(r.id)}
          aria-label="Select row"
        />
      ),
    },
    {
      key: 'subscriberEmail',
      header: 'Subscriber',
      sortValue: (r) => r.subscriberEmail.toLowerCase(),
      render: (r) => (
        <div>
          <p className="font-medium text-[var(--nurc-navy)]">{r.subscriberEmail}</p>
          <p className="text-xs text-muted-foreground">{clientName(r.clientId)}</p>
        </div>
      ),
    },
    {
      key: 'updateId',
      hideBelow: 'sm',
      header: 'Update',
      render: (r) => <Badge variant="secondary">{updateName(r.updateId)}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      sortValue: (r) => r.status,
      render: (r) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[r.status]}`}
        >
          {r.status}
        </span>
      ),
    },
    {
      key: 'sentDate',
      hideBelow: 'md',
      header: 'Sent Date',
      sortValue: (r) => r.sentDate,
      render: (r) => fmtDate(r.sentDate),
    },
    {
      key: 'archived',
      hideBelow: 'lg',
      header: 'Archived',
      render: (r) =>
        r.archived ? (
          <Badge variant="outline">Archived</Badge>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            title="Resend"
            onClick={() => resend([r.id])}
          >
            <Send className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            title={r.archived ? 'Unarchive' : 'Archive'}
            onClick={() => {
              update('newsletters', r.id, { archived: !r.archived });
              toast.success(r.archived ? 'Unarchived' : 'Archived');
            }}
          >
            <Archive className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-destructive hover:text-destructive"
            title="Delete"
            onClick={() => del([r.id])}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  const selectedIds = [...selected];

  return (
    <div>
      <PageHeader
        title="Send Newsletters"
        description="Delivery log and status of newsletters sent to subscribers."
        actionLabel="Compose & Send"
        actionTo="/admin/newsletters/send"
      />

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Sent" value={counts.total} icon={MailCheck} accent="#0A2540" />
        <StatCard label="In Queue" value={counts.queue} icon={Clock} accent="#D97706" />
        <StatCard label="Delivered" value={counts.delivered} icon={Send} accent="#0284C7" />
        <StatCard label="Read" value={counts.read} icon={MailOpen} accent="#059669" />
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        searchKeys={['subscriberEmail']}
        searchPlaceholder="Search subscriber email…"
        toolbar={
          <>
            {selectedIds.length > 0 && (
              <>
                <Button size="sm" variant="outline" onClick={() => resend(selectedIds)}>
                  <Send className="size-3.5" /> Resend ({selectedIds.length})
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive"
                  onClick={() => del(selectedIds)}
                >
                  <Trash2 className="size-3.5" /> Delete
                </Button>
              </>
            )}
            <Select value={updateFilter} onValueChange={setUpdateFilter}>
              <SelectTrigger className="w-[150px] bg-background">
                <SelectValue placeholder="All updates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All updates</SelectItem>
                {data.updates.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Queue">Queue</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Read">Read</SelectItem>
              </SelectContent>
            </Select>
          </>
        }
      />
    </div>
  );
}

/* --------------------------- Newsletters: Compose & Send --------------------------- */

export function NewslettersSend() {
  const { data, create } = useAdmin();
  const navigate = useNavigate();
  const [updateId, setUpdateId] = useState('');
  const [clientId, setClientId] = useState('all');
  const [email, setEmail] = useState('');

  const activeClients = data.clients.filter((c) => c.status === 'Active');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateId) {
      toast.error('Please select an update');
      return;
    }

    const targets =
      clientId === 'all' ? activeClients : activeClients.filter((c) => c.id === clientId);
    if (targets.length === 0) {
      toast.error('No active clients to send to');
      return;
    }

    let count = 0;
    targets.forEach((c) => {
      create('newsletters', {
        updateId,
        clientId: c.id,
        subscriberEmail: email.trim() || c.emailAddress,
        status: 'Queue',
        sentDate: new Date().toISOString(),
        archived: false,
      });
      count++;
    });
    toast.success(`Queued ${count} newsletter(s) for sending`);
    navigate('/admin/newsletters');
  };

  const updateTitle = data.updates.find((u) => u.id === updateId)?.title;
  const recipients = clientId === 'all' ? activeClients.length : 1;

  return (
    <div>
      <PageHeader title="Compose & Send Newsletter" backTo="/admin/newsletters" />
      <FormCard
        title="Send a newsletter"
        description="Queue an update edition for delivery to active subscribers."
        onSubmit={submit}
        submitLabel="Queue & Send"
        backTo="/admin/newsletters"
      >
        <FieldGrid>
          <Field label="Update Edition" required>
            <Select value={updateId} onValueChange={setUpdateId}>
              <SelectTrigger>
                <SelectValue placeholder="Select update" />
              </SelectTrigger>
              <SelectContent>
                {data.updates.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Recipients" hint="Choose all active clients or a specific one.">
            <Select value={clientId} onValueChange={setClientId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All active clients ({activeClients.length})</SelectItem>
                {activeClients.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.organization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGrid>
        <Field
          label="Override Email"
          htmlFor="email"
          hint="Optional. Leave blank to use each client's registered email."
        >
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="someone@example.com"
          />
        </Field>

        {updateId && (
          <Card className="bg-[var(--nurc-sage)]/30 p-4">
            <p className="text-sm text-[var(--nurc-navy)]">
              Ready to queue <strong>{updateTitle}</strong> to <strong>{recipients}</strong>{' '}
              recipient{recipients === 1 ? '' : 's'}.
            </p>
          </Card>
        )}
      </FormCard>
    </div>
  );
}
