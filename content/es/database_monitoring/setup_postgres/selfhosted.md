---
description: Instala y configura Database Monitoring para Postgres autoalojado.
further_reading:
- link: /integrations/postgres/
  tag: Documentación
  text: Integración Postgres básica
title: Configuración de Database Monitoring para Postgres autoalojado
---

Database Monitoring te proporciona una amplia visibilidad de tus bases de datos Postgres mediante la exposición de métricas de consultas, muestras de consultas, explain-plans, estados de bases de datos, conmutaciones por error y eventos.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como usuario de sólo lectura. Realiza la siguiente configuración para habilitar Database Monitoring con tu base de datos Postgres:

1. [Configura parámetros de bases de datos](#configure-postgres-settings).
1. [Concede al Agent acceso a la base de datos](#grant-the-agent-access).
1. [Instala el Agent](#install-the-agent).

## Antes de empezar

Versiones de PostgreSQL compatibles
: 9.6, 10, 11, 12, 13, 14, 15, 16

Requisitos previos
: Los módulos de Postgres adicionales proporcionados deben estar instalados. En la mayoría de las instalaciones, esto se incluye por defecto, pero las instalaciones menos convencionales pueden requerir una instalación adicional de tu versión del [paquete `postgresql-contrib`][1].

Versiones del Agent compatibles
: v7.36.1 o posterior

Impacto en el rendimiento
: La configuración de Database Monitoring predeterminada del Agent es conservadora, pero puedes ajustar algunos parámetros como el intervalo de recopilación y la frecuencia de muestreo de consultas según tus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de la consulta en la base de datos y menos del uno por ciento del uso de CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agent de base ([consulta las referencias][2]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al host que se está monitorizando. Para las bases de datos autoalojadas, se prefiere `127.0.0.1` o el socket. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones como `pgbouncer`. Si el Agent se conecta a diferentes hosts mientras se ejecuta (como en el caso de la conmutación por error, el balanceo de carga, etc.), el Agent calcula la diferencia en las estadísticas entre dos hosts, lo que produce inexactitudes en las métricas.

Consideraciones sobre la seguridad de los datos
: Para saber qué datos recopila el Agent de tus bases de datos y cómo garantizar su seguridad, consulta [Información confidencial][3].

## Configuración de parámetros de Postgres

Configura los siguientes [parámetros][4] en el archivo `postgresql.conf` y luego **reinicia el servidor** para que la configuración surta efecto. Para obtener más información sobre estos parámetros, consulta la [documentación de Postgres][5].

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Necesario para métricas `postgresql.queries.*`. Habilita la recopilación de métricas de consultas utilizando la extensión [pg_stat_statements][5]. |
| `track_activity_query_size` | `4096` | Necesario para recopilar consultas de mayor tamaño. Aumenta el tamaño del texto SQL en `pg_stat_activity`. Si se deja con el valor predeterminado, las consultas de más de `1024` caracteres no se recopilan. |
| `pg_stat_statements.track` | `ALL` | Opcional. Habilita el seguimiento de sentencias dentro de procedimientos almacenados y funciones. |
| `pg_stat_statements.max` | `10000` | Opcional. Aumenta el número de consultas normalizadas rastreadas en `pg_stat_statements`. Este parámetro se recomienda para bases de datos de gran volumen que reciben muchos tipos diferentes de consultas de muchos clientes distintos. |
| `pg_stat_statements.track_utility` | `off` | Opcional. Deshabilita comandos de utilidad como PREPARE y EXPLAIN. Configurar este valor en `off` significa que sólo se rastrearán consultas como SELECT, UPDATE y DELETE. |
| `track_io_timing` | `on` | Opcional. Habilita la recopilación de los tiempos de lectura y escritura de bloques para las consultas. |

## Conceder acceso al Agent 

El Datadog Agent requiere acceso de sólo lectura al servidor de la base de datos para recopilar estadísticas y consultas.

Los siguientes comandos SQL deben ejecutarse en el servidor de base de datos **primario** (el escritor) en el clúster, si Postgres está replicado. Elige una base de datos PostgreSQL en el servidor de base de datos para que el Agent se conecte a ella. El Agent puede recopilar telemetría de todas las bases de datos del servidor de bases de datos independientemente de a cuál se conecte, por lo que una buena opción es utilizar la base de datos predeterminada `postgres`. Elige una base de datos diferente sólo si necesitas que el Agent ejecute [consultas personalizadas con datos exclusivos de esa base de datos][6].

Conéctate a la base de datos elegida como superusuario (u otro usuario con permisos suficientes). Por ejemplo, si la base de datos elegida es `postgres`, conéctate como el usuario `postgres` a través de [psql][7] ejecutando:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Crea el usuario `datadog`:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres v15 o posterior" %}}

Proporciona al usuario `datadog` permiso en las tablas pertinentes:

```SQL
ALTER ROLE datadog INHERIT;
```

Crea el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres v10 o posterior" %}}

Crea el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres v9.6" %}}

Crea el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Crea funciones **en cada base de datos** para que el Agent pueda leer el contenido completo de `pg_stat_activity` y `pg_stat_statements`:

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

<div class="alert alert-info">Para la recopilación de datos o métricas personalizadas que requieren consultar tablas adicionales, es posible que tengas que conceder el permiso <code>SELECT</code> en esas tablas al usuario <code>Datadog</code>. Ejemplo: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Para obtener más información, consulta <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">Recopilación de métricas personalizadas de PostgreSQL</a>. </div>

Crea la función **en cada base de datos** para permitir al Agent recopilar explain-plans.

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

### Guardar tu contraseña de forma segura
{{% dbm-secret %}}

### Verificación

Para verificar que los permisos son correctos, ejecuta los siguientes comandos para confirmar que el usuario del Agent puede conectarse a la base de datos y leer las tablas principales:

{{< tabs >}}
{{% tab "Postgres v10 o posterior" %}}

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
{{% tab "Postgres v9.6" %}}

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
{{< /tabs >}}

Cuando se te pida una contraseña, utiliza la que introdujiste al crear el usuario `datadog`.

## Instalación del Agent

Al instalar el Datadog Agent también se instala el check de Postgres, necesario para Database Monitoring en Postgres.

1. Si aún no has instalado el Agent, consulta las [instrucciones de instalación del Agent][8] y luego regresa aquí para configurar el check de Postgres.

2. Sigue las siguientes instrucciones, dependiendo de cómo hayas instalado el Agent.

<!-- Opciones de despliegue -->
{{< tabs >}}

{{% tab "Host" %}}

Después de instalar el Agent host, edita el archivo `conf.d/postgres.d/conf.yaml` del Agent para indicar la instancia de Postgres que quieres monitorizar. Para ver una lista completa de las opciones de configuración, consulta el [ejemplo postgres.d/conf.yaml][1].

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: localhost
       port: 5432
       username: datadog
       password: 'ENC[datadog_user_database_password]'

      ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
      # pg_stat_statements_view: datadog.pg_stat_statements()
      # pg_stat_activity_view: datadog.pg_stat_activity()

      ## Optional: Connect to a different database if needed for `custom_queries`
      # dbname: '<DB_NAME>'

   ```

**Nota**: Si su contraseña incluye caracteres especiales, enciérrala entre comillas simples.

[Reinicia el Agent][2] para aplicar los cambios.

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /es/agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}

{{% tab "Docker" %}}

Para configurar una integración para un Agent que se ejecuta en un contenedor Docker, hay algunos métodos disponibles que se cubren en detalle en la [documentación de configuración de Docker][1].

Los siguientes ejemplos muestran cómo utilizar [etiquetas (labels) de Docker][2] y [plantillas de Autodiscovery][3] para configurar la integración Postgres.

**Nota**: El Agent debe tener acceso de lectura al socket Docker para que funcione el Autodiscovery basado en etiquetas.

### Línea de comandos

Ejecuta el siguiente comando desde tu [línea de comandos][4] para iniciar el Agent. Sustituye los valores de los marcadores de posición por los de tu cuenta y entorno.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{"postgres": {
    "init_config": {},
    "instances": [{
      "dbm": true,
      "host": "<HOST>",
      "port": 5432,
      "username": "datadog",
      "password": "ENC[datadog_user_database_password]"
    }]
  }}' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

**Nota**: Para Postgres v9.6, añade las siguientes líneas a la configuración de la instancia:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()",
```

### Archivo Docker

También puedes especificar etiquetas en `Dockerfile`, lo que te permite crear y desplegar un Agent personalizado sin modificar la configuración de tu infraestructura:

```Dockerfile
FROM gcr.io/datadoghq/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.checks"='{"postgres": {"init_config": {}, "instances": [{"dbm": true, "host": "<HOST>", "port": 5432, "username": "datadog", "password": "ENC[datadog_user_database_password]"}]}}'
```

**Nota**: Para Postgres v9.6, añade las siguientes líneas a la configuración de la instancia donde se especifican el host y el puerto:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()", "pg_stat_activity_view": "datadog.pg_stat_activity()",
```

Para evitar exponer la contraseña del usuario `datadog` en texto plano, utiliza el [paquete de gestión de secretos][5] del Agent y declara la contraseña utilizando la sintaxis `ENC[]`. Alternativamente, consulta la [documentación de variables de plantilla de Autodiscovery][6] para proporcionar la contraseña como una variable de entorno.

[1]: /es/containers/docker/integrations/?tab=labels#configuration
[2]: https://docs.docker.com/engine/manage-resources/labels/
[3]: /es/getting_started/containers/autodiscovery/
[4]: /es/containers/docker/integrations/?tab=labels#using-docker-run-nerdctl-run-or-podman-run
[5]: /es/agent/configuration/secrets-management
[6]: /es/agent/faq/template_variables/

{{% /tab %}}

{{% tab "Kubernetes" %}}

Si estás ejecutando el clúster de Kubernetes, utiliza el [Datadog Cluster Agent][1] para activar Database Monitoring.

**Nota**: Asegúrate de que los [checks de clúster][2] estén activados para tu Datadog Cluster Agent antes de continuar.

A continuación encontrarás instrucciones paso a paso para configurar la integración Postgres utilizando diferentes métodos de despliegue del Datadog Cluster Agent.

### Operator

Utilizando como referencia las [Instrucciones del Operator en Kubernetes e integraciones][3], sigue los pasos que se indican a continuación para configurar la integración Postgres:

1. Crea o actualiza el archivo `datadog-agent.yaml` con la siguiente configuración:

    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        clusterName: <CLUSTER_NAME>
        site: <DD_SITE>
        credentials:
          apiSecret:
            secretName: datadog-agent-secret
            keyName: api-key

      features:
        clusterChecks:
          enabled: true

      override:
        nodeAgent:
          image:
            name: agent
            tag: 7.63.3

        clusterAgent:
          extraConfd:
            configDataMap:
              postgres.yaml: |-
                cluster_check: true
                init_config:
                instances:
                - host: <HOST>
                  port: 5432
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
    ```

    **Nota**: Para Postgres v9.6, añade las siguientes líneas a la configuración de la instancia donde se especifican el host y el puerto:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Aplica los cambios al Datadog Operator utilizando el siguiente comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm

Utilizando como referencia las [instrucciones de Helm en Kubernetes e integraciones][4], sigue los pasos que se indican a continuación para configurar la integración Postgres:

1. Actualiza tu archivo `datadog-values.yaml` (utilizado en las instrucciones de instalación del Cluster Agent) con la siguiente configuración:

    ```yaml
    datadog:
      clusterChecks:
        enabled: true

    clusterChecksRunner:
      enabled: true

    clusterAgent:
      enabled: true
      confd:
        postgres.yaml: |-
          cluster_check: true
          init_config:
          instances:
          - dbm: true
            host: <HOST>
            port: 5432
            username: datadog
            password: 'ENC[datadog_user_database_password]'

    ```

    **Nota**: Para Postgres v9.6, añade las siguientes líneas a la configuración de la instancia donde se especifican el host y el puerto:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Despliega el Agent con el archivo de configuración anterior utilizando el siguiente comando:

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
</div>

### Configuración con archivos integrados

Para configurar un check de clúster con un archivo de configuración montado, monta el archivo de configuración en el contenedor del Cluster Agent en la ruta: `/conf.d/postgres.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<HOST>'
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'

    ## Required: For Postgres 9.6, uncomment these lines to use the functions created in the setup
    # pg_stat_statements_view: datadog.pg_stat_statements()
    # pg_stat_activity_view: datadog.pg_stat_activity()
```

### Configuración con anotaciones de servicios de Kubernetes

En lugar de montar un archivo, puedes declarar la configuración de la instancia como un servicio de Kubernetes. Para configurar este check para un Agent que se ejecuta en Kubernetes, crea un servicio en el mismo espacio de nombres que el Datadog Cluster Agent:

#### Anotaciones de Autodiscovery v2

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "postgres": {
          "init_config": <INIT_CONFIG>,
          "instances": [
            {
              "dbm": true,
              "host": "<HOST>",
              "port": 5432,
              "username": "datadog",
              "password": "ENC[datadog_user_database_password]"
            }
          ]
        }
      }      
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```

Para obtener más información, consulta [Anotaciones de Autodiscovery][5].

Si utilizas Postgres v9.6, añade lo siguiente a la configuración de la instancia:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar el check de Postgres.

Para evitar exponer la contraseña del usuario `datadog` en texto simple, utiliza el [paquete de gestión de secretos][6] del Agent y declara la contraseña utilizando la sintaxis `ENC[]`.

[1]: /es/containers/cluster_agent/setup/
[2]: /es/containers/cluster_agent/clusterchecks/
[3]: /es/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /es/containers/kubernetes/integrations/?tab=helm
[5]: /es/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /es/agent/configuration/secrets-management


{{% /tab %}}

{{< /tabs >}}

### Recopilación de logs (opcional)

La generación de logs por defecto de PostgreSQL es en `stderr`. Estos logs no incluyen información detallada. Se recomienda hacerlo en un archivo con detalles adicionales especificados en el prefijo de la línea de logs. Para obtener más detalles, consulta la [documentación][11] de PostgreSQL sobre este tema.

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
2. Para recopilar métricas de duración detalladas y permitir su búsqueda en la interfaz de Datadog, estas métricas deben configurarse en línea con la propia sentencia. A continuación, consulta las diferencias de configuración recomendadas con respecto a las anteriores y ten en cuenta que las opciones `log_statement` y `log_duration` están comentadas. Consulta la discusión sobre este tema [aquí][12].

   Esta configuración registra todas las sentencias, pero para reducir el resultado a aquellas que tienen una duración determinada, configura el valor `log_min_duration_statement` con la duración mínima deseada en milisegundos (comprueba que el registro de la sentencia SQL completa cumple con los requisitos de privacidad de tu organización):
   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```
3. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:
   ```yaml
   logs_enabled: true
   ```
4. Añade y edita este bloque de configuración en tu archivo `conf.d/postgres.d/conf.yaml` para empezar a recopilar tus logs PostgreSQL:
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
   Cambia los valores de los parámetros `service` y `path` a fin de configurarlos para tu entorno. Para ver todas las opciones de configuración disponibles, consulta la [muestra postgres.d/conf.yaml][9].
5. [Reinicia el Agent][10].

### Validación

[Ejecuta el subcomando de estado del Agent][13] y busca `postgres` en la sección Checks o visita la página [Bases de datos][14] para empezar.

## Configuraciones del Agent de ejemplo
{{% dbm-postgres-agent-config-examples %}}

## Solucionar problemas

Si has instalado y configurado las integraciones y el Agent como se describe, pero no funcionan como se esperaba, consulta [Solucionar problemas][15].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.postgresql.org/docs/12/contrib.html

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