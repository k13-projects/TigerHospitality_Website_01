# SEO Configuration - Tiger Hospitality Website

**Lighthouse SEO Score: 100/100**

## Implemented Features

### Meta Tags

| Tag | Value |
|-----|-------|
| `<title>` | TIGER HOSPITALITY - Elevating San Diego's Culinary Scene |
| `<meta name="description">` | 160-character description with keywords |
| `<meta name="keywords">` | San Diego restaurants, Tiger Hospitality, fine dining... |
| `<meta name="robots">` | index, follow |
| `<link rel="canonical">` | https://tigerhospitalitygroup.com/ |

### Open Graph (Facebook/LinkedIn)

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://tigerhospitalitygroup.com/">
<meta property="og:title" content="TIGER HOSPITALITY - Elevating San Diego's Culinary Scene">
<meta property="og:description" content="Discover exceptional dining experiences...">
<meta property="og:image" content="https://tigerhospitalitygroup.com/assets/logo.png">
<meta property="og:site_name" content="Tiger Hospitality">
<meta property="og:locale" content="en_US">
```

### Twitter Cards

```html
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://tigerhospitalitygroup.com/">
<meta property="twitter:title" content="TIGER HOSPITALITY - Elevating San Diego's Culinary Scene">
<meta property="twitter:description" content="Discover exceptional dining experiences...">
<meta property="twitter:image" content="https://tigerhospitalitygroup.com/assets/logo.png">
```

### Geo-Location Tags

```html
<meta name="geo.region" content="US-CA">
<meta name="geo.placename" content="San Diego">
<meta name="geo.position" content="32.715738;-117.161084">
```

### Structured Data (JSON-LD)

Located in `index.html` lines 77-168:

- **Organization**: Tiger Hospitality FH Holdings
- **Restaurants** (5 entities with full schema):
  - Lobster Lab (Seafood, Carlsbad)
  - Cosmos Burger (American)
  - La Vida (Healthy, Carlsbad)
  - Good Enough (Cocktails/Spanish Tapas, Little Italy)
  - Egg n Out (Breakfast)

Each restaurant includes: name, description, cuisine type, price range, address, social links.

### Technical SEO Files

| File | Purpose | Status |
|------|---------|--------|
| `robots.txt` | Crawl directives | Allows all, blocks /node_modules/, references sitemap |
| `sitemap.xml` | URL list | Lists index.html (priority 1.0) and privacy-policy.html (0.3) |
| `CNAME` | Custom domain | tigerhospitalitygroup.com |

### Performance Optimizations

- Preconnect to Google Fonts, Gstatic, Unpkg
- DNS prefetch for map tile servers
- Content Security Policy header
- Optimized image loading

### Accessibility (SEO Impact)

- Semantic HTML5 structure (`<header>`, `<main>`, `<section>`, `<footer>`)
- Skip navigation link for screen readers
- ARIA labels on interactive elements
- Alt text on all images
- Language declaration (`lang="en"`)

## File Reference

| SEO Element | File | Lines |
|-------------|------|-------|
| Title & meta description | `index.html` | 9-17 |
| Open Graph tags | `index.html` | 23-30 |
| Twitter Card tags | `index.html` | 32-37 |
| Geo tags | `index.html` | 39-43 |
| Canonical URL | `index.html` | 50 |
| JSON-LD schema | `index.html` | 77-168 |
| Sitemap | `sitemap.xml` | entire file |
| Robots directives | `robots.txt` | entire file |

## Pending Items

These are optional enhancements documented in `SEO_STRATEGY.md`:

1. **Google Search Console** - Add verification meta tag after registering
2. **Google Business Profiles** - Claim profiles for all 8 locations
3. **Google Analytics 4** - Add tracking code when ready
4. **Local directory listings** - Yelp, TripAdvisor, OpenTable

## Updating SEO

**When adding new pages:**
1. Add page to `sitemap.xml` with appropriate priority
2. Update `lastmod` date
3. Include canonical URL in new page's `<head>`

**When changing page content:**
1. Update `lastmod` in `sitemap.xml`
2. Consider updating meta description if content focus changed

**When adding new restaurants:**
1. Add JSON-LD Restaurant schema entry
2. Include address, cuisine type, price range, social links
