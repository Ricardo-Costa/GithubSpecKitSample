# Data Model — Task Management App

## Entity: Task

Representa uma atividade do usuário.

### Fields

- `id`: identificador único numérico.
- `title`: texto curto obrigatório.
- `description`: texto descritivo obrigatório (pode ser vazio por regra de negócio, mas campo presente).
- `dataPrevistaConclusao`: data de conclusão planejada no formato `YYYY-MM-DD`.
- `dataConclusaoReal`: data/hora de conclusão efetiva (ISO datetime), nula enquanto não concluída.
- `priority`: enum (`low`, `medium`, `high`).
- `status`: enum (`pending`, `in_progress`, `completed`).
- `createdAt`: timestamp de criação.
- `updatedAt`: timestamp da última atualização.

### Validation Rules

- `title` obrigatório e não vazio após trim.
- `priority` obrigatório e restrito ao enum.
- `status` obrigatório e restrito ao enum.
- `dataPrevistaConclusao`, quando informado, deve ser data válida no formato `YYYY-MM-DD`.
- Se `status = completed`, `dataConclusaoReal` deve ser definido automaticamente no backend.
- Se `status != completed`, `dataConclusaoReal` deve ser nulo (inclusive após reabertura).

### State Transitions

- `pending -> in_progress`
- `in_progress -> completed`
- `pending -> completed`
- `completed -> in_progress` (permitido para reabertura)
- `completed -> pending` (permitido para replanejamento)

Todas as transições devem atualizar `updatedAt`.
Transições que saem de `completed` devem limpar `dataConclusaoReal`.

---

## Entity: TaskFilter

Representa critérios de busca aplicados na listagem.

### Fields

- `priority`: opcional (`low`, `medium`, `high`).
- `status`: opcional (`pending`, `in_progress`, `completed`).
- `date`: opcional (`YYYY-MM-DD`) para valor do filtro de data.
- `dateType`: opcional (`prevista`, `real`) para selecionar o campo-alvo do filtro de data.

### Validation Rules

- Campos são opcionais e independentes.
- Quando presentes, valores devem pertencer ao domínio válido.
- Se `date` for informado, `dateType` é obrigatório.
- Combinação de filtros aplica operador lógico AND.

---

## Relationship

- `TaskFilter` não persiste dados próprios; é uma projeção de consulta sobre `Task`.
- Uma consulta com `TaskFilter` pode retornar zero ou mais `Task`.
