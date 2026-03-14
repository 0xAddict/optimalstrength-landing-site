import { useEffect } from 'react'

function ensureMeta(selector, attributes) {
  let node = document.head.querySelector(selector)

  if (!node) {
    node = document.createElement('meta')
    document.head.appendChild(node)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value)
  })
}

export function usePageMeta({ title, description, pathname = '/', schema }) {
  useEffect(() => {
    document.documentElement.lang = 'nl'
    document.title = title

    const resolvedUrl = new URL(pathname, window.location.origin).toString()

    ensureMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    })
    ensureMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: 'website',
    })
    ensureMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: 'nl_NL',
    })
    ensureMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    })
    ensureMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })
    ensureMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: resolvedUrl,
    })
    ensureMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })
    ensureMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: title,
    })
    ensureMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    })

    let canonical = document.head.querySelector('link[rel="canonical"]')

    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }

    canonical.setAttribute('href', resolvedUrl)

    let schemaTag = document.head.querySelector('script[data-seo-schema="page"]')

    if (schema) {
      if (!schemaTag) {
        schemaTag = document.createElement('script')
        schemaTag.type = 'application/ld+json'
        schemaTag.dataset.seoSchema = 'page'
        document.head.appendChild(schemaTag)
      }

      schemaTag.textContent = JSON.stringify(schema)
    } else if (schemaTag) {
      schemaTag.remove()
    }
  }, [description, pathname, schema, title])
}
