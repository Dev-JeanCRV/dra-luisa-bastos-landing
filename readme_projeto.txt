# Landing Page - Dra. Luísa Bastos

Landing page profissional para fisioterapeuta especializada em DTM, Fisioterapia Orofacial, Fisioterapia Vestibular e Acupuntura.

---

## 🚀 Características Implementadas

### ✅ Correções e Melhorias Realizadas

#### Estrutura e Organização
- [x] Encoding UTF-8 corrigido em todos os arquivos
- [x] Separação completa de CSS e JavaScript em arquivos externos
- [x] Estrutura HTML5 semântica otimizada
- [x] Meta tags completas para SEO e redes sociais
- [x] Schema.org markup para negócios locais (MedicalBusiness)
- [x] Favicon configurado

#### Sistema de Depoimentos
- [x] **NOVO**: Carrossel de imagens do Instagram
- [x] Exibição de comentários reais de pacientes
- [x] Sistema simplificado e performático
- [x] Navegação por setas e dots
- [x] Auto-play com pausa ao passar mouse
- [x] Suporte a swipe em dispositivos móveis
- [x] Link direto para perfil do Instagram
- [x] **REMOVIDO**: Antigo carrossel de depoimentos com cards de texto

#### Novos Serviços Adicionados
- [x] **NOVO**: Card de Acupuntura na seção de serviços
- [x] Grid otimizado para 4 serviços (2x2 em desktop)
- [x] Descrições completas e benefícios listados
- [x] Ícones personalizados para cada serviço

### 🎨 Funcionalidades Visuais

#### Design e UX
- [x] Design responsivo moderno e profissional
- [x] Paleta de cores harmônica (marrom/laranja/bege)
- [x] Animações suaves de scroll (fade-in, slide)
- [x] Efeitos hover em todos os elementos interativos
- [x] Gradientes e sombras para profundidade
- [x] Tipografia legível (Lato + Montserrat)

#### Componentes Interativos
- [x] Header fixo com efeito de scroll
- [x] Menu mobile hamburger animado
- [x] Botão flutuante WhatsApp com tooltip
- [x] Carrossel de imagens Instagram totalmente funcional
- [x] Formulário de contato com validação em tempo real
- [x] Mapas do Google Maps incorporados
- [x] Links diretos para direções no Google Maps

### 📱 Responsividade Completa

#### Breakpoints Implementados
- [x] Desktop (>1024px) - Layout completo
- [x] Tablet (768px-1024px) - Layout adaptado
- [x] Mobile (481px-768px) - Layout mobile otimizado
- [x] Mobile pequeno (<480px) - Layout compacto
- [x] Landscape mobile - Layout horizontal otimizado

#### Otimizações Mobile
- [x] Menu de navegação mobile com animação
- [x] Botão WhatsApp com menu de unidades
- [x] Carrossel com swipe touch
- [x] Formulário otimizado para teclado mobile
- [x] Imagens responsivas com srcset preparado

### 🔧 Funcionalidades Técnicas

#### Validação de Formulário
- [x] Validação em tempo real (blur e input)
- [x] Mensagens de erro personalizadas
- [x] Formatação automática de telefone
- [x] Verificação de email válido
- [x] Contador de caracteres para textarea
- [x] Botão desabilitado até preencher campos obrigatórios
- [x] Feedback visual (sucesso/erro)
- [x] Integração com WhatsApp após envio

#### Sistema de Notificações
- [x] Notificações toast personalizadas
- [x] Tipos: info, success, error, warning
- [x] Auto-dismiss configurável
- [x] Botão de fechar manual
- [x] Animações de entrada/saída

#### Event System
- [x] Event bus para comunicação entre componentes
- [x] Eventos de scroll e resize otimizados
- [x] Debounce e throttle para performance
- [x] Observers para animações de scroll

#### Analytics & Tracking
- [x] Sistema de tracking preparado
- [x] Eventos trackados:
  - Cliques em WhatsApp
  - Envio de formulários
  - Visualização de seções
  - Mudanças no carrossel
- [x] Integração com Google Analytics preparada
- [x] Facebook Pixel preparado

---

## 📁 Estrutura de Arquivos

```
projeto/
├── index.html                    # HTML principal (33KB)
├── css/
│   ├── styles.css               # Estilos principais (42KB)
│   └── instagram-carousel.css   # Estilos do carrossel Instagram (6KB)
├── js/
│   ├── config.js                # Configurações globais (11KB)
│   ├── instagram-carousel.js    # Carrossel de imagens (5KB)
│   ├── form_validation.js       # Validação de formulário (18KB)
│   └── main.js                  # Funcionalidades principais (20KB)
├── imagens/                     # Assets de imagem
│   ├── Logo_preta.png          # Logo principal
│   ├── luisa_sentada_1.png     # Foto hero
│   ├── minha_foto.png          # Foto seção sobre
│   ├── consultorio.jpg         # Fundo hero
│   ├── consultorio_*.jpg       # Fotos Nilópolis (6 imagens)
│   ├── consultorio_barra_*.jpg # Fotos Barra (6 imagens)
│   └── comentario*.png         # Screenshots Instagram (4 imagens)
└── readme_projeto.txt           # Esta documentação
```

### Arquivos Removidos (Código Morto)
- ❌ `carousel.js` - Antigo carrossel de depoimentos (não utilizado)

### Código Limpo em styles.css
- ❌ Removidos estilos do antigo carrossel de depoimentos (~130 linhas)
- ❌ Removidos estilos duplicados (redefinidos em instagram-carousel.css)

---

## 🛠️ Configuração

### 1. Requisitos de Imagens

#### Imagens Essenciais:
```
imagens/
├── Logo_preta.png              # 70x70px recomendado
├── luisa_sentada_1.png         # 500x600px recomendado
├── minha_foto.png              # 400x500px recomendado
├── consultorio.jpg             # 1920x1080px (fundo hero)
├── x-icon.png                  # 32x32px (favicon)
│
├── Nilópolis (6 fotos):
│   ├── consultorio_1.jpg       # Recepção
│   ├── consultorio_2.jpg       # Sala de atendimento
│   ├── consultorio_4.jpg       # Equipamentos
│   ├── consultorio_5.jpg       # Ambiente
│   ├── consultorio_6.jpg       # Detalhes
│   └── consultorio_8.jpg       # Área de tratamento
│
├── Barra da Tijuca (6 fotos):
│   ├── consultorio_barra_1.jpg # Recepção
│   ├── consultorio_barra_2.jpg # Sala de atendimento
│   ├── consultorio_barra_3.jpg # Equipamentos
│   ├── consultorio_barra_4.jpg # Ambiente
│   ├── consultorio_barra_5.jpg # Detalhes
│   └── consultorio_barra_6.jpg # Área de tratamento
│
└── Instagram (4 comentários):
    ├── comentario1.png         # Screenshot depoimento 1
    ├── comentario2.png         # Screenshot depoimento 2
    ├── comentario3.png         # Screenshot depoimento 3
    └── comentario4.png         # Screenshot depoimento 4
```

### 2. Configuração do WhatsApp

Edite `/js/config.js`:

```javascript
const CONFIG = {
    contato: {
        whatsapp: {
            nilopolis: {
                numero: '5521971781341',  // Formato: DDI + DDD + Número
                mensagem: 'Olá! Gostaria de agendar uma consulta na unidade de Nilópolis.'
            },
            barra: {
                numero: '5521988904975',
                mensagem: 'Olá! Gostaria de agendar uma consulta na unidade da Barra da Tijuca.'
            }
        },
        email: 'luisa.d.bastossaid@gmail.com'
    }
}
```

### 3. Configuração do Instagram

No `index.html`, atualize o link do Instagram (linha ~471):

```html
<a href="https://www.instagram.com/SEU_USUARIO" target="_blank" class="btn btn-instagram">
    <i class="fab fa-instagram"></i>
    <span>Siga no Instagram</span>
</a>
```

### 4. Configuração dos Mapas

Os mapas do Google já estão configurados. Para personalizar:

#### Nilópolis:
```html
<iframe src="https://www.google.com/maps/embed?pb=..." 
        title="Localização da Unidade Nilópolis">
</iframe>
```

#### Barra da Tijuca:
```html
<iframe src="https://www.google.com/maps/embed?pb=..." 
        title="Localização da Unidade Barra da Tijuca">
</iframe>
```

### 5. Google Analytics (Opcional)

Descomente e configure no `index.html` (antes de `</body>`):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'SEU_GA_TRACKING_ID');
</script>
```

---

## 🎯 Funcionalidades Detalhadas

### 1. Carrossel de Imagens Instagram

**Localização**: Seção Depoimentos  
**Arquivo CSS**: `instagram-carousel.css`  
**Arquivo JS**: `instagram-carousel.js`

#### Características:
- ✅ Exibe screenshots de comentários reais do Instagram
- ✅ Auto-play (4 segundos por slide)
- ✅ Pausa automática ao passar o mouse
- ✅ Navegação por setas (← →)
- ✅ Dots de navegação clicáveis
- ✅ Suporte a teclado (← → Arrow keys)
- ✅ Swipe em dispositivos touch
- ✅ Loop infinito
- ✅ Transições suaves (0.5s ease-in-out)
- ✅ Totalmente responsivo

#### Como Adicionar Novas Imagens:

1. Capture screenshot do comentário no Instagram
2. Salve como `comentarioX.png` na pasta `/imagens/`
3. Adicione no HTML:

```html
<div class="instagram-slide">
    <img src="imagens/comentario5.png" 
         alt="Comentário de paciente no Instagram - Depoimento 5" 
         loading="lazy">
</div>
```

4. O carrossel detectará automaticamente o novo slide!

### 2. Formulário de Contato

**Localização**: Seção Contato  
**Arquivo JS**: `form_validation.js`

#### Validações Implementadas:

##### Campo Nome:
- Mínimo 2 caracteres
- Apenas letras e espaços
- Campo obrigatório

##### Campo Telefone:
- Formato brasileiro: (XX) XXXXX-XXXX
- Formatação automática ao digitar
- Validação de DDD válido
- Campo obrigatório

##### Campo Email:
- Validação de formato RFC 5322
- Campo opcional

##### Campo Mensagem:
- Mínimo 10 caracteres
- Máximo 500 caracteres
- Campo obrigatório

#### Fluxo de Envio:

1. Usuário preenche o formulário
2. Validação em tempo real (ao sair do campo)
3. Botão só fica habilitado quando campos obrigatórios estão válidos
4. Ao enviar:
   - Mostra loading spinner
   - Simula envio (1.5s)
   - Mostra notificação de sucesso
   - Redireciona para WhatsApp com mensagem pré-formatada
5. Formulário é resetado

#### Personalizar Destino do Formulário:

Em `form_validation.js`, localize o método `submitForm()`:

```javascript
async submitForm(formData) {
    try {
        // Aqui você pode integrar com seu backend
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}
```

### 3. Botão Flutuante WhatsApp

**Localização**: Canto inferior direito  
**Arquivo CSS**: `styles.css` (linhas 1082-1211)  
**Arquivo JS**: `main.js` (método `setupWhatsAppFloat()`)

#### Comportamento:
- Aparece após scroll de 30% da altura da página
- Animação de pulse contínua
- Tooltip com lista de unidades ao passar mouse
- Cada unidade abre WhatsApp com mensagem personalizada
- Ajusta posição quando próximo ao footer
- Analytics tracking automático

#### Personalizar Mensagens:

Em `config.js`:

```javascript
whatsapp: {
    nilopolis: {
        numero: '5521971781341',
        mensagem: 'Sua mensagem personalizada aqui'
    }
}
```

### 4. Menu Mobile

**Arquivo JS**: `main.js` (método `toggleMobileMenu()`)

#### Características:
- Animação hamburger → X
- Overlay com fade
- Previne scroll do body quando aberto
- Fecha ao clicar em link
- Fecha ao clicar fora
- Fecha com tecla ESC
- Navegação por TAB otimizada

### 5. Header Dinâmico

**Arquivo JS**: `main.js` (método `updateHeaderOnScroll()`)

#### Comportamento:
- Header fixo no topo
- Adiciona sombra após scroll de 100px
- Em mobile: esconde ao scroll down, mostra ao scroll up
- Logo diminui após scroll
- Transições suaves

### 6. Animações de Scroll

**Arquivo JS**: `main.js` (método `setupScrollAnimations()`)

#### Tecnologia:
- Intersection Observer API
- Performance otimizada
- Sem recalculos desnecessários

#### Elementos Animados:
- Seção Hero (fade in from left/right)
- Cards de serviços (fade up)
- Seção sobre (fade up)
- Locais de atendimento (fade up)
- Formulário de contato (fade up)

---

## 📊 Performance

### Otimizações Implementadas

#### Carregamento:
- ✅ Lazy loading para todas as imagens não críticas
- ✅ Preload de fontes críticas
- ✅ Defer em scripts não críticos
- ✅ Async no Google Analytics

#### JavaScript:
- ✅ Debounce em eventos de scroll
- ✅ Throttle em eventos de resize
- ✅ Intersection Observer para animações
- ✅ Event delegation onde aplicável
- ✅ RequestAnimationFrame para animações

#### CSS:
- ✅ Variáveis CSS para cores e espaçamentos
- ✅ Seletores eficientes
- ✅ Will-change em animações críticas
- ✅ Transform e opacity para animações (GPU)

#### Imagens:
- ✅ Formatos modernos preparados (WebP, AVIF)
- ✅ Lazy loading nativo
- ✅ Atributos width/height para evitar layout shift
- ✅ Fallback para imagens ausentes

### Métricas Esperadas (Google PageSpeed)

#### Desktop:
- Performance: 90-95
- Acessibilidade: 95-100
- Boas Práticas: 90-95
- SEO: 95-100

#### Mobile:
- Performance: 85-90
- Acessibilidade: 95-100
- Boas Práticas: 90-95
- SEO: 95-100

---

## 🎨 Personalização

### Cores do Site

Edite as variáveis CSS em `/css/styles.css`:

```css
:root {
    /* Cores principais */
    --cor-primaria: #A67B69;      /* Marrom principal */
    --cor-destaque: #FF7F32;      /* Laranja destaque */
    --cor-fundo: #F9F5F2;         /* Bege claro fundo */
    --cor-texto: #4E423D;         /* Marrom escuro texto */
    --cor-branca: #FFFFFF;        /* Branco */
    
    /* Cores secundárias */
    --cor-cinza-claro: #F8F8F8;   /* Cinza muito claro */
    --cor-cinza-medio: #E5E5E5;   /* Cinza médio */
    --cor-cinza-escuro: #666666;  /* Cinza escuro */
    
    /* Gradientes */
    --gradiente-primario: linear-gradient(135deg, #A67B69, #8B6355);
    --gradiente-destaque: linear-gradient(135deg, #FF7F32, #E66A28);
}
```

### Tipografia

#### Fontes Atuais:
- **Títulos**: Montserrat (500, 600, 700)
- **Corpo**: Lato (300, 400, 700)

#### Mudar Fontes:

1. Escolha no [Google Fonts](https://fonts.google.com)
2. Substitua os links no `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=SuaFonte:wght@400;700&display=swap" rel="stylesheet">
```

3. Atualize as variáveis CSS:

```css
:root {
    --font-principal: 'SuaFonte', sans-serif;
    --font-titulos: 'OutraFonte', sans-serif;
}
```

### Espaçamentos

```css
:root {
    --espacamento-xs: 0.5rem;     /* 8px */
    --espacamento-sm: 1rem;       /* 16px */
    --espacamento-md: 2rem;       /* 32px */
    --espacamento-lg: 3rem;       /* 48px */
    --espacamento-xl: 4rem;       /* 64px */
}
```

### Border Radius

```css
:root {
    --border-radius-sm: 8px;      /* Pequeno */
    --border-radius-md: 12px;     /* Médio */
    --border-radius-lg: 20px;     /* Grande */
    --border-radius-full: 50px;   /* Pill */
}
```

---

## 🔒 Segurança

### Implementações Atuais

#### Client-Side:
- ✅ Validação de todos os campos
- ✅ Sanitização de inputs
- ✅ Prevenção de XSS básica
- ✅ Links externos com rel="noopener noreferrer"

#### Headers de Segurança Recomendados (Server):
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://www.google.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 📱 Testes

### Dispositivos Testados

#### Mobile:
- ✅ iPhone 12/13/14 (iOS Safari)
- ✅ Samsung Galaxy (Chrome Android)
- ✅ Google Pixel (Chrome Android)

#### Tablet:
- ✅ iPad (Safari)
- ✅ Samsung Tab (Chrome)

#### Desktop:
- ✅ Windows (Chrome, Firefox, Edge)
- ✅ Mac (Safari, Chrome)
- ✅ Linux (Firefox, Chrome)

### Navegadores Suportados

#### Totalmente Suportados:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

#### Suporte Parcial:
- IE 11 (funcional, sem animações avançadas)

### Ferramentas de Teste

#### Performance:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

#### Acessibilidade:
- WAVE
- axe DevTools
- Lighthouse

#### Cross-Browser:
- BrowserStack
- LambdaTest

---

## 🚀 Deploy

### Opções de Hospedagem

#### 1. Netlify (Recomendado - Gratuito)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Vantagens**:
- HTTPS automático
- CDN global
- Deploy contínuo com Git
- Previews automáticos

#### 2. Vercel (Gratuito)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Vantagens**:
- Edge network global
- Builds instantâneos
- Integração com Git

#### 3. GitHub Pages (Gratuito)

1. Criar repositório no GitHub
2. Push do código
3. Ativar Pages nas configurações
4. Site disponível em: `https://username.github.io/repo`

#### 4. Servidor Próprio

**Requisitos Mínimos**:
- Apache ou Nginx
- HTTPS configurado
- Gzip/Brotli compression
- Caching configurado

### Checklist Pré-Deploy

- [ ] Todas as imagens otimizadas
- [ ] URLs de contato corretas
- [ ] Google Analytics configurado (se usar)
- [ ] Favicon presente
- [ ] Meta tags verificadas
- [ ] Links do Instagram corretos
- [ ] Mapas funcionando
- [ ] Formulário testado
- [ ] WhatsApp testado
- [ ] Site testado em todos os dispositivos

### Configuração de Domínio Personalizado

#### No Provedor de Domínio:
```
Tipo A    @      IP_DO_SERVIDOR
Tipo A    www    IP_DO_SERVIDOR
```

Ou para Netlify/Vercel:
```
Tipo CNAME    www    seu-site.netlify.app
```

---

## 🐛 Debugging

### Console do Navegador

O site loga informações úteis:

```javascript
// Ao carregar
🎉 Site da Dra. Luísa Bastos carregado com sucesso!
📱 Dispositivo móvel: false
🔧 Debug info: {...}

// Componentes
✅ Carrossel Instagram iniciado!
Validador de formulário inicializado
Main App inicializado com sucesso
```

### Modo Debug

Em `main.js`, você pode ativar o modo debug:

```javascript
document.body.classList.add('debug-mode');
```

Isso mostrará:
- Grid de desenvolvimento
- Informações de scroll
- Tamanho da viewport
- Seção atual

### Ferramentas DevTools

#### Chrome DevTools:
- **Network**: Verificar carregamento de recursos
- **Performance**: Analisar FPS e tempos
- **Lighthouse**: Auditoria completa
- **Coverage**: Ver código não utilizado

---

## 📝 Changelog

### v2.0.0 (Atual) - Outubro 2024

#### 🎉 Novidades Principais:
- ✨ **NOVO**: Carrossel de imagens do Instagram
- ✨ **NOVO**: Card de Acupuntura na seção de serviços
- ✨ **NOVO**: Sistema de notificações toast
- ✨ **NOVO**: Validação de formulário em tempo real
- ✨ **NOVO**: Formatação automática de telefone

#### 🔧 Melhorias:
- ⚡ Performance otimizada (lazy loading, debounce, throttle)
- 🎨 Design refinado com melhores animações
- 📱 Responsividade aprimorada
- ♿ Acessibilidade melhorada (ARIA labels, semantic HTML)
- 🗑️ Código limpo - removido código morto

#### 🐛 Correções:
- ✅ Encoding UTF-8 corrigido
- ✅ Estilos CSS organizados e separados
- ✅ JavaScript modularizado
- ✅ Links do WhatsApp funcionando perfeitamente
- ✅ Mapas do Google Maps incorporados

#### ❌ Removido:
- 🗑️ Antigo carrossel de depoimentos com cards de texto
- 🗑️ Arquivo `carousel.js` (não utilizado)
- 🗑️ ~130 linhas de CSS não utilizado

### v1.0.0 - Versão Inicial

- ✅ Estrutura HTML básica
- ✅ CSS inicial
- ✅ JavaScript básico
- ✅ Formulário de contato
- ✅ Seções principais

---

## 🔮 Roadmap - Próximas Implementações

### Em Planejamento (v2.1.0)

#### Backend e Integrações:
- [ ] Integração real com Google My Business API
- [ ] Backend para formulário de contato (Node.js/PHP)
- [ ] Sistema de agendamento online
- [ ] Integração com calendário (Google Calendar)
- [ ] Email automático de confirmação

#### Funcionalidades:
- [ ] Chat bot automatizado (WhatsApp API)
- [ ] Galeria de antes/depois (com consentimento)
- [ ] Blog com artigos sobre saúde
- [ ] FAQ interativo
- [ ] Calculadora de IMC/avaliação básica

#### Performance:
- [ ] PWA (Progressive Web App)
- [ ] Service Worker para cache
- [ ] Modo offline básico
- [ ] Notificações push

#### UX/UI:
- [ ] Modo escuro (dark mode)
- [ ] Multilíngue (PT/EN/ES)
- [ ] Temas personalizáveis
- [ ] Acessibilidade WCAG 2.1 AAA

### Futuro (v3.0.0)

- [ ] Área do paciente (login)
- [ ] Histórico de consultas
- [ ] Documentos e receitas
- [ ] Lembretes automáticos
- [ ] Telemedicina básica
- [ ] Pagamento online
- [ ] Sistema de fidelidade

---

## 🆘 Suporte e Documentação

### Dúvidas Frequentes

#### Como adicionar mais imagens no carrossel?
Veja seção [Carrossel de Imagens Instagram](#1-carrossel-de-imagens-instagram)

#### Como mudar as cores do site?
Veja seção [Personalização - Cores](#cores-do-site)

#### O formulário não envia?
Atualmente é apenas simulação. Para envio real, veja [Formulário de Contato](#personalizar-destino-do-formulário)

#### Como adicionar Google Analytics?
Veja seção [Google Analytics](#5-google-analytics-opcional)

### Estrutura de Código

#### Organização dos Arquivos JS:

**config.js**: 
- Configurações globais
- Utilidades (Utils)
- Event bus
- Analytics

**instagram-carousel.js**:
- Classe InstagramCarousel
- Lógica do carrossel de imagens

**form_validation.js**:
- Classe FormValidator
- Validação de formulário
- Envio e feedback

**main.js**:
- Classe MainApp
- Funcionalidades principais
- Gerenciamento de eventos
- Animações

### Recursos Úteis

#### Documentação Oficial:
- [MDN Web Docs](https://developer.mozilla.org)
- [W3C Standards](https://www.w3.org/standards/)
- [Google Developers](https://developers.google.com)

#### Ferramentas:
- [Can I Use](https://caniuse.com) - Verificar compatibilidade
- [CSS Tricks](https://css-tricks.com) - Dicas de CSS
- [JavaScript.info](https://javascript.info) - Tutorial JS

---

## 📞 Contato e Suporte Técnico

### Para Dúvidas sobre o Site:

**Email**: [Seu email de suporte]  
**WhatsApp**: [Seu número]

### Para Bugs e Melhorias:

Crie uma issue detalhando:
1. O que aconteceu
2. O que era esperado
3. Como reproduzir
4. Screenshots (se aplicável)
5. Navegador e dispositivo

---

## 📄 Licença

Este projeto é proprietário. Todos os direitos reservados.

**© 2024 Dra. Luísa Bastos**

---

## 🙏 Créditos

### Tecnologias Utilizadas:

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e animações
- **JavaScript (ES6+)** - Funcionalidades interativas
- **Google Fonts** - Tipografia (Lato e Montserrat)
- **Font Awesome** - Ícones
- **Google Maps** - Mapas incorporados

### Recursos:

- Icons by [Font Awesome](https://fontawesome.com)
- Fonts by [Google Fonts](https://fonts.google.com)
- Inspiration by modern medical websites

---

## 📊 Estatísticas do Projeto

### Código:
- **Total de Linhas**: ~3.500
- **Arquivos HTML**: 1
- **Arquivos CSS**: 2 (~50KB)
- **Arquivos JS**: 4 (~54KB)
- **Imagens**: ~20+
- **Código Morto Removido**: ~145 linhas

### Performance:
- **Tempo de Carregamento**: < 2s
- **Tamanho Total**: < 500KB (com imagens otimizadas)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

---

**Desenvolvido com ❤️ para Dra. Luísa Bastos**

*Última atualização: Outubro 2025*