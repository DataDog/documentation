---
app_id: rapdev-zoom
app_uuid: a79217b7-6499-4de5-8ebd-73a91d227644
assets:
  dashboards:
    RapDev Zoom Call Quality: assets/dashboards/rapdev_zoom_meeting_quality.json
    RapDev Zoom Geolocation Overview: assets/dashboards/rapdev_zoom_geo_overview.json
    RapDev Zoom Overview: assets/dashboards/rapdev_zoom_overview.json
    RapDev Zoom Rooms Dashboard: assets/dashboards/rapdev_zoom_rooms_dashboard.json
    RapDev Zoom User Details: assets/dashboards/rapdev_zoom_user_details.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.zoom.meetings.count
      metadata_path: metadata.csv
      prefix: rapdev.zoom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Zoom par RapDev
  logs: {}
  monitors:
    Zoom API Limit Was Encountered: assets/monitors/zoom_api_rate_limit.json
    Zoom Room's Component is Offline or Not Working Properly: assets/monitors/zoom_room_component_has_problem.json
    Zoom Room's Health is in Warning or Critical State: assets/monitors/zoom_room_has_problem.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: datadog-engineering@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- cloud
- collaboration
- messaging
- monitoring
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_zoom
integration_id: rapdev-zoom
integration_title: Zoom
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_zoom
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.zoom
  product_id: zoom
  short_description: Prix unitaire par utilisateur
  tag: zoom_user_email
  unit_label: Utilisateurs enregistrés Zoom
  unit_price: 1
public_title: Intégration Zoom
short_description: Surveiller vos comptes Zoom et optimiser l'utilisation de votre
  licence
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Cloud
  - Category::Collaboration
  - Category::Messaging
  - Category::Monitoring
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveiller vos comptes Zoom et optimiser l'utilisation de votre licence
  media:
  - caption: Vue d'ensemble des réunions
    image_url: images/meetings.png
    media_type: image
  - caption: Dashboard des salles Zoom
    image_url: images/rooms.png
    media_type: image
  - caption: Vue d'ensemble de la qualité des réunions
    image_url: images/meeting_quality.png
    media_type: image
  - caption: Dashboard des détails utilisateur
    image_url: images/user_details.png
    media_type: image
  - caption: Vue d'ensemble des géolocalisations
    image_url: images/geo.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Intégration Zoom
---



## Présentation

L'intégration Zoom vous permet de surveiller vos réunions, salles, utilisateurs, statistiques réseau et géolocalisations pour optimiser l'expérience de vos employés, où qu'ils soient situés dans le monde. L'intégration offre quatre dashboards préconfigurés et entièrement personnalisables pour faire émerger les informations clés. De plus, l'interface visuelle a été conçue pour être adaptée à la fois au personnel de direction, aux responsables, aux tech leads, aux ingénieurs et bien plus encore !

### Monitors

1. Problème détecté au niveau d'une salle Zoom
2. Problème détecté au niveau d'un composant d'une salle Zoom

### Dashboards

1. Vue d'ensemble des réunions Zoom RapDev
2. Dashboard des salles Zoom RapDev
3. Qualité des réunions Zoom RapDev
4. Détails des utilisateurs Zoom RapDev
5. Vue d'ensemble des géolocalisations Zoom RapDev

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

- Assistance : datadog-engineering@rapdev.io
- Service commercial : sales@rapdev.io
- Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Téléphone : 855-857-0222

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez à RapDev](mailto:datadog-engineering@rapdev.io) et nous l'ajouterons !*

[1]: https://marketplace.zoom.us/
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information


---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-zoom" target="_blank">Cliquez ici</a> pour l'acheter.