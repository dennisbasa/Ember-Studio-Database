


document.addEventListener("DOMContentLoaded", () => {
    // Sidebar functionality
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const hamburger = document.getElementById("hamburgerButton");
    const closeBtn = document.getElementById("sidebarClose");
    const body = document.body;

    function openSidebar() {
        sidebar.classList.add("active");
        overlay.classList.add("active");
        body.classList.add("sidebar-open");
    }

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        body.classList.remove("sidebar-open");
    }

    hamburger.addEventListener("click", (e) => {
        e.preventDefault();
        openSidebar();
    });

    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeSidebar();
    });

    // Team section animations - Updated for pill shapes
    function handleScrollAnimations() {
        const headerWrapper = document.querySelector('.team-header-wrapper');
        const teamCards = document.querySelectorAll('.team-card');
        
        if (!headerWrapper) return;
        
        const elementPosition = headerWrapper.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            headerWrapper.classList.add('fade-in');
        
            teamCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, 300 + (index * 100));
            });
        }
    }

    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('load', handleScrollAnimations);
    
    // Initialize parallax
    initParallax();
});

// Parallax functionality
function initParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const isMobile = window.innerWidth <= 768;
    
    // Disable parallax on mobile
    if (isMobile) {
        parallaxLayers.forEach(layer => {
            layer.style.transform = '';
        });
        return;
    }
    
    // --- Mouse Parallax ---
    document.removeEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleMouseMove);
    
    function handleMouseMove(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxLayers.forEach(layer => {
            const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
            if (depth !== 0) {
                const xMovement = (mouseX - 0.5) * 40 * depth;
                const yMovement = (mouseY - 0.5) * 40 * depth;
                
                const currentScrollY = (layer.dataset.scrollY || 0);
                layer.style.transform = `translate3d(${xMovement}px, calc(${currentScrollY}px + ${yMovement}px), 0)`;
            }
        });
    }

    // --- Scroll Parallax ---
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);
    
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress (0 to 1) within the first screen
        const scrollProgress = Math.min(scrolled / windowHeight, 1);
        
        // Parallax effect for first screen only
        if (scrolled < windowHeight) {
            parallaxLayers.forEach(layer => {
                const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
                
                if (depth !== 0) {
                    // Y position based on scroll and depth
                    const yPos = -(scrolled * depth * 0.4);
                    layer.dataset.scrollY = yPos;
                    layer.style.transform = `translate3d(0, ${yPos}px, 0)`;

                    // Fade out parallax overlay as you scroll down
                    if (layer.classList.contains('overlay')) {
                        layer.style.opacity = 1 - scrollProgress * 0.8;
                    }
                }
            });
        }
        
        // Reset transforms after first screen scroll for non-overlay layers
        if (scrolled >= windowHeight) {
            parallaxLayers.forEach(layer => {
                if (!layer.classList.contains('overlay')) {
                    layer.style.transform = '';
                    delete layer.dataset.scrollY;
                } else {
                    layer.style.opacity = 0.2;
                }
            });
        }
    }
    
    // Initial scroll check on load
    handleScroll();

    // Reinitialize on resize
    window.removeEventListener('resize', initParallax);
    window.addEventListener('resize', initParallax);
}
