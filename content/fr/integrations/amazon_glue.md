---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Glue."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_glue/'
git_integration_title: amazon_glue
has_logo: true
integration_title: Amazon Glue
is_public: true
kind: integration
manifest_version: 1
name: amazon_glue
public_title: "Intégration Datadog/Amazon\_Glue"
short_description: "Surveillez des métriques clés d'Amazon\_Glue."
version: 1
---
## Présentation
AWS Glue est un service d'extraction, de transformation et de chargement (ETL) entièrement géré qui simplifie et réduit les coûts associés à la catégorisation, au  nettoyage, à l'enrichissement et au déplacement sans erreur de vos données d'un data store à l'autre.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Glue.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Glue` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Glue][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_glue" >}}


### Événements
L'intégration Amazon Glue n'inclut aucun événement.

### Checks de service
L'intégration Amazon Glue n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-glue
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_glue/amazon_glue_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}