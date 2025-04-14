---
algolia:
  subcategory: Integraciones del mercado
app_id: mainstorconcept-ziris
app_uuid: dc8b4d40-72a3-46c2-9f9a-ffaadaeacb83
assets:
  dashboards:
    JDBC and z/OS: assets/dashboards/JDBC_Dashboard.json
    MQ Buffer Pool Manager: assets/dashboards/MQ_Buffer_Pool_Manager.json
    MQ Channel Initiator: assets/dashboards/MQ_Channel_Initiator.json
    MQ Data Manager: assets/dashboards/MQ_Data_Manager.json
    MQ Log Manager: assets/dashboards/MQ_Log_Manager.json
    MQ Message Manager: assets/dashboards/MQ_Message_Manager.json
    MQ Storage Manager: assets/dashboards/MQ_Storage_Manager.json
    z/OS Connect Metrics: assets/dashboards/z_OS_Connect_Metrics.json
    z/OS Infrastructure: assets/dashboards/z_OS_Infrastructure.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: mainstorconcept.zos.connect.elapsed_time
      metadata_path: metadata.csv
      prefix: mainstorconcept.zos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: mainstorconcept-ziris
  monitors:
    MQ Active Dataset Reads: assets/monitors/mq_active_dataset_reads_monitor.json
    MQ Archive Dataset Reads: assets/monitors/mq_archive_dataset_reads_monitor.json
    MQ Checkpoints: assets/monitors/mq_checkpoints_monitor.json
    MQ Insufficient Storage Events: assets/monitors/mq_insufficient_storage_events_monitor.json
    MQ Storage Contractions: assets/monitors/mq_storage_contractions_monitor.json
    MQ Suspensions: assets/monitors/mq_suspensions_monitor.json
author:
  homepage: https://mainstorconcept.com
  name: mainstorconcept GmbH
  sales_email: sales@mainstorconcept.com
  support_email: support@mainstorconcept.com
  vendor_id: mainstorconcept
categories:
- mainframe
- mercado
- la red
- sistema operativo
- rastreo
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: mainstorconcept_ziris
integration_id: mainstorconcept-ziris
integration_title: z/IRIS
integration_version: ''
is_public: true
legal_terms:
  eula: EULA.pdf
manifest_version: 2.0.0
name: mainstorconcept_ziris
oauth: {}
pricing:
- billing_type: flat_fee
  includes_assets: false
  product_id: ziris
  short_description: El precio cubre 50 MSU en mainframe.
  unit_price: 4000.0
public_title: z/IRIS
short_description: Recopila datos de rendimiento de IBM z/OS de mainframes
supported_os:
- ibm z/os
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Mainframe
  - Category::Marketplace
  - Category::Network
  - Category::OS & System
  - Category::Tracing
  - Offering::Integration
  - Supported OS::IBM z/OS
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Recopila datos de rendimiento de IBM z/OS de mainframes
  media:
  - caption: z/IRIS - Observabilidad incluida en el mainframe
    image_url: images/thumbnail_mainstorconcept_ziris.PNG
    media_type: vídeo
    vimeo_id: 630489680
  - caption: Mapa de servicios con tramos (spans) creado
      por z/IRIS
    image_url: images/datadog-service-map-with-spans-created-by-ziris.png
    media_type: imagen
  - caption: dashboards de z/IRIS
    image_url: images/datadog-ziris-dashboards.png
    media_type: imagen
  - caption: Analice el rendimiento de las aplicaciones z/OS en Trace Explorer
    image_url: images/datadog-trace-explorer-filtering-zos-application-performance-measurements.png
    media_type: imagen
  - caption: z/IRIS amplía los gráficos de llama y las listas de tramos (spans)
    image_url: images/datadog-annotated-zosconnect-cics-db2-trace-page.png
    media_type: imagen
  - caption: z/IRIS se integra con Datadog
    image_url: images/ziris-otel-integration-with-datadog.png
    media_type: imagen
  - caption: Página de servicios de CICS
    image_url: images/datadog-annotated-cics-service-page.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: z/IRIS
  uninstallation: README.md#Uninstallation
---



## Información general

Impulsa sus prácticas de observabilidad empresarial con trazas (traces) y métricas adicionales desde tus aplicaciones de mainframe de backend y aprovecha las siguientes ventajas con [z/IRIS][1]:

* Visualiza las relaciones entre servicios y aplicaciones alojadas en la nube o servidores y mainframe.
* Descubre cómo contribuyen las aplicaciones de mainframe a la experiencia del usuario final.
* Reduce el tiempo medio de restauración (MTTR) aprovechando [Datadog Watchdog][23] para detectar automáticamente anomalías en aplicaciones z/OS que afectan a los servicios de negocio digital.
* Mejora drásticamente la comunicación entre los equipos de aplicaciones y los administradores de plataformas mainframe mediante el uso de dashboards e interfaces compartibles para facilitar el análisis de incidencias entre plataformas.


z/IRIS envía telemetría (trazas (traces) y métricas) desde transacciones y aplicaciones que se ejecutan en mainframes IBM System Z a Datadog. 

 Una vez activado:

 * El Datadog [Mapa de servicios][24] muestra la integración con servicios z/OS como CICS, MQ y Db2.
 * La tasa de llamadas, la tasa de errores y la latencia son indicadores de rendimiento habilitados para servicios de mainframe.
 * Los gráficos de llama y las listas de tramos (spans) visualizan el flujo de solicitudes hacia las aplicaciones mainframe.
 * Las páginas de trazas contienen mensajes de error de los sistemas z/OS cuando procede.


La telemetría de z/IRIS mejora la experiencia del desarrollador y de las operaciones al ampliar su visibilidad de las operaciones internas del mainframe. Los usuarios de Datadog podrán:

* Activar dashboards de z/IRIS dashboards para monitor sistemas z/OS y el estado de la aplicación.
* Crear monitores para alertar a los equipos sobre infracciones de SLO en aplicaciones de mainframe.
* Analizar cómo contribuyen las aplicaciones de mainframe al tiempo de respuesta total y a la disponibilidad general.
* Examinar cómo los cambios dentro y fuera del mainframe modifican el comportamiento y la estabilidad de las aplicaciones.
* Acceder a mensajes de error notificados desde aplicaciones de mainframe que afectan a la experiencia del usuario final.

### Métodos de integración

z/IRIS se integra con Datadog de dos maneras:

* **OpenTelemetry (OTEL)**: Este marco de observabilidad estandariza integraciones de APM y es totalmente compatible con Datadog. z/IRIS transmite trazas (traces) y métricas a un OpenTelemetry Collector que está configurado para exportar telemetría a tu entorno de Datadog.
* **API de Datadog (Beta)**: z/IRIS es capaz de transmitir trazas (traces) utilizando la API del Datadog Agent así como eventos utilizando la API HTTP REST de Datadog. Esta integración solo está disponible para pruebas y proyectos de prueba de concepto (POC) para reducir el esfuerzo administrativo mientras se evalúa z/IRIS y no es ideal para casos de uso de producción. 

Para obtener información más detallada sobre las posibilidades de integración de z/IRIS, consulta la [documentación de z/IRIS][3].

### Rastreo distribuido

Un tramo (span) representa una unidad de trabajo o proceso. Los tramos (spans) son los bloques de creación para las trazas (traces) distribuidas que representan cuando se activa una solicitud y cómo las solicitudes fluyeron a través de aplicaciones y servicios.

z/IRIS amplía trazas (traces) en Datadog con tramos (spans) que representan procesos y transacciones de aplicaciones de mainframe IBM Z. La ampliación de trazas (traces) proporciona a los usuarios nuevos conocimientos sobre la manera en que las aplicaciones de la nube y del servidor consumen servicios en mainframe. Los indicadores de rendimiento, como la tasa de errores, la tasa de llamadas y la latencia de las solicitudes, para aplicaciones basadas en mainframe están habilitados para que pueda identificar el estado de la integración del mainframe.

#### Tramos (spans)

z/IRIS crea tramos (spans) para transacciones y operaciones procesadas en los siguientes sistemas del mainframe:

* [Db2 para z/OS][4]
* [z/OS Connect][5]
* [IBM MQ para z/OS][7]
* [Servidor de transacciones CICS (es decir, CICS TS)][8]
* [Trabajos por lotes][6]
* [Actividad de los usuarios de TSO][6]

Esta lista está en constante crecimiento. Ponte en contacto con [ziris@mainstorconcept.com][2] para solicitar información sobre soporte para aplicaciones o subsistemas z/OS no incluidos en la lista anterior.

#### Rastreo del flujo de trabajo

z/IRIS es capaz de identificar cuándo las operaciones en el mainframe se activaron mediante una solicitud de aplicación externa y se asegurará de que los tramos (spans) generados se añadan a la traza (trace) de la solicitud de aplicación. Por ejemplo, una aplicación de nube envía una solicitud a una aplicación de mainframe para el procesamiento, z/IRIS detectará que el procesamiento de la solicitud de mainframe está relacionado con una solicitud externa y se asegurará de que el tramo (span) de la aplicación de mainframe se añada a la traza para la solicitud de la aplicación de nube.

z/IRIS Workflow rastrea los siguientes flujos de trabajo de solicitudes mediante el rastreo de:

* Solicitud API REST API -> z/OS Connect EE -> SOR (CICS TS, Db2 para z/OS, IMS o IBM MQ) -> Db2 para z/OS 
* JDBC -> Db2 para z/OS
* IBM MQ (Linux, Windows, AIX) -> IBM MQ para z/OS -> CICS TS -> Db2 para z/OS 
* CICS TS -> Db2 para z/OS


#### Etiquetas (tags)

Los metadatos sobre la solicitud, su utilización de recursos y el sistema z/OS relevante se proporcionan a través de etiquetas (tags) que puedes utilizar para realizar consultas en el [Trace Explorer][9] y esta información es procesada por [Watchdog Insights][10] para alertar a los usuarios sobre anomalías detectado en servicios de mainframe.

A continuación se muestra un lista completo de todas las etiquetas (tags) creadas con z/IRIS.

| Nombre de etiqueta (tag) de traza (trace)                                    | Descripción                                   |
|---------------------------------------------------|-----------------------------------------------|
| db.db2.collection.id                              | ID de la colección Db2                             |
| db.db2.instance_name                              | Nombre de instancia Db2                             |
| db.system                                         | Sistema DB                                     |
| db.user                                           | Usuario DB                                       |
| enduser.id                                        | ID de usuario final                                   |
| host.arch                                         | Arquitectura de host                             |
| host.name                                         | Nombre del host                                     |
| http.client_ip                                    | IP de cliente HTTP ip                                |
| http.method                                       | Método HTTP                                   |
| http.request_content_length                       | Longitud del contenido de la solicitud HTTP                   |
| http.response_content_length                      | Longitud del contenido de la respuesta HTTP                  |
| http.status_code                                  | Código de estado HTTP                              |
| ibm-mq.manager                                    | Gestor IBM MQ                                |
| ibm.machine.logical_partition                     | Partición lógica de máquina IBM                 |
| ibm.machine.model                                 | Modelo de máquina IBM                             |
| ibm.machine.type                                  | Tipo de máquina IBM                              |
| messaging.conversation_id                         | ID de conversación de mensajería                     |
| messaging.destination                             | Destino de la mensajería                         |
| messaging.destination_kind                        | Tipo de destino de la mensajería                    |
| messaging.system                                  | Sistema de mensajería                              |
| net.peer.ip                                       | IP de pares de red                                   |
| net.peer.port                                     | Puerto de par de red                                 |
| net.sock.peer.addr                                | Dirección de net sock peer                            |
| net.sock.peer.cipher                              | Cifrado de net sock peer                          |
| net.sock.peer.port                                | Puerto de net sock peer                            |
| os.type                                           | Tipo de sistema operativo                                       |
| ziris.job.identifier                              | Identificador de trabajo z/OS                           |
| zos.cf.calls                                      | Llamadas CF                                      |
| zos.cf.elapsed.time_ms                            | Tiempo transcurrido CF                               |
| zos.cics.application.name                         | Nombre de la aplicación CICS                         |
| zos.cics.application.operation                    | Funcionamiento de la aplicación CICS                    |
| zos.cics.application.platform_name                | Nombre de la plataforma de aplicación CICS                |
| zos.cics.application.version                      | Versión de la aplicación CICS                      |
| zos.cics.atom_service_name                        | Nombre del servicio CICS ATOM                        |
| zos.cics.bts.activity.id                          | ID de actividad CICS BTS                          |
| zos.cics.bts.activity.name                        | Nombre de la actividad CICS BTS                        |
| zos.cics.bts.process.id                           | ID del proceso de CICS BTS                           |
| zos.cics.bts.process.name                         | Nombre del proceso de CICS BTS                         |
| zos.cics.bts.process.type                         | Tipo de proceso de CICS BTS                         |
| zos.cics.connection.access_type                   | Tipo de acceso a la conexión CICS                   |
| zos.cics.connection.name                          | Nombre de la conexión CICS                          |
| zos.cics.connection.type                          | Tipo de conexión CICS                          |
| zos.cics.ipconn_name                              | Nombre conexión IP de CICS                              |
| zos.cics.net.peer.name                            | Nombre del par de red CICS                            |
| zos.cics.nodejs_application_name                  | Nombre de la aplicación CICS Node.js                  |
| zos.cics.pipeline_name                            | Nombre del canal CICS                            |
| zos.cics.region_name                              | Nombre de la región CICS                              |
| zos.cics.session.id                               | ID de sesión CICS                               |
| zos.cics.session.type                             | Tipo de sesión CICS                             |
| zos.cics.tcpipservice.name                        | Nombre de servicio de CICS TCP/IP                      |
| zos.cics.tcpipservice.origin.client.ip            | IP del cliente de origen del servicio CICS TCP/IP          |
| zos.cics.tcpipservice.origin.client.port          | Servicio puerto de cliente de origen CICS TCP/IP        |
| zos.cics.tcpipservice.origin.name                 | Nombre de origen de servicio CICS TCP/IP               |
| zos.cics.tcpipservice.origin.port                 | Puerto de origen del servicio CICS TCP/IP servicio puerto de origen               |
| zos.cics.tcpipservice.port                        | Puerto de servicio CICS TCP/IP                      |
| zos.cics.transaction.api.requests                 | Solicitudes de API de transacciones CICS                 |
| zos.cics.transaction.auth.time_ms                 | Tiempo de autentificación de la transacción CICS                    |
| zos.cics.transaction.class                        | Clase de transacción CICS                        |
| zos.cics.transaction.cpu.time_ms                  | Tiempo de CPU de transacción CICS                     |
| zos.cics.transaction.exception.wait.time_ms       | Tiempo de espera de excepción de transacción CICS          |
| zos.cics.transaction.gpu.time_ms                  | Tiempo GPU de transacción CICS                     |
| zos.cics.transaction.group_id                     | ID de grupo de transacciones CICS                     |
| zos.cics.transaction.id                           | ID de transacción CICS                           |
| zos.cics.transaction.jvm.elapsed.time_ms          | Tiempo transcurrido JVM de transacción CICS             |
| zos.cics.transaction.jvm.init.time_ms             | Tiempo de inicio de JVM de transacción CICS                |
| zos.cics.transaction.jvm.wait.time_ms             | Tiempo de espera JVM de transacción CICS                |
| zos.cics.transaction.number                       | Número de transacciones CICS                       |
| zos.cics.transaction.origin.adapter.data1         | Datos1 del adaptador de origen de transacción CICS         |
| zos.cics.transaction.origin.adapter.data2         | Datos2 del adaptador de origen de transacción CICS         |
| zos.cics.transaction.origin.adapter.data3         | Datos3 del adaptador de origen de transacción CICS         |
| zos.cics.transaction.origin.adapter.product       | Producto adaptador de origen de transacciones CICS       |
| zos.cics.transaction.origin.application.id        | Id de aplicación de origen de transacción CICS        |
| zos.cics.transaction.origin.id                    | Id de origen de la transacción CICS                    |
| zos.cics.transaction.origin.network.id            | ID de red de origen de la transacción CICS            |
| zos.cics.transaction.origin.number                | Número de origen de la transacción CICS                |
| zos.cics.transaction.origin.user_id               | ID de usuario de origen de la transacción CICS               |
| zos.cics.transaction.priority                     | Prioridad de transacción CICS                     |
| zos.cics.transaction.program.name                 | Nombre del programa de transacción CICS                 |
| zos.cics.transaction.program.return_code_current  | Código de retorno actual del programa de transacción CICS  |
| zos.cics.transaction.program.return_code_original | Código de retorno original del programa de transacción CICS |
| zos.cics.transaction.remote.task.requests         | Solicitudes de tareas remotas de transacciones CICS         |
| zos.cics.transaction.rmi.elapsed.time_ms          | Tiempo transcurrido de la transacción RMI de CICS             |
| zos.cics.transaction.rmi.wait.time_ms             | Tiempo de espera RMI de transacción CICS                |
| zos.cics.transaction.routed.host.name             | Nombre del host enrutado de transacción CICS             |
| zos.cics.transaction.start_type                   | Tipo de inicio de transacción CICS                   |
| zos.cics.transaction.tcb.attachments              | Anexos TCB de transacciones CICS              |
| zos.cics.transaction.tcb.cpu.time_ms              | Tiempo de CPU TCB de transacción CICS                 |
| zos.cics.transaction.tcb.elapsed.time_ms          | Tiempo transcurrido TCB de transacción CICS             |
| zos.cics.transaction.tcb.wait.time_ms             | Tiempo de espera TCB de transacción CICS                |
| zos.cics.transaction.user_id                      | ID de usuario de transacción CICS                      |
| zos.cics.transaction.wait.time_ms                 | Tiempo de espera de transacción CICS                    |
| zos.cics.transaction.ziip.time_ms                 | Tiempo ZIIP de transacción CICS                    |
| zos.cics.urimap.name                              | Nombre urimap CICS                              |
| zos.cics.urimap.program_name                      | Nombre del programa urimap CICS                      |
| zos.cics.webservice.name                          | Nombre de servicio web CICS                         |
| zos.cics.webservice.operation_name                | Nombre de la operación del servicio web CICS               |
| zos.connect.api.name                              | Nombre de la API de z/OS Connect                      |
| zos.connect.api.version                           | Versión de API de z/OS Connect                   |
| zos.connect.request.id                            | Solicitar ID                                    |
| zos.connect.request.timed_out                     | Solicitar tiempo de inactividad                              |
| zos.connect.request.user_name                     | Solicitar nombre de usuario                             |
| zos.connect.service.name                          | Nombre del servicio                                  |
| zos.connect.service.version                       | Versión del servicio                               |
| zos.connect.service_provider.name                 | Nombre del proveedor del servicio                         |
| zos.connect.sor.identifier                        | Identificador SOR                                |
| zos.connect.sor.reference                         | Referencia SOR                                 |
| zos.connect.sor.request.received_time             | Solicitud SOR recibida                          |
| zos.connect.sor.request.sent_time                 | Hora de envío de la solicitud SOR                         |
| zos.connect.sor.resource                          | Recurso SOR                                  |
| zos.correlation.id                                | ID de correlación z/OS                           |
| zos.cpu.time_ms                                   | Tiempo de CPU de z/OS                                 |
| zos.db2.abort.requests                            | Solicitud de interrupción de Db2                             |
| zos.db2.ace                                       | Db2 ACE                                       |
| zos.db2.client.application.name                   | Nombre de la aplicación cliente Db2                   |
| zos.db2.client.auth.id                            | ID de autentificación del cliente Db2                            |
| zos.db2.client.platform                           | Plataforma cliente Db2                           |
| zos.db2.connection.id                             | ID de conexión Db2                             |
| zos.db2.consistency.token                         | Token de consistencia Db2                         |
| zos.db2.cpu.time_ms                               | Tiempo CPU Db2                                  |
| zos.db2.deadlock.resources                        | Recursos de bloqueo de Db2                        |
| zos.db2.elapsed.time_ms                           | Tiempo transcurrido Db2                              |
| zos.db2.end.timestamp                             | Marca de tiempo de fin de Db2                             |
| zos.db2.location.name                             | Nombre de localización de Db2                             |
| zos.db2.lock.duration                             | Duración del bloqueo Db2                             |
| zos.db2.lock.request                              | Solicitud de bloqueo Db2                              |
| zos.db2.lock.state                                | Estado de bloqueo Db2                                |
| zos.db2.luw.id                                    | ID de LUW Db2                                    |
| zos.db2.plan.name                                 | Nombre del plan Db2                                 |
| zos.db2.product.id                                | ID de producto Db2                                |
| zos.db2.program.name                              | Nombre del programa Db2                              |
| zos.db2.received.bytes                            | Bytes recibidos Db2                            |
| zos.db2.remote.location.name                      | Nombre de localización remoto Db2                      |
| zos.db2.response.time_ms                          | Tiempo de respuesta de Db2                             |
| zos.db2.sent.bytes                                | Db2 envió bytes                                |
| zos.db2.sql.lock.statements                       | Sentencia de bloqueo SQL Db2                        |
| zos.db2.sql.open.statements                       | Sentencia abierta SQL Db2                        |
| zos.db2.sql.prepare.statements                    | Sentencia preparada Db2 SQL                     |
| zos.db2.sql.storedprocedure.statements            | Procedimiento almacenado SQL Db2                      |
| zos.db2.start.timestamp                           | Hora de inicio de Db2                           |
| zos.db2.statement.id                              | ID de sentencia Db2                              |
| zos.db2.statement.type                            | Tipo de sentencia Db2                            |
| zos.db2.su.factor                                 | Db2 su factor                                 |
| zos.db2.thread.token                              | Token de hilo Db2                              |
| zos.db2.uniqueness.value                          | Valor de unicidad Db2                          |
| zos.db2.unlock.requests                           | Solicitud de desbloqueo Db2                            |
| zos.db2.version                                   | Versión Db2                                   |
| zos.db2.wait.time_ms                              | Tiempo de espera Db2                                 |
| zos.db2.workload.service.class.name               | Nombre de clase de servicio de carga de trabajo Db2               |
| zos.db2.ziip.time_ms                              | Tiempo ZIIP Db2                                 |
| zos.jes.job.correlator                            | Correlacionador de empleos JES                            |
| zos.job.class                                     | Clase de trabajo z/OS                                |
| zos.job.step.cpu.time_ms                          | Tiempo de CPU por paso de trabajo de z/OS                        |
| zos.job.step.cpu.units                            | CPU escalonadas z/OS                           |
| zos.job.step.ended                                | Paso de trabajo z/OS finalizado                           |
| zos.job.step.name                                 | Nombre del paso de trabajo de z/OS                            |
| zos.job.step.number                               | Número de paso de trabajo de z/OS                          |
| zos.job.step.program_name                         | Nombre del programa de pasos de trabajo de z/OS                    |
| zos.job.step.return_code                          | Código de retorno de paso de trabajo z/OS                     |
| zos.job.step.ziip.time_ms                         | Tiempo ZIIP de paso de trabajo z/OS                       |
| zos.lu.name                                       | Nombre de z/OS LU                                  |
| zos.mq.accounting_token                           | Token de contabilidad MQ                           |
| zos.mq.buffer_pool                                | Grupo de buffer MQ                                |
| zos.mq.calls                                      | Llamadas MQ                                      |
| zos.mq.cf_structure                               | Estructura MQ CF                               |
| zos.mq.channel.connection_name                    | Nombre de la conexión del canal MQ                    |
| zos.mq.channel.name                               | Nombre del canal MQ                               |
| zos.mq.connection.auth_id                         | ID de autenticación de conexión MQ                         |
| zos.mq.connection.name                            | Nombre de la conexión MQ                            |
| zos.mq.connection.type                            | Tipo de conexión MQ                            |
| zos.mq.connection.user_id                         | ID de usuario de conexión MQ                         |
| zos.mq.context_token                              | Token de contexto MQ                              |
| zos.mq.correlation_id                             | ID de correlación MQ                             |
| zos.mq.luw_id                                     | ID de LUW MQ                                     |
| zos.mq.messages                                   | Mensajes MQ                                   |
| zos.mq.mqcb.calls                                 | Llamadas MQ MQCb                                 |
| zos.mq.mqcb.cpu.time_ms                           | Tiempo de CPU de MQCb MQ                              |
| zos.mq.mqcb.elapsed.time_ms                       | Tiempo transcurrido de MQCb MQ                          |
| zos.mq.mqclose.calls                              | Llamadas MQClose MQ                              |
| zos.mq.mqclose.cpu.time_ms                        | Tiempo de CPU MQClose MQ                           |
| zos.mq.mqclose.elapsed.time_ms                    | Tiempo transcurrido MQClose MQ                       |
| zos.mq.mqclose.suspended.calls                    | Llamadas suspendidas MQClose MQ                    |
| zos.mq.mqclose.wait.time_ms                       | Tiempo de espera MQClose MQ                          |
| zos.mq.mqget.browse.specific.calls                | Navegar por llamadas específicas MQGet MQ                |
| zos.mq.mqget.browse.unspecific.calls              | Examinar llamadas inespecíficas MQGet MQ              |
| zos.mq.mqget.calls                                | Llamadas MQGet MQ                                |
| zos.mq.mqget.cpu.time_ms                          | Tiempo de CPU MQGet MQ                             |
| zos.mq.mqget.destructive.specific.calls           | Llamadas específicas destructivas MQGet MQ           |
| zos.mq.mqget.destructive.unspecific.calls         | Llamadas destructivas inespecíficas MQGet MQ         |
| zos.mq.mqget.elapsed.time_ms                      | Tiempo transcurrido MQGet MQ                         |
| zos.mq.mqget.errors                               | Errores MQ MQGet                               |
| zos.mq.mqget.expired.messages                     | Mmensajes caducados MQGet MQ                     |
| zos.mq.mqget.log.forced.wait.time_ms              | Tiempo de espera forzado de logs MQGet MQ                 |
| zos.mq.mqget.log.forced.writes                    | MQ MQGet log forced writes                    |
| zos.mq.mqget.log.wait.time_ms                     | Tiempo de espera de logs de MQGet MQ                        |
| zos.mq.mqget.log.writes                           | Escritura de logs MQGet MQ                           |
| zos.mq.mqget.message.max.size_bytes               | Tamaño máximo del mensaje MQGet MQ                     |
| zos.mq.mqget.messages.min.size_bytes              | MQ Tamaño mínimo del mensaje MQGet                     |
| zos.mq.mqget.pageset.reads                        | Lecturas de conjunto de páginas MQGet MQ                        |
| zos.mq.mqget.pageset.wait.time_ms                 | Tiempo de espera de conjunto de páginas MQGet MQ                    |
| zos.mq.mqget.persistent.messages                  | Mensajes persistentes MQGet MQ                  |
| zos.mq.mqget.skipped.messages                     | Mensajes omitidos MQGet MQ                     |
| zos.mq.mqget.skipped.pages                        | Páginas omitidas MQGet MQ                        |
| zos.mq.mqget.successful_calls                     | Llamadas con éxito MQGet MQ                     |
| zos.mq.mqget.suspended.calls                      | Llamadas suspendidas MQGet MQ                      |
| zos.mq.mqget.wait.time_ms                         | MQ Tiempo de espera MQGet                            |
| zos.mq.mqinq.calls                                | MQ Llamadas MQInq                                |
| zos.mq.mqinq.cpu.time_ms                          | Tiempo de CPU MQinq MQ                             |
| zos.mq.mqinq.elapsed.time_ms                      | Tiempo transcurrido MQInq MQ                         |
| zos.mq.mqopen.calls                               | MQ Llamadas MQOpen                               |
| zos.mq.mqopen.cpu.time_ms                         | Tiempo de CPU MQOpen MQ                            |
| zos.mq.mqopen.elapsed.time_ms                     | Tiempo transcurrido de MQ MQOpen                        |
| zos.mq.mqopen.suspended.calls                     | Llamadas suspendidas MQOpen MQ                     |
| zos.mq.mqopen.wait.time_ms                        | Tiempo de espera MQ MQOpen                           |
| zos.mq.mqput.calls                                | MQ Llamadas MQPut                                |
| zos.mq.mqput.cpu.time_ms                          | Tiempo CPU MQPut MQ                             |
| zos.mq.mqput.elapsed.time_ms                      | Tiempo transcurrido MQPut MQ                         |
| zos.mq.mqput.loguear.forced.wait.time_ms              | Tiempo de espera forzado de logs MQ MQPut                 |
| zos.mq.mqput.loguear.forced.writes                    | Escrituras forzadas de logs MQPut MQ                    |
| zos.mq.mqput.log.wait.time_ms                     | Tiempo de espera de log MQPut MQ                        |
| zos.mq.mqput.log.writes                           | Escrituras de logs MQPut MQ                           |
| zos.mq.mqput.message.max.size_bytes               | Tamaño máximo del mensaje MQPut MQ                     |
| zos.mq.mqput.message.min.size_bytes               | Tamaño mínimo de mensaje MQPut MQ                     |
| zos.mq.mqput.pageset.elapsed.time_ms              | Tiempo transcurrido de conjunto de páginas MQPut MQ                 |
| zos.mq.mqput.pageset.writes                       | Escrituras de conjunto de páginas MQPut MQ                       |
| zos.mq.mqput.suspended.calls                      | Llamadas suspendidas MQPut MQ                      |
| zos.mq.mqput.wait.time_ms                         | MQ Tiempo de espera MQPut                            |
| zos.mq.mqput1.calls                               | Llamadas MQ MQPut1                               |
| zos.mq.mqput1.cpu.time_ms                         | Tiempo de CPU MQPut1                            |
| zos.mq.mqput1.elapsed.time_ms                     | Tiempo transcurrido MQ MQPut1                        |
| zos.mq.mqput1.loguear.forced.wait.time_ms             | Tiempo de espera forzado de logs MQ MQPut1                |
| zos.mq.mqput1.loguear.forced.writes                   | Escrituras forzadas de logs MQPut1 MQ                   |
| zos.mq.mqput1.log.wait.time_ms                    | Tiempo de espera de logs de MQPut1 MQ                       |
| zos.mq.mqput1.log.writes                          | Escritura de logs MQPut1 MQ                          |
| zos.mq.mqput1.pageset.wait.time_ms                | Tiempo de espera del conjunto de páginas MQ MQPut1                   |
| zos.mq.mqput1.pageset.writes                      | Escritura de conjunto de páginas MQPu1 MQ                      |
| zos.mq.mqput1.suspended.calls                     | Llamadas suspendidas MQPut1 MQ                     |
| zos.mq.mqput1.wait.time_ms                        | Tiempo de espera MQ MQPut1                           |
| zos.mq.mqset.calls                                | MQ Llamadas MQSet                                |
| zos.mq.mqset.cpu.time_ms                          | Tiempo de CPU MQSet MQ                             |
| zos.mq.mqset.elapsed.time_ms                      | Tiempo transcurrido MQset MQ                         |
| zos.mq.mqset.log.forced.wait.time_ms              | Tiempo de espera forzado de logs de MQSet MQ                 |
| zos.mq.mqset.log.forced.writes                    | Escrituras forzadas de logs MQ MQSet                    |
| zos.mq.mqset.log.wait.time_ms                     | Tiempo de espera de logs MQSet MQ                        |
| zos.mq.mqset.log.writes                           | Escritura de logs MQSet MQ                           |
| zos.mq.mqsub.selection.calls                      | MQ Llamadas de selección MQSub                      |
| zos.mq.pageset                                    | Conjunto de páginas MQ                                    |
| zos.mq.put.delayed_messages                       | MQ Poner mensajes retrasados                       |
| zos.mq.put.errors                                 | Errores MQ Put                                 |
| zos.mq.put.successful_calls                       | MQ Put llamadas con éxito                       |
| zos.mq.qsg_type                                   | Tipo MQ QSG                                   |
| zos.mq.queue.index_type                           | Tipo de índice de cola MQ                           |
| zos.mq.queue.max_depth                            | Profundidad máxima de la cola MQ                            |
| zos.mq.topic.mqclose.srb.cpu.time_ms              | Tiempo de CPU MQ tópico MQClose SRB                 |
| zos.mq.topic.mqopen.srb.cpu.time_ms               | Tiempo de CPU MQ tópico MQOpen SRB                  |
| zos.mq.topic.mqput.srb.cpu.time_ms                | Tiempo de CPU MQ tópico MQPut SRB                   |
| zos.mq.topic.mqput1.srb.cpu.time_ms               | Tiempo de CPU MQ tópico MQPut1 SRB                  |
| zos.mq.topic.published_messages                   | Mensajes publicados en MQ Topic                   |
| zos.network.id                                    | ID de red z/OS                               |
| zos.racf.group.id                                 | ID de grupo z/OS RACF                            |
| zos.subsystem.name                                | Nombre del subsistema z/OS                           |
| zos.tape.mounts                                   | Montajes de cinta z/OS                              |
| zos.uow                                           | z/OS UOW                                      |
| zos.user.id                                       | ID de usuario z/OS                                  |
| zos.user.name                                     | Nombre de usuario de z/OS                                |
| zos.vtam.application.id                           | Id de aplicación VTAM                           |
| zos.wlm.report.class.name                         | Nombre de la clase de informe WLM                         |
| zos.wlm.service.class.name                        | Servicio nombre de la clase WLM                        |
| zos.ziip.time_ms                                  | Tiempo de ZIIP de z/OS                                |


### Métricas de mainframe métricas

* [Métricas de la infraestructura][11] 
    * Monitoriza la utilización de recursos en el sistema z/OS. Las métricas de la infraestructura admiten la utilización y contención de CPU (como procesadores generales y motores zIIP).

* [Métricas de z/OS Connect][12]
    * Monitoriza la actividad y el rendimiento de los servidores z/OS Connect, incluidas las solicitudes entrantes, los códigos de retorno, los métodos de solicitud, la latencia del servidor y la latencia del proveedor de servicios (como SOR). 

* [MQ métricas][13]
    * Monitoriza la actividad de los gestores de colas MQ en z/OS y el estado de sus recursos (como almacenamiento, grupos buffer, logs y canales).

¿Esta no es el métrica que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una solicitud de función a [ziris@mainstorconcept.com][2].

### La empresa privada ofrece

* Correo electrónico: [mainstorconcept GmbH][2]
* Tel: +49 721 7907610

### Licencias

Tras iniciar tu periodo de prueba, te proporcionaremos tu licencia de prueba de z/IRIS por correo electrónico en un plazo de 24 horas.

### Validación

Comprueba que los componentes pertinentes estén disponibles y cumplan los [requisitos mínimos][14].

## Configuración

Para soporte o solicitudes de funciones, ponte en contacto con z/IRIS a través de los siguientes canales:

- Correo electrónico a [support@mainstorconcept.com][20] o [ziris@mainstorconcept.com](mailto:ziris@mainstorconcept.com) para una demostración o para preguntas sobre las capacidades de z/IRIS con Datadog
- Soporte: [Portal Mainstorconcept][21]

### Leer más

Más enlaces, artículos y documentación útiles:

- [Monitoriza el rendimiento de mainframe con la oferta de mainstorconcept en Datadog Marketplace][22]

[1]: https://www.mainstorconcept.com/z-iris-mainframe-observability/z-iris-datadog/?lang=en
[2]: mailto:ziris@mainstorconcept.com
[3]: https://public.mainstorconcept.com/home/observability-with-datadog
[4]: https://public.mainstorconcept.com/home/distributed-db2-for-z-os-observability
[5]: https://public.mainstorconcept.com/home/z-os-connect-observability
[6]: https://public.mainstorconcept.com/home/z-os-work-observability
[7]: https://public.mainstorconcept.com/home/ibm-mq-for-z-os-observability
[8]: https://public.mainstorconcept.com/home/cics-transaction-observability
[9]: https://docs.datadoghq.com/es/tracing/trace_explorer/
[10]: https://docs.datadoghq.com/es/watchdog/
[11]: https://public.mainstorconcept.com/home/rmf-metrics-streaming
[12]: https://public.mainstorconcept.com/home/z-os-connect-metrics-streaming
[13]: https://public.mainstorconcept.com/home/mq-metrics-streaming
[14]: https://public.mainstorconcept.com/home/troubleshooting-opentelemetry-integration
[15]: https://public.mainstorconcept.com/home/irontap-image
[16]: https://public.mainstorconcept.com/home/configure-irontap-container 
[17]: https://public.mainstorconcept.com/home/install-z-iris-clients
[18]: https://public.mainstorconcept.com/home/configure-z-iris-clients
[19]: https://public.mainstorconcept.com/home/z-iris-client-started-task
[20]: mailto:support@mainstorconcept.com
[21]: https://service.mainstorconcept.com/mscportal/login
[22]: https://www.datadoghq.com/blog/mainframe-monitoring-mainstorconcept-datadog-marketplace/
[23]: https://docs.datadoghq.com/es/watchdog/
[24]: https://docs.datadoghq.com/es/tracing/services/services_map/

---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/mainstorconcept-ziris" target="_blank">Haz clic aquí</a> para comprar esta aplicación.