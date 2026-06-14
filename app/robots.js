export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/create',
      disallow: '/invite',
    },
    sitemap: 'https://date-invitation-blond.vercel.app/sitemap.xml',
  }
}
