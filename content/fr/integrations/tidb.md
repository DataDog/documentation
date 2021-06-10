---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    overview: assets/dashboards/one-screen-overview.json
  logs:
    service: tidb
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
  - cloud
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/tidb/README.md'
display_name: TiDB
draft: false
git_integration_title: tidb
guid: 4b34acac-39ce-4ec4-9329-c68cc4e61279
integration_id: tidb
integration_title: TiDB
is_public: true
kind: integration
maintainer: xuyifan02@pingcap.com
manifest_version: 1.0.0
metric_prefix: tidb_cluster
metric_to_check: tidb_cluster.tidb.server_connections
name: tidb
public_title: TiDB
short_description: L'intégration pour le cluster TiDB
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Associez le cluster [TiDB][1] à Datadog pour :

- Recueillir des métriques TiDB clés sur votre cluster
- Recueillir les logs de votre cluster, notamment les logs TiDB/TiKV/TiFlash et les logs sur les requêtes lentes
- Visualiser les performances de votre cluster dans le dashboard fourni

> **Note:** 
>
> - Pour que cette intégration fonctionne, TiDB 4.0 ou ultérieur est requis. 
> - TiDB Cloud ne peut actuellement pas être intégré à Datadog.

## Configuration

### Installation

Commencez par [télécharger et lancer l'Agent Datadog][2].

Installez ensuite manuellement le check TiDB. [Les instructions varient en fonction de votre environnement][3].

> Version actuelle de l'intégration TiDB : `1.0.0`

#### Host

Exécutez `datadog-agent integration install -t datadog-tidb==<VERSION_INTÉGRATION>`.

#### Environnement conteneurisé

Le meilleur moyen d'utiliser une intégration avec l'Agent Docker est de générer une image de l'Agent avec cette intégration installée. Utilisez le Dockerfile suivant pour créer une version mise à jour de l'Agent :

```dockerfile
FROM gcr.io/datadoghq/agent:latest

ARG INTEGRATION_VERSION=1.0.0

RUN agent integration install -r -t datadog-tidb==${INTEGRATION_VERSION}
```

Créez l'image et envoyez-la vers votre registre Docker privé.

Mettez ensuite à niveau l'image du conteneur de l'Agent Datadog. Si vous utilisez le chart Helm, modifiez la section `agents.image` du fichier `values.yaml` pour remplacer l'image de l'Agent par défaut :

```yaml
agents:
  enabled: true
  image:
    tag: <NOUVEAU_TAG>
    repository: <VOTRE_RÉFÉRENTIEL_PRIVÉ>/<NOM_AGENT>
```

Utilisez la nouvelle version de `values.yaml` pour mettre à niveau l'Agent :

```shell
helm upgrade -f values.yaml <NOM_VERSION> datadog/datadog
```

### Configuration

#### Host

##### Collecte de métriques

1. Modifiez le fichier `tidb.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance TiDB. Consultez le [fichier d'exemple tidb.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `tidb.d/conf.yaml` pour commencer à recueillir vos logs TiDB :

   ```yaml
     logs:
      # pd log
      - type: file
        path: "/tidb-deploy/pd-2379/log/pd*.log"
        service: "tidb-cluster"
        source: "pd"

      # tikv log
      - type: file
        path: "/tidb-deploy/tikv-20160/log/tikv*.log"
        service: "tidb-cluster"
        source: "tikv"

      # tidb log
      - type: file
        path: "/tidb-deploy/tidb-4000/log/tidb*.log"
        service: "tidb-cluster"
        source: "tidb"
        exclude_paths:
          - /tidb-deploy/tidb-4000/log/tidb_slow_query.log
      - type: file
        path: "/tidb-deploy/tidb-4000/log/tidb_slow_query*.log"
        service: "tidb-cluster"
        source: "tidb"
        log_processing_rules:
          - type: multi_line
            name: new_log_start_with_datetime
            pattern: '#\sTime:'
        tags:
          - "custom_format:tidb_slow_query"

      # tiflash log
      - type: file
        path: "/tidb-deploy/tiflash-9000/log/tiflash*.log"
        service: "tidb-cluster"
        source: "tiflash"
   ```

   Modifiez les paramètres `path` et `service` en fonction de la configuration de votre cluster.

   Utilisez les commandes suivantes pour afficher le chemin de l'ensemble de vos logs :

   ```shell
   # show deploying directories
   tiup cluster display <YOUR_CLUSTER_NAME>
   # find specific logging file path by command arguments
   ps -fwwp <TIDB_PROCESS_PID/PD_PROCESS_PID/etc.>
   ```

3. [Redémarrez l'Agent][5].

#### Environnement conteneurisé

##### Collecte de métriques

Pour les environnements conteneurisés, une fois le check intégré à l'image de l'Agent Datadog, Autodiscovery est configuré par défaut.

Les métriques sont donc automatiquement transmises au serveur de Datadog.

Si vous souhaitez ignorer le comportement par défaut d'Autodiscovery, ajoutez des annotations Datadog aux pods TiDB :

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<NOM_POD>'
  annotations:
    ad.datadoghq.com/tidb.check_names: '["tidb"]'
    ad.datadoghq.com/tidb.init_configs: '[{}]'
    ad.datadoghq.com/tidb.instances: '[{"pd_metric_url": "http://%%host%%:2379/metrics", "tidb_metric_url": "http://%%host%%:10080/metrics", "tikv_metric_url": "http://%%host%%:20180/metrics"}]'
    # (...)
spec:
  containers:
    - name: 'tidb'
# (...)
```

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][6] pour en savoir plus.

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][7].

| Paramètre      | Valeur                                                  |
| -------------- | ------------------------------------------------------ |
| `<CONFIG_LOG>` | `{"source": "tidb", "service": "tidb_cluster"}` |

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `tidb` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "tidb" >}}


### Checks de service

Le check TiDB n'inclut aucun check de service.

### Événements

Le check TiDB n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://docs.pingcap.com/tidb/stable
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://github.com/DataDog/integrations-extras/blob/master/tidb/datadog_checks/tidb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/tidb/metadata.csv
[10]: https://docs.datadoghq.com/fr/help/