---
app_id: aerospike
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Recopilar las estadísticas de clúster y espacios de nombres de la base
  de datos de Aerospike
integration_version: 5.0.0
media: []
supported_os:
- Linux
title: Aerospike
---
## Información general

Obtén métricas de la base de datos de Aerospike en tiempo real para:

- Visualizar y monitorizar estados de Aerospike.
- Recibir notificaciones sobre los fallos y eventos de Aerospike.

## Configuración

NOTA: La integración actual de aerospike solo es compatible con el servidor de Aerospike v4.9 o posterior, ve las [notas de versión de la biblioteca de cliente de Python](https://download.aerospike.com/download/client/python/notes.html#5.0.0) de Aerospike para obtener más información.
Si utilizas una versión anterior del servidor de Aerospike, todavía es posible monitorizarla con la versión 7.29.0 o inferior del Datadog Agent.

### Instalación

El check de Aerospike se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

##### Recopilación de métricas

Para configurar este check para un Agent que se ejecuta en un host:

1. Instala y configura el [Aerospike Prometheus Exporter](https://github.com/aerospike/aerospike-prometheus-exporter); consulta la [documentación de Aerospike](https://docs.aerospike.com/monitorstack/new/installing-components) para obtener más detalles.

1. Edita el archivo `aerospike.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Aerospike. Consulta el [aerospike.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example) para todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**Nota**: La versión 1.16.0+ de este check utiliza [OpenMetrics](https://docs.datadoghq.com/integrations/openmetrics/) para la recopilación de métricas, que requiere Python 3. Para hosts que no puedan utilizar Python 3, o si deseas utilizar una versión anterior de este check, consulta la [configuración de ejemplo](https://github.com/DataDog/integrations-core/blob/7.36.x/aerospike/datadog_checks/aerospike/data/conf.yaml.example).

##### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `aerospike.d/conf.yaml` para empezar a recopilar tus logs de Aerospike:

   ```yaml
   logs:
     - type: file
       path: /var/log/aerospike/aerospike.log
       source: aerospike
   ```

   Cambia el valor del parámetro `path` y configúralo para tu entorno. Ve el [aerospike.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example) para todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta [Configurar integraciones con Autodiscovery en Kubernetes](https://docs.datadoghq.com/containers/kubernetes/integrations/) o [Configurar integraciones con Autodiscovery en Docker](https://docs.datadoghq.com/containers/docker/integrations/) para obtener orientación sobre la aplicación de los parámetros siguientes. Ve el [aerospike.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example) para todas las opciones de configuración disponibles.

##### Recopilación de métricas

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `aerospike`                          |
| `<INIT_CONFIG>`      | en blanco o `{}`                        |
| `<INSTANCES_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:9145/metrics"}` |

**Ejemplo**

Aplica la siguiente anotación a tu pod, donde `<CONTAINER_NAME>` es el nombre del contenedor Aerospike o un [identificador personalizado](https://docs.datadoghq.com/containers/guide/ad_identifiers/):

```
ad.datadoghq.com/<CONTAINER_NAME>.checks: |
  {
    "aerospike": {
      "init_config": {},
      "instances": [{"openmetrics_endpoint": "http://%%host%%:9145/metrics"}]
    }
  } 
```

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta la [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "aerospike", "service": "<SERVICE_NAME>"}` |

**Ejemplo**

Aplica la siguiente anotación a tu pod, donde `<CONTAINER_NAME>` es el nombre del contenedor de Aerospike o un [identificador personalizado](https://docs.datadoghq.com/containers/guide/ad_identifiers/):

```
ad.datadoghq.com/<CONTAINER_NAME>.logs: |
  [
    {
      "type": "file",
      "path": "/var/log/aerospike/aerospike.log",
      "source": "aerospike"
    } 
  ]
```

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `aerospike` en la sección de Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aerospike.aggr_scans_failed** <br>(gauge) | \[Heredado\] El número de escaneos abortados. Obsoleto desde 3.9|
| **aerospike.aggr_scans_succeeded** <br>(gauge) | \[Heredado\] El número de escaneos de agregación que se completaron con éxito. Obsoleto desde 3.9|
| **aerospike.basic_scans_failed** <br>(gauge) | \[Heredado\] El número de escaneos básicos que fallaron. Obsoleto desde 3.9|
| **aerospike.basic_scans_succeeded** <br>(gauge) | \[Heredado\] El número de escaneos básicos que se completaron con éxito. Obsoleto desde 3.9|
| **aerospike.batch_error** <br>(gauge) | \[Heredado\] Número de solicitudes directas por lotes rechazadas por errores.|
| **aerospike.batch_errors** <br>(gauge) | \[Heredado\] El número de solicitudes directas por lotes que fueron rechazadas debido a errores. Obsoleto desde 3.9|
| **aerospike.batch_index_complete** <br>(gauge) | \[Heredado\] Número de solicitudes de índice por lotes completadas.|
| **aerospike.batch_index_created_buffers** <br>(gauge) | \[Heredado\] El número de búferes de respuesta de 128KB creados.|
| **aerospike.batch_index_delay** <br>(gauge) | \[Heredado\] El número de veces que un búfer de respuesta de índice de lote se ha retrasado (WOULDBLOCK en el envío).|
| **aerospike.batch_index_destroyed_buffers** <br>(gauge) | \[Heredado\] El número de búferes de respuesta de 128KB destruidos.|
| **aerospike.batch_index_error** <br>(gauge) | \[Heredado\] El número de solicitudes de índice por lotes que fueron rechazadas debido a errores.|
| **aerospike.batch_index_errors** <br>(gauge) | \[Heredado\] El número de solicitudes de índice por lotes que fueron rechazadas debido a errores. Obsoleto desde 3.9|
| **aerospike.batch_index_huge_buffers** <br>(gauge) | \[Heredado\] El número de búferes de respuesta temporales creados que excedieron 128KB.|
| **aerospike.batch_index_initiate** <br>(gauge) | \[Heredado\] El número de solicitudes de índice por lotes recibidas.|
| **aerospike.batch_index_proto_compression_ratio** <br>(gauge) | \[Heredado\] Esto mide la relación media entre el tamaño comprimido y el tamaño sin comprimir de los datos de mensajes de protocolo en las respuestas de índice de lotes.|
| **aerospike.batch_index_proto_uncompressed_pct** <br>(gauge) | \[Heredado\] Mide el porcentaje de respuestas de índice de lotes con datos de mensajes de protocolo sin comprimir.<br>_Se muestra como porcentaje_ |
| **aerospike.batch_index_timeout** <br>(gauge) | \[Heredado\] Número de solicitudes de índice por lotes que han expirado en el servidor antes de ser procesadas.|
| **aerospike.batch_index_unused_buffers** <br>(gauge) | \[Heredado\] El número de búferes de respuesta de 128 KB disponibles actualmente en el grupo de búferes.|
| **aerospike.batch_initiate** <br>(gauge) | \[Heredado\] Número de solicitudes directas por lotes recibidas.|
| **aerospike.batch_queue** <br>(gauge) | \[Heredado\] El número de solicitudes directas por lotes que quedan en la cola a la espera de ser procesadas.|
| **aerospike.batch_timeout** <br>(gauge) | \[Heredado\] El número de solicitudes directas por lotes que han expirado en el servidor antes de ser procesadas.|
| **aerospike.batch_tree_count** <br>(gauge) | \[Heredado\] El número de búsquedas en el árbol para todas las solicitudes directas por lotes. Obsoleto desde 3.9|
| **aerospike.client_connections** <br>(gauge) | \[Heredado\] El número de conexiones de cliente activas a este nodo.|
| **aerospike.cluster_clock_skew_ms** <br>(gauge) | \[Heredado\] La desviación máxima actual del reloj en milisegundos entre clúster de nodos.<br>_Se muestra como milisegundo_ |
| **aerospike.cluster_clock_skew_stop_writes_sec** <br>(gauge) | \[Heredado\] El umbral en el que cualquier espacio de nombres que se establece en coherencia alta dejará de aceptar escrituras debido a la desviación del reloj (cluster_clock_skew_ms).<br>_Se muestra como segundo_ |
| **aerospike.cluster_generation** <br>(gauge) | \[Heredado\] Un entero de 64 bits sin firmar que se incrementa en un nodo por cada reequilibrio de partición de clúster con éxito o transición a estado huérfano.|
| **aerospike.cluster_integrity** <br>(gauge) | \[Heredado\] Indica si el clúster se encuentra en un estado entero y completo (en lo que respecta a todos los nodos que ve y a los que puede conectarse). |
| **aerospike.cluster_is_member** <br>(gauge) | \[Heredado\]|
| **aerospike.cluster_key** <br>(gauge) | \[Heredado\] Cadena hexadecimal de 64 bits generada aleatoriamente que se utiliza para nombrar el último acuerdo de estado del clúster de Paxos.|
| **aerospike.cluster_max_compatibility_id** <br>(gauge) | \[Heredado\] La versión de software máxima del clúster.|
| **aerospike.cluster_min_compatibility_id** <br>(gauge) | \[Heredado\] La versión de software mínima del clúster.|
| **aerospike.cluster_principal** <br>(gauge) | \[Heredado\] Especifica el ID de nodo del clúster principal actual. Será '0' en un nodo huérfano.|
| **aerospike.cluster_size** <br>(gauge) | \[Heredado\] El tamaño del clúster.|
| **aerospike.data_used_bytes_memory** <br>(gauge) | \[Heredado\] La cantidad de memoria ocupada por los datos. Obsoleto desde 3.9.<br>_Se muestra como byte_ |
| **aerospike.datacenter.dc_as_open_conn** <br>(gauge) | \[Heredado\] El número de conexión abierta al Aerospike DC. \[Eliminado en 5.0.0\]<br>_Se muestra como conexión_ |
| **aerospike.datacenter.dc_as_size** <br>(gauge) | \[Heredado\] Tamaño del clúster del Aerospike DC de destino. \[Eliminado en 5.0.0\]|
| **aerospike.datacenter.dc_deletes_shipped** <br>(gauge) | \[Heredado\] El número de transacciones de borrado que han sido enviadas con éxito. \[Eliminado en 5.0.0\]<br>_Se muestra como transacción_ |
| **aerospike.datacenter.dc_err_ship_client** <br>(gauge) | \[Heredado\] El número de errores de capa de cliente durante el envío de registros para este DC. Los errores incluyen tiempo de espera, \[Eliminado en 5.0.0\], fd de red erróneo, etc.<br>_Se muestra como error_ |
| **aerospike.datacenter.dc_err_ship_server** <br>(gauge) | \[Heredado\] Número de errores del clúster o clústeres remotos durante el envío de registros para este DC. Los errores incluyen fuera de espacio, clave ocupada, etc. \[Eliminado en 5.0.0\]<br>_Se muestra como error_ |
| **aerospike.datacenter.dc_esmt_bytes_shipped** <br>(gauge) | \[Heredado\] El número de bytes enviados para este DC. \[Eliminado en 5.0.0\]<br>_Se muestra como byte_ |
| **aerospike.datacenter.dc_http_good_locations** <br>(gauge) | \[Heredado\] El número de URLs que se consideran en buen estado y que están siendo utilizadas por el sistema de notificación de cambios. \[Eliminado en 5.0.0\]|
| **aerospike.datacenter.dc_http_locations** <br>(gauge) | \[Heredado\] El número de URLs configuradas para el destino HTTP. \[Eliminado en 5.0.0\]|
| **aerospike.datacenter.dc_latency_avg_ship** <br>(gauge) | \[Heredado\] La media móvil de latencia de envío para el DC específico. \[Eliminado en 5.0.0\]|
| **aerospike.datacenter.dc_open_conn** <br>(gauge) | \[Heredado\] El número de conexión abierta al DC. Si el DC acepta escrituras de pipeline, habrá 64 conexiones por nodo de destino. \[Eliminado en 5.0.0\]<br>_Se muestra como conexión_ |
| **aerospike.datacenter.dc_recs_inflight** <br>(gauge) | \[Heredado\] El número de registros que están en tránsito (que han sido enviados pero para los que aún no se ha recibido una respuesta del DC remoto). \[Eliminado en 5.0.0\]<br>_Se muestra como registro_ |
| **aerospike.datacenter.dc_recs_shipped** <br>(gauge) | \[Heredado\] El número de registros que se han intentado enviar, pero podría haber resultado en éxito o error. \[Eliminado en 5.0.0\]<br>_Se muestra como registro_ |
| **aerospike.datacenter.dc_recs_shipped_ok** <br>(gauge) | \[Heredado\] El número de registros que han sido enviados con éxito. \[Eliminado en 5.0.0\]<br>_Se muestra como registro_ |
| **aerospike.datacenter.dc_remote_ship_avg_sleep** <br>(gauge) | \[Heredado\] El número medio de ms de reposo para cada registro que se envía. \[Eliminado en 5.0.0\]<br>_Se muestra como milisegundo_ |
| **aerospike.datacenter.dc_ship_attempts** <br>(gauge) | \[Heredado\] El número de registros que se han intentado enviar, pero que podrían haber resultado en éxito o error. \[Eliminado en 5.0.0\]<br>_Se muestra como registro_ |
| **aerospike.datacenter.dc_ship_bytes** <br>(gauge) | \[Heredado\] El número de bytes enviados para este DC. \[Eliminado en 5.0.0\]<br>_Se muestra como byte_ |
| **aerospike.datacenter.dc_ship_delete_success** <br>(gauge) | \[Heredado\] El número de transacciones de borrado que han sido enviadas con éxito. \[Eliminado en 5.0.0\]<br>_Se muestra como transacción_ |
| **aerospike.datacenter.dc_ship_destination_error** <br>(gauge) | \[Heredado\] El número de errores del clústeres remotos durante el envío de registros para este DC. \[Eliminado en 5.0.0\]<br>_Se muestra como error_ |
| **aerospike.datacenter.dc_ship_idle_avg** <br>(gauge) | \[Heredado\] El número medio de ms de reposo para cada registro que se envía. \[Eliminado en 5.0.0\]<br>_Se muestra como milisegundo_ |
| **aerospike.datacenter.dc_ship_idle_avg_pct** <br>(gauge) | \[Heredado\] La representación en porcentaje del tiempo total empleado para dc_ship_idle_avg. \[Eliminado en 5.0.0\]<br>_Se muestra en porcentaje_ |
| **aerospike.datacenter.dc_ship_inflight_objects** <br>(gauge) | \[Heredado\] El número de registros que están en tránsito (que han sido enviados pero para los que aún no se ha recibido una respuesta del DC remoto). \[Eliminado en 5.0.0\]<br>_Se muestra como registro_ |
| **aerospike.datacenter.dc_ship_latency_avg** <br>(gauge) | \[Heredado\] La media móvil de latencia de envío para el DC específico. \[Eliminado en 5.0.0\]|
| **aerospike.datacenter.dc_ship_source_error** <br>(gauge) | \[Heredado\] Número de errores de capa de cliente durante el envío de registros para este DC. \[Eliminado en 5.0.0\]<br>_Se muestra como error_ |
| **aerospike.datacenter.dc_ship_success** <br>(gauge) | \[Heredado\] El número de registros que han sido enviados con éxito. \[Eliminado en 5.0.0\]<br>_Se muestra como registro_ |
| **aerospike.datacenter.dc_size** <br>(gauge) | \[Heredado\] Tamaño del clúster del DC de destino. \[Eliminado en 5.0.0\]|
| **aerospike.datacenter.dc_state** <br>(gauge) | \[Heredado\] El estado del DC. \[Eliminado en 5.0.0\]|
| **aerospike.datacenter.dc_timelag** <br>(gauge) | \[Heredado\] El tiempo de retraso para este DC específico. \[Eliminado en 5.0.0\]|
| **aerospike.delete_queue** <br>(gauge) | \[Heredado\]|
| **aerospike.demarshal_error** <br>(gauge) | \[Heredado\] El número de errores durante el paso demarshal.|
| **aerospike.dlog_free_pct** <br>(gauge) | \[Heredado\] El porcentaje del resumen de log libre y disponible para su uso.<br>_Se muestra como porcentaje_ |
| **aerospike.dlog_logged** <br>(gauge) | \[Heredado\] El número de registros ingresados en el resumen de log.<br>_Se muestra como registro_ |
| **aerospike.dlog_overwritten_error** <br>(gauge) | \[Heredado\] Número de entradas del resumen de log que se han sobrescrito.<br>_Se muestra como registro_ |
| **aerospike.dlog_processed_link_down** <br>(gauge) | \[Heredado\] El número de enlaces que se procesaron.|
| **aerospike.dlog_processed_main** <br>(gauge) | \[Heredado\] El número de registros procesados en el servidor local de Aerospike.|
| **aerospike.dlog_processed_replica** <br>(gauge) | \[Heredado\] Número de registros procesados para un nodo en el clúster que no es el nodo local.|
| **aerospike.dlog_relogged** <br>(gauge) | \[Heredado\] El número de registros reingresados por este nodo en el resumen de log debido a problemas temporales al intentar el envío.<br>_Se muestra como registro_ |
| **aerospike.dlog_used_objects** <br>(gauge) | \[Heredado\] El número total de ranuras de registros utilizadas en el resumen de log<br> _Se muestra como registro_ |
| **aerospike.early_tsvc_batch_sub_error** <br>(gauge) | \[Heredado\] El número de errores al principio de la transacción para las subtransacciones por lotes.|
| **aerospike.early_tsvc_client_error** <br>(gauge) | \[Heredado\] El número de errores al principio de la transacción para solicitudes directas de clientes.|
| **aerospike.early_tsvc_from_proxy_batch_sub_error** <br>(gauge) | \[Heredado\] El número de errores al principio de la transacción para subtransacciones por lotes enviadas por proxy desde otro nodo.<br>_Se muestra como error_ |
| **aerospike.early_tsvc_from_proxy_error** <br>(gauge) | \[Heredado\] Número de errores al principio de la transacción para transacciones (que no sean subtransacciones por lotes) enviadas por proxy desde otro nodo.<br>_Se muestra como error_ |
| **aerospike.early_tsvc_ops_sub_error** <br>(gauge) | \[Heredado\] El número de errores tempranos en una subtransacción ops interna (ops scan/query).<br>_Se muestra como error_ |
| **aerospike.early_tsvc_udf_sub_error** <br>(gauge) | \[Heredado\] El número de errores al principio de la transacción para las subtransacciones udf.|
| **aerospike.err_duplicate_proxy_request** <br>(gauge) | \[Heredado\] El número de errores de proxy duplicado. Obsoleto desde 3.9|
| **aerospike.err_out_of_space** <br>(gauge) | \[Heredado\] El número de escrituras que resultan en errores de disco sin espacio. Obsoleto desde 3.9|
| **aerospike.err_recs_dropped** <br>(gauge) | \[Heredado\]|
| **aerospike.err_replica_non_null_node** <br>(gauge) | \[Heredado\] El número de errores durante el intercambio de estado del clúster debido a información inesperada del nodo réplica. Obsoleto desde 3.9|
| **aerospike.err_replica_null_node** <br>(gauge) | \[Heredado\] El número de errores durante el intercambio de estado del clúster debido a la falta de información del nodo réplica. Obsoleto desde 3.9|
| **aerospike.err_rw_cant_put_unique** <br>(gauge) | \[Heredado\] El número de transacciones de escritura abortadas porque la escritura requerida era única y el registro ya existía. Obsoleto desde 3.9|
| **aerospike.err_rw_pending_limit** <br>(gauge) | \[Heredado\] El número de transacciones de lectura/escritura fallidas en 'claves activas'. Obsoleto desde 3.9|
| **aerospike.err_rw_request_not_found** <br>(gauge) | \[Heredado\] El número de transacciones de lectura/escritura iniciadas, pero que no pudieron encontrar el registro en el hash rw después de que se procesara el lado de réplica de la transacción (debido al tiempo de espera que eliminaría el registro del hash rw). Obsoleto en 3.9|
| **aerospike.err_storage_queue_full** <br>(gauge) | \[Heredado\] El número de solicitudes de no-lectura fallidas debido a que el disco está demasiado cargado. Devolverá el error 'DEVICE_OVERLOAD' al cliente. Ver también storage_max_write_cache. Obsoleto desde 3.9|
| **aerospike.err_sync_copy_null_master** <br>(gauge) | \[Heredado\] El número de errores durante el intercambio de estado del clúster debido a la falta de información del nodo maestro. Obsoleto desde 3.9|
| **aerospike.err_sync_copy_null_node** <br>(gauge) | \[Heredado\] El número de errores durante el intercambio de estado del clúster debido a la falta de información general del nodo. Obsoleto desde 3.9|
| **aerospike.err_tsvc_requests** <br>(gauge) | \[Heredado\] El número de fallos en los que ni siquiera se intenta la ejecución. Obsoleto desde 3.9|
| **aerospike.err_tsvc_requests_timeout** <br>(gauge) | \[Heredado\] El número de fallos en los que la ejecución se agota mientras está en la cola de transacciones. Obsoleto desde 3.9|
| **aerospike.err_write_fail_bin_exists** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura que resultan en el error 'bin exists'.  Obsoleto desde 3.9|
| **aerospike.err_write_fail_bin_name** <br>(gauge) | \[Heredado\] Número de solicitudes de escritura que han dado lugar al error 'bin name'. Obsoleto desde 3.9|
| **aerospike.err_write_fail_bin_not_found** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura que resultan en el error 'bin not found'. Obsoleto desde 3.9|
| **aerospike.err_write_fail_forbidden** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura fallidas porque se está intentando una transacción de escritura en un conjunto que todavía se está borrando. Obsoleto desde 3.9|
| **aerospike.err_write_fail_generation** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura fallidas debido a un desajuste de generación. Obsoleto desde 3.9|
| **aerospike.err_write_fail_generation_xdr** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura de XDR que fallaron debido a un desajuste de generación. Obsoleto desde 3.8.1|
| **aerospike.err_write_fail_incompatible_type** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura que no son un entero. Obsoleto desde 3.9|
| **aerospike.err_write_fail_key_exists** <br>(gauge) | \[Heredado\] El número de transacciones de escritura que fallaron porque la clave ya existe. Obsoleto desde 3.9|
| **aerospike.err_write_fail_key_mismatch** <br>(gauge) | \[Heredado\] El número de solicitudes fallidas debido a la falta de coincidencia de claves se produce cuando la clave se almacena en Aerospike y se solicita el check de claves en la transacción. Obsoleto desde 3.9|
| **aerospike.err_write_fail_not_found** <br>(gauge) | \[Heredado\] El número de transacciones de escritura que fallaron debido a que no se encontró la clave. Obsoleto desde 3.9|
| **aerospike.err_write_fail_noxdr** <br>(gauge) | \[Heredado\] El número de escrituras rechazadas porque XDR no se estaba ejecutando. Obsoleto desde 3.8.1|
| **aerospike.err_write_fail_parameter** <br>(gauge) | \[Heredado\] El número de transacciones de escritura que fallaron debido a un parámetro erróneo del código de la aplicación. Obsoleto desde 3.9|
| **aerospike.err_write_fail_prole_delete** <br>(gauge) | \[Heredado\] El número de fallos de borrado de réplica porque no se encuentra el registro de réplica. Obsoleto desde 3.9|
| **aerospike.err_write_fail_prole_generation** <br>(gauge) | \[Heredado\] El número de fallos de escritura prole debido a la falta de coincidencia de generación. Obsoleto desde 3.9|
| **aerospike.err_write_fail_prole_unknown** <br>(gauge) | \[Heredado\] El número de fallos de escritura prole con errores desconocidos. Obsoleto desde 3.9|
| **aerospike.err_write_fail_record_too_big** <br>(gauge) | \[Heredado\] El número de fallos de escritura debido a que el registro es demasiado grande (mayor que el tamaño del bloque de escritura). Obsoleto desde 3.9|
| **aerospike.err_write_fail_unknown** <br>(gauge) | \[Heredado\] El número de fallos de escritura con errores desconocidos. Obsoleto desde 3.9|
| **aerospike.fabric_bulk_recv_rate** <br>(gauge) | \[Heredado\] El número de bytes recibidos por el canal masivo del tejido<br>_Se muestra como byte_ |
| **aerospike.fabric_bulk_send_rate** <br>(gauge) | \[Heredado\] El número de bytes enviados por el canal masivo del tejido<br>_Se muestra como byte_ |
| **aerospike.fabric_connections** <br>(gauge) | \[Heredado\] El número de conexiones de tejido activas a este nodo.|
| **aerospike.fabric_ctrl_recv_rate** <br>(gauge) | \[Heredado\] El número de bytes recibidos por el canal de control del tejido<br>_Se muestra como byte_ |
| **aerospike.fabric_ctrl_send_rate** <br>(gauge) | \[Heredado\] El número de bytes enviados por el canal de control del tejido<br>_Se muestra como byte_ |
| **aerospike.fabric_meta_recv_rate** <br>(gauge) | \[Heredado\] El número de bytes recibidos por el meta canal del tejido<br>_Se muestra como byte_ |
| **aerospike.fabric_meta_send_rate** <br>(gauge) | \[Heredado\] El número de bytes enviados por el meta canal del tejido<br>_Se muestra como byte_ |
| **aerospike.fabric_msgs_rcvd** <br>(gauge) | \[Heredado\] El número de mensajes recibidos a través de la capa de tejido de otros nodos. Obsoleto desde 3.11.1.1|
| **aerospike.fabric_msgs_sent** <br>(gauge) | \[Heredado\] El número de mensajes enviados a través de la capa de tejido a otros nodos. Obsoleto desde 3.11.1.1|
| **aerospike.fabric_rw_recv_rate** <br>(gauge) | \[Heredado\] El número de bytes recibidos por el canal rw del tejido<br>_Se muestra como byte_ |
| **aerospike.fabric_rw_send_rate** <br>(gauge) | \[Heredado\] El número de bytes enviados por el canal rw del tejido<br>_Se muestra como byte_ |
| **aerospike.failed_node_sessions_pending** <br>(gauge) | \[Heredado\]|
| **aerospike.free_dlog_pct** <br>(gauge) | \[Heredado\] El porcentaje del resumen de log libre y disponible para su uso. Obsoleto desde 3.9<br>_Se muestra como porcentaje_ |
| **aerospike.free_pct_disk** <br>(gauge) | \[Heredado\] El porcentaje de capacidad de disco libre para este espacio de nombres. Obsoleto desde 3.9.<br>_Se muestra como porcentaje_ |
| **aerospike.free_pct_memory** <br>(gauge) | \[Heredado\] El porcentaje de capacidad de memoria libre para este espacio de nombres. Obsoleto desde 3.9.<br>_Se muestra como porcentaje_ |
| **aerospike.heap_active_kbytes** <br>(gauge) | \[Heredado\] Cantidad de memoria en páginas en uso. Una página en uso es una página que tiene alguna memoria asignada (parcial o completa).<br>_Se muestra como kibibyte_ |
| **aerospike.heap_allocated_kbytes** <br>(gauge) | \[Heredado\] La cantidad de memoria asignada por el daemon asd<br>_Se muestra como kibibyte_ |
| **aerospike.heap_efficiency_pct** <br>(gauge) | \[Heredado\] La relación entre heap_allocated_kbytes y heap_mapped_kbytes. Un número menor indica una mayor tasa de fragmentación.<br>_Se muestra como porcentaje_ |
| **aerospike.heap_mapped_kbytes** <br>(gauge) | \[Heredado\] La cantidad de memoria en páginas asignadas (es decir, la cantidad de memoria que JEM recibió del kernel Linux). Debe ser múltiplo de 4, ya que ese sería el tamaño típico de página (4096 bytes).<br>_Se muestra como kibibyte_ |
| **aerospike.heap_site_count** <br>(gauge) | \[Heredado\]|
| **aerospike.heartbeat_connections** <br>(gauge) | \[Heredado\] El número de conexiones de latido activas a este nodo.|
| **aerospike.heartbeat_received_foreign** <br>(gauge) | \[Heredado\] Número total de latidos recibidos de nodos remotos.|
| **aerospike.heartbeat_received_self** <br>(gauge) | \[Heredado\] El número total de latidos de multidifusión de este nodo recibidos por este nodo. Será 0 para la malla.|
| **aerospike.hotkeys_fetched** <br>(gauge) | \[Heredado\] El número de resumen de registros que se envían realmente porque sus entradas de caché de claves activas caducaron y estaban sucias. Debe interpretarse junto con noship_recs_hotkey|
| **aerospike.index_used_bytes_memory** <br>(gauge) | \[Heredado\] La cantidad de memoria ocupada por el índice. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.info_complete** <br>(gauge) | \[Heredado\] El número de solicitudes de información completadas.|
| **aerospike.info_queue** <br>(gauge) | \[Heredado\] Número de solicitudes de información pendientes en la cola de información|
| **aerospike.latency_avg_dlogread** <br>(gauge) | \[Heredado\] La latencia media móvil para leer del resumen de log. Obsoleto desde 3.9<br>_Se muestra como milisegundo_ |
| **aerospike.latency_avg_dlogwrite** <br>(gauge) | \[Heredado\] La latencia media móvil para escribir en el resumen de log. Obsoleto desde 3.9<br>_Se muestra como milisegundo_ |
| **aerospike.latency_avg_ship** <br>(gauge) | \[Heredado\] La latencia media móvil para enviar un registro a clústeres remotos de Aerospike. Obsoleto desde 3.9<br>_Se muestra como milisegundo_ |
| **aerospike.linkdown_sessions_pending** <br>(gauge) | \[Heredado\]|
| **aerospike.local_recs_error** <br>(gauge) | \[Heredado\] El número de registros fallidos obtenidos del servidor local de Aerospike. Obsoleto desde 3.9|
| **aerospike.local_recs_fetch_avg_latency** <br>(gauge) | \[Heredado\] La latencia media móvil para leer un registro/lote de registros del servidor local de Aerospike. Obsoleto desde 3.9<br>_Se muestra como milisegundo_ |
| **aerospike.local_recs_fetched** <br>(gauge) | \[Heredado\] El número de registros obtenidos del servidor local de Aerospike. Obsoleto desde 3.9|
| **aerospike.local_recs_notfound** <br>(gauge) | \[Heredado\] El número de intentos de búsqueda de registros en el servidor local de Aerospike que resultaron en un código de respuesta 'No Encontrado'. Obsoleto desde 3.9|
| **aerospike.migrate_allowed** <br>(gauge) | \[Heredado\]|
| **aerospike.migrate_msgs_recv** <br>(gauge) | \[Heredado\] El número de mensajes de migración recibidos. Obsoleto desde 3.8.3|
| **aerospike.migrate_msgs_sent** <br>(gauge) | \[Heredado\] El número de mensajes de migración enviados. Obsoleto desde 3.8.3|
| **aerospike.migrate_num_incoming_accepted** <br>(gauge) | \[Heredado\] Número de solicitudes de migración aceptadas de otros nodos Obsoleto desde 3.8.3.|
| **aerospike.migrate_num_incoming_refused** <br>(gauge) | \[Heredado\] El número de solicitudes de migración rechazadas desde otros nodos debido a que se ha alcanzado el límite 'migrate-max-num-incoming'. Obsoleto desde 3.8.3|
| **aerospike.migrate_partitions_remaining** <br>(gauge) | \[Heredado\] El número de particiones restantes para migrar en cualquier dirección.|
| **aerospike.migrate_progress_recv** <br>(gauge) | \[Heredado\] El número de particiones que se están recibiendo actualmente en este nodo. Obsoleto desde 3.9|
| **aerospike.migrate_progress_send** <br>(gauge) | \[Heredado\] El número de particiones que se están enviando actualmente desde este nodo. Obsoleto desde 3.9|
| **aerospike.migrate_rx_objs** <br>(gauge) | \[Heredado\] El número de particiones que están migrando actualmente a este nodo. Obsoleto desde 3.9|
| **aerospike.migrate_tx_objs** <br>(gauge) | \[Heredado\] El número de particiones que están migrando actualmente desde este nodo. Obsoleto desde 3.9|
| **aerospike.namespace.allow_nonxdr_writes** <br>(gauge) | \[Heredado\] Un parámetro para controlar las escrituras realizadas por un cliente no XDR.|
| **aerospike.namespace.allow_xdr_writes** <br>(gauge) | \[Heredado\] Un parámetro para controlar si se aceptan transacciones de escritura originadas por un cliente XDR.|
| **aerospike.namespace.appeals_records_exonerated** <br>(gauge) | \[Heredado\] El número de registros que fueron marcados como replicados como resultado de una apelación. Las apelaciones de partición ocurrirán para los espacios de nombres que operen bajo el modo de coherencia fuerte cuando un nodo necesite validar los registros que tiene al unirse al clúster.<br>_Se muestra como registro_ |
| **aerospike.namespace.appeals_rx_active** <br>(gauge) | \[Heredado\] El número de apelaciones de partición que se están recibiendo actualmente. Las apelaciones de partición ocurrirán para los espacios de nombres que operan bajo el modo de coherencia fuerte cuando un nodo necesite validar los registros que tiene al unirse al clúster.|
| **aerospike.namespace.appeals_tx_active** <br>(gauge) | \[Heredado\] El número de apelaciones de partición aún no enviadas. Las apelaciones de partición ocurrirán para los espacios de nombres que operan bajo el modo de coherencia fuerte cuando un nodo necesite validar los registros que tiene al unirse al clúster.|
| **aerospike.namespace.appeals_tx_remaining** <br>(gauge) | \[Heredado\] El número de apelaciones de partición que se están enviando actualmente.|
| **aerospike.namespace.available_bin_names** <br>(gauge) | \[Heredado\] El número restante de contenedores únicos que el usuario puede crear para este espacio de nombres.|
| **aerospike.namespace.available_pct** <br>(gauge) | \[Heredado\] El mínimo espacio contiguo en disco para todos los discos en un espacio de nombres. Obsoleto desde 3.9<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.background_scan_max_rps** <br>(gauge) | \[Heredado\] El máximo de registros por segundo (rps) permitidos para un escaneo en segundo plano (es decir, escaneo UDF u ops).|
| **aerospike.namespace.batch_sub_proxy_complete** <br>(gauge) | \[Heredado\] El número de subtransacciones batch-index por proxy que se han completado.|
| **aerospike.namespace.batch_sub_proxy_error** <br>(gauge) | \[Heredado\] El número de subtransacciones batch-index por proxy que fallaron con un error.|
| **aerospike.namespace.batch_sub_proxy_timeout** <br>(gauge) | \[Heredado\] El número de subtransacciones batch-index por proxy que han expirado.|
| **aerospike.namespace.batch_sub_read_error** <br>(gauge) | \[Heredado\] Número de subtransacciones de lectura batch-index que fallaron con un error.|
| **aerospike.namespace.batch_sub_read_filtered_out** <br>(gauge) | \[Heredado\] Número de subtransacciones de lectura batch-index que no se produjeron porque el registro se filtró mediante una expresión de predicado<br>_Se muestra como transacción_ |
| **aerospike.namespace.batch_sub_read_not_found** <br>(gauge) | \[Heredado\] Número de subtransacciones de lectura batch-index que han resultado no encontradas.|
| **aerospike.namespace.batch_sub_read_success** <br>(gauge) | \[Heredado\] Número de subtransacciones de lectura batch-index realizadas con éxito.|
| **aerospike.namespace.batch_sub_read_timeout** <br>(gauge) | \[Heredado\] Número de subtransacciones de lectura batch-index que han expirado.|
| **aerospike.namespace.batch_sub_tsvc_error** <br>(gauge) | \[Heredado\] El número de subtransacciones de lectura batch-index que fallaron con un error en el servicio de transacciones antes de intentar gestionar la transacción.|
| **aerospike.namespace.batch_sub_tsvc_timeout** <br>(gauge) | \[Heredado\] El número de subtransacciones de lectura batch-index que expiraron en el servicio de transacciones antes de intentar gestionar la transacción.|
| **aerospike.namespace.cache_read_pct** <br>(gauge) | \[Heredado\] Porcentaje de transacciones de lectura que llegan a la cola de post-escritura y guardarán un io en el dispositivo de almacenamiento subyacente. Obsoleto desde 3.9<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.client_delete_error** <br>(gauge) | \[Heredado\] El número de transacciones de borrado de clientes que fallaron con un error.|
| **aerospike.namespace.client_delete_error.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] El número de transacciones de eliminación de clientes que fallaron con un error.|
| **aerospike.namespace.client_delete_filtered_out** <br>(gauge) | \[Heredado\] Número de transacciones de eliminación de clientes que no se han producido porque el registro se ha filtrado mediante una expresión de predicado.<br>_Se muestra como transacción_ |
| **aerospike.namespace.client_delete_not_found** <br>(gauge) | \[Heredado\] El número de transacciones de borrado de clientes que resultaron en un error "no encontrado".|
| **aerospike.namespace.client_delete_success** <br>(gauge) | \[Heredado\] Número de transacciones de borrado de clientes realizadas con éxito.|
| **aerospike.namespace.client_delete_timeout** <br>(gauge) | \[Heredado\] El número de transacciones de borrado de clientes que han expirado.|
| **aerospike.namespace.client_lang_delete_success** <br>(gauge) | \[Heredado\] Número de transacciones udf iniciadas por el cliente que han eliminado correctamente un registro.|
| **aerospike.namespace.client_lang_error** <br>(gauge) | \[Heredado\] El número de transacciones udf iniciadas por el cliente que fallaron con un error.|
| **aerospike.namespace.client_lang_read_success** <br>(gauge) | \[Heredado\] Número de transacciones de lectura udf iniciadas con éxito por el cliente.|
| **aerospike.namespace.client_lang_write_success** <br>(gauge) | \[Heredado\] Número de transacciones de escritura udf iniciadas con éxito por el cliente.|
| **aerospike.namespace.client_proxy_complete** <br>(gauge) | \[Heredado\] Número de transacciones proxy completadas iniciadas por una solicitud de cliente.|
| **aerospike.namespace.client_proxy_error** <br>(gauge) | \[Heredado\] El número de transacciones proxy iniciadas por una solicitud de cliente que falló con un error.|
| **aerospike.namespace.client_proxy_timeout** <br>(gauge) | \[Heredado\] El número de transacciones proxy iniciadas por una solicitud de cliente que ha expirado.|
| **aerospike.namespace.client_read_error** <br>(gauge) | \[Heredado\] El número de errores de transacción de lectura del cliente.|
| **aerospike.namespace.client_read_error.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] El número de errores de transacción de lectura del cliente.|
| **aerospike.namespace.client_read_filtered_out** <br>(gauge) | \[Heredado\] Número de transacciones de lectura del cliente que no se produjeron porque el registro se filtró mediante una expresión de predicado.<br>_Se muestra como transacción_ |
| **aerospike.namespace.client_read_filtered_out.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] El número de transacciones de lectura del cliente filtradas.|
| **aerospike.namespace.client_read_not_found** <br>(gauge) | \[Heredado\] El número de transacciones de lectura del cliente que resultaron en un error "no encontrado".|
| **aerospike.namespace.client_read_not_found.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] No se ha encontrado el número de transacciones de lectura del cliente.|
| **aerospike.namespace.client_read_success** <br>(gauge) | \[Heredado\] Número de transacciones de lectura de clientes realizadas con éxito.|
| **aerospike.namespace.client_read_success.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] El número de éxitos de transacciones de lectura del cliente.|
| **aerospike.namespace.client_read_timeout** <br>(gauge) | \[Heredado\] El número de transacciones de lectura del cliente que han expirado.|
| **aerospike.namespace.client_read_timeout.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] El número de tiempo de espera de transacciones de lectura del cliente.|
| **aerospike.namespace.client_tsvc_error** <br>(gauge) | \[Heredado\] El número de transacciones de clientes que fallaron en el servicio de transacciones antes de intentar manejar la transacción. |
| **aerospike.namespace.client_tsvc_timeout** <br>(gauge) | \[Heredado\] El número de transacciones de clientes que expiraron mientras estaban en el servicio de transacciones antes de intentar gestionar la transacción.|
| **aerospike.namespace.client_udf_complete** <br>(gauge) | \[Heredado\] El número de transacciones udf completadas iniciadas por el cliente.|
| **aerospike.namespace.client_udf_error** <br>(gauge) | \[Heredado\] El número de transacciones udf fallidas iniciadas por el cliente.|
| **aerospike.namespace.client_udf_error.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] El número de transacciones udf fallidas iniciadas por el cliente.|
| **aerospike.namespace.client_udf_filtered_out** <br>(gauge) | \[Heredado\] Número de transacciones udf de cliente que no se han producido porque el registro se ha filtrado mediante una expresión de predicado.<br>_Se muestra como transacción_ |
| **aerospike.namespace.client_udf_timeout** <br>(gauge) | \[Heredado\] Número de transacciones udf iniciadas por el cliente que han expirado.|
| **aerospike.namespace.client_write_error** <br>(gauge) | \[Heredado\] El número de transacciones de escritura del cliente que fallaron con un error.|
| **aerospike.namespace.client_write_error.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] El número de transacciones de escritura del cliente que fallaron con un error.|
| **aerospike.namespace.client_write_filtered_out** <br>(gauge) | \[Heredado\] Número de transacciones de escritura del cliente que no se produjeron porque el registro se filtró mediante una expresión de predicado.<br>_Se muestra como transacción_ |
| **aerospike.namespace.client_write_filtered_out.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] El número de transacciones de escritura del cliente que se filtraron.|
| **aerospike.namespace.client_write_success** <br>(gauge) | \[Heredado\] Número de transacciones de escritura de clientes realizadas con éxito.|
| **aerospike.namespace.client_write_success.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] El número de transacciones de escritura del cliente que tuvieron éxito.|
| **aerospike.namespace.client_write_timeout** <br>(gauge) | \[Heredado\] El número de transacciones de escritura del cliente que expiraron.|
| **aerospike.namespace.client_write_timeout.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] El número de transacciones de escritura del cliente que expiraron.|
| **aerospike.namespace.clock_skew_stop_writes** <br>(gauge) | \[Heredado y OpenMetricsV2 y Aerospike v4.0+\] Esto será cierto si la desviación del reloj está fuera de la tolerancia para la coherencia fuerte.|
| **aerospike.namespace.current_time** <br>(gauge) | \[Heredado\] La hora actual representada como hora de época de Aerospike.|
| **aerospike.namespace.data_in_index** <br>(gauge) | \[Heredado\] La optimización en caso de bin único, solo permitirá enteros o flotantes almacenados en el espacio de índice.|
| **aerospike.namespace.data_used_bytes_memory** <br>(gauge) | \[Heredado\] La cantidad de memoria ocupada por los datos. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.namespace.dead_partitions** <br>(gauge) | \[Heredado y OpenMetricsV2 y Aerospike v4.0+\] El número de particiones inactivas para este espacio de nombres (cuando se usa coherencia fuerte). Este es el número de particiones que no están disponibles cuando todos los nodos de la lista están presentes.|
| **aerospike.namespace.default_ttl** <br>(gauge) | \[Heredado\] Tiempo de vida por defecto (en segundos) de un registro desde el momento de su creación o última actualización.|
| **aerospike.namespace.deleted_last_bin** <br>(gauge) | \[Heredado\] El número de objetos eliminados porque su último contenedor fue eliminado.<br>_Se muestra como objeto_ |
| **aerospike.namespace.device_available_pct** <br>(gauge) | \[Heredado y OpenMetricsV2 y Aerospike v3.9+\] El espacio de disco contiguo mínimo para todos los discos en un espacio de nombres.|
| **aerospike.namespace.device_compression_ratio** <br>(gauge) | \[Heredado\] Relación media entre el tamaño comprimido y el tamaño sin comprimir.|
| **aerospike.namespace.device_free_pct** <br>(gauge) | \[Heredado\] Porcentaje de capacidad de disco libre para este espacio de nombre. Es la cantidad de almacenamiento libre en todos los dispositivos del espacio de nombres.<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.device_total_bytes** <br>(gauge) | \[Heredado\] El total de bytes de espacio en disco asignado a este espacio de nombre en este nodo.<br>_Se muestra como byte_ |
| **aerospike.namespace.device_used_bytes** <br>(gauge) | \[Heredado\] El total de bytes de espacio en disco utilizado por este espacio de nombre en este nodo.<br>_Se muestra como byte_ |
| **aerospike.namespace.disable_cold_start_eviction** <br>(gauge) | \[Heredado\] Si es true, deshabilita el desalojo que puede ocurrir en el arranque en frío solo para este espacio de nombres.|
| **aerospike.namespace.disable_write_dup_res** <br>(gauge) | \[Heredado\] Esto desactiva la resolución de duplicados de escritura para el espacio de nombres.|
| **aerospike.namespace.disallow_null_setname** <br>(gauge) | \[Heredado\] Al activar esta configuración, se producirá un error al intentar escribir un registro si no se establece un nombre.|
| **aerospike.namespace.effective_is_quiesced** <br>(gauge) | \[Heredado\] Esto informa true cuando el espacio de nombres se ha reequilibrado después de recibir previamente una solicitud de información quiesce.|
| **aerospike.namespace.effective_prefer_uniform_balance** <br>(gauge) | \[Heredado\] Si Aerospike aplicó el algoritmo de balance uniforme para el estado actual del clúster, el valor devuelto será verdadero.|
| **aerospike.namespace.effective_replication_factor** <br>(gauge) | \[Heredado\] El factor de replicación efectivo para el espacio de nombres.|
| **aerospike.namespace.enable_benchmarks_batch_sub** <br>(gauge) | \[Heredado\] Habilita los histogramas para las subtransacciones por lotes.|
| **aerospike.namespace.enable_benchmarks_ops_sub** <br>(gauge) | \[Heredado\] Habilita los histogramas para las subtransacciones de operaciones.|
| **aerospike.namespace.enable_benchmarks_read** <br>(gauge) | \[Heredado\] Activa los histogramas para las transacciones de lectura.|
| **aerospike.namespace.enable_benchmarks_storage** <br>(gauge) | \[Heredado\] Habilita los histogramas para el acceso al almacenamiento.|
| **aerospike.namespace.enable_benchmarks_udf** <br>(gauge) | \[Heredado\] Habilita los histogramas para las transacciones udf.|
| **aerospike.namespace.enable_benchmarks_udf_sub** <br>(gauge) | \[Heredado\] Habilita los histogramas para las subtransacciones udf.|
| **aerospike.namespace.enable_benchmarks_write** <br>(gauge) | \[Heredado\] Habilita los histogramas para las transacciones de escritura.|
| **aerospike.namespace.enable_hist_proxy** <br>(gauge) | \[Heredado\] Habilita los histogramas para las transacciones proxy.|
| **aerospike.namespace.enable_xdr** <br>(gauge) | \[Heredado\] Esto controla, a nivel de espacio de nombres, si las entradas del resumen de log se escriben en el resumen de log.|
| **aerospike.namespace.evict_hist_buckets** <br>(gauge) | \[Heredado\] El número de buckets de histograma utilizados para los desalojos.|
| **aerospike.namespace.evict_tenths_pct** <br>(gauge) | \[Heredado\] Porcentaje máximo de 1/10 de objetos a eliminar en cada iteración de desalojo.|
| **aerospike.namespace.evict_ttl** <br>(gauge) | \[Heredado\] La profundidad de desalojo actual o el ttl más alto de registros que han sido desalojados.|
| **aerospike.namespace.evict_void_time** <br>(gauge) | \[Heredado\] La profundidad de desalojo actual, expresada como tiempo de vacío en segundos desde el 1 de enero de 2010 UTC.<br>_Se muestra como segundo_ |
| **aerospike.namespace.evicted_objects** <br>(gauge) | \[Heredado\] El número de objetos desalojados de este espacio de nombres en este nodo desde que se inició el servidor. Obsoleto desde 3.9|
| **aerospike.namespace.expired_objects** <br>(gauge) | \[Heredado\] El número de objetos caducados de este espacio de nombres en este nodo desde que se inició el servidor. Obsoleto desde 3.9|
| **aerospike.namespace.fail_generation** <br>(gauge) | \[Heredado\] El número de transacciones de lectura/escritura fallidas en el check de generación.|
| **aerospike.namespace.fail_key_busy** <br>(gauge) | \[Heredado\] El número de transacciones de lectura/escritura fallidas en 'claves activas'. |
| **aerospike.namespace.fail_record_too_big** <br>(gauge) | \[Heredado\] El número de transacciones de lectura/escritura falló debido a un registro demasiado grande (por encima del límite de tamaño del bloque de escritura).|
| **aerospike.namespace.fail_xdr_forbidden** <br>(gauge) | \[Heredado\] El número de transacciones de lectura/escritura fallidas debido a una restricción de configuración.|
| **aerospike.namespace.free_pct_disk** <br>(gauge) | \[Heredado\] El porcentaje de capacidad de disco libre para este espacio de nombres. Obsoleto desde 3.9<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.free_pct_memory** <br>(gauge) | \[Heredado\] El porcentaje de capacidad de memoria libre para este espacio de nombres. Obsoleto desde 3.9<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.from_proxy_batch_sub_read_error** <br>(gauge) | \[Heredado\] El número de subtransacciones de lectura batch-index por proxy desde otro nodo que fallaron con un error.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_batch_sub_read_filtered_out** <br>(gauge) | \[Heredado\] Número de subtransacciones de lectura batch-index por proxy desde otro nodo que no se produjeron porque el registro se filtró mediante una expresión de predicado.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_batch_sub_read_not_found** <br>(gauge) | \[Heredado\] Número de subtransacciones de lectura batch-index por proxy desde otro nodo que resultaron no encontradas.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_batch_sub_read_success** <br>(gauge) | \[Heredado\] Número de registros leídos con éxito por subtransacciones batch-index por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_batch_sub_read_timeout** <br>(gauge) | \[Heredado\] Número de subtransacciones de lectura batch-index por proxy desde otro nodo que han expirado.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_batch_sub_tsvc_error** <br>(gauge) | \[Heredado\] Número de subtransacciones de lectura batch-index por proxy desde otro nodo que fallaron con un error en el servicio de transacciones, antes de intentar gestionar la transacción.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_batch_sub_tsvc_timeout** <br>(gauge) | \[Heredado\] Número de subtransacciones de lectura batch-index por proxy desde otro nodo que expiraron en el servicio de transacciones, antes de intentar gestionar la transacción.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_delete_error** <br>(gauge) | \[Heredado\] El número de errores para las transacciones de borrado por proxy desde otro nodo. Esto incluye xdr_from_proxy_delete_error.<br>_Se muestra como error_ |
| **aerospike.namespace.from_proxy_delete_filtered_out** <br>(gauge) | \[Heredado\] El número de transacciones de borrado por proxy desde otro nodo que no se produjeron porque el registro se filtró mediante una expresión de predicado.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_delete_not_found** <br>(gauge) | \[Heredado\] El número de transacciones de borrado por proxy desde otro nodo que resultaron no encontradas. Esto incluye xdr_from_proxy_delete_not_found.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_delete_success** <br>(gauge) | \[Heredado\] El número de transacciones de borrado exitosas por proxy desde otro nodo. Esto incluye xdr_from_proxy_delete_success.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_delete_timeout** <br>(gauge) | \[Heredado\] El número de tiempos de espera para las transacciones de borrado por proxy desde otro nodo. Esto incluye xdr_from_proxy_delete_timeout.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_lang_delete_success** <br>(gauge) | \[Heredado\] El número de transacciones exitosas de borrado de udf por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_lang_error** <br>(gauge) | \[Heredado\] El número de errores de lenguaje (Lua) para transacciones udf por proxy desde otro nodo.<br>_Se muestra como error_ |
| **aerospike.namespace.from_proxy_lang_read_success** <br>(gauge) | \[Heredado\] El número de transacciones de lectura udf exitosas por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_lang_write_success** <br>(gauge) | \[Heredado\] El número de transacciones de escritura udf exitosas por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_read_error** <br>(gauge) | \[Heredado\] El número de errores de transacciones de lectura por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_read_filtered_out** <br>(gauge) | \[Heredado\] Número de transacciones de lectura por proxy desde otro nodo que no se produjeron porque el registro se filtró mediante una expresión de predicado.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_read_not_found** <br>(gauge) | \[Heredado\] Número de transacciones de lectura por proxy desde otro nodo que resultaron "no encontradas".<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_read_success** <br>(gauge) | \[Heredado\] Número de transacciones de lectura correctas por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_read_timeout** <br>(gauge) | \[Heredado\] El número de tiempos de espera para las transacciones de lectura por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_tsvc_error** <br>(gauge) | \[Heredado\] Número de transacciones por proxy desde otro nodo que fallaron en el servicio de transacciones, antes de intentar manejar la transacción.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_tsvc_timeout** <br>(gauge) | \[Heredado\] Número de transacciones por proxy desde otro nodo que expiraron mientras estaban en el servicio de transacciones, antes de intentar gestionar la transacción.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_udf_complete** <br>(gauge) | \[Heredado\] El número de transacciones udf exitosas por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_udf_error** <br>(gauge) | \[Heredado\] El número de errores para transacciones udf por proxy de otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_udf_filtered_out** <br>(gauge) | \[Heredado\] Número de transacciones udf por proxy desde otro nodo que no se produjeron porque el registro se filtró mediante una expresión de predicado.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_udf_timeout** <br>(gauge) | \[Heredado\] El número de tiempos de espera para las transacciones udf por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_write_error** <br>(gauge) | \[Heredado\] El número de errores de transacciones de escritura por proxy desde otro nodo. Esto incluye xdr_from_proxy_write_error.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_write_filtered_out** <br>(gauge) | \[Heredado\] Número de transacciones de escritura por proxy desde otro nodo que no se produjeron porque el registro se filtró mediante una expresión de predicado.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_write_success** <br>(gauge) | \[Heredado\] El número de transacciones de escritura exitosas por proxy desde otro nodo. Esto incluye xdr_from_proxy_write_success.<br>_Se muestra como transacción_ |
| **aerospike.namespace.from_proxy_write_timeout** <br>(gauge) | \[Heredado\] El número de tiempos de espera para transacciones de escritura por proxy desde otro nodo. Esto incluye xdr_from_proxy_write_timeout.<br>_Se muestra como transacción_ |
| **aerospike.namespace.geo2dsphere_within.earth_radius_meters** <br>(gauge) | \[Heredado\] Radio de la Tierra en metros, ya que el espacio de trabajo aquí es la Tierra completa.|
| **aerospike.namespace.geo2dsphere_within.level_mod** <br>(gauge) | \[Heredado\] Determina si solo se utilizarán las celdas en las que (level - min-level) sea múltiplo de level-mod (por defecto es 1).|
| **aerospike.namespace.geo2dsphere_within.max_cells** <br>(gauge) | \[Heredado\] El número máximo deseado de celdas en la aproximación. El número máximo de celdas permitido es 256.|
| **aerospike.namespace.geo2dsphere_within.max_level** <br>(gauge) | \[Heredado\] La profundidad máxima a la que puede ir una sola celda.|
| **aerospike.namespace.geo2dsphere_within.min_level** <br>(gauge) | \[Heredado\] La profundidad mínima a la que puede ir una sola celda.|
| **aerospike.namespace.geo2dsphere_within.strict** <br>(gauge) | \[Heredado\] Un check adicional de Aerospike para validar si los puntos devueltos por S2 están dentro de la región de consulta del usuario. Cuando se establece en false, Aerospike no realiza este check adicional y envía los resultados tal cual.|
| **aerospike.namespace.geo_region_query_cells** <br>(gauge) | \[Heredado\]|
| **aerospike.namespace.geo_region_query_falsepos** <br>(gauge) | \[Heredado\]|
| **aerospike.namespace.geo_region_query_points** <br>(gauge) | \[Heredado\]|
| **aerospike.namespace.geo_region_query_reqs** <br>(gauge) | \[Heredado\]|
| **aerospike.namespace.high_water_disk_pct** <br>(gauge) | \[Heredado\] Los datos serán desalojados si la utilización del disco es mayor que este porcentaje especificado.|
| **aerospike.namespace.high_water_memory_pct** <br>(gauge) | \[Heredado\] Los datos serán desalojados si la utilización de memoria es mayor que este porcentaje especificado.|
| **aerospike.namespace.hwm_breached** <br>(gauge) | \[Heredado y OpenMetricsV2 y Aerospike v3.9+\] Si es true, Aerospike ha sobrepasado 'high-water-\[disk/memory\]-pct' para este espacio de nombres. Obsoleto desde 3.9|
| **aerospike.namespace.index_flash_alloc_pct** <br>(gauge) | \[OpenMetricsV2 y Aerospike v5.6+\] Solo se aplica a Enterprise Edition configurado con flash de tipo índice. Porcentaje de montaje(s) asignado(s) para el índice primario utilizado por este espacio de nombres en este nodo.|
| **aerospike.namespace.index_flash_used_bytes** <br>(gauge) | \[Heredado\] El total de bytes en uso en montaje(s) para el índice primario utilizado por este espacio de nombres en este nodo. Solo se aplica a la versión Enterprise configurada con flash de tipo índice.<br>_Se muestra como byte_ |
| **aerospike.namespace.index_flash_used_pct** <br>(gauge) | \[Heredado\] El porcentaje de montaje(s) en uso para el índice primario utilizado por este espacio de nombres en este nodo. Solo se aplica a la versión Enterprise configurada con flash de tipo índice.|
| **aerospike.namespace.index_pmem_used_bytes** <br>(gauge) | \[Heredado\] El total de bytes en uso en montaje(s) para el índice primario utilizado por este espacio de nombres en este nodo. Solo se aplica a la versión Enterprise configurada con el tipo de índice pmem.<br>_Se muestra como byte_ |
| **aerospike.namespace.index_pmem_used_pct** <br>(gauge) | \[Heredado\] El porcentaje de montaje(s) en uso para el índice primario utilizado por este espacio de nombres en este nodo. Solo se aplica a la versión Enterprise configurada con el tipo de índice pmem.|
| **aerospike.namespace.index_stage_size** <br>(gauge) | \[Heredado\] La configuración utilizada para dimensionar la(s) arena(s) del índice primario.|
| **aerospike.namespace.index_used_bytes_memory** <br>(gauge) | \[Heredado\] La cantidad de memoria ocupada por el índice para este espacio de nombres. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.namespace.latency.batch_index** <br>(gauge) | \[Heredado\] La latencia de lote etiquetada por bucket (de 1 a 2^16).<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.batch_index_ops_sec** <br>(gauge) | \[Heredado\] Las operaciones de lectura por lotes por seg.<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.batch_index_over_1ms** <br>(gauge) | \[Heredado\] La latencia de lectura por lotes sobre 1ms.<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.batch_index_over_64ms** <br>(gauge) | \[Heredado\] La latencia de lectura por lotes sobre 64ms.<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.batch_index_over_8ms** <br>(gauge) | \[Heredado\] La latencia de lectura por lotes sobre 8ms.<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.read** <br>(gauge) | \[Heredado\] La latencia de lectura etiquetada por bucket (1 a 2^16).<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.read_ops_sec** <br>(gauge) | \[Heredado\] Las operaciones de lectura por seg.<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.read_over_1ms** <br>(gauge) | \[Heredado\] La latencia de lectura sobre 1ms.<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.read_over_64ms** <br>(gauge) | \[Heredado\] La latencia de lectura sobre 64ms.<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.read_over_8ms** <br>(gauge) | \[Heredado\] La latencia de lectura sobre 8ms.<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.udf** <br>(gauge) | \[Heredado\] La latencia udf etiquetada por bucket (1 a 2^16).<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.write** <br>(gauge) | \[Heredado\] La latencia de escritura etiquetada por bucket (1 a 2^16).<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.write_ops_sec** <br>(gauge) | \[Heredado\] Las operaciones de escritura por seg.<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.write_over_1ms** <br>(gauge) | \[Heredado\] La latencia de escritura sobre 1ms.<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.write_over_64ms** <br>(gauge) | \[Heredado\] La latencia de escritura sobre 64ms.<br>_Se muestra como transacción_ |
| **aerospike.namespace.latency.write_over_8ms** <br>(gauge) | \[Heredado\] La latencia de escritura sobre 8ms.<br>_Se muestra como transacción_ |
| **aerospike.namespace.ldc_gc_rate** <br>(gauge) | \[Heredado\]|
| **aerospike.namespace.ldt_delete_success** <br>(gauge) | \[Heredado\] Número de operaciones de borrado de LDT realizadas con éxito.|
| **aerospike.namespace.ldt_deletes** <br>(gauge) | \[Heredado\] El número de operaciones de borrado de LDT.|
| **aerospike.namespace.ldt_errors** <br>(gauge) | \[Heredado\] El número de errores de LDT.|
| **aerospike.namespace.ldt_read_success** <br>(gauge) | \[Heredado\] Número de operaciones de lectura de LDT realizadas con éxito.|
| **aerospike.namespace.ldt_reads** <br>(gauge) | \[Heredado\] El número de operaciones de lectura de LDT.|
| **aerospike.namespace.ldt_updates** <br>(gauge) | \[Heredado\] El número de operaciones de actualización de LDT.|
| **aerospike.namespace.ldt_write_success** <br>(gauge) | \[Heredado\] Número de operaciones de escritura de LDT realizadas con éxito|
| **aerospike.namespace.ldt_writes** <br>(gauge) | \[Heredado\] El número de operaciones de escritura de LDT.|
| **aerospike.namespace.master_objects** <br>(gauge) | \[Heredado\] El número de registros en este nodo que son maestros activos.|
| **aerospike.namespace.master_sub_objects** <br>(gauge) | \[Heredado\] El número de subregistros de LDT en este nodo que son maestros activos.|
| **aerospike.namespace.master_tombstones** <br>(gauge) | \[Heredado\] El número de lápidas en este nodo que son maestros activos.|
| **aerospike.namespace.max_evicted_ttl** <br>(gauge) | \[Heredado\] El TTL de registro más largo que Aerospike ha desalojado de este espacio de nombres.|
| **aerospike.namespace.max_void_time** <br>(gauge) | \[Heredado\] El TTL máximo de registro insertado alguna vez en este espacio de nombres.|
| **aerospike.namespace.memory_free_pct** <br>(gauge) | \[Heredado y OpenMetricsV2 y Aerospike v3.9+\] El porcentaje de capacidad de memoria libre para este espacio de nombres.<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.memory_size** <br>(gauge) | \[Heredado\] La cantidad máxima de memoria para el espacio de nombres.|
| **aerospike.namespace.memory_used_bytes** <br>(gauge) | \[Heredado y OpenMetrics V2 y Aerospike v3.9+\] El total de bytes de memoria utilizados por este espacio de nombres en este nodo.<br>_Se muestra como byte_ |
| **aerospike.namespace.memory_used_data_bytes** <br>(gauge) | \[Heredado\] La cantidad de memoria ocupada por los datos.<br>_Se muestra como byte_ |
| **aerospike.namespace.memory_used_index_bytes** <br>(gauge) | \[Heredado\] La cantidad de memoria ocupada por el índice para este espacio de nombres.<br>_Se muestra como byte_ |
| **aerospike.namespace.memory_used_sindex_bytes** <br>(gauge) | \[Heredado\] La cantidad de memoria ocupada por índices secundarios para este espacio de nombres en este nodo.<br>_Se muestra como byte_ |
| **aerospike.namespace.migrate_order** <br>(gauge) | \[Heredado\] El número entre 1 y 10 que determina el orden en que deben procesarse los espacios de nombres al migrar.|
| **aerospike.namespace.migrate_record_receives** <br>(gauge) | \[Heredado\] Número de solicitudes de inserción de registros recibidas por inmigración. Obsoleto desde 3.9|
| **aerospike.namespace.migrate_record_retransmits** <br>(gauge) | \[Heredado\] El número de veces que la emigración ha retransmitido registros. Obsoleto desde 3.9|
| **aerospike.namespace.migrate_records_skipped** <br>(gauge) | \[Heredado\] El número de veces que la emigración no envió un registro porque el nodo remoto ya estaba actualizado. Obsoleto desde 3.9|
| **aerospike.namespace.migrate_records_transmitted** <br>(gauge) | \[Heredado\] El número de registros que emigración ha leído y enviado. Obsoleto desde 3.9|
| **aerospike.namespace.migrate_retransmit_ms** <br>(gauge) | \[Heredado\] Cuánto tiempo esperar el éxito de la transacción, en milisegundos, antes de reintentar una transacción relacionada con la migración.<br>_Se muestra como milisegundo_ |
| **aerospike.namespace.migrate_rx_instance_count** <br>(gauge) | \[Heredado\] Número de objetos de instancia que gestionan las inmigraciones|
| **aerospike.namespace.migrate_rx_instances** <br>(gauge) | \[Heredado\] El número de objetos de instancia que gestionan las inmigraciones.|
| **aerospike.namespace.migrate_rx_partitions_active** <br>(gauge) | \[Heredado\] El número de particiones que están inmigrando actualmente a este nodo.|
| **aerospike.namespace.migrate_rx_partitions_initial** <br>(gauge) | \[Heredado\] El número total de migraciones que recibirá este nodo durante el ciclo de migración actual para este espacio de nombres.|
| **aerospike.namespace.migrate_rx_partitions_remaining** <br>(gauge) | \[Heredado\] El número de migraciones que este nodo aún no ha recibido durante el ciclo de migración actual para este espacio de nombres.|
| **aerospike.namespace.migrate_signals_active** <br>(gauge) | \[Heredado\] Para migraciones de partición finalizadas en este nodo, el número de señales de limpieza pendientes, enviadas a los nodos miembros participantes, esperando el reconocimiento de limpieza.|
| **aerospike.namespace.migrate_signals_remaining** <br>(gauge) | \[Heredado\] Para migraciones de partición no finalizadas en este nodo, el número de señales de limpieza a enviar a los nodos miembros participantes, a medida que la migración se completa.|
| **aerospike.namespace.migrate_sleep** <br>(gauge) | \[Heredado\] El número de microsegundos para suspender después de cada migración de registro.<br>_Se muestra como microsegundo_ |
| **aerospike.namespace.migrate_tx_instance_count** <br>(gauge) | \[Heredado\] El número de objetos de instancia que gestionan emigraciones.|
| **aerospike.namespace.migrate_tx_instances** <br>(gauge) | \[Heredado\] El número de objetos de instancia que gestionan emigraciones.|
| **aerospike.namespace.migrate_tx_partitions_active** <br>(gauge) | \[Heredado\] El número de particiones que emigran actualmente de este nodo.|
| **aerospike.namespace.migrate_tx_partitions_imbalance** <br>(gauge) | \[Heredado\] El número de fallos en las migraciones de particiones que pueden llevar a que las particiones estén desequilibradas.|
| **aerospike.namespace.migrate_tx_partitions_initial** <br>(gauge) | \[Heredado\] El número total de migraciones que este nodo enviará durante el ciclo de migración actual para este espacio de nombres.|
| **aerospike.namespace.migrate_tx_partitions_lead_remaining** <br>(gauge) | \[Heredado\] El número de emigraciones programadas inicialmente que no están retrasadas por la configuración migrate-fill-delay.|
| **aerospike.namespace.migrate_tx_partitions_remaining** <br>(gauge) | \[Heredado\] El número de migraciones que este nodo aún no ha enviado durante el ciclo de migración actual para este espacio de nombres.|
| **aerospike.namespace.nodes_quiesced** <br>(gauge) | \[Heredado\] Número de nodos observados en reposo en el evento de reagrupación más reciente.<br>_Se muestra como nodo_ |
| **aerospike.namespace.non_expirable_objects** <br>(gauge) | \[Heredado\] El número de registros en este espacio de nombres con TTLs no deseables (TTLs de valor 0).|
| **aerospike.namespace.non_replica_objects** <br>(gauge) | \[Heredado\] El número de registros en este nodo que no son ni maestros ni réplicas<br>_Se muestra como registro_ |
| **aerospike.namespace.non_replica_tombstones** <br>(gauge) | \[Heredado\] El número de lápidas en este nodo que no son ni maestras ni réplicas. Este número es distinto de cero solo durante la migración.|
| **aerospike.namespace.ns_cluster_size** <br>(gauge) | \[Heredado\] El tamaño del clúster del espacio de nombres|
| **aerospike.namespace.ns_forward_xdr_writes** <br>(gauge) | \[Heredado\] Este parámetro proporciona un control detallado a nivel de espacio de nombres para reenviar escrituras originadas en otro XDR a los centros de datos de destino especificados (en la sección xdr).|
| **aerospike.namespace.nsup_cycle_duration** <br>(gauge) | \[Heredado\] La duración del último ciclo nsup.<br>_Se muestra como milisegundo_ |
| **aerospike.namespace.nsup_cycle_sleep_pct** <br>(gauge) | \[Heredado\] El porcentaje de tiempo pasado durmiendo en el último ciclo nsup. Obsoleto desde 3.9<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.nsup_hist_period** <br>(gauge) | \[Heredado\] El intervalo (segundos) en el que se actualizan los histogramas de tamaño de objeto, así como el histograma de tiempo de vida (ttl).|
| **aerospike.namespace.nsup_period** <br>(gauge) | \[Heredado\] El intervalo en el que el subproceso principal de expiración/evicción (llamado nsup, el supervisor del espacio de nombres) se despierta para procesar el espacio de nombres.|
| **aerospike.namespace.nsup_threads** <br>(gauge) | \[Heredado\] El número de subprocesos de expiración/evicción dedicados que nsup utilizará al procesar el espacio de nombres.<br>_Se muestra como subproceso_ |
| **aerospike.namespace.obj_size_hist_max** <br>(gauge) | \[Heredado\]|
| **aerospike.namespace.objects** <br>(gauge) | \[Heredado\] El número de registros en este espacio de nombres para este nodo. No incluye lápidas.<br>_Se muestra como registro_ |
| **aerospike.namespace.ops_sub_tsvc_error** <br>(gauge) | \[Heredado\] El número de subtransacciones de escaneo/consulta ops que fallaron con un error en el servicio de transacciones.<br>_Se muestra como transacción_ |
| **aerospike.namespace.ops_sub_tsvc_timeout** <br>(gauge) | \[Heredado\] El número de subtransacciones de escaneo/consulta ops que expiraron en el servicio de transacciones.<br>_Se muestra como transacción_ |
| **aerospike.namespace.ops_sub_write_error** <br>(gauge) | \[Heredado\] Número de subtransacciones de escritura de consulta/escaneo ops que fallaron con un error. No incluye los tiempos de espera.<br>_Se muestra como transacción_ |
| **aerospike.namespace.ops_sub_write_filtered_out** <br>(gauge) | \[Heredado\] Número de subtransacciones de escritura de escaneo/consulta ops en las que la escritura no se produjo porque el registro se filtró mediante una expresión de predicado.<br>_Se muestra como transacción_ |
| **aerospike.namespace.ops_sub_write_success** <br>(gauge) | \[Heredado\] El número de subtransacciones de escritura de escaneo/consulta ops exitosas.<br>_Se muestra como transacción_ |
| **aerospike.namespace.ops_sub_write_timeout** <br>(gauge) | \[Heredado\] El número de subtransacciones de escritura de escaneo/consulta ops que expiraron.<br>_Se muestra como transacción_ |
| **aerospike.namespace.partition_tree_sprigs** <br>(gauge) | \[Heredado\] El número de ramas de árbol por partición a utilizar.|
| **aerospike.namespace.pending_quiesce** <br>(gauge) | \[Heredado\] Indica 'true' cuando el comando quiesce info ha sido recibido por un nodo.|
| **aerospike.namespace.pmem_available_pct** <br>(gauge) | \[Heredado y OpenMetricsV2 y Aerospike v4.8+\] El espacio mínimo contiguo del archivo de almacenamiento pmem a través de todos los archivos de este tipo en un espacio de nombres.<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.pmem_compression_ratio** <br>(gauge) | \[Heredado\] Relación media entre el tamaño comprimido y el tamaño sin comprimir para el almacenamiento pmem.|
| **aerospike.namespace.pmem_free_pct** <br>(gauge) | \[Heredado\] El porcentaje de capacidad de almacenamiento pmem libre para este espacio de nombres.<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.pmem_total_bytes** <br>(gauge) | \[Heredado\] El total de bytes de espacio de archivo de almacenamiento pmem asignado a este espacio de nombre en este nodo.<br>_Se muestra como byte_ |
| **aerospike.namespace.pmem_used_bytes** <br>(gauge) | \[Heredado\] El total de bytes de espacio de archivo de almacenamiento pmem utilizado por este espacio de nombre en este nodo.<br>_Se muestra como byte_ |
| **aerospike.namespace.prefer_uniform_balance** <br>(gauge) | \[Heredado\] Si es true, este espacio de nombres hará un esfuerzo para distribuir las particiones uniformemente a todos los nodos.|
| **aerospike.namespace.prole_objects** <br>(gauge) | \[Heredado\] El número de registros en este nodo que son proles (réplicas) en este nodo. No incluye lápidas.<br>_Se muestra como registro_ |
| **aerospike.namespace.prole_sub_objects** <br>(gauge) | \[Heredado\] El número de subregistros de LDT en este nodo que son proles (réplicas) en este nodo.<br>_Se muestra como registro_ |
| **aerospike.namespace.prole_tombstones** <br>(gauge) | \[Heredado\] El número de lápidas en este nodo que son proles (réplicas) en este nodo.|
| **aerospike.namespace.query_abort** <br>(gauge) | \[Heredado\] El número de consultas abortadas por el usuario vistas por este nodo. Obsoleto desde 3.9|
| **aerospike.namespace.query_agg** <br>(gauge) | \[Heredado\] El número de agregaciones ejecutadas en este nodo vistas por este nodo.|
| **aerospike.namespace.query_agg_abort** <br>(gauge) | \[Heredado\] El número de agregaciones de consultas abortadas por el usuario vistas por este nodo.|
| **aerospike.namespace.query_agg_avg_rec_count** <br>(gauge) | \[Heredado\] Número medio de registros devueltos por la consulta de agregación subyacente.|
| **aerospike.namespace.query_agg_error** <br>(gauge) | \[Heredado\] Número de errores de agregación de consultas debidos a un error interno.|
| **aerospike.namespace.query_agg_success** <br>(gauge) | \[Heredado\] El número de agregaciones de consulta completadas en este nodo.|
| **aerospike.namespace.query_avg_rec_count** <br>(gauge) | \[Heredado\] El número medio de registros devueltos por todas las consultas contra este índice secundario (combina query_agg_avg_rec_count y query_lookup_avg_rec_count).|
| **aerospike.namespace.query_fail** <br>(gauge) | \[Heredado\] El número de consultas que fallaron debido a un error interno. Se trata de fallos que no forman parte de la consulta de búsqueda (véase query_lookup_error), consulta de agregación (véase query_agg_error) o consulta de udf en segundo plano (véase query_udf_bg_failure).|
| **aerospike.namespace.query_long_queue_full** <br>(gauge) | \[Heredado\] Número de errores de cola de consultas de larga duración.|
| **aerospike.namespace.query_long_reqs** <br>(gauge) | \[Heredado\] El número de consultas de larga duración actualmente en proceso.|
| **aerospike.namespace.query_lookup_abort** <br>(gauge) | \[Heredado\] El número de consultas de índice secundario abortadas por el usuario.|
| **aerospike.namespace.query_lookup_avg_rec_count** <br>(gauge) | \[Heredado\] Número medio de registros devueltos por todas las consultas del índice secundario.|
| **aerospike.namespace.query_lookup_err** <br>(gauge) | \[Heredado\] Número de errores de consulta del índice secundario.|
| **aerospike.namespace.query_lookup_error** <br>(gauge) | \[Heredado\] Número de errores de consulta del índice secundario.|
| **aerospike.namespace.query_lookup_success** <br>(gauge) | \[Heredado\] Número de búsquedas de índices secundarios que se han realizado correctamente.|
| **aerospike.namespace.query_lookups** <br>(gauge) | \[Heredado\] Número de búsquedas de índices secundarios intentadas en este nodo.|
| **aerospike.namespace.query_ops_bg_failure** <br>(gauge) | \[Heredado\] El número de consultas ops en segundo plano que fallaron en este nodo.<br>_Se muestra como consulta_ |
| **aerospike.namespace.query_ops_bg_success** <br>(gauge) | \[Heredado\] El número de consultas ops en segundo plano que se completaron en este nodo.<br>_Se muestra como consulta_ |
| **aerospike.namespace.query_proto_compression_ratio** <br>(gauge) | \[Heredado\] Proporción media entre el tamaño comprimido y el tamaño sin comprimir de los datos de mensajes de protocolo en las respuestas de consulta al cliente.|
| **aerospike.namespace.query_proto_uncompressed_pct** <br>(gauge) | \[Heredado\] Porcentaje de respuestas de consulta al cliente con datos de mensajes de protocolo sin comprimir.<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.query_reqs** <br>(gauge) | \[Heredado\] El número de solicitudes de consulta intentadas alguna vez en este nodo. Combina query_agg y query_lookups. Incluso los fallos muy tempranos se contarían aquí a diferencia de query_short_running y query_long_running que se incrementarían un poco más tarde.|
| **aerospike.namespace.query_short_queue_full** <br>(gauge) | \[Heredado\] El número de errores de cola de consultas de corta duración.|
| **aerospike.namespace.query_short_reqs** <br>(gauge) | \[Heredado\] Número de consultas cortas en curso.|
| **aerospike.namespace.query_udf_bg_failure** <br>(gauge) | \[Heredado\] El número de consultas udf en segundo plano que fallaron en este nodo.|
| **aerospike.namespace.query_udf_bg_success** <br>(gauge) | \[Heredado\] Número de consultas udf en segundo plano que se han completado en este nodo.|
| **aerospike.namespace.rack_id** <br>(gauge) | \[Heredado\] Si este espacio de nombres debe detectar racks, de qué rack debe formar parte este nodo.<br>_Se muestra como microsegundo_ |
| **aerospike.namespace.re_repl_error** <br>(gauge) | \[Heredado\] El número de errores de re-replicación que no fueron timeout.<br>_Se muestra como error_ |
| **aerospike.namespace.re_repl_success** <br>(gauge) | \[Heredado\] El número de re-replicaciones exitosas.|
| **aerospike.namespace.re_repl_timeout** <br>(gauge) | \[Heredado\] El número de re-replicaciones que terminaron en timeout.|
| **aerospike.namespace.read_consistency_level_override** <br>(gauge) | \[Heredado\] Cuando se establece en un valor no predeterminado, anula el nivel de coherencia de lectura por transacción especificado por el cliente para este espacio de nombres.|
| **aerospike.namespace.record_proto_compression_ratio** <br>(gauge) | \[Heredado\] Proporción media entre el tamaño comprimido y el tamaño sin comprimir de los datos de mensajes de protocolo en las respuestas de cliente de transacción de registro único.|
| **aerospike.namespace.record_proto_uncompressed_pct** <br>(gauge) | \[Heredado\] Porcentaje de respuestas de cliente de transacción de registro único con datos de mensaje de protocolo sin comprimir.<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.repl_factor** <br>(gauge) | \[Heredado\] El factor de replicación efectivo para el espacio de nombres|
| **aerospike.namespace.replication_factor** <br>(gauge) | \[Heredado\] Número de copias de un registro (incluida la copia maestra) que se mantienen en todo el clúster.|
| **aerospike.namespace.retransmit_all_batch_sub_dup_res** <br>(gauge) | \[Heredado\] El número de retransmisiones que se produjeron durante las subtransacciones por lotes que se estaban resolviendo por duplicado.|
| **aerospike.namespace.retransmit_all_delete_dup_res** <br>(gauge) | \[Heredado\] El número de retransmisiones que se produjeron durante las transacciones de borrado que se estaban resolviendo por duplicado.|
| **aerospike.namespace.retransmit_all_delete_repl_write** <br>(gauge) | \[Heredado\] El número de retransmisiones que ocurrieron durante transacciones de borrado que estaban siendo escritas en réplica.|
| **aerospike.namespace.retransmit_all_read_dup_res** <br>(gauge) | \[Heredado\] El número de retransmisiones que se produjeron durante las transacciones de lectura que se estaban resolviendo por duplicado.|
| **aerospike.namespace.retransmit_all_udf_dup_res** <br>(gauge) | \[Heredado\] El número de retransmisiones que se produjeron durante las transacciones udf iniciadas por el cliente que se estaban resolviendo por duplicado.|
| **aerospike.namespace.retransmit_all_udf_repl_write** <br>(gauge) | \[Heredado\] El número de retransmisiones que ocurrieron durante transacciones udf iniciadas por el cliente que estaban siendo escritas en réplica.|
| **aerospike.namespace.retransmit_all_write_dup_res** <br>(gauge) | \[Heredado\] El número de retransmisiones que ocurrieron durante transacciones de escritura que estaban siendo resueltas por duplicado.|
| **aerospike.namespace.retransmit_all_write_repl_write** <br>(gauge) | \[Heredado\] El número de retransmisiones que ocurrieron durante transacciones de escritura que estaban siendo escritas en réplica.|
| **aerospike.namespace.retransmit_nsup_repl_write** <br>(gauge) | \[Heredado\] El número de retransmisiones que ocurrieron durante transacciones de borrado iniciadas por nsup que estaban siendo escritas en réplica.|
| **aerospike.namespace.retransmit_ops_sub_dup_res** <br>(gauge) | \[Heredado\] El número de retransmisiones que ocurrieron durante subtransacciones de escritura de trabajos de escaneo/consulta ops que estaban siendo resueltos por duplicado.|
| **aerospike.namespace.retransmit_ops_sub_repl_write** <br>(gauge) | \[Heredado\] El número de retransmisiones que ocurrieron durante subtransacciones de escritura de trabajos de escaneo/consulta ops que estaban siendo escritos en réplica.|
| **aerospike.namespace.retransmit_udf_sub_dup_res** <br>(gauge) | \[Heredado\] El número de retransmisiones que se produjeron durante subtransacciones udf de trabajos udf en segundo plano de escaneado/consulta que se estaban resolviendo por duplicado.|
| **aerospike.namespace.retransmit_udf_sub_repl_write** <br>(gauge) | \[Heredado\] El número de retransmisiones que se produjeron durante subtransacciones udf de trabajos udf en segundo plano de escaneado/consulta que se estaban escribiendo en réplica.|
| **aerospike.namespace.scan_aggr_abort** <br>(gauge) | \[Heredado\] El número de agregaciones de escaneo que fueron abortadas.|
| **aerospike.namespace.scan_aggr_complete** <br>(gauge) | \[Heredado\] El número de escaneos de agregación que se completaron con éxito.|
| **aerospike.namespace.scan_aggr_error** <br>(gauge) | \[Heredado\] El número de escaneos abortados.|
| **aerospike.namespace.scan_aggr_error.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] El número de escaneos abortados.|
| **aerospike.namespace.scan_basic_abort** <br>(gauge) | \[Heredado\] El número de escaneos básicos que fueron abortados.|
| **aerospike.namespace.scan_basic_complete** <br>(gauge) | \[Heredado\] El número de escaneos básicos que se completaron.|
| **aerospike.namespace.scan_basic_error** <br>(gauge) | \[Heredado\] El número de escaneos básicos que fallaron.|
| **aerospike.namespace.scan_basic_error.count** <br>(count) | \[OpenMetricsV2 y Aerospike 3.9\] El número de escaneos básicos que fallaron.|
| **aerospike.namespace.scan_ops_bg_abort** <br>(gauge) | \[Heredado\] El número de escaneos ops en segundo plano que fueron abortados.|
| **aerospike.namespace.scan_ops_bg_complete** <br>(gauge) | \[Heredado\] El número de escaneos ops en segundo plano que se completaron.<br>_Se muestra como escaneo_ |
| **aerospike.namespace.scan_ops_bg_error** <br>(gauge) | \[Heredado\] El número de escaneos ops en segundo plano que fallaron.<br>_Se muestra como escaneo_ |
| **aerospike.namespace.scan_ops_bg_error.count** <br>(count) | \[OpenMetricsV2 y Aerospike v4.7\] El número de escaneos ops en segundo plano que fallaron.<br>_Se muestra como escaneo_ |
| **aerospike.namespace.scan_proto_compression_ratio** <br>(gauge) | \[Heredado\] Proporción media entre el tamaño comprimido y el tamaño sin comprimir de los datos de mensajes de protocolo en las respuestas de cliente de escaneo básico o escaneo de agregación.|
| **aerospike.namespace.scan_proto_uncompressed_pct** <br>(gauge) | \[Heredado\] Porcentaje de respuestas de clientes de escaneo básico o escaneo de agregación con datos de mensajes de protocolo sin comprimir.<br>_Se muestra como porcentaje_ |
| **aerospike.namespace.scan_udf_bg_abort** <br>(gauge) | \[Heredado\] El número de escaneos udf en segundo plano que fueron abortados.|
| **aerospike.namespace.scan_udf_bg_complete** <br>(gauge) | \[Heredado\] El número de escaneos udf en segundo plano que se completaron.|
| **aerospike.namespace.scan_udf_bg_error** <br>(gauge) | \[Heredado\] El número de escaneos udf en segundo plano que fallaron.|
| **aerospike.namespace.scan_udf_bg_error.count** <br>(count) | \[OpenMetricsV2 y Aerospike 3.9+\] El número de escaneos udf en segundo plano que fallaron.|
| **aerospike.namespace.set_deleted_objects** <br>(gauge) | \[Heredado\] El número de registros eliminados por un conjunto. Obsoleto desde 3.9|
| **aerospike.namespace.set_evicted_objects** <br>(gauge) | \[Heredado\] El número de objetos desalojados por un conjunto. Obsoleto desde 3.9|
| **aerospike.namespace.sets_enable_xdr** <br>(gauge) | \[Heredado\] Cuando se establece en true, especifica si XDR debe enviar todos los conjuntos de un espacio de nombres o no.|
| **aerospike.namespace.sindex.num_partitions** <br>(gauge) | \[Heredado\]|
| **aerospike.namespace.sindex_used_bytes_memory** <br>(gauge) | \[Heredado\] La cantidad de memoria ocupada por índices secundarios para este espacio de nombres en este nodo. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.namespace.single_bin** <br>(gauge) | \[Heredado\] Cuando se establece en true, no permitirá múltiples bin (columnas) para un registro.|
| **aerospike.namespace.single_scan_threads** <br>(gauge) | \[Heredado\] El número máximo de subprocesos permitidos para un solo escaneo. Rango de valores: 1-128.<br>_Se muestra como subproceso_ |
| **aerospike.namespace.smd_evict_void_time** <br>(gauge) | \[Heredado\] La profundidad de desalojo especificada para todo el clúster, expresada como tiempo de vacío en segundos desde el 1 de enero de 2010 UTC.<br>_Se muestra como segundo_ |
| **aerospike.namespace.stop_writes** <br>(gauge) | \[Heredado y OpenMetricsV2 y Aerospike v3.9+\] Si es true este espacio de nombres no permite actualmente escrituras.|
| **aerospike.namespace.stop_writes_pct** <br>(gauge) | \[Heredado\] Cuando se establece en true, deshabilita las escrituras cuando la utilización de memoria (rastreada en memory_used_bytes) está por encima de este porcentaje especificado.|
| **aerospike.namespace.storage_engine_device_defrag_q** <br>(gauge) | \[OpenMetricsV2 y Aerospike 4.3+\] desfragmentación del dispositivo del motor de almacenamiento q|
| **aerospike.namespace.storage_engine_device_write_q** <br>(gauge) | \[OpenMetricsV2 y Aerospike 4.3+\] motor de almacenamiento de dispositivo de escritura q|
| **aerospike.namespace.storage_engine_file_defrag_q** <br>(gauge) | \[OpenMetricsV2 y Aerospike 4.3+\] motor de almacenamiento de archivo de desfragmentación q|
| **aerospike.namespace.storage_engine_file_write_q** <br>(gauge) | \[OpenMetricsV2 y Aerospike 4.3+\] motor de almacenamiento de archivos de escritura q|
| **aerospike.namespace.strong_consistency** <br>(gauge) | \[Heredado\] Cuando se establece en true, permite habilitar las lecturas linealizadas.|
| **aerospike.namespace.strong_consistency_allow_expunge** <br>(gauge) | \[Heredado\] Cuando se establece en true, permite que los borrados no duraderos se utilicen con coherencia fuerte.|
| **aerospike.namespace.sub_objects** <br>(gauge) | \[Heredado\]|
| **aerospike.namespace.tomb_raider_eligible_age** <br>(gauge) | \[Heredado\] El número de segundos para retener una lápida, a pesar de que se descubre que es seguro para eliminar.<br>_Se muestra como segundo_ |
| **aerospike.namespace.tomb_raider_period** <br>(gauge) | \[Heredado\] La cantidad mínima de tiempo, en segundos, entre ejecuciones de tomb-raider.<br>_Se muestra como segundo_ |
| **aerospike.namespace.tomb_raider_sleep** <br>(gauge) | \[Heredado\] El número de microsegundos de suspensión entre grandes lecturas de bloques en disco o archivos de almacenamiento pmem.<br>_Se muestra como microsegundo_ |
| **aerospike.namespace.tombstones** <br>(gauge) | \[Heredado\] El número total de lápidas en este espacio de nombres en este nodo.|
| **aerospike.namespace.total_bytes_disk** <br>(gauge) | \[Heredado\] El total de bytes de espacio en disco asignado a este espacio de nombres en este nodo. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.namespace.total_bytes_memory** <br>(gauge) | \[Heredado\] El total de bytes de memoria asignados a este espacio de nombres en este nodo. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.namespace.tps.read** <br>(gauge) | \[Heredado\] El rendimiento de las lecturasreads. \[Eliminado en 5.1.0\]|
| **aerospike.namespace.tps.write** <br>(gauge) | \[Heredado\] El rendimiento de las escrituras. \[Eliminado en 5.1.0\]|
| **aerospike.namespace.transaction_pending_limit** <br>(gauge) | \[Heredado\] El máximo de transacciones pendientes que se pueden poner en cola para trabajar en la misma clave.<br>_Se muestra como transacción_ |
| **aerospike.namespace.truncate_lut** <br>(gauge) | \[Heredado\] El truncate_lut 'más abarcativo' para este espacio de nombres.|
| **aerospike.namespace.truncate_threads** <br>(gauge) | \[Heredado\] El número de subprocesos dedicados a utilizar en los truncamientos en el espacio de nombres.<br>_Se muestra como subproceso_ |
| **aerospike.namespace.truncated_records** <br>(gauge) | \[Heredado\] Número total de registros eliminados por truncamiento para este espacio de nombres (incluye truncamientos de conjuntos).<br>_Se muestra como registro_ |
| **aerospike.namespace.udf_sub_lang_delete_success** <br>(gauge) | \[Heredado\] Número de subtransacciones de borrado udf realizadas con éxito (para trabajos udf en segundo plano de escaneo/consulta).|
| **aerospike.namespace.udf_sub_lang_error** <br>(gauge) | \[Heredado\] El número de errores de subtransacciones udf (para trabajos udf en segundo plano de escaneo/consulta).|
| **aerospike.namespace.udf_sub_lang_read_success** <br>(gauge) | \[Heredado\] Número de subtransacciones de lectura udf realizadas con éxito (para trabajos udf en segundo plano de escaneo/consulta). |
| **aerospike.namespace.udf_sub_lang_write_success** <br>(gauge) | \[Heredado\] El número de subtransacciones de escritura udf exitosas (para trabajos udf en segundo plano de escaneo/consulta).|
| **aerospike.namespace.udf_sub_tsvc_error** <br>(gauge) | \[Heredado\] El número de subtransacciones udf que fallaron con un error en el servicio de transacciones antes de intentar manejar la transacción (para trabajos udf en segundo plano de escaneo/consulta).|
| **aerospike.namespace.udf_sub_tsvc_timeout** <br>(gauge) | \[Heredado\] El número de subtransacciones udf que expiraron en el servicio de transacciones antes de intentar gestionar la transacción (para trabajos udf en segundo plano de escaneo/consulta). |
| **aerospike.namespace.udf_sub_udf_complete** <br>(gauge) | \[Heredado\] Número de subtransacciones udf completadas (para trabajos udf en segundo plano de escaneo/consulta).|
| **aerospike.namespace.udf_sub_udf_error** <br>(gauge) | \[Heredado\] Número de subtransacciones udf fallidas (para trabajos udf en segundo plano de escaneo/consulta).|
| **aerospike.namespace.udf_sub_udf_filtered_out** <br>(gauge) | \[Heredado\] Número de subtransacciones udf que no se han realizado porque el registro se ha filtrado mediante una expresión de predicado.|
| **aerospike.namespace.udf_sub_udf_timeout** <br>(gauge) | \[Heredado\] Número de subtransacciones udf que han expirado (para trabajos udf en segundo plano de escaneo/consulta).|
| **aerospike.namespace.unavailable_partitions** <br>(gauge) | \[Heredado y OpenMetricsV2 y Aerospike v4.0+\] El número de particiones no disponibles para este espacio de nombres (cuando se utiliza la coherencia fuerte).|
| **aerospike.namespace.used_bytes_disk** <br>(gauge) | \[Heredado\] El total de bytes de espacio en disco utilizado por este espacio de nombres en este nodo. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.namespace.used_bytes_memory** <br>(gauge) | \[Heredado\] El total de bytes de memoria utilizados por este espacio de nombres en este nodo. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.namespace.write_commit_level_override** <br>(gauge) | \[Heredado\] Cuando se establece en un valor no predeterminado, anula el nivel de confirmación de escritura por transacción especificado por el cliente para este espacio de nombres.<br>_Se muestra como microsegundo_ |
| **aerospike.namespace.xdr_client_delete_error** <br>(gauge) | \[Heredado\] El número de solicitudes de eliminación iniciadas por XDR que fallaron en el espacio de nombres en este nodo.<br>_Se muestra como solicitud_ |
| **aerospike.namespace.xdr_client_delete_not_found** <br>(gauge) | \[Heredado\] Número de solicitudes de eliminación iniciadas por XDR que fallaron en el espacio de nombres de este nodo debido a que no se encontró el registro.<br>_Se muestra como solicitud_ |
| **aerospike.namespace.xdr_client_delete_success** <br>(gauge) | \[Heredado\] Número de solicitudes de eliminación iniciadas por XDR que han tenido éxito en el espacio de nombres de este nodo.<br>_Se muestra como solicitud_ |
| **aerospike.namespace.xdr_client_delete_timeout** <br>(gauge) | \[Heredado\] Número de solicitudes de borrado iniciadas por XDR que han caducado en el espacio de nombres de este nodo.<br>_Se muestra como solicitud_ |
| **aerospike.namespace.xdr_client_write_error** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura iniciadas por XDR que fallaron en el espacio de nombres en este nodo.<br>_Se muestra como solicitud_ |
| **aerospike.namespace.xdr_client_write_success** <br>(gauge) | \[Heredado\] Número de solicitudes de escritura iniciadas por XDR que han tenido éxito en el espacio de nombres de este nodo.<br>_Se muestra como solicitud_ |
| **aerospike.namespace.xdr_client_write_timeout** <br>(gauge) | \[Heredado\] Número de solicitudes de escritura iniciadas por XDR que han expirado en el espacio de nombres de este nodo.<br>_Se muestra como solicitud_ |
| **aerospike.namespace.xdr_from_proxy_delete_error** <br>(gauge) | \[Heredado\] El número de errores para las transacciones de borrado XDR por proxy desde otro nodo.<br>_Se muestra como error_ |
| **aerospike.namespace.xdr_from_proxy_delete_not_found** <br>(gauge) | \[Heredado\] Número de transacciones de borrado XDR por proxy desde otro nodo que resultaron en "no encontrado".<br>_Se muestra como transacción_ |
| **aerospike.namespace.xdr_from_proxy_delete_success** <br>(gauge) | \[Heredado\] Número de transacciones de borrado XDR por proxy exitosas desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.xdr_from_proxy_delete_timeout** <br>(gauge) | \[Heredado\] El número de tiempos de espera para las transacciones de borrado XDR por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.xdr_from_proxy_write_error** <br>(gauge) | \[Heredado\] El número de errores para transacciones de escritura XDR por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.xdr_from_proxy_write_success** <br>(gauge) | \[Heredado\] Número de transacciones de escritura XDR por proxy exitosas desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.xdr_from_proxy_write_timeout** <br>(gauge) | \[Heredado\] El número de tiempos de espera para las transacciones de escritura XDR por proxy desde otro nodo.<br>_Se muestra como transacción_ |
| **aerospike.namespace.xdr_read_success** <br>(gauge) | \[Heredado\] Número de solicitudes de lectura iniciadas por XDR que han tenido éxito en el espacio de nombres de este nodo.<br>_Se muestra como solicitud_ |
| **aerospike.namespace.xdr_write_error** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura iniciadas por XDR que fallaron en el espacio de nombres en este nodo. Obsoleto.<br>_Se muestra como solicitud_ |
| **aerospike.namespace.xdr_write_success** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura iniciadas por XDR que han tenido éxito en el espacio de nombres de este nodo. Obsoleto.<br>_Se muestra como solicitud_ |
| **aerospike.namespace.xdr_write_timeout** <br>(gauge) | \[Heredado\] Número de solicitudes de escritura iniciadas por XDR que han expirado en el espacio de nombres de este nodo<br>_Se muestra como solicitud_ |
| **aerospike.namespace.xmem_id** <br>(gauge) | \[Heredado\] ID de memoria extendida del espacio de nombres|
| **aerospike.node_stats.batch_index_error.count** <br>(count) | \[OpenMetricsV2 y Aerospike v3.9+\] error de índice de lotes|
| **aerospike.node_stats.client_connections** <br>(gauge) | \[OpenMetricsV2\] conexiones de cliente|
| **aerospike.node_stats.client_connections_opened.count** <br>(count) | \[OpenMetricsV2 y Aerospike v5.6+\] conexiones de cliente abiertas|
| **aerospike.node_stats.cluster_size** <br>(gauge) | \[OpenMetricsV2\] tamaño del clúster|
| **aerospike.node_stats.fabric_connections_opened.count** <br>(count) | \[OpenMetricsV2 y Aerospike v5.6+\] conexiones de tejido abiertas|
| **aerospike.node_stats.heap_efficiency_pct** <br>(gauge) | \[OpenMetricsV2 y Aerospike v3.10.1+\] pct de eficiencia del heap|
| **aerospike.node_stats.heartbeat_connections_opened.count** <br>(count) | \[OpenMetricsV2 y Aerospike v5.6+\] conexiones de latido abiertas|
| **aerospike.node_stats.rw_in_progress** <br>(gauge) | \[OpenMetricsV2 y Aerospike v3.9+\] rw en curso|
| **aerospike.node_stats.system_free_mem_pct** <br>(gauge) | \[OpenMetricsV2\] sistema libre mem pct|
| **aerospike.noship_recs_expired** <br>(gauge) | \[Heredado\] El número de registros no enviados porque el registro caducó antes de que XDR pudiera enviarlo. Obsoleto desde 3.9|
| **aerospike.noship_recs_hotkey** <br>(gauge) | \[Heredado\] El número de resúmenes de registros que se omiten debido a una entrada ya existente en la caché de subprocesos del lector (lo que significa que se acaba de enviar una versión de este registro). Debe interpretarse junto con noship_recs_hotkey_timeout. Obsoleto desde 3.9|
| **aerospike.noship_recs_notmaster** <br>(gauge) | \[Heredado\] El número de registros en el resumen de log que no fueron enviados porque el nodo local no es el nodo maestro para estos registros. Obsoleto desde 3.9|
| **aerospike.noship_recs_uninitialized_destination** <br>(gauge) | \[Heredado\] El número de registros en el resumen de log no enviados porque el clúster de destino no ha sido inicializado. Obsoleto desde 3.9|
| **aerospike.noship_recs_unknown_namespace** <br>(gauge) | \[Heredado\] El número de registros en el resumen de log no enviados porque pertenecen a un espacio de nombres desconocido (nunca debería ocurrir). Obsoleto desde 3.9|
| **aerospike.objects** <br>(gauge) | \[Heredado\] Número total de objetos replicados en este nodo. Incluye objetos maestros y replicados.<br>_Se muestra como registro_ |
| **aerospike.ongoing_write_reqs** <br>(gauge) | \[Heredado\] El número de registros actualmente en transacciones de escritura. Obsoleto desde 3.9|
| **aerospike.partition_absent** <br>(gauge) | \[Heredado\] El número de particiones para las que este nodo no es ni maestro ni réplica. Obsoleto desde 3.9|
| **aerospike.partition_actual** <br>(gauge) | \[Heredado\] El número de particiones para las que este nodo está actuando como maestro. Obsoleto desde 3.9|
| **aerospike.partition_desync** <br>(gauge) | \[Heredado\] El número de particiones que aún no están sincronizadas con el resto del clúster. Obsoleto desde 3.9|
| **aerospike.partition_object_count** <br>(gauge) | \[Heredado\] El número total de objetos. Obsoleto desde 3.9|
| **aerospike.partition_ref_count** <br>(gauge) | \[Heredado\] El número de particiones que se están leyendo actualmente. Obsoleto desde 3.9|
| **aerospike.partition_replica** <br>(gauge) | \[Heredado\] El número de particiones para las que este nodo está actuando como réplica. Obsoleto desde 3.9|
| **aerospike.process_cpu_pct** <br>(gauge) | \[Heredado\] El porcentaje de uso de CPU por el proceso asd.<br>_Se muestra como porcentaje_ |
| **aerospike.proxy_action** <br>(gauge) | \[Heredado\] El número de solicitudes proxy recibidas de otros nodos. Obsoleto desde 3.9|
| **aerospike.proxy_in_progress** <br>(gauge) | \[Heredado\] El número de proxies en curso.|
| **aerospike.proxy_initiate** <br>(gauge) | \[Heredado\] El número de solicitudes de escaneo iniciadas. Obsoleto desde 3.9|
| **aerospike.proxy_retry** <br>(gauge) | \[Heredado\] El número de solicitudes proxy reintentadas a otros nodos. Obsoleto desde 3.9|
| **aerospike.proxy_retry_new_dest** <br>(gauge) | \[Heredado\] El número de reintentos de proxy que este nodo entregó a un nuevo destino. Obsoleto desde 3.9|
| **aerospike.proxy_retry_q_full** <br>(gauge) | \[Heredado\] El número de reintentos de proxy fallidos porque la cola del tejido estaba llena. Obsoleto desde 3.9|
| **aerospike.proxy_retry_same_dest** <br>(gauge) | \[Heredado\] El número de reintentos de proxy que este nodo entregó al mismo destino. Obsoleto desde 3.9|
| **aerospike.proxy_unproxy** <br>(gauge) | \[Heredado\] El número de reejecuciones (desde cero) debido a la falta de disponibilidad del nodo de proxy. Obsoleto desde 3.9|
| **aerospike.query_abort** <br>(gauge) | \[Heredado\] El número de consultas abortadas por el usuario vistas por este nodo. Obsoleto desde 3.9 |
| **aerospike.query_agg** <br>(gauge) | \[Heredado\] El número de agregaciones ejecutadas en este nodo vistas por este nodo. Obsoleto desde 3.9|
| **aerospike.query_agg_abort** <br>(gauge) | \[Heredado\] El número de agregaciones abortadas por el usuario vistas por este nodo. Obsoleto desde 3.9|
| **aerospike.query_agg_avg_rec_count** <br>(gauge) | \[Heredado\] El número medio de registros devueltos por las agregaciones vistas por este nodo. Obsoleto desde 3.9|
| **aerospike.query_agg_err** <br>(gauge) | \[Heredado\] El número de agregaciones fallidas debido a un error interno visto por este nodo. Obsoleto desde 3.9|
| **aerospike.query_agg_success** <br>(gauge) | \[Heredado\] El número de agregaciones que tuvieron éxito en este nodo sin error visto por este nodo. Obsoleto desde 3.9|
| **aerospike.query_avg_rec_count** <br>(gauge) | \[Heredado\] El número medio de registros devueltos de todas las consultas que se ejecutaron en este nodo. Obsoleto desde 3.9|
| **aerospike.query_fail** <br>(gauge) | \[Heredado\] El número de consultas que fallaron debido a un error interno visto por este nodo. Obsoleto desde 3.9|
| **aerospike.query_long_queue_full** <br>(gauge) | \[Heredado\] El número de errores de cola de consultas de larga duración. Obsoleto desde 3.9|
| **aerospike.query_long_queue_size** <br>(gauge) | \[Heredado\]|
| **aerospike.query_long_reqs** <br>(gauge) | \[Heredado\] El número de consultas de larga duración actualmente en proceso. Obsoleto desde 3.9.|
| **aerospike.query_long_running** <br>(gauge) | \[Heredado\] Número de consultas de larga duración intentadas alguna vez en el sistema (registro seleccionado de consultas superior a query_threshold).|
| **aerospike.query_lookup_abort** <br>(gauge) | \[Heredado\] El número de búsquedas abortadas por el usuario vistas por este nodo. Obsoleto desde 3.9 |
| **aerospike.query_lookup_avg_rec_count** <br>(gauge) | \[Heredado\] El número medio de registros devueltos por todas las búsquedas vistas por este nodo. Obsoleto desde 3.9|
| **aerospike.query_lookup_err** <br>(gauge) | \[Heredado\] El número de búsquedas fallidas debido a un error visto por este nodo. Obsoleto desde 3.9|
| **aerospike.query_lookup_success** <br>(gauge) | \[Heredado\] El número de búsquedas que han tenido éxito en este nodo. Obsoleto desde 3.9|
| **aerospike.query_lookups** <br>(gauge) | \[Heredado\] El número de búsquedas realizadas por este nodo. Obsoleto desde 3.9|
| **aerospike.query_reqs** <br>(gauge) | \[Heredado\] El número de solicitudes de consulta recibidas por este nodo. Obsoleto desde 3.9|
| **aerospike.query_short_queue_full** <br>(gauge) | \[Heredado\] El número de errores de cola de consultas cortas en ejecución. Obsoleto desde 3.9|
| **aerospike.query_short_queue_size** <br>(gauge) | \[Heredado\]|
| **aerospike.query_short_reqs** <br>(gauge) | \[Heredado\] El número de consultas cortas actualmente en proceso. Obsoleto desde 3.9|
| **aerospike.query_short_running** <br>(gauge) | \[Heredado\] Número de consultas de ejecución corta que se han intentado alguna vez en el sistema (registro seleccionada de consultas inferior a query_threshold).|
| **aerospike.query_success** <br>(gauge) | \[Heredado\] El número de consultas realizadas con éxito en este nodo. Obsoleto desde 3.9|
| **aerospike.query_tracked** <br>(gauge) | \[Heredado\] El número de consultas que se ejecutaron más de query untracked_time|
| **aerospike.queue** <br>(gauge) | \[Heredado\] El número de solicitudes pendientes de ejecución. Obsoleto desde 3.9|
| **aerospike.read_dup_prole** <br>(gauge) | \[Heredado\] El número de solicitudes enviadas para la resolución de duplicados. Obsoleto desde 3.9|
| **aerospike.read_threads_avg_processing_time_pct** <br>(gauge) | \[Heredado\]<br>_Se muestra en porcentaje_ |
| **aerospike.read_threads_avg_waiting_time_pct** <br>(gauge) | \[Heredado\]<br>_Se muestra en porcentaje_ |
| **aerospike.reaped_fds** <br>(gauge) | \[Heredado\] El número de conexiones de cliente inactivas cerradas.|
| **aerospike.reclaimed_recs_dlog** <br>(gauge) | \[Heredado\]|
| **aerospike.record_locks** <br>(gauge) | \[Heredado\] El número de bloqueos de índice de registro actualmente activos en el nodo. Obsoleto desde 3.9|
| **aerospike.record_refs** <br>(gauge) | \[Heredado\] El número de registros de índice referenciados actualmente. Obsoleto desde 3.9|
| **aerospike.remaining_migrations** <br>(gauge) | \[Heredado\]|
| **aerospike.rw_err_ack_badnode** <br>(gauge) | \[Heredado\] El número de confirmaciones de nodos inesperados. Obsoleto desde 3.9|
| **aerospike.rw_err_ack_internal** <br>(gauge) | \[Heredado\] El número de confirmaciones de escritura prole fallidas debido a errores internos. Obsoleto desde 3.9|
| **aerospike.rw_err_ack_nomatch** <br>(gauge) | \[Heredado\] El número de confirmaciones de escritura prole iniciados pero que se perdieron/tienen información no coincidente. Obsoleto desde 3.9|
| **aerospike.rw_err_dup_cluster_key** <br>(gauge) | \[Heredado\] El número de errores encontrados durante la resolución de duplicados debido a la falta de coincidencia de la clave del clúster. Obsoleto desde 3.9|
| **aerospike.rw_err_dup_internal** <br>(gauge) | \[Heredado\] El número de errores encontrados durante la resolución de duplicados. Obsoleto desde 3.9|
| **aerospike.rw_err_dup_send** <br>(gauge) | \[Heredado\] El número de errores encontrados durante la resolución de duplicados debido a fallos en el envío de mensajes de tejido. Obsoleto desde 3.9|
| **aerospike.rw_err_write_cluster_key** <br>(gauge) | \[Heredado\] El número de fallos de escritura de réplica debido a la falta de coincidencia de clave de clúster. Obsoleto desde 3.9|
| **aerospike.rw_err_write_internal** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura fallidas debido a errores internos (errores de código). Obsoleto desde 3.9|
| **aerospike.rw_err_write_send** <br>(gauge) | \[Heredado\] El número de confirmaciones de escritura prole que fallan debido a un fallo en el envío del mensaje de tejido. Obsoleto desde 3.9|
| **aerospike.rw_in_progress** <br>(gauge) | \[Heredado\] Número de transacciones rw en curso|
| **aerospike.scans_active** <br>(gauge) | \[Heredado\] El número de escaneos actualmente activos.|
| **aerospike.set.device_data_bytes** <br>(gauge) | \[Heredado\] El almacenamiento del dispositivo utilizado por los datos (maestro y proles) excluyendo el índice primario.<br>_Se muestra como byte_ |
| **aerospike.set.disable_eviction** <br>(gauge) | \[Heredado\] Si este conjunto está o no protegido contra desalojos.|
| **aerospike.set.enable_index** <br>(gauge) | \[Heredado\] Si este conjunto tiene o no su propio índice|
| **aerospike.set.index_populating** <br>(gauge) | \[Heredado\]|
| **aerospike.set.memory_data_bytes** <br>(gauge) | \[Heredado\] La memoria utilizada por este conjunto para la parte de datos (no incluye la parte de índice). El valor será 0 si los datos no se almacenan en la memoria. <br>_Se muestra como byte_ |
| **aerospike.set.objects** <br>(gauge) | \[Heredado\] El número total de objetos (maestro y todas las réplicas) en este conjunto en este nodo.<br>_Se muestra como registro_ |
| **aerospike.set.sindexes** <br>(gauge) | \[Heredado\]|
| **aerospike.set.stop_writes_count** <br>(gauge) | \[Heredado\] El recuento total de este conjunto ha alcanzado stop_writes|
| **aerospike.set.tombstones** <br>(gauge) | \[Heredado\] El número total de lápidas (maestro y todas las réplicas) en este conjunto en este nodo.|
| **aerospike.set.truncate_lut** <br>(gauge) | \[Heredado\] El truncate_lut "más abarcativo" para este conjunto.|
| **aerospike.sindex.delete_error** <br>(gauge) | \[Heredado\] El número de errores al procesar una transacción de borrado para este índice secundario.|
| **aerospike.sindex.delete_success** <br>(gauge) | \[Heredado\] El número de transacciones de borrado exitosas procesadas para este índice secundario.|
| **aerospike.sindex.entries** <br>(gauge) | \[Heredado\] El número de entradas de índice secundario para este índice secundario. Es el número de registros que han sido indexados por este índice secundario.|
| **aerospike.sindex.histogram** <br>(gauge) | \[Heredado\] Indica si los histogramas están habilitados para este Sindex o no.|
| **aerospike.sindex.ibtr_memory_used** <br>(gauge) | \[Heredado\] La cantidad de memoria que el índice secundario está consumiendo para las claves<br>_Se muestra como byte_ |
| **aerospike.sindex.keys** <br>(gauge) | \[Heredado\] El número de claves secundarias para este índice secundario.|
| **aerospike.sindex.load_pct** <br>(gauge) | \[Heredado\] El progreso en porcentaje de la creación del índice secundario.<br>_Se muestra como porcentaje_ |
| **aerospike.sindex.loadtime** <br>(gauge) | \[Heredado\] El tiempo que tardó en crearse completamente el índice secundario.<br>_Se muestra como segundo_ |
| **aerospike.sindex.nbtr_memory_used** <br>(gauge) | \[Heredado\] La cantidad de memoria que el índice secundario está consumiendo para las entradas<br>_Se muestra como byte_ |
| **aerospike.sindex.query_agg** <br>(gauge) | \[Heredado\] El número de agregaciones de consulta intentadas para este índice secundario en este nodo.|
| **aerospike.sindex.query_agg_avg_rec_count** <br>(gauge) | \[Heredado\] Número medio de registros devueltos por las agregaciones subyacentes a las consultas de este índice secundario.|
| **aerospike.sindex.query_agg_avg_record_size** <br>(gauge) | \[Heredado\] Tamaño medio de los registros devueltos por las agregaciones subyacentes a las consultas de este índice secundario.|
| **aerospike.sindex.query_avg_rec_count** <br>(gauge) | \[Heredado\] El número medio de registros devueltos por todas las consultas contra este índice secundario (combina query_agg_avg_rec_count y query_lookup_avg_rec_count).|
| **aerospike.sindex.query_avg_record_size** <br>(gauge) | \[Heredado\] El tamaño medio de los registros devueltos por todas las consultas contra este índice secundario (combina query_agg_avg_record_size y query_lookup_avg_record_size)|
| **aerospike.sindex.query_lookup_avg_rec_count** <br>(gauge) | \[Heredado\] Número medio de registros devueltos por las consultas de búsqueda en este índice secundario.|
| **aerospike.sindex.query_lookup_avg_record_size** <br>(gauge) | \[Heredado\] Tamaño medio de los registros devueltos por las consultas de búsqueda en este índice secundario.|
| **aerospike.sindex.query_lookups** <br>(gauge) | \[Heredado\] El número de consultas de búsqueda intentadas alguna vez para este índice secundario en este nodo.|
| **aerospike.sindex.query_reqs** <br>(gauge) | \[Heredado\] El número de solicitudes de consulta intentadas alguna vez para este índice secundario en este nodo (combina query_lookups y query_agg).|
| **aerospike.sindex.si_accounted_memory** <br>(gauge) | \[Heredado\] La cantidad de memoria que está consumiendo el índice secundario. Es la suma de ibtr_memory_used y nbtr_memory_used.<br>_Se muestra como byte_ |
| **aerospike.sindex.stat_delete_errs** <br>(gauge) | \[Heredado\] El número de errores al procesar una transacción de borrado para este índice secundario. Obsoleto desde 3.9|
| **aerospike.sindex.stat_delete_reqs** <br>(gauge) | \[Heredado\] El número de intentos de procesar transacciones de borrado para este índice secundario. Obsoleto desde 3.9|
| **aerospike.sindex.stat_delete_success** <br>(gauge) | \[Heredado\] El número de transacciones de borrado exitosas procesadas para este índice secundario. Obsoleto desde 3.9|
| **aerospike.sindex.stat_gc_recs** <br>(gauge) | \[Heredado\] El número de registros que han sido recopilados de la memoria de índice secundaria.|
| **aerospike.sindex.stat_gc_time** <br>(gauge) | \[Heredado\] La cantidad de tiempo dedicado a procesar la recopilación de elementos no usados para el índice secundario.|
| **aerospike.sindex.stat_write_errs** <br>(gauge) | \[Heredado\] El número de errores durante el procesamiento de una transacción de escritura para este índice secundario. Obsoleto desde 3.9|
| **aerospike.sindex.stat_write_reqs** <br>(gauge) | \[Heredado\] El número de intentos de procesar transacciones de escritura para este índice secundario. Obsoleto desde 3.9|
| **aerospike.sindex.stat_write_success** <br>(gauge) | \[Heredado\] El número de transacciones de escritura exitosas procesadas para este índice secundario. Obsoleto desde 3.9|
| **aerospike.sindex.write_error** <br>(gauge) | \[Heredado\] Número de errores durante el procesamiento de una transacción de escritura para este índice secundario.|
| **aerospike.sindex.write_success** <br>(gauge) | \[Heredado\] Número de transacciones de escritura procesadas con éxito para este índice secundario.|
| **aerospike.sindex_gc_activity_dur** <br>(gauge) | \[Heredado\] La suma de la actividad del subproceso GC de sindex. Obsoleto desde 3.14<br>_Se muestra como milisegundo_ |
| **aerospike.sindex_gc_garbage_cleaned** <br>(gauge) | \[Heredado\] La suma de entradas de elementos no usados de índice secundario limpiadas por GC de sindex.|
| **aerospike.sindex_gc_garbage_found** <br>(gauge) | \[Heredado\] La suma de entradas de elementos no usados de índice secundario encontradas por GC de sindex.|
| **aerospike.sindex_gc_inactivity_dur** <br>(gauge) | \[Heredado\] La suma de la inactividad del subproceso GC de sindex. Obsoleto desde 3.14<br>_Se muestra como milisegundo_ |
| **aerospike.sindex_gc_list_creation_time** <br>(gauge) | \[Heredado\] La suma del tiempo empleado en encontrar entradas de elementos no usados de índice secundario por GC de sindex. Obsoleto desde 3.14<br>_Se muestra como milisegundo_ |
| **aerospike.sindex_gc_list_deletion_time** <br>(gauge) | \[Heredado\] La suma del tiempo empleado en limpiar las entradas de elementos no usados de sindex por GC de sindex<br>_Se muestra como milisegundo_ |
| **aerospike.sindex_gc_locktimedout** <br>(gauge) | \[Heredado\] El número de veces que la iteración gc de sindex se agotó esperando el bloqueo de la partición.|
| **aerospike.sindex_gc_objects_validated** <br>(gauge) | \[Heredado\] El número de entradas de índice secundario procesadas por GC de sindex.|
| **aerospike.sindex_gc_retries** <br>(gauge) | \[Heredado\] El número de reintentos cuando GC de sindex no puede obtener el bloqueo de ramas.|
| **aerospike.sindex_ucgarbage_found** <br>(gauge) | \[Heredado\] El número de entradas de elementos no usados no limpiables en los sindexes encontrados a través de consultas.|
| **aerospike.sindex_used_bytes_memory** <br>(gauge) | \[Heredado\] La cantidad de memoria ocupada por índices secundarios en este nodo. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.stat_cluster_key_err_ack_dup_trans_reenqueue** <br>(gauge) | \[Heredado\] Número de transacciones duplicadas que se han vuelto a poner en cola debido a la falta de coincidencia de la clave del clúster. Obsoleto desde 3.9|
| **aerospike.stat_cluster_key_err_ack_rw_trans_reenqueue** <br>(gauge) | \[Heredado\] El número de transacciones de lectura/escritura que vuelven a estar en cola debido a la falta de coincidencia de clave de clúster. Obsoleto|
| **aerospike.stat_cluster_key_partition_transaction_queue_count** <br>(gauge) | \[Heredado\] El número de transacciones de partición en cola. Obsoleto|
| **aerospike.stat_cluster_key_prole_retry** <br>(gauge) | \[Heredado\] El número de veces que una escritura prole fue reintentada como resultado de una no coincidencia en la clave del clúster. Obsoleto|
| **aerospike.stat_cluster_key_regular_processed** <br>(gauge) | \[Heredado\] Número de transacciones correctas que han superado el test de clave de clúster. Obsoleto|
| **aerospike.stat_cluster_key_trans_to_proxy_retry** <br>(gauge) | \[Heredado\] El número de veces que un proxy fue redirigido. Obsoleto|
| **aerospike.stat_cluster_key_transaction_reenqueue** <br>(gauge) | \[Heredado\]|
| **aerospike.stat_delete_success** <br>(gauge) | \[Heredado\] El número de registros borrados con éxito. Obsoleto desde 3.9|
| **aerospike.stat_deleted_set_objects** <br>(gauge) | \[Heredado\] El número de objetos de conjunto eliminados como resultado de un comando 'set-delete'. Obsoleto desde 3.9|
| **aerospike.stat_duplicate_operation** <br>(gauge) | \[Heredado\] El número de transacciones de lectura/escritura que requieren resolución de duplicados. Obsoleto desde 3.9|
| **aerospike.stat_evicted_objects** <br>(gauge) | \[Heredado\] El número de objetos desalojados. Obsoleto desde 3.9|
| **aerospike.stat_evicted_objects_time** <br>(gauge) | \[Heredado\] El tiempo medio de expiración (TTL) de los objetos desalojados en la última iteración. Obsoleto desde 3.9|
| **aerospike.stat_evicted_set_objects** <br>(gauge) | \[Heredado\] El número de objetos desalojados de un conjunto debido a los límites definidos en la configuración de Aerospike. Obsoleto|
| **aerospike.stat_expired_objects** <br>(gauge) | \[Heredado\] El número de objetos caducados. Obsoleto desde 3.9|
| **aerospike.stat_ldt_proxy** <br>(gauge) | \[Heredado\] El número de proxies para registros LDT. Obsoleto desde 3.9|
| **aerospike.stat_nsup_deletes_not_shipped** <br>(gauge) | \[Heredado\] El número de borrados resultantes de desalojo/expiración etc. que no son enviados. Obsoleto desde 3.9|
| **aerospike.stat_proxy_errs** <br>(gauge) | \[Heredado\] El número de solicitudes proxy que devuelven errores. Obsoleto desde 3.9|
| **aerospike.stat_proxy_reqs** <br>(gauge) | \[Heredado\] El número de solicitudes proxy intentadas. Obsoleto desde 3.9|
| **aerospike.stat_proxy_reqs_xdr** <br>(gauge) | \[Heredado\] El número de operaciones XDR que resultaron en proxies. Obsoleto desde 3.9|
| **aerospike.stat_proxy_success** <br>(gauge) | \[Heredado\] El número de solicitudes proxy enviadas con éxito. Obsoleto desde 3.9|
| **aerospike.stat_read_errs_notfound** <br>(gauge) | \[Heredado\] El número de solicitudes de lectura que resultan en el error: 'clave no encontrada'. Obsoleto desde 3.9|
| **aerospike.stat_read_errs_other** <br>(gauge) | \[Heredado\] El número de solicitudes de lectura que resultan en otros errores. Obsoleto desde 3.9|
| **aerospike.stat_read_reqs** <br>(gauge) | \[Heredado\] El número total de solicitudes de lectura intentadas. Obsoleto desde 3.9|
| **aerospike.stat_read_reqs_xdr** <br>(gauge) | \[Heredado\] El número de solicitudes de lectura XDR intentadas. Obsoleto desde 3.9|
| **aerospike.stat_read_success** <br>(gauge) | \[Heredado\] El número de solicitudes de lectura con éxito. Obsoleto desde 3.9|
| **aerospike.stat_recs_inflight** <br>(gauge) | \[Heredado\]|
| **aerospike.stat_recs_linkdown_processed** <br>(gauge) | \[Heredado\]|
| **aerospike.stat_recs_logged** <br>(gauge) | \[Heredado\] El número de registros ingresados en el resumen de log. Obsoleto desde 3.9|
| **aerospike.stat_recs_logged_master** <br>(gauge) | \[Heredado\]|
| **aerospike.stat_recs_outstanding** <br>(gauge) | \[Heredado\] El número de registros pendientes aún no procesados por el subproceso principal. Obsoleto desde 3.9|
| **aerospike.stat_recs_relogged** <br>(gauge) | \[Heredado\] El número de registros ingresados por este nodo en el resumen de log debido a problemas temporales al intentar el envío. Obsoleto desde 3.9|
| **aerospike.stat_recs_relogged_incoming** <br>(gauge) | \[Heredado\] Número de registros ingresados en el resumen de log de este nodo por otro nodo. Obsoleto desde 3.9|
| **aerospike.stat_recs_relogged_outgoing** <br>(gauge) | \[Heredado\] El número de registros ingresados al resumen de log de otro nodo. Obsoleto desde 3.9|
| **aerospike.stat_recs_replprocessed** <br>(gauge) | \[Heredado\] El número de registros procesados para un nodo en el clúster que no es el nodo local. Obsoleto desde 3.9|
| **aerospike.stat_recs_shipped** <br>(gauge) | \[Heredado\] El número de registros enviados a clústeres remotos de Aerospike. Incluye errores. Obsoleto desde 3.9|
| **aerospike.stat_recs_shipped_binlevel** <br>(gauge) | \[Heredado\] El número de registros que aprovecharon el envío a nivel de contenedor. Obsoleto desde 3.9|
| **aerospike.stat_recs_shipped_ok** <br>(gauge) | \[Heredado\] El número de registros enviados con éxito a clústeres remotos de Aerospike. Obsoleto desde 3.9|
| **aerospike.stat_rw_timeout** <br>(gauge) | \[Heredado\] El número de solicitudes de lectura y escritura fallidas debido al tiempo de espera en el servidor. Obsoleto desde 3.9|
| **aerospike.stat_slow_trans_queue_batch_pop** <br>(gauge) | \[Heredado\] El número de veces que hemos movido un lote de transacciones de la cola lenta a la cola rápida. Obsoleto|
| **aerospike.stat_slow_trans_queue_pop** <br>(gauge) | \[Heredado\] El número de transacciones que se han movido de la cola lenta a la cola rápida. Obsoleto|
| **aerospike.stat_slow_trans_queue_push** <br>(gauge) | \[Heredado\] El número de transacciones que hemos empujado a la cola lenta. Obsoleto|
| **aerospike.stat_write_errs** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura que resultan en errores. Obsoleto desde 3.9|
| **aerospike.stat_write_errs_notfound** <br>(gauge) | \[Heredado\] El número de errores que devuelven "clave no encontrada" en una solicitud de escritura. Obsoleto desde 3.9|
| **aerospike.stat_write_errs_other** <br>(gauge) | \[Heredado\] El número de errores que no sean 'no encontrados' en una solicitud de escritura. Obsoleto desde 3.9|
| **aerospike.stat_write_reqs** <br>(gauge) | \[Heredado\] El número total de solicitudes de escritura intentadas. Obsoleto desde 3.9|
| **aerospike.stat_write_reqs_xdr** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura de XDR. Obsoleto desde 3.9|
| **aerospike.stat_write_success** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura con éxito. Obsoleto desde 3.9|
| **aerospike.stat_xdr_pipe_miss** <br>(gauge) | \[Heredado\] Número de registros de log que el servidor no ha podido escribir en el pipeline indicado. Generalmente ocurre cuando se cierra el extremo XDR del pipeline. Obsoleto desde 3.8.1|
| **aerospike.stat_xdr_pipe_writes** <br>(gauge) | \[Heredado\] El número de registros de log que fueron escritos en el pipeline nombrado por el servidor. Obsoleto desde 3.8.1|
| **aerospike.stat_zero_bin_records** <br>(gauge) | \[Heredado\] El número de write_requests que fallaron debido a cero registros bin. Obsoleto desde 3.9|
| **aerospike.storage_defrag_corrupt_record** <br>(gauge) | \[Heredado\] El número de veces que el subproceso de desfragmentación encontró registros no válidos. Obsoleto desde 3.9|
| **aerospike.sub_records** <br>(gauge) | \[Heredado\] El número de subobjetos. Sustituir por sub_objects stat en 3.9.|
| **aerospike.system_free_mem_pct** <br>(gauge) | \[Heredado\] Porcentaje de memoria libre del sistema.<br>_Se muestra como porcentaje_ |
| **aerospike.system_kernel_cpu_pct** <br>(gauge) | \[Heredado\] El porcentaje de uso de la CPU por los procesos que se ejecutan en modo kernel.<br>_Se muestra como porcentaje_ |
| **aerospike.system_swapping** <br>(gauge) | \[Heredado\] Indica que el sistema está actualmente intercambiando RAM a disco|
| **aerospike.system_total_cpu_pct** <br>(gauge) | \[Heredado\] El porcentaje de uso de la CPU por todos los procesos en ejecución.<br>_Se muestra como porcentaje_ |
| **aerospike.system_user_cpu_pct** <br>(gauge) | \[Heredado\] El porcentaje de uso de la CPU por los procesos que se ejecutan en modo de usuario.<br>_Se muestra como porcentaje_ |
| **aerospike.time_since_rebalance** <br>(gauge) | \[Heredado\] El número de segundos transcurridos desde el último evento de reagrupación, ya sea desencadenado a través del comando recluster info o por una interrupción del clúster (como la adición/eliminación de un nodo o una interrupción de la red).<br>_Se muestra como segundo_ |
| **aerospike.tombstones** <br>(gauge) | \[Heredado\] El número total de lápidas en este nodo.|
| **aerospike.total_bytes_disk** <br>(gauge) | \[Heredado\] El total de bytes de espacio en disco asignados en este nodo. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.total_bytes_memory** <br>(gauge) | \[Heredado\] El total de bytes de memoria asignados en este nodo. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.total_recs_dlog** <br>(gauge) | \[Heredado\]|
| **aerospike.transaction_queue_used** <br>(gauge) | \[Heredado\]|
| **aerospike.transaction_queue_used_pct** <br>(gauge) | \[Heredado\]<br>_Se muestra en porcentaje_ |
| **aerospike.transactions** <br>(gauge) | \[Heredado\] El número total de transacciones ejecutadas por este nodo; incluye todos los comandos de lectura/escritura/información. Obsoleto desde 3.9|
| **aerospike.tree_count** <br>(gauge) | \[Heredado\] El número de árboles de índice actualmente activos en el nodo. Obsoleto desde 3.9|
| **aerospike.tree_gc_queue** <br>(gauge) | \[Heredado\] El número de árboles en cola listos para ser eliminados por completo (caída de particiones).|
| **aerospike.tscan_aborted** <br>(gauge) | \[Heredado\] El número de escaneos que fueron abortados. Obsoleto a partir de 3.6.0.|
| **aerospike.tscan_initiate** <br>(gauge) | \[Heredado\] El número de nuevas solicitudes de escaneo iniciadas. Obsoleto a partir de 3.6.0.|
| **aerospike.tscan_pending** <br>(gauge) | \[Heredado\] El número de solicitudes de escaneo pendientes. Obsoleto a partir de 3.6.0.|
| **aerospike.tscan_succeeded** <br>(gauge) | \[Heredado\] El número de solicitudes de escaneo que han finalizado con éxito. Obsoleto a partir de 3.6.0.|
| **aerospike.tsvc_queue** <br>(gauge) | \[Heredado\] Número de solicitudes pendientes de ejecución en la cola de transacciones|
| **aerospike.udf_bg_scans_failed** <br>(gauge) | \[Heredado\] El número de trabajos udf en segundo plano que han fallado. Obsoleto desde 3.9|
| **aerospike.udf_bg_scans_succeeded** <br>(gauge) | \[Heredado\] El número de trabajos udf en segundo plano que se han completado. Obsoleto desde 3.9|
| **aerospike.udf_delete_err_others** <br>(gauge) | \[Heredado\] El número de errores encontrados durante la eliminación de UDF. Obsoleto desde 3.9|
| **aerospike.udf_delete_reqs** <br>(gauge) | \[Heredado\] El número de solicitudes de borrado UDF intentadas. Obsoleto desde 3.9|
| **aerospike.udf_delete_success** <br>(gauge) | \[Heredado\] El número de operaciones de borrado UDF realizadas con éxito. Obsoleto desde 3.9|
| **aerospike.udf_lua_errs** <br>(gauge) | \[Heredado\] El número total de errores de Lua. Obsoleto desde 3.9|
| **aerospike.udf_query_rec_reqs** <br>(gauge) | \[Heredado\] El número de llamadas UDF de registro en un trabajo udf de consulta en segundo plano. Obsoleto desde 3.9|
| **aerospike.udf_read_errs_other** <br>(gauge) | \[Heredado\] El número de operaciones de lectura UDF fallidas. Obsoleto desde 3.9|
| **aerospike.udf_read_reqs** <br>(gauge) | \[Heredado\] El número de solicitudes de lectura UDF intentadas. Obsoleto desde 3.9|
| **aerospike.udf_read_success** <br>(gauge) | \[Heredado\] Número de operaciones de lectura UDF realizadas con éxito. Obsoleto desde 3.9|
| **aerospike.udf_replica_writes** <br>(gauge) | \[Heredado\] El número de escrituras de réplica UDF. Obsoleto desde 3.9|
| **aerospike.udf_scan_rec_reqs** <br>(gauge) | \[Heredado\] El número de llamadas UDF de registro en un trabajo udf de escaneo en segunudo plano. Obsoleto desde 3.9|
| **aerospike.udf_write_err_others** <br>(gauge) | \[Heredado\] El número de operaciones de escritura UDF fallidas. Obsoleto desde 3.9|
| **aerospike.udf_write_reqs** <br>(gauge) | \[Heredado\] El número de solicitudes de escritura UDF intentadas. Obsoleto desde 3.9|
| **aerospike.udf_write_success** <br>(gauge) | \[Heredado\] El número de operaciones de escritura UDF realizadas con éxito. Obsoleto desde 3.9|
| **aerospike.uptime** <br>(gauge) | \[Heredado\] El tiempo desde el último reinicio del servidor.<br>_Se muestra como segundo_ |
| **aerospike.used_bytes_disk** <br>(gauge) | \[Heredado\] El total de bytes de espacio en disco utilizado en este nodo. Obsoleto<br>_Se muestra como byte_ |
| **aerospike.used_bytes_memory** <br>(gauge) | \[Heredado\] El total de bytes de memoria utilizados en este nodo. Obsoleto desde 3.9<br>_Se muestra como byte_ |
| **aerospike.used_recs_dlog** <br>(gauge) | \[Heredado\]|
| **aerospike.waiting_transactions** <br>(gauge) | \[Heredado\] El número de transacciones de lectura/escritura actualmente en cola. Obsoleto desde 3.9|
| **aerospike.write_master** <br>(gauge) | \[Heredado\] El número de escrituras maestras realizadas por este nodo. Obsoleto desde 3.9|
| **aerospike.write_prole** <br>(gauge) | \[Heredado\] El número de escrituras prole (réplica) realizadas por este nodo. Obsoleto desde 3.9|
| **aerospike.xdr.abandoned.count** <br>(count) | \[OpenMetricsV2 y Aerospike 5.0+\] Número de registros abandonados por fallo permanente en el destino.|
| **aerospike.xdr.lag** <br>(gauge) | \[OpenMetricsV2 y Aerospike v5.0+\] Retraso en segundos entre los centros de datos de destino y fuente|
| **aerospike.xdr.lap_us** <br>(gauge) | \[OpenMetricsV2 y Aerospike v5.0+\] Tiempo en microsegundos tomado para procesar registros a través de particiones en una vuelta (ciclo de procesamiento).|
| **aerospike.xdr.latency_ms** <br>(gauge) | \[OpenMetricsV2 y Aerospike v5.0+\] Latencia de red media para la latencia enviada con éxito.|
| **aerospike.xdr.recoveries.count** <br>(count) | \[OpenMetricsV2 y Aerospike v5.0+\] Número de particiones que se recuperan reduciendo el índice primario de esa partición.|
| **aerospike.xdr.recoveries_pending** <br>(gauge) | \[OpenMetricsV2 y Aerospike v5.0+\] Número de recuperaciones pendientes.|
| **aerospike.xdr.retry_conn_reset.count** <br>(count) | \[OpenMetricsV2 y Aerospike v5.0+\] Número de registros cuyo envío se vuelve a intentar debido a un reinicio de la conexión al centro de datos remoto.|
| **aerospike.xdr.retry_dest.count** <br>(count) | \[OpenMetricsV2 y Aerospike v5.0+\] Número de registros reintentados debido a un error temporal devuelto por el nodo de destino.|
| **aerospike.xdr.retry_no_node.count** <br>(count) | \[OpenMetricsV2 y Aerospike v5.0+\] Número de registros reintentados porque XDR no puede determinar qué nodo de destino es el maestro.|
| **aerospike.xdr.success.count** <br>(count) | \[OpenMetricsV2 y Aerospike v5.0+\] Número de registros enviados con éxito a centros de datos remotos.|
| **aerospike.xdr_active_failed_node_sessions** <br>(gauge) | \[Heredado\] La sesión de nodo fallido mantiene un registro de los nodos en el clúster local que han abandonado el clúster y necesitan que otros nodos realicen envíos en su nombre hasta que se unan de nuevo.|
| **aerospike.xdr_active_link_down_sessions** <br>(gauge) | \[Heredado\] La sesión de enlace caído mantiene un registro de los clústeres de destino que no son alcanzables durante una ventana de tiempo determinada.|
| **aerospike.xdr_deletes_canceled** <br>(gauge) | \[Heredado\] El número de operaciones de borrado que no se enviaron porque el registro reapareció en el servidor local. Obsoleto desde 3.9|
| **aerospike.xdr_deletes_shipped** <br>(gauge) | \[Heredado\] El número de operaciones de borrado que se enviaron con éxito. Obsoleto desde 3.9|
| **aerospike.xdr_global_lastshiptime** <br>(gauge) | \[Heredado\] La última hora mínima de envío en milisegundos (epoch) para XDR para todo el clúster.<br>_Se muestra como milisegundo_ |
| **aerospike.xdr_hotkey_fetch** <br>(gauge) | \[Heredado\] El número de resumen del registro que se envía realmente porque sus entradas de caché caducaron y estaban sucias. Debe interpretarse junto con xdr_hotkey_skip|
| **aerospike.xdr_hotkey_skip** <br>(gauge) | \[Heredado\] El número de resumen de registro que se omite debido a una entrada ya existente en la caché de subprocesos del lector (lo que significa que se acaba de enviar una versión de este registro). Debe interpretarse junto con xdr_hotkey_fetch|
| **aerospike.xdr_min_lastshipinfo** <br>(gauge) | \[Heredado\] La última hora mínima de envío en milisegundos (epoch) para XDR para todo el clúster. Obsoleto desde 3.10|
| **aerospike.xdr_queue_overflow_error** <br>(gauge) | \[Heredado\] Número de errores de desborde de la cola XDR. Suele ocurrir cuando no hay espacio físico disponible en el almacenamiento que contiene el resumen de log o si las escrituras se producen a un ritmo tal que los elementos no se escriben lo suficientemente rápido en el resumen de log.|
| **aerospike.xdr_read_active_avg_pct** <br>(gauge) | \[Heredado\] Cuán ocupados están los subprocesos de lectura XDR calculando el tiempo medio en porcentaje del tiempo total que los subprocesos de lectura XDR pasan realmente procesando algo frente a la espera de que llegue a sus colas una nueva entrada del resumen de log del dlogreader/failed node shippers/window shippers.<br>_Se muestra en porcentaje_ |
| **aerospike.xdr_read_error** <br>(gauge) | \[Heredado\] El número de solicitudes de lectura iniciadas por XDR que fallaron.|
| **aerospike.xdr_read_idle_avg_pct** <br>(gauge) | \[Heredado\] Estadística relacionada con xdr_read_active_avg_pct y representa el tiempo medio en porcentaje del tiempo total que los subprocesos de lectura XDR esperan a que llegue a sus colas una nueva entrada del resumen de log desde dlogreader/failed node shippers/window shippers.<br>_Se muestra en porcentaje_ |
| **aerospike.xdr_read_latency_avg** <br>(gauge) | \[Heredado\] La latencia media móvil para XDR para leer un registro.<br>_Se muestra como milisegundo_ |
| **aerospike.xdr_read_not_found** <br>(gauge) | \[Heredado\] El número de solicitudes de lectura iniciadas por XDR que no se encontraron.|
| **aerospike.xdr_read_reqq_used** <br>(gauge) | \[Heredado\] El número de entradas del resumen de log están actualmente en las colas de subprocesos de lectura XDR.|
| **aerospike.xdr_read_reqq_used_pct** <br>(gauge) | \[Heredado\] Estadística relacionada con xdr_read_reqq_utilizada para representar el porcentaje de llenado de las colas de solicitudes de lectura XDR.<br>_Se muestra como porcentaje_ |
| **aerospike.xdr_read_respq_used** <br>(gauge) | \[Heredado\] El número de entradas que se están utilizando en las colas de respuesta de lectura XDR.|
| **aerospike.xdr_read_success** <br>(gauge) | \[Heredado\] Número de solicitudes de lectura iniciadas por XDR que han tenido éxito.|
| **aerospike.xdr_read_txnq_used** <br>(gauge) | \[Heredado\] El número de transacciones de lectura XDR que están en vuelo en la cola de transacciones local.|
| **aerospike.xdr_read_txnq_used_pct** <br>(gauge) | \[Heredado\] El porcentaje utilizado de las transacciones de lectura XDR que están en vuelo (de un máximo permitido de 10000) en la cola de transacciones (que también se utiliza para las transacciones regulares de los clientes). <br>_Se muestra como porcentaje_ |
| **aerospike.xdr_relogged_incoming** <br>(gauge) | \[Heredado\] Número de registros ingresados en el resumen de log de este nodo por otro nodo.|
| **aerospike.xdr_relogged_outgoing** <br>(gauge) | \[Heredado\] El número de registros ingresados al resumen de log de otro nodo.|
| **aerospike.xdr_ship_bytes** <br>(gauge) | \[Heredado\] El número estimado de bytes que XDR ha enviado a clústeres remotos.|
| **aerospike.xdr_ship_compression_avg_pct** <br>(gauge) | \[Heredado\] Determina lo beneficiosa que es la compresión (cuanto más alta, mejor)<br>_Se muestra como porcentaje_ |
| **aerospike.xdr_ship_delete_success** <br>(gauge) | \[Heredado\] El número de operaciones de borrado que se enviaron con éxito.|
| **aerospike.xdr_ship_destination_error** <br>(gauge) | \[Heredado\] Número de errores del clúster o clústeres remotos durante el envío de registros.|
| **aerospike.xdr_ship_destination_permanent_error** <br>(gauge) | \[Heredado\] Número de errores permanentes del clúster o clústeres remotos durante el envío de registros.<br>_Se muestra como error_ |
| **aerospike.xdr_ship_full_record** <br>(gauge) | \[Heredado\] Número de registros que no aprovecharon el envío a nivel de bin|
| **aerospike.xdr_ship_inflight_objects** <br>(gauge) | \[Heredado\] El número de objetos que están en vuelo (que han sido enviados pero para los que aún no se ha recibido una respuesta del DC remoto).|
| **aerospike.xdr_ship_latency_avg** <br>(gauge) | \[Heredado\] La latencia media móvil para enviar un registro a clústeres remotos de Aerospike.<br>_Se muestra como milisegundo_ |
| **aerospike.xdr_ship_outstanding_objects** <br>(gauge) | \[Heredado\] El número de registros pendientes aún no procesados. |
| **aerospike.xdr_ship_source_error** <br>(gauge) | \[Heredado\] El número de errores de capa de cliente durante el envío de registros.|
| **aerospike.xdr_ship_success** <br>(gauge) | \[Heredado\] El número de registros enviados con éxito a clústeres remotos de Aerospike. En todos los centros de datos, lo que significa que un registro enviado con éxito a 3 centros de datos diferentes incrementará este contador en 3.|
| **aerospike.xdr_throughput** <br>(gauge) | \[Heredado\] El rendimiento de registros por segundo que XDR puede enviar actualmente en todos los centros de datos configurados.<br>_Se muestra como registro_ |
| **aerospike.xdr_timelag** <br>(gauge) | \[Heredado\] La diferencia entre la hora actual y la marca de tiempo del registro que se intentó enviar por última vez<br>_Se muestra como segundo_ |
| **aerospike.xdr_uninitialized_destination_error** <br>(gauge) | \[Heredado\] El número de registros en el resumen de log que no se han enviado porque el clúster de destino no se ha inicializado para un DC que está configurado para un espacio de nombres.|
| **aerospike.xdr_unknown_namespace_error** <br>(gauge) | \[Heredado\] Número de registros del resumen de log no enviados por pertenecer a un espacio de nombres desconocido en el clúster fuente.|
| **aerospike.xdr_uptime** <br>(gauge) | \[Heredado\] El tiempo que lleva ejecutándose el proceso XDR. Obsoleto en 3.11.1.1<br>_Se muestra como segundo_ |

### Checks de servicio

**aerospike.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, critical_

### Eventos

Aerospike no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).