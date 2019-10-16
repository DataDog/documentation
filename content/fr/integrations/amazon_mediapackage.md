---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Elemental\_MediaPackage."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_mediapackage/'
git_integration_title: amazon_mediapackage
has_logo: true
integration_title: "Amazon\_Elemental\_MediaPackage"
is_public: true
kind: integration
manifest_version: 1
name: amazon_mediapackage
public_title: "Intégration Datadog/Amazon\_Elemental_MediaPackage"
short_description: "Surveillez des métriques clés d'Amazon\_Elemental\_MediaPackage."
version: 1
---
## Présentation
Amazon Elemental MediaPackage est un service de montage et d'empaquetage vidéo juste à temps qui permet de diffuser des flux vidéo hautement fiables, évolutifs et sécurisés sur une vaste gamme d'appareils.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'Elemental MediaPackage.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `MediaPackage` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Elemental MediaPackage][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_mediapackage" >}}


### Événements
L'intégration Amazon Elemental MediaPackage n'inclut aucun événement.

### Checks de service
L'intégration Amazon Elemental MediaPackage n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][4].



{{< get-dependencies >}}
[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mediapackage
[4]: https://docs.datadoghq.com/fr/help
