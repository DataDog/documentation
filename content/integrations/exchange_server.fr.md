---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/exchange_server/
git_integration_title: exchange_server
guid: 7bc177b0-b07d-4a83-921f-9cd8deef039b
has_logo: true
integration_title: Exchange Server
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.21.0
name: exchange_server
public_title: Intégration Datadog-Exchange Server
short_description: Collecter et grapher les métriques de Microsoft exchange server
support: core
supported_os:
- windows
version: 1.1.0
---



## Aperçu

Obtenir des métriques à partir de Microsoft Exchange Server

* Visualiser et monitorer les performances Exchange server

## Implémentation
### Installation

Le check Exchange est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent).

### Configuration

Editez le fichier `exchange_server.yaml` dans le dossier `conf.d` de l'Agent. Consultez l'exemple du [canevas  exchange_server.yaml](https://github.com/DataDog/integrations-core/blob/master/exchange_server/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `exchange_server` dans la section Checks:

    Checks
    ======

        exchange_server
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check exchange_server est compatible avec Windows.

## Données collectées
### Métriques
{{< get-metrics-from-git "exchange_server" >}}


### Evénements
Le check exchange server n'inclut aucun événement pour le moment.

### Checks de Service
Le check exchange server n'inclut aucun check de service pour le moment.

