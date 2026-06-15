---
description: Instala y configura la Monitorización de base de datos para MySQL autoalojado.
further_reading:
- link: /integrations/mysql/
  tag: Documentación
  text: Integración básica de MySQL
title: Configuración de la Monitorización de base de datos para MySQL autoalojado
---

La Monitorización de base de datos proporciona una amplia visibilidad de tus bases de datos MySQL mediante la exposición de métricas de consultas, ejemplos de consultas, planes de explicación, datos de conexión, métricas de sistemas y telemetría para el motor de almacenamiento InnoDB.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como usuario de sólo lectura. Realiza la siguiente configuración para habilitar la Monitorización de base de datos con tu base de datos MySQL:

1. [Configura parámetros de bases de datos](#configure-mysql-settings).
1. [Concede al Agent acceso a la base de datos](#grant-the-agent-access).
1. [Instala el Agent](#install-the-agent).

## Antes de empezar

Versiones de MySQL compatibles
: 5.6, 5.7, o 8.0+

Versiones de MariaDB compatibles
: 10.5, 10.6, 10.11 o 11.1 <br/><br/>
Database Monitoring para MariaDB es compatible con [limitaciones conocidas][13].

Versiones del Agent compatibles
: 7.36.1 o posteriores

Impacto en el rendimiento
: La configuración del Agent predeterminada para Database Monitoring es conservadora, pero puedes ajustar algunos parámetros como el intervalo de recopilación y la frecuencia de muestreo de consultas según tus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de la consulta en la base de datos y menos del uno por ciento del uso de CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agent base ([consulta las referencias][1]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al host que se está monitorizando. Para las bases de datos autoalojadas, se prefiere `127.0.0.1` o el socket. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones. Si el Agent se conecta a diferentes hosts mientras se ejecuta (como en el caso de la conmutación por error o el balanceo de carga, entre otros), este calcula la diferencia en las estadísticas entre dos hosts, lo que produce inexactitudes en las métricas.

Consideraciones sobre la seguridad de los datos
: Para saber qué datos recopila el Agent de tus bases de datos y cómo garantizar su seguridad, consulta [Información confidencial][2].

## Configurar los parámetros de MySQL

Para recopilar métricas de consultas, muestras y planes de explicación, habilita el [Esquema de rendimiento de MySQL][3] y configura las siguientes [Opciones de esquema de rendimiento][4], ya sea en la línea de comandos o en los archivos de configuración (por ejemplo, `mysql.conf`):

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `performance_schema` | `ON` | Obligatorio. Habilita el esquema de rendimiento. |
| `max_digest_length` | `4096` | Es obligatorio para la recopilación de consultas más extensas. Si se deja el valor predeterminado, no se recopilarán consultas con más de `1024` caracteres. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Debe coincidir con `max_digest_length`. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` | Debe coincidir con `max_digest_length`. |
| `performance-schema-consumer-events-statements-current` | `ON` | Obligatorio. Habilita la monitorización de las consultas en ejecución actualmente. |
| `performance-schema-consumer-events-waits-current` | `ON` | Obligatorio. Habilita la recopilación de eventos de espera. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | Recomendado. Permite el seguimiento de una mayor cantidad de consultas recientes en todos los subprocesos. Si se habilita, aumenta la probabilidad de capturar detalles de la ejecución de consultas poco frecuentes. |
| `performance-schema-consumer-events-statements-history` | `ON` | Opcional. Permite el seguimiento del historial de consultas recientes por subproceso. Si se habilita, aumenta la probabilidad de capturar detalles de la ejecución de consultas poco frecuentes. |
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `performance_schema` | `ON` | Obligatorio. Habilita el esquema de rendimiento. |
| `max_digest_length` | `4096` | Es obligatorio para la recopilación de consultas más extensas. Si se deja el valor predeterminado, no se recopilarán consultas con más de `1024` caracteres. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Debe coincidir con `max_digest_length`. |
| `performance-schema-consumer-events-statements-current` | `ON` | Obligatorio. Habilita la monitorización de las consultas en ejecución actualmente. |
| `performance-schema-consumer-events-waits-current` | `ON` | Obligatorio. Habilita la recopilación de eventos de espera. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | Recomendado. Permite el seguimiento de una mayor cantidad de consultas recientes en todos los subprocesos. Si se habilita, aumenta la probabilidad de capturar detalles de la ejecución de consultas poco frecuentes. |
| `performance-schema-consumer-events-statements-history` | `ON` | Opcional. Permite el seguimiento del historial de consultas recientes por subproceso. Si se habilita, aumenta la probabilidad de capturar detalles de la ejecución de consultas poco frecuentes. |
{{% /tab %}}
{{< /tabs >}}


**Nota**: Una práctica recomendada es permitir que el Agent habilite la configuración de `performance-schema-consumer-*` dinámicamente en el tiempo de ejecución, como parte de la concesión de acceso al Agent. Consulta [Consumidores de configuración de tiempo de ejecución](#runtime-setup-consumers).

## Conceder acceso al Agent

El Datadog Agent requiere acceso de solo lectura a la base de datos para poder recopilar estadísticas y realizar consultas.

Las siguientes instrucciones conceden permiso al Agent para iniciar sesión desde cualquier host con `datadog@'%'`. Puedes restringir al usuario `datadog` para que solo pueda iniciar sesión desde el host local usando `datadog@'localhost'`. Consulta la [documentación de MySQL][5] para obtener más información.

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}

Crea el usuario `datadog` y concédele permisos básicos:

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6" %}}

Crea el usuario `datadog` y concédele permisos básicos:

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

Crea el siguiente esquema:

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
```

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

Además, crea este procedimiento **en cada esquema** del que quieras recopilar planes de explicación. Sustituye `<YOUR_SCHEMA>` por el esquema de tu base de datos:

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

Para recopilar métricas de índice, concede al usuario `datadog` un privilegio adicional:

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

A partir del Agent v7.65, el Datadog Agent puede recopilar información de esquemas de bases de datos MySQL. Para obtener más información sobre cómo conceder al Agent permisos para esta recopilación, consulta la sección [Recopilación de esquemas][14] a continuación.


### Consumidores de configuración en tiempo de ejecución
Datadog recomienda crear el siguiente procedimiento para que el Agent pueda habilitar los consumidores de `performance_schema.events_*` en tiempo de ejecución.

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

### Guardar tu contraseña de forma segura
{{% dbm-secret %}}

## Instalar el Agent

Al instalar el Datadog Agent también se instala el check de MySQL, necesario para Database Monitoring en MySQL. Si aún no has instalado el Agent para el host de tu base de datos de MySQL, consulta las [Instrucciones de instalación del Agent][6].

Para configurar este check para un Agent que se ejecuta en un host:

Edita el archivo `mysql.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][7] para empezar a recopilar [métricas](#metric-collection) y [logs](#log-collection-optional) de MySQL. Consulta el [archivo mysql.d/conf.yaml de ejemplo][8] para conocer todas las opciones de configuración disponibles, incluidas las de métricas personalizadas.

### Recopilación de métricas

Añade este bloque de configuración a tu `mysql.d/conf.yaml` para recopilar métricas de MySQL:

```yaml
init_config:

instances:
  - dbm: true
    host: 127.0.0.1
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier
```

Ten en cuenta que el usuario `datadog` debe establecerse en la configuración de la integración de MySQL como `host: 127.0.0.1` en lugar de `localhost`. Como alternativa, también puedes utilizar `sock`.

[Reinicia el Agent][9] para empezar a enviar métricas de MySQL a Datadog.

### Recopilación de logs (opcional)

Además de la telemetría recopilada de la base de datos por el Agent, también puedes optar por enviar tus logs de base de datos directamente a Datadog.

1. De manera predeterminada, MySQL registra todo en `/var/log/syslog` que requiere acceso raíz para la lectura. Para que los logs sean más accesibles, sigue estos pasos:

   1. Edita `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` y comenta todas las líneas.
   2. Edita `/etc/mysql/my.cnf` para habilitar la configuración de registro deseada. Por ejemplo, para activar los logs de consultas generales, de error y lentas, utiliza la siguiente configuración:

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

   3. Guarda el archivo y reinicia MySQL.
   4. Asegúrate de que el Agent tenga acceso de lectura al directorio `/var/log/mysql` y a todos los archivos que contiene. Vuelve a comprobar tu configuración de `logrotate` para asegurarte de que estos archivos se tengan en cuenta y que los permisos se hayan configurado correctamente.
      En `/etc/logrotate.d/mysql-server` debería haber algo parecido a:

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

2. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

3. Añade este bloque de configuración a tu archivo `mysql.d/conf.yaml` para empezar a recopilar logs de MySQL:

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

4. [Reinicia el Agent][9].

## Validación

[Ejecuta el subcomando de estado del Agent][10] y busca `mysql` en la sección Checks. Si no, consulta la página [Bases de datos][11] para empezar.

## Configuraciones del Agent de ejemplo
{{% dbm-mysql-agent-config-examples %}}

## Solucionar problemas

Si has instalado y configurado las integraciones y el Agent como se describe, pero no funcionan como se esperaba, consulta [Solucionar problemas][12].

## Referencias adicionales

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
[13]: /es/database_monitoring/setup_mysql/troubleshooting/#mariadb-known-limitations
[14]: /es/database_monitoring/setup_mysql/selfhosted?tab=mysql57#collecting-schemas