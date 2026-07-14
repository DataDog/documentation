---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/directory/README.md
display_name: Directory
draft: false
git_integration_title: directory
guid: 0c38c4ef-5266-4667-9fb1-de8f2b73708a
integration_id: system
integration_title: Directory
integration_version: 1.13.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.disk.directory.file.bytes
name: directory
public_title: Intégration Datadog/Directory
short_description: L'intégration Directory transmet des métriques sur des fichiers
  pour un répertoire donné.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Capturez des métriques à partir des répertoires et des fichiers de votre choix. L'Agent recueille les éléments suivants :

- Le nombre de fichiers
- La taille des fichiers
- La date de dernière modification
- La date de création

## Configuration

### Installation

Le check Directory est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `directory.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] pour commencer à recueillir vos données de performance Directory. Consultez le [fichier d'exemple directory.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     ## @param directory - string - required
     ## The directory to monitor. On windows, please make sure you escape back-slashes otherwise the YAML
     ## parser fails (eg. - directory: "C:\\Users\\foo\\Downloads").
     #
     - directory: "<DIRECTORY_PATH>"
   ```

    Vérifiez que l'utilisateur qui exécute le processus de l'Agent (généralement, `datadog-agent`) dispose d'un accès en lecture aux répertoires, sous-répertoires et fichiers que vous configurez.

    **Remarque** : sur Windows, lorsque vous ajoutez votre répertoire, utilisez deux barres obliques (`C:\\chemin\\vers\\répertoire`) au lieu d'une seule (`C:\chemin\vers\répertoire`) pour exécuter le check, ceci afin d'éviter que le check Directory échoue et que la traceback se termine par l'erreur `found unknown escape character in "<chaîne>"` signalant un problème de caractère d'échappement inconnu.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `directory` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "directory" >}}


### Événements

Le check Directory n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "directory" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/directory/datadog_checks/directory/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/directory/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/directory/assets/service_checks.json
[8]: https://docs.datadoghq.com/fr/help/