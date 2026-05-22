# Theme UI Contract — Modern Theme System

## 1) Scope

Contrato de interface para o sistema de tema do frontend, incluindo modo claro,
modo escuro, persistência local e comportamento de alternância.

## 2) Public Contract

### Theme Mode Domain

- Allowed values: `light`, `dark`
- Invalid values MUST fallback to `light`

### Persistence Contract

- Storage mechanism: `localStorage`
- Storage key: `task-management.theme.mode`
- Persisted value: string do domínio (`light|dark`)

### DOM Application Contract

- Elemento alvo: raiz do documento (`html`)
- Regra de aplicação:
  - `light`: remover classe `dark`
  - `dark`: adicionar classe `dark`
- Mudança de modo MUST refletir no DOM imediatamente após ação do usuário.

### UI Behavior Contract

- A interface MUST expor um controle explícito de alternância light/dark.
- O controle MUST manter estado coerente com o modo ativo.
- A alternância MUST ocorrer sem reload de página e sem perda de dados em formulários.

## 3) Validation Rules

- Valor lido do storage fora de `light|dark` é tratado como inválido.
- Ausência de chave no storage implica modo padrão `light`.
- Em caso de falha de acesso ao storage, app continua funcional usando modo em memória com fallback `light`.

## 4) Compatibility and Evolution

- Inclusão de novos modos (ex.: `system`) exige atualização deste contrato e do `data-model.md`.
- Mudança de storage key exige plano de migração para preservar preferência existente.
