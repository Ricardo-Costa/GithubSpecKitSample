# Tasks: Task Management App

**Input**: Design documents from `/specs/001-task-management-app/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Não incluir testes automatizados nesta versão. Validar manualmente com base em `quickstart.md`.

**Organization**: Tasks agrupadas por user story para permitir implementação e validação independentes.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Garantir estrutura mínima e ambiente consistente para backend/frontend

- [ ] T001 Ajustar scripts e metadados de execução no backend em backend/package.json
- [ ] T002 [P] Ajustar scripts e metadados de execução no frontend em frontend/package.json
- [ ] T003 [P] Validar configuração TypeScript backend em backend/tsconfig.json
- [ ] T004 [P] Validar configuração TypeScript frontend em frontend/tsconfig.json
- [ ] T005 [P] Consolidar arquivos base de lint/ignore em .gitignore, .eslintignore e .npmignore

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Definir modelo base de dados, contratos e camadas compartilhadas antes das histórias

**⚠️ CRITICAL**: Nenhuma user story deve iniciar antes desta fase

- [X] T006 Atualizar schema SQLite para `data_prevista_conclusao` e `data_conclusao_real` em database/schema.sql
- [X] T007 [P] Atualizar inicialização de banco e carregamento de schema em backend/src/db/sqlite.ts
- [X] T008 [P] Atualizar tipos de domínio (`Task`, `TaskFilter`) com `dateType` em backend/src/types/task.ts
- [X] T009 [P] Atualizar tipos equivalentes do frontend em frontend/src/types/task.ts
- [X] T010 Implementar validações Zod para `dateType`, `date` e invariantes de status/data em backend/src/validators/task.validator.ts
- [X] T011 Atualizar shape de erro para mensagens consistentes em backend/src/middlewares/error-handler.ts
- [X] T012 Validar bootstrap da aplicação e rotas base em backend/src/app/create-app.ts
- [X] T013 Atualizar cliente HTTP compartilhado e erro de API em frontend/src/services/http-client.ts

**Checkpoint**: Fundação pronta para implementação de histórias ✅

---

## Phase 3: User Story 1 - Criar tarefas do dia a dia (Priority: P1) 🎯 MVP

**Goal**: Criar e listar tarefas com `dataPrevistaConclusao` e `dataConclusaoReal` nula inicialmente

**Independent Validation**: Criar tarefa completa via UI e confirmar listagem com campos corretos e `dataConclusaoReal` vazia quando status não for concluída

### Implementation for User Story 1

- [X] T014 [P] [US1] Implementar criação e listagem com novos campos no repositório em backend/src/repositories/task.repository.ts
- [X] T015 [US1] Implementar regra de criação de tarefa em backend/src/services/create-task.service.ts
- [X] T016 [US1] Ajustar regra de listagem base em backend/src/services/list-tasks.service.ts
- [X] T017 [US1] Atualizar controller para payload/response de criação e listagem em backend/src/controllers/task.controller.ts
- [X] T018 [US1] Atualizar endpoints `POST /tasks` e `GET /tasks` em backend/src/routes/task.routes.ts
- [X] T019 [P] [US1] Atualizar serialização de criação/listagem no frontend em frontend/src/features/tasks/services/task-api.ts
- [X] T020 [P] [US1] Atualizar formulário para `dataPrevistaConclusao` em frontend/src/features/tasks/components/task-form.tsx
- [X] T021 [US1] Atualizar validação de formulário para novos campos em frontend/src/features/tasks/utils/task-form-validation.ts
- [X] T022 [US1] Atualizar reducer para criação/listagem com novos campos em frontend/src/features/tasks/state/task-reducer.ts
- [X] T023 [US1] Atualizar página de tarefas para integração de criação/listagem em frontend/src/pages/tasks-page.tsx

**Checkpoint**: US1 funcional e validável isoladamente ✅

---

## Phase 4: User Story 2 - Acompanhar progresso das tarefas (Priority: P2)

**Goal**: Garantir atualização de status com preenchimento/limpeza de `dataConclusaoReal`

**Independent Validation**: Alterar status para concluída e depois reabrir, confirmando preenchimento e limpeza de `dataConclusaoReal`

### Implementation for User Story 2

- [X] T024 [US2] Implementar regra de transição de status com invariante status-data no repositório em backend/src/repositories/task.repository.ts
- [X] T025 [US2] Ajustar serviço de atualização de status em backend/src/services/update-task-status.service.ts
- [X] T026 [US2] Ajustar validações de update para regras de reabertura em backend/src/validators/task.validator.ts
- [X] T027 [US2] Atualizar controller para respostas de atualização coerentes em backend/src/controllers/task.controller.ts
- [X] T028 [US2] Validar endpoint `PATCH /tasks/:id` em backend/src/routes/task.routes.ts
- [X] T029 [P] [US2] Atualizar chamada de atualização de status no frontend em frontend/src/features/tasks/services/task-api.ts
- [X] T030 [P] [US2] Ajustar seletor de status na lista em frontend/src/features/tasks/components/task-status-select.tsx
- [X] T031 [US2] Atualizar renderização de campos de progresso (incluindo `dataConclusaoReal`) em frontend/src/features/tasks/components/task-list.tsx
- [X] T032 [US2] Ajustar integração de atualização de status e feedback de erro em frontend/src/pages/tasks-page.tsx
- [X] T033 [US2] Implementar edição completa de tarefa (título, descrição, prioridade, `dataPrevistaConclusao`) no backend em backend/src/services/update-task.service.ts e backend/src/routes/task.routes.ts
- [X] T034 [US2] Implementar fluxo de edição completa no frontend em frontend/src/features/tasks/components/task-edit-form.tsx e frontend/src/features/tasks/services/task-api.ts

**Checkpoint**: US1 e US2 funcionais e validáveis independentemente ✅

---

## Phase 5: User Story 3 - Filtrar tarefas para consulta rápida (Priority: P3)

**Goal**: Filtrar por prioridade, status e data com seleção de tipo (`prevista` ou `real`)

**Independent Validation**: Aplicar filtros isolados e combinados; para filtro de data, alternar `dateType` e confirmar resultados corretos

### Implementation for User Story 3

- [X] T035 [US3] Implementar filtro por `dateType` (`prevista`/`real`) no repositório em backend/src/repositories/task.repository.ts
- [X] T036 [US3] Implementar validação de query (`date`, `dateType`) no backend em backend/src/validators/task.validator.ts
- [X] T037 [US3] Ajustar serviço de listagem para filtros compostos em backend/src/services/list-tasks.service.ts
- [X] T038 [US3] Ajustar parsing de query params no controller em backend/src/controllers/task.controller.ts
- [X] T039 [P] [US3] Implementar UI de filtro com seletor de tipo de data em frontend/src/features/tasks/components/task-filters.tsx
- [X] T040 [P] [US3] Ajustar serialização de filtros (`date`, `dateType`) em frontend/src/features/tasks/services/task-api.ts
- [X] T041 [US3] Atualizar estado de filtros e limpeza no reducer em frontend/src/features/tasks/state/task-reducer.ts
- [X] T042 [US3] Ajustar exibição de estado vazio para cenário sem correspondência em frontend/src/features/tasks/components/task-list-empty-state.tsx
- [X] T043 [US3] Integrar fluxo completo de filtros na página principal em frontend/src/pages/tasks-page.tsx
- [ ] T044 [US3] Definir protocolo de medição manual para SC-003 (95% em até 20s) em specs/001-task-management-app/quickstart.md

**Checkpoint**: Todas as user stories funcionais e validáveis ✅

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Refinar documentação e garantir validação manual fim-a-fim

- [ ] T045 [P] Atualizar contrato OpenAPI com campos e filtros finais em specs/001-task-management-app/contracts/tasks-api.openapi.yaml
- [ ] T046 [P] Atualizar documentação de execução e uso em README.md
- [ ] T047 Atualizar quickstart com passos manuais finais de validação em specs/001-task-management-app/quickstart.md
- [ ] T048 Consolidar consistência de nomenclatura e responsabilidade entre backend/src e frontend/src

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: inicia imediatamente
- **Phase 2 (Foundational)**: depende da Phase 1 e bloqueia user stories
- **Phase 3 (US1)**: depende da Phase 2
- **Phase 4 (US2)**: depende da Phase 2 (e integra com componentes de US1)
- **Phase 5 (US3)**: depende da Phase 2 (e integra com listagem de US1)
- **Phase 6 (Polish)**: depende das histórias concluídas

### User Story Dependencies

- **US1 (P1)**: entrega MVP
- **US2 (P2)**: depende de fluxo básico de criação/listagem já estabelecido
- **US3 (P3)**: depende da listagem e query de tarefas já operantes

### Within Each User Story

- Validar regras manuais antes de implementar
- Repositório antes de serviço
- Serviço antes de controller/rotas
- Backend antes da integração final no frontend
- Concluir história e validar independentemente antes da próxima

### Parallel Opportunities

- Setup: T002, T003, T004, T005 em paralelo após T001
- Foundational: T007, T008, T009 em paralelo após T006
- US1: T019 e T020 em paralelo após T014
- US2: T029 e T030 em paralelo
- US3: T039 e T040 em paralelo
- Polish: T045 e T046 em paralelo

---

## Parallel Example: User Story 1

- Executar em paralelo:
  - T019 [US1] em frontend/src/features/tasks/services/task-api.ts
  - T020 [US1] em frontend/src/features/tasks/components/task-form.tsx
- Em backend, seguir sequência principal:
  - T014 → T015 → T016 → T017 → T018

---

## Parallel Example: User Story 3

- Executar em paralelo:
  - T039 [US3] em frontend/src/features/tasks/components/task-filters.tsx
  - T040 [US3] em frontend/src/features/tasks/services/task-api.ts
- Em seguida integrar estado e página:
  - T041 → T043

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Concluir Phase 1 (Setup)
2. Concluir Phase 2 (Foundational)
3. Concluir Phase 3 (US1)
4. Validar manualmente cenário da US1
5. Demonstrar MVP

### Incremental Delivery

1. Entregar US1 (cadastro + listagem)
2. Entregar US2 (acompanhamento de status + invariante de data real)
3. Entregar US3 (filtros com `dateType` + medição SC-003)
4. Finalizar documentação e validação manual

### Parallel Team Strategy

1. Time conclui Setup + Foundational
2. Após fundação:
   - Dev A: backend de US1/US2
   - Dev B: frontend de US1/US2
   - Dev C: filtros US3 (backend + frontend)
3. Validar manualmente cada história ao concluir

---

## Notes

- `[P]` indica tarefa paralelizável sem conflito direto de dependência/arquivo
- `[US1]`, `[US2]`, `[US3]` garantem rastreabilidade por história
- Não incluir testes automatizados nesta versão
- Evitar tarefas vagas; sempre manter caminho de arquivo explícito
