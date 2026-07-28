/**
 * TIGER HOSPITALITY WEBSITE
 * Main JavaScript File
 *
 * © 2025 Tiger Hospitality Group
 * All rights reserved
 */

// ===== Scroll Restoration - Always start at top on page load =====
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Immediately scroll to top before anything renders (synchronous)
window.scrollTo(0, 0);

// ===== Loading Screen =====
window.addEventListener('load', function () {
    // Ensure scroll position is at top when loading screen is active
    window.scrollTo(0, 0);

    // "THG Rise" intro timing:
    //   reveal fill 1.2s (CSS revealUp) → 0.5s fade to the homepage. No hold — the
    //   fade begins the moment the logo finishes filling.
    //   fadeDuration MUST match the .loading-screen opacity transition (0.5s) so the
    //   screen is removed exactly when it finishes fading (no lingering / no early cut).
    //   Reduced-motion users skip the fill and get a near-instant exit.
    const screen = document.getElementById('loadingScreen');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdDelay = reduceMotion ? 50 : 1200;    // reveal 1.2s, no hold
    const fadeDuration = reduceMotion ? 200 : 500;  // keep in sync with the CSS transition
    setTimeout(() => {
        screen.classList.add('fade-out');
        setTimeout(() => {
            screen.style.display = 'none';
        }, fadeDuration);
    }, holdDelay);
});

// ===== Card Flip Click Support (for touch devices) =====
document.querySelectorAll('.concept-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
});

// ===== Vendor CTA Flip (reveal email on click, auto-flip back) =====
const vendorCtaBtn = document.getElementById('vendorCtaBtn');
const vendorCtaFlip = document.getElementById('vendorCtaFlip');
if (vendorCtaBtn && vendorCtaFlip) {
    const VENDOR_FLIP_BACK_MS = 6000;
    let vendorFlipTimer = null;

    const flipBack = () => {
        vendorCtaFlip.classList.remove('flipped');
        vendorFlipTimer = null;
    };

    vendorCtaBtn.addEventListener('click', () => {
        vendorCtaFlip.classList.add('flipped');
        if (vendorFlipTimer) clearTimeout(vendorFlipTimer);
        vendorFlipTimer = setTimeout(flipBack, VENDOR_FLIP_BACK_MS);
    });

    // Pause the auto-flip while the user is interacting with the email
    const vendorEmail = vendorCtaFlip.querySelector('.vendor-cta-email');
    if (vendorEmail) {
        vendorEmail.addEventListener('mouseenter', () => {
            if (vendorFlipTimer) {
                clearTimeout(vendorFlipTimer);
                vendorFlipTimer = null;
            }
        });
        vendorEmail.addEventListener('mouseleave', () => {
            if (vendorCtaFlip.classList.contains('flipped') && !vendorFlipTimer) {
                vendorFlipTimer = setTimeout(flipBack, VENDOR_FLIP_BACK_MS);
            }
        });
    }
}

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

// ===== Timeline Animation with Reversible Scroll Effect =====
const timelineObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Scrolling into view - animate in
            entry.target.classList.add('visible');
        } else {
            // Scrolling out of view - animate out (reverse)
            entry.target.classList.remove('visible');
        }
    });
}, timelineObserverOptions);

// Observe all timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            // For contact section, scroll directly to the section (skip the white divider)
            if (targetId === '#contact') {
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                return;
            }

            // For sections with dividers, scroll to show the divider
            const divider = target.previousElementSibling;
            if (divider && divider.classList.contains('section-divider')) {
                const elementPosition = divider.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navbarHeight; // Position divider just below navbar

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                return;
            }

            // Default scroll behavior for sections without dividers
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});



// ===== Animate Stats on Scroll =====
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCounters = entry.target.querySelectorAll('.stat-counter .stat-number');
            statCounters.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;

                // Add suffix for large numbers
                const formatNumber = (num) => {
                    if (num >= 1000) {
                        return (num / 1000).toFixed(0) + 'K+';
                    }
                    return num + '+';
                };

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = formatNumber(target);
                        clearInterval(counter);
                    } else {
                        stat.textContent = formatNumber(Math.floor(current));
                    }
                }, 30);
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

// ===== Conditional File Upload for Career Applications =====
const inquirySelect = document.getElementById('inquiry');
const fileUploadGroup = document.getElementById('fileUploadGroup');
const documentsInput = document.getElementById('documents');
const fileList = document.getElementById('fileList');

// Store selected files (since we can't modify FileList directly)
let selectedFiles = [];

inquirySelect.addEventListener('change', function() {
    if (this.value === 'career') {
        fileUploadGroup.style.display = 'block';
    } else {
        fileUploadGroup.style.display = 'none';
        documentsInput.value = '';
        selectedFiles = [];
        renderFileList();
    }
});

// Format file size for display
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Render the file list UI and update input state
function renderFileList() {
    const maxFiles = 2;
    fileList.innerHTML = '';

    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-item-info">
                <svg class="file-item-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                <span class="file-item-name">${file.name}</span>
                <span class="file-item-size">${formatFileSize(file.size)}</span>
            </div>
            <button type="button" class="file-item-remove" data-index="${index}" aria-label="Remove ${file.name}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
            </button>
        `;
        fileList.appendChild(fileItem);
    });

    // Add click handlers for remove buttons
    fileList.querySelectorAll('.file-item-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            selectedFiles.splice(index, 1);
            renderFileList();
        });
    });

    // Handle max files reached state
    const existingMessage = document.getElementById('fileLimitMessage');
    if (selectedFiles.length >= maxFiles) {
        documentsInput.disabled = true;
        if (!existingMessage) {
            const limitMessage = document.createElement('div');
            limitMessage.id = 'fileLimitMessage';
            limitMessage.className = 'file-limit-message';
            limitMessage.innerHTML = '⚠️ Maximum 2 files reached. Remove a file to upload another.';
            fileList.parentNode.insertBefore(limitMessage, fileList);
        }
    } else {
        documentsInput.disabled = false;
        if (existingMessage) {
            existingMessage.remove();
        }
    }
}

// Validate and handle file selection
documentsInput.addEventListener('change', function() {
    const files = Array.from(this.files);
    const maxFiles = 2;
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Check total file count
    if (selectedFiles.length + files.length > maxFiles) {
        showFormMessage(`You can only upload up to ${maxFiles} files total.`, 'error');
        this.value = '';
        return;
    }

    // Validate each file
    for (let file of files) {
        if (file.size > maxSize) {
            showFormMessage(`File "${file.name}" exceeds 5MB limit.`, 'error');
            this.value = '';
            return;
        }
    }

    // Add files to selected list
    selectedFiles = [...selectedFiles, ...files];
    renderFileList();

    // Clear input so same file can be selected again if removed
    this.value = '';
});

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
        zoomControl: false
    });

    // Zoom control top-right so the left side is free for the filter panel
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add light theme tiles from CartoDB (Positron) for better readability
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Brand registry — one entry per culinary concept. Markers render these logos.
    const BRANDS = {
        lobsterlab: { name: 'Lobster Lab',   logo: 'assets/logos/lobsterlab.png' },
        cosmos:     { name: 'Cosmos Burger', logo: 'assets/logos/cosmos.png' },
        lavida:     { name: 'La Vida',       logo: 'assets/logos/lavida.png' },
        eggout:     { name: 'Egg & Out',     logo: 'assets/logos/EGG & OUT BLACK .png' },
        goodenough: { name: 'Good Enough',   logo: 'assets/logos/goodenough.png' }
    };

    // Venues — one marker each. `brands` lists the concept keys served at that venue,
    // so each marker shows its member-brand logos side by side.
    const VENUES = [
        {
            id: 'windmill', name: 'The Windmill Food Hall', type: 'foodhall', vendor: true,
            coords: [33.1280, -117.2654],
            address: '890 Palomar Airport Rd, Carlsbad, CA',
            brands: ['lobsterlab', 'cosmos', 'lavida']
        },
        {
            id: 'oceanside', name: 'Cosmos Burger — Oceanside', type: 'standalone',
            coords: [33.1959, -117.3795],
            address: '208 N Coast Hwy, Oceanside, CA',
            instagram: 'https://www.instagram.com/burger.cosmos/',
            website: 'https://www.burgerscosmos.com/',
            brands: ['cosmos']
        },
        {
            id: 'globalfork', name: 'Global Fork', type: 'foodhall',
            coords: [32.7205, -117.1690],
            address: '550 W. Date Street Suite A, San Diego, CA 92101',
            website: 'https://globalforkfh.com/',
            hallLabel: 'GLOBAL FORK',
            hallLogo: 'assets/logos/GLOBAL FORK BADGE SDCA black.png',
            brands: ['lobsterlab', 'cosmos', 'lavida']
        },
        {
            id: 'goodenough', name: 'Good Enough', type: 'standalone',
            coords: [32.7192, -117.1704],
            address: '555 W Date St, Suite B, San Diego, CA',
            instagram: 'https://www.instagram.com/goodenoughcocktailclub/',
            brands: ['goodenough']
        },
        {
            id: 'station8', name: 'Station 8 Public Market', type: 'foodhall',
            status: 'Coming Soon',
            coords: [32.8715, -117.2460],
            address: '9145 Scholars Drive South, La Jolla, CA 92037',
            instagram: 'https://www.instagram.com/station8publicmarket/',
            hallLabel: 'STATION 8',
            hallLogo: 'assets/logos/station8.png',
            brands: ['lobsterlab', 'cosmos', 'lavida']
        },
        {
            id: 'miramar', name: 'Miramar Food Hall', type: 'foodhall',
            coords: [33.4267, -117.6112],
            address: '1720 North El Camino Real, San Clemente, CA',
            instagram: 'https://www.instagram.com/miramarfoodhall/',
            logo: 'assets/logos/miramar.png',
            brands: ['lobsterlab', 'cosmos', 'lavida', 'eggout']
        },
        {
            id: 'skydeck', name: 'Sky Deck', type: 'foodhall', vendor: true,
            coords: [32.9563, -117.2317],
            address: '12841 El Camino Real Ste 206, San Diego, CA 92130',
            brands: ['lobsterlab']
        }
    ];

    // Concepts and food halls that appear in the filter panel (order = display order).
    const CONCEPT_KEYS = ['lobsterlab', 'cosmos', 'lavida', 'eggout', 'goodenough'];
    // Only Tiger's OWN food halls are filterable venues. Windmill & Sky Deck are
    // third-party halls where Tiger brands are vendors — governed by the concept filters.
    const FILTER_VENUE_IDS = ['miramar', 'globalfork', 'station8'];

    // Helper function to create single logo icon
    function createLogoIcon(logo, title, size) {
        const hasLogo = logo && !logo.includes('assets/logo.png');
        if (hasLogo) {
            return `<div style="width: ${size}px; height: ${size}px; border-radius: 50%; border: 3px solid #c9a961; background: white; box-shadow: 0 3px 12px rgba(0,0,0,0.4); overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 4px; flex-shrink: 0;">
                <img src="${logo}" style="width: 100%; height: 100%; object-fit: contain;" alt="${title}">
            </div>`;
        } else {
            return `<div style="width: ${size}px; height: ${size}px; border-radius: 50%; border: 3px dashed #c9a961; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); box-shadow: 0 3px 12px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <span style="font-size: ${size * 0.5}px; font-weight: bold; color: #c9a961; font-family: 'Playfair Display', serif;">?</span>
            </div>`;
        }
    }

    const MARKER_SIZE = 40;
    const MARKER_GAP = 4;

    // Build a marker icon: brand-logo badges side by side, with the food hall's
    // own logo stamped beneath the row when the venue has one (multi-brand pills only).
    function buildVenueIcon(venue, brandKeys) {
        const size = MARKER_SIZE;
        const gap = MARKER_GAP;
        const count = brandKeys.length;
        const logosHtml = brandKeys.map(k => createLogoIcon(BRANDS[k].logo, BRANDS[k].name, size)).join('');

        // Single badge — no surrounding pill, no hall logo.
        if (count <= 1) {
            return L.divIcon({
                className: 'custom-marker-logo',
                html: logosHtml,
                iconSize: [size, size],
                iconAnchor: [size / 2, size / 2],
                popupAnchor: [0, -(size / 2) - 12]
            });
        }

        // Under the badge row: the food hall's wordmark image if it has one,
        // otherwise a styled text label of its name (for halls without a wordmark asset).
        const rowWidth = (size * count) + (gap * (count - 1));
        let hallHtml = '';
        let hallH = 0;
        if (venue.logo) {
            // Inline !important beats Leaflet's `.leaflet-container img { max-*: none !important }`.
            hallHtml = `<img src="${venue.logo}" alt="${venue.name}" style="max-width: ${rowWidth}px !important; max-height: 24px !important; width: auto !important; height: auto !important; object-fit: contain; margin-top: 5px;">`;
            hallH = 29;
        } else if (venue.hallLabel) {
            // Logo (if any) + name, laid out as a centred lockup under the badges.
            const hallLogoImg = venue.hallLogo
                ? `<img src="${venue.hallLogo}" alt="" style="height: 22px !important; max-height: 22px !important; width: auto !important; max-width: 28px !important; object-fit: contain;">`
                : '';
            hallHtml = `<div style="display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 5px;">${hallLogoImg}<span style="font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 1.5px; color: #1a1a1a; line-height: 1; white-space: nowrap;">${venue.hallLabel}</span></div>`;
            hallH = 26;
        }

        const iconWidth = rowWidth + 16;
        const iconHeight = size + 16 + hallH;
        const iconHtml = `<div style="display: flex; flex-direction: column; align-items: center; background: rgba(255,255,255,0.95); padding: 8px; border-radius: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 2px solid #c9a961;">
            <div style="display: flex; align-items: center; gap: ${gap}px;">${logosHtml}</div>
            ${hallHtml}
        </div>`;

        return L.divIcon({
            className: 'custom-marker-logo',
            html: iconHtml,
            iconSize: [iconWidth, iconHeight],
            iconAnchor: [iconWidth / 2, iconHeight / 2],
            popupAnchor: [0, -(iconHeight / 2) - 4]
        });
    }

    const WEB_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;
    const IG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>`;
    const PIN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg>`;

    // Build the popup for a venue, listing only the currently-visible brands.
    function buildPopup(venue, brandKeys) {
        const statusBadge = venue.status ? `<span style="background: #f0ad4e; color: white; padding: 1px 5px; border-radius: 3px; font-size: 9px; margin-left: 4px;">${venue.status}</span>` : '';
        const links = `
            ${venue.website ? `<a href="${venue.website}" target="_blank" rel="noopener" style="color: #c9a961; text-decoration: none; display: flex;" title="Website" aria-label="${venue.name} website">${WEB_ICON}</a>` : ''}
            ${venue.instagram ? `<a href="${venue.instagram}" target="_blank" rel="noopener" style="color: #c9a961; text-decoration: none; display: flex;" title="Instagram" aria-label="${venue.name} Instagram">${IG_ICON}</a>` : ''}`;

        // Vendor locations (Tiger brands inside a third-party food hall): lead with the
        // brand names; mention the host venue only as a small, muted footnote — never
        // brand it like one of Tiger's own halls.
        let heading, extraLine;
        if (venue.vendor) {
            heading = brandKeys.map(k => BRANDS[k].name).join(' · ');
            extraLine = `<div style="margin-top: 5px; font-size: 9px; color: #999; font-style: italic;">at ${venue.name}</div>`;
        } else {
            heading = venue.name;
            extraLine = brandKeys.length > 1
                ? `<div style="margin-top: 4px; font-size: 9px; color: #888;">${brandKeys.map(k => BRANDS[k].name).join(' • ')}</div>`
                : '';
        }

        return `<div style="font-family: 'Montserrat', sans-serif; min-width: 220px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px;">
                <span style="font-family: 'Playfair Display', serif; color: #333; font-size: 14px; font-weight: 600;">${heading}${statusBadge}</span>
                <div style="display: flex; gap: 6px; align-items: center;">${links}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}" target="_blank" rel="noopener" style="color: #c9a961; text-decoration: none; display: flex;" title="Get Directions" aria-label="Directions to ${venue.name}">${PIN_ICON}</a>
                <span style="font-size: 10px; color: #666;">${venue.address}</span>
            </div>
            ${extraLine}
        </div>`;
    }

    // Create one marker per venue and keep a reference so the filter can toggle it.
    // `line` holds the leader line drawn when a pin is nudged off its true spot.
    const venueMarkers = {};
    VENUES.forEach(venue => {
        const marker = L.marker(venue.coords, { icon: buildVenueIcon(venue, venue.brands) });
        marker.bindPopup(buildPopup(venue, venue.brands), { maxWidth: 280 });
        marker.on('mouseover', function () { this.openPopup(); });
        marker.addTo(map);
        venueMarkers[venue.id] = { marker, venue, line: null, dot: null };
    });

    // ----- Filter state + application -----
    const activeConcepts = new Set(CONCEPT_KEYS);
    const activeVenues = new Set(FILTER_VENUE_IDS);
    let onlyVenue = null; // food-hall isolate: when set, show ONLY that venue's pin

    function fitToVisible() {
        const coords = Object.values(venueMarkers)
            .filter(rec => map.hasLayer(rec.marker))
            .map(rec => rec.venue.coords);
        if (coords.length) {
            map.fitBounds(L.latLngBounds(coords).pad(0.15), { maxZoom: 15 });
        }
    }

    // Declutter: nudge overlapping pins side by side (around their shared centre) and
    // draw a thin gold leader line from each nudged pin back to its true spot. Runs on
    // zoom (overlaps are zoom-dependent) — zoom in and pins settle onto their real
    // locations with no lines. Panning doesn't change overlaps, so it isn't rebound.
    function declutter() {
        const visible = Object.values(venueMarkers).filter(rec => map.hasLayer(rec.marker));
        // Reset everyone to their true spot and clear old dots + leader lines first.
        visible.forEach(rec => {
            rec.marker.setLatLng(rec.venue.coords);
            if (rec.line) { map.removeLayer(rec.line); rec.line = null; }
            if (rec.dot) { map.removeLayer(rec.dot); rec.dot = null; }
        });

        const items = visible.map(rec => {
            const sz = rec.marker.options.icon.options.iconSize; // [w, h]
            const p = map.latLngToContainerPoint(rec.venue.coords);
            return { rec, w: sz[0], h: sz[1], x: p.x, y: p.y };
        });

        // Union-find: group pins whose boxes overlap (with a small gap margin).
        const parent = items.map((_, i) => i);
        const find = i => { while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i]; } return i; };
        for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) {
                const a = items[i], b = items[j];
                if (Math.abs(a.x - b.x) < (a.w + b.w) / 2 + 8 &&
                    Math.abs(a.y - b.y) < (a.h + b.h) / 2 + 8) {
                    parent[find(i)] = find(j);
                }
            }
        }
        const groups = {};
        items.forEach((it, i) => { const r = find(i); (groups[r] = groups[r] || []).push(it); });

        // For each overlapping group: lay the pills in a row just BELOW the pins' true
        // spots, drop a gold dot on each true spot, and connect pill -> dot with a line.
        Object.values(groups).forEach(group => {
            if (group.length < 2) return;
            group.sort((a, b) => a.x - b.x);
            const gap = 14;
            const totalW = group.reduce((s, it) => s + it.w, 0) + gap * (group.length - 1);
            const maxH = Math.max.apply(null, group.map(it => it.h));
            const cx = group.reduce((s, it) => s + it.x, 0) / group.length;
            const maxY = Math.max.apply(null, group.map(it => it.y));
            const rowY = maxY + maxH / 2 + 24; // pill-centre line, below the lowest true spot
            let cursor = cx - totalW / 2;
            group.forEach(it => {
                const px = cursor + it.w / 2;
                cursor += it.w + gap;
                it.rec.marker.setLatLng(map.containerPointToLatLng([px, rowY]));
                it.rec.dot = L.circleMarker(it.rec.venue.coords, {
                    radius: 5, color: '#fff', weight: 2, fillColor: '#c9a961', fillOpacity: 1, interactive: false
                }).addTo(map);
                const pillTop = map.containerPointToLatLng([px, rowY - it.h / 2]);
                it.rec.line = L.polyline([it.rec.venue.coords, pillTop], {
                    color: '#c9a961', weight: 2, opacity: 0.85, interactive: false
                }).addTo(map);
            });
        });
    }

    function applyFilter(refit) {
        VENUES.forEach(venue => {
            const rec = venueMarkers[venue.id];
            const visibleBrands = venue.brands.filter(k => activeConcepts.has(k));
            const venueAllowed = !FILTER_VENUE_IDS.includes(venue.id) || activeVenues.has(venue.id);
            // Food-hall isolate trumps everything: show just that one pin (all its brands).
            const show = onlyVenue
                ? (venue.id === onlyVenue)
                : (visibleBrands.length > 0 && venueAllowed);

            if (show) {
                rec.marker.setIcon(buildVenueIcon(venue, visibleBrands));
                rec.marker.setPopupContent(buildPopup(venue, visibleBrands));
                if (!map.hasLayer(rec.marker)) {
                    rec.marker.setLatLng(venue.coords);
                    rec.marker.addTo(map);
                }
            } else if (map.hasLayer(rec.marker)) {
                map.removeLayer(rec.marker);
                if (rec.line) { map.removeLayer(rec.line); rec.line = null; }
                if (rec.dot) { map.removeLayer(rec.dot); rec.dot = null; }
            }
        });
        declutter();
        if (refit) fitToVisible();
    }

    // ----- Wire up the filter panel controls -----
    function syncCheckboxes() {
        document.querySelectorAll('.map-filter input[data-concept]').forEach(cb => {
            cb.checked = activeConcepts.has(cb.dataset.concept);
        });
        document.querySelectorAll('.map-filter input[data-venue]').forEach(cb => {
            cb.checked = activeVenues.has(cb.dataset.venue);
        });
    }

    const filterPanel = document.querySelector('.map-filter');
    if (filterPanel) {
        // Checkbox: toggle a single concept/venue
        filterPanel.querySelectorAll('input[data-concept]').forEach(cb => {
            cb.addEventListener('change', () => {
                onlyVenue = null;
                if (cb.checked) activeConcepts.add(cb.dataset.concept);
                else activeConcepts.delete(cb.dataset.concept);
                applyFilter(false);
            });
        });
        filterPanel.querySelectorAll('input[data-venue]').forEach(cb => {
            cb.addEventListener('change', () => {
                onlyVenue = null;
                if (cb.checked) activeVenues.add(cb.dataset.venue);
                else activeVenues.delete(cb.dataset.venue);
                applyFilter(false);
            });
        });
        // Click a name: isolate that one (and reset the other group to all)
        filterPanel.querySelectorAll('[data-isolate-concept]').forEach(btn => {
            btn.addEventListener('click', () => {
                onlyVenue = null;
                activeConcepts.clear();
                activeConcepts.add(btn.dataset.isolateConcept);
                activeVenues.clear();
                FILTER_VENUE_IDS.forEach(id => activeVenues.add(id));
                syncCheckboxes();
                applyFilter(true);
            });
        });
        filterPanel.querySelectorAll('[data-isolate-venue]').forEach(btn => {
            btn.addEventListener('click', () => {
                // Show ONLY this food hall — hide every other pin (vendors/standalones too).
                onlyVenue = btn.dataset.isolateVenue;
                activeVenues.clear();
                activeVenues.add(btn.dataset.isolateVenue);
                activeConcepts.clear();
                CONCEPT_KEYS.forEach(k => activeConcepts.add(k));
                syncCheckboxes();
                applyFilter(true);
            });
        });
        // Show all
        const showAllBtn = filterPanel.querySelector('[data-show-all]');
        if (showAllBtn) {
            showAllBtn.addEventListener('click', () => {
                onlyVenue = null;
                activeConcepts.clear();
                CONCEPT_KEYS.forEach(k => activeConcepts.add(k));
                activeVenues.clear();
                FILTER_VENUE_IDS.forEach(id => activeVenues.add(id));
                syncCheckboxes();
                applyFilter(true);
            });
        }
        // Mobile collapse toggle
        const toggle = filterPanel.querySelector('.map-filter-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const expanded = filterPanel.classList.toggle('is-open');
                toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            });
        }
    }

    // Re-declutter whenever the zoom changes (overlaps are zoom-dependent).
    map.on('zoomend', declutter);

    // Fit map to show all markers initially, then declutter at that zoom.
    fitToVisible();
    declutter();
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
