---
app_id: rapdev-gitlab
app_uuid: 629973c5-63ac-4f17-a9c2-5bda5b6677b4
assets:
  dashboards:
    RapDev GitLab Overview: assets/dashboards/RapDevGitLabDashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.gitlab.users
      metadata_path: metadata.csv
      prefix: rapdev.gitlab.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: RapDev GitLab
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- cloud
- metrics
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_gitlab
integration_id: rapdev-gitlab
integration_title: GitLab
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_gitlab
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.gitlab
  product_id: gitlab
  short_description: Prix unitaire par projet
  tag: project_name
  unit_label: Projet GitLab
  unit_price: 1
public_title: GitLab
short_description: Surveillez vos projets, applications et instances GitLab.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Cloud
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez vos projets, applications et instances GitLab.
  media:
  - caption: Métriques générales sur le statut de l'API GitLab, métriques de projet
      et statistiques Sidekiq
    image_url: images/RapDevGitLab_DB1.jpg
    media_type: image
  - caption: Métriques sur toutes vos instances
    image_url: images/RapDevGitLab_DB2.jpg
    media_type: image
  - caption: Métriques sur des runners et des tickets spécifiques
    image_url: images/RapDevGitLab_DB3.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: GitLab
  uninstallation: README.md#Uninstallation
---



## Présentation
GitLab est une plateforme de DevOps qui permet de développer, sécuriser et gérer des logiciels depuis une seule application. Cette intégration recueille et transmet les métriques GitLab suivantes via différents endpoints dans l'API GitLab :
+ Métriques de projet
+ Statistiques Sidekiq
+ Métriques d'instance
+ Runners installés
+ Nombre total de tickets et nombre de tickets ouverts

### Dashboards
Cette intégration propose un dashboard prêt à l'emploi intitulé **Dashboard RapDev GitLab**. Il permet de visualiser l'historique des données transmises à Datadog et inclut des variables d'environnement afin de pouvoir retrouver un projet ou un host spécifique.

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :
- Assistance : support@rapdev.io
- Service commercial : sales@rapdev.io
- Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Téléphone : 855-857-0222

---
Développé avec ❤️ à Boston
*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous][2] et nous l'ajouterons !*

[1]: https://docs.datadoghq.com/fr/getting_started/agent/
[2]: mailto:support@rapdev.io

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-gitlab" target="_blank">Cliquez ici</a> pour l'acheter.