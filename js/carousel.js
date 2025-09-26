// ================================================
// CARROSSEL DE DEPOIMENTOS
// ================================================

class Carousel {
    constructor(trackSelector, options = {}) {
        this.track = document.querySelector(trackSelector);
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoPlayTimer = null;
        
        // Configurações padrão
        this.options = {
            autoPlay: options.autoPlay || CONFIG.carousel.autoPlay,
            autoPlayDelay: options.autoPlayDelay || CONFIG.carousel.autoPlayDelay,
            animationDuration: options.animationDuration || CONFIG.carousel.animationDuration,
            pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
            loop: options.loop !== undefined ? options.loop : true,
            showDots: options.showDots !== undefined ? options.showDots : true,
            showControls: options.showControls !== undefined ? options.showControls : true,
            swipeEnabled: options.swipeEnabled !== undefined ? options.swipeEnabled : true
        };
        
        this.init();
    }
    
    init() {
        if (!this.track) {
            console.error('Carousel track não encontrado');
            return;
        }
        
        this.slides = this.track.children;
        this.totalSlides = this.slides.length;
        
        if (this.totalSlides === 0) {
            console.warn('Nenhum slide encontrado no carrossel');
            return;
        }
        
        this.setupCarousel();
        this.setupControls();
        this.setupDots();
        this.setupEventListeners();
        this.setupSwipe();
        
        // Iniciar autoplay se habilitado
        if (this.options.autoPlay) {
            this.startAutoPlay();
        }
        
        // Mostrar primeiro slide
        this.goToSlide(0, false);
    }
    
    setupCarousel() {
        // Configurar container do carrossel
        this.container = this.track.parentElement;
        this.container.classList.add('carousel-initialized');
        
        // Aplicar estilos necessários
        this.track.style.display = 'flex';
        this.track.style.transition = `transform ${this.options.animationDuration}ms ease-in-out`;
        
        // Configurar slides
        Array.from(this.slides).forEach((slide, index) => {
            slide.style.minWidth = '100%';
            slide.style.flexShrink = '0';
            slide.setAttribute('data-slide-index', index);
        });
    }
    
    setupControls() {
        if (!this.options.showControls) return;
        
        this.prevBtn = document.getElementById('prev-depoimento');
        this.nextBtn = document.getElementById('next-depoimento');
        
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            // Configurar estado inicial dos botões
            this.updateControls();
        }
    }
    
    setupDots() {
        if (!this.options.showDots) return;
        
        this.dotsContainer = document.getElementById('depoimentos-dots');
        
        if (this.dotsContainer) {
            // Limpar dots existentes
            this.dotsContainer.innerHTML = '';
            
            // Criar dots
            for (let i = 0; i < this.totalSlides; i++) {
                const dot = Utils.createElement('button', {
                    className: 'dot',
                    'data-slide': i,
                    'aria-label': `Ir para depoimento ${i + 1}`
                });
                
                dot.addEventListener('click', () => this.goToSlide(i));
                this.dotsContainer.appendChild(dot);
            }
            
            this.dots = this.dotsContainer.querySelectorAll('.dot');
            this.updateDots();
        }
    }
    
    setupEventListeners() {
        // Pausar autoplay no hover
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }
        
        // Pausar autoplay quando tab está inativo
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else if (this.options.autoPlay) {
                this.resumeAutoPlay();
            }
        });
        
        // Controles por teclado
        this.container.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        });
        
        // Redimensionamento da janela
        window.addEventListener('resize', Utils.debounce(() => {
            this.updateCarousel();
        }, 250));
    }
    
    setupSwipe() {
        if (!this.options.swipeEnabled || !Utils.isMobile()) return;
        
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let isDragging = false;
        let startTime = 0;
        
        const handleStart = (e) => {
            startTime = Date.now();
            isDragging = true;
            
            const touch = e.touches ? e.touches[0] : e;
            startX = currentX = touch.clientX;
            startY = currentY = touch.clientY;
            
            this.pauseAutoPlay();
            this.track.style.transition = 'none';
        };
        
        const handleMove = (e) => {
            if (!isDragging) return;
            
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            currentX = touch.clientX;
            currentY = touch.clientY;
            
            const diffX = currentX - startX;
            const diffY = currentY - startY;
            
            // Verificar se é um swipe horizontal
            if (Math.abs(diffX) > Math.abs(diffY)) {
                const translateX = -(this.currentIndex * 100) + (diffX / this.container.offsetWidth * 100);
                this.track.style.transform = `translateX(${translateX}%)`;
            }
        };
        
        const handleEnd = () => {
            if (!isDragging) return;
            
            isDragging = false;
            const diffX = currentX - startX;
            const diffY = currentY - startY;
            const duration = Date.now() - startTime;
            
            // Restaurar transição
            this.track.style.transition = `transform ${this.options.animationDuration}ms ease-in-out`;
            
            // Verificar se é um swipe válido
            const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
            const isQuickSwipe = duration < 300;
            const isLongSwipe = Math.abs(diffX) > this.container.offsetWidth * 0.3;
            
            if (isHorizontalSwipe && (isQuickSwipe || isLongSwipe)) {
                if (diffX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            } else {
                // Voltar para posição atual
                this.goToSlide(this.currentIndex, false);
            }
            
            if (this.options.autoPlay) {
                this.resumeAutoPlay();
            }
        };
        
        // Touch events
        this.container.addEventListener('touchstart', handleStart, { passive: false });
        this.container.addEventListener('touchmove', handleMove, { passive: false });
        this.container.addEventListener('touchend', handleEnd);
        
        // Mouse events (para desktop)
        this.container.addEventListener('mousedown', handleStart);
        this.container.addEventListener('mousemove', handleMove);
        this.container.addEventListener('mouseup', handleEnd);
        this.container.addEventListener('mouseleave', handleEnd);
    }
    
    goToSlide(index, animate = true) {
        if (this.isAnimating && animate) return;
        if (index < 0 || index >= this.totalSlides) return;
        
        if (animate) {
            this.isAnimating = true;
            setTimeout(() => {
                this.isAnimating = false;
            }, this.options.animationDuration);
        }
        
        this.currentIndex = index;
        
        // Aplicar transformação
        const translateX = -(this.currentIndex * 100);
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar UI
        this.updateControls();
        this.updateDots();
        this.updateSlideAttributes();
        
        // Emitir evento
        EventBus.emit('carousel:change', {
            index: this.currentIndex,
            total: this.totalSlides,
            slide: this.slides[this.currentIndex]
        });
        
        // Analytics
        Analytics.trackEvent('carousel_slide_change', {
            slide_index: this.currentIndex,
            total_slides: this.totalSlides
        });
    }
    
    nextSlide() {
        let nextIndex = this.currentIndex + 1;
        
        if (nextIndex >= this.totalSlides) {
            if (this.options.loop) {
                nextIndex = 0;
            } else {
                return;
            }
        }
        
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        let prevIndex = this.currentIndex - 1;
        
        if (prevIndex < 0) {
            if (this.options.loop) {
                prevIndex = this.totalSlides - 1;
            } else {
                return;
            }
        }
        
        this.goToSlide(prevIndex);
    }
    
    updateControls() {
        if (!this.prevBtn || !this.nextBtn) return;
        
        if (this.options.loop) {
            this.prevBtn.disabled = false;
            this.nextBtn.disabled = false;
        } else {
            this.prevBtn.disabled = this.currentIndex === 0;
            this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
        }
    }
    
    updateDots() {
        if (!this.dots) return;
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
            dot.setAttribute('aria-pressed', index === this.currentIndex);
        });
    }
    
    updateSlideAttributes() {
        Array.from(this.slides).forEach((slide, index) => {
            const isActive = index === this.currentIndex;
            
            slide.setAttribute('aria-hidden', !isActive);
            slide.setAttribute('tabindex', isActive ? '0' : '-1');
            
            if (isActive) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    updateCarousel() {
        // Recalcular posição após redimensionamento
        this.goToSlide(this.currentIndex, false);
    }
    
    startAutoPlay() {
        if (!this.options.autoPlay) return;
        
        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, this.options.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }
    
    resumeAutoPlay() {
        if (this.options.autoPlay && !this.autoPlayTimer) {
            this.startAutoPlay();
        }
    }
    
    // Métodos públicos de controle
    play() {
        this.options.autoPlay = true;
        this.startAutoPlay();
    }
    
    pause() {
        this.options.autoPlay = false;
        this.pauseAutoPlay();
    }
    
    destroy() {
        // Limpar timers
        this.pauseAutoPlay();
        
        // Remover event listeners
        if (this.prevBtn) this.prevBtn.removeEventListener('click', this.previousSlide);
        if (this.nextBtn) this.nextBtn.removeEventListener('click', this.nextSlide);
        
        // Limpar dots
        if (this.dots) {
            this.dots.forEach(dot => {
                dot.removeEventListener('click', () => {});
            });
        }
        
        // Resetar estilos
        this.track.style.transform = '';
        this.track.style.transition = '';
        
        Array.from(this.slides).forEach(slide => {
            slide.style.minWidth = '';
            slide.style.flexShrink = '';
            slide.removeAttribute('data-slide-index');
            slide.removeAttribute('aria-hidden');
            slide.removeAttribute('tabindex');
        });
        
        this.container.classList.remove('carousel-initialized');
    }
    
    // Getters
    getCurrentIndex() {
        return this.currentIndex;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    getCurrentSlide() {
        return this.slides[this.currentIndex];
    }
    
    isPlaying() {
        return this.autoPlayTimer !== null;
    }
    
    // Setters
    setAutoPlayDelay(delay) {
        this.options.autoPlayDelay = delay;
        if (this.isPlaying()) {
            this.pauseAutoPlay();
            this.startAutoPlay();
        }
    }
    
    setAnimationDuration(duration) {
        this.options.animationDuration = duration;
        this.track.style.transition = `transform ${duration}ms ease-in-out`;
    }
}

// ================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ================================================

// Aguardar DOM e DepoimentosManager estarem prontos
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um tick para garantir que o DepoimentosManager renderizou
    setTimeout(() => {
        const track = document.getElementById('depoimentos-track');
        if (track && track.children.length > 0) {
            // Criar instância global do carrossel
            window.DepoimentosCarousel = new Carousel('#depoimentos-track', {
                autoPlay: true,
                autoPlayDelay: 5000,
                pauseOnHover: true,
                loop: true,
                swipeEnabled: true
            });
            
            console.log('Carrossel de depoimentos inicializado com sucesso');
        } else {
            console.warn('Track de depoimentos não encontrado ou vazio');
        }
    }, 100);
});

// Exportar classe para uso externo
window.Carousel = Carousel;