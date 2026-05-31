import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { HomePage } from './components/HomePage';
import { NewsletterPage } from './components/NewsletterPage';
import { SectorPage } from './components/SectorPage';
import { ClientsPage } from './components/ClientsPage';
import { PricingPage } from './components/PricingPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ResourcesPage } from './components/ResourcesPage';
import { NotFoundPage } from './components/NotFoundPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { SubscriptionFunnel } from './components/SubscriptionFunnel';
import { DashboardPage } from './components/DashboardPage';
import { ReaderPage } from './components/ReaderPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'newsletters', Component: NewsletterPage },
      { path: 'archive', Component: NewsletterPage },
      { path: 'newsletter', Component: NewsletterPage },
      { path: 'sector/:slug', Component: SectorPage },
      { path: 'clients', Component: ClientsPage },
      { path: 'pricing', Component: PricingPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: 'resources', Component: ResourcesPage },
      { path: 'login', Component: LoginPage },
      { path: 'signup', Component: SignupPage },
      { path: 'subscribe', Component: SubscriptionFunnel },
      { path: 'dashboard', Component: DashboardPage },
      { path: 'reader/:id', Component: ReaderPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);

