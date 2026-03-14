import { SiteHeader } from '../components/SiteHeader'
import { BookingFlow } from '../components/booking/BookingFlow'
import { siteContent } from '../content/siteContent'
import { usePageMeta } from '../lib/seo'

export function BookPage() {
  const { brand, bookingFlow } = siteContent

  usePageMeta({
    title: bookingFlow.title,
    description: bookingFlow.description,
    pathname: '/book',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: bookingFlow.title,
      description: bookingFlow.description,
      url: new URL('/book', window.location.origin).toString(),
      about: {
        '@type': 'HealthClub',
        name: `${brand.name} ${brand.location}`,
      },
    },
  })

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main-content">
        Ga naar inhoud
      </a>
      <SiteHeader brand={brand} />
      <BookingFlow brand={brand} bookingFlow={bookingFlow} />
    </div>
  )
}
