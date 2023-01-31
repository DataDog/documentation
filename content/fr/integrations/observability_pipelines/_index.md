---
further_reading:
- link: /integrations/observability_pipelines/setup/
  tag: Documentation
  text: Configurer des pipelines d'observabilité
- link: https://www.datadoghq.com/blog/datadog-observability-pipelines/
  tag: Blog
  text: Contrôler vos données de télémétrie grâce aux pipelines d'observabilité
- link: /integrations/observability_pipelines/vector_configurations/
  tag: Documentation
  text: En savoir plus sur les configurations Vector
- link: https://vector.dev/docs/setup/going-to-prod/
  tag: Documentation
  text: Intégrer des pipelines d'observabilité en production à l'aide de la planification
    des capacités
- link: https://vector.dev/releases/
  tag: Documentation
  text: Découvrir la nouvelle version de Vector
- link: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
  tag: Documentation
  text: Utiliser l'Agent Datadog comme source pour Vector
- link: https://docs.datadoghq.com/agent/vector_aggregation/
  tag: Documentation
  text: Configurer des Agents Datadog afin d'envoyer des données aux agrégateurs Vector
kind: Documentation
title: Pipelines d'observabilité
---

{{< img src="integrations/observability_pipelines/obs_pipelines_overview.png" alt="test" style="width:100%;" >}}

## En quoi consistent les pipelines d'observabilité ?

Les pipelines d'observabilité désignent une solution de surveillance conçue sur [Vector][1], un outil open source vous permettant de surveiller et de gérer tous vos pipelines de télémétrie de façon évolutive. Vector est déployé en tant qu'agrégateur dans votre infrastructure. Grâce à cette solution, vous pouvez recueillir et transformer tous vos logs, toutes vos métriques et toutes vos traces, et les acheminer vers n'importe quelle destination.

Ajoutez votre clé d'API Datadog à votre configuration Vector pour l'associer à vos pipelines d'observabilité. Ces dernières vous permettent de surveiller vos pipelines Vector et d'identifier les goulots d'étranglement et les problèmes de latence, d'ajuster les performances, de surveiller la transmission des données, et plus encore.

Grâce aux pipelines d'observabilité, vous pouvez également :

- Contrôler le volume de vos données avant de les acheminer, afin de gérer vos coûts
- Acheminer vos données vers n'importe quelle destination, afin de réduire le phénomène de dépendance et de simplifier les migrations
- Respecter les exigences relatives à la résidence des données et censurer les données sensibles pour améliorer votre conformité
- Enrichir, structurer et transformer vos événements afin qu'ils soient encore plus utiles

Concevoir des pipelines de données efficaces et fiables, avec une visibilité de bout en bout et une gestion simplifiée

## Prise en main

1. [Installez Vector][2] à l'aide de la méthode de démarrage rapide ou de votre gestionnaire de packages préféré, en fonction de votre plateforme ou système d'exploitation.
2. [Modifiez les configurations Vector][3] afin de recueillir, transformer et acheminer vos données.
3. [Connectez Vector aux pipelines d'observabilité][4] grâce à votre API Datadog.

## Explorer des pipelines d'observabilité

Puisque vous envoyez désormais des données de configuration aux pipelines d'observabilité, vous pouvez commencer à obtenir des informations exploitables sur vos pipelines Vector :

### Surveiller l'intégrité de vos pipelines Vector

Consultez une vue d'ensemble de toutes les topologies de vos pipelines et surveillez des KPI, par exemple la charge moyenne, le taux d'erreur et le débit de chacun de vos flux.

{{< img src="integrations/observability_pipelines/config-map.png" alt="test" style="width:80%;" >}}

### Identifier rapidement les goulots d'étranglement et optimiser les performances

Étudiez en détail des composants Vector spécifiques pour mieux comprendre comment vos données d'observabilité transitent dans votre pipeline. Vous pourrez ainsi identifier et corriger les goulots d'étranglement, et ainsi optimiser votre pipeline.

{{< img src="integrations/observability_pipelines/config-map-side-panel.png" alt="test" style="width:85%;" >}}

### Surveiller la transmission des données et réduire la latence

Découvrez si vos données atteignent bien leur destination et analysez en détail les problèmes de latence, afin d'améliorer vos SLI et de respecter vos SLO.

{{< img src="integrations/observability_pipelines/configuration-list.png" alt="test" style="width:85%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/
[2]: /fr/integrations/observability_pipelines/setup/#install-vector
[3]: /fr/integrations/observability_pipelines/setup/#set-up-vector-configurations
[4]: /fr/integrations/observability_pipelines/setup/#connect-vector-to-observability-pipelines