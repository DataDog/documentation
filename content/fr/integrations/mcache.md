---
aliases:
  - /fr/integrations/memcached
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - caching
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/mcache/README.md'
display_name: Memcached
git_integration_title: mcache
guid: b1c4033c-bf96-4456-be63-e74ff171f991
integration_id: memcached
integration_title: Memcache
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: memcache.
metric_to_check: memcache.uptime
name: mcache
process_signatures:
  - memcached
public_title: Intégration Datadog/Memcache
short_description: 'Surveillez l''utilisation de la mémoire, les hits, les miss, les expulsions, le pourcentage de remplissage, et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
---
## Présentation

Le check Memcache de l'Agent vous permet de surveiller l'utilisation de la mémoire, les hits, les miss, les expulsions, le pourcentage de remplissage et d'autres métriques pour Memcache.

## Implémentation
### Installation

Le check Memcache est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Memcache.

### Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

#### Host

1. Modifiez le fichier `mcache.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].
  Consultez le [fichier d'exemple mcache.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

    ```yaml
      init_config:

      instances:
        ## @param url - string - required
        ## url used to connect to the Memcached instance.
        #
        - url: localhost
    ```

2. [Redémarrez l'Agent][5] pour commencer à envoyer vos métriques Memcache à Datadog.

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                 |
|----------------------|---------------------------------------|
| `<NOM_INTÉGRATION>` | `mcache`                              |
| `<CONFIG_INIT>`      | vide ou `{}`                         |
| `<CONFIG_INSTANCE>`  | `{"url": "%%host%%","port": "11211"}` |

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `mcache` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "mcache" >}}


Le check recueille uniquement les métriques `memcache.slabs.*` si vous définissez `options.slabs: true` dans le fichier `mcache.d/conf.yaml`. De même, il ne recueille les métriques `memcache.items.*` que si vous définissez `options.items: true`.


### Événements
Le check Mcache n'inclut aucun événement.

### Checks de service

`memcache.can_connect` :

Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à Memcache pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

* [Améliorer la vitesse de vos applications Web en surveillant Memcached][9]
* [Instrumenter les métriques de performance Memcached avec DogStatsD][10]
* [Surveiller les métriques de performance ElastiCache avec Redis ou Memcached][11]  


[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/mcache/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://www.datadoghq.com/blog/speed-up-web-applications-memcached
[10]: https://www.datadoghq.com/blog/instrument-memcached-performance-metrics-dogstatsd
[11]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached


{{< get-dependencies >}}