---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- monitoring
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/README.md
display_name: Gnatsd streaming
draft: false
git_integration_title: gnatsd_streaming
guid: 0a849512-5823-4d9b-b378-aa9d8fb06231
integration_id: gnatsd-streaming
integration_title: Gnatsd Streaming
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: dev@goldstar.com
manifest_version: 1.0.0
metric_prefix: gnatsd.
metric_to_check: gnatsd.streaming.serverz.clients
name: gnatsd_streaming
public_title: Intégration Datadog/Gnatsd_Streaming
short_description: NATS Streaming Server
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Recueillez des métriques du service gnatsd_streaming en temps réel pour :

- Visualiser et surveiller les états de gnatsd_streaming
- Être informé des failovers et des événements de gnatsd_streaming

## Configuration

Le check gnatsd_streaming n'est pas inclus avec le package de l'[Agent Datadog][1] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check gnatsd_streaming sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-gnatsd_streaming==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `gnatsd_streaming.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#metriques) GnatsD Streaming.
   Consultez le [fichier d'exemple gnatsd_streaming.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `gnatsd_streaming` dans la section Checks.

## Compatibilité

Le check gnatsd_streaming est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques
{{< get-metrics-from-git "gnatsd_streaming" >}}


Des tags basés sur des noms comme « nss-cluster_id » sont appliqués aux métriques de Nats Streaming Server.

### Événements

Si vous exécutez Nats Streaming Server dans un groupe de tolérance aux pannes, un événement de failover Nats Streaming est transmis lorsque le statut du serveur passe de `FT_STANDBY` à `FT_ACTIVE`.

### Checks de service
{{< get-service-checks-from-git "gnatsd_streaming" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/datadog_checks/gnatsd_streaming/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/assets/service_checks.json
[10]: http://docs.datadoghq.com/help