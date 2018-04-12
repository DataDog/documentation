---
categories:
- os & system
doc_link: https://docs.datadoghq.com/integrations/active_directory/
git_integration_title: active_directory
guid: ba667ff3-cf6a-458c-aa4b-1172f33de562
has_logo: true
integration_title: Active Directory
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.22.0
name: active_directory
public_title: Integration Datadog-Active Directory
short_description: Collecter et représenter les métriques de Microsoft Active Directory
support: core
supported_os:
- windows
version: 1.0.0
---

## Aperçu

Obtenir des métriques à partir de Microsoft Active Directory

* Visualiser et monitorer les performances d'Active Directory

## Implémentation
### Installation

Installer le paquet `dd-check-active_directory` manuellement ou avec votre gestionnaire de configuration favori

### Configuration

Editez le fichier `active_directory.yaml` dans le dossier `conf.d` de l'Agent. Consultez l'exemple du [canevas  active_directory.yaml](https://github.com/DataDog/integrations-core/blob/master/active_directory/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

### Validation

[Lancez la commande `info`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `system_core` dans la section Checks:

    Checks
    ======

        active_directory
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check ative_directory est compatible avec Windows.

## Données collectées
### Métriques
{{< get-metrics-from-git "active_directory" >}}

### Evénements
Le check Active Directory n'inclut aucun événement pour le moment.

### Checks de Service
Le check Active Directory n'inclut aucun check de service pour le moment.
<<<<<<< HEAD

[1]: https://github.com/DataDog/integrations-core/blob/master/active_directory/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
=======
>>>>>>> master
