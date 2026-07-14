---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Cloudsmith: assets/dashboards/cloudsmith_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - metrics
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/README.md
display_name: Cloudsmith
draft: false
git_integration_title: cloudsmith
guid: 4df273a8-c1ec-4462-b080-4749312e6b7f
integration_id: cloudsmith
integration_title: Cloudsmith
integration_version: 0.0.1
is_public: true
custom_kind: integration
maintainer: ccarey@cloudsmith.io
manifest_version: 1.0.0
metric_prefix: cloudsmith.
metric_to_check: cloudsmith.bandwidth_used
name: cloudsmith
public_title: Cloudsmith
short_description: Surveiller les métriques Cloudsmith
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Cloudsmith][1] avec l'Agent Datadog.
- Étudiez l'utilisation du stockage, de la bande passante et des tokens dans votre compte Cloudsmith.


## Configuration

Le check Cloudsmith n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Cloudsmith sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-cloudsmith==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `cloudsmith.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Cloudsmith. Consultez le [fichier d'exemple cloudsmith.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `cloudsmith` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cloudsmith" >}}


### Événements

L'intégration Cloudsmith n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://cloudsmith.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/datadog_checks/cloudsmith/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/