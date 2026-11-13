---
aliases:
- /es/database_monitoring/custom_metrics/exploring_custom_metrics
description: Utilice la opción custom_queries para recopilar métricas de sus propias
  tablas de base de datos y visualizarlas en Database Monitoring.
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /metrics/types/
  tag: Documentación
  text: Tipos de métricas
title: Custom Metrics en Database Monitoring
---
Utilice `custom_queries` para recopilar métricas de cualquier tabla que el usuario de base de datos del Agent pueda leer. Esto extiende los datos disponibles en Datadog más allá de las métricas de rendimiento de consultas que Database Monitoring recopila de forma nativa, como tablas de estado de aplicaciones, contadores de negocios o profundidades de cola.

## Antes de comenzar {#before-you-begin}

El Datadog Agent debe estar instalado y la integración de la base de datos configurada. El usuario de base de datos del Agent necesita `SELECT` en cualquier tabla que consulte.

## Configuración {#configuration}

Agregue `custom_queries` al archivo `conf.yaml` de su integración. Cada entrada en la lista ejecuta una consulta SQL y asigna sus columnas de salida a métricas o etiquetas.

| Opción | Requerida | Descripción |
| --- | --- | --- |
| `metric_prefix` | No | Todas las métricas emitidas por esta consulta comienzan con este prefijo. |
| `query` | Sí | El SQL que se debe ejecutar. Se evalúan todas las filas devueltas. Utilice el carácter de barra vertical (`\|`) para consultas de varias líneas. |
| `columns` | Sí | Una lista de columnas en el mismo orden que su `SELECT`. Cada columna requiere un `name` y un `type`. Establezca `type` en `gauge`, `count`, `rate` u otro [tipo de métrica][1] para emitir una métrica, o en `tag` para aplicar el valor de la columna como una etiqueta en cada métrica de esta consulta. |
| `tags` | No | Una lista de etiquetas estáticas aplicadas a cada métrica de esta consulta. |
| `collection_interval` | No | Con qué frecuencia, en segundos, el Agent ejecuta la consulta. Predeterminado: cada 15 segundos. |

Si configura `metric_prefix`, las métricas se denominan `<metric_prefix>.<column_name>`. De lo contrario, se aplica el prefijo predeterminado de la integración. Por ejemplo, las métricas de Postgres se denominan `postgresql.<column_name>` y las métricas de MySQL se denominan `<column_name>`.

**Notas:**
- La cantidad de entradas de `columns` debe ser igual a la cantidad de columnas devueltas por la consulta.
- El orden de las entradas de `columns` debe coincidir con el orden de las columnas devueltas por la consulta.
- Al menos una entrada en `columns` debe ser un tipo de métrica (no `tag`).

### Tipos de columna {#column-types}

A cada columna en una consulta personalizada se le asigna un tipo que controla cómo se agrega y muestra la métrica:

| Tipo | Descripción |
| --- | --- |
| `gauge` | Un valor que puede subir o bajar (por ejemplo, el tamaño de la tabla). |
| `count` | Un conteo de eventos desde la última recolección. |
| `rate` | Una tasa por segundo. |
| `monotonic_count` | Un contador que solo aumenta. |
| `monotonic_gauge` | Un gauge que aumenta de forma monótona. |
| `temporal_percent` | Un porcentaje de tiempo. |
| `time_elapsed` | Duración en unidades de tiempo. |
| `tag` | Agrupa o filtra métricas; no se representa en un gráfico propio. |

Las columnas `count` y `monotonic_count` se agregan como `sum`. Todos los demás tipos de métricas se agregan como `avg`.

## Ejemplos {#examples}

{{< tabs >}}
{{% tab "PostgreSQL" %}}

Agregue `custom_queries` a su archivo `postgres.d/conf.yaml`.

Si la consulta lee de una tabla a la que el usuario `datadog` aún no puede acceder, otorgue el permiso primero:

```sql
GRANT SELECT ON <TABLE_NAME> TO datadog;
```

**Ejemplo:** La siguiente tabla `company` contiene registros de empleados:

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

Para recopilar `age` y `salary` como métricas con `name` y `address` como etiquetas:

```yaml
custom_queries:
  - metric_prefix: postgresql.employee
    query: SELECT age, salary, name, address FROM company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

Después de actualizar el archivo, [reinicie el Agent][2].

Para obtener la referencia de configuración completa, consulte [Recopilación de métricas personalizadas de Postgres][3].

[2]: /es/agent/configuration/agent-commands/#restart-the-agent
[3]: /es/integrations/faq/postgres-custom-metric-collection-explained/
{{% /tab %}}

{{% tab "MySQL" %}}

Agregue `custom_queries` a su archivo `mysql.d/conf.yaml`.

**Importante:** Todas las referencias a tablas deben incluir el nombre de la base de datos (`database_name.table_name`). Si omite el nombre de la base de datos, el Agent falla con el error: `No database selected`.

**Ejemplo:** La siguiente tabla `company` en la base de datos `testdb` contiene registros de empleados:

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

Para recopilar `age` y `salary` como métricas con `name` y `address` como etiquetas:

```yaml
custom_queries:
  - metric_prefix: mysql.employee
    query: SELECT age, salary, name, address FROM testdb.company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

Después de actualizar el archivo, [reinicie el Agent][2].

Para obtener la referencia de configuración completa, consulte [Consultas personalizadas de MySQL][3].

[2]: /es/agent/configuration/agent-commands/#restart-the-agent
[3]: /es/integrations/guide/mysql-custom-queries/
{{% /tab %}}

{{% tab "SQL Server" %}}

SQL Server admite dos enfoques para recopilar métricas personalizadas: [consultas personalizadas](#custom-queries) o [contadores de rendimiento](#performance-counters).

### Consultas personalizadas {#custom-queries}

Agregue `custom_queries` a su archivo `sqlserver.d/conf.yaml` para recopilar métricas de cualquier tabla.

**Ejemplo:** La siguiente tabla `company` en `testdb` contiene registros de empleados:

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

Para recopilar `age` y `salary` como métricas con `name` y `address` como etiquetas:

```yaml
custom_queries:
  - metric_prefix: sqlserver.employee
    query: SELECT age, salary, name, address FROM testdb.dbo.company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

### Contadores de rendimiento {#performance-counters}

Utilice `custom_metrics` para recopilar métricas de `sys.dm_os_performance_counters` y otras DMV del sistema.

```yaml
custom_metrics:
  - name: sqlserver.clr.execution
    counter_name: CLR Execution
```

| Opción | Requerida | Descripción |
| --- | --- | --- |
| `name` | Sí | El nombre de la métrica en Datadog. |
| `counter_name` | Sí | El nombre del contador de `sys.dm_os_performance_counters`. |
| `instance_name` | No | Una instancia de contador específica. Use `ALL` para recopilar todas las instancias (requiere `tag_by`). |
| `tag_by` | No | Nombre de etiqueta utilizado para diferenciar instancias cuando `instance_name: ALL`. |

Después de actualizar el archivo, [reinicie el Agent][2].

Para obtener la referencia de configuración completa, incluidos los detalles del contador de rendimiento y el método de procedimiento almacenado heredado, consulte [Collect SQL Server Custom Metrics][3].

[2]: /es/agent/configuration/agent-commands/#restart-the-agent
[3]: /es/integrations/guide/collect-sql-server-custom-metrics/
{{% /tab %}}
{{< /tabs >}}

## Validación {#validation}

Después de que el Agent se ejecute, busque sus métricas en el [Metrics Explorer][4].

Para verificar si hay errores de configuración, [ejecute el subcomando de estado del Agent][5] y busque su integración en la sección Checks:

```text
postgres
--------
  - instance #0 [ERROR]: 'Missing metric_prefix parameter in custom_queries'
  - Collected 0 metrics, 0 events & 0 service checks
```

## Explore las métricas personalizadas {#explore-custom-metrics}

La sección {{< ui >}}Custom Metrics{{< /ui >}} aparece en la página de detalles de la instancia de base de datos y muestra gráficos de series temporales para cualquier consulta personalizada que haya definido en la configuración de su Datadog Agent.

Si ha configurado `custom_queries` en la integración de base de datos de su Datadog Agent, esta sección detecta automáticamente esas consultas y visualiza cada columna de métrica como un gráfico de series temporales. Los gráficos están limitados a la instancia de base de datos actual. Esto le permite hacer un seguimiento de las métricas de base de datos específicas del negocio o del entorno junto con las métricas estándar de Database Monitoring, todo en un solo lugar. La sección Custom Metrics se oculta si no hay consultas personalizadas configuradas.

### Ejemplo de configuración del Agent {#example-agent-configuration}

El siguiente ejemplo de PostgreSQL rastrea el tamaño de la tabla y el conteo de filas por tabla:

```yaml
init_config:

instances:
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: <PASSWORD>
    custom_queries:
      - metric_prefix: postgresql.custom
        query: |
          SELECT
            table_name,
            pg_total_relation_size(quote_ident(table_name)) AS total_bytes,
            n_live_tup                                       AS live_rows,
            n_dead_tup                                       AS dead_rows
          FROM information_schema.tables
          JOIN pg_stat_user_tables USING (table_name)
          WHERE table_schema = 'public'
        columns:
          - name: table_name
            type: tag
          - name: total_bytes
            type: gauge
          - name: live_rows
            type: gauge
          - name: dead_rows
            type: gauge
        collection_interval: 60
        tags:
          - env:production
          - service:my-app
```

Esta configuración produce tres métricas, cada una desglosada por `table_name`:

- `postgresql.custom.total_bytes`
- `postgresql.custom.live_rows`
- `postgresql.custom.dead_rows`

Las tres aparecen como gráficos de series temporales separados en la sección Custom Metrics de la página de detalles de la instancia.

### Visualice el SQL fuente {#view-the-source-sql}

Cada gráfico tiene un botón {{< ui >}}View SQL query{{< /ui >}} en la esquina superior derecha. Al hacer clic en él se muestra la sentencia SQL sin procesar que genera la métrica, para que pueda comprender y auditar lo que se está midiendo.

### Intervalo de recolección {#collection-interval}

El subtítulo de la sección muestra con qué frecuencia se recopilan las métricas (por ejemplo, "collected every 15s"). Si tiene varias consultas personalizadas con diferentes intervalos, se muestra el rango (por ejemplo, "collected every 15s-60s").

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/types/
[4]: /es/metrics/explorer/
[5]: /es/agent/configuration/agent-commands/#agent-status-and-information