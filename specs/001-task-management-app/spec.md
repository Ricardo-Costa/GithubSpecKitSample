# Feature Specification: Task Management App

**Feature Branch**: `[001-task-management-app]`

**Created**: 2026-05-21

**Status**: Draft

**Input**: User description: "Construa uma aplicação que me ajude a gerenciar minhas tarefas. Eu posso criar e acompanhar atividades do dia a dia. As tarefas devem ter título, descrição, data de conclusão, prioridade e status(pendente, em andamento, concluída). Inclua filtros para visualizar tarefas por prioridade, status ou data."

## Clarifications

### Session 2026-05-22

- Q: A tarefa deve ter uma data única ou datas separadas para prazo e conclusão real? → A: Datas separadas: `dataPrevistaConclusao` + `dataConclusaoReal`.
- Q: Como deve funcionar o filtro por data? → A: Permitir escolher o tipo de data no filtro (`prevista` ou `real`).
- Q: Ao sair de concluída, como tratar `dataConclusaoReal`? → A: Limpar `dataConclusaoReal` ao sair de `concluída`.

### Convenção de status (mapeamento de domínio)

- `pendente` ↔ `pending`
- `em andamento` ↔ `in_progress`
- `concluída` ↔ `completed`

## User Scenarios & Validation *(mandatory)*

### User Story 1 - Criar tarefas do dia a dia (Priority: P1)

Como usuário, quero cadastrar tarefas com informações essenciais para organizar minhas atividades diárias em um único lugar.

**Why this priority**: Sem cadastro de tarefas, não existe valor principal do produto.

**Independent Validation**: Criar uma nova tarefa preenchendo título, descrição, data prevista de conclusão, prioridade e status, salvar e confirmar que ela aparece na lista com os dados informados; confirmar que `dataConclusaoReal` inicia vazia para tarefas não concluídas.

**Acceptance Scenarios**:

1. **Given** que estou na tela de criação, **When** preencho todos os campos obrigatórios e salvo, **Then** a tarefa é criada e exibida na listagem.
2. **Given** que tento salvar sem título, **When** envio o formulário, **Then** o sistema bloqueia o salvamento e mostra mensagem clara de validação.

---

### User Story 2 - Acompanhar progresso das tarefas (Priority: P2)

Como usuário, quero visualizar e atualizar o status das minhas tarefas para acompanhar meu progresso diário.

**Why this priority**: Acompanhar execução é a segunda necessidade mais importante após registrar tarefas.

**Independent Validation**: Selecionar uma tarefa existente, alterar o status entre pendente, em andamento e concluída, salvar e verificar o novo status na listagem.

**Acceptance Scenarios**:

1. **Given** uma tarefa com status pendente, **When** altero para em andamento, **Then** a tarefa passa a exibir status em andamento.
2. **Given** uma tarefa com status em andamento, **When** altero para concluída, **Then** a tarefa passa a exibir status concluída e registra `dataConclusaoReal`.

---

### User Story 3 - Filtrar tarefas para consulta rápida (Priority: P3)

Como usuário, quero filtrar tarefas por prioridade, status ou data para localizar rapidamente o que é mais importante no momento.

**Why this priority**: Filtros aceleram a consulta, mas dependem da existência de tarefas cadastradas.

**Independent Validation**: Aplicar filtros individuais por prioridade, status e data e confirmar que apenas tarefas compatíveis são exibidas em cada filtro.

**Acceptance Scenarios**:

1. **Given** várias tarefas com prioridades diferentes, **When** filtro por prioridade alta, **Then** apenas tarefas de prioridade alta são exibidas.
2. **Given** várias tarefas com status diferentes, **When** filtro por concluída, **Then** apenas tarefas concluídas são exibidas.
3. **Given** tarefas com datas de conclusão diferentes, **When** filtro por uma data específica, **Then** apenas tarefas com essa data são exibidas.
4. **Given** tarefas com data prevista e data real diferentes, **When** seleciono tipo de data no filtro (`prevista` ou `real`) e informo uma data, **Then** a listagem considera apenas o tipo de data escolhido.

### Edge Cases

- O sistema deve impedir criação ou atualização de tarefa com campos obrigatórios vazios.
- O sistema deve manter comportamento previsível quando não existir nenhuma tarefa cadastrada.
- Ao aplicar um filtro sem correspondência, o sistema deve exibir resultado vazio com mensagem informativa.
- O sistema deve permitir limpar filtros e retornar à visualização completa sem perda de dados.
- Ao alterar status de `concluída` para outro valor, o sistema deve limpar `dataConclusaoReal`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST permitir criar uma tarefa com título, descrição, `dataPrevistaConclusao`, prioridade e status.
- **FR-002**: O sistema MUST exigir título como campo obrigatório no momento de criação.
- **FR-003**: O sistema MUST exigir prioridade e status como campos obrigatórios no momento de criação.
- **FR-004**: O sistema MUST aceitar apenas os status: pendente, em andamento e concluída.
- **FR-005**: O sistema MUST permitir visualizar a lista de tarefas com todos os campos cadastrados.
- **FR-006**: O sistema MUST permitir editar os dados de uma tarefa existente.
- **FR-007**: O sistema MUST permitir atualizar o status de uma tarefa a qualquer momento.
- **FR-008**: O sistema MUST permitir filtrar tarefas por prioridade.
- **FR-009**: O sistema MUST permitir filtrar tarefas por status.
- **FR-010**: O sistema MUST permitir filtrar tarefas por data escolhendo o tipo de data (`dataPrevistaConclusao` ou `dataConclusaoReal`).
- **FR-011**: O sistema MUST permitir limpar os filtros ativos e retornar à lista completa.
- **FR-012**: O sistema MUST apresentar mensagens claras de validação quando dados obrigatórios estiverem ausentes ou inválidos.
- **FR-013**: O sistema MUST manter `dataConclusaoReal` vazia para tarefas com status diferente de concluída, inclusive ao reabrir tarefa já concluída.
- **FR-014**: O sistema MUST preencher `dataConclusaoReal` quando uma tarefa for marcada como concluída.

### Key Entities *(include if feature involves data)*

- **Task**: Representa uma atividade do usuário; inclui título, descrição, `dataPrevistaConclusao`, `dataConclusaoReal`, prioridade e status.
- **TaskFilter**: Representa critérios de visualização aplicados na lista; inclui prioridade, status, data e tipo de data (`prevista` ou `real`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Usuários conseguem criar uma nova tarefa completa em até 1 minuto.
- **SC-002**: Em validação manual, 100% das tentativas de cadastro sem campos obrigatórios recebem mensagem de erro clara e sem salvar dados incompletos.
- **SC-003**: Pelo menos 95% das tarefas encontradas por usuários em validação manual são localizadas usando filtros em até 20 segundos.
- **SC-004**: 100% das alterações de status realizadas pelo usuário são refletidas corretamente na lista após salvar.

## Assumptions

- A primeira versão é para uso individual, sem colaboração entre múltiplos usuários.
- A primeira versão não inclui testes automatizados obrigatórios, seguindo a constituição vigente.
- A aplicação trata apenas tarefas do dia a dia, sem dependências entre tarefas.
- O usuário pode criar, editar, visualizar e filtrar tarefas no mesmo contexto de uso, sem integrações externas.
