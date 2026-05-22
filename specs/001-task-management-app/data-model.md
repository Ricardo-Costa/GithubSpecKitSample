# Data Model — Task Management App

## Entity: Task

Representa uma atividade do usuário.

### Fields

- `id`: identificador único numérico.
- `title`: texto curto obrigatório.
- `description`: texto descritivo obrigatório (pode ser vazio por regra de negócio, mas campo presente).
- `dueDate`: data de conclusão planejada no formato `YYYY-MM-DD`.
- `priority`: enum (`low`, `medium`, `high`).
- `status`: enum (`pending`, `in_progress`, `completed`).
- `createdAt`: timestamp de criação.
- `updatedAt`: timestamp da última atualização.
- `completedAt`: timestamp de conclusão efetiva; nulo enquanto não concluída.

### Validation Rules

- `title` obrigatório e não vazio após trim.
- `priority` obrigatório e restrito ao enum.
- `status` obrigatório e restrito ao enum.
- `dueDate`, quando informado, deve ser data válida no formato `YYYY-MM-DD`.
- Se `status = completed`, `completedAt` deve ser definido automaticamente no backend.
- Se `status != completed`, `completedAt` deve ser nulo.

### State Transitions

- `pending -> in_progress`
- `in_progress -> completed`
- `pending -> completed`
- `completed -> in_progress` (permitido para reabertura)
- `completed -> pending` (permitido para replanejamento)

Todas as transições devem atualizar `updatedAt`.

---

## Entity: TaskFilter

Representa critérios de busca aplicados na listagem.

### Fields

- `priority`: opcional (`low`, `medium`, `high`).
- `status`: opcional (`pending`, `in_progress`, `completed`).
- `date`: opcional (`YYYY-MM-DD`) para filtro por data de conclusão planejada.

### Validation Rules

- Campos são opcionais e independentes.
- Quando presentes, valores devem pertencer ao domínio válido.
- Combinação de filtros aplica operador lógico AND.

---

## Relationship

- `TaskFilter` não persiste dados próprios; é uma projeção de consulta sobre `Task`.
- Uma consulta com `TaskFilter` pode retornar zero ou mais `Task`.
