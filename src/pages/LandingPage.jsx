import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { siteContent } from '../content/siteContent'
import { usePageMeta } from '../lib/seo'

export function LandingPage() {
  const { brand, imagery, landing } = siteContent
  usePageMeta({
    title: landing.title,
    description: landing.description,
    pathname: '/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HealthClub',
      name: `${brand.name} ${brand.location}`,
      description: landing.description,
      image: brand.image,
      telephone: brand.phoneNumber,
      address: {
        '@type': 'PostalAddress',
        streetAddress: brand.streetAddress,
        postalCode: brand.postalCode,
        addressLocality: brand.locality,
        addressRegion: brand.region,
        addressCountry: brand.country,
      },
      areaServed: brand.locality,
      url: window.location.origin,
    },
  })

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main-content">
        Ga naar inhoud
      </a>
      <SiteHeader brand={brand} primaryLabel={landing.hero.primaryCta} />

      <main id="main-content">
        <section className="hero-section section-card" data-section="hero">
          <div className="hero-copy">
            <p className="eyebrow">{landing.hero.eyebrow}</p>
            <h1>{landing.hero.headline}</h1>
            <p className="hero-body">{landing.hero.body}</p>
            <div className="hero-actions">
              <Link className="cta-button cta-button--large" to="/book">
                {landing.hero.primaryCta}
              </Link>
              <a className="ghost-link ghost-link--large" href={brand.phoneHref}>
                {brand.phoneLabel}
              </a>
            </div>
            <p className="support-line">{landing.hero.support}</p>
            <ul className="proof-pills" aria-label="Kernbewijs">
              {landing.hero.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mini-panel">
              <p className="eyebrow">WAT GEBEURT ER HIERNA?</p>
              <p>{landing.hero.nextStep}</p>
            </div>
          </div>

          <aside className="hero-visual">
            <div className="portrait-frame">
              <picture>
                <source srcSet="/images/patrick-coaching.webp" type="image/webp" />
                <img
                  src={landing.hero.image}
                  alt="Patrick Weurding in de studio van Optimal Strength"
                  width="1066"
                  height="1600"
                />
              </picture>
            </div>
            <div className="floating-review floating-review--inline">
              <span>4,8 Google</span>
              <strong>Professionele coaching zonder chaos.</strong>
            </div>
          </aside>
        </section>

        <section className="stack-section" data-section="benefits">
          <SectionTitle
            eyebrow="BENEFITS"
            title="Waarom deze aanpak werkt wanneer de sportschool je eerder niets opleverde."
          />
          <div className="three-column-grid">
            {landing.benefits.map((benefit) => (
              <article className="info-card" key={benefit.title}>
                <h2>{benefit.title}</h2>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-card process-band" data-section="process">
          <div>
            <p className="eyebrow">{landing.process.eyebrow}</p>
            <h2>{landing.process.title}</h2>
            <p className="section-intro">{landing.process.intro}</p>
          </div>
          {imagery.process.src ? (
            <figure className="support-image-card support-image-card--process">
              <LazyPicture
                src={imagery.process.src}
                webpSrc={imagery.process.src.replace('.png', '.webp')}
                alt={imagery.process.alt}
              />
            </figure>
          ) : null}
          <div className="process-grid">
            {landing.process.steps.map((step) => (
              <article className="info-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <div className="inline-cta">
            <p>{landing.process.ctaNote}</p>
            <Link className="cta-button" to="/book">
              {landing.hero.primaryCta}
            </Link>
          </div>
        </section>

        <section className="stack-section" data-section="proof">
          <SectionTitle
            eyebrow="SOCIAL PROOF"
            title="Resultaten van gewone mensen met echte agenda's."
          />
          {imagery.support.src ? (
            <section className="section-card proof-support-band">
              <figure className="support-image-card support-image-card--wide">
                <LazyPicture
                  src={imagery.support.src}
                  webpSrc={imagery.support.src.replace('.png', '.webp')}
                  alt={imagery.support.alt}
                />
              </figure>
            </section>
          ) : null}
          <section className="section-card proof-band">
            <div>
              <blockquote>{landing.featuredProof.quote}</blockquote>
            </div>
            <div className="proof-meta">
              <Avatar name={landing.featuredProof.name} src={landing.featuredProof.avatar} />
              <strong>{landing.featuredProof.name}</strong>
              <span>{landing.featuredProof.result}</span>
            </div>
          </section>
          <div className="three-column-grid">
            {landing.moreProof.map((item) => (
              <article className="info-card" key={item.name}>
                <Avatar name={item.name} src={item.avatar} />
                <h2>{item.name}</h2>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stack-section" data-section="guarantees">
          <SectionTitle
            eyebrow="GARANTIES"
            title="Veilige redenen om nu de stap te zetten."
          />
          {imagery.environment.src ? (
            <section className="section-card environment-band">
              <figure className="support-image-card support-image-card--wide">
                <img src={imagery.environment.src} alt={imagery.environment.alt} loading="lazy" />
              </figure>
            </section>
          ) : null}
          <div className="guarantee-grid">
            {landing.guarantees.map((item) => (
              <article className="info-card guarantee-card" key={item}>
                <span className="icon-chip" aria-hidden="true">
                  ✓
                </span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-card faq-section" data-section="faq">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>Laatste twijfel? Goed. Die nemen we weg.</h2>
          </div>
          <div className="faq-list">
            {landing.faqs.map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </section>

        <section className="section-card final-cta" data-section="final-cta">
          <p className="eyebrow">KLAAR OM TE STARTEN?</p>
          <h2>Boek je gesprek. Niet volgende week, maar nu.</h2>
          <p>
            Eén goede eerste afspraak is meer waard dan nog een maand nadenken.
          </p>
          <div className="hero-actions hero-actions--center">
            <Link className="cta-button cta-button--large" to="/book">
              {landing.hero.primaryCta}
            </Link>
            <a className="ghost-link ghost-link--large" href={brand.phoneHref}>
              {brand.phoneLabel}
            </a>
          </div>
          <p className="micro-proof">4,8 Google score · 10+ jaar ervaring</p>
        </section>
      </main>

      <FloatingCtaBar label={landing.hero.primaryCta} />
    </div>
  )
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  )
}

function Avatar({ name, src }) {
  return (
    <span className="avatar-chip" aria-hidden="true">
      {src ? <img src={src} alt="" loading="lazy" /> : <span>{name.slice(0, 1)}</span>}
    </span>
  )
}

function LazyPicture({ src, webpSrc, alt }) {
  return (
    <picture>
      {webpSrc ? <source srcSet={webpSrc} type="image/webp" /> : null}
      <img src={src} alt={alt} loading="lazy" />
    </picture>
  )
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <article className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button
        className="faq-item__toggle"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <h3>{question}</h3>
        <svg className="faq-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="faq-answer">
        <div>
          <p>{answer}</p>
        </div>
      </div>
    </article>
  )
}

function FloatingCtaBar({ label }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`floating-cta-bar${visible ? ' floating-cta-bar--visible' : ''}`}>
      <Link className="cta-button cta-button--large" to="/book">
        {label}
      </Link>
    </div>
  )
}
