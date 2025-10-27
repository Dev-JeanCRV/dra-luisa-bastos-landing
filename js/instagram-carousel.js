// ================================================
// CARROSSEL DE IMAGENS DO INSTAGRAM
// Sistema simples para galeria de imagens
// ================================================

class InstagramCarousel {
    constructor() {
        // Elementos do DOM
        this.track = document.getElementById('instagram-track');
        this.prevBtn = document.getElementById('prev-instagram');
        this.nextBtn = document.getElementById('next-instagram');
        this.dotsContainer = document.getElementById('instagram-dots');
        
        // Estado
        this.currentIndex = 0;
        this.slides = [];
        this.dots = [];
        this.autoPlayInterval = null;
        
        // Configurações
        this.autoPlayDelay = 4000; // 4 segundos
        this.loop = true; // Loop infinito
        
        this.init();
    }
    
    init() {
        if (!this.track) return;
        
        this.slides = Array.from(this.track.children);
        if (this.slides.length === 0) return;
        
        this.createDots();
        this.setupControls();
        this.setupSwipe();
        this.updateCarousel();
        this.startAutoPlay();
        
        console.log('✅ Carrossel Instagram iniciado!');
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }
    
    setupControls() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Pausar no hover
        this.track.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    
    setupSwipe() {
        let startX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    nextSlide() {
        this.currentIndex++;
        
        if (this.currentIndex >= this.slides.length) {
            this.currentIndex = this.loop ? 0 : this.slides.length - 1;
        }
        
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    previousSlide() {
        this.currentIndex--;
        
        if (this.currentIndex < 0) {
            this.currentIndex = this.loop ? this.slides.length - 1 : 0;
        }
        
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    updateCarousel() {
        // Mover track
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar dots
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Atualizar botões
        if (!this.loop) {
            if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0;
            if (this.nextBtn) this.nextBtn.disabled = this.currentIndex === this.slides.length - 1;
        }
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }
}

// Inicializar quando página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.InstagramCarousel = new InstagramCarousel();
});