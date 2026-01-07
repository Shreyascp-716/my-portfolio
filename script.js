
// Sidebar toggle functionality
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const sidebarToggle = document.getElementById('sidebarToggle');

// Initialize sidebar state based on screen size
function initializeSidebar() {
    const isMobile = window.innerWidth <= 800;

    if (isMobile) {
        sidebar.classList.add('collapsed');
        sidebar.classList.remove('open');
        mainContent.classList.add('expanded');
        sidebarToggle.innerHTML = '☰';
    } else {
        sidebar.classList.remove('collapsed');
        sidebar.classList.remove('open');
        mainContent.classList.remove('expanded');
        sidebarToggle.innerHTML = '☰';
    }
}

// Initialize on page load
initializeSidebar();

// Re-initialize on window resize
window.addEventListener('resize', initializeSidebar);

function toggleSidebar() {
    const isMobile = window.innerWidth <= 800;

    if (isMobile) {
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    } else {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    }

    // Update toggle button icon
    const isCollapsed = sidebar.classList.contains('collapsed');
    sidebarToggle.innerHTML = isCollapsed ? '☰' : '<span style="font-size: 16px; line-height: 1;">✕</span>';
}

sidebarToggle.addEventListener('click', toggleSidebar);

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 800) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('open');
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
            sidebarToggle.innerHTML = '☰';
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }

        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 800) {
            sidebar.classList.remove('open');
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
            sidebarToggle.innerHTML = '☰';
        }
    });
});

// Project card flip functionality
document.querySelectorAll('.project-flip-card').forEach(card => {
    card.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('flipped');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});