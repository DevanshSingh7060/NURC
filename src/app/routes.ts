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

// Admin console (no public header/footer, no auth)
import { AdminRoot } from './admin/AdminLayout';
import { AdminDashboard } from './admin/pages/Dashboard';
import { SectionsView, SectionsAdd } from './admin/pages/Sections';
import { StoriesView, StoriesAdd, StoriesShortcuts } from './admin/pages/Stories';
import { ClientsView, ClientsAdd } from './admin/pages/Clients';
import { SourcesView, SourcesAdd } from './admin/pages/Sources';
import { AgenciesView, AgenciesAdd } from './admin/pages/Agencies';
import { CompaniesView, CompaniesAdd } from './admin/pages/Companies';
import { CitiesView, CitiesAdd } from './admin/pages/Cities';
import { VehiclesView, VehiclesAdd } from './admin/pages/Vehicles';
import { MasterFormView, MasterFormAdd } from './admin/pages/MasterForms';
import { UpdatesView, UpdatesAdd, UpdatesPublish } from './admin/pages/Updates';
import { FormCaptionsView, FormCaptionsAdd } from './admin/pages/FormCaptions';
import { SendNewslettersView, NewslettersSend } from './admin/pages/Newsletters';

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
  {
    path: '/admin',
    Component: AdminRoot,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'updates', Component: UpdatesView },
      { path: 'updates/add', Component: UpdatesAdd },
      { path: 'updates/publish', Component: UpdatesPublish },
      { path: 'sections', Component: SectionsView },
      { path: 'sections/add', Component: SectionsAdd },
      { path: 'stories', Component: StoriesView },
      { path: 'stories/add', Component: StoriesAdd },
      { path: 'stories/shortcuts', Component: StoriesShortcuts },
      { path: 'clients', Component: ClientsView },
      { path: 'clients/add', Component: ClientsAdd },
      { path: 'newsletters', Component: SendNewslettersView },
      { path: 'newsletters/send', Component: NewslettersSend },
      { path: 'sources', Component: SourcesView },
      { path: 'sources/add', Component: SourcesAdd },
      { path: 'news-agencies', Component: AgenciesView },
      { path: 'news-agencies/add', Component: AgenciesAdd },
      { path: 'companies', Component: CompaniesView },
      { path: 'companies/add', Component: CompaniesAdd },
      { path: 'cities', Component: CitiesView },
      { path: 'cities/add', Component: CitiesAdd },
      { path: 'vehicles', Component: VehiclesView },
      { path: 'vehicles/add', Component: VehiclesAdd },
      { path: 'master-forms', Component: MasterFormView },
      { path: 'master-forms/add', Component: MasterFormAdd },
      { path: 'form-captions', Component: FormCaptionsView },
      { path: 'form-captions/add', Component: FormCaptionsAdd },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
