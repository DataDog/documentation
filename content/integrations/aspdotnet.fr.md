---
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/aspdotnet/
git_integration_title: aspdotnet
guid: 475b0c6c-02e5-49ef-806b-9fab377f0839
has_logo: true
integration_title: ASP.NET
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.1.0
min_agent_version: 5.22.2
name: aspdotnet
public_title: Intégration Datadog-ASP.NET
short_description: Visualiser et monitorer les états de ASP.NET
support: contrib
supported_os:
- windows
version: 0.2.0
---



## Aperçu

Obtenir les métriques du service ASP.NET en temps réel pour:

* Visualiser et surveiller les états de ASP.NET
* Être informé des failovers et des évènements de ASP.NET.

## Installation

Le check ASP.NET est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur vos serveurs.

## Configuration

Edit the `aspdotnet.yaml` file to point to your server and port, set the masters to monitor:

## Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `aspdotnet` dans la section Checks:

    Checks
    ======

        aspdotnet
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check aspdotnet est compatible avec toutes les principales plateformes.

