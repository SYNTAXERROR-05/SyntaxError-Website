// SyntaxError Solutions - Main JavaScript File
// Only essential, used code is kept. All unused or redundant code has been removed for clarity and maintainability.

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initPortfolioFilter();
    initContactForm();
    initStatsCounter();
    initSkillBars();
    initTypingAnimation();
    initSmoothScrolling();
    initScrollIndicator();
    initHeroVisualTilt();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    if (!hamburger || !navMenu || !navbar) return;

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
}

// Hero animations and effects
function initHeroAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// Typing animation for hero title
function initTypingAnimation() {
    const typedTextElement = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    if (!typedTextElement || !cursor) return;
    const textArray = [
        ' Digital Reality',
        ' Amazing Websites',
        ' Mobile Solutions',
        ' Success Stories'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delayBetweenWords = 2000;
    function typeWriter() {
        const currentText = textArray[textIndex];
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        let speed = isDeleting ? deleteSpeed : typeSpeed;
        if (!isDeleting && charIndex === currentText.length) {
            speed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
        }
        setTimeout(typeWriter, speed);
    }
    typeWriter();
}

// Stats counter animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    function animateStats() {
        if (animated) return;
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 100;
                const duration = 2000;
                const stepTime = duration / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, stepTime);
            });
        }
    }
    window.addEventListener('scroll', animateStats);
    animateStats();
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    function animateSkills() {
        if (skillsAnimated) return;
        const skillsSection = document.querySelector('.skill-bars');
        if (!skillsSection) return;
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            skillsAnimated = true;
            skillBars.forEach((bar, index) => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, index * 200);
            });
        }
    }
    window.addEventListener('scroll', animateSkills);
    animateSkills();
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    portfolioItems.forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');
        if (!overlay) return;
        item.addEventListener('mouseenter', function() {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        });
        item.addEventListener('mouseleave', function() {
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(20px)';
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const formGroups = document.querySelectorAll('.form-group');
    if (!contactForm) return;
    // Floating label effect
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');
        if (input && label) {
            if (input.value) {
                label.classList.add('active');
            }
            input.addEventListener('focus', function() {
                label.classList.add('active');
            });
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.classList.remove('active');
                }
            });
            input.addEventListener('input', function() {
                if (this.value) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });
        }
    });
    // Form submission (simulated)
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        setTimeout(() => {
            this.reset();
            formGroups.forEach(group => {
                const label = group.querySelector('label');
                if (label) label.classList.remove('active');
            });
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.backgroundColor = 'var(--success-color)';
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
            }, 3000);
        }, 2000);
    });
}

// Scroll animations for sections
function initScrollAnimations() {
    const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    const elementsToAnimate = document.querySelectorAll(`
        .section-header,
        .service-card,
        .portfolio-item,
        .about-text,
        .about-visual,
        .contact-info,
        .contact-form
    `);
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// Scroll indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// 3D tilt effect for hero-visual
function initHeroVisualTilt() {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual) return;
    const maxTilt = 18;
    const scale = 1.04;
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        heroVisual.style.transform = `scale(${scale}) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        heroVisual.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 32px 0 rgba(30,41,59,0.18)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
        heroVisual.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
        heroVisual.style.boxShadow = '';
    });
}

// Code window typing effect (used in hero section)
function initCodeWindowEffect() {
    const codeLines = document.querySelectorAll('.code-line');
    let delay = 0;
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, delay);
        delay += 300;
    });
}
// Initialize code window effect when hero is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(initCodeWindowEffect, 1000);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    heroObserver.observe(heroSection);
}

// Utility: debounce for performance
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
// Performance optimization for scroll events
const optimizedScrollHandler = debounce(() => {}, 16);
window.addEventListener('scroll', optimizedScrollHandler);
// Responsive menu close on resize
window.addEventListener('resize', debounce(() => {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (window.innerWidth > 768 && navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}, 250));
// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        if (heroContent) heroContent.classList.add('fade-in');
        if (heroVisual) heroVisual.classList.add('slide-in-right');
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-mode', savedTheme);
    }
  
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const currentMode = document.documentElement.getAttribute('data-mode');
        const newMode = currentMode === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-mode', newMode);
        localStorage.setItem('theme', newMode);
        updateThemeToggleLabel();
      });
    }
  
    updateThemeToggleLabel();
  });
  
  function updateThemeToggleLabel() {
    const currentMode = document.documentElement.getAttribute('data-mode');
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', currentMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }