import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Header } from './Header';
import { Footer } from './Footer';
import { ReaderModeOverlay, SharePromptCard } from './ReaderMode';
import { ReaderModeProvider } from './ReaderModeContext';
import { AppProvider } from '../context/AppContext';
import { LeadModalProvider } from '../context/LeadModalContext';
import { LeadModal } from './LeadModal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function Root() {
  return (
    <AppProvider>
      <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
        <LeadModalProvider>
          <ReaderModeProvider>
            <div className="min-h-screen flex flex-col bg-background text-foreground">
              <ScrollToTop />
              <Header />
              <main className="flex-1">
                <Outlet />
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
  );
}

