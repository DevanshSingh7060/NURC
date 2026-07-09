import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Switch } from '@/app/components/ui/switch';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/app/components/ui/select';
import { PageHeader, DataTable, FormCard, Field, FieldGrid, type Column } from '../components';
import { useAdmin, fmtDate, type Vehicle } from '../store';

const BODY_TYPES = ['Hatchback', 'Sedan', 'Compact SUV', 'SUV-MUV', 'Coupe', 'Minivan-Van', 'Station Wagon'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid', 'LPG'];
const TRANSMISSIONS = ['Manual', 'Automatic', 'AMT'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const YEARS = ['2027', '2026', '2025', '2024', '2023', '2022', '2021'];
const SEATS = ['2', '3', '4', '5', '6', '7', '8'];

export function VehiclesView() {
  const { data, remove } = useAdmin();

  const columns: Column<Vehicle>[] = [
    { key: 'model', header: 'Model', sortValue: (r) => r.model.toLowerCase(),
      render: (r) => (
        <div>
          <p className="font-medium text-[var(--nurc-navy)]">{r.model}</p>
          <p className="text-xs text-muted-foreground">{r.bodyType} · {r.fuelType.join(', ')}</p>
        </div>
      ) },
    { key: 'manufacturer', header: 'Manufacturer', sortValue: (r) => r.manufacturer, render: (r) => r.manufacturer },
    { key: 'vehicleType', hideBelow: 'md', header: 'Type', render: (r) => <Badge variant="secondary" className="capitalize">{r.vehicleType}</Badge> },
    { key: 'launchYear', hideBelow: 'md', header: 'Launch', sortValue: (r) => r.launchYear, render: (r) => `${r.launchMonth} ${r.launchYear}` },
    { key: 'lastUpdated', hideBelow: 'lg', header: 'Last Update', sortValue: (r) => r.lastUpdated, render: (r) => fmtDate(r.lastUpdated) },
    {
      key: 'actions', header: '', className: 'text-right',
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="size-8" title="Edit" onClick={() => toast.info('Edit is a demo action.')}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" title="Delete"
            onClick={() => { if (confirm(`Delete vehicle "${r.model}"?`)) { remove('vehicles', r.id); toast.success('Vehicle deleted'); } }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Vehicles" description="Vehicle catalogue with specifications." actionLabel="Add Vehicle" actionTo="/admin/vehicles/add" />
      <DataTable columns={columns} rows={data.vehicles} searchKeys={['model', 'manufacturer']} searchPlaceholder="Search vehicles…" />
    </div>
  );
}

export function VehiclesAdd() {
  const { data, create } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    model: '', manufacturer: '', vehicleType: '', bodyType: '', launchYear: '', launchMonth: '',
    seatingCapacity: '', engine: '', minPrice: '', maxPrice: '', minMileage: '', maxMileage: '',
    bootSpace: '', fuelCapacity: '', groundClearance: '', ncapRating: '', summary: '', description: '',
    pageName: '', status: true,
  });
  const [fuelType, setFuelType] = useState<string[]>([]);
  const [transmission, setTransmission] = useState<string[]>([]);
  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const toggle = (list: string[], setList: (v: string[]) => void, val: string) =>
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.model.trim()) { toast.error('Model is required'); return; }
    if (!form.manufacturer) { toast.error('Manufacturer is required'); return; }
    create('vehicles', {
      ...form,
      model: form.model.trim(),
      pageName: form.pageName.trim() || form.model.trim().toLowerCase().replace(/\s+/g, '-'),
      fuelType, transmission,
    });
    toast.success('Vehicle added');
    navigate('/admin/vehicles');
  };

  return (
    <div>
      <PageHeader title="Add Vehicle" backTo="/admin/vehicles" />
      <FormCard title="Vehicle details" onSubmit={submit} submitLabel="Add Vehicle" backTo="/admin/vehicles">
        <FieldGrid>
          <Field label="Model" htmlFor="model" required>
            <Input id="model" value={form.model} onChange={(e) => set('model', e.target.value)} />
          </Field>
          <Field label="Manufacturer" required>
            <Select value={form.manufacturer} onValueChange={(v) => set('manufacturer', v)}>
              <SelectTrigger><SelectValue placeholder="Select manufacturer" /></SelectTrigger>
              <SelectContent>{data.companies.map((c) => <SelectItem key={c.id} value={c.shortName}>{c.shortName}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Vehicle Type">
            <Select value={form.vehicleType} onValueChange={(v) => set('vehicleType', v)}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Body Type">
            <Select value={form.bodyType} onValueChange={(v) => set('bodyType', v)}>
              <SelectTrigger><SelectValue placeholder="Select body type" /></SelectTrigger>
              <SelectContent>{BODY_TYPES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Launch Month">
            <Select value={form.launchMonth} onValueChange={(v) => set('launchMonth', v)}>
              <SelectTrigger><SelectValue placeholder="Month" /></SelectTrigger>
              <SelectContent>{MONTHS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Launch Year">
            <Select value={form.launchYear} onValueChange={(v) => set('launchYear', v)}>
              <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
              <SelectContent>{YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Seating Capacity">
            <Select value={form.seatingCapacity} onValueChange={(v) => set('seatingCapacity', v)}>
              <SelectTrigger><SelectValue placeholder="Seats" /></SelectTrigger>
              <SelectContent>{SEATS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Engine" htmlFor="engine">
            <Input id="engine" value={form.engine} onChange={(e) => set('engine', e.target.value)} placeholder="e.g. 1197 cc" />
          </Field>
        </FieldGrid>

        <Field label="Fuel Type">
          <div className="flex flex-wrap gap-3">
            {FUEL_TYPES.map((f) => (
              <label key={f} className="flex items-center gap-2 text-sm">
                <Checkbox checked={fuelType.includes(f)} onCheckedChange={() => toggle(fuelType, setFuelType, f)} /> {f}
              </label>
            ))}
          </div>
        </Field>
        <Field label="Transmission">
          <div className="flex flex-wrap gap-3">
            {TRANSMISSIONS.map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm">
                <Checkbox checked={transmission.includes(t)} onCheckedChange={() => toggle(transmission, setTransmission, t)} /> {t}
              </label>
            ))}
          </div>
        </Field>

        <FieldGrid>
          <Field label="Minimum Price (₹)" htmlFor="minp"><Input id="minp" value={form.minPrice} onChange={(e) => set('minPrice', e.target.value)} /></Field>
          <Field label="Maximum Price (₹)" htmlFor="maxp"><Input id="maxp" value={form.maxPrice} onChange={(e) => set('maxPrice', e.target.value)} /></Field>
          <Field label="Minimum Mileage" htmlFor="minm"><Input id="minm" value={form.minMileage} onChange={(e) => set('minMileage', e.target.value)} /></Field>
          <Field label="Maximum Mileage" htmlFor="maxm"><Input id="maxm" value={form.maxMileage} onChange={(e) => set('maxMileage', e.target.value)} /></Field>
          <Field label="Boot Space" htmlFor="boot"><Input id="boot" value={form.bootSpace} onChange={(e) => set('bootSpace', e.target.value)} /></Field>
          <Field label="Fuel Tank Capacity" htmlFor="fuelcap"><Input id="fuelcap" value={form.fuelCapacity} onChange={(e) => set('fuelCapacity', e.target.value)} /></Field>
          <Field label="Ground Clearance" htmlFor="gc"><Input id="gc" value={form.groundClearance} onChange={(e) => set('groundClearance', e.target.value)} /></Field>
          <Field label="NCAP Rating" htmlFor="ncap"><Input id="ncap" type="number" min={0} max={5} value={form.ncapRating} onChange={(e) => set('ncapRating', e.target.value)} /></Field>
          <Field label="Page Name" htmlFor="page" hint="Auto-generated if blank."><Input id="page" value={form.pageName} onChange={(e) => set('pageName', e.target.value)} /></Field>
        </FieldGrid>

        <Field label="Summary" htmlFor="summary"><Input id="summary" value={form.summary} onChange={(e) => set('summary', e.target.value)} /></Field>
        <Field label="Description" htmlFor="desc"><Textarea id="desc" rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} /></Field>

        <label className="flex items-center gap-3 text-sm text-[var(--nurc-navy)]">
          <Switch checked={form.status} onCheckedChange={(v) => set('status', v)} /> Vehicle active (visible on site)
        </label>
      </FormCard>
    </div>
  );
}
