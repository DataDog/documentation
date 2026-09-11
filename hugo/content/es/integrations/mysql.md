---
app_id: mysql
categories:
- data stores
- log collection
custom_kind: integración
description: Recopila métricas de esquemas de rendimiento, rendimiento de consultas
  y métricas personalizadas, and more.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics
  tag: blog
  text: Monitorización de las métricas de rendimiento de MySQL
integration_version: 15.7.1
media: []
supported_os:
- linux
- macos
- windows
title: MySQL
---
![Dashboard de MySQL](https://raw.githubusercontent.com/DataDog/integrations-core/master/mysql/images/mysql-dash-dd-2.png)

## Información general

La integración de MySQL controla el rendimiento de tus instancias de MySQL. Recopila métricas en relación con el rendimiento, las conexiones, los errores y métricas de InnoDB.

Activa [Database Monitoring](https://docs.datadoghq.com/database_monitoring/) (DBM) para obtener información mejorada sobre el rendimiento de las consultas y el estado de la base de datos. Además de la integración estándar, DBM de Datadog proporciona métricas a nivel de consulta, instantáneas de consultas históricas y en tiempo real, análisis de eventos de espera, carga de base de datos y planes de explicación de consultas.

Se admiten las versiones 5.6, 5.7 y 8.0 de MySQL y las versiones 10.5, 10.6, 10.11 y 11.1 de MariaDB.

## Configuración

<div class="alert alert-info">En esta page (página), se describe la integración estándar del Agent de MySQL. Si buscas el producto de Database Monitoring para MySQL, consulta <a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Database Monitoring de Datadog</a>.</div>

### Instalación

El check de MySQL está incluido en el paquete del [Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor de MySQL.

#### Preparar MySQL

**Nota**: Para instalar Database Monitoring para MySQL, selecciona tu solución de alojamiento en la [documentación de Database Monitoring](https://docs.datadoghq.com/database_monitoring/#mysql) para obtener instrucciones.

Procede con los siguientes pasos de esta guía solo si vas a instalar la integración estándar únicamente.

En cada servidor MySQL, crea un usuario de base de datos para el Datadog Agent.

Las siguientes instrucciones conceden al Agent permiso para iniciar sesión desde cualquier host mediante `datadog@'%'`. Puedes restringir al usuario `datadog` para que solo pueda iniciar sesión desde un host local mediante `datadog@'localhost'`. Consulta [Añadir cuentas, asignar privilegios y eliminar cuentas de MySQL](https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html) para obtener más información.

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

Para recopilar métricas de índices, concede al usuario `datadog` un privilegio adicional:

```shell

mysql> GRANT SELECT ON mysql.innodb_index_stats TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
```

### Configuración

Sigue las instrucciones a continuación para configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las secciones [Docker](?tab=docker#docker), [Kubernetes](?tab=kubernetes#kubernetes) o [ECS](?tab=ecs#ecs).

**Nota**: Para obtener una lista completa de las opciones de configuración disponibles, consulta el [ejemplo mysql.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example).

{{< tabs >}}

{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

Edita el archivo `MySQL.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para empezar a recopilar tus [métricas](#metric-collection) y [logs](#log-collection) de MySQL.

Para obtener una lista completa de las opciones de configuración disponibles, consulta el [ejemplo `mysql.d/conf.yaml`](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example).

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

Para recopilar `extra_performance_metrics`, tu servidor de MySQL debe tener `performance_schema` activado, de lo contrario, configura `extra_performance_metrics` en `false`. Para obtener más información sobre `performance_schema`, consulta [Inicio rápido del esquema de rendimiento de MySQL](https://dev.mysql.com/doc/refman/5.7/en/performance-schema-quick-start.html).

**Nota**: El usuario `datadog` debe establecerse en la configuración de la integración de MySQL como `host: 127.0.0.1` en lugar de `localhost`. Como alternativa, también puedes utilizar `sock`.

[Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) para empezar a enviar métricas de MySQL a Datadog.

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. De manera predeterminada, MySQL registra todo en `/var/log/syslog` que requiere acceso raíz para la lectura. Para que los logs sean más accesibles, sigue estos pasos:

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

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `mysql.d/conf.yaml` para empezar a recopilar logs de MySQL:

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

   Consulta el [ejemplo mysql.yaml](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles, incluidas las de métricas personalizadas.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Docker" %}}

#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Configura [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) como etiquetas de Docker en tu contenedor de aplicaciones:

```yaml
LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"server": "%%host%%", "username": "datadog","password": "<UNIQUEPASSWORD>"}]'
```

Consulta [variables de plantillas de Autodiscovery](https://docs.datadoghq.com/agent/faq/template_variables/) para obtener más detalles sobre el uso de `<UNIQUEPASSWORD>` como variable de entorno en lugar de una etiqueta.

#### Recopilación de logs

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent . Para activarla, consulta [Recopilación de logs de Docker](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation).

A continuación, configura [Integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas de Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"mysql","service":"mysql"}]'
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes

Para Configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [Plantillas de integraciones de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes) como anotaciones de pod en tu contenedor de aplicaciones. Alternativamente, puedes configurar plantillas con un [archivo, mapa de configuración o almacenamiento de valores de claves](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration).

**Annotations v1** (para el Datadog Agent \< v7.36)

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

Consulta [variables de plantilla de Autodiscovery](https://docs.datadoghq.com/agent/faq/template_variables/) para más detalles sobre el uso de `<UNIQUEPASSWORD>` como variable de entorno en lugar de una etiqueta.

#### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup).

A continuación, configura [Integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como anotaciones del pod. Alternativamente, puedes configurar esto con un [archivo, mapa de configuración o almacenamiento de valores de claves](https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration).

**Annotations v1/v2**

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

{{% /tab %}}

{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Configura [Plantillas de integraciones de Autodiscovery](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) como etiquetas de Docker en el contenedor de tu aplicación:

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

Consulta [variables de plantilla de Autodiscovery](https://docs.datadoghq.com/agent/faq/template_variables/) para obtener más detalles sobre el uso de `<UNIQUEPASSWORD>` como variable de entorno en lugar de una etiqueta.

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de ECS](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux).

A continuación, configura [Integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas de Docker:

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

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `MySQL` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **mysql.binlog.cache_disk_use** <br>(gauge) | El número de transacciones que utilizaron la caché temporal de logs binarios, pero que excedieron el valor de `binlog_cache_size` y utilizaron un archivo temporal para almacenar sentencias de la transacción.<br>_Mostrado como transacción_ |
| **mysql.binlog.cache_use** <br>(gauge) | El número de transacciones que utilizaron la caché de logs binarios.<br>_Mostrado como transacción_ |
| **mysql.binlog.disk_use** <br>(gauge) | Tamaño total del archivo de log binario.<br>_Mostrado como byte_ |
| **mysql.galera.wsrep_cert_deps_distance** <br>(gauge) | Muestra la distancia media entre los valores más bajos y más altos del número de secuencia, o seqno, que el nodo puede aplicar en paralelo.|
| **mysql.galera.wsrep_cluster_size** <br>(gauge) | El número actual de nodos en el clúster Galera.<br>_Mostrado como nodo_ |
| **mysql.galera.wsrep_flow_control_paused** <br>(gauge) | Muestra la fracción de tiempo, desde la última vez que se llamó a FLUSH STATUS, que el nodo estuvo en pausa debido al control de flujo.<br>_Mostrado como fracción_ |
| **mysql.galera.wsrep_flow_control_paused_ns** <br>(count) | Muestra el tiempo de pausa debido al control de flujo, en nanosegundos.<br>_Mostrado como nanosegundo_ |
| **mysql.galera.wsrep_flow_control_recv** <br>(count) | Muestra el número de veces que el nodo galera ha recibido un mensaje de control de flujo en pausa de otros|
| **mysql.galera.wsrep_flow_control_sent** <br>(count) | Muestra el número de veces que el nodo galera ha enviado un mensaje de control de flujo en pausa a otros|
| **mysql.galera.wsrep_local_cert_failures** <br>(count) | Número total de transacciones locales que no han superado el test de certificación.|
| **mysql.galera.wsrep_local_recv_queue** <br>(gauge) | Muestra el tamaño actual (instantáneo) de la cola de recepción local.|
| **mysql.galera.wsrep_local_recv_queue_avg** <br>(gauge) | Muestra el tamaño medio de la cola de recepción local desde la última consulta de FLUSH STATUS.|
| **mysql.galera.wsrep_local_send_queue** <br>(gauge) | Muestra el tamaño actual (instantáneo) de la longitud de la cola de envío desde la última consulta de FLUSH STATUS.|
| **mysql.galera.wsrep_local_send_queue_avg** <br>(gauge) | Muestra un promedio de la longitud de la cola de envío desde la última consulta de FLUSH STATUS.|
| **mysql.galera.wsrep_local_state** <br>(gauge) | Número de estado interno del clúster Galera|
| **mysql.galera.wsrep_received** <br>(gauge) | Número total de conjuntos de escritura recibidos de otros nodos.|
| **mysql.galera.wsrep_received_bytes** <br>(gauge) | Tamaño total (en bytes) de los conjuntos de escritura recibidos de otros nodos.|
| **mysql.galera.wsrep_replicated_bytes** <br>(gauge) | Tamaño total (en bytes) de los conjuntos de escritura enviados a otros nodos.|
| **mysql.index.deletes** <br>(gauge) | Número de operaciones de borrado que utilizan un índice. Se restablece a 0 al reiniciar la base de datos.<br>_Mostrado como operación_. |
| **mysql.index.reads** <br>(gauge) | Número de operaciones de lectura que utilizan un índice. Se restablece a 0 al reiniciar la base de datos.<br>_Mostrado como operación_. |
| **mysql.index.size** <br>(gauge) | Tamaño del índice en bytes<br>_Se muestra como byte_ |
| **mysql.index.updates** <br>(gauge) | Número de operaciones de actualización que utilizan un índice. Se restablece a 0 al reiniciar la base de datos.<br>_Mostrado como operación_ |
| **mysql.info.schema.size** <br>(gauge) | Tamaño de los esquemas en MiB<br>_Se muestra como mebibyte_ |
| **mysql.info.table.data_size** <br>(gauge) | Tamaño de los datos de las tablas en MiB<br>_Se muestra como mebibyte_ |
| **mysql.info.table.index_size** <br>(gauge) | Tamaño del índice de las tablas en MiB<br>_Se muestra como mebibyte_ |
| **mysql.info.table.rows.changed** <br>(count) | Número total de filas modificadas por tabla (solo estado de usuario de Percona)<br>_Mostrado como fila_ |
| **mysql.info.table.rows.read** <br>(count) | Número total de filas leídas por tabla (solo estado de usuario de Percona)<br>_Mostrado como fila_ |
| **mysql.innodb.active_transactions** <br>(gauge) | El número de transacciones activas en tablas de InnoDB.<br>_Mostrado como operación_ |
| **mysql.innodb.buffer_pool_data** <br>(gauge) | El número total de bytes en la reserva de búferes de InnoDB que contienen datos. El número incluye tanto las páginas sucias como las limpias.<br>_Mostrado como byte_ |
| **mysql.innodb.buffer_pool_dirty** <br>(gauge) | El número total actual de bytes retenidos en páginas sucias en la reserva de búferes de InnoDB.<br>_Mostrado como byte_ |
| **mysql.innodb.buffer_pool_free** <br>(gauge) | El número de bytes libres en la reserva de búferes de InnoDB.<br>_Mostrado como byte_ |
| **mysql.innodb.buffer_pool_pages_data** <br>(gauge) | El número de páginas en la reserva de búferes de InnoDB que contienen datos. El número incluye tanto las páginas sucias como las limpias.<br>_Mostrado como page (página)_ |
| **mysql.innodb.buffer_pool_pages_dirty** <br>(gauge) | El número actual de páginas sucias en la reserva de búferes de InnoDB.<br>_Mostrado como page (página)_ |
| **mysql.innodb.buffer_pool_pages_flushed** <br>(gauge) | El número de solicitudes para vaciar páginas de la reserva de búferes de InnoDB.<br>_Mostrado como page (página)_ |
| **mysql.innodb.buffer_pool_pages_free** <br>(gauge) | Número de páginas libres en la reserva de búferes de InnoDB.<br>_Mostrado como page (página)_ |
| **mysql.innodb.buffer_pool_pages_total** <br>(gauge) | El tamaño total de la reserva de búferes de InnoDB, en páginas.<br>_Mostrado como page (página)_ |
| **mysql.innodb.buffer_pool_read_ahead** <br>(gauge) | El número de páginas leídas en la reserva de búferes de InnoDB por el hilo de lectura en segundo plano.<br>_Mostrado como page (página)_ |
| **mysql.innodb.buffer_pool_read_ahead_evicted** <br>(gauge) | El número de páginas leídas en la reserva de búferes de InnoDB por el hilo de lectura en segundo plano que fueron desalojadas posteriormente sin haber sido accedidas por las consultas.<br>_Mostrado como page (página)_ |
| **mysql.innodb.buffer_pool_read_ahead_rnd** <br>(gauge) | El número de lecturas aleatorias iniciadas por InnoDB. Esto ocurre cuando una consulta explora una gran parte de una tabla, pero en orden aleatorio.<br>_Mostrado como operación_. |
| **mysql.innodb.buffer_pool_read_requests** <br>(gauge) | El número de solicitudes de lecturas lógicas.<br>_Mostrado como lectura_ |
| **mysql.innodb.buffer_pool_reads** <br>(gauge) | El número de lecturas lógicas que InnoDB no pudo satisfacer desde la reserva de búferes y tuvo que leer directamente del disco.<br>_Mostrado como lectura_ |
| **mysql.innodb.buffer_pool_total** <br>(gauge) | El número total de bytes en la reserva de búferes de InnoDB.<br>_Mostrado como byte_ |
| **mysql.innodb.buffer_pool_used** <br>(gauge) | El número de bytes utilizados en la reserva de búferes de InnoDB.<br>_Mostrado como byte_ |
| **mysql.innodb.buffer_pool_utilization** <br>(gauge) | La utilización de la reserva de búferes de InnoDB.<br>_Mostrado como fracción_ |
| **mysql.innodb.buffer_pool_wait_free** <br>(count) | Cuando InnoDB necesita leer o crear un page (página) y no hay páginas limpias disponibles, InnoDB vacía primero algunas páginas sucias y espera a que termine la operación. Este contador cuenta las instancias de estas esperas.<br>_Mostrado como espera_ |
| **mysql.innodb.buffer_pool_write_requests** <br>(gauge) | Número de escrituras realizadas en la reserva de búferes de InnoDB.<br>_Mostrado como escritura_ |
| **mysql.innodb.checkpoint_age** <br>(gauge) | Edad del punto de control como se muestra en la sección LOG de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.current_row_locks** <br>(gauge) | El número de bloqueos de filas actuales.<br>_Shown as bloqueo_ |
| **mysql.innodb.current_transactions** <br>(gauge) | Transacciones actuales de InnoDB<br>_Mostrado como transacción_ |
| **mysql.innodb.data_fsyncs** <br>(gauge) | El número de operaciones fsync() por segundo.<br>_Mostrado como operación_ |
| **mysql.innodb.data_pending_fsyncs** <br>(gauge) | El número actual de operaciones fsync() pendientes.<br>_Mostrado como operación_ |
| **mysql.innodb.data_pending_reads** <br>(gauge) | El número actual de lecturas pendientes.<br>_Shown as lectura_ |
| **mysql.innodb.data_pending_writes** <br>(gauge) | El número actual de escrituras pendientes.<br>_Shown as escritura_ |
| **mysql.innodb.data_read** <br>(gauge) | La cantidad de datos leídos por segundo.<br>_Se muestra como byte_ |
| **mysql.innodb.data_reads** <br>(gauge) | La tasa de lecturas de datos.<br>_Shown as lectura_ |
| **mysql.innodb.data_writes** <br>(gauge) | La tasa de escrituras de datos.<br>_Shown as escritura_ |
| **mysql.innodb.data_written** <br>(gauge) | La cantidad de datos escritos por segundo.<br>_Se muestra como byte_ |
| **mysql.innodb.dblwr_pages_written** <br>(gauge) | El número de páginas escritas por segundo en el búfer de doble escritura.<br>_Shown as page (página)_ |
| **mysql.innodb.dblwr_writes** <br>(gauge) | El número de operaciones de doble escritura realizadas por segundo.<br>_Mostrado como byte_ |
| **mysql.innodb.deadlocks** <br>(count) | El número de bloqueos.<br>_Shown as bloqueo_ |
| **mysql.innodb.hash_index_cells_total** <br>(gauge) | Número total de celdas del índice hash adaptativo|
| **mysql.innodb.hash_index_cells_used** <br>(gauge) | Número de celdas utilizadas del índice hash adaptativo|
| **mysql.innodb.history_list_length** <br>(gauge) | Longitud de la lista de historial como se muestra en la sección TRANSACTIONS de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.ibuf_free_list** <br>(gauge) | Lista libre de búferes de inserción, como se muestra en la sección INSERT BUFFER AND ADAPTIVE HASH INDEX de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.ibuf_merged** <br>(gauge) | Búfer de inserción e índice hash adaptativo fusionados<br>_Mostrado como operación_ |
| **mysql.innodb.ibuf_merged_delete_marks** <br>(gauge) | Marcas de borrado de búfer de inserción e índice hash adaptativo fusionados<br>_Mostrado como operación_ |
| **mysql.innodb.ibuf_merged_deletes** <br>(gauge) | Búfer de inserción e índice hash adaptativo fusionados borrados<br>_Mostrado como operación_ |
| **mysql.innodb.ibuf_merged_inserts** <br>(gauge) | Inserciones de búfer de inserción e índice hash adaptativo fusionados<br>_Mostrado como operación_ |
| **mysql.innodb.ibuf_merges** <br>(gauge) | Fusiones de búfer de inserción e índice hash adaptativo<br>_Mostrado como operación_ |
| **mysql.innodb.ibuf_segment_size** <br>(gauge) | Tamaño del segmento del búfer de inserción, como se muestra en la sección INSERT BUFFER AND ADAPTIVE HASH INDEX de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.ibuf_size** <br>(gauge) | Tamaño del búfer de inserción, como se muestra en la sección INSERT BUFFER AND ADAPTIVE HASH INDEX de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.lock_structs** <br>(gauge) | Estructuras de bloqueo<br>_Mostrado como operación_ |
| **mysql.innodb.locked_tables** <br>(gauge) | Tablas bloqueadas<br>_Mostrado como operación_ |
| **mysql.innodb.log_waits** <br>(gauge) | Número de veces que el búfer de log era demasiado pequeño y fue necesario esperar a que se vaciara antes de continuar.<br>_Mostrado como espera_ |
| **mysql.innodb.log_write_requests** <br>(gauge) | El número de solicitudes de escritura para el log de rehacer de InnoDB.<br>_Mostrado como escritura_ |
| **mysql.innodb.log_writes** <br>(gauge) | El número de escrituras físicas en el archivo de log de rehacer de InnoDB.<br>_Mostrado como escritura_ |
| **mysql.innodb.lsn_current** <br>(gauge) | Número de secuencia de logs como se muestra en la sección LOGS de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.lsn_flushed** <br>(gauge) | Vaciado hasta el número de secuencia de logs como se muestra en la sección LOG de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.lsn_last_checkpoint** <br>(gauge) | Último punto de control del número de secuencia de logs como se muestra en la sección LOG de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.mem_adaptive_hash** <br>(gauge) | Como se muestra en la sección BUFFER POOL AND MEMORY de la salida SHOW ENGINE INNODB STATUS.<br>_Mostrado como byte_ |
| **mysql.innodb.mem_additional_pool** <br>(gauge) | Como se muestra en la sección BUFFER POOL AND MEMORY de la salida SHOW ENGINE INNODB STATUS. Solo disponible en MySQL 5.6.<br>_Mostrado como byte_ |
| **mysql.innodb.mem_dictionary** <br>(gauge) | Como se muestra en la sección BUFFER POOL AND MEMORY de la salida SHOW ENGINE INNODB STATUS.<br>_Mostrado como byte_ |
| **mysql.innodb.mem_file_system** <br>(gauge) | Como se muestra en la sección BUFFER POOL AND MEMORY de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.mem_lock_system** <br>(gauge) | Como se muestra en la sección BUFFER POOL AND MEMORY de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.mem_page_hash** <br>(gauge) | Como se muestra en la sección BUFFER POOL AND MEMORY de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.mem_recovery_system** <br>(gauge) | Como se muestra en la sección BUFFER POOL AND MEMORY de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.mem_total** <br>(gauge) | Como se muestra en la sección BUFFER POOL AND MEMORY de la salida SHOW ENGINE INNODB STATUS.<br>_Mostrado como byte_ |
| **mysql.innodb.mutex_os_waits** <br>(gauge) | La tasa de esperas del sistema operativo mutex. Solo disponible en MySQL 5.6 y 5.7.<br>_Mostrado como evento_. |
| **mysql.innodb.mutex_spin_rounds** <br>(gauge) | La tasa de rondas de giro del mutex. Solo disponible en MySQL 5.6 y 5.7.<br>_Mostrado como evento_. |
| **mysql.innodb.mutex_spin_waits** <br>(gauge) | La tasa de esperas de giro del mutex. Solo disponible en MySQL 5.6 y 5.7.<br>_Mostrado como evento_. |
| **mysql.innodb.os_file_fsyncs** <br>(gauge) | (Delta) Número total de operaciones fsync() realizadas por InnoDB.<br>_Mostrado como operación_ |
| **mysql.innodb.os_file_reads** <br>(gauge) | (Delta) El número total de lecturas de archivos realizadas por hilos de lectura en InnoDB.<br>_Mostrado como operación_ |
| **mysql.innodb.os_file_writes** <br>(gauge) | (Delta) El número total de escrituras de archivos realizadas por hilos de escritura en InnoDB.<br>_Mostrado como operación_ |
| **mysql.innodb.os_log_fsyncs** <br>(gauge) | La tasa de escrituras fsync en el archivo de log.<br>_Mostrado como escritura_ |
| **mysql.innodb.os_log_pending_fsyncs** <br>(gauge) | Número de solicitudes fsync (sincronización con disco) de log de InnoDBpendientes.<br>_Mostrado como operación_ |
| **mysql.innodb.os_log_pending_writes** <br>(gauge) | Número de escrituras de logs de InnoDB pendientes.<br>_Mostrado como escritura_ |
| **mysql.innodb.os_log_written** <br>(gauge) | Número de bytes escritos en log de InnoDB.<br>_Mostrado como byte_ |
| **mysql.innodb.pages_created** <br>(gauge) | Número de páginas de InnoDB creadas.<br>_Mostrado como page (página)_ |
| **mysql.innodb.pages_read** <br>(gauge) | Número de páginas InnoDB leídas.<br>_Mostrado como page (página)_ |
| **mysql.innodb.pages_written** <br>(gauge) | Número de páginas InnoDB escritas.<br>_Mostrado como page (página)_ |
| **mysql.innodb.pending_aio_log_ios** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.pending_aio_sync_ios** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.pending_buffer_pool_flushes** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS.<br>_Mostrado como vaciado_ |
| **mysql.innodb.pending_checkpoint_writes** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.pending_ibuf_aio_reads** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.pending_log_flushes** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS. Solo disponible en MySQL 5.6 y 5.7.<br>_Mostrado como vaciado_. |
| **mysql.innodb.pending_log_writes** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS. Solo disponible en MySQL 5.6 y 5.7.<br>_Mostrado como escritura_. |
| **mysql.innodb.pending_normal_aio_reads** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS.<br>_Mostrado como lectura_ |
| **mysql.innodb.pending_normal_aio_writes** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS.<br>_Mostrado como escritura_ |
| **mysql.innodb.queries_inside** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS.<br>_Mostrado como consulta_ |
| **mysql.innodb.queries_queued** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS.<br>_Mostrado como consulta_ |
| **mysql.innodb.read_views** <br>(gauge) | Como se muestra en la sección FILE I/O de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.row_lock_current_waits** <br>(gauge) | El número de bloqueos de fila actualmente en espera por operaciones en tablas de InnoDB.|
| **mysql.innodb.row_lock_time** <br>(gauge) | El tiempo empleado en adquirir bloqueos de fila.<br>_Mostrado como milisegundo_ |
| **mysql.innodb.row_lock_waits** <br>(gauge) | El número de veces por segundo que se ha tenido que esperar un bloqueo de fila.<br>_Mostrado como evento_ |
| **mysql.innodb.rows_deleted** <br>(gauge) | Número de filas eliminadas de las tablas de InnoDB.<br>_Mostrado como fila_ |
| **mysql.innodb.rows_inserted** <br>(gauge) | Número de filas insertadas en tablas de InnoDB.<br>_Mostrado como fila_ |
| **mysql.innodb.rows_read** <br>(gauge) | Número de filas leídas de las tablas de InnoDB.<br>_Mostrado como fila_ |
| **mysql.innodb.rows_updated** <br>(gauge) | Número de filas actualizadas en tablas de InnoDB.<br>_Mostrado como fila_ |
| **mysql.innodb.s_lock_os_waits** <br>(gauge) | Como se muestra en la sección SEMÁFOROS de la salida SHOW ENGINE INNODB STATUS|
| **mysql.innodb.s_lock_spin_rounds** <br>(gauge) | Como se muestra en la sección SEMÁFOROS de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.s_lock_spin_waits** <br>(gauge) | Como se muestra en la sección SEMAPHORES de la salida SHOW ENGINE INNODB STATUS.<br>_Mostrado como espera_ |
| **mysql.innodb.semaphore_wait_time** <br>(gauge) | Tiempo de espera en semáforo|
| **mysql.innodb.semaphore_waits** <br>(gauge) | El número de semáforos actualmente en espera por operaciones en tablas de InnoDB.|
| **mysql.innodb.tables_in_use** <br>(gauge) | Tablas en uso<br>_Mostrado como operación_ |
| **mysql.innodb.x_lock_os_waits** <br>(gauge) | Como se muestra en la sección SEMAPHORES de la salida SHOW ENGINE INNODB STATUS.<br>_Mostrado como espera_ |
| **mysql.innodb.x_lock_spin_rounds** <br>(gauge) | Como se muestra en la sección SEMAPHORES de la salida SHOW ENGINE INNODB STATUS.|
| **mysql.innodb.x_lock_spin_waits** <br>(gauge) | Como se muestra en la sección SEMAPHORES de la salida SHOW ENGINE INNODB STATUS.<br>_Mostrado como espera_ |
| **mysql.myisam.key_buffer_bytes_unflushed** <br>(gauge) | Bytes del búfer de claves de MyISAM sin vaciar.<br>_Mostrado como byte_ |
| **mysql.myisam.key_buffer_bytes_used** <br>(gauge) | Bytes del búfer de claves de MyISAM utilizados.<br>_Mostrado como byte_ |
| **mysql.myisam.key_buffer_size** <br>(gauge) | Tamaño del búfer utilizado para los bloques de índice.<br>_Mostrado como byte_ |
| **mysql.myisam.key_read_requests** <br>(gauge) | Número de solicitudes para leer un bloque de claves de la caché de claves de MyISAM.<br>_Mostrado como leído_ |
| **mysql.myisam.key_reads** <br>(gauge) | El número de lecturas físicas de un bloque de claves desde el disco a la caché de claves de MyISAM. Si `key_reads` es grande, es probable que el valor de clave_bpufer_tamaño sea demasiado pequeño. La tasa de fallos de la caché puede calcularse como `key_reads`/`key_read_requests`.<br>_Mostrado como lectura_. |
| **mysql.myisam.key_write_requests** <br>(gauge) | Número de solicitudes para escribir un bloque de claves en la caché de claves de MyISAM.<br>_Mostrado como escritura_ |
| **mysql.myisam.key_writes** <br>(gauge) | Número de escrituras físicas de un bloque de claves desde la caché de claves de MyISAM al disco.<br>_Mostrado como escritura_ |
| **mysql.net.aborted_clients** <br>(gauge) | El número de conexiones que se abortaron porque el cliente murió sin cerrar la connection (conexión) correctamente.<br>_Mostrado como connection (conexión)_ |
| **mysql.net.aborted_connects** <br>(gauge) | Número de intentos fallidos de conexión con el servidor de MySQL.<br>_Mostrado como connection (conexión)_ |
| **mysql.net.connections** <br>(gauge) | La tasa de conexiones al servidor.<br>_Mostrado como connection (conexión)_ |
| **mysql.net.max_connections** <br>(gauge) | El número máximo de conexiones que han estado en uso simultáneamente desde que se inició el servidor.<br>_Mostrado como connection (conexión) |
| **mysql.net.max_connections_available** <br>(gauge) | El número máximo permitido de conexiones simultáneas del cliente.<br>_Mostrado como connection (conexión)_ |
| **mysql.performance.bytes_received** <br>(gauge) | El número de bytes recibidos de todos los clientes.<br>_Mostrado como byte_ |
| **mysql.performance.bytes_sent** <br>(gauge) | El número de bytes enviados a todos los clientes.<br>_Mostrado como byte_ |
| **mysql.performance.com_delete** <br>(gauge) | La tasa de sentencias de borrado.<br>_Shown as consulta_ |
| **mysql.performance.com_delete_multi** <br>(gauge) | La tasa de sentencias de borrado múltiple.<br>_Mostrado como consulta_ |
| **mysql.performance.com_insert** <br>(gauge) | La tasa de sentencias de inserción.<br>_Shown as consulta_ |
| **mysql.performance.com_insert_select** <br>(gauge) | La tasa de sentencias inserción y selección.<br>_Mostrado como consulta_ |
| **mysql.performance.com_load** <br>(gauge) | La tasa de sentencias de carga.<br>_Mostrado como consulta_ |
| **mysql.performance.com_replace** <br>(gauge) | La tasa de sentencias de sustitución.<br>_Mostrado como consulta_ |
| **mysql.performance.com_replace_select** <br>(gauge) | La tasa de sentencias de sustituir y seleccionar.<br>_Mostrado como consulta_ |
| **mysql.performance.com_select** <br>(gauge) | La tasa de sentencias de selección.<br>_Shown as consulta_ |
| **mysql.performance.com_update** <br>(gauge) | La tasa de sentencias de actualización.<br>_Mostrado como consulta_ |
| **mysql.performance.com_update_multi** <br>(gauge) | La tasa de actualización múltiple.<br>_Mostrado como consulta_ |
| **mysql.performance.cpu_time** <br>(gauge) | Porcentaje de tiempo de CPU empleado por MySQL.<br>_Mostrado como porcentaje_ |
| **mysql.performance.created_tmp_disk_tables** <br>(gauge) | Tasa de tablas temporales internas en disco creadas por segundo por el servidor durante la ejecución de sentencias.<br>_Mostrado como tabla_ |
| **mysql.performance.created_tmp_files** <br>(gauge) | La tasa de archivos temporales creados por segundo.<br>_Mostrado como archivo_ |
| **mysql.performance.created_tmp_tables** <br>(gauge) | Tasa de tablas temporales internas creadas por segundo por el servidor durante la ejecución de sentencias.<br>_Mostrado como tabla_ |
| **mysql.performance.digest_95th_percentile.avg_us** <br>(gauge) | Percentil 95 por esquema de tiempo de respuesta de consulta.<br>_Mostrado en microsegundos_ |
| **mysql.performance.handler_commit** <br>(gauge) | El número de sentencias COMMIT internas.<br>_Mostrado como operación_ |
| **mysql.performance.handler_delete** <br>(gauge) | El número de sentencias DELETE internas.<br>_Mostrado como operación_ |
| **mysql.performance.handler_prepare** <br>(gauge) | El número de sentencias PREPARE internas.<br>_Mostrado como operación_ |
| **mysql.performance.handler_read_first** <br>(gauge) | El número de sentencias internas READ_FIRST.<br>_Mostrado como operación_ |
| **mysql.performance.handler_read_key** <br>(gauge) | El número de sentencias internas READ_KEY.<br>_Mostrado como operación_ |
| **mysql.performance.handler_read_next** <br>(gauge) | El número de sentencias internas READ_NEXT.<br>_Mostrado como operación_ |
| **mysql.performance.handler_read_prev** <br>(gauge) | El número de sentencias internas READ_PREV.<br>_Mostrado como operación_ |
| **mysql.performance.handler_read_rnd** <br>(gauge) | El número de sentencias internas READ_RND.<br>_Mostrado como operación_ |
| **mysql.performance.handler_read_rnd_next** <br>(gauge) | El número de sentencias internas READ_RND_NEXT.<br>_Mostrado como operación_ |
| **mysql.performance.handler_rollback** <br>(gauge) | El número de sentencias ROLLBACK internas.<br>_Mostrado como operación_ |
| **mysql.performance.handler_update** <br>(gauge) | El número de sentencias UPDATE internas.<br>_Mostrado como operación_ |
| **mysql.performance.handler_write** <br>(gauge) | El número de sentencias WRITE internas.<br>_Mostrado como operación_ |
| **mysql.performance.kernel_time** <br>(gauge) | Porcentaje de tiempo de CPU empleado en el espacio del núcleo por MySQL.<br>_Mostrado como porcentaje_. |
| **mysql.performance.key_cache_utilization** <br>(gauge) | La relación de utilización de la caché de claves.<br>_Mostrado como fracción_ |
| **mysql.performance.max_prepared_stmt_count** <br>(gauge) | El máximo permitido de sentencias preparadas en el servidor.|
| **mysql.performance.open_files** <br>(gauge) | El número de archivos abiertos.<br>_Mostrado como archivo_ |
| **mysql.performance.open_tables** <br>(gauge) | El número de tablas que están abiertas.<br>_Mostrado como tabla_ |
| **mysql.performance.opened_tables** <br>(gauge) | El número de tablas que se han abierto. Si `opened_tables` es grande, su valor `table_open_cache` es probablemente demasiado pequeño.<br>_Mostrado como tabla_. |
| **mysql.performance.performance_schema_digest_lost** <br>(gauge) | El número de instancias de compendio que no pudieron instrumentarse en la tabla eventos_sentencias_resumen_por_compendio. Puede ser distinto de cero si el valor de rendimiento_esquema_compendios_tamaño es demasiado pequeño.|
| **mysql.performance.prepared_stmt_count** <br>(gauge) | El número actual de sentencias preparadas.<br>_Mostrado como consulta_ |
| **mysql.performance.qcache.utilization** <br>(gauge) | Fracción de la memoria caché de consultas que se está utilizando actualmente.<br>_Mostrado como fracción_ |
| **mysql.performance.qcache_free_blocks** <br>(gauge) | El número de bloques de memoria libres en la caché de consulta.<br>_Mostrado como bloque_ |
| **mysql.performance.qcache_free_memory** <br>(gauge) | La cantidad de memoria libre para la caché de consultas.<br>_Mostrado como byte_ |
| **mysql.performance.qcache_hits** <br>(gauge) | Tasa de aciertos en la caché de consultas.<br>_Mostrado como acierto_ |
| **mysql.performance.qcache_inserts** <br>(gauge) | Número de consultas añadidas a la caché de consultas.<br>_Mostrado como consulta_ |
| **mysql.performance.qcache_lowmem_prunes** <br>(gauge) | Número de consultas borradas de la caché de consultas por falta de memoria.<br>_Mostrado como consulta_ |
| **mysql.performance.qcache_not_cached** <br>(gauge) | El número de consultas no almacenadas en caché (no almacenables en caché o no almacenadas en caché debido a la configuración de `query_cache_type`).<br>_Mostrado como consulta_ |
| **mysql.performance.qcache_queries_in_cache** <br>(gauge) | Número de consultas registradas en la caché de consultas.<br>_Mostrado como consulta_ |
| **mysql.performance.qcache_size** <br>(gauge) | La cantidad de memoria asignada para almacenar en caché los resultados de la consulta.<br>_Mostrado como byte_ |
| **mysql.performance.qcache_total_blocks** <br>(gauge) | Número total de bloques en la caché de consultas.<br>_Mostrado como bloque_ |
| **mysql.performance.queries** <br>(gauge) | La tasa de consultas.<br>_Mostrado como consulta_ |
| **mysql.performance.query_run_time.avg** <br>(gauge) | Tiempo medio de respuesta de consulta por esquema.<br>_Mostrado en microsegundos_ |
| **mysql.performance.questions** <br>(gauge) | La tasa de sentencias ejecutadas por el servidor.<br>_Mostrado como consulta_ |
| **mysql.performance.select_full_join** <br>(gauge) | El número de uniones que realizan exploraciones de tablas porque no utilizan índices. Si este valor no es 0, debes comprobar cuidadosamente los índices de tus tablas.<br>_Mostrado como operación_. |
| **mysql.performance.select_full_range_join** <br>(gauge) | El número de uniones que utilizaron una búsqueda de rango en una tabla de referencia.<br>_Mostrado como operación_ |
| **mysql.performance.select_range** <br>(gauge) | El número de uniones que utilizaron rangos en la primera tabla. Normalmente, este no es un problema crítico, incluso si el valor es bastante grande.<br>_Mostrado como operación_. |
| **mysql.performance.select_range_check** <br>(gauge) | El número de uniones sin claves que comprueban el uso de claves después de cada fila. Si no es 0, debes comprobar cuidadosamente los índices de tus tablas.<br>_Mostrado como operación_. |
| **mysql.performance.select_scan** <br>(gauge) | El número de uniones que hicieron una exploración completa de la primera tabla.<br>_Mostrado como operación_ |
| **mysql.performance.slow_queries** <br>(gauge) | La tasa de consultas lentas (consultas de logs que superan un tiempo de ejecución determinado).<br>_Mostrado como consulta_ |
| **mysql.performance.sort_merge_passes** <br>(gauge) | El número de pasadas de fusión que ha tenido que hacer el algoritmo de clasificación. Si este valor es grande, debes considerar aumentar el valor de la variable del sistema `sort_buffer_size`.<br>_Mostrado como operación_. |
| **mysql.performance.sort_range** <br>(gauge) | El número de clasificaciones que se han realizado utilizando rangos.<br>_Mostrado como operación_ |
| **mysql.performance.sort_rows** <br>(gauge) | El número de filas ordenadas.<br>_Mostrado como operación_ |
| **mysql.performance.sort_scan** <br>(gauge) | El número de clasificaciones que se han realizado explorando la tabla.<br>_Mostrado como operación_ |
| **mysql.performance.table_cache_hits** <br>(gauge) | Número de aciertos en las búsquedas de la caché de tablas abiertas.<br>_Mostrado como acierto_ |
| **mysql.performance.table_cache_misses** <br>(gauge) | Número de fallos en las búsquedas de la caché de tablas abiertas.<br>_Mostrado como fallo_ |
| **mysql.performance.table_locks_immediate** <br>(gauge) | El número de veces que una solicitud de bloqueo de una tabla podría concederse inmediatamente.|
| **mysql.performance.table_locks_immediate.rate** <br>(gauge) | Porcentaje de veces que una solicitud de bloqueo de una tabla puede concederse inmediatamente.|
| **mysql.performance.table_locks_waited** <br>(gauge) | Número total de veces que una solicitud de bloqueo de tabla no pudo concederse inmediatamente y fue necesario esperar.|
| **mysql.performance.table_locks_waited.rate** <br>(gauge) | Porcentaje de veces que una solicitud de bloqueo de una tabla no pudo concederse inmediatamente y fue necesario esperar.|
| **mysql.performance.table_open_cache** <br>(gauge) | El número de tablas abiertas para todos los hilos. Incrementar este valor incrementa el número de descriptores de archivo que requiere mysqld.|
| **mysql.performance.thread_cache_size** <br>(gauge) | Cuántos hilos debe almacenar en caché el servidor para su reutilización. Cuando un cliente se desconecta, los hilos del cliente se ponen en la caché si hay menos de `thread_cache_size` hilos allí.<br>_Mostrado como byte_. |
| **mysql.performance.threads_cached** <br>(gauge) | El número de hilos en la caché de hilos.<br>_Mostrado como hilo_ |
| **mysql.performance.threads_connected** <br>(gauge) | El número de conexiones abiertas actualmente.<br>_Mostrado como connection (conexión)_ |
| **mysql.performance.threads_created** <br>(count) | El número de hilos creados para manejar las conexiones. Si `threads_created` es grande, es posible que desees aumentar el valor de `thread_cache_size`.<br>_Mostrado como hilo_. |
| **mysql.performance.threads_running** <br>(gauge) | El número de hilos que no están inactivos.<br>_Mostrado como hilo_ |
| **mysql.performance.user_connections** <br>(gauge) | El número de conexiones de usuario. Etiquetas: `processlist_db`, `processlist_host`, `processlist_state`, `processlist_user`<br> _Mostrado como connection (conexión)_ |
| **mysql.performance.user_time** <br>(gauge) | Porcentaje de tiempo de CPU empleado en el espacio de usuario por MySQL.<br>_Mostrado como porcentaje_. |
| **mysql.queries.count** <br>(count) | El count total de consultas ejecutadas por consulta normalizada y esquema. (Solo DBM)<br>_Mostrado como consulta_. |
| **mysql.queries.errors** <br>(count) | El count total de consultas ejecutadas con un error por consulta y esquema normalizados. (Solo DBM)<br>_Mostrado como error_. |
| **mysql.queries.lock_time** <br>(count) | Tiempo total de espera de bloqueos por consulta y esquema normalizados. (Solo DBM)<br>_Mostrado como nanosegundo_. |
| **mysql.queries.no_good_index_used** <br>(count) | El count total de consultas que utilizaron un índice menor que el óptimo por consulta y esquema normalizados. (Solo DBM)<br>_Mostrado como consulta_. |
| **mysql.queries.no_index_used** <br>(count) | El count total de consultas que no utilizan un índice por consulta y esquema normalizados. (Solo DBM)<br>_Mostrado como consulta_. |
| **mysql.queries.rows_affected** <br>(count) | Número de filas mutadas por consulta y esquema normalizados. (Solo DBM)<br>_Mostrado como fila_. |
| **mysql.queries.rows_examined** <br>(count) | Número de filas examinadas por consulta y esquema normalizados. (Solo DBM)<br>_Mostrado como fila_. |
| **mysql.queries.rows_sent** <br>(count) | Número de filas enviadas por consulta y esquema normalizados. (Solo DBM)<br>_Mostrado como fila_. |
| **mysql.queries.select_full_join** <br>(count) | El count total de exploraciones de tabla completa en una tabla unida por consulta y esquema normalizados. (Solo DBM)|
| **mysql.queries.select_scan** <br>(count) | El count total de exploraciones de tabla completa en la primera tabla por consulta y esquema normalizados. (Solo DBM)|
| **mysql.queries.time** <br>(count) | El tiempo total de ejecución de la consulta por consulta y esquema normalizados. (Solo DBM)<br>_Mostrado como nanosegundo_. |
| **mysql.replication.group.conflicts_detected** <br>(gauge) | Número de transacciones que no han pasado el check de detección de conflictos.<br>_Mostrado como transacción_ |
| **mysql.replication.group.member_status** <br>(gauge) | Información sobre el estado del nodo en un entorno de replicación de grupo, siempre igual a 1.|
| **mysql.replication.group.transactions** <br>(gauge) | El número de transacciones en la cola pendientes de checks de detección de conflictos.<br>_Mostrado como transacción_ |
| **mysql.replication.group.transactions_applied** <br>(gauge) | Número de transacciones que este miembro ha recibido del grupo y ha aplicado.<br>_Mostrado como transacción_ |
| **mysql.replication.group.transactions_check** <br>(gauge) | El número de transacciones que se han comprobado en busca de conflictos.<br>_Mostrado como transacción_ |
| **mysql.replication.group.transactions_in_applier_queue** <br>(gauge) | El número de transacciones que este miembro ha recibido del grupo de replicación y que están a la espera de ser aplicadas.<br>_Mostrado como transacción_ |
| **mysql.replication.group.transactions_proposed** <br>(gauge) | Número de transacciones que se originaron en este miembro y se enviaron al grupo.<br>_Mostrado como transacción_ |
| **mysql.replication.group.transactions_rollback** <br>(gauge) | Número de transacciones que se originaron en este miembro y fueron revertidas por el grupo.<br>_Mostrado como transacción_ |
| **mysql.replication.group.transactions_validating** <br>(gauge) | Número de filas de transacciones que pueden utilizarse para la certificación, pero que no se han recolectado de la basura.<br>_Mostrado como transacción_ |
| **mysql.replication.replicas_connected** <br>(gauge) | Número de réplicas conectadas a una source (fuente) de réplicas.|
| **mysql.replication.seconds_behind_master** <br>(gauge) | El desfase en segundos entre el patrón y el esclavo.<br>_Mostrado como segundo_ |
| **mysql.replication.seconds_behind_source** <br>(gauge) | El desfase en segundos entre la source (fuente) y la réplica.<br>_Mostrado como segundo_ |
| **mysql.replication.slave_running** <br>(gauge) | Obsoleto. Utiliza un check de servicios mysql.replication.replica_running en su lugar. Un booleano que muestra si este servidor es un esclavo/patrón de réplica que se está ejecutando.|
| **mysql.replication.slaves_connected** <br>(gauge) | Obsoleto. Utiliza `MySQL.replication.replicas_connected` en su lugar. Número de esclavos conectados a un patrón de réplica.|

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

**mysql.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la instancia MySQL monitorizada. En caso contrario, devuelve `OK`.

_Estados: ok, crítico_

**mysql.replication.slave_running**

Obsoleto. Devuelve CRÍTICO para una réplica que no esté ejecutando Esclavo_IO_En ejecución ni Esclavo_SQL_En ejecución, ADVERTENCIA si una de las dos no está ejecutándose. En caso contrario, devuelve `OK`.

_Estados: ok, advertencia, crítico_

**mysql.replication.replica_running**

Devuelve CRÍTICO para una réplica que no esté ejecutando Réplica_IO_En ejecución ni Réplica_SQL_En ejeución, ADVERTENCIA si una de las dos no está ejecutándose. En caso contrario, devuelve `OK`.

_Estados: ok, advertencia, crítico_

**mysql.replication.group.status**

Devuelve `OK` si el estado del host es EN LÍNEA, devuelve `CRITICAL` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

- [Problemas de connection (conexión) con la integración del servidor de SQL](https://docs.datadoghq.com/integrations/guide/connection-issues-with-the-sql-server-integration/)
- [Error del host local de MySQL - Host local VS 127.0.0.1](https://docs.datadoghq.com/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/)
- [¿Puedo utilizar una instancia con nombre en la integración del servidor de SQL?](https://docs.datadoghq.com/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/)
- [Puedo configurar el check de MySQL del dd-agent en mi Google CloudSQL?](https://docs.datadoghq.com/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/)
- [Consultas personalizadas de MySQL](https://docs.datadoghq.com/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries/)
- [Utiliza WMI para recopilar más métricas de rendimiento del servidor de SQL](https://docs.datadoghq.com/integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics/)
- [¿Cómo puedo recopilar más métricas de mi integración del servidor de SQL?](https://docs.datadoghq.com/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration/)
- [Usuario de base de datos sin privilegios](https://docs.datadoghq.com/integrations/faq/database-user-lacks-privileges/)
- [Cómo recopilar métricas con un procedimiento almacenado de SQL](https://docs.datadoghq.com/integrations/guide/collect-sql-server-custom-metrics/#collecting-metrics-from-a-custom-procedure)

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorización de métricas de rendimiento de MySQL](https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics)