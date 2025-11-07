---
app_id: nvml
categories:
- ia/ml
- kubernetes
- sistema operativo y sistema
custom_kind: integración
description: Admite métricas de GPU Nvidia en k8s
integration_version: 1.0.9
media: []
supported_os:
- linux
- windows
- macos
title: Nvidia NVML
---
## Información general

Este check monitoriza las métricas expuestas de [NVIDIA Management Library (NVML)](https://pypi.org/project/pynvml/) a través del Datadog Agent y puede correlacionarlas con los [dispositivos expuestos de Kubernetes](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/#monitoring-device-plugin-resources).

## Configuración

El check de NVML no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21+ / v6.21+, sigue las instrucciones siguientes para instalar el check de NVML en tu host. Consulta [Usar integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para realizar la instalación con el Docker Agent o versiones anteriores del Agent.

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

1. Configura tu integración de forma similar a las [integraciones](https://docs.datadoghq.com/getting_started/integrations/) centrales.

Si utilizas Docker, hay un [Dockerfile de ejemplo](https://github.com/DataDog/integrations-extras/blob/master/nvml/tests/Dockerfile) en el repositorio de NVML.

```shell
docker build -t dd-agent-nvml .
```

Si utilizas Docker y Kubernetes, deberás exponer las variables de entorno `NVIDIA_VISIBLE_DEVICES` y `NVIDIA_DRIVER_CAPABILITIES`. Consulta el archivo Docker incluido para ver un ejemplo.

Para correlacionar los dispositivos NVIDIA reservados de Kubernetes con el pod de Kubernetes que utiliza el dispositivo, monta el socket de dominio Unix `/var/lib/kubelet/pod-resources/kubelet.sock` en tu configuración del Agent. Encontrarás más información sobre este socket en el sitio web de [Kubernetes](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/#monitoring-device-plugin-resources). **Nota**: Este dispositivo está en soporte beta para la versión 1.15.

### Configuración

1. Edita el archivo `nvml.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de NVML. Consulta [el nvml.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-extras/blob/master/nvml/datadog_checks/nvml/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `nvml` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **nvml.device_count** <br>(gauge) | Número de GPU en esta instancia.|
| **nvml.gpu_utilization** <br>(gauge) | Porcentaje de tiempo durante el último periodo de muestreo en el que uno o más kernels se ejecutaron en la GPU.<br>_Se muestra como porcentaje_ |
| **nvml.mem_copy_utilization** <br>(gauge) | Porcentaje de tiempo durante el último periodo de muestreo en el que la memoria global (dispositivo) se estaba leyendo o escribiendo.<br>_Se muestra como porcentaje_ |
| **nvml.fb_free** <br>(gauge) | Memoria FB no asignada.<br>_Se muestra como byte_ |
| **nvml.fb_used** <br>(gauge) | Memoria FB asignada.<br>_Se muestra como byte_ |
| **nvml.fb_total** <br>(gauge) | Memoria FB total instalada.<br>_Se muestra como byte_ |
| **nvml.power_usage** <br>(gauge) | Consumo de energía de esta GPU en milivatios y sus circuitos asociados (por ejemplo, la memoria).|
| **nvml.total_energy_consumption** <br>(count) | Consumo total de energía de esta GPU en milijulios (mJ) desde la última recarga del controlador.|
| **nvml.enc_utilization** <br>(gauge) | Utilización actual del codificador<br>_Se muestra en porcentaje_ |
| **nvml.dec_utilization** <br>(gauge) | La utilización actual del decodificador<br>_Se muestra en porcentaje_. |
| **nvml.pcie_tx_throughput** <br>(gauge) | Utilización de PCIe TX<br>_Se muestra como kibibyte_ |
| **nvml.pcie_rx_throughput** <br>(gauge) | Utilización de PCIe RX<br>_Se muestra como kibibyte_ |
| **nvml.temperature** <br>(gauge) | Temperatura actual de esta GPU en grados centígrados|
| **nvml.fan_speed** <br>(gauge) | Utilización actual del ventilador<br>_Se muestra en porcentaje_ |
| **nvml.compute_running_process** <br>(gauge) | El uso actual de la memoria gpu por el proceso<br>_Se muestra como byte_ |

### Eventos

NVML no incluye eventos.

### Checks de servicio

Consulta [service_checks.json](https://github.com/DataDog/integrations-extras/blob/master/nvml/assets/service_checks.json) para obtener una lista de los checks de servicio proporcionados por esta integración.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help).