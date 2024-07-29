---
categories:
- cloud
- aws
- log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon MWAA.
doc_link: https://docs.datadoghq.com/integrations/amazon_mwaa/
draft: false
git_integration_title: amazon_mwaa
has_logo: true
integration_id: amazon-mwaa
integration_title: Amazon MWAA
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_mwaa
public_title: Intégration Datadog/Amazon MWAA
short_description: Surveillez des métriques clés d'Amazon MWAA.
version: '1.0'
---

## Présentation

Amazon Managed Workflows for Apache Airflow (Amazon MWAA) est un service géré pour Apache Airflow qui vous permet de créer et de gérer facilement vos workflows dans le cloud.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'Amazon MWAA.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `MWAA` est cochée
   dans la section « Limit metric collection by AWS servic ».
2. Installez l'[intégration Datadog/Amazon MWAA][3].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_mwaa" >}}


### Événements

L'intégration Amazon MWAA n'inclut aucun événement.

### Checks de service

L'intégration Amazon MWAA n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mwaa
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mwaa/amazon_mwaa_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/