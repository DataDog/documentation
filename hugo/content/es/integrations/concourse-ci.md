---
aliases:
- /es/integrations/concourse_ci
app_id: concourse-ci
categories:
- automatización
custom_kind: integración
description: Recopila métricas emitidas desde Concourse CI.
media: []
supported_os:
- linux
- windows
- macos
title: Concourse-CI
---
## Información general

Configure el emisor de métricas de Datadog en Concourse CI para:

- Visualizar la duración de los pipelines, el número de contenedores y los volúmenes montados de workers.
- Identificar las solicitudes lentas para crear rutas.

## Configuración

### Instalación

El paquete de Concourse CI incluye un emisor de métricas de Datadog. Un requisito previo para configurar [ATC](https://concourse-ci.org/concepts.html) para emitir métricas al inicio es tener instalado un [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).

### Configuración

Configura ATC para utilizar el emisor de Datadog configurando las siguientes opciones. Es importante utilizar un prefijo de `concourse.ci` para evitar emitir [métricas personalizadas](https://docs.datadoghq.com/developers/metrics/custom_metrics/).

### Opciones del emisor de métricas

Consulta [Configuración de métricas](https://concourse-ci.org/metrics.html#configuring-metrics) en la documentación de Concourse CI para obtener más información.

```text
Metric Emitter (Datadog):
    --datadog-agent-host=       Datadog agent host to expose dogstatsd metrics [$CONCOURSE_DATADOG_AGENT_HOST]
    --datadog-agent-port=       Datadog agent port to expose dogstatsd metrics [$CONCOURSE_DATADOG_AGENT_PORT]
    --datadog-prefix=           Prefix for all metrics to easily find them in Datadog [$CONCOURSE_DATADOG_PREFIX]
```

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **concourse.ci.build_finished** <br>(gauge) | Duración de la compilación<br>_Se muestra en milisegundos_ |
| **concourse.ci.build_started** <br>(gauge) | ID de la compilación<br>_Se muestra como compilación_ |
| **concourse.ci.containers_created** <br>(gauge) | Número de contenedores creados<br>_Se muestra como contenedor_ |
| **concourse.ci.containers_deleted** <br>(gauge) | Número de contenedores eliminados<br>_Se muestra como contenedor_ |
| **concourse.ci.created_containers_to_be_garbage_collected** <br>(gauge) | Número de contenedores que deben recolectarse como basura<br>_Se muestra como contenedor_ |
| **concourse.ci.created_volumes_to_be_garbage_collected** <br>(gauge) | Número de volúmenes que deben recolectarse como basura<br>_Se muestra como volumen_ |
| **concourse.ci.creating_containers_to_be_garbage_collected** <br>(gauge) | Número de contenedores que se están creando para ser recolectados como basura<br>_Se muestra como contenedor_ |
| **concourse.ci.database_connections** <br>(gauge) | Número de conexiones a la base de datos<br>_Se muestra como conexión_ |
| **concourse.ci.database_queries** <br>(gauge) | Número de consultas a la base de datos<br>_Se muestra como consulta_ |
| **concourse.ci.destroying_containers_to_be_garbage_collected** <br>(gauge) | Número de contenedores que se están destruyendo para ser recolectados como basura<br>_Se muestra como contenedor_ |
| **concourse.ci.destroying_volumes_to_be_garbage_collected** <br>(gauge) | Número de volúmenes que se están destruyendo para ser recolectados como basura<br>_Se muestra como volumen_ |
| **concourse.ci.failed_containers** <br>(gauge) | Número de contenedores fallidos<br>_Se muestra como contenedor_ |
| **concourse.ci.failed_containers_to_be_garbage_collected** <br>(gauge) | Número de contenedores fallidos deben recolectarse como basura<br>_Se muestra como contenedor_ |
| **concourse.ci.failed_volumes** <br>(gauge) | Número de volúmenes fallidos<br>_Se muestra como volumen_ |
| **concourse.ci.failed_volumes_to_be_garbage_collected** <br>(gauge) | Número de volúmenes fallidos que deben recolectarse como basura<br>_Se muestra como volumen_ |
| **concourse.ci.frees** <br>(gauge) | Número de objetos heap liberados<br>_Se muestra como heap_ |
| **concourse.ci.gc_pause_total_duration** <br>(gauge) | Duración total de la pausa durante la recolección de basura<br>_Se muestra en nanosegundos_ |
| **concourse.ci.goroutines** <br>(gauge) | Número de goroutines existentes<br>_Se muestra como operación_ |
| **concourse.ci.http_response_time** <br>(gauge) | Duración de cada solicitud a un ATC<br>_Se muestra en milisegundos_ |
| **concourse.ci.mallocs** <br>(gauge) | Número de objetos heap asignados<br>_Se muestra como heap_ |
| **concourse.ci.orphaned_volumes_to_be_garbage_collected** <br>(gauge) | Número de volúmenes huérfanos que deben recolectarse como basura<br>_Se muestra como volumen_ |
| **concourse.ci.scheduling_full_duration_ms** <br>(gauge) | Tiempo necesario para programar un pipeline completo, incluido el tiempo necesario para cargar la información de la versión desde la base de datos y calcular las últimas versiones válidas para cada trabajo<br> _Se muestra en milisegundos_ |
| **concourse.ci.scheduling_job_duration_ms** <br>(gauge) | Tiempo necesario para calcular el conjunto de versiones de entrada válidas al programar un trabajo<br> _Se muestra en milisegundos_ |
| **concourse.ci.scheduling_loading_versions_duration_ms** <br>(gauge) | Tiempo necesario para cargar la información de la versión desde la base de datos<br>_Se muestra en milisegundos_ |
| **concourse.ci.volumes_created** <br>(gauge) | Número de volúmenes creados<br>_Se muestra como volumen_ |
| **concourse.ci.volumes_deleted** <br>(gauge) | Número de volúmenes eliminados<br>_Se muestra como volumen_ |
| **concourse.ci.worker_containers** <br>(gauge) | Número de contenedores que se están ejecutando actualmente en workers<br>_Se muestra como contenedor_ |
| **concourse.ci.worker_volumes** <br>(gauge) | Número de volúmenes presentes actualmente en workers<br>_Se muestra como volumen_ |

### Eventos

Esta integración no admite eventos.

### Servicio

Esta integración no recopila checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).