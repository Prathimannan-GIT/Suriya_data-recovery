// Main JavaScript for Data Recovery Services Website

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileMenu();
    initScrollEffects();
    initActiveNav();
    initScrollToTop();
    initDashboardToggle();
});

function initDarkMode() {
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    const html = document.documentElement;
    
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
        if (localStorage.getItem('theme') === 'light') html.classList.remove('dark');
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            html.classList.toggle('dark');
            if (html.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    });
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-menu-btn');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        }

        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('translate-x-full');
            }
        });
    }
}

function initScrollEffects() {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('shadow-md', 'backdrop-blur-md', 'bg-white/90', 'dark:bg-slate-900/90');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('shadow-md', 'backdrop-blur-md', 'bg-white/90', 'dark:bg-slate-900/90');
                // header.classList.add('bg-transparent'); 
            }
        });
    }
}

function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('text-primary-600', 'dark:text-blue-400');
            link.classList.remove('hover:text-primary-600', 'dark:hover:text-blue-400');
        } else {
            link.classList.remove('text-primary-600', 'dark:text-blue-400');
            link.classList.add('hover:text-primary-600', 'dark:hover:text-blue-400', 'transition');
        }
    });
}

function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.className = 'fixed bottom-6 right-6 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg items-center justify-center transition-all duration-300 transform translate-y-20 opacity-0 z-50 hover:bg-primary-700 hover:-translate-y-1 active:scale-95 hidden lg:flex';
    
    // Add mobile/tablet visible version
    scrollBtn.classList.remove('hidden', 'lg:flex');
    scrollBtn.classList.add('flex');
    
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.classList.remove('translate-y-20', 'opacity-0');
            scrollBtn.classList.add('translate-y-0', 'opacity-100');
        } else {
            scrollBtn.classList.add('translate-y-20', 'opacity-0');
            scrollBtn.classList.remove('translate-y-0', 'opacity-100');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initDashboardToggle() {
    const dashboardMobileBtn = document.querySelector('.md\\:hidden button i.fa-bars')?.parentElement;
    const sidebar = document.querySelector('aside');
    
    if (dashboardMobileBtn && sidebar) {
        // Create overlay if not exists
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay fixed inset-0 bg-black/50 z-10 hidden transition-opacity duration-300 opacity-0';
            document.body.appendChild(overlay);
        }

        dashboardMobileBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('flex');
            sidebar.classList.add('fixed', 'inset-y-0', 'left-0', 'w-64');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('opacity-100'), 10);
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('flex', 'fixed', 'inset-y-0', 'left-0', 'w-64');
            overlay.classList.remove('opacity-100');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        });
    }
}
