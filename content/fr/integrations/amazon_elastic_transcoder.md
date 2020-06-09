---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Elastic\_Transcoder."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_elastic_transcoder/'
git_integration_title: amazon_elastic_transcoder
has_logo: true
integration_title: "Amazon\_Elastic\_Transcoder"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_elastic_transcoder
public_title: "Intégration Datadog/Amazon Elastic\_Transcoder"
short_description: "Surveillez des métriques clés d'Amazon\_Elastic\_Transcoder."
version: '1.0'
---
## Présentation

Amazon Elastic Transcoder vous permet de convertir des fichiers multimédia stockés sur Amazon S3 vers un format lisible par les appareils grand public.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'Elastic Transcoder.

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `ElasticTranscoder` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/Amazon Elastic Transcoder][3].

### Collecte de logs

#### Activer le logging

Configurez Amazon Elastic Transcoder de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers Cloudwatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_elastic_transcoder` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs Cloudwatch qui contient vos logs Amazon Elastic Transcoder dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs Cloudwatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_elastic_transcoder" >}}


### Événements

L'intégration Amazon Elastic Transcoder n'inclut aucun événement.

### Checks de service

L'intégration Amazon Elastic Transcoder n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-elastic-transcoder
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elastic_transcoder/amazon_elastic_transcoder_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/