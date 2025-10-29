/**
 * Pojok Baca CAKRAJENI - Interactive Features
 * Optimized for performance and mobile responsiveness
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
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
        const musicToggle = document.getElementById('musicToggle');
        const musicPlayer = document.querySelector('.music-player');
        const playPauseBtn = document.getElementById('playPause');
        const volumeBtn = document.getElementById('volumeBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const audio = document.getElementById('backgroundMusic');
        
        if (!musicToggle || !musicPlayer || !playPauseBtn || !audio) return;
        
        // Load saved volume preference
        const savedVolume = localStorage.getItem('musicVolume');
        if (savedVolume !== null) {
            volumeSlider.value = savedVolume;
            audio.volume = savedVolume / 100;
        } else {
            audio.volume = 0.5;
        }
        
        // Update volume icon based on volume level
        function updateVolumeIcon() {
            const volume = audio.volume;
            const icon = volumeBtn.querySelector('i');
            if (volume === 0) {
                icon.className = 'fas fa-volume-mute';
            } else if (volume < 0.5) {
                icon.className = 'fas fa-volume-down';
            } else {
                icon.className = 'fas fa-volume-up';
            }
        }
        
        updateVolumeIcon();
        
        // Helper function to update play/pause icon
        function updatePlayPauseIcon(isPlaying) {
            const playIcon = playPauseBtn.querySelector('.fa-play');
            const pauseIcon = playPauseBtn.querySelector('.fa-pause');
            if (isPlaying) {
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'block';
                playPauseBtn.classList.add('playing');
            } else {
                if (playIcon) playIcon.style.display = 'block';
                if (pauseIcon) pauseIcon.style.display = 'none';
                playPauseBtn.classList.remove('playing');
            }
        }
        
        // Toggle music player expand/collapse
        musicToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            musicPlayer.classList.toggle('expanded');
            musicToggle.classList.toggle('active');
        });
        
        // Play/Pause functionality
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.paused) {
                // Request user interaction for autoplay
                audio.play().then(() => {
                    updatePlayPauseIcon(true);
                    musicToggle.classList.add('active');
                }).catch(err => {
                    console.log('Autoplay prevented:', err);
                    // Show message or handle error
                });
            } else {
                audio.pause();
                updatePlayPauseIcon(false);
            }
        });
        
        // Volume control
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            audio.volume = volume;
            localStorage.setItem('musicVolume', e.target.value);
            updateVolumeIcon();
        });
        
        // Mute/Unmute on volume button click
        volumeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.volume > 0) {
                audio.dataset.previousVolume = audio.volume;
                audio.volume = 0;
                volumeSlider.value = 0;
                localStorage.setItem('musicVolume', 0);
            } else {
                const previousVolume = audio.dataset.previousVolume || 0.5;
                audio.volume = previousVolume;
                volumeSlider.value = previousVolume * 100;
                localStorage.setItem('musicVolume', volumeSlider.value);
            }
            updateVolumeIcon();
        });
        
        // Update play/pause button state when audio ends
        audio.addEventListener('ended', () => {
            updatePlayPauseIcon(false);
        });
        
        // Update play/pause button state when audio plays/pauses
        audio.addEventListener('play', () => {
            updatePlayPauseIcon(true);
            musicToggle.classList.add('active');
        });
        
        audio.addEventListener('pause', () => {
            updatePlayPauseIcon(false);
        });
        
        // Close music controls when clicking outside
        document.addEventListener('click', (e) => {
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            if (!musicPlayer.contains(e.target) &&
                !(mobileMenuToggle && mobileMenuToggle.contains(e.target)) &&
                !(navLinks && navLinks.contains(e.target)) &&
                musicPlayer.classList.contains('expanded')) {
                musicPlayer.classList.remove('expanded');
            }
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
});

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
