---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/storm/README.md'
display_name: storm
draft: false
git_integration_title: storm
guid: 5a9ec2c3-8ea0-4337-8c45-a6b8a36b8721
integration_id: storm
integration_title: Storm
is_public: true
kind: integration
maintainer: '@platinummonkey'
manifest_version: 1.0.0
metric_prefix: storm.
name: storm
public_title: Intégration Datadog/Storm
short_description: Statistiques d'exécution des topologies Apache Storm 1.x.x
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Storm en temps réel pour :

- Visualiser et surveiller les métriques des clusters et des topologies Storm.
- Être informé des failovers et des événements de Storm

## Configuration

Le check Storm n'est **PAS** inclus avec le package de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Storm sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][1].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-storm==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `storm.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#metriques) Storm. Consultez le [fichier d'exemple storm.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

## Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `storm` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "storm" >}}


### Événements

Le check Storm n'inclut aucun événement.

### Checks de service

**`topology_check.{NOM TOPOLOGIE}`**

Le check renvoie :

- `OK` si la topologie est active.
- `CRITICAL` si la topologie n'est pas active.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/storm/datadog_checks/storm/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/storm/metadata.csv
[11]: http://docs.datadoghq.com/help