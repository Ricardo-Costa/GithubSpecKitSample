<!--
Sync Impact Report
- Version change: N/A (template) → 1.0.0
- Modified principles:
	- Principle 1 placeholder → I. Small Scope First
	- Principle 2 placeholder → II. Readability Over Cleverness
	- Principle 3 placeholder → III. Single Responsibility by Default
	- Principle 4 placeholder → IV. Explicit Contracts and Errors
	- Principle 5 placeholder → V. Lightweight Quality Gates (No Initial Automated Tests)
- Added sections:
	- Project Constraints
	- Development Workflow
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ⚠ pending: .specify/templates/commands/*.md (directory not present; no files to update)
- Follow-up TODOs:
	- None
-->

# GitHub SpecKit Sample Constitution

## Core Principles

### I. Small Scope First
Every feature MUST be scoped to a small, deliverable increment that can be
understood in one short review session. Large or broad changes MUST be split
into smaller units before implementation. Rationale: a small project remains
maintainable when change size stays controlled.

### II. Readability Over Cleverness
Code MUST optimize for clarity, predictable naming, and straightforward control
flow. Dense abstractions, hidden side effects, and "smart" shortcuts that harm
understanding MUST be avoided. Rationale: clean code is code that other
contributors can safely read and modify.

### III. Single Responsibility by Default
Each module, class, and function MUST have one primary responsibility.
Functions SHOULD stay short and focused; when a unit has multiple concerns, it
MUST be split. Rationale: low coupling and high cohesion reduce regression risk
and simplify future refactors.

### IV. Explicit Contracts and Errors
Public inputs and outputs MUST be explicit, validated at boundaries, and
documented in the related spec artifacts. Errors MUST fail fast with actionable
messages; silent failure paths are prohibited. Rationale: explicit contracts
make behavior trustworthy and debugging fast.

### V. Lightweight Quality Gates (No Initial Automated Tests)
For the initial project phase, automated tests are NOT required and MUST NOT
block delivery. Quality MUST instead be demonstrated through clear acceptance
scenarios, manual verification steps, linting, and review checklists. When
project complexity grows, automated tests SHOULD be introduced by amendment.
Rationale: the current project is intentionally small and simple, favoring fast
iteration with disciplined manual validation.

## Project Constraints

- The project MUST remain small in architecture and dependency footprint.
- New dependencies MUST be justified in the implementation plan.
- Prefer built-in language capabilities over external frameworks when feasible.
- Documentation MUST stay concise and directly tied to user-visible behavior.

## Development Workflow

- Each change MUST map to a user story or requirement in the active spec.
- Pull requests MUST include: scope summary, manual validation evidence, and
	clean-code compliance notes.
- Reviewers MUST reject changes that violate readability, responsibility, or
	explicit contract principles.
- Refactoring that improves clarity without changing behavior is encouraged and
	SHOULD be done continuously in small increments.

## Governance

This constitution is the highest project policy. All plans, specs, tasks, and
implementation work MUST pass the Constitution Check before execution.

Amendments require:
1. A documented proposal describing the principle change and impact.
2. Updates to affected templates and workflow guidance in the same change.
3. A version update using semantic versioning:
	 - MAJOR: incompatible governance or principle removals/redefinitions.
	 - MINOR: new principle/section or materially expanded policy.
	 - PATCH: wording clarifications without policy change.

Compliance review is mandatory for each pull request and MUST verify alignment
with all five core principles and project constraints.

**Version**: 1.0.0 | **Ratified**: 2026-05-21 | **Last Amended**: 2026-05-21
