---
algolia:
  tags:
  - database monitoring
  - dbm
cascade:
  algolia:
    rank: 70
description: Conozca Database Monitoring y comience
further_reading:
- link: /database_monitoring/data_collected/
  tag: Documentación
  text: Datos recopilados
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Solución de problemas
- link: https://learn.datadoghq.com/courses/database-monitoring
  tag: Centro de aprendizaje
  text: Hacer un seguimiento de una base de datos Postgres con Datadog DBM
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para mejorar su Database Monitoring
- link: https://www.datadoghq.com/blog/map-postgresql-explain-plan-nodes-to-sql-with-datadog/
  tag: blog
  text: Diagnostique consultas lentas de PostgreSQL más rápido con la correlación
    de planes de explicación
- link: https://www.datadoghq.com/blog/dbm-supabase/
  tag: blog
  text: Haga un seguimiento y optimice el rendimiento de las consultas de Supabase
    con Datadog Database Monitoring
- link: https://www.datadoghq.com/blog/detect-inefficient-index-scans-with-dbm/
  tag: blog
  text: 'No todos los escaneos de índice son iguales: cómo redujimos la latencia de
    las consultas en más de un 99%'
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: blog
  text: Análisis de la latencia de ida y vuelta de las consultas
- link: https://www.datadoghq.com/blog/database-monitoring-recommendations/
  tag: blog
  text: Mejore el rendimiento del servidor y de las consultas de la base de datos
    con las recomendaciones de Database Monitoring
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: blog
  text: Haga un seguimiento y visualice el rendimiento de la base de datos
- link: https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/
  tag: blog
  text: Haga un seguimiento de SQL Server y bases de datos administradas de Azure
    con Datadog DBM
- link: https://www.datadoghq.com/blog/mongodb-database-monitoring/
  tag: blog
  text: Rastree y solucione problemas de rendimiento de MongoDB con Datadog Database
    Monitoring
- link: https://www.datadoghq.com/blog/datadog-database-research/
  tag: blog
  text: Cómo las arquitecturas de microservicios han dado forma al uso de las tecnologías
    de bases de datos
title: Database Monitoring
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Database">}}
  Con Database Monitoring, aprenda a identificar rápidamente las consultas costosas y lentas. Profundice en detalles de ejecución precisos para abordar los cuellos de botella.
{{< /learning-center-callout >}}

Datadog Database Monitoring proporciona una visibilidad profunda de las bases de datos en todos sus servidores. Analice las métricas históricas de rendimiento de consultas, los planes de explicación y las métricas a nivel de servidor, todo en un solo lugar, para comprender el estado y el rendimiento de sus bases de datos y solucionar problemas a medida que surjan.

## Primeros pasos {#getting-started}

Datadog Database Monitoring es compatible con versiones autohospedadas y administradas en la nube de **Postgres**, **MySQL**, **Oracle**, **SQL Server**, **MongoDB**, **Amazon DocumentDB** y **ClickHouse**. Para comenzar con Datadog Database Monitoring, configure su base de datos e instale el Datadog Agent. Para obtener instrucciones de configuración, seleccione su tecnología de base de datos:

### Postgres {#postgres}

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_postgres/selfhosted" src="integrations_logos/postgres.png" alt="Autohospedado" title="Autohospedado" >}}
  {{< image-card href="/database_monitoring/setup_postgres/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_postgres/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_postgres/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/alloydb" src="integrations_logos/google_cloud_alloydb.png" alt="Google Cloud SQL" image_width="80">}}
  {{< image-card href="/database_monitoring/setup_postgres/azure" src="integrations_logos/azure_db_for_postgresql.png" alt="PostgreSQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/heroku" src="integrations_logos/heroku.png" alt="PostgreSQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/supabase" src="integrations_logos/supabase.png" alt="Supabase" >}}
{{< /card-grid >}}
<p></p>

### MySQL {#mysql}

{{< card-grid card_width="130px">}}
  {{< image-card href="/database_monitoring/setup_mysql/selfhosted" src="integrations_logos/mysql.png" alt="Autohospedado" title="Autohospedado" >}}
  {{< image-card href="/database_monitoring/setup_mysql/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_mysql/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_mysql/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_mysql/azure" src="integrations_logos/azure_db_for_mysql.png" alt="MySQL" >}}
{{< /card-grid >}}
<p></p>

### Oracle {#oracle}

{{< card-grid card_width="130px">}}
  {{< image-card href="/database_monitoring/setup_oracle/selfhosted" src="integrations_logos/oracle.png" alt="Autohospedado" title="Autohospedado" >}}
  {{< image-card href="/database_monitoring/setup_oracle/rds" src="integrations_logos/amazon_rds.png" alt="RDS" title="RDS" >}}
  {{< image-card href="/database_monitoring/setup_oracle/rac" src="integrations_logos/oracle.png" alt="RAC" title="RAC" >}}
  {{< image-card href="/database_monitoring/setup_oracle/exadata" src="integrations_logos/oracle.png" alt="Exadata" title="Exadata" >}}
  {{< image-card href="/database_monitoring/setup_oracle/autonomous_database" src="integrations_logos/oracle.png" alt="Autohospedado" title="Base de datos autónoma" >}}
{{< /card-grid >}}
<p></p>

### SQL Server {#sql-server}

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_sql_server/selfhosted" src="integrations_logos/sqlserver.png" alt="Autohospedado" title="Autohospedado" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/azure" src="integrations_logos/azure.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
{{< /card-grid >}}
<p></p>

### MongoDB {#mongodb}

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_mongodb/selfhosted" src="integrations_logos/mongo.png" alt="Autohospedado" title="Autohospedado" >}}
  {{< image-card href="/database_monitoring/setup_mongodb/mongodbatlas" src="integrations_logos/mongodb_atlas.png" alt="MongoDB Atlas" title="MongoDB Atlas" >}}
{{< /card-grid >}}
<p></p>

### Amazon DocumentDB {#amazon-documentdb}

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_documentdb/amazon_documentdb" src="integrations_logos/amazon_documentdb.png" alt="Amazon DocumentDB" title="Amazon DocumentDB" >}}
{{< /card-grid >}}
<p></p>

### ClickHouse {#clickhouse}

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/selfhosted" src="integrations_logos/clickhouse.png" alt="Autohospedado" title="Autohospedado" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/cloud" src="integrations_logos/clickhouse.png" alt="ClickHouse Cloud" title="ClickHouse Cloud" >}}
{{< /card-grid >}}
<p></p>

## Explore Datadog Database Monitoring {#explore-datadog-database-monitoring}

Navegue a [Database Monitoring][1] en Datadog.

### Profundice en las métricas de rendimiento de las consultas {#dig-into-query-performance-metrics}

La [vista de métricas de consultas][2] muestra el rendimiento histórico de las consultas normalizadas. Visualice las tendencias de rendimiento por infraestructura o etiquetas personalizadas, como la zona de disponibilidad del centro de datos, y configure alertas para anomalías.

- Identifique las consultas lentas y qué consultas consumen más tiempo.
- Muestre métricas a nivel de base de datos que no captura APM, como las filas actualizadas/devueltas.
- Filtre y agrupe consultas por dimensiones arbitrarias como equipo, usuario, clúster y servidor.

{{< img src="database_monitoring/dbm-query-metrics-2.png" alt="Database Monitoring" style="width:100%;">}}

### Explore muestras de consultas {#explore-query-samples}

La [vista de muestras de consultas][3] le ayuda a entender qué consultas se están ejecutando en un momento determinado. Compare cada ejecución con el rendimiento promedio de la consulta y las consultas relacionadas.

- Identifique consultas inusualmente lentas pero poco frecuentes que no capturan las métricas.
- Encuentre valores atípicos en el tiempo de ejecución o el costo de ejecución de una consulta.
- Atribuya una ejecución de consulta específica a un usuario, aplicación o servidor cliente.

{{< img src="database_monitoring/dbm-query-sample-2.png" alt="Database Monitoring" style="width:100%;">}}

### Entienda antes de ejecutar {#understand-before-you-run}

Los [planes de explicación][4] le ayudan a entender cómo planea la base de datos ejecutar sus consultas.

- Analice paso a paso cada operación para identificar cuellos de botella.
- Mejore la eficiencia de las consultas y ahorre en costosos escaneos secuenciales en tablas grandes.
- Vea cómo cambia el plan de una consulta con el tiempo.

{{< img src="database_monitoring/dbm-explain-plan-3.png" alt="Database Monitoring" style="width:100%;">}}

### Recopile métricas personalizadas {#collect-custom-metrics}

Utilice [`custom_queries`][7] para recopilar métricas de sus propias tablas de base de datos: estado de la aplicación, contadores de negocio, profundidades de cola o cualquier dato que desee correlacionar con el rendimiento de las consultas.

### Visualice todo en paneles enriquecidos{#visualize-everything-on-enriched-dashboards}

Identifique rápidamente las áreas problemáticas visualizando las métricas de la base de datos y del sistema juntas en paneles de integración enriquecidos tanto para instancias autohospedadas como administradas en la nube. Clone paneles para personalizarlos y mejorarlos con sus propias métricas personalizadas. Haga clic en el enlace {{< ui >}}Dashboards{{< /ui >}} en la parte superior de las páginas de métricas de consulta y muestras de consulta para ir a los paneles de Database Monitoring.

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

### Optimice el estado y el rendimiento del servidor{#optimize-host-health-and-performance}

En la [página de bases de datos][1], puede evaluar el estado y la actividad de sus servidores de base de datos. Ordene y filtre la lista para priorizar los servidores con alertas activadas, alto volumen de consultas y otros criterios. Haga clic en un servidor individual para ver detalles como su configuración, consultas de bloqueo comunes y servicios de llamada. Consulte [Exploración de servidores de base de datos][5] para obtener más detalles.

{{< img src="database_monitoring/databases-list.png" alt="La página de bases de datos en Datadog" style="width:90%;" >}}

### Ver recomendaciones de optimización{#view-optimization-recommendations}

La [página de recomendaciones][6] destaca problemas y oportunidades de optimización, lo que le ayuda a ahorrar tiempo al priorizar lo más importante. Seleccione una recomendación para ver los detalles, incluido un resumen del problema, así como los posibles pasos siguientes para solucionar el problema.

{{< img src="database_monitoring/recommendations-page.png" alt="La página de recomendaciones en Datadog" style="width:90%;" >}}


## Lecturas adicionales {#further-reading}

{{< learning-center-callout header="Pruebe hacer un seguimiento de una base de datos Postgres con Datadog DBM en el Centro de aprendizaje." btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/courses/database-monitoring">}}
  El Centro de aprendizaje de Datadog está lleno de cursos prácticos para ayudarle a aprender sobre este tema. Inscríbase sin costo para identificar ineficiencias y optimizar su base de datos Postgres.
{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /es/database_monitoring/query_metrics/
[3]: /es/database_monitoring/query_samples/
[4]: /es/database_monitoring/query_metrics/#explain-plans
[5]: /es/database_monitoring/database_hosts/
[6]: /es/database_monitoring/recommendations/
[7]: /es/database_monitoring/custom_metrics/