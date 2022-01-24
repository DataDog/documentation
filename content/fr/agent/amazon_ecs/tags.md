---
title: "Extraction de tags Amazon\_ECS"
kind: documentation
further_reading:
  - link: /getting_started/tagging/
    tag: Documentation
    text: Débuter avec les tags
  - link: /getting_started/tagging/using_tags/
    tag: Documentation
    text: Utiliser des tags avec Datadog
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: Limiter la collecte de données à un sous-ensemble de conteneurs
---
## Présentation

L'Agent Datadog peut créer et appliquer des tags à l'ensemble des métriques, des traces et des logs envoyés par un conteneur en fonction de ses étiquettes ou de ses variables d'environnement.

## Tagging de service unifié

Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des tags dans des environnements conteneurisés. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles à l'aide de trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la [documentation dédiée pour Amazon ECS][1].

## Collecte de tags de ressource

Si vous n'avez pas activé le tagging de service unifié, effectuez les étapes suivantes pour collecter des tags de ressource ECS :

1. Vérifiez que vos [instances de conteneur Amazon ECS][2] sont associées à un rôle IAM. Cette opération peut être effectuée lors de la création d'un cluster via l'assistant de création de clusters ECS ou via la configuration de lancement utilisée par un groupe autoscaling.
2. Remplacez le rôle IAM utilisé par vos [instances de conteneur Amazon ECS][2] par : `ecs:ListTagsForResource`.
3. Modifiez votre fichier [datadog-agent-ecs.json][3] ([datadog-agent-ecs1.json][4] si vous utilisez une AMI Amazon Linux d'origine) afin d'activer la collecte de tags de ressource en ajoutant la variable d'environnement suivante :

    {{< code-block lang="json" >}}
    {
      "name": "DD_ECS_COLLECT_RESOURCE_TAGS_EC2",
      "value": "true"
    }
    {{< /code-block >}}

### Remarques

- Vérifiez que le rôle IAM est associé à vos [instances de conteneur Amazon ECS][2] et non pas au rôle de tâche du conteneur de l'Agent Datadog.
- Les tags de ressource ECS peuvent être recueillis à partir d'instances EC2, mais pas à partir d'AWS Fargate.
- Cette fonctionnalité nécessite la version 6.17+ ou 7.17+ de l'Agent Datadog.
- L'Agent prend en charge la collecte de tags ECS à partir des ressources ECS `tasks`, `services` et `container instances`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging/?tab=ecs#containerized-environment
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html
[3]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[4]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json