/**
 * TIGER HOSPITALITY WEBSITE
 * Main JavaScript File
 */

// ===== Loading Screen =====
window.addEventListener('load', function () {
    // Wait for bottom-to-top reveal (2s) + 1 second pause
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 800);
    }, 2100); // 2000ms for reveal + 100ms pause
});

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('active');

    if (isOpen) {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    } else {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);
mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

// Close mobile menu when link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
});

// Close mobile menu on escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    const heroSection = document.querySelector('.hero-container');
    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
    const scrollTrigger = heroHeight * 0.9; // 90% of hero height

    if (window.scrollY > scrollTrigger) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Hero Slider =====
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    if (slides.length === 0) return;

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, slideInterval);
}

window.addEventListener('load', initHeroSlider);



// ===== Intersection Observer for Divider Lines with Reverse Animation =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const leftLine = entry.target.querySelector('.divider-line.left');
        const rightLine = entry.target.querySelector('.divider-line.right');

        if (leftLine && rightLine) {
            if (entry.isIntersecting) {
                // Scrolling into view - animate in
                leftLine.classList.add('animate');
                rightLine.classList.add('animate');
            } else {
                // Scrolling out of view - animate out (reverse)
                leftLine.classList.remove('animate');
                rightLine.classList.remove('animate');
            }
        }
    });
}, observerOptions);

// Observe all section dividers
document.querySelectorAll('.section-divider').forEach(divider => {
    lineObserver.observe(divider);
});

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// ===== Animate Stats on Scroll =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                const isNumeric = /^\d+/.test(finalValue);

                if (isNumeric) {
                    const numericValue = parseInt(finalValue.match(/\d+/)[0]);
                    const suffix = finalValue.replace(/\d+/, '');
                    let current = 0;
                    const increment = numericValue / 50;

                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            stat.textContent = numericValue + suffix;
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.floor(current) + suffix;
                        }
                    }, 30);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}

// ===== Contact Form Validation and Submission =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const inquiry = document.getElementById('inquiry').value;
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !inquiry || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission (replace with actual backend endpoint)
    showFormMessage('Sending message...', 'success');

    setTimeout(() => {
        showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1500);
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
}

// ===== Interactive Map with Leaflet (Free, No API Key Required) =====
function initMap() {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }

    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('Map element not found');
        return;
    }

    // Center of San Diego
    const sanDiego = [32.7157, -117.1611];

    // Initialize the map
    const map = L.map('map', {
        center: sanDiego,
        zoom: 12,
        scrollWheelZoom: true,
        zoomControl: true
    });

    // Add custom dark theme tiles from OpenStreetMap
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Food Halls and Standalone Locations
    const locations = [
        {
            coords: [32.7197, -117.1697],
            title: 'Good Enough',
            type: 'standalone',
            address: '555 W Date St, Suite B, San Diego, CA',
            description: 'Craft Cocktails & Tapas',
            instagram: 'https://www.instagram.com/goodenough.sd/',
            logo: 'assets/logos/goodenough.png'
        },
        {
            coords: [32.7200, -117.1700],
            title: 'Little Italy Food Hall',
            type: 'foodhall',
            address: 'Little Italy, San Diego, CA',
            status: 'Coming Soon',
            concepts: [],
            logo: 'assets/logo.png'
        },
        {
            coords: [32.8715, -117.2460],
            title: 'Station 8 Public Market',
            type: 'foodhall',
            address: '9165 South Scholars Drive, La Jolla, CA',
            concepts: [],
            status: 'Opening August 2026',
            instagram: 'https://www.instagram.com/station8publicmarket/',
            logo: 'assets/logos/station8.png'
        },
        {
            coords: [33.4267, -117.6112],
            title: 'Miramar Food Hall',
            type: 'foodhall',
            address: '1720 North El Camino Real, San Clemente, CA',
            concepts: ['Lobster Lab', 'Cosmos', 'La Vida'],
            status: 'Coming Soon',
            instagram: 'https://www.instagram.com/miramarfoodhall/',
            logo: 'assets/logos/miramar.png'
        }
    ];

    // Add markers for each location
    locations.forEach(location => {
        // Create icon with actual logo
        const size = 45;
        const isFoodHall = location.type === 'foodhall';

        const customIcon = L.divIcon({
            className: 'custom-marker-logo',
            html: `<div style="width: ${size}px; height: ${size}px; border-radius: 50%; border: 3px solid #c9a961; background: white; box-shadow: 0 3px 12px rgba(0,0,0,0.4); overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 5px;">
                <img src="${location.logo}" style="width: 100%; height: 100%; object-fit: contain;" alt="${location.title}">
            </div>`,
            iconSize: [size, size],
            iconAnchor: [size/2, size/2],
            popupAnchor: [0, -size/2 - 8]
        });

        const marker = L.marker(location.coords, { icon: customIcon }).addTo(map);

        // Create popup content based on location type
        let popupContent = '';

        if (isFoodHall) {
            const conceptsList = location.concepts && location.concepts.length > 0 ? location.concepts.map(c => `<li style="margin: 3px 0;">${c}</li>`).join('') : '';
            const statusBadge = location.status ? `<span style="display: inline-block; background: #f0ad4e; color: white; padding: 3px 8px; border-radius: 3px; font-size: 11px; margin-left: 8px;">${location.status}</span>` : '';

            popupContent = `
                <div style="font-family: 'Montserrat', sans-serif; min-width: 250px;">
                    <h3 style="margin: 0 0 8px 0; font-family: 'Playfair Display', serif; color: #c9a961; font-size: 20px;">
                        ${location.title}${statusBadge}
                    </h3>
                    <p style="margin: 0 0 10px 0; font-size: 12px; color: #666; border-left: 3px solid #c9a961; padding-left: 8px;">${location.address}</p>
                    ${conceptsList ? `
                        <div style="margin: 12px 0;">
                            <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 600; color: #333;">Concepts Inside:</p>
                            <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #666;">
                                ${conceptsList}
                            </ul>
                        </div>
                    ` : ''}
                    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(201, 169, 97, 0.3);">
                        ${!location.status || location.status.includes('August 2026') ? `
                            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}"
                               target="_blank"
                               style="color: #c9a961; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; text-decoration: none; padding: 8px; border-radius: 50%; background: transparent;"
                               onmouseover="this.style.backgroundColor='#c9a961'; this.style.color='#ffffff'; this.style.transform='translateY(-2px)';"
                               onmouseout="this.style.backgroundColor='transparent'; this.style.color='#c9a961'; this.style.transform='translateY(0)';">
                               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                               </svg>
                            </a>
                        ` : ''}
                        ${location.website ? `
                            <a href="${location.website}" target="_blank"
                               style="color: #c9a961; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; text-decoration: none; padding: 8px; border-radius: 50%; background: transparent;"
                               onmouseover="this.style.backgroundColor='#c9a961'; this.style.color='#ffffff'; this.style.transform='scale(1.1)';"
                               onmouseout="this.style.backgroundColor='transparent'; this.style.color='#c9a961'; this.style.transform='scale(1)';">
                               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                               </svg>
                            </a>
                        ` : ''}
                        ${location.instagram ? `
                            <a href="${location.instagram}" target="_blank"
                               style="color: #c9a961; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; text-decoration: none; padding: 8px; border-radius: 50%; background: transparent;"
                               onmouseover="this.style.backgroundColor='#c9a961'; this.style.color='#ffffff'; this.style.transform='scale(1.1)';"
                               onmouseout="this.style.backgroundColor='transparent'; this.style.color='#c9a961'; this.style.transform='scale(1)';">
                               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                               </svg>
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
        } else {
            // Standalone concept
            popupContent = `
                <div style="font-family: 'Montserrat', sans-serif; min-width: 220px;">
                    <h3 style="margin: 0 0 8px 0; font-family: 'Playfair Display', serif; color: #c9a961; font-size: 18px;">${location.title}</h3>
                    ${location.description ? `<p style="margin: 0 0 8px 0; font-size: 12px; color: #888; font-style: italic;">${location.description}</p>` : ''}
                    <p style="margin: 0 0 10px 0; font-size: 12px; color: #666; border-left: 3px solid #c9a961; padding-left: 8px;">${location.address}</p>
                    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(201, 169, 97, 0.3);">
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}"
                           target="_blank"
                           style="color: #c9a961; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; text-decoration: none; padding: 8px; border-radius: 50%; background: transparent;"
                           onmouseover="this.style.backgroundColor='#c9a961'; this.style.color='#ffffff'; this.style.transform='translateY(-2px)';"
                           onmouseout="this.style.backgroundColor='transparent'; this.style.color='#c9a961'; this.style.transform='translateY(0)';">
                           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                               <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                           </svg>
                        </a>
                        ${location.instagram ? `
                            <a href="${location.instagram}" target="_blank"
                               style="color: #c9a961; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; text-decoration: none; padding: 8px; border-radius: 50%; background: transparent;"
                               onmouseover="this.style.backgroundColor='#c9a961'; this.style.color='#ffffff'; this.style.transform='scale(1.1)';"
                               onmouseout="this.style.backgroundColor='transparent'; this.style.color='#c9a961'; this.style.transform='scale(1)';">
                               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                               </svg>
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
        }

        marker.bindPopup(popupContent, { maxWidth: 300 });

        // Open popup on hover for better UX
        marker.on('mouseover', function() {
            this.openPopup();
        });
    });

    // Fit map to show all markers
    const group = L.featureGroup(locations.map(loc => L.marker(loc.coords)));
    map.fitBounds(group.getBounds().pad(0.1));
}

// Initialize map on page load
window.addEventListener('load', initMap);

// ===== Keyboard Navigation Improvements =====
document.addEventListener('keydown', function (e) {
    // Allow Enter key to activate cards
    if (e.key === 'Enter' && e.target.closest('.concept-card')) {
        e.target.closest('.concept-card').click();
    }
});

// Make concept cards keyboard accessible
document.querySelectorAll('.concept-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'View restaurant details');
});
