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


{{< img src="integrations/yarn/yarndashboard.png" alt="Hadoop Yarn" responsive="true" >}}
## Aperçu

Ce check collecte les métriques depuis YARN ResourceManager incluant:

* Métriques à l'échelle du cluster: nombre d'applications en cours d'exécution, conteneurs en cours d'exécution, nœuds insalubres, etc.
* Métriques par application: progression de l'application, temps écoulé, conteneurs en cours d'exécution, utilisation de la mémoire, etc.
* Métriques de Node: vCores disponibles, heure de la dernière mise à jour de l'état de santé, etc.

Et plus encore.
## Implémentation
### Installation

Le check YARN est fourni avec l'Agent; il vous suffit donc d'[installer l'Agent][1] sur vos YARN ResourceManager.

### Configuration

1. Modifiez le fichier `yarn.d/conf.yaml` dans le dossier `conf.d/`, à la racine du répertoire de l'Agent.

    ```yaml
        init_config:

        instances:
          - resourcemanager_uri: http://localhost:8088 # or whatever your resource manager listens
            cluster_name: MyCluster # used to tag metrics, i.e. 'cluster_name:MyCluster'; default is 'default_cluster'
            collect_app_metrics: true
    ```

   Consultez l'exemple du [canevas de configuration][2] pour apprendre toutes les options de configuration disponibles:

2. [Redémarrez l'Agent][3] pour commencer à envoyer des métriques YARN à Datadog.

### Validation

[Lancez la commande `status` de l'Agent][4] et cherchez `yarn` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "yarn" >}}


### Évènements
Le check Yarn n'inclut aucun événement pour le moment.

### Checks de Service
**yarn.can_connect**:

Renvoie CRITICAL si l'agent ne peut pas se connecter à l'URI ResourceManager pour collecter des métriques, sinon OK.

## Troubleshooting
Besoin d'aide ? Contactez  [l'équipe support de Datadog][6].

## En apprendre plus

* [Vue d'ensemble de l'architecture Hadoop][7]
* [Comment monitorer les métriques Hadoop][8]
* [Comment collecter les métriques de Hadoop][9]
* [Comment monitorer Hadoop avec Datadog][10]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/yarn/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/yarn/metadata.csv
[6]: http://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/hadoop-architecture-overview/
[8]: https://www.datadoghq.com/blog/monitor-hadoop-metrics/
[9]: https://www.datadoghq.com/blog/collecting-hadoop-metrics/
[10]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog/

