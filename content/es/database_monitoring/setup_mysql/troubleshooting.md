---
description: Solución de problemas de configuración de la Monitorización de base de
  datos
title: Solución de problemas de configuración de la Monitorización de base de datos
  para MySQL
---

En esta página, se detallan los problemas más comunes relacionados con la configuración y el uso de la Monitorización de base de datos con MySQL y se explica cómo resolverlos. Datadog recomienda utilizar la última versión estable del Agent y consultar la última [documentación de configuración][1], ya que puede cambiar según las versiones del Agent.

## Diagnóstico de problemas comunes

### No aparecen más datos después de configurar la Monitorización de base de datos

Si no ves ningún dato después de seguir las [instrucciones de configuración][1] y configurar el Agent, lo más probable es que haya un problema con la configuración del Agent o con la clave de API. Asegúrate de que estás recibiendo datos del Agent, consultando la [guía para solucionar problemas][2].

Si recibes otros datos, como métricas del sistema, pero no datos de la Monitorización de base de datos (como métricas de consultas y ejemplos de consultas), es probable que haya un problema con la configuración del Agent o de la base de datos. Asegúrate de que la configuración de tu Agent se parece al ejemplo en las [instrucciones de configuración][1], verificando cuidadosamente la localización de los archivos de configuración.

Para depurar, comienza por ejecutar el [comando de estado del Agent][3] para recopilar información de depuración sobre los datos recopilados y enviados a Datadog.

Consulta la sección `Config Errors` para asegurarte de que el archivo de configuración es válido. Por ejemplo, lo siguiente indica que falta una instancia de configuración o que el archivo no es válido:

```
  Config Errors
  ==============
    mysql
    -----
      Configuration file contains no valid instances
```

Si la configuración es válida, el resultado tendrá el siguiente aspecto:

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
        flavor: MySQL
        version.build: unspecified
        version.major: 5
        version.minor: 7
        version.patch: 34
        version.raw: 5.7.34+unspecified
        version.scheme: semver
```

Asegúrate de que estas líneas están presentes en el resultado y que tienen valores mayores que cero:

```
Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
Database Monitoring Query Samples: Last Run: 1, Total: 74,451
```

Cuando compruebes que la configuración del Agent es correcta, [consulta los logs del Agent][4] para buscar advertencias o errores al intentar ejecutar integraciones de la base de datos.

También puedes realizar explícitamente un check ejecutando el comando CLI `check` en el Datadog Agent e inspeccionando el resultado en busca de errores:

```bash
# Para instalaciones autoalojadas del Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check sqlserver -t 2

# Para instalaciones basadas en contenedores del Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check sqlserver -t 2
```
### En las consultas faltan los planes de explicación

Algunas o todas las consultas pueden no tener planes disponibles. Esto puede deberse a comandos de consulta no compatibles, a consultas realizadas por aplicaciones de cliente no compatibles, a un Agent obsoleto o una configuración incompleta de la base de datos. A continuación se indican las posibles causas de la falta de planes de explicación.

#### Faltan consumidores de sentencias de evento {#events-statements-consumer-missing}
Para capturar planes de explicación, debes habilitar un consumidor de sentencias de evento. Puedes hacerlo añadiendo la siguiente opción a tus archivos de configuración (por ejemplo, `mysql.conf`):
```
performance-schema-consumer-events-statements-current=ON
```

Datadog recomienda además habilitar lo siguiente:
```
performance-schema-consumer-events-statements-history-long=ON
```
Esta opción permite el seguimiento de un mayor número de consultas recientes en todos los subprocesos. Activarla aumenta la probabilidad de capturar detalles de ejecución de consultas poco frecuentes.

#### Falta el procedimiento del plan de explicación {#explain-plan-procedure-missing}
El Agent requiere que el procedimiento `datadog.explain_statement(...)` exista en el esquema `datadog`. Lee las [instrucciones de configuración][1] para obtener información detallada sobre la creación del esquema `datadog`.

Crea el procedimiento `explain_statement` para que el Agent pueda recopilar los planes de explicación:

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
#### Falta el procedimiento completo cualificado para el plan de explicación {#explain-plan-fq-procedure-missing}
El Agent requiere que la función `explain_statement(...)` exista en **todos los esquemas** de los que el Agent puede recopilar muestras.

Crea este procedimiento **en cada esquema** del que desees recopilar planes de explicación. Sustituye `<YOUR_SCHEMA>` por el esquema de tu base de datos:

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

#### El Agent está ejecutando una versión no compatible

Asegúrate de que el Agent ejecuta la versión 7.36.1 o posterior. Datadog recomienda actualizar periódicamente el Agent para aprovechar las nuevas funciones, las mejoras del rendimiento y las actualizaciones de seguridad.

#### Las consultas se truncan

Para obtener instrucciones sobre cómo aumentar el tamaño del texto de las muestras de consultas, consulta la sección sobre [muestras de consultas truncadas](#query-samples-are-truncated).

#### No es posible explicar la consulta

Algunas consultas, como BEGIN, COMMIT, SHOW, USE y ALTER, no pueden generar un plan de explicación válido de la base de datos. Solo las consultas SELECT, UPDATE, INSERT, DELETE y REPLACE admiten planes de explicación.

#### La consulta es relativamente poco frecuente o se ejecuta rápidamente

Es posible que la consulta no haya sido muestreada para su selección porque no representa una proporción significativa del tiempo total de ejecución de la base de datos. Intenta [aumentar las frecuencias de muestreo][5] para capturar la consulta.

### Faltan métricas de consultas

Antes de seguir estos pasos para diagnosticar la falta de datos de métricas de consultas, asegúrate de que el Agent se está ejecutando correctamente y de que has seguido [los pasos para diagnosticar la falta de datos del Agent](#no-data-is-showing-after-configuring-database-monitoring). A continuación, se indican las posibles causas de la falta de métricas de consultas.

#### `performance_schema` no está activado {#performance-schema-not-enabled}
El Agent requiere que la opción `performance_schema` esté habilitada. Está habilitada por defecto por MySQL, pero puede estar deshabilitada en la configuración o por tu proveedor de nube. Sigue las [instrucciones de configuración][1] para habilitarla.

#### Limitación de Google Cloud SQL
El host está gestionado por Google Cloud SQL y no es compatible con `performance_schema`. Debido a las limitaciones de Google Cloud SQL, la Monitorización de base de datos de Datadog [no es compatible con instancias con menos de 16 GB de RAM][6].

### Faltan algunas consultas

Si tienes datos de algunas consultas, pero esperas ver una consulta o conjunto de consultas en particular en la Monitorización de base de datos, sigue esta guía.


| Posible causa                         | Solución                                  |
|----------------------------------------|-------------------------------------------|
| La consulta no es una "consulta principal", lo que significa que la suma de su tiempo total de ejecución no se encuentra entre las 200 primeras consultas normalizadas en ningún momento del periodo seleccionado. | Puede agruparse en la fila "Otras consultas". Para obtener más información sobre qué consultas se rastrean, consulta [Datos recopilados][7]. El número de consultas principales rastreadas puede aumentarse poniéndote en contacto con el servicio de soporte de Datadog. |
| La `events_statements_summary_by_digest` puede estar llena. | La tabla de MySQL `events_statements_summary_by_digest` en `performance_schema` tiene un límite máximo en el número de compendios (consultas normalizadas) que almacena. El truncamiento regular de esta tabla como tarea de mantenimiento asegura que todas las consultas son rastreadas a lo largo del tiempo. Consulta [Configuración avanzada][5] para obtener más información. |
| La consulta se ha ejecutado una sola vez desde el último reinicio del Agent. | Las métricas de consulta solo se emiten después de haber sido ejecutadas al menos una vez en dos intervalos separados de diez segundos desde que se reinició el Agent. |

### Las muestras de consulta se truncan

Es posible que las consultas más largas no muestren la totalidad de su texto SQL debido a la configuración de la base de datos. Es necesario realizar algunos ajustes para adaptarlas a tu carga de trabajo.

La longitud del texto SQL de MySQL visible para el Datadog Agent viene determinada por las siguientes [variables de sistema][8]:

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema_max_sql_text_length=4096
```

### Falta actividad de consulta

<div class="alert alert-danger">La Actividad de consulta y la Recopilación de eventos de espera no son compatibles con Flexible Server, ya que estas características requieren la configuración de MySQL que no están disponibles en un host de Flexible Server.</div>

Antes de seguir estos pasos para diagnosticar la falta de actividad de consulta, asegúrate de que el Agent se está ejecutando correctamente y de que has seguido [los pasos para diagnosticar la falta de datos del Agent](#no-data-is-showing-after-configuring-database-monitoring). A continuación, se indican las posibles causas de la falta de actividad de consulta.

#### `performance-schema-consumer-events-waits-current` no está activado {#events-waits-current-not-enabled}
El Agent requiere que la opción `performance-schema-consumer-events-waits-current` esté habilitada. MySQL la deshabilita por defecto, pero su proveedor de nube puede habilitarla. Sigue las [instrucciones de configuración][1] para habilitarla. Alternativamente, para evitar el rebote de tu base de datos, considera configurar un consumidor de configuración en tiempo de ejecución. Crea el siguiente procedimiento para dar al Agent la capacidad de habilitar consumidores `performance_schema.events_*` en tiempo de ejecución.


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

**Nota:** Esta opción requiere además que `performance_schema` esté activado.


<!-- TODO: add a custom query recipe for getting the max sql text length -->

### Falta el esquema o la base de datos en métricas de consulta y muestras de MySQL

La etiqueta (tag) `schema` (también conocida como "base de datos") está presente en métricas de consulta y muestras de MySQL solo cuando se configura una base de datos predeterminada en la conexión que realizó la consulta. La base de datos predeterminada es configurada por la aplicación especificando el "esquema" en los parámetros de conexión a la base de datos, o ejecutando la [sentencia USE][9] en una conexión ya existente.

Si no hay ninguna base de datos por defecto configurada para una conexión, ninguna de las consultas realizadas por esa conexión tendrá la etiqueta `schema` en ellas.

## Limitaciones conocidas de MariaDB

### Métricas de InnoDB incompatibles

Los siguientes métricas de InnoDB no están disponibles para ciertas versiones de MariaDB:

| Nombre de la métrica                             | Versiones de MariaDB        |
| --------------------------------------- | ----------------------- |
| `mysql.innodb.hash_index_cells_total`   | 10.5, 10.6, 10.11, 11.1 |
| `mysql.innodb.hash_index_cells_used`    | 10.5, 10.6, 10.11, 11.1 |
| `mysql.innodb.os_log_fsyncs`            | 10.11, 11.1             |
| `mysql.innodb.os_log_pending_fsyncs`    | 10.11, 11.1             |
| `mysql.innodb.os_log_pending_writes`    | 10.11, 11.1             |
| `mysql.innodb.pending_log_flushes`      | 10.11, 11.1             |
| `mysql.innodb.pending_log_writes`       | 10.5, 10.6, 10.11, 11.1 |
| `mysql.innodb.pending_normal_aio_reads` | 10.5, 10.6, 10.11, 11.1 |
| `mysql.innodb.pending_normal_aio_writes`| 10.5, 10.6, 10.11, 11.1 |
| `mysql.innodb.rows_deleted`             | 10.11, 11.1             |
| `mysql.innodb.rows_inserted`            | 10.11, 11.1             |
| `mysql.innodb.rows_updated`             | 10.11, 11.1             |
| `mysql.innodb.rows_read`                | 10.11, 11.1             |
| `mysql.innodb.s_lock_os_waits`          | 10.6, 10.11, 11.1       |
| `mysql.innodb.s_lock_spin_rounds`       | 10.6, 10.11, 11.1       |
| `mysql.innodb.s_lock_spin_waits`        | 10.6, 10.11, 11.1       |
| `mysql.innodb.x_lock_os_waits`          | 10.6, 10.11, 11.1       |
| `mysql.innodb.x_lock_spin_rounds`       | 10.6, 10.11, 11.1       |
| `mysql.innodb.x_lock_spin_waits`        | 10.6, 10.11, 11.1       |

### Plan de explicación de MariaDB

MariaDB no produce el mismo formato JSON que MySQL para los planes de explicación. Ciertos campos del plan de explicación pueden faltar en los planes de explicación de MariaDB, incluyendo `cost_info`, `rows_examined_per_scan`, `rows_produced_per_join` y `used_columns`.

[1]: /es/database_monitoring/setup_mysql/
[2]: /es/agent/troubleshooting/
[3]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /es/agent/configuration/agent-log-files
[5]: /es/database_monitoring/setup_mysql/advanced_configuration/
[6]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
[7]: /es/database_monitoring/data_collected/#which-queries-are-tracked
[8]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_digest_length
[9]: https://dev.mysql.com/doc/refman/8.0/en/use.html