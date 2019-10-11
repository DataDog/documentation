---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Shield."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_shield/'
git_integration_title: amazon_shield
has_logo: true
integration_title: "Amazon\_Shield"
is_public: true
kind: integration
manifest_version: 1
name: amazon_shield
public_title: "Intégration Datadog/Amazon\_Shield"
short_description: "Surveillez des métriques clés d'Amazon\_Shield."
version: 1
---
## Présentation
Les solutions Shield Standard et Shield Advanced d'Amazon sont conçues pour protéger contre les attaques DDoS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Shield.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Shield` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Shield][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_shield" >}}


### Événements
L'intégration Amazon Shield n'inclut aucun événement.

### Checks de service
L'intégration Amazon Shield n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-shield
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_shield/amazon_shield_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}