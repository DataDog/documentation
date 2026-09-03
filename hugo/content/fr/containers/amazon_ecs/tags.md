---
aliases:
- /fr/agent/amazon_ecs/tags
description: Configurer l'extraction automatique de tags à partir des labels de conteneur
  et des variables d'environnement dans Amazon ECS
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
title: Extraction de tags Amazon ECS
---

## Présentation

L'Agent Datadog peut créer et appliquer des tags à l'ensemble des métriques, des traces et des logs envoyés par un conteneur en fonction de ses étiquettes ou de ses variables d'environnement.

## Tags par défaut

L'Agent peut découvrir automatiquement et associer des tags à toutes les données émises par la tâche entière ou par un conteneur individuel au sein de cette tâche. La liste des tags associés automatiquement dépend de la [configuration de cardinalité][1] de l'Agent.

<div style="overflow-x: auto;">

  | Tag                           | Cardinalité  | Source               |
  |-------------------------------|--------------|----------------------|
  | `container_name`              | Élevée         | Docker               |
  | `container_id`                | Élevée         | Docker               |
  | `docker_image`                | Faible          | Docker               |
  | `image_name`                  | Faible          | Docker               |
  | `short_image`                 | Faible          | Docker               |
  | `image_tag`                   | Faible          | Docker               |
  | `aws_account`                 | Faible          | ECS API              |
  | `cluster_arn`                 | Faible          | ECS API              |
  | `service_arn`                 | Faible          | ECS API              |
  | `region`                      | Faible          | ECS API              |
  | `ecs_cluster_name`            | Faible          | ECS API              |
  | `ecs_container_name`          | Faible          | ECS API              |
  | `ecs_service_name`            | Faible          | ECS API              |
  | `task_arn`                    | Orchestrator | ECS API              |
  | `task_definition_arn`         | Orchestrator | ECS API              |
  | `task_family`                 | Faible          | ECS API              |
  | `task_name`                   | Faible          | ECS API              |
  | `task_version`                | Faible          | ECS API              |

</div>

## Tagging de service unifié

En tant que meilleure pratique dans les environnements conteneurisés, Datadog recommande d'utiliser le tagging de service unifié lors de l'attribution de tags. Le tagging de service unifié relie les données de télémétrie Datadog grâce à l'utilisation de trois tags standard : `env`, `service` et `version`. Pour découvrir comment configurer votre environnement avec le tagging unifié, consultez la [documentation sur le tagging de service unifié Amazon ECS][2].

## Collecte de tags de ressource

Si vous n'avez pas activé le tagging de service unifié, effectuez les étapes suivantes pour collecter des tags de ressource ECS :

1. Vérifiez que vos [instances de conteneur Amazon ECS][3] sont associées à un rôle IAM. Cette opération peut être effectuée lors de la création d'un cluster via l'assistant de création de clusters ECS ou via la configuration de lancement utilisée par un groupe autoscaling.
2. Remplacez le rôle IAM utilisé par vos [instances de conteneur Amazon ECS][3] par : `ecs:ListTagsForResource`.
3. Modifiez votre fichier [datadog-agent-ecs.json][4] ([datadog-agent-ecs1.json][5] si vous utilisez une AMI Amazon Linux d'origine) afin d'activer la collecte de tags de ressource en ajoutant la variable d'environnement suivante :

    {{< code-block lang="json" >}}
    {
      "name": "DD_ECS_COLLECT_RESOURCE_TAGS_EC2",
      "value": "true"
    }
    {{< /code-block >}}

### Remarques

- Vérifiez que le rôle IAM est associé à vos [instances de conteneur Amazon ECS][3] et non pas au rôle de tâche du conteneur de l'Agent Datadog.
- Les tags de ressource ECS peuvent être recueillis à partir d'instances EC2, mais pas à partir d'AWS Fargate.
- Cette fonctionnalité nécessite la version 6.17+ ou 7.17+ de l'Agent Datadog.
- L'Agent prend en charge la collecte de tags ECS à partir des ressources ECS `tasks`, `services` et `container instances`.
- Si les tags AWS n'apparaissent pas dans Datadog, assurez-vous que les tags sont appliqués à la fois à l'instance et à la ressource cloud AWS correspondante.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /fr/getting_started/tagging/unified_service_tagging/?tab=ecs#containerized-environment
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html
[4]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[5]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json