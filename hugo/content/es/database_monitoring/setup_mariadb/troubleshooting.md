---
description: Solucione problemas de la configuración de Database Monitoring
title: Solucione problemas de la configuración de Database Monitoring para MariaDB
---
Esta página detalla problemas comunes con la configuración y el uso de Database Monitoring con MariaDB, y cómo resolverlos. Datadog recomienda mantenerse en la versión estable más reciente del Agent y seguir la [documentación de configuración][1] más reciente, ya que puede cambiar con las versiones del Agent.

## Diagnóstico de problemas comunes {#diagnosing-common-problems}

### No se muestran datos después de configurar Database Monitoring {#no-data-is-showing-after-configuring-database-monitoring}

Si no ve ningún dato después de seguir las [instrucciones de configuración][1] y configurar el Agent, lo más probable es que haya un problema con la configuración del Agent o la clave de API. Siga la [guía de solución de problemas][2], que ayuda a confirmar que está recibiendo datos del Agent.

Si está recibiendo otros datos, como métricas del sistema, pero no datos de Database Monitoring (como métricas de consulta y muestras de consulta), probablemente haya un problema con la configuración del Agent o de la base de datos. Compare su configuración del Agent con el ejemplo en las [instrucciones de configuración][1] para verificar que coincida y vuelva a comprobar la ubicación de los archivos de configuración.

Para depurar, comience ejecutando el [comando de estado del Agent][3] para recopilar información de depuración sobre los datos recopilados y enviados a Datadog.

Revise la sección `Config Errors` para confirmar que el archivo de configuración sea válido. Por ejemplo, lo siguiente indica una configuración de instancia faltante o un archivo no válido:

```
  Config Errors
  ==============
    mysql
    -----
      Configuration file contains no valid instances
```

Si la configuración es válida, el resultado se ve así:

```
=========
Collector
=========

  Running Checks
  ==============

    mysql (5.0.4)
    -------------
      Instance ID: mysql:505a0dd620ccaa2a
      Configuration Source: file:/etc/datadog-agent/conf.d/mysql.d/conf.yaml
      Total Runs: 32,439
      Metric Samples: Last Run: 175, Total: 5,833,916
      Events: Last Run: 0, Total: 0
      Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
      Database Monitoring Query Samples: Last Run: 1, Total: 74,451
      Service Checks: Last Run: 3, Total: 95,993
      Average Execution Time : 1.798s
      Last Execution Date : 2021-07-29 19:28:21 UTC (1627586901000)
      Last Successful Execution Date : 2021-07-29 19:28:21 UTC (1627586901000)
      metadata:
        flavor: MariaDB
        version.build: unspecified
        version.major: 10
        version.minor: 11
        version.patch: 6
        version.raw: 10.11.6-MariaDB
        version.scheme: semver
```

Verifique que estas líneas estén en el resultado y tengan valores mayores que cero:

```
Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
Database Monitoring Query Samples: Last Run: 1, Total: 74,451
```

Cuando esté seguro de que la configuración del Agent es correcta, [revise los registros del Agent][4] en busca de advertencias o errores al intentar ejecutar las integraciones de base de datos.

También puede ejecutar explícitamente una verificación ejecutando el comando CLI `check` en el Datadog Agent e inspeccionando el resultado en busca de errores:

```bash
# For self-hosted installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check mysql -t 2

# For container-based installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check mysql -t 2
```

### Faltan planes de ejecución en las consultas {#queries-are-missing-explain-plans}

Es posible que algunas o todas las consultas no tengan planes disponibles. Esto puede deberse a comandos de consulta no admitidos, consultas realizadas por aplicaciones cliente no admitidas, un Agent desactualizado o una configuración de base de datos incompleta. A continuación se presentan las posibles causas de la falta de planes de ejecución.

#### Falta el consumidor de declaraciones de eventos {#events-statements-consumer-missing}
Para capturar planes de ejecución, debe habilitar un consumidor de declaraciones de eventos. Puede hacerlo agregando la siguiente opción a sus archivos de configuración (por ejemplo, `mysql.conf`):

```
performance-schema-consumer-events-statements-current=ON
```

Datadog recomienda además habilitar lo siguiente:

```
performance-schema-consumer-events-statements-history-long=ON
```
Esta opción permite el seguimiento de una mayor cantidad de consultas recientes en todos los hilos. Activarlo aumenta la probabilidad de capturar detalles de ejecución de consultas poco frecuentes.

#### Falta el procedimiento de plan de ejecución {#explain-plan-procedure-missing}
El Agent requiere que el procedimiento `datadog.explain_statement(...)` exista en el esquema `datadog`. Lea las [instrucciones de configuración][1] para obtener detalles sobre la creación del esquema `datadog`.

Cree el procedimiento `explain_statement` para permitir que el Agent recopile planes de ejecución:

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```
#### Falta el procedimiento de plan de ejecución totalmente calificado {#explain-plan-fq-procedure-missing}
El Agent requiere que el procedimiento `explain_statement(...)` exista en **todos los esquemas** de los cuales el Agent puede recopilar muestras.

Cree este procedimiento **en cada esquema** del cual desee recopilar planes de ejecución. Reemplace `<YOUR_SCHEMA>` con su esquema de base de datos:

```sql
DELIMITER $$
CREATE PROCEDURE <YOUR_SCHEMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <YOUR_SCHEMA>.explain_statement TO datadog@'%';
```

#### Agent está ejecutando una versión no compatible {#agent-is-running-an-unsupported-version}

Verifique que el Agent esté ejecutando la versión 7.61.0 o una más reciente. Datadog recomienda actualizaciones periódicas del Agent para aprovechar las nuevas funciones, las mejoras de rendimiento y las actualizaciones de seguridad.

#### Las consultas están truncadas {#queries-are-truncated}

Consulte la sección sobre [muestras de consultas truncadas](#query-samples-are-truncated) para obtener instrucciones sobre cómo aumentar el tamaño del texto de las consultas de muestra.

#### La consulta no puede ser explicada {#query-cannot-be-explained}

Algunas consultas, como BEGIN, COMMIT, SHOW, USE y ALTER, no pueden generar un plan de ejecución válido desde la base de datos. Solo las consultas SELECT, UPDATE, INSERT, DELETE y REPLACE tienen soporte para planes de ejecución.

#### La consulta es relativamente infrecuente o se ejecuta rápidamente {#query-is-relatively-infrequent-or-executes-fast}

Es posible que la consulta no haya sido muestreada para su selección porque no representa una proporción significativa del tiempo total de ejecución de la base de datos. Intente [aumentar las tasas de muestreo][5] para capturar la consulta.

### Faltan métricas de consulta {#query-metrics-are-missing}

Antes de seguir estos pasos para diagnosticar la falta de datos de métricas de consulta, verifique que el Agent se esté ejecutando correctamente y que haya seguido [los pasos para diagnosticar la falta de datos del Agent](#no-data-is-showing-after-configuring-database-monitoring). A continuación se presentan las posibles causas de la falta de métricas de consulta.

Las métricas de las sentencias preparadas requieren MariaDB 10.5.2 o posterior (`performance_schema.prepared_statements_instances`). Las métricas de consulta de `events_statements_summary_by_digest` se recopilan en todas las versiones compatibles de MariaDB.

Si `performance_schema` está deshabilitado, no se recopilan ni las métricas de consulta ni las métricas de las sentencias preparadas. Vea [`performance_schema` no está habilitado](#performance-schema-not-enabled).

### Faltan métricas de índice {#index-metrics-are-missing}

Si el Agent muestra este error:

```
Error querying mysql.innodb_index_stats: (1142, "SELECT command denied to user 'datadog'@'172.20.0.5' for table 'innodb_index_stats'")
```
Resuelva el error otorgando al usuario `datadog` el privilegio SELECT para recopilar métricas de índice:

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

#### `performance_schema` no está habilitado {#performance-schema-not-enabled}
El Agent requiere que la opción `performance_schema` esté habilitada. **A diferencia de MySQL, MariaDB no habilita `performance_schema` de forma predeterminada.** Siga las [instrucciones de configuración][1] para habilitarlo.

### Faltan consultas de bloqueo o están incompletas {#blocking-queries-are-missing-or-incomplete}

#### La recopilación de consultas de bloqueo está deshabilitada {#blocking-query-collection-is-disabled}

La recopilación de consultas de bloqueo está deshabilitada de forma predeterminada. Habilítela con `query_activity.collect_blocking_queries: true` en la configuración de su instancia. No requiere permisos adicionales más allá de los privilegios `PROCESS` y `SELECT ON performance_schema.*` de las [instrucciones de configuración][1].

#### Menos columnas de consulta de bloqueo que en MySQL 8.0 {#fewer-blocking-query-columns-than-mysql-80}

MariaDB siempre utiliza el mismo conjunto más simple de columnas de consulta de bloqueo y uniones que utiliza MySQL 5.7, incluso en las versiones más recientes de MariaDB. Las columnas de consulta de bloqueo más completas disponibles en MySQL 8.0 no están disponibles en MariaDB.

#### Los recuentos de interbloqueos parecen planos {#deadlock-counts-appear-flat}

El recuento de interbloqueos no se actualiza en MariaDB. La métrica de interbloqueo puede permanecer en cero independientemente de los interbloqueos reales que ocurran en la base de datos.

### Faltan ciertas consultas {#certain-queries-are-missing}

Si tiene datos de algunas consultas, pero espera ver una consulta o un conjunto de consultas en particular en Database Monitoring, siga esta guía.


| Posible causa                         | Solución                                  |
|----------------------------------------|-------------------------------------------|
| La consulta no es una "consulta principal", lo que significa que la suma de su tiempo total de ejecución no se encuentra entre las 200 consultas normalizadas principales en ningún punto del período de tiempo seleccionado. | Puede estar agrupada en la fila "Otras consultas". Para obtener más información sobre qué consultas se rastrean, consulte [Datos recopilados][7]. La cantidad de consultas principales rastreadas puede aumentarse contactando al soporte de Datadog. |
| Es posible que `events_statements_summary_by_digest` esté lleno. | La tabla de MariaDB `events_statements_summary_by_digest` en `performance_schema` tiene un límite máximo en la cantidad de resúmenes (consultas normalizadas) que almacena. El truncamiento regular de esta tabla como tarea de mantenimiento ayuda a realizar un seguimiento de todas las consultas a lo largo del tiempo. Consulte [Configuración avanzada][5] para obtener más información. |
| La consulta se ha ejecutado una sola vez desde que el Agent se reinició por última vez. | Las métricas de consulta solo se emiten después de haberse ejecutado al menos una vez durante dos intervalos separados de diez segundos desde que se reinició el Agent. |

### Las muestras de consulta están truncadas {#query-samples-are-truncated}

Es posible que las consultas más largas no muestren su texto SQL completo debido a la configuración de la base de datos. Es necesario realizar algunos ajustes para adaptarse a su carga de trabajo.

La longitud del texto SQL de MariaDB visible para el Datadog Agent está determinada por las siguientes [variables de sistema][8]:

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema_max_sql_text_length=4096
```

### Falta la actividad de consulta {#query-activity-is-missing}

Antes de seguir estos pasos para diagnosticar la falta de actividad de consulta, verifique que el Agent se esté ejecutando correctamente y que haya seguido [los pasos para diagnosticar la falta de datos del Agent](#no-data-is-showing-after-configuring-database-monitoring). A continuación se presentan las posibles causas de la falta de actividad de consulta.

#### `performance-schema-consumer-events-waits-current` no está habilitado {#events-waits-current-not-enabled}
El Agent requiere que la opción `performance-schema-consumer-events-waits-current` esté habilitada. Está deshabilitada de forma predeterminada. Siga las [instrucciones de configuración][1] para habilitarlo. Alternativamente, para evitar reiniciar su base de datos, considere configurar un consumidor de configuración en tiempo de ejecución. Cree el siguiente procedimiento para darle al Agent la capacidad de habilitar consumidores `performance_schema.events_*` en tiempo de ejecución.


```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name = 'events_waits_current';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

**Nota:** Esta opción requiere adicionalmente que `performance_schema` esté habilitado.

### Faltan tablas en los esquemas recopilados {#tables-are-missing-from-collected-schemas}

Si el Agent registra una advertencia que comienza con:

```
No tables were found across any of the N databases.
```
MariaDB expone una tabla en `INFORMATION_SCHEMA` solo a los usuarios que tienen un privilegio sobre esa tabla, por lo que el usuario `datadog` no ve ninguna tabla sin dicho privilegio. Resuelva la advertencia otorgando el privilegio `REFERENCES`, lo que hace que los metadatos de su tabla sean visibles sin darle al Agent ninguna capacidad para leer sus datos:

```sql
GRANT REFERENCES ON *.* TO datadog@'%';
```

Consulte [Recopilación de esquemas][10] para obtener más información.

### Esquema o base de datos faltante en métricas y muestras de consultas de MariaDB {#schema-or-database-missing-on-mariadb-query-metrics-samples}

La etiqueta `schema` (también conocida como "base de datos") está presente en las métricas y muestras de consultas de MariaDB solo cuando se establece una base de datos predeterminada en la conexión que realizó la consulta. La base de datos predeterminada se configura mediante la aplicación especificando el "esquema" en los parámetros de conexión de la base de datos, o ejecutando la [Sentencia USE][9] en una conexión ya existente.

Si no hay una base de datos predeterminada configurada para una conexión, entonces ninguna de las consultas realizadas por esa conexión tiene la etiqueta `schema`.

## Limitaciones conocidas de MariaDB {#mariadb-known-limitations}

MariaDB se monitorea utilizando la misma integración de MySQL, y las métricas y eventos se etiquetan con `dbms_flavor:mariadb` para distinguirlos de los datos de MySQL. Las siguientes características difieren de MySQL o no son compatibles con MariaDB.

### Métricas de InnoDB incompatibles {#incompatible-innodb-metrics}

Las siguientes métricas de InnoDB no están disponibles para ciertas versiones de MariaDB:

| Nombre de la métrica                             | Versiones de MariaDB        |
| --------------------------------------- | ----------------------- |
| `mysql.innodb.hash_index_cells_total`   | 10.5, 10.6, 10.11, 11.4 |
| `mysql.innodb.hash_index_cells_used`    | 10.5, 10.6, 10.11, 11.4 |
| `mysql.innodb.os_log_fsyncs`            | 10.11, 11.4             |
| `mysql.innodb.os_log_pending_fsyncs`    | 10.11, 11.4             |
| `mysql.innodb.os_log_pending_writes`    | 10.11, 11.4             |
| `mysql.innodb.pending_log_flushes`      | 10.11, 11.4             |
| `mysql.innodb.pending_log_writes`       | 10.5, 10.6, 10.11, 11.4 |
| `mysql.innodb.pending_normal_aio_reads` | 10.5, 10.6, 10.11, 11.4 |
| `mysql.innodb.pending_normal_aio_writes`| 10.5, 10.6, 10.11, 11.4 |
| `mysql.innodb.rows_deleted`             | 10.11, 11.4             |
| `mysql.innodb.rows_inserted`            | 10.11, 11.4             |
| `mysql.innodb.rows_updated`             | 10.11, 11.4             |
| `mysql.innodb.rows_read`                | 10.11, 11.4             |
| `mysql.innodb.s_lock_os_waits`          | 10.6, 10.11, 11.4       |
| `mysql.innodb.s_lock_spin_rounds`       | 10.6, 10.11, 11.4       |
| `mysql.innodb.s_lock_spin_waits`        | 10.6, 10.11, 11.4       |
| `mysql.innodb.x_lock_os_waits`          | 10.6, 10.11, 11.4       |
| `mysql.innodb.x_lock_spin_rounds`       | 10.6, 10.11, 11.4       |
| `mysql.innodb.x_lock_spin_waits`        | 10.6, 10.11, 11.4       |

### MariaDB explain plan {#mariadb-explain-plan}

MariaDB no produce el mismo formato JSON que MySQL para explain plans. Ciertos campos de explain plan pueden faltar en los explain plans de MariaDB, incluidos `cost_info`, `rows_examined_per_scan`, `rows_produced_per_join` y `used_columns`. La recopilación de explain plans en sí funciona de la misma manera que en MySQL, pero las visualizaciones de explain plans que dependen de estos campos pueden mostrar menos detalles para las consultas de MariaDB.

### `mysql.performance.errors_raised` no se recopila {#mysqlperformanceerrors-raised-is-not-collected}

Esta métrica se recopila solo para MySQL 8.0 y versiones posteriores, y no está disponible para MariaDB.

### Los índices funcionales no se reflejan en los metadatos del esquema {#functional-indexes-arent-reflected-in-schema-metadata}

MariaDB no admite índices funcionales. La recopilación de metadatos de índices siempre utiliza la consulta de índice simple, sin la información de expresión adicional disponible para MySQL 8.0.13 y versiones posteriores.

### Las etiquetas de clúster no son compatibles {#cluster-tags-arent-supported}

Las etiquetas de clúster no se recopilan para MariaDB.

[1]: /es/database_monitoring/setup_mariadb/
[2]: /es/agent/troubleshooting/
[3]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /es/agent/configuration/agent-log-files
[5]: /es/database_monitoring/setup_mariadb/advanced_configuration/
[7]: /es/database_monitoring/data_collected/#which-queries-are-tracked
[8]: https://mariadb.com/kb/en/server-system-variables/#max_digest_length
[9]: https://mariadb.com/kb/en/use/
[10]: /es/database_monitoring/setup_mariadb/selfhosted/#collecting-schemas