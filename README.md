# Silva & Mendes Advocacia — Landing Page

Landing Page institucional de alta performance para escritório de advocacia com dois sócios fundadores.

Projetada com **Zero Dependências de Node.js** (sem `node_modules`, sem bundlers, sem complexidade de compilação), estruturada sob princípios de **Clean Architecture** e equipada com efeitos visuais de alta classe:
- Fundo interativo de **teia gravitacional em Canvas 2D** que se conecta e reage ao cursor do mouse.
- Efeito **Spotlight / Mouse Glow** que ilumina os cards dinamicamente acompanhando o ponteiro.
- Accordion de Perguntas Frequentes (FAQ) 100% nativo em HTML.

---

## 🏛️ Arquitetura dos Arquivos (Clean Architecture)

```
advocacia_lp/
├── index.html                  # Camada de Apresentação / View Semântica
├── css/
│   ├── custom.css              # Estilos globais, tipografia de luxo e canvas
│   └── components.css          # Componentes visuais (cards de vidro, glow e botões)
└── js/
    ├── core/
    │   └── config.js           # Entidades e constantes (física, raio de atração, cores)
    ├── modules/
    │   ├── particle-network.js # Motor de gráficos 2D (Teia de partículas + gravidade com o mouse)
    │   ├── mouse-glow.js       # Iluminação radial dinâmica reativa ao cursor
    │   └── interactions.js     # Interações de UI (scroll do header, feedback de envio)
    └── app.js                  # Ponto de entrada / Orquestrador (ES Modules nativo)
```

---

## 🚀 Como Executar

Não precisa rodar `npm install` nem compilar nada!

### Opção 1: Direto no Navegador
Basta dar **duplo clique** no arquivo `index.html` ou arrastá-lo para a janela do Chrome/Safari/Edge.

### Opção 2: Com qualquer servidor estático local
Se quiser testar com servidor HTTP local (sem Node):
```bash
python3 -m http.server 8000
```
Depois acesse `http://localhost:8000`.
