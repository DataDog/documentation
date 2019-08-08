---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/statsd/README.md'
display_name: StatsD
git_integration_title: statsd
guid: 4830acf3-626b-42ff-a1db-3f37babd0ae6
integration_id: statsd
integration_title: StatsD
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: statsd.
metric_to_check: statsd.counters.count
name: statsd
public_title: Intégration Datadog/StatsD
short_description: Surveillez la disponibilité des serveurs StatsD et suivez le nombre de métriques.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille la disponibilité et l'uptime des serveurs StatsD hors Datadog. Il permet également de suivre le nombre de métriques, par type de métrique, reçues par StatsD.

Ce check ne transfère **PAS** les métriques d'application des serveurs StatsD vers Datadog. Il recueille les métriques concernant StatsD même.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][10] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check StatsD est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur les serveurs qui exécutent StatsD.

### Créez un fichier `conf.yaml` dans le dossier `logstash.d/` précédemment créé.

1. Modifiez le fichier `statsd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple statsd.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

    ```yaml
        init_config:

        instances:
            - host: localhost
            port: 8126 # or wherever your statsd listens
    ```

   Options de configuration

    - `host` (facultatif) : le host à vérifier. Il sera ajouté sous forme de tag : `host:<host>`. Sa valeur par défaut est `localhost`.
    - `port` (facultatif) : le port à vérifier. Il sera ajouté sous forme de tag : `port:<port>`. Sa valeur par défaut est `8126`.
    - `timeout` (facultatif) : le délai d'expiration du check. Valeur par défaut : 10 secondes.
    - `tags` (facultatif) : les tags à attribuer à la métrique.

2. [Redémarrez l'Agent][4] pour commencer à envoyer vos métriques et checks de service StatsD à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `statsd` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "statsd" >}}


### Événements
Le check StatsD n'inclut aucun événement.

### Checks de service

**statsd.is_up** :

Renvoie `CRITICAL` si le serveur StatsD ne répond pas à la requête de statut de santé de l'Agent. Si ce n'est pas le cas, renvoie `OK`.

**statsd.can_connect** :

Renvoie CRITICAL si l'Agent n'est pas capable de recueillir des métriques à propos de StatsD. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin
Si vous ne connaissez pas StatsD et que vous ne savez pas comment il fonctionne, consultez [notre article de blog à ce sujet][8]

Pour mieux comprendre comment (ou pourquoi) visualiser les métriques StatsD avec les graphiques de nombres sur Datadog, lisez notre [série d'articles de blog][9] à ce sujet.


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/statsd/datadog_checks/statsd/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/statsd/metadata.csv
[7]: https://docs.datadoghq.com/fr/help
[8]: https://www.datadoghq.com/blog/statsd
[9]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[10]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations


{{< get-dependencies >}}