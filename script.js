const typedTarget = document.querySelector('.multiple-text');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lowPerformanceDevice = (
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4)
);
const reducedEffects = prefersReducedMotion || lowPerformanceDevice;

if (reducedEffects) {
    document.body.classList.add('perf-mode');
}

if (!reducedEffects && typedTarget && typeof Typed !== 'undefined') {
    new Typed('.multiple-text', {
        strings: ['AI Enthusiast', 'MCA Student', 'AI Developer (Learner)'],
        typeSpeed: 85,
        backSpeed: 65,
        backDelay: 1300,
        loop: true,
    });
}

const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('open');
        menuIcon.classList.toggle('bx-x');
    });

    document.querySelectorAll('.navbar a').forEach((link) => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            menuIcon.classList.remove('bx-x');
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navbar.classList.remove('open');
            menuIcon.classList.remove('bx-x');
        }
    });
}

const revealItems = document.querySelectorAll('.reveal');

revealItems.forEach((item) => {
    if (item.dataset.delay) {
        item.style.transitionDelay = `${item.dataset.delay}ms`;
    }
});

if (reducedEffects || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
} else {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
}

const footerYear = document.getElementById('year');

if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
}
