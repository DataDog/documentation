---
description: Instala y configura Database Monitoring para Postgres autohospedado.
further_reading:
- link: /integrations/postgres/
  tag: Documentación
  text: Integración básica de Postgres
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentación
  text: Capturando valores de parámetros de consultas SQL
- link: https://www.datadoghq.com/blog/database-monitoring-explain-analyze
  tag: Blog
  text: Depura la latencia de consultas de PostgreSQL más rápido con EXPLAIN ANALYZE
    en Database Monitoring de Datadog.
title: Configurando Database Monitoring para Postgres autohospedado
---
Database Monitoring proporciona una visibilidad profunda de tus bases de datos Postgres al exponer métricas de consultas, muestras de consultas, planes de explicación, estados de bases de datos, conmutaciones por error y eventos.

El Agente recopila telemetría directamente de la base de datos al iniciar sesión como un usuario de solo lectura. Realiza la siguiente configuración para habilitar Database Monitoring con tu base de datos Postgres:

1. [Configura los parámetros de la base de datos](#configure-postgres-settings)
1. [Otorga al Agente acceso a la base de datos](#grant-the-agent-access)
1. [Instala el Agente](#install-the-agent)

## Antes de comenzar {#before-you-begin}

Versiones de PostgreSQL soportadas
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17, 18

Requisitos previos
: Los módulos adicionales suministrados de Postgres deben estar instalados. Para la mayoría de las instalaciones, esto se incluye por defecto, pero las instalaciones menos convencionales pueden requerir una instalación adicional de tu versión del [paquete `postgresql-contrib`][1].

Versiones de Agente soportadas
: 7.36.1+

Impacto en el rendimiento
La configuración predeterminada del Agente para Database Monitoring es conservadora, pero puedes ajustar parámetros como el intervalo de recolección y la tasa de muestreo de consultas para adaptarlas mejor a tus necesidades. Para la mayoría de las cargas de trabajo, el Agente representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agente base ([ver benchmarks][2]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Agente de Datadog debe conectarse directamente al host que se está monitoreando. Para bases de datos autohospedadas, utiliza `127.0.0.1` o el socket. El Agente no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones como `pgbouncer`. Si el Agente se conecta a diferentes hosts mientras está en funcionamiento (como en el caso de conmutación por error, balanceo de carga, etc.), el Agente calcula la diferencia en estadísticas entre dos hosts, produciendo métricas inexactas.

Consideraciones de seguridad de datos
: Consulta [Información sensible][3] para obtener información sobre qué datos recopila el Agente de tus bases de datos y cómo asegurarte de que estén seguros.

## Configura los ajustes de Postgres {#configure-postgres-settings}

Configura los siguientes [parámetros][4] en el archivo `postgresql.conf` y luego **reinicia el servidor** para que los ajustes surtan efecto. Para más información sobre estos parámetros, consulta la [documentación de Postgres][5].

**Parámetros requeridos**

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Requerido para métricas de `postgresql.queries.*`. Habilita la recopilación de métricas de consulta utilizando la extensión [pg_stat_statements][5]. |
| `track_activity_query_size` | `4096` | Requerido para la recopilación de consultas más grandes. Aumenta el tamaño del texto SQL en `pg_stat_activity`. Si se deja en el valor predeterminado, las consultas que superen los `1024` caracteres no serán recopiladas. |

**Parámetros opcionales**

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `pg_stat_statements.track` | `ALL` | Habilita el seguimiento de declaraciones dentro de procedimientos almacenados y funciones. |
| `pg_stat_statements.max` | `10000` | Aumenta el número de consultas normalizadas rastreadas en `pg_stat_statements`. Recomendado para bases de datos de alto volumen que reciben muchos tipos diferentes de consultas de muchos clientes diferentes. |
| `pg_stat_statements.track_utility` | `off` | Desactiva comandos de utilidad como PREPARE y EXPLAIN. Establecer este valor en `off` significa que solo se rastrean consultas como SELECT, UPDATE y DELETE. |
| `track_io_timing` | `on` | Habilita la recopilación de tiempos de lectura y escritura de bloques para consultas. |

## Otorga al Agente de Datadog acceso {#grant-the-agent-access}

El Agente de Datadog requiere acceso de solo lectura al servidor de base de datos para recopilar estadísticas y consultas.

Ejecute los siguientes comandos SQL en el servidor de base de datos **primario** (el escritor) en el clúster si Postgres está replicado. El Agente de Datadog puede recopilar telemetría de todas las bases de datos en el servidor, independientemente de a cuál base de datos se conecte. Utilice la base de datos `postgres` predeterminada a menos que necesite que el Agente de Datadog ejecute [consultas personalizadas contra datos únicos de otra base de datos][6].

Conéctese a la base de datos elegida como superusuario (o otro usuario con permisos suficientes). Por ejemplo, para conectarse a la base de datos `postgres` usando [psql][7]:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Cree el usuario `datadog`:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres ≥ 15" %}}

Otorgue al usuario `datadog` permiso sobre las tablas relevantes:

```SQL
ALTER ROLE datadog INHERIT;
```

Cree el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Cree el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

Cree el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Cree funciones **en cada base de datos** para permitir que el Agente de Datadog lea el contenido completo de `pg_stat_activity` y `pg_stat_statements`:

```SQL
CREATE OR REPLACE FUNCTION datadog.pg_stat_activity() RETURNS SETOF pg_stat_activity AS
  $$ SELECT * FROM pg_catalog.pg_stat_activity; $$
LANGUAGE sql
SECURITY DEFINER;
CREATE OR REPLACE FUNCTION datadog.pg_stat_statements() RETURNS SETOF pg_stat_statements AS
    $$ SELECT * FROM pg_stat_statements; $$
LANGUAGE sql
SECURITY DEFINER;
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Para la recopilación de datos o métricas personalizadas que requieran consultar tablas adicionales, es posible que deba otorgar el <code>SELECT</code> permiso sobre esas tablas para el <code>datadog</code> usuario. Ejemplo: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Consulte <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">la recopilación de métricas personalizadas de PostgreSQL</a> para más información. </div>

### Cree la función del plan de explicación {#create-the-explain-plan-function}

Crea la siguiente función **en cada base de datos** para permitir que el Agente de Datadog recopile planes de explicación:

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
   SET TRANSACTION READ ONLY;

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

### Almacena tu contraseña de manera segura {#securely-store-your-password}
{{% dbm-secret %}}

### Verifica los permisos de la base de datos {#verify-database-permissions}

Para verificar que los permisos son correctos, ejecuta los siguientes comandos para confirmar que el usuario del Agente de Datadog puede conectarse a la base de datos y leer las tablas principales:

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from datadog.pg_stat_activity() limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from datadog.pg_stat_statements() limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

Cuando se te pida una contraseña, utiliza la contraseña que ingresaste al crear el Agente de Datadog `datadog`.

## Instala el Agente de Datadog {#install-the-agent}

Instalar el Agente de Datadog también instala la verificación de Postgres, que es necesaria para el Monitoreo de Bases de Datos en Postgres.
Si no has instalado el Agente, consulta las [instrucciones de instalación del Agente][8]. Luego, continúa con las instrucciones para tu método de instalación.

Edita el archivo `conf.d/postgres.d/conf.yaml` del Agente de Datadog para apuntar a la instancia de Postgres que deseas monitorear. Para una lista completa de opciones de configuración, consulta el [ejemplo postgres.d/conf.yaml][9].

```yaml
init_config:
instances:
 - dbm: true
   host: localhost
   port: 5432
   username: datadog
   password: 'ENC[datadog_user_database_password]'

  ## Optional: Connect to a different database if needed for `custom_queries`
  # dbname: '<DB_NAME>'
```

**Nota**: Si tu contraseña incluye caracteres especiales, envuélvela en comillas simples.

[Reinicia el Agente de Datadog][10] para aplicar los cambios.

### Recolección de registros (opcional) {#collecting-logs-optional}

El registro predeterminado de PostgreSQL es a `stderr`, y los registros no incluyen información detallada. Registra en un archivo con detalles adicionales especificados en el prefijo de la línea de registro. Consulta la [documentación de PostgreSQL][11] para más detalles.

1. La configuración de registro se realiza dentro del archivo `/etc/postgresql/<VERSION>/main/postgresql.conf`. Para resultados de registro regulares, incluyendo salidas de declaraciones, establece los siguientes parámetros en la sección de registro:
   ```conf
     logging_collector = on
     log_line_prefix = '%m [%p] %d %a %u %h %c ' # this pattern is required to correlate metrics in the Datadog product
     log_file_mode = 0644

     ## For Windows
     #log_destination = 'eventlog'
   ```
2. Para recopilar métricas de duración detalladas y hacerlas buscables en la interfaz de Datadog, configúralas en línea con la declaración. La configuración recomendada a continuación registra todas las declaraciones y sus duraciones. Para reducir la salida a declaraciones que superen una cierta duración, establece `log_min_duration_statement` en el mínimo deseado en milisegundos. Verifica que registrar la declaración SQL completa cumpla con los requisitos de privacidad de tu organización.

   **Nota**: Ambas opciones `log_statement` y `log_duration` están comentadas. Consulta la discusión sobre este tema [aquí][12].

   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```
3. La recopilación de registros está desactivada por defecto en el Agente de Datadog. Actívalo en tu archivo `datadog.yaml`:
   ```yaml
   logs_enabled: true
   ```
4. Agrega y edita este bloque de configuración en tu archivo `conf.d/postgres.d/conf.yaml` para comenzar a recopilar tus registros de PostgreSQL:
   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: postgresql
       service: "<SERVICE_NAME>"
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```
   Cambie los valores de los parámetros `service` y `path` para configurarlos para su entorno. Consulta el [ejemplo postgres.d/conf.yaml][9] para todas las opciones de configuración disponibles.
5. [Reinicie el Agent][10].

### Recopilando planes con `auto_explain` (opcional) {#collecting-plans-with-auto-explain-optional}

Por defecto, el agente solo recopila [`EXPLAIN`][17] planes para una muestra de consultas en ejecución. Estos planes son de naturaleza más general, especialmente cuando el código de la aplicación utiliza declaraciones preparadas.

Para recopilar planes completos de `EXPLAIN ANALYZE` tomados de todas las consultas, necesitas usar [`auto_explain`][18], una extensión propia incluida con PostgreSQL disponible en todos los proveedores principales. _La recopilación de registros es un requisito previo para la recopilación de `auto_explain`_, así que actívalo antes de continuar.

<div class="alert alert-danger">
  <strong>Importante:</strong> <code>auto_explain</code> produce líneas de registro que pueden contener información sensible de su aplicación, similar a los valores en bruto que aparecen en SQL no ofuscado. Puede usar el <a href="/account_management/rbac/permissions/#database-monitoring"><code>dbm_parameterized_queries_read</code></a>el permiso para controlar quién puede ver los planes resultantes, pero las líneas de registro <i>son</i> visibles para todos los usuarios dentro de su organización de Datadog. Usar <a href="/logs/guide/logs-rbac">RBAC para Logs</a> ayuda a asegurar que estos registros solo sean visibles para los usuarios adecuados.
</div>

Después de habilitar la recolección de registros:

1. Agregue `auto_explain` a su lista de `shared_preload_libraries` en `postgresql.conf`. Por ejemplo, si `shared_preload_libraries` está configurado en `pg_stat_statements`, cámbielo a `pg_stat_statements,auto_explain`

2. Cambie el `log_line_prefix` para habilitar una correlación de eventos más rica. Este patrón es necesario para ingerir planes de auto_explain.
   ```conf
     log_line_prefix = '%m:%r:%u@%d:[%p]:%l:%e:%s:%v:%x:%c:%q%a:'
   ```

3. Configure los ajustes de `auto_explain`. El formato de registro _debe_ ser `json`, pero otras configuraciones pueden variar dependiendo de su aplicación. Este ejemplo registra un `EXPLAIN ANALYZE` plan para todas las consultas que superan un segundo, incluyendo información de búfer pero omitiendo el tiempo (que puede tener sobrecarga).

   ```conf
    auto_explain.log_format: "json"
    auto_explain.log_min_duration: "1000"
    auto_explain.log_analyze: "on"
    auto_explain.log_buffers: "on"
    auto_explain.log_timing: "off"
    auto_explain.log_triggers: "on"
    auto_explain.log_verbose: "on"
    auto_explain.log_nested_statements: "on"
    auto_explain.sample_rate: "1"
   ```

4. [Reinicie el Agent][10].

### Verifique la configuración del Agent {#verify-agent-setup}

[Ejecute el subcomando de estado del Agent][13] y busque `postgres` en la sección de Checks. O visite la página de [Databases][14] para comenzar!

## Ejemplos de Configuraciones del Agent {#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## Solución de problemas {#troubleshooting}

Si has instalado y configurado las integraciones y el Agent como se describe y no está funcionando como se esperaba, consulta [Solución de problemas][15].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.postgresql.org/docs/current/contrib.html
[2]: /es/database_monitoring/agent_integration_overhead/?tab=postgres
[3]: /es/database_monitoring/data_collected/#sensitive-information
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /es/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[13]: /es/agent/configuration/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/databases
[15]: /es/database_monitoring/troubleshooting/?tab=postgres
[17]: https://www.postgresql.org/docs/current/sql-explain.html
[18]: https://www.postgresql.org/docs/current/auto-explain.html