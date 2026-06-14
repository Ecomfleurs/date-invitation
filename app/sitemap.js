const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://date-invitation-blond.vercel.app'

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/create`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ]
}
