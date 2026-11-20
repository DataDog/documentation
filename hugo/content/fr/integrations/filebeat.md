---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/filebeat/README.md
display_name: Filebeat
draft: false
git_integration_title: filebeat
guid: 3bb6a789-d1e3-465c-9bff-ea2a43ae2f59
integration_id: filebeat
integration_title: Filebeat
integration_version: 1.2.0
is_public: true
custom_kind: integration
maintainer: jean@tripping.com
manifest_version: 1.0.0
metric_prefix: filebeat.
metric_to_check: filebeat.registry.unprocessed_bytes
name: filebeat
public_title: Intégration Datadog/Filebeat
short_description: Shipper léger conçu pour les logs
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Filebeat en temps réel pour :

- Visualiser et surveiller les états de Filebeat
- Être informé des failovers et des événements de Filebeat

## Configuration

Le check Filebeat n'est pas inclus avec le package de l'[Agent Datadog][1] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Filebeat sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-filebeat==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `filebeat.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#metriques) Filebeat. Consultez le [fichier d'exemple filebeat.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

## Validation

Lancez la [sous-commande status de l'Agent][7] et cherchez `filebeat` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "filebeat" >}}


### Événements

Le check Filebeat n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "filebeat" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/datadog_checks/filebeat/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/