---
description: Soluciones para los problemas de configuración de Database Monitoring
  para Postgres
title: Solucionar problemas de configuración de DBM (Database Monitoring) para Postgres
---

En esta página se detallan los problemas más comunes relacionados con la configuración y el uso de Database Monitoring con Postgres y se explica cómo resolverlos. Datadog recomienda utilizar la última versión estable del Agent y consultar la última [documentación de configuración][1], ya que puede cambiar según las versiones del Agent.

## Diagnóstico de problemas comunes

### No aparecen más datos después de configurar Database Monitoring

Si no ves ningún dato después de seguir las [instrucciones de configuración][1] y configurar el Agent, lo más probable es que haya un problema con la configuración del Agent o con la clave de API. Asegúrate de que estás recibiendo datos del Agent, consultando la [guía para solucionar problemas][2].

Si recibes otros datos, como métricas del sistema, pero no los de Database Monitoring (como métricas de consultas y ejemplos de consultas), es probable que haya un problema con la configuración del Agent o de la base de datos. Asegúrate de que la configuración de tu Agent se parece al ejemplo en las [instrucciones de configuración][1], verificando cuidadosamente la localización de los archivos de configuración.

Para depurar, comienza por ejecutar el [comando de estado del Agent][3] para recopilar información de depuración sobre los datos recopilados y enviados a Datadog.

Consulta la sección `Config Errors` para asegurarte de que el archivo de configuración es válido. Por ejemplo, lo siguiente indica que falta una instancia de configuración o que el archivo no es válido:

```
  Config Errors
  ==============
    postgres
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
    postgres (8.0.5)
    ----------------
      Instance ID: postgres:d3dceb9fd36fd57e [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/postgres.d/conf.yaml
      Total Runs: 16,538
      Metric Samples: Last Run: 186, Total: 2,844,362
      Events: Last Run: 0, Total: 0
      Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
      Database Monitoring Query Samples: Last Run: 1, Total: 17,921
      Service Checks: Last Run: 1, Total: 16,538
      Average Execution Time : 1.765s
      Last Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      Last Successful Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      metadata:
        version.major: 10
        version.minor: 17
        version.patch: 0
        version.raw: 10.17
        version.scheme: semver
```

Asegúrate de que estas líneas están presentes en el resultado y que tienen valores mayores que cero:

```
Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
Database Monitoring Query Samples: Last Run: 1, Total: 17,921
```
Cuando compruebes que la configuración del Agent es correcta, [consulta los logs del Agent][4] para buscar advertencias o errores al intentar ejecutar integraciones de la base de datos.

También puedes realizar explícitamente un check ejecutando el comando CLI `check` en el Datadog Agent e inspeccionando el resultado en busca de errores:

```bash
# For self-hosted installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check sqlserver -t 2

# For container-based installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check sqlserver -t 2
```
### Faltan métricas de consultas

Antes de seguir estos pasos para diagnosticar la falta de datos de métricas de consultas, asegúrate de que el Agent se está ejecutando correctamente y de que has seguido [los pasos para diagnosticar la falta de datos del Agent](#no-data-is-showing-after-configuring-database-monitoring). A continuación se indican las posibles causas de la falta de métricas de consultas.

#### Extensión pg_stat_statements no cargada {#pg-stat-statements-not-loaded}
La extensión `pg_stat_statements` no está cargada. La extensión debe cargarse a través de `shared_preload_libraries` en tu configuración de Postgres. (**Nota**: Es necesario reiniciar el servidor para que la carga surta efecto después de modificar esta variable). Para ver más detalles sobre cómo cargar la extensión, consulta las [instrucciones de configuración][1].

#### Extensión pg_stat_statements no creada en la base de datos {#pg-stat-statements-not-created}
La extensión `pg_stat_statements` no está instalada en la base de datos correcta. Debes ejecutar `CREATE EXTENSION pg_stat_statements` en todas las bases de datos a las que se conecta el Agent. Por defecto, el Agent se conecta a la base de datos `postgres`. Para ver más detalles sobre la configuración de esta variable en tu configuración, consulta las [instrucciones de configuración][1].

Para comprobar que `pg_stat_statements` está instalada y es accesible para el usuario `datadog`, conéctate a la base de datos `postgres` e intenta realizar una consulta como usuario `datadog`. Debe aparecer al menos una fila. Por ejemplo:

```bash
psql -h localhost -U datadog -d postgres -c "select * from pg_stat_statements LIMIT 1;"
```

Si has especificado un `dbname` distinto del `postgres` predeterminado en la configuración de tu Agent, debes ejecutar `CREATE EXTENSION pg_stat_statements` en esa base de datos.

Si has creado la extensión en tu base de datos de destino y sigues viendo esta advertencia, es posible que la extensión se haya creado en un esquema al que no puede acceder el usuario `datadog`. Para comprobarlo, ejecuta este comando para verificar en qué esquema se ha creado `pg_stat_statements`:

```bash
psql -h localhost -U datadog -d postgres -c "select nspname from pg_extension, pg_namespace where extname = 'pg_stat_statements' and pg_extension.extnamespace = pg_namespace.oid;"
```

A continuación, ejecuta este comando para verificar qué esquemas son visibles para el usuario `datadog`:

```bash
psql -h localhost -U datadog -d <your_database> -c "show search_path;"
```

Si no ves el esquema `pg_stat_statements` en el usuario `search_path` del usuario `datadog`, deberás añadirlo al usuario `datadog`. Por ejemplo (sustituye `<schema_with_pg_stat_statements>` por el esquema donde se encuentra `pg_stat_statements` ):

```sql
ALTER ROLE datadog SET search_path = "$user",public,<schema_with_pg_stat_statements>;
```

### Faltan algunas consultas

Si tienes datos de algunas consultas, pero no ves una consulta en particular o un conjunto de consultas que esperabas ver en Database Monitoring, sigue esta guía.
| Posible causa                           | Solución                          |
|----------------------------------------|-------------------------------------------|
| En Postgres 9.6, si sólo ves las consultas ejecutadas por el usuario Datadog, es probable que falten algunos parámetros en la configuración de la instancia. | Para la monitorización de instancias en Postgres 9.6, la configuración de la instancia del Datadog Agent debe utilizar los parámetros `pg_stat_statements_view: datadog.pg_stat_statements()` y `pg_stat_activity_view: datadog.pg_stat_activity()` según las funciones creadas en la guía de configuración inicial. Estas funciones deben crearse en todas las bases de datos. |
| El usuario Datadog no tiene acceso suficiente para ver las consultas de otros usuarios. | El usuario Datadog debe tener el [rol `pg_monitor`][25] para acceder a tablas como `pg_stat_activity`. Asegúrate de que el usuario Datadog tiene este rol: `GRANT pg_monitor TO datadog`. |
| La consulta no es una "consulta principal" lo que significa que la suma de su tiempo total de ejecución no se encuentra entre las 200 primeras consultas normalizadas en ningún momento del periodo de tiempo seleccionado. | La consulta puede estar agrupada en la fila "Otras consultas". Para obtener más información sobre qué consultas se rastrean, consulta los [datos recopilados][5]. El número de consultas principales rastreadas puede aumentarse poniéndose en contacto con el servicio de asistencia de Datadog. |
| La consulta no es una consulta SELECT, INSERT, UPDATE o DELETE. | Las funciones que no son de utilidad no se rastrean por defecto. Para recopilarlas, configura el parámetro de Postgres `pg_stat_statements.track_utility` como `on`. Para obtener más información, consulta la [documentación de Postgres][6]. |
| La consulta se ejecuta en una función o un procedimiento almacenado. | Para realizar un seguimiento de las consultas ejecutadas en funciones o procedimientos, define el parámetro de configuración `pg_stat_statements.track` como `on`. Para obtener más información, consulta la [documentación de Postgres][6]. |
| El parámetro de configuración `pg_stat_statements.max` de Postgres puede ser demasiado bajo para tu carga de trabajo. | Si se ejecutan un gran número de consultas normalizadas en un corto periodo de tiempo (miles de consultas normalizadas únicas en 10 segundos), entonces es posible que el buffer en `pg_stat_statements` no pueda contener todas las consultas normalizadas. Aumentar este valor puede mejorar la cobertura de las consultas normalizadas rastreadas y reducir el impacto de la alta cancelación de SQL generada. **Nota**: Las consultas con nombres de columna desordenados o que utilizan matrices de longitud variable pueden aumentar significativamente la tasa de cancelación de consultas normalizadas. Por ejemplo `SELECT ARRAY[1,2]` y `SELECT ARRAY[1,2,3]` se rastrean como consultas separadas en `pg_stat_statements`. Para obtener más información sobre cómo ajustar este parámetro, consulta [Configuración avanzada][7]. |
| La consulta sólo se ejecutó una vez desde el último reinicio del Agent. | Las métricas de consultas sólo se emiten después de haber sido ejecutadas al menos una vez en dos intervalos separados de diez segundos desde el reinicio del Agent. |

### Las muestras de consultas se truncan

Es posible que las consultas más largas no muestren la totalidad de su texto SQL debido a la configuración de la base de datos. Es necesario realizar algunos ajustes para adaptarlas a tu carga de trabajo.

La configuración de Postgres `track_activity_query_size` indica el tamaño máximo de la sentencia SQL que Postgres almacena y hace visible en el Agent. Por defecto, este valor es de 1024 bytes. Aumentar este valor a 4096 captura la mayoría de las consultas de la mayoría de las cargas de trabajo. Sin embargo, un valor más alto puede ser apropiado si tus consultas son complejas o utilizan matrices largas.

Por ejemplo, la base de datos trunca una consulta con una matriz que contiene muchos elementos como:

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[11, 12, 13, ... , 9999, 10000 ]) LIMIT 5
```

La consulta normalizada resultante aparece en la aplicación como:

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[ ?
```

Para evitarlo, aumenta el parámetro `track_activity_query_size` a un valor lo suficientemente grande como para acomodar el mayor tamaño de texto esperado de tus consultas. Para obtener más información, consulta la documentación de Postgres sobre [estadísticas en tiempo de ejecución][8].

### En las consultas faltan explain-plans

Algunas o todas las consultas pueden no tener planes disponibles. Esto puede deberse a comandos de consulta no compatibles, a consultas realizadas por aplicaciones cliente no compatibles, a un Agent obsoleto o una configuración incompleta de la base de datos. A continuación se indican las posibles causas de la falta de explain-plans.

#### Falta la función de explicación {#undefined-explain-function}

Problema: El Agent no puede ejecutar una función requerida en el esquema `datadog` de la base de datos.

Solución: El Agent requiere que la función `datadog.explain_statement(...)` exista en **todas las bases de datos** de las que el Agent puede recopilar consultas.

Crea la función **en cada base de datos** para que el Agent pueda recopilar explain-plans.

```SQL
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```
#### El Agent está ejecutando una versión no compatible
Asegúrate de que el Agent ejecuta la versión 7.36.1 o posterior. Datadog recomienda actualizar periódicamente el Agent para aprovechar las nuevas funciones, las mejoras del rendimiento y las actualizaciones de seguridad.

#### Las consultas se truncan
Para obtener instrucciones sobre cómo aumentar el tamaño del texto de las muestras de consultas, consulta la sección sobre [muestras de consultas truncadas](#query-samples-are-truncated).

#### Protocolo de consulta ampliado de Postgres

Si un cliente utiliza el [protocolo de consulta ampliado][9] de Postgres o sentencias preparadas, el Datadog Agent no puede recopilar explain-plans debido a la separación de la consulta analizada y los parámetros de enlace sin procesar. A continuación se presentan algunas opciones para abordar este problema.

En la versión 12 o posterior de Postgres, el siguiente parámetro está activado por defecto en la [configuración de la integración Postgres][19], permitiendo al Agent recopilar planes de explicación:
```
query_samples:
  explain_parameterized_queries: true
  ...
```

En versiones anteriores a Postgres v12, este parámetro **no** es compatible. Sin embargo, si tu cliente proporciona una opción para forzar el uso del protocolo de consulta simple, el Datadog Agent está habilitado para recopilar planes de ejecución.

| Lenguaje | Cliente | Configuración para el protocolo de consulta simple|
|----------|--------|----------------------------------------|
| Go       | [pgx][10] | Configura `PreferSimpleProtocol` para cambiar al protocolo de consulta simple (consulta la [documentación de ConnConfig][11]). También puedes aplicar esto a cada consulta o llamada utilizando el indicador [QuerySimpleProtocol][24] como primer argumento en las llamadas `Query` o `Exec`.
| Java     | [Cliente Postgres JDBC][12] | Configura `preferQueryMode = simple` para cambiar al protocolo de consulta simple (consulta la documentación PreferQueryMode][13]). |
| Python   | [asyncpg][14]              | Utiliza el protocolo de consulta ampliado, que no puede deshabilitarse. Deshabilitar las sentencias preparadas no resuelve el problema. Para habilitar la recopilación de planes de ejecución, da un formato a las consultas SQL utilizando [psycopg sql][15] (o alguna otra función para formatos de SQL comparable que escape correctamente los valores de SQL), antes de pasarlas al cliente de la base de datos.                                                  |
| Python   | [psycopg][16]             | `psycopg2` no utiliza el protocolo de consulta extendido, por lo que los planes de ejecución deberían recopilarse sin problemas. <br/> `psycopg3` utiliza el protocolo de consulta extendido por defecto y no puede deshabilitarse. Deshabilitar las sentencias preparadas no resuelve el problema. Para habilitar la recopilación de planes de ejecución, da un formato a las consultas SQL utilizando [psycopg sql][15], antes de pasarlas al cliente de la base de datos. |
| Node     | [node-postgres][17]       | Utiliza el protocolo de consulta extendido y no puede deshabilitarse. Para permitir que el Datadog Agent recopile planes de ejecución, utiliza [pg-format][18] para dar un formato a las consultas SQL, antes de pasarlas a [node-postgres][17].|

#### La consulta está en una base de datos ignorada por la configuración de la instancia del Agent 
La consulta está en una base de datos ignorada por la configuración de la instancia del Agent `ignore_databases`. Las bases de datos predeterminadas, como las bases de datos `rdsadmin` y `azure_maintenance`, se ignoran en el parámetro `ignore_databases`. Las consultas en estas bases de datos no tienen muestras ni explain-plans. Comprueba el valor de este parámetro en la configuración de tu instancia y los valores predeterminados en el [archivo de configuración de ejemplo][19].

**Nota:** La base de datos `postgres` también se ignora por defecto en las versiones del Agent anteriores a la v7.41.0.

#### No es posible explicar la consulta
Algunas consultas, como BEGIN, COMMIT, SHOW, USE y ALTER, no pueden generar un explain-plan válido de la base de datos. Sólo las consultas SELECT, UPDATE, INSERT, DELETE y REPLACE admiten explain-plans.

#### La consulta es relativamente infrecuente o se ejecuta rápidamente
Es posible que la consulta no haya sido muestreada para su selección porque no representa una proporción significativa del tiempo total de ejecución de la base de datos. Intenta [aumentar las frecuencias de muestreo][23] para capturar la consulta.


#### La aplicación se basa en rutas de búsqueda para especificar el esquema que debe consultarse
Debido a que Postgres no expone la [ruta de búsqueda][20] actual en [`pg_stat_activity`][21], el Datadog Agent no puede averiguar qué ruta de búsqueda se está utilizando para cualquier proceso de Postgres activo. La solución para esta limitación es alterar la ruta de búsqueda para el usuario definido en la configuración de la integración Postgres para incluir el esquema.
```sql
ALTER ROLE datadog SET search_path = "$user",public,schema1,schema2,etc;
```

### La configuración falla en `create extension pg_stat_statements`

Ejemplo de resultado con error de `create extension pg_stat_statements`:
```
create extension pg_stat_statements;
ERROR:  could not open extension control file "<path>/share/postgresql/extension/pg_stat_statements.control": No such file or directory
SQL State: 58P01
```

Este error se produce cuando falta el paquete `postgresql-contrib` que incluye la extensión `pg_stat_statements`. La forma de instalar el paquete faltante varía en función de la distribución del host y de tu versión de Postgres. Por ejemplo, para instalar el paquete `contrib` en Ubuntu para Postgres 10, ejecuta:

```
sudo apt-get install postgresql-contrib-10
```

Para obtener más información, consulta la versión correspondiente de la [documentación `contrib` de Postgres][22].

### Las consultas del Agent son lentas o tienen un alto impacto en la base de datos

La configuración de Database Monitoring predeterminada del Agent es conservadora, pero puedes ajustar algunos parámetros como el intervalo de recopilación y la frecuencia de muestreo de consultas según tus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de la consulta en la base de datos y menos del uno por ciento del uso de CPU. A continuación se indican las posibles razones por las que las consultas del Agent requieren más recursos.

#### Valor alto para `pg_stat_statements.max` {#high-pg-stat-statements-max-configuration}
El valor recomendado para `pg_stat_statements.max` es `10000`. Ajustar esta configuración a un valor más alto
puede hacer que la recopilación de consultas tarde más tiempo en ejecutarse, lo que puede provocar tiempos de espera en la consulta y brechas en la recopilación de métricas. Si el Agent envía esta advertencia, asegúrate de que `pg_stat_statements.max` está configurado como `10000` en la base de datos. 


[1]: /es/database_monitoring/setup_postgres/
[2]: /es/agent/troubleshooting/
[3]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /es/agent/configuration/agent-log-files
[5]: /es/database_monitoring/data_collected/#which-queries-are-tracked
[6]: https://www.postgresql.org/docs/current/pgstatstatements.html#id-1.11.7.38.8
[7]: /es/database_monitoring/setup_postgres/advanced_configuration
[8]: https://www.postgresql.org/docs/current/runtime-config-statistics.html
[9]: https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
[10]: https://github.com/jackc/pgx
[11]: https://pkg.go.dev/github.com/jackc/pgx#ConnConfig
[12]: https://jdbc.postgresql.org/documentation/head/connect.html
[13]: https://jdbc.postgresql.org/documentation/publicapi/org/postgresql/jdbc/PreferQueryMode.html
[14]: https://github.com/MagicStack/asyncpg
[15]: https://www.psycopg.org/docs/sql.html
[16]: https://www.psycopg.org/
[17]: https://node-postgres.com/
[18]: https://www.npmjs.com/package/pg-format
[19]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[20]: https://www.postgresql.org/docs/14/ddl-schemas.html#DDL-SCHEMAS-PATH
[21]: https://www.postgresql.org/docs/14/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW
[22]: https://www.postgresql.org/docs/12/contrib.html
[23]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L281
[24]: https://pkg.go.dev/github.com/jackc/pgx/v4#QuerySimpleProtocol
[25]: https://www.postgresql.org/docs/current/predefined-roles.html#:~:text=a%20long%20time.-,pg_monitor,-Read/execute%20various