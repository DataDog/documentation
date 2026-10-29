---
description: Instale y configure Database Monitoring para MySQL autoadministrado.
further_reading:
- link: /integrations/mysql/
  tag: Documentación
  text: Integración básica de MySQL
title: Configuración de Database Monitoring para MySQL autoadministrado
---
Database Monitoring proporciona una visibilidad profunda de sus bases de datos MySQL al exponer métricas de consultas, muestras de consultas, planes de explicación, datos de conexión, métricas del sistema y telemetría para el motor de almacenamiento InnoDB.

**Nota**: Si utiliza MariaDB, consulte [Configuración de MariaDB][15] en su lugar.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como un usuario de solo lectura. Realice la siguiente configuración para habilitar Database Monitoring con su base de datos MySQL:

1. [Configure los parámetros de la base de datos](#configure-mysql-settings)
1. [Otorgue al Agent acceso a la base de datos](#grant-the-agent-access)
1. [Instale el Agent](#install-the-agent)

## Antes de comenzar {#before-you-begin}

Versiones de MySQL compatibles
: 5.6, 5.7, 8.0+ o 9 (MySQL 9 requiere Agent 7.84+)

Versiones de MariaDB compatibles
: 10.5, 10.6, 10.11, 11.1, 12 o 13 (MariaDB 12 y 13 requieren Agent 7.84+) <br/><br/>
Database Monitoring para MariaDB es compatible con [limitaciones conocidas][13].

Versiones de Agent compatibles
: 7.36.1+

Impacto en el rendimiento
: La configuración predeterminada del Agent para Database Monitoring es conservadora, pero puede ajustar configuraciones como el intervalo de recopilación y la tasa de muestreo de consultas para que se adapten mejor a sus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agent base ([consulte los puntos de referencia][1]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al servidor al que se está haciendo un seguimiento. Para bases de datos autohospedadas, se prefiere `127.0.0.1` o el socket. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones. Si el Agent se conecta a diferentes servidores mientras se ejecuta (como en el caso de conmutación por error, equilibrio de carga, etc.), el Agent calcula la diferencia en las estadísticas entre dos servidores, lo que produce métricas inexactas.

Consideraciones de seguridad de los datos
: Consulte [Información confidencial][2] para obtener información sobre qué datos recopila el Agent de sus bases de datos y cómo garantizar que estén seguros.

## Configure los ajustes de MySQL {#configure-mysql-settings}

Para recopilar métricas de consultas, muestras y planes de explicación, habilite el [MySQL Performance Schema][3] y configure las siguientes [opciones del Performance Schema][4], ya sea en la línea de comandos o en los archivos de configuración (por ejemplo, `mysql.conf`):

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `performance_schema` | `ON` | Obligatorio. Habilita el Performance Schema. |
| `max_digest_length` | `4096` | Requerido para la recopilación de consultas más grandes. Si se deja en el valor predeterminado, las consultas de más de `1024` caracteres no se recopilarán. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Debe coincidir con `max_digest_length`. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` | Debe coincidir con `max_digest_length`. |
| `performance-schema-consumer-events-statements-current` | `ON` | Obligatorio. Habilita el monitoreo de las consultas que se están ejecutando actualmente. |
| `performance-schema-consumer-events-waits-current` | `ON` | Obligatorio. Habilita la recopilación de eventos de espera. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | Recomendado. Habilita el seguimiento de un mayor número de consultas recientes en todos los subprocesos. Si se habilita, aumenta la probabilidad de capturar detalles de ejecución de consultas poco frecuentes. |
| `performance-schema-consumer-events-statements-history` | `ON` | Opcional. Habilita el seguimiento del historial de consultas recientes por subproceso. Si se habilita, aumenta la probabilidad de capturar detalles de ejecución de consultas poco frecuentes. |
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `performance_schema` | `ON` | Obligatorio. Habilita el Performance Schema. |
| `max_digest_length` | `4096` | Requerido para la recopilación de consultas más grandes. Si se deja en el valor predeterminado, las consultas de más de `1024` caracteres no se recopilarán. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Debe coincidir con `max_digest_length`. |
| `performance-schema-consumer-events-statements-current` | `ON` | Obligatorio. Habilita el monitoreo de las consultas que se están ejecutando actualmente. |
| `performance-schema-consumer-events-waits-current` | `ON` | Obligatorio. Habilita la recopilación de eventos de espera. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | Recomendado. Habilita el seguimiento de un mayor número de consultas recientes en todos los subprocesos. Si se habilita, aumenta la probabilidad de capturar detalles de ejecución de consultas poco frecuentes. |
| `performance-schema-consumer-events-statements-history` | `ON` | Opcional. Habilita el seguimiento del historial de consultas recientes por subproceso. Si se habilita, aumenta la probabilidad de capturar detalles de ejecución de consultas poco frecuentes. |
{{% /tab %}}
{{< /tabs >}}


**Nota**: Una práctica recomendada es permitir que el Agent habilite la configuración de `performance-schema-consumer-*` dinámicamente en tiempo de ejecución, como parte de la concesión de acceso al Agent. Consulte [consumidores de configuración en tiempo de ejecución](#runtime-setup-consumers).

## Otorgue al Agent acceso {#grant-the-agent-access}

El Datadog Agent requiere acceso de solo lectura a la base de datos para recopilar estadísticas y consultas.

Las siguientes instrucciones otorgan al Agent permiso para iniciar sesión desde cualquier host usando `datadog@'%'`. Puede restringir al usuario `datadog` para que solo se le permita iniciar sesión desde localhost usando `datadog@'localhost'`. Consulte la [documentación de MySQL][5] para obtener más información.

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}

Cree el usuario `datadog` y otorgue permisos básicos:

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6" %}}

Cree el usuario `datadog` y otorgue permisos básicos:

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

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

A partir del Agent v7.65, el Datadog Agent puede recopilar información de esquema de bases de datos MySQL. Consulte la sección [Collecting schemas][14] a continuación para obtener más información sobre cómo otorgar al Agent los permisos para esta recopilación.


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

## Instale el Agent {#install-the-agent}

La instalación del Datadog Agent también instala la verificación de MySQL, que es necesaria para Database Monitoring en MySQL. Si aún no ha instalado el Agent para su servidor de base de datos MySQL, consulte las [instrucciones de instalación del Agent][6].

Para configurar esta verificación para un Agent que se ejecuta en un servidor:

Edite el archivo `mysql.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de su [directorio de configuración del Agent][7] para comenzar a recopilar sus [métricas](#metric-collection) y [registros](#log-collection-optional) de MySQL. Consulte el [ejemplo mysql.d/conf.yaml][8] para ver todas las opciones de configuración disponibles, incluidas las de métricas personalizadas.

### Recopilación de métricas {#metric-collection}

Agregue este bloque de configuración a su `mysql.d/conf.yaml` para recopilar métricas de MySQL:

```yaml
init_config:

instances:
  - dbm: true
    host: 127.0.0.1
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier
```

Tenga en cuenta que el usuario `datadog` debe configurarse en la integración de MySQL como `host: 127.0.0.1` en lugar de `localhost`. Alternativamente, también puede usar `sock`.

[Reinicie el Agent][9] para comenzar a enviar métricas de MySQL a Datadog.

### Recopilación de registros (opcional) {#log-collection-optional}

Además de la telemetría recopilada de la base de datos por el Agent, también puede optar por enviar los registros de su base de datos directamente a Datadog.

1. De forma predeterminada, MySQL registra todo en `/var/log/syslog`, lo cual requiere acceso de root para leer. Para hacer que los registros sean más accesibles, siga estos pasos:

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

   3. Guarde el archivo y reinicie MySQL.
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

3. Agregue este bloque de configuración a su archivo `mysql.d/conf.yaml` para comenzar a recopilar sus registros de MySQL:

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
           # If using mysql version <5.7, use the following rules instead:
           # - type: multi_line
           #   name: new_slow_query_log_entry
           #   pattern: "# Time|# User@Host"
           # - type: exclude_at_match
           #   name: exclude_timestamp_only_line
           #   pattern: "# Time:"

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

## Ejemplos de configuraciones de Agent {#example-agent-configurations}
{{% dbm-mysql-agent-config-examples %}}

## Solución de problemas {#troubleshooting}

Si ha instalado y configurado las integraciones y Agent como se describe y no funciona como se espera, consulte [Troubleshooting][12].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /es/database_monitoring/data_collected/#sensitive-information
[3]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-options.html
[5]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[9]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /es/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
[12]: /es/database_monitoring/troubleshooting/?tab=mysql
[14]: /es/database_monitoring/setup_mysql/selfhosted?tab=mysql57#collecting-schemas
[15]: /es/database_monitoring/setup_mariadb/