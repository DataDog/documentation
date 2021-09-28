---
categories:
  - cloud
  - data store
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez vos métriques et vos logs AWS\_DocumentDB."
doc_link: https://docs.datadoghq.com/integrations/amazon_documentdb/
draft: false
further_reading:
  - link: https://www.datadoghq.com/blog/monitor-documentdb-with-datadog/
    tag: Blog
    text: "Recueillez des métriques et des logs Amazon\_DocumentDB avec Datadog"
git_integration_title: amazon_documentdb
has_logo: true
integration_id: amazon-documentdb
integration_title: "Amazon\_DocumentDB"
is_public: true
kind: intégration
manifest_version: '1.0'
name: amazon_documentdb
public_title: "Intégration Datadog/Amazon\_DocumentDB"
short_description: "Surveillez vos métriques et vos logs AWS\_DocumentDB."
version: '1.0'
---
## Présentation

Amazon DocumentDB est un service de base de données de documents rapide, scalable, hautement disponible et entièrement géré qui prend en charge les charges de travail MongoDB.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `DocumentDB` est cochée dans la section sur la collecte de métriques.
2. Installez l'[intégration Datadog/AWS DocumentDB][3].

### Collecte de logs

#### Activer le logging

Configurez Amazon DocumentDB de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_documentdb` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon DocumentDB dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_documentdb" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, dbinstanceidentifier et dbclusteridentifier.

### Événements

L'intégration AWS DocumentDB n'inclut aucun événement.

### Checks de service

L'intégration AWS DocumentDB n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_documentdb
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_documentdb/amazon_documentdb_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/