---
app_id: dotnetclr
app_uuid: 2147d078-2742-413e-83eb-58400657de56
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: dotnetclr.memory.time_in_gc
      metadata_path: metadata.csv
      prefix: dotnetclr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: .NET CLR
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/dotnetclr/README.md
display_on_public_website: true
draft: false
git_integration_title: dotnetclr
integration_id: dotnetclr
integration_title: .NET CLR
integration_version: 1.14.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: dotnetclr
public_title: .NET CLR
short_description: Visualisez et surveillez les statuts de Dotnetclr
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Languages
  configuration: README.md#Setup
  description: Visualisez et surveillez les statuts de Dotnetclr
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: .NET CLR
---



## Présentation

Recueillez des métriques du service .NET CLR en temps réel pour :

- Visualiser et surveiller les statuts de .NET CLR
- Être informé des failovers et des événements de .NET CLR

## Configuration

### Installation

Le check .NET CLR est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `dotnetclr.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] pour commencer à recueillir vos données de performance .NET CLR. Consultez le [fichier d'exemple dotnetclr.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.
2. [Redémarrez l'Agent][4].

**Remarque** : les versions 1.10.0+ de ce check utilisent une nouvelle implémentation pour la collecte de métriques qui nécessite d'utiliser Python 3. Pour les hosts ne pouvant pas utiliser Python 3, ou si vous souhaitez utiliser une ancienne version de ce check, consultez [cette configuration][5].

## Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `dotnetclr` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "dotnetclr" >}}


### Checks de service

Le check .NET CLR n'inclut aucun check de service.

### Événements

Le check .NET CLR n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/