---
app_id: postgres
categories:
- data stores
- log collection
- notifications
- tracing
custom_kind: integración
description: Recopila una importante cantidad de métricas del rendimiento y el estado
  de las bases de datos.
further_reading:
- link: https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/
  tag: documentación
  text: Recopilación de métricas personalizadas de Postgres
- link: https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line
  tag: blog
  text: Rendimiento de Postgres 100 veces más rápido cambiando 1 línea
- link: https://www.datadoghq.com/blog/postgresql-monitoring
  tag: blog
  text: Métricas clave para la monitorización de PostgreSQL
- link: https://www.datadoghq.com/blog/postgresql-monitoring-tools
  tag: blog
  text: Recopilación de métricas con herramientas de monitorización PostgreSQL
- link: https://www.datadoghq.com/blog/collect-postgresql-data-with-datadog
  tag: blog
  text: Recopilación y monitorización de datos PostgreSQL con Datadog
integration_version: 22.15.0
media: []
supported_os:
- linux
- windows
- macos
title: Postgres
---
![Gráfico PostgreSQL](https://raw.githubusercontent.com/DataDog/integrations-core/master/postgres/images/postgresql_dashboard.png)

## Información general

La integración Postgres proporciona métricas del estado y el rendimiento de tu base de datos Postgres casi en tiempo real. Visualiza estos métricas con el dashboard proporcionado y crea monitores para alertar a tu equipo sobre los estados de PostgreSQL.

Activa [Database Monitoring](https://docs.datadoghq.com/database_monitoring/) (DBM) para obtener información mejorada sobre el rendimiento de las consultas y el estado de las bases de datos. Además de la integración estándar, Datadog DBM proporciona métricas a nivel de consulta, snapshots de consultas históricas y actuales, análisis de eventos de espera, carga de bases de datos, explain plans de consultas e información sobre bloqueos de consultas.

Se admiten las versiones 9.6-16 de Postgres.

## Configuración

<div class="alert alert-info">En esta página se describe la integración estándar del Agent con Postgres. Si buscas el producto Database Monitoring para Postgres, consulta <a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Datadog Database Monitoring</a>.</div>

### Instalación

El check de PostgreSQL viene en el mismo paquete que el Agent. Para empezar a recopilar tus métricas y logs de PostgreSQL, [instala el Agent](https://app.datadoghq.com/account/settings/agent/latest).

### Configuración

**Nota**: Para instalar Database Monitoring para PostgreSQL, selecciona tu solución de alojamiento en la [documentación de Database Monitoring](https://docs.datadoghq.com/database_monitoring/#postgres) para obtener instrucciones.

Procede con los siguientes pasos de esta guía solo si vas a instalar la integración estándar únicamente.

#### Preparación de Postgres

Para empezar con la integración PostgreSQL estándar, crea un usuario `datadog` de sólo lectura con el acceso adecuado a tu servidor PostgreSQL. Inicia `psql` en tu base de datos PostgreSQL.

Para la versión 10 y superiores de PostgreSQL, ejecuta:

```shell
create user datadog with password '<PASSWORD>';
grant pg_monitor to datadog;
grant SELECT ON pg_stat_database to datadog;
```

Para versiones anteriores de PostgreSQL, ejecuta:

```shell
create user datadog with password '<PASSWORD>';
grant SELECT ON pg_stat_database to datadog;
```

Para verificar si los permisos son correctos, ejecuta el siguiente comando:

```shell
psql -h localhost -U datadog postgres -c \
"select * from pg_stat_database LIMIT(1);" \
&& echo -e "\e[0;32mPostgres connection - OK\e[0m" \
|| echo -e "\e[0;31mCannot connect to Postgres\e[0m"
```

Cuando se te pida una contraseña, introduce la que utilizaste en el primer comando.

**Nota**: Para las versiones 9.6 e inferiores de PostgreSQL, ejecuta lo siguiente y crea un `SECURITY DEFINER` para leer desde `pg_stat_activity`.

```shell
CREATE FUNCTION pg_stat_activity() RETURNS SETOF pg_catalog.pg_stat_activity AS
$$ SELECT * from pg_catalog.pg_stat_activity; $$
LANGUAGE sql VOLATILE SECURITY DEFINER;

CREATE VIEW pg_stat_activity_dd AS SELECT * FROM pg_stat_activity();
grant SELECT ON pg_stat_activity_dd to datadog;
```

{{< tabs >}}

{{% tab "Host" %}}

**Nota**: Al generar métricas personalizadas que requieren que se consulten tablas adicionales, puede que sea necesario conceder el permiso `SELECT` al usuario `datadog` para acceder a esas tablas. Ejemplo: `grant SELECT on <TABLE_NAME> to datadog;`. Para obtener más información, consulta la [sección FAQ](https://docs.datadoghq.com/integrations/postgres/?tab=host#faq).

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `postgres.d/conf.yaml` para que apunte a tu `host`/`port` y define los principales para monitorizar. Consulta el [ejemplo de postgres.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     ## @param host - string - required
     ## The hostname to connect to.
     ## NOTE: Even if the server name is "localhost", the agent connects to
     ## PostgreSQL using TCP/IP, unless you also provide a value for the sock key.
     #
     - host: localhost

       ## @param port - integer - optional - default: 5432
       ## The port to use when connecting to PostgreSQL.
       #
       # port: 5432

       ## @param username - string - required
       ## The Datadog username created to connect to PostgreSQL.
       #
       username: datadog

       ## @param password - string - optional
       ## The password associated with the Datadog user.
       #
       # password: <PASSWORD>

       ## @param dbname - string - optional - default: postgres
       ## The name of the PostgresSQL database to monitor.
       ## Note: If omitted, the default system Postgres database is queried.
       #
       # dbname: <DBNAME>

       # @param disable_generic_tags - boolean - optional - default: false
       # The integration will stop sending server tag as is redundant with host tag
       disable_generic_tags: true
   ```

1. Para recopilar métricas de relación, conecta el Agent a cada base de datos lógica. Estas bases de datos pueden ser detectadas automáticamente o cada una puede estar enumerada explícitamente en la configuración.

   - Para detectar bases de datos lógicas automáticamente en una instancia determinada, activa la detección automática en esa instancia:

   ```yaml
   instances:
     - host: localhost
       # port: 5432
       database_autodiscovery:
         enabled: true
         # Optionally, set the include field to specify
         # a set of databases you are interested in discovering
         include:
           - mydb.*
           - example.*
       relations:
         - relation_regex: .*
   ```

   - También puedes listar cada base de datos lógica como una instancia en la configuración:

   ```yaml
   instances:
     - host: example-service-primary.example-host.com
       # port: 5432
       username: datadog
       password: '<PASSWORD>'
       relations:
         - relation_name: products
         - relation_name: external_seller_products
     - host: example-service-replica-1.example-host.com
       # port: 5432
       username: datadog
       password: '<PASSWORD>'
       relations:
         - relation_regex: inventory_.*
           relkind:
             - r
             - i
     - host: example-service-replica-2.example-host.com
       # port: 5432
       username: datadog
       password: '<PASSWORD>'
       relations:
         - relation_regex: .*
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de trazas

Datadog APM se integra con Postgres para visualizar trazas (traces) a través de tu sistema distribuido. La recopilación de trazas está activada por defecto en el Datadog Agent v6 o posteriores. Para empezar a recopilar trazas:

1. [Activa la recopilación de trazas en Datadog](https://docs.datadoghq.com/tracing/send_traces/).
1. [Instrumenta tu aplicación que realiza solicitudes a Postgres](https://docs.datadoghq.com/tracing/setup/).

##### Recopilación de logs

La generación de logs por defecto de PostgreSQL es para `stderr` y los logs no incluyen información detallada. Se recomienda generar logs en un archivo con detalles adicionales especificados en el prefijo de línea de los logs. Para obtener más información, consulta la documentación de PostgreSQL sobre [informes de error y generación de logs](https://www.postgresql.org/docs/11/runtime-config-logging.html).

1. La generación de logs se configura en el archivo `/etc/postgresql/<VERSION>/main/postgresql.conf`. Para obtener resultados regulares en logs, incluidos los resultados de sentencias, descomenta los siguientes parámetros en la sección de logs:

   ```conf
     logging_collector = on
     log_directory = 'pg_log'  # directory where log files are written,
                               # can be absolute or relative to PGDATA
     log_filename = 'pg.log'   # log file name, can include pattern
     log_statement = 'all'     # log all queries
     #log_duration = on
     log_line_prefix= '%m [%p] %d %a %u %h %c '
     log_file_mode = 0644
     ## For Windows
     #log_destination = 'eventlog'
   ```

1. Para recopilar métricas de duración detallada y permitir su búsqueda en la interfaz de Datadog, deben configurarse en línea con la propia sentencia. Consulta a continuación las diferencias de configuración recomendadas con respecto a las anteriores. **Nota**: Las opciones `log_statement` y `log_duration` están comentadas. Para ver una discusión sobre este tema, consulta [Sentencia/duración de la generación de logs en la misma línea](https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com).

   Esta configuración registra todas las sentencias. Para reducir los resultados en función de la duración, ajusta el valor `log_min_duration_statement` a la duración mínima deseada (en milisegundos):

   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade y edita este bloque de configuración a tu archivo `postgres.d/conf.yaml` para empezar a recopilar tus logs de PostgreSQL:

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

   Cambia los valores de los parámetros `service` y `path` y configúralos para tu entorno. Consulta el [ejemplo de postgres.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Docker" %}}

#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Configura [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) como etiquetas (labels) de Docker en el contenedor de tu aplicación:

```yaml
LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"host":"%%host%%", "port":5432,"username":"datadog","password":"<PASSWORD>"}]'
```

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Docker](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation).

A continuación, configura [integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas de Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"postgresql","service":"postgresql"}]'
```

##### Recopilación de trazas

APM para aplicaciones en contenedores es compatible con el Agent v6 o posterior, pero requiere configuración adicional para empezar a recopilar trazas.

Variables de entorno requeridas en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | verdadero                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | verdadero |

Para ver una lista completa de las variables de entorno y la configuración disponibles, consulta [Rastreo de aplicaciones Docker](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux).

A continuación, [instrumenta el contenedor de tu aplicación que realiza solicitudes a Postgres](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) y configura `DD_AGENT_HOST` con el nombre del contenedor de tu Agent.

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes

Para Configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes) como anotaciones de pod en el contenedor de tu aplicación. Aparte de esto, las plantillas también se pueden configurar con [un archivo, un mapa de configuración o un almacén clave-valor](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration).

**Anotaciones v1** (para el Datadog Agent \< v7.36)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgresql.check_names: '["postgres"]'
    ad.datadoghq.com/postgresql.init_configs: '[{}]'
    ad.datadoghq.com/postgresql.instances: |
      [
        {
          "host": "%%host%%",
          "port":"5432",
          "username":"datadog",
          "password":"<PASSWORD>"
        }
      ]
spec:
  containers:
    - name: postgres
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.checks: |
      {
        "postgres": {
          "init_config": {},
          "instances": [
            {
              "host": "%%host%%",
              "port":"5432",
              "username":"datadog",
              "password":"<PASSWORD>"
            }
          ]
        }
      }
spec:
  containers:
    - name: postgres
```

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup).

A continuación, configura [integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como anotaciones de pod. Esto también se puede configurar con [un archivo, un mapa de configuración o un almacén clave-valor](https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration).

**Anotaciones v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.logs: '[{"source":"postgresql","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: postgres
```

##### Recopilación de trazas

APM para aplicaciones en contenedores es compatible con hosts que se ejecutan en la versión 6 o posteriores del Agent, pero requiere configuración adicional para empezar a recopilar trazas.

Variables de entorno requeridas en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | verdadero                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | verdadero |

Consulta [Rastreo de aplicaciones Kubernetes](https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup) y [Configuración de Kubernetes DaemonSet](https://github.com/DataDog/integrations-core/blob/master/postgres/assets/service_checks.json) para obtener una lista completa de las variables de entorno y la configuración disponibles.

A continuación, [instrumenta el contenedor de tu aplicación que realiza solicitudes a Postgres](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations).

{{% /tab %}}

{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Configura [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) como etiquetas de Docker en el contenedor de tu aplicación:

**Anotaciones v1** (para el Datadog Agent \< v7.36)

```json
{
  "containerDefinitions": [{
    "name": "postgres",
    "image": "postgres:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"postgres\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"host\":\"%%host%%\", \"port\":5432,\"username\":\"datadog\",\"password\":\"<PASSWORD>\"}]"
    }
  }]
}
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```json
{
  "containerDefinitions": [{
    "name": "postgres",
    "image": "postgres:latest",
    "dockerLabels": {
      "com.datadoghq.ad.checks": "{\"postgres\": {\"instances\": [{\"host\":\"%%host%%\", \"port\":5432, \"username\":\"postgres\", \"password\":\"<PASSWORD>\"}]}}"
    }
  }]
}
```

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de ECS](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux).

A continuación, configura [integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas de Docker:

```json
{
  "containerDefinitions": [{
    "name": "postgres",
    "image": "postgres:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"postgresql\",\"service\":\"postgresql\"}]"
    }
  }]
}
```

##### Recopilación de trazas

APM para aplicaciones en contenedores es compatible con el Agent v6 o posterior, pero requiere configuración adicional para empezar a recopilar trazas.

Variables de entorno requeridas en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | verdadero                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | verdadero |

Para ver una lista completa de las variables de entorno y la configuración disponibles, consulta [Rastreo de aplicaciones Docker](https://docs.datadoghq.com/agent/docker/apm/).

A continuación, [instrumenta el contenedor de tu aplicación que realiza solicitudes a Postgres](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) y configura `DD_AGENT_HOST` con la [dirección IP privada de EC2](https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup).

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `postgres` en la sección Checks.

## Datos recopilados

Algunas de las métricas enumeradas a continuación requieren configuración adicional. Consulta el [ejemplo de postgres.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

### Métricas

| | |
| --- | --- |
| **postgresql.active_queries** <br>(gauge) | Activado con `collect_activity_metrics`. Número de consultas activas en esta base de datos. Esta métrica (por defecto) está etiquetada con db, app, user.|
| **postgresql.active_waiting_queries** <br>(gauge) | Activado con `collect_activity_metrics`. Número de consultas en espera en esta base de datos en estado activo. Esta métrica (por defecto) está etiquetada con db, app, user.|
| **postgresql.activity.backend_xid_age** <br>(gauge) | Antigüedad del xid del backend más antiguo en relación con el último xid estable. Esta métrica (por defecto) está etiquetada con db, app, user.<br>_Se muestra como transacción_ |
| **postgresql.activity.backend_xmin_age** <br>(gauge) | Antigüedad del horizonte xmin del backend más antiguo en relación con el último xid estable. Esta métrica (por defecto) está etiquetada con db, app, user.<br>_Se muestra como transacción_ |
| **postgresql.activity.wait_event** <br>(gauge) | Número de eventos de espera en el momento de la comprobación. Esta métrica está etiquetada por usuario. Esta métrica está etiquetada por user, db, app y backend_type.|
| **postgresql.activity.xact_start_age** <br>(gauge) | Antigüedad de las transacciones activas más antiguas. Esta métrica (por defecto) está etiquetada con db, app, user.<br>_Se muestra como segundos_. |
| **postgresql.analyze.child_tables_done** <br>(gauge) | Número de tablas secundarias analizadas. Este contador solo avanza cuando la fase está adquiriendo filas de ejemplo heredadas. Esta métrica está etiquetada con db, table, child_relation, phase.|
| **postgresql.analyze.child_tables_total** <br>(gauge) | Número de tablas secundarias. Esta métrica está etiquetada con db, table, child_relation, phase.|
| **postgresql.analyze.ext_stats_computed** <br>(gauge) | Número de estadísticas ampliadas calculadas. Este contador solo avanza cuando la fase está calculando estadísticas ampliadas. Esta métrica está etiquetada con db, table, child_relation, phase.|
| **postgresql.analyze.ext_stats_total** <br>(gauge) | Número de estadísticas ampliadas. Esta métrica está etiquetada con db, table, child_relation, phase.|
| **postgresql.analyze.sample_blks_scanned** <br>(gauge) | Número de bloques heap analizados. Esta métrica está etiquetada con db, table, child_relation, phase.<br>_Se muestra como bloque_. |
| **postgresql.analyze.sample_blks_total** <br>(gauge) | Número total de bloques heap que se muestrearán. Esta métrica está etiquetada con db, table, child_relation, phase.<br>_Se muestra como bloque_. |
| **postgresql.analyzed** <br>(count) | Activado con `relations`. Número de veces que se ha analizado manualmente esta tabla. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.archiver.archived_count** <br>(count) | Número de archivos WAL que se han archivado correctamente.|
| **postgresql.archiver.failed_count** <br>(count) | Número de intentos fallidos para archivar archivos WAL.|
| **postgresql.autoanalyzed** <br>(count) | Activado con `relations`. Número de veces que esta tabla ha sido analizada por el daemon de autovaciado. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.autovacuumed** <br>(count) | Activado con `relations`. Número de veces que esta tabla ha sido vaciada por el daemon de autovaciado. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.before_xid_wraparound** <br>(gauge) | Número de transacciones que pueden ocurrir hasta que se agote el ID de una transacción. Esta métrica está etiquetada con db.<br>_Se muestra como transacción_ |
| **postgresql.bgwriter.buffers_alloc** <br>(count) | Número de buffers asignados|
| **postgresql.bgwriter.buffers_backend** <br>(count) | Número de buffers escritos directamente por un backend.<br>_Se muestra como buffer_ |
| **postgresql.bgwriter.buffers_backend_fsync** <br>(count) | Cantidad de veces que un backend ha tenido que ejecutar su propia llamada fsync en lugar del escritor en segundo plano.|
| **postgresql.bgwriter.buffers_checkpoint** <br>(count) | Número de buffers escritos durante los puntos de control.|
| **postgresql.bgwriter.buffers_clean** <br>(count) | Número de buffers escritos por el escritor en segundo plano.|
| **postgresql.bgwriter.checkpoints_requested** <br>(count) | Número de puntos de control solicitados que se han realizado.|
| **postgresql.bgwriter.checkpoints_timed** <br>(count) | Número de puntos de control programados que se han realizado.|
| **postgresql.bgwriter.maxwritten_clean** <br>(count) | Número de veces que el escritor en segundo plano ha detenido una exploración de limpieza debido a la escritura de demasiados buffers.|
| **postgresql.bgwriter.sync_time** <br>(count) | Cantidad total de tiempo de procesamiento del punto de control dedicado a sincronizar los archivos con el disco.<br>_Se muestra como milisegundos_ |
| **postgresql.bgwriter.write_time** <br>(count) | Cantidad total de tiempo de procesamiento del punto de control dedicado a escribir archivos en el disco.<br>_Se muestra como milisegundos_ |
| **postgresql.blk_read_time** <br>(count) | Tiempo dedicado a leer bloques de archivos de datos por los backends en esta base de datos si track_io_timing está activado. Esta métrica está etiquetada con db.<br>_Se muestra como milisegundos_. |
| **postgresql.blk_write_time** <br>(count) | Tiempo dedicado a escribir bloques de archivos de datos por los backends en esta base de datos si track_io_timing está activado. Esta métrica está etiquetada con db.<br>_Se muestra como milisegundos_. |
| **postgresql.buffer_hit** <br>(rate) | Número de veces que se han encontrado bloques del disco en la caché del buffer, evitando la necesidad de leer desde la base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como solicitud_. |
| **postgresql.buffercache.dirty_buffers** <br>(gauge) | Número de buffers sucios compartidos. Es necesario instalar la extensión pg_buffercache. Esta métrica está etiquetada por db, esquema y relación.<br>_Se muestra como buffer_ |
| **postgresql.buffercache.pinning_backends** <br>(gauge) | Número de backends que utilizan buffers compartidos. Es necesario instalar la extensión pg_buffercache. Esta métrica está etiquetada por db, schema y relation.|
| **postgresql.buffercache.unused_buffers** <br>(gauge) | Número de buffers compartidos no utilizados. Es necesario instalar la extensión pg_buffercache.<br>_Se muestra como buffer_ |
| **postgresql.buffercache.usage_count** <br>(gauge) | Suma de usage_count de buffers compartidos. Es necesario instalar la extensión pg_buffercache. Esta métrica está etiquetada por por db, schema y relation.|
| **postgresql.buffercache.used_buffers** <br>(gauge) | Número de buffers compartidos. Es necesario instalar la extensión pg_buffercache. Esta métrica está etiquetada por db, schema y relation.<br>_Se muestra como buffer_ |
| **postgresql.checksums.checksum_failures** <br>(count) | Número de fallos de suma de comprobación en esta base de datos. Esta métrica está etiquetada con db.|
| **postgresql.checksums.enabled** <br>(count) | Si están activadas las sumas de comprobación de bases de datos. El valor es siempre 1 y está etiquetado con enabled:true o enabled:false. Esta métrica está etiquetada con db.|
| **postgresql.cluster_vacuum.heap_blks_scanned** <br>(gauge) | Número de bloques heap analizados. Este contador solo avanza cuando la fase es heap de análisis secuencial. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, command, phase, index.<br>_Se muestra como bloque_ |
| **postgresql.cluster_vacuum.heap_blks_total** <br>(gauge) | Número total de bloques heap en la tabla. Este número se informa desde el inicio del heap de análisis secuencial. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, command, phase, index.<br>_Se muestra como bloque_ |
| **postgresql.cluster_vacuum.heap_tuples_scanned** <br>(gauge) | Número de tuplas heap analizadas. Este contador solo avanza cuando la fase es heap de análisis secuencial, heap de análisis de índices o nuevo heap de escritura. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, command, phase, index.|
| **postgresql.cluster_vacuum.heap_tuples_written** <br>(gauge) | Número de tuplas heap escritas. Este contador solo avanza cuando la fase es heap de análisis secuencial, heap de análisis de índices o nuevo heap de escritura. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, command, phase, index.|
| **postgresql.cluster_vacuum.index_rebuild_count** <br>(gauge) | Número de índices reconstruidos. Este contador solo avanza cuando la fase es de reconstrucción de índices. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, command, phase, index.|
| **postgresql.commits** <br>(rate) | Número de transacciones que se han confirmado en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como transacción_ |
| **postgresql.conflicts.bufferpin** <br>(count) | Número de consultas en esta base de datos que han sido canceladas debido a buffers anclados. Los conflictos de pin de buffer ocurrirán cuando el proceso walreceiver intente aplicar una limpieza de buffer como el pruning de cadena HOT. Esto requiere un bloqueo completo del buffer y cualquier consulta que lo tenga anclado entrará en conflicto con la limpieza. Esta métrica está etiquetada con db.<br>_Se muestra como consulta_ |
| **postgresql.conflicts.deadlock** <br>(count) | Número de consultas en esta base de datos que han sido canceladas debido a bloqueos. Los conflictos de bloqueo ocurrirán cuando el proceso walreceiver intente aplicar un buffer como pruning de cadena HOT. Si el conflicto dura más de deadlock_timeout segundos, se activará una comprobación de bloqueo y las consultas en conflicto se cancelarán hasta que se desancle el buffer. Esta métrica está etiquetada con db.<br>_Se muestra como consulta_ |
| **postgresql.conflicts.lock** <br>(count) | Número de consultas en esta base de datos que se han cancelado debido a tiempos de espera de bloqueo. Esto ocurrirá cuando el proceso walreceiver intente aplicar un cambio que requiera un bloqueo ACCESS EXCLUSIVE mientras una consulta en la réplica está leyendo la tabla. La consulta en conflicto será eliminada después de esperar hasta max_standby_streaming_delay segundos. Esta métrica está etiquetada con db.<br>_Se muestra como consulta_ |
| **postgresql.conflicts.snapshot** <br>(count) | Número de consultas en esta base de datos que se han cancelado debido a snapshots demasiado antiguos. Se producirá un conflicto de snapshots cuando se reproduzca un VACUUM, eliminando las tuplas leídas actualmente en una espera. Esta métrica está etiquetada con db.<br>_Se muestra como consulta_ |
| **postgresql.conflicts.tablespace** <br>(count) | Número de consultas en esta base de datos que se han cancelado debido a espacios en tablas eliminados. Esto ocurrirá cuando se elimine un temp_tablespace temporal mientras se utiliza en una espera. Esta métrica está etiquetada con db.<br>_Se muestra como consulta_ |
| **postgresql.connections** <br>(gauge) | Número de conexiones activas a esta base de datos.<br>_Se muestra como conexión_ |
| **postgresql.connections_by_process** <br>(gauge) | Número de conexiones activas a esta base de datos, desglosado por atributos a nivel de proceso. Esta métrica está etiquetada con state, application, user y db. (Solo DBM)<br>_Se muestra como conexión_. |
| **postgresql.control.checkpoint_delay** <br>(gauge) | Tiempo transcurrido desde el último punto de control.<br>_Se muestra como segundos_ |
| **postgresql.control.checkpoint_delay_bytes** <br>(gauge) | Cantidad de bytes WAL escritos desde el último punto de control.<br>_Se muestra como bytes_ |
| **postgresql.control.redo_delay_bytes** <br>(gauge) | Cantidad de bytes WAL escritos desde el último punto de rehacer.<br>_Se muestra como bytes_ |
| **postgresql.control.timeline_id** <br>(gauge) | ID actual de la línea de tiempo.|
| **postgresql.create_index.blocks_done** <br>(gauge) | Número de bloques procesados en la fase actual. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, index, command, phase.|
| **postgresql.create_index.blocks_total** <br>(gauge) | Número total de bloques a procesar en la fase actual. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, index, command, phase.|
| **postgresql.create_index.lockers_done** <br>(gauge) | Número de casilleros esperados. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, index, command, phase.|
| **postgresql.create_index.lockers_total** <br>(gauge) | Número total de casilleros a esperar, cuando corresponda. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, index, command, phase.|
| **postgresql.create_index.partitions_done** <br>(gauge) | Cuando se crea un índice en una tabla particionada, esta columna se configura según el número de particiones en que se ha creado el índice. Este campo es 0 durante un REINDEX. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, index, command, phase.|
| **postgresql.create_index.partitions_total** <br>(gauge) | Cuando se crea un índice en una tabla particionada, esta columna se configura según el número de particiones en que se ha creado el índice. Este campo es 0 durante un REINDEX. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, index, command, phase.|
| **postgresql.create_index.tuples_done** <br>(gauge) | Número de tuplas procesadas en la fase actual. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, index, command, phase.|
| **postgresql.create_index.tuples_total** <br>(gauge) | Número total de tuplas a procesar en la fase actual. Solo disponible con PostgreSQL v12 y posteriores. Esta métrica está etiquetada con db, table, index, command, phase.|
| **postgresql.database_size** <br>(gauge) | Espacio en disco utilizado por esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como bytes_ |
| **postgresql.db.count** <br>(gauge) | Número de bases de datos disponibles.<br>_Se muestra como elemento_ |
| **postgresql.dead_rows** <br>(gauge) | Activado con `relations`. Número estimado de filas inactivas. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como fila_ |
| **postgresql.deadlocks** <br>(rate) | Tasa de bloqueos detectados en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como bloqueo_ |
| **postgresql.deadlocks.count** <br>(count) | Número de bloqueos detectados en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como bloqueo_ |
| **postgresql.disk_read** <br>(rate) | Número de bloques de disco leídos en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como bloque_ |
| **postgresql.function.calls** <br>(rate) | Activado con `collect_function_metrics`. Número de llamadas realizadas a una función. Esta métrica está etiquetada con db, schema, function.|
| **postgresql.function.self_time** <br>(rate) | Activado con `collect_function_metrics`. Tiempo total dedicado a esta función, sin incluir otras funciones llamadas por ella. Esta métrica está etiquetada con db, schema, function.|
| **postgresql.function.total_time** <br>(rate) | Activado con `collect_function_metrics`. Tiempo total dedicado a esta función y en todas las demás funciones llamadas por ella. Esta métrica está etiquetada con db, schema, function.|
| **postgresql.heap_blocks_hit** <br>(gauge) | Activado con `relations`. Número de hits de buffer de esta tabla. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como hit_ |
| **postgresql.heap_blocks_read** <br>(gauge) | Activado con `relations`. Número de bloques de disco leídos de esta tabla. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como bloque_. |
| **postgresql.index.index_blocks_hit** <br>(gauge) | Activado con `relations`. Número de hits de buffer para un índice específico. Esta métrica está etiquetada con db, schema, table, index.<br>_Se muestra como hit_ |
| **postgresql.index.index_blocks_read** <br>(gauge) | Activado con `relations`. El número de bloques de disco para un índice específico. Esta métrica está etiquetada con db, schema, table, index.<br>_Se muestra como bloque_ |
| **postgresql.index_bloat** <br>(gauge) | Activado con `collect_bloat_metrics`. Porcentaje estimado de sobrecarga del índice. Esta métrica está etiquetada con db, schema, table, index.<br>_Se muestra como porcentaje_. |
| **postgresql.index_blocks_hit** <br>(gauge) | Activado con `relations`. Número de hits de buffer en todos los índices de esta tabla. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como hit_ |
| **postgresql.index_blocks_read** <br>(gauge) | Activado con `relations`. Número de bloques de disco leídos de todos los índices de esta tabla. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como bloque_ |
| **postgresql.index_rel_rows_fetched** <br>(gauge) | Activado con `relations`. Número de filas activas obtenidas por análisis de índices. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como fila_ |
| **postgresql.index_rel_scans** <br>(gauge) | Activado con `relations`. Número total de análisis de índices iniciados de esta tabla. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como análisis_ |
| **postgresql.index_rows_fetched** <br>(gauge) | Activado con `relations`. Número de filas activas obtenidas por análisis de índices. Esta métrica está etiquetada con db, schema, table, index.<br>_Se muestra como fila_ |
| **postgresql.index_rows_read** <br>(gauge) | Activado con `relations`. Número de entradas de índice devueltas por análisis de este índice. Esta métrica está etiquetada con db, schema, table, index.<br>_Se muestra como fila_ |
| **postgresql.index_scans** <br>(gauge) | Activado con `relations`. Número de análisis de índices iniciadas de esta tabla. Esta métrica está etiquetada con db, schema, table, index<br>_Se muestra como análisis_ |
| **postgresql.index_size** <br>(gauge) | Activado con `relations`. Espacio total en disco utilizado por los índices adjuntos a la tabla especificada. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como bytes_ |
| **postgresql.individual_index_size** <br>(gauge) | Espacio en disco utilizado por un índice especificado. Esta métrica está etiquetada con db, schema, table, index.<br>_Se muestra como bytes_ |
| **postgresql.io.evictions** <br>(count) | Número de veces que un bloque se ha escrito desde un buffer compartido o local para que esté disponible para otro uso. Esta métrica está etiquetada con backend_type, context, object. Solo disponible con PostgreSQL v16 y posteriores. (Solo DBM)<br>_Se muestra como milisegundos_ |
| **postgresql.io.extend_time** <br>(count) | Tiempo dedicado a operaciones extend (si track_io_timing está activado, de lo contrario cero). Esta métrica está etiquetada con backend_type, context, object. Solo disponible con PostgreSQL v16 y posteriores. (Solo DBM)<br>_Se muestra como milisegundos_ |
| **postgresql.io.extends** <br>(count) | Número de operaciones extend de relaciones. Esta métrica está etiquetada con backend_type, context, object. Solo disponible con PostgreSQL v16 y posteriores. (Solo DBM)|
| **postgresql.io.fsync_time** <br>(count) | Tiempo dedicado a operaciones fsync (si track_io_timing está activado, de lo contrario cero). Esta métrica está etiquetada con backend_type, context, object. Solo disponible con PostgreSQL v16 y posteriores. (Solo DBM)<br>_Se muestra como milisegundos_ |
| **postgresql.io.fsyncs** <br>(count) | Número de llamadas fsync. Esta métrica está etiquetada con backend_type, context, object. Solo disponible con PostgreSQL v16 y posteriores. (Solo DBM)|
| **postgresql.io.hits** <br>(count) | Número de veces que se ha encontrado un bloque deseado en un buffer compartido. Esta métrica está etiquetada con backend_type, context, object. Solo disponible con PostgreSQL v16 y posteriores. (Solo DBM)<br>_Se muestra como milisegundos_ |
| **postgresql.io.read_time** <br>(count) | Tiempo dedicado a operaciones de lectura (si track_io_timing está activado, de lo contrario cero). Esta métrica está etiquetada con backend_type, context, object. Solo disponible con PostgreSQL v16 y posteriores. (Solo DBM)<br>_Se muestra como milisegundos_ |
| **postgresql.io.reads** <br>(count) | Número de operaciones de lectura. Esta métrica está etiquetada con backend_type, context, object. Solo disponible con PostgreSQL v16 y posteriores. (Solo DBM)|
| **postgresql.io.write_time** <br>(count) | Tiempo dedicado a operaciones de escritura (si track_io_timing está activado, de lo contrario cero). Esta métrica está etiquetada con backend_type, context, object. Solo disponible con PostgreSQL v16 y posteriores. (Solo DBM)<br>_Se muestra como milisegundos_ |
| **postgresql.io.writes** <br>(count) | Número de operaciones de escritura. Esta métrica está etiquetada con backend_type, context, object. Solo disponible con PostgreSQL v16 y posteriores. (Solo DBM)|
| **postgresql.last_analyze_age** <br>(gauge) | Última vez que esta tabla fue analizada manualmente. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como segundos_ |
| **postgresql.last_autoanalyze_age** <br>(gauge) | Última vez que esta tabla fue analizada por el daemon de autovaciado. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como segundos_ |
| **postgresql.last_autovacuum_age** <br>(gauge) | Última vez que esta tabla ha sido vaciada por el daemon de autovaciado. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como segundos_ |
| **postgresql.last_vacuum_age** <br>(gauge) | Última vez que esta tabla ha sido vaciada manualmente (sin contar VACUUM FULL). Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como segundos_ |
| **postgresql.live_rows** <br>(gauge) | Activado con `relations`. Número estimado de filas activas. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como fila_ |
| **postgresql.locks** <br>(gauge) | Activado con `relations`. Número de bloqueos activos para esta base de datos. Esta métrica está etiquetada con db, lock_mode, lock_type, schema, table, granted.<br>_Se muestra como bloqueo_ |
| **postgresql.max_connections** <br>(gauge) |  Número máximo de conexiones de cliente permitidas a esta base de datos.<br>_Se muestra como conexión_ |
| **postgresql.percent_usage_connections** <br>(gauge) | Número de conexiones a esta base de datos como fracción del número máximo de conexiones permitidas.<br>_Se muestra como fracción_ |
| **postgresql.pg_stat_statements.dealloc** <br>(count) | Número de veces que pg_stat_statements tuvo que desalojar las consultas menos ejecutadas porque se alcanzó pg_stat_statements.max.|
| **postgresql.queries.blk_read_time** <br>(count) | Tiempo total dedicado a leer bloques por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como nanosegundos_ |
| **postgresql.queries.blk_write_time** <br>(count) | Tiempo total dedicado a escribir bloques por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como nanosegundos_ |
| **postgresql.queries.count** <br>(count) | Recuento total de ejecución de consultas por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como consulta_ |
| **postgresql.queries.duration.max** <br>(gauge) | Antigüedad de la consulta en ejecución más larga por usuario, base de datos y aplicación. (Solo DBM)<br>_Se muestra como nanosegundos_ |
| **postgresql.queries.duration.sum** <br>(gauge) | Suma de la antigüedad de todas las consultas en ejecución por usuario, base de datos y aplicación. (Solo DBM)<br>_Se muestra como nanosegundos_ |
| **postgresql.queries.local_blks_dirtied** <br>(count) | Número total de bloques locales ensuciados por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como bloque_ |
| **postgresql.queries.local_blks_hit** <br>(count) | Número total de hits en la caché de bloques locales por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como bloque_ |
| **postgresql.queries.local_blks_read** <br>(count) | Número total de bloques locales leídos por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como bloque_ |
| **postgresql.queries.local_blks_written** <br>(count) | Número total de bloques locales escritos por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como bloque_ |
| **postgresql.queries.rows** <br>(count) | Número total de filas recuperadas o afectadas por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como fila_ |
| **postgresql.queries.shared_blks_dirtied** <br>(count) | Número total de bloques compartidos ensuciados por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como bloque_ |
| **postgresql.queries.shared_blks_hit** <br>(count) | Número total de hits en la caché de bloques compartidos por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como bloque_ |
| **postgresql.queries.shared_blks_read** <br>(count) | Número total de bloques compartidos leídos por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como bloque_ |
| **postgresql.queries.shared_blks_written** <br>(count) | Número total de bloques compartidos escritos por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como bloque_ |
| **postgresql.queries.temp_blks_read** <br>(count) | Número total de bloques temporales leídos por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como bloque_ |
| **postgresql.queries.temp_blks_written** <br>(count) | Número total de bloques temporales escritos por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como bloque_ |
| **postgresql.queries.time** <br>(count) | Tiempo total de ejecución de la consulta por query_signature, base de datos y usuario. (Solo DBM)<br>_Se muestra como nanosegundos_ |
| **postgresql.recovery_prefetch.block_distance** <br>(gauge) | Cuántos bloques por delante está buscando el prefetcher.<br>_Se muestra como bloque_ |
| **postgresql.recovery_prefetch.hit** <br>(count) | Número de bloques no precargados porque ya estaban en el grupo de buffers.<br>_Se muestra como bloque_ |
| **postgresql.recovery_prefetch.io_depth** <br>(gauge) | Cuántas precargas se han iniciado pero aún no se sabe si han finalizado.|
| **postgresql.recovery_prefetch.prefetch** <br>(count) | Número de bloques precargados porque no estaban en el grupo de buffers.<br>_Se muestra como bloque_ |
| **postgresql.recovery_prefetch.skip_fpw** <br>(count) | Número de bloques no precargados porque se ha incluido una imagen de página completa en el WAL.<br>_Se muestra como bloque_ |
| **postgresql.recovery_prefetch.skip_init** <br>(count) | Número de bloques no precargados porque se inicializarían a cero.<br>_Se muestra como bloque_ |
| **postgresql.recovery_prefetch.skip_new** <br>(count) | Número de bloques no precargados porque aún no existían.<br>_Se muestra como bloque_ |
| **postgresql.recovery_prefetch.skip_rep** <br>(count) | Número de bloques no precargados porque ya se habían precargado recientemente.<br>_Se muestra como bloque_ |
| **postgresql.recovery_prefetch.wal_distance** <br>(gauge) | Cuántos bytes por delante está buscando el prefetcher.<br>_Se muestra como bytes_ |
| **postgresql.relation.all_visible** <br>(gauge) | Número de páginas que están marcadas como todas visibles en el mapa de visibilidad de la tabla. Se trata únicamente de una estimación utilizada por el planificador y se actualiza mediante VACUUM o ANALYZE. Esta métrica está etiquetada con db, schema, table, partition_of.|
| **postgresql.relation.pages** <br>(gauge) | Tamaño de una tabla en páginas (1 página = 8KB por defecto). Se trata únicamente de una estimación utilizada por el planificador y se actualiza mediante VACUUM o ANALYZE. Esta métrica está etiquetada con db, schema, table, partition_of.|
| **postgresql.relation.tuples** <br>(gauge) | Número de filas activas en la tabla. Se trata únicamente de una estimación utilizada por el planificador y se actualiza mediante VACUUM o ANALYZE. Si la tabla nunca ha sido vaciada o analizada, se informará -1. Esta métrica está etiquetada con db, schema, table, partition_of.|
| **postgresql.relation.xmin** <br>(gauge) | ID de transacción de la última modificación de la relación en pg_class. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.relation_size** <br>(gauge) | Espacio en disco utilizado por la tabla especificada. No se incluyen datos TOAST, índices, mapa de espacio libre o mapa de visibilidad. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como bytes_ |
| **postgresql.replication.backend_xmin_age** <br>(gauge) | Antigüedad del horizonte xmin del servidor en espera (en relación con el último xid estable) informada por hot_standby_feedback.|
| **postgresql.replication.wal_flush_lag** <br>(gauge) | Tiempo transcurrido entre el vaciado local de WAL reciente y la recepción de la notificación de que este servidor en espera la ha escrito y vaciado (pero aún no la ha aplicado). Esto puede utilizarse para medir el retraso en el que incurre el nivel synchronous_commit al confirmar si este servidor está configurado como servidor en espera síncrono. Solo disponible con PostgreSQL v10 y posteriores.<br>_Se muestra como segundos_ |
| **postgresql.replication.wal_replay_lag** <br>(gauge) | Tiempo transcurrido entre el vaciado local de WAL reciente y la recepción de la notificación de que este servidor en espera la ha escrito, vaciado y aplicado. Esto puede utilizarse para medir el retraso en el que incurre el nivel synchronous_commit al confirmar si este servidor está configurado como servidor en espera síncrono. Solo disponible con PostgreSQL v10 y posteriores.<br>_Se muestra como segundos_ |
| **postgresql.replication.wal_write_lag** <br>(gauge) | Tiempo transcurrido entre el vaciado local de WAL reciente y la recepción de la notificación de que este servidor en espera la ha escrito (pero no la ha vaciado ni aplicado). Esto puede utilizarse para medir el retraso en el que incurre el nivel synchronous_commit al confirmar si este servidor está configurado como servidor en espera síncrono. Solo disponible con PostgreSQL v10 y posteriores.<br>_Se muestra como segundos_ |
| **postgresql.replication_delay** <br>(gauge) | Retraso de replicación actual en segundos. Solo disponible con PostgreSQL v9.1 y posteriores<br>_Se muestra como segundos_ |
| **postgresql.replication_delay_bytes** <br>(gauge) | Retraso de replicación actual en bytes. Solo disponible con PostgreSQL v9.2 y posteriores<br>_Se muestra como bytes_ |
| **postgresql.replication_slot.catalog_xmin_age** <br>(gauge) | Antigüedad de la transacción más antigua que afecta a los catálogos del sistema que este slot necesita que la base de datos conserve. VACUUM no puede eliminar tuplas de catálogo eliminadas por una transacción posterior. Esta métrica está etiquetada con slot_name, slot_type, slot_persistence, slot_state.<br>_Se muestra como transacción_ |
| **postgresql.replication_slot.confirmed_flush_delay_bytes** <br>(gauge) | Retraso en bytes entre la posición actual de WAL y la última posición confirmada por el consumidor de este slot. Solo está disponible para slots de replicación lógica. Esta métrica está etiquetada con slot_name, slot_type, slot_persistence, slot_state.<br>_Se muestra como bytes_ |
| **postgresql.replication_slot.restart_delay_bytes** <br>(gauge) | Cantidad de bytes WAL que el consumidor de este slot puede requerir y no se eliminará automáticamente durante los puntos de control a menos que exceda el parámetro max_slot_wal_keep_size. No se informa de nada si no hay reserva de WAL para este slot. Esta métrica está etiquetada con slot_name, slot_type, slot_persistence, slot_state.<br>_Se muestra como bytes_ |
| **postgresql.replication_slot.spill_bytes** <br>(count) | Cantidad de datos de transacción decodificados vertidos al disco mientras se realiza la decodificación de cambios de WAL para este slot. Este y otros contadores de vertido pueden ser utilizados para medir las E/S ocurridas durante la decodificación lógica y permitir el ajuste de logical_decoding_work_mem. Extraído de pg_stat_replication_slots. Solo disponible con PostgreSQL v14 y posteriores. Esta métrica está etiquetada con slot_name, slot_type, slot_state.<br>_Se muestra como bytes_ |
| **postgresql.replication_slot.spill_count** <br>(count) | Número de veces que las transacciones fueron vertidas al disco mientras se decodificaban los cambios de WAL para este slot. Este contador se incrementa cada vez que una transacción es vertida, y la misma transacción puede ser vertida múltiples veces. Extraído de pg_stat_replication_slots. Solo disponible con PostgreSQL v14 y posteriores. Esta métrica está etiquetada con slot_name, slot_type, slot_state.|
| **postgresql.replication_slot.spill_txns** <br>(count) | Número de transacciones vertidas al disco una vez que la memoria utilizada por la decodificación lógica para decodificar los cambios de WAL excede logical_decoding_work_mem. El contador se incrementa tanto para las transacciones de nivel superior como para las subtransacciones. Extraído de pg_stat_replication_slots. Solo disponible con PostgreSQL v14 y posteriores. Esta métrica está etiquetada con slot_name, slot_type, slot_state.<br>_Se muestra como transacción_ |
| **postgresql.replication_slot.stream_bytes** <br>(count) | Cantidad de datos de transacciones decodificados para transmitir transacciones en curso al complemento de salida de decodificación mientras se decodifican los cambios de WAL para este slot. Extraído de pg_stat_replication_slots. Solo disponible con PostgreSQL v14 y posteriores. Esta métrica está etiquetada con slot_name, slot_type, slot_state.<br>_Se muestra como bytes_ |
| **postgresql.replication_slot.stream_count** <br>(count) | Número de veces que las transacciones en curso fueron transmitidas al complemento de salida de decodificación mientras se decodificaban los cambios de WAL para este slot. Extraído de pg_stat_replication_slots. Solo disponible con PostgreSQL v14 y posteriores. Esta métrica está etiquetada con slot_name, slot_type, slot_state.|
| **postgresql.replication_slot.stream_txns** <br>(count) | Número de transacciones en curso transmitidas al complemento de salida de decodificación después de que la memoria utilizada por la decodificación lógica para decodificar cambios de WAL para este slot exceda logical_decoding_work_mem. Extraído de pg_stat_replication_slots. Solo disponible con PostgreSQL v14 y posteriores. Esta métrica está etiquetada con slot_name, slot_type, slot_state.<br>_Se muestra como transacción_ |
| **postgresql.replication_slot.total_bytes** <br>(count) | Cantidad de datos de transacciones decodificados para enviar transacciones al complemento de salida de decodificación mientras se decodifican cambios de WAL para este slot. Extraído de pg_stat_replication_slots. Solo disponible con PostgreSQL v14 y posteriores. Esta métrica está etiquetada con slot_name, slot_type, slot_state.<br>_Se muestra como bytes_ |
| **postgresql.replication_slot.total_txns** <br>(count) | Número de transacciones decodificadas enviadas al complemento de salida de decodificación para este slot. Extraído de pg_stat_replication_slots. Solo disponible con PostgreSQL v14 y posteriores. Esta métrica está etiquetada con slot_name, slot_type, slot_state.<br>_Se muestra como transacción_ |
| **postgresql.replication_slot.xmin_age** <br>(gauge) | Antigüedad de la transacción más antigua que este slot necesita que la base de datos retenga. Solo el slot de replicación física tendrá un xmin. El slot de replicación huérfano (no hay consumidor o el consumidor no está conectado) impedirá que avance el horizonte xmin. Esta métrica está etiquetada con slot_name, slot_type, slot_persistence, slot_state.<br>_Se muestra como transacción_ |
| **postgresql.rollbacks** <br>(rate) | Número de transacciones que se han revertido en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como transacción_ |
| **postgresql.rows_deleted** <br>(rate) | Activado con `relations`. Número de filas eliminadas por consultas en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como fila_ |
| **postgresql.rows_fetched** <br>(tasa) | Número de filas obtenidas por consultas en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como fila_ |
| **postgresql.rows_hot_updated** <br>(rate) | Activado con `relations`. Número de filas HOT actualizadas, lo que significa que no fue necesaria una actualización de índice separada. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como fila_ |
| **postgresql.rows_inserted** <br>(rate) | Activado con `relations`. Número de filas insertadas por consultas en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como fila_ |
| **postgresql.rows_returned** <br>(rate) | Número de filas devueltas por consultas en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como fila_ |
| **postgresql.rows_updated** <br>(rate) | Activado con `relations`. Número de filas actualizadas por consultas en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como fila_ |
| **postgresql.running** <br>(gauge) | Número de instancias en ejecución.|
| **postgresql.seq_rows_read** <br>(gauge) | Activado con `relations`. Número de filas activas obtenidas por análisis secuenciales. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como fila_ |
| **postgresql.seq_scans** <br>(gauge) | Activado con `relations`. Número de análisis secuenciales iniciados de esta tabla. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como análisis_ |
| **postgresql.sessions.abandoned** <br>(count) | Número de sesiones de base de datos en esta base de datos que fueron finalizados porque se perdió la conexión con el cliente. Esta métrica está etiquetada con db.<br>_Se muestra como sesión_ |
| **postgresql.sessions.active_time** <br>(count) | Tiempo dedicado a ejecutar sentencias SQL en esta base de datos, en milisegundos (corresponde a los estados active y fastpath de la llamada a la función en pg_stat_activity). Esta métrica está etiquetada con db.<br>_Se muestra como milisegundos_ |
| **postgresql.sessions.count** <br>(count) | Número total de sesiones establecidas en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como sesión_ |
| **postgresql.sessions.fatal** <br>(count) | Número de sesiones de esta base de datos que fueron finalizados por errores fatales. Esta métrica está etiquetada con db.<br>_Se muestra como sesión_ |
| **postgresql.sessions.idle_in_transaction_time** <br>(count) | Tiempo de inactividad durante una transacción en esta base de datos, en milisegundos (corresponde a los estados inactivo en transacción e inactivo en transacción (abortada) en pg_stat_activity). Esta métrica está etiquetada con db.<br>_Se muestra como milisegundos_ |
| **postgresql.sessions.killed** <br>(count) | Número de sesiones de esta base de datos que fueron finalizados por intervención del operador. Esta métrica está etiquetada con db.<br>_Se muestra como sesión_ |
| **postgresql.sessions.session_time** <br>(count) | Tiempo empleado por las sesiones de base de datos en esta base de datos, en milisegundos (ten en cuenta que las estadísticas solo se actualizan cuando cambia el estado de una sesión, por lo que si las sesiones han estado inactivas durante mucho tiempo, este tiempo de inactividad no será incluido). Esta métrica está etiquetada con db.<br>_Se muestra como milisegundos_ |
| **postgresql.slru.blks_exists** <br>(count) | Número de bloques en que se comprueba la existencia de la caché SLRU (simple menos utilizada recientemente). Solo las cachés CommitTs y MultiXactOffset comprueban si los bloques ya están presentes en el disco. Esta métrica está etiquetada con slru_name.<br>_Se muestra como bloque_ |
| **postgresql.slru.blks_hit** <br>(count) | Número de veces que se han encontrado bloques de disco ya en la caché SLRU (simple menos utilizada recientemente), por lo que no fue necesaria una lectura (esto solo incluye hits en la SLRU, no en la caché del sistema de archivos del sistema operativo). Esta métrica está etiquetada con slru_name.<br>_Se muestra como bloque_ |
| **postgresql.slru.blks_read** <br>(count) | Número de bloques de disco leídos para la caché SLRU (simple menos utilizada recientemente). Las cachés SLRU se crean con un número fijo de páginas. Cuando se utilizan todas las páginas, el bloque utilizado menos recientemente se desaloja del disco para crear espacio. El acceso al bloque desalojado requerirá que los datos se lean del disco y se vuelvan a cargar en una página de caché SLRU, aumentando el recuento de lectura de bloques. Esta métrica está etiquetada con slru_name.<br>_Se muestra como bloque_ |
| **postgresql.slru.blks_written** <br>(count) | Número de bloques de disco escritos para la caché SLRU (simple menos utilizada recientemente). Las cachés SLRU se crean con un número fijo de páginas. Cuando se utilizan todas las páginas, el bloque utilizado menos recientemente se desaloja del disco para crear espacio. Un desalojo de bloque no genera necesariamente una escritura en disco, ya que el bloque podría haberse escrito en un desalojo anterior. Esta métrica está etiquetada con slru_name.<br>_Se muestra como bloque_ |
| **postgresql.slru.blks_zeroed** <br>(count) | Número de bloques puestos a cero durante las inicializaciones de la caché SLRU (simple menos utilizada recientemente). Las cachés SLRU se crean con un número fijo de páginas. Para las cachés Subtrans, Xact y CommitTs, se utiliza el transactionId global para obtener el número de página. Por lo tanto, aumentará con el rendimiento de la transacción. Esta métrica está etiquetada con slru_name.<br>_Se muestra como bloque_ |
| **postgresql.slru.flushes** <br>(count) | Número de vaciados de datos sucios de la caché SLRU (simple menos utilizada recientemente). El vaciado de las cachés CommitTs, MultiXact, Subtrans y Xact tendrá lugar durante el punto de control. El vaciado de la caché MultiXact puede ocurrir durante el vaciado. Esta métrica está etiquetada con slru_name.|
| **postgresql.slru.truncates** <br>(count) | Número de truncamientos de la caché SLRU (simple menos utilizada recientemente). Para las cachés CommitTs, Xact y MultiXact, los truncamientos se producirán cuando progrese el frozenID. Para la caché Subtrans, un truncamiento puede ocurrir durante un punto de reinicio y un punto de control. Esta métrica está etiquetada con slru_name.|
| **postgresql.snapshot.xip_count** <br>(gauge) | Informa del número de transacciones activas basadas en pg_snapshot_xip(pg_current_snapshot()).|
| **postgresql.snapshot.xmax** <br>(gauge) | Informa del siguiente ID de transacción que será asignado basado en pg_snapshot_xmax(pg_current_snapshot()).|
| **postgresql.snapshot.xmin** <br>(gauge) | Informa del ID de transacción más bajo aún activo basado en pg_snapshot_xmin(pg_current_snapshot()). Todos los ID de transacciones menores que xmin son confirmados y visibles, o revertidos y eliminados.|
| **postgresql.subscription.apply_error** <br>(count) | Número de errores que se han producido al aplicar los cambios. Extraído de pg_stat_subscription_stats. Solo disponible en PostgreSQL v15 o posteriores. Esta métrica está etiquetada con subscription_name.|
| **postgresql.subscription.last_msg_receipt_age** <br>(gauge) | Antigüedad de recepción del último mensaje recibido del remitente WAL de origen. Extraído de pg_stat_subscription. Solo disponible en PostgreSQL v12 o posteriores. Esta métrica está etiquetada con subscription_name.<br>_Se muestra como segundos_ |
| **postgresql.subscription.last_msg_send_age** <br>(gauge) | Antigüedad de recepción del último mensaje recibido del remitente WAL de origen. Extraído de pg_stat_subscription. Solo disponible en PostgreSQL v12 o posteriores. Esta métrica está etiquetada con subscription_name.<br>_Se muestra como segundos_ |
| **postgresql.subscription.latest_end_age** <br>(gauge) | Antigüedad de la última ubicación de escritura de log anticipada informada al remitente WAL de origen. Extraído de pg_stat_subscription. Solo disponible en PostgreSQL v12 o posteriores. Esta métrica está etiquetada con subscription_name.<br>_Se muestra como segundos_ |
| **postgresql.subscription.state** <br>(gauge) | Estado de una suscripción por relación y suscripción. Extraído de pg_subscription_rel. Solo disponible en PostgreSQL v14 o posteriores. Esta métrica está etiquetada con subscription_name, relation, state.|
| **postgresql.subscription.sync_error** <br>(count) | Número de errores producidos durante la sincronización inicial de la tabla. Extraído de pg_stat_subscription_stats. Solo disponible en PostgreSQL v15 o posteriores. Esta métrica está etiquetada con subscription_name.|
| **postgresql.table.count** <br>(gauge) | Número de tablas de usuario en esta base de datos. Esta métrica está etiquetada con db, schema.<br>_Se muestra como tabla_ |
| **postgresql.table_bloat** <br>(gauge) | Activado con `collect_bloat_metrics`. Porcentaje estimado de sobrecarga de las tablas. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como porcentaje_ |
| **postgresql.table_size** <br>(gauge) | Activado con `relations`. Espacio en disco utilizado por la tabla especificada con datos TOAST. No se incluyen el mapa de espacio libre ni el mapa de visibilidad. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como bytes_ |
| **postgresql.temp_bytes** <br>(rate) | Cantidad de datos escritos en archivos temporales por las consultas en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como bytes_ |
| **postgresql.temp_files** <br>(rate) | Número de archivos temporales creados por consultas en esta base de datos. Esta métrica está etiquetada con db.<br>_Se muestra como archivo_ |
| **postgresql.toast.autovacuumed** <br>(count) | Activado con `relations`. Número de veces que la tabla TOAST de una relación ha sido autovaciada. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.toast.dead_rows** <br>(gauge) | Activado con `relations`. Número de filas inactivas en la tabla TOAST de una relación. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.toast.index_scans** <br>(count) | Activado con `relations`. Número de análisis de índices realizados en la tabla TOAST de una relación. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.toast.last_autovacuum_age** <br>(gauge) | Última vez que el daemon de autovaciado ha vaciado la tabla TOAST de esta tabla. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como segundos_ |
| **postgresql.toast.last_vacuum_age** <br>(gauge) | Última vez que se ha vaciado manualmente la tabla TOAST de esta tabla (sin contar VACUUM FULL). Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como segundos_ |
| **postgresql.toast.live_rows** <br>(gauge) | Activado con `relations`. Número de filas activas en la tabla TOAST de una relación. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.toast.rows_deleted** <br>(count) | Activado con `relations`. Número de filas eliminadas en la tabla TOAST de una relación. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.toast.rows_fetched** <br>(count) | Activado con `relations`. Número de filas obtenidas en la tabla TOAST de una relación. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.toast.rows_inserted** <br>(count) | Activado con `relations`. Número de filas insertadas en la tabla TOAST de una relación. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.toast.vacuumed** <br>(count) | Activado con `relations`. Número de veces que se ha vaciado la tabla TOAST de una relación. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.toast_blocks_hit** <br>(gauge) | Activado con `relations`. Número de accesos al buffer en la tabla TOAST de esta tabla. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como hit_ |
| **postgresql.toast_blocks_read** <br>(gauge) | Activado con `relations`. Número de bloques de disco leídos de la tabla TOAST de esta tabla. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como bloque_ |
| **postgresql.toast_index_blocks_hit** <br>(gauge) | Activado con `relations`. Número de accesos al buffer en el índice de la tabla TOAST de esta tabla. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como bloque_ |
| **postgresql.toast_index_blocks_read** <br>(gauge) | Activado con `relations`. Número de bloques de disco leídos desde el índice de la tabla TOAST de esta tabla. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como bloque_ |
| **postgresql.toast_size** <br>(gauge) | Espacio total en disco utilizado por la tabla TOAST adjunta a la tabla especificada. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como bytes_ |
| **postgresql.total_size** <br>(gauge) | Activado con `relations`. Espacio total en disco utilizado por la tabla, incluidos los índices y los datos TOAST. Esta métrica está etiquetada con db, schema, table.<br>_Se muestra como bytes_ |
| **postgresql.transactions.duration.max** <br>(gauge) | Antigüedad de la transacción en ejecución más larga por usuario, base de datos y aplicación. (Solo DBM)<br>_Se muestra como nanosegundos_ |
| **postgresql.transactions.duration.sum** <br>(gauge) | Suma de la antigüedad de todas las transacciones en ejecución por usuario, base de datos y aplicación. (Solo DBM)<br>_Se muestra como nanosegundos_ |
| **postgresql.transactions.idle_in_transaction** <br>(gauge) | Activado con `collect_activity_metrics`. Número de transacciones 'inactivas en transacción' en esta base de datos. Esta métrica (por defecto) está etiquetada con db, app, user.<br>_Se muestra como transacción_ |
| **postgresql.transactions.open** <br>(gauge) | Activado con `collect_activity_metrics`. Número de transacciones abiertas en esta base de datos. Esta métrica (por defecto) está etiquetada con db, app, user.<br>_Se muestra como transacción_ |
| **postgresql.uptime** <br>(gauge) | Tiempo de actividad del servidor en segundos.<br>_Se muestra como segundos_ |
| **postgresql.vacuum.heap_blks_scanned** <br>(gauge) | Número de bloques heap analizados. Debido a que el mapa de visibilidad se utiliza para optimizar los análisis, algunos bloques serán omitidos sin inspección. Los bloques omitidos se incluyen en este total, de modo que este número eventualmente se volverá igual a heap_blks_total cuando el vaciado finalice. Este contador solo avanza cuando la fase está analizando heap. Esta métrica está etiquetada con db, table, phase.<br>_Se muestra como bloque_ |
| **postgresql.vacuum.heap_blks_total** <br>(gauge) | Número total de bloques heap en la tabla. Este número se informa al inicio del análisis. Los bloques añadidos posteriormente no serán (y no necesitan ser) visitados por este VACUUM. Esta métrica está etiquetada con db, table, phase.<br>_Se muestra como bloque_ |
| **postgresql.vacuum.heap_blks_vacuumed** <br>(gauge) | Número de bloques heap vaciados. A menos que la tabla no tenga índices, este contador solo avanza cuando la fase está aspirando heap. Los bloques que no contienen tuplas inactivas se omiten, por lo que el contador a veces puede saltar hacia adelante en grandes incrementos. Esta métrica está etiquetada con db, table, phase.<br>_Se muestra como bloques_ |
| **postgresql.vacuum.index_vacuum_count** <br>(gauge) | Número de ciclos de vacío de índices completados. Esta métrica está etiquetada con db, table, phase.<br>_Se muestra como bloque_ |
| **postgresql.vacuum.max_dead_tuples** <br>(gauge) | Número de tuplas inactivas que podemos almacenar antes de necesitar realizar un ciclo de vaciado de índices, basado en maintenance_work_mem. Esta métrica está etiquetada con db, table, phase.|
| **postgresql.vacuum.num_dead_tuples** <br>(gauge) | Número de tuplas inactivas recopiladas desde el último ciclo de vaciado de índices. Esta métrica está etiquetada con db, table, phase.|
| **postgresql.vacuumed** <br>(count) | Activado con `relations`. Número de veces que esta tabla ha sido vaciada manualmente. Esta métrica está etiquetada con db, schema, table.|
| **postgresql.waiting_queries** <br>(gauge) | Activado con `collect_activity_metrics`. Número de consultas en espera en esta base de datos. Esta métrica (por defecto) está etiquetada con db, app, user.|
| **postgresql.wal.buffers_full** <br>(count) | Número de veces que los datos de WAL fueron escritos en el disco porque los buffers de WAL se llenaron. Los cambios de WAL se almacenan primero en los buffers de WAL. Si el buffer está lleno, las inserciones de WAL se bloquean hasta que se vacía el buffer. El tamaño de este buffer se define mediante la configuración de wal_buffers. Por defecto, utilizará el 3% del valor de shared_buffers.|
| **postgresql.wal.bytes** <br>(count) | Cantidad total de WAL generada en bytes.<br>_Se muestra como bytes_ |
| **postgresql.wal.full_page_images** <br>(count) | Número total de imágenes de páginas completas de WAL generadas. La escritura de páginas completas se producirá cuando un bloque se modifique por primera vez después de un punto de control.<br>_Se muestra como página_ |
| **postgresql.wal.records** <br>(count) | Número total de registros WAL generados.<br>_Se muestra como registro_ |
| **postgresql.wal.sync** <br>(count) | Número de veces que los archivos WAL fueron sincronizados con el disco.|
| **postgresql.wal.sync_time** <br>(count) | Cantidad total de tiempo dedicado a sincronizar los archivos WAL con el disco, en milisegundos (si track_wal_io_timing está activado, fsync está activado y wal_sync_method es fdatasync, fsync o fsync_writethrough, de lo contrario cero).<br>_Se muestra como milisegundos_ |
| **postgresql.wal.write** <br>(count) | Número de veces que los buffers de WAL se han escrito en disco.<br>_Se muestra como escritura_ |
| **postgresql.wal.write_time** <br>(count) | Cantidad total de tiempo dedicado a escribir buffers de WAL en el disco, en milisegundos (si track_wal_io_timing está activado, de lo contrario cero).<br>_Se muestra como milisegundos_ |
| **postgresql.wal_age** <br>(gauge) | Activado con `collect_wal_metrics`. Antigüedad en segundos del archivo WAL más antiguo.<br>_Se muestra como segundos_ |
| **postgresql.wal_count** <br>(gauge) | Número de archivos WAL en disco.|
| **postgresql.wal_receiver.connected** <br>(gauge) | Estado del receptor WAL. Esta métrica se configurará en 1 con una etiqueta (tag) 'status:disconnected' si la instancia no tiene un receptor WAL en ejecución. En caso contrario, utilizará el valor de estado de pg_stat_wal_receiver. Esta métrica está etiquetada con status.|
| **postgresql.wal_receiver.last_msg_receipt_age** <br>(gauge) | Tiempo transcurrido desde la recepción del último mensaje del remitente WAL. Esta métrica está etiquetada con el status.<br>_Se muestra como segundos_ |
| **postgresql.wal_receiver.last_msg_send_age** <br>(gauge) | Antigüedad del envío del último mensaje recibido del remitente WAL. Esta métrica está etiquetada con status.<br>_Se muestra como segundos_ |
| **postgresql.wal_receiver.latest_end_age** <br>(gauge) | Tiempo transcurrido desde la recepción del último mensaje del remitente WAL con una actualización de la ubicación de WAL. Esta métrica está etiquetada con status.<br>_Se muestra como segundos_ |
| **postgresql.wal_receiver.received_timeline** <br>(gauge) | Número de línea de tiempo de la última ubicación de escritura anticipada de logs recibida y vaciada al disco. El valor inicial de este campo es el número de línea de tiempo de la ubicación del primer log utilizada cuando se inicia el receptor WAL. Esta métrica está etiquetada con status.|
| **postgresql.wal_size** <br>(gauge) | Suma de todos los archivos WAL en disco.<br>_Se muestra como bytes_ |

Para la versión `7.32.0` y posteriores del Agent, si tienes Database Database Monitoring activado, la métrica `postgresql.connections` se etiqueta (tag) con `state`, `app`, `db` y `user`.

### Eventos

El check de PostgreSQL no incluye eventos.

### Checks de servicio

**postgres.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la instancia PostgreSQL monitorizada. Devuelve `OK` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesita ayuda? Póngase en contacto con [Datadog support](https://docs.datadoghq.com/help).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

### FAQ

- [Explicación de la recopilación de métricas personalizadas de PostgreSQL](https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/)

### Entradas de blog

- [Rendimiento de Postgres 100 veces más rápido cambiando 1 línea](https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line)
- [Métricas clave para la monitorización de PostgreSQL](https://www.datadoghq.com/blog/postgresql-monitoring)
- [Recopilación de métricas con herramientas de monitorización de PostgreSQL](https://www.datadoghq.com/blog/postgresql-monitoring-tools)
- [Recopilación y monitorización de datos PostgreSQL con Datadog](https://www.datadoghq.com/blog/collect-postgresql-data-with-datadog)