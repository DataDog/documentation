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
is_public: true
kind: integration
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

Ce package n'est **PAS** inclus dans le package de l'[Agent Datadog][3].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][4] pour installer des checks avec une [version < 6.8 de l'Agent][5] ou avec l'[Agent Docker][6] :

1. [Téléchargez et lancez l'Agent Datadog][3].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-nvml==<INTEGRATION_VERSION>
   # You may also need to install dependencies since those aren't packaged into the wheel
   sudo -u dd-agent -H /opt/datadog-agent/embedded/bin/pip3 install grpcio pynvml
   ```

Si vous utilisez Docker, il existe un [exemple de Dockerfile][7] dans le référentiel NVML.

   ```shell
   docker build --build-arg=DD_AGENT_VERSION=7.18.0 .
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][8].

8. Si vous utilisez Docker et Kubernetes, vous devrez exposer les variables d'environnement `NVIDIA_VISIBLE_DEVICES` et `NVIDIA_DRIVER_CAPABILITIES`. Consultez le Dockerfile inclus pour obtenir un exemple.

9. Si vous souhaitez pouvoir mettre en corrélation des appareils Nvidia Kubernetes réservés avec le pod Kubernetes utilisant l'appareil, montez le socket de domaine Unix `/var/lib/kubelet/pod-resources/kubelet.sock` sur la configuration de votre Agent.
De plus amples informations sur ce socket sont disponibles sur le [site Web de Kubernetes][2]. Notez que la prise en charge de cet appareil est en bêta dans la version 1.15.

### Configuration

1. Modifiez le fichier `nvml.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance NVML. Consultez le [fichier d'exemple nvml.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `nvml` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "nvml" >}}
  La documentation de référence relative aux métriques se trouve sur le [site Web de NVIDIA][12].

Lorsque cela est possible, les noms de métriques sont mis en correspondance avec [l'exportateur Data Center GPU Manager (DCGM)][14] de NVIDIA.

### Événements

NVML n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "nvml" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][14].


[14]:https://github.com/NVIDIA/gpu-monitoring-tools/blob/master/exporters/prometheus-dcgm/dcgm-exporter/dcgm-exporter
[1]: https://pypi.org/project/pynvml/
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/#monitoring-device-plugin-resources
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[6]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[7]: https://github.com/DataDog/integrations-extras/blob/master/nvml/tests/Dockerfile
[8]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/nvml/metadata.csv
[12]: https://docs.nvidia.com/deploy/nvml-api/group__nvmlDeviceQueries.html
[13]: https://github.com/DataDog/integrations-extras/blob/master/nvml/assets/service_checks.json
[14]: https://docs.datadoghq.com/fr/help