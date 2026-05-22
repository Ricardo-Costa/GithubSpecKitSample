# Quickstart — Task Management App

## 1) Pré-requisitos

- Node.js 20+
- npm 10+
- SQLite 3

## 2) Estrutura esperada

- `frontend/` (React + TypeScript)
- `backend/` (Express + TypeScript)
- `database/schema.sql`

## 3) Setup inicial (manual)

1. Instalar dependências no backend.
2. Instalar dependências no frontend.
3. Criar banco SQLite a partir de `database/schema.sql`.
4. Configurar variável de ambiente do backend para caminho do arquivo `.db`.
5. Subir backend e frontend localmente.

## 4) Fluxo de validação manual (sem testes automatizados)

### Cenário A — Criar tarefa

1. Abrir a tela de cadastro.
2. Informar título, descrição, `dataPrevistaConclusao`, prioridade e status.
3. Salvar.
4. Verificar listagem com os dados corretos.
5. Confirmar `dataConclusaoReal` vazia para tarefa não concluída.

Resultado esperado: tarefa criada e exibida na lista.

### Cenário B — Validação de obrigatórios

1. Tentar salvar sem título.
2. Tentar salvar sem prioridade.
3. Tentar salvar sem status.

Resultado esperado: sistema bloqueia envio e exibe mensagem clara de validação.

### Cenário C — Atualização de status

1. Selecionar tarefa pendente.
2. Alterar para em andamento e salvar.
3. Alterar para concluída e salvar.
4. Reabrir para pendente ou em andamento.

Resultado esperado: ao concluir, `dataConclusaoReal` é preenchida; ao reabrir, `dataConclusaoReal` é limpa.

### Cenário D — Filtros por prioridade, status e data

1. Aplicar filtro por prioridade.
2. Aplicar filtro por status.
3. Aplicar filtro por data escolhendo `dateType=prevista`.
4. Aplicar filtro por data escolhendo `dateType=real`.
5. Combinar filtros.
6. Limpar filtros.

Resultado esperado: listagem respeita critérios ativos; limpeza retorna lista completa.

### Cenário E — Estado vazio

1. Aplicar filtro sem correspondências.

Resultado esperado: mensagem informativa de nenhum resultado.

## 5) Critérios de aceite rápidos

- Cadastro completo de tarefa em até 1 minuto.
- Mensagens de erro claras em 100% dos casos de validação obrigatória.
- Filtros retornam resultados consistentes com os critérios selecionados.
- Nenhum teste automatizado é requisito para esta versão.

## 5.1) Protocolo de medição manual (SC-003)

Objetivo: validar que pelo menos 95% das tarefas são encontradas usando filtros em até 20 segundos.

Passos:

1. Preparar uma base com 20 tarefas contendo combinações variadas de prioridade, status, `dataPrevistaConclusao` e `dataConclusaoReal`.
2. Executar 20 tentativas de busca com critérios conhecidos (prioridade, status e data com `dateType`).
3. Cronometrar cada tentativa do momento da aplicação do filtro até a confirmação visual da tarefa esperada.
4. Registrar resultado como sucesso quando a tarefa correta for encontrada em até 20 segundos.
5. Calcular taxa de sucesso: sucessos / 20.

Critério de aprovação:

- Taxa de sucesso >= 95%.

## 6) Registro de validação manual executada

Data: 2026-05-22

- [x] Health check backend (`GET /health`)
- [x] Criação de tarefa (`POST /api/v1/tasks`)
- [x] Listagem de tarefas (`GET /api/v1/tasks`)
- [x] Atualização de status (`PATCH /api/v1/tasks/:id`)
- [x] Filtro por status (`GET /api/v1/tasks?status=completed`)
- [x] Filtro por data com tipo (`GET /api/v1/tasks?date=...&dateType=prevista|real`)
- [x] Build backend sem erros (`npm run build`)
- [x] Build frontend sem erros (`npm run build`)
