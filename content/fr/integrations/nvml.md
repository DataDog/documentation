---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ''
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/nvml/README.md'
display_name: nvml
git_integration_title: nvml
guid: 5e997a76-f6a3-48e8-875f-6fbb2559f9e9
integration_id: nvml
integration_title: nvml
is_public: false
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: nvml.
metric_to_check: nvml.device_count
name: nvml
public_title: Intégration Datadog/nvml
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

Ce paquet n'est **PAS** inclus avec le paquet de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec [une version antérieure à 6.8 de l'Agent][4] ou avec l'[Agent Docker][5] :

1. Installez le [kit de développement][6].
2. Clonez le dépôt `integrations-extras` :

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. Pour générer le paquet `nvml`, exécutez :

   ```shell
   ddev -e release build nvml
   ```

5. [Téléchargez et lancez l'Agent Datadog][7].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -w <PATH_OF_NVML_ARTIFACT_>/<NVML_ARTIFACT_NAME>.whl
   # You may also need to install dependencies since those aren't packaged into the wheel
   sudo -u dd-agent -H /opt/datadog-agent/embedded/bin/pip3 install grpcio pynvml
   ```

Si vous utilisez Docker, il existe un exemple de Dockerfile dans le référentiel NVML.

   ```shell
   docker build --build-arg=DD_AGENT_VERSION=7.18.0 .
   ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][8].

8. Si vous utilisez Docker et Kubernetes, vous devrez exposer les variables d'environnement `NVIDIA_VISIBLE_DEVICES` et `NVIDIA_DRIVER_CAPABILITIES`. Consultez le Dockerfile inclus pour obtenir un exemple.

9. Si vous souhaitez être en mesure de mettre en corrélation les appareils Nvidia Kubernetes avec le pod Kubernetes utilisant l'appareil, montez le socket de domaine Unix `/var/lib/kubelet/pod-resources/kubelet.sock` dans la configuration de votre Agent.
De plus amples informations sur ce socket sont disponibles sur le [site Web de Kubernetes][2]. Notez que la prise en charge de cet appareil est en bêta dans la version 1.15.

### Configuration

1. Modifiez le fichier `nvml.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance NVML. Consultez le [fichier d'exemple nvml.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `nvml` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "nvml" >}}
  La documentation de référence relative aux métriques se trouve sur le [site Web de Nvidia][9].

Lorsque cela est possible, les noms de métriques sont mis en correspondance avec [l'exportateur Data Center GPU Manager (DCGM)][10] de NVIDIA.

### Checks de service

NVML n'inclut aucun check de service.

### Événements

NVML n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[10]:https://github.com/NVIDIA/gpu-monitoring-tools/blob/master/exporters/prometheus-dcgm/dcgm-exporter/dcgm-exporter
[1]: https://pypi.org/project/pynvml/
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/#monitoring-device-plugin-resources
[3]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[4]: https://github.com/DataDog/integrations-extras/blob/master/nvml/datadog_checks/nvml/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/nvml/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://docs.nvidia.com/deploy/nvml-api/group__nvmlDeviceQueries.html