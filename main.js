/* ============================================ */
/* MAIN JAVASCRIPT */
/* Handles smooth scrolling and theme toggle */
/* ============================================ */

// ========== SMOOTH SCROLLING NAVIGATION ==========
// When user clicks a nav link, smoothly scroll to that section

document.addEventListener('DOMContentLoaded', function() {
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add click event to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump
            
            // Get the target section ID from href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Scroll to section smoothly
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== NAVBAR SCROLL EFFECT ==========
    // Add shadow to navbar when user scrolls down
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    });
    
    // ========== DARK MODE TOGGLE ==========
    // Switch between light and dark themes
    
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    
    // If user previously selected dark mode, apply it
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        // Save user's preference
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // ========== ACTIVE NAV LINK HIGHLIGHTING ==========
    // Highlight the current section in navigation as user scrolls
    
    const sections = document.querySelectorAll('section');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100; // Offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.style.color = '';
                });
                
                // Add active color to current section's link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.style.color = 'var(--primary-color)';
                }
            }
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', highlightNavigation);
    
    // Run once on load
    highlightNavigation();
    
    // ========== ANIMATION ON SCROLL (Optional Enhancement) ==========
    // Add a fade-in effect for project cards when they come into view
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Start observing
        observer.observe(card);
    });
    
});

/* ============================================ */
/* TO ADD MORE FEATURES: */
/* - Add your own JavaScript functions here */
/* - Examples: form validation, animations, etc. */
/* ============================================ */
