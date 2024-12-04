---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    IBM i Overview: assets/dashboards/ibm_i_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_i/README.md
display_name: IBM i
draft: false
git_integration_title: ibm_i
guid: da389374-7541-47e5-bcd1-87cf3b88a469
integration_id: ibm-i
integration_title: IBM i
integration_version: 1.4.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ibm_i.
metric_to_check: ibm_i.system.cpu_usage
name: ibm_i
public_title: IBM i
short_description: Surveillez à distance vos systèmes IBM i, y compris les tâches,
  files d'attente de tâches, ASP et plus encore.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller à distance [IBM i][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Le check IBM i est inclus avec le package de l'[Agent Datadog][3].
Vous n'avez donc rien d'autre à installer sur votre serveur.

#### Pilote ODBC

Le check IBM  i utilise le pilote ODBC IBM i pour se connecter à distance au host IBM i. 

Téléchargez le pilote à partir de la page [IBM i Access - Client Solutions][4]. Cliquez sur `Downloads for IBM i Access Client Solutions` et connectez-vous pour accéder à la page des téléchargements.

Choisissez le package `ACS App Pkg` pour votre plateforme, par exemple `ACS Linux App Pkg` pour les hosts Linux. Téléchargez le package et suivez les instructions d'installation du pilote.

### Configuration

Le check IBM i envoie des requêtes à distance vers un système IBM i depuis un host sur lequel l'Agent Datadog s'exécute. Pour communiquer avec le système IBM i, vous devez configurer le pilote ODBC IBM i sur le host sur lequel l'Agent Datadog s'exécute.

#### Pilote ODBC

Une fois le pilote ODBC installé, recherchez les fichiers de configuration ODBC : `odbc.ini` et `odbcinst.ini`. L'emplacement peut varier selon votre système. Sur Linux, ils peuvent se trouver dans le répertoire `/etc` ou dans la répertoire `/etc/unixODBC`.

Copiez ces fichiers de configuration dans l'environnement intégré de l'Agent, par exemple `/opt/datadog-agent/embedded/etc/` sur les hosts Linux.

Le fichier `odbcinst.ini` définit les pilotes ODBC disponibles pour l'Agent. Chaque section définit un pilote. Par exemple, la section suivante définit un pilote intitulé `IBM i Access ODBC Driver 64-bit` :
```
[IBM i Access ODBC Driver 64-bit]
Description=IBM i Access for Linux 64-bit ODBC Driver
Driver=/opt/ibm/iaccess/lib64/libcwbodbc.so
Setup=/opt/ibm/iaccess/lib64/libcwbodbcs.so
Threading=0
DontDLClose=1
UsageCount=1
```

Le nom du pilote ODBC IBM i est nécessaire pour configurer le check IBM i.

#### Check IBM i

1. Modifiez le fichier `ibm_i.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance IBM i. Consultez le [fichier d'exemple ibm_i.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.
   Utilisez le nom du pilote provenant du fichier `obdcinst.ini`.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `ibm_i` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ibm_i" >}}


### Événements

Le check IBM i n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://www.ibm.com/it-infrastructure/power/os/ibm-i
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://www.ibm.com/support/pages/ibm-i-access-client-solutions
[5]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/