---
aliases:
  - /fr/integrations/ecs/
categories:
  - cloud
  - containers
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez les statuts des conteneurs, mesurez l'utilisation des ressources, et plus encore.
doc_link: https://docs.datadoghq.com/integrations/amazon_ecs/
draft: false
further_reading:
  - link: https://www.datadoghq.com/blog/amazon-ecs-metrics
    tag: Blog
    text: Key ECS metrics to monitor
  - link: https://docs.datadoghq.com/integrations/ecs_fargate
    tag: Documentation
    text: "Intégration Datadog/ECS\_Fargate"
git_integration_title: amazon_ecs
has_logo: true
integration_id: amazon-ecs
integration_title: Amazon ECS sur EC2
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_ecs
public_title: "Intégration Datadog/Amazon\_ECS sur EC2"
short_description: Surveillez les statuts des conteneurs, mesurez l'utilisation des ressources, et plus encore.
version: '1.0'
---
<div class="alert alert-warning">
Vous voulez déployer l'Agent Datadog conteneurisé sur votre cluster ECS ? Consultez la <a href="https://docs.datadoghq.com/agent/amazon_ecs/"><b>documentation de l'Agent pour Amazon ECS</b></a>.
</div>

## Présentation

Amazon ECS sur EC2 est un service d'orchestration de conteneurs hautement évolutif et à hautes performances pour les conteneurs Docker s'exécutant sur des instances EC2.

Recueillez des métriques ECS automatiquement à partir de CloudWatch grâce à l'intégration Datadog/Amazon ECS. Enrichissez ces métriques en utilisant l'API ECS pour récupérer les événements et les tags ECS, ainsi que le statut des instances, tâches et services de conteneur.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Suivez les instructions de [configuration de la délégation de rôles][1] pour l'intégration AWS.
2. Dans le [carré AWS][2], ajoutez le nom du rôle IAM et cochez la case **ECS** sous **Limit metric collection**.

    {{< img src="integrations/amazon_ecs/aws_tile.png" alt="Configuration AWS ECS" >}}

Lorsque la collecte de métriques est activée, un [dashboard prêt à l'emploi][3] fournissant des informations détaillées au sujet de vos métriques ECS est disponible pour cette intégration. Consultez [Surveiller ECS avec Datadog][4] pour en savoir plus.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_ecs" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

**Remarque** : les métriques commençant par `ecs.containerinsights.*` proviennent de l'[agent CloudWatch d'AWS][2].

### Événements

Pour réduire les données parasites, l'intégration Amazon ECS est automatiquement configurée de façon à autoriser uniquement les événements qui contiennent les termes suivants : `drain`, `error`, `fail`, `insufficient memory`, `pending`, `reboot` et `terminate`. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Événements AWS ECS" >}}

Pour supprimer la liste d'inclusion et recevoir tous les événements générés par votre intégration Datadog/Amazon ECS, contactez l'[assistance Datadog][6].

### Checks de service
{{< get-service-checks-from-git "amazon_ecs" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=automaticcloudformation#setup
[2]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[3]: https://app.datadoghq.com/screen/integration/82/aws-ecs
[4]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/#get-comprehensive-visibility-with-datadog-dashboards
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/amazon_ecs_metadata.csv
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/service_checks.json