---
app_id: container
app_uuid: ac3cc203-5b28-457d-8737-bbe32fa7c3b9
assets:
  dashboards:
    Containers: assets/dashboards/containers.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: container.uptime
      metadata_path: metadata.csv
      prefix: container.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10242
    source_type_name: Container
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
- kubernetes
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/container/README.md
display_on_public_website: true
draft: false
git_integration_title: container
integration_id: container
integration_title: Container
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: container
public_title: Container
short_description: Surveillez toutes vos métriques de conteneur avec Datadog.
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Surveillez toutes vos métriques de conteneur avec Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Container
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Ce check transmet un ensemble de métriques relatives aux conteneurs en cours d'exécution, quel que soit le runtime utilisé pour les lancer.

**REMARQUE** : le check `container` diffère du check `containerd`. Les checks `container` envoient des métriques standard pour tous les conteneurs détectés sur le système, quel que soit le runtime du conteneur. Le check `containerd` est dédié au runtime `containerd` et publie des métriques dans l'espace de nommage `containerd.*`.

## Formule et utilisation

### Liste des infrastructures

Container est un check de base de l'Agent Datadog. Il est automatiquement activé tant qu'un runtime de conteneur pris en charge est détecté. Selon votre environnement, vous devrez potentiellement configurer l'accès aux runtimes de conteneur pris en charge (Docker, containerd).

#### Installation sur des conteneurs

Pour que le check `container` s'active automatiquement, vous devez monter certains dossiers. Cette opération est gérée par le chart Helm officiel et l'Operator Datadog, en respectant la documentation pertinente de Kubernetes, Docker, ECS et ECS Fargate.

### Dépannage de la solution Browser

Le check `container` n'expose aucun paramètre de configuration spécifique. Pour personnaliser les champs communs ou forcer l'activation du check `container`, procédez comme suit :

1. Créez le fichier `container.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent.

2. [Redémarrez l'Agent][1].

Le check `container` peut recueillir des métriques relatives au processeur, à la mémoire, au réseau et aux E/S des disques. Selon votre environnement (Linux/Windows, par exemple), il est possible que certaines métriques ne soient pas disponibles.

### Validation

[Lancez la sous-commande `status` de l'Agent][1] et cherchez `container` dans la section **Checks**.

## Real User Monitoring

### Analyse d'entonnoirs

Consultez [metadata.csv][2] pour découvrir la liste complète des métriques fournies par cette intégration.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv
[3]: https://docs.datadoghq.com/fr/help/