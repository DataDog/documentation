---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/active_directory/
git_integration_title: active_directory
guid: ba667ff3-cf6a-458c-aa4b-1172f33de562
has_logo: true
integration_title: Active Directory
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: active_directory
public_title: Integration Datadog/Active Directory
short_description: Recueillez et représentez graphiquement des métriques de Microsoft Active Directory.
support: core
supported_os:
- windows
---



## Présentation

Obtenir des métriques à partir de Microsoft Active Directory

* Visualiser et surveiller les performances d'Active Directory

## Implémentation
### Installation

Installer le paquet `dd-check-active_directory` manuellement ou avec votre gestionnaire de configuration préféré.

### Configuration

Modifiez le fichier `active_directory.yaml` pour recueillir les données de performance d'Active Directory. Consultez [l'exemple de fichier active_directory.yaml][1] pour découvrir toutes les options disponibles.

### Validation

[Lancez la sous-commande `info`de l'Agent][2] et cherchez `active_directory` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "active_directory" >}}


### Événements
Le check Active Directory n'inclut actuellement aucun événement.

### Checks de Service
Le check Active Directory n'inclut actuellement aucun check de service.


[1]: https://github.com/DataDog/integrations-core/blob/master/active_directory/conf.yaml.example
[2]: https://help.datadoghq.com/hc/en-us/articles/203764635-Agent-Status-and-Information
[3]: https://github.com/DataDog/integrations-core/blob/master/active_directory/metadata.csv

