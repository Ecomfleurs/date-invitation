import './globals.css'

export const metadata = {
  title: 'Planifie notre date 💌',
  description: 'Tu as reçu une invitation très spéciale...',
  openGraph: {
    title: '💌 Tu as reçu une invitation très spéciale...',
    description: 'Clique pour l\'ouvrir et répondre',
    type: 'website',
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
      </head>
      <body>{children}</body>
    </html>
  )
}
