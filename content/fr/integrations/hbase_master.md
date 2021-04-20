---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: hbase
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/hbase_master/README.md'
display_name: HBase master
draft: false
git_integration_title: hbase_master
guid: b45e0f05-8ece-4d5c-946b-ce0ee8057e68
integration_id: hbase-master
integration_title: "Hbase\_Master"
is_public: true
kind: integration
maintainer: everpeace
manifest_version: 1.0.0
metric_prefix: hbase.
name: hbase_master
public_title: "Intégration Datadog/Hbase\_Master"
short_description: "Intégration de HBase\_Master."
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Hbase_master en temps réel pour :

- Visualiser et surveiller les états de Hbase_master
- Être informé des failovers et des événements de Hbase_master

## Configuration

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Hbase_master sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][1] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][3] :

1. [Téléchargez et lancez l'Agent Datadog][4].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-hbase_master==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `hbase_master.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#metriques) Hbase_master. Consultez le [fichier d'exemple hbase_master.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

    **REMARQUE** : si vous utilisez l'Agent v6, assurez-vous de bien modifier le fichier [`hbase_master.d/metrics.yaml`][8] et de placer les clés booléennes entre guillemets.

    ```yaml
      - include:
         domain: Hadoop
         bean:
         - Hadoop:service=HBase,name=Master,sub=Server
         attribute:
         # Is Active Master
         tag.isActiveMaster:
            metric_type: gauge
            alias: hbase.master.server.tag.is_active_master
            values: {"true": 1, "false": 0, default: 0}
    ```

2. [Redémarrez l'Agent][9].

### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `hbase_master.d/conf.yaml` pour commencer à recueillir vos logs Hbase_master :

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: hbase
   ```

   Modifiez la valeur du paramètre `path` et configurez-la pour votre environnement.
   Consultez le [fichier d'exemple hbase_master.d/conf.yaml][10] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande `status` de l'Agent][10] et cherchez `hbase_master` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "hbase_master" >}}


### Événements

Le check Hbase_master n'inclut aucun événement.

### Checks de service

Le check Hbase_master n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].




## Intégration HBase RegionServer

## Présentation

Recueillez des métriques du service HBase RegionServer en temps réel pour :

- Visualiser et surveiller les états de HBase RegionServer
- Être informé des failovers et des événements de HBase RegionServer

## Configuration

Le check HBase RegionServer n'est **PAS** inclus dans le package de l'[Agent Datadog][4].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check HBase RegionServer sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][1] pour installer des checks avec une [version < 6.8 de l'Agent][2] ou avec l'[Agent Docker][3] :

1. [Téléchargez et lancez l'Agent Datadog][4].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-hbase_regionserver==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `hbase_regionserver.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#metriques) HBase RegionServer. Consultez le [fichier d'exemple hbase_regionserver.d/conf.yaml][12] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `hbase_regionserver.d/conf.yaml` pour commencer à recueillir vos logs Hbase_regionserver :

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: hbase
   ```

   Modifiez la valeur du paramètre `path` et configurez-la pour votre environnement.
   Consultez le [fichier d'exemple hbase_regionserver.d/conf.yaml[12] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][9].

## Validation

[Lancez la sous-commande `status` de l'Agent][10] et cherchez `hbase_regionserver` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "hbase_regionserver" >}}


### Événements

Le check HBase RegionServer n'inclut aucun événement.

### Checks de service

Le check HBase RegionServer n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].


[1]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/conf.yaml.example
[8]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/metrics.yaml
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[11]: http://docs.datadoghq.com/help
[12]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/datadog_checks/hbase_regionserver/data/conf.yaml.example