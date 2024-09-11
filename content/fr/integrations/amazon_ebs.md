---
aliases:
- /fr/integrations/awsebs/
categories:
- cloud
- data store
- aws
- log collection
ddtype: crawler
dependencies: []
description: Surveillez l'âge des snapshots, les IOPS, les temps de lecture/écriture,
  et plus encore.
doc_link: https://docs.datadoghq.com/integrations/amazon_ebs/
draft: false
git_integration_title: amazon_ebs
has_logo: true
integration_id: amazon-ebs
integration_title: Amazon Elastic Block Store
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_ebs
public_title: Intégration Datadog/Amazon Elastic Block Store
short_description: Surveillez l'âge des snapshots, les IOPS, les temps de lecture/écriture,
  et plus encore.
version: '1.0'
---

## Présentation

Amazon EBS fournit des volumes de stockage permanent en mode bloc à utiliser avec les instances Amazon EC2 dans le cloud AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'EBS.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `EBS` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/AWS EBS][3].

**Remarque** : cette intégration recueille des métriques pour les volumes EBS associés à une instance EC2 surveillée. Pour recueillir toutes les métriques EBS, assurez-vous de cocher la case EC2 dans le [carré d'intégration AWS][2] et vérifiez que la surveillance d'EC2 n'est pas exclue dans le paramètre de [limitation de la collecte des ressources][4].

### Collecte de logs

#### Activer le logging

Configurez Amazon EBS de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_ebs` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][5].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon EBS dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][6]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][7]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_ebs" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS EBS n'inclut aucun événement.

### Checks de service

L'intégration AWS EBS n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

- [Métriques clés pour la surveillance d'Amazon EBS][10]
- [Collecte des métriques d'Amazon EBS][11]
- [Surveillance des volumes d'Amazon EBS avec Datadog][12]

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_ebs
[4]: https://docs.datadoghq.com/fr/account_management/billing/aws/#aws-resource-exclusion
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ebs/amazon_ebs_metadata.csv
[9]: https://docs.datadoghq.com/fr/help/
[10]: https://www.datadoghq.com/blog/amazon-ebs-monitoring
[11]: https://www.datadoghq.com/blog/collecting-amazon-ebs-metrics
[12]: https://www.datadoghq.com/blog/monitoring-amazon-ebs-volumes-with-datadog