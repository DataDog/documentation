---
description: Explorar y profundizar en tu base de datos y en tus métricas de rendimiento
  de las consultas
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /integrations/postgres/
  tag: Documentación
  text: Integración Postgres
- link: /integrations/mysql/
  tag: Documentación
  text: Integración MySQL
- link: /integrations/sqlserver/
  tag: Documentación
  text: Integración SQL Server
- link: /integrations/oracle/
  tag: Documentación
  text: Integración Oracle
- link: /database_monitoring/data_collected/
  tag: Documentación
  text: Datos recopilados
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Resolución de problemas
title: Explorar métricas de consultas
---

La vista Métricas de consultas muestra el rendimiento histórico de las consultas normalizadas. Visualiza las tendencias de rendimiento por infraestructura o etiquetas (tags) personalizadas, como la zona de disponibilidad del centro de datos, y recibe alertas sobre anomalías.

Ve a [la página Métricas de consultas][1] en Datadog.

La vista muestra 200 consultas principales, es decir, las 200 consultas con mayor tiempo total de ejecución en el periodo de tiempo seleccionado. Para ver más detalles, consulta [qué consultas se rastrean][2]. La agregación de métricas para consultas rápidas puntuales o que se ejecutan con poca frecuencia no se muestra en la vista Consulta de métricas, pero puedes encontrar snapshots de ellas representadas en [muestras de consultas][3], si se han ejecutado en los últimos 15 días.

## Filtrado y agrupación

Selecciona el origen de tu base de datos (por ejemplo, Postgres) en el selector de **origen** de la parte superior. Especifica etiquetas de búsqueda para filtrar las lista de consultas (o la lista de [procedimientos almacenados][7], cuando estén disponibles) y agrupa por etiquetas para organizar la lista.

Por ejemplo, a menudo es útil agrupar por host o clúster para ver rápidamente en qué infraestructura se ejecutan las consultas.

{{< img src="database_monitoring/dbm-qm-group-by-2.png" alt="Agrupar por etiqueta de entorno" style="width:100%;">}}

Puedes agrupar por hasta tres elementos (por ejemplo, host, entorno y centro de datos) para obtener conjuntos agrupados de resultados filtrados.

{{< img src="database_monitoring/dbm-qm-group-by-three-2.png" alt="Agrupar por tres etiquetas" style="width:100%;">}}

Expande el grupo para ver la lista de consultas y haz clic en **View all queries in this group** (Ver todas las consultas de este grupo) para desplazar ese criterio de agrupación al campo de búsqueda de la barra de filtros y filtrar el contenido de la página según el resultado de esa búsqueda.

## Filtrado por facetas

En la parte izquierda de la vista hay listas de facetas para filtrar la lista de consultas. Las facetas incluyen:

- **Core** (Núcleo): servicios, hosts, entornos.
- **Database** (Base de datos): Postgres tiene las facetas `database` y `user`. MySQL tiene las facetas `schema`.
- **Infrastructure** (Infraestructura): Etiquetas de infraestructura tradicionales de Datadog recopiladas por el Agent.

Selecciona o borra las facetas para encontrar la lista de consultas que te interesa.

### Filtrado de la vista Métricas de consultas por una sola consulta

Si quieres filtrar el contenido de la vista Métricas de consultas por sólo una [consulta normalizada][4], filtra en `query_signature`, no en `query`. Los nombres de etiquetas se truncan a 200 caracteres y como las consultas pueden ser largas, sus etiquetas `query` no son necesariamente exclusivas. `query_signature` es un hash de una consulta normalizada y sirve como ID único de la consulta normalizada.

Una forma de filtrar por una consulta específica sin buscar su valor de firma de consulta es hacer clic en la consulta en la lista. Esto abre su [página de detalles de la consulta](#query-details-page), donde se hace clic en **Filter to This Query** (Filtrar por esta consulta). Esto filtra la página Métricas de consultas por la faceta `query_signature`.

## Exploración de métricas

La lista de Métricas de consultas muestra métricas de solicitudes, latencia media, tiempo total y porcentaje de tiempo, además de otras métricas que dependen de tu producto de base de datos. Haz clic en el menú **Options** (Opciones) para determinar cuáles métricas se muestran en la lista. Pasa el cursor sobre el encabezado de la columna para ver una descripción de cada tipo de métrica. Haz clic en el encabezado de la columna para ordenar la lista según esa métrica.

Para ver una lista completa de métricas recopiladas, consulta la documentación Datos recopilados, de la integración correspondiente a tu producto de base de datos:

{{< partial name="dbm/dbm-data-collected" >}}
<p></p>

Las métricas utilizadas para las vistas de la Monitorización de bases de datos son, principalmente:
- **MySQL**: `mysql.queries.*`
- **Postgres**: `postgresql.queries.*`
- **SQL Server**: `sqlserver.queries.*`
- **Oracle**: `oracle.queries.*`

## Página de detalles de la consulta

Al hacer clic en una consulta de la lista Métricas de consultas, se abre la página de detalles de la consulta. La parte superior de la página muestra el texto completo de la [consulta normalizada][4] y una lista de todas las etiquetas asociadas a la consulta. La lista de etiquetas es la unión de todas las etiquetas de cada host en que se ejecuta la consulta. Recorre la lista para ver información como, por ejemplo, en qué servidor se ejecuta la consulta:

{{< img src="database_monitoring/dbm_qd_tags.png" alt="Lista de etiquetas para una consulta" style="width:100%;">}}

Permanece en el contexto de esta consulta y ve a la [página Muestras de consultas][3] con el botón **View Query Samples** (Ver muestras de consultas) o vuelve a las Métricas de consultas, filtradas por esta consulta, con el botón **Filter by This Query** (Filtrar por esta consulta).

{{< img src="database_monitoring/dbm_qd_jump_buttons.png" alt="Visualizar rápidamente muestras o métricas de consultas para esta consulta" style="width:100%;">}}

Cuando consultes los detalles de una consulta y quieras encontrar los hosts en los que se ejecuta, haz clic en **Filter by This Query** (Filtrar por esta consulta) y luego agrupa por hosts. La lista de métricas muestra cada host en el que se ejecuta la consulta. Ordena por **Porcentaje de tiempo** para ver si un host en particular es responsable de un gran porcentaje de la ejecución de una consulta.

{{< img src="database_monitoring/dbm_qm_by_host_usecase.png" alt="Métricas de una consulta agrupadas por host" style="width:100%;">}}

Ordena por **Filas/Consulta** para ver si un host en particular tiende a devolver muchas más filas, lo que indica que la fragmentación en los hosts está desequilibrada.

### Gráficos de métricas

Los gráficos muestran la comparación de las métricas de esta consulta con las de todas las consultas excepto esta. Puede que la latencia media de esta consulta sea mucho mayor que la media de las demás, pero que también se ejecute con poca frecuencia, por lo que su impacto total es menor. Puedes ver cuánto tiempo de la base de datos consume cuando se ejecuta, en comparación con todas las demás consultas.

Haz clic en la pestaña **Metrics** (Métricas) para ver más gráficos de métricas para esta consulta.

### Planes explicativos

Datadog recopila los planes de explicación de forma continua, por lo que una consulta determinada puede tener varios planes. Esos planes se normalizan y se muestran por separado para que puedas ver si una consulta tiene planes que tienen un mejor rendimiento o un coste relativo mayor que otros. Por ejemplo, el siguiente plan de explicación contiene información de una consulta:

{{< img src="database_monitoring/dbm-qd-explain-plans-2.png" alt="Información de los planes de explicación de una consulta" style="width:100%;">}}

Selecciona un plan para ver métricas de costes o su JSON. Haz clic en **View All Samples for This Plan** (Ver todas las muestras de este plan) para ir a la vista Muestras de consulta de [las muestras asociadas a él][5].

No todas las consultas tienen planes de explicación, por varias razones, incluyendo qué tipo de consulta es, o varios parámetros de configuración. Para ver más detalles, consulta [Solucionar problemas][6].

### Hosts que ejecutan esta consulta

La pestaña **Hosts Running This Query** (Hosts que ejecutan esta consulta) enumera los hosts que ejecutan esta consulta, con un menú contextual que permite visualizar información relacionada con los hosts, como logs o los datos de red, que pueden ser útiles para solucionar problemas en el origen de la latencia.

{{< img src="database_monitoring/dbm_qd_hosts_running_query_menu.png" alt="Menú de acciones del host para acceder a más información" style="width:100%;">}}

## Dashboards de monitorización de bases de datos

Para acceder rápidamente a los dashboards que muestran visualizaciones de métricas de infraestructuras relacionadas con bases de datos y de consultas, haz clic en el enlace **Dashboards** en la parte superior de la página. Utiliza los dashboards predefinidos o clónalos y personalízalos para adaptarlos a tus necesidades.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases/queries
[2]: /es/database_monitoring/data_collected/#which-queries-are-tracked
[3]: /es/database_monitoring/query_samples/
[4]: /es/database_monitoring/data_collected/#normalized-queries
[5]: /es/database_monitoring/query_samples/#sample-details
[6]: /es/database_monitoring/troubleshooting/#queries-are-missing-explain-plans
[7]: /es/database_monitoring/database_hosts/#stored-procedures