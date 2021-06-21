---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Speedtest: assets/dashboards/speedtest.json
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - isp
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/speedtest/README.md'
display_name: speedtest
draft: false
git_integration_title: speedtest
guid: 4bf81e32-170a-44f3-868d-1683ef39464f
integration_id: speedtest
integration_title: speedtest
is_public: true
kind: integration
maintainer: cody.lee@datadoghq.com
manifest_version: 1.0.0
metric_prefix: speedtest.
metric_to_check: speedtest.download.bandwidth
name: speedtest
public_title: Intégration Datadog/Speedtest
short_description: Exécutez un test Speedtest avec l'outil speedtest-cli
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Speedtest][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Speedtest sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec une [version < 6.8 de l'Agent][4] ou avec l'[Agent Docker][5] :

1. [Téléchargez et lancez l'Agent Datadog][6].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-speedtest==<INTEGRATION_VERSION>
   ```
3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][7].

Remarque : vous devez également installer [Speedtest CLI][1] sur chaque host souhaité et accepter l'accord en tant qu'utilisateur datadog-agent (p. ex. `sudo -u dd-agent speedtest`) pour utiliser l'intégration.

### Configuration

1. Modifiez le fichier `speedtest.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Speedtest. Consultez le [fichier d'exemple speedtest.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `speedtest` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "speedtest" >}}


### Checks de service

Speedtest n'inclut aucun check de service.

### Événements

Speedtest n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://www.speedtest.net/apps/cli
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/datadog_checks/speedtest/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/metadata.csv
[12]: https://docs.datadoghq.com/fr/help/