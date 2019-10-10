---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Elemental\_MediaConnect."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_mediaconnect/'
git_integration_title: amazon_mediaconnect
has_logo: true
integration_title: "Amazon\_Elemental\_MediaConnect"
is_public: true
kind: integration
manifest_version: 1
name: amazon_mediaconnect
public_title: "Intégration Datadog/Amazon\_Elemental_MediaConnect"
short_description: "Surveillez des métriques clés d'Amazon\_Elemental\_MediaConnect."
version: 1
---
## Présentation
Amazon Elemental MediaConnect est un service de transport pour la vidéo en direct.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Elemental MediaConnect.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `MediaConnect` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Elemental MediaConnect][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_mediaconnect" >}}


### Événements
L'intégration Amazon Elemental MediaConnect n'inclut aucun événement.

### Checks de service
L'intégration Amazon Elemental MediaConnect n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mediaconnect
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediaconnect/amazon_mediaconnect_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}