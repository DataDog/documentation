---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/mapreduce/README.md'
display_name: MapReduce
git_integration_title: mapreduce
guid: 1c143492-84ac-42d2-89d5-a45c718092b0
integration_id: mapreduce
integration_title: MapReduce
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mapreduce.
metric_to_check: mapreduce.job.elapsed_time.max
name: mapreduce
public_title: Intégration Datadog/MapReduce
short_description: Surveillez le statut et la durée de votre map et réduisez votre volume de tâches.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard MapReduce][1]

## Présentation

Recueillez des métriques du service MapReduce en temps réel pour :

* Visualiser et surveiller les états de MapReduce
* Être informé des failovers et des événements de MapReduce

## Implémentation
### Installation

Le check Mapreduce est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

Modifiez le fichier `mapreduce.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] afin de spécifier votre serveur et votre port et de définir les masters à surveiller. Consultez le [fichier d'exemple mapreduce.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `mapreduce` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "mapreduce" >}}


### Événements
Le check Mapreduce n'inclut aucun événement.

### Checks de service
**mapreduce.resource_manager.can_connect**

Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à Resource Manager.
Si ce n'est pas le cas, renvoie `OK`.

**mapreduce.application_master.can_connect**

Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à Application Master.
Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin

* [Vue d'ensemble de l'architecture Hadoop][8]
* [Comment surveiller des métriques Hadoop][9]
* [Comment recueillir des métriques Hadoop][10]
* [Comment surveiller Hadoop avec Datadog][11]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mapreduce/images/mapreduce_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/metadata.csv
[7]: https://docs.datadoghq.com/fr/help
[8]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[9]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[10]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[11]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog


{{< get-dependencies >}}