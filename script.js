// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        if (Math.random() > 0.5) {
            particle.style.setProperty('--particle-color', '#00B2FF');
            const before = particle.style.getPropertyValue('--particle-color');
            particle.style.background = '#00B2FF';
        }
        
        particlesContainer.appendChild(particle);
    }
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle && navLinks) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
            navItems.forEach(item => item.classList.remove('active'));
            const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (currentNav) currentNav.classList.add('active');
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNav();
});

// Initial active nav update
updateActiveNav();

// --- THIS IS THE CODE FOR SMOOTH SCROLLING ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // This stops the instant jump
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth', // This creates the smooth animation
                block: 'start'
            });
        }
    });
});
// --- END OF SMOOTH SCROLLING CODE ---


// Feature tabs functionality
const tabs = document.querySelectorAll('.tab-item');
const panels = document.querySelectorAll('.content-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Message sent! We\'ll get back to you soon.');
        this.reset();
    });
}

// Initialize particles
createParticles();

// Text rotation with typewriter effect
const textSets = document.querySelectorAll('.text-set');
let currentIndex = 0;
let isAnimating = false;

function animateTextIn(textSet) {
    const typewriterText = textSet.querySelector('.typewriter-text');
    const subtitle = textSet.querySelector('.subtitle');
    const text = typewriterText.textContent;
    const textLength = text.length;
    
    // Dynamically set animation based on text length for consistent speed
    const typingDuration = textLength * 0.08; // 0.08s per character
    const steps = textLength;
    
    typewriterText.style.width = '0'; // Reset width
    typewriterText.style.animation = 'none'; // Reset animation
    
    // Force reflow to restart animation
    typewriterText.offsetHeight; 

    typewriterText.style.animation = `typing ${typingDuration}s steps(${steps}, end) forwards, blink-caret .75s step-end infinite`;

    // Show subtitle after typing animation is complete
    setTimeout(() => {
        subtitle.classList.add('visible');
    }, typingDuration * 1000); // Convert duration to ms
}

function animateTextOut(textSet) {
    const subtitle = textSet.querySelector('.subtitle');
    subtitle.classList.remove('visible');
}

function rotateText() {
    if (isAnimating || textSets.length <= 1) return;
    isAnimating = true;

    const currentSet = textSets[currentIndex];
    const nextIndex = (currentIndex + 1) % textSets.length;
    const nextSet = textSets[nextIndex];

    // Animate out current text (simply by making it invisible)
    animateTextOut(currentSet);
    currentSet.classList.remove('active');

    // After a short delay, animate in the next one
    setTimeout(() => {
        nextSet.classList.add('active');
        animateTextIn(nextSet);
        
        currentIndex = nextIndex;
        isAnimating = false;
    }, 500); // 0.5s delay between texts
}

// Initialize and start the rotation
if (textSets.length > 0) {
    // Initial animation for the first text set
    textSets[0].classList.add('active');
    animateTextIn(textSets[0]);

    // Start rotation
    setInterval(rotateText, 6000); // Change text every 6 seconds
}