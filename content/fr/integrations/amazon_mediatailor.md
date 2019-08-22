---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Elemental\_MediaTailor."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_mediatailor/'
git_integration_title: amazon_mediatailor
has_logo: true
integration_title: "Amazon\_Elemental\_MediaTailor"
is_public: true
kind: integration
manifest_version: 1
name: amazon_mediatailor
public_title: "Intégration Datadog/Amazon\_Elemental_MediaTailor"
short_description: "Surveillez des métriques clés d'Amazon\_Elemental\_MediaTailor."
version: 1
---
## Présentation
Amazon MediaTailor est un service de personnalisation et de monétisation de contenu permettant l’ajout de contenu publicitaire du côté du serveur évolutif.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Elemental MediaTailor.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `MediaTailor` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Elemental MediaTailor][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_mediatailor" >}}


### Événements
L'intégration Amazon Elemental MediaTailor n'inclut aucun événement.

### Checks de service
L'intégration Amazon Elemental MediaTailor n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mediatailor
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediatailor/amazon_mediatailor_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}