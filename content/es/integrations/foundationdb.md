---
app_id: foundationdb
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Integración de FoundationDB
integration_version: 3.3.1
media: []
supported_os:
- linux
- macos
- windows
title: FoundationDB
---
## Información general

Este check monitoriza [FoundationDB](https://www.foundationdb.org/) a través del Datadog Agent . Además de
comprobar que el clúster de FoundationDB esté en buen estado, también recopila numerosas métricas
y, opcionalmente, logs de transacciones de FoundationDB.

## Configuración

Tanto el check como las métricas se aplican al clúster de FoundationDB en su conjunto
y solo deben instalarse en un host. El host no necesita ser uno que esté
ejecutando FoundationDB, sino uno con acceso a él.

### Instalación

El check de FoundationDB está incluido en el paquete del [Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest),
pero requiere la instalación del [cliente de FoundationDB](https://apple.github.io/foundationdb/downloads.html).

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Para empezar a recopilar tus métricas de FoundationDB, edita el archivo `foundationdb.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent.
   Consulta [ejemplo de foundationdb.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/foundationdb/datadog_checks/foundationdb/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. El clúster que se debe check se determina buscando un archivo de clúster en la [ubicación predeterminada](https://apple.github.io/foundationdb/administration.html#default-cluster-file). Si el archivo de clúster se encuentra en otro lugar,
   configura la propiedad `cluster_file`. Solo se puede monitorizar un clúster por instancia de check.

1. Si el clúster está [configurado para utilizar TLS](https://www.foundationdb.org/), se deben ajustar más propiedades en la configuración. Estas propiedades siguen los nombres de las opciones
   relacionadas con TLS que se dan a `fdbcli` para conectarse a un clúster de este tipo.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

FoundationDB escribe logs de XML en forma predeterminada, sin embargo, las integraciones de Datadog esperan logs de JSON. Por lo tanto, es necesario realizar un cambio de configuración a
FoundationDB.

1. Localiza tu archivo `foundationdb.conf`. En la sección `fdbserver`, añade
   o cambia la clave `trace_format` para que tenga el valor `json`. Además, toma
   nota de la `logdir`.

   ```
   [fdbserver]
   ...
   logdir = /var/log/foundationdb
   trace_format = json
   ```

1. Reinicia el servidor de FoundationDB para que los cambios surtan efecto. Comprueba que los
   logs en `logdir` se escriban en JSON.

1. Asegúrate de que la recopilación de logs esté activada en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. En el archivo `foundationdb.d/conf.yaml`, quita el comentario de la sección `logs` 
   y configura la ruta a la de tu archivo de configuración de FoundationDB,
   anexando `*.json`.

   ```yaml
   logs:
     - type: file
       path: /var/log/foundationdb/*.json
       service: foundationdb
       source: foundationdb
   ```

1. Asegúrate de que el Datadog Agent tenga los privilegios necesarios para enumerar el
   directorio y leer sus archivos.

1. Reinicia el Datadog Agent.

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `foundationdb`                                             |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{}`                                                       |

##### Recopilación de logs

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "foundationdb", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `foundationdb` en la sección **Checks**.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **foundationdb.clients.connected** <br>(gauge) | Número de clientes conectados etiquetados por versión de cliente<br>_Mostrado como connection (conexión)_ |
| **foundationdb.cluster_generation** <br>(gauge) | |
| **foundationdb.coordinators** <br>(gauge) | Número de coordinadores etiquetados por accesibilidad<br>_Mostrado como instancia_ |
| **foundationdb.data.average_partition_size_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.data.least_operating_space_bytes_log_server** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.data.moving_data.in_flight_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.data.moving_data.in_queue_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.data.moving_data.total_written_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.data.partitions_count** <br>(gauge) | |
| **foundationdb.data.system_kv_size_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.data.total_disk_used_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.data.total_kv_size_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.datacenter_lag.seconds** <br>(gauge) | <br>_Mostrado como segundo_ |
| **foundationdb.degraded_processes** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.excluded_machines** <br>(gauge) | <br>_Mostrado como host_ |
| **foundationdb.excluded_processes** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.fault_tolerance.max_zone_failures_without_losing_availability** <br>(gauge) | <br>_Mostrado como ubicación_ |
| **foundationdb.fault_tolerance.max_zone_failures_without_losing_data** <br>(gauge) | <br>_Mostrado como ubicación_ |
| **foundationdb.instances** <br>(count) | <br>_Mostrado como instancia_ |
| **foundationdb.latency_probe.batch_priority_transaction_start_seconds** <br>(gauge) | Segundos de inicio de la transacción de prioridad por lotes<br>_Mostrado como segundo_ |
| **foundationdb.latency_probe.commit_seconds** <br>(gauge) | <br>_Mostrado como segundo_ |
| **foundationdb.latency_probe.immediate_priority_transaction_start_seconds** <br>(gauge) | <br>_Mostrado como segundo_ |
| **foundationdb.latency_probe.read_seconds** <br>(gauge) | <br>_Mostrado como segundo_ |
| **foundationdb.latency_probe.transaction_start_seconds** <br>(gauge) | <br>_Mostrado como segundo_ |
| **foundationdb.machines** <br>(gauge) | <br>_Mostrado como host_ |
| **foundationdb.maintenance_seconds_remaining** <br>(gauge) | <br>_Mostrado como segundo_ |
| **foundationdb.process.cpu.usage_cores** <br>(gauge) | <br>_Mostrado como núcleo_ |
| **foundationdb.process.disk.busy** <br>(gauge) | <br>_Mostrado como fracción_ |
| **foundationdb.process.disk.free_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.disk.reads.hz** <br>(gauge) | <br>_Mostrado como leído_ |
| **foundationdb.process.disk.total_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.disk.writes.hz** <br>(gauge) | <br>_Mostrado como escrito_ |
| **foundationdb.process.memory.available_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.memory.limit_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.memory.unused_allocated_memory** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.memory.used_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.network.connection_errors.hz** <br>(gauge) | <br>_Mostrado como error_ |
| **foundationdb.process.network.connections_closed.hz** <br>(gauge) | <br>_Mostrado como connection (conexión)_ |
| **foundationdb.process.network.connections_established.hz** <br>(gauge) | <br>_Mostrado como connection (conexión)_ |
| **foundationdb.process.network.current_connections** <br>(gauge) | <br>_Mostrado como connection (conexión)_ |
| **foundationdb.process.network.megabits_received.hz** <br>(gauge) | |
| **foundationdb.process.network.megabits_sent.hz** <br>(gauge) | |
| **foundationdb.process.network.tls_policy_failures.hz** <br>(gauge) | <br>_Mostrado como error_ |
| **foundationdb.process.role.bytes_queried.counter** <br>(count) | <br>_Mostrado como consulta_ |
| **foundationdb.process.role.bytes_queried.hz** <br>(gauge) | <br>_Mostrado como consulta_ |
| **foundationdb.process.role.commit_latency_statistics.count** <br>(count) | <br>_Mostrado como milisegundos_ |
| **foundationdb.process.role.commit_latency_statistics.max** <br>(gauge) | <br>_Mostrado como milisegundos_ |
| **foundationdb.process.role.commit_latency_statistics.min** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.commit_latency_statistics.p25** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.commit_latency_statistics.p90** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.commit_latency_statistics.p99** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.data_lag.seconds** <br>(gauge) | <br>_Mostrado como segundo_ |
| **foundationdb.process.role.durability_lag.seconds** <br>(gauge) | <br>_Mostrado como segundo_ |
| **foundationdb.process.role.durable_bytes.counter** <br>(count) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.durable_bytes.hz** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.finished_queries.counter** <br>(count) | <br>_Mostrado como consulta_ |
| **foundationdb.process.role.finished_queries.hz** <br>(gauge) | <br>_Mostrado como consulta_ |
| **foundationdb.process.role.grv_latency_statistics.default.count** <br>(count) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.grv_latency_statistics.default.max** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.grv_latency_statistics.default.min** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.grv_latency_statistics.default.p25** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.grv_latency_statistics.default.p90** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.grv_latency_statistics.default.p99** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.input_bytes.counter** <br>(count) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.input_bytes.hz** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.keys_queried.counter** <br>(count) | <br>_Mostrado como clave_ |
| **foundationdb.process.role.keys_queried.hz** <br>(gauge) | <br>_Mostrado como clave_ |
| **foundationdb.process.role.kvstore_available_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.kvstore_free_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.kvstore_inline_keys** <br>(gauge) | <br>_Mostrado como clave_ |
| **foundationdb.process.role.kvstore_total_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.kvstore_total_nodes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.kvstore_total_size** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.kvstore_used_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.local_rate** <br>(gauge) | <br>_Mostrado como unidad_ |
| **foundationdb.process.role.low_priority_queries.counter** <br>(count) | <br>_Mostrado como consulta_ |
| **foundationdb.process.role.low_priority_queries.hz** <br>(gauge) | <br>_Mostrado como consulta_ |
| **foundationdb.process.role.mutation_bytes.counter** <br>(count) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.mutation_bytes.hz** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.mutations.counter** <br>(count) | <br>_Mostrado como artículo_ |
| **foundationdb.process.role.mutations.hz** <br>(gauge) | <br>_Mostrado como artículo_ |
| **foundationdb.process.role.query_queue_max** <br>(gauge) | <br>_Mostrado como consulta_ |
| **foundationdb.process.role.queue_disk_available_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.queue_disk_total_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.queue_length** <br>(gauge) | <br>_Mostrado como artículo_ |
| **foundationdb.process.role.read_latency_statistics.count** <br>(count) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.read_latency_statistics.max** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.read_latency_statistics.min** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.read_latency_statistics.p25** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.read_latency_statistics.p90** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.read_latency_statistics.p99** <br>(gauge) | <br>_Mostrado como milisegundo_ |
| **foundationdb.process.role.stored_bytes** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.process.role.total_queries.counter** <br>(count) | <br>_Mostrado como consulta_ |
| **foundationdb.process.role.total_queries.hz** <br>(gauge) | <br>_Mostrado como consulta_ |
| **foundationdb.processes** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.processes_per_role** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.processes_per_role.cluster_controller** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.processes_per_role.coordinator** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.processes_per_role.data_distributor** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.processes_per_role.log** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.processes_per_role.master** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.processes_per_role.proxy** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.processes_per_role.ratekeeper** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.processes_per_role.resolver** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.processes_per_role.storage** <br>(gauge) | <br>_Mostrado como proceso_ |
| **foundationdb.qos.batch_transactions_per_second_limit** <br>(gauge) | <br>_Mostrado como transacción_ |
| **foundationdb.qos.released_transactions_per_second** <br>(gauge) | <br>_Mostrado como transacción_ |
| **foundationdb.qos.transactions_per_second_limit** <br>(gauge) | <br>_Mostrado como transacción_ |
| **foundationdb.qos.worst_queue_bytes_log_server** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.qos.worst_queue_bytes_storage_server** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.workload.bytes.read.counter** <br>(count) | <br>_Mostrado como byte_ |
| **foundationdb.workload.bytes.read.hz** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.workload.bytes.written.counter** <br>(count) | <br>_Mostrado como byte_ |
| **foundationdb.workload.bytes.written.hz** <br>(gauge) | <br>_Mostrado como byte_ |
| **foundationdb.workload.keys.read.counter** <br>(count) | <br>_Mostrado como clave_ |
| **foundationdb.workload.keys.read.hz** <br>(gauge) | <br>_Mostrado como clave_ |
| **foundationdb.workload.operations.location_requests.counter** <br>(count) | <br>_Mostrado como operación_ |
| **foundationdb.workload.operations.location_requests.hz** <br>(gauge) | <br>_Mostrado como operación_ |
| **foundationdb.workload.operations.low_priority_reads.counter** <br>(count) | <br>_Mostrado como operación_ |
| **foundationdb.workload.operations.low_priority_reads.hz** <br>(gauge) | <br>_Mostrado como operación_ |
| **foundationdb.workload.operations.memory_errors.counter** <br>(count) | <br>_Mostrado como operación_ |
| **foundationdb.workload.operations.memory_errors.hz** <br>(gauge) | <br>_Mostrado como operación_ |
| **foundationdb.workload.operations.read_requests.counter** <br>(count) | <br>_Mostrado como operación_ |
| **foundationdb.workload.operations.read_requests.hz** <br>(gauge) | <br>_Mostrado como operación_ |
| **foundationdb.workload.operations.reads.counter** <br>(count) | <br>_Mostrado como operación_ |
| **foundationdb.workload.operations.reads.hz** <br>(gauge) | <br>_ Mostrado como operación_ |
| **foundationdb.workload.operations.writes.counter** <br>(count) | <br>_Mostrado como operación_ |
| **foundationdb.workload.operations.writes.hz** <br>(gauge) | <br>_Mostrado como operación_ |
| **foundationdb.workload.transactions.committed.counter** <br>(count) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.committed.hz** <br>(gauge) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.conflicted.counter** <br>(count) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.conflicted.hz** <br>(gauge) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.rejected_for_queued_too_long.counter** <br>(count) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.rejected_for_queued_too_long.hz** <br>(gauge) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.started.counter** <br>(count) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.started.hz** <br>(gauge) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.started_batch_priority.counter** <br>(count) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.started_batch_priority.hz** <br>(gauge) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.started_default_priority.counter** <br>(count) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.started_default_priority.hz** <br>(gauge) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.started_immediate_priority.counter** <br>(count) | <br>_Mostrado como transacción_ |
| **foundationdb.workload.transactions.started_immediate_priority.hz** <br>(gauge) | <br>_Mostrado como transacción_ |

### Checks de servicio

**foundationdb.check**

Devuelve crítico si hay un error que consulta el estado del clúster, que advierte si hay procesos degradados u ok en caso contrario.

_Estados: ok, warning, crítico_

### Eventos

El check de FoundationDB no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).