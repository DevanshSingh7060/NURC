import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Renders JSON-LD structured data in the document head.
 * Accepts a single schema object or an array of schema objects.
 */
export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data)
    ? data.map(d => ({ '@context': 'https://schema.org', ...d }))
    : { '@context': 'https://schema.org', ...data };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

/** Organization schema for NURC MediaNext — use on all pages */
export const ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  name: 'NURC MediaNext Private Limited',
  url: 'https://nurcmedianext.com',
  foundingDate: '2002',
  description:
    "India's trusted media monitoring and industry intelligence platform delivering curated news, market intelligence, and decision-ready insights to organizations across multiple sectors.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: '9A, Pocket-B, SFS Flats, Mayur Vihar Phase-III',
    addressLocality: 'Delhi',
    postalCode: '110096',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9810975257',
    email: 'contact@nurcmedianext.com',
    contactType: 'customer service',
  },
};

/** WebSite schema — use on homepage */
export const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  name: 'NURC MediaNext',
  url: 'https://nurcmedianext.com',
};

/** Helper to generate BreadcrumbList schema */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://nurcmedianext.com${item.url}`,
    })),
  };
}

/** Helper to generate FAQPage schema */
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
