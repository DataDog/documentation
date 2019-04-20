---
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/couchbase/README.md'
display_name: Couchbase
git_integration_title: couchbase
guid: ba7ce7de-4fcb-4418-8c90-329baa6a5d59
integration_id: couchbase
integration_title: Couchbase
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

1. Modifiez le fichier `couchbase.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos données de performance Couchbase.
    Consultez le [fichier d'exemple couchbase.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

```
init_config:

instances:
  - server: http://localhost:8091 # ou l'emplacement sur lequel votre Couchbase effectue son écoute
    #user: <votre_nomutilisateur>
    #password: <votre_motdepasse>
```

2. [Redémarrez l'Agent][5] pour commencer à envoyer vos métriques Couchbase à Datadog.


### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `couchbase` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "couchbase" >}}


### Événements

Le check Couchbase envoie un événement à Datadog à chaque rééquilibrage de cluster.

### Checks de service

- `couchbase.can_connect` :

Renvoie `Critical` si l'Agent n'est pas capable de se connecter à Couchbase pour recueillir des métriques.

- `couchbase.by_node.cluster_membership` :

Renvoie `Critical` si le nœud est basculé.
Renvoie `Warning` si le nœud est ajouté au cluster mais attend un rééquilibrage pour s'activer.
Renvoie `Ok` pour les autres bas.

- `couchbase.by_node.health_status` :

Renvoie `Critical` si le nœud n'est pas sain. Si ce n'est pas le cas, renvoie `Ok`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin

* [Surveiller des métriques clés de Couchbase][8]




{{< get-dependencies >}}
[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couchbase/images/couchbase_graph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/help
[8]: https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog
