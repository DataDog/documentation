---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    RapDev Zoom Call Quality: assets/dashboards/rapdev_zoom_meeting_quality.json
    RapDev Zoom Geolocation Overview: assets/dashboards/rapdev_zoom_geo_overview.json
    RapDev Zoom Overview: assets/dashboards/rapdev_zoom_overview.json
    RapDev Zoom Rooms Dashboard: assets/dashboards/rapdev_zoom_rooms_dashboard.json
    RapDev Zoom User Details: assets/dashboards/rapdev_zoom_user_details.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    Zoom Room's Component is Offline or Not Working Properly: assets/monitors/zoom_room_component_has_problem.json
    Zoom Room's Health is in Warning or Critical State: assets/monitors/zoom_room_has_problem.json
  saved_views: {}
  service_checks: assets/service_checks.json
author:
  homepage: 'https://www.rapdev.io'
  name: RapDev.io
categories:
  - marketplace
  - cloud
  - collaboration
  - messaging
  - monitoring
creates_events: false
ddtype: crawler
dependencies: []
display_name: Zoom par RapDev
draft: false
git_integration_title: rapdev_zoom
guid: a0a0380a-42b7-4977-92fc-a65c8d904b8d
integration_id: rapdev-zoom
integration_title: Zoom par RapDev
is_public: true
kind: integration
maintainer: integrations@rapdev.io
manifest_version: 1.0.0
metric_prefix: rapdev.zoom.
metric_to_check: rapdev.zoom.meetings.count
name: rapdev_zoom
pricing:
  - billing_type: tag_count
    metric: datadog.marketplace.rapdev.zoom
    tag: zoom_user_email
    unit_label: Utilisateurs enregistrés Zoom
    unit_price: 1
public_title: Zoom par RapDev
short_description: Surveillez vos comptes Zoom et optimisez votre licence.
support: partner
supported_os:
  - linux
  - mac_os
  - windows
terms:
  eula: assets/EULA.pdf
  legal_email: ddsales@rapdev.io
---
## Présentation

L'intégration Zoom vous permet de surveiller vos réunions, salles, utilisateurs, statistiques réseau et géolocalisations pour optimiser l'expérience de vos employés, où qu'ils soient situés dans le monde. L'intégration offre quatre dashboards préconfigurés et entièrement personnalisables pour faire émerger les informations clés. De plus, l'interface visuelle a été conçue pour être adaptée à la fois au personnel de direction, aux responsables, aux tech leads, aux ingénieurs et bien plus encore !

### Vue d'ensemble des réunions
{{< img src="marketplace/rapdev_zoom/images/meetings.png" alt="Screenshot1" >}}

### Dashboard des salles Zoom
{{< img src="marketplace/rapdev_zoom/images/rooms.png" alt="Screenshot1" >}}

### Vue d'ensemble de la qualité des réunions
{{< img src="marketplace/rapdev_zoom/images/meeting_quality.png" alt="Screenshot1" >}}

### Dashboard des détails utilisateur
{{< img src="marketplace/rapdev_zoom/images/user_details.png" alt="Screenshot1" >}}

### Vue d'ensemble des géolocalisations
{{< img src="marketplace/rapdev_zoom/images/geo.png" alt="Screenshot1" >}}

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

- Assistance : integrations@rapdev.io
- Service commercial : sales@rapdev.io
- Chat : RapDev.io/products
- Téléphone : 855-857-0222

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:integrations@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici][4] pour l'acheter.

[1]: https://marketplace.zoom.us/
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/marketplace/app/rapdev-zoom/pricing