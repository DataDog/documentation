---
app_id: boundary
app_uuid: 61898266-9c80-442d-89d3-22e7aeeafb94
assets:
  dashboards:
    Boundary Overview: assets/dashboards/boundary_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: boundary.worker.proxy.websocket.active_connections
      metadata_path: metadata.csv
      prefix: boundary.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Boundary
  monitors:
    '[Boundary] High active connections': assets/monitors/active_connections.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/boundary/README.md
display_on_public_website: true
draft: false
git_integration_title: boundary
integration_id: boundary
integration_title: Boundary
integration_version: 1.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: boundary
public_title: Boundary
short_description: Surveillez des contrôleurs et des workers Boundary.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Configuration & Deployment
  - Category::Log Collection
  configuration: README.md#Setup
  description: Surveillez des contrôleurs et des workers Boundary.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Boundary
---



## Présentation

Ce check permet de surveiller [Boundary][1] via l'Agent Datadog. Boundary est pris en charge à partir de la version `0.8.0`.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Configurer l'Agent Datadog pour l'APM

Le check Boundary est inclus avec le package de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

#### Écouteur

Un écouteur avec le purpose `ops` doit être configuré dans le fichier `config.hcl` afin d'activer la collecte de métriques. Voici un exemple de configuration d'un écouteur :

```hcl
controller {
  name = "boundary-controller"
  database {
    url = "postgresql://<nom_utilisateur>:<mot_de_passe>@10.0.0.1:5432/<nom_base_de_données>"
  }
}

listener "tcp" {
  purpose = "api"
  tls_disable = true
}

listener "tcp" {
  purpose = "ops"
  tls_disable = true
}
```

Le [check de service](#checks-de-service) `boundary.controller.health` envoie le statut `WARNING` lorsque le contrôleur est en cours d'arrêt. Pour bénéficier de ce délai supplémentaire avant l'arrêt du contrôleur, modifiez dans le bloc `controller` la durée d'attente définie :

```hcl
controller {
  name = "boundary-controller"
  database {
    url = "env://BOUNDARY_PG_URL"
  }
  graceful_shutdown_wait_duration = "10s"
}
```

#### Agent Datadog

1. Modifiez le fichier `boundary.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Boundary. Consultez le [fichier d'exemple boundary.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `boundary` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "boundary" >}}


### Events

L'intégration Boundary n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "boundary" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://www.boundaryproject.io
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/boundary/datadog_checks/boundary/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/boundary/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/boundary/assets/service_checks.json
[9]: https://docs.datadoghq.com/fr/help/