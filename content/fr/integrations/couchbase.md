---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    couchbase: assets/dashboards/couchbase_dashboard.json
  logs:
    source: couchdb
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    couchbase_processes: assets/saved_views/couchbase_processes.json
  service_checks: assets/service_checks.json
categories:
- data store
- autodiscovery
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/couchbase/README.md
display_name: Couchbase
draft: false
git_integration_title: couchbase
guid: ba7ce7de-4fcb-4418-8c90-329baa6a5d59
integration_id: couchbase
integration_title: CouchBase
integration_version: 2.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: couchbase.
metric_to_check: couchbase.ram.used
name: couchbase
process_signatures:
- beam.smp couchbase
public_title: Intégration Datadog/CouchBase
short_description: Surveillez et représentez graphiquement vos métriques de performance
  et d'activité Couchbase.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Octets Couchbase lus][1]

## Présentation

Identifiez les compartiments occupés, surveillez les ratios de miss de cache, et plus encore. Ce check de l'Agent recueille des métriques sur :

- L'utilisation du disque dur et de la mémoire en fonction des données
- Les connexions actives
- Le nombre total d'objets
- Le nombre d'opérations par seconde
- La taille de la file d'attente d'écriture sur disque

Et bien plus encore.

## Configuration

### Installation

Le check Couchbase est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Couchbase.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `couchbase.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos données Couchbase. Consultez le [fichier d'exemple couchbase.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The server's url.
     #
     - server: http://localhost:8091
   ```

2. [Redémarrez l'Agent][3].

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `couchbase.d/conf.yaml` pour commencer à recueillir vos logs Couchbase :

   ```yaml
   logs:
     - type: file
       path: /opt/couchbase/var/lib/couchbase/logs/couchdb.log
       source: couchdb
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple couchbase.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                |
| -------------------- | ------------------------------------ |
| `<NOM_INTÉGRATION>` | `couchbase`                          |
| `<CONFIG_INIT>`      | vide ou `{}`                        |
| `<CONFIG_INSTANCE>`  | `{"server": "http://%%host%%:8091"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][3] et cherchez `couchbase` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "couchbase" >}}


### Événements

Le check Couchbase envoie un événement à Datadog à chaque rééquilibrage de cluster.

### Checks de service
{{< get-service-checks-from-git "couchbase" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

- [Surveiller des métriques clés de Couchbase][5]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couchbase/images/couchbase_graph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog