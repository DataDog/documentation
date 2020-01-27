---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/mapreduce/README.md'
display_name: MapReduce
git_integration_title: mapreduce
guid: 1c143492-84ac-42d2-89d5-a45c718092b0
integration_id: mapreduce
integration_title: Map Reduce
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mapreduce.
metric_to_check: mapreduce.job.elapsed_time.max
name: mapreduce
public_title: Intégration Datadog/MapReduce
short_description: Surveillez le statut et la durée de vos tâches MapReduce.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard MapReduce][1]

## Présentation

Recueillez des métriques du service MapReduce en temps réel pour :

* Visualiser et surveiller les statuts de MapReduce
* Être informé des failovers et des événements de MapReduce

## Implémentation

### Installation

Le check MapReduce est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

1. Modifiez le fichier `mapreduce.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] afin de spécifier votre serveur et votre port et de définir les masters à surveiller. Consultez le [fichier d'exemple mapreduce.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][6] pour découvrir comment appliquer les paramètres ci-dessous.

| Paramètre            | Valeur                                                                                         |
|----------------------|-----------------------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `mapreduce`                                                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                 |
| `<CONFIG_INSTANCE>`  | `{"resourcemanager_uri": "https://%%host%%:8088", "cluster_name":"<NOM_CLUSTER_MAPREDUCE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `mapreduce` dans la section Checks.

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
Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

* [Vue d'ensemble de l'architecture Hadoop][10]
* [Comment surveiller des métriques Hadoop][11]
* [Comment recueillir des métriques Hadoop][12]
* [Comment surveiller Hadoop avec Datadog][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mapreduce/images/mapreduce_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/metadata.csv
[9]: https://docs.datadoghq.com/fr/help
[10]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[11]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[12]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[13]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog


