---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- web
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/puma/README.md
display_name: Puma
draft: false
git_integration_title: puma
guid: 93264c0f-a4d1-447d-81b6-bee3eb891df3
integration_id: puma
integration_title: Puma
integration_version: 1.2.0
is_public: true
custom_kind: integration
maintainer: justin.morris@ferocia.com.au
manifest_version: 1.0.0
metric_prefix: puma.
metric_to_check: puma.workers
name: puma
public_title: Intégration Datadog/Puma
short_description: Un serveur Web rapide et concurrent pour Ruby et Rack
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [Puma][1] avec l'Agent Datadog. Il utilise l'endpoint de métriques Puma fourni par le serveur de [contrôle/statut][2].

## Configuration

Le check Puma n'est pas inclus avec le package de l'[Agent Datadog][3] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Puma sur votre host. Consultez la section [Utiliser les intégrations de la communauté][4] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-puma==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][5] de base.

### Configuration

1. Modifiez le fichier `puma.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Puma. Consultez le [fichier d'exemple puma.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][7].

### Validation

Lancez la [sous-commande status de l'Agent][8] et cherchez `puma` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "puma" >}}


### Événements

Puma n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "puma" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].


[1]: https://puma.io/
[2]: https://github.com/puma/puma#controlstatus-server
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/puma/datadog_checks/puma/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/puma/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/puma/assets/service_checks.json
[11]: https://docs.datadoghq.com/fr/help/