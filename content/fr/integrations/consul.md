---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: consul
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - orchestration
  - configuration & deployment
  - notification
  - log collection
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/consul/README.md'
display_name: Consul
git_integration_title: consul
guid: ec1e9fac-a339-49a3-b501-60656d2a5671
integration_id: consul
integration_title: Consul
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: consul.
metric_to_check: consul.peers
name: consul
process_signatures:
  - consul agent
  - consul_agent
  - consul-agent
public_title: Intégration Datadog/Consul
short_description: 'Recevez des alertes en fonction des checks de santé Consul, visualisez les mappages entre services et nœuds, et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard Consul][1]

## Présentation

L'Agent Datadog recueille de nombreuses métriques sur les nœuds Consul, notamment pour :

- Le nombre total de pairs Consul
- La santé des services : le nombre de nœuds avec le statut Up, Passing, Warning ou Critical d'un service donné
- La santé des nœuds : le nombre de services avec le statut Up, Passing, Warning ou Critical d'un nœud donné
- Les coordonnées réseau : latences entre les centres de données et au sein de ces derniers

L'Agent _Consul_ peut fournir davantage de métriques via DogStatsD. Ces métriques sont davantage orientées sur la santé interne de Consul, et non sur celle des services qui dépendent de Consul. Elles concernent :

- Les événements Serf et les bagottements de membre
- Le protocole Raft
- Les performances DNS

Et bien plus encore.

Enfin, en plus des métriques, l'Agent Datadog envoie également un check de service pour chaque check de santé de Consul, ainsi qu'un événement après chaque nouvelle élection de leader.

## Configuration

### Installation

Le check Consul de l'Agent Datadog est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Consul.

### Configuration

{{< tabs >}}
{{< tab "Host" >}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `consul.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos métriques de performance Consul. Consultez le [fichier d'exemple consul.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Where your Consul HTTP Server Lives
     ## Point the URL at the leader to get metrics about your Consul Cluster.
     ## Remind to use https instead of http if your Consul setup is configured to do so.
     #
     - url: http://localhost:8500
   ```

2. [Redémarrez l'Agent][3].

Rechargez l'Agent Consul pour commencer à envoyer davantage de métriques Consul à DogStatsD.

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` avec :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `consul.yaml` pour commencer à recueillir vos logs Consul :

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
{{< /tab >}}
{{< tab "Environnement conteneurisé" >}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                              |
| -------------------- | ---------------------------------- |
| `<NOM_INTÉGRATION>` | `consul`                           |
| `<CONFIG_INIT>`      | vide ou `{}`                      |
| `<CONFIG_INSTANCE>`  | `{"url": "https://%%host%%:8500"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                               |
| -------------- | --------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "consul", "service": "<NOM_SERVICE>"}` |

#### DogStatsD

Si vous le souhaitez, vous pouvez configurer Consul de façon à ce qu'il envoie les données à l'Agent via [DogStatsD][3] au lieu de demander à l'Agent de récupérer les données auprès de Consul. 

1. Pour configurer Consul de façon à ce qu'il envoie des métriques DogStatsD, ajoutez votre `dogstatsd_addr` imbriqué sous la clé `telemetry` de premier niveau dans le fichier de configuration principal de Consul :

    ```conf
    {
      ...
      "telemetry": {
        "dogstatsd_addr": "127.0.0.1:8125"
      },
      ...
    }
    ```

2. Pour veiller à ce que les métriques soient correctement taguées, modifiez le [fichier de configuration principal de l'Agent Datadog][4] `datadog.yaml` en y ajoutant les paramètres suivants :

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
             http_method: "$1"
             path: "$2"
         - match: 'consul\.raft\.replication\.appendEntries\.logs\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.logs"
           tags:
             consul_node_id: "$1"
         - match: 'consul\.raft\.replication\.appendEntries\.rpc\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.rpc"
           tags:
             consul_node_id: "$1"
         - match: 'consul\.raft\.replication\.heartbeat\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.heartbeat"
           tags:
             consul_node_id: "$1"
   ```

3. [Redémarrez l'Agent][5].

#### OpenMetrics

Au lieu d'utiliser DogStatsD, vous pouvez activer l'option de configuration `use_prometheus_endpoint` pour obtenir les mêmes métriques à partir de l'endpoint Prometheus.


**Remarque** : utilisez soit la méthode DogStatsD, soit la méthode Prometheus. N'activez pas les deux pour la même instance.

1. Configurez Consul de façon à ce qu'il expose des métriques à l'endpoint Prometheus. Définissez le paramètre [`prometheus_retention_time`][6] imbriqué sous la clé `telemetry` de premier niveau dans le fichier de configuration principal de Consul :

    ```conf
    {
      ...
      "telemetry": {
        "prometheus_retention_time": "360h"
      },
      ...
    }
    ```

2. Pour commencer à utiliser l'endpoint Prometheus, modifiez le fichier `consul.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7].
    ```yaml
    instances:
        - url: <EXAMPLE>
          use_prometheus_endpoint: true
    ```

3. [Redémarrez l'Agent][5].

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[3]: https://docs.datadoghq.com/fr/developers/dogstatsd/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://www.consul.io/docs/agent/options#telemetry-prometheus_retention_time
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
{{< /tab >}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `consul` dans la section Checks.

**Remarque** : si la journalisation de debugging est activée sur vos nœuds Consul, l'interrogation habituelle de l'Agent Datadog s'affichera dans le log Consul :

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

**consul.check** :<br>
L'Agent Datadog envoie un check de service pour chaque check de santé de Consul, et lui attribue les tags :

- `service:<nom>` si Consul transmet un `ServiceName`
- `consul_service_id:<id>` si Consul transmet un `ServiceID`

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

- [Surveiller la santé et les performances de Consul avec Datadog][7]
- [Utilisation de Consul chez Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/consul/images/consul-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.consul.io/docs/agent/telemetry.html
[5]: https://www.consul.io/docs/internals/coordinates.html
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
[8]: https://engineering.datadoghq.com/consul-at-datadog