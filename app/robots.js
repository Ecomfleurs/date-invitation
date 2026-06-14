const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://date-invitation-blond.vercel.app'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/create'],
        disallow: ['/invite', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
