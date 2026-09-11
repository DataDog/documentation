---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: statsd
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- monitoring
- autodiscovery
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/statsd/README.md
display_name: StatsD
draft: false
git_integration_title: statsd
guid: 4830acf3-626b-42ff-a1db-3f37babd0ae6
integration_id: statsd
integration_title: StatsD
integration_version: 1.10.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: statsd.
metric_to_check: statsd.counters.count
name: statsd
public_title: Intégration Datadog/StatsD
short_description: Surveillez la disponibilité des serveurs StatsD et suivez le nombre
  de métriques.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check surveille la disponibilité et l'uptime des serveurs StatsD hors Datadog. Il permet également de suivre le nombre de métriques, par type de métrique, reçues par StatsD.

Ce check ne transfère **PAS** les métriques d'application des serveurs StatsD vers Datadog. Il recueille les métriques concernant StatsD même.

## Configuration

### Installation

Le check StatsD est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur les serveurs qui exécutent StatsD.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `statsd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple statsd.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     - host: localhost
       port: 8126 # or wherever your statsd listens
   ```

2. [Redémarrez l'Agent][3] pour commencer à envoyer vos métriques et checks de service StatsD à Datadog.

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/statsd/datadog_checks/statsd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                 |
| -------------------- | ------------------------------------- |
| `<NOM_INTÉGRATION>` | `statsd`                              |
| `<CONFIG_INIT>`      | vide ou `{}`                         |
| `<CONFIG_INSTANCE>`  | `{"host": "%%host%%", "port":"8126"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `statsd.d/conf.yaml` pour commencer à recueillir vos logs Supervisord :

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: statsd
   ```

   Modifiez la valeur du paramètre `path` et configurez-la pour votre environnement.
   Consultez le [fichier d'exemple statsd.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

### Validation

Lancez la [sous-commande status de l'Agent][4] et cherchez `statsd` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "statsd" >}}


### Événements

Le check StatsD n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "statsd" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [StatsD : fonctionnement et utilité][6]
- [Visualiser des métriques StatsD en représentant des counts dans des graphiques][7]



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/statsd/datadog_checks/statsd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/help/
[6]: https://www.datadoghq.com/blog/statsd
[7]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing