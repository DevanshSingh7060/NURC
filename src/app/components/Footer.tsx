import { Link } from 'react-router';
import { useLeadModal } from '../context/LeadModalContext';

export function Footer() {
  const { openDemoModal } = useLeadModal();

  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E5E7EB', fontFamily: 'var(--font-heading)' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section: 3 Columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-100">
          
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold" style={{ background: 'var(--nurc-navy)' }}>
                <span style={{ color: 'var(--nurc-gold)', fontFamily: 'var(--font-display)' }}>N</span>
              </div>
              <div className="leading-none">
                <div className="font-bold text-xs tracking-wider" style={{ color: 'var(--nurc-navy)' }}>NURC</div>
                <div className="font-medium tracking-widest uppercase text-[8px]" style={{ color: '#6B7280', letterSpacing: '0.15em' }}>MediaNext</div>
              </div>
            </div>
            <p className="text-xs" style={{ color: '#4B5563', lineHeight: '1.6' }}>
              Curated Intelligence for Industry Leaders Since 2002
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-[10px]" style={{ color: 'var(--nurc-navy)', letterSpacing: '0.1em' }}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors">Home</Link></li>
              <li><Link to="/newsletters" className="text-gray-500 hover:text-gray-900 transition-colors">Industries</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-gray-900 transition-colors">About</Link></li>
              <li><button onClick={openDemoModal} className="text-gray-500 hover:text-gray-900 transition-colors bg-transparent border-0 p-0 cursor-pointer text-xs font-normal text-left">Schedule Demo</button></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-gray-900 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3 text-xs text-gray-500">
            <h4 className="font-bold uppercase tracking-wider text-[10px]" style={{ color: 'var(--nurc-navy)', letterSpacing: '0.1em' }}>
              Contact
            </h4>
            <div className="space-y-1.5">
              <p>
                <span className="font-semibold text-gray-700">Email:</span>{' '}
                <a href="mailto:contact@nurcmedianext.com" className="hover:text-gray-900 transition-colors break-all">
                  contact@nurcmedianext.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-700">Phone:</span>{' '}
                <a href="tel:+919810975257" className="hover:text-gray-900 transition-colors">+91-9810975257</a>
                {' · '}
                <a href="tel:+919958949710" className="hover:text-gray-900 transition-colors">+91-9958949710</a>
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <span className="font-semibold text-gray-700 block mb-0.5">Corporate Office:</span>
              <p className="leading-relaxed text-[11px] text-gray-400">
                9A, Pocket-B, SFS Flats, Mayur Vihar Phase-III, Delhi - 110096, India
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Section: Very thin bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <span>© N.U.R.C. MediaNext Private Ltd.</span>
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <span className="text-gray-200">|</span>
            <Link to="/" className="hover:text-gray-600 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
