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

Obtenez les métriques du service agent_metrics en temps réel pour:

* Visualiser et monitorer les états de agent_metrics
* Soyez informé des failovers et des événements de agent_metrics.

## Implémentation
### Installation

Le check agent metric est packagé avec l'agent, il vous faut donc simplement [installer l'agent] [1].

### Configuration

Editez le fichier `agent_metrics.yaml` afin de pointer sur votre serveur et ses ports, configurez le master à monitorer . Consultez l'exemple du [canevas  agent_metrics.yaml][2] pour apprendre toutes les options de configuration disponibles:

### Validation

[Lancez la commande `status`de l'Agent][3] et cherchez `agent_metrics` dans la section Checks:

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
Consultez  [metadata.csv][4] pour avoir la liste complète des métriques fournies par cette intégration.

### Evénements
Le check Agent_metrics n'inclut aucun événement pour le moment.

### Checks de Service
Le check Agent_metrics n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][5].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][6]



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/agent_metrics/conf.yaml.default
[3]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/agent_metrics/metadata.csv
[5]: http://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/
