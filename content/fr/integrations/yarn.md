---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/yarn/README.md'
display_name: Yarn
git_integration_title: yarn
guid: 3223c2e3-29dd-4cfb-82a2-51b951c648eb
integration_id: yarn
integration_title: Yarn
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: yarn.
metric_to_check: yarn.metrics.total_mb
name: yarn
public_title: Intégration Datadog/Yarn
short_description: Recueillez des métriques de santé à l'échelle du cluster et surveillez la progression de l'application.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Hadoop Yarn][1]

## Présentation

Ce check recueille des métriques à partir de votre YARN ResourceManager, notamment (sans s'y limiter) :

* Des métriques propres à votre cluster (p. ex. le nombre d'applications lancées, les conteneurs exécutés, les nœuds qui ne sont pas sains, etc.)
* Des métriques propres à une application (p. ex. l'avancement de l'application, le temps d'exécution écoulé, les conteneurs exécutés, la mémoire utilisée, etc.)
* Des métriques propres à vos nœuds (p. ex. les vCores disponibles, la date de dernière vérification de l'état de santé, etc.)

### Métriques obsolètes
Les métriques `yarn.apps.<MÉTRIQUE>` ont été supprimées et remplacées par les métriques `yarn.apps.<MÉTRIQUE>_gauge`, car les métriques `yarn.apps` sont incorrectement envoyées comme `RATE` et non comme `GAUGE`.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check YARN est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur votre YARN ResourceManager.

### Configuration

1. Modifiez le fichier `yarn.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4].

    ```yaml
        init_config:

        instances:
          - resourcemanager_uri: http://localhost:8088 # or whatever your resource manager listens
            cluster_name: MyCluster # used to tag metrics, i.e. 'cluster_name:MyCluster'; default is 'default_cluster'
            collect_app_metrics: true
    ```

    Consultez [un exemple de configuration du check][5] pour découvrir la liste complète des options du check, ainsi que leur description.

2. [Redémarrez l'Agent][6] pour commencer à envoyer des métriques YARN à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `yarn` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "yarn" >}}


### Événements
Le check Yarn n'inclut aucun événement.

### Checks de service
**yarn.can_connect** :

Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'URI ResourceManager pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

* [Vue d'ensemble de l'architecture Hadoop][10]
* [Comment surveiller des métriques Hadoop][11]
* [Comment recueillir des métriques Hadoop][12]
* [Comment surveiller Hadoop avec Datadog][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/yarn/images/yarn_dashboard.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/yarn/metadata.csv
[9]: https://docs.datadoghq.com/fr/help
[10]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[11]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[12]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[13]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog


{{< get-dependencies >}}