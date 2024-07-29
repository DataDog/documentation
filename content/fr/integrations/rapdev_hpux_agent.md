---
app_id: rapdev-hpux-agent
app_uuid: 5e611b0d-a099-4823-a4ba-e42b1012b3b5
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: datadog.marketplace.rapdev.hpux_agent
      metadata_path: metadata.csv
      prefix: rapdev.hpux_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Agent HP-UX RapDeb
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: datadog-engineering@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_hpux_agent
integration_id: rapdev-hpux-agent
integration_title: Agent HP-UX
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_hpux_agent
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.hpux_agent
  product_id: hpux-agent
  short_description: Prix unitaire par host
  tag: host
  unit_label: Agent HP-UX
  unit_price: 40
public_title: Agent HP-UX
short_description: Agent système fournissant des métriques pour HP-UX 11.31 pour les
  architectures hppa et itanium
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  configuration: README.md#Setup
  description: Agent système fournissant des métriques pour HP-UX 11.31 pour les architectures
    hppa et itanium
  media:
  - caption: Liste des infrastructures
    image_url: images/1.png
    media_type: image
  - caption: Métriques de host
    image_url: images/2.png
    media_type: image
  - caption: Logs
    image_url: images/3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Agent HP-UX
---


## Présentation

L'Agent HP-UX vous permet de recueillir et d'analyser des métriques système dans Datadog. L'intégration prend en charge HP-UX 11.31 dans les architectures PA-RISC et Itanium. L'Agent HP-UX utilise la distribution système Perl par défaut de HP-UX et ne nécessite pas de dépendances de bibliothèques supplémentaires, ce qui simplifie l'installation et la compatibilité.

L'Agent HP-UX fournit les métadonnées de host requises pour prendre en charge la liste d'infrastructures de Datadog, ce qui permet à votre organisation de travailler avec des systèmes de host HP-UX similaires à d'autres systèmes d'exploitation de host pris en charge par Datadog.

L'Agent HP-UX utilise les mêmes URL et ports que les Agents natifs. Il ne prend actuellement en charge que les métriques d'infrastructure core, les checks de processus et les tails de logs. L'Agent HP-UX ne prend en charge aucun check d'Agent, aucune intégration ni aucun check de service.

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

 - E-mail : datadog-engineering@rapdev.io 
 - Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Téléphone : 855-857-0222 

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:datadog-engineering@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-hpux-agent" target="_blank">Cliquez ici</a> pour l'acheter.