---
algolia:
  subcategory: Integraciones de Marketplace
app_id: itunified-ug-dbxplorer
app_uuid: 1349589a-6fc1-4ddd-99c7-7b23ba82903a
assets:
  dashboards:
    dbXplorer - ASH Monitor: assets/dashboards/itunified_ug_dbxplorer_ash_monitor.json
    dbXplorer - DB Performance Health: assets/dashboards/itunified_ug_dbxplorer_db_health_performance.json
    dbXplorer - Oracle LMS: assets/dashboards/itunified_ug_dbxplorer_oracle_lms.json
    dbXplorer - Space Monitoring: assets/dashboards/itunified_ug_dbxplorer_space_monitoring.json
    dbXplorer - Status Summary: assets/dashboards/itunified_ug_dbxplorer_status_summary.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: dbxplorer.oracle.database.availability.status
      metadata_path: metadata.csv
      prefix: dbxplorer.oracle
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14507249
    source_type_name: itunified_ug_dbxplorer
  monitors:
    ASM diskgroup space is running low: assets/monitors/dbxplorer_space_prdictive_diskgroup_usage.json
    DB wait event higher than usual: assets/monitors/dbxplorer_db_health_anomaly_wait_events.json
    Database is unavailable: assets/monitors/dbxplorer_db_health_availability.json
    Database load higher than usual: assets/monitors/dbxplorer_db_health_anomaly_load.json
    Permanent tablespace usage predicted to be too high: assets/monitors/dbxplorer_space_predictive_tablespace_permanent.json
    Recovery area capacity is predicted to be too low: assets/monitors/dbxplorer_space_predictive_recovery_area.json
    SQL query CPU time higher than usual: assets/monitors/dbxplorer_ash_sql_id_cpu_time.json
    SQL query elapsed time higher than usual: assets/monitors/dbxplorer_ash_sql_id_elapsed_time.json
    SQL query elapsed time is longer than usual (1 week): assets/monitors/dbxplorer_ash_sql_id_1w.json
    SQL query elapsed time is longer than usual (4 hours): assets/monitors/dbxplorer_ash_sql_id_4h.json
    Temporary tablespace usage predicted to be too high: assets/monitors/dbxplorer_space_predictive_tablespace_temp.json
    Undo tablespace usage predicted to be too high: assets/monitors/dbxplorer_space_predictive_tablespace_undo.json
author:
  homepage: https://www.itunified.de
  name: ITUNIFIED UG
  sales_email: support.datadog@itunified.de
  support_email: support.datadog@itunified.de
  vendor_id: itunified
categories:
- marketplace
- nube
- oracle
- almacenamientos de datos
- métricas
- alerta
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: itunified_ug_dbxplorer
integration_id: itunified-ug-dbxplorer
integration_title: dbXplorer para Oracle DBMS
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: itunified_ug_dbxplorer
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.itunified_ug.itunified_ug_dbxplorer.dbxplorer.oracle.database.integration.status
  product_id: itunified-ug-dbxplorer
  short_description: Monitoriza tus clústeres, base de datos y sistemas de archivos
    de Oracle.
  tag: db_unique_name
  unit_label: Nombre único de la base de datos
  unit_price: 50.0
public_title: dbXplorer para Oracle DBMS
short_description: Monitorizar y analizar el mantenimiento y el rendimiento de la
  base de datos de Oracle
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Offering::Integration
  - Category::Marketplace
  - Category::Cloud
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Category::Oracle
  - Category::Data Stores
  - Category::Metrics
  - Category::Alerting
  configuration: README.md#Setup
  description: Monitorizar y analizar el mantenimiento y el rendimiento de la base
    de datos de Oracle
  media:
  - caption: dbXplorer - Monitorización de ASH
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
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/itunified-datadog-marketplace/
  support: README.md#Support
  title: dbXplorer para Oracle DBMS
  uninstallation: README.md#Uninstallation
---

<!--  CON ORIGEN EN https://github.com/DataDog/marketplace -->


## Información general

**dbXplorer** te permite monitorizar bases de datos de Oracle (19c o posterior), proporcionándote métricas de análisis y rendimiento en tiempo real disponibles en Datadog. Esta integración da una visibilidad profunda del mantenimiento y del rendimiento de tus instancias de la base de datos de Oracle. 

Con esta integración:
- Monitoriza de forma proactiva: Detecta posibles problemas con antelación mediante alertas en tiempo real sobre cuellos de botella en el rendimiento, actividades inusuales o fallos.
- Optimiza el rendimiento: Recopila información sobre el rendimiento de las bases de datos para ayudar a ajustar las consultas y los recursos, garantizando una utilización y unos tiempos de respuesta óptimos.
- Administración simplificada: Centraliza la monitorización de varias bases de datos de Oracle en una única plataforma, agilizando el proceso de administración y reduciendo la sobrecarga operativa.

Esta integración monitoriza los siguientes tipos de datos desde bases de datos de Oracle:
- Métricas de rendimiento: Incluye datos sobre los tiempos de respuesta de las consultas, el uso de la memoria (por ejemplo, estadísticas de PGA y SGA) y los cuellos de botella de los recursos. Estos datos ayudan a identificar problemas de rendimiento y a optimizar las operaciones de la base de datos.
- Métricas de mantenimiento: Rastrea los indicadores de mantenimiento críticos, como los tiempos de conexión, las sesiones de usuario y la disponibilidad del sistema, lo que permite intervenir a tiempo para evitar tiempos de inactividad.

**Acerca de ITUnified:** con más de dos décadas de experiencia, los profesionales del Administrador de bases de datos (DBA) certificado por Oracle (DBA) tienen las capacidades necesarias para manejar proyectos intrincados y apoyar a los clientes en la gestión y administración de sus bases de datos. ITUnified se especializa en soporte de bases de datos a medida y servicios a través de una evaluación detallada de las necesidades.

### Métricas

La integración de dbXplorer recopila 77 métricas en 8 categorías diferentes.

11 métricas basadas en la tabla interna de Oracle DBA_HIST_ACTIVE_SESS_HISTORY. Proporciona valores para consultas de SQL anteriores y repetidas. 

28 métricas basadas en la tabla interna de Oracle DBA_HIST_SQLSTAT que proporciona tiempos de espera de aplicación, CPU, lectura y escritura en disco, E/S y concurrencia para consultas SQL.

11 métricas basadas en la tabla interna V$OSSTAT de Oracle. Esta tabla contiene estadísticas de utilización del sistema operativo.

Dos métricas se recuperan de la tabla V$SESSION_EVENT y muestran información sobre las esperas de un evento por una sesión.

10 métricas se recuperan de la tabla v$system_event y muestran información sobre el total de esperas para un evento.

Una métrica contiene nombres de estadísticas. Los diferentes nombres de estadísticas se describen [aquí] [2].

5 métricas relacionados con el área de recuperación de bases de datos. 

8 métricas relacionados con el uso del espacio de tabla.

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

#### dbXplorer - Resumen de estado 
El dashboard de "dbXplorer - Resumen de estado" proporciona una visión concisa del estado y logs de las operaciones de la base de datos. Cuenta con "Logs de disponibilidad" que muestran eventos relacionados con la disponibilidad de la base de datos, ordenados por diversos parámetros, como la marca de tiempo y el nombre de la instancia. Otro widget, "Logs de dbXplorer", organiza los datos de logs de las transacciones de la base de datos en una vista resumida, agrupándolos por nombre de registrador y mostrando counts de logs por gravedad. El widget "Resumen de estados" ofrece una información general sobre los estados en un formato de lista y counts, priorizando la visualización de los datos en función de la gravedad de los problemas.

#### dbXplorer - Oracle LMS
El dashboard "dbXplorer - Oracle LMS" se centra en los servicios de administración de licencias (LMS) de Oracle y rastrea e informa sobre el uso de las funciones de la base de datos que son relevantes para la concesión de licencias. Presenta una visualización del count de CPU que ayuda a comprender la escala de las operaciones de la base de datos y las posibles necesidades de licencias. Además, el dashboard incluye estadísticas detalladas del uso de las funciones, que ejecuta consultas complejas para asignar las funciones de la base de datos a los productos, clasificando el uso en categorías como uso actual y pasado y gestionando las excepciones en los informes de funciones. Aunque este dashboard es una herramienta esencial para que los administradores de bases de datos garanticen el cumplimiento de los requisitos para el otorgamiento de licencias de Oracle, no debe confiarse exclusivamente en él con fines de otorgamiento de licencias.


### Requisitos previos

- Se admiten versiones de bases de datos de Oracle a partir de 19c EE que utilicen la infraestructura de Oracle Grid. No se admiten recopilaciones de versiones anteriores de bases de datos ni instalaciones serverless.

- Esta integración requiere una licencia de Oracle Diagnostic and Tuning Pack. Si no deseas utilizar este paquete ni obtener su licencia, asegúrate de desactivar la recopilación de métricas de ASH y AWR. En las instrucciones de configuración encontrarás una explicación sobre cómo recopilar o desactivar estas métricas.

## Compatibilidad
Para solicitar asistencia o funciones, ponte en contacto con [support.datadog@itunified.de][1].

### Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Optimiza el rendimiento de tus bases de datos de Oracle con la oferta de ITUnified en Datadog Marketplace][5].

[1]: mailto:support.datadog@itunified.de
[2]: https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/statistics-descriptions-2.html#GUID-2FBC1B7E-9123-41DD-8178-96176260A639
[3]: https://hub.docker.com/repository/docker/itunified/dbxagent/general
[4]: https://app.datadoghq.com/monitors/recommended?q=dbXplorer&only_installed=false&p=1
[5]: https://www.datadoghq.com/blog/itunified-datadog-marketplace/

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un asociado tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/itunified-ug-dbxplorer" target="_blank">adquiere esta aplicación en el Marketplace</a>.