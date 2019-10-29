---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Connect."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_connect/'
git_integration_title: amazon_connect
has_logo: true
integration_title: "Amazon\_Connect"
is_public: true
kind: integration
manifest_version: 1
name: amazon_connect
public_title: "Intégration Datadog/Amazon\_Connect"
short_description: "Surveillez des métriques clés d'Amazon\_Connect."
version: 1
---
## Présentation
Amazon Connect est un centre de configuration en libre service conçu pour créer des flux de contacts dynamiques, naturels et personnels.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Connect.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Connect` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Connect][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_connect" >}}


### Événements
L'intégration Amazon Connect n'inclut aucun événement.

### Checks de service
L'intégration Amazon Connect n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-connect
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_connect/amazon_connect_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}