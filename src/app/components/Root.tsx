import { Outlet, useLocation } from 'react-router';
import { useEffect, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'next-themes';
import { Header } from './Header';
import { Footer } from './Footer';
import { ReaderModeOverlay, SharePromptCard } from './ReaderMode';
import { ReaderModeProvider } from './ReaderModeContext';
import { AppProvider } from '../context/AppContext';
import { LeadModalProvider } from '../context/LeadModalContext';
import { LeadModal } from './LeadModal';
import { SkipToContent } from './shared/SkipToContent';
import { OfflineBanner } from './shared/OfflineBanner';
import { Toaster } from './ui/sonner';
import { StructuredData, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from './shared/StructuredData';
import { PageLoadingFallback } from './shared/PageLoadingFallback';

import { ShieldCheck } from 'lucide-react';
import trustBadge from '../../Logo/26-years-trust.png';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function Root() {
  return (
    <HelmetProvider>
      <AppProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
        >
          <LeadModalProvider>
            <ReaderModeProvider>
              <div className="min-h-screen flex flex-col bg-background text-foreground">
                <OfflineBanner />
                <SkipToContent />
                <StructuredData data={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]} />
                <ScrollToTop />
                <Header />
                <main id="main-content" role="main" className="flex-1">
                  <Suspense fallback={<PageLoadingFallback />}>
                    <Outlet />
                  </Suspense>
                </main>

                {/* MSME / Udyam Registration Credential */}
                <section className="py-8 bg-[#F9FAFB] border-t border-[#E5E7EB]">
                  <div className="max-w-4xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left sm:justify-between">
                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                        <div className="flex-shrink-0 flex items-center justify-center rounded-2xl w-14 h-14 bg-nurc-sage">
                          <ShieldCheck className="w-7 h-7 text-nurc-teal" />
                        </div>
                        <div>
                          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                            <span className="text-[11px] font-bold uppercase text-nurc-teal tracking-[0.12em] font-heading">
                              Government of India · Udyam Registered
                            </span>
                          </div>
                          <p className="text-[#374151] text-[15px] leading-[1.7]">
                            <span className="font-semibold text-nurc-navy">
                              NURC Media Next Pvt. Ltd.
                            </span>{' '}
                            is a Government of India registered Micro, Small and Medium Enterprise
                            (MSME) under the Udyam Registration scheme.
                          </p>
                        </div>
                      </div>
                      <img
                        src={trustBadge}
                        alt="26 Years of Trust & Service"
                        className="flex-shrink-0 h-24 w-auto"
                        width={204}
                        height={200}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </section>

                <Footer />
                <ReaderModeOverlay />
                <SharePromptCard />
                <LeadModal />
                <Toaster position="top-right" richColors closeButton />
              </div>
            </ReaderModeProvider>
          </LeadModalProvider>
        </ThemeProvider>
      </AppProvider>
    </HelmetProvider>
  );
}
