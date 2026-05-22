# Data Model — Modern Theme System

## Entity: ThemeMode

Representa o modo de aparência ativo da aplicação.

### Fields

- `value`: enum obrigatório com valores permitidos `light` e `dark`.
- `label`: texto de exibição amigável para UI (ex.: "Claro", "Escuro").

### Validation Rules

- Qualquer valor fora de `light|dark` é inválido.
- Em caso de valor inválido vindo de persistência, aplicar fallback para `light`.

### State Transitions

- `light -> dark` (ativar modo escuro).
- `dark -> light` (desativar modo escuro).

Transições devem atualizar imediatamente a classe raiz de tema e persistência local.

---

## Entity: ThemePreference

Representa a preferência persistida de tema para o contexto atual de uso.

### Fields

- `storageKey`: identificador estável da preferência no storage local.
- `mode`: valor de `ThemeMode` persistido.
- `updatedAt`: timestamp lógico (opcional) de última alteração para auditoria local.

### Validation Rules

- `storageKey` deve ser único e constante no app.
- `mode` persistido deve respeitar domínio `light|dark`.
- Leitura com chave ausente ou inválida retorna modo padrão `light`.

---

## Entity: ThemeTokenSet

Representa os tokens visuais aplicados em um modo de tema.

### Fields

- `surface`: cores de fundo principal/secundário.
- `text`: cores de texto primário/secundário.
- `border`: cores de borda e divisores.
- `accent`: cor de destaque para ações principais.
- `status`: variações para feedback visual (`success`, `warning`, `error`, `info`).

### Validation Rules

- Cada `ThemeMode` deve possuir um `ThemeTokenSet` completo.
- Tokens obrigatórios não podem ficar sem valor para evitar componentes sem estilo.
- Contraste mínimo deve ser mantido para legibilidade em ambos os modos.

---

## Entity: ThemeContextState

Representa o estado reativo usado pela interface para consumo de tema.

### Fields

- `mode`: modo atual (`light|dark`).
- `isHydrated`: flag para indicar que preferência inicial foi carregada.
- `toggleMode`: ação para alternar entre os modos.
- `setMode`: ação para definir modo explicitamente.

### Validation Rules

- `toggleMode` deve alternar de forma determinística entre `light` e `dark`.
- `setMode` ignora valores fora do domínio permitido.
- Após qualquer alteração, `mode` em estado, DOM raiz e storage devem permanecer consistentes.

## Relationships

- `ThemePreference.mode` referencia `ThemeMode.value`.
- `ThemeContextState.mode` referencia `ThemeMode.value`.
- Cada `ThemeMode` mapeia para exatamente um `ThemeTokenSet`.
