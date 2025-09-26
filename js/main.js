// ================================================
// FUNCIONALIDADES PRINCIPAIS DA PÁGINA
// ================================================

class MainApp {
    constructor() {
        this.header = null;
        this.mobileMenuToggle = null;
        this.navMenu = null;
        this.whatsappFloat = null;
        this.scrollOffset = 80;
        this.isMenuOpen = false;
        this.lastScrollY = 0;
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupSmoothScroll();
        this.setupWhatsAppFloat();
        this.initializeAnimations();
        
        console.log('Main App inicializado com sucesso');
    }
    
    setupElements() {
        this.header = document.getElementById('header');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.whatsappFloat = document.getElementById('whatsapp-float');
    }
    
    setupEventListeners() {
        // Scroll do header
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        
        // Menu mobile
        if (this.mobileMenuToggle && this.navMenu) {
            this.mobileMenuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
            
            // Fechar menu ao clicar nos links
            this.navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (this.isMenuOpen) {
                        this.closeMobileMenu();
                    }
                });
            });
            
            // Fechar menu ao clicar fora
            document.addEventListener('click', (e) => {
                if (this.isMenuOpen && 
                    !this.navMenu.contains(e.target) && 
                    !this.mobileMenuToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
        
        // WhatsApp float
        if (this.whatsappFloat) {
            const whatsappBtn = this.whatsappFloat.querySelector('.whatsapp-btn');
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', this.toggleWhatsAppMenu.bind(this));
            }
        }
        
        // Redimensionamento
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Navegação por teclado
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Prevenção de FOUC (Flash of Unstyled Content)
        document.body.classList.add('js-loaded');
    }
    
    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateHeaderOnScroll();
                this.updateWhatsAppFloat();
                this.handleScrollAnimations();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
    
    updateHeaderOnScroll() {
        const scrollY = window.scrollY;
        
        if (this.header) {
            if (scrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            // Header hide/show em mobile
            if (Utils.isMobile()) {
                if (scrollY > this.lastScrollY && scrollY > 200) {
                    this.header.classList.add('header-hidden');
                } else {
                    this.header.classList.remove('header-hidden');
                }
            }
        }
        
        this.lastScrollY = scrollY;
    }
    
    updateWhatsAppFloat() {
        if (!this.whatsappFloat) return;
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Mostrar/esconder baseado na posição
        if (scrollY > windowHeight * 0.3) {
            this.whatsappFloat.classList.add('visible');
        } else {
            this.whatsappFloat.classList.remove('visible');
        }
        
        // Ajustar posição próximo ao footer
        const footer = document.querySelector('footer');
        if (footer) {
            const footerRect = footer.getBoundingClientRect();
            if (footerRect.top < windowHeight) {
                this.whatsappFloat.classList.add('above-footer');
            } else {
                this.whatsappFloat.classList.remove('above-footer');
            }
        }
    }
    
    setupScrollAnimations() {
        // Elementos que devem animar ao entrar na viewport
        const animatedElements = document.querySelectorAll([
            '[data-aos]',
            '.hero-texto',
            '.hero-imagem',
            '.sobre-conteudo',
            '.servico-item',
            '.local-item',
            '.depoimento-card'
        ].join(','));
        
        // Usar Intersection Observer para performance
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            this.scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                    }
                });
            }, observerOptions);
            
            animatedElements.forEach(el => {
                el.classList.add('animate-on-scroll');
                this.scrollObserver.observe(el);
            });
        } else {
            // Fallback para navegadores sem suporte
            animatedElements.forEach(el => {
                el.classList.add('animated');
            });
        }
    }
    
    animateElement(element) {
        const delay = element.dataset.aosDelay || 0;
        
        setTimeout(() => {
            element.classList.add('animated');
            
            // Emitir evento para analytics
            const sectionName = this.getSectionName(element);
            if (sectionName) {
                Analytics.trackSectionView(sectionName);
            }
        }, parseInt(delay));
        
        // Parar de observar este elemento
        if (this.scrollObserver) {
            this.scrollObserver.unobserve(element);
        }
    }
    
    getSectionName(element) {
        const section = element.closest('section');
        return section ? section.id : null;
    }
    
    handleScrollAnimations() {
        // Parallax suave no hero
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.backgroundPositionY = `${rate}px`;
        }
    }
    
    setupSmoothScroll() {
        // Links de navegação suave
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Ignorar links vazios ou apenas #
                if (href === '#' || href === '') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    this.scrollToElement(target);
                    
                    // Atualizar URL sem recarregar página
                    if (href !== '#inicio') {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
        
        // Scroll para seção baseado na URL atual
        this.scrollToCurrentHash();
    }
    
    scrollToElement(element) {
        const headerHeight = this.header ? this.header.offsetHeight : 0;
        const extraOffset = 20;
        const targetPosition = element.offsetTop - headerHeight - extraOffset;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    }
    
    scrollToCurrentHash() {
        if (window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    this.scrollToElement(target);
                }
            }, 100);
        }
    }
    
    setupWhatsAppFloat() {
        if (!this.whatsappFloat) return;
        
        const tooltip = this.whatsappFloat.querySelector('.whatsapp-tooltip');
        const unidadeLinks = this.whatsappFloat.querySelectorAll('.unidade-link');
        
        // Analytics para cliques nas unidades
        unidadeLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const unidade = link.textContent.trim().toLowerCase();
                Analytics.trackWhatsAppClick(unidade);
            });
        });
        
        // Fechar tooltip ao clicar fora
        document.addEventListener('click', (e) => {
            if (!this.whatsappFloat.contains(e.target)) {
                this.whatsappFloat.classList.remove('menu-open');
            }
        });
    }
    
    toggleWhatsAppMenu() {
        this.whatsappFloat.classList.toggle('menu-open');
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        this.mobileMenuToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.mobileMenuToggle.setAttribute('aria-expanded', this.isMenuOpen);
        
        // Prevenir scroll do body quando menu está aberto
        if (this.isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        // Foco no primeiro link quando menu abre
        if (this.isMenuOpen) {
            const firstLink = this.navMenu.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    }
    
    closeMobileMenu() {
        if (!this.isMenuOpen) return;
        
        this.isMenuOpen = false;
        this.mobileMenuToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.mobileMenuToggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
    }
    
    handleResize() {
        // Fechar menu mobile se redimensionar para desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Recalcular posições e animações
        this.updateHeaderOnScroll();
        this.updateWhatsAppFloat();
    }
    
    handleKeyboard(e) {
        // Fechar menu mobile com ESC
        if (e.key === 'Escape' && this.isMenuOpen) {
            this.closeMobileMenu();
            this.mobileMenuToggle.focus();
        }
        
        // Fechar WhatsApp menu com ESC
        if (e.key === 'Escape' && this.whatsappFloat.classList.contains('menu-open')) {
            this.whatsappFloat.classList.remove('menu-open');
        }
        
        // Navegação por teclado no menu mobile
        if (this.isMenuOpen && (e.key === 'Tab')) {
            this.handleMenuTabNavigation(e);
        }
    }
    
    handleMenuTabNavigation(e) {
        const focusableElements = this.navMenu.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    initializeAnimations() {
        // Adicionar classes CSS para animações quando JS carrega
        document.documentElement.classList.add('js-enabled');
        
        // Remover preloader se existir
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1000);
        }
        
        // Efeito de typewriter no título se desejado
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle && heroTitle.dataset.typewriter) {
            this.typewriterEffect(heroTitle);
        }
    }
    
    typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--cor-destaque)';
        
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i === text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }
    
    // Métodos públicos de utilidade
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + this.scrollOffset;
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (scrollY >= section.offsetTop) {
                return section.id;
            }
        }
        
        return null;
    }
    
    highlightCurrentSection() {
        const currentSection = this.getCurrentSection();
        const navLinks = this.navMenu.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            link.classList.toggle('active', href === currentSection);
        });
    }
    
    showLoading(show = true) {
        if (show) {
            document.body.classList.add('loading');
        } else {
            document.body.classList.remove('loading');
        }
    }
    
    // Método para adicionar funcionalidades customizadas
    addCustomFeature(name, callback) {
        if (typeof callback === 'function') {
            callback.call(this);
            console.log(`Feature customizada "${name}" adicionada`);
        }
    }
    
    // Método para debug e informações
    getDebugInfo() {
        return {
            scrollY: window.scrollY,
            currentSection: this.getCurrentSection(),
            isMenuOpen: this.isMenuOpen,
            isMobile: Utils.isMobile(),
            headerHeight: this.header ? this.header.offsetHeight : 0,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }
    
    destroy() {
        // Limpar event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleKeyboard);
        
        // Limpar observer
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }
        
        // Restaurar estado
        document.body.style.overflow = '';
        document.body.classList.remove('js-loaded', 'loading');
        document.documentElement.classList.remove('js-enabled');
    }
}

// ================================================
// UTILITÁRIOS DE PERFORMANCE
// ================================================

class PerformanceOptimizer {
    static init() {
        this.optimizeImages();
        this.preloadCriticalResources();
        this.setupServiceWorker();
    }
    
    static optimizeImages() {
        // Lazy loading para imagens que não são críticas
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    static preloadCriticalResources() {
        // Preload de fontes importantes
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap',
            'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap'
        ];
        
        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }
    
    static setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.log('Falha ao registrar Service Worker:', error);
                });
        }
    }
}

// ================================================
// INICIALIZAÇÃO
// ================================================

// Aguardar DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar aplicação principal
    window.MainApp = new MainApp();
    
    // Inicializar otimizações de performance
    PerformanceOptimizer.init();
    
    // Configurar analytics se disponível
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_TRACKING_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Destacar seção atual na navegação
    window.addEventListener('scroll', Utils.throttle(() => {
        window.MainApp.highlightCurrentSection();
    }, 100));
    
    // Log de inicialização
    console.log('🎉 Site da Dra. Luísa Bastos carregado com sucesso!');
    console.log('📱 Dispositivo móvel:', Utils.isMobile());
    console.log('🔧 Debug info:', window.MainApp.getDebugInfo());
});

// Aguardar carregamento completo
window.addEventListener('load', () => {
    // Remover loading states
    document.body.classList.add('loaded');
    
    // Iniciar animações finais
    setTimeout(() => {
        document.body.classList.add('ready');
    }, 100);
});

// Tratamento de erros globais
window.addEventListener('error', (e) => {
    console.error('Erro na aplicação:', e.error);
    
    // Em produção, enviar para serviço de monitoramento
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.toString(),
            fatal: false
        });
    }
});

// Exportar para escopo global
window.PerformanceOptimizer = PerformanceOptimizer;