---
aliases:
- /fr/llm_observability/experiments_preview
- /fr/llm_observability/experiments/
description: Vue d'ensemble de la fonctionnalité Experiments d'Agent Observability.
further_reading:
- link: /llm_observability/improve/experiments/setup
  tag: Documentation
  text: Configurez et utilisez les expériences Agent Observability
- link: https://www.datadoghq.com/blog/llm-experiments/
  tag: Blog
  text: Créer et surveiller des expériences LLM avec Datadog
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability prend nativement en charge les conventions sémantiques
    GenAI d'OpenTelemetry.
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Stimuler le retour sur investissement de l''IA : comment Datadog connecte
    les coûts, les performances et l''infrastructure pour vous permettre d''évoluer
    de manière responsable'
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-nlq
  tag: Blog
  text: Comment nous avons réduit le temps de débogage de notre agent NLQ de plusieurs
    heures à quelques minutes grâce à LLM Observability
- link: https://www.datadoghq.com/blog/offline-llm-evaluations/
  tag: Blog
  text: 'Évaluation hors ligne pour les agents IA : bonnes pratiques'
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: Blog
  text: Évaluez, optimisez et sécurisez votre pile d'IA Google Cloud avec Datadog.
- link: https://www.datadoghq.com/blog/llm-experimentation-autoresearch/
  tag: Blog
  text: Comment nous avons rendu un agent d'optimisation de requêtes SQL 59 % plus
    précis en utilisant la recherche automatique et Agent Observability
- link: https://www.datadoghq.com/blog/from-traces-to-experiments-a-loop-for-improving-ai-agents/
  tag: Blog
  text: 'Des traces aux expériences : une boucle pour améliorer les agents d''IA'
title: Experiments
---
{{< img src="llm_observability/experiments/Experiments_LLMO.png" alt="Agent Observability, vue Experiment. Titre : « Comparaison de 6 expériences sur 9 champs ». Visualisation sous forme de graphique linéaire représentant la précision, l'exactitude, la durée, le coût estimé et d'autres métriques de diverses expériences." style="width:100%;" >}}

Agent Observability [Experiments][1] prend en charge l'intégralité du cycle de vie de la création d'applications et d'agents LLM. Elle vous aide à comprendre comment les modifications apportées aux prompts, aux modèles, aux fournisseurs ou à l'architecture système affectent les performances. Grâce à cette fonctionnalité, vous pouvez :

- Créer et versionner des jeux de données
- Exécuter et gérer des expériences
- Comparer les résultats pour évaluer l'impact

## Cookbooks {#cookbooks}

Pour des exemples détaillés de ce que vous pouvez faire avec les expériences LLM, consultez les [notebooks Jupyter][2] fournis par Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/testing/experiments
[2]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks