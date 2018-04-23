---
categories:
- processing
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/yarn/
git_integration_title: yarn
guid: 3223c2e3-29dd-4cfb-82a2-51b951c648eb
has_logo: true
integration_title: Yarn
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: yarn
public_title: Intégration Datadog-Yarn
short_description: Collecter des métriques d'intégrité à l'échelle du cluster et suivez la progression de l'application.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.2.0
---


{{< img src="integrations/yarn/yarndashboard.png" alt="Hadoop Yarn" responsive="true" popup="true">}}
## Aperçu

Ce check collecte les métriques depuis YARN ResourceManager incluant:

* Métriques à l'échelle du cluster: nombre d'applications en cours d'exécution, conteneurs en cours d'exécution, nœuds insalubres, etc.
* Métriques par application: progression de l'application, temps écoulé, conteneurs en cours d'exécution, utilisation de la mémoire, etc.
* Métriques de Node: vCores disponibles, heure de la dernière mise à jour de l'état de santé, etc.

Et plus encore.
## Implémentation
### Installation

Le check YARN est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur vos Ressource Manager YARN.


### Configuration

Créez un fichier `yarn.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas yarn.yaml](https://github.com/DataDog/integrations-core/blob/master/yarn/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

```
init_config:

instances:
  - resourcemanager_uri: http://localhost:8088 # or whatever your resource manager listens
    cluster_name: MyCluster # used to tag metrics, i.e. 'cluster_name:MyCluster'; default is 'default_cluster'
    collect_app_metrics: true
```

Consultez l'exemple du [canevas de configuration](https://github.com/DataDog/integrations-core/blob/master/yarn/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

[Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent) pour commencer à envoyer vos métriques YARN à Datadog.

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `yarn` dans la section Checks:

```
  Checks
  ======
    [...]

    yarn
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibilité

Le check yarn est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "yarn" >}}


### Evénements
Le check Yarn n'inclut aucun événement pour le moment.

### Checks de Service
**yarn.can_connect**:

Renvoie CRITICAL si l'agent ne peut pas se connecter à l'URI ResourceManager pour collecter des métriques, sinon OK.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

* [Vue d'ensemble de l'architecture Hadoop](https://www.datadoghq.com/blog/hadoop-architecture-overview/)
* [Comment monitorer les métriques Hadoop](https://www.datadoghq.com/blog/monitor-hadoop-metrics/)
* [Comment collecter les métriques de Hadoop](https://www.datadoghq.com/blog/collecting-hadoop-metrics/)
* [Comment monitorer Hadoop avec Datadog](https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog/)

