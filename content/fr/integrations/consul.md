---
app_id: consul
app_uuid: d0b52e9d-6594-4ff5-9b66-800943f75756
assets:
  dashboards:
    consul: assets/dashboards/consul_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: consul.peers
      metadata_path: metadata.csv
      prefix: consul.
    process_signatures:
    - consul agent
    - consul_agent
    - consul-agent
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Consul
  logs:
    source: consul
  saved_views:
    consul_processes: assets/saved_views/consul_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- containers
- log collection
- network
- notification
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/consul/README.md
display_on_public_website: true
draft: false
git_integration_title: consul
integration_id: consul
integration_title: Consul
integration_version: 2.2.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: consul
public_title: Consul
short_description: Recevez des alertes en fonction des checks de santé Consul, visualisez
  les mappages entre services et nœuds, et plus encore.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Log Collection
  - Category::Network
  - Category::Notification
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Recevez des alertes en fonction des checks de santé Consul, visualisez
    les mappages entre services et nœuds, et plus encore.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Consul
---



![Dashboard Consul][1]

## Présentation

L'Agent Datadog recueille de nombreuses métriques sur les nœuds Consul, notamment pour :

- Le nombre total de pairs Consul
- La santé des services : le nombre de nœuds avec le statut Up, Passing, Warning ou Critical d'un service donné
- La santé des nœuds : le nombre de services avec le statut Up, Passing, Warning ou Critical d'un nœud donné
- Des coordonnées réseau : latences entre les centres de données et au sein de ces derniers

L'Agent _Consul_ peut fournir davantage de métriques par l'intermédiaire de DogStatsD. Ces métriques sont davantage orientées sur la santé interne de Consul, et non sur celle des services qui dépendent de Consul. Elles concernent :

- Les événements Serf et les bagotements de membre
- Le protocole Raft
- Les performances DNS

Et bien plus encore.

Enfin, en plus des métriques, l'Agent Datadog envoie également un check de service pour chaque check de santé de Consul, ainsi qu'un événement après chaque nouvelle élection de leader.

## Implémentation

### Installation

Le check Consul de l'Agent Datadog est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Consul.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `consul.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos métriques de performance Consul. Consultez le [fichier d'exemple consul.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Where your Consul HTTP server lives,
     ## point the URL at the leader to get metrics about your Consul cluster.
     ## Use HTTPS instead of HTTP if your Consul setup is configured to do so.
     #
     - url: http://localhost:8500
   ```

2. [Redémarrez l'Agent][3].

###### OpenMetrics

Vous avez également la possibilité d'activer l'option de configuration `use_prometheus_endpoint` pour obtenir des métriques supplémentaires à partir de l'endpoint Prometheus de Consul.

**Remarque** : utilisez DogStatsD ou Prometheus, mais n'activez pas les deux pour la même instance.

1. Configurez Consul de façon à exposer des métriques sur l'endpoint Prometheus. Définissez le paramètre [`prometheus_retention_time`][4] imbriqué sous la clé `telemetry` de premier niveau dans le fichier de configuration principal de Consul :

    ```conf
    {
      ...
      "telemetry": {
        "prometheus_retention_time": "360h"
      },
      ...
    }
    ```

2. Modifiez le fichier `consul.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à utiliser l'endpoint Prometheus.
    ```yaml
    instances:
        - url: <EXAMPLE>
          use_prometheus_endpoint: true
    ```

3. [Redémarrez l'Agent][3].

##### DogStatsD

Au lieu d'utiliser l'endpoint Prometheus, il est possible de configurer Consul de façon à envoyer les mêmes métriques supplémentaires à l'Agent par l'intermédiaire de [DogStatsD][5].

1. Pour y parvenir, ajoutez votre `dogstatsd_addr` imbriqué sous la clé `telemetry` de premier niveau dans le fichier de configuration principal de Consul :

    ```conf
    {
      ...
      "telemetry": {
        "dogstatsd_addr": "127.0.0.1:8125"
      },
      ...
    }
    ```

2. Pour veiller à ce que les métriques soient correctement taguées, modifiez le [fichier de configuration principal de l'Agent Datadog][6] `datadog.yaml` en y ajoutant les paramètres suivants :

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: consul
       prefix: "consul."
       mappings:
         - match: 'consul\.http\.([a-zA-Z]+)\.(.*)'
           match_type: "regex"
           name: "consul.http.request"
           tags:
             method: "$1"
             path: "$2"
         - match: 'consul\.raft\.replication\.appendEntries\.logs\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.logs"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.appendEntries\.rpc\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.rpc"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.heartbeat\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.heartbeat"
           tags:
             peer_id: "$1"
   ```

3. [Redémarrez l'Agent][3].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` avec :

   ```yaml
   logs_enabled: true
   ```

2. Modifiez ce bloc de configuration dans votre fichier `consul.yaml` pour recueillir vos logs Consul :

   ```yaml
   logs:
     - type: file
       path: /var/log/consul_server.log
       source: consul
       service: myservice
   ```

   Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
   Consultez le [fichier d'exemple consul.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://www.consul.io/docs/agent/options#telemetry-prometheus_retention_time
[5]: https://docs.datadoghq.com/fr/developers/dogstatsd/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                              |
| -------------------- | ---------------------------------- |
| `<NOM_INTÉGRATION>` | `consul`                           |
| `<CONFIG_INIT>`      | vide ou `{}`                      |
| `<CONFIG_INSTANCE>`  | `{"url": "https://%%host%%:8500"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                               |
| -------------- | --------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "consul", "service": "<NOM_SERVICE>"}` |


[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `consul` dans la section Checks.

**Remarque** : si la journalisation de debugging est activée sur vos nœuds Consul, les opérations d'interrogation habituelles de l'Agent Datadog s'affichent dans le log Consul :

```text
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/leader (59.344us) from=127.0.0.1:53768
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/peers (62.678us) from=127.0.0.1:53770
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/state/any (106.725us) from=127.0.0.1:53772
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/catalog/services (79.657us) from=127.0.0.1:53774
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/service/consul (153.917us) from=127.0.0.1:53776
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/datacenters (71.778us) from=127.0.0.1:53778
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/nodes (84.95us) from=127.0.0.1:53780
```

#### De l'Agent Consul à DogStatsD

Utilisez `netstat` pour vérifier que Consul envoie également ses métriques :

```shell
$ sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp        0      0 127.0.0.1:53874         127.0.0.1:8125          ESTABLISHED 23176/consul
```

## Données collectées

### Métriques
{{< get-metrics-from-git "consul" >}}


Consultez la [documentation de Consul relative à la télémétrie][4] pour obtenir la description des métriques envoyées par l'agent Consul à DogStatsD.

Consultez la [documentation de Consul relative aux coordonnées réseau][5] pour découvrir comment les métriques de latence réseau sont calculées.

### Événements

**consul.new_leader** :<br>
L'Agent Datadog génère un événement lorsque le cluster Consul élit un nouveau leader, et lui attribue les tags `prev_consul_leader`, `curr_consul_leader` et `consul_datacenter`.

### Checks de service
{{< get-service-checks-from-git "consul" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveillance de HCP Consul avec Datadog][7]
- [Surveiller la santé et les performances de Consul avec Datadog][8]
- [Utilisation de Consul chez Datadog][9]
- [Métriques clés pour la surveillance Consul][10]
- [Outils de surveillance de Consul][11]
- [Comment surveiller Consul avec Datadog][12]
- [Nouvelle prise en charge de la mise en réseau Consul par la solution NPM Datadog][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/consul/images/consul-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.consul.io/docs/agent/telemetry.html
[5]: https://www.consul.io/docs/internals/coordinates.html
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://docs.datadoghq.com/fr/integrations/guide/hcp-consul
[8]: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
[9]: https://engineering.datadoghq.com/consul-at-datadog
[10]: https://www.datadoghq.com/blog/consul-metrics/
[11]: https://www.datadoghq.com/blog/consul-monitoring-tools/
[12]: https://www.datadoghq.com/blog/consul-datadog/
[13]: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/