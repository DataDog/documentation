---
git_integration_title: dotnetclr
guid: 3d21557e-65bd-4b66-99b9-5521f32b5957
integration_title: ''
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.22.2
name: dotnetclr
short_description: dotnetclr description.
support: contrib
supported_os:
- windows
version: 1.0.0
---



## Aperçu

Obtenir les métriques du service dotnetclr en temps réel pour:

* Visualiser et monitorer les états de dotnetclr
* Etre averti des failovers et des événements de dotnetclr.

## Installation

Le check Dotnetclr est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent).

## Configuration

Edit the `dotnetclr.yaml` file to point to your server and port, set the masters to monitor:

## Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `dotnetclr` dans la section Checks:

    Checks
    ======

        dotnetclr
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check dotnetclr est compatible avec toutes les principales plateformes.

