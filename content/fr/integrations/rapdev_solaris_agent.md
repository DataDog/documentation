---
app_id: rapdev-solaris-agent
app_uuid: a994f2cf-1f77-4e74-803d-fb833455e224
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: datadog.marketplace.rapdev.solaris_agent
      metadata_path: metadata.csv
      prefix: rapdev.solaris_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Agent Solaris par RapDev
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: datadog-engineering@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
classifier_tags:
- Category::Marketplace
- Offering::Integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_solaris_agent
integration_id: rapdev-solaris-agent
integration_title: Agent Solaris
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_solaris_agent
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.solaris_agent
  product_id: solaris-agent
  short_description: Prix unitaire par host
  tag: host
  unit_label: Agent Solaris
  unit_price: 40
public_title: Agent Solaris
short_description: Agent fournissant des métriques pour Solaris 10 et 11 pour les
  architectures sparc et i86pc
supported_os: []
tile:
  changelog: CHANGELOG.md
  configuration: README.md#Setup
  description: Agent fournissant des métriques pour Solaris 10 et 11 pour les architectures
    sparc et i86pc
  media:
  - caption: Liste des infrastructures
    image_url: images/1.png
    media_type: image
  - caption: Détails de l'infrastructure des hosts
    image_url: images/2.png
    media_type: image
  - caption: Métriques de host
    image_url: images/3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Agent Solaris
---


## Présentation

L'Agent Solaris vous permet de recueillir et d'analyser des métriques système Solaris dans Datadog. L'intégration prend en charge Solaris 10 et 11, ainsi que les architectures SPARC et i86pc. L'Agent Solaris utilise la distribution système Perl par défaut de Solaris et ne nécessite pas de dépendances de bibliothèques supplémentaires, ce qui simplifie l'installation et la compatibilité.

L'Agent Solaris fournit les métadonnées de host requises pour prendre en charge la liste d'infrastructures de Datadog, ce qui permet à votre organisation de travailler avec des systèmes de host Solaris similaires à d'autres systèmes d'exploitation de host pris en charge par Datadog.

L'Agent Solaris utilise les mêmes URL et ports que les Agents natifs. L'Agent Solaris ne prend en charge que les métriques d'infrastructure core, les checks de processus et les tails de logs. Il ne prend en charge aucun check d'Agent, aucune intégration ni aucun check de service.

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

 - E-mail : datadog-engineering@rapdev.io 
 - Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Téléphone : 855-857-0222 

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:datadog-engineering@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici](https://app.datadoghq.com/marketplace/app/rapdev-solaris-agent/pricing) pour l'acheter.