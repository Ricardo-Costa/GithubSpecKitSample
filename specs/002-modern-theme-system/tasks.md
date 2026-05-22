# Tasks: Modern Theme System

**Input**: Design documents from `/specs/002-modern-theme-system/`

**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md) (required), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/theme-ui-contract.md](./contracts/theme-ui-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Testes automatizados não foram solicitados nesta feature. A validação será manual conforme [quickstart.md](./quickstart.md).

**Organization**: Tasks agrupadas por user story para permitir implementação e validação independentes.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar Tailwind CSS e base de estilos global do frontend.

- [X] T001 Instalar Tailwind CSS, PostCSS e Autoprefixer em frontend/package.json
- [X] T002 Criar configuração do Tailwind em frontend/tailwind.config.ts
- [X] T003 [P] Criar configuração do PostCSS em frontend/postcss.config.js
- [X] T004 [P] Criar folha de estilos global com diretivas Tailwind em frontend/src/styles/index.css
- [X] T005 Atualizar import de estilos globais no bootstrap em frontend/src/main.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Construir infraestrutura de tema (domínio, provider e contrato de aplicação no DOM) que bloqueia todas as histórias.

**⚠️ CRITICAL**: Nenhuma implementação de user story começa antes desta fase.

- [X] T006 Criar tipos de tema e domínio light/dark em frontend/src/theme/theme-types.ts
- [X] T007 [P] Criar utilitários de persistência e validação de preferência em frontend/src/theme/theme-storage.ts
- [X] T008 Implementar provider/contexto de tema com sincronização da classe `dark` no HTML em frontend/src/theme/theme-provider.tsx
- [X] T009 [P] Criar hook de consumo de tema para UI em frontend/src/theme/use-theme.ts
- [X] T010 Integrar ThemeProvider no bootstrap da aplicação em frontend/src/main.tsx
- [X] T011 Registrar contrato técnico de key e fallback no módulo de tema em frontend/src/theme/theme-provider.tsx

**Checkpoint**: Fundação pronta — histórias podem iniciar.

---

## Phase 3: User Story 1 - Trocar tema da interface (Priority: P1) 🎯 MVP

**Goal**: Permitir ao usuário ativar/desativar modo escuro explicitamente, com mudança imediata na interface.

**Independent Test**: Abrir a tela principal, acionar toggle de tema e confirmar mudança visual instantânea sem perder conteúdo em formulário.

### Implementation for User Story 1

- [X] T012 [US1] Criar componente de alternância light/dark em frontend/src/theme/theme-toggle.tsx
- [X] T013 [US1] Integrar controle de tema no cabeçalho da página de tarefas em frontend/src/pages/tasks-page.tsx
- [X] T014 [US1] Refatorar container principal para classes Tailwind e suporte dark em frontend/src/pages/tasks-page.tsx
- [X] T015 [US1] Garantir atualização imediata do modo ao acionar toggle em frontend/src/theme/theme-provider.tsx

**Checkpoint**: US1 funcional e validável de forma independente (MVP).

---

## Phase 4: User Story 2 - Visual consistente em toda a plataforma (Priority: P2)

**Goal**: Padronizar aparência moderna com Tailwind nos fluxos principais de tarefas.

**Independent Test**: Navegar por criação, edição, filtros e listagem confirmando consistência de tipografia, cores, espaçamentos e estados nos dois modos.

### Implementation for User Story 2

- [X] T016 [P] [US2] Reestilizar formulário de criação com tokens e classes Tailwind em frontend/src/features/tasks/components/task-form.tsx
- [X] T017 [P] [US2] Reestilizar formulário de edição com tokens e classes Tailwind em frontend/src/features/tasks/components/task-edit-form.tsx
- [X] T018 [P] [US2] Reestilizar filtros com classes Tailwind e estados visuais em frontend/src/features/tasks/components/task-filters.tsx
- [X] T019 [P] [US2] Reestilizar listagem de tarefas com classes Tailwind em frontend/src/features/tasks/components/task-list.tsx
- [X] T020 [P] [US2] Reestilizar estado vazio da lista em frontend/src/features/tasks/components/task-list-empty-state.tsx
- [X] T021 [P] [US2] Reestilizar seletor de status com variantes light/dark em frontend/src/features/tasks/components/task-status-select.tsx
- [X] T022 [US2] Consolidar tokens de superfície, texto, borda e destaque em frontend/src/styles/index.css

**Checkpoint**: US1 e US2 funcionais e independentes.

---

## Phase 5: User Story 3 - Manter preferência de tema (Priority: P3)

**Goal**: Persistir a escolha de tema entre sessões com fallback seguro.

**Independent Test**: Selecionar modo dark, recarregar e reabrir a app; repetir com modo light; validar recuperação correta e fallback para valor inválido.

### Implementation for User Story 3

- [X] T023 [US3] Persistir modo selecionado no `localStorage` (key `task-management.theme.mode`) em frontend/src/theme/theme-storage.ts
- [X] T024 [US3] Restaurar tema salvo durante bootstrap e aplicar classe raiz antes da primeira pintura em frontend/src/main.tsx
- [X] T025 [US3] Implementar fallback para `light` em valor inválido/ausente de storage em frontend/src/theme/theme-storage.ts
- [X] T026 [US3] Sincronizar estado, DOM e persistência em mudanças de tema em frontend/src/theme/theme-provider.tsx

**Checkpoint**: Todas as histórias independentes funcionais.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalizar documentação e validação transversal.

- [X] T027 [P] Documentar uso de tema e modo escuro no frontend em README.md
- [X] T028 Executar checklist manual final da feature em specs/002-modern-theme-system/quickstart.md
- [X] T029 Ajustar detalhes de acessibilidade visual (contraste/estados de foco) em frontend/src/styles/index.css

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: sem dependências.
- **Phase 2 (Foundational)**: depende da Phase 1 e bloqueia todas as histórias.
- **Phase 3 (US1)**: depende da conclusão da Phase 2.
- **Phase 4 (US2)**: depende da conclusão da Phase 2 (pode iniciar em paralelo com US1 se houver equipe).
- **Phase 5 (US3)**: depende da conclusão da Phase 2 (pode iniciar em paralelo com US1/US2, mas normalmente após US1 para validar toggle).
- **Phase 6 (Polish)**: depende das histórias que entrarem no escopo de entrega.

### User Story Dependencies

- **US1 (P1)**: sem dependência de outras histórias.
- **US2 (P2)**: independente, usa mesma base de tema da fase foundational.
- **US3 (P3)**: independente, usa mesma base de tema da fase foundational.

### Suggested Completion Order

1. Setup + Foundational
2. US1 (MVP)
3. US2
4. US3
5. Polish

---

## Parallel Opportunities

- **Setup**: T003 e T004 em paralelo após T001.
- **Foundational**: T007 e T009 em paralelo após T006.
- **US2**: T016–T021 em paralelo (arquivos diferentes).
- **Polish**: T027 e T029 em paralelo.

---

## Parallel Example: User Story 1

- T012 em frontend/src/theme/theme-toggle.tsx
- T014 em frontend/src/pages/tasks-page.tsx

---

## Parallel Example: User Story 2

- T016 em frontend/src/features/tasks/components/task-form.tsx
- T017 em frontend/src/features/tasks/components/task-edit-form.tsx
- T018 em frontend/src/features/tasks/components/task-filters.tsx
- T019 em frontend/src/features/tasks/components/task-list.tsx
- T020 em frontend/src/features/tasks/components/task-list-empty-state.tsx
- T021 em frontend/src/features/tasks/components/task-status-select.tsx

---

## Parallel Example: User Story 3

- T024 em frontend/src/main.tsx
- T025 em frontend/src/theme/theme-storage.ts

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Concluir Phase 1 (Setup)
2. Concluir Phase 2 (Foundational)
3. Concluir Phase 3 (US1)
4. Validar cenários A–C do quickstart
5. Demonstrar entrega MVP

### Incremental Delivery

1. Base pronta (Phase 1 + 2)
2. Entregar US1 (toggle light/dark)
3. Entregar US2 (padronização visual moderna)
4. Entregar US3 (persistência e fallback)
5. Fechar com Polish

### Parallel Team Strategy

1. Time fecha Setup + Foundational
2. Depois divide:
   - Dev A: US1
   - Dev B: US2
   - Dev C: US3
3. Integrar em PRs pequenos e validar quickstart por história

---

## Notes

- Todas as tarefas seguem formato checklist obrigatório com ID sequencial.
- Marcador `[P]` usado somente para tarefas realmente paralelizáveis (arquivos distintos).
- Marcador `[USx]` aplicado apenas em fases de user story.
- Cada história permanece testável de forma independente por validação manual.
