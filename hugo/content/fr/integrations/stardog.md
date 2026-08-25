---
app_id: stardog
app_uuid: a4d874ba-7173-4c43-8cc8-09f966186be8
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: stardog.dbms.memory.native.max
      metadata_path: metadata.csv
      prefix: stardog.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Stardog
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Stardog
  sales_email: support@stardog.com
  support_email: support@stardog.com
categories:
- data store
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/stardog/README.md
display_on_public_website: true
draft: false
git_integration_title: stardog
integration_id: stardog
integration_title: Stardog
integration_version: 2.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: stardog
public_title: Stardog
short_description: Un collecteur de données Stardog pour Datadog.
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
  - Category::Data Store
  configuration: README.md#Setup
  description: Un collecteur de données Stardog pour Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Stardog
---



## Présentation

Recueillez des métriques du service Stardog en temps réel pour :

- Visualiser et surveiller les états de Stardog
- Être informé des failovers et des événements Stardog

## Configuration

Le check Stardog n'est pas inclus avec le package de l'[Agent Datadog][1] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Stardog sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-stardog==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `stardog.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#metriques) Stardog. Consultez le [fichier d'exemple stardog.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

## Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `stardog` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "stardog" >}}


### Événements

Le check Stardog n'inclut aucun événement.

### Checks de service

Le check Stardog n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/stardog/datadog_checks/stardog/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/stardog/metadata.csv
[9]: http://docs.datadoghq.com/help