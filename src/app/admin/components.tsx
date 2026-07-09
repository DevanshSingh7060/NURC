import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Search, ArrowUpDown, Inbox } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/app/components/ui/table';
import { Label } from '@/app/components/ui/label';
import { cn } from '@/app/components/ui/utils';

/* ------------------------------------------------------------------ */
/* PageHeader                                                          */
/* ------------------------------------------------------------------ */

export function PageHeader({
  title, description, actionLabel, actionTo, backTo, children,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  backTo?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        {backTo && (
          <Link
            to={backTo}
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-[var(--nurc-teal)]"
          >
            <ArrowLeft className="size-3.5" /> Back
          </Link>
        )}
        <h1 className="truncate text-2xl font-semibold tracking-tight text-[var(--nurc-navy)]">
          {title}
        </h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {children}
        {actionLabel && actionTo && (
          <Button asChild className="bg-[var(--nurc-navy)] hover:bg-[var(--nurc-navy-light)]">
            <Link to={actionTo}>
              <Plus className="size-4" /> {actionLabel}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* StatCard                                                            */
/* ------------------------------------------------------------------ */

export function StatCard({
  label, value, icon: Icon, accent = 'var(--nurc-teal)', to, hint,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  accent?: string;
  to?: string;
  hint?: string;
}) {
  const inner = (
    <Card className="group relative overflow-hidden p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: accent }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--nurc-navy)]">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <span
          className="flex size-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          <Icon className="size-5" />
        </span>
      </div>
    </Card>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}

/* ------------------------------------------------------------------ */
/* DataTable — searchable, sortable, paginated                         */
/* ------------------------------------------------------------------ */

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns, rows, searchKeys, searchPlaceholder = 'Search…', pageSize = 10,
  toolbar, emptyLabel = 'No records found', getRowValue,
}: {
  columns: Column<T>[];
  rows: T[];
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  pageSize?: number;
  toolbar?: React.ReactNode;
  emptyLabel?: string;
  getRowValue?: (row: T, key: string) => string | number | undefined;
}) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let out = rows;
    if (query.trim() && searchKeys?.length) {
      const q = query.toLowerCase();
      out = out.filter((r) =>
        searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(q)),
      );
    }
    if (sortKey) {
      const col = columns.find((c) => c.key === sortKey);
      out = [...out].sort((a, b) => {
        const av = col?.sortValue ? col.sortValue(a) : (getRowValue?.(a, sortKey) ?? '');
        const bv = col?.sortValue ? col.sortValue(b) : (getRowValue?.(b, sortKey) ?? '');
        if (av < bv) return sortDir === 'asc' ? -1 : 1;
        if (av > bv) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return out;
  }, [rows, query, searchKeys, sortKey, sortDir, columns, getRowValue]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * pageSize, current * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-col gap-3 border-b bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
        {searchKeys?.length ? (
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder={searchPlaceholder}
              className="bg-background pl-9"
            />
          </div>
        ) : <span />}
        <div className="flex items-center gap-2">{toolbar}</div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            {columns.map((c) => (
              <TableHead key={c.key} className={cn('text-xs uppercase tracking-wide text-muted-foreground', c.className)}>
                {c.sortValue || getRowValue ? (
                  <button
                    type="button"
                    onClick={() => toggleSort(c.key)}
                    className="inline-flex items-center gap-1 transition-colors hover:text-[var(--nurc-navy)]"
                  >
                    {c.header}
                    <ArrowUpDown className={cn('size-3', sortKey === c.key ? 'text-[var(--nurc-teal)]' : 'opacity-40')} />
                  </button>
                ) : c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paged.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-16 text-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Inbox className="size-8 opacity-40" />
                  <span className="text-sm">{emptyLabel}</span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            paged.map((row) => (
              <TableRow key={row.id} className="hover:bg-[var(--nurc-sage)]/30">
                {columns.map((c) => (
                  <TableCell key={c.key} className={cn('py-3', c.className)}>
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
        <span>
          {filtered.length === 0 ? '0' : (current - 1) * pageSize + 1}
          –{Math.min(current * pageSize, filtered.length)} of {filtered.length}
        </span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="size-8" disabled={current <= 1} onClick={() => setPage(current - 1)}>
            <ChevronLeft className="size-4" />
          </Button>
          <span className="px-2">Page {current} / {totalPages}</span>
          <Button variant="outline" size="icon" className="size-8" disabled={current >= totalPages} onClick={() => setPage(current + 1)}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Form primitives                                                     */
/* ------------------------------------------------------------------ */

export function FormCard({
  title, description, onSubmit, children, submitLabel = 'Save', backTo,
}: {
  title: string;
  description?: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  submitLabel?: string;
  backTo?: string;
}) {
  return (
    <Card className="mx-auto max-w-3xl p-0">
      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-semibold text-[var(--nurc-navy)]">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <form onSubmit={onSubmit} className="space-y-5 px-6 py-6">
        {children}
        <div className="flex items-center justify-end gap-2 border-t pt-5">
          {backTo && (
            <Button asChild variant="outline" type="button">
              <Link to={backTo}>Cancel</Link>
            </Button>
          )}
          <Button type="submit" className="bg-[var(--nurc-navy)] hover:bg-[var(--nurc-navy-light)]">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export function Field({
  label, htmlFor, required, children, hint, className,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={htmlFor} className="text-sm text-[var(--nurc-navy)]">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>;
}
