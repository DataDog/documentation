---
aliases:
- /fr/agent/amazon_ecs/data_collected
description: Guide de référence pour les métriques, les logs et les événements collectés
  par le Datadog Agent sur Amazon ECS
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/amazon_ecs/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentation
  text: Recueillir des métriques ECS
title: Collecte de données Amazon ECS
---
## Données collectées {#data-collected}

### Métriques {#metrics}

Amazon ECS sur EC2 est un service de gestion de Containers pour les Containers Docker s'exécutant sur des instances EC2.

Le tableau suivant répertorie les métriques collectées par l'Agent ou le crawler d'API pour Amazon ECS :

{{< get-metrics-from-git "amazon-ecs" >}}

Les métriques collectées par l'Agent lorsqu'il est déployé dans un conteneur Docker incluent également les mêmes métriques que celles collectées par l'intégration Docker. Consultez les [métriques de l'intégration Docker][1] pour obtenir une liste complète des métriques.

Les métriques préfixées par `ecs.containerinsights.*` peuvent être collectées en activant **collect custom metrics** sous l'onglet Metric Collection de l'AWS Integration.

**Remarque** : les métriques Docker sont taguées en conséquence avec les tags suivants : `container_name`, `task_arn`, `task_family`, `task_name`, `task_version`. Aucune configuration supplémentaire n'est requise.

### Événements {#events}

L'intégration Amazon ECS collecte les événements émis par les clusters et les services, qui ressemblent généralement à ce qui suit :

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Événements Amazon ECS" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/agent/docker/data_collected/#metrics