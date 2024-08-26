---
app_id: podman
app_uuid: ecc06845-18ac-448e-b352-1bbf31fdfcc3
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10267
    source_type_name: Podman
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/podman/README.md
display_on_public_website: true
draft: false
git_integration_title: podman
integration_id: podman
integration_title: Podman
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: podman
public_title: Podman
short_description: Surveiller toutes vos métriques sur les conteneurs Podman avec
  Datadog
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Containers
  configuration: README.md#Setup
  description: Surveiller toutes vos métriques sur les conteneurs Podman avec Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Podman
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


[Podman][1] est un moteur de conteneur sans daemon conçu pour développer, gérer et exécuter des conteneurs OCI sur votre système Linux. Les conteneurs peuvent être exécutés en mode root ou rootless.

## Présentation

Le runtime de conteneur Podman est pris en charge par le [check d'Agent Container][2]. Ce check transmet un ensemble de métriques sur tous les conteneurs en cours d'exécution, sans tenir compte du runtime utilisé pour démarrer ces conteneurs.

**REMARQUE** : le check `container` transmet des métriques standardisées pour tous les conteneurs identifiés sur le système, peu importe le runtime des conteneurs.

## Formule et utilisation

### Liste des infrastructures

Pour surveiller des conteneurs gérés par [Podman][1], consultez les [instructions d'installation][3] pour le [check d'Agent Container][2].

## Real User Monitoring

### Analyse d'entonnoirs

Consultez le fichier [metadata.csv][4] pour découvrir la liste des métriques fournies par cette intégration.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: https://podman.io/
[2]: https://docs.datadoghq.com/fr/integrations/container/
[3]: https://docs.datadoghq.com/fr/integrations/container/#setup
[4]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv