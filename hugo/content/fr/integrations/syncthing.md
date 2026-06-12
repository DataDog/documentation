---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Syncthing Overview: assets/dashboards/syncthing_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    '[Syncthing] Disconnected': assets/monitors/syncthing_disconnected.json
    '[Syncthing] Folder error': assets/monitors/syncthing_folder_error.json
    '[Syncthing] Out of sync': assets/monitors/syncthing_out_of_sync.json
    '[Syncthing] System error': assets/monitors/syncthing_system_error.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- collaboration
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/syncthing/README.md
display_name: Syncthing
draft: false
git_integration_title: syncthing
guid: 1e29ccc9-cec4-4cf5-b566-2f71021ad315
integration_id: syncthing
integration_title: Syncthing
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: Alexander@Bushnev.ru
manifest_version: 1.0.0
metric_prefix: syncthing.
metric_to_check: syncthing.connections.count
name: syncthing
public_title: Intégration Datadog/Syncthing
short_description: Surveillez les statistiques générales de votre instance Syncthing.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Syncthing synchronise des fichiers en temps réel entre deux ordinateurs ou plus. Cette intégration vous permet de surveiller [Syncthing][1] avec Datadog.

## Configuration

Le check Syncthing n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Syncthing sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation du check Syncthing avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-syncthing==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `syncthing.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5] pour commencer à recueillir vos [métriques](#metriques) Syncthing. Consultez le [fichier d'exemple syncthing.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][7].

### Validation

Lancez la [sous-commande status de l'Agent][8] et cherchez `syncthing` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "syncthing" >}}


### Événements

Syncthing n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "syncthing" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].


[1]: https://syncthing.net/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/datadog_checks/syncthing/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/assets/service_checks.json
[11]: https://docs.datadoghq.com/fr/help/