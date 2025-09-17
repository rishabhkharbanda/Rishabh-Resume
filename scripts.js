// ================== MOBILE MENU ==================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

// ================== SMOOTH SCROLL ==================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ================== ACTIVE NAV HIGHLIGHT ==================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-gray-300');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-white');
        }
    });
});

// ================== SCROLL ANIMATIONS ==================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in')
    .forEach(el => observer.observe(el));

// ================== CONTACT FORM ==================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            alert('⚠️ Please fill in all fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('⚠️ Please enter a valid email address.');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        const scriptURL = 'https://script.google.com/macros/s/AKfycbwRFtwcgbRbNpqjZfTfHQCvHPwhfOoZYVG214tJRPAx3pBqzaWKCoWERDqWkpuObzJdeA/exec';
        const formDataObj = new FormData(this);

        fetch(scriptURL, { method: 'POST', body: formDataObj })
            .then(async res => res.json())
            .then(data => {
                if (data.result === "success") {
                    alert("🚀 Thank you! Your message was sent.");
                    this.reset();
                } else {
                    alert("⚠️ " + (data.error || "Something went wrong"));
                }
            })
            .catch(err => alert("⚠️ Failed to send message: " + err.message))
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

// ================== PARALLAX FLOATING SHAPES ==================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.shape').forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// ================== COUNTERS ==================
function animateCounters() {
    document.querySelectorAll('.stats-counter').forEach(counter => {
        const target = parseInt(counter.dataset.target || counter.textContent);
        const isPercent = counter.textContent.includes('%');
        let current = 0;
        const increment = target / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (isPercent ? '%' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (isPercent ? '%' : '');
            }
        }, 20);
    });
}

const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        heroObserver.disconnect();
    }
});
const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);

// ================== METRIC LABELS (Ripple + Hover) ==================
document.addEventListener('DOMContentLoaded', () => {
    const labels = document.querySelectorAll('.metric-label');

    labels.forEach((label, index) => {
        label.style.animationDelay = `${0.5 + index * 0.1}s`;

        label.addEventListener('click', function () {
            const metric = this.dataset.metric;

            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

            console.log(`${metric} metric clicked!`);
        });
    });
});

// Ripple animation style
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        left: 50%;
        top: 50%;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    }
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(style);
