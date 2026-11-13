---
description: Explore y analice esquemas de base de datos, incluyendo tablas, columnas
  e índices.
title: Exploración de esquemas de base de datos
---
Los esquemas le ayudan a hacer un seguimiento del rendimiento, del uso y de los cambios en sus modelos de datos, permitiendo una identificación y corrección de problemas más rápida.

<div class="alert alert-info">Seguimiento de esquemas está disponible para PostgreSQL, SQL Server y MySQL.</div>

{{< img src="database_monitoring/dbm-schemas-page.png" alt="Página de esquemas que muestra las tablas de base de datos rastreadas y las métricas a nivel de esquema en Datadog" style="width:100%;" >}}

## Configuración {#configuration}

Para habilitar la función de esquemas, agregue el parámetro `collect_schemas` a su configuración de Database Monitoring:

```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    collect_schemas:
      enabled: true
    ## Optional: Connect to a different database if needed for `custom_queries`
    # dbname: '<DB_NAME>'
```

### Ajuste de la recopilación de esquemas {#tuning-schema-collection}

Las opciones `collect_schemas` disponibles y sus valores predeterminados difieren según el motor de base de datos.

{{< tabs >}}
{{% tab "Postgres" %}}

| Opción | Predeterminado | Descripción |
|---|---|---|
| `enabled` | `true` | Establezca en `false` para deshabilitar la recopilación de esquemas. Habilitado de forma predeterminada para las versiones 7.80.0 y posteriores del Datadog Agent. |
| `max_tables` | `300` | Número máximo de tablas que el Agent recopila de la instancia. Las tablas que excedan este límite no se recopilan. |
| `max_columns` | `50` | Número máximo de columnas que el Agent recopila por tabla. |
| `max_query_duration` | `60` | Duración máxima, en segundos, de la consulta que recopila información del esquema. |
| `collection_interval` | `600` | Intervalo, en segundos, entre las ejecuciones de recopilación de esquemas. |

```yaml
collect_schemas:
  enabled: true
  max_tables: 1000
```

<div class="alert alert-info">Si las particiones cuentan para el límite de PostgreSQL <code>max_tables</code> depende del método de particionamiento. Particionamiento declarativo (<code>PARTITION BY</code>, PostgreSQL 10 y versiones posteriores) cuenta una tabla una vez independientemente del número de particiones, pero el particionamiento por herencia (<code>INHERITS</code>, la única opción en PostgreSQL 9.6) cuenta el padre y cada hijo por separado. Esto significa que las bases de datos particionadas por herencia pueden alcanzar el límite predeterminado de 300 con muchas menos tablas lógicas de lo esperado, desplazando a otras tablas. Si faltan tablas en la página de Esquemas, verifique si hay particionamiento por herencia y aumente <code>max_tables</code> en consecuencia.</div>

Aumentar `max_tables` incrementa el costo de cada ejecución de recolección. En instancias con una gran cantidad de tablas, considere también aumentar `max_query_duration` y `collection_interval` para reducir la carga en la base de datos.
{{% /tab %}}

{{% tab "SQL Server" %}}

| Opción | Predeterminado | Descripción |
|---|---|---|
| `enabled` | `false` | Establezca en `true` para habilitar la recolección de esquemas. |
| `max_tables` | `300` | Número máximo de tablas que el Agent recopila de la instancia. Las tablas que excedan este límite no se recopilan. |
| `collection_interval` | `600` | Intervalo, en segundos, entre las ejecuciones de recopilación de esquemas. |

```yaml
collect_schemas:
  enabled: true
  max_tables: 1000
```
{{% /tab %}}

{{% tab "MySQL" %}}

| Opción | Predeterminado | Descripción |
|---|---|---|
| `enabled` | `false` | Establezca en `true` para habilitar la recolección de esquemas. |
| `collection_interval` | `600` | Intervalo, en segundos, entre las ejecuciones de recolección de esquemas. |
| `max_execution_time` | `60` | Duración máxima, en segundos, de la consulta que recolecta la información del esquema. |

```yaml
collect_schemas:
  enabled: true
  collection_interval: 300
```
{{% /tab %}}
{{< /tabs >}}

## Descripción general de tablas {#tables-overview}

La descripción general de tablas enumera todas las tablas rastreadas en sus bases de datos, agrupadas por nombre de tabla, con las siguientes columnas:

| Columna         | Descripción                                                                                                                                                                                          |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| N.º de variantes    | Número de versiones distintas de la tabla en todos los hosts.                                                                                                                                           |
| N.º de instancias   | Número total de instancias de tabla en todos los hosts. Por ejemplo, si una tabla tiene dos variantes con siete y ocho instancias respectivamente, el número total de instancias es 15.                         |
| N.º de columnas     | Recuento de columnas únicas en todas las variantes de la tabla en todos los hosts. Por ejemplo, si una variante tiene las columnas A, B, C y otra tiene A, B, D, el total de columnas únicas sería cuatro (A, B, C, D). |
| Bases de datos      | Nombres de todas las bases de datos que contienen esta tabla en todos los hosts.                                                                                                                                       |
| Esquemas        | Esquemas en los que aparece esta tabla en todos los hosts.                                                                                                                                                |
| Hosts de base de datos | Hosts donde está presente esta tabla.                                                                                                                                                                   |

Cada fila de la tabla se puede expandir para la visualización de sus variantes de tabla y las siguientes columnas:

| Columna         | Descripción                                                            |
|----------------|------------------------------------------------------------------------|
| ID de variante     | Identificador único para una variante (versión) de esta tabla.               |
| N.º de instancias   | Número de instancias de esta tabla para esta variante.                    |
| N.º de columnas     | Número de columnas únicas en esta variante de tabla.                        |
| Bases de datos      | Lista ordenada alfabéticamente de las bases de datos que contienen esta variante de tabla. |
| Esquemas        | Lista ordenada alfabéticamente de los esquemas que contienen esta variante de tabla.   |
| Hosts de base de datos | Lista ordenada alfabéticamente de los hosts donde aparece esta variante de tabla.  |

### Visualización de los detalles de la variante de tabla {#viewing-table-variant-details}

Para visualizar más detalles sobre una variante de tabla, haga clic en su fila para abrir el panel de variantes de tabla.

{{< img src="database_monitoring/table-variant-panel.png" alt="Panel de variantes de tabla que muestra las definiciones de columna y un índice para la tabla de inventario" style="width:100%;" >}}

Este panel le muestra información sobre la variante (versión), como:

- {{< ui >}}Definition{{< /ui >}}: Incluye columnas, índices y claves foráneas para esta variante de tabla.
- {{< ui >}}Table Instances{{< /ui >}}: Todas las instancias asociadas con esta variante de tabla.
- {{< ui >}}Metrics{{< /ui >}}: Tamaño de la tabla, escaneos secuenciales y otras métricas relacionadas (últimos 7 días por defecto).
- {{< ui >}}Queries{{< /ui >}}: Consultas que involucran esta variante de tabla (últimos 7 días por defecto).
- {{< ui >}}Changes{{< /ui >}}: Cambios de esquema que afectan esta variante de tabla (últimos 7 días por defecto).

### Ver detalles de la instancia de tabla {#viewing-table-instance-details}

Para visualizar los detalles de una instancia de tabla específica, vaya a la pestaña {{< ui >}}Table Instances{{< /ui >}} en el panel de variante de tabla y haga clic en una fila.

{{< img src="database_monitoring/table-instance-details.png" alt="Panel de instancia de tabla que muestra los detalles de columnas e índices para la tabla de inventario." style="width:100%;" >}}

Esto abre una vista similar al panel de variante de tabla, que muestra la siguiente información para la instancia de tabla seleccionada:

- {{< ui >}}Definition{{< /ui >}}: Incluye columnas, índices y claves foráneas para esta instancia de tabla.
- {{< ui >}}Metrics{{< /ui >}}: Tamaño de la tabla, escaneos secuenciales y otras métricas relacionadas (últimos 7 días por defecto).
- {{< ui >}}Queries{{< /ui >}}: Consultas que involucran esta instancia de tabla (últimos 7 días por defecto).
- {{< ui >}}Changes{{< /ui >}}: Cambios de esquema que afectan esta instancia de tabla (últimos 7 días por defecto).

## Recomendaciones {#recommendations}

Las recomendaciones destacan posibles oportunidades para la optimización del esquema en sus tablas.

Cada recomendación incluye:

- Un problema detectado, como una clave primaria faltante o un índice ineficiente.
- Una explicación de por qué el problema es importante y cómo afecta el rendimiento o la integridad de la base de datos.
- Una solución sugerida, a menudo una sentencia SQL que puede ejecutarse en la base de datos afectada.

Las recomendaciones están disponibles de forma agregada (en la parte superior de la página) y por tabla, donde cada tabla aplicable muestra sus recomendaciones correspondientes. Para obtener más información, consulte [Recommendations][1].

## Resumen de métricas {#metrics-overview}

La descripción general de métricas muestra tableros para las métricas asociadas con las tablas rastreadas en cada DBMS.

{{< img src="database_monitoring/metrics-overview.png" alt="Descripción general de métricas que muestra el recuento total de instancias de tabla y métricas de actividad clave en las instancias de base de datos rastreadas" style="width:100%;" >}}

Cada tablero incluye las siguientes métricas:

- Recuento total de instancias de tabla  
- Instancias que cambian más rápido (%)  
- Instancias que cambian más rápido (bytes)  
- Instancias más accedidas
- Instancias de mayor tamaño  
- Instancias con la mayor cantidad de filas activas  
- Instancias con los tamaños de índice más grandes  
- Instancias con bloqueos de acceso exclusivo  
- Instancias con la mayor cantidad de filas muertas  
- Instancias con la antigüedad de último vacuum más larga  
- Instancias con la antigüedad de último auto vacuum más larga

[1]: /es/database_monitoring/recommendations
[2]: https://app.datadoghq.com/databases/list