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
    if (window.scrollY > 100) {
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

// ===== Google Maps Integration =====
function initMap() {
    // Center of San Diego
    const sanDiego = { lat: 32.7157, lng: -117.1611 };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: sanDiego,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{ "color": "#242f3e" }]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{ "lightness": -80 }]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#746855" }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#d59563" }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{ "color": "#17263c" }]
            }
        ]
    });

    // Restaurant locations
    const locations = [
        {
            position: { lat: 32.7157, lng: -117.1611 },
            title: 'Good Enough Cocktails Club',
            description: 'Gaslamp Quarter'
        },
        {
            position: { lat: 32.7220, lng: -117.1653 },
            title: 'Tiger\'s Den',
            description: 'Little Italy'
        },
        {
            position: { lat: 32.8328, lng: -117.2713 },
            title: 'Coastal Kitchen',
            description: 'La Jolla'
        },
        {
            position: { lat: 32.7157, lng: -117.1570 },
            title: 'Sunset Terrace',
            description: 'Downtown'
        }
    ];

    // Add markers for each location
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#c9a961',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<div style="padding: 10px; color: #0a0a0a;">
                <h3 style="margin: 0 0 5px 0; font-family: 'Playfair Display', serif;">${location.title}</h3>
                <p style="margin: 0; font-size: 14px;">${location.description}</p>
            </div>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// ===== Load Google Maps with Fallback =====
function loadGoogleMaps() {
    // Check if we're in a real environment with API key
    // For demo purposes, we'll create a fallback
    if (typeof google === 'undefined') {
        // Create a fallback visual map
        const mapElement = document.getElementById('map');
        mapElement.innerHTML = `
            <div style="width: 100%; height: 100%; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; flex-direction: column; color: white; text-align: center; padding: 40px;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 32px; margin-bottom: 20px;">Our San Diego Locations</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; max-width: 900px;">
                    <div>
                        <h4 style="color: #c9a961; font-size: 18px; margin-bottom: 10px;">Good Enough Cocktails Club</h4>
                        <p style="font-size: 14px; margin: 0;">Gaslamp Quarter</p>
                    </div>
                    <div>
                        <h4 style="color: #c9a961; font-size: 18px; margin-bottom: 10px;">Tiger's Den</h4>
                        <p style="font-size: 14px; margin: 0;">Little Italy</p>
                    </div>
                    <div>
                        <h4 style="color: #c9a961; font-size: 18px; margin-bottom: 10px;">Coastal Kitchen</h4>
                        <p style="font-size: 14px; margin: 0;">La Jolla</p>
                    </div>
                    <div>
                        <h4 style="color: #c9a961; font-size: 18px; margin-bottom: 10px;">Sunset Terrace</h4>
                        <p style="font-size: 14px; margin: 0;">Downtown</p>
                    </div>
                </div>
                <p style="margin-top: 30px; font-size: 13px; opacity: 0.8;">To enable interactive map, add your Google Maps API key</p>
            </div>
        `;
    }
}

// Initialize map on page load
window.addEventListener('load', loadGoogleMaps);

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
