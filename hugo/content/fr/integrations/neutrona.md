---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - AZURE
  - CLOUD
  - RÉSEAU
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/neutrona/README.md
display_name: Neutrona
draft: false
git_integration_title: neutrona
guid: ced5a4ae-6623-49f0-b45b-dbb678a5baa2
integration_id: neutrona
integration_title: Neutrona
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: david@neutrona.com
manifest_version: 1.0.0
metric_prefix: neutrona.
metric_to_check: neutrona.azure.expressroute.egress_bps
name: neutrona
public_title: Intégration Datadog/Neutrona
short_description: Neutrona Telemetry
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller les services de connectivité cloud [Neutrona][1] pour

- Azure (ExpressRoute).

## Configuration

Le check Neutrona n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Neutrona sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-neutrona==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `neutrona.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5] pour commencer à recueillir vos [métriques](#metriques) Neutrona.
   Consultez le [fichier d'exemple neutrona.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande status de l'Agent][8] et recherchez `neutrona` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "neutrona" >}}


### Checks de service

Le check Neutrona n'inclut actuellement aucun check de service.

### Événements

Neutrona n'inclut actuellement aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://telemetry.neutrona.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/neutrona/datadog_checks/neutrona/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-core/blob/master/neutrona/metadata.csv
[10]: https://docs.datadoghq.com/fr/help/