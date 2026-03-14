import { Link, NavLink } from 'react-router-dom'

export function SiteHeader({ brand, primaryLabel }) {
  return (
    <header className="site-header">
      <Link className="brand-mark" to="/">
        <span className="brand-sigil" aria-hidden="true">
          OS
        </span>
        <span>
          <strong>{brand.name}</strong>
          <small>{brand.location}</small>
        </span>
      </Link>

      <nav className="top-actions" aria-label="Snelle acties">
        <a className="ghost-link" href={brand.phoneHref}>
          {brand.phoneLabel}
        </a>
        {primaryLabel ? (
          <NavLink className="cta-button" to="/book">
            {primaryLabel}
          </NavLink>
        ) : null}
      </nav>
    </header>
  )
}
