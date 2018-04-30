---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/pdh_check/
git_integration_title: pdh_check
guid: D09B3410-00A0-4789-ABD7-7740C3FE211F
has_logo: true
integration_title: Pdh Check
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
min_agent_version: 5.21.0
name: pdh_check
public_title: Intégration Datadog-Pdh Check 
short_description: Collecter et grapher les métriques de Windows PDH
support: core
supported_os:
- windows
---



## Aperçu

Obtenir les métriques depuis Windows performance counters en temps réel pour:

* Visualiser et monitorer les counter de performances windows

## Implémentation
### Installation

Le check PDH est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent).

### Configuration

Editez le fichier `pdh_check.yaml` dans le dossier `conf.d` de l'Agent. Consultez l'exemple du [canevas  pdh_check.yaml](https://github.com/DataDog/integrations-core/blob/master/pdh_check/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `pdh_check` dans la section Checks:

    Checks
    ======

        pdh_check
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check pdh_check est compatible avec Windows.

## Données collectées
### Métriques
Consultez [metadata.csv](https://github.com/DataDog/integrations-core/blob/master/pdh_check/metadata.csv) pour avoir la liste complète des métriques fournies par cette intégration.

### Évènements
Le check PDH n'inclut aucun événement pour le moment.

### Checks de Service
Le check PDH n'inclut aucun check de service pour le moment.

