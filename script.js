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

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && link.parentElement.classList.contains('dropdown')) {
            e.preventDefault();
            link.parentElement.classList.toggle('active');
        } else {
             if (menuToggle && navLinks) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Active navigation highlighting based on current page
function highlightCurrentPageLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-link');

    navItems.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop().split('#')[0];
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
            if (link.closest('.dropdown-menu')) {
                link.closest('.dropdown').querySelector('.nav-link').classList.add('active');
            }
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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

// Particle creation
createParticles();

// Text rotator for homepage
const textSets = document.querySelectorAll('.text-set');
if (textSets.length > 0) {
    let currentIndex = 0;
    let isAnimating = false;

    function animateTextIn(textSet) {
        const typewriterText = textSet.querySelector('.typewriter-text');
        const subtitle = textSet.querySelector('.subtitle');
        const text = typewriterText.textContent;
        const textLength = text.length;
        const typingDuration = textLength * 0.08;
        const steps = textLength;
        typewriterText.style.width = '0';
        typewriterText.style.animation = 'none';
        typewriterText.offsetHeight; 
        typewriterText.style.animation = `typing ${typingDuration}s steps(${steps}, end) forwards, blink-caret .75s step-end infinite`;
        setTimeout(() => {
            subtitle.classList.add('visible');
        }, typingDuration * 1000);
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
        animateTextOut(currentSet);
        currentSet.classList.remove('active');
        setTimeout(() => {
            nextSet.classList.add('active');
            animateTextIn(nextSet);
            currentIndex = nextIndex;
            isAnimating = false;
        }, 500);
    }

    textSets[0].classList.add('active');
    animateTextIn(textSets[0]);
    setInterval(rotateText, 6000);
}

// SCRIPT for Cases & Success Page
function setupCasesPage() {
    const initialView = document.getElementById('initial-view');
    if (!initialView) return; 

    const caseLinksView = document.getElementById('case-links');
    const successLinksView = document.getElementById('success-links');
    const viewCasesBtn = document.getElementById('view-cases-btn');
    const viewSuccessBtn = document.getElementById('view-success-btn');
    const backButtons = document.querySelectorAll('.back-button');

    viewCasesBtn.addEventListener('click', () => {
        initialView.classList.add('hidden');
        caseLinksView.classList.remove('hidden');
    });

    viewSuccessBtn.addEventListener('click', () => {
        initialView.classList.add('hidden');
        successLinksView.classList.remove('hidden');
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            initialView.classList.remove('hidden');
            caseLinksView.classList.add('hidden');
            successLinksView.classList.add('hidden');
        });
    });
}

// SCRIPT for More Topics Page
function setupMorePage() {
    const initialView = document.getElementById('more-initial-view');
    if (!initialView) return;

    const cards = document.querySelectorAll('.more-card');
    const contentContainers = document.querySelectorAll('.more-content-container');
    const backButtons = document.querySelectorAll('.back-button');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            initialView.classList.add('hidden');
            targetContent.classList.remove('hidden');
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            initialView.classList.remove('hidden');
            contentContainers.forEach(container => container.classList.add('hidden'));
        });
    });
}

// Run functions on page load
document.addEventListener('DOMContentLoaded', () => {
    highlightCurrentPageLink();
    setupCasesPage();
    setupMorePage(); 
});
