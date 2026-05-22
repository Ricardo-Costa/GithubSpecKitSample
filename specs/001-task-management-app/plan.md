# Implementation Plan: Task Management App

**Branch**: `[001-task-management-app]` | **Date**: 2026-05-22 | **Spec**: [specs/001-task-management-app/spec.md](specs/001-task-management-app/spec.md)

**Input**: Feature specification from `/specs/001-task-management-app/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Construir uma aplicação web pequena para gerenciar tarefas do dia a dia com
criação, acompanhamento de status e filtros. A solução usa frontend em
TypeScript + React e backend em TypeScript + Express com persistência em
SQLite. Após clarificações, o domínio passa a usar duas datas: uma data
prevista (`dataPrevistaConclusao`) e uma data real (`dataConclusaoReal`), com
filtro por data baseado em tipo (`prevista` ou `real`).

## Technical Context

**Language/Version**: TypeScript 5.x (frontend e backend)

**Primary Dependencies**: React 18, Express 4, SQLite, `zod`, Vite

**Storage**: SQLite (arquivo local)

**Testing**: Sem testes automatizados nesta versão; validação manual via cenários do quickstart

**Target Platform**: Navegador moderno + Node.js 20+

**Project Type**: Web application (frontend + backend)

**Performance Goals**: Listagem e filtragem em até 500ms para até 5.000 tarefas

**Constraints**: Projeto pequeno e simples; baixo acoplamento; sem testes automatizados obrigatórios nesta fase

**Scale/Scope**: Uso individual; CRUD de tarefas + filtros por prioridade/status/data com tipo de data

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Gate Check (Pre-Phase 0)

- ✅ Escopo continua pequeno (CRUD + filtros) e incremental.
- ✅ Design prioriza legibilidade e contratos explícitos.
- ✅ Responsabilidades separadas em camadas simples (`routes`, `services`, `repositories`, UI por feature).
- ✅ Regras de data e status são explícitas e verificáveis (`dataPrevistaConclusao`, `dataConclusaoReal`, `dateType`).
- ✅ Qualidade definida por validação manual e checklist, sem gate de testes automatizados.
- ✅ Dependências mínimas e justificadas para o domínio atual.

### Gate Check (Post-Phase 1)

- ✅ `research.md` atualizado com decisões de datas e filtro por tipo.
- ✅ `data-model.md` descreve invariantes de status/data e filtro com `dateType`.
- ✅ `contracts/tasks-api.openapi.yaml` atualizado para filtros com `dateType`.
- ✅ `quickstart.md` atualizado com validação manual dos cenários de data.

## Project Structure

### Documentation (this feature)

```text
specs/001-task-management-app/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── app/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── types/
│   └── validators/
└── package.json

frontend/
├── src/
│   ├── components/
│   ├── features/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── utils/
└── package.json

database/
└── schema.sql
```

**Structure Decision**: Estrutura web com frontend e backend separados, mantendo
camadas enxutas e foco em responsabilidade única. O contrato de filtros por
data é implementado no backend e consumido por uma UI com seletor de `dateType`.

## Complexity Tracking

> Sem violações de constituição identificadas.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
