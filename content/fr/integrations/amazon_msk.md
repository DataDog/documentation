---
categories:
- cloud
- aws
- log collection
dependencies: []
description: Surveillez des métriques clés d'Amazon Managed Streaming for Apache Kafka
  (MSK).
doc_link: https://docs.datadoghq.com/integrations/amazon_msk/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-amazon-msk/
  tag: GitHub
  text: Surveiller l'intégration Amazon Managed Streaming for Apache Kafka avec Datadog
git_integration_title: amazon_msk
has_logo: true
integration_id: amazon-msk
integration_title: Amazon Managed Streaming for Apache Kafka
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_msk
public_title: Intégration Datadog/Amazon Managed Streaming for Apache Kafka
short_description: Surveillez des métriques clés d'Amazon MSK.
version: '1.0'
---

## Présentation

Amazon Managed Streaming for Apache Kafka (MSK) est un service entièrement géré qui vous permet de créer et d'exécuter facilement des applications qui utilisent Apache Kafka pour traiter les données en streaming.

Cette intégration utilise un crawler qui recueille les métriques de CloudWatch. Consultez la page [Amazon MSK (Agent)][1] pour en savoir plus sur la surveillance de MSK via l'Agent Datadog.

## Configuration

Activez le crawler Amazon MSK pour visualiser les métriques MSK de CloudWatch dans Datadog.

### Configurer l'Agent Datadog pour l'APM

Si vous ne l'avez pas déjà fait, configurez d'abord l'[intégration Amazon Web Services][2].

### Collecte de métriques

1. Sur la [page de l'intégration AWS][3], vérifiez que `Kafka` est activé dans l'onglet `Metric Collection`.

2. Installez l'[intégration Amazon MSK][4].

### Collecte de logs

#### Activer le logging

Configurez Amazon MSK de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarques** : 
- Si vous stockez vos logs dans un compartiment S3, assurez-vous que `amazon_msk` est défini en tant que _Target prefix_.
- Si vous stockez vos logs dans un groupe de logs CloudWatch, assurez-vous que son nom contient la sous-chaîne `msk`.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][5].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon MSK dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][6]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][7]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_msk" >}}


### Events

Le crawler Amazon MSK n'inclut aucun événement.

### Service Checks

L'intégration Amazon MSK n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].



{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_kafka/
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-msk
[5]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_msk/amazon_msk_metadata.csv
[9]: https://docs.datadoghq.com/fr/help/