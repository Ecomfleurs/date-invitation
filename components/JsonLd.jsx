export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Date Invitation',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://date-invitation-blond.vercel.app',
    description: 'Crée et envoie des invitations personnalisées par WhatsApp : rendez-vous romantique, sortie entre amis, dîner, balade. Menu, date et créneaux en un seul lien.',
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'Web',
    inLanguage: 'fr-BJ',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'XOF',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Bénin',
    },
    creator: {
      '@type': 'Organization',
      name: 'Date Invitation',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cotonou',
        addressCountry: 'BJ',
      },
    },
    featureList: [
      'Invitation romantique par WhatsApp',
      'Organisation de sorties entre amis',
      'Sélection de menus et plats',
      'Choix de créneaux horaires',
      'Lien d\'invitation partageable',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
