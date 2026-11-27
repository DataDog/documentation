---
description: Explore y analice el estado y la configuración de sus servidores de base
  de datos
title: Exploración de hosts de bases de datos
---
{{< img src="database_monitoring/databases-list-4.png" alt="La página de bases de datos en Datadog" style="width:100%;" >}}

En la [página Databases][1], puede evaluar el estado y la actividad de sus servidores de base de datos y [clústeres](#cluster-grouping). Ordene y filtre la lista para priorizar los servidores y clústeres con alertas activadas, alto volumen de consultas y otros criterios. Haga clic en cualquier servidor de la lista para abrir un panel de detalles:


{{< img src="database_monitoring/db-list-details-panel-cropped-3.png" alt="El panel de detalles de un servidor de base de datos individual en la página Databases" style="width:90%;" >}}

Además de un gráfico filtrable de conexiones activas para ese servidor, el panel de detalles del servidor muestra las siguientes características.

|                                                 | Postgres  | SQL Server | MySQL     | Oracle    |
|-------------------------------------------------|-----------|------------|-----------|-----------|
| [Top queries](#top-queries)                     | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Stored procedures](#stored-procedures)         |           | {{< X >}}  |           |           |
| [Metrics](#metrics)                             | {{< X >}} | {{< X >}}  |           |           |
| [Active connections](#active-connections)       | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Schema](#schema)                               | {{< X >}} | {{< X >}}  |           |           |
| [Blocking queries](#blocking-queries)           | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Calling services](#calling-services)           | {{< X >}} | {{< X >}}  | {{< X >}} |           |
| [Configuration details](#configuration-details) | {{< X >}} | {{< X >}}  | {{< X >}} |           |

## Agrupación de clústeres {#cluster-grouping}
Aparece un interruptor {{< ui >}}Group into clusters{{< /ui >}} con la lista de servidores de base de datos si las etiquetas de los servidores indican la presencia de una topología de clúster. Active este interruptor para agrupar los servidores en clústeres dentro de la lista.

Las filas de clúster muestran una insignia {{< ui >}}Cluster{{< /ui >}} y muestran la cantidad de instancias en el clúster. Las columnas para las filas de clúster muestran datos agregados de todas las instancias dentro del clúster. Seleccione una fila de clúster para expandirla y ver una lista de todas las instancias que contiene el clúster.

La agrupación de clústeres admite la siguiente tecnología de base de datos y las siguientes topologías de clúster:

<table>
  <colgroup>
    <col style="width:15%">
    <col style="width:20%">
    <col style="width:30%">
    <col style="width:35%">
  </colgroup>
  <thead>
    <tr>
      <th>Base de datos</th>
      <th>Topologías</th>
      <th>Etiquetas de agrupación</th>
      <th>Fuente del nombre del clúster</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Amazon RDS<br><em>(se requiere integración con AWS)</em></td>
      <td>
        <ul>
          <li>Clústeres Multi-AZ</li>
          <li>Réplicas de lectura</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>dbclusteridentifier</code></li>
          <li><code>region</code></li>
          <li><code>aws_account</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>dbclusteridentifier</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>PostgreSQL<br><em>(se requiere Agent v7.58+)</em></td>
      <td>
        <ul>
          <li>Replicación física</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>system_identifier</code></li>
          <li><code>env</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>postgresql_cluster_name</code> (de la <code>cluster_name</code> configuración de la instancia)</li>
          <li>Nombre de la instancia principal</li>
          <li><code>system_identifier</code></li>
        </ul>
      </td>
    </tr>
        <tr>
      <td>MySQL<br><em>(se requiere Agent v7.68+)</em></td>
      <td>
        <ul>
          <li>Replicación regular (no replicación de grupo)</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><code>cluster_uuid</code></li>
          <li><code>env</code></li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Nombre de la instancia principal</li>
          <li><code>cluster_uuid</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Top queries {#top-queries}

En la pestaña {{< ui >}}Top Queries{{< /ui >}} del panel de detalles del servidor, puede ordenar las consultas más comunes por duración máxima, latencia promedio y más.

{{< img src="database_monitoring/db-list-top-queries.png" alt="La pestaña Top Queries del panel de detalles de un solo servidor de base de datos en la página Databases" style="width:90%;" >}}

Haga clic en cualquier sentencia de consulta para abrir un panel de detalles que incluye:
- información de consultas
- gráficos de latencia promedio y otras métricas clave
- planes de ejecución
- actividad de bloqueo
- servidores que han ejecutado la consulta
- servicios que realizan llamadas

{{< img src="database_monitoring/db-list-query-details.png" alt="El panel de detalles de una consulta principal individual" style="width:90%;" >}}

### Stored procedures {#stored-procedures}

Cuando sea compatible, la pestaña {{< ui >}}Top Queries{{< /ui >}} incluye una sección {{< ui >}}Stored Procedures{{< /ui >}} que enumera cada procedimiento almacenado por nombre, junto con su duración promedio, recuento de lecturas lógicas, recuento de escrituras lógicas y más. Expanda un procedimiento almacenado para ver sus consultas SQL individuales y haga clic en una consulta para ver su panel de detalles.

{{< img src="database_monitoring/stored-procedures.png" alt="Una lista de procedimientos almacenados, con uno expandido para mostrar su consulta SQL" style="width:90%;" >}}

## Métricas {#metrics}

En la pestaña {{< ui >}}Metrics{{< /ui >}} del panel de detalles del servidor, puede ver y filtrar métricas para el estado del sistema, la actividad de consultas, las operaciones de bloqueo, el rendimiento de funciones y otras áreas clave.

{{< img src="database_monitoring/db-list-metrics.png" alt="La pestaña Metrics del panel de detalles de un solo servidor de base de datos en la página Databases" style="width:90%;" >}}

## Active connections {#active-connections}

La pestaña {{< ui >}}Active Connections{{< /ui >}} del panel de detalles del servidor muestra las consultas en vivo que se están ejecutando en el servidor. Haga clic en una sentencia de consulta para abrir un panel que incluye atributos de evento, trazas relacionadas y otros detalles relevantes.

{{< img src="database_monitoring/db-list-active-connections-2.png" alt="La pestaña Active Connections del panel de detalles de un solo servidor de base de datos en la página Databases" style="width:90%;" >}}

## Schema {#schema}

Utilice la pestaña {{< ui >}}Schema{{< /ui >}} para explorar las estructuras de la base de datos, tablas, columnas, tipos de datos, claves foráneas existentes y estrategias de indexación para cada base de datos en un servidor.

{{< img src="database_monitoring/db-list-schema-tab.png" alt="La pestaña Schema del panel de detalles de un solo servidor de base de datos en la página Databases" style="width:90%;" >}}

## Blocking queries {#blocking-queries}

En la pestaña {{< ui >}}Blocking Queries{{< /ui >}} del panel de detalles del servidor, puede ver visualizaciones para:

- duraciones de consultas bloqueantes
- ejecuciones de consultas bloqueantes
- la cantidad de consultas en espera

Puede buscar y filtrar las consultas o muestras. Haga clic en cualquier fila de consulta individual para ver los detalles.

{{< img src="database_monitoring/db-list-blocking-queries.png" alt="La pestaña Blocking Queries del panel de detalles de un solo servidor de base de datos en la página Databases" style="width:90%;" >}}

## Calling services {#calling-services}

En la pestaña {{< ui >}}Calling Services{{< /ui >}} del panel de detalles del servidor, puede ver la lista de servicios que han llamado al servidor. La información del servicio mostrada incluye cuándo se implementó el servicio, la cantidad de solicitudes realizadas al servidor por segundo, cuántas consultas de base de datos se ejecutaron y más.

{{< img src="database_monitoring/db-list-calling-services.png" alt="La pestaña Calling Services del panel de detalles de un servidor de base de datos específico en la página Databases" style="width:90%;" >}}

Haga clic en cualquier fila de servicio para ver su panel de APM.

## Configuration details {#configuration-details}

<div class="alert alert-info">El servidor debe tener <code>collect_settings</code> habilitado en su <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L397">configuración de instancia</a> para que esta función funcione correctamente.</div>

La pestaña {{< ui >}}Configuration{{< /ui >}} del panel de detalles del servidor proporciona una vista directa de los parámetros de configuración del servidor sin comprometer la seguridad de la base de datos. Úsela para identificar parámetros de base de datos mal configurados y ajustar la configuración para optimizar el rendimiento de la base de datos.

{{< img src="database_monitoring/db-list-configuration.png" alt="La pestaña Configuration del panel de detalles de un servidor de base de datos específico en la página Databases" style="width:90%;" >}}

[1]: https://app.datadoghq.com/databases