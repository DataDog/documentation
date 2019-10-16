---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Managed Streaming for Kafka (MSK).
doc_link: 'https://docs.datadoghq.com/integrations/amazon_msk/'
git_integration_title: amazon_msk
has_logo: true
integration_title: "Amazon\_MSK"
is_public: true
kind: integration
manifest_version: 1
name: amazon_msk
public_title: "Intégration Datadog/Amazon\_MSK"
short_description: "Surveillez des métriques clés d'Amazon\_MSK."
version: 1
---
## Présentation
Amazon Managed Streaming for Kafka (MSK) est un service entièrement géré qui vous permet de créer et d'exécuter facilement des applications qui utilisent Apache Kafka pour traiter les données en streaming.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de MSK.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `MSK` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon MSK][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_msk" >}}


### Événements
L'intégration Amazon MSK n'inclut aucun événement.

### Checks de service
L'intégration Amazon MSK n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-msk
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_msk/amazon_msk_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}