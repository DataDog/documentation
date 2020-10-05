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
  - link: /agent/amazon_ecs/metrics/
    tag: Documentation
    text: Recueillir des métriques ECS
---
## Données collectées

### Métriques

Les métriques Amazon ECS sont recueillies via l'Agent Datadog ou l'[intégration AWS][1].

Les métriques recueillies à l'aide de l'intégration AWS contiennent le préfixe `aws.*`. Les métriques recueillies par l'Agent contiennent le préfixe `ecs.*`. Consultez le tableau ci-dessous :

{{< get-metrics-from-git "amazon_ecs" >}}

Chacune des métriques récupérées à partir d'AWS se voit attribuer les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

**Remarque** : les métriques commençant par `ecs.containerinsights.*` proviennent de l'[agent CloudWatch d'AWS][2].

### Événements

Pour réduire les données parasites, l'intégration Amazon ECS est automatiquement configurée de façon à autoriser uniquement les événements qui contiennent les termes suivants : `drain`, `error`, `fail`, `insufficient memory`, `pending`, `reboot` et `terminate`. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Événements AWS ECS" >}}

Pour supprimer ce filtre et recevoir tous les événements de votre intégration Datadog/Amazon ECS, contactez [l'assistance Datadog][3].

### Checks de service

- **aws.ecs.agent_connected** : renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter. Si ce n'est pas le cas, renvoie `OK`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/deploy-container-insights-ECS-instancelevel.html
[3]: https://docs.datadoghq.com/fr/help/