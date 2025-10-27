// ================================================
// CONFIGURAÇÕES GLOBAIS
// ================================================

const CONFIG = {
    // Informações de contato
    contato: {
        whatsapp: {
            nilopolis: {
                numero: '5521971781341',
                mensagem: 'Olá! Gostaria de agendar uma consulta na unidade de Nilópolis.'
            },
            barra: {
                numero: '5521988904975',
                mensagem: 'Olá! Gostaria de agendar uma consulta na unidade da Barra da Tijuca.'
            }
        },
        email: 'contato@drluisabastos.com.br'
    },
    
    // Configurações do carrossel
    carousel: {
        autoPlay: true,
        autoPlayDelay: 5000,
        animationDuration: 500
    },
    
    // Configurações de animação
    animation: {
        scrollOffset: 100,
        duration: 600
    },
    
    // URLs das APIs e configurações
    api: {
        googleMyBusiness: {
            enabled: true,
            apiKey: '', // Adicione sua API Key aqui
            locationId: '', // ID da localização no Google My Business
            placeIds: {
                nilopolis: '', // Place ID da unidade Nilópolis
                barra: ''      // Place ID da unidade Barra da Tijuca
            },
            cacheDuration: 3600000, // 1 hora em millisegundos
            fallbackToMock: true,    // Usar dados mock se API falhar
            minRating: 4,            // Rating mínimo para exibir
            maxReviews: 20           // Número máximo de reviews para buscar
        },
        emailService: null
    },
    
    // Textos e mensagens
    messages: {
        form: {
            success: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
            error: 'Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.',
            validation: {
                required: 'Este campo é obrigatório',
                email: 'Digite um email válido',
                phone: 'Digite um telefone válido'
            }
        },
        loading: 'Carregando...',
        error: 'Algo deu errado. Tente novamente.'
    }
};

// ================================================
// UTILITÁRIOS GLOBAIS
// ================================================

const Utils = {
    // Debounce function para otimizar performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function para scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Verificar se elemento está visível na viewport
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -offset &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Smooth scroll para elemento
    smoothScrollTo(element, offset = 80) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },
    
    // Formatar telefone
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    },
    
    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Validar telefone brasileiro
    isValidPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11;
    },
    
    // Gerar URL do WhatsApp
    generateWhatsAppURL(numero, mensagem = '') {
        const encodedMessage = encodeURIComponent(mensagem);
        return `https://wa.me/${numero}?text=${encodedMessage}`;
    },
    
    // Detectar dispositivo mobile
    isMobile() {
        return window.innerWidth <= 768;
    },
    
    // Adicionar classe com animação
    addClassWithDelay(element, className, delay = 0) {
        setTimeout(() => {
            element.classList.add(className);
        }, delay);
    },
    
    // Remover acentos para comparações
    removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },
    
    // Capitalizar primeira letra
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    
    // Criar elemento com atributos
    createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'innerHTML') {
                element.innerHTML = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        
        if (content) {
            element.textContent = content;
        }
        
        return element;
    },
    
    // Mostrar notificação
    showNotification(message, type = 'info', duration = 5000) {
        // Remove notificações existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Criar nova notificação
        const notification = this.createElement('div', {
            className: `notification notification--${type}`,
            innerHTML: `
                <div class="notification__content">
                    <span class="notification__message">${message}</span>
                    <button class="notification__close" aria-label="Fechar notificação">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `
        });
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Mostrar com animação
        setTimeout(() => {
            notification.classList.add('notification--show');
        }, 100);
        
        // Remover automaticamente
        setTimeout(() => {
            this.hideNotification(notification);
        }, duration);
        
        // Event listener para botão fechar
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        return notification;
    },
    
    // Esconder notificação
    hideNotification(notification) {
        notification.classList.remove('notification--show');
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    },
    
    // Verificar se string contém apenas números
    isNumeric(str) {
        return /^\d+$/.test(str.replace(/\D/g, ''));
    },
    
    // Truncar texto
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    },
    
    // Obter parâmetros da URL
    getURLParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }
};

// ================================================
// EVENT EMITTER SIMPLES
// ================================================

class SimpleEventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

// Instância global do event emitter
const EventBus = new SimpleEventEmitter();

// ================================================
// ANALYTICS E TRACKING (PREPARAÇÃO)
// ================================================

const Analytics = {
    // Rastrear clique em botão WhatsApp
    trackWhatsAppClick(unidade) {
        this.trackEvent('whatsapp_click', {
            unidade: unidade,
            timestamp: new Date().toISOString()
        });
    },
    
    // Rastrear envio de formulário
    trackFormSubmission(formType) {
        this.trackEvent('form_submission', {
            form_type: formType,
            timestamp: new Date().toISOString()
        });
    },
    
    // Rastrear scroll para seção
    trackSectionView(sectionName) {
        this.trackEvent('section_view', {
            section: sectionName,
            timestamp: new Date().toISOString()
        });
    },
    
    // Método genérico para rastrear eventos
    trackEvent(eventName, eventData) {
        // Por enquanto apenas console.log
        // Depois pode integrar com Google Analytics, Facebook Pixel, etc.
        if (window.gtag) {
            window.gtag('event', eventName, eventData);
        }
        
        if (window.fbq) {
            window.fbq('track', eventName, eventData);
        }
        
        console.log('Analytics Event:', eventName, eventData);
    }
};

// ================================================
// EXPORTAR PARA ESCOPO GLOBAL
// ================================================

// Tornar disponível globalmente
window.CONFIG = CONFIG;
window.Utils = Utils;
window.EventBus = EventBus;
window.Analytics = Analytics;