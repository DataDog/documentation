---
aliases:
- /fr/integrations/memcached
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    memcached: assets/dashboards/memcached_dashboard.json
    memcached_screenboard: assets/dashboards/memcached_screenboard.json
  logs:
    source: memcached
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    memcached_processes: assets/saved_views/memcached_processes.json
  service_checks: assets/service_checks.json
categories:
- web
- caching
- autodiscovery
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mcache/README.md
display_name: Memcached
draft: false
git_integration_title: mcache
guid: b1c4033c-bf96-4456-be63-e74ff171f991
integration_id: memcached
integration_title: Memcache
integration_version: 3.2.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: memcache.
metric_to_check: memcache.uptime
name: mcache
process_signatures:
- memcached
public_title: Intégration Datadog/Memcache
short_description: Surveillez l'utilisation de la mémoire, les hits, les miss, les
  expulsions, le pourcentage de remplissage, et plus encore.
support: core
supported_os:
- linux
- mac_os
---



## Présentation

Le check Memcache de l'Agent vous permet de surveiller l'utilisation de la mémoire, les hits, les miss, les expulsions, le pourcentage de remplissage et d'autres métriques pour Memcache.

## Configuration

### Installation

Le check Memcache est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs Memcache.

### Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour la configuration dans un environnement conteneurisé.

#### Collecte de métriques

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `mcache.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple mcache.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## url used to connect to the Memcached instance.
     #
     - url: localhost
   ```

2. [Redémarrez l'Agent][3] pour commencer à envoyer vos métriques Memcache à Datadog.

##### Collecte de traces

L'APM Datadog s'intègre à Memcache pour vous permettre de visualiser les traces sur l'ensemble de votre système distribué. La collecte de traces est activée par défaut dans les versions 6 et ultérieures de l'Agent Datadog. Pour commencer à recueillir des traces :

1. [Activez la collecte de traces dans Datadog][4].
2. [Instrumentez l'application qui envoie des requêtes à Memcache][5].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/tracing/send_traces/
[5]: https://docs.datadoghq.com/fr/tracing/setup/
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                 |
| -------------------- | ------------------------------------- |
| `<NOM_INTÉGRATION>` | `mcache`                              |
| `<CONFIG_INIT>`      | vide ou `{}`                         |
| `<CONFIG_INSTANCE>`  | `{"url": "%%host%%","port": "11211"}` |

##### Collecte de traces

L'APM dédié aux applications conteneurisées est pris en charge par les hosts exécutant les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consultez les sections relatives au [tracing d'applications Kubernetes][2] et à la [configuration de DaemonSet Kubernetes][3] pour consulter la liste complète des variables d'environnement et configurations disponibles.

Ensuite, [instrumentez votre conteneur d'application][4] et définissez `DD_AGENT_HOST` sur le nom du conteneur de votre Agent.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. Ajoutez ce bloc de configuration à votre fichier `mcache.d/conf.yaml` pour commencer à recueillir vos logs Memcached :

   ```yaml
   logs:
     - type: file
       path: /var/log/memcached.log
       source: memcached
       service: mcache
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

2. [Redémarrer l'Agent][5] pour appliquer ces changements.

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=java
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[4]: https://docs.datadoghq.com/fr/tracing/setup/
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### Validation

Lancez la |sous-commande `status` de l'Agent][2] et cherchez `mcache` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "mcache" >}}


Le check recueille uniquement les métriques `memcache.slabs.*` si vous définissez `options.slabs: true` dans le fichier `mcache.d/conf.yaml`. De même, il ne recueille les métriques `memcache.items.*` que si vous définissez `options.items: true`.

### Événements

Le check Mcache n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "mcache" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

## Pour aller plus loin

- [Améliorer la vitesse de vos applications Web en surveillant Memcached][4]
- [Instrumenter les métriques de performance Memcached avec DogStatsD][5]
- [Surveiller les métriques de performance ElastiCache avec Redis ou Memcached][6]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://www.datadoghq.com/blog/speed-up-web-applications-memcached
[5]: https://www.datadoghq.com/blog/instrument-memcached-performance-metrics-dogstatsd
[6]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached