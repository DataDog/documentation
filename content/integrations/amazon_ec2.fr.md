---
aliases:
  - /fr/integrations/awsec2/
categories:
  - cloud
  - os & system
  - aws
  - log collection
ddtype: crawler
description: >-
  Suivre l'utilisation des ressources de l'instance, surveiller les checks de
  status et plus...
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ec2/'
git_integration_title: amazon_ec2
has_logo: true
integration_title: AWS EC2
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ec2
public_title: Intégration Datadog-AWS EC2
short_description: >-
  Suivre l'utilisation des ressources de l'instance, monitorer les check de
  status et plus...
version: '1.0'
---
## Aperçu

Amazon Elastic Compute Cloud (Amazon EC2) est un service Web qui fournit une capacité de calcul redimensionnable dans le cloud. Il est conçu pour faciliter le cloud computing à l'échelle du Web pour les développeurs.

Activez cette intégration pour voir dans Datadog toutes vos métriques EC2.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration d'Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `EC2` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon EC2 :

    * `ec2:DescribeInstanceStatus`: Utilisé par l'intégration ELB pour affirmer la santé d'une instance. Utilisé par l'intégration EC2 pour décrire la santé de toutes les instances.
    * `ec2:DescribeSecurityGroups`: Ajoute les noms SecurityGroup et les tags personnalisés aux instances ec2.
    * `ec2:DescribeInstances`:  Ajoute des tags aux instances ec2 et aux métriques cloudwatch ec2.

    Pour en savoir plus sur les stratégies EC2, consultez [la documentation disponible sur le site d'AWS][4].

3. Installez l'[intégration Datadog - AWS EC2][5].

**Note**: Si vous souhaitez uniquement surveiller un sous-ensemble de vos instances EC2 sur AWS, taggez-les et spécifiez le tag dans la zone de texte **limit** de votre [onglet d'intégration AWS].(https://app.datadoghq.com/account/settings#integrations/amazon_web_services).

### Collecte de log

Utilisez l'[Agent de Datadog][6] ou un autre [outil d'envoi de logs][7] pour transmettre vos logs à Datadog.
## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_ec2" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'hôte, les groupes de sécurité et plus encore.

**Remarque** : par défaut, la métrique « aws.ec2.instance_age » n'est pas recueillie avec l'intégration Datadog - EC2. [Contactez-nous][9] pour activer la collecte de cette métrique.

### Evénements
L'intégration AWS EC2 n'inclut aucun événements pour le moment.

### Checks de Service
{{< get-service-checks-from-git "amazon_ec2" >}}


## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Pour en savoir plus sur la surveillance d'infrastructure et pour découvrir toutes nos intégrations, rendez-vous sur [notre blog][10]


[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ec2.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_ec2
[6]: https://docs.datadoghq.com/logs
[7]: https://docs.datadoghq.com/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/amazon_ec2_metadata.csv
[9]: http://docs.datadoghq.com/help/
[10]: https://www.datadoghq.com/blog/