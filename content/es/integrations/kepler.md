---
app_id: kepler
categories:
- kubernetes
custom_kind: integración
description: Ver cálculos del consumo de energía de las cargas de trabajo de Kubernetes
  desde Kepler
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Kepler
---
## Información general

Este check lleva las estimaciones de uso de energía de las cargas de trabajo de Kuberenetes de [Kepler](https://sustainable-computing.io/) a Datadog.

## Configuración

### Instalación

Para las versiones del Agent 7.21+/6.21+, sigue las instrucciones a continuación para instalar el check de Kepler en tu host. Consulta [Uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=agentv721v621) para realizar la instalación con el Docker Agent o versiones anteriores del Agent.

1. Ejecute el siguiente comando para instalar la integración:

   ```shell
   datadog-agent integration install -t datadog-kepler==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones] núcleo(https://github.com/DataDog/integrations-extras/blob/master/kepler/datadog_checks/kepler/data/conf.yaml.example).

### Configuración

1. Edita el archivo `kepler.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent para empezar a recopilar los datos de rendimiento de tu kepler. Consulta el [kepler.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-extras/blob/master/kepler/datadog_checks/kepler/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kepler` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kepler.container.usage.bpf_cpu_time.count** <br>(count) | Valor agregado en el valor bpf_cpu_time_ms de bpf|
| **kepler.container.usage.bpf_net_rx_irq.count** <br>(count) | Valor agregado en el valor bpf_net_rx_irq de bpf|
| **kepler.container.usage.bpf_net_tx_irq.count** <br>(count) | Valor agregado en el valor bpf_net_tx_irq de bpf|
| **kepler.container.usage.bpf_page_cache_hit.count** <br>(count) | Valor agregado en el valor bpf_page_cache_hit de bpf|
| **kepler.container.usage.cache_miss.count** <br>(count) | Valor agregado en el valor cache_miss de bpf|
| **kepler.container.usage.core_joules.count** <br>(count) | Valor agregado en el valor central de trained_power_model|
| **kepler.container.usage.cpu_cycles.count** <br>(count) | Valor agregado en el valor cpu_cycles de bpf|
| **kepler.container.usage.cpu_instructions.count** <br>(count) | Valor agregado en el valor cpu_instructions de bpf|
| **kepler.container.usage.dram_joules.count** <br>(count) | Valor agregado en el valor de dram de trained_power_model|
| **kepler.container.usage.gpu_joules.count** <br>(count) | Valor agregado en el valor de gpu de nvidia|
| **kepler.container.usage.joules.count** <br>(count) | Valor agregado en el valor de julios de|
| **kepler.container.usage.package_joules.count** <br>(count) | Valor agregado en el valor de paquete de trained_power_model|
| **kepler.container.usage.platform_joules.count** <br>(count) | Valor agregado en el valor de plataforma de trained_power_model|
| **kepler.container.usage.task_clock.count** <br>(count) | Valor agregado en el valor task_clock_ms de bpf|
| **kepler.container.usage.uncore_joules.count** <br>(count) | Valor agregado en el valor de uncore de trained_power_model|
| **kepler.exporter.build_info** <br>(gauge) | Una métrica con un valor constante '1' etiquetado por versión, revisión, rama, goversion desde la que se construyó kepler_exporter, y los goos y goarch para la compilación.|
| **kepler.node.usage.dram_joules.count** <br>(count) | Valor agregado en el valor dram de trained_power_model|
| **kepler.node_info.count** <br>(count) | Valor agregado en el valor de os|
| **kepler.node.usage.platform_joules.count** <br>(count) | Valor agregado en el valor de plataforma de trained_power_model|
| **kepler.node.usage.uncore_joules.count** <br>(count) | Valor agregado en el valor uncore de trained_power_model|
| **kepler.container.usage.bpf_block_irq.count** <br>(count) | Valor agregado en el valor bpf_block_irq de bpf|
| **kepler.container.usage.other_joules.count** <br>(count) | Valor agregado en otro valor de trained_power_model|
| **kepler.node.usage.core_joules.count** <br>(count) | Valor agregado en el valor central de trained_power_model|
| **kepler.node.usage.package_joules.count** <br>(count) | Valor agregado en el valor de paquete de trained_power_model|
| **kepler.promhttp.metric.handler.errors.count** <br>(count) | Número total de errores internos encontrados por el gestor de métricas promhttp.|

### Checks de servicio

**kepler.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de Kepler OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, critical_

### Eventos

Kepler no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=agentv721v621).