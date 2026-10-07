---
description: Explorar y profundizar en el estado y la configuración del host de tu
  base de datos
title: Explorar hosts de bases de datos
---

{{< img src="database_monitoring/databases-list-2.png" alt="Página Bases de datos en Datadog" style="width:90%;" >}}

En la [página Bases de datos][1], puedes evaluar el estado y la actividad de los hosts de tu base de datos. Ordena y filtra la lista para priorizar hosts con alertas activadas, alto volumen de consultas y otros criterios. Haz clic en cualquier host de la lista para abrir un panel de detalles:

{{< img src="database_monitoring/db-list-details-panel-cropped-2.png" alt="Panel de detalles de un host de base de datos individual en la página Bases de datos" style="width:90%;" >}}

Además de un gráfico filtrable de las conexiones activas para ese host, el panel de detalles del host muestra las siguientes características.

|                                                 | Postgres  | SQL Server | MySQL     | Oracle    |
|-------------------------------------------------|-----------|------------|-----------|-----------|
| [Consultas principales](#top-queries)                     | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Procedimientos almacenados](#stored-procedures)         |           | {{< X >}}  |           |           |
| [Métricas](#metrics)                             | {{< X >}} | {{< X >}}  |           |           |
| [Conexiones activas](#active-connections)       | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |
| [Esquema](#schema)                               | {{< X >}} | {{< X >}}  |           |           |
| [Bloqueo de consultas](#blocking-queries)           | {{< X >}} | {{< X >}}  |           | {{< X >}} |
| [Llamadas de servicios](#calling-services)           | {{< X >}} | {{< X >}}  | {{< X >}} |           |
| [Detalles de configuración](#configuration-details) | {{< X >}} | {{< X >}}  | {{< X >}} |           |

## Consultas principales

En la pestaña **Consultas principales** del panel de detalles del host, puedes ordenar las consultas más comunes por duración máxima, latencia media, etc.

{{< img src="database_monitoring/db-list-top-queries.png" alt="Pestaña Consultas principales del panel de detalles de un host de base de datos individual en la página Bases de datos" style="width:90%;" >}}

Haz clic en cualquier sentencia de consulta para abrir un panel de detalles que incluye:
- información sobre consultas
- gráficos de latencia media y otras métricas clave
- explain plans
- actividad de bloqueo
- hosts que han ejecutado la consulta
- llamadas de servicios

{{< img src="database_monitoring/db-list-query-details.png" alt="Panel de detalles de una consulta principal individual" style="width:90%;" >}}

### Procedimientos almacenados

Cuando es compatible, la pestaña **Consultas principales** incluye una sección **Procedimientos almacenados** que enumera cada procedimiento almacenado por nombre, junto con su duración media, recuento de lecturas lógicas, recuento de escrituras lógicas y más. Expande un procedimiento almacenado para ver sus consultas SQL individuales y haz clic en una consulta para ver su panel de detalles.

{{< img src="database_monitoring/stored-procedures.png" alt="Lista de procedimientos con un procedimiento expandido para mostrar su consulta SQL" style="width:90%;" >}}

## Métricas

En la pestaña **Métricas** del panel de detalles del host puedes ver y filtrar métricas del estado del sistema, de la actividad de consulta, de las operaciones de bloqueo, del rendimiento de funciones y otras áreas clave.

{{< img src="database_monitoring/db-list-metrics.png" alt="Pestaña Métricas del panel de detalles de un host de base de datos individual en la página Bases de datos" style="width:90%;" >}}

## Conexiones activas

La pestaña **Conexiones activas** del panel de detalles del host muestra las consultas en directo que se están ejecutando en el host. Haz clic en una sentencia de consulta para abrir un panel que incluye atributos de eventos, trazas (traces) relacionadas y otros detalles relevantes.

{{< img src="database_monitoring/db-list-active-connections-2.png" alt="Pestaña Conexiones activas del panel de detalles de un host de base de datos individual en la página Bases de datos" style="width:90%;" >}}

## Esquema

Utiliza la pestaña **Esquema** para explorar estructuras de bases de datos, tablas, columnas, tipos de datos, claves externas existentes y estrategias de indexación para cada base de datos en un host.

{{< img src="database_monitoring/db-list-schema-tab.png" alt="Pestaña Esquema del panel de detalles de un host de base de datos individual en la página Bases de datos" style="width:90%;" >}}

## Bloqueo de consultas

En la pestaña **Bloqueo de consultas** del panel de detalles del host puedes ver visualizaciones para:

- bloquear la duración de las consultas
- bloquear ejecuciones de consultas
- el número de consultas en espera

Puedes buscar y filtrar las consultas o muestras. Haz clic en cualquier fila de consulta individual para ver los detalles.

{{< img src="database_monitoring/db-list-blocking-queries.png" alt="Pestaña Bloqueo de consultas del panel de detalles de un host de base de datos individual en la página Bases de datos" style="width:90%;" >}}

## Llamadas de servicios

En la pestaña **Llamadas de servicios** del panel de detalles del host puedes ver la lista de servicios que han llamado al host. La información que se muestra de los servicios incluye cuándo se desplegó el servicio, el número de solicitudes realizadas al host por segundo, cuántas consultas a la base de datos se ejecutaron y más.

{{< img src="database_monitoring/db-list-calling-services.png" alt="Pestaña Llamadas de servicios del panel de detalles de un host de base de datos individual en la página Bases de datos" style="width:90%;" >}}

Haz clic en cualquier fila de servicio para ver su dashboard de APM.

## Detalles de configuración

<div class="alert alert-info">El host debe tener <code>collect_settings</code> activado en la <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L397">configuración de sus instancias</a> para que esta característica funcione correctamente.</div>

La pestaña **Configuración** del panel de detalles del host proporciona una visión directa de los parámetros de configuración del host sin comprometer la seguridad de la base de datos. Utilízala para identificar parámetros de base de datos mal configurados y ajustar la configuración para optimizar el rendimiento de la base de datos.

{{< img src="database_monitoring/db-list-configuration.png" alt="Pestaña Configuración del panel de detalles de un host de base de datos individual en la página Bases de datos" style="width:90%;" >}}

[1]: https://app.datadoghq.com/databases