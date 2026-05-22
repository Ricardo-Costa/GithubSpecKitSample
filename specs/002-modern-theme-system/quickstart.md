# Quickstart — Modern Theme System

## 1) Pré-requisitos

- Node.js 20+
- npm 10+
- Projeto frontend em execução local

## 2) Objetivo da validação

Validar que a aplicação usa Tailwind CSS como base de estilização moderna,
permite ativar/desativar modo escuro, mantém consistência visual e persiste a
preferência entre sessões.

## 3) Setup manual

1. Instalar dependências do frontend.
2. Garantir configuração ativa de Tailwind (`tailwind.config.*` e entrada CSS global).
3. Iniciar frontend em modo de desenvolvimento.

## 4) Fluxo de validação manual

### Cenário A — Renderização com tema padrão

1. Limpar preferência de tema no browser.
2. Abrir a aplicação.
3. Observar modo inicial.

Resultado esperado: modo padrão `light` aplicado sem estilos quebrados.

### Cenário B — Ativar modo escuro

1. Na interface principal, acionar controle de tema para modo escuro.
2. Verificar fundo, texto, bordas, botões e formulários.

Resultado esperado: modo `dark` ativo com contraste legível e padrão visual consistente.

### Cenário C — Desativar modo escuro

1. Com o modo escuro ativo, acionar controle para retornar ao modo claro.
2. Navegar entre formulário, filtros e lista de tarefas.

Resultado esperado: modo `light` reativado, sem perda de dados em edição e sem inconsistências visuais.

### Cenário D — Persistência entre sessões

1. Definir modo escuro.
2. Recarregar a página e depois fechar/abrir novamente.
3. Repetir o processo com modo claro.

Resultado esperado: último modo escolhido é restaurado automaticamente em ambos os casos.

### Cenário E — Fallback para preferência inválida

1. Alterar manualmente a chave de tema no storage para valor inválido.
2. Recarregar a aplicação.

Resultado esperado: sistema aplica fallback para `light` sem erro de execução.

### Cenário F — Verificação anti-flicker

1. Definir modo escuro.
2. Recarregar página observando os primeiros instantes de renderização.

Resultado esperado: ausência de flash perceptível de tema claro antes de aplicar modo escuro.

## 5) Critérios de aceite rápidos

- Troca de tema concluída em até 10 segundos por usuário comum.
- Aplicação visual do novo tema ocorre sem recarregar página.
- Persistência correta em pelo menos 95% das tentativas manuais.
- Componentes principais mantêm contraste legível nos dois modos.

## 6) Registro sugerido de validação

Data: 22/05/2026

- [x] Toggle light/dark funcional
- [x] Persistência de preferência funcional
- [x] Fallback de valor inválido funcional
- [x] Sem flicker perceptível
- [x] Build frontend sem erros
