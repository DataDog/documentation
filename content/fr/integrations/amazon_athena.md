---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Athena."
doc_link: https://docs.datadoghq.com/integrations/amazon_athena/
draft: false
git_integration_title: amazon_athena
has_logo: true
integration_id: amazon-athena
integration_title: "Amazon\_Athena"
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_athena
public_title: "Intégration Datadog/Amazon\_Athena"
short_description: "Surveillez des métriques clés d'Amazon\_Athena."
version: '1.0'
---
## Présentation

Amazon Athena est un service de requête interactif qui simplifie l'analyse de données directement dans Amazon Simple Storage Service (Amazon S3) à l'aide de la syntaxe SQL standard.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'Athena.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Athena` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/Amazon Athena][3].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_athena" >}}


### Événements

L'intégration Amazon Athena n'inclut aucun événement.

### Checks de service

L'intégration Amazon Athena n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-athena
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_athena/amazon_athena_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/