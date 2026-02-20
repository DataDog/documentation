---
aliases:
- /es/integrations/couch
app_id: couchdb
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Realiza un seguimiento y grafica tus métricas de actividad y rendimiento
  de CouchDB.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog
  tag: blog
  text: Monitorización del rendimiento de CouchDB con Datadog
integration_version: 9.0.0
media: []
supported_os:
- linux
- windows
- macos
title: CouchDB
---
![Dashboard de CouchDB](https://raw.githubusercontent.com/DataDog/integrations-core/master/couch/images/couchdb_dashboard.png)

## Información general

Captura los datos de CouchDB en Datadog para:

- Visualizar métricas claves de CouchDB.
- Correlacionar el rendimiento de CouchDB con el del resto de tus aplicaciones.

Por razones de rendimiento, la versión de CouchDB que estás utilizando se almacena en caché, por lo que no puedes monitorizar instancias de CouchDB con diferentes versiones con la misma instancia del Agent.

## Configuración

### Instalación

El check de CouchDB está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores CouchDB.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `couch.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus datos de rendimiento de CouchDB. Consulta el [ejemplo couch.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The Couch server's url.
     #
     - server: http://localhost:5984
   ```

   **Nota**: Proporciona `db_include` y `db_exclude` para controlar de qué bases de datos debe y no debe recopilar métricas el Agent.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `couch.d/conf.yaml` para empezar a recopilar tus logs de CouchDB:

   ```yaml
   logs:
     - type: file
       path: /var/log/couchdb/couch.log
       source: couchdb
       service: couch
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [ejemplo couch.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `couch`                              |
| `<INIT_CONFIG>`      | en blanco o `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:5984"}` |

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "couchdb", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `couch` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **couchdb.active_tasks.db_compaction.changes_done** <br>(gauge) | Cambia la compactación actual<br>_Se muestra como documento_ |
| **couchdb.active_tasks.db_compaction.count** <br>(gauge) | Número de compactaciones en ejecución<br>_Se muestra como recurso_ |
| **couchdb.active_tasks.db_compaction.progress** <br>(gauge) | Progreso del proceso de compactación<br>_Se muestra como porcentaje_ |
| **couchdb.active_tasks.db_compaction.total_changes** <br>(gauge) | Número de cambios que procesará esta compactación<br>_Se muestra como documento_ |
| **couchdb.active_tasks.indexer.changes_done** <br>(gauge) | Número de cambios ya indexados<br>_Se muestra como documento_ |
| **couchdb.active_tasks.indexer.count** <br>(gauge) | Número de procesos de indexación<br>_Se muestra como recurso_ |
| **couchdb.active_tasks.indexer.progress** <br>(gauge) | Progreso del proceso de indexación<br>_Se muestra como porcentaje_ |
| **couchdb.active_tasks.indexer.total_changes** <br>(gauge) | Número de cambios a indexar<br>_Se muestra como documento_ |
| **couchdb.active_tasks.replication.changes_pending** <br>(gauge) | Cambios pendientes de procesamiento<br>_Se muestra como documento_ |
| **couchdb.active_tasks.replication.count** <br>(gauge) | Número de réplicas<br>_Se muestra como recurso_ |
| **couchdb.active_tasks.replication.doc_write_failures** <br>(gauge) | Fallos en la escritura de documentos al replicar<br>_Se muestra como error_ |
| **couchdb.active_tasks.replication.docs_read** <br>(gauge) | Documentos leídos al replicar<br>_Se muestra como documento_ |
| **couchdb.active_tasks.replication.docs_written** <br>(gauge) | Documentos escritos al replicar<br>_Se muestra como documento_ |
| **couchdb.active_tasks.replication.missing_revisions_found** <br>(gauge) | Revisiones faltantes|
| **couchdb.active_tasks.replication.revisions_checked** <br>(gauge) | Revisiones comprobadas con éxito<br>_Se muestra como operación_ |
| **couchdb.active_tasks.view_compaction.count** <br>(gauge) | Número de compactaciones de vistas en ejecución<br>_Se muestra como recurso_ |
| **couchdb.active_tasks.view_compaction.progress** <br>(gauge) | Progreso de la compactación de la vista<br>_Se muestra como porcentaje_ |
| **couchdb.by_db.active_size** <br>(gauge) | Tamaño de los datos activos<br>_Se muestra en bytes_ |
| **couchdb.by_db.disk_size** <br>(gauge) | Tamaño de disco por base de datos (disponible solo para CouchDB v1)<br>__Se muestra en bytes_ |
| **couchdb.by_db.doc_count** <br>(gauge) | Número de documentos<br>_Se muestra como documento_ |
| **couchdb.by_db.doc_del_count** <br>(gauge) | Número de documentos eliminados<br>_Se muestra como documento_ |
| **couchdb.by_db.external_size** <br>(gauge) | Tamaño de la base de datos sin comprimir<br>_Se muestra en bytes_ |
| **couchdb.by_db.file_size** <br>(gauge) | Tamaño del archivo de base de datos en disco<br>_Se muestra en bytes_ |
| **couchdb.by_ddoc.active_size** <br>(gauge) | Tamaño real en bytes de la vista<br>_Se muestra en bytes_ |
| **couchdb.by_ddoc.external_size** <br>(gauge) | Tamaño en bytes de la vista sin comprimir<br>_Se muestra en bytes_ |
| **couchdb.by_ddoc.file_size** <br>(gauge) | Tamaño en bytes tal y como está almacenado en el disco<br>_Se muestra en bytes_ |
| **couchdb.by_ddoc.minimum_updates_pending** <br>(gauge) | <br>_Se muestra como actualización_ |
| **couchdb.by_ddoc.preferred_updates_pending** <br>(gauge) | <br>_Se muestra como actualización_ |
| **couchdb.by_ddoc.total_updates_pending** <br>(gauge) | <br>_Se muestra como actualización_ |
| **couchdb.by_ddoc.waiting_clients** <br>(gauge) | Número de clientes en espera de vistas de este documento de diseño<br>__Se muestra como recurso_ |
| **couchdb.couch_log.level.alert** <br>(gauge) | Número de mensajes de alerta registrados<br>_Se muestra como mensaje_ |
| **couchdb.couch_log.level.critical** <br>(gauge) | Número de mensajes críticos registrados<br>_Se muestra como mensaje_ |
| **couchdb.couch_log.level.debug** <br>(gauge) | Número de mensajes de depuración registrados<br>_Se muestra como mensaje_ |
| **couchdb.couch_log.level.emergency** <br>(gauge) | Número de mensajes de emergencia registrados<br>_Se muestra como mensaje_ |
| **couchdb.couch_log.level.error** <br>(gauge) | Número de mensajes de error registrados<br>_Se muestra como mensaje_ |
| **couchdb.couch_log.level.info** <br>(gauge) | Número de mensajes de información registrados<br>_Se muestra como mensaje_ |
| **couchdb.couch_log.level.notice** <br>(gauge) | Número de mensajes de aviso registrados<br>_Se muestra como mensaje_ |
| **couchdb.couch_log.level.warning** <br>(gauge) | Número de mensajes de advertencia registrados<br>_Se muestra como mensaje_ |
| **couchdb.couch_replicator.changes_manager_deaths** <br>(gauge) | Número de gestores de cambios de replicador fallidos<br>_Se muestra como recurso_ |
| **couchdb.couch_replicator.changes_queue_deaths** <br>(gauge) | Número de colas de trabajo de cambios de replicador fallidos<br>_Se muestra como recurso_ |
| **couchdb.couch_replicator.changes_read_failures** <br>(gauge) | Número de fallos de lectura de cambios de replicador fallidos<br>_Se muestra como error_ |
| **couchdb.couch_replicator.changes_reader_deaths** <br>(gauge) | Número de lectores de cambios de replicador fallidos<br>_Se muestra como recurso_ |
| **couchdb.couch_replicator.checkpoints.failure** <br>(gauge) | Número de almacenamientos de puntos de control fallidos<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.checkpoints.success** <br>(gauge) | Número de puntos de control guardados con éxito<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.cluster_is_stable** <br>(gauge) | Si el clúster es estable o no<br>_Se muestra como error_ |
| **couchdb.couch_replicator.connection.acquires** <br>(gauge) | Número de veces que se comparten conexiones<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.connection.closes** <br>(gauge) | Número de veces que un worker se apaga de forma discreta<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.connection.creates** <br>(gauge) | Número de conexiones creadas<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.connection.owner_crashes** <br>(gauge) | Número de veces que un propietario de conexión falla mientras posee al menos una conexión<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.connection.releases** <br>(gauge) | Número de veces que se libera la propiedad de una conexión<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.connection.worker_crashes** <br>(gauge) | Número de veces que un worker se cierra inesperadamente<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.db_scans** <br>(gauge) | Número de veces que se han iniciado los análisis de la base de datos del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.docs.completed_state_updates** <br>(gauge) | Número de actualizaciones de documentos de estado "completadas"<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.docs.db_changes** <br>(gauge) | Número de cambios en la base de datos procesados por el procesador de documentos del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.docs.dbs_created** <br>(gauge) | Número de creaciones de fragmentos de base de datos vistas por el procesador de documentos del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.docs.dbs_deleted** <br>(gauge) | Número de eliminaciones de fragmentos de la base de datos vistas por el procesador de documentos del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.docs.dbs_found** <br>(gauge) | Número de fragmentos de la base de datos encontrados por el procesador de documentos del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.docs.failed_state_updates** <br>(gauge) | Número de actualizaciones de documentos de estado "fallidas"<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.failed_starts** <br>(gauge) | Número de réplicas que no se han iniciado<br>_Se muestra como recurso_ |
| **couchdb.couch_replicator.jobs.adds** <br>(gauge) | Número de trabajos añadidos al programador del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.jobs.crashed** <br>(gauge) | Trabajos del programador del replicador fallidos<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.jobs.crashes** <br>(gauge) | Número de trabajos fallidos detectados por el programador del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.jobs.duplicate_adds** <br>(gauge) | Número de trabajos duplicados añadidos al programador del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.jobs.pending** <br>(gauge) | Trabajos del programador del replicador pendientes<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.jobs.removes** <br>(gauge) | Número de trabajos eliminados del programador del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.jobs.running** <br>(gauge) | Trabajos en ejecución del programador del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.jobs.starts** <br>(gauge) | Número de trabajos iniciados desde el programador del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.jobs.stops** <br>(gauge) | Número de trabajos detenidos por el programador del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.jobs.total** <br>(gauge) | Número total de trabajos del programador del replicador<br>_Se muestra como registro_ |
| **couchdb.couch_replicator.requests** <br>(gauge) | Número de solicitudes HTTP realizadas por el replicador<br>_Se muestra como solicitud_ |
| **couchdb.couch_replicator.responses.failure** <br>(gauge) | Número de respuestas HTTP fallidas recibidas por el replicador<br>_Se muestra como respuesta_ |
| **couchdb.couch_replicator.responses.success** <br>(indicador) | Número de respuestas HTTP exitosas recibidas por el replicador<br>_Se muestra como respuesta_ |
| **couchdb.couch_replicator.stream_responses.failure** <br>(gauge) | Número de respuestas HTTP de streaming fallidas recibidas por el replicador<br>_Se muestra como respuesta_ |
| **couchdb.couch_replicator.stream_responses.success** <br>(gauge) | Número de respuestas HTTP exitosas recibidas por el replicador<br>_Se muestra como respuesta_ |
| **couchdb.couch_replicator.worker_deaths** <br>(gauge) | Número de workers del replicador fallidos<br>_Se muestra como recurso_ |
| **couchdb.couch_replicator.workers_started** <br>(gauge) | Número de workers del replicador iniciados<br>_Se muestra como recurso_ |
| **couchdb.couchdb.auth_cache_hits** <br>(gauge) | Número de aciertos de caché de autenticación<br>_Se muestra como acierto_ |
| **couchdb.couchdb.auth_cache_misses** <br>(gauge) | Número de fallos de caché de autenticación<br>_Se muestra como fallo_ |
| **couchdb.couchdb.collect_results_time.arithmetic_mean** <br>(gauge) | Media_aritmética de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.geometric_mean** <br>(gauge) | Media_geométrica de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.harmonic_mean** <br>(gauge) | Media_armónica de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.kurtosis** <br>(gauge) | Curtosis de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.max** <br>(gauge) | Máximo de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.median** <br>(gauge) | Mediana de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.min** <br>(gauge) | Mínimo de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.n** <br>(gauge) | N de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.percentile.50** <br>(gauge) | Percentil 50 de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.percentile.75** <br>(gauge) | Percentil 75 de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.percentile.90** <br>(gauge) | Percentil 99 de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.percentile.95** <br>(gauge) | Percentil 95 de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.percentile.99** <br>(gauge) | Percentil 99 de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.percentile.999** <br>(gauge) | Percentil 999 de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.skewness** <br>(gauge) | Asimetría de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.standard_deviation** <br>(gauge) | Desviación_estándar de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.collect_results_time.variance** <br>(gauge) | Varianza de la latencia en microsegundos de las llamadas a couch_db:collect_results/3<br>_Se muestra en microsegundos_ |
| **couchdb.couchdb.couch_server.lru_skip** <br>(gauge) | Número de operaciones LRU de couch_server omitidas<br>_Se muestra como operación_ |
| **couchdb.couchdb.database_purges** <br>(gauge) | Número de veces que se ha purgado una base de datos<br>_Se muestra como lectura_ |
| **couchdb.couchdb.database_reads** <br>(gauge) | Número de veces que se ha leído un documento de una base de datos<br>_Se muestra como lectura_ |
| **couchdb.couchdb.database_writes** <br>(gauge) | Número de veces que se ha modificado una base de datos<br>__Se muestra como escritura_ |
| **couchdb.couchdb.db_open_time.arithmetic_mean** <br>(gauge) | Media_aritmética de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.geometric_mean** <br>(gauge) | Media_geométrica de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.harmonic_mean** <br>(gauge) | Media_armónica de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.kurtosis** <br>(gauge) | Curtosis de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.max** <br>(gauge) | Máximo de milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.median** <br>(gauge) | Mediana de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.min** <br>(gauge) | Mínimo de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.n** <br>(gauge) | N de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.percentile.50** <br>(gauge) | Percentil 50 de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.percentile.75** <br>(gauge) | Percentil 75 de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.percentile.90** <br>(gauge) | Percentil 90 de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.percentile.95** <br>(gauge) | Percentil 95 de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.percentile.99** <br>(gauge) | Percentil 99 de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.percentile.999** <br>(gauge) | Percentil 999 de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.skewness** <br>(gauge) | Asimetría de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.standard_deviation** <br>(gauge) | Desviación_estándar de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.db_open_time.variance** <br>(gauge) | Variación de los milisegundos necesarios para abrir una base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.arithmetic_mean** <br>(gauge) | Media_aritmética de la distribución de las latencias de las llamadas para recuperar la información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.geometric_mean** <br>(gauge) | Media_geométrica de la distribución de las latencias de las llamadas para recuperar la información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.harmonic_mean** <br>(gauge) | Media_armónica de la distribución de las latencias de las llamadas para recuperar la información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.kurtosis** <br>(gauge) | Curtosis de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.max** <br>(gauge) | Máximo de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.median** <br>(gauge) | Mediana de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.min** <br>(gauge) | Mínimo de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.n** <br>(gauge) | N de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.percentile.50** <br>(gauge) | Percentil 50 de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.percentile.75** <br>(gauge) | Percentil 75 de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.percentile.90** <br>(gauge) | Percentil 90 de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.percentile.95** <br>(gauge) | Percentil 95 de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.percentile.99** <br>(gauge) | Percentil 99 de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.percentile.999** <br>(gauge) | Percentil 999 de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.skewness** <br>(gauge) | Asimetría de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.standard_deviation** <br>(gauge) | Desviación_estándar de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.dbinfo.variance** <br>(gauge) | Varianza de la distribución de las latencias de las llamadas para recuperar información de la base de datos<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.document_inserts** <br>(gauge) | Número de documentos insertados<br>_Se muestra como documento_ |
| **couchdb.couchdb.document_purges.failure** <br>(gauge) | Número de operaciones de purga de documentos fallidas<br>_Se muestra como escritura_ |
| **couchdb.couchdb.document_purges.success** <br>(gauge) | Número de operaciones de purga de documentos exitosas<br>_Se muestra como escritura_ |
| **couchdb.couchdb.document_purges.total** <br>(gauge) | Número total de operaciones de purga de documentos<br>_Se muestra como escritura_ |
| **couchdb.couchdb.document_writes** <br>(gauge) | Número de operaciones de escritura de documentos<br>_Se muestra como escritura_ |
| **couchdb.couchdb.httpd.aborted_requests** <br>(gauge) | Número de solicitudes canceladas<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd.bulk_docs.arithmetic_mean** <br>(gauge) | Media_aritmética de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.geometric_mean** <br>(gauge) | Media_geométrica de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.harmonic_mean** <br>(gauge) | Media_armónica de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.kurtosis** <br>(gauge) | Curtosis de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.max** <br>(gauge) | Máximo de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.median** <br>(gauge) | Mediana de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.min** <br>(gauge) | Mínimo de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.n** <br>(gauge) | N de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.percentile.50** <br>(gauge) | Percentil 50 de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.percentile.75** <br>(gauge) | Percentil 75 de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.percentile.90** <br>(gauge) | Percentil 90 de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.percentile.95** <br>(gauge) | Percentil 95 de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.percentile.99** <br>(indicador) | Percentil 99 de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.percentile.999** <br>(gauge) | Percentil 999 de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.skewness** <br>(gauge) | Asimetría de la distribución del número de documentos en solicitudes de \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.standard_deviation** <br>(gauge) | Desviación_estándar de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_docs.variance** <br>(gauge) | Varianza de la distribución del número de documentos en solicitudes \_bulk_docs<br>_Se muestra como documento_ |
| **couchdb.couchdb.httpd.bulk_requests** <br>(gauge) | Número de solicitudes masivas<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd.clients_requesting_changes** <br>(gauge) | Número de clientes para \_changes continuos<br>_Se muestra como conexión_ |
| **couchdb.couchdb.httpd.purge_requests** <br>(gauge) | Número de solicitudes de purga HTTP<br>_Se muestra como escritura_ |
| **couchdb.couchdb.httpd.requests** <br>(gauge) | Número de solicitudes HTTP<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd.temporary_view_reads** <br>(gauge) | Número de lecturas temporales de vistas<br>_Se muestra como lectura_ |
| **couchdb.couchdb.httpd.view_reads** <br>(gauge) | Número de lecturas de vistas<br>_Se muestra como lectura_ |
| **couchdb.couchdb.httpd_request_methods.COPY** <br>(gauge) | Número de solicitudes HTTP COPY<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_request_methods.DELETE** <br>(gauge) | Número de solicitudes HTTP DELETE<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_request_methods.GET** <br>(gauge) | Número de solicitudes HTTP GET<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_request_methods.HEAD** <br>(gauge) | Número de solicitudes HTTP HEAD<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_request_methods.OPTIONS** <br>(gauge) | Número de solicitudes HTTP OPTIONS<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_request_methods.POST** <br>(gauge) | Número de solicitudes HTTP POST<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_request_methods.PUT** <br>(gauge) | Número de solicitudes HTTP PUT<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.200** <br>(gauge) | Número de respuestas HTTP 200 OK<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.201** <br>(gauge) | Número de respuestas HTTP 201 Created<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.202** <br>(gauge) | Número de respuestas HTTP 202 Accepted<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.204** <br>(gauge) | Número de respuestas HTTP 204 No Content<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.206** <br>(gauge) | Número de respuestas HTTP 206 Partial Content<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.301** <br>(gauge) | Número de respuestas HTTP 301 Moved Permanently<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.302** <br>(gauge) | Número de respuestas HTTP 302 Found<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.304** <br>(gauge) | Número de respuestas HTTP 304 Not Modified<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.400** <br>(gauge) | Número de respuestas HTTP 400 Bad Request<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.401** <br>(gauge) | Número de respuestas HTTP 401 Unauthorized<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.403** <br>(gauge) | Número de respuestas HTTP 403 Forbidden<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.404** <br>(gauge) | Número de respuestas HTTP 404 Not Found<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.405** <br>(gauge) | Número de respuestas HTTP 405 Method Not Allowed<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.406** <br>(gauge) | Número de respuestas HTTP 406 Not Acceptable<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.409** <br>(gauge) | Número de respuestas HTTP 409 Conflict<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.412** <br>(gauge) | Número de respuestas HTTP 412 Precondition Failed<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.413** <br>(gauge) | Número de respuestas HTTP 413 Request Entity Too Long<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.414** <br>(gauge) | Número de respuestas HTTP 414 Request URI Too Long<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.415** <br>(gauge) | Número de respuestas HTTP 415 Unsupported Media Type<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.416** <br>(gauge) | Número de respuestas HTTP 416 Requested Range Not Satisfiable<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.417** <br>(gauge) | Número de respuestas HTTP 417 Expectation Failed<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.500** <br>(gauge) | Número de respuestas HTTP 500 Internal Server Error<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.501** <br>(indicador) | Número de respuestas HTTP 501 Not Implemented<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd_status_codes.503** <br>(gauge) | Número de respuestas HTTP 503 Server Unavailable<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.local_document_writes** <br>(gauge) | Número de operaciones de escritura de documentos \_local<br>_Se muestra como escritura_ |
| **couchdb.couchdb.mrview.emits** <br>(gauge) | Número de invocaciones de \`emit' en funciones de asignación en el servidor de vistas<br>_Se muestra como documento_ |
| **couchdb.couchdb.mrview.map_doc** <br>(gauge) | Número de documentos asignados en el servidor de vistas<br>_Se muestra como documento_ |
| **couchdb.couchdb.open_databases** <br>(gauge) | Número de bases de datos abiertas<br>_Se muestra como recurso_ |
| **couchdb.couchdb.open_os_files** <br>(gauge) | Número de descriptores de archivo que CouchDB ha abierto<br>_Se muestra como archivo_ |
| **couchdb.couchdb.query_server.vdu_process_time.arithmetic_mean** <br>(gauge) | Media_aritmética de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.geometric_mean** <br>(gauge) | Media_geométrica de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.harmonic_mean** <br>(gauge) | Media_armónica de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.kurtosis** <br>(gauge) | Curtosis de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.max** <br>(gauge) | Máximo de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.median** <br>(gauge) | Mediana de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.min** <br>(gauge) | Mínimo de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.n** <br>(gauge) | N de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.percentile.50** <br>(gauge) | Percentil 50 de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.percentile.75** <br>(gauge) | Percentil 75 de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.percentile.90** <br>(gauge) | Percentil 90 de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.percentile.95** <br>(gauge) | Percentil 95 de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.percentile.99** <br>(gauge) | Percentil 99 de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.percentile.999** <br>(gauge) | Percentil 999 de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.skewness** <br>(gauge) | Asimetría de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.standard_deviation** <br>(gauge) | Desviación_estándar de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_process_time.variance** <br>(gauge) | Variación de la duración de las llamadas a la función validate_doc_update<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.query_server.vdu_rejects** <br>(gauge) | Número de rechazos de la función validate_doc_update<br>_Se muestra como evento_ |
| **couchdb.couchdb.request_time** <br>(gauge) | Duración de una solicitud dentro de CouchDB sin MochiWeb (disponible solo para CouchDB v1)<br>_Se muestra en segundos_ |
| **couchdb.couchdb.request_time.arithmetic_mean** <br>(gauge) | Media_aritmética de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.geometric_mean** <br>(gauge) | Media_geométrica de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.harmonic_mean** <br>(gauge) | Media_armónica de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.kurtosis** <br>(gauge) | Curtosis de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.max** <br>(gauge) | Duración máxima de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.median** <br>(gauge) | Mediana de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.min** <br>(gauge) | Mínimo de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.n** <br>(gauge) | N de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.percentile.50** <br>(gauge) | Percentil 50 de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.percentile.75** <br>(gauge) | Percentil 75 de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.percentile.90** <br>(gauge) | Percentil 90 de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.percentile.95** <br>(gauge) | Percentil 95 de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.percentile.99** <br>(gauge) | Percentil 99 de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.percentile.999** <br>(gauge) | Percentil 999 de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.skewness** <br>(gauge) | Asimetría de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.standard_deviation** <br>(gauge) | Desviación_estándar de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.couchdb.request_time.variance** <br>(gauge) | Variación de la duración de una solicitud dentro de CouchDB sin MochiWeb (no disponible para CouchDB v1)<br>_Se muestra en milisegundos_ |
| **couchdb.ddoc_cache.hit** <br>(gauge) | Número de aciertos de caché de documentos de diseño<br>_Se muestra como acierto_ |
| **couchdb.ddoc_cache.miss** <br>(gauge) | Número de fallos de caché de documentos de diseño<br>_Se muestra como error_ |
| **couchdb.ddoc_cache.recovery** <br>(gauge) | Número de recuperaciones de caché de documentos de diseño<br>_Se muestra como lectura_ |
| **couchdb.erlang.context_switches** <br>(gauge) | |
| **couchdb.erlang.distribution.recv_avg** <br>(gauge) | |
| **couchdb.erlang.distribution.recv_cnt** <br>(gauge) | |
| **couchdb.erlang.distribution.recv_dvi** <br>(gauge) | |
| **couchdb.erlang.distribution.recv_max** <br>(gauge) | |
| **couchdb.erlang.distribution.recv_oct** <br>(gauge) | |
| **couchdb.erlang.distribution.send_avg** <br>(gauge) | |
| **couchdb.erlang.distribution.send_cnt** <br>(gauge) | |
| **couchdb.erlang.distribution.send_max** <br>(gauge) | |
| **couchdb.erlang.distribution.send_oct** <br>(gauge) | |
| **couchdb.erlang.distribution.send_pend** <br>(gauge) | |
| **couchdb.erlang.ets_table_count** <br>(gauge) | |
| **couchdb.erlang.garbage_collection_count** <br>(gauge) | |
| **couchdb.erlang.internal_replication_jobs** <br>(gauge) | |
| **couchdb.erlang.io_input** <br>(gauge) | |
| **couchdb.erlang.io_output** <br>(gauge) | |
| **couchdb.erlang.memory.atom** <br>(gauge) | <br>_Se muestra en bytes_ |
| **couchdb.erlang.memory.atom_used** <br>(gauge) | <br>_Se muestra en bytes_ |
| **couchdb.erlang.memory.binary** <br>(gauge) | <br>_Se muestra en bytes_ |
| **couchdb.erlang.memory.code** <br>(gauge) | <br>_Se muestra en bytes_ |
| **couchdb.erlang.memory.ets** <br>(gauge) | <br>_Se muestra en bytes_ |
| **couchdb.erlang.memory.other** <br>(gauge) | <br>_Se muestra en bytes_ |
| **couchdb.erlang.memory.processes** <br>(gauge) | <br>_Se muestra en bytes_ |
| **couchdb.erlang.memory.processes_used** <br>(gauge) | <br>_Se muestra en bytes_ |
| **couchdb.erlang.message_queues.size** <br>(gauge) | Número de colas de mensajes|
| **couchdb.erlang.message_queues.max** <br>(gauge) | Longitud máxima de las colas de mensajes|
| **couchdb.erlang.message_queues.min** <br>(gauge) | Longitud mínima de las colas de mensajes|
| **couchdb.erlang.message_queues.50** <br>(gauge) | Percentil 50 de la longitud de las colas de mensajes|
| **couchdb.erlang.message_queues.90** <br>(gauge) | Percentil 90 de la longitud de las colas de mensajes|
| **couchdb.erlang.message_queues.99** <br>(gauge) | Percentil 99 de la longitud de las colas de mensajes|
| **couchdb.erlang.os_proc_count** <br>(gauge) | |
| **couchdb.erlang.process_count** <br>(gauge) | |
| **couchdb.erlang.process_limit** <br>(gauge) | |
| **couchdb.erlang.reductions** <br>(gauge) | |
| **couchdb.erlang.run_queue** <br>(gauge) | |
| **couchdb.erlang.stale_proc_count** <br>(gauge) | |
| **couchdb.erlang.uptime** <br>(gauge) | |
| **couchdb.erlang.words_reclaimed** <br>(gauge) | |
| **couchdb.fabric.doc_update.errors** <br>(gauge) | Número de errores de actualización de documentos<br>_Se muestra como error_ |
| **couchdb.fabric.doc_update.mismatched_errors** <br>(gauge) | Número de errores de actualización de documentos con varios tipos de error<br>_Se muestra como error_ |
| **couchdb.fabric.doc_update.write_quorum_errors** <br>(gauge) | Número de errores de quórum de escritura<br>_Se muestra como error_ |
| **couchdb.fabric.open_shard.timeouts** <br>(gauge) | Número de tiempos de espera de fragmentos abiertos<br>_Se muestra como error_ |
| **couchdb.fabric.read_repairs.failure** <br>(gauge) | Número de operaciones de reparación de lectura fallidas<br>_Se muestra como operación_ |
| **couchdb.fabric.read_repairs.success** <br>(gauge) | Número de operaciones de reparación de lectura exitosas<br>_Se muestra como operación_ |
| **couchdb.fabric.worker.timeouts** <br>(gauge) | Número de tiempos de espera de workers<br>_Se muestra como tiempo de espera_ |
| **couchdb.global_changes.db_writes** <br>(gauge) | Número de escrituras en bases de datos realizadas por global_changes<br>_Se muestra como escritura_ |
| **couchdb.global_changes.event_doc_conflict** <br>(gauge) | Número de documentos de eventos conflictivos encontrados por global_changes<br>_Se muestra como evento_ |
| **couchdb.global_changes.listener_pending_updates** <br>(gauge) | Número de actualizaciones de cambios globales pendientes de escritura en global_changes_listener<br>_Se muestra como escritura_ |
| **couchdb.global_changes.rpcs** <br>(gauge) | Número de operaciones RPC realizadas por global_changes<br>_Se muestra como operación_ |
| **couchdb.global_changes.server_pending_updates** <br>(gauge) | Número de actualizaciones de cambios globales pendientes de escritura en global_changes_server<br>_Se muestra como escritura_ |
| **couchdb.mem3.shard_cache.eviction** <br>(gauge) | Número de desalojos de la caché de fragmentos<br>_Se muestra como desalojo_ |
| **couchdb.mem3.shard_cache.hit** <br>(gauge) | Número de aciertos de caché de fragmentos<br>_Se muestra como acierto_ |
| **couchdb.mem3.shard_cache.miss** <br>(gauge) | Número de fallos de caché de fragmentos<br>_Se muestra como fallo_ |
| **couchdb.pread.exceed_eof** <br>(gauge) | Número de intentos de lectura más allá del final del archivo de base de datos<br>_Se muestra como lectura_ |
| **couchdb.pread.exceed_limit** <br>(gauge) | Número de intentos de lectura más allá del límite establecido<br>_Se muestra como lectura_ |
| **couchdb.rexi.buffered** <br>(gauge) | Número de mensajes rexi almacenados en buffer<br>_Se muestra como mensaje_ |
| **couchdb.rexi.down** <br>(gauge) | Número de mensajes rexi_DOWN gestionados<br>_Se muestra como mensaje_ |
| **couchdb.rexi.dropped** <br>(gauge) | Número de mensajes rexi descartados de los buffers<br>_Se muestra como mensaje_ |
| **couchdb.rexi.streams.timeout.init_stream** <br>(gauge) | Número de tiempos de espera excedidos para la inicialización de flujos rexi<br>_Se muestra como tiempo de espera excedido_ |
| **couchdb.rexi.streams.timeout.stream** <br>(gauge) | Número de tiempos de espera excedidos de flujos rexi<br>_Se muestra como tiempo de espera excedido_ |
| **couchdb.rexi.streams.timeout.wait_for_ack** <br>(gauge) | Número de tiempos de espera excedidos de flujos rexi mientras se espera confirmación<br>_Se muestra como tiempo de espera excedido_ |
| **couchdb.couchdb.httpd.all_docs_timeouts** <br>(gauge) | Número de tiempos de espera excedidos HTTP all_docs<br>_Se muestra como tiempo de espera excedido_ |
| **couchdb.couchdb.httpd.explain_timeouts** <br>(gauge) | Número de tiempos de espera excedidos HTTP \_explain<br>_Se muestra como tiempo de espera excedido_ |
| **couchdb.couchdb.httpd.find_timeouts** <br>(gauge) | Número de tiempos de espera excedidos para búsquedas HTTP<br>_Se muestra como tiempo de espera excedido_ |
| **couchdb.couchdb.httpd.partition_all_docs_requests** <br>(gauge) | Número de solicitudes de partición HTTP \_all_docs<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd.partition_all_docs_timeouts** <br>(gauge) | Número de tiempos de espera de particiones HTTP all_docs<br>_Se muestra como tiempo de espera excedido_ |
| **couchdb.couchdb.httpd.partition_explain_requests** <br>(gauge) | Número de solicitudes de partición HTTP \_explain<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd.partition_explain_timeouts** <br>(gauge) | Número de tiempos de espera excedido para particiones HTTP \_explain<br>_Se muestra como tiempo de espera excedido_ |
| **couchdb.couchdb.httpd.partition_find_requests** <br>(gauge) | Número de solicitudes de particiones HTTP \_find<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd.partition_find_timeouts** <br>(gauge) | Número de tiempos de espera excedidos para búsquedas HTTP de particiones<br>_Se muestra como tiempo de espera excedido_ |
| **couchdb.couchdb.httpd.partition_view_requests** <br>(gauge) | Número de solicitudes de vistas HTTP de particiones<br>_Se muestra como solicitud_ |
| **couchdb.couchdb.httpd.partition_view_timeouts** <br>(gauge) | Número de tiempos de espera excedidos para vistas HTTP de particiones<br>_Se muestra como tiempo de espera excedido_ |
| **couchdb.couchdb.httpd.view_timeouts** <br>(gauge) | Número de tiempos de espera excedidos para vistas HTTP<br>_Se muestra como tiempo de espera excedido_ |
| **couchdb.couchdb.io_queue.search** <br>(gauge) | Búsqueda de E/S activada directamente por solicitudes de clientes|
| **couchdb.couchdb.io_queue2.search.count** <br>(gauge) | Búsqueda de E/S activada directamente por solicitudes de clientes|
| **couchdb.dreyfus.httpd.search.arithmetic_mean** <br>(gauge) | Media_aritmética de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.geometric_mean** <br>(gauge) | Media_geométrica de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.harmonic_mean** <br>(gauge) | Media_armónica de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.kurtosis** <br>(gauge) | Curtosis de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.max** <br>(gauge) | Máximo de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.median** <br>(gauge) | Mediana de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.min** <br>(gauge) | Mínimo de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.n** <br>(gauge) | Número de distribuciones de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.percentile.50** <br>(gauge) | Percentil 50 de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.percentile.75** <br>(gauge) | Percentil 75 de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.percentile.90** <br>(gauge) | Percentil 90 de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.percentile.95** <br>(gauge) | Percentil 95 de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.percentile.99** <br>(gauge) | Percentil 99 de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.percentile.999** <br>(gauge) | Percentil 999 de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.skewness** <br>(gauge) | Sesgo de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.standard_deviation** <br>(gauge) | Desviación_estándar de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.httpd.search.variance** <br>(gauge) | Varianza de la distribución de la latencia global de las solicitudes de búsqueda experimentada por el usuario final|
| **couchdb.dreyfus.index.await.arithmetic_mean** <br>(gauge) | Media_aritmética de la longitud de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.geometric_mean** <br>(gauge) | Media_geométrica de la longitud de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.harmonic_mean** <br>(gauge) | Media_armónica de la longitud de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.kurtosis** <br>(gauge) | Curtosis de la longitud de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.max** <br>(gauge) | Longitud máxima de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.median** <br>(gauge) | Mediana de la longitud de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.min** <br>(gauge) | Longitud mínima de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.n** <br>(gauge) | Número de longitud de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.percentile.50** <br>(gauge) | Percentil 50 de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.percentile.75** <br>(gauge) | Percentil 75 de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.percentile.90** <br>(gauge) | Percentil 90 de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.percentile.95** <br>(gauge) | Percentil 95 de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.percentile.99** <br>(gauge) | Percentil 99 de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.percentile.999** <br>(gauge) | Percentil 999 de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.skewness** <br>(gauge) | Asimetría de la longitud de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.standard_deviation** <br>(gauge) | Desviación estándar de la longitud de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.await.variance** <br>(gauge) | Varianza de la longitud de una solicitud de espera de un dreyfus_index|
| **couchdb.dreyfus.index.group1.arithmetic_mean** <br>(gauge) | Media_aritmética de la longitud de una solicitud de espera de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.geometric_mean** <br>(gauge) | Media_geométrica de la longitud de una solicitud de espera de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.harmonic_mean** <br>(gauge) | Media_armónica de la longitud de una solicitud de espera de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.kurtosis** <br>(gauge) | Curtosis de la longitud de una solicitud de espera de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.max** <br>(gauge) | Longitud máxima de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.median** <br>(gauge) | Mediana de la longitud de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.min** <br>(gauge) | Longitud mínima de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.n** <br>(gauge) | Número de longitud de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.percentile.50** <br>(gauge) | Percentil 50 de la longitud de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.percentile.75** <br>(gauge) | Percentil 75 de la longitud de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.percentile.90** <br>(gauge) | Percentil 90 de la longitud de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.percentile.95** <br>(gauge) | Percentil 95 de la longitud de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.percentile.99** <br>(gauge) | Percentil 99 de la longitud de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.percentile.999** <br>(gauge) | Percentil 999 de la longitud de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.skewness** <br>(gauge) | Asimetría de la longitud de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.standard_deviation** <br>(gauge) | Desviación_estándar de la longitud de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group1.variance** <br>(gauge) | Varianza de la longitud de una solicitud de grupo1 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.arithmetic_mean** <br>(gauge) | Media_aritmética de la longitud de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.geometric_mean** <br>(gauge) | Media_geométrica de la longitud de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.harmonic_mean** <br>(gauge) | Media_armónica de la longitud de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.kurtosis** <br>(gauge) | Curtosis de la longitud de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.max** <br>(gauge) | Longitud máxima de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.median** <br>(gauge) | Mediana de la longitud de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.min** <br>(gauge) | Longitud mínima de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.n** <br>(gauge) | Número de longitud de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.percentile.50** <br>(gauge) | Percentil 50 de la longitud de una solicitud de grupo 2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.percentile.75** <br>(gauge) | Percentil 75 de la longitud de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.percentile.90** <br>(gauge) | Percentil 90 de la longitud de una solicitud de grupo 2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.percentile.95** <br>(gauge) | Percentil 95 de la longitud de una solicitud de grupo 2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.percentile.99** <br>(gauge) | Percentil 99 de la longitud de una solicitud de grupo 2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.percentile.999** <br>(gauge) | Percentil 999 de la longitud de una solicitud de grupo 2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.skewness** <br>(gauge) | Asimetría de la longitud de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.standard_deviation** <br>(gauge) | Desviación_estándar de la longitud de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.group2.variance** <br>(gauge) | Varianza de la longitud de una solicitud de grupo2 de un dreyfus_index|
| **couchdb.dreyfus.index.info.arithmetic_mean** <br>(gauge) | Media_aritmética de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.geometric_mean** <br>(gauge) | Media_geométrica de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.harmonic_mean** <br>(gauge) | Media_armónica de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.kurtosis** <br>(gauge) | Curtosis de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.max** <br>(gauge) | Longitud máxima de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.median** <br>(gauge) | Mediana de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.min** <br>(gauge) | Longitud mínima de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.n** <br>(gauge) | Número de longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.percentile.50** <br>(gauge) | Percentil 50 de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.percentile.75** <br>(gauge) | Percentil 75 de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.percentile.90** <br>(gauge) | Percentil 90 de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.percentile.95** <br>(gauge) | Percentil 95 de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.percentile.99** <br>(gauge) | Percentil 99 de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.percentile.999** <br>(gauge) | Percentil 999 de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.skewness** <br>(gauge) | Asimetría de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.standard_deviation** <br>(gauge) | Desviación_estándar de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.info.variance** <br>(gauge) | Variación de la longitud de una solicitud de información de un dreyfus_index|
| **couchdb.dreyfus.index.search.arithmetic_mean** <br>(gauge) | Media_aritmética de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.geometric_mean** <br>(gauge) | Media_geométrica de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.harmonic_mean** <br>(gauge) | Media_armónica de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.kurtosis** <br>(gauge) | Curtosis de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.max** <br>(gauge) | Longitud máxima de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.median** <br>(gauge) | Mediana de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.min** <br>(gauge) | Longitud mínima de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.n** <br>(gauge) | Número de longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.percentile.50** <br>(gauge) | Percentil 50 de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.percentile.75** <br>(gauge) | Percentil 75 de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.percentile.90** <br>(gauge) | Percentil 90 de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.percentile.95** <br>(gauge) | Percentil 95 de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.percentile.99** <br>(gauge) | Percentil 99 de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.percentile.999** <br>(gauge) | Percentil 999 de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.skewness** <br>(gauge) | Asimetría de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.standard_deviation** <br>(gauge) | Desviación estándar de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.index.search.variance** <br>(gauge) | Varianza de la longitud de una solicitud de búsqueda de un dreyfus_index|
| **couchdb.dreyfus.rpc.group1.arithmetic_mean** <br>(gauge) | Media_aritmética de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.geometric_mean** <br>(gauge) | Media_geométrica de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.harmonic_mean** <br>(gauge) | Media_armónica de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.kurtosis** <br>(gauge) | Curtosis de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.max** <br>(gauge) | Longitud máxima de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.median** <br>(gauge) | Mediana de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.min** <br>(gauge) | Longitud mínima de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.n** <br>(gauge) | Número de longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.percentile.50** <br>(indicador) | p50 de longitud de un trabajador RPC del grupo1|
| **couchdb.dreyfus.rpc.group1.percentile.75** <br>(calibre) | Percentil 75 de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.percentile.90** <br>(gauge) | Percentil 90 de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.percentile.95** <br>(gauge) | Percentil 95 de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.percentile.99** <br>(gauge) | Percentil 99 de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.percentile.999** <br>(gauge) | Percentil 999 de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.skewness** <br>(gauge) | Asimetría de longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.standard_deviation** <br>(gauge) | Desviación_estándar de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group1.variance** <br>(gauge) | Varianza de la longitud de un worker RPC de grupo1|
| **couchdb.dreyfus.rpc.group2.arithmetic_mean** <br>(gauge) | Media_aritmética de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.geometric_mean** <br>(gauge) | Media_geométrica de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.harmonic_mean** <br>(gauge) | Media_armónica de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.kurtosis** <br>(gauge) | Curtosis de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.max** <br>(gauge) | Longitud máxima de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.median** <br>(gauge) | Mediana de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.min** <br>(gauge) | Longitud mínima de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.n** <br>(gauge) | Número de longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.percentile.50** <br>(gauge) | Percentil 50 de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.percentile.75** <br>(gauge) | Percentil 75 de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.percentile.90** <br>(gauge) | Percentil 90 de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.percentile.95** <br>(gauge) | Percentil 95 de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.percentile.99** <br>(gauge) | Percentil 99 de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.percentile.999** <br>(gauge) | Percentil 999 de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.skewness** <br>(gauge) | Asimetría de longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.standard_deviation** <br>(gauge) | Desviación_estándar de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.group2.variance** <br>(gauge) | Varianza de la longitud de un worker RPC de grupo2|
| **couchdb.dreyfus.rpc.info.arithmetic_mean** <br>(gauge) | Media_aritmética de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.geometric_mean** <br>(gauge) | Media_geométrica de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.harmonic_mean** <br>(gauge) | Media_armónica de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.kurtosis** <br>(gauge) | Curtosis de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.max** <br>(gauge) | Longitud máxima de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.median** <br>(gauge) | Mediana de la duración de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.min** <br>(gauge) | Longitud mínima de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.n** <br>(gauge) | Número de longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.percentile.50** <br>(gauge) | Percentil 50 de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.percentile.75** <br>(gauge) | Percentil 75 de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.percentile.90** <br>(gauge) | Percentil 90 de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.percentile.95** <br>(gauge) | Percentil 95 de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.percentile.99** <br>(gauge) | Percentil 99 de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.percentile.999** <br>(gauge) | Percentil 999 de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.skewness** <br>(gauge) | Asimetría de longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.standard_deviation** <br>(gauge) | Desviación_estándar de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.info.variance** <br>(gauge) | Variación de la longitud de un worker RPC de información|
| **couchdb.dreyfus.rpc.search.arithmetic_mean** <br>(gauge) | Media_aritmética de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.geometric_mean** <br>(gauge) | Media_geométrica de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.harmonic_mean** <br>(gauge) | Media_armónica de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.kurtosis** <br>(gauge) | Curtosis de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.max** <br>(gauge) | Longitud máxima de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.median** <br>(gauge) | Mediana de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.min** <br>(gauge) | Longitud mínima de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.n** <br>(gauge) | Número de longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.percentile.50** <br>(gauge) | Percentil 50 de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.percentile.75** <br>(gauge) | Percentil 75 de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.percentile.90** <br>(gauge) | Percentil 90 de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.percentile.95** <br>(gauge) | Percentil 95 de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.percentile.99** <br>(gauge) | Percentil 99 de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.percentile.999** <br>(gauge) | Percentil 999 de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.skewness** <br>(gauge) | Asimetría de longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.standard_deviation** <br>(gauge) | Desviación_estándar de la longitud de un worker RPC de búsqueda|
| **couchdb.dreyfus.rpc.search.variance** <br>(gauge) | Varianza de la longitud de un worker RPC de búsqueda|
| **couchdb.mango.docs_examined** <br>(gauge) | Número de documentos examinados por consultas mango coordinadas por este nodo|
| **couchdb.mango.evaluate_selector** <br>(gauge) | Número de evaluaciones del selector mango|
| **couchdb.mango.query_invalid_index** <br>(gauge) | Número de consultas mango que han generado un aviso de índice no válido|
| **couchdb.mango.query_time.arithmetic_mean** <br>(gauge) | Media_aritmética del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.geometric_mean** <br>(gauge) | Media_geométrica del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.harmonic_mean** <br>(gauge) | Media_armónica del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.kurtosis** <br>(gauge) | Curtosis de la duración del tratamiento de una consulta mango|
| **couchdb.mango.query_time.max** <br>(gauge) | Tiempo máximo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.median** <br>(gauge) | Mediana del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.min** <br>(gauge) | Tiempo mínimo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.n** <br>(gauge) | Número de tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.percentile.50** <br>(gauge) | Percentil 50 del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.percentile.75** <br>(gauge) | Percentil 75 del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.percentile.90** <br>(gauge) | Percentil 90 del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.percentile.95** <br>(gauge) | Percentil 95 del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.percentile.99** <br>(gauge) | Percentil 99 del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.percentile.999** <br>(gauge) | Percentil 999 del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.skewness** <br>(gauge) | Asimetría del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.standard_deviation** <br>(gauge) | Desviación_estándar del tiempo de procesamiento de una consulta mango|
| **couchdb.mango.query_time.variance** <br>(gauge) | Varianza de la duración del tratamiento de una consulta mango|
| **couchdb.mango.quorum_docs_examined** <br>(gauge) | Número de documentos examinados por las consultas mango, utilizando el quórum de clústeres|
| **couchdb.mango.results_returned** <br>(gauge) | Número de filas devueltas por consultas mango<br>_Se muestra como fila_ |
| **couchdb.mango.too_many_docs_scanned** <br>(gauge) | Número de consultas mango que han generado una advertencia de exploración de índice<br>_Se muestra como consulta_ |
| **couchdb.mango.unindexed_queries** <br>(gauge) | Número de consultas mango que no han podido utilizar un índice<br>_Se muestra como consulta_ |

### Eventos

El check de Couch no incluye eventos.

### Checks de servicio

**couchdb.can_connect**

Devuelve el estado después de hacer ping a tu instancia CouchDB. En el mensaje de comprobación se incluye información adicional sobre el estado de la respuesta en el momento de la recopilación.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorización del rendimiento de CouchDB con Datadog](https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog)