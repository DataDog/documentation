---
description: Comment explorer davantage votre application dans Agent Observability.
further_reading:
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centre d'apprentissage
  text: Enquêtez avec Agent Observability
title: Monitoring
---
## Vue d'ensemble {#overview}

Explorez et analysez vos applications LLM en production avec des outils pour interroger, visualiser, corréler et enquêter sur les données à travers les traces, les clusters et d'autres ressources.

Surveillez les performances, déboguez les problèmes, évaluez la qualité et sécurisez vos systèmes basés sur LLM avec une visibilité unifiée sur les traces, les métriques et les évaluations en ligne.

### Surveillance des performances en temps réel {#real-time-performance-monitoring}

Surveillez la santé opérationnelle de votre application LLM avec des métriques et des tableaux de bord intégrés :

{{< img src="llm_observability/index/llm_dashboard_light.png" alt="Tableau de bord Agent Observability Operational Insights, montrant diverses métriques et visualisations. Inclut une section Vue d'ensemble avec le nombre total de traces et de spans, les taux de succès et d'erreur, etc. ; et une section Appels LLM avec un graphique en anneau de l'utilisation des modèles, le nombre moyen de jetons d'entrée et de sortie par appel, etc." style="width:100%">}}

- **Volume de requêtes et latence** : Suivez les requêtes par seconde, les temps de réponse et les goulots d'étranglement de performance sur différents modèles, opérations et points de terminaison.
- **Suivi des erreurs** : Surveillez les erreurs HTTP, les délais d'attente des modèles et les requêtes ayant échoué avec un contexte d'erreur détaillé.
- **Consommation de jetons** : Suivez les jetons de prompt, les jetons mis en cache, les jetons de complétion et l'utilisation totale pour optimiser les coûts.
- **Analytique de l'utilisation des modèles** : Surveillez quels modèles sont appelés, leur fréquence et leurs caractéristiques de performance.

Le [tableau de bord Agent Observability Operational Insights][6] prêt à l'emploi fournit des vues consolidées des métriques au niveau des traces et des spans, des taux d'erreur, des répartitions de latence, des tendances de consommation de jetons et des moniteurs déclenchés.

### Débogage et dépannage en production {#production-debugging-and-troubleshooting}

Déboguez des flux de travail LLM complexes avec une visibilité détaillée sur l'exécution :

{{< img src="llm_observability/index/llm_trace_light.png" alt="Vue détaillée d'une trace dans Agent Observability, présentant un graphique en flamme qui représente visuellement chaque appel de service. 'OpenAI.createResponse' est sélectionné, et une vue détaillée du span est affichée — incluant les messages d'entrée et les messages de sortie." style="width:100%">}}

- **Analyse de trace de bout en bout** : Visualisez les flux complets de requêtes, depuis l'entrée de l'utilisateur jusqu'aux appels de modèles, aux appels d'outils et à la génération de réponse.
- **Débogage au niveau du span** : Examinez les opérations individuelles au sein des chaînes, y compris les étapes de prétraitement, les appels de modèle et la logique de post-traitement.
- **Identifiez la cause profonde des erreurs** : Localisez les points de défaillance dans les chaînes multi-étapes, les flux de travail ou les opérations agentiques à l'aide d'un contexte d'erreur détaillé et d'informations de minutage.
- **Identification des goulots d'étranglement de performance** : Trouvez les opérations lentes et optimisez-les en fonction des répartitions de latence entre les composants du flux de travail.

### Évaluations de la qualité et de la sécurité {#quality-and-safety-evaluations}

{{< img src="llm_observability/index/llm_example_eval_light.png" alt="Vue détaillée d'un span dans Agent Observability, onglet Evaluations. Affiche une évaluation d'hallucination avec « Contradiction confirmée », la sortie signalée, la citation du contexte et une explication de la raison pour laquelle cela a été signalé." style="width:100%">}}

Assurez-vous que vos agents ou applications LLM respectent les normes de qualité grâce aux évaluations en ligne. Pour des informations complètes sur les évaluations hébergées et gérées par Datadog, l'ingestion d'évaluations personnalisées et les capacités de surveillance de la sécurité, consultez la [documentation sur les évaluations][5].

### Interrogez les traces et les spans de votre application LLM {#query-your-llm-applications-traces-and-spans}

{{< img src="llm_observability/index/llm_query_example_light.png" alt="Agent Observability > Vue Traces, où l'utilisateur a saisi la requête `ml_app:shopist-chat-v2 'purchase' -'discount' @trace.total_tokens:>=20` et où diverses traces sont affichées." style="width:100%">}}

Apprenez à utiliser l'interface de requête d'Agent Observability pour rechercher, filtrer et analyser les traces et les spans générés par vos applications LLM. La [documentation sur les requêtes][1] explique comment :

- Utilisez la barre de recherche pour filtrer les traces et les spans par attributs tels que le modèle, l'utilisateur ou le statut d'erreur.
- Appliquez des filtres avancés pour vous concentrer sur des opérations LLM spécifiques ou sur des périodes déterminées.
- Visualisez et inspectez les détails des traces pour dépanner et optimiser vos flux de travail LLM.

Cela vous permet d'identifier rapidement les problèmes, de surveiller les performances et d'obtenir des informations sur le comportement de votre application LLM en production.


### Corréler l'APM et l'Agent Observability {#correlate-apm-and-agent-observability}

{{< img src="llm_observability/index/llm_apm_example_light.png" alt="Une trace dans Datadog APM. L'onglet Overview affiche une section intitulée LLM Observability, avec un lien pour afficher le span dans Agent Observability, ainsi que le texte d'entrée et de sortie." style="width:100%">}}

Pour les applications instrumentées avec Datadog APM, vous pouvez [corréler l'APM et l'Agent Observability][2] via le SDK. La corrélation de l'APM avec l'Agent Observability offre une visibilité complète de bout en bout et une analyse approfondie, des problèmes d'application aux causes profondes spécifiques aux LLM.

### Patterns {#patterns}

{{< img src="llm_observability/Patterns.png" alt="La page Patterns affichant des sujets hiérarchiques ainsi que des scores et des volumes. Trois indicateurs clés de performance sont également visibles, montrant le nombre d'interactions regroupées, le nombre de sujets identifiés et le ratio d'interactions regroupées en pourcentage." style="width:100%">}}

[Patterns][3] regroupe automatiquement le trafic de production de votre application LLM en sujets hiérarchiques, vous aidant à comprendre ce que demandent les utilisateurs, à identifier les lacunes de couverture dans vos jeux de données d'évaluation et à diagnostiquer les modes de défaillance.

### Surveillez vos systèmes agentiques {#monitor-your-agentic-sytems}

Apprenez à surveiller les applications LLM agentiques, qui utilisent plusieurs outils ou chaînes de raisonnement, avec [Agent Monitoring][4] de Datadog. Cette fonctionnalité vous aide à suivre les actions des agents, l'utilisation des outils et les étapes de raisonnement, offrant une visibilité sur les flux de travail LLM complexes et vous permettant de dépanner et d'optimiser efficacement les systèmes agentiques. Consultez la [Agent Monitoring documentation][4] pour plus de détails.

### Prompt Management {#prompt-management}

[Prompt Management][7] offre un registre centralisé pour les prompts utilisés par vos applications LLM. Créez et versionnez des prompts dans Datadog, via le SDK Python ou via l'API, puis récupérez-les au moment de l'exécution avec le SDK. Cela dissocie l'itération des prompts du cycle de déploiement de votre application. Consultez la [Prompt Management documentation][7] pour plus de détails.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/monitoring/querying
[2]: /fr/llm_observability/monitoring/llm_observability_and_apm
[3]: /fr/llm_observability/monitoring/patterns/
[4]: /fr/llm_observability/monitoring/agent_monitoring
[5]: /fr/llm_observability/evaluations/
[6]: https://app.datadoghq.com/dash/integration/llm_operational_insights?fromUser=false&refresh_mode=sliding&from_ts=1758905575629&to_ts=1758909175629&live=true
[7]: /fr/llm_observability/monitoring/prompt_management