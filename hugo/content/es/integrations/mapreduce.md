---
app_id: mapreduce
categories:
- log collection
custom_kind: integración
description: Monitoriza el estado y la duración de las tareas de asignación reducción.
further_reading:
- link: https://www.datadoghq.com/blog/hadoop-architecture-overview
  tag: blog
  text: Información general de la arquitectura de Hadoop
- link: https://www.datadoghq.com/blog/monitor-hadoop-metrics
  tag: blog
  text: Cómo monitorizar métricas de Hadoop
- link: https://www.datadoghq.com/blog/collecting-hadoop-metrics
  tag: blog
  text: Cómo recopilar métricas de Hadoop
- link: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog
  tag: blog
  text: Cómo monitorizar Hadoop con Datadog
integration_version: 7.0.0
media: []
supported_os:
- linux
- windows
- macos
title: MapReduce
---
![Dashboard de MapReduce](https://raw.githubusercontent.com/DataDog/integrations-core/master/mapreduce/images/mapreduce_dashboard.png)

## Información general

Obtén métricas del servicio de MapReduce en tiempo real para hacer lo siguiente:

- Visualizar y monitorizar los estados de MapReduce
- Recibir notificaciones sobre conmutaciones por error y eventos de MapReduce.

## Configuración

### Instalación

El check de MapReduce está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `mapreduce.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para apuntar a tu servidor y puerto, configura los maestros a monitorizar. Consulta el [ejemplo mapreduce.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent).

##### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Quita los comentarios y edita el bloque de configuración de registros en tu archivo `mapreduce.d/conf.yaml`. Cambia los valores de los parámetros `type`, `path` y `service` en función de tu entorno. Consulta el [ejemplo mapreduce.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: file
       path: <LOG_FILE_PATH>
       source: mapreduce
       service: <SERVICE_NAME>
       # To handle multi line that starts with yyyy-mm-dd use the following pattern
       # log_processing_rules:
       #   - type: multi_line
       #     pattern: \d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}
       #     name: new_log_start_with_date
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para los entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `mapreduce`                                                                                   |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"resourcemanager_uri": "https://%%host%%:8088", "cluster_name":"<MAPREDUCE_CLUSTER_NAME>"}` |

##### Recopilación de logs

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta la [Recopilación de logs de Docker](https://docs.datadoghq.com/agent/docker/log/).

A continuación, configura las [integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas de Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "mapreduce", "service": "<SERVICE_NAME>"}]'
```

{{% /tab %}}

{{< /tabs >}}

### Validación

Ejecuta el [subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `mapreduce` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **mapreduce.job.counter.map_counter_value** <br>(tasa) | Valor del contador de las tareas de asignación<br>_Se muestra como tarea_ |
| **mapreduce.job.counter.reduce_counter_value** <br>(tasa) | Valor del contador de tareas de reducción<br>_Se muestra como tarea_ |
| **mapreduce.job.counter.total_counter_value** <br>(tasa) | Valor del contador de todas las tareas<br>_Se muestra como tarea_ |
| **mapreduce.job.elapsed_time.95percentile** <br>(gauge) | Percentil 95 del tiempo transcurrido desde el inicio de la aplicación<br>_Se muestra en milisegundos_ |
| **mapreduce.job.elapsed_time.avg** <br>(gauge) | Tiempo medio transcurrido desde el inicio de la aplicación<br>_Se muestra en milisegundos_ |
| **mapreduce.job.elapsed_time.count** <br>(tasa) | Número de veces que se ha muestreado el tiempo transcurrido|
| **mapreduce.job.elapsed_time.max** <br>(gauge) | Tiempo máximo transcurrido desde el inicio de la aplicación<br>_Se muestra en milisegundos_ |
| **mapreduce.job.elapsed_time.median** <br>(gauge) | Mediana del tiempo transcurrido desde el inicio de la aplicación<br>_Se muestra en milisegundos_ |
| **mapreduce.job.failed_map_attempts** <br>(tasa) | Número de intentos fallidos de asignación<br>_Se muestra como tarea_ |
| **mapreduce.job.failed_reduce_attempts** <br>(tasa) | Número de intentos de reducción fallidos<br>_Se muestra como tarea_ |
| **mapreduce.job.killed_map_attempts** <br>(tasa) | Número de intentos de asignación eliminados<br>_Se muestra como tarea_ |
| **mapreduce.job.killed_reduce_attempts** <br>(tasa) | Número de intentos de reducción eliminados<br>_Se muestra como tarea_ |
| **mapreduce.job.map.task.elapsed_time.95percentile** <br>(gauge) | Percentil 95 del tiempo transcurrido de todas las tareas de asignación<br>_Se muestra en milisegundos_ |
| **mapreduce.job.map.task.elapsed_time.avg** <br>(gauge) | Tiempo medio transcurrido de todas las tareas de asignación<br>_Se muestra en milisegundos_ |
| **mapreduce.job.map.task.elapsed_time.count** <br>(tasa) | Número de veces que se ha muestreado el tiempo transcurrido de las tareas de asignación|
| **mapreduce.job.map.task.elapsed_time.max** <br>(gauge) | Tiempo máximo transcurrido de todas las tareas de asignación<br>_Se muestra en milisegundos_ |
| **mapreduce.job.map.task.elapsed_time.median** <br>(gauge) | Mediana del tiempo transcurrido de todas las tareas de asignación<br>_Se muestra en milisegundos_ |
| **mapreduce.job.maps_completed** <br>(tasa) | Número de asignaciones finalizadas<br>_Se muestra como tarea_. |
| **mapreduce.job.maps_pending** <br>(tasa) | Número de asignaciones pendientes <br>_Se muestra como tarea_ |
| **mapreduce.job.maps_running** <br>(tasa) | Número de asignaciones en ejecución<br>_Se muestra como tarea_ |
| **mapreduce.job.maps_total** <br>(tasa) | Número total de asignaciones<br>_Se muestra como tarea_ |
| **mapreduce.job.new_map_attempts** <br>(tasa) | Número de nuevos intentos de asignación<br>_Se muestra como tarea_ |
| **mapreduce.job.new_reduce_attempts** <br>(tasa) | Número de nuevos intentos de reducción<br>_Se muestra como tarea_ |
| **mapreduce.job.reduce.task.elapsed_time.95percentile** <br>(gauge) | Percentil 95 de tiempo transcurrido de todas las tareas de reducción<br>_Se muestra en milisegundos_ |
| **mapreduce.job.reduce.task.elapsed_time.avg** <br>(gauge) | Tiempo medio transcurrido de todas las tareas de reducción<br>_Se muestra en milisegundos_ |
| **mapreduce.job.reduce.task.elapsed_time.count** <br>(tasa) | Número de veces que se ha muestreado el tiempo transcurrido de las tareas de reducción|
| **mapreduce.job.reduce.task.elapsed_time.max** <br>(gauge) | Tiempo máximo transcurrido de todas las tareas de reducción<br>_Se muestra en milisegundos_ |
| **mapreduce.job.reduce.task.elapsed_time.median** <br>(gauge) | Mediana del tiempo transcurrido de todas las tareas de reducción<br>_Se muestra en milisegundos_. |
| **mapreduce.job.reduces_completed** <br>(tasa) | Número de reducciones finalizadas<br>_Se muestra como tarea_ |
| **mapreduce.job.reduces_pending** <br>(tasa) | Número de reducciones pendientes<br>_Se muestra como tarea_ |
| **mapreduce.job.reduces_running** <br>(tasa) | Número de reducciones en ejecución<br>_Se muestra como tarea_ |
| **mapreduce.job.reduces_total** <br>(tasa) | Número de reducciones<br>_Se muestra como tarea_ |
| **mapreduce.job.running_map_attempts** <br>(tasa) | Número de intentos de asignación en ejecución<br>_Se muestra como tarea_ |
| **mapreduce.job.running_reduce_attempts** <br>(tasa) | Número de intentos de reducción en ejecución<br>_Se muestra como tarea_ |
| **mapreduce.job.successful_map_attempts** <br>(tasa) | Número de intentos de asignación con éxito<br>_Se muestra como tarea_ |
| **mapreduce.job.successful_reduce_attempts** <br>(tasa) | Número de intentos de reducción con éxito<br>_Se muestra como tarea_ |

### Eventos

El check de MapReduce no incluye eventos.

### Checks de servicio

**mapreduce.resource_manager.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse al gestor de recursos. En caso contrario, devuelve `OK`.

_Estados: ok, crítico_

**mapreduce.application_master.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la aplicación maestra. En caso contrario, devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Información general de la arquitectura de Hadoop](https://www.datadoghq.com/blog/hadoop-architecture-overview)
- [Cómo monitorizar métricas de Hadoop](https://www.datadoghq.com/blog/monitor-hadoop-metrics)
- [Cómo recopilar métricas de Hadoop](https://www.datadoghq.com/blog/collecting-hadoop-metrics)
- [Cómo monitoriozar Hadoop con Datadog](https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog)