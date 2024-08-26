---
algolia:
  subcategory: Intégrations du Marketplace
app_id: rapdev-rapid7
app_uuid: 388017a0-e4cc-45ad-b038-c2141abf20c1
assets:
  dashboards:
    RapDev rapid7 Investigations: assets/dashboards/rapdev_rapid7_investigations.json
    RapDev rapid7 Overview: assets/dashboards/rapdev_rapid7_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.rapid7.logs.processed
      metadata_path: metadata.csv
      prefix: rapdev.rapid7.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: RapDev Rapid7
  logs:
    source: rapid7
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- log collection
- marketplace
- security
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_rapid7
integration_id: rapdev-rapid7
integration_title: Rapid7
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_rapid7
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: rapid7
  short_description: Coût unique pour cette intégration
  unit_price: 500
public_title: Rapid7
short_description: Surveiller vos logs Rapid7 et les activités d'enquête
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Marketplace
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveiller vos logs Rapid7 et les activités d'enquête
  media:
  - caption: Enquêtes
    image_url: images/R7_investigations_dash_redacted.png
    media_type: image
  - caption: Statuts globaux
    image_url: images/rapdev_rapid7_dashboard_.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Rapid7
  uninstallation: README.md#Uninstallation
---



## Présentation
Cette intégration permet de suivre l'état des enquêtes Rapid7 en cours et récemment clôturées. Elle envoie un message dans le flux d'événements à chaque ouverture ou fermeture d'un événement, et classe ces événements selon l'ID de l'enquête.

Si vous activez le composant Log du check, celui-ci se base sur l'API Rapid7 REST pour interroger les flux de logs IDR. L'intégration renvoie tous les logs qui ne sont pas considérés comme des logs de la plateforme Rapid7. Ces logs sont alors transmis à Datadog. **Remarque** : l'envoi de ces logs peut entraîner des frais supplémentaires en fonction de votre offre tarifaire Datadog, comme décrit dans la [grille tarifaire de la solution Log Management Datadog](https://www.datadoghq.com/pricing/?product=log- management#log-management). Ces logs comprennent généralement des synthèses de l'agent d'endpoint Rapid7 ainsi que les statuts des processus associés.

### Dashboards
1. Cette intégration inclut un dashboard prêt à l'emploi, qui fournit une synthèse des enquêtes Rapid7.
2. Vous disposez également d'un exemple de dashboard axé sur les logs. Vous avez accès à ce dashboard dès l'installation de l'intégration, mais le flux de données ne s'affiche qu'après avoir créé d'une facette pour la source de logs R7.

### Événements
Cette intégration génère des événements Datadog pour les nouvelles enquêtes en cours ou les enquêtes clôturées. Elle surveille l'évolution d'une enquête en fonction de son ID et regroupe les événements d'ouverture et de clôture générés.

### Métriques
Le nombre de logs traités par check est transmis sous la forme d'une métrique.

### Collecte de logs
La collecte de logs est facultative et désactivée par défaut. Cette intégration appelle l'API de logs Rapid7 afin d'interroger tous les logs disponibles lors du dernier intervalle. Par défaut, l'intervalle est défini sur les 60 dernières secondes. Vous pouvez définir des [ensembles de logs][4] précis afin de ne recueillir que ces logs. Pour en savoir plus, consultez la [documentation sur la recherche de logs][5] de Rapid7 insightIDR (en anglais).

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

- Assistance : support@rapdev.io
- Service commercial : sales@rapdev.io
- Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Téléphone : +1 855-857-0222

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:support@rapdev.io) et nous l'ajouterons !*

[1]: https://insight.rapid7.com/platform#/apiKeyManagement/organization
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://us.idr.insight.rapid7.com/op/D8A1412BEA86A11F15E5#/search
[5]: https://docs.rapid7.com/insightidr/log-search/

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-rapid7" target="_blank">Cliquez ici</a> pour l'acheter.