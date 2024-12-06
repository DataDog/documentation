---
app_id: nvml
app_uuid: 2c7a8b1e-9343-4b4a-bada-5091e37c4806
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nvml.device_count
      metadata_path: metadata.csv
      prefix: nvml.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10177
    source_type_name: nvml
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ia/ml
- kubernetes
- sistema operativo y sistema
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nvml/README.md
display_on_public_website: true
draft: false
git_integration_title: nvml
integration_id: nvml
integration_title: Nvidia NVML
integration_version: 1.0.9
is_public: true
manifest_version: 2.0.0
name: nvml
public_title: Nvidia NVML
short_description: Admite métricas de GPU Nvidia en k8s
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Kubernetes
  - Category::OS & System
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Admite métricas de GPU Nvidia en k8s
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nvidia NVML
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza métricas de [NVIDIA Management Library (NVML)][1] expuestas a través del Datadog Agent y puede correlacionarlas con los [dispositivos expuestos de Kubernetes][2].

## Configuración

El check de NVML no está incluido en el paquete del [Datadog Agent][3], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21+/v6.21+, sigue las instrucciones a continuación para instalar el check de NVML en tu host. Consulta [Usar integraciones de comunidad][4] para realizar la instalación con Agent de Docker o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   Para Linux:
   ```shell
   datadog-agent integration install -t datadog-nvml==<INTEGRATION_VERSION>
   # You may also need to install dependencies since those aren't packaged into the wheel
   sudo -u dd-agent -H /opt/datadog-agent/embedded/bin/pip3 install grpcio pynvml
   ```
   Para Windows (con Powershell ejecutado como administrador):
   ```shell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration install -t datadog-nvml==<INTEGRATION_VERSION>
   # You may also need to install dependencies since those aren't packaged into the wheel
   & "$env:ProgramFiles\Datadog\Datadog Agent\embedded3\python" -m pip install grpcio pynvml
   ```

2. Configura tu integración como si fuese una [integración][5] de base.

Si utilizas Docker, existe un [archivo Docker de ejemplo][6] en el repositorio NVML.

   ```shell
   docker build -t dd-agent-nvml .
   ```

Si utilizas Docker y Kubernetes, deberás exponer las variables de entorno `NVIDIA_VISIBLE_DEVICES` y `NVIDIA_DRIVER_CAPABILITIES`. Consulta el archivo Docker incluido para ver un ejemplo.

Para correlacionar los dispositivos reservados de NVIDIA Kubernetes con el pod de Kubernetes que utiliza el dispositivo, monta el socket de dominio de Unix `/var/lib/kubelet/pod-resources/kubelet.sock` en tu configuración del Agent. Más información sobre este socket en el [sitio web de Kubernetes][2]. **Nota**: Este dispositivo tiene compatibilidad en fase beta para la versión 1.15.

### Configuración

1. Edita el archivo `nvml.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de NVML. Consulta el [nvml.d/conf.yaml de ejemplo][7] para todas las opciones disponibles de configuración.

2. [Reinicia el Agent][8].

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `nvml` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "nvml" >}}
 La documentación autorizada de métricas se encuentra en el [sitio web de NVIDIA][11].

Se ha intentado, en la medida de lo posible, que los nombres de métrica coincidan con el exportador [Data Center GPU Manager (DCGM)][12] de NVIDIA.

### Eventos

NVML no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "nvml" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][14].


[1]: https://pypi.org/project/pynvml/
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/#monitoring-device-plugin-resources
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/es/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/nvml/tests/Dockerfile
[7]: https://github.com/DataDog/integrations-extras/blob/master/nvml/datadog_checks/nvml/data/conf.yaml.example
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/nvml/metadata.csv
[11]: https://docs.nvidia.com/deploy/nvml-api/group__nvmlDeviceQueries.html
[12]: https://github.com/NVIDIA/dcgm-exporter
[13]: https://github.com/DataDog/integrations-extras/blob/master/nvml/assets/service_checks.json
[14]: https://docs.datadoghq.com/es/help