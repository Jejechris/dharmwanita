/**
 * Pojok Baca CAKRAJENI - Interactive Features
 * Optimized for performance and mobile responsiveness
 */

// Wait for DOM to be fully loaded
function initializeAllFeatures() {
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Katalog Filter Functionality
    function initKatalogFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const katalogItems = document.querySelectorAll('.katalog-item');

        if (filterButtons.length === 0 || katalogItems.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                katalogItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        });
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Add initial styles for katalog items
        katalogItems.forEach(item => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        });
    }

    // Katalog Tab Functionality
    function initKatalogTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const katalogContents = document.querySelectorAll('.katalog-content');

        if (tabButtons.length === 0 || katalogContents.length === 0) return;

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked tab
                button.classList.add('active');

                // Get the target tab
                const targetTab = button.getAttribute('data-tab');

                // Show/hide katalog contents
                katalogContents.forEach(content => {
                    if (content.id === `katalog-${targetTab}`) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }

    // Scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Header background on scroll
    function initHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) return;

        let ticking = false;

        function updateHeader() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    // Mobile menu toggle
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuToggle && navLinks) {
            if (mobileMenuToggle.dataset.bound === 'true') return;
            mobileMenuToggle.dataset.bound = 'true';
            mobileMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (navLinks.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking on a link
            const navLinkItems = navLinks.querySelectorAll('.nav-link');
            navLinkItems.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (navLinks.classList.contains('active') && 
                    !mobileMenuToggle.contains(e.target) && 
                    !navLinks.contains(e.target)) {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Music Player Functionality
    function initMusicPlayer() {
        const playerRoot = document.getElementById('global-music-player');
        const musicToggle = document.getElementById('musicToggle');
        const audio = document.getElementById('backgroundMusic');
        if (!playerRoot || !musicToggle || !audio) return;

        if (playerRoot.dataset.initialized === 'true') return;
        playerRoot.dataset.initialized = 'true';

        // Set default volume (no slider)
        const savedVolume = localStorage.getItem('musicVolume');
        audio.volume = savedVolume !== null ? (Number(savedVolume) / 100) : 0.6;

        // Restore currentTime and playing state
        const savedTime = Number(localStorage.getItem('musicCurrentTime') || '0');
        const wasPlaying = localStorage.getItem('musicIsPlaying') === 'true';
        const applyResume = () => {
            if (!isNaN(savedTime) && savedTime > 0) {
                try { audio.currentTime = savedTime; } catch (e) {}
            }
            if (wasPlaying) {
                audio.play().then(() => setPlayingUI(true)).catch(() => {});
            } else {
                setPlayingUI(false);
            }
        };
        if (audio.readyState >= 1) {
            applyResume();
        } else {
            audio.addEventListener('loadedmetadata', applyResume, { once: true });
        }

        function setPlayingUI(isPlaying) {
            const icon = musicToggle.querySelector('i');
            if (!icon) return;
            icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-music';
            musicToggle.classList.toggle('active', isPlaying);
        }

        musicToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.paused) {
                audio.play().then(() => setPlayingUI(true)).catch(() => {});
            } else {
                audio.pause();
                setPlayingUI(false);
            }
        });

        // Persist state
        let lastSave = 0;
        audio.addEventListener('timeupdate', () => {
            const now = Date.now();
            if (now - lastSave > 1000) {
                lastSave = now;
                localStorage.setItem('musicCurrentTime', String(Math.floor(audio.currentTime)));
            }
        });
        audio.addEventListener('play', () => {
            setPlayingUI(true);
            localStorage.setItem('musicIsPlaying', 'true');
        });
        audio.addEventListener('pause', () => {
            setPlayingUI(false);
            localStorage.setItem('musicIsPlaying', 'false');
        });
        audio.addEventListener('ended', () => {
            setPlayingUI(false);
            localStorage.setItem('musicIsPlaying', 'false');
        });
    }

    // Initialize all functions
    try {
        initSmoothScrolling();
        initKatalogFilters();
        initKatalogTabs();
        initScrollAnimations();
        initHeaderScroll();
        initMobileMenu();
        initMusicPlayer();
    } catch (error) {
        console.warn('Some features may not be available:', error);
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', initializeAllFeatures);

// Turbo Drive navigations
document.addEventListener('turbo:load', initializeAllFeatures);

// Add CSS for fade-in animation if not already present
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.8s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
