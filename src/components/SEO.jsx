import React from 'react';
import { Helmet } from 'react-helmet-async';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';

export default function SEO({
  title,
  description,
  canonicalUrl = clinicData.siteUrl,
  ogImage = '/images/og-image.svg',
  type = 'website',
  schemaCustom = null,
}) {
  const { isBn } = useLanguage();

  const siteTitle = title
    || `${clinicData.name} | ${isBn ? clinicData.taglineBn : clinicData.tagline}`;

  const metaDesc = description || (isBn ? clinicData.taglineBn : clinicData.tagline);
  const absoluteOg = ogImage.startsWith('http') ? ogImage : `${clinicData.siteUrl}${ogImage}`;

  // Construct JSON-LD Dentist schema
  const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const openingHoursSpec = clinicData.schedule.map((slot) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: daysMap[slot.day],
    opens: slot.open,
    closes: slot.close,
  }));

  const dentistSchema = schemaCustom || {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: clinicData.name,
    alternateName: clinicData.nameBn,
    description: clinicData.tagline,
    url: canonicalUrl,
    logo: `${clinicData.siteUrl}/favicon.svg`,
    image: `${clinicData.siteUrl}/images/hero-clinic.svg`,
    telephone: clinicData.phoneRaw,
    email: clinicData.email,
    priceRange: '৳৳',
    paymentAccepted: 'Cash, bKash, Nagad, Credit Card',
    currenciesAccepted: 'BDT',
    sameAs: [clinicData.facebookUrl],
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinicData.address.line1,
      addressLocality: clinicData.address.area,
      addressRegion: clinicData.address.city,
      postalCode: clinicData.address.postalCode,
      addressCountry: 'BD',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: clinicData.geo.latitude,
      longitude: clinicData.geo.longitude,
    },
    openingHoursSpecification: openingHoursSpec,
  };

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={absoluteOg} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={clinicData.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={absoluteOg} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(dentistSchema)}
      </script>
    </Helmet>
  );
}
