---
categories:
- cloud
- data stores
- aws
- log collection
dependencies: []
description: Surveillez vos métriques et vos logs Amazon DocumentDB.
doc_link: https://docs.datadoghq.com/integrations/amazon_documentdb/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-documentdb-with-datadog/
  tag: Blog
  text: Recueillez des métriques et des logs Amazon DocumentDB avec Datadog
git_integration_title: amazon_documentdb
has_logo: true
integration_id: ''
integration_title: Amazon DocumentDB
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_documentdb
public_title: Intégration Datadog/Amazon DocumentDB
short_description: Surveillez vos métriques et vos logs Amazon DocumentDB.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Amazon DocumentDB est un service de base de données de documents rapide, scalable, hautement disponible et entièrement géré qui prend en charge les charges de travail MongoDB.

## Formule et utilisation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans la [page de l'intégration AWS][2], vérifiez que `DocumentDB` est activé dans l'onglet `Metric Collection`.
2. Installez l'[intégration Datadog/Amazon DocumentDB][3].

### APM

#### Activer le logging

Configurez Amazon DocumentDB de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_documentdb` est défini en tant que _Target prefix_.

#### Envoi de logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon DocumentDB dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][6]

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "amazon_documentdb" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, dbinstanceidentifier et dbclusteridentifier.

### Aide

L'intégration Amazon DocumentDB n'inclut aucun événement.

### Aide

L'intégration Amazon DocumentDB n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-documentdb
[4]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_documentdb/amazon_documentdb_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/