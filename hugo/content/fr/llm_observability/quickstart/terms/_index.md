---
aliases:
- /fr/tracing/llm_observability/core_concepts
- /fr/llm_observability/core_concepts
- /fr/tracing/llm_observability/span_kinds
- /fr/llm_observability/span_kinds
- /fr/llm_observability/terms/
description: Guide de référence pour Agent Observability, présentant les termes et
  concepts clés, y compris les spans, traces et évaluations.
further_reading:
- link: /llm_observability/setup
  tag: Documentation
  text: Apprenez à configurer Agent Observability.
- link: /llm_observability/investigate/evaluations
  tag: Guide
  text: Options d'évaluation pour Agent Observability.
title: Termes et concepts clés d'Agent Observability.
---
## Présentation {#overview}

L'interface utilisateur de Agent Observability fournit de nombreux outils pour dépanner les performances des conversations et corréler les données dans tout le produit, vous permettant de trouver et de résoudre les problèmes dans les grands modèles de langage (LLMs).

| Concept | Description |
|---|---|
| [Spans](#spans) | Un span est une unité de travail représentant une opération dans votre application LLM, et constitue l'élément de base d'une trace. |
| [Traces](#traces) | Une trace représente le travail impliqué dans le traitement d'une requête dans votre application LLM, et se compose d'un ou plusieurs spans imbriqués. Un span racine est le premier span d'une trace, et marque le début et la fin de la trace. |
| [Évaluations](#evaluations) | Les évaluations sont une méthode pour mesurer les performances de votre application LLM. Par exemple, les checks de qualité tels que l'incapacité à répondre ou la pertinence du sujet sont différents types d'évaluations que vous pouvez suivre pour votre application LLM. |

## Spans {#spans}

Un span se compose des attributs suivants :

- Nom
- Heure de début et durée
- Type d'erreur, message et traceback
- Entrées et sorties, telles que les prompts et les complétions LLM
- Métadonnées (par exemple, les paramètres LLM tels que `temperature`, `max_tokens`)
- Métriques, telles que `input_tokens` et `output_tokens`
- Tags

### Types de spans {#span-kinds}

Agent Observability catégorise les spans par leur *span kind*, qui définit le type de travail que le span effectue. Cela peut vous donner des informations plus granulaires sur les opérations effectuées par votre application LLM.

Agent Observability prend en charge les types de span suivants :

| Type      | Représente   | Valid root span ?   | Exemples |
|-----------|--------------|--------------|-------------|
| [LLM](#llm-span)      | Un appel à un LLM. | Oui | Un appel à un modèle, tel qu'OpenAI GPT-4. |
| [Workflow](#workflow-span)  | Toute séquence prédéterminée d'opérations incluant des appels LLM et toutes les opérations contextuelles environnantes. | Oui | Un service qui prend une URL et renvoie un résumé de la page, nécessitant un appel d'outil pour récupérer la page, certaines tâches de traitement de texte et un résumé LLM. |
| [Agent](#agent-span)     | Une série de décisions et d'opérations effectuées par un agent autonome, qui se composent généralement de workflows imbriqués, de LLM et d'outils, ainsi que d'appels de tâche. | Oui | Un chatbot qui répond aux questions des clients.
| [Outil](#tool-span)      | Un appel à un programme ou à un service dont les arguments d'appel sont générés par un LLM. | Non | Un appel à une API de recherche Web ou à une calculatrice. |
| [Tâche](#task-span)      | Une étape autonome qui n'implique pas d'appel à un service externe. | Non | Une étape de prétraitement des données. |
| [Embedding](#embedding-span) | Un appel à un modèle ou à une fonction qui renvoie un embedding. | Non | Un appel à text-embedding-ada-002. |
| [Récupération](#retrieval-span) | Une opération de récupération de données à partir d'une base de connaissances externe. | Les spans de récupération n'ont généralement pas de spans enfants, car ils représentent une étape de récupération autonome.|  |

Pour obtenir des instructions sur la création de spans à partir de votre application, y compris des exemples de code, consultez [Tracing spans][2] dans la documentation du SDK Agent Observability pour Python.

#### Span LLM {#llm-span}

Les spans LLM représentent un appel à un LLM où les entrées et les sorties sont représentées sous forme de texte.

Une trace peut contenir un seul span LLM, auquel cas la trace représente une opération d'inférence LLM.

Les spans LLM n'ont généralement pas de spans enfants, car ce sont des opérations autonomes représentant un appel direct à un LLM.

#### Span de workflow {#workflow-span}

Les spans de workflow représentent toute séquence *statique* d'opérations. Utilisez des workflows pour regrouper un appel LLM avec ses opérations contextuelles de support, telles que les appels d'outils, les récupérations de données et d'autres tâches.

Les spans de workflow sont fréquemment le span racine d'une trace consistant en une séquence standard. Par exemple, une fonction pourrait prendre un lien vers un article arXiv et renvoyer un résumé. Ce processus peut impliquer un appel d'outil pour récupérer l'article, certaines tâches de traitement de texte et une synthèse par LLM.

Les spans de workflow peuvent avoir n'importe quel span comme enfant, représentant des étapes secondaires dans la séquence du workflow.

#### Span d'Agent {#agent-span}

Les spans d'Agent représentent une séquence dynamique d'opérations où un grand modèle de langage détermine et exécute des opérations en fonction des entrées. Par exemple, un span d'agent peut représenter une série d'étapes de raisonnement contrôlées par un [ReAct agent][1].

Les spans d'Agent sont fréquemment le span racine des traces représentant des agents autonomes ou des agents de raisonnement.

Les spans d'Agent peuvent avoir n'importe quel span comme enfant, représentant des étapes secondaires orchestrées par un moteur de raisonnement.

#### Span d'outil {#tool-span}

Les spans d'outil représentent une étape autonome dans un workflow ou un agent qui implique un appel à un programme ou un service externe, tel qu'une API web ou une base de données.

Les spans d'outil n'ont généralement pas de spans enfants, car ce sont des opérations autonomes représentant l'exécution d'un outil.

#### Span de tâche {#task-span}

Les spans de tâche représentent une étape autonome dans un workflow ou un agent qui n'implique pas d'appel à un service externe, comme une étape de nettoyage de données avant qu'un prompt ne soit soumis à un LLM.

Les spans de tâche n'ont généralement pas de spans enfants, car ce sont des étapes autonomes dans le workflow ou l'agent.

#### Span d'embedding {#embedding-span}

Les spans d'embedding sont une sous-catégorie des spans d'outil et représentent un appel autonome à un modèle ou à une fonction qui renvoie un embedding. Par exemple, un span d'embedding pourrait être utilisé pour tracer un appel à l'endpoint d'embedding d'OpenAI.

Les spans d'embedding peuvent avoir des spans de tâche comme enfants, mais n'ont généralement pas d'enfants.

#### Span de récupération {#retrieval-span}

Les spans de récupération sont une sous-catégorie des spans d'outil et représentent une opération de recherche vectorielle impliquant une liste de documents renvoyés par une base de connaissances externe. Par exemple, un span de récupération pourrait être utilisé pour tracer une recherche de similarité vers un vector store afin de collecter des documents pertinents pour augmenter un prompt utilisateur pour un sujet donné.

Lorsqu'ils sont utilisés avec des spans d'embedding, les spans de récupération peuvent offrir une visibilité sur les opérations de génération augmentée par récupération (RAG).

Les spans de récupération n'ont généralement pas de spans enfants, car ils représentent une étape de récupération autonome.

## Traces {#traces}

Agent Observability prend en charge l'observabilité pour les applications LLM de complexité variable. En fonction de la structure et de la complexité de vos traces, vous pouvez utiliser les fonctionnalités suivantes d'Agent Observability :

### Surveillance de l'inférence LLM {#llm-inference-monitoring}

Les traces d'inférence LLM sont composées d'un seul span LLM.

{{< img src="llm_observability/llm-observability-llm-span.png" alt="Un seul span LLM" style="width:100%;" >}}

Le suivi des inférences LLM individuelles débloque les fonctionnalités de base d'Agent Observability, vous permettant de :

1. Suivre les entrées et les sorties de vos appels LLM.
2. Suivre l'utilisation des jetons, les taux d'erreur et les latences pour vos appels LLM.
3. Ventilez les métriques importantes par modèle et par fournisseur de modèle.


Pour un exemple détaillé, consultez le [notebook Jupyter de surveillance LLM][7] qui démontre comment créer et tracer un appel LLM.

Le SDK fournit des intégrations pour capturer automatiquement les appels LLM vers des fournisseurs spécifiques. Voir [Auto-instrumentation][3] pour plus d'informations. Si vous utilisez un fournisseur LLM qui n'est pas pris en charge, vous devez [instrumenter manuellement votre application][4].

### Surveillance du workflow LLM {#llm-workflow-monitoring}

Une trace de workflow est composée d'un span de workflow racine avec des spans imbriqués de LLM, de tâche, d'outil, d'embedding et de récupération.

{{< img src="llm_observability/llm-observability-workflow-trace.png" alt="Une trace illustrant un workflow LLM plus complexe." style="width:100%;" >}}

La plupart des applications LLM incluent des opérations qui entourent les appels LLM et jouent un rôle important dans la performance globale de votre application - par exemple, les appels d'outils vers des API externes ou les étapes de tâche de prétraitement.

En suivant les appels LLM et les opérations contextuelles de tâche ou d'outil ensemble sous des spans de workflow, vous pouvez obtenir des informations plus granulaires et une vue plus globale de votre application LLM.

Pour des exemples détaillés, consultez le [notebook Jupyter de surveillance LLM][8] qui démontre comment créer et suivre une série complexe et statique d'étapes impliquant un appel d'outil et un appel à un LLM, ou le [notebook Jupyter de surveillance LLM][10] qui démontre comment créer, tracer et évaluer un workflow RAG.

### Surveillance d'Agent LLM {#llm-agent-monitoring}

Une trace de surveillance d'agent est composée d'un span d'agent racine avec des spans imbriqués de LLM, de tâche, d'outil, d'embedding, de récupération et de workflow imbriqués.

{{< img src="llm_observability/llm-observability-agent-trace.png" alt="Une trace visualisant un agent LLM" style="width:100%;" >}}

Si votre application LLM possède une logique autonome complexe, telle qu'une prise de décision qui ne peut pas être capturée par un workflow statique, vous utilisez probablement un Agent LLM. Les Agents peuvent exécuter plusieurs workflows différents en fonction de l'entrée de l'utilisateur.

Vous pouvez instrumenter votre application LLM pour suivre et regrouper tous les workflows et opérations contextuelles exécutés par un seul agent LLM en tant que trace d'agent.

Pour un exemple détaillé, consultez le [notebook Jupyter de surveillance LLM][9] qui démontre comment créer et tracer un agent alimenté par LLM qui appelle des outils et prend des décisions basées sur les données.

## Évaluations {#evaluations}

Agent Observability offre des évaluations gérées et des checks de qualité permettant d'évaluer la qualité, la sécurité et l'efficacité de vos conversations LLM. Avec les [évaluations][11], vous pouvez comprendre la performance des conversations et améliorer les réponses de votre application LLM. Cela améliore l'expérience utilisateur et garantit des résultats précieux et précis.

Datadog propose diverses options pour vos évaluations :
- Utilisez des [évaluations gérées][12] pour vos traces
- [Soumettez des évaluations personnalisées][6] à Agent Observability
- Intégrez des frameworks comme [NeMo][13]

De plus, le [Sensitive Data Scanner][5] de Datadog est intégré nativement à Agent Observability, afin que vous puissiez vous assurer que toute donnée sensible dans vos entrées et sorties est analysée et expurgée.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://react-lm.github.io/
[2]: /fr/llm_observability/setup/sdk/?tab=model#tracing-spans
[3]: /fr/llm_observability/setup/auto_instrumentation/
[4]: /fr/llm_observability/setup/?tab=decorators#instrument-your-llm-application
[5]: /fr/security/sensitive_data_scanner/
[6]: /fr/llm_observability/investigate/evaluations/external_evaluations
[7]: https://github.com/DataDog/llm-observability/blob/main/1-llm-span.ipynb
[8]: https://github.com/DataDog/llm-observability/blob/main/2-workflow-span.ipynb
[9]: https://github.com/DataDog/llm-observability/blob/main/3-agent-span.ipynb
[10]: https://github.com/DataDog/llm-observability/blob/main/4-custom-evaluations.ipynb
[11]: /fr/llm_observability/investigate/evaluations/
[12]: /fr/llm_observability/investigate/evaluations/managed_evaluations
[13]: /fr/llm_observability/investigate/evaluations/external_evaluations/nemo