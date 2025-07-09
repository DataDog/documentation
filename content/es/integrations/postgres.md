---
app_id: postgres
app_uuid: e6b3c5ec-b293-4a22-9145-277a12a9abd4
assets:
  dashboards:
    postgresql: assets/dashboards/postgresql_dashboard.json
    postgresql_screenboard: assets/dashboards/postgresql_screenboard_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - postgresql.connections
      - postgresql.max_connections
      metadata_path: metadata.csv
      prefix: postgresql.
    process_signatures:
    - postgres -D
    - pg_ctl start -l logfile
    - postgres -c 'pg_ctl start -D -l
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: !!int 28
    source_type_name: Postgres
  monitors:
    Connection pool is reaching saturation point: assets/monitors/percent_usage_connections.json
    Replication delay is high: assets/monitors/replication_delay.json
  saved_views:
    operations: assets/saved_views/operations.json
    postgres_pattern: assets/saved_views/postgres_pattern.json
    postgres_processes: assets/saved_views/postgres_processes.json
    sessions_by_host: assets/saved_views/sessions_by_host.json
    slow_operations: assets/saved_views/slow_operations.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
- notifications
- tracing
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/postgres/README.md
display_on_public_website: true
draft: false
git_integration_title: postgres
integration_id: postgres
integration_title: Postgres
integration_version: 22.0.1
is_public: true
manifest_version: 2.0.0
name: postgres
public_title: Postgres
short_description: Recopila una importante cantidad de métricas del rendimiento y el estado de las bases de datos.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Almacenes de datos
  - Category::Recopilación de logs
  - Category::Notificaciones
  - Category::Rastreo
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integración
  configuration: README.md#Configuración
  description: Recopila una importante cantidad de métricas del rendimiento y el estado de las bases de datos.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line
  - resource_type: blog
    url: https://www.datadoghq.com/blog/postgresql-monitoring
  - resource_type: blog
    url: https://www.datadoghq.com/blog/postgresql-monitoring-tools
  - resource_type: blog
    url: https://www.datadoghq.com/blog/collect-postgresql-data-with-datadog
  support: README.md#Soporte
  title: Postgres
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


[Gráfico de PostgreSQL][1]

## Información general

La integración Postgres proporciona métricas del estado y el rendimiento de tu base de datos Postgres casi en tiempo real. Visualiza estos métricas con el dashboard proporcionado y crea monitores para alertar a tu equipo sobre los estados de PostgreSQL.

Habilita [Database Monitoring][2] (DBM) para obtener información mejorada sobre el rendimiento de las consultas y el estado de las bases de datos. Además de la integración estándar, Datadog DBM proporciona métricas a nivel de consulta, snapshots de consultas históricas y actuales, análisis de eventos de espera, carga de bases de datos, planes de explicación de consultas e información sobre bloqueos de consultas.

Se admiten las versiones 9.6-16 de Postgres.

## Configuración

<div class="alert alert-info">En esta página se describe la integración estándar del Agent con Postgres. Si buscas el producto Database Monitoring para Postgres, consulta <a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Datadog Database Monitoring</a>.</div>

### Instalación

El check de PostgreSQL viene en el mismo paquete que el Agent. Para empezar a reunir tus métricas y logs de PostgreSQL, [instala el Agent][3].

### Configuración

**Nota**: Para instalar Database Monitoring para PostgreSQL, selecciona tu solución de alojamiento en la [documentación de Database Monitoring][4] para obtener instrucciones.

Procede con los siguientes pasos de esta guía, sólo si vas a instalar la integración estándar únicamente.

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

**Nota**: Al generar métricas personalizadas que requieren que se consulten tablas adicionales, puede que sea necesario conceder el permiso `SELECT` al usuario `datadog` para acceder a esas tablas. Ejemplo: `grant SELECT on <TABLE_NAME> to datadog;`. Para obtener más información, consulta la [sección FAQ][1].

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `postgres.d/conf.yaml` para que apunte a tu `host` / `port` y define los maestros que se van a monitorizar. Para ver todas las opciones de configuración disponibles, consulta el [postgres.d/conf.yaml de ejemplo][2].

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

2. Para recopilar métricas de relación, conecta el Agent a cada base de datos lógica. Estas bases de datos se pueden detectar automáticamente o cada una de ellas puede estar explícitamente listada en la configuración. 

    - Para detectar bases de datos lógicas automáticamente en una instancia determinada, habilita la detección automática en esa instancia:

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
3. [Reinicia el Agent][3].

##### Recopilación de trazas (traces)

Datadog APM se integra con Postgres para visualizar trazas a través de tu sistema distribuido. La recopilación de trazas está habilitada por defecto en el Datadog Agent v6 o posteriores. Para empezar a recopilar trazas:

1. [Habilita la recopilación de trazas en Datadog][4].
2. [Instrumenta la aplicación que realiza solicitudes a Postgres][5].

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La generación de logs por defecto de PostgreSQL es para `stderr` y los logs no incluyen información detallada. Se recomienda generar logs en un archivo con detalles adicionales especificados en el prefijo de línea de los logs. Para obtener más información, consulta la documentación de PostgreSQL sobre [informes de error y generación de logs][6].

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

2. Para recopilar métricas de duración detallada y permitir su búsqueda en la interfaz de Datadog, deben configurarse en línea con la propia sentencia. Consulta a continuación las diferencias de configuración recomendadas con respecto a las anteriores. **Nota**: Las opciones `log_statement` y `log_duration` están comentadas. Para ver una discusión sobre este tema, consulta [Sentencia/duración de la generación de logs en la misma línea][7].

   Esta configuración registra todas las sentencias. Para reducir los resultados en función de la duración, ajusta el valor `log_min_duration_statement` a la duración mínima deseada (en milisegundos):

   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```

3. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

4. Añade y edita este bloque de configuración a tu archivo `postgres.d/conf.yaml` para empezar a recopilar tus logs de PostgreSQL:

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

   Cambia los valores de los parámetros `service` y `path` a fin de configurarlos para tu entorno. Para ver todas las opciones de configuración disponibles, consulta el [postgres.d/conf.yaml de ejemplo][2].

5. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/integrations/postgres/?tab=host#faq
[2]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/tracing/send_traces/
[5]: https://docs.datadoghq.com/tracing/setup/
[6]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[7]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Configura [plantillas de integraciones Autodiscovery][1] como etiquetas (labels) Docker en el contenedor de tu aplicación:

```yaml
LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"host":"%%host%%", "port":5432,"username":"datadog","password":"<PASSWORD>"}]'
```

##### Recopilación de logs


La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Docker][2].

Luego, configura [integraciones de logs][3] como etiquetas Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"postgresql","service":"postgresql"}]'
```

##### Recopilación de trazas

APM para aplicaciones en contenedores es compatible con la versión 6 o posteriores del Agent, pero requiere una configuración adicional a fin de empezar a recopilar trazas.

Variables de entorno necesarias en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | verdadero                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | verdadero |

Para ver una lista completa de las variables de entorno y la configuración disponibles, consulta [Rastreo de aplicaciones Docker][4].

Luego, [instrumenta el contenedor de tu aplicación que realiza solicitudes a Postgres][3] y configura `DD_AGENT_HOST` con el nombre del contenedor de tu Agent.


[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Para configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [plantillas de integraciones de Autodiscovery][1] como anotaciones de pod en el contenedor de tu aplicación. Además de esto, las plantillas también se pueden configurar con [un archivo, un mapa de configuración o un almacén de clave-valor][2].

**Anotaciones v1** (para la versión 7.36 o anterior del Datadog Agent)

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

**Anotaciones v2** (para la versión 7.36 o posterior del Datadog Agent)

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


La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Kubernetes][3].

Luego, configura las [integraciones de logs][4] como anotaciones de pod. Esto también se puede configurar con [un archivo, un mapa de configuración o un almacén de clave-valor][5].

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

APM para aplicaciones en contenedores es compatible con hosts que se ejecutan en la versión 6 o posteriores del Agent, pero requiere una configuración adicional a fin de empezar a recopilar trazas.

Variables de entorno necesarias en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | verdadero                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | verdadero |

Para ver una lista completa de las variables de entorno y la configuración disponibles, consulta [Rastreo de aplicaciones Kubernetes][6] y la [configuración del DaemonSet de Kubernetes][7].

A continuación, [instrumenta el contenedor de tu aplicación que realiza solicitudes a Postgres][4].

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration
[6]: https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
[7]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/service_checks.json
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Configura [plantillas de integraciones Autodiscovery][1] como etiquetas Docker en el contenedor de tu aplicación:

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

##### Recopilación de logs


La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de ECS][2].

Luego, configura [integraciones de logs][3] como etiquetas Docker:

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

APM para aplicaciones en contenedores es compatible con la versión 6 o posteriores del Agent, pero requiere una configuración adicional a fin de empezar a recopilar trazas.

Variables de entorno necesarias en el contenedor del Agent:

| Parámetro            | Valor                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | verdadero                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | verdadero |

Para ver una lista completa de las variables de entorno y la configuración disponibles, consulta [Rastreo de aplicaciones Docker][4].

Luego, [instrumenta el contenedor de tu aplicación que realiza solicitudes a Postgres][3] y configura `DD_AGENT_HOST` en la [dirección IP privada de EC2][5].

[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/agent/docker/apm/
[5]: https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `postgres` en la sección Checks.

## Datos recopilados

Algunas de las métricas enumeradas a continuación requieren una configuración adicional. Para ver todas las opciones configurables, consulta el [postgres.d/conf.yaml de ejemplo][6].

### Métricas
{{< get-metrics-from-git "postgres" >}}


Para la versión `7.32.0` y posteriores del Agent, si tienes Database Database Monitoring habilitado, la métrica `postgresql.connections` se etiqueta (tag) con `state`, `app`, `db` y `user`.

### Eventos

El check de PostgreSQL no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "postgres" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

### FAQ

- [Explicación de la recopilación de métricas personalizadas de PostgreSQL][8]

### Entradas de blog

- [Postgres 100 veces más rápido cambiando 1 línea][9]
- [Monitorización de métricas clave para PostgreSQL][10]
- [Recopilación de métricas con herramientas de monitorización PostgreSQL][11]
- [Para recopilar y monitorizar datos de PostgreSQL con Datadog][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postgres/images/postgresql_dashboard.png
[2]: https://docs.datadoghq.com/database_monitoring/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/database_monitoring/#postgres
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[7]: https://docs.datadoghq.com/help
[8]: https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/
[9]: https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line
[10]: https://www.datadoghq.com/blog/postgresql-monitoring
[11]: https://www.datadoghq.com/blog/postgresql-monitoring-tools
[12]: https://www.datadoghq.com/blog/collect-postgresql-data-with-datadog
