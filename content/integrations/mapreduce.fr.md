---
categories:
- processing
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/mapreduce/
git_integration_title: mapreduce
guid: 1c143492-84ac-42d2-89d5-a45c718092b0
has_logo: true
integration_title: Map Reduce
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: mapreduce
public_title: Intégration Datadog-Map Reduce
short_description: Monitorer l'état et la durée de la map et et des tâches de reduce.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.1.0
---



## Aperçu

Obtenir les métriques du service mapreduce en temps réel pour:

* Visualiser et surveiller les états de mapreduce
* Être informé des failovers et des événements mapreduce.

## Implémentation
### Installation

Le check Mapreduce est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent).

### Configuration

Editez le fichier `mapreduce.yaml` afin de d'indiquer votre serveur et son port, configurez le master à surveiller. Consultez l'exemple du [mapreduce.yaml](https://github.com/DataDog/integrations-core/blob/master/mapreduce/conf.yaml.example) pour apprendre toutes les options de configuration disponibles.

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `mapreduce` dans la section Checks:

    Checks
    ======

        mapreduce
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check Mapreduce est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "mapreduce" >}}


### Evénements
Le check Mapreduce n'inclut aucun événement pour le moment.

### Checks de Service
**mapreduce.resource_manager.can_connect**

Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter a l'instance Resource Manager, sinon renvoie `OK`.

**mapreduce.application_master.can_connect**

Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter a l'Application Master. Sinon renvoie `OK`.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

* [Vue d'ensemble de l'architecture Hadoop](https://www.datadoghq.com/blog/hadoop-architecture-overview/)
* [Comment monitorer les métriques Hadoop](https://www.datadoghq.com/blog/monitor-hadoop-metrics/)
* [Comment collecter les métriques de Hadoop](https://www.datadoghq.com/blog/collecting-hadoop-metrics/)
* [Comment monitorer Hadoop avec Datadog](https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog/)

