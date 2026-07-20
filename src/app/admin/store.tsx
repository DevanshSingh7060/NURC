import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { safeStorage } from '../lib/safeStorage';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface BaseRecord {
  id: string;
  addDate: string; // ISO
  lastUpdated: string; // ISO
}

export interface Update extends BaseRecord {
  title: string;
  summary: string;
  type: 'NORMAL' | 'SPECIAL';
}

export interface Section extends BaseRecord {
  title: string;
  updateId: string;
  displayPosition: number;
}

export interface Story extends BaseRecord {
  heading: string;
  story: string;
  author: string;
  storyLink: string;
  storyDate: string;
  updateId: string;
  sectionId: string;
  clientId: string;
  newsAgencyId: string;
  storySourceId: string;
  displayPosition: number;
}

export interface Client extends BaseRecord {
  organization: string;
  contactPerson: string;
  emailAddress: string;
  password: string;
  telephoneNumber: string;
  address: string;
  status: 'Active' | 'Suspend';
}

export interface Source extends BaseRecord {
  source: string;
}

export interface Agency extends BaseRecord {
  agencyName: string;
}

export interface Company extends BaseRecord {
  name: string;
  shortName: string;
  country: string;
  updateId: string;
  summary: string;
  description: string;
  pageName: string;
  logo: string;
  banner: string;
}

export interface City extends BaseRecord {
  name: string;
  shortName: string;
  country: string;
  pageName: string;
}

export interface Vehicle extends BaseRecord {
  model: string;
  manufacturer: string;
  vehicleType: string;
  bodyType: string;
  launchYear: string;
  launchMonth: string;
  fuelType: string[];
  transmission: string[];
  seatingCapacity: string;
  engine: string;
  minPrice: string;
  maxPrice: string;
  minMileage: string;
  maxMileage: string;
  bootSpace: string;
  fuelCapacity: string;
  groundClearance: string;
  ncapRating: string;
  summary: string;
  description: string;
  pageName: string;
  status: boolean;
}

export interface MasterForm extends BaseRecord {
  formName: string;
  formCaption: string;
}

export interface FormCaption extends BaseRecord {
  masterFormId: string;
  keyword: string;
  caption: string;
}

export interface Publication extends BaseRecord {
  updateId: string;
  clientId: string;
  publishDate: string;
}

export interface Newsletter extends BaseRecord {
  updateId: string;
  clientId: string;
  subscriberEmail: string;
  status: 'Queue' | 'Delivered' | 'Read';
  sentDate: string;
  archived: boolean;
}

export interface AdminData {
  updates: Update[];
  sections: Section[];
  stories: Story[];
  clients: Client[];
  sources: Source[];
  agencies: Agency[];
  companies: Company[];
  cities: City[];
  vehicles: Vehicle[];
  masterForms: MasterForm[];
  formCaptions: FormCaption[];
  publications: Publication[];
  newsletters: Newsletter[];
  shortcuts: string;
}

export type Collection = Exclude<keyof AdminData, 'shortcuts'>;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const now = () => new Date().toISOString();
const uid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

// deterministic date offsets for nicer seed timestamps
const daysAgo = (d: number) => new Date(Date.now() - d * 86400000).toISOString();

/* ------------------------------------------------------------------ */
/* Seed data                                                           */
/* ------------------------------------------------------------------ */

function seed(): AdminData {
  const mk = <T extends object>(o: T, ageDays = 30): T & BaseRecord => ({
    id: uid(),
    addDate: daysAgo(ageDays),
    lastUpdated: daysAgo(Math.floor(ageDays / 3)),
    ...o,
  });

  const updates: Update[] = [
    mk(
      {
        title: 'Automobile',
        summary: 'Daily automobile sector news and analysis.',
        type: 'NORMAL' as const,
      },
      120,
    ),
    mk(
      {
        title: 'Insurance',
        summary: 'Life and general insurance industry coverage.',
        type: 'NORMAL' as const,
      },
      110,
    ),
    mk(
      {
        title: 'Finance',
        summary: 'Corporate finance and markets update.',
        type: 'NORMAL' as const,
      },
      100,
    ),
    mk(
      { title: 'Banking', summary: 'Retail and corporate banking news.', type: 'NORMAL' as const },
      95,
    ),
    mk(
      {
        title: 'Infrastructure',
        summary: 'Roads, ports and infrastructure projects.',
        type: 'NORMAL' as const,
      },
      80,
    ),
    mk(
      {
        title: 'Hospitality Industry Update',
        summary: 'Hotels, travel and hospitality briefing.',
        type: 'SPECIAL' as const,
      },
      60,
    ),
  ];
  const uId = (t: string) => updates.find((u) => u.title === t)!.id;

  const sections: Section[] = [
    mk({ title: 'Passenger Vehicles', updateId: uId('Automobile'), displayPosition: 1 }, 90),
    mk({ title: 'Commercial Vehicles', updateId: uId('Automobile'), displayPosition: 2 }, 88),
    mk({ title: 'Two Wheelers', updateId: uId('Automobile'), displayPosition: 3 }, 85),
    mk({ title: 'Electric Vehicles', updateId: uId('Automobile'), displayPosition: 4 }, 40),
    mk({ title: 'Life Insurance', updateId: uId('Insurance'), displayPosition: 1 }, 70),
    mk({ title: 'General Insurance', updateId: uId('Insurance'), displayPosition: 2 }, 68),
    mk({ title: 'Retail Banking', updateId: uId('Banking'), displayPosition: 1 }, 65),
    mk({ title: 'Corporate Finance', updateId: uId('Finance'), displayPosition: 1 }, 55),
    mk({ title: 'Roads & Highways', updateId: uId('Infrastructure'), displayPosition: 1 }, 50),
  ];
  const sId = (t: string) => sections.find((s) => s.title === t)!.id;

  const agencies: Agency[] = [
    mk({ agencyName: 'PTI' }, 200),
    mk({ agencyName: 'ANI' }, 190),
    mk({ agencyName: 'Bloomberg' }, 180),
    mk({ agencyName: 'IANS' }, 170),
    mk({ agencyName: 'AFP' }, 160),
    mk({ agencyName: 'NW18' }, 150),
    mk({ agencyName: 'Reuters' }, 140),
  ];
  const aId = (t: string) => agencies.find((a) => a.agencyName === t)!.id;

  const sources: Source[] = [
    mk({ source: 'Business Standard' }, 220),
    mk({ source: 'The Economic Times' }, 215),
    mk({ source: 'Asian Age' }, 210),
    mk({ source: 'Mint' }, 205),
    mk({ source: 'The Hindu BusinessLine' }, 200),
    mk({ source: 'Autocar Pro' }, 150),
    mk({ source: 'Financial Express' }, 140),
  ];
  const srcId = (t: string) => sources.find((s) => s.source === t)!.id;

  const clients: Client[] = [
    mk(
      {
        organization: 'Maruti Suzuki',
        contactPerson: 'R. Sharma',
        emailAddress: 'contact@maruti.example',
        password: '••••••',
        telephoneNumber: '+91 11 4600 0000',
        address: 'Gurugram, Haryana',
        status: 'Active' as const,
      },
      100,
    ),
    mk(
      {
        organization: 'Tata Motors',
        contactPerson: 'A. Iyer',
        emailAddress: 'press@tatamotors.example',
        password: '••••••',
        telephoneNumber: '+91 22 6665 8282',
        address: 'Mumbai, Maharashtra',
        status: 'Active' as const,
      },
      95,
    ),
    mk(
      {
        organization: 'HDFC Bank',
        contactPerson: 'P. Nair',
        emailAddress: 'media@hdfc.example',
        password: '••••••',
        telephoneNumber: '+91 22 6652 1000',
        address: 'Mumbai, Maharashtra',
        status: 'Active' as const,
      },
      80,
    ),
    mk(
      {
        organization: 'SBI Life',
        contactPerson: 'M. Gupta',
        emailAddress: 'corp@sbilife.example',
        password: '••••••',
        telephoneNumber: '+91 22 6191 0000',
        address: 'Mumbai, Maharashtra',
        status: 'Suspend' as const,
      },
      70,
    ),
    mk(
      {
        organization: 'Bosch India',
        contactPerson: 'K. Rao',
        emailAddress: 'comms@bosch.example',
        password: '••••••',
        telephoneNumber: '+91 80 6752 1111',
        address: 'Bengaluru, Karnataka',
        status: 'Active' as const,
      },
      60,
    ),
  ];
  const cId = (t: string) => clients.find((c) => c.organization === t)!.id;

  const companies: Company[] = [
    mk(
      {
        name: 'Maruti Suzuki India Limited',
        shortName: 'Maruti Suzuki',
        country: 'India',
        updateId: uId('Automobile'),
        summary: 'Largest passenger car maker in India.',
        description: 'Subsidiary of Suzuki Motor Corporation.',
        pageName: 'maruti-suzuki',
        logo: 'Maruti Suzuki.png',
        banner: '',
      },
      130,
    ),
    mk(
      {
        name: 'Tata Motors Limited',
        shortName: 'Tata',
        country: 'India',
        updateId: uId('Automobile'),
        summary: 'Indian multinational automotive company.',
        description: 'Part of the Tata Group.',
        pageName: 'tata-motors',
        logo: 'Tata.png',
        banner: '',
      },
      128,
    ),
    mk(
      {
        name: 'Bayerische Motoren Werke AG',
        shortName: 'BMW',
        country: 'Germany',
        updateId: uId('Automobile'),
        summary: 'German luxury vehicle manufacturer.',
        description: 'Headquartered in Munich.',
        pageName: 'bmw',
        logo: 'BMW.png',
        banner: '',
      },
      120,
    ),
    mk(
      {
        name: 'Mahindra & Mahindra',
        shortName: 'Mahindra',
        country: 'India',
        updateId: uId('Automobile'),
        summary: 'Indian multinational automotive manufacturer.',
        description: 'Part of the Mahindra Group.',
        pageName: 'mahindra',
        logo: 'Mahindra.png',
        banner: '',
      },
      115,
    ),
    mk(
      {
        name: 'HDFC Bank Limited',
        shortName: 'HDFC',
        country: 'India',
        updateId: uId('Banking'),
        summary: 'Leading private sector bank.',
        description: 'Headquartered in Mumbai.',
        pageName: 'hdfc-bank',
        logo: 'HDFC.png',
        banner: '',
      },
      90,
    ),
  ];

  const cities: City[] = [
    mk({ name: 'Mumbai', shortName: 'Bombay', country: 'India', pageName: 'mumbai' }, 140),
    mk({ name: 'New Delhi', shortName: 'Delhi', country: 'India', pageName: 'new-delhi' }, 138),
    mk({ name: 'Bengaluru', shortName: 'Bangalore', country: 'India', pageName: 'bengaluru' }, 135),
    mk({ name: 'Chennai', shortName: 'Madras', country: 'India', pageName: 'chennai' }, 130),
    mk({ name: 'Gurugram', shortName: 'Gurgaon', country: 'India', pageName: 'gurugram' }, 120),
  ];

  const vehicles: Vehicle[] = [
    mk(
      {
        model: 'Swift',
        manufacturer: 'Maruti Suzuki',
        vehicleType: 'car',
        bodyType: 'Hatchback',
        launchYear: '2024',
        launchMonth: 'May',
        fuelType: ['Petrol'],
        transmission: ['Manual', 'Automatic'],
        seatingCapacity: '5',
        engine: '1197 cc',
        minPrice: '649000',
        maxPrice: '929000',
        minMileage: '22',
        maxMileage: '25',
        bootSpace: '265 L',
        fuelCapacity: '37 L',
        groundClearance: '163 mm',
        ncapRating: '4',
        summary: 'Popular premium hatchback.',
        description: 'Third generation Swift.',
        pageName: 'maruti-swift',
        status: true,
      },
      60,
    ),
    mk(
      {
        model: 'Nexon',
        manufacturer: 'Tata',
        vehicleType: 'car',
        bodyType: 'Compact SUV',
        launchYear: '2023',
        launchMonth: 'September',
        fuelType: ['Petrol', 'Diesel', 'Electric'],
        transmission: ['Manual', 'Automatic'],
        seatingCapacity: '5',
        engine: '1199 cc',
        minPrice: '800000',
        maxPrice: '1560000',
        minMileage: '17',
        maxMileage: '24',
        bootSpace: '350 L',
        fuelCapacity: '44 L',
        groundClearance: '209 mm',
        ncapRating: '5',
        summary: 'Best-selling compact SUV.',
        description: 'Facelift model.',
        pageName: 'tata-nexon',
        status: true,
      },
      50,
    ),
    mk(
      {
        model: 'X1',
        manufacturer: 'BMW',
        vehicleType: 'car',
        bodyType: 'SUV-MUV',
        launchYear: '2023',
        launchMonth: 'June',
        fuelType: ['Petrol', 'Diesel'],
        transmission: ['Automatic'],
        seatingCapacity: '5',
        engine: '1998 cc',
        minPrice: '4900000',
        maxPrice: '5200000',
        minMileage: '16',
        maxMileage: '20',
        bootSpace: '540 L',
        fuelCapacity: '54 L',
        groundClearance: '183 mm',
        ncapRating: '5',
        summary: 'Entry-level luxury SUV.',
        description: 'Third generation X1.',
        pageName: 'bmw-x1',
        status: true,
      },
      40,
    ),
    mk(
      {
        model: 'Scorpio-N',
        manufacturer: 'Mahindra',
        vehicleType: 'car',
        bodyType: 'SUV-MUV',
        launchYear: '2022',
        launchMonth: 'July',
        fuelType: ['Petrol', 'Diesel'],
        transmission: ['Manual', 'Automatic'],
        seatingCapacity: '7',
        engine: '2184 cc',
        minPrice: '1399000',
        maxPrice: '2469000',
        minMileage: '15',
        maxMileage: '17',
        bootSpace: '460 L',
        fuelCapacity: '57 L',
        groundClearance: '187 mm',
        ncapRating: '5',
        summary: 'Flagship SUV.',
        description: 'All-new Scorpio-N.',
        pageName: 'mahindra-scorpio-n',
        status: true,
      },
      30,
    ),
  ];

  const masterForms: MasterForm[] = [
    mk({ formName: 'Contact Enquiry', formCaption: 'Name\nEmail\nPhone\nMessage' }, 45),
    mk(
      {
        formName: 'Subscription Request',
        formCaption: 'Organization\nContact Person\nEmail\nSector',
      },
      40,
    ),
    mk({ formName: 'Feedback', formCaption: 'Name\nRating\nComments' }, 20),
  ];
  const mfId = (t: string) => masterForms.find((m) => m.formName === t)!.id;

  const formCaptions: FormCaption[] = [
    mk({ masterFormId: mfId('Contact Enquiry'), keyword: 'name', caption: 'Full Name' }, 44),
    mk({ masterFormId: mfId('Contact Enquiry'), keyword: 'email', caption: 'Email Address' }, 44),
    mk({ masterFormId: mfId('Contact Enquiry'), keyword: 'phone', caption: 'Phone Number' }, 43),
    mk(
      {
        masterFormId: mfId('Subscription Request'),
        keyword: 'organization',
        caption: 'Organization Name',
      },
      39,
    ),
    mk(
      { masterFormId: mfId('Subscription Request'), keyword: 'sector', caption: 'Industry Sector' },
      38,
    ),
    mk({ masterFormId: mfId('Feedback'), keyword: 'rating', caption: 'Overall Rating' }, 19),
  ];

  const stories: Story[] = [
    mk(
      {
        heading: 'Maruti Suzuki posts record quarterly sales',
        story: '<p>Maruti Suzuki reported its highest-ever quarterly sales...</p>',
        author: 'Staff Reporter',
        storyLink: 'https://example.com/maruti-sales',
        storyDate: daysAgo(3),
        updateId: uId('Automobile'),
        sectionId: sId('Passenger Vehicles'),
        clientId: cId('Maruti Suzuki'),
        newsAgencyId: aId('PTI'),
        storySourceId: srcId('Business Standard'),
        displayPosition: 1,
      },
      3,
    ),
    mk(
      {
        heading: 'Tata Nexon EV crosses 1 lakh sales milestone',
        story: '<p>Tata Motors announced that its Nexon EV...</p>',
        author: 'Auto Desk',
        storyLink: 'https://example.com/nexon-ev',
        storyDate: daysAgo(5),
        updateId: uId('Automobile'),
        sectionId: sId('Electric Vehicles'),
        clientId: cId('Tata Motors'),
        newsAgencyId: aId('ANI'),
        storySourceId: srcId('Autocar Pro'),
        displayPosition: 2,
      },
      5,
    ),
    mk(
      {
        heading: 'HDFC Bank expands digital lending platform',
        story: '<p>HDFC Bank has rolled out a new digital lending...</p>',
        author: 'Finance Bureau',
        storyLink: 'https://example.com/hdfc-digital',
        storyDate: daysAgo(8),
        updateId: uId('Banking'),
        sectionId: sId('Retail Banking'),
        clientId: cId('HDFC Bank'),
        newsAgencyId: aId('Bloomberg'),
        storySourceId: srcId('Mint'),
        displayPosition: 1,
      },
      8,
    ),
    mk(
      {
        heading: 'SBI Life launches new retirement plan',
        story: '<p>SBI Life Insurance introduced a new pension product...</p>',
        author: 'Insurance Desk',
        storyLink: 'https://example.com/sbilife-plan',
        storyDate: daysAgo(12),
        updateId: uId('Insurance'),
        sectionId: sId('Life Insurance'),
        clientId: cId('SBI Life'),
        newsAgencyId: aId('IANS'),
        storySourceId: srcId('The Economic Times'),
        displayPosition: 1,
      },
      12,
    ),
    mk(
      {
        heading: 'Bosch invests in India R&D centre',
        story: '<p>Bosch announced a major investment in its India...</p>',
        author: 'Corporate Desk',
        storyLink: 'https://example.com/bosch-rd',
        storyDate: daysAgo(15),
        updateId: uId('Automobile'),
        sectionId: sId('Commercial Vehicles'),
        clientId: cId('Bosch India'),
        newsAgencyId: aId('Reuters'),
        storySourceId: srcId('Financial Express'),
        displayPosition: 3,
      },
      15,
    ),
  ];

  return {
    updates,
    sections,
    stories,
    clients,
    sources,
    agencies,
    companies,
    cities,
    vehicles,
    masterForms,
    formCaptions,
    publications: [
      mk(
        { updateId: uId('Automobile'), clientId: cId('Maruti Suzuki'), publishDate: daysAgo(2) },
        2,
      ),
      mk({ updateId: uId('Banking'), clientId: cId('HDFC Bank'), publishDate: daysAgo(6) }, 6),
      mk({ updateId: uId('Insurance'), clientId: cId('SBI Life'), publishDate: daysAgo(11) }, 11),
    ],
    newsletters: [
      mk(
        {
          updateId: uId('Automobile'),
          clientId: cId('Maruti Suzuki'),
          subscriberEmail: 'newsroom@maruti.example',
          status: 'Read' as const,
          sentDate: daysAgo(2),
          archived: false,
        },
        2,
      ),
      mk(
        {
          updateId: uId('Automobile'),
          clientId: cId('Tata Motors'),
          subscriberEmail: 'press@tatamotors.example',
          status: 'Delivered' as const,
          sentDate: daysAgo(2),
          archived: false,
        },
        2,
      ),
      mk(
        {
          updateId: uId('Automobile'),
          clientId: cId('Bosch India'),
          subscriberEmail: 'comms@bosch.example',
          status: 'Queue' as const,
          sentDate: daysAgo(1),
          archived: false,
        },
        1,
      ),
      mk(
        {
          updateId: uId('Banking'),
          clientId: cId('HDFC Bank'),
          subscriberEmail: 'media@hdfc.example',
          status: 'Read' as const,
          sentDate: daysAgo(6),
          archived: false,
        },
        6,
      ),
      mk(
        {
          updateId: uId('Insurance'),
          clientId: cId('SBI Life'),
          subscriberEmail: 'corp@sbilife.example',
          status: 'Delivered' as const,
          sentDate: daysAgo(11),
          archived: false,
        },
        11,
      ),
      mk(
        {
          updateId: uId('Insurance'),
          clientId: cId('SBI Life'),
          subscriberEmail: 'alerts@sbilife.example',
          status: 'Queue' as const,
          sentDate: daysAgo(0),
          archived: false,
        },
        0,
      ),
      mk(
        {
          updateId: uId('Finance'),
          clientId: cId('HDFC Bank'),
          subscriberEmail: 'research@hdfc.example',
          status: 'Read' as const,
          sentDate: daysAgo(20),
          archived: true,
        },
        20,
      ),
    ],
    shortcuts: 'automobile, insurance, finance, banking, ev, budget-2025',
  };
}

/* ------------------------------------------------------------------ */
/* Context + persistence                                               */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'nurc-admin-data-v3';

interface AdminContextValue {
  data: AdminData;
  create: <K extends Collection>(
    c: K,
    item: Omit<AdminData[K][number], keyof BaseRecord>,
  ) => AdminData[K][number];
  update: <K extends Collection>(c: K, id: string, patch: Partial<AdminData[K][number]>) => void;
  remove: <K extends Collection>(c: K, id: string) => void;
  setShortcuts: (s: string) => void;
  resetData: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

function loadInitial(): AdminData {
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = safeStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as AdminData;
    } catch {
      /* ignore */
    }
  }
  return seed();
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AdminData>(loadInitial);

  useEffect(() => {
    try {
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore quota */
    }
  }, [data]);

  const value = useMemo<AdminContextValue>(
    () => ({
      data,
      create: (c, item) => {
        const record = {
          ...(item as object),
          id: uid(),
          addDate: now(),
          lastUpdated: now(),
        } as AdminData[typeof c][number];
        setData((prev) => ({ ...prev, [c]: [record, ...(prev[c] as any[])] }));
        return record;
      },
      update: (c, id, patch) => {
        setData((prev) => ({
          ...prev,
          [c]: (prev[c] as any[]).map((r) =>
            r.id === id ? { ...r, ...patch, lastUpdated: now() } : r,
          ),
        }));
      },
      remove: (c, id) => {
        setData((prev) => ({
          ...prev,
          [c]: (prev[c] as any[]).filter((r) => r.id !== id),
        }));
      },
      setShortcuts: (s) => setData((prev) => ({ ...prev, shortcuts: s })),
      resetData: () => setData(seed()),
    }),
    [data],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}

/* small display helpers reused by pages */
export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
