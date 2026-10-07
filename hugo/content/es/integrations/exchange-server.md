---
aliases:
- /es/integrations/exchange_server
app_id: exchange-server
categories:
- recopilación de logs
- windows
custom_kind: integración
description: Recopilar y representar gráficamente las métricas de Microsoft Exchange
  Server
integration_version: 4.2.0
media: []
supported_os:
- windows
title: Microsoft Exchange Server
---
## Información general

Obtener métricas de Microsoft Exchange Server

- Visualizar y monitorizar el rendimiento del Exchange Server

## Configuración

### Instalación

El check de Exchange está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores.

### Configuración

1. Edita el archivo `exchange_server.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus datos de rendimiento de Exchange Server.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**Nota**: Las versiones 1.11.0 o posteriores de este check utilizan una nueva implementación para la recopilación de métricas, que requiere Python 3. Para hosts que no pueden utilizar Python 3, o si deseas utilizar una versión anterior de este check, consulta la siguiente [configuración](https://github.com/DataDog/integrations-core/blob/7.33.x/exchange_server/datadog_checks/exchange_server/data/conf.yaml.example).

### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `exchange_server.d/conf.yaml` para empezar a recopilar tus logs de Exchange Server:

   ```yaml
   logs:
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\CommonDiagnosticsLog\\*"
       source: exchange-server
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\ThrottlingService\\*"
       source: exchange-server
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\Hub\\Connectivity\\*"
       source: exchange-server
   ```

   **Nota**: Los únicos logs compatibles son los logs CommonDiagnosticsLog, ThrottlingService y Connectivity debido a que Exchange Server produce muchos tipos diferentes de logs. Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/) para solicitar otros formatos de logs.

   Cambia el valor del parámetro `path` y configúralo para tu entorno.
   Consulta el [exchange_server.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/exchange_server/datadog_checks/exchange_server/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `exchange_server` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **exchange.activemanager.database_mounted** <br>(gauge) | Muestra el número de copias de bases de datos activas en el servidor.|
| **exchange.activesync.ping_pending** <br>(gauge) | Muestra el número de comandos de ping actualmente pendientes en la cola.<br>_Se muestra como comando_ |
| **exchange.activesync.requests_persec** <br>(gauge) | Muestra el número de solicitudes HTTP recibidas del cliente a través de ASP.NET por segundo. Determina la tasa actual de solicitudes de Exchange ActiveSync. Solo se utiliza para determinar la carga de usuarios actual.<br>_Se muestra como solicitud_ |
| **exchange.activesync.sync_persec** <br>(gauge) | Muestra el número de comandos de sincronización procesados por segundo. Los clientes utilizan este comando para sincronizar elementos dentro de una carpeta.<br>_Se muestra como comando_ |
| **exchange.adaccess_domain_controllers.ldap_read** <br>(gauge) | Muestra el tiempo en milisegundos (ms) para enviar una solicitud de lectura LDAP al controlador de dominio especificado y recibir una respuesta.<br>_Se muestra como milisegundo_ |
| **exchange.adaccess_domain_controllers.ldap_search** <br>(gauge) | Muestra el tiempo (en ms) para enviar una solicitud de búsqueda LDAP y recibir una respuesta.<br>_Se muestra como milisegundo_ |
| **exchange.adaccess_processes.ldap_read** <br>(gauge) | Muestra el tiempo (en ms) para enviar una solicitud de lectura LDAP al controlador de dominio especificado y recibir una respuesta.<br>_Se muestra como milisegundo_ |
| **exchange.adaccess_processes.ldap_search** <br>(gauge) | Muestra el tiempo (en ms) para enviar una solicitud de búsqueda LDAP y recibir una respuesta.<br>_Se muestra como milisegundo_ |
| **exchange.autodiscover.requests_persec** <br>(gauge) | Muestra el número de solicitudes del servicio Autodiscover procesadas cada segundo. Determina la carga de usuarios actual.<br>_Se muestra como solicitud_ |
| **exchange.database.io_db_reads_attached_persec** <br>(gauge) | Muestra el número de operaciones de lectura de base de datos por segundo para cada instancia de base de datos adjunta.<br>_Se muestra como lectura_ |
| **exchange.database.io_db_reads_recovery_avg_latency** <br>(gauge) | Muestra la duración media, en ms, por operación de lectura de base de datos pasiva.<br>_Se muestra en milisegundos_ |
| **exchange.database.io_db_writes_attached_persec** <br>(gauge) | Muestra el número de operaciones de escritura en la base de datos por segundo para cada instancia de base de datos adjunta.<br>_Se muestra como escritura_ |
| **exchange.database.io_db_writes_recovery_avg_latency** <br>(gauge) | Muestra la duración media, en ms, de cada operación de escritura en la base de datos pasiva.<br>_Se muestra en milisegundos_ |
| **exchange.database.io_log_writes_avg_latency** <br>(gauge) | Muestra la duración media, en ms, de cada operación de escritura en log.<br>_Se muestra en milisegundos_ |
| **exchange.database.io_log_writes_persec** <br>(gauge) | Muestra el número de escrituras de log, por segundo, para cada instancia de base de datos.<br>_Se muestra como escritura_ |
| **exchange.database.io_reads_avg_latency** <br>(gauge) | Muestra la duración media, en milisegundos (ms), de cada operación de lectura de la base de datos.<br>_Se muestra en milisegundos_ |
| **exchange.database.io_writes_avg_latency** <br>(gauge) | Muestra la duración media, en ms, de cada operación de escritura en la base de datos.<br>_Se muestra en milisegundos_ |
| **exchange.httpproxy.avg_auth_latency** <br>(gauge) | Muestra el tiempo medio empleado en autenticar las solicitudes CAS en las últimas 200 muestras.<br>_Se muestra en milisegundos_ |
| **exchange.httpproxy.clientaccess_processing_latency** <br>(gauge) | Muestra la latencia media (ms) del tiempo de procesamiento de CAS (no incluye el tiempo empleado en el proxy) en las últimas 200 solicitudes.<br>_Se muestra en milisegundos_ |
| **exchange.httpproxy.mailbox_proxy_failure_rate** <br>(gauge) | Muestra el porcentaje de fallos relacionados con la conectividad entre este servidor de acceso de cliente y los servidores MBX en las últimas 200 muestras.<br>_Se muestra como porcentaje_ |
| **exchange.httpproxy.outstanding_requests** <br>(gauge) | Muestra el número de solicitudes proxy concurrentes pendientes.<br>_Se muestra como solicitud_ |
| **exchange.httpproxy.proxy_requests_persec** <br>(gauge) | Muestra el número de solicitudes proxy procesadas cada segundo.<br>_Se muestra como solicitud_ |
| **exchange.httpproxy.requests_persec** <br>(gauge) | Muestra el número de solicitudes procesadas cada segundo.<br>_Se muestra como solicitud_ |
| **exchange.httpproxy.server_locator_latency** <br>(gauge) | Muestra la latencia media (ms) de las llamadas al servicio web MailboxServerLocator.<br>_Se muestra en milisegundos_ |
| **exchange.is.clienttype.rpc_latency** <br>(gauge) | Muestra la latencia RPC del servidor, en ms, promediada para los últimos 1024 paquetes para un protocolo de cliente en particular.<br>_Se muestra como milisegundo_ |
| **exchange.is.clienttype.rpc_ops_persec** <br>(gauge) | Muestra el número de operaciones RPC por segundo para cada conexión de tipo de cliente.<br>_Se muestra como operación_ |
| **exchange.is.store.rpc_latency** <br>(gauge) | Latencia media de RPC (mseg) es la latencia media en milisegundos de las solicitudes RPC por base de datos. La media se calcula sobre todas las RPC desde que se cargó exrpc32.<br>_Se muestra como milisegundo_ |
| **exchange.is.store.rpc_ops_persec** <br>(gauge) | Muestra el número de operaciones RPC por segundo para cada instancia de base de datos.<br>_Se muestra como operación_ |
| **exchange.is.store.rpc_requests** <br>(gauge) | Indica el total de solicitudes RPC que se están ejecutando actualmente en el proceso de almacenamiento de información.<br>_Se muestra como solicitud_ |
| **exchange.memory.available** <br>(gauge) | Muestra la cantidad de memoria física, en megabytes (MB), inmediatamente disponible para asignar a un proceso o para uso del sistema. Es igual a la suma de la memoria asignada a las listas de página de espera (en caché), libre y cero.\[Métrica no específica de Exchange Server\]<br>_Se muestra como mebibyte_ |
| **exchange.memory.committed** <br>(gauge) | Muestra la proporción de Memory\\Committed Bytes respecto a Memory\\Commit Limit. \[No es una métrica específica de Exchange Server\]<br>_Se muestra como porcentaje_ |
| **exchange.netlogon.semaphore_acquires** <br>(count) | El número total de veces que se ha obtenido el semáforo durante el tiempo de vida del canal de la conexión del canal de seguridad, o desde el inicio del sistema para \_Total.|
| **exchange.netlogon.semaphore_hold_time** <br>(gauge) | El tiempo medio (en segundos) que se mantiene el semáforo en la última muestra.<br>_Se muestra como segundo_ |
| **exchange.netlogon.semaphore_holders** <br>(gauge) | El número de subprocesos que mantienen el semáforo.<br>_Se muestra como subproceso_ |
| **exchange.netlogon.semaphore_timeouts** <br>(count) | El número total de veces que un subproceso ha agotado el tiempo de espera mientras esperaba el semáforo durante el tiempo de vida de la conexión del canal de seguridad, o desde el inicio del sistema para \_Total.<br>_Se muestra como tiempo de espera_ |
| **exchange.netlogon.semaphore_waiters** <br>(gauge) | El número de subprocesos que están esperando obtener el semáforo.<br>_Se muestra como subproceso_ |
| **exchange.network.outbound_errors** <br>(gauge) | Indica el número de paquetes salientes que no se han podido transmitir debido a errores.<br>_Se muestra como error_ |
| **exchange.network.tcpv4.conns_reset** <br>(count) | Muestra el número de veces que las conexiones TCP han realizado una transición directa al estado CLOSED desde el estado ESTABLISHED o el estado CLOSE-WAIT. \[Métrica no específica de Exchange Server\]<br>_Se muestra como conexión_ |
| **exchange.network.tcpv6.connection_failures** <br>(gauge) | Muestra el número de conexiones TCP cuyo estado actual es ESTABLISHED o CLOSE-WAIT.\[No es una métrica específica de Exchange Server\]<br>_Se muestra como error_ |
| **exchange.network.tcpv6.conns_reset** <br>(count) | Muestra el número de veces que las conexiones TCP han realizado una transición directa al estado CLOSED desde el estado ESTABLISHED o el estado CLOSE-WAIT. \[Métrica no específica de Exchange Server\]<br>_Se muestra como conexión_ |
| **exchange.owa.requests_persec** <br>(gauge) | Muestra el número de solicitudes gestionadas por Outlook Web App por segundo. Determina la carga de usuarios actual.<br>_Se muestra como solicitud_ |
| **exchange.owa.unique_users** <br>(gauge) | Muestra el número de usuarios únicos actualmente registrados en Outlook Web App. Este valor supervisa el número de sesiones de usuario activas únicas, de modo que los usuarios solo se eliminan de este contador después de que se desconecten o se agote su sesión. Determina la carga de usuarios actual.<br>_Se muestra como usuario_ |
| **exchange.processor.cpu_privileged** <br>(gauge) | Muestra el porcentaje de tiempo de procesador empleado en modo privilegiado. El modo privilegiado es un modo de procesamiento diseñado para los componentes del sistema operativo y los controladores que manipulan el hardware. Permite el acceso directo al hardware y a toda la memoria.<br>_Se muestra como porcentaje_ |
| **exchange.processor.cpu_time** <br>(gauge) | Muestra el porcentaje de tiempo que el procesador está ejecutando procesos de aplicaciones o del sistema operativo. Esto es cuando el procesador no está inactivo.<br>_Se muestra como porcentaje_ |
| **exchange.processor.cpu_user** <br>(gauge) | Muestra el porcentaje de tiempo de procesador empleado en modo usuario. El modo de usuario es un modo de procesamiento restringido diseñado para aplicaciones, subsistemas de entorno y subsistemas integrales.<br>_Se muestra como porcentaje_ |
| **exchange.processor.queue_length** <br>(gauge) | Indica el número de subprocesos que está atendiendo cada procesador. Processor Queue Length muestra el número de subprocesos que están retrasados en la Processor Ready Queue y están esperando a ser programados para su ejecución. El valor indicado es el último valor observado en el momento en que se realizó la medición.\[No es una métrica específica de Exchange Server\]<br>_Se muestra como subproceso_ |
| **exchange.rpc.active_user_count** <br>(gauge) | Muestra el número de usuarios únicos que han mostrado alguna actividad en los últimos 2 minutos.<br>_Se muestra como usuario_ |
| **exchange.rpc.averaged_latency** <br>(gauge) | Muestra la latencia, en milisegundos (ms), promediada para los últimos 1024 paquetes.<br>_Se muestra como milisegundo_ |
| **exchange.rpc.conn_count** <br>(gauge) | Muestra el número total de conexiones de cliente mantenidas.<br>_Se muestra como conexión_ |
| **exchange.rpc.ops_persec** <br>(gauge) | Muestra la velocidad a la que se producen las operaciones RPC, por segundo.<br>_Se muestra como operación_ |
| **exchange.rpc.requests** <br>(gauge) | Muestra el número de solicitudes de clientes que está procesando actualmente el servicio de acceso de clientes RPC.<br>_Se muestra como solicitud_ |
| **exchange.rpc.user_count** <br>(gauge) | Muestra el número de usuarios conectados al servicio.<br>_Se muestra como usuario_ |
| **exchange.workload_management.active_tasks** <br>(gauge) | Muestra el número de tareas activas que se están ejecutando actualmente en segundo plano para la gestión de la carga de trabajo.<br>_Se muestra como tarea_ |
| **exchange.workload_management.completed_tasks** <br>(gauge) | Muestra el número de tareas de gestión de la carga de trabajo que se han completado.<br>_Se muestra como tarea_ |
| **exchange.workload_management.queued_tasks** <br>(gauge) | Muestra el número de tareas de gestión de la carga de trabajo que están actualmente en cola a la espera de ser procesadas.<br>_Se muestra como tarea_ |
| **exchange.ws.connection_attempts** <br>(gauge) | Muestra la velocidad a la que se intentan establecer conexiones con el servicio web. Determina la carga de usuarios actual.<br>_Se muestra como conexión_ |
| **exchange.ws.current_connections_default_website** <br>(gauge) | Muestra el número actual de conexiones establecidas con el sitio web predeterminado, que corresponde al número de conexiones que acceden al rol de servidor Front End CAS. Determina la carga actual de usuarios.<br>_Se muestra como conexión_ |
| **exchange.ws.current_connections_total** <br>(gauge) | Muestra el número actual de conexiones establecidas con el servicio web. Determina la carga actual de usuarios.<br>_Se muestra como conexión_ |
| **exchange.ws.other_attempts** <br>(gauge) | Muestra la tasa de solicitudes HTTP realizadas que no utilizan los métodos OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, MOVE, COPY, MKCOL, PROPFIND, PROPPATCH, SEARCH, LOCK o UNLOCK. Determina la carga actual del usuario.<br>_Se muestra como conexión_ |
| **exchange.ws.requests_persec** <br>(gauge) | Muestra el número de solicitudes procesadas cada segundo. Determina la carga de usuarios actual.<br>_Se muestra como solicitud_ |

### Eventos

El check de Exchange Server no incluye eventos.

### Checks de servicio

El check de Exchange Server no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).