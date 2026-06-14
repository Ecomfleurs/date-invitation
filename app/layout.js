import './globals.css'
import JsonLd from '@/components/JsonLd'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://date-invitation-blond.vercel.app'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Date Invitation — Invitations romantiques & sorties entre amis',
    template: '%s | Date Invitation',
  },
  description: 'Crée et envoie des invitations personnalisées par WhatsApp : rendez-vous romantique, sortie entre amis, dîner, balade... Menu, date et créneaux en un seul lien.',
  keywords: [
    'invitation romantique', 'invitation date', 'sortie entre amis', 'invitation WhatsApp',
    'rendez-vous romantique', 'invitation dîner', 'invitation sortie amis', 'date romantique',
    'invitation Cotonou', 'invitation personnalisée', 'lien invitation WhatsApp', 'organiser une sortie',
  ],
  authors: [{ name: 'Date Invitation' }],
  creator: 'Date Invitation',
  publisher: 'Date Invitation',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'Date Invitation',
    title: '💌 Date Invitation — Invitations WhatsApp personnalisées',
    description: 'Crée une invitation romantique ou entre amis en 2 min et envoie-la par WhatsApp. Menu, date, créneaux : tout en un lien.',
    images: [{
      url: '/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'Date Invitation — crée tes invitations WhatsApp en 2 minutes',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '💌 Date Invitation — Invitations WhatsApp personnalisées',
    description: 'Crée une invitation romantique ou entre amis en 2 min et envoie-la par WhatsApp.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#0D0F1A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <JsonLd />
      </head>
      <body>{children}</body>
    </html>
  )
}
