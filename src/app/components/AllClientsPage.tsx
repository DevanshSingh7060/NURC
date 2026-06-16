import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

interface SectorList {
  title: string;
  companies: string[];
}

const allSectorsClients: SectorList[] = [
  {
    title: 'Automobile OEMs',
    companies: [
      'BMW India',
      'Mercedes Benz',
      'Tata Motors',
      'Maruti Suzuki',
      'Hero MotoCorp',
      'Mahindra & Mahindra',
      'Hyundai Motor India',
      'Honda Cars India',
      'Kia India',
      'MG Motor',
      'Toyota Kirloskar',
      'ISUZU Motors',
      'Volvo Group India',
      'TVS Motor',
      'Force Motors'
    ]
  },
  {
    title: 'Auto Components & Engineering',
    companies: [
      'Bosch',
      'Uno Minda',
      'Apollo Tyres',
      'Lumax Industries',
      'Aptiv Components',
      'Visteon Electronics',
      'Lucas TVS',
      'Anand Automotive',
      'Yazaki India',
      'Timken India',
      'Exide Industries',
      'Lear Automotive',
      'Magna Automotive',
      'Nexteer Automotive',
      'Sundaram Clayton'
    ]
  },
  {
    title: 'Insurance',
    companies: [
      'HDFC Life',
      'SBI Life',
      'Tata AIA',
      'Liberty General Insurance',
      'Zuno Insurance',
      'Star Union Dai-ichi',
      'Ageas Federal Life',
      'Universal Sompo',
      'Munich RE'
    ]
  },
  {
    title: 'Banking & Finance',
    companies: [
      'Deutsche Bank',
      'Barclays Bank',
      'Crisil',
      'Mahindra Finance',
      'AVANSE Financial Services',
      'Sun Life Global Solutions',
      'Milliman India'
    ]
  },
  {
    title: 'Industrial / Manufacturing / Others',
    companies: [
      'Castrol India',
      'Carrier Airconditioning',
      'Society of Indian Automobile Manufacturers (SIAM)',
      'Savita Oil Technologies',
      'National Engineering Industries',
      'AVL India',
      'Boston Consulting Group',
      'Eberspaecher Suetrak'
    ]
  }
];

export function AllClientsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Navigation Link back */}
        <div className="mb-8 text-left">
          <Link
            to="/clients"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--nurc-teal)] hover:opacity-85 transition-opacity"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <ArrowLeft size={16} />
            Back to Clients
          </Link>
        </div>

        {/* Header Section */}
        <div className="border-b border-gray-200 pb-6 mb-10 text-left">
          <h1
            className="text-3xl font-bold text-[var(--nurc-navy)] mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            All Client Relationships
          </h1>
          <p className="text-gray-500 text-sm">
            Full text-only roster of enterprise client relationships across major sectors.
          </p>
        </div>

        {/* Sectors list */}
        <div className="space-y-10">
          {allSectorsClients.map((sector, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xs text-left">
              <h2
                className="text-xs font-bold uppercase tracking-wider text-[var(--nurc-navy)] mb-6 pb-2 border-b border-gray-100"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {sector.title}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pl-4 list-disc text-gray-600 text-sm font-medium leading-relaxed">
                {sector.companies.map((company, cIdx) => (
                  <li key={cIdx} className="pl-1 hover:text-gray-900 transition-colors">
                    {company}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
