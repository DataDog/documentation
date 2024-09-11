---
categories:
- cloud
- aws
- log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Kinesis Data Analytics.
doc_link: https://docs.datadoghq.com/integrations/amazon_kinesis_data_analytics/
draft: false
git_integration_title: amazon_kinesis_data_analytics
has_logo: true
integration_id: amazon-kinesis-data-analytics
integration_title: Amazon Kinesis Data Analytics
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_kinesis_data_analytics
public_title: Intégration Datadog/Amazon Kinesis Data Analytics
short_description: Surveillez des métriques clés d'Amazon Kinesis Data Analytics.
version: '1.0'
---

## Présentation

Amazon Kinesis Data Analytics vous permet de transformer, d'interroger et d'analyser facilement des données de streaming en temps réel grâce à Apache Flink.

Activez cette intégration pour visualiser toutes vos métriques Amazon Kinesis Data Analytics dans Datadog.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `KinesisAnalytics` est cochée
   dans la section concernant la collecte de métriques.
2. Installez l'[intégration Datadog/Amazon Kinesis Data Analytics][3].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_kinesis_data_analytics" >}}


### Événements

L'intégration Amazon Kinesis Data Analytics n'inclut aucun événement.

### Checks de service

L'intégration Amazon Kinesis Data Analytics n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-kinesis-data-analytics
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis_data_analytics/amazon_kinesis_data_analytics_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/