---
categories:
  - containers
  - orchestration
  - configuration & deployment
  - notification
  - log collection
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
short_description: 'Envoyez des alertes sur les checks de santé Consul, visualisez les mappages entre services et nœuds, et plus encore. much more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard Consul][1]

## Présentation

L'Agent Datadog recueille de nombreuses métriques sur les nœuds Consul, notamment pour :

* Le nombre total de pairs Consul
* La santé des services : le nombre de nœuds avec le statut Up, Passing, Warning ou Critical d'un service donné
* La santé des nœuds : le nombre de services avec le statut Up, Passing, Warning ou Critical d'un nœud donné
* Les coordonnées de réseau : latences entre les centres de données et au sein de ces derniers

L'Agent _Consul_ peut fournir davantage de métriques via DogStatsD. Ces métriques sont davantage orientées sur la santé interne de Consul, et non sur celle des services qui dépendent de Consul. Elles concernent :

* Les événements Serf et les bagottements de membre
* Le protocole Raft
* Les performances DNS

Et bien plus encore

Enfin, en plus des métriques, l'Agent Datadog envoie également un check de service pour chaque check de santé de Consul, ainsi qu'un événement après chaque nouvelle élection de leader.

## Implémentation
### Installation

Le check Consul de l'Agent Datadog est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Consul.

### Configuration

Modifiez le fichier `consul.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) Consul.
Consultez le [fichier d'exemple consul.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques

1. Ajoutez ce bloc de configuration à votre fichier `consul.d/conf.yaml` pour commencer à recueillir vos [métriques Consul](#metriques) :

    ```yaml
    init_config:

    instances:
        # where the Consul HTTP Server Lives
        # use 'https' if Consul is configured for SSL
        - url: http://localhost:8500
          # again, if Consul is talking SSL
          # client_cert_file: '/path/to/client.concatenated.pem'

          # submit per-service node status and per-node service status?
          catalog_checks: true

          # emit leader election events
          self_leader_check: true

          network_latency_checks: true
    ```

    Consultez le [fichier d'exemple consul.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5] pour commencer à envoyer des métriques Consul à Datadog.

#### Associer l'Agent Consul à DogStatsD

Dans le principal fichier de configuration de Consul, ajoutez votre `dogstatsd_addr` imbriqué sous la clé `telemetry` de premier niveau :

```
{
  ...
  "telemetry": {
    "dogstatsd_addr": "127.0.0.1:8125"
  },
  ...
}
```

Rechargez l'Agent Consul pour commencer à envoyer davantage de métriques Consul à DogStatsD.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

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
   Consultez le [fichier d'exemple consul.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][5].

**Pour en savoir plus sur la collecte de logs, consultez [la documentation relative aux logs][6].**

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `consul` dans la section Checks.

**Remarque** : si la journalisation de debugging est activée sur vos nœuds Consul, l'interrogation habituelle de l'Agent Datadog s'affichera dans le log Consul :

```
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


Consultez la [documentation relative à la télémétrie de Consul][8] (en anglais) pour obtenir la description des métriques envoyées par l'Agent Consul à DogStatsD.

Consultez la [documentation relative aux coordonnées réseau de Consul][9] (en anglais) pour découvrir comment les métriques de latence réseau sont calculées.

### Événements

`consul.new_leader` :

L'Agent Datadog génère un événement lorsque le cluster Consul élit un nouveau leader, et lui attribue les tags `prev_consul_leader`, `curr_consul_leader` et `consul_datacenter`.

### Checks de service

`consul.check` :

L'Agent Datadog envoie un check de service pour chaque check de santé de Consul, et leur attribue les tags :

* `service:<nom>`, si Consul transmet un `ServiceName`
* `consul_service_id:<id>`, si Consul transmet un `ServiceID`

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin

* [Surveiller la santé et les performances de Consul avec Datadog][11]
* [Utilisation de Consul chez Datadog][12]




{{< get-dependencies >}}
[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/consul/images/consul-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/logs
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://www.consul.io/docs/agent/telemetry.html
[9]: https://www.consul.io/docs/internals/coordinates.html
[10]: https://docs.datadoghq.com/fr/help
[11]: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
[12]: https://engineering.datadoghq.com/consul-at-datadog
