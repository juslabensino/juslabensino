# CHAT CONTEXT — Desenvolvimento do JusLab Aula: Etapa Liminar do Procedimento Comum

Este arquivo resume as decisões e correções feitas ao longo do chat para que o Codex entenda não apenas o estado atual, mas **por que** certas escolhas foram feitas.

## 1. Ponto de partida

O conteúdo jurídico apresentado pelo professor tratava de quatro possíveis posturas iniciais do juiz:
- recebimento;
- emenda;
- indeferimento;
- improcedência liminar.

O problema identificado foi densidade excessiva quando tudo aparecia como quatro institutos paralelos.

A solução didática aprovada foi reorganizar o tema por perguntas sucessivas.

## 2. Primeira arquitetura didática aprovada

Pergunta 1:
> A petição está apta?

Se NÃO:
> O defeito pode ser corrigido?

- SIM → emenda;
- NÃO / não corrigiu → indeferimento.

Se SIM:
a análise avança.

Depois:
> Já é possível rejeitar o pedido desde logo?

- SIM → improcedência liminar;
- NÃO → recebimento/prosseguimento.

O professor reforçou que as **razões do indeferimento e da improcedência liminar** precisam aparecer didaticamente.

## 3. Razões do indeferimento

Organização aprovada:
- inépcia;
- ilegitimidade manifesta;
- falta de interesse processual;
- não atendimento da emenda.

Ideia central:
> Indeferimento = há problema para processar a demanda.

Sem resolução do mérito.

## 4. Razões da improcedência liminar

Organização aprovada:
- contrariedade às hipóteses de precedentes/orientações previstas no art. 332;
- prescrição;
- decadência.

Ideia central:
> Improcedência liminar = já é possível julgar o próprio pedido.

Com resolução do mérito.

## 5. Correção terminológica importante

Foi rejeitada a frase:
> “Ao receber a petição inicial...”

Motivo:
“Recebimento” deve ser reservado ao momento posterior em que os requisitos foram superados e a petição é efetivamente recebida.

Na abertura, usar:
> petição distribuída e encaminhada ao juiz;
> juiz passa a examinar a inicial.

## 6. Distinção JusLab Aula x JusLab Interativo

Houve um erro de nomenclatura no chat: inicialmente foi pedido “JusLab Interativo”, mas o professor corrigiu:
> era para ser um JusLab Aula.

Isso é decisivo.

O produto deve ser uma **apresentação narrativa interativa**, não uma atividade avaliativa ou LMS.

## 7. Crítica às primeiras versões

O professor questionou:
> Essa versão poderia ter sido obtida em PowerPoint?
> Ela emociona?
> Justifica afastar o slide tradicional?

Conclusão conjunta:
- a versão funcional ainda parecia slides com hyperlinks;
- o HTML só se justifica se explorar continuidade, espaço, transformação e interação;
- a mesma petição deve persistir;
- o fluxograma deve nascer da aula, não ser entregue pronto.

## 8. Nova direção narrativa

Aprovada:
- petição como objeto persistente;
- chegada;
- inspeção;
- marcação de defeitos;
- correção;
- destinos possíveis;
- recomposição final.

A meta:
> o aluno não sente que viu sete telas; sente que acompanhou uma petição atravessar o juízo de admissibilidade.

## 9. Ideia da trilha

O professor sugeriu abrir uma linha do tempo/trilha com ramificações.

Refinamento aprovado:
- não literal;
- estilizada;
- linha principal em destaque.

Linha principal:
**Distribuição → Aptidão → Recebimento → Prosseguimento**

As alternativas saem dessa linha.

## 10. Refinamento decisivo da trilha

O professor propôs:

> Da altura da análise da aptidão, abre uma única possibilidade lateral. Dessa linha lateral duas coisas podem ocorrer:
> 1. Se indeferir, extingue (acaba a linha);
> 2. Se regularizar a inicial, o ritmo retorna à linha principal.

Essa ideia foi aprovada como superior.

Consequência:
- a emenda/correção NÃO é um destino final;
- é um desvio com possível retorno;
- o indeferimento é terminal.

A improcedência liminar é outro desvio terminal, mas só depois de a petição estar apta e antes do recebimento.

## 11. Bugs de versões intermediárias

Várias versões posteriores ficaram logicamente quebradas:
- NÃO em aptidão levando a recebimento;
- SIM/NÃO sem avançar;
- ordem dos acontecimentos desorganizada.

O professor pediu revisão total.

Por isso a v9 foi reconstruída com:
- estados declarativos;
- `data-go`;
- função `render()`;
- menor dependência de handlers espalhados.

## 12. CTA de abertura

O professor pediu:
> colocar o botão "examinar a petição" com mais destaque.
> Que tal associá-lo a uma lupa ou caneta?

Decisão:
- lupa é melhor para “examinar”;
- caneta pode ser usada na emenda.

A v9 já contém uma lupa no CTA.

## 13. Estado desejado agora

Não é suficiente apenas “funcionar”.

A próxima versão precisa:
- corrigir/validar toda a trilha;
- melhorar o gesto espacial de saída e retorno;
- refinar o design;
- manter a arquitetura jurídica fixa;
- aumentar a diferença qualitativa em relação ao PowerPoint.

Consulte também:
- `CODEX_HANDOFF_ETAPA_LIMINAR.md`
- `juslab_aula_etapa_liminar_v9_reconstruida.html`
