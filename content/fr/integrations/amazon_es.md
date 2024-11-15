---
app_id: amazon-es
app_uuid: c00f4e38-7cc5-42ae-9ea1-519776f5f350
assets:
  dashboards:
    aws_es: assets/dashboards/amazon_es_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.es.cpuutilization
      metadata_path: metadata.csv
      prefix: aws.es.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 148
    source_type_name: Amazon ES
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_es
integration_id: amazon-es
integration_title: Amazon OpenSearch Service
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_es
public_title: Amazon OpenSearch Service
short_description: Amazon OpenSearch Service simplifie le déploiement et l'utilisation
  d'OpenSearch.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  configuration: README.md#Setup
  description: Amazon OpenSearch Service simplifie le déploiement et l'utilisation
    d'OpenSearch.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon OpenSearch Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Présentation

Amazon OpenSearch Service est un service géré qui facilite le déploiement, l'utilisation et la mise à l'échelle de clusters OpenSearch dans le cloud AWS. OpenSearch est un moteur d'analyse et de recherche entièrement open source qui est notamment utilisé pour l'analyse de logs, la surveillance d'applications en temps réel et l'analyse de flux de clics.

Activez cette intégration pour visualiser dans Datadog tous vos tags personnalisés OpenSearch Service. Veuillez toutefois noter que cette intégration s'applique à Amazon AWS OpenSearch Service, et non à une instance Elasticsearch autonome hébergée en dehors d'Amazon AWS. Pour ce type de configuration, privilégiée plutôt l'[intégration Elasticsearch][1].

Remarque : pour activer toutes les fonctionnalités de cette intégration, vous devez attribuer les autorisations 'es:ListTags', 'es:ListDomainNames' et 'es:DescribeElasticsearchDomains'.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord l'[intégration Amazon Web Services][2].

### Collecte de métriques

1. Sur la [page de l'intégration AWS][3], vérifiez que `ES` est activé dans l'onglet `Metric Collection`.
2. Installez l'[intégration Datadog/Amazon OpenSearch Service][4].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_es" >}}


### Événements

L'intégration Amazon OpenSearch Service n'inclut aucun événement.

### Checks de service

L'intégration Amazon OpenSearch Service n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://docs.datadoghq.com/fr/integrations/elastic
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-es
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_es/metadata.csv
[6]: https://docs.datadoghq.com/fr/help/