---
app_id: cockroachdb
categories:
- almacenamiento en caché
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Monitoriza el estado y el rendimiento general de tus clústeres de CockroachDB.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-cockroachdb-performance-metrics-with-datadog
  tag: blog
  text: Monitorizar métricas de rendimiento de CockroachDB con Datadog
integration_version: 6.0.0
media: []
supported_os:
- linux
- windows
- macos
title: CockroachDB
---
## Información general

El check de CockroachDB monitoriza el estado general y el rendimiento de un clúster de [CockroachDB](https://www.cockroachlabs.com/product/cockroachdb).

## Configuración

### Instalación

El check de CockroachDB está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package,, por lo que no necesitas instalar nada más en tus servidores CockroachDB.

A partir de la versión 1.9.0, esta integración basada en OpenMetrics cuenta con un modo más reciente (que se activa configurando `openmetrics_endpoint` para que apunte al endpoint de destino) y un modo legacy (que se activa configurando `prometheus_url`). Para obtener todas las funciones más actualizadas, Datadog recomienda activar el modo más reciente. Ten en cuenta que el modo más reciente requiere Python 3. Para obtener más información, consulta [Versiones más recientes y legacy de integraciones basadas en OpenMetrics](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations).

Para los hosts que no pueden utilizar Python 3, o para utilizar el modo legacy, consulta la siguiente [configuración](https://github.com/DataDog/integrations-core/blob/7.33.x/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example).

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `cockroachdb.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/) para comenzar a recopilar datos de rendimiento de CockroachDB. Consulta el [ejemplo de cockroachdb.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
       ## @param openmetrics_endpoint - string - required
       ## The URL exposing metrics in the OpenMetrics format.
       #
     - openmetrics_endpoint: http://localhost:8080/_status/vars
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `cockroachdb.d/conf.yaml` para empezar a recopilar tus logs de CockroachDB:

   ```yaml
   logs:
    - type: file
      path: /var/lib/cockroach/logs/cockroach.log
      source: cockroachdb
      service: cockroachdb
      log_processing_rules:
      - type: multi_line
        name: new_log_start_with_status_and_date
        pattern: [A-Z]\d{6}\s\d+\:\d+\:\d+\.\d+
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [ejemplo de cockroachdb.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                    |
| -------------------- | -------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cockroachdb`                                            |
| `<INIT_CONFIG>`      | en blanco o `{}`                                            |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint":"http://%%host%%:8080/_status/vars"}` |

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Docker](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations).

A continuación, configura [integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "cockroachdb", "service": "<SERVICE_NAME>"}]'
```

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cockroachdb` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cockroachdb.abortspanbytes** <br>(gauge) | Número de bytes del tramo (span) de cancelación<br> _Se muestra como byte_ |
| **cockroachdb.addsstable.applications** <br>(count) | \[OpenMetrics v1\] Número de ingestas de SSTable aplicadas (es decir, aplicadas por réplicas)<br>_Se muestra como operación_ |
| **cockroachdb.addsstable.applications.count** <br>(count) | \[OpenMetrics v2\] Número de ingestas de SSTable aplicadas (es decir, aplicadas por réplicas)<br>_Se muestra como operación_ |
| **cockroachdb.addsstable.copies** <br>(count) | \[OpenMetrics v1\] Número de ingestas de SSTable que requirieron copiar archivos durante la aplicación<br>_Se muestra como operación_ |
| **cockroachdb.addsstable.copies.count** <br>(count) | \[OpenMetrics v2\] Número de ingestas de SSTable que requirieron copiar archivos durante la aplicación<br>_Se muestra como operación_ |
| **cockroachdb.addsstable.delay.count** <br>(count) | Cantidad en la que se retrasó la evaluación de las solicitudes AddSSTable<br>_Se muestra como nanosegundo_ |
| **cockroachdb.addsstable.delay.enginebackpressure.count** <br>(count) | Cantidad en la que se retrasó la evaluación de las solicitudes AddSSTable por la contrapresión del motor de almacenamiento<br>_Se muestra como nanosegundo_. |
| **cockroachdb.addsstable.proposals** <br>(count) | \[OpenMetrics v1\] Número de ingestas de SSTable propuestas (es decir, enviadas a Raft por los arrendatarios)<br>_Se muestra como operación_ |
| **cockroachdb.addsstable.proposals.count** <br>(count) | \[OpenMetrics v2\] Número de ingestas de SSTable propuestas (es decir, enviadas a Raft por los arrendatarios)<br>_Se muestra como operación_ |
| **cockroachdb.admission.admitted.elastic_cpu.bulk_normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.elastic_cpu.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.elastic_cpu.normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.kv** <br>(count) | \[OpenMetrics v1\] Número de solicitudes KV admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.kv.bulk_normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.kv.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes KV admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.kv.high_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.kv.locking_normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.kv.normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.kv_stores** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de almacenes KV admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.kv_stores.bulk_normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.kv_stores.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de almacenes KV admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.kv_stores.high_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.kv_stores.locking_normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.kv_stores.normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.kv_stores.ttl_low_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.sql.leaf.start** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de inicio de hoja SQL admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.sql.leaf.start.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de inicio de hoja SQL admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.sql.root.start** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de inicio de raíz SQL admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.sql.root.start.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de inicio de raíz SQL admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.sql_kv.response** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de respuesta SQL KV admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.sql_kv.response.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de respuesta SQL KV admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.sql_kv_response.locking_normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.sql_kv_response.normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.sql_leaf_start.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.sql_leaf_start.locking_normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.sql_leaf_start.normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.sql_root_start.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.sql_root_start.locking_normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.sql_root_start.normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.sql_sql.response** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de respuesta SQL distribuidas admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.sql_sql.response.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de respuesta SQL distribuidas admitidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.admitted.sql_sql_response.locking_normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.admitted.sql_sql_response.normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.elastic_cpu.acquired_nanos.count** <br>(count) | Total de nanosegundos de CPU adquiridos por el trabajo elástico<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.elastic_cpu.available_nanos** <br>(gauge) | Nanosegundos de CPU disponibles instantáneamente por segundo ignorando el límite de uso<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.elastic_cpu.max_available_nanos.count** <br>(count) | Máximo de nanosegundos de CPU disponibles por segundo ignorando el límite de uso<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.elastic_cpu.nanos_exhausted_duration** <br>(gauge) | Duración total cuando se agotaron los nanosegundos de CPU elástica, en microsegundos|
| **cockroachdb.admission.elastic_cpu.over_limit_durations.bucket** <br>(count) | Medida de cuánto sobrepasaron el límite prescrito las solicitudes elásticas (no se registra si las solicitudes no se sobrepasan)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.elastic_cpu.over_limit_durations.count** <br>(count) | Medida de cuánto sobrepasaron el límite prescrito las solicitudes elásticas (no se registra si las solicitudes no sobrepasan)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.elastic_cpu.over_limit_durations.sum** <br>(count) | Medida de cuánto sobrepasaron el límite prescrito las solicitudes elásticas (no se registra si las solicitudes no sobrepasan)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.elastic_cpu.pre_work_nanos.count** <br>(count) | Total de nanosegundos de CPU dedicados al trabajo previo, antes de realizar el trabajo elástico<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.elastic_cpu.returned_nanos.count** <br>(count) | Total de nanosegundos de CPU devueltos por el trabajo elástico<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.elastic_cpu.utilization** <br>(gauge) | Uso de CPU por trabajo elástico<br>_Se muestra como porcentaje_ |
| **cockroachdb.admission.elastic_cpu.utilization_limit** <br>(gauge) | Límite de uso fijado para el trabajo elástico de la CPU<br>_Se muestra como porcentaje_ |
| **cockroachdb.admission.errored.elastic_cpu.bulk_normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.elastic_cpu.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.elastic_cpu.normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.kv.bulk_normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.errored.kv.count** <br>(count) | \[OpenMetrics v1\] Número de solicitudes KV no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.kv.countt** <br>(count) | \[OpenMetrics v2\] Número de solicitudes KV no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.kv.high_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.kv.locking_normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.kv.normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.kv_stores.bulk_normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.kv_stores.count** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de almacenes KV no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.kv_stores.countt** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de almacenes KV no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.kv_stores.high_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.kv_stores.locking_normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.kv_stores.normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.kv_stores.ttl_low_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.sql.leaf.start** <br>(count) | \[OpenMetrics v1\] Número de peticiones de inicio de hoja SQL no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.sql.leaf.start.count** <br>(count) | \[OpenMetrics v2\] Número de peticiones de inicio de hoja SQL no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.sql.root.start** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de inicio de raíz SQL no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.sql.root.start.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de inicio de raíz SQL no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.sql_kv.response** <br>(count) | \[OpenMetrics v1\] Número de solicitudes SQL KV no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.sql_kv.response.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes SQL KV no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.sql_kv_response.locking_normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.sql_kv_response.normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.sql_leaf_start.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.sql_leaf_start.locking_normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.sql_leaf_start.normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.sql_root_start.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.sql_root_start.locking_normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.sql_root_start.normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.sql_sql.response** <br>(count) | \[OpenMetrics v1\] Número de solicitudes SQL distribuidas no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.sql_sql.response.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes SQL distribuidas no admitidas debido a un error<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.errored.sql_sql_response.locking_normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.errored.sql_sql_response.normal_pri.count** <br>(count) | Número de solicitudes no admitidas debido a un error|
| **cockroachdb.admission.granter.cpu_load_long_period_duration.kv.count** <br>(count) | Duración total cuando CPULoad fue llamado con un periodo largo, en micros|
| **cockroachdb.admission.granter.cpu_load_short_period_duration.kv.count** <br>(count) | Duración total cuando CPULoad fue llamado con un periodo corto, en micros|
| **cockroachdb.admission.granter.elastic_io_tokens_available.kv** <br>(gauge) | Número de tokens disponibles|
| **cockroachdb.admission.granter.io.tokens.exhausted.duration.kv** <br>(count) | \[OpenMetrics v1\] Duración total cuando se agotaron los tokens de E/S, en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.granter.io.tokens.exhausted.duration.kv.count** <br>(count) | \[OpenMetrics v2\] Duración total cuando se agotaron los tokens de E/S, en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.granter.io_tokens_available.kv** <br>(gauge) | Número de tokens disponibles|
| **cockroachdb.admission.granter.io_tokens_bypassed.kv.count** <br>(count) | Número total de tokens tomados por trabajos que eluden el control de admisión (por ejemplo, escrituras de seguidores sin control de flujo)|
| **cockroachdb.admission.granter.io_tokens_exhausted_duration.kv.count** <br>(count) | Duración total cuando se agotaron los tokens de E/S, en micros|
| **cockroachdb.admission.granter.io_tokens_returned.kv.count** <br>(count) | Número total de tokens devueltos|
| **cockroachdb.admission.granter.io_tokens_taken.kv.count** <br>(count) | Número total de tokens tomados|
| **cockroachdb.admission.granter.slot_adjuster_decrements.kv.count** <br>(count) | Número de decrementos del total de ranuras KV|
| **cockroachdb.admission.granter.slot_adjuster_increments.kv.count** <br>(count) | Número de incrementos del total de ranuras KV|
| **cockroachdb.admission.granter.slots_exhausted_duration.kv.count** <br>(count) | Duración total cuando se agotaron las ranuras KV, en micros|
| **cockroachdb.admission.granter.total.slots.kv** <br>(gauge) | \[OpenMetrics v1 y v2\] Total de ranuras para el trabajo KV|
| **cockroachdb.admission.granter.total_slots.kv** <br>(gauge) | Ranuras totales para el trabajo KV|
| **cockroachdb.admission.granter.used.slots.kv** <br>(gauge) | \[OpenMetrics v1 y v2\] Ranuras utilizadas para el trabajo KV|
| **cockroachdb.admission.granter.used.slots.sql.leaf.start** <br>(gauge) | \[OpenMetrics v1 y v2\] Ranuras utilizadas para el trabajo de inicio de hoja SQL|
| **cockroachdb.admission.granter.used.slots.sql.root.start** <br>(gauge) | \[OpenMetrics v1 y v2\] Ranuras utilizadas para el trabajo de inicio de raíz SQL|
| **cockroachdb.admission.granter.used_slots.kv** <br>(gauge) | Ranuras utilizadas|
| **cockroachdb.admission.granter.used_slots.sql_leaf_start** <br>(gauge) | Ranuras utilizadas|
| **cockroachdb.admission.granter.used_slots.sql_root_start** <br>(gauge) | Ranuras utilizadas|
| **cockroachdb.admission.io.overload** <br>(gauge) | Float normalizado a 1 que indica si el control de admisión de E/S considera el almacén como sobrecargado con respecto a la compactación fuera de L0 (considera subniveles y recuentos de archivos).|
| **cockroachdb.admission.l0_compacted_bytes.kv.count** <br>(count) | Total de bytes compactados a partir de L0 (utilizados para generar tokens de E/S)|
| **cockroachdb.admission.l0_tokens_produced.kv.count** <br>(count) | Número total de tokens generados a partir de L0|
| **cockroachdb.admission.raft.paused_replicas** <br>(gauge) | Número de seguidores (es decir, réplicas) cuya replicación está actualmente pausada para ayudarles a recuperarse de la sobrecarga de E/S. Estas réplicas se ignoran a efectos de la cuota de propuesta y no reciben tráfico de replicación. Esencialmente, son tratadas como desconectadas a efectos de replicación. Esto sirve como una forma rudimentaria de control de admisión. El recuento es emitido por el arrendatario de cada rango.|
| **cockroachdb.admission.raft.paused_replicas_dropped_msgs.count** <br>(count) | Número de mensajes descartados en lugar de ser enviados a réplicas pausadas. Los mensajes se descartan para ayudar a estas réplicas a recuperarse de la sobrecarga de E/S.|
| **cockroachdb.admission.requested.elastic_cpu.bulk_normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.elastic_cpu.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.elastic_cpu.normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.kv** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de admisión KV<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.requested.kv.bulk_normal_pri.count** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.requested.kv.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de admisión KV<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.requested.kv.high_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.kv.locking_normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.kv.normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.kv_stores.bulk_normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.kv_stores.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de admisión de almacenes KV<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.requested.kv_stores.high_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.kv_stores.locking_normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.kv_stores.normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.kv_stores.ttl_low_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.sql.leaf.start** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de admisión de inicio de hoja SQL<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.requested.sql.leaf.start.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de admisión de inicio de hoja SQL<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.requested.sql_kv.response** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de admisión SQL KV<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.requested.sql_kv.response.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de admisión SQL KV<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.requested.sql_kv_response.locking_normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.sql_kv_response.normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.sql_leaf_start.locking_normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.sql_leaf_start.normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.sql_root_start.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.sql_root_start.locking_normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.sql_root_start.normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.sql_sql.response** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de admisión SQL distribuidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.requested.sql_sql.response.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de admisión SQL distribuidas<br>_Se muestra como solicitud_ |
| **cockroachdb.admission.requested.sql_sql_response.locking_normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.requested.sql_sql_response.normal_pri.count** <br>(count) | Número de solicitudes|
| **cockroachdb.admission.scheduler_latency_listener.p99_nanos** <br>(gauge) | La latencia de programación en el p99 observada por el escuchador de latencia del programador<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.kv** <br>(gauge) | \[OpenMetrics v1\] Duraciones de tiempo de espera de solicitudes KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.kv.bucket** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.kv.count** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.kv.sum** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.kv_stores** <br>(gauge) | \[OpenMetrics v1\] Duraciones de tiempo de espera de solicitudes de almacenes KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.kv_stores.bucket** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes de almacenes KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.kv_stores.count** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes de almacenes KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.kv_stores.sum** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes de almacenes KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql.leaf.start** <br>(gauge) | \[OpenMetrics v1\] Duraciones de tiempo de espera de solicitudes de inicio de hoja SQL que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql.leaf.start.bucket** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes de inicio de hoja SQL que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql.leaf.start.count** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes de inicio de hoja SQL que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql.leaf.start.sum** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes de inicio de hoja SQL que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql_kv.response** <br>(gauge) | \[OpenMetrics v1\] Duraciones de tiempo de espera de solicitudes de respuesta SQL KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql_kv.response.bucket** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes de respuesta SQL KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql_kv.response.count** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes de respuesta SQL KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql_kv.response.sum** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes de respuesta SQL KV que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql_sql.response** <br>(gauge) | \[OpenMetrics v1\] Duraciones de tiempo de espera de solicitudes SQL distribuidas que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql_sql.response.bucket** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes SQL distribuidas que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql_sql.response.count** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes SQL distribuidas que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.durations.sql_sql.response.sum** <br>(count) | \[OpenMetrics v2\] Duraciones de tiempo de espera de solicitudes SQL distribuidas que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait.queue.length.kv** <br>(gauge) | \[OpenMetrics v1 y v2\] Longitud de la cola de espera KV|
| **cockroachdb.admission.wait.queue.length.kv_stores** <br>(gauge) | \[OpenMetrics v1 y v2\] Longitud de la cola de espera de los almacenes KV|
| **cockroachdb.admission.wait.queue.length.sql.leaf.start** <br>(gauge) | \[OpenMetrics v1 y v2\] Longitud de la cola de espera de inicio de la hoja SQL|
| **cockroachdb.admission.wait.queue.length.sql_kv.response** <br>(gauge) | \[OpenMetrics v1 y v2\] Longitud de la cola de espera SQL KV|
| **cockroachdb.admission.wait.queue.length.sql_sql.response** <br>(gauge) | \[OpenMetrics v1 y v2\] Longitud de la cola de espera SQL distribuida|
| **cockroachdb.admission.wait.queue.lengths.sql.root.start** <br>(gauge) | \[OpenMetrics v1 y v2\] Longitud de la cola de espera de inicio de la raíz SQL|
| **cockroachdb.admission.wait.sum.kv** <br>(count) | \[OpenMetrics v1\] Tiempo total de espera KV en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.wait.sum.kv.count** <br>(count) | \[OpenMetrics v2\] Tiempo total de espera KV en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.wait.sum.kv_stores** <br>(count) | \[OpenMetrics v1\] Tiempo total de espera de los almacenes KV en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.wait.sum.kv_stores.count** <br>(count) | \[OpenMetrics v2\] Tiempo total de espera de los almacenes KV en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.wait.sum.sql.root.start** <br>(count) | \[OpenMetrics v1\] Tiempo total de espera de inicio de raíz SQL en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.wait.sum.sql.root.start.count** <br>(count) | \[OpenMetrics v2\] Tiempo total de espera de inicio de raíz SQL en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.wait.sum.sql_kv.response** <br>(count) | \[OpenMetrics v1\] Tiempo total de espera de SQL KV en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.wait.sum.sql_kv.response.count** <br>(count) | \[OpenMetrics v2\] Tiempo total de espera de SQL KV en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.wait.sum.sql_sql.response** <br>(count) | \[OpenMetrics v1\] Tiempo total de espera de SQL distribuido en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.wait.sum.sql_sql.response.count** <br>(count) | \[OpenMetrics v2\] Tiempo total de espera de SQL distribuido en micros<br>_Se muestra como microsegundo_ |
| **cockroachdb.admission.wait_durations.elastic_cpu.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.elastic_cpu.bulk_normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.elastic_cpu.bulk_normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.elastic_cpu.bulk_normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.elastic_cpu.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.elastic_cpu.normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.elastic_cpu.normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.elastic_cpu.normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.elastic_cpu.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.bulk_normal_pri** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.wait_durations.kv.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.high_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.high_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.high_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.locking_normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.locking_normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.locking_normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.bulk_normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.bulk_normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.bulk_normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.high_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.high_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.high_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.locking_normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.locking_normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.locking_normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.ttl_low_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.ttl_low_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.kv_stores.ttl_low_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_kv_response.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_kv_response.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_kv_response.locking_normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_kv_response.locking_normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_kv_response.locking_normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_kv_response.normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_kv_response.normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_kv_response.normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_kv_response.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_leaf_start.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_leaf_start.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_leaf_start.locking_normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_leaf_start.locking_normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_leaf_start.locking_normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_leaf_start.normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_leaf_start.normal_pri.count** <br>(count) | Duración del tiempo de espera para las solicitudes que esperaron<br>_Se muestra en nanosegundos_ |
| **cockroachdb.admission.wait_durations.sql_leaf_start.normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_leaf_start.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_root_start.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_root_start.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_root_start.locking_normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_root_start.locking_normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_root_start.locking_normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_root_start.normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_root_start.normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_root_start.normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_root_start.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_sql_response.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_sql_response.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_sql_response.locking_normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_sql_response.locking_normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_sql_response.locking_normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_sql_response.normal_pri.bucket** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_sql_response.normal_pri.count** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_sql_response.normal_pri.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_durations.sql_sql_response.sum** <br>(count) | Duración del tiempo de espera de solicitudes que esperaron<br>_Se muestra como nanosegundo_ |
| **cockroachdb.admission.wait_queue_length.elastic_cpu** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.elastic_cpu.bulk_normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.elastic_cpu.normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.kv** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.kv.bulk_normal_pri** <br>(count) | Número de solicitudes admitidas|
| **cockroachdb.admission.wait_queue_length.kv.high_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.kv.locking_normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.kv.normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.kv_stores** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.kv_stores.bulk_normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.kv_stores.high_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.kv_stores.locking_normal_pri** <br>(calibre) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.kv_stores.normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.kv_stores.ttl_low_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_kv_response** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_kv_response.locking_normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_kv_response.normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_leaf_start** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_leaf_start.locking_normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_leaf_start.normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_root_start** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_root_start.locking_normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_root_start.normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_sql_response** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_sql_response.locking_normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.admission.wait_queue_length.sql_sql_response.normal_pri** <br>(gauge) | Duración de la cola de espera|
| **cockroachdb.backup.last_failed_time.kms_inaccessible** <br>(indicador) | La marca de tiempo Unix del fallo más reciente de la copia de seguridad debido a errKMSInaccessible por una copia de seguridad especificada como que mantiene esta métrica|
| **cockroachdb.batch_requests.bytes.count** <br>(count) | Recuento total de bytes de solicitudes por lotes procesadas<br>_Se muestra como byte_ |
| **cockroachdb.batch_requests.cross_region.bytes.count** <br>(count) | Recuento total de bytes de solicitudes por lotes procesadas en toda la región cuando los niveles de región están configurados<br>_Se muestra como byte_ |
| **cockroachdb.batch_requests.cross_zone.bytes.count** <br>(count) | Recuento total de bytes de solicitudes por lotes procesadas entre zonas dentro de la misma región cuando los niveles de región y zona están configurados. Sin embargo, si los niveles de región no están configurados, este recuento también puede incluir datos por lotes enviados entre diferentes regiones. Garantizar una configuración coherente de los niveles de región y zona en todos los nodos ayuda a monitorizar con precisión los datos transmitidos.<br>_Se muestra como byte_ |
| **cockroachdb.batch_responses.bytes.count** <br>(count) | Recuento total de bytes de respuestas por lotes recibidas<br>_Se muestra como byte_ |
| **cockroachdb.batch_responses.cross_region.bytes.count** <br>(count) | Recuento total de bytes de respuestas por lotes recibidas en toda la región cuando los niveles de región están configurados<br>_Se muestra como byte_ |
| **cockroachdb.batch_responses.cross_zone.bytes.count** <br>(count) | Recuento total de bytes de respuestas por lotes recibidas entre zonas dentro de la misma región cuando los niveles de región y zona están configurados. Sin embargo, si los niveles de región no están configurados, este recuento también puede incluir datos por lotes recibidos entre diferentes regiones. Garantizar una configuración coherente de los niveles de región y zona en todos los nodos ayuda a monitorizar con precisión los datos transmitidos.<br>_Se muestra como byte_ |
| **cockroachdb.build.timestamp** <br>(gauge) | \[OpenMetrics v1 y v2\] Información de compilación<br>_Se muestra como tiempo_ |
| **cockroachdb.capacity.available** <br>(gauge) | \[OpenMetrics v1 y v2\] Capacidad de almacenamiento disponible<br>_Se muestra como byte_ |
| **cockroachdb.capacity.reserved** <br>(gauge) | \[OpenMetrics v1 y v2\] Capacidad reservada para snapshots<br>_Se muestra como byte_ |
| **cockroachdb.capacity.total** <br>(gauge) | \[OpenMetrics v1 y v2\] Capacidad total de almacenamiento<br>_Se muestra como byte_ |
| **cockroachdb.capacity.used** <br>(gauge) | \[OpenMetrics v1 y v2\] Capacidad de almacenamiento utilizada<br>_Se muestra como byte_ |
| **cockroachdb.changefeed.admit.latency** <br>(gauge) | \[OpenMetrics v1\] Latencia de admisión de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que fue admitido en el pipeline changefeed<br> _Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.admit.latency.bucket** <br>(count) | \[OpenMetrics v2\] Latencia de admisión de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que fue admitido en el pipeline changefeed<br> _Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.admit.latency.count** <br>(count) | \[OpenMetrics v2\] Latencia de admisión de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que fue admitido en el pipeline changefeed<br> _Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.admit.latency.sum** <br>(count) | \[OpenMetrics v2\] Latencia de admisión de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que fue admitido en el pipeline changefeed<br> _Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.aggregator_progress** <br>(gauge) | Fecha más temprana hasta la que se garantiza que cualquier agregador ha emitido todos los valores para|
| **cockroachdb.changefeed.backfill** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de changefeeds que ejecutan backfills en la actualidad|
| **cockroachdb.changefeed.backfill.pending.ranges** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de rangos en un backfill en curso que aún no se han emitido por completo|
| **cockroachdb.changefeed.backfill_count** <br>(gauge) | Número de changefeeds que ejecutan backfills en la actualidad|
| **cockroachdb.changefeed.batch_reduction_count** <br>(gauge) | Número de veces que un nodo agregador de changefeed intentó reducir el tamaño de los lotes de mensajes que emitía al sumidero|
| **cockroachdb.changefeed.buffer_entries.allocated_mem** <br>(gauge) | Asignación actual de memoria del grupo de cuotas<br>_Se muestra como byte_ |
| **cockroachdb.changefeed.buffer_entries.flush.count** <br>(count) | Número de elementos de descarga añadidos al búfer|
| **cockroachdb.changefeed.buffer_entries.in.count** <br>(count) | Total de entradas que ingresan al búfer entre raft y los sumideros de changefeeds|
| **cockroachdb.changefeed.buffer_entries.kv.count** <br>(count) | Número de elementos KV añadidos al búfer|
| **cockroachdb.changefeed.buffer_entries.out.count** <br>(count) | Total de entradas que abandonan el búfer entre raft y los sumideros de changefeeds|
| **cockroachdb.changefeed.buffer_entries.released.count** <br>(count) | Total de entradas procesadas, emitidas y reconocidas por los sumideros|
| **cockroachdb.changefeed.buffer_entries.resolved.count** <br>(count) | Número de elementos resueltos añadidos al búfer|
| **cockroachdb.changefeed.buffer_entries_mem.acquired.count** <br>(count) | Cantidad total de memoria adquirida para las entradas a medida que ingresan al sistema|
| **cockroachdb.changefeed.buffer_entries_mem.released.count** <br>(count) | Cantidad total de memoria liberada por las entradas tras su emisión|
| **cockroachdb.changefeed.buffer_pushback.count** <br>(count) | Tiempo total dedicado a esperar mientras el búfer estaba lleno<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.bytes.messages_pushback.count** <br>(count) | Tiempo total de limitación de la cuota de bytes<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.checkpoint_hist_nanos.bucket** <br>(count) | Tiempo dedicado a comprobar el progreso del changefeed<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.checkpoint_hist_nanos.count** <br>(count) | Tiempo dedicado a comprobar el progreso del changefeed<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.checkpoint_hist_nanos.sum** <br>(count) | Tiempo dedicado a comprobar el progreso del changefeed<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.checkpoint_progress** <br>(gauge) | Marca de tiempo más antigua de cualquier punto de control persistente de un changefeed (los valores anteriores a esta marca de tiempo nunca tendrán que volver a emitirse)|
| **cockroachdb.changefeed.cloudstorage_buffered_bytes** <br>(gauge) | Número de bytes almacenados en búfer en archivos de sumidero de cloudstorage que aún no se han emitido|
| **cockroachdb.changefeed.commit.latency** <br>(gauge) | \[OpenMetrics v1\] Latencia de confirmación de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que fue reconocido por el sumidero descendente<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.commit.latency.bucket** <br>(count) | \[OpenMetrics v2\] Latencia de confirmación de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que fue reconocido por el sumidero descendente<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.commit.latency.count** <br>(count) | \OpenMetrics v2\] Latencia de confirmación de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que fue reconocido por el sumidero aguas abajo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.commit.latency.sum** <br>(count) | \[OpenMetrics v2\] Latencia de confirmación de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que fue reconocido por el sumidero aguas abajo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.emitted.messages** <br>(count) | \[OpenMetrics v1\] Mensajes emitidos por todas las fuentes|
| **cockroachdb.changefeed.emitted.messages.count** <br>(count) | \[OpenMetrics v2\] Mensajes emitidos por todas las fuentes|
| **cockroachdb.changefeed.emitted_bytes** <br>(count) | Bytes emitidos por todas las fuentes<br>_Se muestra como byte_ |
| **cockroachdb.changefeed.emitted_bytes.count** <br>(count) | Bytes emitidos por todas las fuentes|
| **cockroachdb.changefeed.emitted_messages** <br>(count) | Mensajes emitidos por todas las fuentes|
| **cockroachdb.changefeed.error.retries** <br>(count) | \ [OpenMetrics v1\] Total de errores reintentables encontrados por todos los changefeeds|
| **cockroachdb.changefeed.error.retries.count** <br>(count) | \ [OpenMetrics v2\] Total de errores reintentables encontrados por todos los changefeeds|
| **cockroachdb.changefeed.error_retries** <br>(count) | Total de errores reintentables encontrados por todos los changefeeds|
| **cockroachdb.changefeed.failures** <br>(count) | \[OpenMetrics v1\] Número total de trabajos de changefeeds que fallaron|
| **cockroachdb.changefeed.failures.count** <br>(count) | \[OpenMetrics v2\] Número total de trabajos de changefeeds que fallaron|
| **cockroachdb.changefeed.filtered_messages.count** <br>(count) | Mensajes filtrados por todas las fuentes. Este recuento no incluye el número de mensajes que pueden filtrarse debido a las restricciones de rango.|
| **cockroachdb.changefeed.flush.messages_pushback.count** <br>(count) | Tiempo total de limitación de la cuota de descarga<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.flush_hist_nanos.bucket** <br>(count) | Tiempo dedicado a descargar mensajes en todos los changefeeds<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.flush_hist_nanos.count** <br>(count) | Tiempo dedicado a descargar mensajes en todos los changefeeds<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.flush_hist_nanos.sum** <br>(count) | Tiempo dedicado a descargar mensajes en todos los changefeeds<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.flushed_bytes.count** <br>(count) | Bytes emitidos por todas las fuentes; puede ser diferentes de changefeed.emitted_bytes cuando la compresión está activada<br>_Se muestra como byte_ |
| **cockroachdb.changefeed.flushes.count** <br>(count) | Total de descargas en todas las fuentes|
| **cockroachdb.changefeed.forwarded_resolved_messages.count** <br>(count) | Marcas de tiempo resueltas enviadas desde el agregador de cambios a la frontera de cambios|
| **cockroachdb.changefeed.frontier_updates.count** <br>(count) | Número de actualizaciones de fronteras de cambio en todas las fuentes|
| **cockroachdb.changefeed.internal_retry_message** <br>(gauge) | Número de mensajes para los que se realizó un intento dentro de un nodo agregador|
| **cockroachdb.changefeed.lagging_ranges** <br>(gauge) | Número de rangos considerados como atrasados|
| **cockroachdb.changefeed.max.behind.nanos** <br>(gauge) | \[OpenMetrics v1 y v2\] La mayor duración de confirmación a emisión de cualquier fuente en ejecución|
| **cockroachdb.changefeed.max_behind_nanos** <br>(gauge) | (Obsoleto en favor de checkpoint_progress) Punto de control persistente de cualquier changefeed más atrasado que el actual<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.message.size.hist** <br>(gauge) | \[OpenMetrics v1\] Histograma del tamaño de los mensajes|
| **cockroachdb.changefeed.message.size.hist.bucket** <br>(count) | \[OpenMetrics v2\] Histograma del tamaño de los mensajes|
| **cockroachdb.changefeed.message.size.hist.count** <br>(count) | \[OpenMetrics v2\] Histograma del tamaño de los mensajes|
| **cockroachdb.changefeed.message.size.hist.sum** <br>(count) | \[OpenMetrics v2\] Histograma del tamaño de los mensajes|
| **cockroachdb.changefeed.message_size_hist.bucket** <br>(count) | Histograma del tamaño del mensaje<br>_Se muestra como byte_ |
| **cockroachdb.changefeed.message_size_hist.count** <br>(count) | Histograma del tamaño del mensaje<br>_Se muestra como byte_ |
| **cockroachdb.changefeed.message_size_hist.sum** <br>(count) | Histograma del tamaño del mensaje<br>_Se muestra como byte_ |
| **cockroachdb.changefeed.messages.messages_pushback.count** <br>(count) | Tiempo total de limitación de la cuota de mensajes<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.nprocs_consume_event_nanos.bucket** <br>(count) | Tiempo total de espera para añadir un evento al consumidor paralelo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.nprocs_consume_event_nanos.count** <br>(count) | Tiempo total de espera para añadir un evento al consumidor paralelo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.nprocs_consume_event_nanos.sum** <br>(count) | Tiempo total de espera para añadir un evento al consumidor paralelo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.nprocs_flush_nanos.bucket** <br>(count) | Tiempo total de inactividad esperando a que el consumidor paralelo se descargue<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.nprocs_flush_nanos.count** <br>(count) | Tiempo total de inactividad esperando a que el consumidor paralelo se descargue<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.nprocs_flush_nanos.sum** <br>(count) | Tiempo total de inactividad esperando a que el consumidor paralelo se descargue<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.nprocs_in_flight** <br>(gauge) | Número de eventos almacenados en el consumidor paralelo|
| **cockroachdb.changefeed.parallel_io_queue_nanos.bucket** <br>(count) | Tiempo de espera en cola de las solicitudes salientes al sumidero debido a solicitudes en curso con claves en conflicto<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.parallel_io_queue_nanos.count** <br>(count) | Tiempo de espera en cola de las solicitudes salientes al sumidero debido a solicitudes en curso con claves en conflicto<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.parallel_io_queue_nanos.sum** <br>(count) | Tiempo de espera en cola de las solicitudes salientes al sumidero debido a solicitudes en curso con claves en conflicto<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.queue_time.count** <br>(count) | Tiempo que el evento KV estuvo esperando ser procesado<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.running** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de todos los changefeeds que se están ejecutando actualmente, incluidos los sinkless|
| **cockroachdb.changefeed.schema_registry.registrations.count** <br>(count) | Número de intentos de inscripción en el registro de esquemas|
| **cockroachdb.changefeed.schema_registry.retry.count** <br>(count) | Número de reintentos encontrados al enviar solicitudes al registro de esquemas|
| **cockroachdb.changefeed.schemafeed.table_history_scans.count** <br>(count) | Número de análisis de historiales de tablas durante el sondeo|
| **cockroachdb.changefeed.schemafeed.table_metadata.count** <br>(count) | Tiempo bloqueado mientras se verifican los historiales de metadatos de tablas<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.sink_batch_hist_nanos.bucket** <br>(count) | Tiempo transcurrido en el búfer del sumidero antes de ser vaciado y confirmado<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.sink_batch_hist_nanos.count** <br>(count) | Tiempo transcurrido en el búfer del sumidero antes de ser vaciado y confirmado<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.sink_batch_hist_nanos.sum** <br>(count) | Tiempo transcurrido en el búfer del sumidero antes de ser vaciado y confirmado<br>_Se muestra como nanosegundo_ |
| **cockroachdb.changefeed.sink_io_inflight** <br>(gauge) | Número de claves actualmente en curso como solicitudes de E/S que se envían al sumidero|
| **cockroachdb.changefeed.size_based_flushes.count** <br>(count) | Descargas totales basadas en el tamaño en todas las fuentes|
| **cockroachdb.clock.offset.meannanos** <br>(gauge) | \[OpenMetrics v1 y v2\] Desfase medio del reloj con otros nodos en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.clock.offset.stddevnanos** <br>(gauge) | \[OpenMetrics v1 y v2\] Desfase Stdddev del reloj con otros nodos en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.cloud.read_bytes.count** <br>(count) | Número de bytes leídos<br>_Se muestra como byte_ |
| **cockroachdb.cloud.write_bytes.count** <br>(count) | Número de bytes leídos<br>_Se muestra como byte_ |
| **cockroachdb.cluster.preserve_downgrade_option.last_updated** <br>(gauge) | Fecha y hora de la última actualización de preserve_downgrade_option|
| **cockroachdb.compactor.compactingnanos** <br>(count) | \[OpenMetrics v1\] Número de nanosegundos dedicados a compactar rangos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.compactor.compactingnanos.count** <br>(count) | \[OpenMetrics v2\] Número de nanosegundos dedicados a compactar rangos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.compactor.compactions.failure** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de compactación fallidas enviadas al motor de almacenamiento<br>_Se muestra como solicitud_ |
| **cockroachdb.compactor.compactions.failure.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de compactación fallidas enviadas al motor de almacenamiento<br>_Se muestra como solicitud_ |
| **cockroachdb.compactor.compactions.success** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de compactación enviadas con éxito al motor de almacenamiento<br>_Se muestra como solicitud_ |
| **cockroachdb.compactor.compactions.success.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de compactación enviadas con éxito al motor de almacenamiento<br>_Se muestra como solicitud_ |
| **cockroachdb.compactor.suggestionbytes.compacted** <br>(count) | \[OpenMetrics v1\] Número de bytes lógicos compactados a partir de las compactaciones sugeridas<br>_Se muestra como byte_ |
| **cockroachdb.compactor.suggestionbytes.compacted.count** <br>(count) | \[OpenMetrics v2\] Número de bytes lógicos compactados a partir de las compactaciones sugeridas<br>_Se muestra como byte_ |
| **cockroachdb.compactor.suggestionbytes.queued** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de bytes lógicos en compactaciones sugeridas en la cola<br>_Se muestra como byte_ |
| **cockroachdb.compactor.suggestionbytes.skipped** <br>(count) | \[OpenMetrics v1 y v2\] Número de bytes lógicos en compactaciones sugeridas que no se compactaron<br>_Se muestra como byte_ |
| **cockroachdb.compactor.suggestionbytes.skipped.count** <br>(count) | \[OpenMetrics v2\] Número de bytes lógicos en compactaciones sugeridas que no se compactaron<br>_Se muestra como byte_ |
| **cockroachdb.distsender.batch_requests.cross_region.bytes.count** <br>(count) | Recuento total de bytes de solicitudes por lotes dirigidas por réplicas procesadas entre regiones cuando los niveles de región están configurados<br>_Se muestra como byte_ |
| **cockroachdb.distsender.batch_requests.cross_zone.bytes.count** <br>(count) | Recuento total de bytes de solicitudes por lotes dirigidas por réplicas procesadas entre zonas dentro de la misma región cuando los niveles de región y zona están configurados. Sin embargo, si los niveles de región no están configurados, este recuento también puede incluir datos por lotes enviados entre diferentes regiones. Garantizar una configuración coherente de los niveles de región y zona en todos los nodos ayuda a monitorizar con precisión los datos transmitidos.<br>_Se muestra como byte_ |
| **cockroachdb.distsender.batch_requests.replica_addressed.bytes.count** <br>(count) | Recuento total de bytes de solicitudes por lotes dirigidas por réplicas procesadas<br>_Se muestra como byte_ |
| **cockroachdb.distsender.batch_responses.cross_region.bytes.count** <br>(count) | Recuento total de bytes de respuestas por lotes dirigidas por réplicas recibidas entre regiones cuando los niveles de región están configurados<br>_Se muestra como byte_ |
| **cockroachdb.distsender.batch_responses.cross_zone.bytes.count** <br>(count) | Recuento total de bytes de respuestas por lotes dirigidas por réplicas recibidas entre zonas dentro de la misma región cuando los niveles de región y zona están configurados. Sin embargo, si los niveles de región no están configurados, este recuento también puede incluir datos por lotes recibidos entre diferentes regiones. Garantizar una configuración coherente de los niveles de región y zona en todos los nodos ayuda a monitorizar con precisión los datos transmitidos.<br>_Se muestra como byte_ |
| **cockroachdb.distsender.batch_responses.replica_addressed.bytes.count** <br>(count) | Recuento total de bytes de respuestas por lotes dirigidas por réplicas recibidas<br>_Se muestra como byte_ |
| **cockroachdb.distsender.batches.async.sent.count** <br>(count) | Número de lotes parciales enviados de forma asíncrona|
| **cockroachdb.distsender.batches.async.throttled.count** <br>(count) | Número de lotes parciales no enviados de forma asíncrona debido a limitaciones|
| **cockroachdb.distsender.batches.count** <br>(count) | Número de lotes procesados|
| **cockroachdb.distsender.batches.partial** <br>(count) | \[OpenMetrics v1\] Número de lotes parciales procesados|
| **cockroachdb.distsender.batches.partial.count** <br>(count) | \[OpenMetrics v2\] Número de lotes parciales procesados|
| **cockroachdb.distsender.batches.total** <br>(count) | \[OpenMetrics v1\] Número de lotes procesados|
| **cockroachdb.distsender.batches.total.count** <br>(count) | \[OpenMetrics v2\] Número de lotes procesados|
| **cockroachdb.distsender.errors.inleasetransferbackoffs.count** <br>(count) | Número de veces que se ha hecho backoff debido a NotLeaseHolderErrors durante la transferencia del arrendamiento|
| **cockroachdb.distsender.errors.notleaseholder** <br>(count) | \[OpenMetrics v1\] Número de NotLeaseHolderErrors encontrados<br>_Se muestra como error_ |
| **cockroachdb.distsender.errors.notleaseholder.count** <br>(count) | \[OpenMetrics v2\] Número de NotLeaseHolderErrors encontrados<br>_Se muestra como error_ |
| **cockroachdb.distsender.rangefeed.catchup_ranges** <br>(gauge) | Número de rangos en modo actualización. Se cuenta el número de rangos con un rangefeed activo que está realizando un análisis de actualización.|
| **cockroachdb.distsender.rangefeed.error_catchup_ranges.count** <br>(count) | Número de rangos en modo actualización en los que se produjo un error.|
| **cockroachdb.distsender.rangefeed.restart_ranges.count** <br>(count) | Número de rangos que se reiniciaron debido a errores transitorios|
| **cockroachdb.distsender.rangefeed.retry.logical_ops_missing.count** <br>(count) | Número de rangos en los que se produjo un error LOGICAL_OPS_MISSING reintentable|
| **cockroachdb.distsender.rangefeed.retry.no_leaseholder.count** <br>(count) | Número de rangos en los que se produjo un error NO_LEASEHOLDER reintentable|
| **cockroachdb.distsender.rangefeed.retry.node_not_found.count** <br>(count) | Número de rangos en los que se produjo un error NODE_NOT_FOUND reintentable|
| **cockroachdb.distsender.rangefeed.retry.raft_snapshot.count** <br>(count) | Número de rangos en los que se produjo un error RAFT_SNAPSHOT reintentable|
| **cockroachdb.distsender.rangefeed.retry.range_key_mismatch.count** <br>(count) | Número de rangos en los que se produjo un error RANGE_KEY_MISMATCH reintentable|
| **cockroachdb.distsender.rangefeed.retry.range_merged.count** <br>(count) | Número de rangos en los que se produjo un error RANGE_MERGED reintentable|
| **cockroachdb.distsender.rangefeed.retry.range_not_found.count** <br>(count) | Número de rangos en los que se produjo un error RANGE_NOT_FOUND reintentable|
| **cockroachdb.distsender.rangefeed.retry.range_split.count** <br>(count) | Número de rangos en los que se produjo un error RANGE_SPLIT reintentable|
| **cockroachdb.distsender.rangefeed.retry.rangefeed_closed.count** <br>(count) | Número de rangos en los que se produjo un error RANGEFEED_CLOSED reintentable|
| **cockroachdb.distsender.rangefeed.retry.replica_removed.count** <br>(count) | Número de rangos en los que se produjo un error REPLICA_REMOVED reintentable|
| **cockroachdb.distsender.rangefeed.retry.send.count** <br>(count) | Número de en los que se produjo un error SEND reintentable|
| **cockroachdb.distsender.rangefeed.retry.slow_consumer.count** <br>(count) | Número de rangos en los que se produjo un error SLOW_CONSUMER reintentable|
| **cockroachdb.distsender.rangefeed.retry.store_not_found.count** <br>(count) | Número de rangos en los que se produjo un error STORE_NOT_FOUND reintentable|
| **cockroachdb.distsender.rangefeed.retry.stuck.count** <br>(count) | Número de rangos en los que se produjo un error STUCK reintentable|
| **cockroachdb.distsender.rangefeed.total_ranges** <br>(gauge) | Número de rangos que ejecutan el rangefeed. Se cuenta el número de rangos con un rangefeed activo.|
| **cockroachdb.distsender.rangelookups.count** <br>(count) | Número de búsquedas de rangos|
| **cockroachdb.distsender.rpc.addsstable.sent.count** <br>(count) | Número de solicitudes AddSSTable procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.adminchangereplicas.sent.count** <br>(count) | Número de solicitudes AdminChangeReplicas procesadas. Se cuentan las solicitudes en lotes entregados a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.adminmerge.sent.count** <br>(count) | Número de solicitudes AdminMerge procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.adminrelocaterange.sent.count** <br>(count) | Número de solicitudes AdminRelocateRange procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.adminscatter.sent.count** <br>(count) | Número de solicitudes AdminScatter procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.adminsplit.sent.count** <br>(count) | Número de solicitudes AdminSplit procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.admintransferlease.sent.count** <br>(count) | Número de solicitudes AdminTransferLease procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.adminunsplit.sent.count** <br>(count) | Número de solicitudes AdminUnsplit procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.adminverifyprotectedtimestamp.sent.count** <br>(count) | Número de solicitudes AdminVerifyProtectedTimestamp procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.barrier.sent.count** <br>(count) | Número de solicitudes Barrier procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.checkconsistency.sent.count** <br>(count) | Número de solicitudes CheckConsistency procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.clearrange.sent.count** <br>(count) | Número de solicitudes ClearRange procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.computechecksum.sent.count** <br>(count) | Número de solicitudes ComputeChecksum procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.conditionalput.sent.count** <br>(count) | Número de solicitudes ConditionalPut procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.delete.sent.count** <br>(count) | Número de solicitudes Delete procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.deleterange.sent.count** <br>(count) | Número de solicitudes DeleteRange procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.endtxn.sent.count** <br>(count) | Número de solicitudes EndTxn procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.err.ambiguousresulterrtype.count** <br>(count) | Número de errores AmbiguousResultErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.batchtimestampbeforegcerrtype.count** <br>(count) | Número de errores BatchTimestampBeforeGCErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.communicationerrtype.count** <br>(count) | Número de errores CommunicationErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.conditionfailederrtype.count** <br>(count) | Número de errores ConditionFailedErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.errordetailtype.count** <br>(count) | Número de errores ErrorDetailType (etiquetados por su número) recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.indeterminatecommiterrtype.count** <br>(count) | Número de errores IndeterminateCommitErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.integeroverflowerrtype.count** <br>(count) | Número de errores IntegerOverflowErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.intentmissingerrtype.count** <br>(count) | Número de errores IntentMissingErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.internalerrtype.count** <br>(count) | Número de errores InternalErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.invalidleaseerrtype.count** <br>(count) | Número de errores InvalidLeaseErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.leaserejectederrtype.count** <br>(count) | Número de errores LeaseRejectedErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.lockconflicterrtype.count** <br>(count) | Número de errores LockConflictErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.mergeinprogresserrtype.count** <br>(count) | Número de errores MergeInProgressErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.mintimestampboundunsatisfiableerrtype.count** <br>(count) | Número de errores MinTimestampBoundUnsatisfiableErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.mvcchistorymutationerrtype.count** <br>(count) | Número de errores MVCCHistoryMutationErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.nodeunavailableerrtype.count** <br>(count) | Número de errores NodeUnavailableErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.notleaseholdererrtype.count** <br>(count) | Número de errores NotLeaseHolderErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.oprequirestxnerrtype.count** <br>(count) | Número de errores OpRequiresTxnErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.optimisticevalconflictserrtype.count** <br>(count) | Número de errores OptimisticEvalConflictsErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.raftgroupdeletederrtype.count** <br>(count) | Número de errores RaftGroupDeletedErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.rangefeedretryerrtype.count** <br>(count) | Número de errores RangeFeedRetryErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.rangekeymismatcherrtype.count** <br>(count) | Number of RangeKeyMismatchErrType errors received replica-bound RPCsEsto cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde las réplicas como parte de la ejecución de peticiones de posible alcance. Los fallos para alcanzar la réplica de destino se contabilizarán como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.rangenotfounderrtype.count** <br>(count) | Número de errores RangeNotFoundErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.readwithinuncertaintyintervalerrtype.count** <br>(count) | Número de errores ReadWithinUncertaintyIntervalErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.refreshfailederrtype.count** <br>(count) | Número de errores RefreshFailedErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.replicacorruptionerrtype.count** <br>(count) | Número de errores ReplicaCorruptionErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.replicatooolderrtype.count** <br>(count) | Número de errores ReplicaTooOldErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.storenotfounderrtype.count** <br>(count) | Número de errores StoreNotFoundErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.transactionabortederrtype.count** <br>(count) | Número de errores TransactionAbortedErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.transactionpusherrtype.count** <br>(count) | Número de errores TransactionPushErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.transactionretryerrtype.count** <br>(count) | Número de errores TransactionRetryErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.transactionretrywithprotorefresherrtype.count** <br>(count) | Número de errores TransactionRetryWithProtoRefreshErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.transactionstatuserrtype.count** <br>(count) | Número de errores TransactionStatusErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.txnalreadyencounterederrtype.count** <br>(count) | Número de errores TxnAlreadyEncounteredErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.unsupportedrequesterrtype.count** <br>(count) | Número de errores UnsupportedRequestErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.writeintenterrtype.count** <br>(count) | Número de errores WriteIntentErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.err.writetooolderrtype.count** <br>(count) | Número de errores WriteTooOldErrType recibidos de RPC de replicación. Se cuenta la frecuencia con la que un error del tipo especificado fue recibido de vuelta desde réplicas como parte de la ejecución de solicitudes que posiblemente abarcan un rango. La imposibilidad de alcanzar la réplica de destino se contabiliza como 'roachpb.CommunicationErrType' y los errores no clasificados como 'roachpb.InternalErrType'.|
| **cockroachdb.distsender.rpc.export.sent.count** <br>(count) | Número de solicitudes Export procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.gc.sent.count** <br>(count) | Número de solicitudes GC procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.get.sent.count** <br>(count) | Número de solicitudes Get procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.heartbeattxn.sent.count** <br>(count) | Número de solicitudes HeartbeatTxn procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.increment.sent.count** <br>(count) | Número de solicitudes Increment procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.initput.sent.count** <br>(count) | Número de solicitudes InitPut procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.isspanempty.sent.count** <br>(count) | Número de solicitudes IsSpanEmpty procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.leaseinfo.sent.count** <br>(count) | Número de solicitudes LeaseInfo procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.merge.sent.count** <br>(count) | Número de solicitudes Merge procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.migrate.sent.count** <br>(count) | Número de solicitudes Migrate procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.probe.sent.count** <br>(count) | Número de solicitudes Probe procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.pushtxn.sent.count** <br>(count) | Número de solicitudes PushTxn procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.put.sent.count** <br>(count) | Número de solicitudes Put procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.queryintent.sent.count** <br>(count) | Número de solicitudes QueryIntent procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.querylocks.sent.count** <br>(count) | Número de solicitudes QueryLocks procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.queryresolvedtimestamp.sent.count** <br>(count) | Número de solicitudes QueryResolvedTimestamp procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.querytxn.sent.count** <br>(count) | Número de solicitudes QueryTxn procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.rangestats.sent.count** <br>(count) | Número de solicitudes RangeStats procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.recomputestats.sent.count** <br>(count) | Número de solicitudes RecomputeStats procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.recovertxn.sent.count** <br>(count) | Número de solicitudes RecoverTxn procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.refresh.sent.count** <br>(count) | Número de solicitudes Refresh procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.refreshrange.sent.count** <br>(count) | Número de solicitudes RefreshRange procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.requestlease.sent.count** <br>(count) | Número de solicitudes RequestLease procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.resolveintent.sent.count** <br>(count) | Número de solicitudes ResolveIntent procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.resolveintentrange.sent.count** <br>(count) | Número de solicitudes ResolveIntentRange procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.reversescan.sent.count** <br>(count) | Número de solicitudes ReverseScan procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.revertrange.sent.count** <br>(count) | Número de solicitudes RevertRange procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.scan.sent.count** <br>(count) | Número de solicitudes Scan procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.sent.count** <br>(count) | Número de RPC dirigidas por réplicas enviadas|
| **cockroachdb.distsender.rpc.sent.local** <br>(count) | \[OpenMetrics v1\] Número de RPC locales enviadas|
| **cockroachdb.distsender.rpc.sent.local.count** <br>(count) | \[OpenMetrics v2\] Número de RPC locales enviadas|
| **cockroachdb.distsender.rpc.sent.nextreplicaerror** <br>(count) | \[OpenMetrics v1\] Número de RPC enviadas debido a errores por réplica<br>_Se muestra como error_ |
| **cockroachdb.distsender.rpc.sent.nextreplicaerror.count** <br>(count) | \[OpenMetrics v2\] Número de RPC enviadas debido a errores por réplica<br>_Se muestra como error_ |
| **cockroachdb.distsender.rpc.sent.total** <br>(count) | \[OpenMetrics v1\] Número de RPC enviadas|
| **cockroachdb.distsender.rpc.sent.total.count** <br>(count) | \[OpenMetrics v2\] Número de RPC dirigidas por réplicas enviadas|
| **cockroachdb.distsender.rpc.subsume.sent.count** <br>(count) | Número de solicitudes Subsume procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.transferlease.sent.count** <br>(count) | Número de solicitudes TransferLease procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.truncatelog.sent.count** <br>(count) | Número de solicitudes TruncateLog procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.distsender.rpc.writebatch.sent.count** <br>(count) | Número de solicitudes WriteBatch procesadas. Se cuentan las solicitudes en lotes entregadas a DistSender, no las RPC enviadas a rangos individuales como resultado.|
| **cockroachdb.exec.error** <br>(count) | \[OpenMetrics v1\] Número de solicitudes KV por lotes que no se pudieron ejecutar en este nodo. Estas advertencias indican una limpieza en lugar de errores, y pueden ignorarse como parte de la operación.<br>_Se muestra como solicitud_ |
| **cockroachdb.exec.error.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes KV por lotes que no se pudieron ejecutar en este nodo. Estas advertencias indican una limpieza en lugar de errores, y pueden ignorarse como parte de la operación.<br>_Se muestra como solicitud_ |
| **cockroachdb.exec.latency** <br>(gauge) | \[OpenMetrics v1\] Latencia en nanosegundos de las solicitudes KV por lotes ejecutadas en este nodo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.exec.latency.bucket** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de las solicitudes KV por lotes ejecutadas en este nodo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.exec.latency.count** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de las solicitudes KV por lotes ejecutadas en este nodo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.exec.latency.sum** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de las solicitudes KV por lotes ejecutadas en este nodo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.exec.success** <br>(count) | \[OpenMetrics v1\] Número de solicitudes KV por lotes ejecutadas con éxito en este nodo<br>_Se muestra como solicitud_ |
| **cockroachdb.exec.success.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes KV por lotes ejecutadas con éxito en este nodo<br>_Se muestra como solicitud_ |
| **cockroachdb.exportrequest.delay.count** <br>(count) | Número de solicitudes Export retrasadas debido a solicitudes concurrentes|
| **cockroachdb.follower_reads.success_count.count** <br>(count) | Número de lecturas de seguidores exitosas|
| **cockroachdb.gcbytesage** <br>(gauge) | \[OpenMetrics v1 y v2\] Antigüedad acumulada de los datos no activos en segundos<br>_Se muestra como segundo_ |
| **cockroachdb.gossip.bytes.received** <br>(count) | \[OpenMetrics v1\] Número de bytes gossip recibidos<br>_Se muestra como byte_ |
| **cockroachdb.gossip.bytes.received.count** <br>(count) | \[OpenMetrics v2\] Número de bytes gossip recibidos<br>_Se muestra como byte_ |
| **cockroachdb.gossip.bytes.sent** <br>(count) | \[OpenMetrics v1\] Número de bytes gossip enviados<br>_Se muestra como byte_ |
| **cockroachdb.gossip.bytes.sent.count** <br>(count) | \[OpenMetrics v2\] Número de bytes gossip enviados<br>_Se muestra como byte_ |
| **cockroachdb.gossip.connections.incoming** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de conexiones gossip entrantes activas<br>_Se muestra como conexión_ |
| **cockroachdb.gossip.connections.outgoing** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de conexiones gossip salientes activas<br>_Se muestra como conexión_ |
| **cockroachdb.gossip.connections.refused** <br>(count) | \[OpenMetrics v1\] Número de conexiones gossip entrantes rechazadas<br>_Se muestra como conexión_ |
| **cockroachdb.gossip.connections.refused.count** <br>(count) | \[OpenMetrics v2\] Número de conexiones gossip entrantes rechazadas<br>_Se muestra como conexión_ |
| **cockroachdb.gossip.infos.received** <br>(count) | \[OpenMetrics v1\] Número de objetos de información gossip recibidos|
| **cockroachdb.gossip.infos.received.count** <br>(count) | \[OpenMetrics v2\] Número de objetos de información gossip recibidos|
| **cockroachdb.gossip.infos.sent** <br>(count) | \[OpenMetrics v1\] Número de objetos de información gossip enviados|
| **cockroachdb.gossip.infos.sent.count** <br>(count) | \[OpenMetrics v2\] Número de objetos de información gossip enviados|
| **cockroachdb.intentage** <br>(gauge) | \[OpenMetrics v1 y v2\] Antigüedad acumulada de intenciones en segundos<br>_Se muestra como segundo_ |
| **cockroachdb.intentbytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de bytes en pares KV de intenciones<br>_Se muestra como byte_ |
| **cockroachdb.intentcount** <br>(gauge) | \[OpenMetrics v1 y v2\] Recuento de claves de intención<br>_Se muestra como clave_ |
| **cockroachdb.intentresolver.async.throttled** <br>(count) | Número de intentos de resolución de intenciones no ejecutados de forma asíncrona debido a limitaciones|
| **cockroachdb.intentresolver.async.throttled.count** <br>(count) | Número de intentos de resolución de intenciones no ejecutados de forma asíncrona debido a limitaciones|
| **cockroachdb.intentresolver.finalized_txns.failed** <br>(count) | Número de fallos de limpieza de transacciones finalizadas. La limpieza de transacciones se refiere al proceso de resolución de todas las intenciones de una transacción y luego de recolección de su registro de transacciones.|
| **cockroachdb.intentresolver.finalized_txns.failed.count** <br>(count) | Número de fallos de limpieza de transacciones finalizadas. La limpieza de transacciones se refiere al proceso de resolución de todas las intenciones de una transacción y luego de recolección de su registro de transacciones.|
| **cockroachdb.intentresolver.intents.failed** <br>(count) | Número de fallos en la resolución de intenciones. La unidad de medida es una sola intención, por lo que si falla un lote de solicitudes de resolución de intenciones, la métrica se incrementará por cada solicitud del lote.|
| **cockroachdb.intentresolver.intents.failed.count** <br>(count) | Número de fallos en la resolución de intenciones. La unidad de medida es una sola intención, por lo que si falla un lote de solicitudes de resolución de intenciones, la métrica se incrementará por cada solicitud del lote.|
| **cockroachdb.intents.abort_attempts** <br>(count) | Recuento de intentos de evaluación de intenciones de cancelación de no envenenamiento (punto o rango)|
| **cockroachdb.intents.abort_attempts.count** <br>(count) | Recuento de intentos de evaluación de intenciones de cancelación de no envenenamiento (punto o rango)|
| **cockroachdb.intents.poison_attempts** <br>(count) | Recuento de intentos de evaluación de intenciones de cancelación de envenenamiento (punto o rango)|
| **cockroachdb.intents.poison_attempts.count** <br>(count) | Recuento de intentos de evaluación de intenciones de cancelación de envenenamiento (punto o rango)|
| **cockroachdb.intents.resolve_attempts** <br>(count) | Recuento de intentos de evaluación de confirmaciones de intenciones (punto o rango)|
| **cockroachdb.intents.resolve_attempts.count** <br>(count) | Recuento de intentos de evaluación de confirmaciones de intenciones (punto o rango)|
| **cockroachdb.jobs.adopt_iterations.count** <br>(count) | Número de iteraciones de adopción de trabajos realizadas por el registro|
| **cockroachdb.jobs.auto.create.stats.currently_paused** <br>(gauge) | Número de trabajos de auto_create_stats actualmente considerados como pausados|
| **cockroachdb.jobs.auto.create.stats.currently_running** <br>(gauge) | Número de trabajos de auto_create_stats que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.auto.create.stats.resume_failed.count** <br>(count) | Número de trabajos de auto_create_stats que fallaron con un error no reintentable|
| **cockroachdb.jobs.auto_config_env_runner.currently_idle** <br>(gauge) | Número de trabajos de auto_config_env_runner actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.auto_config_env_runner.currently_paused** <br>(gauge) | Número de trabajos de auto_config_env_runner actualmente considerados como pausados|
| **cockroachdb.jobs.auto_config_env_runner.currently_running** <br>(gauge) | Número de trabajos de auto_config_env_runner que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.auto_config_env_runner.expired_pts_records.count** <br>(count) | Número de registros timestamp protegidos caducados que son propiedad de trabajos de auto_config_env_runner|
| **cockroachdb.jobs.auto_config_env_runner.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de auto_config_env_runner que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_config_env_runner.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de auto_config_env_runner que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_config_env_runner.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de auto_config_env_runner que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_config_env_runner.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de auto_config_env_runner<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.auto_config_env_runner.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos por trabajos de auto_config_env_runner|
| **cockroachdb.jobs.auto_config_env_runner.resume_completed.count** <br>(count) | Número de trabajos de auto_config_env_runner reanudados con éxito hasta completarse|
| **cockroachdb.jobs.auto_config_env_runner.resume_failed.count** <br>(count) | Número de trabajos de auto_config_env_runner que fallaron con un error no reintentable|
| **cockroachdb.jobs.auto_config_env_runner.resume_retry_error.count** <br>(count) | Número de trabajos de auto_config_env_runner que fallaron con un error reintentable|
| **cockroachdb.jobs.auto_config_runner.currently_idle** <br>(gauge) | Número de trabajos de auto_config_runner actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.auto_config_runner.currently_paused** <br>(gauge) | Número de trabajos de auto_config_runner actualmente considerados como pausados|
| **cockroachdb.jobs.auto_config_runner.currently_running** <br>(gauge) | Número de trabajos de auto_config_runner que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.auto_config_runner.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que pertenecen a trabajos de auto_config_runner|
| **cockroachdb.jobs.auto_config_runner.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de auto_config_runner que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_config_runner.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de auto_config_runner que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_config_runner.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de auto_config_runner que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_config_runner.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de auto_config_runner<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.auto_config_runner.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos por trabajos de auto_config_runner|
| **cockroachdb.jobs.auto_config_runner.resume_completed.count** <br>(count) | Número de trabajos de auto_config_runner reanudados con éxito hasta completarse|
| **cockroachdb.jobs.auto_config_runner.resume_failed.count** <br>(count) | Número de trabajos de auto_config_runner que fallaron con un error no reintentable|
| **cockroachdb.jobs.auto_config_runner.resume_retry_error.count** <br>(count) | Número de trabajos de auto_config_runner que fallaron con un error reintentable|
| **cockroachdb.jobs.auto_config_task.currently_idle** <br>(gauge) | Número de trabajos de auto_config_task actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.auto_config_task.currently_paused** <br>(gauge) | Número de trabajos de auto_config_task actualmente considerados como pausados|
| **cockroachdb.jobs.auto_config_task.currently_running** <br>(gauge) | Número de trabajos de auto_config_task que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.auto_config_task.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de auto_config_task|
| **cockroachdb.jobs.auto_config_task.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de auto_config_task que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_config_task.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de auto_config_task que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_config_task.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de auto_config_task que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_config_task.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de auto_config_task<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.auto_config_task.protected_record_count** <br>(gauge) | Número de registros de fecha y hora mantenidos por trabajos de auto_config_task|
| **cockroachdb.jobs.auto_config_task.resume_completed.count** <br>(count) | Número de trabajos de auto_config_task reanudados con éxito hasta completarse|
| **cockroachdb.jobs.auto_config_task.resume_failed.count** <br>(count) | Número de trabajos de auto_config_task que fallaron con un error no reintentable|
| **cockroachdb.jobs.auto_config_task.resume_retry_error.count** <br>(count) | Número de trabajos de auto_config_task que fallaron con un error reintentable|
| **cockroachdb.jobs.auto_create_stats.currently_idle** <br>(gauge) | Número de trabajos de auto_create_stats actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.auto_create_stats.currently_paused** <br>(gauge) | Número de trabajos de auto_create_stats actualmente considerados como pausados|
| **cockroachdb.jobs.auto_create_stats.currently_running** <br>(gauge) | Número de trabajos de auto_create_stats que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.auto_create_stats.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de auto_config_stats|
| **cockroachdb.jobs.auto_create_stats.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de auto_create_stats que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_create_stats.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de auto_create_stats que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_create_stats.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de auto_create_stats que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_create_stats.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de auto_create_stats<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.auto_create_stats.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de auto_create_stats|
| **cockroachdb.jobs.auto_create_stats.resume_completed.count** <br>(count) | Número de trabajos de auto_create_stats reanudados con éxito hasta completarse|
| **cockroachdb.jobs.auto_create_stats.resume_failed.count** <br>(count) | Número de trabajos de auto_create_stats que fallaron con un error no reintentable|
| **cockroachdb.jobs.auto_create_stats.resume_retry_error.count** <br>(count) | Número de trabajos de auto_create_stats que fallaron con un error reintentable|
| **cockroachdb.jobs.auto_schema_telemetry.currently_idle** <br>(gauge) | Número de trabajos de auto_schema_telemetry actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.auto_schema_telemetry.currently_paused** <br>(gauge) | Número de trabajos de auto_schema_telemetry actualmente considerados como pausados|
| **cockroachdb.jobs.auto_schema_telemetry.currently_running** <br>(gauge) | Número de trabajos de auto_schema_telemetry que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.auto_schema_telemetry.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de auto_schema_telemetry|
| **cockroachdb.jobs.auto_schema_telemetry.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de auto_schema_telemetry que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_schema_telemetry.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de auto_schema_telemetry que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_schema_telemetry.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de auto_schema_telemetry que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_schema_telemetry.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de auto_schema_telemetry<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.auto_schema_telemetry.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de auto_schema_telemetry|
| **cockroachdb.jobs.auto_schema_telemetry.resume_completed.count** <br>(count) | Número de trabajos de auto_schema_telemetry reanudados con éxito hasta completarse|
| **cockroachdb.jobs.auto_schema_telemetry.resume_failed.count** <br>(count) | Número de trabajos de auto_schema_telemetry que fallaron con un error no reintentable|
| **cockroachdb.jobs.auto_schema_telemetry.resume_retry_error.count** <br>(count) | Número de trabajos de auto_schema_telemetry que fallaron con un error reintentable|
| **cockroachdb.jobs.auto_span_config_reconciliation.currently_idle** <br>(gauge) | Número de trabajos de auto_span_config_reconciliation actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.auto_span_config_reconciliation.currently_paused** <br>(gauge) | Número de trabajos de auto_span_config_reconciliation actualmente considerados como pausados|
| **cockroachdb.jobs.auto_span_config_reconciliation.currently_running** <br>(gauge) | Número de trabajos de auto_span_config_reconciliation que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.auto_span_config_reconciliation.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de auto_span_config_reconciliation|
| **cockroachdb.jobs.auto_span_config_reconciliation.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de auto_span_config_reconciliation que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_span_config_reconciliation.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de auto_span_config_reconciliation que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_span_config_reconciliation.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de auto_span_config_reconciliation que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_span_config_reconciliation.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de auto_span_config_reconciliation<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.auto_span_config_reconciliation.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos caducados mantenidos por trabajos de auto_span_config_reconciliation|
| **cockroachdb.jobs.auto_span_config_reconciliation.resume_completed.count** <br>(count) | Número de trabajos de auto_span_config_reconciliation reanudados con éxito hasta completarse|
| **cockroachdb.jobs.auto_span_config_reconciliation.resume_failed.count** <br>(count) | Número de trabajos de auto_span_config_reconciliation que fallaron con un error no reintentable|
| **cockroachdb.jobs.auto_span_config_reconciliation.resume_retry_error.count** <br>(count) | Número de trabajos de auto_span_config_reconciliation que fallaron con un error reintentable|
| **cockroachdb.jobs.auto_sql_stats_compaction.currently_idle** <br>(gauge) | Número de trabajos de auto_sql_stats_compaction actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.auto_sql_stats_compaction.currently_paused** <br>(gauge) | Número de trabajos de auto_sql_stats_compaction actualmente considerados como pausados|
| **cockroachdb.jobs.auto_sql_stats_compaction.currently_running** <br>(gauge) | Número de trabajos de auto_sql_stats_compaction que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.auto_sql_stats_compaction.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de auto_sql_stats_compaction|
| **cockroachdb.jobs.auto_sql_stats_compaction.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de auto_sql_stats_compaction que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_sql_stats_compaction.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de auto_sql_stats_compaction que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_sql_stats_compaction.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de auto_sql_stats_compaction que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_sql_stats_compaction.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de auto_sql_stats_compaction<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.auto_sql_stats_compaction.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de auto_sql_stats_compaction|
| **cockroachdb.jobs.auto_sql_stats_compaction.resume_completed.count** <br>(count) | Número de trabajos de auto_sql_stats_compaction reanudados con éxito hasta completarse|
| **cockroachdb.jobs.auto_sql_stats_compaction.resume_failed.count** <br>(count) | Número de trabajos de auto_sql_stats_compaction que fallaron con un error no reintentable|
| **cockroachdb.jobs.auto_sql_stats_compaction.resume_retry_error.count** <br>(count) | Número de trabajos de auto_sql_stats_compaction que fallaron con un error reintentable|
| **cockroachdb.jobs.auto_update_sql_activity.currently_idle** <br>(gauge) | Número de trabajos de auto_update_sql_activity actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.auto_update_sql_activity.currently_paused** <br>(gauge) | Número de trabajos de auto_update_sql_activity actualmente considerados como pausados|
| **cockroachdb.jobs.auto_update_sql_activity.currently_running** <br>(gauge) | Número de trabajos de auto_update_sql_activity que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.auto_update_sql_activity.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de auto_update_sql_activity|
| **cockroachdb.jobs.auto_update_sql_activity.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de auto_update_sql_activity que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_update_sql_activity.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de auto_update_sql_activity que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_update_sql_activity.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de auto_update_sql_activity que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.auto_update_sql_activity.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de auto_update_sql_activity<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.auto_update_sql_activity.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de auto_update_sql_activity|
| **cockroachdb.jobs.auto_update_sql_activity.resume_completed.count** <br>(count) | Número de trabajos de auto_update_sql_activity reanudados con éxito hasta completarse|
| **cockroachdb.jobs.auto_update_sql_activity.resume_failed.count** <br>(count) | Número de trabajos de auto_update_sql_activity que fallaron con un error no reintentable|
| **cockroachdb.jobs.auto_update_sql_activity.resume_retry_error.count** <br>(count) | Número de trabajos de auto_update_sql_activity que fallaron con un error reintentable|
| **cockroachdb.jobs.backup.currently_idle** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de trabajos de copia de seguridad actualmente considerados como inactivos y que pueden cerrarse libremente<br>_Se muestra como trabajo_ |
| **cockroachdb.jobs.backup.currently_paused** <br>(gauge) | Número de trabajos de copia de seguridad actualmente considerados como pausados|
| **cockroachdb.jobs.backup.currently_running** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de trabajos de copia de seguridad que se están ejecutando actualmente en estado Resume u OnFailOrCancel<br>_Se muestra como trabajo_ |
| **cockroachdb.jobs.backup.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de copia de seguridad|
| **cockroachdb.jobs.backup.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de copia de seguridad que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.backup.fail_or_cancel_failed** <br>(count) | \[OpenMetrics v1\] Número de trabajos de copia de seguridad que fallaron con un error no reintentable en su proceso de fallo o cancelación<br>_Se muestra como trabajo_ |
| **cockroachdb.jobs.backup.fail_or_cancel_failed.count** <br>(count) | \[OpenMetrics v2\] Número de trabajos de copia de seguridad que fallaron con un error no reintentable en su proceso de fallo o cancelación<br>_Se muestra como trabajo_ |
| **cockroachdb.jobs.backup.fail_or_cancel_retry_error** <br>(count) | \[OpenMetrics v1\] Número de trabajos de copia de seguridad que fallaron con un error reintentable en su proceso de fallo o cancelación<br>_Se muestra como trabajo_ |
| **cockroachdb.jobs.backup.fail_or_cancel_retry_error.count** <br>(count) | \[OpenMetrics v2\] Número de trabajos de copia de seguridad que fallaron con un error reintentable en su proceso de fallo o cancelación<br>_Se muestra como trabajo_ |
| **cockroachdb.jobs.backup.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de copia de seguridad<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.backup.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de copia de seguridad|
| **cockroachdb.jobs.backup.resume_completed.count** <br>(count) | Número de trabajos de copia de seguridad reanudados con éxito hasta completarse|
| **cockroachdb.jobs.backup.resume_failed** <br>(count) | \[OpenMetrics v1\] Número de trabajos de copia de seguridad que fallaron con un error no reintentable<br>_Se muestra como trabajo_ |
| **cockroachdb.jobs.backup.resume_failed.count** <br>(count) | \[OpenMetrics v2\] Número de trabajos de copia de seguridad que fallaron con un error no reintentable<br>_Se muestra como trabajo_ |
| **cockroachdb.jobs.backup.resume_retry_error** <br>(count) | \[OpenMetrics v1\] Número de trabajos de copia de seguridad que fallaron con un error reintentable<br>_Se muestra como trabajo_ |
| **cockroachdb.jobs.backup.resume_retry_error.count** <br>(count) | \[OpenMetrics v2\] Número de trabajos de copia de seguridad que fallaron con un error reintentable<br>_Se muestra como trabajo_ |
| **cockroachdb.jobs.changefeed.currently_idle** <br>(gauge) | Número de trabajos de changefeeds actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.changefeed.currently_paused** <br>(gauge) | Número de trabajos de changefeeds actualmente considerados como pausados|
| **cockroachdb.jobs.changefeed.currently_running** <br>(gauge) | Número de trabajos de changefeeds que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.changefeed.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de changefeeds|
| **cockroachdb.jobs.changefeed.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de changefeeds que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.changefeed.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de changefeeds que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.changefeed.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de changefeeds que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.changefeed.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de changefeeds<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.changefeed.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de changefeeds|
| **cockroachdb.jobs.changefeed.resume.retry.error** <br>(count) | \[OpenMetrics v1\] Número de trabajos de changefeeds que fallaron con un error reintentable|
| **cockroachdb.jobs.changefeed.resume.retry.error.count** <br>(count) | \[OpenMetrics v2\] Número de trabajos de changefeeds que fallaron con un error reintentable|
| **cockroachdb.jobs.changefeed.resume_completed.count** <br>(count) | Número de trabajos de fuentes de changefeeds reanudados con éxito hasta completarse|
| **cockroachdb.jobs.changefeed.resume_failed.count** <br>(count) | Número de trabajos de changefeeds que fallaron con un error no reintentable|
| **cockroachdb.jobs.changefeed.resume_retry_error.count** <br>(count) | Número de trabajos de changefeeds que fallaron con un error reintentable|
| **cockroachdb.jobs.claimed_jobs.count** <br>(count) | Número de trabajos reclamados en iteraciones de adopción de trabajos|
| **cockroachdb.jobs.create.stats.currently_running** <br>(gauge) | Número de trabajos de create_stats que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.create_stats.currently_idle** <br>(gauge) | Número de trabajos de create_stats actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.create_stats.currently_paused** <br>(gauge) | Número de trabajos de create_stats actualmente considerados como pausados|
| **cockroachdb.jobs.create_stats.currently_running** <br>(gauge) | Número de trabajos de create_stats que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.create_stats.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de create_stats jobs|
| **cockroachdb.jobs.create_stats.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de create_stats que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.create_stats.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de create_stats que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.create_stats.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de create_stats que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.create_stats.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de create_stats jobs<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.create_stats.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de create_stats jobs|
| **cockroachdb.jobs.create_stats.resume_completed.count** <br>(count) | Número de trabajos de create_stats reanudados con éxito hasta completarse|
| **cockroachdb.jobs.create_stats.resume_failed.count** <br>(count) | Número de trabajos de create_stats jobs que fallaron con un error no reintentable|
| **cockroachdb.jobs.create_stats.resume_retry_error.count** <br>(count) | Número de trabajos de create_stats jobs que fallaron con un error reintentable|
| **cockroachdb.jobs.import.currently_idle** <br>(gauge) | Número de trabajos de importación actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.import.currently_paused** <br>(gauge) | Número de trabajos de importación actualmente considerados como pausados|
| **cockroachdb.jobs.import.currently_running** <br>(gauge) | Número de trabajos de importación que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.import.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de importación|
| **cockroachdb.jobs.import.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de importación que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.import.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de importación que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.import.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de importación que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.import.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de importación<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.import.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de importación|
| **cockroachdb.jobs.import.resume_completed.count** <br>(count) | Número de trabajos de importación reanudados con éxito hasta completarse|
| **cockroachdb.jobs.import.resume_failed.count** <br>(count) | Número de trabajos de importación que fallaron con un error no reintentable|
| **cockroachdb.jobs.import.resume_retry_error.count** <br>(count) | Número de trabajos de importación que fallaron con un error reintentable|
| **cockroachdb.jobs.key_visualizer.currently_idle** <br>(gauge) | Número de trabajos de key_visualizer actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.key_visualizer.currently_paused** <br>(gauge) | Número de trabajos de key_visualizer actualmente considerados como pausados|
| **cockroachdb.jobs.key_visualizer.currently_running** <br>(gauge) | Número de trabajos de key_visualizer que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.key_visualizer.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de key_visualizer|
| **cockroachdb.jobs.key_visualizer.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de key_visualizer que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.key_visualizer.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de key_visualizer que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.key_visualizer.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de key_visualizer que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.key_visualizer.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de key_visualizer<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.key_visualizer.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de key_visualizer|
| **cockroachdb.jobs.key_visualizer.resume_completed.count** <br>(count) | Número de trabajos de key_visualizer reanudados con éxito hasta completarse|
| **cockroachdb.jobs.key_visualizer.resume_failed.count** <br>(count) | Número de trabajos de key_visualizer que fallaron con un error no reintentable|
| **cockroachdb.jobs.key_visualizer.resume_retry_error.count** <br>(count) | Número de trabajos de key_visualizer que fallaron con un error reintentable|
| **cockroachdb.jobs.metrics.task_failed.count** <br>(count) | Número de tareas del actualizador de actividades sql de métricas que fallaron|
| **cockroachdb.jobs.migration.currently_idle** <br>(gauge) | Número de trabajos de migración actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.migration.currently_paused** <br>(indicador) | Número de trabajos de migración actualmente considerados como pausados|
| **cockroachdb.jobs.migration.currently_running** <br>(gauge) | Número de trabajos de migración que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.migration.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de migración|
| **cockroachdb.jobs.migration.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de migración que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.migration.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de migración que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.migration.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de migración que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.migration.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de migración<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.migration.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de migración|
| **cockroachdb.jobs.migration.resume_completed.count** <br>(count) | Número de trabajos de migración reanudados con éxito hasta completarse|
| **cockroachdb.jobs.migration.resume_failed.count** <br>(count) | Número de trabajos de migración que fallaron con un error no reintentable|
| **cockroachdb.jobs.migration.resume_retry_error.count** <br>(count) | Número de trabajos de migración que fallaron con un error reintentable|
| **cockroachdb.jobs.mvcc_statistics_update.currently_idle** <br>(gauge) | Número de trabajos de mvcc_statistics_update actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.mvcc_statistics_update.currently_paused** <br>(gauge) | Número de trabajos mvcc_statistics_update actualmente considerados como pausados|
| **cockroachdb.jobs.mvcc_statistics_update.currently_running** <br>(gauge) | Número de trabajos de mvcc_statistics_update que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.mvcc_statistics_update.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de mvcc_statistics_update|
| **cockroachdb.jobs.mvcc_statistics_update.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de mvcc_statistics_update que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.mvcc_statistics_update.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de mvcc_statistics_update que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.mvcc_statistics_update.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de mvcc_statistics_update que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.mvcc_statistics_update.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de mvcc_statistics_update<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.mvcc_statistics_update.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de mvcc_statistics_update|
| **cockroachdb.jobs.mvcc_statistics_update.resume_completed.count** <br>(count) | Número de trabajos de mvcc_statistics_update reanudados con éxito hasta completarse|
| **cockroachdb.jobs.mvcc_statistics_update.resume_failed.count** <br>(count) | Número de trabajos de mvcc_statistics_update que fallaron con un error no reintentable|
| **cockroachdb.jobs.mvcc_statistics_update.resume_retry_error.count** <br>(count) | Número de trabajos de mvcc_statistics_update que fallaron con un error reintentable|
| **cockroachdb.jobs.new_schema_change.currently_idle** <br>(gauge) | Número de trabajos de new_schema_change actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.new_schema_change.currently_paused** <br>(gauge) | Número de trabajos de new_schema_change actualmente considerados como pausados|
| **cockroachdb.jobs.new_schema_change.currently_running** <br>(gauge) | Número de trabajos de new_schema_change que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.new_schema_change.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de new_schema_change|
| **cockroachdb.jobs.new_schema_change.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de new_schema_change que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.new_schema_change.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de new_schema_change que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.new_schema_change.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de new_schema_change que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.new_schema_change.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de new_schema_change<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.new_schema_change.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de new_schema_change|
| **cockroachdb.jobs.new_schema_change.resume_completed.count** <br>(count) | Número de trabajos de new_schema_change reanudados con éxito hasta completarse|
| **cockroachdb.jobs.new_schema_change.resume_failed.count** <br>(count) | Número de trabajos de new_schema_change que fallaron con un error no reintentable|
| **cockroachdb.jobs.new_schema_change.resume_retry_error.count** <br>(count) | Número de trabajos de new_schema_change que fallaron con un error reintentable|
| **cockroachdb.jobs.poll_jobs_stats.currently_idle** <br>(gauge) | Número de trabajos de poll_jobs_stats actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.poll_jobs_stats.currently_paused** <br>(gauge) | Número de trabajos de poll_jobs_stats actualmente considerados como pausados|
| **cockroachdb.jobs.poll_jobs_stats.currently_running** <br>(gauge) | Número de trabajos de poll_jobs_stats que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.poll_jobs_stats.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de poll_jobs_stats|
| **cockroachdb.jobs.poll_jobs_stats.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de poll_jobs_stats que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.poll_jobs_stats.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de poll_jobs_stats que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.poll_jobs_stats.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos poll_jobs_stats que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.poll_jobs_stats.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de poll_jobs_stats<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.poll_jobs_stats.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de poll_jobs_stats|
| **cockroachdb.jobs.poll_jobs_stats.resume_completed.count** <br>(count) | Número de trabajos de poll_jobs_stats reanudados con éxito hasta completarse|
| **cockroachdb.jobs.poll_jobs_stats.resume_failed.count** <br>(count) | Número de trabajos de poll_jobs_stats que fallaron con un error no reintentable|
| **cockroachdb.jobs.poll_jobs_stats.resume_retry_error.count** <br>(count) | Número de trabajos de poll_jobs_stats que fallaron con un error reintentable|
| **cockroachdb.jobs.replication_stream_ingestion.currently_idle** <br>(gauge) | Número de trabajos de replication_stream_ingestion actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.replication_stream_ingestion.currently_paused** <br>(gauge) | Número de trabajos de replication_stream_ingestion actualmente considerados como pausados|
| **cockroachdb.jobs.replication_stream_ingestion.currently_running** <br>(gauge) | Número de trabajos de replication_stream_ingestion que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.replication_stream_ingestion.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de replication_stream_ingestion|
| **cockroachdb.jobs.replication_stream_ingestion.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de replication_stream_ingestion que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.replication_stream_ingestion.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de replication_stream_ingestion que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.replication_stream_ingestion.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de replication_stream_ingestion que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.replication_stream_ingestion.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de replication_stream_ingestion<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.replication_stream_ingestion.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de replication_stream_ingestion|
| **cockroachdb.jobs.replication_stream_ingestion.resume_completed.count** <br>(count) | Número de trabajos de replication_stream_ingestion reanudados con éxito hasta completarse|
| **cockroachdb.jobs.replication_stream_ingestion.resume_failed.count** <br>(count) | Número de trabajos de replication_stream_ingestion que fallaron con un error no reintentable|
| **cockroachdb.jobs.replication_stream_ingestion.resume_retry_error.count** <br>(count) | Número de trabajos de replication_stream_ingestion que fallaron con un error reintentable|
| **cockroachdb.jobs.replication_stream_producer.currently_idle** <br>(gauge) | Número de trabajos de replication_stream_producer actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.replication_stream_producer.currently_paused** <br>(gauge) | Número de trabajos de replication_stream_producer actualmente considerados como pausados|
| **cockroachdb.jobs.replication_stream_producer.currently_running** <br>(gauge) | Número de trabajos de replication_stream_producer que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.replication_stream_producer.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de replication_stream_producer|
| **cockroachdb.jobs.replication_stream_producer.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de replication_stream_producer que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.replication_stream_producer.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de replication_stream_producer que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.replication_stream_producer.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de replication_stream_producer que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.replication_stream_producer.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de replication_stream_producer<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.replication_stream_producer.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de replication_stream_producer|
| **cockroachdb.jobs.replication_stream_producer.resume_completed.count** <br>(count) | Número de trabajos de replication_stream_producer reanudados con éxito hasta completarse|
| **cockroachdb.jobs.replication_stream_producer.resume_failed.count** <br>(count) | Número de trabajos de replication_stream_producer que fallaron con un error no reintentable|
| **cockroachdb.jobs.replication_stream_producer.resume_retry_error.count** <br>(count) | Número de trabajos de replication_stream_producer que fallaron con un error reintentable|
| **cockroachdb.jobs.restore.currently_idle** <br>(gauge) | Número de trabajos de restauración actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.restore.currently_paused** <br>(gauge) | Número de trabajos de restauración actualmente considerados como pausados|
| **cockroachdb.jobs.restore.currently_running** <br>(gauge) | Número de trabajos de restauración que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.restore.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de restauración|
| **cockroachdb.jobs.restore.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de restauración que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.restore.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de restauración que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.restore.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de restauración que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.restore.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de restauración<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.restore.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de restauración|
| **cockroachdb.jobs.restore.resume_completed.count** <br>(count) | Número de trabajos de restauración reanudados con éxito hasta completarse|
| **cockroachdb.jobs.restore.resume_failed.count** <br>(count) | Número de trabajos de restauración que fallaron con un error no reintentable|
| **cockroachdb.jobs.restore.resume_retry_error.count** <br>(count) | Número de trabajos de restauración que fallaron con un error reintentable|
| **cockroachdb.jobs.resumed_claimed_jobs.count** <br>(count) | Número de trabajos reclamados reanudados en iteraciones de adopción de trabajos|
| **cockroachdb.jobs.row.level.ttl.currently_paused** <br>(gauge) | Número de trabajos de row_level_ttl actualmente considerados como pausados|
| **cockroachdb.jobs.row.level.ttl.currently_running** <br>(gauge) | Número de trabajos de row_level_ttl que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.row.level.ttl.resume_completed.count** <br>(count) | Número de trabajos de row_level_ttl reanudados con éxito hasta completarse|
| **cockroachdb.jobs.row.level.ttl.resume_failed.count** <br>(count) | Número de trabajos de row_level_ttl que fallaron con un error no reintentable|
| **cockroachdb.jobs.row.level.ttl.rows_deleted.count** <br>(count) | Número de filas eliminadas por el trabajo de row_level_ttl.|
| **cockroachdb.jobs.row.level.ttl.rows_selected.count** <br>(count) | Número de filas seleccionadas para su eliminación por el trabajo de row_level_ttl.|
| **cockroachdb.jobs.row_level_ttl.currently_idle** <br>(gauge) | Número de trabajos de row_level_ttl actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.row_level_ttl.currently_paused** <br>(gauge) | Número de trabajos de row_level_ttl actualmente considerados como pausados|
| **cockroachdb.jobs.row_level_ttl.currently_running** <br>(gauge) | Número de trabajos de row_level_ttl que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.row_level_ttl.delete_duration.bucket** <br>(count) | Duración de las solicitudes de eliminación durante row_level_ttl.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.jobs.row_level_ttl.delete_duration.count** <br>(count) | Duración de las solicitudes de eliminación durante row_level_ttl.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.jobs.row_level_ttl.delete_duration.sum** <br>(count) | Duración de las solicitudes de eliminación durante row_level_ttl.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.jobs.row_level_ttl.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de row_level_ttl|
| **cockroachdb.jobs.row_level_ttl.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de row_level_ttl que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.row_level_ttl.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de row_level_ttl que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.row_level_ttl.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de row_level_ttl que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.row_level_ttl.num_active_spans** <br>(gauge) | Número de tramos activos de los que el trabajo TTL está borrando.|
| **cockroachdb.jobs.row_level_ttl.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de row_level_ttl<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.row_level_ttl.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de row_level_ttl|
| **cockroachdb.jobs.row_level_ttl.resume_completed.count** <br>(count) | Número de trabajos de row_level_ttl reanudados con éxito hasta completarse|
| **cockroachdb.jobs.row_level_ttl.resume_failed.count** <br>(count) | Número de trabajos de row_level_ttl que fallaron con un error no reintentable|
| **cockroachdb.jobs.row_level_ttl.resume_retry_error.count** <br>(count) | Número de trabajos de row_level_ttl que fallaron con un error reintentable|
| **cockroachdb.jobs.row_level_ttl.rows_deleted.count** <br>(count) | Número de filas eliminadas por el trabajo de row_level_ttl.|
| **cockroachdb.jobs.row_level_ttl.rows_selected.count** <br>(count) | Número de filas seleccionadas para su eliminación por el trabajo de row_level_ttl.|
| **cockroachdb.jobs.row_level_ttl.select_duration.bucket** <br>(count) | Duración de las solicitudes de selección durante el row_level_ttl.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.jobs.row_level_ttl.select_duration.count** <br>(count) | Duración de las solicitudes de selección durante el row_level_ttl.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.jobs.row_level_ttl.select_duration.sum** <br>(count) | Duración de las solicitudes de selección durante el row_level_ttl.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.jobs.row_level_ttl.span_total_duration.bucket** <br>(count) | Duración del procesamiento de un tramo durante el row_level_ttl.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.jobs.row_level_ttl.span_total_duration.count** <br>(count) | Duración del procesamiento de un tramo durante el row_level_ttl.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.jobs.row_level_ttl.span_total_duration.sum** <br>(count) | Duración del procesamiento de un tramo durante el row_level_ttl.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.jobs.row_level_ttl.total_expired_rows** <br>(gauge) | Número aproximado de filas que hicieron caducar el TTL en la tabla TTL.|
| **cockroachdb.jobs.row_level_ttl.total_rows** <br>(gauge) | Número aproximado de filas en la tabla TTL.|
| **cockroachdb.jobs.running_non_idle** <br>(gauge) | Número de trabajos en ejecución que no están inactivos|
| **cockroachdb.jobs.schema_change.currently_idle** <br>(gauge) | Número de trabajos de schema_change actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.schema_change.currently_paused** <br>(gauge) | Número de trabajos de schema_change actualmente considerados como pausados|
| **cockroachdb.jobs.schema_change.currently_running** <br>(gauge) | Número de trabajos de schema_change que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.schema_change.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de schema_change|
| **cockroachdb.jobs.schema_change.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de schema_change que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.schema_change.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de schema_change que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.schema_change.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de schema_change que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.schema_change.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de schema_change<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.schema_change.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de schema_change|
| **cockroachdb.jobs.schema_change.resume_completed.count** <br>(count) | Número de trabajos de schema_change reanudados con éxito hasta completarse|
| **cockroachdb.jobs.schema_change.resume_failed.count** <br>(count) | Número de trabajos de schema_change que fallaron con un error no reintentable|
| **cockroachdb.jobs.schema_change.resume_retry_error.count** <br>(count) | Número de trabajos de schema_change que fallaron con un error reintentable|
| **cockroachdb.jobs.schema_change_gc.currently_idle** <br>(gauge) | Número de trabajos de schema_change_gc actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.schema_change_gc.currently_paused** <br>(gauge) | Número de trabajos de schema_change_gc actualmente considerados como pausados|
| **cockroachdb.jobs.schema_change_gc.currently_running** <br>(gauge) | Número de trabajos de schema_change_gc que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.schema_change_gc.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de schema_change_gc|
| **cockroachdb.jobs.schema_change_gc.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de schema_change_gc que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.schema_change_gc.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de schema_change_gc que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.schema_change_gc.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de schema_change_gc que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.schema_change_gc.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de schema_change_gc<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.schema_change_gc.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de schema_change_gc|
| **cockroachdb.jobs.schema_change_gc.resume_completed.count** <br>(count) | Número de trabajos de schema_change_gc reanudados con éxito hasta completarse|
| **cockroachdb.jobs.schema_change_gc.resume_failed.count** <br>(count) | Número de trabajos de schema_change_gc que fallaron con un error no reintentable|
| **cockroachdb.jobs.schema_change_gc.resume_retry_error.count** <br>(count) | Número de trabajos de schema_change_gc que fallaron con un error reintentable|
| **cockroachdb.jobs.typedesc_schema_change.currently_idle** <br>(gauge) | Número de trabajos de typedesc_schema_change actualmente considerados como inactivos y que pueden cerrarse libremente|
| **cockroachdb.jobs.typedesc_schema_change.currently_paused** <br>(gauge) | Número de trabajos de typedesc_schema_change actualmente considerados como pausados|
| **cockroachdb.jobs.typedesc_schema_change.currently_running** <br>(gauge) | Número de trabajos de typedesc_schema_change que se están ejecutando actualmente en estado Resume u OnFailOrCancel|
| **cockroachdb.jobs.typedesc_schema_change.expired_pts_records.count** <br>(count) | Número de registros de marca de tiempo protegidos caducados que son propiedad de trabajos de typedesc_schema_change|
| **cockroachdb.jobs.typedesc_schema_change.fail_or_cancel_completed.count** <br>(count) | Número de trabajos de typedesc_schema_change que finalizaron con éxito su proceso de fallo o cancelación|
| **cockroachdb.jobs.typedesc_schema_change.fail_or_cancel_failed.count** <br>(count) | Número de trabajos de typedesc_schema_change que fallaron con un error no reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.typedesc_schema_change.fail_or_cancel_retry_error.count** <br>(count) | Número de trabajos de typedesc_schema_change que fallaron con un error reintentable en su proceso de fallo o cancelación|
| **cockroachdb.jobs.typedesc_schema_change.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por trabajos de typedesc_schema_change<br>_Se muestra como segundo_ |
| **cockroachdb.jobs.typedesc_schema_change.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos mantenidos por trabajos de typedesc_schema_change|
| **cockroachdb.jobs.typedesc_schema_change.resume_completed.count** <br>(count) | Número de trabajos de typedesc_schema_change reanudados con éxito hasta completarse|
| **cockroachdb.jobs.typedesc_schema_change.resume_failed.count** <br>(count) | Número de trabajos de typedesc_schema_change que fallaron con un error no reintentable|
| **cockroachdb.jobs.typedesc_schema_change.resume_retry_error.count** <br>(count) | Número de trabajos de typedesc_schema_change que fallaron con un error reintentable|
| **cockroachdb.keybytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de bytes ocupados por claves<br>_Se muestra como byte_ |
| **cockroachdb.keycount** <br>(gauge) | \[OpenMetrics v1 y v2\] Recuento de todas las claves<br>_Se muestra como clave_ |
| **cockroachdb.kv.allocator.load_based_lease_transfers.cannot_find_better_candidate.count** <br>(count) | Número de veces que el asignador determinó que el arrendamiento se encontraba en la mejor réplica posible|
| **cockroachdb.kv.allocator.load_based_lease_transfers.delta_not_significant.count** <br>(count) | Número de veces que el asignador determinó que el delta entre el almacén existente y el mejor candidato no era significativo|
| **cockroachdb.kv.allocator.load_based_lease_transfers.existing_not_overfull.count** <br>(count) | Número de veces que el asignador determinó que el arrendamiento no estaba en un almacén sobrecargado|
| **cockroachdb.kv.allocator.load_based_lease_transfers.follow_the_workload.count** <br>(count) | Número de veces que el asignador determinó que el arrendamiento debía transferirse a otra réplica para la localidad|
| **cockroachdb.kv.allocator.load_based_lease_transfers.missing_stats_for_existing_stores.count** <br>(count) | Número de veces que al asignador le faltaron estadísticas qps para el arrendatario|
| **cockroachdb.kv.allocator.load_based_lease_transfers.should_transfer.count** <br>(count) | Número de veces que el asignador determinó que el arrendamiento debía transferirse a otra réplica para una mejor distribución de la carga|
| **cockroachdb.kv.allocator.load_based_replica_rebalancing.cannot_find_better_candidate.count** <br>(count) | Número de veces que el asignador determinó que el rango estaba en los mejores almacenes posibles|
| **cockroachdb.kv.allocator.load_based_replica_rebalancing.delta_not_significant.count** <br>(count) | Número de veces que el asignador determinó que el delta entre un almacén existente y el mejor candidato de sustitución no era lo suficientemente elevado|
| **cockroachdb.kv.allocator.load_based_replica_rebalancing.existing_not_overfull.count** <br>(count) | Número de veces que el asignador determinó que ninguna de las réplicas del rango estaba en almacenes sobrecargados|
| **cockroachdb.kv.allocator.load_based_replica_rebalancing.missing_stats_for_existing_store.count** <br>(count) | Número de veces que al asignador le faltaron las estadísticas qps para el almacén existente|
| **cockroachdb.kv.allocator.load_based_replica_rebalancing.should_transfer.count** <br>(count) | Número de veces que el asignador determinó que la réplica debía reequilibrarse a otro almacén para una mejor distribución de la carga|
| **cockroachdb.kv.closed_timestamp.max_behind_nanos** <br>(gauge) | Mayor latencia entre el tiempo real y la marca de tiempo máxima cerrada de la réplica<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.concurrency.avg_lock_hold_duration_nanos** <br>(gauge) | Duración media de los bloqueos en las tablas de bloqueos. No incluye los bloqueos replicados (intenciones) que no se mantienen en memoria<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.concurrency.avg_lock_wait_duration_nanos** <br>(gauge) | Duración media de la espera de bloqueo de las solicitudes en espera en las colas de espera de bloqueo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.concurrency.lock_wait_queue_waiters** <br>(gauge) | Número de solicitudes en espera activa en una cola de espera de bloqueo|
| **cockroachdb.kv.concurrency.locks** <br>(gauge) | Número de bloqueos activos en las tablas de bloqueos. No incluye los bloqueos replicados (intenciones) que no se mantienen en memoria|
| **cockroachdb.kv.concurrency.locks_with_wait_queues** <br>(gauge) | Número de bloqueos activos en tablas de bloqueos con colas de espera activas|
| **cockroachdb.kv.concurrency.max_lock_hold_duration_nanos** <br>(indicador) | Duración máxima de cualquier bloqueo en una tabla de bloqueos. No incluye los bloqueos replicados (intenciones) que no se mantienen en memoria<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.concurrency.max_lock_wait_duration_nanos** <br>(gauge) | Duración máxima de la espera de bloqueo de las solicitudes que se encuentran en espera en las colas de espera de bloqueo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.concurrency.max_lock_wait_queue_waiters_for_lock** <br>(gauge) | Número máximo de solicitudes en espera activa en cualquier cola de espera de bloqueo individual|
| **cockroachdb.kv.loadsplitter.nosplitkey.count** <br>(count) | El divisor basado en la carga no pudo encontrar una clave de división.|
| **cockroachdb.kv.loadsplitter.popularkey.count** <br>(count) | El divisor basado en la carga no pudo encontrar una clave de división y la clave de división más popular muestreada ocurre en >= 25% de las muestras.|
| **cockroachdb.kv.prober.planning_attempts.count** <br>(count) | Número de intentos de planificación de sondeos realizados. Para sondear KV necesitamos planificar qué rangos sondear.|
| **cockroachdb.kv.prober.planning_failures.count** <br>(count) | Número de intentos de planificación de sondeos fallidos. Para sondear KV necesitamos planificar qué rangos sondear. Si la planificación falla, kvprober no es capaz de enviar sondas a todos los rangos. Considera la posibilidad de alertar sobre esta métrica como resultado.|
| **cockroachdb.kv.prober.read.attempts.count** <br>(count) | Número de intentos de lectura del KV de sondeo, independientemente del resultado|
| **cockroachdb.kv.prober.read.failures.count** <br>(count) | Número de intentos fallidos de lectura del KV de sondeo, ya sea por error o por tiempo de espera|
| **cockroachdb.kv.prober.read.latency.bucket** <br>(count) | Latencia de las sondas de lectura de KV correctas<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.prober.read.latency.count** <br>(count) | Latencia de las sondas de lectura de KV correctas<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.prober.read.latency.sum** <br>(count) | Latencia de las sondas de lectura de KV correctas<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.prober.write.attempts.count** <br>(count) | Número de intentos realizados para escribir el KV de sondeo, independientemente del resultado|
| **cockroachdb.kv.prober.write.failures.count** <br>(count) | Número de intentos fallidos de escribir el KV de sondeo, ya sea por error o por tiempo de espera|
| **cockroachdb.kv.prober.write.latency.bucket** <br>(count) | Latencia de las sondas de escritura de KV exitosas<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.prober.write.latency.count** <br>(count) | Latencia de las sondas de escritura de KV exitosas<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.prober.write.latency.sum** <br>(count) | Latencia de las sondas de escritura de KV exitosas<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.prober.write.quarantine.oldest_duration** <br>(gauge) | Tiempo que ha permanecido el rango más antiguo en el grupo de cuarentena de escritura<br>_Se muestra como segundo_ |
| **cockroachdb.kv.protectedts.reconciliation.errors.count** <br>(count) | Número de errores encontrados durante las ejecuciones de conciliación en este nodo|
| **cockroachdb.kv.protectedts.reconciliation.num_runs.count** <br>(count) | Número de conciliaciones realizadas con éxito en este nodo|
| **cockroachdb.kv.protectedts.reconciliation.records_processed.count** <br>(count) | Número de registros procesados sin errores durante la conciliación en este nodo|
| **cockroachdb.kv.protectedts.reconciliation.records_removed.count** <br>(count) | Número de registros eliminados durante las ejecuciones de conciliación en este nodo|
| **cockroachdb.kv.rangefeed.budget_allocation_blocked.count** <br>(count) | Número de veces que RangeFeed esperó la disponibilidad de presupuesto|
| **cockroachdb.kv.rangefeed.budget_allocation_failed.count** <br>(count) | Número de veces que RangeFeed falló porque se superó el presupuesto de memoria |
| **cockroachdb.kv.rangefeed.catchup_scan_nanos.count** <br>(count) | Tiempo dedicado al análisis de la recuperación de RangeFeed<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.rangefeed.mem_shared** <br>(gauge) | Uso de memoria por RangeFeeds<br>_Se muestra como byte_ |
| **cockroachdb.kv.rangefeed.mem_system** <br>(gauge) | Uso de memoria por RangeFeeds en rangos del sistema<br>_Se muestra como byte_ |
| **cockroachdb.kv.rangefeed.processors_goroutine** <br>(gauge) | Número de procesadores RangeFeed activos que utilizan goroutines|
| **cockroachdb.kv.rangefeed.processors_scheduler** <br>(gauge) | Número de procesadores RangeFeed activos que utilizan programadores|
| **cockroachdb.kv.rangefeed.registrations** <br>(gauge) | Número de registros activos de RangeFeed|
| **cockroachdb.kv.rangefeed.scheduler.normal.latency.bucket** <br>(count) | Latencia del programador habitual de RangeFeeds de KV<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.rangefeed.scheduler.normal.latency.count** <br>(count) | Latencia del programador habitual de RangeFeeds de KV<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.rangefeed.scheduler.normal.latency.sum** <br>(count) | Latencia del programador habitual de RangeFeeds de KV<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.rangefeed.scheduler.normal.queue_size** <br>(gauge) | Número de entradas en la cola del programador habitual de RangeFeeds de KV|
| **cockroachdb.kv.rangefeed.scheduler.system.latency.bucket** <br>(count) | Latencia del programador de sistemas de RangeFeeds de KV<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.rangefeed.scheduler.system.latency.count** <br>(count) | Latencia del programador de sistemas de RangeFeeds de KV<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.rangefeed.scheduler.system.latency.sum** <br>(count) | Latencia del programador de sistemas de RangeFeeds de KV<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.rangefeed.scheduler.system.queue_size** <br>(gauge) | Número de entradas en la cola del programador de sistemas de RangeFeeds de KV|
| **cockroachdb.kv.replica_circuit_breaker.num_tripped_events.count** <br>(count) | Número de veces que se activaron los disyuntores por réplica desde el inicio del proceso|
| **cockroachdb.kv.replica_circuit_breaker.num_tripped_replicas** <br>(gauge) | Número de réplicas para las que el disyuntor por réplica está actualmente activado. Un valor distinto de cero indica que el rango o la réplica no están disponibles, y debe investigarse. Las réplicas con este estado deben fallar rápidamente toda slas solicitudes entrantes.|
| **cockroachdb.kv.replica_read_batch_evaluate.dropped_latches_before_eval.count** <br>(count) | Número de veces que los lotes de solo lectura dejaron caer los latches antes de la evaluación|
| **cockroachdb.kv.replica_read_batch_evaluate.latency.bucket** <br>(count) | Duración de la ejecución para evaluar un BatchRequest en la ruta de solo lectura después de la adquisición de los latches. Se registra una medición independientemente del resultado (es decir, también en caso de error). Si se producen reintentos internos, cada instancia se registra por separado.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.replica_read_batch_evaluate.latency.count** <br>(count) | Duración de la ejecución para evaluar un BatchRequest en la ruta de solo lectura después de la adquisición de los latches. Se registra una medición independientemente del resultado (es decir, también en caso de error). Si se producen reintentos internos, cada instancia se registra por separado.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.replica_read_batch_evaluate.latency.sum** <br>(count) | Duración de la ejecución para evaluar un BatchRequest en la ruta de solo lectura después de la adquisición de los latches. Se registra una medición independientemente del resultado (es decir, también en caso de error). Si se producen reintentos internos, cada instancia se registra por separado.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.replica_read_batch_evaluate.without_interleaving_iter.count** <br>(count) | Número de lotes de solo lectura evaluados sin una iteración de intercalación de intentos|
| **cockroachdb.kv.replica_write_batch_evaluate.latency.bucket** <br>(count) | Duración de la ejecución para evaluar un BatchRequest en la ruta de lectura-escritura después de la adquisición de los latches. Se registra una medición independientemente del resultado (es decir, también en caso de error). Si se producen reintentos internos, cada instancia se registra por separado. Ten en cuenta que la medición no incluye la duración de la replicación del comando evaluado.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.replica_write_batch_evaluate.latency.count** <br>(count) | Duración de la ejecución para evaluar un BatchRequest en la ruta de lectura-escritura después de la adquisición de los latches. Se registra una medición independientemente del resultado (es decir, también en caso de error). Si se producen reintentos internos, cada instancia se registra por separado. Ten en cuenta que la medición no incluye la duración de la replicación del comando evaluado.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.replica_write_batch_evaluate.latency.sum** <br>(count) | Duración de la ejecución para evaluar un BatchRequest en la ruta de lectura-escritura después de la adquisición de los latches. Se registra una medición independientemente del resultado (es decir, también en caso de error). Si se producen reintentos internos, cada instancia se registra por separado. Ten en cuenta que la medición no incluye la duración de la replicación del comando evaluado.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kv.tenant_rate_limit.current_blocked** <br>(gauge) | Número de solicitudes bloqueadas actualmente por el limitador de frecuencia|
| **cockroachdb.kv.tenant_rate_limit.num_tenants** <br>(gauge) | Número de inquilinos objeto de seguimiento|
| **cockroachdb.kv.tenant_rate_limit.read_batches_admitted.count** <br>(count) | Número de lotes de lectura admitidos por el limitador de frecuencia|
| **cockroachdb.kv.tenant_rate_limit.read_bytes_admitted.count** <br>(count) | Número de bytes de lectura admitidos por el limitador de frecuencia<br>_Se muestra como byte_ |
| **cockroachdb.kv.tenant_rate_limit.read_requests_admitted.count** <br>(count) | Número de solicitudes de lectura admitidas por el limitador de frecuencia|
| **cockroachdb.kv.tenant_rate_limit.write_batches_admitted.count** <br>(count) | Número de lotes de escritura admitidos por el limitador de frecuencia|
| **cockroachdb.kv.tenant_rate_limit.write_bytes_admitted.count** <br>(count) | Número de bytes de escritura admitidos por el limitador de frecuencia<br>_Se muestra como byte_ |
| **cockroachdb.kv.tenant_rate_limit.write_requests_admitted.count** <br>(count) | Número de solicitudes de escritura admitidas por el limitador de frecuencia|
| **cockroachdb.kvadmission.flow_controller.elastic_blocked_stream_count** <br>(gauge) | Número de flujos de réplica sin tokens de flujo disponibles para solicitudes elásticas|
| **cockroachdb.kvadmission.flow_controller.elastic_requests_admitted.count** <br>(count) | Número de solicitudes elásticas admitidas por el controlador de flujo|
| **cockroachdb.kvadmission.flow_controller.elastic_requests_bypassed.count** <br>(count) | Número de solicitudes elásticas en espera que omitieron el controlador de flujo debido a la desconexión de flujos|
| **cockroachdb.kvadmission.flow_controller.elastic_requests_errored.count** <br>(count) | Número de solicitudes elásticas que fallaron mientras esperaban tokens de flujo|
| **cockroachdb.kvadmission.flow_controller.elastic_requests_waiting** <br>(gauge) | Número de solicitudes elásticas en espera de tokens de flujo|
| **cockroachdb.kvadmission.flow_controller.elastic_stream_count** <br>(gauge) | Número total de flujos de réplica para solicitudes elásticas|
| **cockroachdb.kvadmission.flow_controller.elastic_tokens_available** <br>(gauge) | Tokens de flujo disponibles para solicitudes elásticas, en todos los flujos de replicación<br>_Se muestra como byte_ |
| **cockroachdb.kvadmission.flow_controller.elastic_tokens_deducted.count** <br>(count) | Tokens de flujo deducidos por solicitudes elásticas, en todos los flujos de replicación<br>_Se muestra como byte_ |
| **cockroachdb.kvadmission.flow_controller.elastic_tokens_returned.count** <br>(count) | Tokens de flujo devueltos por solicitudes elásticas, en todos los flujos de replicación<br>_Se muestra como byte_ |
| **cockroachdb.kvadmission.flow_controller.elastic_tokens_unaccounted.count** <br>(count) | Tokens de flujo devueltos por solicitudes elásticas que no se contabilizaron, en todos los flujos de replicación<br>_Se muestra como byte_ |
| **cockroachdb.kvadmission.flow_controller.elastic_wait_duration.bucket** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes elásticas esperando tokens de flujo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_controller.elastic_wait_duration.count** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes elásticas esperando tokens de flujo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_controller.elastic_wait_duration.sum** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes elásticas esperando tokens de flujo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_controller.regular_blocked_stream_count** <br>(gauge) | Número de flujos de réplicación sin tokens de flujo disponibles para solicitudes regulares|
| **cockroachdb.kvadmission.flow_controller.regular_requests_admitted.count** <br>(count) | Número de solicitudes regulares admitidas por el controlador de flujo|
| **cockroachdb.kvadmission.flow_controller.regular_requests_bypassed.count** <br>(count) | Número de solicitudes regulares en espera que omitieron el controlador de flujo debido a la desconexión de flujos|
| **cockroachdb.kvadmission.flow_controller.regular_requests_errored.count** <br>(count) | Número de solicitudes regulares que fallaron mientras esperaban tokens de flujo|
| **cockroachdb.kvadmission.flow_controller.regular_requests_waiting** <br>(gauge) | Número de solicitudes regulares a la espera de tokens de flujo|
| **cockroachdb.kvadmission.flow_controller.regular_stream_count** <br>(gauge) | Número total de flujos de replicación para solicitudes regulares|
| **cockroachdb.kvadmission.flow_controller.regular_tokens_available** <br>(gauge) | Tokens de flujo disponibles para solicitudes regulares, en todos los flujos de replicación<br>_Se muestra como byte_ |
| **cockroachdb.kvadmission.flow_controller.regular_tokens_deducted.count** <br>(count) | Tokens de flujo deducidos por solicitudes regulares, a través de todos los flujos de replicación<br>_Se muestra como byte_ |
| **cockroachdb.kvadmission.flow_controller.regular_tokens_returned.count** <br>(count) | Tokens de flujo devueltos por solicitudes regulares, a través de todos los flujos de replicación<br>_Se muestra como byte_ |
| **cockroachdb.kvadmission.flow_controller.regular_tokens_unaccounted.count** <br>(count) | Tokens de flujo devueltos por solicitudes regulares que no se contabilizaron, en todos los flujos de replicación<br>_Se muestra como byte_ |
| **cockroachdb.kvadmission.flow_controller.regular_wait_duration.bucket** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes regulares esperando tokens de flujo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_controller.regular_wait_duration.count** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes regulares esperando tokens de flujo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_controller.regular_wait_duration.sum** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes regulares esperando tokens de flujo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_handle.elastic_requests_admitted.count** <br>(count) | Número de solicitudes elásticas admitidas por el descriptor de flujo|
| **cockroachdb.kvadmission.flow_handle.elastic_requests_errored.count** <br>(count) | Número de solicitudes elásticas que fallaron mientras esperaban tokens de flujo, a nivel del descriptor|
| **cockroachdb.kvadmission.flow_handle.elastic_requests_waiting** <br>(gauge) | Número de solicitudes elásticas a la espera de tokens de flujo, a nivel del descriptor|
| **cockroachdb.kvadmission.flow_handle.elastic_wait_duration.bucket** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes elásticas esperando tokens de flujo, a nivel del descriptor<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_handle.elastic_wait_duration.count** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes elásticas esperando tokens de flujo, a nivel del descriptor<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_handle.elastic_wait_duration.sum** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes elásticas esperando tokens de flujo, a nivel del descriptor<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_handle.regular_requests_admitted.count** <br>(count) | Número de solicitudes elásticas admitidas por el descriptor de flujo|
| **cockroachdb.kvadmission.flow_handle.regular_requests_errored.count** <br>(count) | Número de solicitudes regulares que fallaron mientras esperaban tokens de flujo, a nivel del descriptor|
| **cockroachdb.kvadmission.flow_handle.regular_requests_waiting** <br>(gauge) | Número de solicitudes regulares a la espera de tokens de flujo, a nivel del descriptor|
| **cockroachdb.kvadmission.flow_handle.regular_wait_duration.bucket** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes regulares esperando tokens de flujo, a nivel del descriptor<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_handle.regular_wait_duration.count** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes regulares esperando tokens de flujo, a nivel del descriptor<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_handle.regular_wait_duration.sum** <br>(count) | Histograma de latencia del tiempo que pasan las solicitudes regulares esperando tokens de flujo, a nivel del descriptor<br>_Se muestra como nanosegundo_ |
| **cockroachdb.kvadmission.flow_handle.streams_connected.count** <br>(count) | Número de veces que nos hemos conectado a un flujo, a nivel del descriptor|
| **cockroachdb.kvadmission.flow_handle.streams_disconnected.count** <br>(count) | Número de veces que nos hemos desconectado de un flujo, a nivel del descriptor|
| **cockroachdb.kvadmission.flow_token_dispatch.coalesced_elastic.count** <br>(count) | Número de envíos de tokens de flujo elásticos coalesced (en los que informamos al remitente de la admisión de una mayor entrada de logs)|
| **cockroachdb.kvadmission.flow_token_dispatch.coalesced_regular.count** <br>(count) | Número de envíos de tokens de flujo regulares coalesced (en los que informamos al remitente de la admisión de una mayor entrada de logs)|
| **cockroachdb.kvadmission.flow_token_dispatch.local_elastic.count** <br>(count) | Número de envíos de tokens de flujo elásticos locales|
| **cockroachdb.kvadmission.flow_token_dispatch.local_regular.count** <br>(count) | Número de envíos de tokens de flujo regulares locales|
| **cockroachdb.kvadmission.flow_token_dispatch.pending_elastic** <br>(gauge) | Número de envíos de tokens de flujo elásticos pendientes|
| **cockroachdb.kvadmission.flow_token_dispatch.pending_nodes** <br>(gauge) | Número de envíos de tokens de flujo pendientes de nodos|
| **cockroachdb.kvadmission.flow_token_dispatch.pending_regular** <br>(gauge) | Número de envíos de tokens de flujo regulares pendientes|
| **cockroachdb.kvadmission.flow_token_dispatch.remote_elastic.count** <br>(count) | Número de envíos de tokens de flujo elásticos remotos|
| **cockroachdb.kvadmission.flow_token_dispatch.remote_regular.count** <br>(count) | Número de envíos de tokens de flujo regulares remotos|
| **cockroachdb.lastupdatenanos** <br>(gauge) | \[OpenMetrics v1 y v2\] Tiempo en nanosegundos desde la marca de tiempo Unix en la que se actualizaron por última vez las métricas bytes/keys/intents<br>_Se muestra como nanosegundo_ |
| **cockroachdb.leases.epoch** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de arrendatarios de réplicas que utilizan arrendamientos basados en marcas de tiempo|
| **cockroachdb.leases.error** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de arrendamiento fallidas<br>_Se muestra como solicitud_ |
| **cockroachdb.leases.error.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de arrendamiento fallidas<br>_Se muestra como solicitud_ |
| **cockroachdb.leases.expiration** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de arrendatarios de réplicas que utilizan arrendamientos basados en la caducidad|
| **cockroachdb.leases.liveness** <br>(gauge) | Número de arrendatarios de réplicas para el/los rango(s) de vida|
| **cockroachdb.leases.preferences.less_preferred** <br>(gauge) | Número de arrendatarios de réplicas que satisfacen una preferencia de arrendamiento que no es la más preferida|
| **cockroachdb.leases.preferences.violating** <br>(gauge) | Número de arrendatarios de réplicas que violan las preferencias de arrendamiento|
| **cockroachdb.leases.requests.latency.bucket** <br>(count) | Latencia de solicitud de arrendamiento (todos los tipos y resultados, coalesced)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.leases.requests.latency.count** <br>(count) | Latencia de solicitud de arrendamiento (todos los tipos y resultados, coalesced)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.leases.requests.latency.sum** <br>(count) | Latencia de solicitud de arrendamiento (todos los tipos y resultados, coalesced)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.leases.success** <br>(count) | \[OpenMetrics v1\] Número de solicitudes de arrendamiento exitosas<br>_Se muestra como solicitud_ |
| **cockroachdb.leases.success.count** <br>(count) | \[OpenMetrics v2\] Número de solicitudes de arrendamiento exitosas<br>_Se muestra como solicitud_ |
| **cockroachdb.leases.transfers.error** <br>(count) | \[OpenMetrics v1\] Número de transferencias de arrendamientos fallidas|
| **cockroachdb.leases.transfers.error.count** <br>(count) | \[OpenMetrics v2\] Número de transferencias de arrendamientos fallidas|
| **cockroachdb.leases.transfers.success** <br>(count) | \[OpenMetrics v1\] Número de transferencias de arrendamientos exitosas|
| **cockroachdb.leases.transfers.success.count** <br>(count) | \[OpenMetrics v2\] Número de transferencias de arrendamientos exitosas|
| **cockroachdb.livebytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de bytes de live data (claves más valores)<br>_Se muestra como byte_ |
| **cockroachdb.livecount** <br>(gauge) | \[OpenMetrics v1 y v2\] Recuento de claves activas<br>_Se muestra como clave_ |
| **cockroachdb.liveness.epochincrements** <br>(count) | \[OpenMetrics v1\] Número de veces que este nodo ha incrementado su tiempo de vida|
| **cockroachdb.liveness.epochincrements.count** <br>(count) | \[OpenMetrics v2\] Número de veces que este nodo ha incrementado su tiempo de vida|
| **cockroachdb.liveness.heartbeatfailures** <br>(count) | \[OpenMetrics v1\] Número de latidos fallidos de este nodo|
| **cockroachdb.liveness.heartbeatfailures.count** <br>(count) | \[OpenMetrics v2\] Número de latidos fallidos de este nodo|
| **cockroachdb.liveness.heartbeatency** <br>(indicador) | \[OpenMetrics v1\] Latencia del latido de vida del nodo en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.liveness.heartbeatlatency.bucket** <br>(count) | \[OpenMetrics v2\] Latencia del latido de vida del nodo en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.liveness.heartbeatlatency.count** <br>(count) | \[OpenMetrics v2\] Latencia del latido de vida del nodo en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.liveness.heartbeatlatency.sum** <br>(count) | \[OpenMetrics v2\] Latencia del latido de vida del nodo en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.liveness.heartbeatsinflight** <br>(gauge) | Número de latidos de vida en curso de este nodo|
| **cockroachdb.liveness.heartbeatsuccesses** <br>(count) | \[OpenMetrics v1\] Número de latidos de vida exitosos de este nodo|
| **cockroachdb.liveness.heartbeatsuccesses.count** <br>(count) | \[OpenMetrics v2\] Número de latidos de vida exitosos de este nodo|
| **cockroachdb.liveness.livenodes** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de nodos activos en el clúster (será 0 si este nodo no está activo)|
| **cockroachdb.lockbytes** <br>(gauge) | Número de bytes ocupados por valores clave de bloqueo replicados (fuerza compartida y exclusiva, no fuerza de intención)<br>_Se muestra como byte_ |
| **cockroachdb.lockcount** <br>(gauge) | Recuento de bloqueos replicados (compartidos, exclusivos y de fuerza de intención)|
| **cockroachdb.log.buffered.messages.dropped.count** <br>(count) | Recuento de mensajes de log eliminados por los sumideros de logs almacenados en búfer. Cuando CRDB intenta almacenar en búfer un mensaje de log en un sumidero de logs almacenado en búfer cuyo búfer ya está lleno, elimina los mensajes más antiguos almacenados en búfer para dejar espacio para el nuevo mensaje.|
| **cockroachdb.log.fluent.sink.conn.errors.count** <br>(count) | Número de errores de conexión experimentados por los sumideros de generación de logs del servidor Fluent|
| **cockroachdb.log.messages.count** <br>(count) | Recuento de mensajes registrados en el nodo desde el inicio. Ten en cuenta que esto no mide la salida de mensajes de log individuales a los distintos sumideros de generación de logs configurados.|
| **cockroachdb.node_id** <br>(gauge) | \[OpenMetrics v1 y v2\] ID de nodo con etiquetas para direcciones RPC y HTTP publicadas|
| **cockroachdb.physical_replication.admit_latency.bucket** <br>(count) | Latencia de admisión de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que se admitió en el procesador de ingesta<br>_Se muestra como nanosegundo_ |
| **cockroachdb.physical_replication.admit_latency.count** <br>(count) | Latencia de admisión de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que se admitió en el procesador de ingesta<br>_Se muestra como nanosegundo_ |
| **cockroachdb.physical_replication.admit_latency.sum** <br>(count) | Latencia de admisión de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que se admitió en el procesador de ingesta<br>_Se muestra como nanosegundo_ |
| **cockroachdb.physical_replication.commit_latency.bucket** <br>(count) | Latencia de confirmación de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que se descargó en disco. Si se trata de eventos por lotes, se registra la diferencia entre el evento más antiguo del lote y la descarga<br>_Se muestra como nanosegundo_ |
| **cockroachdb.physical_replication.commit_latency.count** <br>(count) | Latencia de confirmación de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que se descargó en disco. Si se trata de eventos por lotes, se registra la diferencia entre el evento más antiguo del lote y la descarga<br>_Se muestra como nanosegundo_ |
| **cockroachdb.physical_replication.commit_latency.sum** <br>(count) | Latencia de confirmación de eventos: diferencia entre la marca de tiempo MVCC del evento y el momento en que se descargó en disco. Si se trata de eventos por lotes, se registra la diferencia entre el evento más antiguo del lote y la descarga<br>_Se muestra como nanosegundo_ |
| **cockroachdb.physical_replication.cutover_progress** <br>(gauge) | Número de rangos que quedan por revertir para completar un corte en curso|
| **cockroachdb.physical_replication.distsql_replan_count.count** <br>(count) | Número total de eventos de replanificación de SQL distribuido|
| **cockroachdb.physical_replication.earliest_data_checkpoint_span** <br>(gauge) | Marca de tiempo más temprana del último punto de control enviado por un procesador de datos de ingesta|
| **cockroachdb.physical_replication.events_ingested.count** <br>(count) | Eventos ingeridos por todos los trabajos de replicación|
| **cockroachdb.physical_replication.flush_hist_nanos.bucket** <br>(count) | Tiempo dedicado a descargar mensajes en todos los flujos de replicación<br>_Se muestra como nanosegundo_ |
| **cockroachdb.physical_replication.flush_hist_nanos.count** <br>(count) | Tiempo dedicado a descargar mensajes en todos los flujos de replicación<br>_Se muestra como nanosegundo_ |
| **cockroachdb.physical_replication.flush_hist_nanos.sum** <br>(count) | Tiempo dedicado a descargar mensajes en todos los flujos de replicación<br>_Se muestra como nanosegundo_ |
| **cockroachdb.physical_replication.flushes.count** <br>(count) | Total de descargas en todos los trabajos de replicación|
| **cockroachdb.physical_replication.job_progress_updates.count** <br>(count) | Número total de actualizaciones del progreso de trabajos de ingesta|
| **cockroachdb.physical_replication.latest_data_checkpoint_span** <br>(gauge) | Marca de tiempo más reciente del último punto de control enviado por un procesador de datos de ingesta|
| **cockroachdb.physical_replication.logical_bytes.count** <br>(count) | Bytes lógicos (suma de claves + valores) ingeridos por todos los trabajos de replicación<br>_Se muestra como byte_ |
| **cockroachdb.physical_replication.replicated_time_seconds** <br>(gauge) | Tiempo replicado del flujo de replicación físico en segundos desde la marca de tiempo Unix.<br>_Se muestra como segundo_ |
| **cockroachdb.physical_replication.resolved_events_ingested.count** <br>(count) | Eventos resueltos ingeridos por todos los trabajos de replicación|
| **cockroachdb.physical_replication.running** <br>(gauge) | Número de flujos de replicación en ejecución|
| **cockroachdb.physical_replication.sst_bytes.count** <br>(count) | Bytes de TSM (comprimidos) enviados a KV por todos los trabajos de replicación<br>_Se muestra como byte_ |
| **cockroachdb.queue.consistency.pending** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas pendientes en la cola del verificador de consistencia|
| **cockroachdb.queue.consistency.process.failure** <br>(count) | \[OpenMetrics v1\] Número de réplicas cuyo procesamiento falló en la cola del verificador de consistencia|
| **cockroachdb.queue.consistency.process.failure.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas cuyo procesamiento falló en la cola del verificador de consistencia|
| **cockroachdb.queue.consistency.process.success** <br>(count) | \[OpenMetrics v1\] Número de réplicas procesadas con éxito por la cola del verificador de consistencia|
| **cockroachdb.queue.consistency.process.success.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas procesadas con éxito por la cola del verificador de consistencia|
| **cockroachdb.queue.consistency.processingnanos** <br>(count) | \[OpenMetrics v1\] Nanosegundos dedicados a procesar réplicas en la cola del verificador de consistencia<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.consistency.processingnanos.count** <br>(count) | \[OpenMetrics v2\] Nanosegundos dedicados a procesar réplicas en la cola del verificador de consistencia<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.gc.info.abortspanconsidered** <br>(count) | \[OpenMetrics v1\] Número de entradas AbortSpan lo suficientemente antiguas como para ser consideradas para su eliminación|
| **cockroachdb.queue.gc.info.abortspanconsidered.count** <br>(count) | \[OpenMetrics v2\] Número de entradas AbortSpan lo suficientemente antiguas como para ser consideradas para su eliminación|
| **cockroachdb.queue.gc.info.abortspangcnum** <br>(count) | \[OpenMetrics v1\] Número de entradas AbortSpan aptas para ser eliminadas|
| **cockroachdb.queue.gc.info.abortspangcnum.count** <br>(count) | \[OpenMetrics v2\] Número de entradas AbortSpan aptas para ser eliminadas|
| **cockroachdb.queue.gc.info.abortspanscanned** <br>(count) | \[OpenMetrics v1\] Número de transacciones presentes en el AbortSpan analizado desde el motor<br>_Se muestra como transacción_ |
| **cockroachdb.queue.gc.info.abortspanscanned.count** <br>(count) | \[OpenMetrics v2\] Número de transacciones presentes en el AbortSpan analizado desde el motor<br>_Se muestra como transacción_ |
| **cockroachdb.queue.gc.info.clearrangefailed.count** <br>(count) | Número de operaciones ClearRange fallidas durante GC|
| **cockroachdb.queue.gc.info.clearrangesuccess.count** <br>(count) | Número de operaciones ClearRange exitosas durante GC|
| **cockroachdb.queue.gc.info.enqueuehighpriority.count** <br>(count) | Número de réplicas en cola para GC con prioridad elevada|
| **cockroachdb.queue.gc.info.intentsconsidered** <br>(count) | \[OpenMetrics v1\] Número de intentos 'antiguos'|
| **cockroachdb.queue.gc.info.intentsconsidered.count** <br>(count) | \[OpenMetrics v2\] Número de intentos 'antiguos'|
| **cockroachdb.queue.gc.info.intenttxns** <br>(count) | \[OpenMetrics v1\] Número de transacciones distintas asociadas<br>_Se muestra como transacción_ |
| **cockroachdb.queue.gc.info.intenttxns.count** <br>(count) | \[OpenMetrics v2\] Número de transacciones distintas asociadas<br>_Se muestra como transacción_ |
| **cockroachdb.queue.gc.info.numkeysaffected** <br>(count) | \OpenMetrics v1\] Número de claves con datos GC'able<br>_Se muestra como clave_ |
| **cockroachdb.queue.gc.info.numkeysaffected.count** <br>(count) | \OpenMetrics v2\] Número de claves con datos GC'able<br>_Se muestra como clave_ |
| **cockroachdb.queue.gc.info.numrangekeysaffected.count** <br>(count) | Número de claves de rango GC'able|
| **cockroachdb.queue.gc.info.pushtxn** <br>(count) | \[OpenMetrics v1\] Número de intentos de envío|
| **cockroachdb.queue.gc.info.pushtxn.count** <br>(count) | \[OpenMetrics v2\] Número de intentos de envío|
| **cockroachdb.queue.gc.info.resolvefailed.count** <br>(count) | Número de intentos de limpieza fallidos durante GC|
| **cockroachdb.queue.gc.info.resolvesuccess** <br>(count) | \[OpenMetrics v1\] Número de intentos resueltos con éxito|
| **cockroachdb.queue.gc.info.resolvesuccess.count** <br>(count) | \[OpenMetrics v2\] Número de intentos resueltos con éxito|
| **cockroachdb.queue.gc.info.resolvetotal** <br>(count) | \[OpenMetrics v1\] Número de intentos de resolución intentados|
| **cockroachdb.queue.gc.info.resolvetotal.count** <br>(count) | \[OpenMetrics v2\] Número de intentos de resolución intentados|
| **cockroachdb.queue.gc.info.transactionresolvefailed.count** <br>(count) | Número de fallos en intentos de limpieza de transacciones locales durante GC|
| **cockroachdb.queue.gc.info.transactionspangcaborted** <br>(count) | \[OpenMetrics v1\] Número de entradas GC'able correspondientes a transacciones canceladas|
| **cockroachdb.queue.gc.info.transactionspangcaborted.count** <br>(count) | \[OpenMetrics v2\] Número de entradas GC'able correspondientes a transacciones canceladas|
| **cockroachdb.queue.gc.info.transactionspangccommitted** <br>(count) | \[OpenMetrics v1\] Número de entradas GC'able correspondientes a transacciones confirmadas|
| **cockroachdb.queue.gc.info.transactionspangccommitted.count** <br>(count) | \[OpenMetrics v2\] Número de entradas GC'able correspondientes a transacciones confirmadas|
| **cockroachdb.queue.gc.info.transactionspangcpending** <br>(count) | \[OpenMetrics v1\] Número de entradas GC'able correspondientes a transacciones pendientes|
| **cockroachdb.queue.gc.info.transactionspangcpending.count** <br>(count) | \[OpenMetrics v2\] Número de entradas GC'able correspondientes a transacciones pendientes|
| **cockroachdb.queue.gc.info.transactionspangcstaging.count** <br>(count) | Número de entradas GC'able correspondientes a transacciones de staging|
| **cockroachdb.queue.gc.info.transactionspanscanned** <br>(count) | \[OpenMetrics v1\] Número de entradas en tramos de transacción analizados desde el motor|
| **cockroachdb.queue.gc.info.transactionspanscanned.count** <br>(count) | \[OpenMetrics v2\] Número de entradas en tramos de transacción analizados desde el motor|
| **cockroachdb.queue.gc.pending** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas pendientes en la cola GC|
| **cockroachdb.queue.gc.process.failure** <br>(count) | \[OpenMetrics v1\] Número de réplicas cuyo procesamiento falló en la cola GC|
| **cockroachdb.queue.gc.process.failure.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas cuyo procesamiento falló en la cola GC|
| **cockroachdb.queue.gc.process.success** <br>(count) | \[OpenMetrics v1\] Número de réplicas procesadas con éxito por la cola GC|
| **cockroachdb.queue.gc.process.success.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas procesadas con éxito por la cola GC|
| **cockroachdb.queue.gc.processingnanos** <br>(count) | \[OpenMetrics v1\] Nanosegundos dedicados a procesar réplicas en la cola GC<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.gc.processingnanos.count** <br>(count) | \[OpenMetrics v2\] Nanosegundos dedicados a procesar réplicas en la cola GC<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.merge.pending** <br>(gauge) | Número de réplicas pendientes en la cola de fusión|
| **cockroachdb.queue.merge.process.failure.count** <br>(count) | Número de réplicas cuyo procesamiento falló en la cola de fusión|
| **cockroachdb.queue.merge.process.success.count** <br>(count) | Número de réplicas procesadas con éxito por la cola de fusión|
| **cockroachdb.queue.merge.processingnanos.count** <br>(count) | Nanosegundos dedicados a procesar réplicas en la cola de fusión<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.merge.purgatory** <br>(gauge) | Número de réplicas en el purgatorio de la cola de fusión, a la espera de ser fusionables|
| **cockroachdb.queue.raftlog.pending** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas pendientes en la cola de logs Raft |
| **cockroachdb.queue.raftlog.process.failure** <br>(count) | \[OpenMetrics v1\] Número de réplicas cuyo procesamiento falló en la cola de de logs Raft |
| **cockroachdb.queue.raftlog.process.failure.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas cuyo procesamiento falló en la cola de de logs Raft |
| **cockroachdb.queue.raftlog.process.success** <br>(count) | \[OpenMetrics v1\] Número de réplicas procesadas con éxito por la cola de logs Raft |
| **cockroachdb.queue.raftlog.process.success.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas procesadas con éxito por la cola de logs Raft|
| **cockroachdb.queue.raftlog.processingnanos** <br>(count) | \[OpenMetrics v1\] Nanosegundos dedicados a procesar réplicas en la cola de logs Raft<br> _Se muestra como nanosegundo_ |
| **cockroachdb.queue.raftlog.processingnanos.count** <br>(count) | \[OpenMetrics v2\] Nanosegundos dedicados a procesar réplicas en la cola de logs Raft<br> _Se muestra como nanosegundo_ |
| **cockroachdb.queue.raftsnapshot.pending** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas pendientes en la cola de reparación Raft|
| **cockroachdb.queue.raftsnapshot.process.failure** <br>(count) | \[OpenMetrics v1\] Número de réplicas cuyo procesamiento falló en la cola de reparación Raft|
| **cockroachdb.queue.raftsnapshot.process.failure.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas cuyo procesamiento falló en la cola de reparación Raft|
| **cockroachdb.queue.raftsnapshot.process.success** <br>(count) | \[OpenMetrics v1\] Número de réplicas procesadas con éxito por la cola de reparación Raft|
| **cockroachdb.queue.raftsnapshot.process.success.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas procesadas con éxito por la cola de reparación Raft|
| **cockroachdb.queue.raftsnapshot.processingnanos** <br>(count) | \[OpenMetrics v1\] Nanosegundos dedicados a procesar réplicas en la cola de reparación Raft<br> _Se muestra como nanosegundo_ |
| **cockroachdb.queue.raftsnapshot.processingnanos.count** <br>(count) | \[OpenMetrics v2\] Nanosegundos dedicados a procesar réplicas en la cola de reparación Raft<br> _Se muestra como nanosegundo_ |
| **cockroachdb.queue.replicagc.pending** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas pendientes en la cola GC de replicación|
| **cockroachdb.queue.replicagc.process.failure** <br>(count) | \[OpenMetrics v1\] Número de réplicas cuyo procesamiento falló en la cola GC de replicación|
| **cockroachdb.queue.replicagc.process.failure.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas cuyo procesamiento falló en la cola GC de replicación|
| **cockroachdb.queue.replicagc.process.success** <br>(count) | \[OpenMetrics v1\] Número de réplicas procesadas con éxito por la cola GC de replicación|
| **cockroachdb.queue.replicagc.process.success.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas procesadas con éxito por la cola GC de replicación|
| **cockroachdb.queue.replicagc.processingnanos** <br>(count) | \[OpenMetrics v1\] Nanosegundos dedicados a procesar réplicas en la cola GC de replicación<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.replicagc.processingnanos.count** <br>(count) | \[OpenMetrics v2\] Nanosegundos dedicados a procesar réplicas en la cola GC de replicación<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.replicagc.removereplica** <br>(count) | \[OpenMetrics v1\] Número de eliminaciones de réplicas intentadas por la cola GC de replicación|
| **cockroachdb.queue.replicagc.removereplica.count** <br>(count) | \[OpenMetrics v2\] Número de eliminaciones de réplicas intentadas por la cola GC de replicación|
| **cockroachdb.queue.replicate.addnonvoterreplica.count** <br>(count) | Número de adiciones de réplicas no votantes intentadas por la cola de replicación|
| **cockroachdb.queue.replicate.addreplica** <br>(count) | \[OpenMetrics v1\] Número de adiciones de réplicas intentadas por la cola de replicación|
| **cockroachdb.queue.replicate.addreplica.count** <br>(count) | \[OpenMetrics v2\] Número de adiciones de réplicas intentadas por la cola de replicación|
| **cockroachdb.queue.replicate.addreplica.error.count** <br>(count) | Número de adiciones de réplicas fallidas procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.addreplica.success.count** <br>(count) | Número de adiciones exitosas de réplicas procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.addvoterreplica.count** <br>(count) | Número de adiciones de réplicas de votantes intentadas por la cola de replicación|
| **cockroachdb.queue.replicate.nonvoterpromotions.count** <br>(count) | Número de no votantes promovidos a votantes por la cola de replicación|
| **cockroachdb.queue.replicate.pending** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas pendientes en la cola de replicación|
| **cockroachdb.queue.replicate.process.failure** <br>(count) | \[OpenMetrics v1\] Número de réplicas cuyo procesamiento falló en la cola de replicación|
| **cockroachdb.queue.replicate.process.failure.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas cuyo procesamiento falló en la cola de replicación|
| **cockroachdb.queue.replicate.process.success** <br>(count) | \[OpenMetrics v1\] Número de réplicas procesadas con éxito por la cola de replicación|
| **cockroachdb.queue.replicate.process.success.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas procesadas con éxito por la cola de replicación|
| **cockroachdb.queue.replicate.processingnanos** <br>(count) | \[OpenMetrics v1\] Nanosegundos dedicados a procesar réplicas en la cola de replicación<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.replicate.processingnanos.count** <br>(count) | \[OpenMetrics v2\] Nanosegundos dedicados a procesar réplicas en la cola de replicación<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.replicate.purgatory** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas en el purgatorio de la cola de replicación, a la espera de opciones de asignación|
| **cockroachdb.queue.replicate.rebalancenonvoterreplica.count** <br>(count) | Número de adiciones iniciadas por el rebalanceador de réplicas no votantes intentadas por la cola de replicación|
| **cockroachdb.queue.replicate.rebalancereplica** <br>(count) | \[OpenMetrics v1\] Número de adiciones iniciadas por el rebalanceador de réplicas intentadas por la cola de replicación|
| **cockroachdb.queue.replicate.rebalancereplica.count** <br>(count) | \[OpenMetrics v2\] Número de adiciones iniciadas por el rebalanceador de réplicas intentadas por la cola de replicación|
| **cockroachdb.queue.replicate.rebalancevoterreplica.count** <br>(count) | Número de adiciones iniciadas por el rebalanceador de réplicas de votantes intentadas por la cola de replicación|
| **cockroachdb.queue.replicate.removedeadnonvoterreplica.count** <br>(count) | Número de eliminaciones de réplicas muertas no votantes intentadas por la cola de replicación (normalmente en respuesta a la interrupción de un nodo)|
| **cockroachdb.queue.replicate.removedeadreplica** <br>(count) | \[OpenMetrics v1\] Número de eliminaciones de réplicas muertas intentadas por la cola de replicación (normalmente en respuesta a la interrupción de un nodo)|
| **cockroachdb.queue.replicate.removedeadreplica.count** <br>(count) | \[OpenMetrics v2\] Número de eliminaciones de réplicas muertas intentadas por la cola de replicación (normalmente en respuesta a la interrupción de un nodo)|
| **cockroachdb.queue.replicate.removedeadreplica.error.count** <br>(count) | Número de eliminaciones fallidas de réplicas muertas procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.removedeadreplica.success.count** <br>(count) | Número de eliminaciones exitosas de réplicas muertas procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.removedeadvoterreplica.count** <br>(count) | Número de eliminaciones de réplicas de votantes muertas intentadas por la cola de replicación (normalmente en respuesta a la interrupción de un nodo)|
| **cockroachdb.queue.replicate.removedecommissioningnonvoterreplica.count** <br>(count) | Número de eliminaciones de réplicas no votantes por desmantelamiento intentadas por la cola de replicación (normalmente en respuesta a la interrupción de un nodo)|
| **cockroachdb.queue.replicate.removedecommissioningreplica.count** <br>(count) | Número de eliminaciones de réplicas por desmantelamiento intentadas por la cola de replicación (normalmente en respuesta a la interrupción de un nodo)|
| **cockroachdb.queue.replicate.removedecommissioningreplica.error.count** <br>(count) | Número de eliminaciones fallidas de réplicas por desmantelamiento procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.removedecommissioningreplica.success.count** <br>(count) | Número de eliminaciones exitosas de réplicas por desmantelamiento procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.removedecommissioningvoterreplica.count** <br>(count) | Número de eliminaciones de réplicas votantes por desmantelamiento intentadas por la cola de replicación (normalmente en respuesta a la interrupción de un nodo)|
| **cockroachdb.queue.replicate.removelearnerreplica.count** <br>(count) | Número de eliminaciones de réplicas de aprendiz intentadas por la cola de replicación (normalmente debido a condiciones de carrera internas)|
| **cockroachdb.queue.replicate.removenonvoterreplica.count** <br>(count) | Número de eliminaciones de réplicas no votantes intentadas por la cola de replicación (normalmente en respuesta a una adición iniciada por un rebalanceador)|
| **cockroachdb.queue.replicate.removereplica** <br>(count) | [OpenMetrics v1\] Número de eliminaciones de réplicas intentadas por la cola de replicación (normalmente en respuesta a una adición iniciada por un rebalanceador)|
| **cockroachdb.queue.replicate.removereplica.count** <br>(count) | \[OpenMetrics v2\] Número de eliminaciones de réplicas intentadas por la cola de replicación (normalmente en respuesta a una adición iniciada por un rebalanceador)|
| **cockroachdb.queue.replicate.removereplica.error.count** <br>(count) | Número de eliminaciones de réplicas fallidas procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.removereplica.success.count** <br>(count) | Número de eliminaciones exitosas de réplicas procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.removevoterreplica.count** <br>(count) | Número de eliminaciones de réplicas votantes intentadas por la cola de replicación (normalmente en respuesta a una adición iniciada por un rebalanceador)|
| **cockroachdb.queue.replicate.replacedeadreplica.error.count** <br>(count) | Número de sustituciones de réplicas muertas fallidas procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.replacedeadreplica.success.count** <br>(count) | Número de sustituciones exitosas de réplicas muertas procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.replacedecommissioningreplica.error.count** <br>(count) | Número de sustituciones de réplicas por desmantelamiento fallidas procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.replacedecommissioningreplica.success.count** <br>(count) | Número de sustituciones exitosas de réplicas por desmantelamiento procesadas por la cola de replicación|
| **cockroachdb.queue.replicate.transferlease** <br>(count) | \[OpenMetrics v1\] Número de transferencias de arrendamientos intentadas por la cola de replicación|
| **cockroachdb.queue.replicate.transferlease.count** <br>(count) | \[OpenMetrics v2\] Número de transferencias de arrendamientos intentadas por la cola de replicación|
| **cockroachdb.queue.replicate.voterdemotions.count** <br>(count) | Número de votantes degradados a no votantes por la cola de replicación|
| **cockroachdb.queue.split.load_based.count** <br>(count) | Número de divisiones de rango debidas a que un rango es superior a la carga máxima de rango configurada|
| **cockroachdb.queue.split.pending** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas pendientes en la cola dividida|
| **cockroachdb.queue.split.process.failure** <br>(count) | \[OpenMetrics v1\] Número de réplicas cuyo procesamiento falló en la cola dividida|
| **cockroachdb.queue.split.process.failure.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas cuyo procesamiento falló en la cola dividida|
| **cockroachdb.queue.split.process.success** <br>(count) | \[OpenMetrics v1\] Número de réplicas procesadas con éxito por la cola dividida|
| **cockroachdb.queue.split.process.success.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas procesadas con éxito por la cola dividida|
| **cockroachdb.queue.split.processingnanos** <br>(count) | \[OpenMetrics v1\] Nanosegundos dedicados a procesar réplicas en la cola dividida<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.split.processingnanos.count** <br>(count) | \[OpenMetrics v2\] Nanosegundos dedicados a procesar réplicas en la cola dividida<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.split.purgatory** <br>(gauge) | Número de réplicas en el purgatorio de la cola dividida, esperando a ser divisibles|
| **cockroachdb.queue.split.size_based.count** <br>(count) | Número de divisiones de rangos debidas a que un rango es mayor que el tamaño máximo de rango configurado|
| **cockroachdb.queue.split.span_config_based.count** <br>(count) | Número de divisiones de rangos debidas debidas a la configuración de tramos|
| **cockroachdb.queue.tsmaintenance.pending** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas pendientes en la cola de mantenimiento de series temporales|
| **cockroachdb.queue.tsmaintenance.process.failure** <br>(count) | \[OpenMetrics v1\] Número de réplicas cuyo procesamiento falló en la cola de mantenimiento de series temporales|
| **cockroachdb.queue.tsmaintenance.process.failure.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas cuyo procesamiento falló en la cola de mantenimiento de series temporales|
| **cockroachdb.queue.tsmaintenance.process.success** <br>(count) | \[OpenMetrics v1\] Número de réplicas procesadas con éxito por la cola de mantenimiento de series temporales|
| **cockroachdb.queue.tsmaintenance.process.success.count** <br>(count) | \[OpenMetrics v2\] Número de réplicas procesadas con éxito por la cola de mantenimiento de series temporales|
| **cockroachdb.queue.tsmaintenance.processingnanos** <br>(count) | \[OpenMetrics v1\] Nanosegundos dedicados a procesar réplicas en la cola de mantenimiento de series temporales<br>_Se muestra como nanosegundo_ |
| **cockroachdb.queue.tsmaintenance.processingnanos.count** <br>(count) | \[OpenMetrics v2\] Nanosegundos dedicados a procesar réplicas en la cola de mantenimiento de series temporales<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.commands.proposed.count** <br>(count) | Número de comandos Raft propuestos. El número de proposiciones y repeticiones de proposiciones realizadas por los arrendatarios. Esta métrica aproxima el número de comandos enviados a través de Raft.|
| **cockroachdb.raft.commands.reproposed.new_lai.count** <br>(count) | Número de comandos Raft nuevamente propuestos con un nuevo LAI. Número de comandos Raft que los arrendatarios volvieron a proponer con un nuevo LAI. Estas nuevas propuestas se producen en el caso de comandos confirmados en Raft más allá de la orden deseada y que, por lo tanto, no pueden aplicarse tal cual.|
| **cockroachdb.raft.commands.reproposed.unchanged.count** <br>(count) | Número de comandos Raft nuevamente propuestos sin modificaciones. Número de comandos Raft que los arrendatarios volvieron a proponer sin modificaciones. Estas nuevas propuestas se producen en el caso de comandos no confirmados/no aplicados sin tiempo de inactividad y que, por lo tanto, corren un elevado riesgo de descartarse.|
| **cockroachdb.raft.commandsapplied** <br>(count) | \[OpenMetrics v1\] Recuento de comandos Raft aplicados<br>_Se muestra como comando_ |
| **cockroachdb.raft.commandsapplied.count** <br>(count) | \[OpenMetrics v2\] Recuento de comandos Raft aplicados<br>_Se muestra como comando_ |
| **cockroachdb.raft.dropped.count** <br>(count) | Número de propuestas Raft descartadas (se cuenta cada raftpb.Entry, no raftpb.MsgProp)|
| **cockroachdb.raft.dropped_leader.count** <br>(count) | Número de propuestas Raft lanzadas por una réplica que se considera líder. Cada actualización también incrementa `raft.dropped` (esto cuenta raftpb.Entry individuales, no raftpb.MsgProp)|
| **cockroachdb.raft.enqueued.pending** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de mensajes salientes pendientes en la cola de Raft Transport|
| **cockroachdb.raft.entrycache.accesses.count** <br>(count) | Número de búsquedas en la caché de entradas Raft|
| **cockroachdb.raft.entrycache.bytes** <br>(gauge) | Tamaño agregado de todas las entradas Raft en la caché de entradas Raft<br>_Se muestra como byte_ |
| **cockroachdb.raft.entrycache.hits.count** <br>(count) | Número de búsquedas correctas en la caché de entradas Raft|
| **cockroachdb.raft.entrycache.read_bytes.count** <br>(count) | Contador de bytes en entradas devueltas desde la caché de entradas Raft<br>_Se muestra como byte_ |
| **cockroachdb.raft.entrycache.size** <br>(gauge) | Número de entradas Raft en la caché de entradas Raft|
| **cockroachdb.raft.heartbeats.pending** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de latidos y respuestas pendientes a la espera de coalescer|
| **cockroachdb.raft.process.applycommitted.latency.bucket** <br>(count) | Histograma de latencia para la aplicación de todos los comandos Raft confirmados en un Raft listo. Esto mide la latencia de extremo a extremo de la aplicación de todos los comandos en un Raft listo. Ten en cuenta que esto se cierra sobre posiblemente múltiples mediciones de la métrica 'raft.process.commandcommit.latency', que recibe puntos de datos para cada sublote procesado en el proceso.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.applycommitted.latency.count** <br>(count) | Histograma de latencia para la aplicación de todos los comandos Raft confirmados en un Raft listo. Esto mide la latencia de extremo a extremo de la aplicación de todos los comandos en un Raft listo. Ten en cuenta que esto se cierra sobre posiblemente múltiples mediciones de la métrica 'raft.process.commandcommit.latency', que recibe puntos de datos para cada sublote procesado en el proceso.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.applycommitted.latency.sum** <br>(count) | Histograma de latencia para la aplicación de todos los comandos Raft confirmados en un Raft listo. Esto mide la latencia de extremo a extremo de la aplicación de todos los comandos en un Raft listo. Ten en cuenta que esto se cierra sobre posiblemente múltiples mediciones de la métrica 'raft.process.commandcommit.latency', que recibe puntos de datos para cada sublote procesado en el proceso.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.commandcommit.latency** <br>(gauge) | \[OpenMetrics v1\] Histograma de latencia en nanosegundos de la confirmación de comandos Raft<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.commandcommit.latency.bucket** <br>(count) | \[OpenMetrics v2\] Histograma de latencia en nanosegundos de la confirmación de comandos Raft<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.commandcommit.latency.count** <br>(count) | \[OpenMetrics v2\] Histograma de latencia en nanosegundos de la confirmación de comandos Raft<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.commandcommit.latency.sum** <br>(count) | \[OpenMetrics v2\] Histograma de latencia en nanosegundos de la confirmación de comandos Raft<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.handleready.latency.bucket** <br>(count) | Histograma de latencia para gestionar un Raft listo. Esto mide la latencia de extremo a extremo del bucle de avance del estado de Raft, incluyendo: aplicación de snapshots, ingesta de TSM, anexión duradera al log de Raft (es decir, incluye fsync), aplicación de entrada (incluye efectos secundarios replicados, en particular el truncamiento de logs).<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.handleready.latency.count** <br>(count) | Histograma de latencia para gestionar un Raft listo. Esto mide la latencia de extremo a extremo del bucle de avance del estado de Raft, incluyendo: aplicación de snapshots, ingesta de TSM, anexión duradera al log de Raft (es decir, incluye fsync), aplicación de entrada (incluye efectos secundarios replicados, en particular el truncamiento de logs).<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.handleready.latency.sum** <br>(count) | Histograma de latencia para gestionar un Raft listo. Esto mide la latencia de extremo a extremo del bucle de avance del estado de Raft, incluyendo: aplicación de snapshots, ingesta de TSM, anexión duradera al log de Raft (es decir, incluye fsync), aplicación de entrada (incluye efectos secundarios replicados, en particular el truncamiento de logs).<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.logcommit.latency** <br>(gauge) | \[OpenMetrics v1\] Histograma de latencia en nanosegundos para confirmar entradas de logs Raft <br> _Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.logcommit.latency.bucket** <br>(count) | \[OpenMetrics v2\] Histograma de latencia en nanosegundos para confirmar entradas de logs Raft <br> _Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.logcommit.latency.count** <br>(count) | \[OpenMetrics v2\] Histograma de latencia en nanosegundos para confirmar entradas de logs Raft <br> _Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.logcommit.latency.sum** <br>(count) | \[OpenMetrics v2\] Histograma de latencia en nanosegundos para confirmar entradas de logs Raft <br> _Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.tickingnanos** <br>(count) | \[OpenMetrics v1\] Nanosegundos dedicados a store.processRaft() procesando replica.Tick()<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.tickingnanos.count** <br>(count) | \[OpenMetrics v2\] Nanosegundos dedicados a store.processRaft() procesando replica.Tick()<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.workingnanos** <br>(count) | \[OpenMetrics v1\] Nanosegundos dedicados al trabajo con store.processRaft()<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.process.workingnanos.count** <br>(count) | \[OpenMetrics v2\] Nanosegundos dedicados al trabajo con store.processRaft()<br>_Se muestra como nanosegundo_ |
| **cockroachdb.raft.quota_pool.percent_used.bucket** <br>(count) | Histograma de uso del grupo de cuotas de propuestas (0-100) por arrendatario e intervalo de métrica|
| **cockroachdb.raft.quota_pool.percent_used.count** <br>(count) | Histograma de uso del grupo de cuotas de propuestas (0-100) por arrendatario e intervalo de métrica|
| **cockroachdb.raft.quota_pool.percent_used.sum** <br>(count) | Histograma de uso del grupo de cuotas de propuestas (0-100) por arrendatario e intervalo de métrica|
| **cockroachdb.raft.rcvd.app** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgApp recibidos por este almacén|
| **cockroachdb.raft.rcvd.app.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgApp recibidos por este almacén|
| **cockroachdb.raft.rcvd.appresp** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgAppResp recibidos por este almacén|
| **cockroachdb.raft.rcvd.appresp.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgAppResp recibidos por este almacén|
| **cockroachdb.raft.rcvd.bytes.count** <br>(count) | Número de bytes en mensajes Raft recibidos por este almacén. Ten en cuenta que esto no incluye el snapshot de Raft recibido.<br>_Se muestra como byte_ |
| **cockroachdb.raft.rcvd.cross_region.bytes.count** <br>(count) | Número de bytes recibidos por este almacén para mensajes Raft entre regiones (cuando los niveles de región están configurados). Ten en cuenta que esto no incluye el snapshot de Raft recibido.<br>_Se muestra como byte_ |
| **cockroachdb.raft.rcvd.cross_zone.bytes.count** <br>(count) | Número de bytes recibidos por este almacén para mensajes Raft entre zonas, de la misma región (cuando los niveles de región y zona están configurados). Si los niveles de región no están configurados, este recuento puede incluir datos enviados entre diferentes regiones.<br>_Se muestra como byte_ |
| **cockroachdb.raft.rcvd.dropped** <br>(count) | \[OpenMetrics v1\] Número de mensajes Raft entrantes descartados|
| **cockroachdb.raft.rcvd.dropped.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes Raft entrantes descartados|
| **cockroachdb.raft.rcvd.dropped_bytes.count** <br>(count) | Bytes de mensajes Raft entrantes descartados<br>_Se muestra como byte_ |
| **cockroachdb.raft.rcvd.heartbeat** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgHeartbeat (coalescentes, si está activado) recibidos por este almacén|
| **cockroachdb.raft.rcvd.heartbeat.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgHeartbeat (coalescentes, si está activado) recibidos por este almacén|
| **cockroachdb.raft.rcvd.heartbeatresp** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgHeartbeatResp (coalescentes, si está activado) recibidos por este almacén|
| **cockroachdb.raft.rcvd.heartbeatresp.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgHeartbeatResp (coalescentes, si está activado) recibidos por este almacén|
| **cockroachdb.raft.rcvd.prevote** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgPreVote recibidos por este almacén|
| **cockroachdb.raft.rcvd.prevote.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgPreVote recibidos por este almacén|
| **cockroachdb.raft.rcvd.prevoteresp** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgPreVoteResp recibidos por este almacén|
| **cockroachdb.raft.rcvd.prevoteresp.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgPreVoteResp recibidos por este almacén|
| **cockroachdb.raft.rcvd.prop** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgProp recibidos por este almacén|
| **cockroachdb.raft.rcvd.prop.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgProp recibidos por este almacén|
| **cockroachdb.raft.rcvd.queued_bytes** <br>(gauge) | Número de bytes en mensajes actualmente en espera de procesamiento Raft<br>_Se muestra como byte_ |
| **cockroachdb.raft.rcvd.snap** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgSnap recibidos por este almacén|
| **cockroachdb.raft.rcvd.snap.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgSnap recibidos por este almacén|
| **cockroachdb.raft.rcvd.stepped_bytes.count** <br>(count) | Número de bytes en mensajes procesados por Raft. Los mensajes reflejados aquí fueron entregados a Raft (vía RawNode.step). Esto no implica que los mensajes ya no se conserven en la memoria o que se haya realizado una E/S.<br>_Se muestra como byte_ |
| **cockroachdb.raft.rcvd.timeoutnow** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgTimeoutNow recibidos por este almacén|
| **cockroachdb.raft.rcvd.timeoutnow.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgTimeoutNow recibidos por este almacén|
| **cockroachdb.raft.rcvd.transferleader** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgTransferLeader recibidos por este almacén|
| **cockroachdb.raft.rcvd.transferleader.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgTransferLeader recibidos por este almacén|
| **cockroachdb.raft.rcvd.vote** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgVote recibidos por este almacén|
| **cockroachdb.raft.rcvd.vote.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgVote recibidos por este almacén|
| **cockroachdb.raft.rcvd.voteresp** <br>(count) | \[OpenMetrics v1\] Número de mensajes MsgVoteResp recibidos por este almacén|
| **cockroachdb.raft.rcvd.voteresp.count** <br>(count) | \[OpenMetrics v2\] Número de mensajes MsgVoteResp recibidos por este almacén|
| **cockroachdb.raft.replication.latency.bucket** <br>(count) | Tiempo transcurrido entre la evaluación de una BatchRequest y su reflejo en la máquina de estado del proponente (es decir, su aplicación completa). Esto incluye el tiempo transcurrido en el grupo de cuotas, en la replicación (incluidas las propuestas) y en la aplicación, pero en particular *no* la latencia de secuenciación (es decir, la contención y la adquisición de latch).|
| **cockroachdb.raft.replication.latency.count** <br>(count) | Tiempo transcurrido entre la evaluación de una BatchRequest y su reflejo en la máquina de estado del proponente (es decir, su aplicación completa). Esto incluye el tiempo transcurrido en el grupo de cuotas, en la replicación (incluidas las propuestas) y en la aplicación, pero en particular *no* la latencia de secuenciación (es decir, la contención y la adquisición de latch).|
| **cockroachdb.raft.replication.latency.sum** <br>(count) | Tiempo transcurrido entre la evaluación de una BatchRequest y su reflejo en la máquina de estado del proponente (es decir, su aplicación completa). Esto incluye el tiempo transcurrido en el grupo de cuotas, en la replicación (incluidas las propuestas) y en la aplicación, pero en particular *no* la latencia de secuenciación (es decir, la contención y la adquisición de latch).|
| **cockroachdb.raft.scheduler.latency** <br>(count) | Duraciones de las colas de rangos que esperan ser procesados. Este histograma mide el tiempo que transcurre desde que un rango se registra en el programador para su procesamiento hasta que se procesa realmente. No incluye la duración del procesamiento.<br>_Se muestra como nanosegundos_ |
| **cockroachdb.raft.scheduler.latency.bucket** <br>(count) | Duraciones de las colas de rangos que esperan ser procesados. Este histograma mide el tiempo que transcurre desde que un rango se registra en el programador para su procesamiento hasta que se procesa realmente. No incluye la duración del procesamiento.<br>_Se muestra como nanosegundos_ |
| **cockroachdb.raft.scheduler.latency.count** <br>(count) | Duraciones de las colas de rangos que esperan ser procesados. Este histograma mide el tiempo que transcurre desde que un rango se registra en el programador para su procesamiento hasta que se procesa realmente. No incluye la duración del procesamiento.<br>_Se muestra como nanosegundos_ |
| **cockroachdb.raft.scheduler.latency.sum** <br>(count) | Duraciones de las colas de rangos que esperan ser procesados. Este histograma mide el tiempo que transcurre desde que un rango se registra en el programador para su procesamiento hasta que se procesa realmente. No incluye la duración del procesamiento.<br>_Se muestra como nanosegundos_ |
| **cockroachdb.raft.sent.bytes.count** <br>(count) | Número de bytes en mensajes Raft enviados por este almacén. Ten en cuenta que esto no incluye el snapshot Raft enviado.<br>_Se muestra como byte_ |
| **cockroachdb.raft.sent.cross_region.bytes.count** <br>(count) | Número de bytes enviados por este almacén para mensajes Raft entre regiones (cuando los niveles de región están configurados). Ten en cuenta que esto no incluye el snapshot de Raft enviado.<br>_Se muestra como byte_ |
| **cockroachdb.raft.sent.cross_zone.bytes.count** <br>(count) | Número de bytes enviados por este almacén para mensajes Raft entre zonas, de la misma región (cuando los niveles de región y zona están configurados). Si los niveles de región no están configurados, este recuento puede incluir datos enviados entre diferentes regiones. Para garantizar una monitorización precisa de los datos transmitidos, es importante definir una configuración de localidad coherente en todos los nodos. Ten en cuenta que esto no incluye el snapshot Raft enviado.<br>_Se muestra como byte_ |
| **cockroachdb.raft.storage.read_bytes.count** <br>(count) | Contador de raftpb.Entry.Size() leídos desde pebble para las entradas de logs Raft. Son los bytes devueltos por (raft.Storage). Método de entradas que no fueron devueltas a través de la caché de entradas Raft. Esta métrica más la métrica raft.entrycache.read_bytes representan el total de bytes devueltos por el método de entradas.<br>_Se muestra como byte_ |
| **cockroachdb.raft.ticks** <br>(count) | \[OpenMetrics v1\] Número de ticks Raft en cola|
| **cockroachdb.raft.ticks.count** <br>(count) | \[OpenMetrics v2\] Número de ticks Raft en cola|
| **cockroachdb.raft.timeoutcampaign.count** <br>(count) | Número de réplicas Raft en campaña tras la pérdida de latidos del líder|
| **cockroachdb.raft.transport.flow_token_dispatches_dropped.count** <br>(count) | Número de envíos de tokens de flujo descartados por el Raft Transport|
| **cockroachdb.raft.transport.rcvd.count** <br>(count) | Número de mensajes Raft recibidos por el Raft Transport|
| **cockroachdb.raft.transport.reverse_rcvd.count** <br>(count) | Mensajes recibidos desde la dirección inversa de un flujo. Estos mensajes deberían ser poco frecuentes. Son principalmente informativos, y no son respuestas reales a los mensajes Raft. Las respuestas se reciben a través de otro flujo.|
| **cockroachdb.raft.transport.reverse_sent.count** <br>(count) | Mensajes enviados en la dirección inversa de un flujo. Estos mensajes deberían ser poco frecuentes. Son principalmente informativos, y no son respuestas reales a los mensajes Raft. Las respuestas se envían a través de otro flujo.|
| **cockroachdb.raft.transport.send_queue_bytes** <br>(gauge) | Tamaño total en bytes de los mensajes salientes pendientes en la cola. La cola se compone de varios canales delimitados asociados a diferentes pares. Un tamaño superior a la línea de base media podría indicar problemas de transmisión de mensajes al menos a un par. Utiliza esta métrica junto con send-queue-size para tener una visión más completa.<br>_Se muestra como byte_ |
| **cockroachdb.raft.transport.send_queue_size** <br>(gauge) | Número de mensajes salientes pendientes en la cola de Raft Transport. La cola se compone de varios canales delimitados asociados a diferentes pares. El tamaño total de decenas de miles podría indicar problemas de transmisión de mensajes al menos a un par. Utiliza esta métrica junto con withsend-queue-bytes.|
| **cockroachdb.raft.transport.sends_dropped.count** <br>(count) | Número de envíos de mensajes Raft descartados por el Raft Transport|
| **cockroachdb.raft.transport.sent.count** <br>(count) | Número de mensajes Raft enviados por el Raft Transport|
| **cockroachdb.raftlog.behind** <br>(gauge) | \[OpenMetrics v1 y v2\] Un número de seguidores de entradas de logs Raft en otros almacenes están detrás<br>_Se muestra como entrada_ |
| **cockroachdb.raftlog.truncated** <br>(count) | \[OpenMetrics v1\] Número de entradas de logs Raft truncadas<br>_Se muestra como entrada_ |
| **cockroachdb.raftlog.truncated.count** <br>(count) | \[OpenMetrics v2\] Número de entradas de logs Raft truncadas<br>_Se muestra como entrada_ |
| **cockroachdb.range.adds** <br>(count) | \[OpenMetrics v1\] Número de adiciones de rangos|
| **cockroachdb.range.adds.count** <br>(count) | \[OpenMetrics v2\] Número de adiciones de rangos|
| **cockroachdb.range.merges.count** <br>(count) | Número de fusiones de rangos|
| **cockroachdb.range.raftleaderremovals.count** <br>(count) | Número de veces que el líder Raft actual fue eliminado de un rango|
| **cockroachdb.range.raftleadertransfers** <br>(count) | \[OpenMetrics v1\] Número de transferencias de líderes Raft|
| **cockroachdb.range.raftleadertransfers.count** <br>(count) | \[OpenMetrics v2\] Número de transferencias de líderes Raft|
| **cockroachdb.range.recoveries.count** <br>(count) | Recuento de operaciones de recuperación de pérdida de quórum sin conexión realizadas en rangos. Este recuento aumenta por cada rango recuperado en una operación de recuperación de pérdida de quórum sin conexión. La métrica se actualiza cuando el nodo en el que se encuentra la réplica superviviente se inicia tras la recuperación.|
| **cockroachdb.range.removes** <br>(count) | \[OpenMetrics v1\] Número de eliminaciones de rangos|
| **cockroachdb.range.removes.count** <br>(count) | \[OpenMetrics v2\] Número de eliminaciones de rangos|
| **cockroachdb.range.snapshots.applied_initial.count** <br>(count) | Número de snapshots aplicados para la replicación inicial|
| **cockroachdb.range.snapshots.applied_non_voter.count** <br>(count) | Número de snapshots aplicados por réplicas no votantes|
| **cockroachdb.range.snapshots.applied_voter.count** <br>(count) | Número de snapshots aplicados por las réplicas votantes|
| **cockroachdb.range.snapshots.cross_region.rcvd_bytes.count** <br>(count) | Número de bytes de snapshots recibidos entre regiones<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.cross_region.sent_bytes.count** <br>(count) | Número de bytes de snapshots enviados entre regiones<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.cross_zone.rcvd_bytes.count** <br>(count) | Número de bytes de snapshots recibidos entre zonas dentro de la misma región o si los niveles de región no están configurados. Este recuento aumenta por cada snapshot recibido entre zonas diferentes dentro de la misma región. Sin embargo, si los niveles de región no están configurados, este recuento también puede incluir datos de snapshots recibidos entre diferentes regiones.<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.cross_zone.sent_bytes.count** <br>(count) | Número de bytes de snapshots enviados entre zonas dentro de la misma región o si los niveles de región no están configurados. Este recuento aumenta por cada snapshot enviado entre zonas diferentes dentro de la misma región. Sin embargo, si los niveles de región no están configurados, este recuento también puede incluir datos de snapshots enviados entre diferentes regiones.<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.delegate.failures.count** <br>(count) | Número de snapshots delegados a un nodo diferente y que resultaron en un fallo en ese delegado. Existen numerosas razones por las que puede producirse un fallo en un delegado, como que se agote el tiempo de espera, que el log Raft delegado esté demasiado atrasado o que el delegado esté demasiado ocupado para enviar.|
| **cockroachdb.range.snapshots.delegate.in_progress** <br>(gauge) | Número de snapshots delegados que están actualmente en curso|
| **cockroachdb.range.snapshots.delegate.sent_bytes.count** <br>(count) | Bytes enviados mediante un delegado. El número de bytes enviados como resultado de una solicitud de snapshot delegado que se originó en un nodo diferente. Esta métrica es útil para evaluar el ahorro de red que supone no enviar tráfico entre regiones.<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.delegate.successes.count** <br>(count) | Número de snapshots delegados a un nodo diferente y que fueron exitosas en ese delegado. No se tienen en cuenta los snapshots autodelegados.|
| **cockroachdb.range.snapshots.generated** <br>(count) | \[OpenMetrics v1\] Número de snapshots generados|
| **cockroachdb.range.snapshots.generated.count** <br>(count) | \[OpenMetrics v2\] Número de snapshots generados|
| **cockroachdb.range.snapshots.normal_applied** <br>(count) | \[OpenMetrics v1\] Número de snapshots aplicados|
| **cockroachdb.range.snapshots.normal_applied.count** <br>(count) | \[OpenMetrics v2\] Número de snapshots aplicados|
| **cockroachdb.range.snapshots.preemptive_applied** <br>(count) | \[OpenMetrics v1\] Número de snapshots preventivos aplicados|
| **cockroachdb.range.snapshots.preemptive_applied.count** <br>(count) | \[OpenMetrics v2\] Número de snapshots preventivos aplicados|
| **cockroachdb.range.snapshots.rcvd_bytes.count** <br>(count) | Número de bytes de snapshots recibidos<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.rebalancing.rcvd_bytes.count** <br>(count) | Número de bytes de snapshots de rebalanceo recibidos<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.rebalancing.sent_bytes.count** <br>(count) | Número de bytes de snapshots de rebalanceo enviados<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.recovery.rcvd_bytes.count** <br>(count) | Número de bytes de snapshots de recuperación recibidos<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.recovery.sent_bytes.count** <br>(count) | Número de bytes de snapshots de recuperación enviados<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.recv_failed.count** <br>(count) | Número de mensajes de inicialización de snapshots de rangos que fallaron en el destinatario, normalmente antes de que se transfiera ningún dato|
| **cockroachdb.range.snapshots.recv_in_progress** <br>(gauge) | Número de snapshots no vacíos que se reciben|
| **cockroachdb.range.snapshots.recv_queue** <br>(gauge) | Número de snapshots en cola para recibir|
| **cockroachdb.range.snapshots.recv_queue_bytes** <br>(gauge) | Tamaño total de todos los snapshots en la cola de recepción de snapshots<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.recv_total_in_progress** <br>(gauge) | Número total de snapshots recibidos|
| **cockroachdb.range.snapshots.recv_unusable.count** <br>(count) | Número de snapshots de rangos que se transmitieron en su totalidad pero se determinó que eran innecesarios o inutilizables|
| **cockroachdb.range.snapshots.send_in_progress** <br>(gauge) | Número de snapshots no vacíos que se envían|
| **cockroachdb.range.snapshots.send_queue** <br>(gauge) | Número de snapshots en cola para enviar|
| **cockroachdb.range.snapshots.send_queue_bytes** <br>(indicador) | Tamaño total de todos los snapshots en la cola de envío de snapshots<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.send_total_in_progress** <br>(gauge) | Número total de snapshots enviados|
| **cockroachdb.range.snapshots.sent_bytes.count** <br>(count) | Número de bytes de snapshots enviados<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.unknown.rcvd_bytes.count** <br>(count) | Número de bytes de snapshots desconocidos recibidos<br>_Se muestra como byte_ |
| **cockroachdb.range.snapshots.unknown.sent_bytes.count** <br>(count) | Número de bytes de snapshots desconocidos enviados<br>_Se muestra como byte_ |
| **cockroachdb.range.splits.count** <br>(count) | Número de divisiones de rangos|
| **cockroachdb.range.splits.total** <br>(count) | \[OpenMetrics v1\] Número de divisiones de rangos|
| **cockroachdb.range.splits.total.count** <br>(count) | \[OpenMetrics v2\] Número de divisiones de rangos|
| **cockroachdb.rangekeybytes** <br>(gauge) | Número de bytes ocupados por las claves de rango (por ejemplo, lápidas de rango MVCC)<br>_Se muestra como byte_ |
| **cockroachdb.rangekeycount** <br>(gauge) | Recuento de todas las claves de rango (por ejemplo, lápidas de rango MVCC)|
| **cockroachdb.ranges** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de rangos|
| **cockroachdb.ranges.overreplicated** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de rangos con más réplicas vivas que el objetivo de replicación|
| **cockroachdb.ranges.unavailable** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de rangos con menos réplicas vivas de las necesarias para el quórum|
| **cockroachdb.ranges.underreplicated** <br>(calibre) | \[OpenMetrics v1 y v2\] Número de rangos con menos réplicas vivas que el objetivo de replicación|
| **cockroachdb.rangevalbytes** <br>(gauge) | Número de bytes ocupados por valores claves de rangos (por ejemplo, lápidas del rango MVCC)<br>_Se muestra como byte_ |
| **cockroachdb.rangevalcount** <br>(gauge) | Recuento de todos los valores clave de rangos (por ejemplo, lápidas del rango MVCC)|
| **cockroachdb.rebalancing.cpunanospersecond** <br>(gauge) | Promedio de nanosegundos de CPU dedicados a procesar operaciones de replicación en los últimos 30 minutos.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.rebalancing.lease.transfers.count** <br>(count) | Número de transferencias de arrendatarios por desequilibrios de carga a nivel del almacén|
| **cockroachdb.rebalancing.queriespersecond** <br>(gauge) | Número de solicitudes a nivel de KV recibidas por segundo por el almacén, promediadas a lo largo de un periodo de tiempo amplio, tal y como se utiliza en las decisiones de rebalanceo|
| **cockroachdb.rebalancing.range.rebalances.count** <br>(count) | Número de operaciones de rebalanceo de rangos motivadas por desequilibrios de carga a nivel del almacén|
| **cockroachdb.rebalancing.readbytespersecond** <br>(indicador) | Número de bytes leídos recientemente por segundo, considerando los últimos 30 minutos.<br>_Se muestra como byte_ |
| **cockroachdb.rebalancing.readspersecond** <br>(gauge) | Número de claves leídas recientemente por segundo, considerando los últimos 30 minutos.|
| **cockroachdb.rebalancing.replicas.cpunanospersecond.bucket** <br>(count) | Histograma de la media de nanosegundos de CPU dedicados a procesar operaciones de replicación en los últimos 30 minutos.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.rebalancing.replicas.cpunanospersecond.count** <br>(count) | Histograma de la media de nanosegundos de CPU dedicados a procesar operaciones de réplica en los últimos 30 minutos.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.rebalancing.replicas.cpunanospersecond.sum** <br>(count) | Histograma de la media de nanosegundos de CPU dedicados a procesar operaciones de réplica en los últimos 30 minutos.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.rebalancing.replicas.queriespersecond.bucket** <br>(count) | Histograma del promedio de solicitudes a nivel de KV recibidas por segundo por réplicas del almacén en los últimos 30 minutos.|
| **cockroachdb.rebalancing.replicas.queriespersecond.count** <br>(count) | Histograma del promedio de solicitudes a nivel de KV recibidas por segundo por réplicas del almacén en los últimos 30 minutos.|
| **cockroachdb.rebalancing.replicas.queriespersecond.sum** <br>(count) | Histograma del promedio de solicitudes a nivel de KV recibidas por segundo por réplicas del almacén en los últimos 30 minutos.|
| **cockroachdb.rebalancing.requestspersecond** <br>(gauge) | Número de solicitudes recibidas recientemente por segundo, considerando los últimos 30 minutos|
| **cockroachdb.rebalancing.state.imbalanced_overfull_options_exhausted.count** <br>(count) | Número de ocasiones en las que este almacén estuvo sobrecargado pero no consiguió eliminar la carga tras agotar las opciones de rebalanceo disponibles|
| **cockroachdb.rebalancing.writebytespersecond** <br>(gauge) | Número de bytes escritos recientemente por segundo, considerando los últimos 30 minutos.<br>_Se muestra como byte_ |
| **cockroachdb.rebalancing.writespersecond** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de claves escritas (es decir, aplicadas por Raft) por segundo en el almacén, promediado durante un largo período de tiempo como se utiliza en las decisiones de rebalanceo<br>_Se muestra como clave_ |
| **cockroachdb.replicas** <br>(gauge) | Número de réplicas|
| **cockroachdb.replicas.commandqueue.combinedqueuesize** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de comandos en todas las CommandQueues combinadas<br>_Se muestra como comando_ |
| **cockroachdb.replicas.commandqueue.combinedreadcount** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de comandos de solo lectura en todas las CommandQueues combinadas<br>_Se muestra como comando_ |
| **cockroachdb.replicas.commandqueue.combinedwritecount** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de comandos de lectura-escritura en todas las CommandQueues combinadas<br>_Se muestra como comando_ |
| **cockroachdb.replicas.commandqueue.maxoverlaps** <br>(gauge) | \[OpenMetrics v1 y v2\] Mayor número de comandos superpuestos vistos al añadir a cualquier CommandQueue<br>_Se muestra como comando_ |
| **cockroachdb.replicas.commandqueue.maxreadcount** <br>(gauge) | \[OpenMetrics v1 y v2\] Mayor número de comandos de solo lectura en cualquier CommandQueue<br>_Se muestra como comando_ |
| **cockroachdb.replicas.commandqueue.maxsize** <br>(gauge) | \[OpenMetrics v1 y v2\] Mayor número de comandos en cualquier CommandQueue<br>_Se muestra como comando_ |
| **cockroachdb.replicas.commandqueue.maxtreesize** <br>(gauge) | \[OpenMetrics v1 y v2\] Mayor número de intervalos en cualquier árbol de intervalos de CommandQueue|
| **cockroachdb.replicas.commandqueue.maxwritecount** <br>(gauge) | \[OpenMetrics v1 y v2\] Mayor número de comandos de lectura-escritura en cualquier CommandQueue<br>_Se muestra como comando_ |
| **cockroachdb.replicas.leaders** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de líderes Raft|
| **cockroachdb.replicas.leaders.not_leaseholders** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas que son líderes Raft cuyo arrendamiento de rangos está en manos de otro almacén|
| **cockroachdb.replicas.leaders_invalid_lease** <br>(gauge) | Número de réplicas que son líderes Raft cuyo arrendamiento no es válido|
| **cockroachdb.replicas.leaders_not_leaseholders** <br>(gauge) | Número de réplicas que son líderes Raft cuyo arrendamiento de rangos está en manos de otro almacén|
| **cockroachdb.replicas.leaseholders** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de arrendatarios|
| **cockroachdb.replicas.quiescent** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas en reposo|
| **cockroachdb.replicas.reserved** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas reservadas para snapshots|
| **cockroachdb.replicas.total** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de réplicas|
| **cockroachdb.replicas.uninitialized** <br>(gauge) | Número de réplicas no inicializadas. No incluye las réplicas no inicializadas que pueden permanecer latentes en un estado persistente.|
| **cockroachdb.requests.backpressure.split** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de escrituras con contrapresión a la espera en una división de rango|
| **cockroachdb.requests.slow.commandqueue** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de solicitudes que llevan mucho tiempo atascadas en la cola de comandos<br>_Se muestra como solicitud_ |
| **cockroachdb.requests.slow.distsender** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de solicitudes que llevan mucho tiempo atascadas en la cola de comandos<br>_Se muestra como solicitud_ |
| **cockroachdb.requests.slow.latch** <br>(indicador) | Número de solicitudes que han estado atascadas durante mucho tiempo adquiriendo latches. Los latches moderan el acceso al espacio de claves KV con el fin de evaluar y replicar comandos. Un intento lento de adquisición de latches suele deberse a que otra solicitud retiene y no libera sus latches a tiempo.|
| **cockroachdb.requests.slow.lease** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de solicitudes que llevan mucho tiempo atascadas adquiriendo un arrendamiento<br>_Se muestra como solicitud_ |
| **cockroachdb.requests.slow.raft** <br>(indicador) | \[OpenMetrics v1 y v2\] Número de solicitudes que llevan mucho tiempo atascadas en Raft<br>_Se muestra como solicitud_ |
| **cockroachdb.rocksdb.block.cache.hits** <br>(gauge) | \[OpenMetrics v1 y v2\] Recuento de accesos a la caché de bloques|
| **cockroachdb.rocksdb.block.cache.misses** <br>(gauge) | \[OpenMetrics v1 y v2\] Recuento de fallos en la caché de bloques|
| **cockroachdb.rocksdb.block.cache.pinned.usage** <br>(gauge) | \[OpenMetrics v1 y v2\] Bytes fijados por la caché de bloques<br>_Se muestra como byte_ |
| **cockroachdb.rocksdb.block.cache.usage** <br>(gauge) | \[OpenMetrics v1 y v2\] Bytes utilizados por la caché de bloques<br>_Se muestra como byte_ |
| **cockroachdb.rocksdb.bloom.filter.prefix.checked** <br>(gauge) | Número de veces que se comprobó el filtro de Bloom|
| **cockroachdb.rocksdb.bloom.filter.prefix.useful** <br>(gauge) | Número de veces que el filtro de Bloom ayudó a evitar la creación de iteradores|
| **cockroachdb.rocksdb.bloom_filter.prefix.checked** <br>(indicador) | \[OpenMetrics v1 y v2\] Número de veces que se comprobó el filtro de Bloom|
| **cockroachdb.rocksdb.bloom_filter.prefix.useful** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de veces que el filtro de Bloom ayudó a evitar la creación de iteradores|
| **cockroachdb.rocksdb.compacted_bytes_read** <br>(gauge) | Bytes leídos durante la compactación<br>_Se muestra como byte_ |
| **cockroachdb.rocksdb.compacted_bytes_written** <br>(gauge) | Bytes escritos durante la compactación<br>_Se muestra como byte_ |
| **cockroachdb.rocksdb.compactions** <br>(gauge) | Número de compactaciones de tablas|
| **cockroachdb.rocksdb.compactions.total** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de compactaciones de tablas|
| **cockroachdb.rocksdb.encryption.algorithm** <br>(gauge) | Algoritmo utilizado para el cifrado en reposo, consulta ccl/storageccl/engineccl/enginepbccl/key_registry.proto|
| **cockroachdb.rocksdb.estimated_pending_compaction** <br>(gauge) | Bytes de compactación pendientes estimados<br>_Se muestra como byte_ |
| **cockroachdb.rocksdb.flushed_bytes** <br>(gauge) | Bytes escritos durante la descarga<br>_Se muestra como byte_ |
| **cockroachdb.rocksdb.flushes** <br>(gauge) | Número de descargas de tablas|
| **cockroachdb.rocksdb.flushes.total** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de descargas de tablas|
| **cockroachdb.rocksdb.ingested_bytes** <br>(indicador) | Bytes ingeridos<br>_Se muestra como byte_ |
| **cockroachdb.rocksdb.memtable.total.size** <br>(gauge) | \[OpenMetrics v1 y v2\] Tamaño actual de la memtable en bytes<br>_Se muestra como byte_ |
| **cockroachdb.rocksdb.num_sstables** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de SSTables rocksdb<br>_Se muestra como tabla_ |
| **cockroachdb.rocksdb.read.amplification** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de lecturas de disco por consulta<br>_Se muestra como lectura_ |
| **cockroachdb.rocksdb.table.readers.mem.estimate** <br>(gauge) | \[OpenMetrics v1 y v2\] Memoria utilizada por los bloques de índice y filtro|
| **cockroachdb.round_trip.latency** <br>(gauge) | \[OpenMetrics v1\] Distribución de latencias de ida y vuelta con otros nodos en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.round_trip.latency.bucket** <br>(count) | \[OpenMetrics v2\] Distribución de latencias de ida y vuelta con otros nodos en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.round_trip.latency.count** <br>(count) | \[OpenMetrics v2\] Distribución de latencias de ida y vuelta con otros nodos en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.round_trip.latency.sum** <br>(count) | \[OpenMetrics v2\] Distribución de latencias de ida y vuelta con otros nodos en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.round_trip_latency.bucket** <br>(count) | Distribución de latencias de ida y vuelta con otros nodos. Solo refleja los latidos exitosos y mide la sobrecarga de gRPC, así como posibles bloqueos de cabecera. Los valores elevados de esta métrica pueden indicar problemas o saturación de la red, pero no son prueba de ello. La sobrecarga de la CPU también puede elevar esta métrica<br>_Se muestra como nanosegundo_ |
| **cockroachdb.round_trip_latency.count** <br>(count) | Distribución de latencias de ida y vuelta con otros nodos. Solo refleja los latidos exitosos y mide la sobrecarga de gRPC, así como posibles bloqueos de cabecera. Los valores elevados de esta métrica pueden indicar problemas o saturación de la red, pero no son prueba de ello. La sobrecarga de la CPU también puede elevar esta métrica<br>_Se muestra como nanosegundo_ |
| **cockroachdb.round_trip_latency.sum** <br>(count) | Distribución de latencias de ida y vuelta con otros nodos. Solo refleja los latidos exitosos y mide la sobrecarga de gRPC, así como posibles bloqueos de cabecera. Los valores elevados de esta métrica pueden indicar problemas o saturación de la red, pero no son prueba de ello. La sobrecarga de la CPU también puede elevar esta métrica<br>_Se muestra como nanosegundo_ |
| **cockroachdb.rpc.batches.recv.count** <br>(count) | Número de lotes procesados|
| **cockroachdb.rpc.connection.avg_round_trip_latency** <br>(gauge) | Suma de la media móvil exponencialmente ponderada de las latencias de ida y vuelta, medidas a través de una RPC gRPC. Al dividir este indicador por rpc.connection.healthy se obtiene una aproximación de la latencia media, pero el histograma de latencias de ida y vuelta de nivel superior es más útil. En su lugar, los usuarios deberían consultar las familias de etiquetas de esta métrica si están disponibles.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.rpc.connection.failures.count** <br>(count) | Contador de conexiones fallidas. Esto incluye tanto el evento en el que una conexión saludable termina, como los intentos fallidos de reconexión. Se excluyen las conexiones que se terminan como parte del cierre de nodos locales. Se excluyen los pares dados de baja.|
| **cockroachdb.rpc.connection.healthy** <br>(gauge) | Medición de las conexiones actuales en un estado saludable (es decir, conectadas bidireccionalmente y latiendo)|
| **cockroachdb.rpc.connection.healthy_nanos** <br>(gauge) | Indicador de nanosegundos de tiempo de conexión saludable. En el endpoint de Prometheus con la configuración de clúster 'server.child_metrics.enabled', las partes constitutivas de esta métrica están disponibles por par y se puede leer el tiempo de conexión de un par concreto<br>_Se muestra como nanosegundo_. |
| **cockroachdb.rpc.connection.heartbeats.count** <br>(count) | Contador de latidos exitosos|
| **cockroachdb.rpc.connection.inactive** <br>(gauge) | Indicador de las conexiones actuales en estado inactivo y pendientes de eliminación. No son saludables, pero tampoco se rastrean como no saludables, ya que hay motivos para creer que la conexión ya no es relevante, por ejemplo, si desde entonces el nodo se ve con una nueva dirección.|
| **cockroachdb.rpc.connection.unhealthy** <br>(gauge) | Indicador de conexiones actuales en estado no saludable (no conectadas bidireccionalmente o latiendo)|
| **cockroachdb.rpc.connection (conexión).unhealthy_nanos** <br>(calibre) | Indicador de nanosegundos del tiempo de conexión no saludable. En el endpoint de Prometheus con la configuración de clúster 'server.child_metrics.enabled', las partes constitutivas de esta métrica están disponibles por par y se puede leer el tiempo que un par determinado ha permanecido inaccesible<br>_Se muestra como nanosegundo_ |
| **cockroachdb.rpc.method.addsstable.recv.count** <br>(count) | Número de solicitudes AddSSTable procesadas|
| **cockroachdb.rpc.method.adminchangereplicas.recv.count** <br>(count) | Número de solicitudes AdminChangeReplicas procesadas|
| **cockroachdb.rpc.method.adminmerge.recv.count** <br>(count) | Número de solicitudes AdminMerge procesadas|
| **cockroachdb.rpc.method.adminrelocaterange.recv.count** <br>(count) | Número de solicitudes AdminRelocateRange procesadas|
| **cockroachdb.rpc.method.adminscatter.recv.count** <br>(count) | Número de solicitudes AdminScatter procesadas|
| **cockroachdb.rpc.method.adminsplit.recv.count** <br>(count) | Número de solicitudes AdminSplit procesadas|
| **cockroachdb.rpc.method.admintransferlease.recv.count** <br>(count) | Número de solicitudes AdminTransferLease procesadas|
| **cockroachdb.rpc.method.adminunsplit.recv.count** <br>(count) | Número de solicitudes AdminUnsplit procesadas|
| **cockroachdb.rpc.method.adminverifyprotectedtimestamp.recv.count** <br>(count) | Número de solicitudes AdminVerifyProtectedTimestamp procesadas|
| **cockroachdb.rpc.method.barrier.recv.count** <br>(count) | Número de solicitudes Barrier procesadas|
| **cockroachdb.rpc.method.checkconsistency.recv.count** <br>(count) | Número de solicitudes CheckConsistency procesadas|
| **cockroachdb.rpc.method.clearrange.recv.count** <br>(count) | Número de solicitudes ClearRange procesadas|
| **cockroachdb.rpc.method.computechecksum.recv.count** <br>(count) | Número de solicitudes ComputeChecksum procesadas|
| **cockroachdb.rpc.method.conditionalput.recv.count** <br>(count) | Número de solicitudes ConditionalPut procesadas|
| **cockroachdb.rpc.method.delete.recv.count** <br>(count) | Número de solicitudes Delete procesadas|
| **cockroachdb.rpc.method.deleterange.recv.count** <br>(count) | Número de solicitudes DeleteRange procesadas|
| **cockroachdb.rpc.method.endtxn.recv.count** <br>(count) | Número de solicitudes EndTxn procesadas|
| **cockroachdb.rpc.method.export.recv.count** <br>(count) | Número de solicitudes Export procesadas|
| **cockroachdb.rpc.method.gc.recv.count** <br>(count) | Número de solicitudes GC procesadas|
| **cockroachdb.rpc.method.get.recv.count** <br>(count) | Número de solicitudes Get procesadas|
| **cockroachdb.rpc.method.heartbeattxn.recv.count** <br>(count) | Número de solicitudes HeartbeatTxn procesadas|
| **cockroachdb.rpc.method.increment.recv.count** <br>(count) | Número de solicitudes Increment procesadas|
| **cockroachdb.rpc.method.initput.recv.count** <br>(count) | Número de solicitudes InitPut procesadas|
| **cockroachdb.rpc.method.isspanempty.recv.count** <br>(count) | Número de solicitudes IsSpanEmpty procesadas|
| **cockroachdb.rpc.method.leaseinfo.recv.count** <br>(count) | Número de solicitudes LeaseInfo procesadas|
| **cockroachdb.rpc.method.merge.recv.count** <br>(count) | Número de solicitudes Merge procesadas|
| **cockroachdb.rpc.method.migrate.recv.count** <br>(count) | Número de solicitudes Migrate procesadas|
| **cockroachdb.rpc.method.probe.recv.count** <br>(count) | Número de solicitudes Probe procesadas|
| **cockroachdb.rpc.method.pushtxn.recv.count** <br>(count) | Número de solicitudes PushTxn procesadas|
| **cockroachdb.rpc.method.put.recv.count** <br>(count) | Número de solicitudes Put procesadas|
| **cockroachdb.rpc.method.queryintent.recv.count** <br>(count) | Número de solicitudes QueryIntent procesadas|
| **cockroachdb.rpc.method.querylocks.recv.count** <br>(count) | Número de solicitudes QueryLocks procesadas|
| **cockroachdb.rpc.method.queryresolvedtimestamp.recv.count** <br>(count) | Número de solicitudes QueryResolvedTimestamp procesadas|
| **cockroachdb.rpc.method.querytxn.recv.count** <br>(count) | Número de solicitudes QueryTxn procesadas|
| **cockroachdb.rpc.method.rangestats.recv.count** <br>(count) | Número de solicitudes RangeStats procesadas|
| **cockroachdb.rpc.method.recomputestats.recv.count** <br>(count) | Número de solicitudes RecomputeStats procesadas|
| **cockroachdb.rpc.method.recovertxn.recv.count** <br>(count) | Número de solicitudes RecoverTxn procesadas|
| **cockroachdb.rpc.method.refresh.recv.count** <br>(count) | Número de solicitudes Refresh tramitadas|
| **cockroachdb.rpc.method.refreshrange.recv.count** <br>(count) | Número de solicitudes RefreshRange procesadas|
| **cockroachdb.rpc.method.requestlease.recv.count** <br>(count) | Número de solicitudes RequestLease procesadas|
| **cockroachdb.rpc.method.resolveintent.recv.count** <br>(count) | Número de solicitudes ResolveIntent procesadas|
| **cockroachdb.rpc.method.resolveintentrange.recv.count** <br>(count) | Número de solicitudes ResolveIntentRange procesadas|
| **cockroachdb.rpc.method.reversescan.recv.count** <br>(count) | Número de solicitudes ReverseScan procesadas|
| **cockroachdb.rpc.method.revertrange.recv.count** <br>(count) | Número de solicitudes RevertRange procesadas|
| **cockroachdb.rpc.method.scan.recv.count** <br>(count) | Número de solicitudes Scan procesadas|
| **cockroachdb.rpc.method.subsume.recv.count** <br>(count) | Número de solicitudes Subsume procesadas|
| **cockroachdb.rpc.method.transferlease.recv.count** <br>(count) | Número de solicitudes TransferLease procesadas|
| **cockroachdb.rpc.method.truncatelog.recv.count** <br>(count) | Número de solicitudes TruncateLog procesadas|
| **cockroachdb.rpc.method.writebatch.recv.count** <br>(count) | Número de solicitudes WriteBatch procesadas|
| **cockroachdb.rpc.streams.mux_rangefeed.active** <br>(gauge) | Número de flujos MuxRangeFeed actualmente en ejecución|
| **cockroachdb.rpc.streams.mux_rangefeed.recv.count** <br>(count) | Número total de flujos MuxRangeFeed|
| **cockroachdb.rpc.streams.rangefeed.active** <br>(gauge) | Número de flujos RangeFeed que se están ejecutando actualmente|
| **cockroachdb.rpc.streams.rangefeed.recv.count** <br>(count) | Número total de flujos RangeFeed|
| **cockroachdb.schedules.BACKUP.failed.count** <br>(count) | Número de trabajos de BACKUP fallidos|
| **cockroachdb.schedules.BACKUP.last_completed_time** <br>(indicador) | Marca de tiempo Unix de la copia de seguridad más reciente realizada por un programa especificado para mantener esta métrica|
| **cockroachdb.schedules.BACKUP.protected_age_sec** <br>(gauge) | Antigüedad del registro PTS más antiguo protegido por programas de BACKUP<br>_Se muestra como segundo_ |
| **cockroachdb.schedules.BACKUP.protected_record_count** <br>(gauge) | Número de registros PTS mantenidos por programas de BACKUP|
| **cockroachdb.schedules.BACKUP.started.count** <br>(count) | Número de trabajos de BACKUP iniciados|
| **cockroachdb.schedules.BACKUP.succeeded.count** <br>(count) | Número de trabajos de BACKUP exitosos|
| **cockroachdb.schedules.CHANGEFEED.failed.count** <br>(count) | Número de trabajos de CHANGEFEED fallidos|
| **cockroachdb.schedules.CHANGEFEED.started.count** <br>(count) | Número de trabajos de CHANGEFEED iniciados|
| **cockroachdb.schedules.CHANGEFEED.succeeded.count** <br>(count) | Número de trabajos de CHANGEFEED exitosos|
| **cockroachdb.schedules.backup.failed** <br>(count) | \[OpenMetrics v1\] Número de copias de seguridad programadas fallidas|
| **cockroachdb.schedules.backup.failed.count** <br>(count) | \[OpenMetrics v2\] Número de copias de seguridad programadas fallidas|
| **cockroachdb.schedules.backup.last_completed_time** <br>(gauge) | \[OpenMetrics v1 y v2\] Marca de tiempo Unix de la copia de seguridad más reciente realizada por un programa especificado para mantener esta métrica<br>_Se muestra como segundo_ |
| **cockroachdb.schedules.backup.started** <br>(count) | \[OpenMetrics v1\] Número de trabajos de copia de seguridad programados iniciados|
| **cockroachdb.schedules.backup.started.count** <br>(count) | \[OpenMetrics v2\] Número de trabajos de copia de seguridad programados iniciados|
| **cockroachdb.schedules.backup.succeeded** <br>(count) | \[OpenMetrics v1\] Número de trabajos de copia de seguridad programados exitosos|
| **cockroachdb.schedules.backup.succeeded.count** <br>(count) | \[OpenMetrics v2\] Número de trabajos de copia de seguridad programados exitosos|
| **cockroachdb.schedules.error** <br>(gauge) | Número de programas que no se ejecutaron con éxito|
| **cockroachdb.schedules.malformed** <br>(gauge) | Número de programas malformados|
| **cockroachdb.schedules.round.jobs_started** <br>(gauge) | Número de trabajos iniciados|
| **cockroachdb.schedules.round.reschedule_skip** <br>(gauge) | Número de programas reprogramados debido a la política SKIP|
| **cockroachdb.schedules.round.reschedule_wait** <br>(gauge) | Número de programas reprogramados debido a la política WAIT|
| **cockroachdb.schedules.scheduled.row.level.ttl.executor_failed.count** <br>(count) | Número de trabajos row-level-ttl-executor programados fallidos|
| **cockroachdb.schedules.scheduled_row_level_ttl_executor.failed.count** <br>(count) | Número de trabajos row-level-ttl-executor programados fallidos|
| **cockroachdb.schedules.scheduled_row_level_ttl_executor.started.count** <br>(count) | Número de trabajos row-level-ttl-executor programados iniciados|
| **cockroachdb.schedules.scheduled_row_level_ttl_executor.succeeded.count** <br>(count) | Número de trabajos row-level-ttl-executor programados exitosos|
| **cockroachdb.schedules.scheduled_schema_telemetry_executor.failed.count** <br>(count) | Número de trabajos schema-telemetry-executor programados fallidos|
| **cockroachdb.schedules.scheduled_schema_telemetry_executor.started.count** <br>(count) | Número de trabajos schema-telemetry-executor programados iniciados|
| **cockroachdb.schedules.scheduled_schema_telemetry_executor.succeeded.count** <br>(count) | Número de trabajos schema-telemetry-executor programados exitosos|
| **cockroachdb.schedules.scheduled_sql_stats_compaction_executor.failed.count** <br>(count) | Número de trabajos sql-stats-compaction-executor fallidos|
| **cockroachdb.schedules.scheduled_sql_stats_compaction_executor.started.count** <br>(count) | Número de trabajos sql-stats-compaction-executor programados iniciados|
| **cockroachdb.schedules.scheduled_sql_stats_compaction_executor.succeeded.count** <br>(count) | Número de trabajos sql-stats-compaction-executor programados exitosos|
| **cockroachdb.seconds.until.enterprise.license.expiry** <br>(gauge) | Segundos hasta que caduque la licencia de empresa (0 si no hay licencia o se ejecuta sin funciones de empresa)|
| **cockroachdb.seconds_until_enterprise_license_expiry** <br>(gauge) | Segundos hasta que caduque la licencia de empresa (0 si no hay licencia o se ejecuta sin funciones de empresa)<br>_Se muestra como segundo_ |
| **cockroachdb.security.certificate.expiration.ca** <br>(gauge) | Caducidad del certificado de la CA. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate.expiration.ca_client_tenant** <br>(gauge) | Caducidad del certificado de la CA del cliente arrendatario. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate.expiration.client** <br>(gauge) | Caducidad mínima de los certificados del cliente, etiquetados por el usuario SQL. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate.expiration.client_ca** <br>(gauge) | Caducidad del certificado de la CA del cliente. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate.expiration.client_tenant** <br>(gauge) | Caducidad del certificado del cliente arrendatario. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate.expiration.node** <br>(gauge) | Caducidad del certificado del nodo. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate.expiration.node_client** <br>(gauge) | Caducidad del certificado de cliente del nodo. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate.expiration.ui** <br>(gauge) | Caducidad del certificado de la interfaz de usuario. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate.expiration.ui_ca** <br>(gauge) | Caducidad del certificado de la CA de la interfaz de usuario. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate_expiration.ca** <br>(gauge) | Caducidad del certificado de la CA. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate_expiration.client_ca** <br>(gauge) | Caducidad del certificado de la CA del cliente. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate_expiration.node** <br>(gauge) | Caducidad del certificado del nodo. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate_expiration.node_client** <br>(gauge) | Caducidad del certificado del cliente del nodo. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate_expiration.ui** <br>(gauge) | Caducidad del certificado de la interfaz de usuario. 0 significa que no hay certificado o error.|
| **cockroachdb.security.certificate_expiration.ui_ca** <br>(gauge) | Caducidad del certificado de la CA de la interfaz de usuario. 0 significa que no hay certificado o error.|
| **cockroachdb.spanconfig.kvsubscriber.oldest_protected_record_nanos** <br>(gauge) | Diferencia entre la hora actual y la marca de tiempo protegida más antigua (las caídas repentinas indican que se está liberando un registro y un número cada vez mayor indica que el registro más antiguo está cerca e impide GC si > el TTL de GC configurado)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.spanconfig.kvsubscriber.protected_record_count** <br>(gauge) | Número de registros de marca de tiempo protegidos, vistos por KV|
| **cockroachdb.spanconfig.kvsubscriber.update_behind_nanos** <br>(gauge) | Diferencia entre la hora actual y el momento en que el KVSubscriber recibió su última actualización (un número creciente indica que ya no estamos recibiendo actualizaciones)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.bytesin** <br>(count) | \[OpenMetrics v1\] Número de bytes SQL recibidos<br>_Se muestra como byte_ |
| **cockroachdb.sql.bytesin.count** <br>(count) | \[OpenMetrics v2\] Número de bytes SQL recibidos<br>_Se muestra como byte_ |
| **cockroachdb.sql.bytesout** <br>(count) | \[OpenMetrics v1\] Número de bytes SQL enviados<br>_Se muestra como byte_ |
| **cockroachdb.sql.bytesout.count** <br>(count) | \[OpenMetrics v2\] Número de bytes SQL enviados<br>_Se muestra como byte_ |
| **cockroachdb.sql.conn.failures.count** <br>(count) | Número de fallos de conexión SQL |
| **cockroachdb.sql.conn.latency** <br>(gauge) | \[OpenMetrics v1\] Latencia para establecer y autenticar una conexión SQL<br> _Se muestra como nanosegundo_ |
| **cockroachdb.sql.conn.latency.bucket** <br>(count) | \[OpenMetrics v2\] Latencia para establecer y autenticar una conexión SQL<br> _Se muestra como nanosegundo_ |
| **cockroachdb.sql.conn.latency.count** <br>(count) | \[OpenMetrics v2\] Latencia para establecer y autenticar una conexión SQL<br> _Se muestra como nanosegundo_ |
| **cockroachdb.sql.conn.latency.sum** <br>(count) | \[OpenMetrics v2\] Latencia para establecer y autenticar una conexión SQL<br> _Se muestra como nanosegundo_ |
| **cockroachdb.sql.conns** <br>(gauge) | \[OpenMetrics v1y v2\] Número de conexiones SQL activas<br>_Se muestra como conexión_ |
| **cockroachdb.sql.conns_waiting_to_hash** <br>(gauge) | Número de intentos de conexión SQL que se están restringiendo para limitar la concurrencia de hash de contraseñas|
| **cockroachdb.sql.contention.resolver.failed_resolutions.count** <br>(count) | Número de intentos fallidos de resolución de ID de transacción|
| **cockroachdb.sql.contention.resolver.queue_size** <br>(gauge) | Duración de los eventos de contención no resueltos en cola|
| **cockroachdb.sql.contention.resolver.retries.count** <br>(count) | Número de veces que se reintentó la resolución del ID de transacción|
| **cockroachdb.sql.contention.txn_id_cache.miss.count** <br>(count) | Número de fallos de caché|
| **cockroachdb.sql.contention.txn_id_cache.read.count** <br>(count) | Número de lecturas de caché|
| **cockroachdb.sql.copy.count** <br>(count) | Número de sentencias COPY SQL ejecutadas con éxito|
| **cockroachdb.sql.copy.internal.count** <br>(count) | Número de sentencias COPY SQL ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.copy.nonatomic.count** <br>(count) | Número de sentencias COPY SQL no atómicas ejecutadas con éxito|
| **cockroachdb.sql.copy.nonatomic.internal.count** <br>(count) | Número de sentencias SQL COPY no atómicas ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.copy.nonatomic.started.count** <br>(count) | Número de sentencias COPY SQL no atómicas iniciadas|
| **cockroachdb.sql.copy.nonatomic.started.internal.count** <br>(count) | Número de sentencias COPY SQL no atómicas iniciadas (consultas internas)|
| **cockroachdb.sql.copy.started.count** <br>(count) | Número de sentencias COPY SQL iniciadas|
| **cockroachdb.sql.copy.started.internal.count** <br>(count) | Número de sentencias COPY SQL iniciadas (consultas internas)|
| **cockroachdb.sql.ddl.count** <br>(count) | \[OpenMetrics v1 y v2\] Número de sentencias DDL SQL|
| **cockroachdb.sql.ddl.internal.count** <br>(count) | Número de sentencias DDL SQL ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.ddl.started.count** <br>(count) | Número de sentencias DDL SQL iniciadas|
| **cockroachdb.sql.ddl.started.internal.count** <br>(count) | Número de sentencias DDL SQL iniciadas (consultas internas)|
| **cockroachdb.sql.delete.count** <br>(count) | \[OpenMetrics v1 y v2\] Número de sentencias DELETE SQL|
| **cockroachdb.sql.delete.internal.count** <br>(count) | Número de sentencias DELETE SQL ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.delete.started.count** <br>(count) | Número de sentencias DELETE SQL iniciadas|
| **cockroachdb.sql.delete.started.internal.count** <br>(count) | Número de sentencias DELETE SQL iniciadas (consultas internas)|
| **cockroachdb.sql.disk.distsql.current** <br>(gauge) | Uso actual del disco de sentencias SQL para DistSQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.disk.distsql.max.bucket** <br>(count) | Uso de disco por sentencia SQL para DistSQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.disk.distsql.max.count** <br>(count) | Uso de disco por sentencia SQL para DistSQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.disk.distsql.max.sum** <br>(count) | Uso de disco por sentencia SQL para DistSQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.disk.distsql.spilled.bytes.read.count** <br>(count) | Número de bytes leídos del almacenamiento temporal en disco como resultado del desbordamiento<br>_Se muestra como byte_ |
| **cockroachdb.sql.disk.distsql.spilled.bytes.written.count** <br>(count) | Número de bytes escritos en el almacenamiento temporal en disco como resultado del desbordamiento<br>_Se muestra como byte_ |
| **cockroachdb.sql.distsql.contended.queries** <br>(count) | \[OpenMetrics v1\] Número de consultas SQL que experimentaron contención|
| **cockroachdb.sql.distsql.contended.queries.count** <br>(count) | \[OpenMetrics v2\] Número de consultas SQL que experimentaron contención|
| **cockroachdb.sql.distsql.contended_queries.count** <br>(count) | Número de consultas SQL que experimentaron contención|
| **cockroachdb.sql.distsql.dist_query_rerun_locally.count** <br>(count) | Número total de casos en los que un error de una consulta distribuida dio lugar a una nueva ejecución local|
| **cockroachdb.sql.distsql.dist_query_rerun_locally.failure_count.count** <br>(count) | Número total de casos en los que la nueva ejecución local de una consulta distribuida dio lugar a un error|
| **cockroachdb.sql.distsql.exec.latency** <br>(gauge) | \[OpenMetrics v1\] Latencia en nanosegundos de ejecución de sentencias DistSQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.exec.latency.bucket** <br>(count) | Latencia de ejecución de sentencias DistSQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.exec.latency.count** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de ejecución de sentencias DistSQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.exec.latency.internal.bucket** <br>(count) | Latencia de ejecución de sentencias DistSQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.exec.latency.internal.count** <br>(count) | Latencia de ejecución de sentencias DistSQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.exec.latency.internal.sum** <br>(count) | Latencia de ejecución de sentencias DistSQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.exec.latency.sum** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de ejecución de sentencias DistSQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.flows.active** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de flujos SQL distribuidos actualmente activos|
| **cockroachdb.sql.distsql.flows.count** <br>(count) | \[OpenMetrics v2\] Número de flujos SQL distribuidos ejecutados|
| **cockroachdb.sql.distsql.flows.total** <br>(count) | \[OpenMetrics v1\] Número de flujos SQL distribuidos ejecutados|
| **cockroachdb.sql.distsql.flows.total.count** <br>(count) | Número de flujos SQL distribuidos ejecutados|
| **cockroachdb.sql.distsql.queries.active** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de consultas SQL distribuidas actualmente activas|
| **cockroachdb.sql.distsql.queries.count** <br>(count) | \[OpenMetrics v2\] Número de consultas SQL distribuidas ejecutadas|
| **cockroachdb.sql.distsql.queries.spilled.count** <br>(count) | Número de consultas que se desbordaron al disco|
| **cockroachdb.sql.distsql.queries.total** <br>(count) | \[OpenMetrics v1\] Número de consultas SQL distribuidas ejecutadas|
| **cockroachdb.sql.distsql.select.count** <br>(count) | \[OpenMetrics v1 y v2\] Número de sentencias SELECT DistSQL|
| **cockroachdb.sql.distsql.select.internal.count** <br>(count) | Número de sentencias SELECT DistSQL (consultas internas)|
| **cockroachdb.sql.distsql.service.latency** <br>(gauge) | \[OpenMetrics v1\] Latencia en nanosegundos de ejecución de solicitudes DistSQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.service.latency.bucket** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de ejecución de solicitudes DistSQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.service.latency.count** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de ejecución de solicitudes DistSQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.service.latency.internal** <br>(count) | Latencia de ejecución de solicitudes DistSQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.service.latency.internal.bucket** <br>(count) | Latencia de ejecución de solicitudes DistSQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.service.latency.internal.count** <br>(count) | Latencia de ejecución de solicitudes DistSQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.service.latency.internal.sum** <br>(count) | Latencia de ejecución de solicitudes DistSQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.service.latency.sum** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de ejecución de solicitudes DistSQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.distsql.vec.openfds** <br>(gauge) | Número actual de descriptores de archivos abiertos utilizados por el almacenamiento externo vectorizado|
| **cockroachdb.sql.exec.latency** <br>(gauge) | \[OpenMetrics v1\] Latencia en nanosegundos de ejecución de sentencias SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.exec.latency.bucket** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de ejecución de sentencias SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.exec.latency.count** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de ejecución de sentencias SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.exec.latency.internal** <br>(count) | Latencia de ejecución de sentencias SQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.exec.latency.internal.bucket** <br>(count) | Latencia de ejecución de sentencias SQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.exec.latency.internal.count** <br>(count) | Latencia de ejecución de sentencias SQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.exec.latency.internal.sum** <br>(count) | Latencia de ejecución de sentencias SQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.exec.latency.sum** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de ejecución de sentencias SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.failure** <br>(count) | \[OpenMetrics v1\] Número de sentencias que dan lugar a un error de planificación o de tiempo de ejecución|
| **cockroachdb.sql.failure.count** <br>(count) | \[OpenMetrics v2\] Número de sentencias que dan lugar a un error de planificación o de tiempo de ejecución|
| **cockroachdb.sql.failure.internal.count** <br>(count) | Número de sentencias que dan lugar a un error de planificación o de tiempo de ejecución (consultas internas)|
| **cockroachdb.sql.feature_flag_denial.count** <br>(count) | Contador del número de sentencias denegadas por un indicador de características|
| **cockroachdb.sql.full.scan** <br>(count) | \[OpenMetrics v1\] Número de análisis completos de tablas o índices|
| **cockroachdb.sql.full.scan.count** <br>(count) | \[OpenMetrics v2\] Número de análisis completos de tablas o índices|
| **cockroachdb.sql.full.scan.internal.count** <br>(count) | Número de análisis completos de tablas o índices (consultas internas)|
| **cockroachdb.sql.guardrails.full_scan_rejected.count** <br>(count) | Número de análisis completos de tablas o índices rechazados debido a guardarrails `disallow_full_table_scans`|
| **cockroachdb.sql.guardrails.full_scan_rejected.internal.count** <br>(count) | Número de análisis completos de tablas o índices rechazados debido a guardarrails `disallow_full_table_scans` (consultas internas)|
| **cockroachdb.sql.guardrails.max_row_size_err.count** <br>(count) | Número de filas observadas que violan sql.guardrails.max_row_size_err|
| **cockroachdb.sql.guardrails.max_row_size_err.internal.count** <br>(count) | Número de filas observadas que violan sql.guardrails.max_row_size_err (consultas internas)|
| **cockroachdb.sql.guardrails.max_row_size_log.count** <br>(count) | Número de filas observadas que violan sql.guardrails.max_row_size_log|
| **cockroachdb.sql.guardrails.max_row_size_log.internal.count** <br>(count) | Número de filas observadas que violan sql.guardrails.max_row_size_log (consultas internas)|
| **cockroachdb.sql.guardrails.transaction_rows_read_err.count** <br>(count) | Número de transacciones con error debido a guardarrails transaction_rows_read_err|
| **cockroachdb.sql.guardrails.transaction_rows_read_err.internal.count** <br>(count) | Número de transacciones con error debido a guardarrails transaction_rows_read_err (consultas internas)|
| **cockroachdb.sql.guardrails.transaction_rows_read_log.count** <br>(count) | Número de transacciones registradas debido a guardarrails transaction_rows_read_log|
| **cockroachdb.sql.guardrails.transaction_rows_read_log.internal.count** <br>(count) | Número de transacciones registradas debido a guardarrails transaction_rows_read_log (consultas internas)|
| **cockroachdb.sql.guardrails.transaction_rows_written_err.count** <br>(count) | Número de transacciones con error debido a guardarrails transaction_rows_written_err|
| **cockroachdb.sql.guardrails.transaction_rows_written_err.internal.count** <br>(count) | Número de transacciones con error debido a guardarrails transaction_rows_written_err (consultas internas)|
| **cockroachdb.sql.guardrails.transaction_rows_written_log.count** <br>(count) | Número de transacciones registradas debido a guardarrails transaction_rows_written_log|
| **cockroachdb.sql.guardrails.transaction_rows_written_log.internal.count** <br>(count) | Número de transacciones registradas debido a guardarrails transaction_rows_written_log (consultas internas)|
| **cockroachdb.sql.hydrated_schema_cache.hits.count** <br>(count) | Contador del número de aciertos de caché|
| **cockroachdb.sql.hydrated_schema_cache.misses.count** <br>(count) | Contador del número de fallos de caché|
| **cockroachdb.sql.hydrated_table_cache.hits.count** <br>(count) | Contador del número de aciertos de caché|
| **cockroachdb.sql.hydrated_table_cache.misses.count** <br>(count) | Contador del número de fallos de caché|
| **cockroachdb.sql.hydrated_type_cache.hits.count** <br>(count) | Contador del número de aciertos de caché|
| **cockroachdb.sql.hydrated_type_cache.misses.count** <br>(count) | Contador del número de fallos de caché|
| **cockroachdb.sql.hydrated_udf_cache.hits.count** <br>(count) | Contador del número de aciertos de caché|
| **cockroachdb.sql.hydrated_udf_cache.misses.count** <br>(count) | Contador del número de fallos de caché|
| **cockroachdb.sql.insert.count** <br>(count) | \[OpenMetrics v1 y v2\] Número de sentencias INSERT SQL|
| **cockroachdb.sql.insert.internal.count** <br>(count) | Número de sentencias INSERT SQL ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.insert.started.count** <br>(count) | Número de sentencias INSERT SQL iniciadas|
| **cockroachdb.sql.insert.started.internal.count** <br>(count) | Número de sentencias INSERT SQL iniciadas (consultas internas)|
| **cockroachdb.sql.insights.anomaly_detection.evictions.count** <br>(count) | Desalojos de resúmenes de latencia de huellas digitales debido a la presión de la memoria|
| **cockroachdb.sql.insights.anomaly_detection.fingerprints** <br>(gauge) | Número actual de huellas digitales de sentencias que se están monitorizando para detectar anomalías|
| **cockroachdb.sql.insights.anomaly_detection.memory** <br>(gauge) | Memoria actual utilizada para soportar la detección de anomalías<br>_Se muestra como byte_ |
| **cockroachdb.sql.leases.active** <br>(gauge) | Número de arrendamientos de esquemas SQL destacados|
| **cockroachdb.sql.mem.admin.current** <br>(gauge) | \[OpenMetrics v1 y v2\] Uso actual de la memoria por sentencias SQL para administradores|
| **cockroachdb.sql.mem.admin.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada sentencia SQL para administradores|
| **cockroachdb.sql.mem.admin.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para administradores|
| **cockroachdb.sql.mem.admin.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para administradores|
| **cockroachdb.sql.mem.admin.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para administradores|
| **cockroachdb.sql.mem.admin.session.current** <br>(gauge) | \[OpenMetrics v1 y v2\] Uso actual de la memoria por sesiones SQL para administradores|
| **cockroachdb.sql.mem.admin.session.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para administradores|
| **cockroachdb.sql.mem.admin.session.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para administradores|
| **cockroachdb.sql.mem.admin.session.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para administradores|
| **cockroachdb.sql.mem.admin.txn.current** <br>(gauge) | \[OpenMetrics v1 y v2\] Uso actual de la memoria por transacciones SQL para administradores|
| **cockroachdb.sql.mem.admin.txn.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada transacción SQL para administradores|
| **cockroachdb.sql.mem.admin.txn.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para administradores|
| **cockroachdb.sql.mem.admin.txn.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para administradores|
| **cockroachdb.sql.mem.admin.txn.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para administradores|
| **cockroachdb.sql.mem.bulk.current** <br>(gauge) | Uso actual de la memoria por sentencias SQL para operaciones en bloque<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.bulk.max** <br>(count) | Uso de la memoria por cada sentencia SQL para operaciones en bloque<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.bulk.max.bucket** <br>(count) | Uso de la memoria por cada sentencia SQL para operaciones en bloque<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.bulk.max.count** <br>(count) | Uso de la memoria por cada sentencia SQL para operaciones en bloque<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.bulk.max.sum** <br>(count) | Uso de la memoria por cada sentencia SQL para operaciones en bloque<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.client.current** <br>(gauge) | \[OpenMetrics v1 y v2] Uso actual de la memoria por sentencias SQL para clientes|
| **cockroachdb.sql.mem.client.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada sentencia SQL para clientes|
| **cockroachdb.sql.mem.client.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para clientes|
| **cockroachdb.sql.mem.client.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para clientes|
| **cockroachdb.sql.mem.client.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para clientes|
| **cockroachdb.sql.mem.client.session.current** <br>(gauge) | \[OpenMetrics v1 y v2\] Uso actual de la memoria por sesiones SQL para clientes|
| **cockroachdb.sql.mem.client.session.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada sesión SQL para clientes|
| **cockroachdb.sql.mem.client.session.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para clientes|
| **cockroachdb.sql.mem.client.session.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para clientes|
| **cockroachdb.sql.mem.client.session.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para clientes|
| **cockroachdb.sql.mem.client.txn.current** <br>(gauge) | \[OpenMetrics v1 y v2] Uso actual de la memoria por transacciones SQL para clientes|
| **cockroachdb.sql.mem.client.txn.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada transacción SQL para clientes|
| **cockroachdb.sql.mem.client.txn.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para clientes|
| **cockroachdb.sql.mem.client.txn.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para clientes|
| **cockroachdb.sql.mem.client.txn.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para clientes|
| **cockroachdb.sql.mem.conns.current** <br>(gauge) | \[OpenMetrics v1 y v2] Uso actual de la memoria por sentencias SQL para conexiones|
| **cockroachdb.sql.mem.conns.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada sentencia SQL para conexiones|
| **cockroachdb.sql.mem.conns.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para conexiones|
| **cockroachdb.sql.mem.conns.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para conexiones|
| **cockroachdb.sql.mem.conns.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para conexiones|
| **cockroachdb.sql.mem.conns.session.current** <br>(gauge) | \[OpenMetrics v1 y v2\] Uso actual de la memoria por sesiones SQL para conexiones|
| **cockroachdb.sql.mem.conns.session.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada sesión SQL para conexiones|
| **cockroachdb.sql.mem.conns.session.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para conexiones|
| **cockroachdb.sql.mem.conns.session.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para conexiones|
| **cockroachdb.sql.mem.conns.session.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para conexiones|
| **cockroachdb.sql.mem.conns.txn.current** <br>(gauge) | \[OpenMetrics v1 y v2] Uso actual de la memoria por transacciones SQL para conexiones|
| **cockroachdb.sql.mem.conns.txn.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada transacción SQL para conexiones|
| **cockroachdb.sql.mem.conns.txn.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para conexiones|
| **cockroachdb.sql.mem.conns.txn.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para conexiones|
| **cockroachdb.sql.mem.conns.txn.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para conexiones|
| **cockroachdb.sql.mem.distsql.current** <br>(gauge) | \[OpenMetrics v1 y v2] Uso actual de la memoria por sentencias SQL para DistSQL|
| **cockroachdb.sql.mem.distsql.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada sentencia SQL para DistSQL|
| **cockroachdb.sql.mem.distsql.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para DistSQL|
| **cockroachdb.sql.mem.distsql.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para DistSQL|
| **cockroachdb.sql.mem.distsql.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para DistSQL|
| **cockroachdb.sql.mem.internal.current** <br>(gauge) | \[OpenMetrics v1 y v2] Uso actual de la memoria por sentencias SQL para internos|
| **cockroachdb.sql.mem.internal.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada sentencia SQL para internos|
| **cockroachdb.sql.mem.internal.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para internos|
| **cockroachdb.sql.mem.internal.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para internos|
| **cockroachdb.sql.mem.internal.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sentencia SQL para internos|
| **cockroachdb.sql.mem.internal.session.current** <br>(gauge) | \[OpenMetrics v1 y v2\] Uso actual de la memoria por sesiones SQL para internos|
| **cockroachdb.sql.mem.internal.session.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada sesión SQL para internos|
| **cockroachdb.sql.mem.internal.session.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para internos|
| **cockroachdb.sql.mem.internal.session.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para internos|
| **cockroachdb.sql.mem.internal.session.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada sesión SQL para internos|
| **cockroachdb.sql.mem.internal.session.prepared.current** <br>(gauge) | Uso actual de la memoria por sesiones SQL por parte de sentencias preparadas para internos<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.internal.session.prepared.max.bucket** <br>(count) | Uso de la memoria por sentencias preparadas por parte de sesiones SQL para internos<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.internal.session.prepared.max.count** <br>(count) | Uso de la memoria por sentencias preparadas por parte de sesiones SQL para internos<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.internal.session.prepared.max.sum** <br>(count) | Uso de la memoria por sentencias preparadas por parte de sesiones SQL para internos<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.internal.txn.current** <br>(gauge) | \[OpenMetrics v1 y v2] Uso actual de la memoria por transacciones SQL para internos|
| **cockroachdb.sql.mem.internal.txn.max** <br>(gauge) | \[OpenMetrics v1\] Uso de la memoria por cada transacción SQL para internos|
| **cockroachdb.sql.mem.internal.txn.max.bucket** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para internos|
| **cockroachdb.sql.mem.internal.txn.max.count** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para internos|
| **cockroachdb.sql.mem.internal.txn.max.sum** <br>(count) | \[OpenMetrics v2\] Uso de la memoria por cada transacción SQL para internos|
| **cockroachdb.sql.mem.root.current** <br>(gauge) | Uso actual de la memoria por sentencias SQL para root|
| **cockroachdb.sql.mem.root.max.bucket** <br>(count) | Uso de la memoria por cada sentencia SQL para root<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.root.max.count** <br>(count) | Uso de la memoria por cada sentencia SQL para root<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.root.max.sum** <br>(count) | Uso de la memoria por cada sentencia SQL para root<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.current** <br>(gauge) | Uso actual de la memoria por sentencias SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.max** <br>(count) | Uso de la memoria por cada sentencia SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.max.bucket** <br>(count) | Uso de la memoria por cada sentencia SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.max.count** <br>(count) | Uso de la memoria por cada sentencia SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.max.sum** <br>(count) | Uso de la memoria por cada sentencia SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.session.current** <br>(gauge) | Uso actual de la memoria por sesiones SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.session.max** <br>(count) | Uso de la memoria por cada sentencia SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.session.max.bucket** <br>(count) | Uso de la memoria por cada sentencia SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.session.max.count** <br>(count) | Uso de la memoria por cada sentencia SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.session.max.sum** <br>(count) | Uso de la memoria por cada sentencia SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.session.prepared.current** <br>(gauge) | Uso actual de la memoria por sesiones SQL por parte de sentencias preparadas para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.session.prepared.max** <br>(count) | Uso de la memoria por sentencias preparadas por parte de sesiones SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.session.prepared.max.bucket** <br>(count) | Uso de la memoria por sentencias preparadas por parte de sesiones SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.session.prepared.max.count** <br>(count) | Uso de la memoria por sentencias preparadas por parte de sesiones SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.session.prepared.max.sum** <br>(count) | Uso de la memoria por sentencias preparadas por parte de sesiones SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.txn.current** <br>(gauge) | Uso actual de la memoria por transacciones SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.txn.max** <br>(count) | Uso de la memoria por cada transacción SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.txn.max.bucket** <br>(count) | Uso de la memoria por cada transacción SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.txn.max.count** <br>(count) | Uso de la memoria por cada transacción SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.mem.sql.txn.max.sum** <br>(count) | Uso de la memoria por cada transacción SQL para SQL<br>_Se muestra como byte_ |
| **cockroachdb.sql.misc.count** <br>(count) | \[OpenMetrics v1 y v2\] Número de otras sentencias SQL|
| **cockroachdb.sql.misc.internal.count** <br>(count) | Número de otras sentencias SQL ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.misc.started.count** <br>(count) | Número de otras sentencias SQL iniciadas|
| **cockroachdb.sql.misc.started.internal.count** <br>(count) | Número de otras sentencias SQL iniciadas (consultas internas)|
| **cockroachdb.sql.new_conns.count** <br>(count) | Contador del número de conexiones SQL creadas|
| **cockroachdb.sql.optimizer.fallback.count** <br>(count) | Número de sentencias que el optimizador basado en costes no pudo planificar|
| **cockroachdb.sql.optimizer.fallback.internal.count** <br>(count) | Número de sentencias que el optimizador basado en costes no pudo planificar (consultas internas)|
| **cockroachdb.sql.optimizer.plan_cache.hits.count** <br>(count) | Número de sentencias no preparadas para las que se utilizó un plan en caché|
| **cockroachdb.sql.optimizer.plan_cache.hits.internal.count** <br>(count) | Número de sentencias no preparadas para las que se utilizó un plan en caché (consultas internas)|
| **cockroachdb.sql.optimizer.plan_cache.misses.count** <br>(count) | Número de sentencias no preparadas para las que no se utilizó un plan en caché|
| **cockroachdb.sql.optimizer.plan_cache.misses.internal.count** <br>(count) | Número de sentencias no preparadas para las que no se utilizó un plan en caché (consultas internas)|
| **cockroachdb.sql.pgwire_cancel.count** <br>(count) | Número de solicitudes de anulación de consultas pgwire|
| **cockroachdb.sql.pgwire_cancel.ignored.count** <br>(count) | Número de solicitudes de cancelación de consultas pgwire ignoradas debido a la limitación de velocidad|
| **cockroachdb.sql.pgwire_cancel.successful.count** <br>(count) | Número de solicitudes de cancelación de consultas pgwire exitosas|
| **cockroachdb.sql.pre_serve.bytesin.count** <br>(count) | Número de bytes SQL recibidos antes de enrutar la conexión al servidor SQL de destino<br>_Se muestra como byte_ |
| **cockroachdb.sql.pre_serve.bytesout.count** <br>(count) | Número de bytes SQL enviados antes de enrutar la conexión al servidor SQL de destino<br>_Se muestra como byte_ |
| **cockroachdb.sql.pre_serve.conn.failures.count** <br>(count) | Número de fallos de conexión SQL antes de enrutar la conexión al servidor SQL de destino|
| **cockroachdb.sql.pre_serve.mem.cur** <br>(gauge) | Uso actual de la memoria por conexiones SQL antes de enrutar la conexión al servidor SQL de destino<br>_Se muestra como byte_ |
| **cockroachdb.sql.pre_serve.mem.max** <br>(count) | Uso actual de la memoria por conexiones SQL antes de enrutar la conexión al servidor SQL de destino<br>_Se muestra como byte_ |
| **cockroachdb.sql.pre_serve.mem.max.bucket** <br>(count) | Uso actual de la memoria por conexiones SQL antes de enrutar la conexión al servidor SQL de destino<br>_Se muestra como byte_ |
| **cockroachdb.sql.pre_serve.mem.max.count** <br>(count) | Uso actual de la memoria por conexiones SQL antes de enrutar la conexión al servidor SQL de destino<br>_Se muestra como byte_ |
| **cockroachdb.sql.pre_serve.mem.max.sum** <br>(count) | Uso actual de la memoria por conexiones SQL antes de enrutar la conexión al servidor SQL de destino<br>_Se muestra como byte_ |
| **cockroachdb.sql.pre_serve.new_conns.count** <br>(count) | Número de conexiones SQL creadas antes de enrutar la conexión al servidor SQL de destino|
| **cockroachdb.sql.query.count** <br>(count) | \[OpenMetrics v1 y v2\] Número de consultas SQL|
| **cockroachdb.sql.query.internal.count** <br>(count) | Número de consultas SQL ejecutadas (consultas internas)|
| **cockroachdb.sql.query.started.count** <br>(count) | Número de consultas SQL iniciadas|
| **cockroachdb.sql.query.started.internal.count** <br>(count) | Número de consultas SQL iniciadas (consultas internas)|
| **cockroachdb.sql.restart_savepoint.count** <br>(count) | Número de sentencias `SAVEPOINT cockroach_restart` ejecutadas correctamente|
| **cockroachdb.sql.restart_savepoint.internal.count** <br>(count) | Número de sentencias `SAVEPOINT cockroach_restart` ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.restart_savepoint.release.count** <br>(count) | Número de sentencias `RELEASE SAVEPOINT cockroach_restart` ejecutadas correctamente|
| **cockroachdb.sql.restart_savepoint.release.internal.count** <br>(count) | Número de sentencias `RELEASE SAVEPOINT cockroach_restart` ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.restart_savepoint.release.started.count** <br>(count) | Número de sentencias `RELEASE SAVEPOINT cockroach_restart` iniciadas|
| **cockroachdb.sql.restart_savepoint.release.started.internal.count** <br>(count) | Número de sentencias `RELEASE SAVEPOINT cockroach_restart` iniciadas (consultas internas)|
| **cockroachdb.sql.restart_savepoint.rollback.count** <br>(count) | Número de sentencias `ROLLBACK TO SAVEPOINT cockroach_restart` ejecutadas con éxito|
| **cockroachdb.sql.restart_savepoint.rollback.internal.count** <br>(count) | Número de sentencias `ROLLBACK TO SAVEPOINT cockroach_restart` ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.restart_savepoint.rollback.started.count** <br>(count) | Número de sentencias `ROLLBACK TO SAVEPOINT cockroach_restart` iniciadas|
| **cockroachdb.sql.restart_savepoint.rollback.started.internal.count** <br>(count) | Número de sentencias `ROLLBACK TO SAVEPOINT cockroach_restart` iniciadas (consultas internas)|
| **cockroachdb.sql.restart_savepoint.started.count** <br>(count) | Número de sentencias `SAVEPOINT cockroach_restart` iniciadas|
| **cockroachdb.sql.restart_savepoint.started.internal.count** <br>(count) | Número de sentencias `SAVEPOINT cockroach_restart` iniciadas (consultas internas)|
| **cockroachdb.sql.savepoint.count** <br>(count) | Número de sentencias SAVEPOINT SQL ejecutadas con éxito|
| **cockroachdb.sql.savepoint.internal.count** <br>(count) | Número de sentencias SAVEPOINT SQL ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.savepoint.release.count** <br>(count) | Número de sentencias `RELEASE SAVEPOINT` ejecutadas con éxito|
| **cockroachdb.sql.savepoint.release.internal.count** <br>(count) | Número de sentencias `RELEASE SAVEPOINT` ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.savepoint.release.started.count** <br>(count) | Número de sentencias `RELEASE SAVEPOINT` iniciadas|
| **cockroachdb.sql.savepoint.release.started.internal.count** <br>(count) | Número de sentencias `RELEASE SAVEPOINT` iniciadas (consultas internas)|
| **cockroachdb.sql.savepoint.rollback.count** <br>(count) | Número de sentencias `ROLLBACK TO SAVEPOINT` ejecutadas con éxito|
| **cockroachdb.sql.savepoint.rollback.internal.count** <br>(count) | Número de sentencias `ROLLBACK TO SAVEPOINT` ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.savepoint.rollback.started.count** <br>(count) | Número de sentencias `ROLLBACK TO SAVEPOINT` iniciadas|
| **cockroachdb.sql.savepoint.rollback.started.internal.count** <br>(count) | Número de sentencias `ROLLBACK TO SAVEPOINT` iniciadas (consultas internas)|
| **cockroachdb.sql.savepoint.started.count** <br>(count) | Número de sentencias SAVEPOINT SQL iniciadas|
| **cockroachdb.sql.savepoint.started.internal.count** <br>(count) | Número de sentencias SAVEPOINT SQL iniciadas (consultas internas)|
| **cockroachdb.sql.schema.invalid_objects** <br>(gauge) | Indicador de objetos no válidos detectados en la tabla system.descriptor (medido mediante consulta a crdb_internal.invalid_objects)|
| **cockroachdb.sql.schema_changer.permanent_errors.count** <br>(count) | Contador del número de errores permanentes experimentados por el modificador de esquemas|
| **cockroachdb.sql.schema_changer.retry_errors.count** <br>(count) | Contador del número de errores reintentables experimentados por el modificador de esquemas|
| **cockroachdb.sql.schema_changer.running** <br>(gauge) | Indicador de los cambios de esquemas que se están ejecutando actualmente|
| **cockroachdb.sql.schema_changer.successes.count** <br>(count) | Contador del número de reanudaciones exitosas del modificador de esquemas|
| **cockroachdb.sql.select.count** <br>(count) | \[OpenMetrics v1 y v2\] Número de sentencias SELECT SQL|
| **cockroachdb.sql.select.internal.count** <br>(count) | Número de sentencias SELECT SQL ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.select.started.count** <br>(count) | Número de sentencias SELECT SQL iniciadas|
| **cockroachdb.sql.select.started.internal.count** <br>(count) | Número de sentencias SELECT SQL iniciadas (consultas internas)|
| **cockroachdb.sql.service.latency** <br>(gauge) | \[OpenMetrics v1\] Latencia en nanosegundos de ejecución de solicitudes SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.service.latency.bucket** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de ejecución de solicitudes SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.service.latency.count** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de ejecución de solicitudes SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.service.latency.internal** <br>(count) | Latencia de ejecución de solicitudes SQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.service.latency.internal.bucket** <br>(count) | Latencia de ejecución de solicitudes SQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.service.latency.internal.count** <br>(count) | Latencia de ejecución de solicitudes SQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.service.latency.internal.sum** <br>(count) | Latencia de ejecución de solicitudes SQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.service.latency.sum** <br>(count) | \[OpenMetrics v2\] Latencia en nanosegundos de ejecución de solicitudes SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.statements.active** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de sentencias SQL de usuario actualmente activas|
| **cockroachdb.sql.statements.active.internal** <br>(gauge) | Número de sentencias SQL de usuario actualmente activas (consultas internas)|
| **cockroachdb.sql.stats.cleanup.rows_removed.count** <br>(count) | Número de filas de estadísticas obsoletas que se eliminan|
| **cockroachdb.sql.stats.discarded.current.count** <br>(count) | Número de estadísticas de huellas digitales descartadas|
| **cockroachdb.sql.stats.flush.count** <br>(count) | Número de veces que las estadísticas SQL se descargan en el almacenamiento persistente|
| **cockroachdb.sql.stats.flush.duration** <br>(count) | Tiempo en nanosegundos dedicado a completar la descarga de estadísticas SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.stats.flush.duration.bucket** <br>(count) | Tiempo en nanosegundos dedicado a completar la descarga de estadísticas SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.stats.flush.duration.count** <br>(count) | Tiempo en nanosegundos dedicado a completar la descarga de estadísticas SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.stats.flush.duration.sum** <br>(count) | Tiempo en nanosegundos dedicado a completar la descarga de estadísticas SQL<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.stats.flush.error.count** <br>(count) | Número de errores encontrados al descargar estadísticas SQL|
| **cockroachdb.sql.stats.mem.current** <br>(gauge) | Uso actual de la memoria para el almacenamiento de huellas digitales<br>_Se muestra como byte_ |
| **cockroachdb.sql.stats.mem.max** <br>(count) | Uso de la memoria para el almacenamiento de huellas digitales<br>_Se muestra como byte_ |
| **cockroachdb.sql.stats.mem.max.bucket** <br>(count) | Uso de la memoria para el almacenamiento de huellas digitales<br>_Se muestra como byte_ |
| **cockroachdb.sql.stats.mem.max.count** <br>(count) | Uso de la memoria para el almacenamiento de huellas digitales<br>_Se muestra como byte_ |
| **cockroachdb.sql.stats.mem.max.sum** <br>(count) | Uso de la memoria para el almacenamiento de huellas digitales<br>_Se muestra como byte_ |
| **cockroachdb.sql.stats.reported.mem.current** <br>(gauge) | Uso actual de la memoria para el almacenamiento de huellas digitales informadas<br>_Se muestra como byte_ |
| **cockroachdb.sql.stats.reported.mem.max** <br>(count) | Uso de la memoria para el almacenamiento de huellas digitales informadas<br>_Se muestra como byte_ |
| **cockroachdb.sql.stats.reported.mem.max.bucket** <br>(count) | Uso de la memoria para el almacenamiento de huellas digitales informadas<br>_Se muestra como byte_ |
| **cockroachdb.sql.stats.reported.mem.max.count** <br>(count) | Uso de la memoria para el almacenamiento de huellas digitales informadas<br>_Se muestra como byte_ |
| **cockroachdb.sql.stats.reported.mem.max.sum** <br>(count) | Uso de la memoria para el almacenamiento de huellas digitales informadas<br>_Se muestra como byte_ |
| **cockroachdb.sql.stats.txn_stats_collection.duration** <br>(count) | Tiempo en nanosegundos dedicado a recopilar estadísticas de transacciones<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.stats.txn_stats_collection.duration.bucket** <br>(count) | Tiempo en nanosegundos dedicado a recopilar estadísticas de transacciones<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.stats.txn_stats_collection.duration.count** <br>(count) | Tiempo en nanosegundos dedicado a recopilar estadísticas de transacciones<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.stats.txn_stats_collection.duration.sum** <br>(count) | Tiempo en nanosegundos dedicado a recopilar estadísticas de transacciones<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.temp_object_cleaner.active_cleaners** <br>(gauge) | Número de tareas de limpieza que se están ejecutando actualmente en este nodo|
| **cockroachdb.sql.temp_object_cleaner.schemas_deletion_error.count** <br>(count) | Número de eliminaciones de esquemas fallidos por el limpiador de objetos temporales en este nodo|
| **cockroachdb.sql.temp_object_cleaner.schemas_deletion_success.count** <br>(count) | Número de eliminaciones exitosas de esquemas por parte del limpiador de objetos temporales en este nodo|
| **cockroachdb.sql.temp_object_cleaner.schemas_to_delete.count** <br>(count) | Número de esquemas a eliminar por el limpiador de objetos temporales en este nodo|
| **cockroachdb.sql.txn.abort.count** <br>(count) | \[OpenMetrics v1 y v2\] Número de sentencias ABORT de transacciones SQL|
| **cockroachdb.sql.txn.abort.internal.count** <br>(count) | Número de errores de interrupción de transacciones SQL (consultas internas)|
| **cockroachdb.sql.txn.begin.count** <br>(count) | \[OpenMetrics v1 y v2\] Número de sentencias BEGIN de transacciones SQL|
| **cockroachdb.sql.txn.begin.internal.count** <br>(count) | Número de sentencias BEGIN de transacciones SQL ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.txn.begin.started.count** <br>(count) | Número de sentencias BEGIN de transacciones SQL iniciadas|
| **cockroachdb.sql.txn.begin.started.internal.count** <br>(count) | Número de sentencias BEGIN de transacciones SQL iniciadas (consultas internas)|
| **cockroachdb.sql.txn.commit.count** <br>(count) | \[OpenMetrics v1 y v2\] Número de sentencias COMMIT de transacciones SQL|
| **cockroachdb.sql.txn.commit.internal.count** <br>(count) | Número de sentencias COMMIT de transacciones SQL ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.txn.commit.started.count** <br>(count) | Número de sentencias COMMIT de transacciones SQL iniciadas|
| **cockroachdb.sql.txn.commit.started.internal.count** <br>(count) | Número de sentencias COMMIT de transacciones SQL iniciadas (consultas internas)|
| **cockroachdb.sql.txn.contended.count** <br>(count) | Número de transacciones SQL que experimentaron contención|
| **cockroachdb.sql.txn.contended.internal.count** <br>(count) | Número de transacciones SQL que experimentaron contención (consultas internas)|
| **cockroachdb.sql.txn.latency** <br>(gauge) | \[OpenMetrics v1\] Latencia de las transacciones SQL<br>_Se muestra como transacción_ |
| **cockroachdb.sql.txn.latency.bucket** <br>(count) | \[OpenMetrics v2\] Latencia de las transacciones SQL<br>_Se muestra como transacción_ |
| **cockroachdb.sql.txn.latency.count** <br>(count) | \[OpenMetrics v2\] Latencia de las transacciones SQL<br>_Se muestra como transacción_ |
| **cockroachdb.sql.txn.latency.internal.bucket** <br>(count) | Latencia de las transacciones SQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.txn.latency.internal.count** <br>(count) | Latencia de las transacciones SQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.txn.latency.internal.sum** <br>(count) | Latencia de las transacciones SQL (consultas internas)<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sql.txn.latency.sum** <br>(count) | \[OpenMetrics v2\] Latencia de las transacciones SQL<br>_Se muestra como transacción_ |
| **cockroachdb.sql.txn.rollback.count** <br>(count) | \[OpenMetrics v1 y v2\] Número de sentencias ROLLBACK de transacciones SQL|
| **cockroachdb.sql.txn.rollback.internal.count** <br>(count) | Número de sentencias ROLLBACK de transacciones SQL ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.txn.rollback.started.count** <br>(count) | Número de sentencias ROLLBACK de transacciones SQL iniciadas|
| **cockroachdb.sql.txn.rollback.started.internal.count** <br>(count) | Número de sentencias ROLLBACK de transacciones SQL iniciadas (consultas internas)|
| **cockroachdb.sql.txns.open** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de transacciones SQL de usuario actualmente abiertas<br>_Se muestra como transacción_ |
| **cockroachdb.sql.txns.open.internal** <br>(gauge) | Número de transacciones SQL de usuario actualmente abiertas (consultas internas)|
| **cockroachdb.sql.update.count** <br>(count) | \[OpenMetrics v1 y v2\] Númyero de sentencias UPDATE SQL|
| **cockroachdb.sql.update.internal.count** <br>(count) | Número de sentencias UPDATE SQL ejecutadas con éxito (consultas internas)|
| **cockroachdb.sql.update.started.count** <br>(count) | Número de sentencias UPDATE SQL iniciadas|
| **cockroachdb.sql.update.started.internal.count** <br>(count) | Número de sentencias UPDATE SQL iniciadas (consultas internas)|
| **cockroachdb.sqlliveness.is_alive.cache_hits.count** <br>(count) | Número de llamadas a IsAlive que vuelven de la caché|
| **cockroachdb.sqlliveness.is_alive.cache_misses.count** <br>(count) | Número de llamadas a IsAlive que no vuelven de la caché|
| **cockroachdb.sqlliveness.sessions_deleted.count** <br>(count) | Número de sesiones caducadas eliminadas|
| **cockroachdb.sqlliveness.sessions_deletion_runs.count** <br>(count) | Número de llamadas para eliminar sesiones realizadas|
| **cockroachdb.sqlliveness.write_failures.count** <br>(count) | Número de llamadas de actualización o inserción fallidas|
| **cockroachdb.sqlliveness.write_successes.count** <br>(count) | Número de llamadas de actualización o inserción realizadas con éxito|
| **cockroachdb.storage.batch_commit** <br>(gauge) | Recuento de confirmaciones por lotes. Para ver más detalles, consulta storage.AggregatedBatchCommitStats.|
| **cockroachdb.storage.batch_commit.commit_wait.duration** <br>(gauge) | Tiempo acumulado a la espera de la sincronización de WAL, para la confirmación por lotes. Para ver más detalles, consulta storage.AggregatedBatchCommitStats.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.batch_commit.duration** <br>(gauge) | Tiempo acumulado dedicado a la confirmación por lotes. Para ver más detalles, consulta storage.AggregatedBatchCommitStats.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.batch_commit.l0_stall.duration** <br>(gauge) | Tiempo acumulado dedicado a un bloqueo de escritura debido a una alta amplificación de lectura en L0, para la confirmación por lotes. Para ver más detalles, consulta storage.AggregatedBatchCommitStats.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.batch_commit.mem_stall.duration** <br>(gauge) | Tiempo acumulado dedicado a un bloqueo de escritura debido a muchas memtables, para la confirmación por lotes. Para ver más detalles, consulta storage.AggregatedBatchCommitStats.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.batch_commit.sem_wait.duration** <br>(gauge) | Tiempo acumulado dedicado a la espera del semáforo, para la confirmación por lotes. Para ver más detalles, consulta storage.AggregatedBatchCommitStats.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.batch_commit.wal_queue_wait.duration** <br>(gauge) | Tiempo acumulado dedicado a la espera de bloques de memoria en la cola de WAL, para la confirmación por lotes. Para ver más detalles, consulta storage.AggregatedBatchCommitStats.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.batch_commit.wal_rotation.duration** <br>(gauge) | Tiempo acumulado dedicado a la espera de la rotación de WAL, para la confirmación por lotes. Para ver más detalles, consulta storage.AggregatedBatchCommitStats.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.checkpoints** <br>(gauge) | Número de directorios de puntos de control encontrados en el almacenamiento. Se trata del número de directorios encontrados en el directorio auxiliar/de puntos de control. Cada uno representa un punto de control inmutable en el tiempo del motor de almacenamiento. Son económicos (consisten principalmente en enlaces duros), pero con el tiempo se convierten en una copia completa del estado anterior, lo que aumenta su coste relativo.|
| **cockroachdb.storage.compactions.duration** <br>(gauge) | Suma acumulativa de todas las duraciones de compactación. La tasa de este valor proporciona la concurrencia de compactación efectiva de un almacén, que puede ser útil para determinar si la concurrencia de compactación máxima se utiliza completamente.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.compactions.keys.pinned** <br>(calibre) | Recuento acumulado de KV del motor de almacenamiento escritos en sstables durante las descargas y compactaciones debidas a snapshots LSM abiertos. Diferentes subsistemas de CockroachDB toman snapshots LSM para mantener una vista coherente de la base de datos durante un periodo de tiempo prolongado.|
| **cockroachdb.storage.compactions.keys.pinned.bytes** <br>(gauge) | Tamaño acumulado de KV del motor de almacenamiento escritos en sstables durante las descargas y compactaciones debidas a snapshots LSM abiertos. Diferentes subsistemas de CockroachDB toman snapshots LSM para mantener una vista coherente de la base de datos durante un periodo de tiempo prolongado.<br>_Se muestra como byte_ |
| **cockroachdb.storage.disk_slow** <br>(gauge) | Número de casos de operaciones de disco que tardan más de 10s|
| **cockroachdb.storage.disk_stalled** <br>(gauge) | Número de casos de operaciones de disco que tardan más de 20s|
| **cockroachdb.storage.flush.ingest** <br>(gauge) | Descargas que realizan una ingesta (ingestas descargables)|
| **cockroachdb.storage.flush.ingest.table** <br>(gauge) | Tablas ingeridas a través de descargas (ingestas descargables)|
| **cockroachdb.storage.flush.ingest.table.bytes** <br>(gauge) | Bytes ingeridos a través de descargas (ingestas descargables)<br>_Se muestra como byte_ |
| **cockroachdb.storage.flush.utilization** <br>(gauge) | Porcentaje de tiempo durante el que el motor de almacenamiento envía memtables al disco.<br>_Se muestra como porcentaje_ |
| **cockroachdb.storage.ingest** <br>(gauge) | Número de ingestas realizadas con éxito|
| **cockroachdb.storage.iterator.block_load.bytes** <br>(gauge) | Bytes cargados por los iteradores del motor de almacenamiento (posiblemente en caché). Para ver más detalles, consulta storage.AggregatedIteratorStats.<br>_Se muestra como byte_ |
| **cockroachdb.storage.iterator.block_load.cached_bytes** <br>(gauge) | Bytes cargados por los iteradores del motor de almacenamiento desde la caché de bloques. Para ver más detalles, consulta storage.AggregatedIteratorStats.<br>_Se muestra como byte_ |
| **cockroachdb.storage.iterator.block_load.read_duration** <br>(gauge) | Tiempo acumulado que los iteradores del motor de almacenamiento dedicaron a cargar bloques desde el almacenamiento duradero. Para ver más detalles, consulta storage.AggregatedIteratorStats.<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.iterator.external.seeks** <br>(gauge) | Recuento acumulado de búsquedas realizadas en los iteradores del motor de almacenamiento. Para ver más detalles, consulta storage.AggregatedIteratorStats.|
| **cockroachdb.storage.iterator.external.steps** <br>(gauge) | Recuento acumulado de pasos realizados en los iteradores del motor de almacenamiento. Para ver más detalles, consulta storage.AggregatedIteratorStats.|
| **cockroachdb.storage.iterator.internal.seeks** <br>(gauge) | Conteo acumulado de búsquedas realizadas internamente en los iteradores del motor de almacenamiento. Un valor alto relativo a 'storage.iterator.external.seeks' es una buena señal de que hay una acumulación interna de basura dentro del motor de almacenamiento. Para ver más detalles, consulta storage.AggregatedIteratorStats.|
| **cockroachdb.storage.iterator.internal.steps** <br>(gauge) | Conteo acumulado de pasos realizados internamente en los iteradores del motor de almacenamiento. Un valor alto relativo a 'storage.iterator.external.steps' es una buena señal de que hay una acumulación interna de basura dentro del motor de almacenamiento. Para ver más detalles, consulta storage.AggregatedIteratorStats.|
| **cockroachdb.storage.keys.range_key_set** <br>(gauge) | Recuento aproximado de claves internas RangeKeySet en todo el motor de almacenamiento|
| **cockroachdb.storage.keys.tombstone** <br>(calibre) | Recuento aproximado de claves internas DEL, SINGLEDEL y RANGEDEL en todo el motor de almacenamiento|
| **cockroachdb.storage.l0_bytes_flushed** <br>(gauge) | Número de bytes descargados (desde memtables) en el nivel 0<br>_Se muestra como byte_ |
| **cockroachdb.storage.l0_bytes_ingested** <br>(gauge) | Número de bytes ingeridos directamente en el nivel 0<br>_Se muestra como byte_ |
| **cockroachdb.storage.l0_level_score** <br>(gauge) | Puntuación de compactación del nivel 0|
| **cockroachdb.storage.l0_level_size** <br>(gauge) | Tamaño de las SSTables en el nivel 0<br>_Se muestra como byte_ |
| **cockroachdb.storage.l0_num_files** <br>(gauge) | Número de SSTables en el nivel 0|
| **cockroachdb.storage.l0_sublevels** <br>(gauge) | Número de subniveles del nivel 0|
| **cockroachdb.storage.l1_bytes_ingested** <br>(gauge) | Número de bytes ingeridos directamente en el nivel 1<br>_Se muestra como byte_ |
| **cockroachdb.storage.l1_level_score** <br>(gauge) | Puntuación de compactación del nivel 1|
| **cockroachdb.storage.l1_level_size** <br>(gauge) | Tamaño de las SSTables en el nivel 1<br>_Se muestra como byte_ |
| **cockroachdb.storage.l2_bytes_ingested** <br>(gauge) | Número de bytes ingeridos directamente en el nivel 2<br>_Se muestra como byte_ |
| **cockroachdb.storage.l2_level_score** <br>(gauge) | Puntuación de compactación del nivel 2|
| **cockroachdb.storage.l2_level_size** <br>(gauge) | Tamaño de las SSTables en el nivel 2<br>_Se muestra como byte_ |
| **cockroachdb.storage.l3_bytes_ingested** <br>(gauge) | Número de bytes ingeridos directamente en el nivel 3<br>_Se muestra como byte_ |
| **cockroachdb.storage.l3_level_score** <br>(gauge) | Puntuación de compactación del nivel 3|
| **cockroachdb.storage.l3_level_size** <br>(gauge) | Tamaño de las SSTables en el nivel 3<br>_Se muestra como byte_ |
| **cockroachdb.storage.l4_bytes_ingested** <br>(gauge) | Número de bytes ingeridos directamente en el nivel 4<br>_Se muestra como byte_ |
| **cockroachdb.storage.l4_level_score** <br>(gauge) | Puntuación de compactación del nivel 4|
| **cockroachdb.storage.l4_level_size** <br>(gauge) | Tamaño de las SSTables en el nivel 4<br>_Se muestra como byte_ |
| **cockroachdb.storage.l5_bytes_ingested** <br>(gauge) | Número de bytes ingeridos directamente en el nivel 5<br>_Se muestra como byte_ |
| **cockroachdb.storage.l5_level_score** <br>(gauge) | Puntuación de compactación del nivel 5|
| **cockroachdb.storage.l5_level_size** <br>(gauge) | Tamaño de las SSTables del nivel 5<br>_Se muestra como byte_ |
| **cockroachdb.storage.l6_bytes_ingested** <br>(gauge) | Número de bytes ingeridos directamente en el nivel 6<br>_Se muestra como byte_ |
| **cockroachdb.storage.l6_level_score** <br>(indicador) | Puntuación de compactación del nivel 6|
| **cockroachdb.storage.l6_level_size** <br>(gauge) | Tamaño de las SSTables en el nivel 6<br>_Se muestra como byte_ |
| **cockroachdb.storage.marked_for_compaction_files** <br>(gauge) | Recuento de SSTables marcadas para compactación|
| **cockroachdb.storage.queue.store_failures.count** <br>(count) | Número de réplicas que no se pudieron procesar en colas de replicación debido a errores reintentables del almacén|
| **cockroachdb.storage.secondary_cache** <br>(gauge) | Recuento de bloques de caché en la caché secundaria (no bloques sstable)|
| **cockroachdb.storage.secondary_cache.evictions** <br>(gauge) | Número de veces que un bloque de caché fue desalojado de la caché secundaria|
| **cockroachdb.storage.secondary_cache.reads_full_hit** <br>(gauge) | Número de lecturas en las que todos los datos devueltos fueron leídos de la caché secundaria|
| **cockroachdb.storage.secondary_cache.reads_multi_block** <br>(gauge) | Número de lecturas de la caché secundaria que requieren la lectura de datos de más de 2 bloques de caché|
| **cockroachdb.storage.secondary_cache.reads_multi_shard** <br>(gauge) | Número de lecturas de la caché secundaria que requieren la lectura de datos de más de 2 fragmentos|
| **cockroachdb.storage.secondary_cache.reads_no_hit** <br>(gauge) | Número de lecturas en las que no fueron devueltos datos leídos de la caché secundaria|
| **cockroachdb.storage.secondary_cache.reads_partial_hit** <br>(gauge) | Número de lecturas en las que algunos datos devueltos fueron leídos de la caché secundaria|
| **cockroachdb.storage.secondary_cache.reads_total** <br>(gauge) | Número de lecturas de la caché secundaria|
| **cockroachdb.storage.secondary_cache.size** <br>(gauge) | Número de bytes de sstable almacenados en la caché secundaria<br>_Se muestra como byte_ |
| **cockroachdb.storage.secondary_cache.write_back_failures** <br>(gauge) | Número de veces que falló la escritura de un bloque de caché en la caché secundaria|
| **cockroachdb.storage.shared_storage.read** <br>(gauge) | Bytes leídos del almacenamiento compartido<br>_Se muestra como byte_ |
| **cockroachdb.storage.shared_storage.write** <br>(gauge) | Bytes escritos en el almacenamiento externo<br>_Se muestra como byte_ |
| **cockroachdb.storage.single_delete.ineffectual** <br>(gauge) | Número de SingleDeletes sin efecto|
| **cockroachdb.storage.single_delete.invariant_violation** <br>(gauge) | Número de infracciones de la invariante SingleDelete|
| **cockroachdb.storage.wal.bytes_in** <br>(gauge) | Número de bytes lógicos que el motor de almacenamiento escribió en el WAL|
| **cockroachdb.storage.wal.bytes_written** <br>(gauge) | Número de bytes que el motor de almacenamiento escribió en el WAL|
| **cockroachdb.storage.wal.fsync.latency.bucket** <br>(count) | Latencia fsync del registro de escritura anticipada<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.wal.fsync.latency.count** <br>(count) | Latencia fsync del registro de escritura anticipada<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.wal.fsync.latency.sum** <br>(count) | Latencia fsync del registro de escritura anticipada<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.write.stalls** <br>(gauge) | Número de casos de bloqueos de escritura intencionados para contrapresionar las escrituras entrantes|
| **cockroachdb.storage.write_stall_nanos** <br>(gauge) | Duración total del bloqueo de escritura en nanos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.storage.write_stalls** <br>(gauge) | Número de casos de bloqueos de escritura intencionados para contrapresionar las escrituras entrantes|
| **cockroachdb.sys.cgo.allocbytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Bytes actuales de memoria asignados por cgo<br>_Se muestra como byte_ |
| **cockroachdb.sys.cgo.totalbytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Total de bytes de memoria asignados por cgo, pero no liberados<br>_Se muestra como byte_ |
| **cockroachdb.sys.cgocalls** <br>(gauge) | \[OpenMetrics v1 y v2\] Número total de llamadas de cgo|
| **cockroachdb.sys.cpu.combined.percent.normalized** <br>(gauge) | \[OpenMetrics v1 y v2\] Porcentaje actual de cpu de usuario+sistema, normalizado 0-1 por número de núcleos<br>_Se muestra como fracción_ |
| **cockroachdb.sys.cpu.host.combined.percent_normalized** <br>(gauge) | Porcentaje actual de cpu de usuario+sistema en toda la máquina, normalizado 0-1 por número de núcleos<br>_Se muestra como porcentaje_ |
| **cockroachdb.sys.cpu.now.ns** <br>(gauge) | La hora en que se tomaron las mediciones de la CPU, en nanosegundos desde la marca de tiempo<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sys.cpu.sys.ns** <br>(gauge) | \[OpenMetrics v1 y v2\] Tiempo total de cpu del sistema en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sys.cpu.sys.percent** <br>(gauge) | \[OpenMetrics v1 y v2\] Porcentaje actual de cpu del sistema<br>_Se muestra como núcleo_ |
| **cockroachdb.sys.cpu.user.ns** <br>(gauge) | \[OpenMetrics v1 y v2\] Tiempo total de cpu del usuario en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sys.cpu.user.percent** <br>(gauge) | \[OpenMetrics v1 y v2\] Porcentaje de cpu del usuario actual<br>_Se muestra como núcleo_ |
| **cockroachdb.sys.fd.open** <br>(gauge) | \[OpenMetrics v1 y v2\] Procesar descriptores de archivo abiertos|
| **cockroachdb.sys.fd.softlimit** <br>(gauge) | \[OpenMetrics v1 y v2\] Procesar límite suave FD abierto|
| **cockroachdb.sys.gc** <br>(gauge) | \[OpenMetrics v2\] Número total de ejecuciones GC|
| **cockroachdb.sys.gc.count** <br>(gauge) | \[OpenMetrics v1\] Número total de ejecuciones GC|
| **cockroachdb.sys.gc.pause.ns** <br>(gauge) | \[OpenMetrics v1 y v2\] Pausa GC total en nanosegundos<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sys.gc.pause.percent** <br>(gauge) | \[OpenMetrics v1 y v2\] Porcentaje actual de pausa GC<br>_Se muestra como fracción_ |
| **cockroachdb.sys.go.allocbytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Bytes actuales de memoria asignados por go<br>_Se muestra como byte_ |
| **cockroachdb.sys.go.totalbytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Total de bytes de memoria asignados por go, pero no liberados<br>_Se muestra como byte_ |
| **cockroachdb.sys.goroutines** <br>(gauge) | \[OpenMetrics v1 y v2\] Número actual de goroutines|
| **cockroachdb.sys.host.disk.io.time** <br>(gauge) | Tiempo dedicado a leer o escribir en todos los discos desde que se inició este proceso<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sys.host.disk.iopsinprogress** <br>(gauge) | Operaciones de E/S actualmente en curso en este host|
| **cockroachdb.sys.host.disk.read** <br>(gauge) | Operaciones de lectura en todos los discos desde que se inició este proceso|
| **cockroachdb.sys.host.disk.read.bytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Bytes leídos de todos los discos desde que se inició este proceso<br>_Se muestra como byte_ |
| **cockroachdb.sys.host.disk.read.count** <br>(gauge) | Operaciones de lectura en todos los discos desde que se inició este proceso|
| **cockroachdb.sys.host.disk.read.time** <br>(gauge) | Tiempo dedicado a leer todos los discos desde que se inició este proceso<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sys.host.disk.weightedio.time** <br>(gauge) | Tiempo ponderado dedicado a leer o escribir en todos los discos desde que se inició este proceso<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sys.host.disk.write** <br>(gauge) | Operaciones de escritura en todos los discos desde que se inició este proceso|
| **cockroachdb.sys.host.disk.write.bytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Bytes escritos en todos los discos desde que se inició este proceso<br>_Se muestra como byte_ |
| **cockroachdb.sys.host.disk.write.count** <br>(gauge) | Operaciones de escritura en todos los discos desde que se inició este proceso|
| **cockroachdb.sys.host.disk.write.time** <br>(gauge) | Tiempo dedicado a escribir en todos los discos desde que se inició este proceso<br>_Se muestra como nanosegundo_ |
| **cockroachdb.sys.host.net.recv.bytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Bytes recibidos en todas las interfaces de red desde que se inició este proceso<br>_Se muestra como byte_ |
| **cockroachdb.sys.host.net.recv.packets** <br>(gauge) | Paquetes recibidos en todas las interfaces de red desde que se inició este proceso|
| **cockroachdb.sys.host.net.send.bytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Bytes enviados en todas las interfaces de red desde que se inició este proceso<br>_Se muestra como byte_ |
| **cockroachdb.sys.host.net.send.packets** <br>(gauge) | Paquetes enviados en todas las interfaces de red desde que se inició este proceso|
| **cockroachdb.sys.rss** <br>(gauge) | \[OpenMetrics v1 y v2\] Proceso RSS actual|
| **cockroachdb.sys.runnable.goroutines.per.cpu** <br>(gauge) | Número medio de goroutines en espera de ejecución, normalizado por el número de núcleos|
| **cockroachdb.sys.runnable.goroutines.per_cpu** <br>(gauge) | Número medio de goroutines en espera de ejecución, normalizado por el número de núcleos|
| **cockroachdb.sys.totalmem** <br>(gauge) | Memoria total (tanto libre como utilizada)<br>_Se muestra como byte_ |
| **cockroachdb.sys.uptime** <br>(gauge) | \[OpenMetrics v1 y v2\] Tiempo de actividad del proceso en segundos<br>_Se muestra como segundo_ |
| **cockroachdb.sysbytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de bytes en pares KV del sistema<br>_Se muestra como byte_ |
| **cockroachdb.syscount** <br>(gauge) | \[OpenMetrics v1 y v2\] Recuento de pares KV del sistema|
| **cockroachdb.tenant.consumption.cross_region_network_ru.count** <br>(count) | Número total de RU cobradas por el tráfico de red entre regiones|
| **cockroachdb.tenant.consumption.external_io_egress_bytes** <br>(gauge) | Número total de bytes escritos en servicios externos como proveedores de almacenamiento en la nube|
| **cockroachdb.tenant.consumption.external_io_ingress_bytes** <br>(gauge) | Número total de bytes leídos de servicios externos como proveedores de almacenamiento en la nube|
| **cockroachdb.tenant.consumption.kv_request_units** <br>(gauge) | Consumo de RU atribuible a KV|
| **cockroachdb.tenant.consumption.kv_request_units.count** <br>(count) | Consumo de RU atribuible a KV|
| **cockroachdb.tenant.consumption.pgwire_egress_bytes** <br>(gauge) | Número total de bytes transferidos desde un pod SQL al cliente|
| **cockroachdb.tenant.consumption.read_batches** <br>(gauge) | Número total de lotes de lectura KV|
| **cockroachdb.tenant.consumption.read_bytes** <br>(gauge) | Número total de bytes leídos de KV|
| **cockroachdb.tenant.consumption.read_requests** <br>(gauge) | Número total de solicitudes de lectura a KV|
| **cockroachdb.tenant.consumption.request_units** <br>(gauge) | Consumo total de RU|
| **cockroachdb.tenant.consumption.request_units.count** <br>(count) | Consumo total de RU|
| **cockroachdb.tenant.consumption.sql_pods_cpu_seconds** <br>(gauge) | Cantidad total de CPU utilizada por pods SQL<br>_Se muestra como segundo_ |
| **cockroachdb.tenant.consumption.write_batches** <br>(gauge) | Número total de lotes de escritura en KV|
| **cockroachdb.tenant.consumption.write_bytes** <br>(gauge) | Número total de bytes escritos en KV|
| **cockroachdb.tenant.consumption.write_requests** <br>(gauge) | Número total de solicitudes de escritura en KV|
| **cockroachdb.timeseries.write.bytes** <br>(count) | \[OpenMetrics v1\] Tamaño total en bytes de las muestras de métricas escritas en disco<br>_Se muestra como byte_ |
| **cockroachdb.timeseries.write.bytes.count** <br>(count) | \[OpenMetrics v2\] Tamaño total en bytes de las muestras de métricas escritas en disco<br>_Se muestra como byte_ |
| **cockroachdb.timeseries.write.errors** <br>(count) | \[OpenMetrics v1\] Total de errores encontrados al intentar escribir métricas en disco<br>_Se muestra como error_ |
| **cockroachdb.timeseries.write.errors.count** <br>(count) | \[OpenMetrics v2\] Total de errores encontrados al intentar escribir métricas en disco<br>_Se muestra como error_ |
| **cockroachdb.timeseries.write.samples** <br>(count) | \[OpenMetrics v1\] Número total de muestras de métricas escritas en disco|
| **cockroachdb.timeseries.write.samples.count** <br>(count) | \[OpenMetrics v2\] Número total de muestras de métricas escritas en disco|
| **cockroachdb.totalbytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Número total de bytes ocupados por claves y valores incluyendo datos no activos<br>_Se muestra como byte_ |
| **cockroachdb.tscache.skl.pages** <br>(gauge) | Número de páginas en la caché de marcas de tiempo|
| **cockroachdb.tscache.skl.read.pages** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de páginas en la caché de marcas de tiempo de lectura|
| **cockroachdb.tscache.skl.read.rotations** <br>(count) | \[OpenMetrics v1\] Número de rotaciones de página en la caché de marcas de tiempo de lectura|
| **cockroachdb.tscache.skl.read.rotations.count** <br>(count) | \[OpenMetrics v2\] Número de rotaciones de página en la caché de marcas de tiempo de lectura|
| **cockroachdb.tscache.skl.rotations.count** <br>(count) | Número de rotaciones de página en la caché de marcas de tiempo|
| **cockroachdb.tscache.skl.write.pages** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de páginas en la caché de marcas de tiempo de escritura|
| **cockroachdb.tscache.skl.write.rotations** <br>(count) | \[OpenMetrics v1\] Número de rotaciones de página en la caché de marcas de tiempo de escritura|
| **cockroachdb.tscache.skl.write.rotations.count** <br>(count) | \[OpenMetrics v2\] Número de rotaciones de página en la caché de marcas de tiempo de escritura|
| **cockroachdb.txn.abandons** <br>(count) | \[OpenMetrics v1\] Número de transacciones KV abandonadas|
| **cockroachdb.txn.abandons.count** <br>(count) | \[OpenMetrics v2\] Número de transacciones KV abandonadas|
| **cockroachdb.txn.aborts** <br>(count) | \[OpenMetrics v1\] Número de transacciones KV canceladas|
| **cockroachdb.txn.aborts.count** <br>(count) | \[OpenMetrics v2\] Número de transacciones KV canceladas|
| **cockroachdb.txn.autoretries** <br>(count) | \[OpenMetrics v1\] Número de reintentos automáticos para evitar reinicios serializables|
| **cockroachdb.txn.autoretries.count** <br>(count) | \[OpenMetrics v2\] Número de reintentos automáticos para evitar reinicios serializables|
| **cockroachdb.txn.commit_waits.before_commit_trigger.count** <br>(count) | Número de transacciones KV que tuvieron que esperar en el servidor antes de confirmarse porque tenían un activador de confirmación|
| **cockroachdb.txn.commit_waits.count** <br>(count) | Número de transacciones KV que tuvieron que esperar la confirmación para garantizar la linealidad. Esto suele ocurrir con transacciones que escriben en rangos globales.|
| **cockroachdb.txn.commits** <br>(count) | \[OpenMetrics v1\] Número de transacciones KV confirmadas (incluyendo 1PC)|
| **cockroachdb.txn.commits.count** <br>(count) | \[OpenMetrics v2\] Número de transacciones KV confirmadas (incluyendo 1PC)|
| **cockroachdb.txn.commits1PC** <br>(count) | \[OpenMetrics v1\] Número de transacciones KV de una fase confirmadas|
| **cockroachdb.txn.commits1PC.count** <br>(count) | \[OpenMetrics v2\] Número de transacciones KV de una fase confirmadas|
| **cockroachdb.txn.condensed_intent_spans.count** <br>(count) | Transacciones KV que excedieron su presupuesto de memoria de seguimiento de intentos (kv.transaction.max_intents_bytes). Para obtener un indicador de las transacciones que se están ejecutando actualmente, consulta también txn.condensed_intent_spans_gauge.|
| **cockroachdb.txn.condensed_intent_spans_gauge** <br>(gauge) | Transacciones KV que se están ejecutando actualmente y que excedieron su presupuesto de memoria de seguimiento de intentos (kv.transaction.max_intents_bytes). Para un contador/una tasa perpetuos, consulta también txn.condensed_intent_spans.|
| **cockroachdb.txn.condensed_intent_spans_rejected.count** <br>(count) | Transacciones KV que se cancelaron porque excedieron su presupuesto de memoria de seguimiento de intentos (kv.transaction.max_intents_bytes). El rechazo lo provoca kv.transaction.reject_over_max_intents_budget.|
| **cockroachdb.txn.durations** <br>(gauge) | \[OpenMetrics v1\] Duración de las transacciones KV en nanosegundos|
| **cockroachdb.txn.durations.bucket** <br>(count) | \[OpenMetrics v2\] Duración de las transacciones KV en nanosegundos|
| **cockroachdb.txn.durations.count** <br>(count) | \[OpenMetrics v2\] Duración de las transacciones KV en nanosegundos|
| **cockroachdb.txn.durations.sum** <br>(count) | \[OpenMetrics v2\] Duración de las transacciones KV en nanosegundos|
| **cockroachdb.txn.parallelcommits.auto_retries.count** <br>(count) | Número de intentos de confirmación después de intentos de confirmación fallidos exitosos paralelos|
| **cockroachdb.txn.parallelcommits.count** <br>(count) | Número de intentos de confirmación paralelos de transacciones KV|
| **cockroachdb.txn.refresh.auto_retries.count** <br>(count) | Número de reintentos de solicitud luego de una actualización exitosa del cliente|
| **cockroachdb.txn.refresh.fail.count** <br>(count) | Número de actualizaciones de transacciones del lado del cliente fallidas|
| **cockroachdb.txn.refresh.fail_with_condensed_spans.count** <br>(count) | Número de actualizaciones de transacciones del lado del cliente fallidas, cuyo seguimiento de lectura perdió fidelidad debido a la condensación. Un fallo de este tipo podría ser un falso conflicto. Los fallos contabilizados aquí también se contabilizan en txn.refresh.fail, y las transacciones respectivas también se contabilizan en txn.refresh.memory_limit_exceeded.|
| **cockroachdb.txn.refresh.memory_limit_exceeded.count** <br>(count) | Número de transacciones que superan el límite de bytes de tramos de actualización, lo que provoca que se condensen sus intervalos de lectura|
| **cockroachdb.txn.refresh.success.count** <br>(count) | Número de actualizaciones de transacciones del lado del cliente exitosas. Una actualización puede ser preventiva o reactiva. Una actualización reactiva se realiza después de que una petición arroje un error porque se necesita una actualización para que tenga éxito. En estos casos, la solicitud será reemitida como un auto-reintento (ver txn.refresh.auto_retries) después de que la actualización tenga éxito.|
| **cockroachdb.txn.refresh.success_server_side.count** <br>(count) | Número de actualizaciones de transacciones del servidor exitosas|
| **cockroachdb.txn.restarts** <br>(gauge) | \[OpenMetrics v1\] Número de transacciones KV reiniciadas|
| **cockroachdb.txn.restarts.asyncwritefailure.count** <br>(count) | Número de reinicios debidos a escrituras consensuadas asíncronas que no consiguieron dejar intentos|
| **cockroachdb.txn.restarts.bucket** <br>(count) | \[OpenMetrics v2\] Número de transacciones KV reiniciadas|
| **cockroachdb.txn.restarts.commitdeadlineexceeded.count** <br>(count) | Número de reinicios debidos a que una transacción superó su límite de tiempo|
| **cockroachdb.txn.restarts.count** <br>(count) | \[OpenMetrics v2\] Número de transacciones KV reiniciadas|
| **cockroachdb.txn.restarts.deleterange** <br>(count) | \[OpenMetrics v1\] Número de reinicios debidos a una marca de tiempo de confirmación reenviada y a un comando DeleteRange|
| **cockroachdb.txn.restarts.deleterange.count** <br>(count) | \[OpenMetrics v2\] Número de reinicios debidos a una marca de tiempo de confirmación reenviada y a un comando DeleteRange|
| **cockroachdb.txn.restarts.possiblereplay** <br>(count) | \[OpenMetrics v1\] Número de reinicios debidos a posibles repeticiones de lotes de comandos en la capa de almacenamiento|
| **cockroachdb.txn.restarts.possiblereplay.count** <br>(count) | \[OpenMetrics v2\] Número de reinicios debidos a posibles repeticiones de lotes de comandos en la capa de almacenamiento|
| **cockroachdb.txn.restarts.readwithinuncertainty.count** <br>(count) | Número de reinicios debidos a la lectura de un nuevo valor dentro del intervalo de incertidumbre|
| **cockroachdb.txn.restarts.serializable** <br>(count) | \[OpenMetrics v1\] Número de reinicios debidos a una marca de tiempo de confirmación reenviada y a un aislamiento=SERIALIZABLE|
| **cockroachdb.txn.restarts.serializable.count** <br>(count) | \[OpenMetrics v2\] Número de reinicios debidos a una marca de tiempo de confirmación reenviada y a un aislamiento=SERIALIZABLE|
| **cockroachdb.txn.restarts.sum** <br>(count) | \[OpenMetrics v2\] Número de transacciones KV reiniciadas|
| **cockroachdb.txn.restarts.txnaborted.count** <br>(count) | Número de reinicios debidos a la cancelación de una transacción concurrente (normalmente debido a un bloqueo)|
| **cockroachdb.txn.restarts.txnpush.count** <br>(count) | Número de reinicios debidos a un fallo de envío de transacción|
| **cockroachdb.txn.restarts.unknown.count** <br>(count) | Número de reinicios por causas desconocidas|
| **cockroachdb.txn.restarts.writetooold** <br>(count) | \[OpenMetrics v1\] Número de reinicios debidos a que un escritor se confirmó primero|
| **cockroachdb.txn.restarts.writetooold.count** <br>(count) | \[OpenMetrics v2\] Número de reinicios debidos a que un escritor se confirmó primero|
| **cockroachdb.txn.restarts.writetoooldmulti.count** <br>(count) | Número de reinicios debidos a que varios escritores concurrentes se confirmaron primero|
| **cockroachdb.txn.rollbacks.async.failed.count** <br>(count) | Número de transacciones KV que no pudieron enviar cancelaciones de forma asíncrona y que no siempre se vuelven a intentar|
| **cockroachdb.txn.rollbacks.failed.count** <br>(count) | Número de transacciones KV que no pudieron enviar la cancelación final|
| **cockroachdb.txn.server_side.1PC.failure.count** <br>(count) | Número de lotes que intentaron confirmar utilizando 1PC y fallaron|
| **cockroachdb.txn.server_side.1PC.success.count** <br>(count) | Número de lotes que intentaron confirmar utilizando 1PC y lo consiguieron|
| **cockroachdb.txn.server_side_retry.read_evaluation.failure.count** <br>(count) | Número de lotes de lectura que no se actualizaron con éxito en el servidor|
| **cockroachdb.txn.server_side_retry.read_evaluation.success.count** <br>(count) | Número de lotes de lectura que se actualizaron con éxito en el servidor|
| **cockroachdb.txn.server_side_retry.uncertainty_interval_error.failure.count** <br>(count) | Número de lotes con errores de intervalo de incertidumbre que no se actualizaron con éxito en el servidor|
| **cockroachdb.txn.server_side_retry.uncertainty_interval_error.success.count** <br>(count) | Número de lotes con errores de intervalo de incertidumbre que se actualizaron correctamente en el servidor|
| **cockroachdb.txn.server_side_retry.write_evaluation.failure.count** <br>(count) | Número de lotes de escritura que no se actualizaron correctamente en el servidor|
| **cockroachdb.txn.server_side_retry.write_evaluation.success.count** <br>(count) | Número de lotes de escritura que se actualizaron correctamente en el servidor|
| **cockroachdb.txnrecovery.attempts.count** <br>(count) | Número de intentos de recuperación de transacciones ejecutados|
| **cockroachdb.txnrecovery.attempts.pending** <br>(gauge) | Número de intentos de recuperación de transacciones en curso|
| **cockroachdb.txnrecovery.failures.count** <br>(count) | Número de intentos de recuperación de transacciones fallidos|
| **cockroachdb.txnrecovery.successes.aborted.count** <br>(count) | Número de intentos de recuperación de transacciones que cancelaron una transacción|
| **cockroachdb.txnrecovery.successes.committed.count** <br>(count) | Número de intentos de recuperación de transacciones que confirmaron una transacción|
| **cockroachdb.txnrecovery.successes.pending.count** <br>(count) | Número de intentos de recuperación de transacciones que dejaron una transacción pendiente|
| **cockroachdb.txnwaitqueue.deadlocks.count** <br>(count) | Número de bloqueos detectados por la cola de espera de transacciones|
| **cockroachdb.txnwaitqueue.deadlocks_total.count** <br>(count) | Número de interbloqueos detectados por la cola de espera de transacciones|
| **cockroachdb.txnwaitqueue.pushee.waiting** <br>(gauge) | Número de empujadores en la cola de espera de transacciones|
| **cockroachdb.txnwaitqueue.pusher.slow** <br>(gauge) | Número total de casos en los que un empujador esperó más que el umbral de espera excesiva|
| **cockroachdb.txnwaitqueue.pusher.wait_time.bucket** <br>(count) | Histograma de las duraciones de permanencia en la cola de los empujadores<br>_Se muestra como nanosegundo_ |
| **cockroachdb.txnwaitqueue.pusher.wait_time.count** <br>(count) | Histograma de las duraciones de permanencia de los empujadores en la cola<br>_Se muestra como nanosegundo_ |
| **cockroachdb.txnwaitqueue.pusher.wait_time.sum** <br>(count) | Histograma de las duraciones de permanencia de los empujadores en la cola<br>_Se muestra como nanosegundo_ |
| **cockroachdb.txnwaitqueue.pusher.waiting** <br>(gauge) | Número de empujadores en la cola de espera de transacciones|
| **cockroachdb.txnwaitqueue.query.wait_time.bucket** <br>(count) | Histograma de las duraciones de permanencia de las consultas en la cola<br>_Se muestra como nanosegundo_ |
| **cockroachdb.txnwaitqueue.query.wait_time.count** <br>(count) | Histograma de las duraciones de permanencia de las consultas en la cola<br>_Se muestra como nanosegundo_ |
| **cockroachdb.txnwaitqueue.query.wait_time.sum** <br>(count) | Histograma de las duraciones de permanencia de las consultas en la cola<br>_Se muestra como nanosegundo_ |
| **cockroachdb.txnwaitqueue.query.waiting** <br>(gauge) | Número de consultas sobre el estado de las transacciones en espera de un registro de transacciones actualizado|
| **cockroachdb.valbytes** <br>(gauge) | \[OpenMetrics v1 y v2\] Número de bytes ocupados por los valores<br>_Se muestra como byte_ |
| **cockroachdb.valcount** <br>(gauge) | \[OpenMetrics v1 y v2\] Recuento de todos los valores|

### Checks de servicio

**cockroachdb.openmetrics.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas OpenMetrics de CockroachDB.

_Estados: ok, crítico_

**cockroachdb.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas Prometheus de CockroachDB.

_Estados: ok, crítico_

### Eventos

El check de CockroachDB no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar métricas de rendimiento de CockroachDB con Datadog](https://www.datadoghq.com/blog/monitor-cockroachdb-performance-metrics-with-datadog)