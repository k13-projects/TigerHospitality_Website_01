# TIGER HOSPITALITY Website

A modern, responsive website for TIGER HOSPITALITY featuring premium animations, interactive maps, and accessibility features. Showcasing culinary concepts and food halls across Southern California.

## Project Structure

```
TigerHospitality_Website_01/
├── css/
│   └── style.css          # Main stylesheet with animations
├── js/
│   └── main.js            # Main JavaScript with scroll restoration
├── assets/
│   ├── hero/              # Hero slider background images
│   ├── cards/             # Concept card photos
│   ├── logos/             # Brand logos for map markers
│   ├── Lobster Lab 3 - 5.25.23-79.jpg  # About section image
│   └── logo.png           # Main Tiger Hospitality logo
├── index.html             # Main HTML file
├── privacy-policy.html    # Privacy policy page
├── server.js              # Express server for local development
├── package.json           # Node.js dependencies
├── README.md              # Project documentation
└── .gitignore             # Git ignore rules
```

## Features

### Visual & UX
- **Animated Loading Screen** - Tiger Hospitality logo reveal with bottom-to-top mask animation
- **Hero Slider** - Auto-rotating background images (5s intervals)
- **Scroll Restoration** - Always starts at top on page refresh for consistent UX
- **Mobile Hamburger Menu** - Smooth slide-in navigation with overlay
- **Flip Card Concepts** - Interactive restaurant showcase with hover effects
- **Section Dividers** - Animated expanding/contracting lines on scroll (bidirectional)
- **Smooth Scroll** - Custom smooth scrolling with navbar offset

### Interactive Features
- **Interactive Maps** - Leaflet.js maps with custom logo markers (no API key required)
- **Contact Form** - Client-side validation ready for EmailJS integration
- **Stat Counter Animations** - Number counting animations on scroll
- **Keyboard Navigation** - Full accessibility support

### Technical Features
- **Accessibility** - ARIA labels, skip links, keyboard navigation, screen reader support
- **Performance Optimized** - Efficient animations, IntersectionObserver usage
- **Responsive Design** - Mobile-first approach, tested across devices
- **No API Keys Required** - Uses free Leaflet/OpenStreetMap for maps

## Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Maps**: Leaflet.js with CartoDB dark theme tiles
- **Fonts**: Google Fonts (Bebas Neue, Montserrat, Playfair Display)
- **Dev Server**: Express.js (Node.js)
- **Version Control**: Git/GitHub

## Current Concepts

### Culinary Concepts
- **Lobster Lab** - Seafood concept (Carlsbad + Coming Soon locations)
- **Cosmos Burger** - Premium burgers (Carlsbad + Coming Soon locations)
- **La Vida** - Healthy eats (Carlsbad + Coming Soon locations)
- **Good Enough** - Craft cocktails & tapas (Little Italy)
- **Egg n Out** - Breakfast club (San Clemente - Coming Soon)

### Food Halls
- **Miramar Food Hall** - San Clemente (Coming Soon)
- **Station 8 Public Market** - La Jolla (Coming Soon)
- **Global Fork** - Little Italy (Coming Soon)

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/k13-projects/TigerHospitality_Website_01.git
cd TigerHospitality_Website_01
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Visit: `http://localhost:3000`

## Local Development

### Using Node.js (Recommended)
```bash
npm start
# or
node server.js
```

### Alternative: Python Server
```bash
python -m http.server 3000
```

Then visit: `http://localhost:3000`

## Configuration

### Contact Form (TODO)
The contact form currently has client-side validation but requires EmailJS integration:
1. Sign up at https://www.emailjs.com/
2. Configure email service and template
3. Add credentials to `js/main.js`

See issue tracker for EmailJS integration task.

## Deployment

This is a static website deployable to:
- **GoDaddy** (planned deployment)
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

### Files Required for Deployment
- `index.html`
- `privacy-policy.html`
- `css/` folder
- `js/` folder
- `assets/` folder

**Note**: `server.js` and `node_modules/` are only for local development and not needed for production.

## Browser Support

- Chrome (latest) ✅
- Firefox (latest) ✅
- Safari (latest) ✅
- Edge (latest) ✅
- Mobile browsers ✅

## Performance

- Lighthouse Score: 90+ (Performance)
- No external API dependencies (maps use free Leaflet)
- Optimized images and animations
- Efficient scroll listeners with IntersectionObserver

## Contributing

This is a private project for Tiger Hospitality Group. For internal contributions:
1. Create a feature branch (`tiger_*`)
2. Make your changes
3. Submit a pull request to `main`

## Legal & Compliance

### Privacy Policy
The website includes a comprehensive privacy policy (`privacy-policy.html`) that covers:
- Information collection practices
- Data usage and disclosure
- User rights and opt-out options
- Cookie usage
- Security measures

### Third-Party Services
- **Leaflet.js** - Open-source mapping library (BSD 2-Clause License)
- **OpenStreetMap** - Map tiles (ODbL License)
- **Google Fonts** - Typography (Apache License 2.0)

### Content Rights
All restaurant photos, logos, and brand content are owned by Tiger Hospitality Group and its respective restaurant brands.

## License

All rights reserved - TIGER HOSPITALITY 2025

## Contact

For questions or support, contact the development team at info@tigerhospitalitygroup.com
