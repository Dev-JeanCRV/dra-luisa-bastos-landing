// ================================================
// VALIDAÇÃO E GERENCIAMENTO DO FORMULÁRIO
// ================================================

class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.fields = {};
        this.validators = {};
        this.isSubmitting = false;
        
        this.init();
    }
    
    init() {
        if (!this.form) {
            console.error('Formulário não encontrado');
            return;
        }
        
        this.setupFields();
        this.setupValidators();
        this.setupEventListeners();
        this.updateSubmitButton();
    }
    
    setupFields() {
        // Mapear todos os campos do formulário
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            this.fields[input.name] = {
                element: input,
                errorElement: document.getElementById(`${input.id}-error`),
                required: input.hasAttribute('required'),
                type: input.type || 'text',
                value: '',
                isValid: false,
                errors: []
            };
        });
    }
    
    setupValidators() {
        // Definir regras de validação para cada campo
        this.validators = {
            nome: [
                {
                    test: (value) => value.trim().length >= 2,
                    message: 'Nome deve ter pelo menos 2 caracteres'
                },
                {
                    test: (value) => /^[a-zA-ZÀ-ÿ\s]+$/.test(value.trim()),
                    message: 'Nome deve conter apenas letras e espaços'
                }
            ],
            
            telefone: [
                {
                    test: (value) => Utils.isValidPhone(value),
                    message: 'Digite um telefone válido (ex: 21999999999)'
                }
            ],
            
            email: [
                {
                    test: (value) => value === '' || Utils.isValidEmail(value),
                    message: 'Digite um email válido'
                }
            ],
            
            mensagem: [
                {
                    test: (value) => value.trim().length >= 10,
                    message: 'Mensagem deve ter pelo menos 10 caracteres'
                },
                {
                    test: (value) => value.trim().length <= 500,
                    message: 'Mensagem deve ter no máximo 500 caracteres'
                }
            ]
        };
    }
    
    setupEventListeners() {
        // Validação em tempo real
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            
            // Validar ao sair do campo
            field.element.addEventListener('blur', () => {
                this.validateField(fieldName);
                this.updateSubmitButton();
            });
            
            // Limpar erros ao digitar
            field.element.addEventListener('input', () => {
                this.clearFieldError(fieldName);
                
                // Validação em tempo real para alguns campos
                if (['email', 'telefone'].includes(fieldName)) {
                    Utils.debounce(() => {
                        this.validateField(fieldName);
                        this.updateSubmitButton();
                    }, 500)();
                } else {
                    this.updateSubmitButton();
                }
            });
            
            // Formatação automática para telefone
            if (fieldName === 'telefone') {
                field.element.addEventListener('input', (e) => {
                    e.target.value = this.formatPhoneInput(e.target.value);
                });
            }
        });
        
        // Submit do formulário
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Escutar mudanças nos campos para atualizar botão
        this.form.addEventListener('input', () => {
            this.updateSubmitButton();
        });
    }
    
    validateField(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return false;
        
        const value = field.element.value.trim();
        field.value = value;
        field.errors = [];
        
        // Verificar se campo obrigatório está preenchido
        if (field.required && !value) {
            field.errors.push(CONFIG.messages.form.validation.required);
            field.isValid = false;
        } else if (value || field.required) {
            // Aplicar validadores específicos do campo
            const validators = this.validators[fieldName] || [];
            
            validators.forEach(validator => {
                if (!validator.test(value)) {
                    field.errors.push(validator.message);
                }
            });
            
            field.isValid = field.errors.length === 0;
        } else {
            // Campo opcional e vazio
            field.isValid = true;
        }
        
        this.showFieldValidation(fieldName);
        return field.isValid;
    }
    
    validateForm() {
        let isValid = true;
        
        Object.keys(this.fields).forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    showFieldValidation(fieldName) {
        const field = this.fields[fieldName];
        if (!field || !field.errorElement) return;
        
        const input = field.element;
        const errorElement = field.errorElement;
        
        if (field.errors.length > 0) {
            // Mostrar erro
            input.classList.add('error');
            errorElement.textContent = field.errors[0];
            errorElement.classList.add('show');
            errorElement.setAttribute('aria-live', 'polite');
        } else if (field.value !== '' || field.required) {
            // Campo válido
            input.classList.remove('error');
            input.classList.add('valid');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
    
    clearFieldError(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return;
        
        field.element.classList.remove('error');
        if (field.errorElement) {
            field.errorElement.textContent = '';
            field.errorElement.classList.remove('show');
        }
        field.errors = [];
    }
    
    clearAllErrors() {
        Object.keys(this.fields).forEach(fieldName => {
            this.clearFieldError(fieldName);
            this.fields[fieldName].element.classList.remove('valid');
        });
    }
    
    updateSubmitButton() {
        const submitBtn = this.form.querySelector('.btn-submit');
        if (!submitBtn) return;
        
        const hasRequiredFields = this.hasRequiredFieldsFilled();
        const btnText = submitBtn.querySelector('span');
        
        if (hasRequiredFields && !this.isSubmitting) {
            submitBtn.disabled = false;
            submitBtn.classList.add('ready');
            if (btnText) btnText.textContent = 'Enviar Mensagem';
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('ready');
            if (btnText) btnText.textContent = 'Preencha os campos obrigatórios';
        }
    }
    
    hasRequiredFieldsFilled() {
        return Object.values(this.fields).every(field => {
            if (field.required) {
                return field.element.value.trim() !== '';
            }
            return true;
        });
    }
    
    formatPhoneInput(value) {
        // Remover tudo que não é número
        const numbers = value.replace(/\D/g, '');
        
        // Aplicar máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
        if (numbers.length <= 10) {
            return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, (match, p1, p2, p3) => {
                if (p3) return `(${p1}) ${p2}-${p3}`;
                if (p2) return `(${p1}) ${p2}`;
                if (p1) return `(${p1}`;
                return numbers;
            });
        } else {
            return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, (match, p1, p2, p3) => {
                if (p3) return `(${p1}) ${p2}-${p3}`;
                if (p2) return `(${p1}) ${p2}`;
                return numbers;
            });
        }
    }
    
    async handleSubmit() {
        if (this.isSubmitting) return;
        
        // Validar formulário completo
        if (!this.validateForm()) {
            this.showSubmitError('Por favor, corrija os erros nos campos destacados.');
            return;
        }
        
        this.isSubmitting = true;
        this.showSubmitLoading(true);
        
        try {
            // Coletar dados do formulário
            const formData = this.getFormData();
            
            // Enviar formulário (simular por enquanto)
            const success = await this.submitForm(formData);
            
            if (success) {
                this.showSubmitSuccess();
                this.resetForm();
                
                // Analytics
                Analytics.trackFormSubmission('contato');
                
                // Redirecionar para WhatsApp após sucesso
                setTimeout(() => {
                    this.redirectToWhatsApp(formData);
                }, 2000);
            } else {
                this.showSubmitError(CONFIG.messages.form.error);
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            this.showSubmitError(CONFIG.messages.form.error);
        } finally {
            this.isSubmitting = false;
            this.showSubmitLoading(false);
        }
    }
    
    getFormData() {
        const data = {};
        
        Object.keys(this.fields).forEach(fieldName => {
            data[fieldName] = this.fields[fieldName].element.value.trim();
        });
        
        // Adicionar informações extras
        data.timestamp = new Date().toISOString();
        data.source = 'website_form';
        data.userAgent = navigator.userAgent;
        data.url = window.location.href;
        
        return data;
    }
    
    async submitForm(formData) {
        // Simular envio do formulário
        // Em produção, aqui seria feita a requisição para o servidor
        
        try {
            // Simular delay de envio
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simular sucesso (98% de chance)
            const success = Math.random() < 0.98;
            
            if (success) {
                console.log('Formulário enviado com sucesso:', formData);
                
                // Em produção seria algo como:
                // const response = await fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // });
                // return response.ok;
                
                return true;
            } else {
                throw new Error('Falha simulada no envio');
            }
        } catch (error) {
            console.error('Erro no envio:', error);
            return false;
        }
    }
    
    showSubmitLoading(show) {
        const submitBtn = this.form.querySelector('.btn-submit');
        const spinner = submitBtn.querySelector('.loading-spinner');
        const text = submitBtn.querySelector('span');
        const icon = submitBtn.querySelector('i');
        
        if (show) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            if (spinner) spinner.style.display = 'block';
            if (text) text.textContent = 'Enviando...';
            if (icon) icon.style.display = 'none';
        } else {
            submitBtn.classList.remove('loading');
            if (spinner) spinner.style.display = 'none';
            if (icon) icon.style.display = 'inline';
            this.updateSubmitButton();
        }
    }
    
    showSubmitSuccess() {
        Utils.showNotification(CONFIG.messages.form.success, 'success', 5000);
        
        // Efeito visual no botão
        const submitBtn = this.form.querySelector('.btn-submit');
        const text = submitBtn.querySelector('span');
        const icon = submitBtn.querySelector('i');
        
        if (text) text.textContent = 'Mensagem Enviada!';
        if (icon) {
            icon.className = 'fas fa-check';
            icon.style.color = '#28a745';
        }
        
        submitBtn.classList.add('success');
        
        // Efeito de sucesso no formulário
        this.form.classList.add('success');
        
        setTimeout(() => {
            submitBtn.classList.remove('success');
            this.form.classList.remove('success');
        }, 3000);
    }
    
    showSubmitError(message) {
        Utils.showNotification(message, 'error', 5000);
        
        // Efeito visual no botão
        const submitBtn = this.form.querySelector('.btn-submit');
        submitBtn.classList.add('error');
        
        setTimeout(() => {
            submitBtn.classList.remove('error');
        }, 3000);
    }
    
    redirectToWhatsApp(formData) {
        // Determinar qual unidade baseado na seleção ou proximidade
        let whatsappData = CONFIG.contato.whatsapp.nilopolis; // Padrão
        
        if (formData.unidade === 'barra') {
            whatsappData = CONFIG.contato.whatsapp.barra;
        }
        
        // Montar mensagem personalizada
        const mensagem = this.buildWhatsAppMessage(formData);
        
        // Abrir WhatsApp
        const whatsappUrl = Utils.generateWhatsAppURL(whatsappData.numero, mensagem);
        window.open(whatsappUrl, '_blank');
        
        // Analytics
        Analytics.trackWhatsAppClick(formData.unidade || 'nilopolis');
    }
    
    buildWhatsAppMessage(formData) {
        let mensagem = `Olá! Vim através do site e gostaria de agendar uma consulta.\n\n`;
        mensagem += `*Nome:* ${formData.nome}\n`;
        
        if (formData.telefone) {
            mensagem += `*Telefone:* ${formData.telefone}\n`;
        }
        
        if (formData.email) {
            mensagem += `*Email:* ${formData.email}\n`;
        }
        
        if (formData.unidade) {
            const unidadeNome = formData.unidade === 'barra' ? 'Barra da Tijuca' : 'Nilópolis';
            mensagem += `*Unidade preferida:* ${unidadeNome}\n`;
        }
        
        mensagem += `\n*Mensagem:*\n${formData.mensagem}`;
        
        return mensagem;
    }
    
    resetForm() {
        this.form.reset();
        this.clearAllErrors();
        
        // Resetar estado dos campos
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            field.value = '';
            field.isValid = false;
            field.errors = [];
            field.element.classList.remove('valid', 'error');
        });
        
        this.updateSubmitButton();
    }
    
    // Métodos públicos
    getFieldValue(fieldName) {
        return this.fields[fieldName]?.element.value.trim() || '';
    }
    
    setFieldValue(fieldName, value) {
        if (this.fields[fieldName]) {
            this.fields[fieldName].element.value = value;
            this.validateField(fieldName);
            this.updateSubmitButton();
        }
    }
    
    focusFirstErrorField() {
        const firstErrorField = Object.values(this.fields).find(field => 
            field.errors.length > 0
        );
        
        if (firstErrorField) {
            firstErrorField.element.focus();
        }
    }
    
    isFormValid() {
        return Object.values(this.fields).every(field => {
            if (field.required) {
                return field.isValid && field.element.value.trim() !== '';
            }
            return !field.element.value.trim() || field.isValid;
        });
    }
    
    destroy() {
        // Remover event listeners
        Object.values(this.fields).forEach(field => {
            field.element.removeEventListener('blur', () => {});
            field.element.removeEventListener('input', () => {});
        });
        
        this.form.removeEventListener('submit', () => {});
        
        // Limpar referências
        this.fields = {};
        this.validators = {};
    }
}

// ================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar validador do formulário de contato
    const contatoForm = document.getElementById('contato-form');
    if (contatoForm) {
        window.FormValidator = new FormValidator('#contato-form');
        console.log('Validador de formulário inicializado');
    }
});

// Exportar classe
window.FormValidator = FormValidator;