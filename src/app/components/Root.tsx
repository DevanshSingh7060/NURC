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
import { StructuredData, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from './shared/StructuredData';
import { PageLoadingFallback } from './shared/PageLoadingFallback';

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
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <LeadModalProvider>
            <ReaderModeProvider>
              <div className="min-h-screen flex flex-col bg-background text-foreground">
                <SkipToContent />
                <StructuredData data={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]} />
                <ScrollToTop />
                <Header />
                <main id="main-content" role="main" className="flex-1">
                  <Suspense fallback={<PageLoadingFallback />}>
                    <Outlet />
                  </Suspense>
                </main>
                <Footer />
                <ReaderModeOverlay />
                <SharePromptCard />
                <LeadModal />
              </div>
            </ReaderModeProvider>
          </LeadModalProvider>
        </ThemeProvider>
      </AppProvider>
    </HelmetProvider>
  );
}

