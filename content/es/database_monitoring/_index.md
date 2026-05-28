---
algolia:
  tags:
  - database monitoring
  - dbm
cascade:
  algolia:
    rank: 70
description: Conozca DBM y comience
further_reading:
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: Blog
  text: Analizando la latencia de consulta de ida y vuelta
- link: https://www.datadoghq.com/blog/database-monitoring-recommendations/
  tag: Blog
  text: Mejore el rendimiento del servidor de la base de datos y de las consultas
    con las recomendaciones de DBM
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: Blog
  text: Supervise y visualice el rendimiento de la base de datos
- link: https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/
  tag: Blog
  text: Supervise SQL Server y bases de datos administradas de Azure con Datadog DBM
- link: https://www.datadoghq.com/blog/mongodb-database-monitoring/
  tag: Blog
  text: Rastree y solucione problemas de rendimiento de MongoDB con Datadog DBM
- link: https://www.datadoghq.com/blog/datadog-database-research/
  tag: Blog
  text: Cómo las arquitecturas de microservicios han moldeado el uso de tecnologías
    de bases de datos
- link: /database_monitoring/data_collected/
  tag: Documentación
  text: Datos recopilados
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Resolución de problemas
- link: https://dtdg.co/fe
  tag: Habilitación de la fundación
  text: Únase a una sesión interactiva para potenciar su DBM
- link: https://learn.datadoghq.com/courses/database-monitoring
  tag: Centro de aprendizaje
  text: Supervisando una base de datos Postgres con Datadog DBM
title: DBM
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrese" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Database">}}
  Con DBM, aprenda a identificar rápidamente consultas costosas y lentas. Profundice en los detalles de ejecución precisos para abordar cuellos de botella.
{{< /learning-center-callout >}}

La DBM de Datadog proporciona una visibilidad profunda en las bases de datos de todos sus servidores Profundice en las métricas de rendimiento de consultas históricas, planes de explicación y métricas a nivel de servidor, todo en un solo lugar, para comprender la salud y el rendimiento de sus bases de datos y solucionar problemas a medida que surjan.

## Comenzando {#getting-started}

La DBM de Datadog admite versiones autohospedadas y en la nube gestionadas de **Postgres**, **MySQL**, **Oracle**, **SQL Server**, **MongoDB**, **Amazon DocumentDB** y **ClickHouse**. Para comenzar con DBM de Datadog, configure su base de datos e instale el Datadog Agent. Para instrucciones de configuración, seleccione su tecnología de base de datos:

### Postgres {#postgres}

{{< partial name="dbm/dbm-setup-postgres" >}}
<p></p>

### MySQL {#mysql}

{{< partial name="dbm/dbm-setup-mysql" >}}
<p></p>

### Oracle {#oracle}

{{< partial name="dbm/dbm-setup-oracle" >}}
<p></p>

### SQL Server {#sql-server}

{{< partial name="dbm/dbm-setup-sql-server" >}}
<p></p>

### MongoDB {#mongodb}

{{< partial name="dbm/dbm-setup-mongodb" >}}
<p></p>

### Amazon DocumentDB {#amazon-documentdb}

{{< partial name="dbm/dbm-setup-documentdb" >}}
<p></p>

### ClickHouse {#clickhouse}

{{< partial name="dbm/dbm-setup-clickhouse" >}}
<p></p>

## Explore DBM de Datadog {#explore-datadog-database-monitoring}

Navegue a [DBM][1] en Datadog.

### Profundice en las métricas de rendimiento de consultas {#dig-into-query-performance-metrics}

La [vista de Métricas de Consultas][2] muestra el rendimiento histórico de consultas normalizadas. Visualice las tendencias de rendimiento por infraestructura o etiquetas personalizadas, como Availability Zone del centro de datos, y establezca alertas para anomalías

- Identifique consultas lentas y cuáles son las que consumen más tiempo.
- Muestre métricas a nivel de base de datos que no son capturadas por APM, como filas actualizadas/devueltas.
- Filtre y agrupe consultas por dimensiones arbitrarias, como equipo, usuario, clúster y servidor.

{{< img src="database_monitoring/dbm-query-metrics-2.png" alt="DBM" style="width:100%;">}}

### Explore muestras de consultas {#explore-query-samples}

La [vista de Muestras de Consultas][3] le ayuda a entender qué consultas se están ejecutando en un momento dado. Compare cada ejecución con el rendimiento promedio de la consulta y de las consultas relacionadas.

- Identifique consultas inusualmente lentas pero poco frecuentes que no son capturadas por métricas.
- Encuentre valores anómalos en el tiempo de ejecución o costo de ejecución de una consulta.
- Atribuya una ejecución de consulta específica a un usuario, aplicación o servidor cliente.

{{< img src="database_monitoring/dbm-query-sample-2.png" alt="DBM" style="width:100%;">}}

### Entienda antes de ejecutar {#understand-before-you-run}

[Planes de Explicación][4] le ayudan a entender cómo la base de datos planea ejecutar sus consultas.

- Revise cada operación para identificar cuellos de botella.
- Mejore la eficiencia de las consultas y ahorre en costosos escaneos secuenciales en tablas grandes.
- Observe cómo cambia el plan de una consulta a lo largo del tiempo.

{{< img src="database_monitoring/dbm-explain-plan-3.png" alt="DBM" style="width:100%;">}}

### Recoga métricas personalizadas {#collect-custom-metrics}

Utilice [`custom_queries`][7] para recoger métricas de sus propias tablas de base de datos: estado de la aplicación, contadores de negocio, profundidades de cola o cualquier dato que desee correlacionar con el rendimiento de la consulta.

### Visualice todo en tableros enriquecidos {#visualize-everything-on-enriched-dashboards}

Identifique rápidamente áreas problemáticas al ver métricas de base de datos y del sistema juntas en tableros de integración enriquecidos para instancias autohospedadas y gestionadas en la nube. Clone tableros para personalización y mejora con sus propias métricas personalizadas. Haga clic en el enlace {{< ui >}}Dashboards{{< /ui >}} en la parte superior de las páginas de Métricas de Consultas y Muestras de Consultas para ir a los tableros de DBM.

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="DBM" style="width:100%;">}}

### Optimice la salud y el rendimiento del servidor {#optimize-host-health-and-performance}

En la [página de Bases de Datos][1], puede evaluar la salud y la actividad de sus servidores de base de datos. Ordene y filtre la lista para priorizar los servidores con alertas activadas, alto volumen de consultas y otros criterios. Haga clic en un servidor individual para ver detalles como su configuración, consultas comunes de bloqueo y servicios de llamada. Consulte [Explorando Hosts de Base de Datos][5] para más detalles.

{{< img src="database_monitoring/databases-list.png" alt="La página de Bases de Datos en Datadog" style="width:90%;" >}}

### Vea recomendaciones de optimización {#view-optimization-recommendations}

La [página de Recomendaciones][6] destaca problemas y oportunidades de optimización, ayudándole a ahorrar tiempo al priorizar lo más importante. Seleccione una recomendación para visualizar detalles, incluyendo un resumen del problema, así como posibles próximos pasos para abordar el problema.

{{< img src="database_monitoring/recommendations-page.png" alt="La página de Recomendaciones en Datadog" style="width:90%;" >}}


## Lectura Adicional {#further-reading}

{{< learning-center-callout header="Pruebe supervisar una base de datos Postgres con Datadog DBM en el Centro de Aprendizaje" btn_title="Inscríbase Ahora" btn_url="https://learn.datadoghq.com/courses/database-monitoring">}}
  El Centro de Aprendizaje de Datadog está lleno de cursos prácticos para ayudarle a aprender sobre este tema. Inscríbase sin costo para identificar ineficiencias y optimizar su base de datos Postgres.
{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /es/database_monitoring/query_metrics/
[3]: /es/database_monitoring/query_samples/
[4]: /es/database_monitoring/query_metrics/#explain-plans
[5]: /es/database_monitoring/database_hosts/
[6]: /es/database_monitoring/recommendations/
[7]: /es/database_monitoring/custom_metrics/