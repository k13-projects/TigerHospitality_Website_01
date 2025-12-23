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

    // Wait for bottom-to-top reveal (1.2s) + brief pause
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 600);
    }, 1400); // 1200ms for reveal + 200ms pause
});

// ===== Card Flip Click Support (for touch devices) =====
document.querySelectorAll('.concept-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
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
        zoomControl: true
    });

    // Add light theme tiles from CartoDB (Positron) for better readability
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Location Groups - locations at the same address are grouped together
    const locationGroups = [
        {
            // Carlsbad - Multiple Concepts at same address
            coords: [33.1280, -117.2654],
            groupName: 'Carlsbad',
            address: '890 Palomar Airport Rd, Carlsbad, CA',
            locations: [
                {
                    title: 'Lobster Lab',
                    type: 'standalone',
                    description: 'Premium Seafood & Lobster Rolls',
                    instagram: 'https://www.instagram.com/lobsterlabsd/',
                    logo: 'assets/logos/lobsterlab.png'
                },
                {
                    title: 'Cosmos Burger',
                    type: 'standalone',
                    description: 'Premium Burgers',
                    instagram: 'https://www.instagram.com/burger.cosmos/',
                    logo: 'assets/logos/cosmos.png'
                },
                {
                    title: 'La Vida',
                    type: 'standalone',
                    description: 'Healthy Eats & Smoothies',
                    instagram: 'https://www.instagram.com/lavida.sandiego/',
                    logo: 'assets/logos/lavida.png'
                }
            ]
        },
        {
            // San Diego - Little Italy (two nearby locations)
            coords: [32.7197, -117.1697],
            groupName: 'Little Italy',
            address: '555 W Date St, San Diego, CA',
            locations: [
                {
                    title: 'Good Enough',
                    type: 'standalone',
                    description: 'Craft Cocktails & Tapas',
                    instagram: 'https://www.instagram.com/goodenoughcocktailclub/',
                    logo: 'assets/logos/goodenough.png',
                    address: '555 W Date St, Suite B, San Diego, CA'
                },
                {
                    title: 'Global Fork',
                    type: 'foodhall',
                    description: 'Coming Soon',
                    status: 'Coming Soon',
                    concepts: [],
                    logo: 'assets/logo.png',
                    address: '550 W. Date Street Suite A, San Diego, CA 92101'
                }
            ]
        },
        {
            // La Jolla - UC San Diego (single location)
            coords: [32.8715, -117.2460],
            groupName: 'La Jolla',
            address: '9145 Scholars Drive South, La Jolla, CA 92037',
            locations: [
                {
                    title: 'Station 8 Public Market',
                    type: 'foodhall',
                    description: 'Food Hall',
                    concepts: [],
                    status: 'Coming Soon',
                    instagram: 'https://www.instagram.com/station8publicmarket/',
                    logo: 'assets/logos/station8.png'
                }
            ]
        },
        {
            // San Clemente (single location)
            coords: [33.4267, -117.6112],
            groupName: 'San Clemente',
            address: '1720 North El Camino Real, San Clemente, CA',
            locations: [
                {
                    title: 'Miramar Food Hall',
                    type: 'foodhall',
                    description: 'Food Hall',
                    concepts: ['Lobster Lab', 'Cosmos Burger', 'La Vida', 'Egg n Out'],
                    status: 'Coming Soon',
                    instagram: 'https://www.instagram.com/miramarfoodhall/',
                    logo: 'assets/logos/miramar.png'
                }
            ]
        }
    ];

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

    // Add markers for each location group
    locationGroups.forEach(group => {
        const locationCount = group.locations.length;
        const size = 40;
        const gap = 4;

        let iconHtml;
        let iconWidth;

        if (locationCount === 1) {
            // Single location - simple circular icon
            const loc = group.locations[0];
            iconHtml = createLogoIcon(loc.logo, loc.title, size);
            iconWidth = size;
        } else {
            // Multiple locations - display side by side in a frame
            const logosHtml = group.locations.map(loc => createLogoIcon(loc.logo, loc.title, size)).join('');
            iconWidth = (size * locationCount) + (gap * (locationCount - 1)) + 16;
            iconHtml = `<div style="display: flex; align-items: center; gap: ${gap}px; background: rgba(255,255,255,0.95); padding: 8px; border-radius: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 2px solid #c9a961;">
                ${logosHtml}
            </div>`;
        }

        const customIcon = L.divIcon({
            className: 'custom-marker-logo',
            html: iconHtml,
            iconSize: [iconWidth, size + (locationCount > 1 ? 16 : 0)],
            iconAnchor: [iconWidth/2, (size + (locationCount > 1 ? 16 : 0))/2],
            popupAnchor: [0, -(size/2) - 12]
        });

        const marker = L.marker(group.coords, { icon: customIcon }).addTo(map);

        // Build popup content for the group
        let popupContent = `<div style="font-family: 'Montserrat', sans-serif; min-width: 280px;">`;

        if (locationCount > 1) {
            popupContent += `<h3 style="margin: 0 0 12px 0; font-family: 'Playfair Display', serif; color: #c9a961; font-size: 18px; border-bottom: 2px solid #c9a961; padding-bottom: 8px;">${group.groupName}</h3>`;
        }

        group.locations.forEach((location, index) => {
            const isFoodHall = location.type === 'foodhall';
            const statusBadge = location.status ? `<span style="display: inline-block; background: #f0ad4e; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px; margin-left: 6px;">${location.status}</span>` : '';
            const locationAddress = location.address || group.address;

            if (index > 0) {
                popupContent += `<div style="border-top: 1px solid rgba(201, 169, 97, 0.3); margin: 12px 0;"></div>`;
            }

            popupContent += `
                <div style="margin-bottom: 8px;">
                    <h4 style="margin: 0 0 4px 0; font-family: 'Playfair Display', serif; color: #333; font-size: 16px;">
                        ${location.title}${statusBadge}
                    </h4>
                    <p style="margin: 0 0 6px 0; font-size: 11px; color: #888; font-style: italic;">${location.description}</p>
                    <p style="margin: 0 0 8px 0; font-size: 11px; color: #666; border-left: 2px solid #c9a961; padding-left: 6px;">${locationAddress}</p>
                    ${isFoodHall && location.concepts && location.concepts.length > 0 ? `
                        <div style="margin: 8px 0;">
                            <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; color: #333;">Concepts:</p>
                            <p style="margin: 0; font-size: 10px; color: #666;">${location.concepts.join(' • ')}</p>
                        </div>
                    ` : ''}
                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationAddress)}"
                           target="_blank"
                           style="color: #c9a961; text-decoration: none; padding: 4px; border-radius: 50%; transition: all 0.3s ease;"
                           onmouseover="this.style.backgroundColor='#c9a961'; this.style.color='#ffffff';"
                           onmouseout="this.style.backgroundColor='transparent'; this.style.color='#c9a961';">
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                               <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                           </svg>
                        </a>
                        ${location.instagram ? `
                            <a href="${location.instagram}" target="_blank"
                               style="color: #c9a961; text-decoration: none; padding: 4px; border-radius: 50%; transition: all 0.3s ease;"
                               onmouseover="this.style.backgroundColor='#c9a961'; this.style.color='#ffffff';"
                               onmouseout="this.style.backgroundColor='transparent'; this.style.color='#c9a961';">
                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                               </svg>
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        popupContent += `</div>`;

        marker.bindPopup(popupContent, { maxWidth: 320 });

        // Open popup on hover
        marker.on('mouseover', function() {
            this.openPopup();
        });
    });

    // Fit map to show all markers
    const group = L.featureGroup(locationGroups.map(g => L.marker(g.coords)));
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
