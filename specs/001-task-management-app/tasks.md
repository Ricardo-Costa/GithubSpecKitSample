# Tasks: Task Management App

**Input**: Design documents from `/specs/001-task-management-app/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Não incluir testes automatizados nesta versão. Validar manualmente com base em `quickstart.md`.

**Organization**: Tasks agrupadas por user story para implementação e validação independentes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode executar em paralelo (arquivos diferentes, sem dependência direta)
- **[Story]**: User story relacionada (US1, US2, US3)
- Todas as descrições incluem caminhos de arquivo explícitos

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar estrutura frontend/backend e padrões de projeto

- [X] T001 Criar estrutura base de diretórios em backend/src, frontend/src e database/schema.sql
- [X] T002 Inicializar backend TypeScript + Express em backend/package.json
- [X] T003 [P] Configurar TypeScript do backend em backend/tsconfig.json
- [X] T004 Inicializar frontend TypeScript + React em frontend/package.json
- [X] T005 [P] Configurar TypeScript do frontend em frontend/tsconfig.json
- [X] T006 [P] Configurar lint e formatação em backend/.eslintrc.cjs e frontend/.eslintrc.cjs

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Base técnica obrigatória para todas as histórias

**⚠️ CRITICAL**: Nenhuma user story inicia antes desta fase

- [X] T007 Definir schema SQLite da entidade Task em database/schema.sql
- [X] T008 [P] Implementar inicialização e conexão SQLite em backend/src/db/sqlite.ts
- [X] T009 [P] Definir tipos de domínio Task e enums em backend/src/types/task.ts
- [X] T010 [P] Definir validações Zod de payload e filtros em backend/src/validators/task.validator.ts
- [X] T011 Implementar middleware de erro padronizado em backend/src/middlewares/error-handler.ts
- [X] T012 Configurar app Express e middlewares globais em backend/src/app/create-app.ts
- [X] T013 Implementar cliente HTTP base do frontend em frontend/src/services/http-client.ts
- [X] T014 Definir tipos compartilhados do frontend para contrato de API em frontend/src/types/task.ts

**Checkpoint**: Fundação pronta para iniciar user stories

---

## Phase 3: User Story 1 - Criar tarefas do dia a dia (Priority: P1) 🎯 MVP

**Goal**: Permitir criar e visualizar tarefas com título, descrição, data, prioridade e status

**Independent Validation**: Criar tarefa completa pela UI e validar que ela aparece na listagem com todos os campos

### Implementation for User Story 1

- [X] T015 [P] [US1] Implementar repositório para criar e listar tarefas em backend/src/repositories/task.repository.ts
- [X] T016 [US1] Implementar regras de criação de tarefa em backend/src/services/create-task.service.ts
- [X] T017 [US1] Implementar regras de listagem de tarefas em backend/src/services/list-tasks.service.ts
- [X] T018 [US1] Implementar controller de criação/listagem em backend/src/controllers/task.controller.ts
- [X] T019 [US1] Implementar rotas `POST /tasks` e `GET /tasks` em backend/src/routes/task.routes.ts
- [X] T020 [P] [US1] Implementar formulário de criação de tarefa em frontend/src/features/tasks/components/task-form.tsx
- [X] T021 [P] [US1] Implementar serviço de criação e listagem no frontend em frontend/src/features/tasks/services/task-api.ts
- [X] T022 [US1] Implementar página inicial com listagem de tarefas em frontend/src/pages/tasks-page.tsx
- [X] T023 [US1] Implementar validações de formulário e mensagens de erro em frontend/src/features/tasks/utils/task-form-validation.ts
- [X] T024 [US1] Integrar fluxo de criação + atualização da listagem em frontend/src/features/tasks/state/task-reducer.ts

**Checkpoint**: US1 funcional e validável isoladamente

---

## Phase 4: User Story 2 - Acompanhar progresso das tarefas (Priority: P2)

**Goal**: Permitir atualizar status e acompanhar progresso (pendente, em andamento, concluída)

**Independent Validation**: Alterar status de uma tarefa existente e confirmar atualização imediata na listagem

### Implementation for User Story 2

- [X] T025 [US2] Implementar atualização de tarefa por ID no repositório em backend/src/repositories/task.repository.ts
- [X] T026 [US2] Implementar regra de transição de status e `completedAt` em backend/src/services/update-task-status.service.ts
- [X] T027 [US2] Implementar endpoint `PATCH /tasks/:id` em backend/src/routes/task.routes.ts
- [X] T028 [P] [US2] Implementar ações de atualização de status na API frontend em frontend/src/features/tasks/services/task-api.ts
- [X] T029 [P] [US2] Implementar seletor de status na lista de tarefas em frontend/src/features/tasks/components/task-status-select.tsx
- [X] T030 [US2] Integrar atualização de status no estado local da aplicação em frontend/src/features/tasks/state/task-reducer.ts
- [X] T031 [US2] Exibir feedback de sucesso/erro ao atualizar status em frontend/src/features/tasks/components/task-list.tsx

**Checkpoint**: US1 e US2 funcionais e validáveis de forma independente

---

## Phase 5: User Story 3 - Filtrar tarefas para consulta rápida (Priority: P3)

**Goal**: Permitir filtros por prioridade, status e data

**Independent Validation**: Aplicar filtros individualmente e em combinação, validando resultado correto e limpeza de filtros

### Implementation for User Story 3

- [X] T032 [US3] Implementar filtros por query (`priority`, `status`, `date`) no repositório em backend/src/repositories/task.repository.ts
- [X] T033 [US3] Implementar validação de query params de filtros em backend/src/validators/task.validator.ts
- [X] T034 [US3] Ajustar listagem com filtros no serviço em backend/src/services/list-tasks.service.ts
- [X] T035 [P] [US3] Implementar barra de filtros (prioridade/status/data) em frontend/src/features/tasks/components/task-filters.tsx
- [X] T036 [P] [US3] Implementar serialização de filtros na chamada HTTP em frontend/src/features/tasks/services/task-api.ts
- [X] T037 [US3] Integrar estado de filtros e ação de limpar filtros em frontend/src/features/tasks/state/task-reducer.ts
- [X] T038 [US3] Exibir estado vazio quando não houver resultados em frontend/src/features/tasks/components/task-list-empty-state.tsx

**Checkpoint**: Todas as user stories funcionais e validáveis

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Ajustes finais de qualidade, documentação e validação manual fim-a-fim

- [X] T039 [P] Atualizar documentação de execução backend/frontend em README.md
- [X] T040 Ajustar tratamento de erros de integração entre frontend e backend em frontend/src/features/tasks/services/task-api.ts
- [X] T041 Revisar nomenclatura e responsabilidades por módulo em backend/src/services e frontend/src/features/tasks
- [X] T042 Executar e registrar validação manual completa em specs/001-task-management-app/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: sem dependências
- **Phase 2 (Foundational)**: depende da Phase 1 e bloqueia todas as user stories
- **Phase 3 (US1)**: depende da Phase 2
- **Phase 4 (US2)**: depende da Phase 2 e usa artefatos de US1
- **Phase 5 (US3)**: depende da Phase 2 e usa artefatos de US1
- **Phase 6 (Polish)**: depende das histórias concluídas

### User Story Dependencies

- **US1 (P1)**: inicia após fundação; entrega MVP
- **US2 (P2)**: inicia após fundação; depende de entidades e rotas já existentes
- **US3 (P3)**: inicia após fundação; depende da listagem de tarefas existente

### Within Each User Story

- Definir validação manual antes da implementação
- Repositório antes de serviço
- Serviço antes de controller/rota
- Backend antes da integração final no frontend
- Story concluída antes de seguir para polish

### Parallel Opportunities

- **Setup**: T003, T005 e T006 em paralelo após T002/T004
- **Foundational**: T008, T009 e T010 em paralelo após T007
- **US1**: T020 e T021 em paralelo enquanto T015–T019 avançam
- **US2**: T028 e T029 em paralelo
- **US3**: T035 e T036 em paralelo
- **Polish**: T039 pode ocorrer em paralelo com T040

---

## Parallel Example: User Story 1

- Executar em paralelo:
  - T020 [US1] em frontend/src/features/tasks/components/task-form.tsx
  - T021 [US1] em frontend/src/features/tasks/services/task-api.ts
- Enquanto isso, backend avança sequencialmente:
  - T015 → T016 → T017 → T018 → T019

---

## Parallel Example: User Story 3

- Executar em paralelo:
  - T035 [US3] em frontend/src/features/tasks/components/task-filters.tsx
  - T036 [US3] em frontend/src/features/tasks/services/task-api.ts
- Depois integrar estado e UI:
  - T037 → T038

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Concluir Phase 1 (Setup)
2. Concluir Phase 2 (Foundational)
3. Concluir Phase 3 (US1)
4. Validar manualmente US1 via quickstart
5. Demonstrar MVP

### Incremental Delivery

1. Entregar US1 (cadastro + listagem)
2. Entregar US2 (acompanhamento por status)
3. Entregar US3 (filtros)
4. Encerrar com polish e validação manual completa

### Parallel Team Strategy

1. Equipe conclui Setup + Foundational
2. Após fundação:
   - Dev A: backend de US1/US2
   - Dev B: frontend de US1/US2
   - Dev C: frontend/backend de filtros US3
3. Integrar e validar manualmente ao final de cada história

---

## Notes

- [P] indica tarefa sem conflito de arquivo e sem bloqueio direto
- Labels [US1], [US2], [US3] garantem rastreabilidade por história
- Todas as histórias são validáveis sem testes automatizados
- Evitar tarefas vagas; manter foco em arquivos concretos
