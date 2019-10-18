---
aliases:
  - /fr/integrations/awscloudsearch/
categories:
  - cloud
  - processing
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez l''utilisation de vos index, le nombre de requêtes réussies, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/awscloudsearch/'
git_integration_title: amazon_cloudsearch
has_logo: true
integration_title: "Amazon\_CloudSearch"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_cloudsearch
public_title: "Intégration Datadog/Amazon\_CloudSearch"
short_description: 'Surveillez l''utilisation de vos index, le nombre de requêtes réussies, et plus encore.'
version: '1.0'
---
## Présentation

Amazon CloudSearch est un service géré économique qui est basé sur le cloud AWS. Il facilite la configuration, la gestion et le dimensionnement d'une solution de recherche.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de CloudSearch.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `CloudSearch` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS CloudSearch][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_cloudsearch" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS CloudSearch n'inclut aucun événement.

### Checks de service
L'intégration AWS CloudSearch n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudsearch
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cloudsearch/amazon_cloudsearch_metadata.csv
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}