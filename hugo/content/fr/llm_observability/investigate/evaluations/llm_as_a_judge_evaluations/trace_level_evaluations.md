---
aliases:
- /fr/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations/
- /fr/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations/
description: Exécutez un LLM-as-a-judge personnalisé sur une trace entière, avec des
  exemples de cas où il faut utiliser le périmètre de trace plutôt que le périmètre
  de span.
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: Documentation
  text: Évaluateurs LLM-as-a-Judge personnalisés
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
  tag: Documentation
  text: Templating de prompt
- link: /llm_observability/quickstart/terms/
  tag: Documentation
  text: Termes et concepts d'Agent Observability
title: Évaluateurs au niveau de la trace
---
Un évaluateur au niveau de la trace s'exécute une fois par trace, avec chaque span de la trace disponible pour le juge LLM dans une seule invite. C'est le bon choix lorsque la réponse à une question dépend de l'interaction entre les spans — par exemple, si un agent a atteint son objectif, si les outils ont été appelés dans le bon ordre, ou si une conversation à plusieurs tours est restée sur le sujet.

Les évaluateurs au niveau du span, en revanche, s'exécutent une fois par span correspondant et ne voient que l'entrée et la sortie de ce span.

## Quand utiliser le périmètre de trace plutôt que le périmètre de span {#when-to-use-trace-scope-over-span-scope}

Utilisez le périmètre {{< ui >}}Trace{{< /ui >}} lorsque l'évaluation nécessite un contexte provenant de plus d'un span :

- La réponse dépend d'une séquence d'étapes (un appel d'outil suivi d'une réponse LLM qui utilise la sortie de l'outil).
- Le juge doit examiner une réponse finale dans le contexte d'un raisonnement intermédiaire.
- Un « pass » dépend de quelque chose qui s'est produit plus tôt dans la trace (une récupération, une règle de sécurité, un refus).

Utilisez le périmètre {{< ui >}}Span{{< /ui >}} lorsque l'évaluation peut être effectuée à partir d'un seul span en isolement — par exemple, en attribuant une note à la qualité d'une réponse LLM, en classant l'intention de l'utilisateur sur le span racine ou en vérifiant qu'un outil a reçu des arguments bien formés.

## Cas d'utilisation et exemples {#use-cases-and-examples}

### 1. Atteinte de l'objectif pour un agent multi-étapes {#1-goal-completion-for-a-multi-step-agent}

Notez si un agent a terminé ce que l'utilisateur a demandé, compte tenu de la séquence complète des appels d'outils et des étapes de raisonnement.

**Prompt système**

```
You are evaluating an AI agent that helps users complete tasks. You will see the full trace of an agent run, including every LLM call, tool invocation, and intermediate response.

Your job is to decide whether the agent achieved the user's goal. Consider:
- Did the agent understand the user's request?
- Did the tool calls and reasoning steps actually progress toward the goal?
- Is the final response a complete answer, or does it leave the request unfinished?

Respond with one of: completed, partially_completed, failed.
```

**Utilisateur**

```
// {{spans[0].meta.input.value}} → input of the trace's first span (the user goal).
User goal: {{spans[0].meta.input.value}}

// {{spans}} → JSON of every span in the trace, in order.
Agent steps:
{{spans}}
```

### 2. Exactitude de l'utilisation des outils {#2-tool-use-correctness}

Vérifiez si un agent a appelé le bon outil avec les bons arguments pour la question de l'utilisateur.

**Prompt système**

```
You will see a trace where an LLM agent decides which tool to call and with what arguments. Decide whether the chosen tool and its arguments were appropriate for the user's request.

Score from 1 (clearly wrong tool or arguments) to 5 (perfect tool choice and arguments).
```

**Utilisateur**

```
// First span's input—the user's original question.
User question: {{spans[0].meta.input.value}}

// `[meta.span.kind:tool]` filter → keeps only spans whose kind is "tool".
// `.meta.input.parameters` → the arguments passed to each matching tool call.
Tool calls made during this trace:
{{spans[meta.span.kind:tool].meta.input.parameters}}

// `[*]` wildcard → fan out across every span; outputs are joined with newlines.
Final response:
{{spans[*].meta.output.value}}
```

### 3. Fidélité dans un workflow RAG {#3-faithfulness-in-a-rag-workflow}

Vérifiez si la réponse finale est fondée sur les documents qui ont été récupérés plus tôt dans la trace.

**Prompt système**

```
You will see a trace from a retrieval-augmented generation pipeline. The retrieval step provides context documents, and a downstream LLM step produces an answer.

Decide whether the final answer is supported by the retrieved documents. Mark `true` only if every factual claim in the answer can be traced back to one of the documents.
```

**Utilisateur**

```
// `[meta.span.kind:retrieval]` filter → only retrieval spans (the documents fetched).
// `.meta.output.documents[*].text` → the text of every document the retrieval returned,
//                                     joined with newlines.
Retrieved context:
{{spans[meta.span.kind:retrieval].meta.output.documents[*].text}}

// `[meta.span.kind:llm]` filter → outputs of the LLM call(s) that produced the answer.
Final answer:
{{spans[meta.span.kind:llm].meta.output.value}}
```

### 4. Qualité de la conversation au fil des tours {#4-conversation-quality-across-turns}

Notez la qualité globale d'une conversation à plusieurs tours, en tenant compte de la cohérence entre les tours plutôt que de la qualité d'une réponse unique.

**Prompt système**

```
You will see a multi-turn conversation between a user and an assistant. Evaluate the conversation as a whole on:
- Coherence across turns
- Whether the assistant remembered relevant context from earlier turns
- Whether the assistant's tone stayed consistent

Output one of: excellent, good, mixed, poor.
```

**Utilisateur**

```
// `meta.input.messages[*].content` → fans out over each LLM span's input messages
//                                     and joins their content with newlines.
Conversation:
{{spans[meta.span.kind:llm].meta.input.messages[*].content}}

// Same pattern, but on the LLM output messages—the assistant's replies.
Assistant responses:
{{spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

## Comment fonctionne la complétion de trace {#how-trace-completion-works}

Une évaluation au niveau de la trace se déclenche après que Datadog considère une trace comme complète. Une trace est **complète** après **3 minutes** d'inactivité — c'est-à-dire que trois minutes se sont écoulées sans qu'aucun nouveau span n'arrive pour cette trace.

Tous les spans qui arrivent plus de 3 minutes après le span précédent sur une trace ne sont pas inclus dans l'évaluation au niveau de la trace. Si votre application émet des agents à longue durée d'exécution dont les étapes sont espacées de plus de 3 minutes, prévoyez que ces spans tardifs seront exclus.

## Configurer un évaluateur au niveau de la trace {#configure-a-trace-level-evaluator}

La procédure ci-dessous met en évidence les parties de la configuration spécifiques au périmètre de trace. Le reste de la configuration (compte, modèle, type de sortie, critères d'évaluation) est identique à celle des évaluateurs à périmètre de span.

1. Accédez à la page [Evaluators][1] d'Agent Observability et sélectionnez {{< ui >}}Create Evaluator{{< /ui >}}, puis dans le `Evaluate On` sélectionnez {{< ui >}}Trace{{< /ui >}}. (Vous pouvez également partir d'un [modèle d'évaluateur][2].)
1. Remplissez le {{< ui >}}evaluator name{{< /ui >}}, le {{< ui >}}account{{< /ui >}} et le {{< ui >}}model{{< /ui >}} comme vous le feriez pour tout évaluateur LLM-as-a-judge personnalisé.
1. Sous {{< ui >}}Evaluation Type{{< /ui >}} >, sélectionnez {{< ui >}}Trace{{< /ui >}}.

   {{< img src="llm_observability/evaluations/trace_level_evaluation_scope.png" alt="Le sélecteur de périmètre Evaluate On avec Trace sélectionné et Span comme alternative." style="width:100%;" >}}

   <div class="alert alert-info">Une trace est considérée comme complète après <strong>3 minutes</strong> d'inactivité (aucun nouveau span pour cette trace), moment auquel l'évaluation s'exécute. Les spans qui arrivent plus de 3 minutes après le span précédent ne sont pas inclus dans l'évaluation.</div>

1. Ajoutez un {{< ui >}}Query{{< /ui >}} et un {{< ui >}}Sampling Rate{{< /ui >}} pour contrôler quelles traces sont évaluées. La requête est comparée au span racine de la trace — par exemple, `@name:agent.workflow` évalue uniquement les traces dont le span racine est nommé `agent.workflow`.
1. Dans le champ {{< ui >}}System Prompt{{< /ui >}}, saisissez les instructions statiques pour le juge LLM — par exemple, les critères que le juge doit utiliser et la sortie qu'il doit produire. Le System Prompt ne résout pas les espaces réservés `{{ ... }}`.
1. Dans le message {{< ui >}}User{{< /ui >}}, rédigez le prompt qui injecte les données de trace en utilisant `{{spans...}}` paths. The autocomplete dropdown adapts to trace scope and lists every field available on the selected sample trace. The `{{span_input}}` and `{{span_output}}` aliases are not available in trace scope—reference span data through the `au lieu du tableau `spans`. Modèles courants :

   ```
   {{spans}}                                         # JSON de chaque span dans la trace
   {{spans[0].meta.input.value}}                     # Premier span uniquement
   {{spans[*].name}}                                 # Tous les noms de spans, séparés par des retours à la ligne
   {{spans[name:my-span].meta.input.value}}          # Filtrer les spans par attribut
   {{spans[meta.span.kind:llm].meta.output.value}}   # Sorties de tous les spans de type LLM
   {{*}}                                             # Charge utile complète de la trace au format JSON
   ```

   See [Prompt Templating][3] for the full reference.

   {{< img src="llm_observability/evaluations/trace_level_prompt_editor.png" alt="L'éditeur de prompt utilisateur pour un évaluateur au niveau de la trace, avec la liste déroulante de saisie semi-automatique affichant les champs préfixés par spans après la saisie de deux accolades ouvrantes." style="width:100%;" >}}

1. Choisissez une trace exemple dans le panneau de droite. Le titre du volet devient {{< ui >}}Spans in Selected Trace{{< /ui >}} et affiche les spans de cette trace, avec les champs référencés par votre prompt mis en surbrillance.

   {{< img src="llm_observability/evaluations/trace_level_filtered_traces.png" alt="La page de configuration dans le périmètre de la trace, avec le volet Spans in Selected Trace sur la droite affichant les valeurs d'entrée et de sortie d'un span mises en surbrillance." style="width:100%;" >}}

1. Cliquez sur {{< ui >}}Test Evaluator{{< /ui >}} pour exécuter le prompt sur la trace sélectionnée et prévisualiser le résultat du juge LLM avant d'enregistrer.
1. Continuez avec le reste de la [configuration de l'évaluateur][5] (type de sortie, critères d'évaluation) et {{< ui >}}Save and Publish{{< /ui >}} pour commencer à exécuter l'évaluateur sur de nouvelles traces.

## Affichage des résultats {#viewing-results}

Une fois qu'une trace est terminée, son résultat d'évaluation est joint à la trace elle-même et est disponible dans Agent Observability en temps quasi réel. Tant que la trace est dans sa fenêtre d'inactivité de 3 minutes, le résultat apparaît sous la forme {{< ui >}}Pending{{< /ui >}} dans le panneau latéral ; une fois la trace terminée, la ligne en attente est remplacée par le résultat final.

### Résultats de la requête {#query-results}

Les résultats de l'évaluation au niveau de la trace utilisent la même syntaxe de requête que les évaluations au niveau du span. Utilisez ces modèles dans l'Agent Observability Traces Explorer, dans les dashboards et dans les requêtes de surveillance :

| Requête | Objectif |
|---|---|
| `@evaluation.<evaluation_name>.value:complete` | Filtrer les traces avec une valeur d'évaluation spécifique |
| `@evaluation.<evaluation_name>.assessment:fail` | Filtrer les traces qui n'ont pas rempli les critères de pass de votre évaluateur |
| `@evaluation.<evaluation_name>.value:*` | Toutes les traces qui ont un résultat pour cet évaluateur (exclut les en attente) |

Remplacez `<evaluation_name>` par le nom que vous avez défini lors de la création de l'évaluateur. Les valeurs d'évaluation peuvent également être utilisées comme [facettes][6] pour le regroupement dans les dashboards et les monitors.

### Résultats de débogage {#debug-results}

Ouvrez l'onglet {{< ui >}}Evaluations{{< /ui >}} sur une trace pour voir chaque évaluation qui a été exécutée pour celle-ci, ainsi que le raisonnement du juge LLM lorsque {{< ui >}}Enable Reasoning{{< /ui >}} était activé au moment de la configuration. Le raisonnement explique *pourquoi* le juge a produit cette valeur et fait référence à des champs span spécifiques sur lesquels il s'est appuyé ; utilisez-le pour trier les échecs individuels et décider s'il faut affiner le prompt ou accepter le verdict.

{{< img src="llm_observability/evaluations/trace_level_results_sidepanel.png" alt="L'onglet Évaluations d'une trace terminée, affichant le résultat de l'évaluation au niveau de la trace avec le raisonnement du juge LLM développé." style="width:100%;" >}}

### Résultats du monitor {#monitor-results}

Intégrez les résultats de l'évaluation au niveau de la trace dans des [monitors][7] et des [files d'attente d'annotation][8] pour alerter sur les régressions et acheminer les échecs pour révision humaine :

- **Surveiller la baisse du taux de réussite.** Créez un monitor avec une requête comme la suivante pour recevoir une alerte lorsque le taux de réussite glissant baisse :

  ```
  formula(100 * a / b) < 80
    where a = count(@evaluation.<evaluation_name>.assessment:pass) by {ml_app}
          b = count(@evaluation.<evaluation_name>.value:*) by {ml_app}
  over last_15m
  ```

- **Acheminer les échecs vers une file d'attente d'annotation.** Configurez une [Règle d'automatisation][8] qui correspond à `@evaluation.<evaluation_name>.assessment:fail` et ajoute la trace à une file d'attente d'annotation pour un réviseur humain. Cela ferme la boucle sur les erreurs d'évaluation : les traces échouées sont revues, les erreurs d'étiquetage sont corrigées, et les corrections constituent le jeu de données que vous utilisez pour affiner le prompt de l'évaluateur.

## Autorisations {#permissions}

La configuration des évaluateurs nécessite la `Agent Observability Write` [permission][4].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations
[3]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
[4]: /fr/account_management/rbac/permissions/#llm-observability
[5]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#define-the-evaluation-output
[6]: /fr/events/explorer/facets/
[7]: /fr/monitors/
[8]: /fr/llm_observability/investigate/annotation_queues