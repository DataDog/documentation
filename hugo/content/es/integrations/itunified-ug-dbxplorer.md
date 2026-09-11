---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/itunified_ug_dbxplorer
app_id: itunified-ug-dbxplorer
categories:
- marketplace
- nube
- oracle
- almacenes de datos
- métricas
- events
custom_kind: integración
description: Monitorizar y analizar el mantenimiento y el rendimiento de la base de
  datos de Oracle
further_reading:
- link: https://www.datadoghq.com/blog/itunified-datadog-marketplace/
  tag: blog
  text: Optimiza el rendimiento de tus bases de datos de Oracle con la oferta de ITUnified
    en el Datadog Marketplace
integration_version: 1.0.0
media:
- caption: dbXplorer - Monitoraización de ASH
  image_url: images/1.png
  media_type: imagen
- caption: dbXplorer - ASH Monitorización de vista de logs relacionados con sql_id
  image_url: images/2.png
  media_type: imagen
- caption: dbXplorer - Mantenimiento del rendimiento de la base de datos
  image_url: images/3.png
  media_type: imagen
- caption: dbXplorer - Monitorización del espacio
  image_url: images/4.png
  media_type: imagen
- caption: dbXplorer - Resumen del estado
  image_url: images/5.png
  media_type: imagen
supported_os:
- linux
title: dbXplorer para Oracle DBMS
---
## Información general

**dbXplorer** te permite monitorizar bases de datos de Oracle (19c o posterior), proporcionándote análisis en tiempo real y métricas de rendimiento disponibles en Datadog. Esta integración proporciona una visibilidad profunda del estado y el rendimiento de tus instancias de base de datos de Oracle.

Con esta integración:

- Monitoriza de forma proactiva: Detecta posibles problemas con antelación mediante alertas en tiempo real sobre cuellos de botella en el rendimiento, actividades inusuales o fallos.
- Optimiza el rendimiento: Recopila información sobre el rendimiento de las bases de datos para ayudar a ajustar las consultas y los recursos, garantizando una utilización y unos tiempos de respuesta óptimos.
- Administración simplificada: Centraliza la monitorización de varias bases de datos de Oracle en una única plataforma, agilizando el proceso de administración y reduciendo la sobrecarga operativa.

Esta integración monitoriza los siguientes tipos de datos desde bases de datos de Oracle:

- Métricas de rendimiento: Incluye datos sobre los tiempos de respuesta de las consultas, el uso de la memoria (por ejemplo, estadísticas de PGA y SGA) y los cuellos de botella de los recursos. Estos datos ayudan a identificar problemas de rendimiento y a optimizar las operaciones de la base de datos.
- Métricas de mantenimiento: Rastrea los indicadores de mantenimiento críticos, como los tiempos de conexión, las sesiones de usuario y la disponibilidad del sistema, lo que permite intervenir a tiempo para evitar tiempos de inactividad.

**Acerca de ITUnified:** con más de dos décadas de experiencia, los profesionales del Administrador de bases de datos (DBA) certificado por Oracle (DBA) tienen las capacidades necesarias para manejar proyectos intrincados y apoyar a los clientes en la gestión y administración de sus bases de datos. ITUnified se especializa en soporte de bases de datos a medida y servicios a través de una evaluación detallada de las necesidades.

### Métricas

| | |
| --- | --- |
| **dbxplorer.oracle.database.integration.status** <br>(gauge) | Recuento de bases de datos únicas monitorizadas por la integración|
| **dbxplorer.oracle.database.availability.status** <br>(gauge) | Disponibilidad de la base de datos|
| **dbxplorer.oracle.database.awr.ash.delta_interconnect_io_bytes** <br>(gauge) | Número de bytes de E/S enviados a través de la interconexión de E/S en los últimos microsegundos DELTA_TIME|
| **dbxplorer.oracle.database.awr.ash.delta_read_io_bytes** <br>(gauge) | Número de bytes de E/S leídos por esta sesión en los últimos microsegundos DELTA_TIME|
| **dbxplorer.oracle.database.awr.ash.delta_read_io_requests** <br>(gauge) | Número de solicitudes de E/S de lectura realizadas por esta sesión en los últimos microsegundos DELTA_TIME|
| **dbxplorer.oracle.database.awr.ash.delta_time** <br>(gauge) | Intervalo de tiempo (en microsegundos) desde la última vez que se muestreó o creó esta sesión sobre el que se acumulan las cinco estadísticas siguientes.|
| **dbxplorer.oracle.database.awr.ash.delta_write_io_bytes** <br>(gauge) | Número de bytes de E/S escritos por esta sesión en los últimos microsegundos DELTA_TIME|
| **dbxplorer.oracle.database.awr.ash.delta_write_io_requests** <br>(gauge) | Número de solicitudes de E/S de escritura realizadas por esta sesión en los últimos microsegundos DELTA_TIME|
| **dbxplorer.oracle.database.awr.ash.pga_allocated_in_bytes** <br>(gauge) | Cantidad de memoria PGA (en bytes) consumida por esta sesión en el momento en que se tomó esta muestra.|
| **dbxplorer.oracle.database.awr.ash.temp_space_allocated_in_bytes** <br>(gauge) | Cantidad de memoria TEMP (en bytes) consumida por esta sesión en el momento en que se tomó esta muestra|
| **dbxplorer.oracle.database.awr.ash.tm_delta_cpu_time** <br>(gauge) | Cantidad de tiempo que esta sesión pasó en la CPU en los últimos microsegundos TM_DELTA_TIME|
| **dbxplorer.oracle.database.awr.ash.tm_delta_db_time** <br>(gauge) | Cantidad de tiempo empleado por esta sesión en llamadas a la base de datos en los últimos microsegundos TM_DELTA_TIME|
| **dbxplorer.oracle.database.awr.ash.tm_delta_time** <br>(gauge) | Intervalo de tiempo (en microsegundos) en el que se acumulan TM_DELTA_CPU_TIME y TM_DELTA_DB_TIME|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.apwait_delta** <br>(gauge) | Valor delta del tiempo de espera de la aplicación (en microsegundos)|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.buffer_gets_delta** <br>(gauge) | Número delta del búfer que recibe este cursor secundario|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.ccwait_delta** <br>(gauge) | Valor delta del tiempo de espera de concurrencia (en microsegundos)|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.cell_uncompressed_bytes_delta** <br>(gauge) | Valor delta del número de bytes sin comprimir (es decir, el tamaño después de la descompresión) que se descargan en las celdas Exadata|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.clwait_delta** <br>(gauge) | Valor delta del tiempo de espera del clúster (en microsegundos)|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.cpu_time_delta** <br>(gauge) | Valor delta del tiempo de CPU (en microsegundos) utilizado por este cursor para el análisis/ejecución/recuperación.|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.direct_writes_delta** <br>(gauge) | Valor delta de escrituras directas|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.disk_reads_delta** <br>(gauge) | Número delta de lecturas de disco para este cursor secundario|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.elapsed_time_delta** <br>(gauge) | Valor delta del tiempo transcurrido (en microsegundos) utilizado por este cursor para el análisis/ejecución/recuperación.|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.executions_delta** <br>(gauge) | Número delta de ejecuciones que han tenido lugar en este objeto desde que se introdujo en la caché de la biblioteca|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.fetches_delta** <br>(gauge) | Número delta de consultas asociadas a la sentencia SQL|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.invalidations_delta** <br>(gauge) | Número delta de veces que se ha invalidado este cursor secundario|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.io_interconnect_bytes_delta** <br>(gauge) | Valor delta del número de bytes de E/S intercambiados entre Oracle Database y el sistema de almacenamiento|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.io_offload_elig_bytes_delta** <br>(gauge) | Valor delta de los bytes elegibles para la descarga de E/S|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.io_offload_return_bytes_delta** <br>(gauge) | Valor delta de los bytes devueltos por la descarga de E/S|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.iowait_delta** <br>(gauge) | Valor delta del tiempo de espera de E/S del usuario (en microsegundos)|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.javexec_time_delta** <br>(gauge) | Valor delta del tiempo de ejecución de Java (en microsegundos)|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.loaded_versions** <br>(gauge) | Indica si el heap de contexto está cargado (1) o no (0)|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.loads_delta** <br>(gauge) | Número de veces que el objeto se ha cargado o recargado|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.parse_calls_delta** <br>(gauge) | Número delta de llamadas de análisis para este cursor secundario|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.physical_read_bytes_delta** <br>(gauge) | Valor delta de los bytes físicos leídos|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.physical_write_bytes_delta** <br>(gauge) | Valor delta de los bytes físicos de escritura|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.plsexec_time_delta** <br>(gauge) | Valor delta del tiempo de ejecución PL/SQL (en microsegundos)|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.px_servers_execs_delta** <br>(gauge) | Número delta de ejecuciones del servidor PX|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.rows_processed_delta** <br>(gauge) | Número delta de filas que devuelve la sentencia SQL analizada|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.sharable_mem** <br>(gauge) | Cantidad de memoria compartida utilizada por el cursor secundario (en bytes)|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.sorts_delta** <br>(gauge) | Delta número de clasificaciones que se hicieron para este cursor secundario|
| **dbxplorer.oracle.database.awr.dba_hist_sqlstat.version_count** <br>(gauge) | Número de procesos secundarios asociados al cursor|
| **dbxplorer.oracle.database.health.osstat.busy_time_in_seconds** <br>(gauge) | Tiempo total de ocupación de los procesadores que ejecutan código de usuario o del núcleo en segundos|
| **dbxplorer.oracle.database.health.osstat.free_memory_bytes** <br>(gauge) | Memoria física total disponible en bytes|
| **dbxplorer.oracle.database.health.osstat.idle_time_in_seconds** <br>(gauge) | Tiempo total de inactividad de los procesadores en segundos|
| **dbxplorer.oracle.database.health.osstat.iowait_time_in_seconds** <br>(gauge) | Tiempo total que los procesadores han estado esperando a que se complete la E/S en segundos|
| **dbxplorer.oracle.database.health.osstat.load** <br>(gauge) | Carga media del sistema en el último minuto|
| **dbxplorer.oracle.database.health.osstat.num_cpus** <br>(gauge) | Número de CPU o procesadores disponibles|
| **dbxplorer.oracle.database.health.osstat.physical_memory_bytes** <br>(gauge) | Número total de bytes de memoria física|
| **dbxplorer.oracle.database.health.osstat.sys_time_in_seconds** <br>(gauge) | Tiempo total que los procesadores han estado ejecutando código del núcleo en segundos|
| **dbxplorer.oracle.database.health.osstat.user_time_in_seconds** <br>(gauge) | Tiempo total que los procesadores han estado ejecutando código de usuario en segundos|
| **dbxplorer.oracle.database.health.osstat.vm_in_bytes** <br>(gauge) | Número total de bytes de datos que se han paginado debido a la paginación de la memoria virtual.|
| **dbxplorer.oracle.database.health.osstat.vm_out_bytes** <br>(gauge) | Número total de bytes de datos que se han paginado debido a la paginación de la memoria virtual|
| **dbxplorer.oracle.database.health.pga.value** <br>(gauge) | Valor estadístico|
| **dbxplorer.oracle.database.health.session_event.time_waited_micro** <br>(gauge) | Tiempo total de espera del evento por la sesión (en microsegundos)|
| **dbxplorer.oracle.database.health.session_event.total_waits** <br>(gauge) | Número total de esperas del evento por sesión|
| **dbxplorer.oracle.database.health.session_wait.seconds_in_wait** <br>(gauge) | Cuánto tiempo (en segundos) lleva la sesión esperando el evento actual|
| **dbxplorer.oracle.database.health.session_wait.wait_time** <br>(gauge) | Tiempo de espera de la sesión|
| **dbxplorer.oracle.database.health.sysstat.value** <br>(gauge) | Valor estadístico|
| **dbxplorer.oracle.database.health.system_event.average_wait_in_seconds** <br>(gauge) | Tiempo medio de espera para los eventos en segundos|
| **dbxplorer.oracle.database.health.system_event.time_waited_fg_in_seconds** <br>(gauge) | Tiempo total de espera de la sesión en primer plano en segundos|
| **dbxplorer.oracle.database.health.system_event.time_waited_in_seconds** <br>(gauge) | Tiempo total de espera para eventos en segundos|
| **dbxplorer.oracle.database.health.system_event.time_waited_micro_fg** <br>(gauge) | Tiempo total de espera de la sesión en primer plano en microsegundos|
| **dbxplorer.oracle.database.health.system_event.total_timeouts** <br>(gauge) | Número total de tiempos de espera de los eventos|
| **dbxplorer.oracle.database.health.system_event.total_waits** <br>(gauge) | Número total de esperas para eventos|
| **dbxplorer.oracle.database.health.system_event.total_waits_fg** <br>(gauge) | Número total de esperas de eventos de sesiones en primer plano|
| **dbxplorer.oracle.database.space.recovery_area.percent_reclaimable** <br>(gauge) | Cantidad total de espacio en disco (en bytes) que puede crearse eliminando archivos redundantes obsoletos y otros archivos de baja prioridad del área de recuperación rápida.|
| **dbxplorer.oracle.database.space.recovery_area.percent_used** <br>(gauge) | Porcentaje de espacio de disco utilizado|
| **dbxplorer.oracle.database.space.recovery_area.reclaimable_bytes** <br>(gauge) | Cantidad total de espacio en disco (en bytes) que puede crearse eliminando archivos redundantes obsoletos y otros archivos de baja prioridad del área de recuperación rápida.|
| **dbxplorer.oracle.database.space.recovery_area.total_bytes** <br>(gauge) | Cantidad máxima de espacio en disco (en bytes) que la base de datos puede utilizar para el área de recuperación rápida. Este es el valor especificado en el parámetro de inicialización DB_RECOVERY_FILE_DEST_SIZE.|
| **dbxplorer.oracle.database.space.recovery_area.used_bytes** <br>(gauge) | Cantidad de espacio en disco (en bytes) utilizado por los archivos del área de recuperación rápida creados en el área de recuperación rápida actual y en todas las anteriores. El cambio de áreas de recuperación rápida no restablece SPACE_USED a 0.|
| **dbxplorer.oracle.database.space.tablespace.allocated_size_bytes** <br>(gauge) | Bytes asignados al espacio de tabla|
| **dbxplorer.oracle.database.space.tablespace.data_file_count** <br>(gauge) | Recuento de archivos de datos en el espacio de tabla|
| **dbxplorer.oracle.database.space.tablespace.fragmentation** <br>(gauge) | Fragmentación del espacio de tabla|
| **dbxplorer.oracle.database.space.tablespace.free_bytes** <br>(gauge) | Bytes libres en el espacio de tabla|
| **dbxplorer.oracle.database.space.tablespace.max_free_bytes** <br>(gauge) | Máx. de bytes libres en el espacio de tabla|
| **dbxplorer.oracle.database.space.tablespace.max_ts_size_bytes** <br>(gauge) | Tamaño máximo del espacio de tabla en bytes|
| **dbxplorer.oracle.database.space.tablespace.ts_segment_size_bytes** <br>(gauge) | Tamaño del segmento del espacio de tabla en bytes|
| **dbxplorer.oracle.database.space.tablespace.used_size_bytes** <br>(gauge) | Tamaño del espacio de tabla utilizado en bytes|

### Monitores

Con 12 monitores incluidos, recibe notificaciones con:

- Detección de anomalías de ejecuciones SQL basadas en CPU y tiempos transcurridos.
- Alertas de mantenimiento de la base de datos para eventos de carga y de espera
- Disponibilidad general de la base de datos
- Alertas predictivas para el uso de espacios de tabla de deshacer, temporales y permanentes
- Alertas predictivas de uso del área de recuperación
- Alertas predictivas de uso de disco ASM

### Dashboards

La integración de dbXplorer contiene 4 dashboards:

#### dbXplorer - Monitoraización de ASH

El dashboard de "dbXplorer - Monitorización de ASH" está diseñado para proporcionar un análisis exhaustivo del rendimiento de las bases de datos de Oracle, aprovechando los datos de SQLSTAT y ACTIVE SESSION HISTORY (ASH). El dashboard combina métricas de ejecución de SQL de SQLSTAT con información sobre la actividad al nivel de la sesión de ASH, permitiendo una visión holística del rendimiento de la base de datos y las oportunidades de optimización. Presenta múltiples widgets, incluidos gráficos de series temporales detallados y tablas de consultas que monitorizan y analizan varias métricas de rendimiento, como el tiempo transcurrido, el tiempo de CPU y las operaciones de E/S. Entre las principales funciones se incluyen la detección de anomalías para identificadores específicos de SQL, el análisis del rendimiento histórico y la monitorización de tendencias para diagnosticar problemas de rendimiento y optimizar las operaciones de la base de datos.

#### dbXplorer - Mantenimiento del rendimiento de la base de datos

El dashboard de "dbXplorer - Mantenimiento del rendimiento de la base de datos" está hecho a medida para una monitorización exhaustiva del rendimiento de la base de datos de Oracle, centrándose en distintos aspectos críticos como anomalías de carga, anomalías de espera de sesión, uso de CPU y uso de memoria. Emplea múltiples widgets que muestran visualmente los datos mediante gráficos y tablas, que ayudan a los administradores de bases de datos a identificar y solucionar rápidamente los cuellos de botella en el rendimiento. Entre sus principales funciones se incluye el análisis detallado de los eventos de espera de sesión a través de las vistas v$session_event y v$session_wait, que ofrecen información sobre eventos de espera específicos y su efecto en las sesiones de la base de datos. Además, el dashboard proporciona herramientas para monitorizar y analizar métricas del rendimiento de todo el sistema a través de las vistas de v$system_event y v$osstat, que cubren las esperas al nivel de sistema y las interacciones del sistema operativo que afectan a las operaciones de la base de datos.

#### dbXplorer - Monitorización del espacio

El dashboard de "dbXplorer - Monitorización del espacio" proporciona monitorización detallada y previsiones de espacios de tiempo de bases de datos de Oracle, áreas de recuperación y grupos de discos de Automatic Storage Management (ASM). Permite la visualización del uso actual e histórico de los datos, alertas para umbrales críticos y tendencias en la asignación de espacio en varios períodos de tiempo. Los widgets en el dashboard incluyen gráficos de series temporales, tablas de consultas y resúmenes de estado que permiten a los usuarios realizar un rastreo eficiente de métricas como el espacio total, utilizado y disponible. Además, el dashboard ofrece opciones de filtrado dinámico a través de variables de plantilla, lo que lo hace altamente personalizable para instancias de bases de datos específicas o clústeres. Esta herramienta es esencial para los administradores de bases de datos que pretenden mantener un rendimiento óptimo y anticiparse a posibles problemas relacionados con el espacio en sus sistemas.

#### dbXplorer - Resumen del estado

El dashboard de "dbXplorer - Resumen de estado" proporciona una visión concisa del estado y logs de las operaciones de la base de datos. Cuenta con "Logs de disponibilidad" que muestran eventos relacionados con la disponibilidad de la base de datos, ordenados por diversos parámetros, como la marca de tiempo y el nombre de la instancia. Otro widget, "Logs de dbXplorer", organiza los datos de logs de las transacciones de la base de datos en una vista resumida, agrupándolos por nombre de registrador y mostrando counts de logs por gravedad. El widget "Resumen de estados" ofrece una información general sobre los estados en un formato de lista y counts, priorizando la visualización de los datos en función de la gravedad de los problemas.

#### dbXplorer - Oracle LMS

El dashboard "dbXplorer - Oracle LMS" se centra en los servicios de administración de licencias (LMS) de Oracle y rastrea e informa sobre el uso de las funciones de la base de datos que son relevantes para la concesión de licencias. Presenta una visualización del count de CPU que ayuda a comprender la escala de las operaciones de la base de datos y las posibles necesidades de licencias. Además, el dashboard incluye estadísticas detalladas del uso de las funciones, que ejecuta consultas complejas para asignar las funciones de la base de datos a los productos, clasificando el uso en categorías como uso actual y pasado y gestionando las excepciones en los informes de funciones. Aunque este dashboard es una herramienta esencial para que los administradores de bases de datos garanticen el cumplimiento de los requisitos para el otorgamiento de licencias de Oracle, no debe confiarse exclusivamente en él con fines de otorgamiento de licencias.

### Requisitos previos

- Se admiten versiones de bases de datos de Oracle a partir de 19c EE que utilicen la infraestructura de Oracle Grid. No se admiten recopilaciones de versiones anteriores de bases de datos ni instalaciones serverless.

- Esta integración requiere una licencia de Oracle Diagnostic and Tuning Pack. Si no deseas utilizar este paquete ni obtener su licencia, asegúrate de desactivar la recopilación de métricas de ASH y AWR. En las instrucciones de configuración encontrarás una explicación sobre cómo recopilar o desactivar estas métricas.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con [support.datadog@itunified.de](mailto:support.datadog@itunified.de).

### Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Optimizar el rendimiento de tus bases de datos de Oracle con la oferta de ITUnified en el Datadog Marketplace](https://www.datadoghq.com/blog/itunified-datadog-marketplace/)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/itunified-ug-dbxplorer" target="_blank">Haz clic aquí</a> para comprar esta aplicación.