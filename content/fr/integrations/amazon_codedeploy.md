---
aliases:
  - /fr/integrations/awscodedeploy/
categories:
  - cloud
  - configuration & deployment
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez vos déploiements en temps réel et mesurez leur durée.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_codedeploy/'
git_integration_title: amazon_codedeploy
has_logo: true
integration_title: "Amazon\_CodeDeploy"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_codedeploy
public_title: "Intégration Datadog/Amazon\_CodeDeploy"
short_description: Surveillez vos déploiements en temps réel et mesurez leur durée.
version: '1.0'
---
{{< img src="integrations/amazon_codedeploy/monitor-aws-codedeploy-dashboard.png" alt="Dashboard par défaut CodeDeploy"  >}}

## Présentation

AWS CodeDeploy est un service qui automatise les déploiements de code sur des instances dans le cloud et sur site.

Activez cette intégration pour visualiser dans Datadog les métriques et les événements de déploiement AWS CodeDeploy.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][2] afin de recueillir des métriques Amazon CodeDeploy. Pour en savoir plus sur les stratégies CodeDeploy, consultez [la documentation du site Web d'AWS][3].

    | Autorisation AWS                        | Description                                                                   |
    |---------------------------------------|-------------------------------------------------------------------------------|
    | `codedeploy:ListApplications`         | Utilisé pour énumérer toutes les applications CodeDeploy                                      |
    | `codedeploy:ListDeploymentGroups`     | Utilisé pour énumérer tous les groupes de déploiement au sein d'une application (modifié)             |
    | `codedeploy:ListDeployments`          | Utilisé pour énumérer les déploiements d'un groupe au sein d'une application (modifié) |
    | `codedeploy:BatchGetDeployments`      | Récupère des descriptions détaillées de déploiements (modifié)                            |
    | `codedeploy:BatchGetDeploymentGroups` | Récupère des descriptions détaillées de groupes de déploiement                               |

2. Configurez l'[intégration Datadog/AWS CodeDeploy][4].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_codedeploy" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS Codedeploy comprend des événements pour les déploiements réussis, échoués et arrêtés. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_codedeploy/aws_codedeploy_events.png" alt="Événements AWS Codedeploy" >}}

### Checks de service
L'intégration AWS Codedeploy n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_codedeploy.html
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_codedeploy
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codedeploy/amazon_codedeploy_metadata.csv
[6]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}