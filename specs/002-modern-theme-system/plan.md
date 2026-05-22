# Implementation Plan: Modern Theme System

**Branch**: `[002-modern-theme-system]` | **Date**: 2026-05-22 | **Spec**: [specs/002-modern-theme-system/spec.md](specs/002-modern-theme-system/spec.md)

**Input**: Feature specification from `/specs/002-modern-theme-system/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Adicionar um sistema de tema moderno no frontend com Tailwind CSS, oferecendo
alternância explícita entre modo claro e modo escuro, aplicação consistente da
identidade visual nos fluxos principais e persistência da preferência de tema
entre sessões.

## Technical Context

**Language/Version**: TypeScript 5.x (frontend e backend)

**Primary Dependencies**: React 18, Vite 6, Tailwind CSS 3.x, PostCSS, Autoprefixer

**Storage**: Preferência de tema no `localStorage` (frontend); sem mudanças no SQLite

**Testing**: Sem testes automatizados obrigatórios nesta fase; validação manual via quickstart

**Target Platform**: Navegadores modernos desktop/mobile com suporte a CSS custom properties e media query de esquema de cor

**Project Type**: Web application (frontend + backend)

**Performance Goals**: Alternância de tema perceptivelmente imediata (aplicação visual em até 100ms) sem recarregar página

**Constraints**: Manter escopo no frontend; preservar regras de negócio existentes; evitar flicker visual no carregamento inicial; garantir contraste adequado nos dois modos

**Scale/Scope**: Fluxos principais da aplicação de tarefas (listar, criar, editar, filtrar) com dois modos de tema (`light` e `dark`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Gate Check (Pre-Phase 0)

- ✅ Escopo pequeno e incremental: apenas padronização visual + alternância de tema no frontend.
- ✅ Decisões favorecem legibilidade: tokens de tema centralizados e classes utilitárias previsíveis.
- ✅ Responsabilidade única: separação entre provider/estado de tema e componentes de UI.
- ✅ Contratos explícitos: enum de modo (`light`/`dark`), chave de persistência e fallback definidos.
- ✅ Qualidade definida por cenários manuais de validação; sem gate de testes automatizados.
- ✅ Dependências novas mínimas e justificadas (`tailwindcss`, `postcss`, `autoprefixer`).

### Gate Check (Post-Phase 1)

- ✅ `research.md` resolve decisões de Tailwind, dark mode e estratégia anti-flicker.
- ✅ `data-model.md` descreve entidades de tema, regras de validação e transições.
- ✅ `contracts/theme-ui-contract.md` define contrato de interface do sistema de tema.
- ✅ `quickstart.md` cobre validação manual dos cenários de alternância e persistência.

## Project Structure

### Documentation (this feature)

```text
specs/002-modern-theme-system/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── theme-ui-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── pages/
│   ├── features/
│   │   └── tasks/
│   ├── components/
│   ├── theme/
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   └── theme-types.ts
│   └── styles/
│       └── index.css
├── tailwind.config.ts
├── postcss.config.js
└── package.json

backend/
└── src/
    └── (sem mudanças funcionais planejadas)
```

**Structure Decision**: Estrutura web existente será mantida. A feature ficará
isolada no frontend com módulo dedicado de tema e configuração de Tailwind para
garantir consistência visual e baixo acoplamento com regras de negócio.

## Complexity Tracking

> Sem violações de constituição identificadas.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
