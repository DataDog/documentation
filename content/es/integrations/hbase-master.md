---
aliases:
- /es/integrations/hbase_master
app_id: hbase-master
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Integración con HBase Master.
integration_version: 1.1.1
media: []
supported_os:
- linux
- macos
- windows
title: Hbase Master
---
## Información general

Obtén métricas del servicio Hbase_master en tiempo real para:

- Visualizar y monitorizar estados Hbase_master.
- Recibir notificaciones sobre conmutaciones por error y eventos de Hbase_master.

## Configuración

El check de Hbase_master no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que deberás instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Hbase_master en tu host. Consulta [Uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para instalar con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-hbase_master==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones] centrales (https://docs.datadoghq.com/getting_started/integrations/).

### Configuración

1. Edita el archivo `hbase_master.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus [métricas](#metrics) de Hbase_master. Consulta el [ejemplo hbase_master.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   **NOTA**: Si utilizas el Agent v6, asegúrate de modificar el archivo [`hbase_master.d/metrics.yaml`](https://github.com/DataDog/integrations-extras/blob/master/hbase_master/datadog_checks/hbase_master/data/metrics.yaml) y encerrar entre comillaa las claves booleanas.

   ```yaml
     - include:
         domain: Hadoop
         bean:
           - Hadoop:service=HBase,name=Master,sub=Server
         attribute:
           # Is Active Master
           tag.isActiveMaster:
              metric_type: gauge
              alias: hbase.master.server.tag.is_active_master
              values: {"true": 1, "false": 0, default: 0}
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `hbase_master.d/conf.yaml` para empezar a recopilar tus logs de Hbase_master:

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: hbase
   ```

   Cambia el valor del parámetro `path` y configúralo para tu entorno.
   Consulta el [ejemplo hbase_master.d/conf.yaml](https://docs.datadoghq.com/agent/guide/agent-commands/#service-status) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

Ejecuta el [subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#service-status) y busca `hbase_master` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **hbase.master.assignmentmanager.rit_oldest_age** <br>(gauge) | Antigüedad de la región en transición durante más tiempo en milisegundos<br>_Se muestra en milisegundos_ |
| **hbase.master.assignmentmanager.rit_count_over_threshold** <br>(gauge) | Número de regiones que han estado en transición más allá de un umbral de tiempo.|
| **hbase.master.assignmentmanager.rit_count** <br>(gauge) | Número de regiones en transición.|
| **hbase.master.assignmentmanager.assign.min** <br>(gauge) | |
| **hbase.master.assignmentmanager.assign.max** <br>(gauge) | |
| **hbase.master.assignmentmanager.assign.mean** <br>(gauge) | |
| **hbase.master.assignmentmanager.assign.median** <br>(gauge) | |
| **hbase.master.assignmentmanager.assign.percentile.99** <br>(gauge) | |
| **hbase.master.ipc.queue_size** <br>(gauge) | Número de bytes en las colas de llamadas.<br>_Se muestra en bytes_ |
| **hbase.master.ipc.num_calls_in_general_queue** <br>(gauge) | Número de llamadas en la cola general de llamadas.|
| **hbase.master.ipc.num_calls_in_replication_queue** <br>(gauge) | Número de llamadas en la cola de llamadas de replicación.|
| **hbase.master.ipc.num_calls_in_priority_queue** <br>(gauge) | Número de llamadas en la cola de llamadas prioritarias.|
| **hbase.master.ipc.num_open_connections** <br>(gauge) | Número de conexiones abiertas.|
| **hbase.master.ipc.num_active_handler** <br>(gauge) | Número de identificadores RPC activos.|
| **hbase.master.ipc.total_call_time.max** <br>(gauge) | Tiempo total de la llamada, incluido el tiempo en cola y el tiempo de procesamiento.<br>_Se muestra en milisegundos_ |
| **hbase.master.ipc.total_call_time.mean** <br>(gauge) | Tiempo total de la llamada, incluido el tiempo en cola y el tiempo de procesamiento.<br>_Se muestra en milisegundos_ |
| **hbase.master.ipc.total_call_time.median** <br>(gauge) | Tiempo total de la llamada, incluido el tiempo en cola y el tiempo de procesamiento.<br>_Se muestra en milisegundos_ |
| **hbase.master.ipc.total_call_time.percentile.99** <br>(gauge) | Tiempo total de la llamada, incluido el tiempo en cola y el tiempo de procesamiento.<br>_Se muestra en milisegundos_ |
| **hbase.master.server.tag.is_active_master** <br>(gauge) | Es Active Master|
| **hbase.master.server.num_region_servers** <br>(gauge) | Número de RegionServers|
| **hbase.master.server.num_dead_region_servers** <br>(gauge) | Número de RegionServers muertos|

### Eventos

El check de Hbase_master no incluye eventos.

### Checks de servicio

El check de Hbase_master no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](http://docs.datadoghq.com/help)