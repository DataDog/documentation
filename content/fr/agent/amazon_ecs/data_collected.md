---
title: "Collecte de données Amazon\_ECS"
kind: documentation
further_reading:
  - link: /agent/amazon_ecs/logs/
    tag: Documentation
    text: Recueillir les logs de votre application
  - link: /agent/amazon_ecs/apm/
    tag: Documentation
    text: Recueillir les traces de vos applications
  - link: '/agent/amazon_ecs/data_collected/#metriques'
    tag: Documentation
    text: Recueillir des métriques ECS
---
## Données collectées

### Métriques

Amazon ECS sur EC2 est un service de gestion de conteneurs pour les conteneurs Docker s'exécutant sur des instances EC2. Lorsque l'Agent est déployé dans un conteneur Docker, il recueille les mêmes métriques que l'intégration Docker. Pour obtenir la liste complète des métriques recueillies, consultez la documentation relative aux [métriques d'intégration Docker][1].

**Remarque** : les tags `container_name`, `task_arn`, `task_family`, `task_name` et `task_version` sont appliqués aux métriques Docker. Aucune configuration supplémentaire n'est requise.

### Événements

Pour réduire les données parasites, l'intégration Amazon ECS est automatiquement configurée de façon à autoriser uniquement les événements qui contiennent les termes suivants : `drain`, `error`, `fail`, `insufficient memory`, `pending`, `reboot` et `terminate`. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Événements AWS ECS" >}}

Pour supprimer cette liste d'inclusion et recevoir tous les événements générés par votre intégration Datadog/Amazon ECS, contactez l'[assistance Datadog][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/agent/docker/data_collected/#metrics
[2]: https://docs.datadoghq.com/fr/help/