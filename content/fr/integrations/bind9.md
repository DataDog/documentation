---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/bind9/README.md'
display_name: "BIND\_9"
draft: false
git_integration_title: bind9
guid: bce6961c-4312-11e9-b210-d663bd873d93
integration_id: bind9
integration_title: bind9
is_public: true
kind: intégration
maintainer: ashuvyas45@gmail.com
manifest_version: 1.0.0
metric_prefix: bind9.
name: bind9
public_title: Intégration Datadog/bind9
short_description: Une intégration Datadog pour recueillir les métriques de votre serveur bind9
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez les métriques de votre serveur DNS Bind9.

- Visualisez et surveillez les statistiques bind9

![Snap][1]

## Configuration

Le check Bind9 n'est **PAS** inclus avec le package de l'[Agent Datadog][2].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Bind9 sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec une [version < 6.8 de l'Agent][4] ou avec l'[Agent Docker][5] :

1. [Téléchargez et lancez l'Agent Datadog][2].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-bind9==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Modifiez le fichier `bind9.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#metriques) Bind9. Consultez le [fichier d'exemple bind9.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     - URL: "<BIND_9_STATS_URL>"
   ```

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande `status` de l'Agent][10] et cherchez `bind9` dans la section Checks.

## Compatibilité

Ce check est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques
{{< get-metrics-from-git "bind9" >}}


### Événements

Le check bind9 n'inclut actuellement aucun événement.

### Checks de service

`bind9_check.BIND_SERVICE_CHECK` : renvoie `OK` si l'URL du canal de statistiques du DNS figure dans l'instance.
`bind9_check.BIND_SERVICE_CHECK` : renvoie `CRITICAL` en cas d'erreur liée à l'URL.

## Développement

Consultez la [documentation principale sur les outils de développement][12] pour découvrir comment tester et développer des intégrations reposant sur l'Agent.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bind9/images/snapshot.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/fr/getting_started/integrations/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/bind9/metadata.csv
[12]: https://docs.datadoghq.com/fr/developers/