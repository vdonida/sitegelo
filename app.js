// Ice Factory Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Ensure mobile toggle is visible
    if (navToggle) {
        navToggle.style.display = 'flex';
        
        // Toggle mobile menu
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default for smooth scrolling
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Handle smooth scrolling manually
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navToggle) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const nome = formData.get('nome');
            const email = formData.get('email');
            const telefone = formData.get('telefone');
            const mensagem = formData.get('mensagem');
            
            // Basic validation
            if (!nome || !email || !mensagem) {
                showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Show success message
                showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            }, 2000);
        });
    }

    // Active navigation link highlighting
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 150; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Scroll event listener for active nav link
    window.addEventListener('scroll', highlightActiveNavLink);

    // Initialize WhatsApp button
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    if (whatsappBtn) {
        // Ensure button is visible
        whatsappBtn.style.position = 'fixed';
        whatsappBtn.style.bottom = '24px';
        whatsappBtn.style.right = '24px';
        whatsappBtn.style.zIndex = '1001';
        whatsappBtn.style.opacity = '1';
        whatsappBtn.style.visibility = 'visible';
        
        // Add click tracking
        whatsappBtn.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
        });
    }

    // Fix Google Maps iframe loading
    const mapIframe = document.querySelector('.mapa iframe');
    
    if (mapIframe) {
        // Set correct Google Maps embed URL for the address
        const address = "Rua Doutor Silvio Marques Junior, 107, Bauru, SP, Brazil";
        const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dw901SwHHqfeRs&q=${encodeURIComponent(address)}`;
        
        // For demo purposes, use a simpler embed URL that works without API key
        const simpleEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.894!2d-49.078873!3d-22.32456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE5JzI4LjQiUyA0OcKwMDQnNDQuMCJX!5e0!3m2!1spt-BR!2sbr!4v1609459200000!5m2!1spt-BR!2sbr`;
        
        mapIframe.src = simpleEmbedUrl;
        mapIframe.style.pointerEvents = 'auto';
        mapIframe.style.border = '0';
        mapIframe.style.width = '100%';
        mapIframe.style.height = '300px';
    }

    // Intersection Observer for animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.features__item, .produto__card, .step');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Phone number formatting
    const phoneInput = document.getElementById('telefone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length >= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 7) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            }
            
            this.value = value;
        });
    }

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message status status--${type}`;
        messageEl.textContent = message;
        messageEl.style.marginTop = '16px';
        messageEl.style.textAlign = 'center';
        
        // Insert message after form
        if (contactForm && contactForm.parentNode) {
            contactForm.parentNode.insertBefore(messageEl, contactForm.nextSibling);
        }
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageEl && messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }

    // Header background on scroll
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 253, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = 'var(--color-surface)';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Performance optimization: debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll handlers
    const debouncedScrollHandler = debounce(function() {
        highlightActiveNavLink();
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
    });

    // Focus management for accessibility
    if (navToggle) {
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // Print styles handling
    window.addEventListener('beforeprint', function() {
        // Ensure all sections are visible for printing
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (navToggle) {
            navToggle.classList.remove('active');
        }
    });

    // Initialize active nav link on page load
    highlightActiveNavLink();

    console.log('Ice Factory website loaded successfully! ❄️');
});