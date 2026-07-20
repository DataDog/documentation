---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Red Hat Gluster Storage: assets/dashboards/red_hat_gluster_storage.json
  logs:
    source: glusterfs
  metrics_metadata: metadata.csv
  monitors:
    brick status: assets/monitors/brick_status.json
  saved_views:
    glusterfs_processes: assets/saved_views/glusterfs_processes.json
  service_checks: assets/service_checks.json
categories:
- data store
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/glusterfs/README.md
display_name: GlusterFS
draft: false
git_integration_title: glusterfs
guid: 1cb9a21c-8cc4-4727-a4b1-ab7015c7ae24
integration_id: glusterfs
integration_title: Red Hat Gluster Storage
integration_version: 1.5.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: glusterfs.
metric_to_check: glusterfs.cluster.nodes.count
name: GlusterFS
process_signatures:
- glusterd
- gluster
public_title: Red Hat Gluster Storage
short_description: Surveillez les métriques GlusterFS concernant les nœuds du cluster,
  le volume et le statut des briques.
support: core
supported_os:
- linux
---



## Présentation

Ce check permet de surveiller la santé du cluster, le volume et le statut des briques de [Red Hat Gluster Storage][1] avec l'Agent Datadog.
Cette intégration GlusterFS est compatible avec les versions de GlusterFS open source ou issues de vendoring.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Le check GlusterFS est inclus avec le package de l'[Agent Datadog][3]. Vous n'avez rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `glusterfs.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance GlusterFS. Consultez le [fichier d'exemple glusterfs.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

    ## @param gstatus_path - string - optional - default: /opt/datadog-agent/embedded/sbin/gstatus
    ## Path to the gstatus command.
    ##
    ## A version of the gstatus is shipped with the Agent binary.
    ## If you are using a source install, specify the location of gstatus.
    #
    # gstatus_path: /opt/datadog-agent/embedded/sbin/gstatus

    instances:
      -
        ## @param min_collection_interval - number - optional - default: 60
        ## The GlusterFS integration collects cluster-wide metrics which can put additional workload on the server.
        ## Increase the collection interval to reduce the frequency.
        ##
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        #
        min_collection_interval: 60
   ```

   **REMARQUE** : par défaut, [`gstatus`][5] appelle la commande `gluster` en interne, ce qui nécessite une exécution en tant que superuser. Ajoutez une ligne semblable à ce qui suit dans votre fichier `sudoers` :

   ```text
    dd-agent ALL=(ALL) NOPASSWD:/path/to/your/gstatus
   ```

   Si votre environnement GlusterFS ne nécessite pas de root, définissez l'option de configuration `use_sudo` sur `false`.

2. [Redémarrez l'Agent][6].

#### Collecte de logs


1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Modifiez ce bloc de configuration dans votre fichier `glusterfs.d/conf.yaml` pour commencer à recueillir vos logs GlusterFS :

    ```yaml
    logs:
      - type: file
        path: /var/log/glusterfs/glusterd.log
        source: glusterfs
      - type: file
        path: /var/log/glusterfs/cli.log
        source: glusterfs
    ```

  Modifiez la valeur du paramètre `path` en fonction de votre environnement. Consultez le [fichier d'exemple conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

  3. [Redémarrez l'Agent][6].

Pour découvrir comment configurer l'Agent afin de recueillir des logs dans des environnements Kubernetes, consultez la section [Collecte de logs Kubernetes][7].

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `glusterfs` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "glusterfs" >}}


### Événements

GlusterFS n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "glusterfs" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].


[1]: https://www.redhat.com/en/technologies/storage/gluster
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/datadog_checks/glusterfs/data/conf.yaml.example
[5]: https://github.com/gluster/gstatus#install
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/glusterfs/assets/service_checks.json
[11]: https://docs.datadoghq.com/fr/help/