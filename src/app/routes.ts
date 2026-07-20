import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { Root } from './components/Root';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { RouteErrorBoundary } from './components/shared/RouteErrorBoundary';

/** Lazy-load a named export as a route component (code-splitting). */
function lazyRoute<M extends Record<string, React.ComponentType<unknown>>>(
  loader: () => Promise<M>,
  name: keyof M,
) {
  return lazy(async () => ({ default: (await loader())[name] }));
}

// Public pages (split into per-route chunks; Root + HomePage stay in the main chunk)
const NewsletterPage = lazyRoute(() => import('./components/NewsletterPage'), 'NewsletterPage');
const SectorPage = lazyRoute(() => import('./components/SectorPage'), 'SectorPage');
const ClientsPage = lazyRoute(() => import('./components/ClientsPage'), 'ClientsPage');
const AllClientsPage = lazyRoute(() => import('./components/AllClientsPage'), 'AllClientsPage');
const AboutPage = lazyRoute(() => import('./components/AboutPage'), 'AboutPage');
const ContactPage = lazyRoute(() => import('./components/ContactPage'), 'ContactPage');
const ResourcesPage = lazyRoute(() => import('./components/ResourcesPage'), 'ResourcesPage');
const ServicesPage = lazyRoute(() => import('./components/ServicesPage'), 'ServicesPage');
const LoginPage = lazyRoute(() => import('./components/LoginPage'), 'LoginPage');
const SignupPage = lazyRoute(() => import('./components/SignupPage'), 'SignupPage');
const DashboardPage = lazyRoute(() => import('./components/DashboardPage'), 'DashboardPage');
const ReaderPage = lazyRoute(() => import('./components/ReaderPage'), 'ReaderPage');

// Admin console — entirely lazy so public visitors never download it
const AdminRoot = lazyRoute(() => import('./admin/AdminLayout'), 'AdminRoot');
const AdminDashboard = lazyRoute(() => import('./admin/pages/Dashboard'), 'AdminDashboard');
const SectionsView = lazyRoute(() => import('./admin/pages/Sections'), 'SectionsView');
const SectionsAdd = lazyRoute(() => import('./admin/pages/Sections'), 'SectionsAdd');
const StoriesView = lazyRoute(() => import('./admin/pages/Stories'), 'StoriesView');
const StoriesAdd = lazyRoute(() => import('./admin/pages/Stories'), 'StoriesAdd');
const StoriesShortcuts = lazyRoute(() => import('./admin/pages/Stories'), 'StoriesShortcuts');
const ClientsView = lazyRoute(() => import('./admin/pages/Clients'), 'ClientsView');
const ClientsAdd = lazyRoute(() => import('./admin/pages/Clients'), 'ClientsAdd');
const SourcesView = lazyRoute(() => import('./admin/pages/Sources'), 'SourcesView');
const SourcesAdd = lazyRoute(() => import('./admin/pages/Sources'), 'SourcesAdd');
const AgenciesView = lazyRoute(() => import('./admin/pages/Agencies'), 'AgenciesView');
const AgenciesAdd = lazyRoute(() => import('./admin/pages/Agencies'), 'AgenciesAdd');
const CompaniesView = lazyRoute(() => import('./admin/pages/Companies'), 'CompaniesView');
const CompaniesAdd = lazyRoute(() => import('./admin/pages/Companies'), 'CompaniesAdd');
const CitiesView = lazyRoute(() => import('./admin/pages/Cities'), 'CitiesView');
const CitiesAdd = lazyRoute(() => import('./admin/pages/Cities'), 'CitiesAdd');
const VehiclesView = lazyRoute(() => import('./admin/pages/Vehicles'), 'VehiclesView');
const VehiclesAdd = lazyRoute(() => import('./admin/pages/Vehicles'), 'VehiclesAdd');
const MasterFormView = lazyRoute(() => import('./admin/pages/MasterForms'), 'MasterFormView');
const MasterFormAdd = lazyRoute(() => import('./admin/pages/MasterForms'), 'MasterFormAdd');
const UpdatesView = lazyRoute(() => import('./admin/pages/Updates'), 'UpdatesView');
const UpdatesAdd = lazyRoute(() => import('./admin/pages/Updates'), 'UpdatesAdd');
const UpdatesPublish = lazyRoute(() => import('./admin/pages/Updates'), 'UpdatesPublish');
const FormCaptionsView = lazyRoute(() => import('./admin/pages/FormCaptions'), 'FormCaptionsView');
const FormCaptionsAdd = lazyRoute(() => import('./admin/pages/FormCaptions'), 'FormCaptionsAdd');
const SendNewslettersView = lazyRoute(
  () => import('./admin/pages/Newsletters'),
  'SendNewslettersView',
);
const NewslettersSend = lazyRoute(() => import('./admin/pages/Newsletters'), 'NewslettersSend');

// Redirect components
const RedirectToContact = () => React.createElement(Navigate, { to: '/contact', replace: true });
const RedirectToInsights = () => React.createElement(Navigate, { to: '/insights', replace: true });
const RedirectToTrial = () =>
  React.createElement(Navigate, { to: '/contact?intent=trial', replace: true });

// Redirect /sector/:slug to /industries/:slug
function RedirectSectorToIndustry() {
  const slug = window.location.pathname.split('/sector/')[1];
  return React.createElement(Navigate, { to: `/industries/${slug}`, replace: true });
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      { index: true, Component: HomePage },
      { path: 'industries', Component: SectorPage },
      { path: 'industries/:slug', Component: SectorPage },
      { path: 'sector/:slug', Component: RedirectSectorToIndustry },
      { path: 'insights', Component: ResourcesPage },
      { path: 'resources', Component: RedirectToInsights },
      { path: 'services', Component: ServicesPage },
      { path: 'free-trial', Component: RedirectToTrial },
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
    ErrorBoundary: RouteErrorBoundary,
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
