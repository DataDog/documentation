---
aliases:
- /fr/llm_observability/monitoring/querying/
description: Apprenez à interroger les spans et les traces d'Agent Observability dans
  le Trace Explorer, y compris comment rechercher par attribut, par tags et par propriétés
  au niveau de la trace.
further_reading:
- link: tracing/trace_explorer/query_syntax/
  tag: Documentation
  text: Syntaxe de requête du Trace Explorer
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centre d'apprentissage
  text: Examinez avec Agent Observability
title: Interrogation des spans et des traces
---
## Présentation {#overview}
Cette page explique comment utiliser le [Agent Observability Trace Explorer][1] de Datadog pour interroger les spans et les traces de votre application LLM.

#### Interroger à travers les spans ou les traces {#querying-across-spans-versus-traces}
Dans Agent Observability, un _span_ représente une unité de travail correspondant à une opération unique dans votre application LLM. Une _trace_ représente l'ensemble des opérations de bout en bout impliquées dans le traitement d'une requête dans votre application LLM, constituée souvent d'un ou de plusieurs spans imbriqués. Pour plus d'informations sur cette terminologie, consultez [Termes et concepts d'Agent Observability][2].

Dans le [Agent Observability Trace Explorer][1], choisissez de rechercher parmi les traces ou les spans :
- Sélectionnez {{< ui >}}Traces{{< /ui >}} pour trouver les traces dont le span racine correspond à votre requête.
- Sélectionnez {{< ui >}}Spans{{< /ui >}} pour rechercher dans tous vos spans, y compris les spans enfants imbriqués.

Certains termes de recherche ne s'appliquent qu'aux traces. Pour des exemples, consultez [Requêtes au niveau de la trace](#trace-level-queries).

### Interroger par attribut {#query-by-attribute}
_Les attributs de span_ sont des paires clé-valeur directement associées à chaque span. Les attributs capturent des détails sur l'exécution du span, tels que des métriques de performance, des identifiants de ressource ou des valeurs de paramètres.

Les requêtes d'attribut prennent la forme `@key:value`. Toutes les clés d'attribut sont précédées de `@`.

| Requête | Correspondance |
| ----- | ----- |
| `@duration:>5s` | Spans ayant pris plus de 5 secondes à se terminer |

### Requête par tag {#query-by-tag}
_Les tags de span_ sont des paires clé-valeur utilisées pour regrouper, segmenter et corréler les données de télémétrie entre les spans, les services ou les environnements. Les tags indiquent souvent un contexte plus large, tel que le nom de l'application, l'environnement ou la région de déploiement, et sont attachés aux spans pour faciliter une recherche et une agrégation efficaces.

Les requêtes de tag prennent la forme `key:value`. Contrairement aux clés d'attribut, les clés de tag ne sont pas précédées de `@`.

| Requête | Correspondance |
| ----- | ----- |
| `ml_app:my_llm_app` | Spans provenant d'une application nommée `my_llm_app` |

### Requête sur l'entrée et la sortie LLM {#query-llm-input-and-output}
Vous pouvez également utiliser des requêtes en texte libre pour rechercher des mots-clés, des expressions ou des chaînes spécifiques sur n'importe quel span possédant une paire d'entrée ou de sortie. Pour utiliser la recherche en texte libre, entourez votre requête de `"`.

| Requête | Correspondance |
| ----- | ----- |
| `"what's the weather"` | Spans d'Agent, de workflow ou de LLM contenant la chaîne `what's the weather` dans l'entrée ou la sortie |

<div class="alert alert-info">Les requêtes en texte libre sont limitées aux 20 500 premiers caractères de l'entrée ou de la sortie d'un span.</div>

### Opérateurs {#operators}

Vous pouvez combiner plusieurs termes de recherche en utilisant les opérateurs booléens `AND` (intersection), `OR` (union) et `-` (exclusion).

| Requête | Correspondance |
| ----- | ----- |
| `@duration:>5s AND -"foo"` | Spans ayant pris plus de 5 secondes à se terminer et ne contenant **pas** la chaîne `foo` dans l'entrée ou la sortie |

### Syntaxe de requête {#query-syntax}

L'Agent Observability Trace Explorer partage la même syntaxe de requête que l'[APM Trace Explorer][6] de Datadog. Pour plus de détails sur la syntaxe des requêtes, notamment la recherche avec wildcards, la gestion des valeurs numériques, l'échappement des caractères spéciaux, etc., consultez la [syntaxe des requête du Trace Explorer][6].

## Exemples de requêtes {#example-queries}

| Requête | Correspondance |
| ----- | ----- |
| `@status:error` | Spans ou traces ayant un statut de `error` |
| `@meta.error.type:"Max turns exceeded"` | Spans ou traces ayant le type d'erreur `Max turns exceeded` |
| `@duration:>5s` | Spans ou traces ayant pris plus de 5 secondes pour se terminer |
| `@trace.total_tokens:>=1000` | Traces ayant consommé 1000 jetons au total ou plus |
| `ml_app:my_llm_app` | Spans ou traces provenant d'une application nommée `my_llm_app` |
| `"what's the weather"` | Spans d'Agent, de workflow ou de LLM contenant la chaîne `what's the weather` dans l'entrée ou la sortie |

### Requêtes d'évaluation {#evaluation-queries}

Utilisez l'attribut `@evaluation` pour trouver des spans ou des traces par résultat d'[évaluation][3].

#### Évaluations {#evaluations}
Vous pouvez rechercher des spans par les résultats des [évaluations][4]. Par exemple, si vous avez une évaluation nommée `user_mood` avec des valeurs catégorielles `happy`, `sad` et `tired`, vous pourriez utiliser la requête : `@evaluation.user_mood.value:happy`.

| Requête | Correspondance |
| ----- | ----- |
| `@evaluation.user_satisfaction.value:>5` | Spans ou traces ayant obtenu un score supérieur à 5 selon une évaluation nommée `user_satisfaction` |
| `@evaluation.user_mood.value:happy` | Spans ou traces ayant été évalués comme `happy` selon une évaluation nommée `user_mood` qui possède les valeurs catégorielles `happy`, `sad` et `tired` |

### Requêtes de feedback {#feedback-queries}

Utilisez l'attribut `@feedback` pour trouver des spans ou des traces par soumissions de [retours des utilisateurs finaux][8]. Par exemple, si vos utilisateurs soumettent des retours sous l'étiquette `user_satisfaction` avec des valeurs catégorielles `thumbs_up` ou `thumbs_down`, vous pourriez utiliser la requête : `@feedback.user_satisfaction.value:thumbs_down`.

| Requête | Correspondance |
| ----- | ----- |
| `@feedback.user_satisfaction.value:thumbs_down` | Spans ou traces ayant reçu une évaluation négative pour une étiquette de feedback appelée `user_satisfaction` |
| `@feedback.user_comment.assessment:fail` | Spans ou traces ayant été évalués comme non satisfaisants pour une étiquette de feedback appelée `user_comment` |
| `@feedback.user_score.value:<2` | Spans ou traces avec un score inférieur à 2 pour une étiquette de feedback appelée `user_score` |

### Requêtes de métadonnées {#metadata-queries}

Utilisez l'attribut `@meta` pour trouver des spans par informations de métadonnées.

| Requête | Correspondance |
| ----- | ----- |
| `@meta.span.kind:llm` | Spans du `llm` [_type de span_][5]. |
| `@meta.model_provider:openai` | Spans ou traces où le fournisseur de modèle est OpenAI |
| `@meta.model_name:gpt-4.1` | Spans ou traces où le modèle est GPT-4.1 |

#### Métadonnées personnalisées {#custom-metadata}

Vous pouvez interroger les spans et les traces par [champs de métadonnées personnalisés][7] joints lors de l'instrumentation. Les champs de métadonnées personnalisés sont accessibles sous `@meta.metadata.<key>`.

| Requête | Correspondance |
| ----- | ----- |
| `@meta.metadata.config.debug_mode:false` | Spans ou traces avec le champ de métadonnées personnalisé `config.debug_mode` défini sur `false` |
| `@meta.metadata.job_id:job_14fb81c3` | Spans ou traces avec le champ de métadonnées personnalisé `job_id` défini sur `job_14fb81c3` |

### Requêtes au niveau de la trace {#trace-level-queries}

Pour rechercher des traces en fonction des attributs de ses spans imbriqués, utilisez l'attribut `@child`.

| Requête | Correspondance |
| ----- | ----- |
| `@child.@evaluation.hallucination.value:"hallucination found"` | Traces comportant un sous-span halluciné |
| `@child.@meta.span.kind:retrieval AND @meta.span.kind:workflow`| Traces de workflow contenant un span de récupération |

Utilisez l'attribut `@trace` pour accéder aux informations au niveau de la trace, telles que le coût total estimé, le nombre d'appels LLM ou le nombre d'outils.

| Requête | Correspondance |
| ----- | ----- |
| `@trace.llm_calls:>3` | Traces avec plus de 3 appels LLM |
| `@trace.tool_calls:>=4` | Traces avec au moins 4 appels d'outils |
| `@trace.number_of_tools:<5` | Traces qui appellent moins de 5 outils différents |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
[2]: /fr/llm_observability/quickstart/terms/
[3]: /fr/llm_observability/investigate/evaluations/
[4]: /fr/llm_observability/investigate/evaluations/external_evaluations
[5]: /fr/llm_observability/quickstart/terms/#span-kinds
[6]: /fr/tracing/trace_explorer/query_syntax/
[7]: /fr/llm_observability/instrument/sdk/#annotating-metadata
[8]: /fr/llm_observability/investigate/evaluations/end_user_feedback