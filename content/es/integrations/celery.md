---
app_id: celery
categories:
- recopilación de logs
- colas de mensajes
custom_kind: integración
description: Monitoriza la salud y el rendimiento de los workers Celery.
integration_version: 2.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Celery
---
## Información general

Este check monitoriza [Celery](https://docs.celeryq.dev/en/stable/userguide/monitoring.html) a través del Datadog Agent. Celery es un sistema distribuido de colas de tareas que permite el procesamiento asíncrono de tareas en aplicaciones Python.

La integración con Celery proporciona información valiosa sobre tu sistema de colas de tareas:

- Monitorizando la salud, el estado y las métricas de ejecución de tareas de los workers.
- Realizando un seguimiento de las frecuencias de procesamiento de tareas, el tiempo de ejecución y los tiempos de precarga.
- Proporcionando visibilidad del rendimiento de los workers y de la distribución de tareas.
- Ayudando a identificar los cuellos de botella y optimizando la eficiencia del procesamiento de tareas.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Celery está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Requisitos previos

1. Instala y configura [Celery Flower](https://flower.readthedocs.io/en/latest/prometheus-integration.html), la herramienta de monitorización y administración web en tiempo real de [Celery](https://docs.celeryq.dev/en/stable/userguide/monitoring.html).

### Configuración

1. Edita el archivo `celery.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Celery. Consulta el [ejemplo celery.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/celery/datadog_checks/celery/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     ## @param openmetrics_endpoint - string - required
     ## Endpoint exposing the Celery Flower's Prometheus metrics
     #
     - openmetrics_endpoint: http://localhost:5555/metrics
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `celery` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **celery.flower.events.count** <br>(count) | Recuento de eventos Celery desde el último envío.<br>_Se muestra como evento_ |
| **celery.flower.events.created** <br>(gauge) | Número de eventos Celery creados.<br>_Se muestra como evento_ |
| **celery.flower.task.prefetch_time.seconds** <br>(gauge) | Tiempo que las tareas esperan en el worker antes de su ejecución.<br>_Se muestra en segundos_ |
| **celery.flower.task.runtime.created** <br>(gauge) | Marca de tiempo de creación del tiempo de ejecución de la tarea.<br>_Se muestra en segundos_ |
| **celery.flower.task.runtime.seconds.bucket** <br>(count) | Número de observaciones dentro de cada bucket de distribución del tiempo de ejecución de la tarea.|
| **celery.flower.task.runtime.seconds.count** <br>(count) | Duración del tiempo de ejecución de la tarea.<br>_Se muestra en segundos_ |
| **celery.flower.task.runtime.seconds.sum** <br>(count) | Duración total del tiempo de ejecución de la tarea.<br>_Se muestra en segundos_ |
| **celery.flower.worker.executing_tasks** <br>(gauge) | Número de tareas que se están ejecutando actualmente en un worker.<br>_Se muestra como tarea_ |
| **celery.flower.worker.online** <br>(gauge) | Estado online del worker (1 para online, 0 para offline)|
| **celery.flower.worker.prefetched_tasks** <br>(gauge) | Número de tareas precargadas en un worker.<br>_Se muestra como tarea_ |

### Eventos

La integración de Celery no incluye eventos.

### Checks de servicio

**celery.flower.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de Celery OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).