# Phase 0 Research — Modern Theme System

## Decision 1: Tecnologia de estilização

- **Decision**: Adotar Tailwind CSS como base oficial de estilização do frontend.
- **Rationale**: O projeto atual usa estilos inline dispersos; Tailwind permite padronização por design tokens, classes utilitárias consistentes e evolução incremental sem criar um framework próprio de CSS.
- **Alternatives considered**:
  - CSS Modules (rejeitado por exigir maior volume de folhas e convenções adicionais para manter consistência global).
  - Styled Components (rejeitado por adicionar runtime e abstrações desnecessárias para o escopo atual).
  - Manter estilos inline (rejeitado por baixa escalabilidade visual e dificuldade de padronização).

## Decision 2: Modelo de tema e modo escuro

- **Decision**: Implementar dois modos explícitos (`light` e `dark`) com controle manual por toggle e aplicação via classe raiz `dark`.
- **Rationale**: Atende diretamente ao requisito de ativar/desativar dark mode com comportamento previsível e alinhado ao padrão de Tailwind (`darkMode: 'class'`).
- **Alternatives considered**:
  - Dark mode baseado apenas em `prefers-color-scheme` (rejeitado porque não garante controle explícito do usuário).
  - Tema por atributo customizado sem suporte nativo Tailwind (rejeitado por maior complexidade de configuração).

## Decision 3: Persistência de preferência

- **Decision**: Persistir o modo selecionado no `localStorage` com chave única e fallback para `light` quando inválido/ausente.
- **Rationale**: Solução simples, local e suficiente para uso individual sem dependência de backend.
- **Alternatives considered**:
  - Persistência no backend por usuário (rejeitado por ampliar escopo com autenticação/contratos de API).
  - Session storage (rejeitado por não persistir entre sessões).

## Decision 4: Estratégia anti-flicker no carregamento inicial

- **Decision**: Aplicar o modo salvo no bootstrap do frontend antes da primeira pintura perceptível, definindo a classe no elemento raiz.
- **Rationale**: Evita transição visual brusca entre temas ao abrir ou recarregar a aplicação.
- **Alternatives considered**:
  - Aplicar tema apenas após mount do React (rejeitado por risco de flash de tema incorreto).
  - Não tratar flicker (rejeitado por piora perceptível de UX).

## Decision 5: Padronização visual moderna

- **Decision**: Definir conjunto mínimo de tokens (cores de superfície, texto, borda, destaque e estados) e aplicar em componentes principais de tarefas.
- **Rationale**: Garante consistência visual com baixo custo, sem redesign completo de todo o produto.
- **Alternatives considered**:
  - Reestilização completa de todos os componentes secundários nesta fase (rejeitado por escopo alto).
  - Ajustes pontuais sem tokens (rejeitado por risco de inconsistência recorrente).

## Decision 6: Qualidade e validação

- **Decision**: Manter abordagem de validação manual com checklist orientado a cenários de tema, contraste e persistência.
- **Rationale**: Alinhado à constituição vigente (sem obrigatoriedade de testes automatizados na fase inicial).
- **Alternatives considered**:
  - Exigir suíte automatizada completa de UI agora (rejeitado por custo inicial maior que o valor incremental da feature).

## Resolução de clarificações

- Requisito técnico de uso de Tailwind CSS: **resolvido**.
- Requisito funcional de ativar/desativar modo escuro: **resolvido**.
- Estratégia de persistência e fallback da preferência: **resolvido**.
- Estratégia para evitar flicker na carga inicial: **resolvido**.
