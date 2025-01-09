---
app_id: hbase-master
app_uuid: e53ed650-6454-4f69-abfc-2cedd35ec2c3
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hbase.master.assignmentmanager.rit_oldest_age
      metadata_path: metadata.csv
      prefix: hbase.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: HBase master
  logs:
    source: hbase
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: unknown
  sales_email: everpeace@gmail.com
  support_email: everpeace@gmail.com
categories:
- data store
- log collection
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hbase_master/README.md
display_on_public_website: true
draft: false
git_integration_title: hbase_master
integration_id: hbase-master
integration_title: Hbase Master
integration_version: 1.1.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: hbase_master
public_title: Hbase Master
short_description: Intégration de HBase Master.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Store
  - Category::Log Collection
  configuration: README.md#Setup
  description: Intégration de HBase Master.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Hbase Master
---



## Présentation

Recueillez des métriques du service Hbase_master en temps réel pour :

- Visualiser et surveiller les états de Hbase_master
- Être informé des failovers et des événements de Hbase_master

## Configuration

Le check Hbase_master n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Hbase_master sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-hbase_master==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `hbase_master.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#metriques) Hbase_master. Consultez le [fichier d'exemple hbase_master.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

    **REMARQUE** : si vous utilisez l'Agent v6, assurez-vous de bien modifier le fichier [`hbase_master.d/metrics.yaml`][6] et de placer les clés booléennes entre guillemets.

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

2. [Redémarrez l'Agent][7].

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
   Consultez le [fichier d'exemple hbase_master.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][7].

### Validation

Lancez la [sous-commande status de l'Agent][8] et cherchez `hbase_master` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "hbase_master" >}}


### Événements

Le check Hbase_master n'inclut aucun événement.

### Checks de service

Le check Hbase_master n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].




## Intégration HBase RegionServer

## Présentation

Recueillez des métriques du service HBase RegionServer en temps réel pour :

- Visualiser et surveiller les états de HBase RegionServer
- Être informé des failovers et des événements de HBase RegionServer

## Configuration

Le check HBase RegionServer n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check HBase RegionServer sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-hbase_regionserver==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `hbase_regionserver.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#metriques) HBase RegionServer. Consultez le [fichier d'exemple hbase_regionserver.d/conf.yaml][10] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][7].

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
   Consultez le [fichier d'exemple hbase_regionserver.d/conf.yaml[10] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][7].

## Validation

Lancez la [sous-commande status de l'Agent][8] et cherchez `hbase_regionserver` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "hbase_regionserver" >}}


### Événements

Le check HBase RegionServer n'inclut aucun événement.

### Checks de service

Le check HBase RegionServer n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/conf.yaml.example
[6]: https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/metrics.yaml
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[9]: http://docs.datadoghq.com/help
[10]: https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/datadog_checks/hbase_regionserver/data/conf.yaml.example