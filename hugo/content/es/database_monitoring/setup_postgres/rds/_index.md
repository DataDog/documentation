---
description: Instale y configure DBM para Postgres en Amazon RDS.
further_reading:
- link: /integrations/postgres/
  tag: Documentación
  text: Integración Básica de Postgres
- link: /database_monitoring/guide/rds_autodiscovery
  tag: Documentación
  text: Autodiscovery para RDS
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentación
  text: Capturando Valores de Parámetros de Consultas SQL
title: Configurando DBM para Postgres administrado por Amazon RDS
---
DBM proporciona una visibilidad profunda de sus bases de datos Postgres al exponer métricas de consultas, muestras de consultas, planes de explicación, estados de bases de datos, conmutaciones por error y eventos.

El Agente recopila telemetría directamente de la base de datos iniciando sesión como un usuario de solo lectura. Realice la siguiente configuración para habilitar DBM en su base de datos Postgres:

1. [Configure la integración de AWS](#configure-the-aws-integration)
1. [Configure los parámetros de la base de datos](#configure-postgres-settings)
1. [Otorgue al Agente acceso a la base de datos](#grant-the-agent-access)
1. [Instale y configure el Agente](#install-and-configure-the-agent)
1. [Instale la integración de RDS](#install-the-rds-integration)

<div class="alert alert-info">
<a href="/database_monitoring/setup_postgres/rds/quick_install">Instalación Rápida de RDS</a> es nuestro método de instalación recomendado para entornos más pequeños (por ejemplo, 20 hosts de base de datos) o aquellos nuevos en DBM que desean probarlo rápidamente. Para aquellos que gestionan grandes flotas de bases de datos donde implementar el agente a través de la interfaz de usuario no escala tan bien, recomendamos la instalación estándar, para gestionar el agente manualmente o integrarlo con sus prácticas de automatización.
</div>

## Antes de comenzar {#before-you-begin}

Versiones de PostgreSQL soportadas
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17

Versiones de Agente soportadas
: 7.36.1+

Impacto en el rendimiento
La configuración predeterminada del Agente para DBM es conservadora, pero puede ajustar configuraciones como el intervalo de recolección y la tasa de muestreo de consultas para adaptarlas mejor a sus necesidades. Para la mayoría de las cargas de trabajo, el Agente representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
DBM se ejecuta como una integración sobre el Agente base ([ver benchmarks][1]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Agente de Datadog debe conectarse directamente al host que se está monitoreando. Para bases de datos autoalojadas, utiliza `127.0.0.1` o el socket. El Agente no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones como `pgbouncer`. Si el Agente se conecta a diferentes hosts mientras está en funcionamiento (como en el caso de conmutación por error, balanceo de carga, etc.), el Agente calcula la diferencia en estadísticas entre dos hosts, produciendo métricas inexactas.

Consideraciones sobre la seguridad de los datos
: Consulta [Información sensible][2] para obtener información sobre qué datos recopila el Agente de sus bases de datos y cómo asegurarse de que estén seguros.

## Configure la integración de AWS {#configure-the-aws-integration}

Habilite {{< ui >}}Resource Collection{{< /ui >}} en la sección {{< ui >}}Resource Collection{{< /ui >}} de su [panel de integración de Amazon Web Services][3].

## Configure los ajustes de Postgres {#configure-postgres-settings}

Configure los siguientes [parámetros][4] en el [grupo de parámetros de DB][5] y luego **reinicie el servidor** para que los ajustes surtan efecto. Para más información sobre estos parámetros, consulte la [documentación de Postgres][6].

**Parámetros requeridos**

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Requerido para métricas de `postgresql.queries.*`. Habilita la recolección de métricas de consulta utilizando la extensión [pg_stat_statements][6]. |
| `track_activity_query_size` | `4096` | Requerido para la recolección de consultas más grandes. Aumenta el tamaño del texto SQL en `pg_stat_activity`. Si se deja en el valor predeterminado, las consultas de más de `1024` caracteres no serán registradas. |

**Parámetros opcionales**

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `pg_stat_statements.track` | `ALL` | Habilita el seguimiento de declaraciones dentro de procedimientos almacenados y funciones. |
| `pg_stat_statements.max` | `10000` | Aumenta el número de consultas normalizadas rastreadas en `pg_stat_statements`. Recomendado para bases de datos de alto volumen que reciben muchos tipos diferentes de consultas de muchos clientes diferentes. |
| `pg_stat_statements.track_utility` | `off` | Desactiva comandos de utilidad como PREPARE y EXPLAIN. Establecer este valor en `off` significa que solo se rastrean consultas como SELECT, UPDATE y DELETE. |
| `track_io_timing` | `on` | Habilita la recopilación de tiempos de lectura y escritura de bloques para consultas. |

### Habilite `auto_explain` (opcional) {#enable-auto-explain-optional}

Por defecto, el agente solo recopila [`EXPLAIN`][15] planes para una muestra de consultas en vuelo. Estos planes son de naturaleza más general, especialmente cuando el código de la aplicación utiliza declaraciones preparadas.

Para recopilar planes completos de `EXPLAIN ANALYZE` tomados de todas las consultas, necesitas usar [`auto_explain`][16], una extensión propia incluida con PostgreSQL disponible en todos los proveedores principales. _La recopilación de registros es un requisito previo para la recopilación de `auto_explain`_, por lo que debe habilitarla antes de continuar.

<div class="alert alert-danger">
<strong>Importante:</strong> <code>auto_explain</code> produce líneas de registros que pueden contener datos sensibles de la aplicación, similares a valores en bruto en SQL no ofuscado. Utilice el <a href="/account_management/rbac/permissions/#database-monitoring"><code>dbm_parameterized_queries_read</code></a>Utilice el permiso para controlar el acceso a los planes resultantes. Para restringir la visibilidad de las líneas de registro, que son visibles para todos los usuarios en su organización de Datadog por defecto, configure también <a href="/logs/guide/logs-rbac">RBAC para Registros</a>. Datadog recomienda utilizar ambos permisos para proteger la información sensible de manera efectiva.
</div>

1. Configure los ajustes `auto_explain`. El formato de registro _ debe _ ser `json`, pero otros ajustes pueden variar según su aplicación. Este ejemplo registra un `EXPLAIN ANALYZE` plan para todas las consultas que superan un segundo, incluyendo información de búfer pero omitiendo el tiempo (que puede generar sobrecarga).

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `shared_preload_libraries`      | `pg_stat_statements,auto_explain` | Habilita `EXPLAIN ANALYZE` | automáticamente.
| `auto_explain.log_format`       | `json` | Genera planes legibles por máquina |
| `auto_explain.log_min_duration` | `1000` | Registra planes cuando las consultas superan un segundo |
| `auto_explain.log_analyze`      | `on` | Utilice la forma `ANALYZE` de `EXPLAIN` |
| `auto_explain.log_buffers`      | `on` | Incluya el uso de búfer en los planes |
| `auto_explain.log_timing`       | `off` | No incluya la medición del tiempo (alto costo) |
| `auto_explain.log_triggers`     | `on` | Incluya planes para la declaración de activación |
| `auto_explain.log_verbose`      | `on` | Utilice el tipo de plan detallado |
| `auto_explain.log_nested_statements` | `on` | Incluya declaraciones anidadas |
| `auto_explain.sample_rate`      | `1` | Explique todas las consultas que superen una duración determinada |

2. Cambie el `log_line_prefix` para habilitar una correlación de eventos más completa. Para más información, consulte la documentación de [grupos de parámetros de RDS DB][17]. `auto_explain` La ingestión requiere que esto se establezca en `%m:%r:%u@%d:[%p]:%l:%e:%s:%v:%x:%c:%q%a`.

3. Para asegurar que sus instancias de RDS estén enviando registros a CloudWatch y Datadog, siga las instrucciones para [Colección de Registros de Amazon RDS][18].


## Otorgue acceso al Agente {#grant-the-agent-access}

El Agente de Datadog requiere acceso de solo lectura al servidor de base de datos para recopilar estadísticas y consultas.

Ejecuta los siguientes comandos SQL en el servidor de base de datos **primario** (el escritor) en el clúster si Postgres está replicado. El Agente puede recopilar telemetría de todas las bases de datos en el servidor, independientemente de a qué base de datos se conecte. Utiliza la base de datos `postgres` predeterminada a menos que necesites que el Agente ejecute [consultas personalizadas contra datos únicos de otra base de datos][7].

Conéctese a la base de datos seleccionada como superusuario (o como otro usuario con permisos suficientes). Por ejemplo, para conectarse a la base de datos `postgres` utilizando [psql][8]:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Cree el `datadog` usuario:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

**Nota:** La autenticación IAM también es compatible. Consulte [la guía][9] sobre cómo configurar esto para su instancia de RDS.

{{< tabs >}}
{{% tab "Postgres ≥ 15" %}}

Otorga al `datadog` usuario permiso para las tablas relevantes:

```SQL
ALTER ROLE datadog INHERIT;
```

Crea el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
```
{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Crea el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

Crea el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Crea funciones **en cada base de datos** para permitir que el Agente lea el contenido completo de `pg_stat_activity` y `pg_stat_statements`:

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

<div class="alert alert-info">Para la recolección de datos o métricas personalizadas que requieran consultar tablas adicionales, es posible que deba otorgar el acceso correspondiente. <code>SELECT</code> permiso en esas tablas al <code>datadog</code> usuario. Ejemplo: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Consulta <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">la recolección de métricas personalizadas de PostgreSQL</a> para más información. </div>

### Crea la función de explain plan {#create-the-explain-plan-function}

Crea la siguiente función **en cada base de datos** para permitir que el Agente recoja explain plans:

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

### Almacena tu contraseña de forma segura {#securely-store-your-password}
{{% dbm-secret %}}

### Verifica los permisos de la base de datos {#verify-database-permissions}

Para verificar que los permisos son correctos, ejecuta los siguientes comandos para confirmar que el usuario del Agente puede conectarse a la base de datos y leer las tablas principales:
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

Cuando se te pida una contraseña, utiliza la contraseña que ingresaste al crear el `datadog` usuario.

## Instala y configura el Agente {#install-and-configure-the-agent}

Para monitorear los hosts de RDS, instala el Agente de Datadog en tu infraestructura y configúralo para conectarse a cada punto de conexión de instancia de forma remota. El Agente no necesita ejecutarse en la base de datos, solo necesita conectarse a ella. Para métodos adicionales de instalación del Agente no mencionados aquí, consulta las [instrucciones de instalación del Agente][10].

{{< tabs >}}
{{% tab "Host" %}}
Para configurar la recolección de métricas de Monitoreo de Base de Datos para un Agente que se ejecuta en un host, por ejemplo, cuando provisionas una pequeña instancia de EC2 para que el Agente recolecte de una base de datos RDS:

1. Edita el archivo `postgres.d/conf.yaml` para apuntar a tu `host` / `port` y establece los maestros a monitorear. Consulta el [archivo de ejemplo postgres.d/conf.yaml][1] para ver todas las opciones de configuración disponibles.

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       password: 'ENC[datadog_user_database_password]'
       aws:
         instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
         region: '<REGION>'
       tags:
         - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()

       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

   Para versiones del Agente `≤ 7.49`, agrega la siguiente opción a la configuración de la instancia donde se especifican `host` y `port`:

   ```yaml
   ssl: allow
   ```

   Si deseas autenticarte con IAM, especifica los parámetros `region` y `instance_endpoint`, y establece `managed_authentication.enabled` en `true`.

   **Nota**: solo habilita `managed_authentication` si deseas usar la autenticación IAM. La autenticación IAM tiene prioridad sobre el campo `password`.

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       aws:
         instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
         region: '<REGION>'
         managed_authentication:
           enabled: true
       tags:
         - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()

       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

   Para información sobre cómo configurar la autenticación IAM en tu instancia de RDS, consulta [Conexión con Autenticación Administrada][3].

2. [Reiniciar el Agente][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /es/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Docker" %}}
Para configurar una integración para un Agente que se ejecuta en un contenedor Docker, como en ECS o Fargate, tienes un par de métodos disponibles, todos los cuales se cubren en detalle en la [Documentación de Configuración de Docker][1].

Los ejemplos a continuación muestran cómo usar [Etiquetas de Docker][2] y [Plantillas de Autodiscovery][3] para configurar la integración de Postgres.

**Nota**: El Agente debe tener permiso de lectura en el socket de Docker para que el Autodiscovery de etiquetas funcione.

### Línea de comandos {#command-line}

Ejecute el siguiente comando desde su [línea de comandos][4] para iniciar el Agente. Reemplace los valores de marcador de posición con los de su cuenta y entorno.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{"postgres": {
    "init_config": {},
    "instances": [{
      "dbm": true,
      "host": "<AWS_INSTANCE_ENDPOINT>",
      "port": 5432,
      "username": "datadog",
      "password": "<UNIQUEPASSWORD>",
       "aws": {
         "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
         "region": "<REGION>"
       },
      "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]
    }]
  }}' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

Para Postgres 9.6, agregue la siguiente configuración a la instancia donde se especifican el servidor y el puerto:

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

### Dockerfile {#dockerfile}

También puede especificar etiquetas en un `Dockerfile`, lo que le permite construir y desplegar un Agente personalizado sin modificar la configuración de su infraestructura.

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]","aws": {"instance_endpoint": "<AWS_INSTANCE_ENDPOINT>", "region": "<REGION>"}, "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]}]'
```

Para Postgres 9.6, agregue la siguiente configuración a la instancia donde se especifican el servidor y el puerto:

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

Para evitar exponer la contraseña del usuario `datadog` en texto plano, use el [paquete de gestión de secretos][5] del Agent y declare la contraseña utilizando la sintaxis `ENC[]`. Alternativamente, consulte la [documentación de variables de plantilla de Autodiscovery][6] para proporcionar la contraseña como una variable de entorno.

[1]: /es/containers/docker/integrations/?tab=labels#configuration
[2]: https://docs.docker.com/engine/manage-resources/labels/
[3]: /es/getting_started/containers/autodiscovery/
[4]: /es/containers/docker/integrations/?tab=labels#using-docker-run-nerdctl-run-or-podman-run
[5]: /es/agent/configuration/secrets-management
[6]: /es/agent/faq/template_variables/
{{% /tab %}}

{{% tab "Kubernetes" %}}
Si está ejecutando un clúster de Kubernetes, use el [Datadog Cluster Agent][1] para habilitar Database Monitoring.

**Nota**: Asegúrese de que [verificaciones de clúster][2] estén habilitadas para su Datadog Cluster Agent antes de continuar.

A continuación se presentan instrucciones paso a paso para configurar la integración de Postgres utilizando diferentes métodos de implementación del Datadog Cluster Agent.

### Operador {#operator}

Usando las [instrucciones del Operador en Kubernetes e Integraciones][3] como referencia, siga los pasos a continuación para configurar la integración de Postgres:

1. Cree o actualice el archivo `datadog-agent.yaml` con la siguiente configuración:

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
            tag: <AGENT_VERSION>

        clusterAgent:
          extraConfd:
            configDataMap:
              postgres.yaml: |-
                cluster_check: true
                init_config:
                instances:
                - host: <AWS_INSTANCE_ENDPOINT>
                  port: 5432
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
                  aws:
                    instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                    region: <REGION>
                  tags:
                  - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

    ```

    **Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Aplique los cambios al Datadog Operator utilizando el siguiente comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

Usando las [instrucciones de Helm en Kubernetes e Integrations][4] como referencia, siga los pasos a continuación para configurar la integración de Postgres:

1. Actualice su archivo `datadog-values.yaml` (utilizado en las instrucciones de instalación del Agente del Clúster) con la siguiente configuración:

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
            host: <AWS_INSTANCE_ENDPOINT>
            port: 5432
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            aws:
              instance_endpoint: <AWS_INSTANCE_ENDPOINT>
              region: <REGION>
            tags:
            - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

    ```

    **Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Despliega el Agente con el archivo de configuración anterior usando el siguiente comando:

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Para Windows, añade <code>--set targetSystem=windows</code> al <code>helm install</code> comando.
</div>

### Configura con archivos montados {#configure-with-mounted-files}

Para configurar una verificación de clúster con un archivo de configuración montado, monta el archivo de configuración en el contenedor del Agente del Clúster en la ruta: `/conf.d/postgres.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: <AWS_INSTANCE_ENDPOINT>
      region: <REGION>
    tags:
    - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

    ## Required: For Postgres 9.6, uncomment these lines to use the functions created in the setup
    # pg_stat_statements_view: datadog.pg_stat_statements()
    # pg_stat_activity_view: datadog.pg_stat_activity()
```

### Configura con anotaciones de servicio de Kubernetes {#configure-with-kubernetes-service-annotations}

En lugar de montar un archivo, puedes declarar la configuración de la instancia como un servicio de Kubernetes. Para configurar esta verificación para un Agente que se ejecuta en Kubernetes, crea un servicio usando la siguiente sintaxis:

#### Autodiscovery anotaciones v2 {#autodiscovery-annotations-v2}

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.checks: |
      {
        "postgres": {
          "init_config": <INIT_CONFIG>,
          "instances": [
            {
              "dbm": true,
              "host": "<AWS_INSTANCE_ENDPOINT>",
              "port": 5432,
              "username": "datadog",
              "password": "ENC[datadog_user_database_password]",
              "aws": {
                "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
                "region": "<REGION>"
              },
              "tags": [
                "dbinstanceidentifier:<DB_INSTANCE_NAME>"
              ]
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

Para más información, consulta [Autodiscovery Annotations][5].

Si estás usando Postgres 9.6, añade lo siguiente a la configuración de la instancia:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

El Agente del Clúster registra automáticamente esta configuración y comienza a ejecutar la verificación de Postgres.

Para evitar exponer la contraseña del `datadog` usuario en texto plano, utiliza el [paquete de gestión de secretos][6] del Agente y declara la contraseña usando la sintaxis `ENC[]`.

[1]: /es/containers/cluster_agent/setup/
[2]: /es/containers/cluster_agent/clusterchecks/
[3]: /es/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /es/containers/kubernetes/integrations/?tab=helm
[5]: /es/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /es/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### Verifica la configuración del Agente {#verify-agent-setup}

[Ejecuta el subcomando de estado del Agente][11] y busca `postgres` en la sección de Verificaciones. O visita la página de [Bases de Datos][12] para comenzar!

## Ejemplos de configuraciones del Agente {#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## Instala la integración de RDS {#install-the-rds-integration}

Para ver métricas de infraestructura de AWS, como CPU, junto con la telemetría de la base de datos en DBM, instala la [integración de RDS][13] (opcional).

## Solución de problemas {#troubleshooting}

Si has instalado y configurado las integraciones y el Agente como se describe y no está funcionando como se esperaba, consulta [Solución de problemas][14].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /es/database_monitoring/data_collected/#sensitive-information
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[6]: https://www.postgresql.org/docs/current/pgstatstatements.html
[7]: /es/integrations/faq/postgres-custom-metric-collection-explained/
[8]: https://www.postgresql.org/docs/current/app-psql.html
[9]: /es/database_monitoring/guide/managed_authentication
[10]: https://app.datadoghq.com/account/settings/agent/latest
[11]: /es/agent/configuration/agent-commands/#agent-status-and-information
[12]: https://app.datadoghq.com/databases
[13]: /es/integrations/amazon_rds
[14]: /es/database_monitoring/troubleshooting/?tab=postgres
[15]: https://www.postgresql.org/docs/current/sql-explain.html
[16]: https://www.postgresql.org/docs/current/auto-explain.html
[17]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.PostgreSQL.overview.parameter-groups.html
[18]: /es/integrations/amazon-rds/?tab=standard#log-collection