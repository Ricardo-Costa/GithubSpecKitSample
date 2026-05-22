# Phase 0 Research — Task Management App

## Decision 1: Arquitetura da aplicação

- **Decision**: Manter arquitetura web separada (frontend TypeScript + React, backend TypeScript + Express) com organização por responsabilidade.
- **Rationale**: Preserva simplicidade e legibilidade, alinhando com clean code para um projeto pequeno.
- **Alternatives considered**:
  - Monólito sem separação (rejeitado por acoplamento).
  - Arquitetura avançada com camadas extras (rejeitado por complexidade prematura).

## Decision 2: Modelo de datas da tarefa

- **Decision**: Adotar dois campos distintos: `dataPrevistaConclusao` (data de planejamento) e `dataConclusaoReal` (data/hora efetiva).
- **Rationale**: Evita ambiguidade semântica e suporta acompanhamento operacional e histórico real.
- **Alternatives considered**:
  - Campo único de data (rejeitado por ambiguidade).
  - Duas datas sem distinção de papel (rejeitado por inconsistência de uso).

## Decision 3: Invariante status-data

- **Decision**: Quando status vira `concluída`, preencher `dataConclusaoReal`; quando sai de `concluída`, limpar `dataConclusaoReal`.
- **Rationale**: Mantém consistência de domínio e reduz estados inválidos.
- **Alternatives considered**:
  - Manter data real após reabertura (rejeitado por semântica inconsistente).
  - Proibir reabertura (rejeitado por restringir fluxo do usuário sem necessidade).

## Decision 4: Contrato de filtros por data

- **Decision**: Filtro por data com seleção explícita de tipo (`prevista` ou `real`) e valor de data.
- **Rationale**: Comportamento previsível e sem conflito entre critérios de data.
- **Alternatives considered**:
  - Filtro por data sem tipo (rejeitado por ambiguidade).
  - Dois filtros de data separados simultâneos (rejeitado por complexidade de UX para v1).

## Decision 5: API e validação

- **Decision**: Manter API REST para CRUD e filtros, com validações de payload/query no backend usando `zod`.
- **Rationale**: Contratos explícitos e tratamento consistente de erros.
- **Alternatives considered**:
  - Validação ad-hoc em cada endpoint (rejeitado por duplicação).
  - GraphQL (rejeitado por escopo).

## Decision 6: Persistência em SQLite

- **Decision**: Tabela única `tasks` com constraints de enums e índices para filtros de `priority`, `status`, `dataPrevistaConclusao` e `dataConclusaoReal`.
- **Rationale**: Suficiente para uso individual com bom custo-benefício operacional.
- **Alternatives considered**:
  - ORM completo (rejeitado por overhead inicial).
  - Normalização adicional para enums (rejeitado para manter simplicidade).

## Decision 7: Estratégia de qualidade na v1

- **Decision**: Sem testes automatizados obrigatórios; validação manual estruturada em `quickstart.md`.
- **Rationale**: Alinha com constituição e foco em entrega incremental simples.
- **Alternatives considered**:
  - TDD obrigatório nesta etapa (rejeitado por não ser requisito da v1).

## Resolução de clarificações técnicas

Todos os pontos críticos do domínio de datas e filtros foram esclarecidos no `spec.md`.
