---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/couchbase/README.md'
display_name: Couchbase
git_integration_title: couchbase
guid: ba7ce7de-4fcb-4418-8c90-329baa6a5d59
integration_id: couchbase
integration_title: CouchBase
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: couchbase.
metric_to_check: couchbase.ram.used
name: couchbase
process_signatures:
  - beam.smp couchbase
public_title: Intégration Datadog/CouchBase
short_description: Surveillez et représentez graphiquement vos métriques de performance et d'activité Couchbase.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Octets Couchbase lus][1]

## Présentation

Identifiez les compartiments occupés, surveillez les ratios de miss de cache, et plus encore. Ce check de l'Agent recueille des métriques sur :

* L'utilisation du disque dur et de la mémoire en fonction des données
* Les connexions actives
* Le nombre total d'objets
* Le nombre d'opérations par seconde
* La taille de la file d'attente d'écriture sur disque

Et bien plus encore

## Implémentation

### Installation

Le check Couchbase est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Couchbase.

### Configuration

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `couchbase.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos données Couchbase. Consultez le [fichier d'exemple couchbase.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

    ```yaml
      init_config:

      instances:
          ## @param server - string - required
          ## The server's url.
          #
        - server: http://localhost:8091
    ```

2. [Redémarrez l'Agent][5].

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `couchbase.d/conf.yaml` pour commencer à recueillir vos logs Apache :

    ```yaml
      logs:
          - type: file
            path: /var/log/couchdb/couch.log
            source: couchdb
            service: couchbase
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
    Consultez le [fichier d'exemple couchbase.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][5].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][6] pour découvrir comment appliquer les paramètres ci-dessous.

##### Collecte de métriques

| Paramètre            | Valeur                                |
|----------------------|--------------------------------------|
| `<NOM_INTÉGRATION>` | `couchbase`                          |
| `<CONFIG_INIT>`      | vide ou `{}`                        |
| `<CONFIG_INSTANCE>`  | `{"server": "http://%%host%%:8091"}` |

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][7].

| Paramètre      | Valeur                                                  |
|----------------|--------------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "couchbase", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande `status` de l'Agent][8] et cherchez `couchbase` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "couchbase" >}}


### Événements

Le check Couchbase envoie un événement à Datadog à chaque rééquilibrage de cluster.

### Checks de service

* `couchbase.can_connect` :

Renvoie `Critical` si l'Agent n'est pas capable de se connecter à Couchbase pour recueillir des métriques.

* `couchbase.by_node.cluster_membership` :

Renvoie `Critical` si le nœud est basculé.
Renvoie `Warning` si le nœud est ajouté au cluster mais attend un rééquilibrage pour s'activer.
Renvoie `Ok` pour les autres bas.

* `couchbase.by_node.health_status` :

Renvoie `Critical` si le nœud n'est pas sain. Si ce n'est pas le cas, renvoie `Ok`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin

* [Surveiller des métriques clés de Couchbase][11].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couchbase/images/couchbase_graph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[7]: https://docs.datadoghq.com/fr/agent/docker/log/
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/couchbase/metadata.csv
[10]: https://docs.datadoghq.com/fr/help
[11]: https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog


{{< get-dependencies >}}