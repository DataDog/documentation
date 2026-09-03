---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- network
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unbound/README.md
display_name: Unbound
draft: false
git_integration_title: unbound
guid: 2b31e667-1fd9-440f-9e96-c72bea3cf3ca
integration_id: unbound
integration_title: Unbound
integration_version: 1.0.1
is_public: true
custom_kind: integration
maintainer: david.byron@avast.com
manifest_version: 1.0.0
metric_prefix: unbound.
metric_to_check: unbound.time.up
name: unbound
public_title: Intégration Datadog/Unbound
short_description: Une intégration Datadog pour recueillir les métriques Unbound
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [Unbound][1] avec l'Agent Datadog.

Recueillez des métriques du service Unbound en temps réel pour :

- Visualiser et surveiller les états de Unbound

## Configuration

Le check Unbound n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Unbound sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-unbound==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `unbound.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir les métriques Unbound. Consultez
   le [fichier d'exemple unbound.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `unbound` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "unbound" >}}


### Événements

Le check Unbound n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "unbound" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://nlnetlabs.nl/documentation/unbound/unbound-control/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/unbound/datadog_checks/unbound/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unbound/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/unbound/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/