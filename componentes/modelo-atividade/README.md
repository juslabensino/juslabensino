# Modelo oficial de experiência interativa

Esta pasta contém a estrutura-base das novas atividades do JusLab Ensino.

## Arquivos

- `index.html`: estrutura semântica, cabeçalho, navegação, etapas e rodapé.
- `atividade.css`: estilos exclusivos da experiência.
- `dados.js`: casos, alternativas, feedbacks e metadados pedagógicos.
- `atividade.js`: controle de telas, respostas, progresso e síntese.

## Como usar

1. Copiar a pasta para o caminho temático da nova atividade.
2. Substituir os metadados e casos em `dados.js`.
3. Ajustar apenas os elementos específicos em `atividade.css`.
4. Preservar a identidade compartilhada carregada de `assets/css/`.
5. Registrar a nova experiência no `atividades.json` da disciplina.

## Regra de arquitetura

Conteúdo jurídico deve permanecer separado da lógica e da identidade visual sempre que possível. Isso permite corrigir casos e feedbacks sem reconstruir o aplicativo.
