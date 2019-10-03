---
aliases:
  - /fr/integrations/awsautoscaling/
  - /fr/integrations/faq/get-your-autoscaling-group-events-and-metrics/
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
integration_title: "Amazon\_Auto\_Scaling"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_auto_scaling
public_title: "Intégration Datadog/Amazon\_Auto\_Scaling"
short_description: "Surveillez le statut et le nombre d'instances de vos groupes Auto\_Scaling."
version: '1.0'
---
## Présentation

Amazon Auto Scaling est un service permettant de lancer ou de fermer automatiquement des instances EC2 en fonction de stratégies définies par l'utilisateur.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'Auto Scaling.

* Recueilliez des métriques EC2 pour les hosts des groupes Auto Scaling comportant le tag `autoscaling_group`.
* Recueilliez des métriques Auto Scaling sur le groupe associé aux tags `autoscaling_group` et `autoscalinggroupname`.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `AutoScaling` est cochée dans la section concernant la collecte des métriques.

2. Dans AWS, les données d'Auto Scaling doivent être envoyées à CloudWatch. Référez-vous à la section [Activez les métriques des groupes Auto Scaling][3] de la documentation AWS.

3. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][4] afin de recueillir des métriques Amazon Auto Scaling. Pour en savoir plus sur les stratégies Auto Scaling, [consultez la documentation du site Web d'AWS][5].

    | Autorisation AWS                          | Description                                                                                                                                                                                                                                             |
    |-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | `autoscaling:DescribeAutoScalingGroups` | Utilisé pour énumérer tous les groupes Auto Scaling.                                                                                                                                                                                                        |
    | `autoscaling:DescribePolicies`          | Énumère les stratégies disponibles (pour la saisie automatique dans les événements et les monitors).                                                                                                                                                                                    |
    | `autoscaling:DescribeTags`              | Utilisé pour énumérer les tags d'un groupe Auto Scaling donné. Cette autorisation permet d'ajouter des tags de groupe Auto Scaling personnalisés aux métriques CloudWatch des groupes Auto Scaling.                                                                                                                                               |
    | `autoscaling:DescribeScalingActivities` | Utilisé pour générer des événements en cas de dimensionnement d'un groupe Auto Scaling.                                                                                                                                                                                               |
    | `autoscaling:ExecutePolicy`             | Exécuter une stratégie (dimensionnement à la hausse ou à la baisse à partir d'un monitor ou du flux d'événements).<br>Cette autorisation n'est pas comprise dans le [document de stratégie d'installation](#installation) et ne doit être ajoutée que si vous utilisez des monitors ou des événements pour exécuter une stratégie de dimensionnement automatique. |

4. Installez l'[intégration Datadog/AWS Auto Scaling][6].



## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_auto_scaling" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Auto Scaling comprend des événements pour les lancements et les fermetures d'instances EC2. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_auto_scaling/aws_auto_scaling_events.png" alt="Événements AWS Auto Scaling" responsive="true">}}

### Checks de service
L'intégration AWS Auto Scaling n'inclut aucun check de service.

## Dépannage

Pour que les métriques de groupes Auto Scaling commencent à apparaître dans Datadog, activez-les d'abord dans votre console AWS. Pour ce faire, [consultez les instructions relatives à l'activation des métriques de groupes Auto Scaling sur le site d'AWS][9]. Notez qu'après leur activation, l'affichage de ces métriques peut prendre un certain temps.

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html#as-enable-group-metrics
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_application-autoscaling.html
[6]: https://app.datadoghq.com/account/settings#integrations/amazon_auto_scaling
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_auto_scaling/amazon_auto_scaling_metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: http://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-detailed-instance-metrics


{{< get-dependencies >}}