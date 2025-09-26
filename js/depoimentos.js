// ================================================
// DADOS DOS DEPOIMENTOS
// ================================================

// Mock data dos depoimentos (simulando dados do Google Reviews)
// Em uma implementação real, estes dados viriam da API do Google My Business
const DEPOIMENTOS_DATA = [
    {
        id: 1,
        nome: "Maria Silva",
        iniciais: "MS",
        rating: 5,
        data: "2024-12-15",
        texto: "Dra. Luísa é uma profissional excepcional! Sofria com DTM há anos e após o tratamento com ela, minha qualidade de vida melhorou completamente. Muito atenciosa e competente.",
        tratamento: "DTM",
        unidade: "Nilópolis",
        verificado: true
    },
    {
        id: 2,
        nome: "João Santos", 
        iniciais: "JS",
        rating: 5,
        data: "2024-12-10",
        texto: "Excelente fisioterapeuta! O tratamento para minha paralisia facial foi muito eficaz. Recomendo a todos que precisam de fisioterapia orofacial.",
        tratamento: "Paralisia Facial",
        unidade: "Barra da Tijuca",
        verificado: true
    },
    {
        id: 3,
        nome: "Ana Costa",
        iniciais: "AC", 
        rating: 5,
        data: "2024-12-08",
        texto: "Profissional muito dedicada e conhecedora. O tratamento para minha tontura foi um sucesso total. Voltei a ter uma vida normal graças à Dra. Luísa.",
        tratamento: "Fisioterapia Vestibular",
        unidade: "Nilópolis",
        verificado: true
    },
    {
        id: 4,
        nome: "Carlos Oliveira",
        iniciais: "CO",
        rating: 5,
        data: "2024-12-05", 
        texto: "Após minha cirurgia ortognática, o acompanhamento com a Dra. Luísa foi fundamental para minha recuperação. Profissional extremamente competente.",
        tratamento: "Pós Ortognática",
        unidade: "Barra da Tijuca",
        verificado: true
    },
    {
        id: 5,
        nome: "Fernanda Lima",
        iniciais: "FL",
        rating: 5,
        data: "2024-12-01",
        texto: "Ambiente acolhedor e tratamento eficaz. Meu bruxismo melhorou significativamente após o tratamento. Dra. Luísa é muito atenciosa e explica tudo detalhadamente.",
        tratamento: "Bruxismo", 
        unidade: "Nilópolis",
        verificado: true
    },
    {
        id: 6,
        nome: "Roberto Ferreira",
        iniciais: "RF",
        rating: 5,
        data: "2024-11-28",
        texto: "Tratamento para DTM foi excelente. Não sentia mais dor há meses. A Dra. Luísa é muito profissional e o consultório tem uma estrutura ótima.",
        tratamento: "DTM",
        unidade: "Barra da Tijuca", 
        verificado: true
    },
    {
        id: 7,
        nome: "Juliana Rocha",
        iniciais: "JR",
        rating: 5,
        data: "2024-11-25",
        texto: "Sofria com vertigem constante e após o tratamento vestibular com a Dra. Luísa, minha vida mudou completamente. Profissional incrível!",
        tratamento: "Fisioterapia Vestibular",
        unidade: "Nilópolis",
        verificado: true
    },
    {
        id: 8,
        nome: "Pedro Alves",
        iniciais: "PA", 
        rating: 5,
        data: "2024-11-20",
        texto: "Atendimento humanizado e tratamento muito eficaz. A Dra. Luísa conseguiu resolver meu problema de abertura bucal em poucas sessões.",
        tratamento: "DTM",
        unidade: "Barra da Tijuca",
        verificado: true
    }
];

// ================================================
// CLASSE PARA GERENCIAR DEPOIMENTOS
// ================================================

class DepoimentosManager {
    constructor() {
        this.depoimentos = DEPOIMENTOS_DATA;
        this.currentIndex = 0;
        this.container = null;
        this.init();
    }
    
    init() {
        // Aguardar DOM carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.container = document.getElementById('depoimentos-track');
        if (this.container) {
            this.renderDepoimentos();
            this.setupEventListeners();
        }
    }
    
    renderDepoimentos() {
        if (!this.container) return;
        
        // Limpar container
        this.container.innerHTML = '';
        
        // Renderizar cada depoimento
        this.depoimentos.forEach((depoimento, index) => {
            const depoimentoElement = this.createDepoimentoElement(depoimento, index);
            this.container.appendChild(depoimentoElement);
        });
        
        // Configurar largura do track
        const cardWidth = 100; // 100% para cada card
        this.container.style.width = `${this.depoimentos.length * cardWidth}%`;
        
        // Emitir evento
        EventBus.emit('depoimentos:rendered', {
            total: this.depoimentos.length,
            current: this.currentIndex
        });
    }
    
    createDepoimentoElement(depoimento, index) {
        const card = Utils.createElement('div', {
            className: 'depoimento-card',
            'data-index': index
        });
        
        const ratingStars = this.generateRatingStars(depoimento.rating);
        const formattedDate = this.formatDate(depoimento.data);
        
        card.innerHTML = `
            <div class="depoimento-content">
                <div class="depoimento-header">
                    <div class="depoimento-author">
                        <div class="author-avatar">
                            <span>${depoimento.iniciais}</span>
                        </div>
                        <div class="author-info">
                            <div class="author-name">
                                ${depoimento.nome}
                                ${depoimento.verificado ? '<i class="fas fa-check-circle verified-badge" title="Avaliação verificada"></i>' : ''}
                            </div>
                            <div class="author-details">
                                ${depoimento.tratamento} • ${depoimento.unidade}
                            </div>
                            <div class="depoimento-date">${formattedDate}</div>
                        </div>
                    </div>
                    <div class="depoimento-rating">
                        ${ratingStars}
                    </div>
                </div>
                <div class="depoimento-texto">
                    "${depoimento.texto}"
                </div>
            </div>
        `;
        
        return card;
    }
    
    generateRatingStars(rating) {
        const maxStars = 5;
        let starsHTML = '';
        
        for (let i = 1; i <= maxStars; i++) {
            const starClass = i <= rating ? 'fas fa-star' : 'far fa-star';
            starsHTML += `<i class="${starClass}"></i>`;
        }
        
        return starsHTML;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            return 'Há 1 dia';
        } else if (diffDays <= 7) {
            return `Há ${diffDays} dias`;
        } else if (diffDays <= 30) {
            const weeks = Math.floor(diffDays / 7);
            return weeks === 1 ? 'Há 1 semana' : `Há ${weeks} semanas`;
        } else {
            const months = Math.floor(diffDays / 30);
            return months === 1 ? 'Há 1 mês' : `Há ${months} meses`;
        }
    }
    
    setupEventListeners() {
        // Escutar eventos do carrossel
        EventBus.on('carousel:change', (data) => {
            this.currentIndex = data.index;
            this.updateCurrentDepoimento();
        });
        
        // Escutar cliques nos depoimentos para analytics
        this.container.addEventListener('click', (e) => {
            const card = e.target.closest('.depoimento-card');
            if (card) {
                const index = parseInt(card.dataset.index);
                const depoimento = this.depoimentos[index];
                
                Analytics.trackEvent('depoimento_interaction', {
                    depoimento_id: depoimento.id,
                    nome: depoimento.nome,
                    rating: depoimento.rating,
                    tratamento: depoimento.tratamento,
                    unidade: depoimento.unidade
                });
            }
        });
    }
    
    updateCurrentDepoimento() {
        // Atualizar classe ativa nos depoimentos
        const cards = this.container.querySelectorAll('.depoimento-card');
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    // Métodos públicos para controle externo
    getCurrentDepoimento() {
        return this.depoimentos[this.currentIndex];
    }
    
    getTotalDepoimentos() {
        return this.depoimentos.length;
    }
    
    getDepoimentosByRating(rating) {
        return this.depoimentos.filter(dep => dep.rating === rating);
    }
    
    getDepoimentosByTratamento(tratamento) {
        return this.depoimentos.filter(dep => 
            dep.tratamento.toLowerCase().includes(tratamento.toLowerCase())
        );
    }
    
    getDepoimentosByUnidade(unidade) {
        return this.depoimentos.filter(dep => 
            dep.unidade.toLowerCase().includes(unidade.toLowerCase())
        );
    }
    
    getAverageRating() {
        const total = this.depoimentos.reduce((sum, dep) => sum + dep.rating, 0);
        return (total / this.depoimentos.length).toFixed(1);
    }
    
    // Método para adicionar novo depoimento (para futuras integrações)
    addDepoimento(depoimento) {
        // Validar depoimento
        if (!this.validateDepoimento(depoimento)) {
            console.error('Depoimento inválido:', depoimento);
            return false;
        }
        
        // Adicionar ID único
        depoimento.id = Date.now();
        
        // Adicionar à lista
        this.depoimentos.unshift(depoimento);
        
        // Re-renderizar
        this.renderDepoimentos();
        
        // Emitir evento
        EventBus.emit('depoimentos:added', depoimento);
        
        return true;
    }
    
    validateDepoimento(depoimento) {
        const required = ['nome', 'rating', 'texto'];
        return required.every(field => 
            depoimento.hasOwnProperty(field) && 
            depoimento[field] !== null && 
            depoimento[field] !== ''
        );
    }
    
    // Método para buscar depoimentos (para futuras integrações com Google Reviews)
    async fetchGoogleReviews() {
        try {
            // Esta seria a implementação real da API do Google
            // Por enquanto, retornamos os dados mock
            console.log('Fetching Google Reviews...');
            
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Em produção, aqui seria:
            // const response = await fetch('/api/google-reviews');
            // const data = await response.json();
            // return data.reviews;
            
            return this.depoimentos;
        } catch (error) {
            console.error('Erro ao buscar avaliações do Google:', error);
            return this.depoimentos; // Fallback para dados locais
        }
    }
    
    // Método para filtrar depoimentos
    filterDepoimentos(filters = {}) {
        let filtered = [...this.depoimentos];
        
        if (filters.rating) {
            filtered = filtered.filter(dep => dep.rating >= filters.rating);
        }
        
        if (filters.tratamento) {
            filtered = filtered.filter(dep => 
                dep.tratamento.toLowerCase().includes(filters.tratamento.toLowerCase())
            );
        }
        
        if (filters.unidade) {
            filtered = filtered.filter(dep => 
                dep.unidade.toLowerCase().includes(filters.unidade.toLowerCase())
            );
        }
        
        if (filters.verificado !== undefined) {
            filtered = filtered.filter(dep => dep.verificado === filters.verificado);
        }
        
        return filtered;
    }
}

// ================================================
// ESTATÍSTICAS DOS DEPOIMENTOS
// ================================================

class DepoimentosStats {
    constructor(depoimentos) {
        this.depoimentos = depoimentos;
    }
    
    getOverallStats() {
        const total = this.depoimentos.length;
        const averageRating = this.getAverageRating();
        const ratingDistribution = this.getRatingDistribution();
        const treatmentStats = this.getTreatmentStats();
        const unidadeStats = this.getUnidadeStats();
        
        return {
            total,
            averageRating,
            ratingDistribution,
            treatmentStats,
            unidadeStats
        };
    }
    
    getAverageRating() {
        const total = this.depoimentos.reduce((sum, dep) => sum + dep.rating, 0);
        return Number((total / this.depoimentos.length).toFixed(1));
    }
    
    getRatingDistribution() {
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        this.depoimentos.forEach(dep => {
            distribution[dep.rating]++;
        });
        return distribution;
    }
    
    getTreatmentStats() {
        const stats = {};
        this.depoimentos.forEach(dep => {
            stats[dep.tratamento] = (stats[dep.tratamento] || 0) + 1;
        });
        return stats;
    }
    
    getUnidadeStats() {
        const stats = {};
        this.depoimentos.forEach(dep => {
            stats[dep.unidade] = (stats[dep.unidade] || 0) + 1;
        });
        return stats;
    }
}

// ================================================
// EXPORTAR E INICIALIZAR
// ================================================

// Aguardar DOM e inicializar
document.addEventListener('DOMContentLoaded', () => {
    // Criar instância global do manager
    window.DepoimentosManager = new DepoimentosManager();
    
    // Criar instância das estatísticas
    window.DepoimentosStats = new DepoimentosStats(DEPOIMENTOS_DATA);
    
    // Log das estatísticas para debug
    console.log('Estatísticas dos Depoimentos:', window.DepoimentosStats.getOverallStats());
});

// Exportar dados para uso externo
window.DEPOIMENTOS_DATA = DEPOIMENTOS_DATA;