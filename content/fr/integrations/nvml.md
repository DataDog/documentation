---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/nvml/README.md
display_name: nvml
draft: false
git_integration_title: nvml
guid: 5e997a76-f6a3-48e8-875f-6fbb2559f9e9
integration_id: nvml
integration_title: Nvidia NVML
integration_version: 1.0.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: nvml.
metric_to_check: nvml.device_count
name: nvml
public_title: Nvidia NVML
short_description: Prise en charge des métriques de GPU Nvidia dans Kubernetes
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller les métriques exposées par la bibliothèque [NVIDIA Management Library (NVML)][1] avec l'Agent Datadog, puis de les mettre en corrélation avec les [appareils Kubernetes exposés][2].

## Configuration

Le check NVML n'est pas inclus avec le package de l'[Agent Datadog][3] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check NVML sur votre host. Consultez la section [Utiliser les intégrations de la communauté][4] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-nvml==<INTEGRATION_VERSION>
   # You may also need to install dependencies since those aren't packaged into the wheel
   sudo -u dd-agent -H /opt/datadog-agent/embedded/bin/pip3 install grpcio pynvml
   ```

2. Configurez votre intégration comme une [intégration][5] de base.

Si vous utilisez Docker, il existe un [exemple de Dockerfile][6] dans le référentiel NVML.

   ```shell
   docker build --build-arg=DD_AGENT_VERSION=7.18.0 .
   ```

Si vous utilisez Docker et Kubernetes, vous devez exposer les variables d'environnement `NVIDIA_VISIBLE_DEVICES` et `NVIDIA_DRIVER_CAPABILITIES`. Consultez le Dockerfile inclus pour obtenir un exemple.

Pour mettre en corrélation des appareils Nvidia Kubernetes réservés avec le pod Kubernetes utilisant l'appareil, montez le socket de domaine Unix `/var/lib/kubelet/pod-resources/kubelet.sock` sur la configuration de votre Agent. De plus amples informations sur ce socket sont disponibles sur le [site Web de Kubernetes][2] (en anglais). **Remarque** : la prise en charge de cet appareil est en bêta dans la version 1.15.

### Configuration

1. Modifiez le fichier `nvml.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance NVML. Consultez le [fichier d'exemple nvml.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `nvml` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "nvml" >}}
 La documentation de référence relative aux métriques se trouve sur le [site Web de Nvidia][11] (en anglais).

Lorsque cela est possible, les noms de métriques sont mis en correspondance avec [l'exportateur Data Center GPU Manager (DCGM)][14] de Nvidia.

### Événements

NVML n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "nvml" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].


[14]:https://github.com/NVIDIA/gpu-monitoring-tools/blob/master/exporters/prometheus-dcgm/dcgm-exporter/dcgm-exporter
[1]: https://pypi.org/project/pynvml/
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/#monitoring-device-plugin-resources
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/nvml/tests/Dockerfile
[7]: https://github.com/DataDog/integrations-extras/blob/master/nvml/datadog_checks/nvml/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/nvml/metadata.csv
[11]: https://docs.nvidia.com/deploy/nvml-api/group__nvmlDeviceQueries.html
[12]: https://github.com/DataDog/integrations-extras/blob/master/nvml/assets/service_checks.json
[13]: https://docs.datadoghq.com/fr/help