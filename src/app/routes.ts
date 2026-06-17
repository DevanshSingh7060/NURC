import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { Root } from './components/Root';
import { HomePage } from './components/HomePage';
import { NewsletterPage } from './components/NewsletterPage';
import { SectorPage } from './components/SectorPage';
import { ClientsPage } from './components/ClientsPage';
import { AllClientsPage } from './components/AllClientsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ResourcesPage } from './components/ResourcesPage';
import { ServicesPage } from './components/ServicesPage';
import { NotFoundPage } from './components/NotFoundPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { DashboardPage } from './components/DashboardPage';
import { ReaderPage } from './components/ReaderPage';

// Redirect components
const RedirectToContact = () => React.createElement(Navigate, { to: '/contact', replace: true });
const RedirectToInsights = () => React.createElement(Navigate, { to: '/insights', replace: true });
const RedirectToTrial = () => React.createElement(Navigate, { to: '/contact?intent=trial', replace: true });

// Redirect /sector/:slug to /industries/:slug
function RedirectSectorToIndustry() {
  // We use a small component that reads the URL and redirects
  const slug = window.location.pathname.split('/sector/')[1];
  return React.createElement(Navigate, { to: `/industries/${slug}`, replace: true });
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      // Industry pages (new canonical paths)
      { path: 'industries', Component: SectorPage }, // Will be replaced with IndustriesPage in Phase 3
      { path: 'industries/:slug', Component: SectorPage },
      // Backward-compatible redirect from old sector URLs
      { path: 'sector/:slug', Component: RedirectSectorToIndustry },
      // Insights (replaces resources)
      { path: 'insights', Component: ResourcesPage },
      { path: 'resources', Component: RedirectToInsights },
      // Services
      { path: 'services', Component: ServicesPage },
      // Free Trial
      { path: 'free-trial', Component: RedirectToTrial },
      // Existing pages
      { path: 'newsletters', Component: NewsletterPage },
      { path: 'archive', Component: NewsletterPage },
      { path: 'newsletter', Component: NewsletterPage },
      { path: 'clients', Component: ClientsPage },
      { path: 'clients/all', Component: AllClientsPage },
      { path: 'pricing', Component: RedirectToContact },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: 'login', Component: LoginPage },
      { path: 'signup', Component: SignupPage },
      { path: 'subscribe', Component: RedirectToContact },
      { path: 'dashboard', Component: DashboardPage },
      { path: 'reader/:id', Component: ReaderPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
