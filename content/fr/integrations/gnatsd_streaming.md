---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/README.md'
display_name: Gnatsd streaming
draft: false
git_integration_title: gnatsd_streaming
guid: 0a849512-5823-4d9b-b378-aa9d8fb06231
integration_id: gnatsd-streaming
integration_title: Gnatsd_streaming
is_public: true
kind: integration
maintainer: dev@goldstar.com
manifest_version: 1.0.0
metric_prefix: gnatsd.
name: gnatsd_streaming
public_title: Intégration Datadog/Gnatsd_streaming
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

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check gnatsd_streaming sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][1] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][3] :

1. [Téléchargez et lancez l'Agent Datadog][4].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-gnatsd_streaming==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `gnatsd_streaming.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#collecte-de-metriques) GnatsD streaming.
   Consultez le [fichier d'exemple gnatsd_streaming.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `gnatsd_streaming` dans la section Checks.

## Compatibilité

Le check gnatsd_streaming est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques
{{< get-metrics-from-git "gnatsd_streaming" >}}


Des tags basés sur des noms comme « nss-cluster_id » sont appliqués aux métriques de Nats Streaming Server.

### Événements

Si vous exécutez Nats Streaming Server dans un groupe de tolérance aux pannes, un événement de failover Nats Streaming sera transmis lorsque le statut du serveur passera de `FT_STANDBY` à `FT_ACTIVE`.

### Checks de service

Ce check gnatsd_streaming applique les tags suivants à l'ensemble des checks de service recueillis ;

- `server_name:<nom_serveur_en_yaml>`
- `url:<host_en_yaml>`

`gnatsd_streaming.can_connect` :
Renvoie `CRITICAL` si l'Agent ne parvient pas à recevoir la valeur 200 depuis l'endpoint de _surveillance_. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/datadog_checks/gnatsd_streaming/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[11]: http://docs.datadoghq.com/help