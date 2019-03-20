---
aliases:
  - /fr/integrations/awsautoscaling/
categories:
  - cloud
  - provisioning
  - configuration & deployment
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez le statut et le nombre d'instances de vos groupes Auto\_Scaling."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_auto_scaling/'
git_integration_title: amazon_auto_scaling
has_logo: true
integration_title: "AWS Auto\_Scaling"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_auto_scaling
public_title: Intégration Datadog/AWS Auto Scaling
short_description: "Surveillez le statut et le nombre d'instances de vos groupes Auto\_Scaling."
version: '1.0'
---
## Présentation

Amazon Auto Scaling est un service permettant de lancer ou de fermer automatiquement des instances EC2 en fonction de stratégies définies par l'utilisateur.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'Auto Scaling.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `AutoScaling` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon Auto Scaling. Pour en savoir plus sur les stratégies Auto Scaling, [consultez la documentation du site Web d'AWS][9].

    | Autorisation AWS                          | Description                                                                                                                                                                                                                                             |
    |-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | `autoscaling:DescribeAutoScalingGroups` | Utilisé pour énumérer tous les groupes de mise à l'échelle automatique.                                                                                                                                                                                                                    |
    | `autoscaling:DescribePolicies`          | Énumère les stratégies disponibles (pour la saisie automatique dans les événements et les monitors).                                                                                                                                                                                    |
    | `autoscaling:DescribeTags`              | Utilisé pour énumérer les tags d'un groupe de mise à l'échelle automatique donnée. Cette autorisation permet d’ajouter des tags personnalisés de groupe Auto Scaling aux métriques CloudWatch de groupe Auto Scaling.                                                                                                                                               |
    | `autoscaling:DescribeScalingActivities` | Utilisé pour générer des événements lors de la mise en échelle croissante ou décroissante d'un groupe Auto Scaling.                                                                                                                                                                                               |
    | `autoscaling:ExecutePolicy`             | Exécute une stratégie (croissance ou décroissance depuis un monitor ou le flux d'événements).<br> Cette autorisation n'est pas comprise dans la [documentation de stratégie d'installation](#installation) et doit être ajoutée uniquement si vous utilisez des monitors ou des événements pour exécuter une stratégie de mise à l'échelle automatique. |

3. Installez l'[intégration Datadog/AWS Auto Scaling][5].


## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_auto_scaling" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Auto-Scaling comprend des événements pour lancer et fermer des instances EC2. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_auto_scaling/aws_auto_scaling_events.png" alt="Événements AWS Auto Scaling" responsive="true">}}

### Checks de service
L'intégration AWS Auto Scaling n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_application-autoscaling.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_auto_scaling
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_auto_scaling/amazon_auto_scaling_metadata.csv
[7]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}