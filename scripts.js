// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

// ============================================
// SMOOTH SCROLLING & ACTIVE LINK HIGHLIGHTING
// ============================================

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 250) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active', 'text-white');
        link.classList.add('text-gray-300');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active', 'text-white');
            link.classList.remove('text-gray-300');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function revealAnimatedElements() {
    const animated = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in');
    animated.forEach(el => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
            el.classList.add('visible');
        }
        observer.observe(el);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealAnimatedElements);
} else {
    revealAnimatedElements();
}

// ============================================
// PARALLAX EFFECT FOR SHAPES
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const isPercentage = text.includes('%');
        const target = parseInt(text);
        const increment = Math.max(1, Math.floor(target / 100));
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (isPercentage ? '%' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (isPercentage ? '%' : '');
            }
        }, 20);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const homeSection = document.getElementById('home');
if (homeSection) {
    heroObserver.observe(homeSection);
}

// ============================================
// METRIC LABELS INTERACTION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const labels = document.querySelectorAll('.metric-label');
    
    labels.forEach((label, index) => {
        // Staggered entrance animation
        label.style.animationDelay = `${0.5 + (index * 0.1)}s`;
        
        // Click interaction with ripple effect
        label.addEventListener('click', function(e) {
            const metric = this.getAttribute('data-metric');
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            console.log(`${metric} metric clicked!`);
        });
        
        // Hover effects
        label.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace('scale(1)', 'scale(1.1)') || 'scale(1.1)';
        });
        
        label.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('scale(1.1)', 'scale(1)') || 'scale(1)';
        });
    });
});

// Add ripple animation keyframes if not already present
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
if (!document.querySelector('style[data-ripple]')) {
    style.setAttribute('data-ripple', 'true');
    document.head.appendChild(style);
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showAlert('⚠️ Please fill in all fields.', 'warning');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('⚠️ Please enter a valid email address.', 'warning');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class=\"fas fa-spinner fa-spin\"></i> Sending...';
        submitBtn.disabled = true;

        // Google Apps Script URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwRFtwcgbRbNpqjZfTfHQCvHPwhfOoZYVG214tJRPAx3pBqzaWKCoWERDqWkpuObzJdeA/exec';

        const formDataObj = new FormData();
        formDataObj.append("name", name);
        formDataObj.append("email", email);
        formDataObj.append("subject", subject);
        formDataObj.append("message", message);

        fetch(scriptURL, { 
            method: 'POST', 
            body: formDataObj,
            mode: 'no-cors'
        })
            .then(async response => {
                // With no-cors, we can't check response.ok, so we'll just assume success
                return { result: 'success' };
            })
            .then(data => {
                showAlert("🚀 Thank you! Your message has been sent. We'll get back to you soon!", 'success');
                contactForm.reset();
            })
            .catch(err => {
                showAlert('⚠️ Failed to send message. Please try again or email us directly.', 'error');
                console.error('Error:', err);
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

// ============================================
// ALERT NOTIFICATION SYSTEM
// ============================================

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-red-500';
    
    alertDiv.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm animate-pulse`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => alertDiv.remove(), 500);
    }, 5000);
}

// Add fade out animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(fadeOutStyle);

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger initial animations
    updateActiveNavLink();
});

// ============================================
// INITIALIZE MOBILE MENU STYLES
// ============================================

const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    .mobile-menu {
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    }
    .mobile-menu.active {
        transform: translateY(0);
    }
`;
if (!document.querySelector('style[data-mobile-menu]')) {
    mobileMenuStyle.setAttribute('data-mobile-menu', 'true');
    document.head.appendChild(mobileMenuStyle);
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to heavy scroll operations
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 100);

window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedScrollHandler);

// ============================================
// SKILL ORB HOVER EFFECT
// ============================================

document.querySelectorAll('.skill-orb').forEach(orb => {
    orb.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.8)';
    });
    
    orb.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================

const currentYear = new Date().getFullYear();
const footerYearElements = document.querySelectorAll('footer');
footerYearElements.forEach(footer => {
    const text = footer.textContent;
    if (text.includes('2024')) {
        footer.innerHTML = footer.innerHTML.replace('2024', currentYear);
    }
});

// ============================================
// LAZY LOADING FOR IMAGES (if needed in future)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', (e) => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// SMOOTH SCROLL RESTORATION
// ============================================

if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'auto';
}

// ============================================
// 3D CARD PERSPECTIVE TILT EFFECT
// ============================================

function initCardTilt() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const cards = document.querySelectorAll('.card-3d, .project-card-advanced');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = x - xc;
            const dy = y - yc;
            // Limit maximum tilt angle to 8 degrees for elegant micro-movement
            const tiltX = -(dy / yc) * 8;
            const tiltY = (dx / xc) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

// ============================================
// INTERACTIVE SVG DATA VISUALIZATION
// ============================================

function initInteractiveChart() {
    const bars = document.querySelectorAll('.chart-bar-advanced');
    const chartContainer = document.querySelector('.advanced-data-viz');
    if (!chartContainer) return;
    
    // Create and append tooltip element
    const tooltip = document.createElement('div');
    tooltip.id = 'chart-tooltip';
    tooltip.className = 'absolute hidden bg-slate-950/95 border border-slate-700/80 text-white text-xs px-3 py-2 rounded-lg shadow-2xl backdrop-blur-md pointer-events-none transition-all duration-150 z-30 font-medium';
    chartContainer.appendChild(tooltip);
    chartContainer.style.position = 'relative';
    
    const metricDetails = {
        'CAC': 'Customer Acquisition Cost: Reduced by 17% through geo-segmentation marketing',
        'Sales': 'Monthly Sales: Achieved a massive 70% growth in overall digital transactions',
        'ROI': 'Return on Investment: Scaled performance marketing campaigns to 3.5x average ROI',
        'Retention': 'User Retention: Sustained a solid 80% user retention rate via automated onboarding',
        'Growth': 'Business Growth: Boosted search analytics traffic and customer base by 5x'
    };
    
    const volumeDetails = {
        'Savings': 'Cost Saved: ₹2.2 Crores saved from performance optimization strategies',
        'Budget': 'Monthly Budget: Managed marketing funds streamlined from ₹4Cr to ₹1.8Cr',
        'Revenue': 'Quarterly Revenue: Scaled and boosted by 30% through predictive model integrations',
        'Dashboards': 'KPI Dashboards: 3 interactive Tableau & Python dashboards deployed for monitoring',
        'Acquisition': 'Daily Acquisition: 100+ new verified daily customer signups achieved'
    };
    
    let activeDataset = 'performance'; // 'performance' or 'volume'
    
    // Hover details for bars
    bars.forEach((bar, index) => {
        bar.style.cursor = 'pointer';
        bar.style.opacity = '0.85';
        bar.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        
        bar.addEventListener('mouseenter', (e) => {
            // Highlight bar
            bar.style.opacity = '1';
            bar.style.filter = 'brightness(1.2) drop-shadow(0 0 10px #3B82F6)';
            
            // Get labels (SVG text elements)
            const texts = chartContainer.querySelectorAll('svg text');
            const label = texts[index] ? texts[index].textContent : 'Metric';
            const details = activeDataset === 'performance' ? metricDetails[label] : volumeDetails[label];
            
            tooltip.innerHTML = `<strong>${label}</strong><div class="mt-1 text-slate-300 font-normal leading-relaxed">${details}</div>`;
            tooltip.classList.remove('hidden');
        });
        
        bar.addEventListener('mousemove', (e) => {
            const rect = chartContainer.getBoundingClientRect();
            const x = e.clientX - rect.left + 15;
            const y = e.clientY - rect.top - 15;
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        });
        
        bar.addEventListener('mouseleave', () => {
            bar.style.opacity = '0.85';
            bar.style.filter = 'none';
            tooltip.classList.add('hidden');
        });
    });
    
    // Dataset toggling implementation
    const btnPerf = document.getElementById('btn-perf');
    const btnVolume = document.getElementById('btn-volume');
    
    if (btnPerf && btnVolume) {
        const performanceHeights = [100, 150, 120, 170, 130];
        const volumeHeights = [160, 90, 140, 110, 150];
        
        function updateChart(dataset) {
            activeDataset = dataset;
            const heights = dataset === 'performance' ? performanceHeights : volumeHeights;
            
            bars.forEach((bar, index) => {
                const h = heights[index];
                const y = 200 - h;
                
                bar.setAttribute('height', h);
                bar.setAttribute('y', y);
            });
            
            // Update SVG text labels
            const texts = chartContainer.querySelectorAll('svg text');
            const labels = dataset === 'performance' 
                ? ['CAC', 'Sales', 'ROI', 'Retention', 'Growth'] 
                : ['Savings', 'Budget', 'Revenue', 'Dashboards', 'Acquisition'];
            
            texts.forEach((text, index) => {
                if (labels[index]) {
                    text.textContent = labels[index];
                }
            });
        }
        
        btnPerf.addEventListener('click', () => {
            btnPerf.className = 'px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500 text-white shadow-lg transition-all duration-300';
            btnVolume.className = 'px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition-all duration-300';
            updateChart('performance');
        });
        
        btnVolume.addEventListener('click', () => {
            btnVolume.className = 'px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500 text-white shadow-lg transition-all duration-300';
            btnPerf.className = 'px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition-all duration-300';
            updateChart('volume');
        });
    }
}

// ============================================
// INIT FUNCTION
// ============================================

function init() {
    console.log('Portfolio website initialized successfully! 🚀');
    updateActiveNavLink();
    initCardTilt();
    initInteractiveChart();
}

document.addEventListener('DOMContentLoaded', init);
