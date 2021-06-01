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
  - 'https://github.com/DataDog/integrations-extras/blob/master/unbound/README.md'
display_name: Unbound
draft: false
git_integration_title: unbound
guid: 2b31e667-1fd9-440f-9e96-c72bea3cf3ca
integration_id: unbound
integration_title: Unbound
is_public: true
kind: integration
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

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Unbound sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][5].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-unbound==<INTEGRATION_VERSION>
   ```
3. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Modifiez le fichier `unbound.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir les métriques Unbound. Consultez
   le [fichier d'exemple unbound.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `unbound` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "unbound" >}}


### Checks de service

**unbound.can_get_stats**
Renvoie CRITICAL en cas d'échec de unbound-control ou d'erreur de parsing de la sortie. Si ce n'est pas le cas, renvoie OK.

### Événements

Le check Unbound n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://nlnetlabs.nl/documentation/unbound/unbound-control/
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/getting_started/integrations/
[7]: https://github.com/DataDog/integrations-extras/blob/master/unbound/datadog_checks/unbound/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/unbound/metadata.csv
[11]: https://docs.datadoghq.com/fr/help/