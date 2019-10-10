---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Neptune."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_neptune/'
git_integration_title: amazon_neptune
has_logo: true
integration_title: "Amazon\_Neptune"
is_public: true
kind: integration
manifest_version: 1
name: amazon_neptune
public_title: "Intégration Datadog/Amazon\_Neptune"
short_description: "Surveillez des métriques clés d'Amazon\_Neptune."
version: 1
---
## Présentation
Amazon Neptune est un service de base de données orienté graphe fiable, rapide et entièrement géré qui facilite la création et l'exécution d'applications utilisant des ensembles de données hautement connectés.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Neptune.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Neptune` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Neptune][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_neptune" >}}


### Événements
L'intégration Amazon Neptune n'inclut aucun événement.

### Checks de service
L'intégration Amazon Neptune n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-neptune
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_neptune/amazon_neptune_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}