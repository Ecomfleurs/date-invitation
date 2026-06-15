export default function manifest() {
  return {
    name: 'Date Invitation',
    short_name: 'DateInvite',
    description: 'Crée et envoie des invitations romantiques & sorties entre amis par WhatsApp',
    start_url: '/create',
    scope: '/',
    display: 'standalone',
    background_color: '#0D0F1A',
    theme_color: '#0D0F1A',
    orientation: 'portrait-primary',
    categories: ['social', 'lifestyle'],
    lang: 'fr',
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
