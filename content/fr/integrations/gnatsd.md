---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - messaging
  - notification
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/gnatsd/README.md'
display_name: Gnatsd
draft: false
git_integration_title: gnatsd
guid: 7edcf450-d9cf-44aa-9053-ece04ac7c21d
integration_id: gnatsd
integration_title: Gnatsd
is_public: true
kind: integration
maintainer: dev@goldstar.com
manifest_version: 1.0.0
metric_prefix: gnatsd.
name: gnatsd
public_title: Intégration Datadog/Gnatsd
short_description: Surveillez votre cluster gnatsd avec Datadog.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Gnatsd en temps réel pour :

- Visualiser et surveiller les états de Gnatsd
- Être informé des failovers et des événements de Gnatsd

## Configuration

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Gnatsd sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][1] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][3] :

1. [Téléchargez et lancez l'Agent Datadog][4].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-gnatsd==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `gnatsd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#metriques) Gnatsd. Consultez le [fichier d'exemple gnatsd.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `gnatsd` dans la section Checks.

## Compatibilité

Le check gnatsd est compatible avec toutes les principales plates-formes.

## Données collectées

### Métriques
{{< get-metrics-from-git "gnatsd" >}}


**Remarque** : si vous utilisez des noms de cluster Nats personnalisés, vos métriques présentent le format suivant :
`gnatsd.connz.connections.nom_cluster.in_msgs`

### Événements

Le check gnatsd n'inclut aucun événement.

### Checks de service

Ce check gnatsd applique les tags suivants à l'ensemble des checks de service recueillis ;

- `server_name:<nom_serveur_en_yaml>`
- `url:<host_en_yaml>`

`gnatsd.can_connect` :
Renvoie `CRITICAL` si l'Agent ne reçoit pas de réponse 200 depuis l'endpoint de _surveillance_. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd/datadog_checks/gnatsd/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[11]: https://docs.datadoghq.com/fr/help/