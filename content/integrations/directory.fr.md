---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/directory/
git_integration_title: directory
guid: 0c38c4ef-5266-4667-9fb1-de8f2b73708a
has_logo: true
integration_title: Directory
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: directory
public_title: Intégration Datadog-Directory
short_description: L'intégration Directory aide à monitorer et à reporter des métriques
  on files for a provided directory.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.2.0
---

## Aperçu

Collectez des métriques à partir des répertoires et des fichiers de votre choix. L'agent collectera:

  * Nombre de fichiers
  * Taille des fichiers
  * La date de la dernière modification
  * La date de la création

## Implémentation
### Installation

Le check directory est packagé avec l'agent, il vous faut donc simplement [installer l'agent] [1] sur vos noeuds Cassandra.

### Configuration

1. Editez le fichier `directory.yaml` dans le dossier `conf.d` de l'Agent. Consultez l'exemple du [canevas  directory.yaml][2] pour apprendre toutes les options de configuration disponibles:

```
init_config:

instances:
  - directory: "/path/to/directory" # the only required option
    name: "my_monitored_dir"        # What the Agent will tag this directory's metrics with. Defaults to "directory"
    pattern: "*.log"                # defaults to "*" (all files)
    recursive: True                 # default False
    countonly: False                # set to True to only collect the number of files matching 'pattern'. Useful for very large directories.
    ignore_missing: False           # set to True to not raise exceptions on missing or inaccessible directories
```

Assurez-vous que l'utilisateur exécutant le processus de Agent (généralement `dd-agent`) ait un accès en lecture aux répertoires, sous-répertoires et fichiers que vous configurez.

2. [Redémarrez l'Agent][3].

### Validation

[Lancez la commande `status`de l'Agent][4] et cherchez `directory` dans la section Checks:

```
  Checks
  ======
    [...]

    directory
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibilité

Le check Directory est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "directory" >}}

### Evénements
Le check Directory n'inclut aucun événement pour le moment.

### Checks de Service
Le check Directory n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][5].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][6]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/directory/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[5]: http://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/
