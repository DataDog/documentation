---
aliases:
  - /fr/integrations/awsiot/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Internet of Things.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_iot/'
git_integration_title: amazon_iot
has_logo: true
integration_title: "Amazon\_Internet\_of\_Things"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_iot
public_title: "Intégration Datadog/Amazon\_ Internet\_of\_Things"
short_description: Surveillez des métriques clés d'Amazon Internet of Things.
version: '1.0'
---
## Présentation

AWS IoT est une plateforme sur le cloud gérée qui permet aux appareils connectés d'interagir facilement et en toute sécurité avec des applications sur le cloud et d'autres appareils.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'IOT.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `IoT` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS IoT][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_iot" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS IoT n'inclut aucun événement.

### Checks de service
L'intégration AWS IoT n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_iot
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_iot/amazon_iot_metadata.csv
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}