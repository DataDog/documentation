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
description: "Surveillez le statut et le nombre d'instances dans vos groupes Auto\_Scaling."
doc_link: https://docs.datadoghq.com/integrations/amazon_auto_scaling/
draft: false
git_integration_title: amazon_auto_scaling
has_logo: true
integration_id: amazon-auto-scaling
integration_title: AWS Auto Scaling
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_auto_scaling
public_title: Intégration Datadog/AWS Auto Scaling
short_description: "Surveillez le statut et le nombre d'instances dans vos groupes Auto\_Scaling."
version: '1.0'
---
## Présentation

AWS Auto Scaling est un service permettant de lancer ou de fermer automatiquement des instances EC2 en fonction des stratégies définies par l'utilisateur.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'Auto Scaling.

- Recueilliez des métriques EC2 pour les hosts des groupes Auto Scaling comportant le tag `autoscaling_group`.
- Recueilliez des métriques Auto Scaling sur le groupe associé aux tags `autoscaling_group` et `autoscalinggroupname`.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `AutoScaling` est cochée dans la section concernant la collecte des métriques.
2. Dans AWS, les données d'Auto Scaling doivent être envoyées à CloudWatch. Consultez [Activer les métriques du groupe Auto Scaling][3].
3. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][4] afin de recueillir des métriques Amazon Auto Scaling. Pour en savoir plus, consultez la section relative aux [stratégies Auto Scaling][5] de la documentation AWS.

    | Autorisation AWS                          | Description                                                                                                                                                                                                                                              |
    | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `autoscaling:DescribeAutoScalingGroups` | Utilisé pour énumérer tous les groupes Auto Scaling.                                                                                                                                                                                                        |
    | `autoscaling:DescribePolicies`          | Énumère les stratégies disponibles (pour la saisie automatique dans les événements et les monitors).                                                                                                                                                                                    |
    | `autoscaling:DescribeTags`              | Utilisé pour énumérer les tags d'un groupe Auto Scaling donné. Cette autorisation permet d'ajouter des tags de groupe Auto Scaling personnalisés aux métriques CloudWatch des groupes Auto Scaling.                                                                                                                                               |
    | `autoscaling:DescribeScalingActivities` | Utilisé pour générer des événements en cas de dimensionnement d'un groupe Auto Scaling.                                                                                                                                                                                               |
    | `autoscaling:ExecutePolicy`             | Exécuter une stratégie (dimensionnement à la hausse ou à la baisse à partir d'un monitor ou du flux d'événements).<br>Cette autorisation n'est pas comprise dans le [document de stratégie d'installation](#installation) et ne doit être ajoutée que si vous utilisez des monitors ou des événements pour exécuter une stratégie de dimensionnement automatique. |

4. Installez l'[intégration Datadog/AWS Auto Scaling][6].

### Collecte de logs

#### Activer le logging

Configurez AWS Auto Scaling de façon à ce que les logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_auto_scaling` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][7].
2. Une fois la fonction lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs AWS Auto Scaling dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][8]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][9]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_auto_scaling" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS Auto Scaling comprend des événements pour les lancements et les fermetures d'instances EC2. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_auto_scaling/aws_auto_scaling_events.png" alt="Événements AWS Auto Scaling" >}}

### Checks de service

L'intégration AWS Auto Scaling n'inclut aucun check de service.

## Dépannage

Pour que les métriques de groupes Auto Scaling s'affichent dans Datadog, activez-les d'abord dans votre console AWS. Pour ce faire, [consultez les instructions dédiées sur le site d'AWS][11]. **Remarque :** ces métriques peut prendre un certain temps à apparaître après leur activation.

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html#as-enable-group-metrics
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/autoscaling/plans/userguide/auth-and-access-control.html
[6]: https://app.datadoghq.com/account/settings#integrations/amazon_auto_scaling
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[9]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_auto_scaling/amazon_auto_scaling_metadata.csv
[11]: http://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-detailed-instance-metrics
[12]: https://docs.datadoghq.com/fr/help/