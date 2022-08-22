---
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- containers
creates_events: true
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/podman/README.md
display_name: Podman
draft: false
git_integration_title: podman
guid: a2f38981-b8ff-40c4-8494-ac150b3fca6e
integration_id: podman
integration_title: Podman
integration_version: ''
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: container.
name: podman
public_title: Intégration Podman
short_description: Surveiller toutes vos métriques sur les conteneurs Podman avec
  Datadog
support: core
supported_os:
- linux
---



[Podman][1] est un moteur de conteneur sans daemon conçu pour développer, gérer et exécuter des conteneurs OCI sur votre système Linux. Les conteneurs peuvent être exécutés en mode root ou rootless.

## Présentation

Le runtime de conteneur Podman est pris en charge par le [check d'Agent Container][2]. Ce check transmet un ensemble de métriques sur tous les conteneurs en cours d'exécution, sans tenir compte du runtime utilisé pour démarrer ces conteneurs.

**REMARQUE** : le check `container` transmet des métriques standardisées pour tous les conteneurs identifiés sur le système, peu importe le runtime des conteneurs.

## Configuration

### Installation

Pour surveiller des conteneurs gérés par [Podman][1], consultez les [instructions d'installation][3] pour le [check d'Agent Container][2].

## Données collectées

### Métriques

Consultez le fichier [metadata.csv][4] pour découvrir la liste des métriques fournies par cette intégration.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: https://podman.io/
[2]: https://docs.datadoghq.com/fr/integrations/container/
[3]: https://docs.datadoghq.com/fr/integrations/container/#setup
[4]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv