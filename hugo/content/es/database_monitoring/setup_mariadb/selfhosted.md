---
description: Instale y configure Database Monitoring para MariaDB autohospedado.
further_reading:
- link: /integrations/mysql/
  tag: Documentación
  text: Integración básica de MySQL
title: Configuración de Database Monitoring para MariaDB autohospedado
---
Database Monitoring proporciona una visibilidad profunda de sus bases de datos MariaDB al exponer métricas de consultas, muestras de consultas, planes de explicación, datos de conexión, métricas del sistema y telemetría para el motor de almacenamiento InnoDB.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como un usuario de solo lectura. Realice la siguiente configuración para habilitar Database Monitoring con su base de datos MariaDB:

1. [Configure los parámetros de la base de datos](#configure-mariadb-settings)
1. [Otorgue al Agent acceso a la base de datos](#grant-the-agent-access)
1. [Instale el Agent](#install-the-agent)

## Antes de comenzar {#before-you-begin}

Versiones de MariaDB compatibles
: 10.5, 10.6, 10.11 o 11.4 <br/><br/>
Database Monitoring para MariaDB es compatible con [limitaciones conocidas][13].

Versiones de Agent compatibles
: 7.61.0+

Impacto en el rendimiento
: La configuración predeterminada del Agent para Database Monitoring es conservadora, pero puede ajustar configuraciones como el intervalo de recopilación y la tasa de muestreo de consultas para que se adapten mejor a sus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del 1% del tiempo de ejecución de consultas en la base de datos y menos del 1% de la CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agent base ([consulte los puntos de referencia][1]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al servidor al que se está haciendo un seguimiento. Para bases de datos autohospedadas, se prefiere `127.0.0.1` o el socket. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones. Si el Agent se conecta a diferentes servidores mientras se ejecuta (como en el caso de conmutación por error, equilibrio de carga, etc.), el Agent calcula la diferencia en las estadísticas entre dos servidores, lo que produce métricas inexactas.

Consideraciones de seguridad de los datos
: Consulte [Información confidencial][2] para obtener información sobre qué datos recopila el Agent de sus bases de datos y cómo mantenerlos seguros.

## Configure los ajustes de MariaDB {#configure-mariadb-settings}

Para recopilar métricas de consultas, muestras y planes de explicación, habilite el [esquema de rendimiento de MariaDB][3] y configure las siguientes [opciones del esquema de rendimiento][4], ya sea en la línea de comandos o en los archivos de configuración (por ejemplo, `mysql.conf`):

**Nota**: A diferencia de MySQL, MariaDB viene con `performance_schema` desactivado de forma predeterminada. Debe habilitarlo explícitamente.

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `performance_schema` | `ON` | Obligatorio. Habilita el esquema de rendimiento. MariaDB no habilita esto de forma predeterminada. |
| `max_digest_length` | `4096` | Requerido para la recopilación de consultas más grandes. Si se deja en el valor predeterminado, las consultas de más de `1024` caracteres no se recopilarán. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Debe coincidir con `max_digest_length`. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` | Debe coincidir con `max_digest_length`. |
| `performance-schema-consumer-events-statements-current` | `ON` | Obligatorio. Habilita el seguimiento de las consultas en ejecución. |
| `performance-schema-consumer-events-waits-current` | `ON` | Obligatorio. Habilita la recopilación de eventos de espera. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | Recomendado. Habilita el seguimiento de un mayor número de consultas recientes en todos los subprocesos. Si se habilita, aumenta la probabilidad de capturar detalles de ejecución de consultas poco frecuentes. |
| `performance-schema-consumer-events-statements-history` | `ON` | Opcional. Habilita el seguimiento del historial de consultas recientes por subproceso. Si se habilita, aumenta la probabilidad de capturar detalles de ejecución de consultas poco frecuentes. |

**Nota**: Una práctica recomendada es permitir que el Agent habilite la configuración de `performance-schema-consumer-*` dinámicamente en tiempo de ejecución, como parte de la concesión de acceso al Agent. Consulte [consumidores de configuración en tiempo de ejecución](#runtime-setup-consumers).

## Otorgue al Agent acceso {#grant-the-agent-access}

El Datadog Agent requiere acceso de solo lectura a la base de datos para recopilar estadísticas y consultas.

Las siguientes instrucciones otorgan al Agent permiso para iniciar sesión desde cualquier host usando `datadog@'%'`. Puede restringir al usuario `datadog` para que solo se le permita iniciar sesión desde localhost usando `datadog@'localhost'`. Consulte la [documentación de MariaDB][5] para obtener más información.

Cree el usuario `datadog` y otorgue permisos básicos:

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

La recopilación de consultas bloqueantes utiliza `information_schema.INNODB_LOCK_WAITS` y `INNODB_TRX`, junto con `performance_schema`, por lo que las concesiones `PROCESS` y `SELECT ON performance_schema.*` anteriores son suficientes; no se requiere ninguna concesión adicional. La recopilación de consultas de bloqueo está deshabilitada de forma predeterminada. Habilítela con `query_activity.collect_blocking_queries: true` en la configuración de su instancia.

Cree el siguiente esquema:

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
```

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

Además, cree este procedimiento **en cada esquema** del cual desee recopilar planes de ejecución. Reemplace `<YOUR_SCHEMA>` con su esquema de base de datos:

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

Para recopilar métricas de índice, otorgue al usuario `datadog` un privilegio adicional:

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

### Consumidores de configuración en tiempo de ejecución {#runtime-setup-consumers}
Datadog recomienda que cree el siguiente procedimiento para darle al Agent la capacidad de habilitar consumidores `performance_schema.events_*` en tiempo de ejecución.

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

### Almacene su contraseña de forma segura {#securely-store-your-password}
{{% dbm-secret %}}

## Recopilación de esquemas {#collecting-schemas}

A partir del Agent 7.65, el Datadog Agent puede recopilar información de esquema de bases de datos MariaDB. Habilítelo con `collect_schemas.enabled: true` en la configuración de su instancia (use `schemas_collection` en su lugar en el Agent 7.68 y versiones anteriores). La recopilación de esquemas está deshabilitada de forma predeterminada.

```yaml
instances:
  - dbm: true
    ...
    collect_schemas:
      enabled: true
```

En MariaDB 10.5 y versiones posteriores (al igual que en MySQL), `INFORMATION_SCHEMA` solo expone una tabla a un usuario que tenga un privilegio sobre ella, por lo que sin un permiso, el usuario `datadog` no ve ninguna tabla. Otorgue el privilegio `REFERENCES` para hacer visible los metadatos de la tabla sin darle al Agent la capacidad de leer los datos de la tabla:

```sql
GRANT REFERENCES ON *.* TO datadog@'%';
```

`REFERENCES` también es necesario para recopilar valores de `delete_rule` y `update_rule` de clave foránea de `INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS`; el privilegio `SELECT` a nivel de tabla no expone esa vista.

Consulte [Exploración de esquemas de base de datos][14] para conocer las opciones de ajuste `collect_schemas` disponibles.

## Instale el Agent {#install-the-agent}

La instalación del Datadog Agent también instala la verificación de MySQL, que se utiliza para hacer un seguimiento de MariaDB y es necesaria para Database Monitoring en MariaDB. Si aún no ha instalado el Agent para su servidor de base de datos MariaDB, consulte las [instrucciones de instalación del Agente][6].

Para configurar esta verificación para un Agent que se ejecuta en un servidor:

Edite el archivo `mysql.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de su [directorio de configuración del Agent][7] para comenzar a recopilar sus [métricas](#metric-collection) y [registros](#log-collection-optional) de MariaDB. Consulte el [ejemplo mysql.d/conf.yaml][8] para ver todas las opciones de configuración disponibles, incluidas las de métricas personalizadas.

### Recopilación de métricas {#metric-collection}

Agregue este bloque de configuración a su `mysql.d/conf.yaml` para recopilar métricas de MariaDB:

```yaml
init_config:

instances:
  - dbm: true
    host: 127.0.0.1
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier
```

**Nota**: El usuario `datadog` debe configurarse en la integración de MySQL como `host: 127.0.0.1` en lugar de `localhost`. Alternativamente, también puede usar `sock`.

Las métricas y los eventos se etiquetan con `dbms_flavor:mariadb` para que pueda distinguir los datos de MariaDB de los datos de MySQL.

[Reinicie el Agent][9] para comenzar a enviar métricas de MariaDB a Datadog.

### Recopilación de registros (opcional) {#log-collection-optional}

Además de la telemetría recopilada de la base de datos por el Agent, también puede optar por enviar los registros de su base de datos directamente a Datadog.

1. De forma predeterminada, MariaDB registra todo en `/var/log/syslog`, lo cual requiere acceso de root para leer. Para hacer que los registros sean más accesibles, siga estos pasos:

   1. Edite `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` y comente todas las líneas.
   2. Edite `/etc/mysql/my.cnf` para habilitar la configuración de registros deseada. Por ejemplo, para habilitar los registros generales, de errores y de consultas lentas, utilice la siguiente configuración:

     ```conf
       [mysqld_safe]
       log_error = /var/log/mysql/mysql_error.log

       [mysqld]
       general_log = on
       general_log_file = /var/log/mysql/mysql.log
       log_error = /var/log/mysql/mysql_error.log
       slow_query_log = on
       slow_query_log_file = /var/log/mysql/mysql_slow.log
       long_query_time = 3
     ```

   3. Guarde el archivo y reinicie MariaDB.
   4. Asegúrese de que el Agent tenga acceso de lectura al directorio `/var/log/mysql` y a todos los archivos que contiene. Verifique dos veces su configuración de `logrotate` para asegurarse de que estos archivos se tengan en cuenta y que los permisos estén configurados correctamente.
      En `/etc/logrotate.d/mysql-server` debería haber algo similar a:

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

2. La recopilación de registros está deshabilitada de forma predeterminada en el Datadog Agent, habilítela en su archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

3. Agregue este bloque de configuración a su archivo `mysql.d/conf.yaml` para comenzar a recopilar sus registros de MariaDB:

   ```yaml
   logs:
     - type: file
       path: "<ERROR_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"

     - type: file
       path: "<SLOW_QUERY_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       log_processing_rules:
         - type: multi_line
           name: new_slow_query_log_entry
           pattern: "# Time:"
           # If mysqld was started with `--log-short-format`, use:
           # pattern: "# Query_time:"

     - type: file
       path: "<GENERAL_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_log_start_with_date
       #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       # If the logs start with a date with the format yymmdd but include a timestamp with each new second, rather than with each log, uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_logs_do_not_always_start_with_timestamp
       #     pattern: \t\t\s*\d+\s+|\d{6}\s+\d{,2}:\d{2}:\d{2}\t\s*\d+\s+
   ```

4. [Reinicie el Agent][9].

## Validar {#validate}

[Ejecute el subcomando de estado del Agent][10] y busque `mysql` en la sección Checks, o consulte la página [Databases][11] para comenzar.

## Solución de problemas {#troubleshooting}

Si ha instalado y configurado las integraciones y Agent como se describe y no funciona como se espera, consulte [Troubleshooting][12].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /es/database_monitoring/data_collected/#sensitive-information
[3]: https://mariadb.com/kb/en/performance-schema-overview/
[4]: https://mariadb.com/docs/server/reference/system-tables/performance-schema/performance-schema-system-variables
[5]: https://mariadb.com/docs/server/reference/sql-statements/account-management-sql-statements/create-user
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[9]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /es/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
[12]: /es/database_monitoring/setup_mariadb/troubleshooting/
[13]: /es/database_monitoring/setup_mariadb/troubleshooting/#mariadb-known-limitations
[14]: /es/database_monitoring/schema_explorer/