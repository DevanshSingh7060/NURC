import React, { useState } from 'react';
import { useLeadModal } from '../context/LeadModalContext';
import { X, CheckCircle2, Calendar, ShieldCheck, Mail, Phone, Building } from 'lucide-react';

export function LeadModal() {
  const { isOpen, modalType, closeModal, openDemoModal, openCoverageModal } = useLeadModal();
  const [submitted, setSubmitted] = useState(false);
  
  // Form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [sector, setSector] = useState('Automotive');
  const [customBriefRequirements, setCustomBriefRequirements] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setSector('Automotive');
    setCustomBriefRequirements('');
    closeModal();
  };

  const industrySectors = [
    'Automotive',
    'Banking & Finance',
    'Infrastructure',
    'Energy & Power',
    'Healthcare',
    'FMCG & Retail',
    'Insurance',
    'Technology',
    'Metals & Mining'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur overlay */}
      <div 
        className="absolute inset-0 bg-[#0A2540]/40 backdrop-blur-sm transition-opacity" 
        onClick={handleResetAndClose}
      />

      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10 transition-all transform duration-300 animate-fadeIn"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {/* Header Ribbon */}
        <div className="h-1.5" style={{ background: 'var(--nurc-teal)' }} />
        
        {/* Close Button */}
        <button 
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors border-0 bg-transparent cursor-pointer"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <div className="p-8">
            {/* Mode tabs */}
            <div className="flex gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100 mb-6 max-w-sm">
              <button
                type="button"
                onClick={openDemoModal}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all border-0 cursor-pointer ${
                  modalType === 'demo'
                    ? 'bg-white text-[var(--nurc-navy)] shadow-sm'
                    : 'bg-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Schedule Demo
              </button>
              <button
                type="button"
                onClick={openCoverageModal}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all border-0 cursor-pointer ${
                  modalType === 'coverage'
                    ? 'bg-white text-[var(--nurc-navy)] shadow-sm'
                    : 'bg-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Request Custom Coverage
              </button>
            </div>

            {/* Form Headers */}
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                {modalType === 'demo' 
                  ? 'Access Enterprise Intelligence'
                  : 'Tailored Industry Briefings'}
              </h2>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {modalType === 'demo'
                  ? 'Schedule a brief 15-minute consultation to configure team licensing and shared dashboard workspaces.'
                  : 'Specify custom parameters or niche Indian sectors you require our analyst board to track.'}
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Devansh Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-xs transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Business Email *</label>
                  <div className="relative">
                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-xs transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Corporate Phone *</label>
                  <div className="relative">
                    <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98109 75257"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-xs transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Company Name *</label>
                  <div className="relative">
                    <Building size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tata Group"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-xs transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Primary Sector of Interest</label>
                <select
                  value={sector}
                  onChange={e => setSector(e.target.value)}
                  className="w-full px-3.5 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-xs font-semibold cursor-pointer"
                >
                  {industrySectors.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {modalType === 'coverage' && (
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Custom Coverage Specifications *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe specific micro-segments, competitors, or research topics you require us to track..."
                    value={customBriefRequirements}
                    onChange={e => setCustomBriefRequirements(e.target.value)}
                    className="w-full px-3.5 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-xs transition-all resize-none"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[var(--nurc-navy)] hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all border-0"
                >
                  {modalType === 'demo' 
                    ? 'Schedule Executive Consultation'
                    : 'Submit Coverage Specification'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>NDA Protected · Secure TLS 1.3 Data Protection</span>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div className="p-8 text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 size={32} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Specification Received Successfully
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                Thank you, {name}. Our Director of Intelligence will review {company}'s requirements for the {sector} brief within 2 business hours.
              </p>
            </div>

            {/* Scheduled consultation calendar info */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 text-left max-w-sm mx-auto space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="text-[var(--nurc-teal)] shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="block text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                    Simulated Consultation Slot
                  </span>
                  <span className="block text-xs font-bold text-gray-800 mt-0.5">
                    Monday, June 1, 2026 @ 10:30 AM IST
                  </span>
                  <span className="block text-[10px] text-gray-400 mt-1 leading-normal">
                    A calendar invitation detailing the meeting passcode has been dispatched to {email}.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-all border-0 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
