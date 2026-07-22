import { Link } from 'react-router';
import { useLeadModal } from '../context/LeadModalContext';

export function Footer() {
  const { openDemoModal } = useLeadModal();

  return (
    <footer role="contentinfo" className="bg-white border-t border-[#E5E7EB] font-heading">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section: 3 Columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-gray-100">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold bg-nurc-navy">
                <span className="text-nurc-gold font-display">N</span>
              </div>
              <div className="leading-none">
                <div className="font-bold text-xs tracking-wider text-nurc-navy">NURC</div>
                <div className="font-medium tracking-widest uppercase text-[8px] text-[#6B7280] tracking-[0.15em]">
                  MediaNext
                </div>
              </div>
            </div>
            <p className="text-xs text-[#4B5563] leading-[1.6]">
              Daily Curated News Intelligence for Industry Leaders Since 2000
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed">NURC MediaNext Pvt. Ltd.</p>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase text-[10px] text-nurc-navy tracking-[0.1em]">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-500 hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link to="/clients" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Clients
                </Link>
              </li>
              <li>
                <Link
                  to="/industries/auto"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Industries
                </Link>
              </li>
              <li>
                <Link
                  to="/insights"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase text-[10px] text-nurc-navy tracking-[0.1em]">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/services"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Daily News Updates
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Searchable Archives
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Custom Intelligence
                </Link>
              </li>
              <li>
                <Link
                  to="/contact?intent=trial"
                  className="text-gray-500 hover:text-gray-900 transition-colors font-semibold"
                >
                  15-Day Free Trial
                </Link>
              </li>
              <li>
                <button
                  onClick={openDemoModal}
                  className="text-gray-500 hover:text-gray-900 transition-colors bg-transparent border-0 p-0 cursor-pointer text-xs font-normal text-left"
                >
                  Schedule Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3 text-xs text-gray-500">
            <h4 className="font-bold uppercase text-[10px] text-nurc-navy tracking-[0.1em]">
              Contact
            </h4>
            <div className="space-y-1.5">
              <p>
                <span className="font-semibold text-gray-700">Email:</span>{' '}
                <a
                  href="mailto:contact@nurcmedianext.com"
                  className="hover:text-gray-900 transition-colors break-all"
                >
                  contact@nurcmedianext.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-700">Phone:</span>{' '}
                <a href="tel:+919810975257" className="hover:text-gray-900 transition-colors">
                  +91-9810975257
                </a>
                {' · '}
                <a href="tel:+919958949710" className="hover:text-gray-900 transition-colors">
                  +91-9958949710
                </a>
              </p>
              {/*<p>*/}
              {/*<span className="font-semibold text-gray-700">Landline:</span>{' '}*/}
              {/*<a href="tel:+911149849324" className="hover:text-gray-900 transition-colors">
                  +91-11-49849324
                </a>*/}
              {/*</p>*/}
            </div>
            <div className="pt-2 border-t border-gray-100">
              <span className="font-semibold text-gray-700 block mb-0.5">Corporate Office:</span>
              <p className="leading-relaxed text-[11px] text-gray-400">
                9A, Pocket-B, SFS Flats, Mayur Vihar Phase-III, <br />
                Delhi - 110096, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Very thin bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <span>© NURC MediaNext Private Ltd.</span>
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-200">|</span>
            <Link to="/" className="hover:text-gray-600 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
