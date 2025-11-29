# Deployment Guide - Tiger Hospitality Website

## Hosting Setup

| Setting | Value |
|---------|-------|
| **Platform** | GitHub Pages (static hosting) |
| **Repository** | `k13-projects/TigerHospitality_Website_01` |
| **Production Branch** | `main` |
| **Custom Domain** | tigerhospitalitygroup.com |
| **SSL/HTTPS** | Automatically provided by GitHub Pages |

## DNS Configuration

The domain is configured with DNS records pointing to GitHub Pages:

**A Records** (apex domain):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record** (www subdomain):
```
www → k13-projects.github.io
```

The `CNAME` file in the repository root contains `tigerhospitalitygroup.com` and must not be deleted.

## Deployment Process

1. Push changes to the `main` branch
2. GitHub Pages automatically builds and deploys
3. Changes go live within 1-5 minutes
4. No build step required (static HTML/CSS/JS)

## Recommended Workflow

```bash
# 1. Create a feature branch
git checkout -b feature/update-menu

# 2. Make changes and test locally
node server.js
# Preview at http://localhost:3000

# 3. Commit changes
git add .
git commit -m "Update restaurant descriptions"

# 4. Push and create Pull Request
git push origin feature/update-menu
# Create PR on GitHub

# 5. Merge to main → automatic deployment
```

## Local Development

```bash
# Install dependencies (first time only)
npm install

# Start local server
node server.js

# Open http://localhost:3000
```

## Important Files

| File | Purpose | Notes |
|------|---------|-------|
| `CNAME` | Custom domain config | **Do not delete** |
| `index.html` | Main website | All primary content |
| `privacy-policy.html` | Privacy policy | Linked from footer |
| `robots.txt` | Search engine rules | References sitemap |
| `sitemap.xml` | URL list for SEO | Update lastmod on changes |

## Troubleshooting

**Site not updating after push?**
- Wait 5 minutes for GitHub Pages cache
- Check repository Settings → Pages for deployment status
- Verify the `main` branch is set as source

**Custom domain not working?**
- Verify `CNAME` file exists with correct domain
- Check DNS propagation (can take 24-48 hours initially)
- Ensure HTTPS is enforced in repository Settings → Pages

**404 errors?**
- GitHub Pages is case-sensitive for URLs
- Ensure file paths match exactly
