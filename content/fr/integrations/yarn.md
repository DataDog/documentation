---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    hadoop: assets/dashboards/hadoop_dashboard.json
    yarn: assets/dashboards/yarn_dashboard.json
  logs:
    source: yarn
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
- https://github.com/DataDog/integrations-core/blob/master/yarn/README.md
display_name: Yarn
draft: false
git_integration_title: yarn
guid: 3223c2e3-29dd-4cfb-82a2-51b951c648eb
integration_id: yarn
integration_title: Yarn
integration_version: 4.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: yarn.
metric_to_check: yarn.metrics.total_mb
name: yarn
public_title: Intégration Datadog/Yarn
short_description: Recueillez des métriques de santé à l'échelle du cluster et surveillez
  la progression de l'application.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Hadoop Yarn][1]

## Présentation

Ce check recueille des métriques à partir de votre YARN ResourceManager, notamment (sans s'y limiter) :

- Des métriques propres à votre cluster, comme le nombre d'applications lancées, les conteneurs exécutés, les nœuds qui ne sont pas sains, etc.
- Des métriques propres à une application, comme l'avancement de l'application, le temps d'exécution écoulé, les conteneurs exécutés, la mémoire utilisée, etc.
- Des métriques propres à vos nœuds, comme les vCores disponibles, la date de dernière vérification de l'état de santé, etc.

### Métriques obsolètes

Les métriques `yarn.apps.<MÉTRIQUE>` ne sont plus utilisées et ont été remplacées par les métriques `yarn.apps.<MÉTRIQUE>_gauge`. En effet, les métriques `yarn.apps` étaient envoyées en tant que `RATE`, et non en tant que `GAUGE`.

## Configuration

### Installation

Le check YARN est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre YARN ResourceManager.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `yarn.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1].

   ```yaml
   init_config:

   instances:
     ## @param resourcemanager_uri - string - required
     ## The YARN check retrieves metrics from YARNS's ResourceManager. This
     ## check must be run from the Master Node and the ResourceManager URI must
     ## be specified below. The ResourceManager URI is composed of the
     ## ResourceManager's hostname and port.
     ## The ResourceManager hostname can be found in the yarn-site.xml conf file
     ## under the property yarn.resourcemanager.address
     ##
     ## The ResourceManager port can be found in the yarn-site.xml conf file under
     ## the property yarn.resourcemanager.webapp.address
     #
     - resourcemanager_uri: http://localhost:8088

       ## @param cluster_name - string - required - default: default_cluster
       ## A friendly name for the cluster.
       #
       cluster_name: default_cluster
   ```

    Consultez [un exemple de configuration du check][2] pour découvrir la liste complète des options du check, ainsi que leur description.

2. [Redémarrez l'Agent][3] pour commencer à envoyer des métriques YARN à Datadog.

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `yarn`                                                                                  |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                           |
| `<CONFIG_INSTANCE>`  | `{"resourcemanager_uri": "http://%%host%%:%%port%%", "cluster_name": "<NOM_CLUSTER>"}` |

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Supprimez la mise en commentaire du bloc de configuration des logs du fichier `yarn.d/conf.yaml` et modifiez les paramètres. Modifiez les valeurs des paramètres `type`, `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple yarn.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    logs:
      - type: file
        path: <LOG_FILE_PATH>
        source: yarn
        service: <SERVICE_NAME>
        # To handle multi line that starts with yyyy-mm-dd use the following pattern
        # log_processing_rules:
        #   - type: multi_line
        #     pattern: \d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}
        #     name: new_log_start_with_date
    ```

3. [Redémarrez l'Agent][3].

Pour activer les logs pour les environnements Docker, consultez la section [Collecte de logs avec Docker][4].

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

Lancez la [sous-commande status de l'Agent][3] et cherchez `yarn` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "yarn" >}}


### Événements

Le check Yarn n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "yarn" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

- [Vue d'ensemble de l'architecture Hadoop][5]
- [Comment surveiller des métriques Hadoop][6]
- [Comment recueillir des métriques Hadoop][7]
- [Comment surveiller Hadoop avec Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/yarn/images/yarn_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[6]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[7]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[8]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog