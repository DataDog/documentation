---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Gamelift."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_gamelift/'
git_integration_title: amazon_gamelift
has_logo: true
integration_title: Amazon Gamelift
is_public: true
kind: integration
manifest_version: 1
name: amazon_gamelift
public_title: "Intégration Datadog/Amazon\_Gamelift"
short_description: "Surveillez des métriques clés d'Amazon\_Gamelift."
version: 1
---
## Présentation
Amazon Gamelift est un service entièrement géré pour le déploiement, la gestion et la mise à l'échelle de vos serveurs de jeu multijoueur dans le cloud.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Gamelift.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Gamelift` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Gamelift][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_gamelift" >}}


### Événements
L'intégration Amazon Gamelift n'inclut aucun événement.

### Checks de service
L'intégration Amazon Gamelift n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-gamelift
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_gamelift/amazon_gamelift_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}