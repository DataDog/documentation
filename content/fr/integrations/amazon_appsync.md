---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_AppSync."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_appsync/'
git_integration_title: amazon_appsync
has_logo: true
integration_title: "Amazon\_AppSync"
is_public: true
kind: integration
manifest_version: 1
name: amazon_appsync
public_title: "Intégration Datadog/Amazon\_AppSync"
short_description: "Surveillez des métriques clés d'Amazon\_AppSync."
version: 1
---
## Présentation
Amazon AppSync simplifie le développement applicatif en vous permettant de créer une API flexible pour accéder à des données, mais également les manipuler et les combiner depuis une ou plusieurs sources de données, et ce en toute sécurité.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'AppSync.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `AppSync` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon AppSync][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_appsync" >}}


### Événements
L'intégration Amazon AppSync n'inclut aucun événement.

### Checks de service
L'intégration Amazon AppSync n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-appsync
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_appsync/amazon_appsync_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}