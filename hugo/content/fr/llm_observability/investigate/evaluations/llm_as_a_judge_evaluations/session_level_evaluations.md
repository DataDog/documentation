---
aliases:
- /fr/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/session_level_evaluations/
- /fr/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/session_level_evaluations/
description: Exécutez un LLM-as-a-judge personnalisé sur une session utilisateur entière,
  avec des exemples sur le moment d'utiliser le périmètre de session plutôt que le
  périmètre de trace ou de span.
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: Documentation
  text: Évaluations personnalisées LLM-as-a-judge
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
  tag: Documentation
  text: Évaluations au niveau de la trace
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
  tag: Documentation
  text: Templating de prompt
- link: /llm_observability/instrument/sdk/#tracking-user-sessions
  tag: Documentation
  text: Suivi des sessions utilisateur
title: Évaluations au niveau de la session
---
Une évaluation au niveau de la session s'exécute une fois par [session utilisateur][9], avec chaque trace — et chaque span dans ces traces — disponible pour le juge LLM dans une seule invite. Les sessions regroupent les interactions associées sous un `session_id` partagé (par exemple, une conversation par chat) et peuvent inclure plusieurs traces sur une interaction étendue.

Le périmètre de session répond aux questions sur les performances de l'agent et le comportement de l'utilisateur sur une interaction entière — des questions auxquelles les juges au niveau de la trace et du span ne peuvent pas répondre à partir d'une seule requête ou d'un seul span.

<div class="alert alert-info">Les évaluations au niveau de la session nécessitent que les spans soient marqués avec un <code>session_id</code>. Consultez <a href="/llm_observability/instrument/sdk/#tracking-user-sessions">Suivi des sessions utilisateur</a> pour instrumenter votre application.</div>

## Configurez une évaluation au niveau de la session {#configure-a-session-level-evaluation}

La procédure pas à pas ci-dessous met en évidence les parties de la configuration qui sont spécifiques au périmètre de session. Le reste de la configuration (compte, modèle, type de sortie, critères d'évaluation) est identique à celui des évaluations à périmètre de span ou de trace.

1. Accédez à la page [Evaluations][1] d'Agent Observability et sélectionnez {{< ui >}}Create Evaluation{{< /ui >}}, puis dans le `Evaluate On` sélectionnez {{< ui >}}Session{{< /ui >}}. (Vous pouvez également commencer à partir d'une [évaluation modèle][2].)
1. Remplissez le {{< ui >}}evaluation name{{< /ui >}}, le {{< ui >}}account{{< /ui >}} et le {{< ui >}}model{{< /ui >}} comme vous le feriez pour toute évaluation LLM-as-a-judge personnalisée.

   {{< img src="llm_observability/evaluations/session_level_evaluation_scope.png" alt="Le sélecteur de périmètre Evaluate On avec Session sélectionné." style="width:100%;" >}}

   <div class="alert alert-info">Une session est considérée comme terminée après 30 minutes d'inactivité (aucun nouveau span pour cette session, mesuré à partir du span le plus récent), moment auquel l'évaluation s'exécute. Les spans qui arrivent plus de 30 minutes après le span précédent ne sont pas inclus dans l'évaluation.</div>

1. Ajoutez un {{< ui >}}Query{{< /ui >}} et un {{< ui >}}Sampling Rate{{< /ui >}} pour contrôler quelles sessions sont évaluées.
1. Dans le champ {{< ui >}}System Prompt{{< /ui >}}, saisissez les instructions statiques pour le juge LLM — par exemple, les critères que le juge doit utiliser et la sortie qu'il doit produire. Le System Prompt ne résout pas les espaces réservés `{{ ... }}`.
1. Dans le message {{< ui >}}User{{< /ui >}}, rédigez l'invite qui injecte les données de session en utilisant `{{traces...}}` paths. The autocomplete dropdown adapts to session scope and lists fields available on the selected sample session. The `{{span_input}}` and `{{span_output}}` aliases are not available in session scope—reference span data through the `tableau traces` à la place. Modèles courants :

   ```
   {{traces}}                                              # JSON de chaque trace dans la session
   {{traces[0].spans[0].meta.input.value}}                 # Premier span de la première trace
   {{traces[*].spans[*].name}}                             # Tous les noms de span, joints par des retours à la ligne
   {{traces[*].spans[meta.span.kind:llm].meta.output.value}}  # Sorties LLM sur toute la session
   {{*}}                                                   # Charge utile complète de la session au format JSON
   ```

   See [Prompt Templating][3] for the full reference.

   {{< img src="llm_observability/evaluations/session_level_prompt_editor.png" alt="L'éditeur d'invites utilisateur pour une évaluation au niveau de la session, avec la liste déroulante de saisie semi-automatique affichant les champs préfixés par traces après la saisie de deux accolades ouvrantes." style="width:100%;" >}}

1. Choisissez une session exemple dans le panneau de droite. Le volet liste les traces de cette session, avec les champs référencés par votre éditeur d'invite utilisateur mis en surbrillance.

   {{< img src="llm_observability/evaluations/session_level_sample_session_trace_view.png" alt="La page de configuration dans le périmètre de la session, avec le volet de session d'exemple sur la droite affichant les traces et les champs de span mis en surbrillance." style="width:100%;" >}}


1. Cliquez sur {{< ui >}}Test Evaluation{{< /ui >}} pour exécuter l'invite sur la session sélectionnée et prévisualiser le résultat du juge LLM avant d'enregistrer.
1. Poursuivez avec le reste de la [configuration de l'évaluation][5] (type de sortie, critères d'évaluation) et {{< ui >}}Save and Publish{{< /ui >}} pour commencer à exécuter l'évaluation sur de nouvelles sessions.

## Achèvement de la session {#session-completion}

Une évaluation au niveau de la session se déclenche après que Datadog considère qu'une session est terminée. Une session est terminée après 30 minutes d'inactivité, c'est-à-dire que 30 minutes se sont écoulées sans qu'aucun nouveau span n'arrive pour cette session (mesuré à partir du span le plus récent).

Lorsque la session se termine, l'évaluation s'exécute une fois avec chaque trace et chaque span de ces traces de cette session disponibles dans l'invite du juge. Tous les spans qui arrivent plus de 30 minutes après le span précédent d'une session ne sont pas inclus dans l'évaluation au niveau de la session.

## Voir les résultats {#view-results}

Une fois une session terminée, son résultat d'évaluation est joint à la session et est disponible dans Agent Observability en temps quasi réel. Tant que la session est dans sa fenêtre d'inactivité de 30 minutes, le résultat s'affiche sous la forme {{< ui >}}Pending{{< /ui >}} dans le panneau latéral ; une fois la session terminée, la ligne en attente est remplacée par le résultat final.

Dépliez le {{< ui >}}Session evaluations{{< /ui >}} sur une session pour voir chaque évaluation qui a été exécutée pour celle-ci, ainsi que le raisonnement du juge LLM lorsque {{< ui >}}Enable Reasoning{{< /ui >}} était activé au moment de la configuration. Le raisonnement explique *pourquoi* le juge a produit cette valeur et fait référence à des champs de trace ou de span spécifiques sur lesquels il s'est appuyé — utilisez-le pour trier les échecs individuels et décider s'il faut affiner le prompt ou accepter le verdict.

{{< img src="llm_observability/evaluations/session_level_eval_results.png" alt="Un panneau de détails de session avec la section Évaluations de session développée. Le tableau répertorie huit évaluations — dont l'exhaustivité de l'objectif, la toxicité, la pertinence du sujet, la sélection d'outils, le sentiment et l'injection de prompt —, chacune avec une valeur de résultat affichée sous forme de badge coloré (par exemple, True, Not Toxic ou On Topic) et un aperçu du raisonnement du juge LLM." style="width:100%;" >}}

## Exemples d'invites {#example-prompts}

### Exhaustivité de l'objectif de la session {#session-goal-completeness}

Évaluez si l'utilisateur a accompli ce qu'il était venu faire sur l'ensemble de la session, y compris les tours de suivi dans des traces distinctes.

**Prompt système**

```
You are evaluating an LLM chatbot session. You will see every trace in the session, including all user messages and assistant responses across turns.

Decide whether the user's goals were fully met by the end of the session. Consider:
- All distinct intents the user expressed during the session
- Whether follow-up questions indicate unresolved needs
- Whether the final state of the conversation leaves the user satisfied

Respond with one of: completed, partially_completed, failed.
```

**Utilisateur**

```
Session traces:
{{traces}}
```

Le modèle d'évaluation géré [Goal Completeness][11] implémente ce modèle.

### Qualité de la conversation multi-tours {#multi-turn-conversation-quality}

Évaluez la cohérence, la rétention du contexte et le ton sur l'ensemble de la session plutôt que sur un seul échange.

**Prompt système**

```
You will see a multi-turn chat session between a user and an assistant across multiple traces.

Evaluate the session as a whole on:
- Coherence across turns
- Whether the assistant remembered relevant context from earlier turns
- Whether tone and helpfulness stayed consistent

Output one of: excellent, good, mixed, poor.
```

**Utilisateur**

```
User and assistant messages across the session:
{{traces[*].spans[meta.span.kind:llm].meta.input.messages[*].content}}
{{traces[*].spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

### Comportement de l'utilisateur et signaux de frustration {#user-behavior-and-frustration-signals}

Détectez les modèles comportementaux qui n'apparaissent que lorsqu'on examine l'ensemble de la session.

**Prompt système**

```
Analyze this user session for signs of frustration, confusion, or abandonment.

Look for:
- Repeated or rephrased questions on the same topic
- Explicit expressions of dissatisfaction
- The user stopping after an incomplete or unhelpful answer

Output one of: no_issues, mild_frustration, high_frustration, abandoned.
```

**Utilisateur**

```
Full session:
{{traces}}
```

### Cohérence de l'Agent sur une session {#agent-consistency-across-a-session}

Vérifiez si l'agent a maintenu la qualité et la conformité aux politiques à chaque tour de la session.

**Prompt système**

```
You will see all traces from one agent session. Assess whether the agent performed consistently:

- Did later turns contradict earlier correct answers?
- Did the agent recover from errors, or repeat the same mistake?
- Were safety and policy guidelines followed on every turn?

Respond with: consistent, mixed, inconsistent.
```

**Utilisateur**

```
Session traces (chronological):
{{traces}}
```

## Choisir le bon périmètre {#choosing-the-right-scope}

| Périmètre | Ce que le juge voit | Angle mort typique |
|---|---|---|
| Span | Entrée et sortie d'un span | Aucun contexte inter-span ou inter-trace |
| Trace | Tous les spans dans une trace | Aucun tour précédent ou ultérieur dans la même session de chat |
| Session | Toutes les traces (et spans) d'une session | — |

Utilisez le périmètre {{< ui >}}Session{{< /ui >}} lorsque l'évaluation nécessite un contexte provenant de plus d'une trace au sein de la même session utilisateur :

- Satisfaction de l'utilisateur — si la session dans son ensemble a répondu à l'intention de l'utilisateur, et pas seulement la dernière réponse.
- Cohérence multi-tours — si l'assistant est resté sur le sujet, a maintenu le ton et a conservé le contexte pertinent à travers des tours situés dans des traces différentes.
- Comportement de l'utilisateur au fil du temps — modèles tels que la frustration, la confusion, le changement de sujet ou l'abandon avant que l'agent n'ait fini d'aider.
- Performance de l'Agent sur une session — cohérence, régression après des échecs d'outils, ou si l'agent s'est rétabli après des erreurs lors d'un tour ultérieur.

Utilisez le périmètre {{< ui >}}Trace{{< /ui >}} lorsque la réponse dépend d'étapes au sein d'une seule requête — par exemple, l'ordre des appels d'outils, la fidélité RAG au sein d'une exécution de workflow, ou l'atteinte de l'objectif pour une invocation d'agent : Voir [Évaluations au niveau de la trace][10].

Utilisez le périmètre {{< ui >}}Span{{< /ui >}} lorsque l'évaluation peut être effectuée à partir d'un span unique en isolation — par exemple, pour noter une seule réponse LLM, classifier l'intention sur un message, ou valider les arguments d'outil sur un seul appel.

## Autorisations {#permissions}

La configuration des évaluations nécessite la `Agent Observability Write` [permission][4].

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
[9]: /fr/llm_observability/instrument/sdk/#tracking-user-sessions
[10]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
[11]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations/#goal-completeness