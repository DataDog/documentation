---
aliases:
- /fr/integrations/awsfirehose/
categories:
- cloud
- processing
- aws
- log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Firehose.
doc_link: https://docs.datadoghq.com/integrations/amazon_firehose/
draft: false
git_integration_title: amazon_firehose
has_logo: true
integration_id: amazon-firehose
integration_title: Amazon Firehose
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_firehose
public_title: Intégration Datadog/Amazon Firehose
short_description: Surveillez des métriques clés d'Amazon Firehose.
version: '1.0'
---

## Présentation

Amazon Firehose constitue le moyen le plus simple d'importer des données de flux dans AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Firehose.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Firehose` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/AWS Firehose][3].

### Collecte de logs

#### Activer le logging

Configurez Amazon Firehose de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_firehose` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon Firehose dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_firehose" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS Kinesis Firehose n'inclut aucun événement.

### Checks de service

L'intégration AWS Kinesis Firehose n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_firehose
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_firehose/amazon_firehose_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/