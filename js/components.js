// Load navbar and footer - NO JQUERY REQUIRED
function loadComponent(placeholder, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(placeholder).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error('Error loading component:', error));
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
} else {
    initComponents();
}

function initComponents() {
    // Load navbar first, then initialize
    loadComponent('navbar-placeholder', 'components/navbar.html', function() {
        setActiveNavLink();
        initDarkMode();
        initNavbarScroll(); // ADD THIS LINE
    });
    
    // Load footer
    loadComponent('footer-placeholder', 'components/footer.html');
}

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove all active classes and sr-only spans first
    navLinks.forEach(link => {
        link.classList.remove('active');
        const srOnly = link.querySelector('.sr-only');
        if (srOnly) srOnly.remove();
    });
    
    // Add active class to current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if this link matches current page
        if (href === currentPage || 
            href === './' + currentPage ||
            (currentPage === 'index.html' && href === 'index.html') ||
            (currentPage === '' && href === 'index.html')) {
            
            link.classList.add('active');
            
            // Add the sr-only span for accessibility
            const srSpan = document.createElement('span');
            srSpan.className = 'sr-only';
            srSpan.textContent = '(current)';
            link.appendChild(srSpan);
        }
    });
}

// Dark mode functionality
function initDarkMode() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        toggle.addEventListener('click', function() {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Navbar scroll effect - ADD THIS ENTIRE FUNCTION
function initNavbarScroll() {
    const nav = document.querySelector('.nav-menu');
    
    if (!nav) return;
    
    // Set initial state based on scroll position
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    }
    
    // Add scroll listener
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}