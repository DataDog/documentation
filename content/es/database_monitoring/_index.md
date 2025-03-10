---
algolia:
  tags:
  - monitorización de base de datos
  - dbm
cascade:
  algolia:
    rank: 70
description: Más información sobre la monitorización de base de datos y cómo empezar
further_reading:
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: Blog
  text: Monitorizar y visualizar el rendimiento de las bases de datos
- link: https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/
  tag: Blog
  text: Monitorizar bases de datos gestionadas por SQL Server y Azure con Datadog
    DBM
- link: https://www.datadoghq.com/blog/mongodb-database-monitoring/
  tag: Blog
  text: Seguimiento y resolución de problemas de rendimiento de MongoDB
- link: /database_monitoring/data_collected/
  tag: Documentación
  text: Datos recopilados
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Solucionar problemas
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participar en una sesión interactiva para mejorar tu monitorización de base
    de datos
- link: https://www.datadoghq.com/blog/mongodb-database-monitoring/
  tag: Blog
  text: Seguimiento y resolución de problemas de rendimiento de MongoDB con la Monitorización
    de bases de datos de Datadog
title: Database Monitoring
---


{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Database">}}
  Con la monitorización de base de datos, aprende cuán rápido puedes identificar consultas lentas y costosas. Obtén detalles de ejecución precisos para abordar cuellos de botellas.
{{< /learning-center-callout >}}

La monitorización de la base de datos de Datadog ofrece una gran visibilidad de las bases de datos en todos tus hosts. Consulta las métricas de rendimiento de consultas históricas, planes de explicación y métricas a nivel de host todo en un solo lugar, para comprender el estado y el rendimiento de tus bases de datos y solucionar los problemas a medida que surgen.

## Para empezar

La Monitorización de bases de datos de Datadog es compatible con versiones autoalojadas y gestionadas en la nube de **Postgres**, **MySQL**, **Oracle**, **SQL Server**, **MongoDB** y **Amazon DocumentDB**. Para empezar a utilizar la Monitorización de bases de datos de Datadog, configura tu base de datos e instala el Datadog Agent. Para obtener instrucciones de configuración, selecciona tu tecnología de base de datos:

### Postgres

{{< partial name="dbm/dbm-setup-postgres" >}}
<p></p>

### MySQL

{{< partial name="dbm/dbm-setup-mysql" >}}
<p></p>

### Oracle

{{< partial name="dbm/dbm-setup-oracle" >}}
<p></p>

### SQL Server

{{< partial name="dbm/dbm-setup-sql-server" >}}
<p></p>

### MongoDB

{{< partial name="dbm/dbm-setup-mongodb" >}}
<p></p>

### Amazon DocumentDB

{{< partial name="dbm/dbm-setup-documentdb" >}}
<p></p>

## Explorar la monitorización de base de datos de Datadog

Ve a [Monitorización de base de datos][1] en Datadog.

### Analizar las métricas de rendimiento de las consultas

La [vista de Métricas de consulta][2] muestra el rendimiento histórico de las consultas normalizadas. Visualiza las tendencias de rendimiento por infraestructura o etiquetas personalizadas, como la zona de disponibilidad del centro de datos, y establece alertas para anomalías.

- Identifica las consultas lentas y las que consumen más tiempo.
- Muestra métricas a nivel de base de datos no capturadas por APM como filas actualizadas/retornadas.
- Filtra y agrupa las consultas por dimensiones arbitrarias como equipo, usuario, clúster y host.

{{< img src="database_monitoring/dbm-query-metrics-2.png" alt="Monitorización de base de datos" style="width:100%;">}}

### Explorar ejemplos de consultas

La [Vista de muestras de consultas][3] te ayuda a comprender qué consultas se están ejecutando en un momento dado. Compara cada ejecución con el rendimiento medio de la consulta y las consultas relacionadas.

- Identifica las consultas inusualmente lentas pero poco frecuentes no capturadas por métricas.
- Encuentra outliers en el tiempo de ejecución o el coste de ejecución de una consulta.
- Atribuye una ejecución de consulta específica a un usuario, aplicación o host de cliente.

{{< img src="database_monitoring/dbm-query-sample-2.png" alt="Monitorización de base de datos" style="width:100%;">}}

### Comprender antes de ejecutar

[Los planes de explicación][4] ayudan a comprender cómo la base de datos planea ejecutar tus consultas.

- Repasa cada operación para identificar los cuellos de botella.
- Mejora la eficacia de las consultas y ahorra escaneos secuenciales costosos en tablas de gran tamaño.
- Ve cómo cambia el plan de una consulta a lo largo del tiempo.

{{< img src="database_monitoring/dbm-explain-plan-3.png" alt="Monitorización de base de datos" style="width:100%;">}}

### Visualizar todo en dashboards mejorados

Localiza rápidamente las áreas problemáticas mediante la visualización conjunta de la base de datos y las métricas del sistema en dashboards de integración mejorados, tanto para instancias autogestionadas como gestionadas en la nube. Clona dashboards para personalizarlos y mejorarlos con tus propias métricas personalizadas. Haz clic en el enlace **Dashboards** en la parte superior de las páginas Métricas de consulta y Muestras de consulta para ir a dashboards de monitorización de base de datos.

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Monitorización de base de datos" style="width:100%;">}}

### Optimizar el estado y el rendimiento del host

En la [página Bases de datos][1], puedes evaluar el estado y la actividad de tus hosts de base de datos. Ordena y filtra la lista para establecer prioridades de hosts con alertas activadas, alto volumen de consultas y otros criterios. Haz clic en un host individual para ver detalles como su configuración, las consultas de bloqueo comunes y las llamadas a servicios. Consulta [Exploración de hosts de bases de datos][5] para más detalles.

{{< img src="database_monitoring/databases-list.png" alt="La página de base de datos en Datadog" style="width:90%;" >}}

### Ver recomendaciones de optimización

La página [Recomendaciones][6] destaca los problemas y las oportunidades de optimización para ayudarte a ahorrar tiempo priorizando lo más importante. Selecciona una recomendación para ver los detalles, incluyendo un resumen del problema, así como los posibles pasos siguientes para solucionarlo.

{{< img src="database_monitoring/recommendations-page.png" alt="Página Recomendaciones en Datadog" style="width:90%;" >}}


## Para leer más

{{< learning-center-callout header="Try Monitoring a Postgres Database with Datadog DBM in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/database-monitoring">}}
  El Centro de aprendizaje de Datadog está lleno de cursos prácticos para ayudarte a aprender sobre este tema. Inscríbete sin coste para identificar ineficiencias y optimizar tu base de datos de Postgres.
{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /es/database_monitoring/query_metrics/
[3]: /es/database_monitoring/query_samples/
[4]: /es/database_monitoring/query_metrics/#explain-plans
[5]: /es/database_monitoring/database_hosts/
[6]: /es/database_monitoring/recommendations/