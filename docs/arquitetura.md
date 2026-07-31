# Arquitetura da plataforma JusLab Ensino

A plataforma é organizada por disciplina e, dentro de cada disciplina, por blocos curriculares e assuntos.

## Estrutura inicial

```text
materias/
├── processo-civil/
│   ├── 01-teoria-geral-do-processo/
│   │   ├── 01-formas-de-solucao-do-conflito/
│   │   ├── 02-jurisdicao/
│   │   ├── 03-acao/
│   │   └── 04-processo/
│   ├── 02-processo-de-conhecimento/
│   ├── 03-sistema-recursal/
│   ├── 04-cumprimento-de-sentenca/
│   └── 05-procedimentos-especiais/
├── direito-civil/
├── ied/
└── antropologia/
```

## Regras de organização

1. Cada atividade interativa deve ficar em uma pasta própria e usar `index.html` como arquivo principal.
2. Os nomes das pastas devem usar letras minúsculas, hífens e ausência de acentos.
3. Novos materiais de Processo Civil devem ser classificados em um dos cinco blocos definidos pelo professor.
4. Recursos compartilhados futuramente poderão ser centralizados em `assets/` e `componentes/`.
5. A página inicial da disciplina deve oferecer navegação para os blocos e atividades disponíveis.

## Primeiro módulo publicado

`materias/processo-civil/01-teoria-geral-do-processo/02-jurisdicao/competencia/competencia-absoluta-e-relativa/index.html`
