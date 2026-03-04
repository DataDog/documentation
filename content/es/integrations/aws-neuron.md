---
aliases:
- /es/integrations/aws_neuron
app_id: aws-neuron
categories:
- ia/ml
- aws
- nube
- recopilación de logs
custom_kind: integración
description: Monitoriza el rendimiento y el uso de las instancias de AWS Inferentia/Trainium
  y el SDK Neuron.
integration_version: 3.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Monitorización AWS Inferentia y AWS Trainium
---
## Información general

Este check monitoriza [AWS Neuron](https://awsdocs-neuron.readthedocs-hosted.com/en/latest/index.html) a través del Datadog Agent. Habilita la monitorización de los dispositivos Inferentia y Trainium y proporciona información sobre el rendimiento de tu modelo de Machine Learning.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en una instancia EC2. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de AWS Neuron está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).

También necesitas instalar el paquete de [herramientas de AWS Neuron](https://awsdocs-neuron.readthedocs-hosted.com/en/latest/tools/index.html).

No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Métricas

1. Asegúrate de que [Neuron Monitor](https://awsdocs-neuron.readthedocs-hosted.com/en/latest/tools/neuron-sys-tools/neuron-monitor-user-guide.html#using-neuron-monitor-prometheus-py) se está utilizando para exponer el endpoint de Prometheus.

1. Edita el archivo `aws_neuron.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent](https://docs.datadoghq.com/agent/configuration/agent-configuration-files/#agent-configuration-directory) para empezar a recopilar tus datos de rendimiento de AWS Neuron. Consulta el [ejemplo de aws_neuron.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/aws_neuron/datadog_checks/aws_neuron/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Logs

La integración AWS Neuron puede recopilar logs de los contenedores Neuron y reenviarlos a Datadog.

{{< tabs >}}

{{% tab "Host" %}}

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Descomenta y edita el bloque de configuración de logs en tu archivo `aws_neuron.d/conf.yaml`. A continuación podrás ver un ejemplo:

   ```yaml
   logs:
     - type: docker
       source: aws_neuron
       service: aws_neuron
   ```

{{% /tab %}}

{{% tab "Kubernetes" %}}

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/#setup).

A continuación, configura las integraciones de logs como anotaciones de pod. Esto también se puede configurar con un archivo, un configmap o un almacén clave-valor. Para obtener más información, consulte la sección de configuración de [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/#configuration).

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `aws_neuron` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws_neuron.execution.errors.count** <br>(count) | Total de errores de ejecución|
| **aws_neuron.execution.errors_created** <br>(gauge) | Total de errores de ejecución|
| **aws_neuron.execution.latency_seconds** <br>(gauge) | Latencia de ejecución en segundos<br>_Se muestra como segundos_ |
| **aws_neuron.execution.status.count** <br>(count) | Estado de ejecución total|
| **aws_neuron.execution.status_created** <br>(gauge) | Estado de ejecución total|
| **aws_neuron.hardware_ecc_events.count** <br>(count) | Total de eventos de hardware ecc|
| **aws_neuron.hardware_ecc_events_created** <br>(gauge) | Total de eventos de hardware ecc|
| **aws_neuron.instance_info** <br>(gauge) | Información sobre la instancia EC2|
| **aws_neuron.neuron_hardware_info** <br>(gauge) | Información sobre el hardware de Neuron|
| **aws_neuron.neuron_runtime.memory_used_bytes** <br>(gauge) | Bytes utilizados por la memoria en tiempo de ejecución<br>_Se muestra como bytes_ |
| **aws_neuron.neuron_runtime.vcpu_usage_ratio** <br>(gauge) | Proporción de uso de vCPU en tiempo de ejecución<br>_Se muestra como fracción_ |
| **aws_neuron.neuroncore.memory_usage.constants** <br>(gauge) | Uso de memoria NeuronCore para constantes<br>_Se muestra como bytes_ |
| **aws_neuron.neuroncore.memory_usage.model.code** <br>(gauge) | Uso de memoria NeuronCore para model_code<br>_Se muestra como bytes_ |
| **aws_neuron.neuroncore.memory_usage.model.shared_scratchpad** <br>(gauge) | Uso de memoria NeuronCore para model_shared_scratchpad<br>_Se muestra como bytes_ |
| **aws_neuron.neuroncore.memory_usage.runtime_memory** <br>(gauge) | Uso de memoria NeuronCore para runtime_memory<br>_Se muestra como bytes_ |
| **aws_neuron.neuroncore.memory_usage.tensors** <br>(gauge) | Uso de memoria NeuronCore para tensores<br>_Se muestra como bytes_ |
| **aws_neuron.neuroncore.utilization_ratio** <br>(gauge) | Proporción de uso de NeuronCore<br>_Se muestra como fracción_ |
| **aws_neuron.process.cpu_seconds.count** <br>(count) | Tiempo total de CPU del usuario y del sistema transcurrido en segundos.<br>_Se muestra como segundos_ |
| **aws_neuron.process.max_fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos.|
| **aws_neuron.process.open_fds** <br>(gauge) | Número de descriptores de archivo abiertos.|
| **aws_neuron.process.resident_memory_bytes** <br>(gauge) | Tamaño de la memoria residente en bytes.<br>_Se muestra como bytes_ |
| **aws_neuron.process.start_time_seconds** <br>(gauge) | Hora de inicio del proceso desde unix epoch en segundos.<br>_Se muestra como segundos_ |
| **aws_neuron.process.virtual_memory_bytes** <br>(gauge) | Tamaño de la memoria virtual en bytes.<br>_Se muestra como bytes_ |
| **aws_neuron.python_gc.collections.count** <br>(count) | Número de veces que se ha recopilado esta generación|
| **aws_neuron.python_gc.objects_collected.count** <br>(count) | Objetos recopilados durante la recolección de basura|
| **aws_neuron.python_gc.objects_uncollectable.count** <br>(count) | Objetos no recolectables encontrados durante la recolección de basura|
| **aws_neuron.python_info** <br>(gauge) | Información sobre la plataforma Python|
| **aws_neuron.system.memory.total_bytes** <br>(gauge) | Bytes de memoria del sistema total_bytes<br>_Se muestra como bytes_ |
| **aws_neuron.system.memory.used_bytes** <br>(gauge) | Bytes de memoria del sistema used_bytes<br>_Se muestra como bytes_ |
| **aws_neuron.system.swap.total_bytes** <br>(gauge) | Bytes de memoria de intercambio total_bytes<br>_Se muestra como bytes_ |
| **aws_neuron.system.swap.used_bytes** <br>(gauge) | Bytes de memoria de intercambio used_bytes<br>_Se muestra como bytes_ |
| **aws_neuron.system.vcpu.count** <br>(gauge) | Recuento de vCPU del sistema|
| **aws_neuron.system.vcpu.usage_ratio** <br>(gauge) | Proporción de uso de CPU del sistema<br>_Se muestra como fracción_ |

### Eventos

La integración AWS Neuron no incluye eventos.

### Checks de servicio

**aws_neuron.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics de Neuron Monitor, en caso contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

En entornos en contenedores, asegúrate de que el Agent tiene acceso de red a los endpoints especificados en el archivo `aws_neuron.d/conf.yaml`.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).