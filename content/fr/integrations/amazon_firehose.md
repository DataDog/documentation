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
description: "Surveillez des métriques clés d'Amazon\_Firehose."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_firehose/'
git_integration_title: amazon_firehose
has_logo: true
integration_title: "Amazon\_Firehose"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_firehose
public_title: "Intégration Datadog/Amazon\_Firehose"
short_description: "Surveillez des métriques clés d'Amazon\_Firehose."
version: '1.0'
---
## Présentation

Amazon Firehose constitue le moyen le plus simple d'importer des données de flux dans AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Firehose.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Firehose` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS Firehose][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_firehose" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Kinesis Firehose n'inclut aucun événement.

### Checks de service
L'intégration AWS Kinesis Firehose n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_firehose
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_firehose/amazon_firehose_metadata.csv
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}