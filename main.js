// VexaDrop Store - Main Entry
console.log('VexaDrop Store | High-Performance AI Lifestyle Initialized');

// Waitlist Form Handling
const waitlistForm = document.getElementById('waitlist-form');
const formMsg = document.getElementById('form-msg');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = waitlistForm.querySelector('input').value;
        console.log(`Waitlist signup: ${email}`);

        // Mock success UI
        waitlistForm.style.opacity = '0.3';
        waitlistForm.style.pointerEvents = 'none';
        formMsg.style.opacity = '1';

        // In a real app, this would hit an API endpoint
    });
}

// Note: All scroll reveal and intersection observer logic is now handled
// in the inline <script> in index.html to ensure DOM-ready execution.
// CSS Scroll-Driven Animations handle the primary experience (zero JS overhead).
// IntersectionObserver fallback activates only when animation-timeline is unsupported.
