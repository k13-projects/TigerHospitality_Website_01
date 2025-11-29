# Maintenance Guide - Tiger Hospitality Website

## Quick Reference

| Task | File | Location |
|------|------|----------|
| Update hero text | `index.html` | Search for `hero-content` |
| Edit restaurant cards | `index.html` | Search for `concept-card` |
| Change statistics | `index.html` | Search for `stat-number` |
| Update contact info | `index.html` | Search for `contact-section` |
| Modify footer | `index.html` | Search for `<footer>` |
| Add map locations | `js/main.js` | Search for `L.marker` |

## Updating Content

### Text Changes

All website text is in `index.html`. Use your editor's search (Ctrl/Cmd+F) to find sections:

**Hero Section:**
```html
<h1 class="hero-title">TIGER HOSPITALITY</h1>
<p class="hero-subtitle">Elevating San Diego's Culinary Scene</p>
```

**Restaurant Descriptions:**
Search for the restaurant name (e.g., "Lobster Lab") to find its card.

**Company Statistics:**
```html
<div class="stat-number" data-target="5">0</div>
<div class="stat-label">Unique Concepts</div>
```

**Contact Emails:**
Search for `@tigerhospitalitygroup.com` to find all email addresses.

### Image Changes

**Image Locations:**
```
assets/
├── hero/          # Hero carousel backgrounds
├── cards/         # Restaurant concept images
├── logos/         # Brand logos
├── logo.png       # Main Tiger Hospitality logo
└── favicon.png    # Browser tab icon
```

**Image Guidelines:**
- Hero images: 1920x1080px (16:9 ratio)
- Card images: 800x600px (4:3 ratio)
- Always compress images before adding (use [TinyPNG](https://tinypng.com))
- Use descriptive filenames (e.g., `lobster-lab-interior.jpg`)

**To Replace an Image:**
1. Add the new image to the appropriate `assets/` subfolder
2. Update the `src` attribute in `index.html`
3. Update the `alt` text to describe the new image

### Adding a New Restaurant Concept

1. **Add card HTML** in the concepts section (copy existing card as template)
2. **Add JSON-LD schema** in the `<script type="application/ld+json">` block (~line 98)
3. **Add map marker** in `js/main.js`
4. **Update sitemap.xml** lastmod date

## Local Preview

```bash
# Install dependencies (first time only)
npm install

# Start local server
node server.js

# Preview at http://localhost:3000
```

Press `Ctrl+C` to stop the server.

## Safe Update Workflow

```bash
# 1. Pull latest changes
git checkout main
git pull origin main

# 2. Create a branch for your changes
git checkout -b update/new-menu-items

# 3. Make changes and preview locally
node server.js

# 4. Commit your changes
git add .
git commit -m "Add new menu items to Lobster Lab"

# 5. Push to GitHub
git push origin update/new-menu-items

# 6. Create Pull Request on GitHub
# Review changes, then merge to main

# 7. Site deploys automatically
```

## Common Tasks

### Update Company Statistics

Find and edit in `index.html`:
```html
<div class="stat-number" data-target="5">0</div>   <!-- Concepts -->
<div class="stat-number" data-target="8">0</div>   <!-- Locations -->
<div class="stat-number" data-target="100">0</div> <!-- Team members -->
<div class="stat-number" data-target="50">0</div>  <!-- Monthly guests (thousands) -->
```

### Update Social Links

**Footer icons** (visible social links):
Search for `social-links` in `index.html`

**SEO schema** (search engine data):
Edit the `sameAs` array in the JSON-LD block (~line 92)

### Update Copyright Year

Search for `©` in `index.html` footer.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Changes not appearing | Clear browser cache or wait 5 min for GitHub |
| Broken images | Check path (case-sensitive) and file extension |
| Map not showing | Check browser console for JavaScript errors |
| Styles look wrong | Hard refresh (Ctrl+Shift+R) to clear CSS cache |
| Local server won't start | Run `npm install` then try again |

## Need Help?

- Check the browser console (F12 → Console) for errors
- Review `DEPLOYMENT.md` for hosting questions
- Review `SEO_NOTES.md` for search engine optimization
