---
"app_id": "mysql"
"app_uuid": "f6177896-da1e-4bc4-ab19-fd32e8868647"
"assets":
  "dashboards":
    "mysql": "assets/dashboards/overview.json"
    "mysql-screenboard": "assets/dashboards/overview-screenboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "mysql.net.connections"
      "metadata_path": "metadata.csv"
      "prefix": "mysql."
    "process_signatures":
    - "mysqld"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "18"
    "source_type_name": "MySQL"
  "monitors":
    "MySQL database replica is not running properly": "assets/monitors/replica_running.json"
    "SELECT query volume is dropping": "assets/monitors/select_query_rate.json"
  "saved_views":
    "mysql_processes": "assets/saved_views/mysql_processes.json"
    "operations": "assets/saved_views/operations.json"
    "operations_overview": "assets/saved_views/operations_overview.json"
    "slow_operations": "assets/saved_views/slow_operations.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "data stores"
- "log collection"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/mysql/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "mysql"
"integration_id": "mysql"
"integration_title": "MySQL"
"integration_version": "14.3.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "mysql"
"public_title": "MySQL"
"short_description": "Recopila métricas de esquema de rendimiento, rendimiento de consultas, métricas personalizadas y mucho más".
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  - "Category::Log Collection"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Recopila métricas de esquema de rendimiento, rendimiento de consultas, métricas personalizadas y mucho más".
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics"
  "support": "README.md#Support"
  "title": "MySQL"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


![Dashboard de MySQL][1]

## Información general

La integración de MySQL controla el rendimiento de tus instancias de MySQL. Recopila métricas en relación con el rendimiento, las conexiones, los errores y métricas de InnoDB.

Activa la [Monitorización de base de datos][2] (DBM) para obtener información mejorada sobre el rendimiento de las consultas y el estado de la base de datos. Además de la integración estándar, Datadog DBM proporciona métricas a nivel de consulta, snapshots de consultas en tiempo real e históricas, análisis de eventos en espera, carga de la base de datos y planes de explicación de consultas.

Se admiten las versiones 5.6, 5.7 y 8.0 de MySQL, y las versiones 10.5, 10.6, 10.11 y 11.1 de MariaDB.

## Configuración

<div class="alert alert-info">En esta página, se describe la integración estándar del Agent de MySQL. Si buscas el producto de Monitorización de base de datos para MySQL, consulta <a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Monitorización de base de datos de Datadog</a>.</div>

### Instalación

El check de MySQL está incluido en el paquete del [Datadog Agent ][3]. No es necesaria ninguna instalación adicional en tu servidor de MySQL.

#### Preparar MySQL

**Nota**: Para instalar la Monitorización de base de datos para MySQL, selecciona tu solución de alojamiento en la [documentación de Monitorización de base de datos][4] para obtener instrucciones.

Procede con los siguientes pasos de esta guía solo si vas a instalar únicamente la integración estándar.

En cada servidor MySQL, crea un usuario de base de datos para el Datadog Agent.

Las siguientes instrucciones conceden al Agent permiso para iniciar sesión desde cualquier host mediante `datadog@'%'`. Puedes restringir al usuario `datadog` para que sólo pueda iniciar sesión desde el host local mediante `datadog@'localhost'`. Consulta [Añadir cuentas de MySQL, asignar privilegios y eliminar cuentas][5] para obtener más información.

Crea el usuario `datadog` con el siguiente comando:

```shell
mysql> CREATE USER 'datadog'@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
Query OK, 0 rows affected (0.00 sec)
```

Comprueba que el usuario se ha creado correctamente mediante los siguientes comandos: sustituye `<UNIQUEPASSWORD>` por la contraseña que has creado anteriormente:

```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```

El Agent necesita algunos privilegios para recopilar métricas. Concede al usuario `datadog` sólo los siguientes privilegios limitados.

Para las versiones 5.6 y 5.7 de MySQL, concede `replication client` y establece `max_user_connections` con el siguiente comando:

```shell
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'%' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected, 1 warning (0.00 sec)
```

Para MySQL 8.0 o posterior, concede `replication client` y establece `max_user_connections` con los siguientes comandos:

```shell
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
mysql> ALTER USER 'datadog'@'%' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected (0.00 sec)
```

Concede al usuario `datadog` el privilegio de proceso:

```shell
mysql> GRANT PROCESS ON *.* TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
```

Verifica el cliente de replicación. Sustituye `<UNIQUEPASSWORD>` por la contraseña que creaste anteriormente:

```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```

Si se activan, las métricas pueden recopilarse de la base de datos `performance_schema` concediendo un privilegio adicional:

```shell
mysql> show databases like 'performance_schema';
+-------------------------------+
| Database (performance_schema) |
+-------------------------------+
| performance_schema            |
+-------------------------------+
1 row in set (0.00 sec)

mysql> GRANT SELECT ON performance_schema.* TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
```

### Configuración

Sigue las instrucciones a continuación para configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las secciones de [Docker](?tab=docker#docker), [Kubernetes](?tab=kubernetes#kubernetes), o [ECS](?tab=ecs#ecs).

**Nota**: Para obtener una lista completa de las opciones de configuración disponibles, consulta el [mysql.d/conf.yaml de ejemplo][6].

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

Edita el archivo `mysql.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][1] para iniciar la recopilación de tus [métricas](#métrica-collection) y [logs](#log-collection) de MySQL.

Para obtener una lista completa de las opciones de configuración disponibles, consulta el [`mysql.d/conf.yaml` de ejemplo][2].

##### Recopilación de métricas

- Añade este bloque de configuración a tu `mysql.d/conf.yaml` para recopilar tus [métricas de MySQL](#metrics):

  ```yaml
  init_config:

  instances:
    - host: 127.0.0.1
      username: datadog
      password: "<YOUR_CHOSEN_PASSWORD>" # from the CREATE USER step earlier
      port: "<YOUR_MYSQL_PORT>" # e.g. 3306
      options:
        replication: false
        galera_cluster: true
        extra_status_metrics: true
        extra_innodb_metrics: true
        schema_size_metrics: false
        disable_innodb_metrics: false
  ```

**Nota**: Escribe tu contraseña entre comillas simples en caso de que haya un carácter especial.

Para recopilar `extra_performance_metrics`, tu servidor de MySQL debe tener habilitado `performance_schema`; de lo contrario, configura `extra_performance_metrics` en `false`. Para obtener más información sobre `performance_schema`, consulta [inicio rápido del esquema de rendimiento de MySQL][3].

**Nota**: El usuario `datadog` debe establecerse en la configuración de la integración de MySQL como `host: 127.0.0.1` en lugar de `localhost`. Como alternativa, también puedes utilizar `sock`.

[Reinicia el Agent][4] para empezar a enviar métricas de MySQL a Datadog.

##### Recopilación de logs

_Disponible para el Agent versión 6.0 o posterior_

1. Por defecto, MySQL loguea todo en `/var/log/syslog` que requiere acceso raíz para la lectura. Para que los logs sean más accesibles, sigue estos pasos:

   - Edita `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` y elimina o comenta las líneas.
   - Edita `/etc/mysql/my.cnf` y añade las siguientes líneas para activar los logs de consultas generales, de error y lentas:

     ```conf
       [mysqld_safe]
       log_error = /var/log/mysql/mysql_error.log

       [mysqld]
       general_log = on
       general_log_file = /var/log/mysql/mysql.log
       log_error = /var/log/mysql/mysql_error.log
       slow_query_log = on
       slow_query_log_file = /var/log/mysql/mysql_slow.log
       long_query_time = 2
     ```

   - Guarda el archivo y reinicia MySQL con los siguientes comandos:
     `service mysql restart`
   - Asegúrate de que el Agent tiene acceso de lectura al directorio `/var/log/mysql` y a todos los archivos que contiene. Vuelve a controlar tu configuración de logrotate para asegurarte de que esos archivos se tienen en cuenta y que los permisos se establecen correctamente allí también.
   - En `/etc/logrotate.d/mysql-server` debería haber algo parecido a:

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

2. La recopilación de logs está desactivada por defecto en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

3. Añade este bloque de configuración en tu archivo `mysql.d/conf.yaml` para empezar a recopilar tus logs de MySQL:

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

    Para conocer todas las opciones de configuración disponibles, incluidas las de métricas personalizadas, consulta el [mysql.yaml de ejemplo][2].

4. [Reinicia el Agent][4].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-quick-start.html
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}
#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Establece [plantillas de integración de Autodiscovery][1] como etiquetas de Docker en tu contenedor de aplicación:

```yaml
LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"server": "%%host%%", "username": "datadog","password": "<UNIQUEPASSWORD>"}]'
```

Consulta las [variables de plantilla de Autodiscovery][2] para obtener más detalles sobre cómo usar `<UNIQUEPASSWORD>` como una variable de entorno en lugar de una etiqueta (label).

#### Recopilación de logs


La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [recopilación de logs de Docker][3].

A continuación, establece [integraciones de log][4] como etiquetas de Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"mysql","service":"mysql"}]'
```

[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation
[4]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Para configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Establece [plantillas de integraciones de Autodiscovery][1] como anotaciones de pod en tu contenedor de aplicación. Alternativamente, puedes configurar plantillas con un [archivo, configmap, o almacén de clave-valor][2].

**Anotaciones v1** (para el Datadog Agent v7.36 o anterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  annotations:
    ad.datadoghq.com/mysql.check_names: '["mysql"]'
    ad.datadoghq.com/mysql.init_configs: '[{}]'
    ad.datadoghq.com/mysql.instances: |
      [
        {
          "server": "%%host%%", 
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>"
        }
      ]
  labels:
    name: mysql
spec:
  containers:
    - name: mysql
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  annotations:
    ad.datadoghq.com/mysql.checks: |
      {
        "mysql": {
          "instances": [
            {
              "server": "%%host%%", 
              "username": "datadog",
              "password": "<UNIQUEPASSWORD>"
            }
          ]
        }
      }
  labels:
    name: mysql
spec:
  containers:
    - name: mysql
```

Consulta las [variables de plantilla de Autodiscovery][3] para obtener más detalles sobre cómo usar `<UNIQUEPASSWORD>` como una variable de entorno en lugar de una etiqueta.

#### Recopilación de logs


La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][4].

A continuación, establece [integraciones de log][5] como anotaciones del pod. Alternativamente, puedes configurar esto con un [archivo, configmap, o almacén de clave-valor][6].

**Anotaciones v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  annotations:
    ad.datadoghq.com/mysql.logs: '[{"source": "mysql", "service": "mysql"}]'
  labels:
    name: mysql
```

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/agent/faq/template_variables/
[4]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup
[5]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Establece las [plantillas de integraciones de Autodiscovery][1] como etiquetas de Docker en el contenedor de tu aplicación:

```json
{
  "containerDefinitions": [{
    "name": "mysql",
    "image": "mysql:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"mysql\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"server\": \"%%host%%\", \"username\": \"datadog\",\"password\": \"<UNIQUEPASSWORD>\"}]"
    }
  }]
}
```

Consulta las [variables de plantilla de Autodiscovery][2] para obtener más detalles sobre cómo usar `<UNIQUEPASSWORD>` como una variable de entorno en lugar de una etiqueta.

##### Recopilación de logs

_Disponible para el Agent versión 6.0 o posterior_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [recopilación de logs de ECS][3].

A continuación, establece [integraciones de log][4] como etiquetas de Docker:

```yaml
{
  "containerDefinitions": [{
    "name": "mysql",
    "image": "mysql:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"mysql\",\"service\":\"mysql\"}]"
    }
  }]
}
```
[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux
[4]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `mysql` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "mysql" >}}


El check no recopila todas las métricas por defecto. Establece las siguientes opciones de configuración booleanas en `true` para activar las respectivas métricas:

`extra_status_metrics` añade las siguientes métricas:

| Nombre de la métrica                                  | Tipo de métrica |
| -------------------------------------------- | ----------- |
| mysql.binlog.cache_disk_use                  | GAUGE       |
| mysql.binlog.cache_use                       | GAUGE       |
| mysql.performance.handler_commit             | RATE        |
| mysql.performance.handler_delete             | RATE        |
| mysql.performance.handler_prepare            | RATE        |
| mysql.performance.handler_read_first         | RATE        |
| mysql.performance.handler_read_key           | RATE        |
| mysql.performance.handler_read_next          | RATE        |
| mysql.performance.handler_read_prev          | RATE        |
| mysql.performance.handler_read_rnd           | RATE        |
| mysql.performance.handler_read_rnd_next      | RATE        |
| mysql.performance.handler_rollback           | RATE        |
| mysql.performance.handler_update             | RATE        |
| mysql.performance.handler_write              | RATE        |
| mysql.performance.opened_tables              | RATE        |
| mysql.performance.qcache_total_blocks        | GAUGE       |
| mysql.performance.qcache_free_blocks         | GAUGE       |
| mysql.performance.qcache_free_memory         | GAUGE       |
| mysql.performance.qcache_not_cached          | RATE        |
| mysql.performance.qcache_queries_in_cache    | GAUGE       |
| mysql.performance.select_full_join           | RATE        |
| mysql.performance.select_full_range_join     | RATE        |
| mysql.performance.select_range               | RATE        |
| mysql.performance.select_range_check         | RATE        |
| mysql.performance.select_scan                | RATE        |
| mysql.performance.sort_merge_passes          | RATE        |
| mysql.performance.sort_range                 | RATE        |
| mysql.performance.sort_rows                  | RATE        |
| mysql.performance.sort_scan                  | RATE        |
| mysql.performance.table_locks_immediate      | GAUGE       |
| mysql.performance.table_locks_immediate.rate | RATE        |
| mysql.performance.threads_cached             | GAUGE       |
| mysql.performance.threads_created            | MONOTONIC   |

`extra_innodb_metrics` añade las siguientes métricas:

| Nombre de la métrica                                 | Tipo de métrica |
| ------------------------------------------- | ----------- |
| mysql.innodb.active_transactions            | GAUGE       |
| mysql.innodb.buffer_pool_data               | GAUGE       |
| mysql.innodb.buffer_pool_pages_data         | GAUGE       |
| mysql.innodb.buffer_pool_pages_dirty        | GAUGE       |
| mysql.innodb.buffer_pool_pages_flushed      | RATE        |
| mysql.innodb.buffer_pool_pages_free         | GAUGE       |
| mysql.innodb.buffer_pool_pages_total        | GAUGE       |
| mysql.innodb.buffer_pool_read_ahead         | RATE        |
| mysql.innodb.buffer_pool_read_ahead_evicted | RATE        |
| mysql.innodb.buffer_pool_read_ahead_rnd     | GAUGE       |
| mysql.innodb.buffer_pool_wait_free          | MONOTONIC   |
| mysql.innodb.buffer_pool_write_requests     | RATE        |
| mysql.innodb.checkpoint_age                 | GAUGE       |
| mysql.innodb.current_transactions           | GAUGE       |
| mysql.innodb.data_fsyncs                    | RATE        |
| mysql.innodb.data_pending_fsyncs            | GAUGE       |
| mysql.innodb.data_pending_reads             | GAUGE       |
| mysql.innodb.data_pending_writes            | GAUGE       |
| mysql.innodb.data_read                      | RATE        |
| mysql.innodb.data_written                   | RATE        |
| mysql.innodb.dblwr_pages_written            | RATE        |
| mysql.innodb.dblwr_writes                   | RATE        |
| mysql.innodb.hash_index_cells_total         | GAUGE       |
| mysql.innodb.hash_index_cells_used          | GAUGE       |
| mysql.innodb.history_list_length            | GAUGE       |
| mysql.innodb.ibuf_free_list                 | GAUGE       |
| mysql.innodb.ibuf_merged                    | RATE        |
| mysql.innodb.ibuf_merged_delete_marks       | RATE        |
| mysql.innodb.ibuf_merged_deletes            | RATE        |
| mysql.innodb.ibuf_merged_inserts            | RATE        |
| mysql.innodb.ibuf_merges                    | RATE        |
| mysql.innodb.ibuf_segment_size              | GAUGE       |
| mysql.innodb.ibuf_size                      | GAUGE       |
| mysql.innodb.lock_structs                   | GAUGE       |
| mysql.innodb.locked_tables                  | GAUGE       |
| mysql.innodb.locked_transactions            | GAUGE       |
| mysql.innodb.log_waits                      | RATE        |
| mysql.innodb.log_write_requests             | RATE        |
| mysql.innodb.log_writes                     | RATE        |
| mysql.innodb.lsn_current                    | RATE        |
| mysql.innodb.lsn_flushed                    | RATE        |
| mysql.innodb.lsn_last_checkpoint            | RATE        |
| mysql.innodb.mem_adaptive_hash              | GAUGE       |
| mysql.innodb.mem_additional_pool            | GAUGE       |
| mysql.innodb.mem_dictionary                 | GAUGE       |
| mysql.innodb.mem_file_system                | GAUGE       |
| mysql.innodb.mem_lock_system                | GAUGE       |
| mysql.innodb.mem_page_hash                  | GAUGE       |
| mysql.innodb.mem_recovery_system            | GAUGE       |
| mysql.innodb.mem_thread_hash                | GAUGE       |
| mysql.innodb.mem_total                      | GAUGE       |
| mysql.innodb.os_file_fsyncs                 | RATE        |
| mysql.innodb.os_file_reads                  | RATE        |
| mysql.innodb.os_file_writes                 | RATE        |
| mysql.innodb.os_log_pending_fsyncs          | GAUGE       |
| mysql.innodb.os_log_pending_writes          | GAUGE       |
| mysql.innodb.os_log_written                 | RATE        |
| mysql.innodb.pages_created                  | RATE        |
| mysql.innodb.pages_read                     | RATE        |
| mysql.innodb.pages_written                  | RATE        |
| mysql.innodb.pending_aio_log_ios            | GAUGE       |
| mysql.innodb.pending_aio_sync_ios           | GAUGE       |
| mysql.innodb.pending_buffer_pool_flushes    | GAUGE       |
| mysql.innodb.pending_checkpoint_writes      | GAUGE       |
| mysql.innodb.pending_ibuf_aio_reads         | GAUGE       |
| mysql.innodb.pending_log_flushes            | GAUGE       |
| mysql.innodb.pending_log_writes             | GAUGE       |
| mysql.innodb.pending_normal_aio_reads       | GAUGE       |
| mysql.innodb.pending_normal_aio_writes      | GAUGE       |
| mysql.innodb.queries_inside                 | GAUGE       |
| mysql.innodb.queries_queued                 | GAUGE       |
| mysql.innodb.read_views                     | GAUGE       |
| mysql.innodb.rows_deleted                   | RATE        |
| mysql.innodb.rows_inserted                  | RATE        |
| mysql.innodb.rows_read                      | RATE        |
| mysql.innodb.rows_updated                   | RATE        |
| mysql.innodb.s_lock_os_waits                | RATE        |
| mysql.innodb.s_lock_spin_rounds             | RATE        |
| mysql.innodb.s_lock_spin_waits              | RATE        |
| mysql.innodb.semaphore_wait_time            | GAUGE       |
| mysql.innodb.semaphore_waits                | GAUGE       |
| mysql.innodb.tables_in_use                  | GAUGE       |
| mysql.innodb.x_lock_os_waits                | RATE        |
| mysql.innodb.x_lock_spin_rounds             | RATE        |
| mysql.innodb.x_lock_spin_waits              | RATE        |

`extra_performance_metrics` añade las siguientes métricas:

| Nombre de la métrica                                     | Tipo de métrica |
| ----------------------------------------------- | ----------- |
| mysql.performance.query_run_time.avg            | GAUGE       |
| mysql.performance.digest_95th_percentile.avg_us | GAUGE       |

`schema_size_metrics` añade las siguientes métricas:

| Nombre de la métrica            | Tipo de métrica |
| ---------------------- | ----------- |
| mysql.info.schema.size | GAUGE       |

### Eventos

El check de MySQL no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "mysql" >}}


## Solucionar problemas

- [Problemas de conexión con la integración de SQL Server][8]
- [Error de host local de MySQL:  host local VS 127.0.0.1][9]
- [¿Puedo utilizar una instancia con nombre en la integración de SQL Server?][10]
- [¿Puedo configurar el check de MySQL dd-agent en mi Google CloudSQL?][11]
- [Consultas personalizadas de MySQL][12]
- [Utilizar WMI para recopilar más métricas de rendimiento de SQL Server][13]
- [¿Cómo puedo recopilar más métricas de mi integración de SQL Server?][14]
- [El usuario de la base de datos carece de privilegios][15]
- [¿Cómo se recopilan las métricas con un procedimiento almacenado de SQL?][16]

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de métricas de rendimiento de MySQL][17]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mysql/images/mysql-dash-dd-2.png
[2]: https://docs.datadoghq.com/database_monitoring/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/database_monitoring/#mysql
[5]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[6]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/integrations/guide/connection-issues-with-the-sql-server-integration/
[9]: https://docs.datadoghq.com/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/
[10]: https://docs.datadoghq.com/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/
[11]: https://docs.datadoghq.com/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
[12]: https://docs.datadoghq.com/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries/
[13]: https://docs.datadoghq.com/integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics/
[14]: https://docs.datadoghq.com/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration/
[15]: https://docs.datadoghq.com/integrations/faq/database-user-lacks-privileges/
[16]: https://docs.datadoghq.com/integrations/guide/collect-sql-server-custom-metrics/#collecting-metrics-from-a-custom-procedure
[17]: https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics
