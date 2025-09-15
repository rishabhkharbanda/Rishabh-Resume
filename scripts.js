  // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // Scroll animations
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

        // Observe all animated elements
        document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });

        // Active navigation link highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
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

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form values
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const subject = document.querySelector('input[name="subject"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();

    // Validation
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

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    submitBtn.disabled = true;

    // ✅ Your deployed Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwZ3qjffrv4X9l1CyfNv01o_FDoQ8X7YCzeeYwalroUGvuIyCNNqrONA6K9-suIAxs4hQ/exec';

    // Create FormData object
    const formDataObj = new FormData();
    formDataObj.append("name", name);
    formDataObj.append("email", email);
    formDataObj.append("subject", subject);
    formDataObj.append("message", message);

    // ✅ Send request
    fetch(scriptURL, {
        method: 'POST',
        body: formDataObj
    })
    .then(response => response.text())
    .then(text => {
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.warn("Non-JSON response received:", text);
        }

        if (data && data.result === 'success') {
            alert('🚀 Thank you for your message! I\'ll get back to you within 24 hours.');
            document.getElementById('contact-form').reset();
        } else {
            alert('✅ Message sent! (But no JSON confirmation received).');
        }
    })
    .catch(error => {
        alert('⚠️ Oops! Something went wrong. Please try again later.');
        console.error(error);
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

        // Smooth scrolling for anchor links
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

        // Add parallax effect to floating shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Counter animation for stats
        function animateCounters() {
            const counters = document.querySelectorAll('.stats-counter');
            
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + (counter.textContent.includes('%') ? '%' : '');
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '');
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
        });

        heroObserver.observe(document.getElementById('home'));

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });

        // Initialize mobile menu state
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
        document.head.appendChild(mobileMenuStyle);
                document.addEventListener('DOMContentLoaded', function() {
    const labels = document.querySelectorAll('.metric-label');
    
    labels.forEach((label, index) => {
        // Staggered entrance animation
        label.style.animationDelay = `${0.5 + (index * 0.1)}s`;
        
        // Click interaction
        label.addEventListener('click', function() {
            const metric = this.getAttribute('data-metric');
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
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
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Optional: Add console log or custom action
            console.log(`${metric} metric clicked!`);
        });
        
        // Hover sound effect simulation (visual feedback)
        label.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace('scale(1)', 'scale(1.1)');
        });
        
        label.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('scale(1.1)', 'scale(1)');
        });
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
        
   
