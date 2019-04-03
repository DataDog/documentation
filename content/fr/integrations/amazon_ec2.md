---
aliases:
  - /fr/integrations/awsec2/
categories:
  - cloud
  - os & system
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez l''utilisation des ressources de l''instance, surveillez les checks de statut, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ec2/'
git_integration_title: amazon_ec2
has_logo: true
integration_title: "AWS\_EC2"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ec2
public_title: "Intégration Datadog/AWS\_EC2"
short_description: 'Surveillez l''utilisation des ressources de l''instance, surveillez les checks de statut, et plus encore.'
version: '1.0'
---
## Présentation

Amazon Elastic Compute Cloud (Amazon EC2) est un service Web qui fournit une capacité de calcul adaptative dans le cloud. Ce service est conçu pour faciliter le cloud computing à l'échelle du Web pour les développeurs.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques EC2 ainsi que des événements supplémentaires, tels que des maintenances planifiées.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `EC2` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon EC2. Pour en savoir plus sur les stratégies EC2, consultez [la documentation du site Web d'AWS][4].

    | Autorisation AWS               | Description                                                                                                                           |
    |------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
    | `ec2:DescribeInstanceStatus` | Utilisé par l'intégration ELB pour assurer l'intégrité d'une l'instance et par l'intégration EC2 pour décrire l'intégrité de toutes les instances. |
    | `ec2:DescribeSecurityGroups` | Ajoute des tags personnalisés et des noms SecurityGroup aux instances EC2.                                                                            |
    | `ec2:DescribeInstances`      | Ajoute des tags aux instances EC2 et aux métriques EC2 CloudWatch.                                                                                |

3. Installez l'[intégration Datadog/AWS EC2][5].

**Remarque** : si vous souhaitez surveiller un sous-ensemble de vos instances EC2 avec Datadog, assignez un tag AWS, comme `datadog:true`, à ces instances EC2. Indiquez ensuite ce tag dans la zone de texte **Optionally limit metrics collection** de votre [carré d'intégration Datadog/AWS][13].

#### Désactivation automatique pour EC2

Datadog peut désactiver de façon proactive des monitors dans le cadre d'un arrêt manuel d'instances EC2 et d'une résiliation d'instance déclenchée par la mise à l'échelle automatique d'AWS en fonction des statuts des hosts de l'API CloudWatch. Les instances EC2 automatiquement désactivées sont énumérées sur la page [Monitor Downtime][14] en cochant **Show automatically muted hosts**.

Sachez que l'intégration EC2 doit être installée pour activer la désactivation automatique. Si la collecte de métriques est limitée aux hosts avec des tags, seules les instances correspondant aux tags sont automatiquement désactivées.

Pour désactiver les monitors lors des arrêts planifiés de l'instance EC2, cochez la case **EC2 automuting** dans le [carré d'intégration AWS][2] :

{{< img src="integrations/amazon_ec2/aws_ec2_automuting.png" alt="Désactivation automatique AWS EC2" responsive="true">}}

### Collecte de logs

Utilisez l'[Agent Datadog][6] ou un autre [log shipper][7] pour envoyer vos logs à Datadog.
## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_ec2" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

**Remarque** : `aws.ec2.instance_age` n'est pas recueilli par défaut avec l'intégration Datadog/EC2. [Contactez-nous][9] pour activer cette collecte de métriques.

### Checks de service
L'intégration AWS EC2 n'inclut aucun check de service.

### Événements
L'intégration AWS EC2 comprend des événements pour des maintenances planifiées et à venir ainsi que des avertissements d'instance. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_ec2/aws_ec2_events.png" alt="Événements AWS EC2" responsive="true">}}

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog] (https://docs.datadoghq.com/help/).

## Pour aller plus loin

* [Métriques clés pour la surveillance EC2][10]
* [Comment recueillir des métriques EC2][11]
* [Comment surveiller les instances EC2 avec Datadog][12]


[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ec2.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_ec2
[6]: https://docs.datadoghq.com/fr/logs
[7]: https://docs.datadoghq.com/fr/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/amazon_ec2_metadata.csv
[9]: https://docs.datadoghq.com/fr/help/
[10]: https://www.datadoghq.com/blog/ec2-monitoring/
[11]: https://www.datadoghq.com/blog/collecting-ec2-metrics/
[12]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog/
[13]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[14]: https://app.datadoghq.com/monitors#downtime


{{< get-dependencies >}}