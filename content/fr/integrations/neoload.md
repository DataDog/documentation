---
app_id: neoload
app_uuid: 3d16e6da-7ac2-47b4-95c0-0d221686f05a
assets:
  dashboards:
    NeoLoad Performance Testing: assets/dashboards/neoload_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: NeoLoad.Controller.User.Load
      metadata_path: metadata.csv
      prefix: NeoLoad.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10317
    source_type_name: neoload
  logs: {}
author:
  homepage: https://www.tricentis.com/products/performance-testing-neoload
  name: Tricentis
  sales_email: sales@tricentis.com
  support_email: support@tricentis.com
categories:
- notifications
- testing
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neoload/README.md
display_on_public_website: true
draft: false
git_integration_title: neoload
integration_id: neoload
integration_title: NeoLoad
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: neoload
public_title: NeoLoad
short_description: Surveillez et analysez les résultats des tests de performance NeoLoad
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Category::Testing
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveillez et analysez les résultats des tests de performance NeoLoad
  media:
  - caption: Dashboard des tests de performance NeoLoad
    image_url: images/neoload-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: NeoLoad
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Présentation

[La plateforme NeoLoad de Tricentis][1] simplifie et met à l’échelle les tests de performance, aussi bien pour les API et les microservices que pour les tests d’applications de bout en bout, grâce à des fonctionnalités innovantes basées sur le protocole et le navigateur.

Grâce à l'intégration NeoLoad, vous pouvez surveiller les métriques de performance liées à vos tests NeoLoad pour :

- Corréler les performances de votre application avec les métriques d'évaluation de la charge système dans NeoLoad
- Analyser et visualiser dans Datadog les métriques de NeoLoad telles que les débits de requêtes, les erreurs et les performances à l'aide du dashboard prêt à l'emploi ou du [Metrics Explorer][2]

## Configuration

### Configuration

Pour obtenir des instructions détaillées sur la configuration de NeoLoad, consultez la [documentation NeoLoad][3] (en anglais). Depuis la version 9.1 de NeoLoad, vous avez la possibilité de choisir les métriques à envoyer via la configuration **Push Counters** du connecteur Datadog dans NeoLoad.

Installez l'intégration NeoLoad dans Datadog pour ajouter le dashboard NeoLoad par défaut à la liste de vos dashboards.


## Données collectées

### Métriques
{{< get-metrics-from-git "neoload" >}}


### Événements

Tous les événements liés aux tests de performance NeoLoad sont envoyés à l'[Events Explorer Datadog][5].
NeoLoad envoie des événements à l'API Datadog lorsqu'un test de performance commence ou se termine.
Définissez l'option correspondante dans la configuration **Push Counters** du connecteur Datadog, disponible à partir de la version 9.1 de NeoLoad.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog][6] ou l'[assistance Tricentis NeoLoad][7].

[1]: https://www.tricentis.com/products/performance-testing-neoload
[2]: /fr/metrics/explorer
[3]: https://documentation.tricentis.com/neoload/latest/en/content/reference_guide/datadog.htm
[4]: https://github.com/DataDog/integrations-extras/blob/master/neoload/metadata.csv
[5]: https://docs.datadoghq.com/fr/events/
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://support-hub.tricentis.com/