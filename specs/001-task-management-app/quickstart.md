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
2. Informar título, descrição, data, prioridade e status.
3. Salvar.
4. Verificar listagem com os dados corretos.

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

Resultado esperado: status reflete corretamente na listagem após cada alteração.

### Cenário D — Filtros por prioridade, status e data

1. Aplicar filtro por prioridade.
2. Aplicar filtro por status.
3. Aplicar filtro por data.
4. Combinar filtros.
5. Limpar filtros.

Resultado esperado: listagem respeita critérios ativos; limpeza retorna lista completa.

### Cenário E — Estado vazio

1. Aplicar filtro sem correspondências.

Resultado esperado: mensagem informativa de nenhum resultado.

## 5) Critérios de aceite rápidos

- Cadastro completo de tarefa em até 1 minuto.
- Mensagens de erro claras em 100% dos casos de validação obrigatória.
- Filtros retornam resultados consistentes com os critérios selecionados.
- Nenhum teste automatizado é requisito para esta versão.
