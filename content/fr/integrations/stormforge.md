---
app_id: stormforge
app_uuid: 6f1ddcc9-e704-4f94-941b-8a914fcd89a0
assets:
  dashboards:
    StormForge Optimize Live Application Overview: assets/dashboards/stormforge_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: stormforge.recommendation_cpu_requests_cores
      metadata_path: metadata.csv
      prefix: stormforge.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: StormForge
author:
  homepage: https://stormforge.io
  name: StormForge
  sales_email: sales@stormforge.io
  support_email: support@stormforge.io
categories:
- cloud
- configuration & deployment
- containers
- gestion des coûts
- kubernetes
- orchestration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/stormforge/README.md
display_on_public_website: true
draft: false
git_integration_title: stormforge
integration_id: stormforge
integration_title: StormForge
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: stormforge
oauth: {}
public_title: StormForge
short_description: Optimisation en temps réel des ressources Kubernetes à l'aide de
  lʼapprentissage automatique
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Cost Management
  - Category::Kubernetes
  - Category::Orchestration
  - Offering::Integration
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Optimisation en temps réel des ressources Kubernetes à l'aide de lʼapprentissage
    automatique
  media:
  - caption: Créez une application faisant office de collecte de ressources à cibler
      pour l'optimisation.
    image_url: images/sf_ui_01_application.jpg
    media_type: image
  - caption: Configurer Optimize Live
    image_url: images/sf_ui_02_configure.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: StormForge
---



## Présentation

[StormForge Optimize Live][1] applique lʼapprentissage automatique à vos métriques dʼobservabilité pour faire des recommandations en temps réel sur les demandes de ressources pour tout déploiement exécuté dans Kubernetes.

**Avec StormForge Optimize Live, vous pouvez :**
- Améliorer l'efficacité des ressources
- Exploiter les données d'observabilité existantes
- Réduire le risque de problèmes de performance
- Atteindre un délai de rentabilité rapide
- Déployer des recommandations automatiquement ou avec approbation

## Implémentation

Pour configurer cette intégration, vous devez disposer d'un compte StormForge ainsi que d'une clé d'API et d'une clé d'application Datadog.

### Configuration

1. Créez une [clé d'API Datadog][2].
2. Créez une [clé dʼapplication Datadog][3].
3. Ajoutez la clé d'API et la clé d'application Datadog à l'[intégration Datadog/StormForge][4].
4. Déployer Optimize Live
5. Configurez vos applications dans [StormForge][5].

Des instructions plus détaillées sont disponibles dans le [guide de prise en main de StormForge][6].

## Données collectées

### Métriques
{{< get-metrics-from-git "stormforge" >}}


### Événements

Lʼintégration StormForge crée des événements pour :
- Les mises à jour de lʼapplication
- Les recommandations appliquées

### Checks de service

L'intégration StormForge n'inclut aucun check de service.

## Assistance

Pour toute question ou demande dʼassistance, vous pouvez contacter StormForge via [e-mail][8].

[1]: https://www.stormforge.io/how-stormforge-optimize-live-works/
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#application-keys
[4]: https://docs.stormforge.io/optimize-live/getting-started/install/#datadog-metric-provider
[5]: https://app.stormforge.io
[6]: https://docs.stormforge.io/optimize-live/
[7]: https://github.com/DataDog/integrations-extras/blob/master/stormforge/metadata.csv
[8]: mailto:support@stormforge.io