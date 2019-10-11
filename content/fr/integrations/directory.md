---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/directory/README.md'
display_name: Directory
git_integration_title: directory
guid: 0c38c4ef-5266-4667-9fb1-de8f2b73708a
integration_id: system
integration_title: Directory
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.disk.directory.file.bytes
name: directory
public_title: Intégration Datadog/Directory
short_description: L'intégration Directory transmet des métriques sur des fichiers pour un répertoire donné. directory
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Capturez des métriques à partir des répertoires et des fichiers de votre choix. L'Agent recueille les éléments suivants :

  * Le nombre de fichiers
  * La taille des fichiers
  * La date de dernière modification
  * La date de création

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Directory est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `directory.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos données de performance Directory. Consultez le [fichier d'exemple directory.d/conf.yam][4] pour découvrir toutes les options de configuration disponibles.

    ```yaml
      init_config:

      instances:
        - directory: "/path/to/directory" # the only required option
          name: "my_monitored_dir"        # What the Agent will tag this directory's metrics with. Defaults to "directory"
          pattern: "*.log"                # defaults to "*" (all files)
          recursive: True                 # default False
          countonly: False                # set to True to only collect the number of files matching 'pattern'. Useful for very large directories.
          ignore_missing: False           # set to True to not raise exceptions on missing or inaccessible directories
    ```

    Vérifiez que l'utilisateur qui exécute le processus de l'Agent (généralement, `datadog-agent`) dispose d'un accès en lecture aux répertoires, sous-répertoires et fichiers que vous configurez.

    **Remarque** : sur Windows, lorsque vous ajoutez votre répertoire, utilisez deux barres obliques (`C:\\chemin\\vers\\répertoire`) au lieu d'une seule (`C:\chemin\vers\répertoire`) pour exécuter le check, ceci afin d'éviter que le check Directory échoue et que la traceback se termine par l'erreur `found unknown escape character in "<chaîne>"` signalant un problème de caractère d'échappement inconnu.

2. [Redémarrez l'Agent][5].

#### Collecte de métriques
Le check Directory peut potentiellement générer des [métriques custom][6], ce qui peut avoir une incidence sur votre [facture][7].

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `directory` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "directory" >}}


### Événements
Le check Directory n'inclut aucun événement.

### Checks de service
Le check Directory n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/directory/datadog_checks/directory/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics
[7]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/directory/metadata.csv
[10]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}