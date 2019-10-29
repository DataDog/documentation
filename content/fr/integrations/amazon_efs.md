---
aliases:
  - /fr/integrations/awsefs/
categories:
  - cloud
  - os & system
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Elastic File System.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_efs/'
git_integration_title: amazon_efs
has_logo: true
integration_title: "Amazon\_Elastic\_File\_System"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_efs
public_title: "Intégration Datadog/Amazon\_Elastic\_File\_System"
short_description: Surveillez des métriques clés d'Amazon Elastic File System.
version: '1.0'
---
## Présentation

Amazon EFS est un système de stockage de fichiers simple et évolutif à utiliser avec les instances Amazon EC2 dans le cloud AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'EFS.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `EFS` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon EFS :

    * `elasticfilesystem:DescribeTags` : récupère les tags personnalisés appliqués aux systèmes de fichiers.
    * `elasticfilesystem:DescribeFileSystems` : fournit la liste des systèmes de fichiers actifs.

    Pour en savoir plus sur les stratégies EFS, consultez [la documentation disponible sur le site d'AWS][4].

3. Installez l'[intégration Datadog/AWS EFS][5].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_efs" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Elastic File System n'inclut aucun événement.

### Checks de service
L'intégration AWS Elastic File System n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticfilesystem.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_efs
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_efs/amazon_efs_metadata.csv
[7]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}