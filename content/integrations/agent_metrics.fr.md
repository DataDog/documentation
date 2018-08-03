---
ddtype: check
git_integration_title: agent_metrics
guid: 032333e3-5272-4044-90d5-a05997667513
integration_title: ''
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: agent_metrics
short_description: agent_metrics description.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.1.0
---



## Aperçu

Obtenir les métriques du service agent_metrics en temps réel pour:

* Visualiser et monitorer les états de agent_metrics
* Être informé des failovers et des événements de agent_metrics.

## Implémentation
### Installation

Le check agent metric est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent).

### Configuration

Editez le fichier `agent_metrics.yaml` afin de pointer sur votre serveur et ses ports, configurez le master à monitorer . Consultez l'exemple du [canevas  agent_metrics.yaml](
https://github.com/DataDog/integrations-core/blob/master/agent_metrics/datadog_checks/agent_metrics/data/conf.yaml.default) pour apprendre toutes les options de configuration disponibles:

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `agent_metrics` dans la section Checks:

    Checks
    ======

        agent_metrics
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check Agent_metrics est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
Consultez  [metadata.csv](https://github.com/DataDog/integrations-core/blob/master/agent_metrics/metadata.csv) pour avoir la liste complète des métriques fournies par cette intégration.

### Evénements
Le check Agent_metrics n'inclut aucun événement pour le moment.

### Checks de Service
Le check Agent_metrics n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

