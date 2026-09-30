---
description: Découvrez comment identifier les tâches CI qui se trouvent sur le chemin
  critique pour améliorer la durée de vos pipelines CI.
further_reading:
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: Documentation
  text: Apprendre à rechercher et gérer vos exécutions de pipeline
- link: continuous_integration/search/#highlight-critical-path
  tag: Documentation
  text: Mettre en évidence le chemin critique dans votre exécution de pipeline
title: Identifier les tâches CI sur le chemin critique pour réduire la durée du pipeline
---

## Section Overview

Ce guide explique comment identifier les tâches CI qui se trouvent sur le chemin critique pour vous aider à déterminer les tâches à prioriser afin de réduire la durée globale des pipelines CI.

### Comprendre le chemin critique dans un pipeline CI

Le chemin critique d'une exécution de pipeline CI est la séquence la plus longue de tâches CI qui détermine la durée totale de cette exécution de pipeline. Essentiellement, il s'agit du chemin à travers le graphe de dépendances des tâches CI qui prend le plus de temps à s'exécuter. Pour réduire la durée totale d'une exécution de pipeline CI, vous devez raccourcir la durée des tâches CI le long de ce chemin critique.

{{< img src="continuous_integration/critical_path_highlight_pipeline.png" alt="Mise en évidence des tâches sur le chemin critique dans une exécution de pipeline." width="90%">}}

Examiner la durée des tâches peut ne pas suffire. Les tâches CI sont généralement exécutées en parallèle avec d'autres tâches, ce qui signifie que la réduction du temps d'exécution du pipeline est déterminée par la réduction du **temps exclusif** de la tâche CI.

Le temps exclusif d'une tâche sur le chemin critique représente la quantité de temps que le runner CI a passé à exécuter une tâche spécifique, en excluant le temps d'exécution d'autres tâches qui s'exécutaient en parallèle.

{{< img src="continuous_integration/critical_path_highlight_pipeline_exclusive_time.png" alt="Mise en évidence du temps exclusif des tâches sur le chemin critique dans une exécution de pipeline." width="90%">}}

Si une tâche CI `job1` se trouve sur le chemin critique avec une durée de 100 ms et s'exécute en parallèle avec une tâche CI `job2`, qui a une durée de 80 ms, le temps exclusif de `job1` sur le chemin critique est de 20 ms. Cela signifie que réduire la durée de `job1` de plus de 20 ms ne diminuerait toujours la durée globale du pipeline que de 20 ms.

## Identifier les tâches CI clés pour améliorer votre pipeline CI

### Utiliser la facette

Vous pouvez utiliser la facette `@ci.on_critical_path` ou `@ci.critical_path.exclusive_time` pour identifier les tâches CI qui se trouvent sur le chemin critique dans vos pipelines CI. En utilisant ces facettes, vous pouvez créer des dashboards et des notebooks personnalisés selon vos besoins.

{{< img src="continuous_integration/critical_path_facets.png" alt="Filtrage à l'aide des facettes de chemin critique" width="90%">}}

Notez que ces facettes sont uniquement disponibles en utilisant `ci_level:job` dans vos requêtes.

### Utiliser le modèle de dashboard

Vous pouvez également importer le modèle de dashboard [CI Visibility - Critical Path][1] :
- Ouvrez le modèle de dashboard [civisibility-critical-path-dashboard.json][1] et copiez le contenu dans le presse-papiers.
- Créez un [nouveau dashboard][2] dans Datadog.
- Collez le contenu copié dans le nouveau dashboard.
- Enregistrez le dashboard.

{{< img src="continuous_integration/critical_path_dashboard.png" alt="Dashboard de chemin critique pour CI Visibility" width="90%">}}

#### Termes

| Colonne                                | Rôle                                                                                                                                                      |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Temps exclusif total sur le chemin critique | Somme de tous les temps exclusifs de la tâche. Cela estime les économies de temps potentielles pour les pipelines concernés.                                      |
| Temps exclusif moyen sur le chemin critique   | Temps exclusif moyen d'une tâche particulière sur le chemin critique. Cela mesure la réduction potentielle de la durée d'un pipeline si la tâche réduit son temps exclusif. |
| Taux sur le chemin critique                 | Mesure la fréquence à laquelle une tâche se trouve sur le chemin critique.                                                                                                                |

##### Exemple

Dans l'image précédente, nous pouvons observer qu'une tâche CI appelée `metrics` est un candidat potentiel pour l'amélioration, car son temps exclusif total est le plus élevé. Le temps exclusif moyen est d'environ 21 minutes, ce qui signifie qu'il existe une marge d'amélioration allant jusqu'à 21 minutes pour cette tâche CI.

Étant donné que nous savons que cette tâche CI se trouve sur le chemin critique 43,5 % du temps, nous pourrions potentiellement réduire la durée moyenne du pipeline jusqu'à 21 minutes pour 43,5 % des exécutions de pipeline.

{{< img src="continuous_integration/critical_path_dashboard_outlier_job_highlighted.png" alt="Tâche CI candidate potentielle pour améliorer le temps exclusif." width="90%">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /resources/json/civisibility-critical-path-dashboard.json
[2]: /fr/dashboards/
[3]: /fr/continuous_integration/pipelines/gitlab/?tab=gitlabcom
[4]: /fr/continuous_integration/search/#highlight-critical-path