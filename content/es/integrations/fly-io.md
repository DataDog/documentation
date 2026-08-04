---
aliases:
- /es/integrations/fly_io
app_id: fly-io
categories:
- sistema operativo y sistema
- nube
- recopilación de logs
custom_kind: integración
description: Monitoriza tus aplicaciones y máquinas Fly.io.
integration_version: 3.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Fly.io
---
<div class="alert alert-warning">
Esta integración está en beta pública. Ten cuidado si la activas en cargas de trabajo de producción.
</div>

## Información general

Este check monitoriza las métricas de [Fly.io](https://fly.io/) a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en una aplicación Fly.

### Instalación

El check de Fly.io está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). Recomendamos desplegar una aplicación Fly.io dedicada a ejecutar el check del Datadog Agent. Este agente puede ejecutar el check de Fly.io, que repila [métricas de Prometheus](https://fly.io/docs/metrics-and-logs/metrics/#prometheus-on-fly-io) así como algunos datos adicionales de la [API de máquinas](https://fly.io/docs/machines/api/). Además, puedes configurar el Agent para recibir [traces (trazas)](#Application-Traces) y métricas personalizadas de todas tus aplicaciones Fly.io dentro de la organización.

#### Desplegar el Agent como una aplicación Fly.io

1. Crea una nueva aplicación en Fly.io con la imagen configurada como el [Datadog Agent](https://console.cloud.google.com/artifacts/docker/datadoghq/us/gcr.io/agent) al iniciar o proporciona la imagen en el archivo `fly.toml`:

   ```
   [build]
       image = 'gcr.io/datadoghq/agent:7'
   ```

1. Configura un [secreto](https://fly.io/docs/flyctl/secrets/) para tu clave de API de Datadog llamada `DD_API_KEY` y opcionalmente tu [sitio](https://docs.datadoghq.com/agent/troubleshooting/site/) como `DD_SITE`.

1. En el directorio de tu aplicación, crea un archivo `conf.yaml` para la integración Fly.io, [configura](#Configuration) la integración y móntala en el directorio `conf.d/fly_io.d/` del Agent como `conf.yaml`:

   ```
   instances:
   - empty_default_hostname: true
     headers:
         Authorization: Bearer <YOUR_FLY_TOKEN>
     machines_api_endpoint: http://_api.internal:4280
     org_slug: <YOUR_ORG_SLUG>
   ```

1. [Despliega](https://fly.io/docs/flyctl/deploy/) tu aplicación.

**Nota**: Para recopilar traces (trazas) y métricas personalizadas de tus aplicaciones, consulta [Traces (trazas) de aplicación](#Application-traces).

### Configuración

1. Edita el archivo `fly_io.d/conf.yaml`, ubicado en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent, para comenzar a recopilar tus datos de rendimiento de Fly.io. Consulta el [ejemplo fly_io.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/fly_io/datadog_checks/fly_io/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `fly_io` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **fly_io.app.concurrency** <br>(gauge) | |
| **fly_io.app.connect_time.bucket** <br>(count) | <br>_Mostrado como segundo_ |
| **fly_io.app.connect_time.count** <br>(count) | |
| **fly_io.app.connect_time.sum** <br>(count) | <br>_Mostrado como segundo_ |
| **fly_io.app.count** <br>(gauge) | Número de aplicaciones|
| **fly_io.app.http_response_time.bucket** <br>(count) | <br>_Mostrado como segundo_ |
| **fly_io.app.http_response_time.count** <br>(count) | |
| **fly_io.app.http_response_time.sum** <br>(count) | <br>_Mostrado como segundo_ |
| **fly_io.app.http_responses.count** <br>(gauge) | <br>_Mostrado como respuesta_ |
| **fly_io.app.tcp_connects.count** <br>(gauge) | |
| **fly_io.app.tcp_disconnects.count** <br>(gauge) | |
| **fly_io.edge.data_in** <br>(gauge) | <br>_Mostrado como byte_ |
| **fly_io.edge.data_out** <br>(gauge) | <br>_Mostrado como byte_ |
| **fly_io.edge.http_response_time.bucket** <br>(count) | <br>_Mostrado como segundo_ |
| **fly_io.edge.http_response_time.count** <br>(count) | |
| **fly_io.edge.http_response_time.sum** <br>(count) | <br>_Mostrado como segundo_ |
| **fly_io.edge.http_responses.count** <br>(gauge) | <br>_Mostrado como respuesta_ |
| **fly_io.edge.tcp_connects.count** <br>(gauge) | |
| **fly_io.edge.tcp_disconnects.count** <br>(gauge) | |
| **fly_io.edge.tls_handshake_errors** <br>(gauge) | <br>_Mostrado como error_ |
| **fly_io.edge.tls_handshake_time.bucket** <br>(count) | <br>_Mostrado como segundo_ |
| **fly_io.edge.tls_handshake_time.count** <br>(count) | |
| **fly_io.edge.tls_handshake_time.sum** <br>(count) | <br>_Mostrado como segundo_ |
| **fly_io.instance.cpu.count** <br>(count) | La cantidad de tiempo que cada CPU (cpu_id) ha pasado realizando diferentes tipos de trabajo (modo) en centisegundos.|
| **fly_io.instance.disk.io_in_progress** <br>(gauge) | Se incrementa a medida que se envían solicitudes a la cola_de_solicitudes apropiada y disminuye a medida que finalizan.|
| **fly_io.instance.disk.reads_completed.count** <br>(count) | Es el número total de lecturas finalizadas con éxito.|
| **fly_io.instance.disk.reads_merged.count** <br>(count) | Las lecturas y escrituras que son adyacentes entre sí pueden fusionarse para obtener una mayor eficiencia. Este campo permite saber con qué frecuencia se ha hecho.|
| **fly_io.instance.disk.sectors_read.count** <br>(count) | Es el número total de sectores leídos con éxito.|
| **fly_io.instance.disk.sectors_written.count** <br>(count) | Es el número total de sectores escritos con éxito.|
| **fly_io.instance.disk.time_io.count** <br>(count) | Cuenta los jiffies cuando al menos una solicitud se ha iniciado o finalizado. Si la solicitud se ejecuta en más de 2 jiffies, es posible que parte del tiempo de E/S no se contabilice en case (incidencia) de solicitudes concurrentes.<br>_Mostrado en milisegundos_ |
| **fly_io.instance.disk.time_io_weighted.count** <br>(count) | Se incrementa en cada inicio de E/S, finalización de E/S, fusión de E/S o lectura de estas estadísticas por el número de E/S en curso (campo 9) multiplicado por el número de milisegundos empleados en realizar E/S desde la última actualización de este campo.<br>_Mostrado como milisegundo_. |
| **fly_io.instance.disk.time_reading.count** <br>(count) | Este es el número total de milisegundos empleados por todas las lecturas.<br>_Mostrado como milisegundo_ |
| **fly_io.instance.disk.time_writing.count** <br>(count) | Este es el número total de milisegundos empleados por todas las escrituras<br>_Mostrado como milisegundo_ |
| **fly_io.instance.disk.writes_completed.count** <br>(count) | Es el número total de escrituras finalizadas con éxito.|
| **fly_io.instance.disk.writes_merged.count** <br>(count) | Las lecturas y escrituras que son adyacentes entre sí pueden fusionarse para obtener mayor eficiencia. Este campo permite saber con qué frecuencia se ha hecho.|
| **fly_io.instance.filefd.allocated** <br>(gauge) | Número de descriptores de archivo asignados|
| **fly_io.instance.filefd.max** <br>(gauge) | Número máximo de descriptores de archivo|
| **fly_io.instance.filesystem.block_size** <br>(gauge) | Tamaño de bloque del sistema de archivos.|
| **fly_io.instance.filesystem.blocks** <br>(gauge) | Número total de bloques en el sistema de archivos|
| **fly_io.instance.filesystem.blocks_avail** <br>(gauge) | Número total de bloques disponibles.|
| **fly_io.instance.filesystem.blocks_free** <br>(gauge) | Número total de bloques libres.|
| **fly_io.instance.load.avg** <br>(gauge) | Promedio de carga del sistema que mide el número de procesos en la cola de ejecución del sistema, con muestras que representan promedios de 1, 5 y 15 minutos.<br>_Mostrado como proceso_ |
| **fly_io.instance.memory.active** <br>(gauge) | Memoria que se ha utilizado más recientemente y que normalmente no se recupera a menos que sea absolutamente necesario.<br>_Mostrado como byte_ |
| **fly_io.instance.memory.buffers** <br>(gauge) | Almacenamiento relativamente temporal para bloques de disco en bruto<br>_Mostrado como byte_ |
| **fly_io.instance.memory.cached** <br>(gauge) | Caché en memoria para archivos leídos del disco (la caché de la page (página)) así como tmpfs & shmem. No incluye SwapCached.<br>_Mostrado como byte_ |
| **fly_io.instance.memory.dirty** <br>(gauge) | Memoria que está esperando a ser escrita de nuevo en el disco<br>_Mostrado como byte_ |
| **fly_io.instance.memory.inactive** <br>(gauge) | Memoria que se ha utilizado menos recientemente. Es más elegible para ser recuperada con otros fines<br>_Mostrado como byte_ |
| **fly_io.instance.memory.mem_available** <br>(gauge) | Una estimación de cuánta memoria hay disponible para iniciar nuevas aplicaciones, sin intercambio.<br>_Mostrado como byte_ |
| **fly_io.instance.memory.mem_free** <br>(gauge) | RAM libre total.<br>_Mostrado como byte_ |
| **fly_io.instance.memory.mem_total** <br>(gauge) | RAM total utilizable (es decir, RAM física menos algunos bits reservados y el código binario del núcleo)<br>_Mostrado como byte_ |
| **fly_io.instance.memory.pressure_full** <br>(gauge) | Presión de memoria para todos los procesos|
| **fly_io.instance.memory.pressure_some** <br>(gauge) | Presión de memoria para al menos un proceso|
| **fly_io.instance.memory.shmem** <br>(gauge) | Memoria total utilizada por la memoria compartida (shmem) y tmpfs<br>_Mostrado como byte_ |
| **fly_io.instance.memory.slab** <br>(gauge) | Caché de estructuras de datos en el núcleo<br>_Mostrado como byte_ |
| **fly_io.instance.memory.swap_cached** <br>(gauge) | Memoria que una vez fue intercambiada, se intercambia de nuevo, pero todavía está en el archivo de intercambio<br>_Mostrado como byte_ |
| **fly_io.instance.memory.swap_free** <br>(gauge) | Memoria que se ha desalojado de la RAM y está temporalmente en el disco<br>_Mostrado como byte_ |
| **fly_io.instance.memory.swap_total** <br>(gauge) | cantidad total de espacio de intercambio disponible<br>_Mostrado como byte_ |
| **fly_io.instance.memory.vmalloc_chunk** <br>(gauge) | bloque contiguo más grande del área de asignación de máquinas virtuales que está libre<br>_Mostrado como byte_ |
| **fly_io.instance.memory.vmalloc_total** <br>(gauge) | tamaño total del espacio virtual de direcciones de asignación de máquinas virtuales<br>_Mostrado como byte_ |
| **fly_io.instance.memory.vmalloc_used** <br>(gauge) | cantidad de área de asignación de máquinas virtuales que se utiliza<br>_Mostrado como byte_ |
| **fly_io.instance.memory.writeback** <br>(gauge) | Memoria que se está escribiendo activamente en el disco<br>_Mostrado como byte_ |
| **fly_io.instance.net.recv_bytes.count** <br>(count) | Número de bytes buenos recibidos por la interfaz.<br>_Mostrado como byte_ |
| **fly_io.instance.net.recv_compressed.count** <br>(count) | Número de paquetes comprimidos recibidos correctamente.|
| **fly_io.instance.net.recv_drop.count** <br>(count) | Número de paquetes recibidos pero no procesados, por ejemplo, debido a la falta de recursos o a un protocolo no compatible.<br>_Mostrado como paquete_ |
| **fly_io.instance.net.recv_errs.count** <br>(count) | Número total de paquetes erróneos recibidos en este dispositivo de red.<br>_Mostrado como paquete_ |
| **fly_io.instance.net.recv_fifo.count** <br>(count) | Contador de eventos de desbordamiento de la FIFO del receptor.|
| **fly_io.instance.net.recv_frame.count** <br>(count) | Errores de alineación de la trama del receptor.|
| **fly_io.instance.net.recv_multicast.count** <br>(count) | Paquetes multicast recibidos.<br>_Mostrado como paquete_ |
| **fly_io.instance.net.recv_packets.count** <br>(count) | Número de paquetes correctos recibidos por la interfaz.<br>_Mostrado como paquete_ |
| **fly_io.instance.net.sent_bytes.count** <br>(count) | Número de bytes bien transmitidos.<br>_Mostrado como byte_ |
| **fly_io.instance.net.sent_carrier.count** <br>(count) | Número de errores de transmisión de marco debidos a la pérdida de portadora durante la transmisión.|
| **fly_io.instance.net.sent_colls.count** <br>(count) | Número de colisiones durante la transmisión de paquetes.|
| **fly_io.instance.net.sent_compressed.count** <br>(count) | Número de paquetes comprimidos transmitidos.|
| **fly_io.instance.net.sent_drop.count** <br>(count) | Número de paquetes perdidos en su camino hacia la transmisión, por ejemplo, por falta de recursos.<br>_Mostrado como paquete_ |
| **fly_io.instance.net.sent_errs.count** <br>(count) | Número total de problemas de transmisión.|
| **fly_io.instance.net.sent_fifo.count** <br>(count) | Contador de eventos de desbordamiento del FIFO enviado.|
| **fly_io.instance.net.sent_packets.count** <br>(count) | Número de paquetes transmitidos con éxito.<br>_Mostrado como paquete_ |
| **fly_io.instance.up** <br>(gauge) | Informa 1 si la máquina virtual informa correctamente|
| **fly_io.instance.volume.size** <br>(gauge) | Tamaño del volumen en bytes.<br>_Mostrado como byte_ |
| **fly_io.instance.volume.used** <br>(gauge) | Porcentaje de volumen utilizado.<br>_Mostrado como byte_ |
| **fly_io.machine.count** <br>(gauge) | Nümero de máquinas en funcionamiento|
| **fly_io.machine.cpus.count** <br>(gauge) | Número de cpu|
| **fly_io.machine.gpus.count** <br>(gauge) | Número de gpu|
| **fly_io.machine.memory** <br>(gauge) | Memoria de una máquina<br>_Mostrado como megabyte_. |
| **fly_io.machine.swap_size** <br>(gauge) | Espacio de intercambio a reservar para la Fly Machine<br>_Mostrado como megabyte_. |
| **fly_io.machines_api.up** <br>(gauge) | Si el check puede acceder a la API de las máquinas o no|
| **fly_io.pg.database.size** <br>(gauge) | Tamaño de la base de datos<br>_Mostrado como byte_ |
| **fly_io.pg.replication.lag** <br>(gauge) | Retraso en la replicación|
| **fly_io.pg_stat.activity.count** <br>(gauge) | número de conexiones en este estado|
| **fly_io.pg_stat.activity.max_tx_duration** <br>(gauge) | duración máxima en segundos de cualquier transacción activa<br>_Mostrado como segundo_ |
| **fly_io.pg_stat.archiver.archived_count** <br>(gauge) | Número de archivos WAL que se han archivado correctamente|
| **fly_io.pg_stat.archiver.failed_count** <br>(gauge) | Número de intentos fallidos para archivar WAL|
| **fly_io.pg_stat.bgwriter.buffers_alloc** <br>(gauge) | Número de búferes asignados|
| **fly_io.pg_stat.bgwriter.buffers_backend** <br>(gauge) | Número de buffers escritos directamente por un backend|
| **fly_io.pg_stat.bgwriter.buffers_backend_fsync** <br>(gauge) | Número de veces que un backend ha tenido que ejecutar su propia llamada fsync (normalmente, el escritor en segundo plano se encarga de ellas, incluso cuando el backend realiza su propia escritura).|
| **fly_io.pg_stat.bgwriter.buffers_checkpoint** <br>(gauge) | Número de búferes escritos durante los puntos de control|
| **fly_io.pg_stat.bgwriter.buffers_clean** <br>(gauge) | Número de búferes escritos por el escritor en segundo plano|
| **fly_io.pg_stat.bgwriter.checkpoint_sync_time** <br>(gauge) | Cantidad total de tiempo que se ha empleado en la parte del procesamiento del punto de control en la que los archivos se sincronizan con el disco, en milisegundos<br>_Mostrado como milisegundo_. |
| **fly_io.pg_stat.bgwriter.checkpoint_write_time** <br>(gauge) | Cantidad total de tiempo que se ha empleado en la parte del procesamiento del punto de control en la que los archivos se escriben en el disco, en milisegundos<br>_Mostrado como milisegundo_. |
| **fly_io.pg_stat.bgwriter.checkpoints_req** <br>(gauge) | Número de puntos de control solicitados que se han realizado|
| **fly_io.pg_stat.bgwriter.checkpoints_timed** <br>(gauge) | Número de puntos de control programados que se han realizado|
| **fly_io.pg_stat.bgwriter.maxwritten_clean** <br>(gauge) | Número de veces que el escritor en segundo plano detuvo una exploración de limpieza porque había escrito demasiados búferes.|
| **fly_io.pg_stat.bgwriter.stats_reset** <br>(gauge) | Hora del último reinicio de estas estadísticas|
| **fly_io.pg_stat.database.blk_read_time** <br>(gauge) | Tiempo empleado en leer bloques de archivos de datos por backends en esta base de datos, en milisegundos<br>_Mostrado como milisegundo_ |
| **fly_io.pg_stat.database.blk_write_time** <br>(gauge) | Tiempo empleado en escribir bloques de archivos de datos por los backends en esta base de datos, en milisegundos<br>_Mostrado como milisegundo_ |
| **fly_io.pg_stat.database.blks_hit** <br>(gauge) | Número de veces que se encontraron bloques de disco ya en la caché del búfer, por lo que no fue necesaria una lectura (esto solo incluye aciertos en la caché del búfer de PostgreSQL, no en la caché del sistema de archivos del sistema operativo).|
| **fly_io.pg_stat.database.blks_read** <br>(gauge) | Número de bloques de disco leídos en esta base de datos|
| **fly_io.pg_stat.database.conflicts** <br>(gauge) | Número de consultas canceladas debido a conflictos con la recuperación en esta base de datos. Los conflictos solo se producen en los servidores en espera|
| **fly_io.pg_stat.database.conflicts_confl_bufferpin** <br>(gauge) | Número de consultas en esta base de datos que se han cancelado debido a búferes bloqueados|
| **fly_io.pg_stat.database.conflicts_confl_deadlock** <br>(gauge) | Número de consultas en esta base de datos que se han cancelado debido a bloqueos|
| **fly_io.pg_stat.database.conflicts_confl_lock** <br>(gauge) | Número de consultas en esta base de datos que se han cancelado debido a tiempos de espera de bloqueo|
| **fly_io.pg_stat.database.conflicts_confl_snapshot** <br>(gauge) | Número de consultas en esta base de datos que se han cancelado debido a instantáneas antiguas|
| **fly_io.pg_stat.database.conflicts_confl_tablespace** <br>(gauge) | Número de consultas en esta base de datos que se han cancelado debido a espacios de tablas anulados|
| **fly_io.pg_stat.database.deadlocks** <br>(gauge) | Número de bloqueos detectados en esta base de datos|
| **fly_io.pg_stat.database.numbackends** <br>(gauge) | Número de backends conectados actualmente a esta base de datos. Esta es la única columna de esta vista que devuelve un valor que refleja el estado actual; todas las demás columnas devuelven los valores acumulados desde el último reinicio.|
| **fly_io.pg_stat.database.stats_reset** <br>(gauge) | Hora del último reinicio de estas estadísticas|
| **fly_io.pg_stat.database.tup_deleted** <br>(gauge) | Número de filas eliminadas por consultas en esta base de datos|
| **fly_io.pg_stat.database.tup_fetched** <br>(gauge) | Número de filas obtenidas por consultas en esta base de datos|
| **fly_io.pg_stat.database.tup_inserted** <br>(gauge) | Número de filas insertadas por consultas en esta base de datos|
| **fly_io.pg_stat.database.tup_returned** <br>(gauge) | Número de filas devueltas por consultas en esta base de datos|
| **fly_io.pg_stat.database.tup_updated** <br>(gauge) | Número de filas actualizadas por consultas en esta base de datos|
| **fly_io.pg_stat.database.xact_commit** <br>(gauge) | Número de transacciones de esta base de datos que se han confirmado|
| **fly_io.pg_stat.database.xact_rollback** <br>(gauge) | Número de transacciones de esta base de datos que se han revertido|
| **fly_io.pg_stat.replication.pg_current_wal_lsn_bytes** <br>(gauge) | Posición WAL en bytes<br>_Mostrado como byte_ |
| **fly_io.pg_stat.replication.pg_wal_lsn_diff** <br>(gauge) | Retraso en bytes entre maestro y esclavo<br>_Mostrado como byte_ |
| **fly_io.pg_stat.replication.reply_time** <br>(gauge) | Hora de envío del último mensaje de respuesta recibido del servidor en espera|
| **fly_io.volume.block_size** <br>(gauge) | El tamaño de cada bloque de memoria en bytes<br>_Mostrado como byte_ |
| **fly_io.volume.blocks.count** <br>(gauge) | El número total de bloques del volumen|
| **fly_io.volume.blocks_avail** <br>(gauge) | El número de bloques disponibles para datos en el volumen|
| **fly_io.volume.blocks_free** <br>(gauge) | Número total de bloques libres para datos y operaciones de usuario root|
| **fly_io.volume.created** <br>(gauge) | Si el volumen se ha creado o no|
| **fly_io.volume.encrypted** <br>(gauge) | Si el volumen está cifrado o no|
| **fly_io.volume.size** <br>(gauge) | El tamaño del volumen en GB<br>_Mostrado como gigabyte_ |

### Eventos

La integración Fly.io no incluye eventos.

### Checks de servicio

La integración Fly.io no incluye checks de servicios.

### Traces (trazas) de aplicación

Sigue estos pasos para recopilar traces (trazas) de una aplicación en tu entorno Fly.io.

1. [Instrumenta](https://docs.datadoghq.com/tracing/trace_collection/#instrumentation-types) tu solicitud.

1. [Despliega](#deploying-the-agent-as-a-flyio-application) el Datadog Agent como una aplicación Fly.io.

1. Configura las variables de entorno necesarias en el `fly.toml` o el `Dockerfile` de tu aplicación y despliega la aplicación.

   Configura lo siguiente como variable de entorno para enviar métricas a la aplicación del Datadog Agent :

   ```
   [env]
       DD_AGENT_HOST="<YOUR_AGENT_APP_NAME>.internal"

   ```

   Configura la siguiente variable de entorno para asegurarte de que informes del mismo host para los logs y las métricas:

   ```
   DD_TRACE_REPORT_HOSTNAME="true"
   ```

   Para utilizar [etiquetado de servicio unificado](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=docker#configuration-1), configura estas variables de entorno:

   ```
   DD_SERVICE="APP_NAME"
   DD_ENV="ENV_NAME"
   DD_VERSION="VERSION"
   ```

   Para correlacionar logs y traces (trazas), sigue estos [pasos](https://docs.datadoghq.com/tracing/other_telemetry/connect_logs_and_traces/) y configura esta variable de entorno:

   ```
   DD_LOGS_INJECTION="true"
   ```

1. Configura las siguientes variables de entorno en tu `fly.toml` de la [aplicación del Datadog Agent](#Deploying-the-agent-as-a-Fly.io-application) y despliega la aplicación:

   ```
   [env]
       DD_APM_ENABLED = "true"
       DD_APM_NON_LOCAL_TRAFFIC = "true"
       DD_DOGSTATSD_NON_LOCAL_TRAFFIC = "true"
       DD_BIND_HOST = "fly-global-services"
   ```

**Nota**: Asegúrate de que la configuración de tus instancias Fly.io no exponga públicamente los puertos para APM y DogStatsD, si están habilitados.

### Recopilación de logs

Utiliza el [fly_logs_shipper](https://github.com/superfly/fly-log-shipper) para recopilar logs de tus aplicaciones Fly.io.

1. Clona el [project (proyecto)] de cargador de logs (https://github.com/superfly/fly-log-shipper).

1. Modifica el archivo `vector-configs/vector.toml` para configurar la fuente de logs como `fly_io`:

   ```
   [transforms.log_json]
   type = "remap"
   inputs = ["nats"]
   source  = '''
   . = parse_json!(.message)
   .ddsource = 'fly-io'
   .host = .fly.app.instance
   .env = <YOUR_ENV_NAME>
   '''
   ```

Esta configuración analizará los atributos básicos específicos de los logs de fly. Para analizar completamente todos los atributos de logs, configura `ddsource` en una [integración de logs conocida](https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source#integration-pipeline-library) para cada aplicación utilizando [transformaciones vectoriales](https://vector.dev/docs/reference/configuration/transforms/lua/).

3. Configura [secretos](https://fly.io/docs/flyctl/secrets/) para [NATS](https://github.com/superfly/fly-log-shipper?tab=readme-ov-file#nats-source-configuration):
   `ORG` y `ACCESS_TOKEN`

1. Configura [secretos](https://fly.io/docs/flyctl/secrets/) para [Datadog](https://github.com/superfly/fly-log-shipper?tab=readme-ov-file#datadog): `DATADOG_API_KEY` y `DATADOG_SITE`

1. [Despliega](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) la aplicación del cargador de logs.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).