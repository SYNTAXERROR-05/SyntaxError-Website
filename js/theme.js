// SyntaxError Solutions - Main JavaScript File (Corrected & Consolidated)
document.addEventListener('DOMContentLoaded', function() {
    // Core Initializations
    initTheme();
    initNavigation();
    initSmoothScrolling();

    // Page-Specific Animations & Interactions
    initTypingAnimation();
    initHeroVisualTilt();
    initStatsCounter();
    initSkillBars();
    initScrollAnimations(); // Reverted to original logic
    initScrollIndicator();
    
    // Forms & Filtering
    initPortfolioFilter();
    initContactForm();
    initJoinUsForm();
});


/**
 * Initializes the theme (dark/light mode) functionality.
 * Reads from localStorage and applies the theme to the <html> element.
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-mode', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentMode = root.getAttribute('data-mode');
            const newMode = currentMode === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-mode', newMode);
            localStorage.setItem('theme', newMode);
        });
    }
}


/**
 * Initializes all navigation functionalities including the mobile hamburger menu.
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (!hamburger || !navMenu || !navbar) return;

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - navbar.offsetHeight - 50;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    if (!link.classList.contains('active')) link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
}

/**
 * Initializes scroll-triggered animations by adding a class to elements when they enter the viewport.
 * This function has been reverted to the original class-based method.
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1, // Start animation when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.section-header, .service-card, .portfolio-item, .about-text, .about-visual, .contact-info, .contact-form');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}


// --- Other functions remain unchanged ---

function initTypingAnimation() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;

    const textArray = ['Digital Reality', 'Amazing Websites', 'Mobile Solutions', 'Success Stories'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentWord = textArray[textIndex];
        let newText = '';
        if (isDeleting) {
            newText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            newText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        typedTextElement.textContent = newText;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }
        setTimeout(typeWriter, typeSpeed);
    }
    typeWriter();
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitBtn = document.getElementById('submitContactBtn');
        const btnText = document.getElementById('contactBtnText');

        btnText.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        emailjs.init("9xCXTsa_h1OoH3Ybx");
        emailjs.sendForm('service_q509l0l', 'template_32eigxj', this)
            .then(function() {
                btnText.innerHTML = '✅ Message Sent!';
                submitBtn.style.background = '#28a745';
                setTimeout(() => {
                    contactForm.reset();
                    btnText.innerHTML = 'Send Message';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, function(error) {
                console.log('FAILED...', error);
                btnText.innerHTML = '❌ Failed to Send';
                submitBtn.style.background = '#dc3545';
                setTimeout(() => {
                    btnText.innerHTML = 'Send Message';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    alert('Sorry, there was an error. Please try again.');
                }, 3000);
            });
    });
}

function initJoinUsForm() {
    const joinUsForm = document.getElementById('joinUsForm');
    if (!joinUsForm) return;

    joinUsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        
        btnText.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        emailjs.init("9xCXTsa_h1OoH3Ybx");
        emailjs.sendForm('service_tzz6e9j', 'template_oifvvoo', this)
            .then(function() {
                btnText.innerHTML = '✅ Application Sent!';
                submitBtn.style.background = '#28a745';
                setTimeout(() => {
                    joinUsForm.reset();
                    btnText.innerHTML = 'Submit Application';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    alert('Thank you! Your application has been submitted successfully.');
                }, 2000);
            }, function(error) {
                console.log('FAILED...', error);
                btnText.innerHTML = '❌ Failed to Send';
                submitBtn.style.background = '#dc3545';
                setTimeout(() => {
                    btnText.innerHTML = 'Submit Application';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    alert('Sorry, there was an error sending your application.');
                }, 3000);
            });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 20);
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.8 });
    statNumbers.forEach(stat => observer.observe(stat));
}

function initSkillBars() {
    const skillsSection = document.querySelector('.skill-bars');
    if (!skillsSection) return;
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = skillsSection.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => { bar.style.width = progress + '%'; }, index * 150);
                });
                observer.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(skillsSection);
}

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-category]');
    if (filterButtons.length === 0) return;
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                item.style.display = shouldShow ? 'block' : 'none';
            });
        });
    });
}

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            scrollIndicator.style.opacity = (window.scrollY > 100) ? '0' : '1';
        });
    }
}

function initHeroVisualTilt() {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual || window.innerWidth < 1024) return;
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
        heroVisual.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
        heroVisual.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}