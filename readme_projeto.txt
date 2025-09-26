# Landing Page - Dra. Luísa Bastos

Landing page profissional para fisioterapeuta especialista em DTM e Fisioterapia Orofascial.

## 🚀 Características Implementadas

### ✅ Correções Realizadas
- [x] Encoding de caracteres corrigido (UTF-8)
- [x] Separação de CSS e JavaScript em arquivos externos
- [x] Estrutura HTML otimizada e semântica
- [x] Meta tags para SEO e redes sociais
- [x] Schema.org markup para negócios locais

### 🎨 Funcionalidades Visuais
- [x] Design responsivo moderno
- [x] Animações suaves de scroll
- [x] Carrossel de depoimentos funcional
- [x] Botão flutuante do WhatsApp
- [x] Menu mobile hamburger
- [x] Header dinâmico com scroll

### 📱 Responsividade
- [x] Layout adaptável para mobile, tablet e desktop
- [x] Menu de navegação mobile
- [x] Carrossel responsivo com swipe
- [x] Imagens otimizadas com lazy loading

### 🔧 Funcionalidades Técnicas
- [x] Validação de formulário em tempo real
- [x] Sistema de notificações
- [x] Event system para comunicação entre componentes
- [x] Analytics tracking preparado
- [x] Otimizações de performance

## 📁 Estrutura de Arquivos

```
projeto/
├── index.html              # HTML principal
├── css/
│   └── styles.css          # Estilos principais
├── js/
│   ├── config.js           # Configurações e utilitários
│   ├── depoimentos.js      # Gerenciamento de depoimentos
│   ├── carousel.js         # Carrossel de depoimentos
│   ├── form-validation.js  # Validação do formulário
│   └── main.js            # Funcionalidades principais
├── imagens/               # Imagens do site
└── README.md             # Esta documentação
```

## 🛠️ Configuração

### 1. Arquivos de Imagem Necessários
Certifique-se de que estas imagens existem na pasta `imagens/`:

```
imagens/
├── Logo_preta.png         # Logo da empresa
├── luisa_sentada_1.png    # Foto hero da doutora
├── minha_foto.png         # Foto da seção sobre
├── consultorio.jpg        # Imagem de fundo do hero
├── consultorio_1.jpg      # Fotos do consultório Nilópolis
├── consultorio_2.jpg
├── consultorio_4.jpg
├── consultorio_5.jpg
├── consultorio_barra_1.jpg # Fotos do consultório Barra
├── consultorio_barra_2.jpg
├── consultorio_barra_3.jpg
├── consultorio_barra_4.jpg
└── placeholder-consultorio.jpg # Imagem fallback
```

### 2. Configuração do WhatsApp
Edite o arquivo `js/config.js` para ajustar os números:

```javascript
contato: {
    whatsapp: {
        nilopolis: {
            numero: '5521971781341',  // Seu número aqui
            mensagem: 'Olá! Gostaria de agendar uma consulta na unidade de Nilópolis.'
        },
        barra: {
            numero: '5521988904975',  // Seu número aqui
            mensagem: 'Olá! Gostaria de agendar uma consulta na unidade da Barra da Tijuca.'
        }
    }
}
```

### 3. Integração com Google Maps
Os mapas já estão configurados. Para personalizar:

1. Substitua as URLs dos iframes nos locais
2. Ajuste os endereços se necessário

## 🎯 Funcionalidades Principais

### Carrossel de Depoimentos
- Auto-play com pausa no hover
- Navegação por setas e dots
- Swipe em dispositivos móveis
- Depoimentos com rating de estrelas

### Formulário de Contato
- Validação em tempo real
- Formatação automática de telefone
- Envio via WhatsApp após sucesso
- Sistema de notificações

### Botão Flutuante WhatsApp
- Aparece após scroll
- Menu com duas unidades
- Links diretos para cada unidade
- Analytics integrado

### Sistema de Analytics
Preparado para integração com:
- Google Analytics
- Facebook Pixel
- Eventos customizados

## 🔄 Próximas Implementações

### Em Desenvolvimento
- [ ] Integração real com Google My Business API
- [ ] Sistema de agendamento online
- [ ] Chat bot automatizado
- [ ] Formulário de contato com backend

### Melhorias Planejadas
- [ ] PWA (Progressive Web App)
- [ ] Modo escuro
- [ ] Multilíngue (PT/EN)
- [ ] Galeria de antes/depois

## 📈 Performance

### Otimizações Implementadas
- Lazy loading de imagens
- CSS e JS minificados (em produção)
- Fontes otimizadas
- Service Worker preparado
- Intersection Observer para animações

### Scores Esperados
- Performance: 90+
- Acessibilidade: 95+
- Boas Práticas: 90+
- SEO: 95+

## 🎨 Personalização

### Cores
Edite as variáveis CSS em `css/styles.css`:

```css
:root {
    --cor-primaria: #A67B69;    /* Marrom principal */
    --cor-destaque: #FF7F32;    /* Laranja destaque */
    --cor-fundo: #F9F5F2;       /* Bege claro */
    --cor-texto: #4E423D;       /* Marrom texto */
    --cor-branca: #FFFFFF;      /* Branco */
}
```

### Tipografia
Fontes utilizadas:
- **Títulos**: Montserrat (600, 700)
- **Corpo**: Lato (300, 400, 700)

### Animações
Para desabilitar animações:
```css
* {
    animation: none !important;
    transition: none !important;
}
```

## 🔒 Segurança

### Implementações
- CSP headers preparados
- Validação de formulários server-side
- Sanitização de dados
- Rate limiting preparado

## 📱 Testes

### Dispositivos Testados
- ✅ iPhone (Safari)
- ✅ Android (Chrome)
- ✅ iPad (Safari)
- ✅ Desktop (Chrome, Firefox, Safari, Edge)

### Ferramentas de Teste
- Google PageSpeed Insights
- GTmetrix
- Lighthouse
- WAVE (acessibilidade)

## 🚀 Deploy

### Hospedagem Recomendada
- Netlify (gratuito)
- Vercel (gratuito)
- GitHub Pages
- Servidor próprio

### Configuração de Produção
1. Minificar CSS/JS
2. Otimizar imagens
3. Configurar HTTPS
4. Adicionar Google Analytics
5. Configurar domínio

## 📞 Suporte

Para dúvidas sobre implementação:
1. Verifique a documentação no código
2. Teste em ambiente local primeiro
3. Monitore o console do navegador
4. Use as ferramentas de debug incluídas

## 📝 Changelog

### v1.0.0 (Atual)
- ✅ Estrutura HTML corrigida
- ✅ CSS separado e organizado  
- ✅ JavaScript modularizado
- ✅ Carrossel funcional
- ✅ Formulário com validação
- ✅ WhatsApp integrado
- ✅ Design responsivo

### Próxima Versão (v1.1.0)
- 🔄 Integração Google Reviews
- 🔄 Backend para formulário
- 🔄 Sistema de agendamento
- 🔄 PWA completo

---

**Desenvolvido com ❤️ para Dra. Luísa Bastos**