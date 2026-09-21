---
aliases:
- /es/database_monitoring/sql_extended_events
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /database_monitoring/setup_sql_server/
  tag: Documentación
  text: Configuración de SQL Server
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentación
  text: Configuración de la captura de consultas con valores de parámetros
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Database Monitoring
title: Configuración de la finalización de consultas y la captura de errores de consulta
  en SQL Server
---
Esta función recopila eventos de finalización de consultas y errores de consulta de sus instancias de SQL Server mediante eventos extendidos (XE). Proporciona visibilidad sobre:
- Métricas y comportamiento de las consultas SQL con valores de parámetros
- Errores y tiempos de espera que ocurrieron durante la ejecución

Para obtener información sobre la captura de parámetros de consulta en diferentes sistemas de bases de datos, consulte [Configuración de la captura de consultas con valores de parámetros][1].

[1]: /es/database_monitoring/guide/parameterized_queries/

Estos datos son útiles para:
- Análisis de rendimiento
- Depuración del comportamiento de la aplicación
- Auditoría de errores o tiempos de espera inesperados


## Antes de comenzar {#before-you-begin}

Debe configurar Database Monitoring para su instancia de [SQL Server][1] antes de continuar con esta guía.


Bases de datos compatibles
: SQL Server

Implementaciones compatibles
: Todos los tipos de implementación.

Versiones de Agent compatibles
: 7.67.0+

## Configuración {#setup}
{{< tabs >}}
{{% tab "SQL Server que no es de Azure" %}}

1. En su instancia de SQL Server, cree las siguientes sesiones de Extended Events (XE). Estas sesiones se pueden crear en cualquier base de datos dentro de la instancia.

La sesión XE `datadog_query_completions` captura consultas SQL de larga duración (más de 1 segundo) de llamadas RPC, lotes SQL y procedimientos almacenados.

```sql
-- Query completions: RPC, batch, and stored procedure events
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON SERVER;
GO

CREATE EVENT SESSION datadog_query_completions ON SERVER -- datadog requires this exact session name
ADD EVENT sqlserver.rpc_completed ( -- capture remote procedure call completions
    ACTION ( -- datadog requires these exact actions for rpc_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.sql_batch_completed( -- capture batch completions
    ACTION ( -- datadog requires these exact actions for sql_batch_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.module_end( -- capture stored procedure completions
    SET collect_statement = (1)
    ACTION ( -- datadog requires these exact actions for module_end
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not exceed 1024, values above 1 MB may result in data loss due to SQLServer internals
    TRACK_CAUSALITY = ON, -- allows datadog to correlate related events across activity ID
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems (not supported on RDS)
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_completions ON SERVER STATE = START;
GO
```

La sesión XE datadog_query_errors captura errores SQL de [severity ≥ 11][1] y tiempos de espera de consulta (también conocidos como [attention events][2]), lo que permite a Datadog informar sobre fallas y tiempos de espera de consulta.

```sql
-- Errors and timeouts: SQL errors and attention events
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON SERVER;
GO
CREATE EVENT SESSION datadog_query_errors ON SERVER
ADD EVENT sqlserver.error_reported(
    ACTION( -- datadog requires these exact actions for error_reported
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE severity >= 11
),
ADD EVENT sqlserver.attention(
    ACTION( -- datadog requires these exact actions for attention
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not change, setting this larger than 1 MB may result in data loss due to SQLServer internals
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems (not supported on RDS)
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_errors ON SERVER STATE = START;
GO
```

   **Nota**: Si utiliza Amazon RDS para SQL Server, elimine la línea `MEMORY_PARTITION_MODE = PER_NODE` de ambas configuraciones de sesión, ya que esta opción no es compatible con las instancias de RDS.

2. En la configuración de Datadog Agent, habilite `collect_xe` en `sqlserver.d/conf.yaml`.
Consulte el [sample conf.yaml.example][3] para ver todas las opciones de configuración disponibles.

```yaml
  collect_xe:
    query_completions:
      enabled: true
    query_errors:
      enabled: true
```
Para recopilar sentencias de consulta con valores de parámetros, habilite `collect_raw_query_statement` en `sqlserver.d/conf.yaml`. Para obtener más información sobre la captura de parámetros, consulte [Configuring Query Capture with Parameter Values][1].

```yaml
  collect_raw_query_statement:
    enabled: true
```

<div class="alert alert-info">Las sentencias de consulta sin procesar pueden contener información confidencial (por ejemplo, contraseñas en el texto de la consulta) o información de identificación personal. Habilitar esta opción permite a Datadog recopilar e ingerir sentencias de consulta sin procesar que aparecen en las muestras de consulta. Esta opción está deshabilitada de forma predeterminada.</div>

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-error-severities
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/event-classes/attention-event-class
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
{{% /tab %}}

{{% tab "Azure DB" %}}

1. En su base de datos de Azure SQL Server, cree las siguientes sesiones de Extended Events (XE):

La sesión XE `datadog_query_completions` captura consultas SQL de larga duración (más de 1 segundo) de llamadas RPC, lotes SQL y procedimientos almacenados.

```sql
-- Query completions: RPC, batch, and stored procedure events
IF EXISTS (
    SELECT * FROM sys.database_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON DATABASE;
GO

CREATE EVENT SESSION datadog_query_completions ON DATABASE -- datadog requires this exact session name
ADD EVENT sqlserver.rpc_completed ( -- capture remote procedure call completions
    ACTION ( -- datadog requires these exact actions for rpc_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.sql_batch_completed( -- capture batch completions
    ACTION ( -- datadog requires these exact actions for sql_batch_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.module_end( -- capture stored procedure completions
    SET collect_statement = (1)
    ACTION ( -- datadog requires these exact actions for module_end
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not exceed 1024, values above 1 MB may result in data loss due to SQLServer internals
    TRACK_CAUSALITY = ON, -- allows datadog to correlate related events across activity ID
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_completions ON DATABASE STATE = START;
GO
```

La sesión XE datadog_query_errors captura errores SQL de [severity ≥ 11][1] y tiempos de espera de consulta (también conocidos como [attention events][2]), lo que permite a Datadog informar sobre fallas y tiempos de espera de consulta.

```sql
-- Errors and timeouts: SQL errors and attention events
IF EXISTS (
    SELECT * FROM sys.database_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON DATABASE;
GO
CREATE EVENT SESSION datadog_query_errors ON DATABASE
ADD EVENT sqlserver.error_reported(
    ACTION( -- datadog requires these exact actions for error_reported
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE severity >= 11
),
ADD EVENT sqlserver.attention(
    ACTION( -- datadog requires these exact actions for attention
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not change, setting this larger than 1 MB may result in data loss due to SQLServer internals
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_errors ON DATABASE STATE = START;
GO
```

2. En la configuración de Datadog Agent, habilite `collect_xe` en `sqlserver.d/conf.yaml`.
Consulte el [sample conf.yaml.example][3] para ver todas las opciones de configuración disponibles.

```yaml
  collect_xe:
    query_completions:
      enabled: true
    query_errors:
      enabled: true
```
Para recopilar sentencias de consulta con valores de parámetros, habilite `collect_raw_query_statement` en `sqlserver.d/conf.yaml`. Para obtener más información sobre la captura de parámetros, consulte [Configuring Query Capture with Parameter Values][1].

```yaml
  collect_raw_query_statement:
    enabled: true
```

<div class="alert alert-info">Las declaraciones de consulta sin procesar y los planes de ejecución pueden contener información confidencial (por ejemplo, contraseñas en el texto de la consulta) o información de identificación personal. Habilitar esta opción permite a Datadog recopilar e ingerir declaraciones de consulta sin procesar y planes de ejecución que aparecen en muestras de consultas o planes de explicación. Esta opción está deshabilitada de forma predeterminada.</div>

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-error-severities
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/event-classes/attention-event-class
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example

{{% /tab %}}

{{< /tabs >}}

## Ajuste de eventos extendidos para su entorno (opcional) {#tuning-extended-events-for-your-environment-optional}

Puede personalizar las sesiones de eventos extendidos para que se adapten mejor a sus necesidades específicas:

### Umbral de duración de la consulta {#query-duration-threshold}
El umbral de duración de consulta predeterminado es `duration > 1000000` (1 segundo). Ajuste este valor para controlar cuántas consultas se capturan:

- **Capturar más consultas**: reduzca el umbral (por ejemplo, `duration > 500000` para 500 ms)
- **Capturar menos consultas**: aumente el umbral (por ejemplo, `duration > 5000000` para 5 segundos)
<div class="alert alert-danger">Establecer umbrales demasiado bajos puede resultar en una recopilación excesiva de eventos que afecte el rendimiento del servidor, pérdida de eventos debido a desbordamiento del búfer e información incompleta, ya que Datadog solo recopila los 1000 eventos más recientes por intervalo de recopilación.</div>

### Asignación de memoria {#memory-allocation}
- El valor predeterminado es `MAX_MEMORY = 1024 KB`.
- No exceda los 1024 KB, ya que valores más altos pueden causar pérdida de datos debido a [limitaciones internas de SQL Server][3].
- Para servidores de alto volumen, se recomienda mantener esto en un máximo de 1024 KB.
- Para servidores con menor tráfico, una configuración de 512 KB puede ser suficiente.

### Filtrado de eventos {#event-filtering}

Para reducir el volumen de eventos, puede agregar filtros a la cláusula `WHERE`. Por ejemplo:

  ```sql
  WHERE (
      sql_text <> '' AND
      duration > 1000000 AND
      -- Add custom filters here
      database_name = 'YourImportantDB' AND -- Only track specific databases
      username <> 'datadog' -- Exclude Datadog Agent queries or specific users
  )
  ```

### Consideraciones de rendimiento {#performance-considerations}

Los Eventos extendidos están diseñados para ser ligeros, pero pueden introducir cierta sobrecarga. Si nota problemas de rendimiento, considere hacer lo siguiente:

- [Aumente el umbral de duración de la consulta](#query-duration-threshold) para limitar las consultas capturadas.
- [Agregue filtros más específicos](#event-filtering) para reducir el volumen de eventos.
- Deshabilite una o ambas sesiones durante los períodos de carga máxima ejecutando:

```sql
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON SERVER;
GO
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON SERVER;
GO
```

### Consideraciones específicas de Azure {#azure-specific-considerations}

Los entornos de Azure SQL Database suelen tener recursos más limitados. Para minimizar el impacto en el rendimiento:

- [Utilice filtros más restrictivos](#event-filtering) si se encuentra en un nivel de servicio inferior.
- Si está utilizando grupos elásticos, haga un seguimiento del impacto en el rendimiento en todas las bases de datos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/setup_sql_server/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://techcommunity.microsoft.com/blog/sqlserversupport/you-may-not-see-the-data-you-expect-in-extended-event-ring-buffer-targets8230-/315838