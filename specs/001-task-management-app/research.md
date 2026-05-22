# Phase 0 Research — Task Management App

## Decision 1: Arquitetura da aplicação

- **Decision**: Usar arquitetura web separada em frontend (TypeScript + React) e backend (TypeScript + Express), com estrutura pequena e orientada a responsabilidades.
- **Rationale**: Atende ao requisito explícito do usuário, mantém código legível e facilita evolução incremental do projeto.
- **Alternatives considered**:
  - Monólito único sem separação frontend/backend (rejeitado por acoplamento).
  - Arquitetura avançada (DDD/CQRS) (rejeitado por excesso de complexidade para escopo inicial).

## Decision 2: Gerenciamento de estado no frontend

- **Decision**: Modelar domínio com tipos explícitos (`Task`, `TaskStatus`, `TaskPriority`, `TaskFilter`) e usar `useReducer` para operações de CRUD e filtros.
- **Rationale**: Estado previsível, transições claras e baixo acoplamento para app pequeno.
- **Alternatives considered**:
  - `useState` disperso em múltiplos componentes (rejeitado por risco de lógica duplicada).
  - Redux/MobX (rejeitado por sobrecarga inicial).

## Decision 3: Estratégia de filtros

- **Decision**: Calcular tarefas filtradas como estado derivado a partir da lista base e critérios ativos (prioridade, status e data).
- **Rationale**: Evita inconsistências e duplicação de estado.
- **Alternatives considered**:
  - Persistir lista filtrada em estado separado (rejeitado por risco de dessíncronia).

## Decision 4: Contrato e validação de API

- **Decision**: API REST com endpoints de CRUD e filtros via query string, validação de entrada com `zod` no backend.
- **Rationale**: Contratos explícitos, erros previsíveis e integração simples com frontend.
- **Alternatives considered**:
  - Validação manual ad-hoc (rejeitado por baixa consistência).
  - GraphQL (rejeitado por complexidade desnecessária para v1).

## Decision 5: Persistência em SQLite

- **Decision**: Usar SQLite com tabela única `tasks`, constraints para enums (`status`, `priority`) e índices para filtros principais.
- **Rationale**: Simplicidade operacional, boa performance para uso individual e integridade de dados no banco.
- **Alternatives considered**:
  - ORM completo (Prisma/TypeORM) (rejeitado por overhead inicial).
  - Tabelas auxiliares para enums (rejeitado por complexidade sem ganho relevante no escopo).

## Decision 6: Qualidade sem testes automatizados nesta versão

- **Decision**: Não incluir testes automatizados na versão atual; adotar validação manual padronizada em `quickstart.md`.
- **Rationale**: Alinha com solicitação do usuário e com a constituição (projeto pequeno, foco em iteração rápida e clean code).
- **Alternatives considered**:
  - TDD completo desde v1 (rejeitado por não ser requisito desta etapa).
  - Ausência de validação estruturada (rejeitado por risco de regressão funcional).

## Resolução de clarificações técnicas

Nenhum item ficou como NEEDS CLARIFICATION após pesquisa e decisões acima.
