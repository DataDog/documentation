---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    azure_iot_edge: assets/dashboards/overview.json
  logs:
    source: azure.iot_edge
  metrics_metadata: metadata.csv
  monitors:
    Disk usage: assets/monitors/disk_usage.json
    Edge Hub retries: assets/monitors/edgehub_retries.json
    IoT Hub syncs: assets/monitors/iothub_syncs.json
    Memory usage: assets/monitors/memory_usage.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - azure
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/README.md'
display_name: Azure IoT Edge
draft: false
git_integration_title: azure_iot_edge
guid: 9eafeab9-daf4-4f54-befc-fcc623ec9c1b
integration_id: azure-iot-edge
integration_title: Azure IoT Edge
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: azure.iot_edge.
metric_to_check: azure.iot_edge.edge_agent.iotedged_uptime_seconds
name: azure_iot_edge
public_title: Intégration Datadog/Azure IoT Edge
short_description: Surveillez les performances et la santé d'un appareil Azure IoT Edge et de ses modules.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

[Azure IoT Edge][1] est un service entièrement géré qui permet de déployer des charges de travail Cloud pour les exécuter sur des appareils Internet of Things (IoT) Edge par le biais de conteneurs standard.

Utilisez l'intégration Datadog/Azure IoT Edge pour recueillir les métriques et les statuts de santé d'appareils IoT Edge.

**Remarque** : cette intégration nécessite la version 1.0.10 ou une version ultérieure du runtime IoT Edge.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsqu'un appareil IoT Edge est exécuté sur un host d'appareil.

### Installation

Le check Azure IoT Edge est inclus avec le package de l'[Agent Datadog][2].

Vous n'avez donc rien d'autre à installer sur votre appareil.

### Configuration

Configurez l'appareil IoT Edge de façon à ce que l'Agent soit exécuté en tant que module personnalisé. Suivez la documentation Microsoft sur [le déploiement de modules Azure IoT Edge][3] pour en savoir plus sur l'installation et l'utilisation des modules personnalisés pour Azure IoT Edge.

Suivez les étapes ci-dessous pour configurer l'appareil IoT Edge, les modules de runtime et l'Agent Datadog et ainsi commencer à recueillir des métriques IoT Edge.

1. Configurez le module de runtime **Edge Agent** comme suit :
    - La version de l'image doit être `1.0.10` ou une version ultérieure.
    - Sous « Create Options », ajoutez les étiquettes `Labels` suivantes. Modifiez l'étiquette `com.datadoghq.ad.instances` en fonction de votre cas. Consultez l'[exemple de fichier azure_iot_edge.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles. Consultez la documentation [Intégrations Autodiscovery avec Docker][5] pour en savoir plus sur la configuration d'intégrations à l'aide d'étiquettes.

        ```json
        "Labels": {
            "com.datadoghq.ad.check_names": "[\"azure_iot_edge\"]",
            "com.datadoghq.ad.init_configs": "[{}]",
            "com.datadoghq.ad.instances": "[{\"edge_hub_prometheus_url\": \"http://edgeHub:9600/metrics\", \"edge_agent_prometheus_url\": \"http://edgeAgent:9600/metrics\"}]"
        }
        ```

    - Sous « Environment Variables », activez les métriques expérimentales en ajoutant ces variables d'environnement (notez les doubles underscores) :
        - `ExperimentalFeatures__Enabled`: `true`
        - `ExperimentalFeatures__EnableMetrics`: `true`

2. Configurez le module de runtime **Edge Hub** comme suit :
    - La version de l'image doit être `1.0.10` ou une version ultérieure.
    - Sous « Environment Variables », activez les métriques expérimentales en ajoutant ces variables d'environnement (notez les doubles underscores) :
        - `ExperimentalFeatures__Enabled`: `true`
        - `ExperimentalFeatures__EnableMetrics`: `true`

3. Installez et configurez l'Agent Datadog en tant que **module personnalisé** :
    - Définissez le nom du module. Par exemple : `datadog-agent`.
    - Définissez l'URI de l'image de l'Agent. Par exemple : `gcr.io/datadoghq/agent:7`.
    - Sous « Environment Variables », configurez votre `DD_API_KEY`. Vous pouvez également définir d'autres paramètres de configuration ici (voir [Variables d'environnement de l'Agent][6]).
    - Sous « Container Create Options », ajoutez la configuration suivante en fonction du système d'exploitation de votre appareil. **Remarque** : `NetworkId` doit correspondre au nom de réseau défini dans le fichier `config.yaml` de l'appareil.

        - Linux :
            ```json
            {
                "HostConfig": {
                    "NetworkMode": "default",
                    "Env": ["NetworkId=azure-iot-edge"],
                    "Binds": ["/var/run/docker.sock:/var/run/docker.sock"]
                }
            }
            ```
        - Windows :
            ```json
            {
                "HostConfig": {
                    "NetworkMode": "default",
                    "Env": ["NetworkId=nat"],
                    "Binds": ["//./pipe/iotedge_moby_engine:/./pipe/docker_engine"]
                }
            }
            ```

    - Enregistrez le module personnalisé de l'Agent Datadog.

4. Enregistrez et déployez les modifications apportées à la configuration de votre appareil.

#### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer en configurant le module personnalisé de l'Agent Datadog :
    - Sous « Environment Variables », définissez la variable d'environnement `DD_LOGS_ENABLED` :

        ```yaml
        DD_LOGS_ENABLED: true
        ```

2. Configurez les modules **Edge Agent** et **Edge Hub**. Sous « Create Options », ajoutez l'étiquette suivante :

    ```json
    "Labels": {
        "com.datadoghq.ad.logs": "[{\"source\": \"azure.iot_edge\", \"service\": \"<SERVICE>\"}]",
        "...": "..."
    }
    ```

    Modifiez le `service` en fonction de votre environnement.

    Répétez cette opération pour tous les autres modules personnalisés dont vous souhaitez recueillir les logs.

3. Enregistrez et déployez les modifications apportées à la configuration de votre appareil.

### Validation

Une fois l'Agent déployé sur l'appareil, [lancez la sous-commande status de l'Agent][7] et cherchez `azure_iot_edge` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_iot_edge" >}}


### Checks de service

**azure.iot_edge.edge_agent.prometheus.health** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'endpoint Prometheus des métriques de l'Edge Agent. Dans le cas contraire, renvoie `OK`.

**azure.iot_edge.edge_hub.prometheus.health** :<br>
Renvoie  `CRITICAL` si l'Agent ne parvient pas à se connecter à l'endpoint de Prometheus des métriques de l'Edge Hub. Dans le cas contraire, renvoie `OK`.

### Événements

Azure IoT Edge n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

- [Surveiller Azure IoT Edge avec Datadog][10]

[1]: https://azure.microsoft.com/en-us/services/iot-edge/
[2]: https://docs.datadoghq.com/fr/agent/
[3]: https://docs.microsoft.com/en-us/azure/iot-edge/how-to-deploy-modules-portal
[4]: https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/datadog_checks/azure_iot_edge/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/docker/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/environment-variables/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/
[10]: https://www.datadoghq.com/blog/monitor-azure-iot-edge-with-datadog/