---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_AppStream."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_appstream/'
git_integration_title: amazon_appstream
has_logo: true
integration_title: "Amazon\_AppStream"
is_public: true
kind: integration
manifest_version: 1
name: amazon_appstream
public_title: "Intégration Datadog/Amazon\_AppStream"
short_description: "Surveillez des métriques clés d'Amazon\_AppStream."
version: 1
---
## Présentation
Amazon AppStream est un service de streaming d'applications sécurisé et entièrement géré qui vous permet de diffuser vos applications de bureau d'AWS vers un navigateur web.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'AppStream.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `AppStream` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon AppStream][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_appstream" >}}


### Événements
L'intégration Amazon AppStream n'inclut aucun événement.

### Checks de service
L'intégration Amazon AppStream n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-appstream
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_appstream/amazon_appstream_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}