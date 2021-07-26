---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    mapreduce: assets/dashboards/mapreduce_dashboard.json
  logs:
    source: mapreduce
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/mapreduce/README.md'
display_name: MapReduce
draft: false
git_integration_title: mapreduce
guid: 1c143492-84ac-42d2-89d5-a45c718092b0
integration_id: mapreduce
integration_title: Map Reduce
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mapreduce.
metric_to_check: mapreduce.job.elapsed_time.max
name: mapreduce
public_title: Intégration Datadog/MapReduce
short_description: Surveillez le statut et la durée de vos tâches MapReduce.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard MapReduce][1]

## Présentation

Recueillez des métriques du service MapReduce en temps réel pour :

- Visualiser et surveiller les statuts de MapReduce
- Être informé des failovers et des événements de MapReduce

## Configuration

### Installation

Le check MapReduce est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `mapreduce.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] afin de spécifier votre serveur et votre port et de définir les masters à surveiller. Consultez le [fichier d'exemple mapreduce.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `mapreduce`                                                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                 |
| `<CONFIG_INSTANCE>`  | `{"resourcemanager_uri": "https://%%host%%:8088", "cluster_name":"<NOM_CLUSTER_MAPREDUCE>"}` |

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Supprimez la mise en commentaire du bloc de configuration des logs du fichier `mapreduce.d/conf.yaml` et modifiez les paramètres. Modifiez les valeurs des paramètres `type`, `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple mapreduce.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    logs:
      - type: file
        path: <LOG_FILE_PATH>
        source: mapreduce
        service: <SERVICE_NAME>
        # To handle multi line that starts with yyyy-mm-dd use the following pattern
        # log_processing_rules:
        #   - type: multi_line
        #     pattern: \d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}
        #     name: new_log_start_with_date
    ```

3. [Redémarrez l'Agent][3].

Consultez la [documentation de Datadog][4] pour découvrir comment configurer l'Agent afin de recueillir les logs dans un environnement Docker.

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `mapreduce` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "mapreduce" >}}


### Événements

Le check Mapreduce n'inclut aucun événement.

### Checks de service

**mapreduce.resource_manager.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter au Resource Manager.
Si ce n'est pas le cas, renvoie `OK`.

**mapreduce.application_master.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'Application Master.
Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

- [Vue d'ensemble de l'architecture Hadoop][5]
- [Comment surveiller des métriques Hadoop][6]
- [Comment recueillir des métriques Hadoop][7]
- [Comment surveiller Hadoop avec Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mapreduce/images/mapreduce_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[6]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[7]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[8]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog