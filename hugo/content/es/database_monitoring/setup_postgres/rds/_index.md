---
description: Instale y configure Database Monitoring para Postgres en Amazon RDS.
further_reading:
- link: /integrations/postgres/
  tag: Documentación
  text: Integración básica de Postgres
- link: /database_monitoring/guide/rds_autodiscovery
  tag: Documentación
  text: Autodiscovery para RDS
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentación
  text: Captura de valores de parámetros de consultas SQL
- link: https://www.datadoghq.com/architecture/dbm-quick-install-aws-rds-postgres/
  tag: Centro de arquitectura
  text: Instalación rápida de Datadog DBM para AWS RDS
title: Configuración de Database Monitoring para Postgres administrado en Amazon RDS
---
Database Monitoring proporciona una visibilidad profunda de sus bases de datos Postgres al exponer métricas de consultas, muestras de consultas, planes de explicación, estados de bases de datos, conmutaciones por error y eventos.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como un usuario de solo lectura. Realice la siguiente configuración para habilitar Database Monitoring con su base de datos Postgres:

1. [Configure la integración de AWS](#configure-the-aws-integration)
1. [Configure los parámetros de la base de datos](#configure-postgres-settings)
1. [Otorgue al Agent acceso a la base de datos](#grant-the-agent-access)
1. [Instale y configure el Agent](#install-and-configure-the-agent)
1. [Instale la integración de RDS](#install-the-rds-integration)

<div class="alert alert-info">
<a href="/database_monitoring/setup_postgres/rds/quick_install">Instalación rápida de RDS</a> es nuestro método de instalación recomendado para entornos más pequeños (por ejemplo, 20 hosts de base de datos) o para aquellos que son nuevos en DBM y desean probarlo rápidamente. Para aquellos que administran grandes flotas de bases de datos donde la implementación del agente a través de la interfaz de usuario no escala tan bien, recomendamos la instalación estándar, para administrar manualmente el agente usted mismo o integrarlo con sus prácticas de automatización.
</div>

## Antes de comenzar {#before-you-begin}

Versiones de PostgreSQL compatibles
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17, 18

Versiones de Agent compatibles
: 7.36.1+

Impacto en el rendimiento
: La configuración predeterminada del Agent para Database Monitoring es conservadora, pero puede ajustar configuraciones como el intervalo de recopilación y la tasa de muestreo de consultas para que se adapten mejor a sus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agent base ([consulte los puntos de referencia][1]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al servidor al que se está haciendo un seguimiento. Para bases de datos autoalojadas, utilice `127.0.0.1` o el socket. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones como `pgbouncer`. Si el Agent se conecta a diferentes servidores mientras se ejecuta (como en el caso de conmutación por error, equilibrio de carga, etc.), el Agent calcula la diferencia en las estadísticas entre dos servidores, lo que produce métricas inexactas.

Consideraciones de seguridad de los datos
: Consulte [Información confidencial][2] para obtener información sobre qué datos recopila el Agent de sus bases de datos y cómo garantizar que estén seguros.

## Configure la integración de AWS {#configure-the-aws-integration}

Habilite {{< ui >}}Resource Collection{{< /ui >}} en la sección {{< ui >}}Resource Collection{{< /ui >}} de su [Amazon Web Services integration tile][3].

## Configure los ajustes de Postgres {#configure-postgres-settings}

Configure los siguientes [parámetros][4] en el [grupo de parámetros de base de datos][5] y luego **reinicie el servidor** para que los ajustes surtan efecto. Para obtener más información sobre estos parámetros, consulte la [documentación de Postgres][6].

**Parámetros requeridos**

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Requerido para métricas de `postgresql.queries.*`. Habilita la recopilación de métricas de consulta mediante la extensión [pg_stat_statements][6]. |
| `track_activity_query_size` | `4096` | Requerido para la recopilación de consultas más grandes. Aumenta el tamaño del texto SQL en `pg_stat_activity`. Si se deja en el valor predeterminado, las consultas de más de `1024` caracteres no se recopilarán. |

**Parámetros opcionales**

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `pg_stat_statements.track` | `ALL` | Habilita el seguimiento de sentencias dentro de procedimientos almacenados y funciones. |
| `pg_stat_statements.max` | `10000` | Aumenta la cantidad de consultas normalizadas rastreadas en `pg_stat_statements`. Recomendado para bases de datos de alto volumen que ven muchos tipos diferentes de consultas de muchos clientes diferentes. |
| `pg_stat_statements.track_utility` | `off` | Deshabilita comandos de utilidad como PREPARE y EXPLAIN. Establecer este valor en `off` significa que solo se rastrean consultas como SELECT, UPDATE y DELETE. |
| `track_io_timing` | `on` | Habilita la recopilación de tiempos de lectura y escritura de bloques para las consultas. |

### Habilitar `auto_explain` (opcional) {#enable-auto-explain-optional}

De forma predeterminada, el Agente solo recopila planes [`EXPLAIN`][15] para un muestreo de consultas en curso. Estos planes son de naturaleza más general, especialmente cuando el código de la aplicación utiliza sentencias preparadas.

Para recopilar planes `EXPLAIN ANALYZE` completos tomados de todas las consultas, debe usar [`auto_explain`][16], una extensión de primera parte incluida con PostgreSQL disponible en todos los proveedores principales. _La recopilación de registros es un requisito previo para la recopilación de `auto_explain`_, así que habilítela antes de continuar.

<div class="alert alert-danger">
<strong>Importante:</strong> <code>auto_explain</code> produce registros que pueden contener datos confidenciales de la aplicación, similares a los valores sin procesar en SQL no ofuscado. Use el <a href="/account_management/rbac/permissions/#database-monitoring"><code>dbm_parameterized_queries_read</code></a> permiso para controlar el acceso a los planes resultantes. Para restringir la visibilidad de los registros en sí—los cuales son visibles para todos los usuarios en su organización de Datadog de forma predeterminada—configure también <a href="/logs/guide/logs-rbac">RBAC para Logs</a>. Datadog recomienda usar ambos permisos para proteger la información confidencial de manera efectiva.
</div>

1. Configure los ajustes de `auto_explain`. El formato de registro _debe_ ser `json`, pero otros ajustes pueden variar dependiendo de su aplicación. Este ejemplo registra un plan `EXPLAIN ANALYZE` para todas las consultas de más de un segundo, incluyendo información de búfer pero omitiendo la temporización (lo cual puede tener un costo de procesamiento).

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `shared_preload_libraries`      | `pg_stat_statements,auto_explain` | Habilita el `EXPLAIN ANALYZE` | automático
| `auto_explain.log_format`       | `json` | Genera planes legibles por máquina |
| `auto_explain.log_min_duration` | `1000` | Registra los planes cuando las consultas superan un segundo |
| `auto_explain.log_analyze`      | `on` | Use la forma `ANALYZE` de `EXPLAIN` |
| `auto_explain.log_buffers`      | `on` | Incluir el uso de búfer en los planes |
| `auto_explain.log_timing`       | `off` | No incluir la temporización (alto costo de procesamiento) |
| `auto_explain.log_triggers`     | `on` | Incluir planes para la declaración de disparador |
| `auto_explain.log_verbose`      | `on` | Usar tipo de plan detallado |
| `auto_explain.log_nested_statements` | `on` | Incluir declaraciones anidadas |
| `auto_explain.sample_rate`      | `1` | Explicar todas las consultas durante la duración |

2. Cambie `log_line_prefix` para habilitar una correlación de eventos más rica. Para obtener más información, consulte la documentación de [grupos de parámetros de base de datos RDS][17]. `auto_explain` la ingesta requiere que esto se establezca en `%m:%r:%u@%d:[%p]:%l:%e:%s:%v:%x:%c:%q%a`.

3. Para asegurarse de que sus instancias de RDS estén enviando registros a CloudWatch y Datadog, siga las instrucciones para [Recopilación de registros de Amazon RDS][18].


## Otorgue al Agent acceso {#grant-the-agent-access}

El Datadog Agent requiere acceso de solo lectura al servidor de base de datos para recopilar estadísticas y consultas.

Ejecute los siguientes comandos SQL en el servidor de base de datos **principal** (el escritor) en el clúster si Postgres está replicado. El Agent puede recopilar telemetría de todas las bases de datos en el servidor, independientemente de a qué base de datos se conecte. Use la base de datos `postgres` predeterminada a menos que necesite que el Agent ejecute [consultas personalizadas contra datos únicos de una base de datos diferente][7].

Conéctese a la base de datos elegida como superusuario (u otro usuario con permisos suficientes). Por ejemplo, para conectarse a la base de datos `postgres` usando [psql][8]:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Cree el usuario `datadog`:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

**Nota:** La autenticación IAM también es compatible. Consulte [la guía][9] sobre cómo configurar esto para su instancia de RDS.

{{< tabs >}}
{{% tab "Postgres ≥ 15" %}}

Otorgue al usuario `datadog` permiso para las tablas relevantes:

```SQL
ALTER ROLE datadog INHERIT;
```

Cree el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
```
{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Cree el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
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

Cree funciones **en cada base de datos** para permitir que el Agent lea el contenido completo de `pg_stat_activity` y `pg_stat_statements`:

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

<div class="alert alert-info">Para la recopilación de datos o métricas personalizadas que requieran consultar tablas adicionales, es posible que deba otorgar el <code>SELECT</code> permiso sobre esas tablas al <code>datadog</code> usuario. Ejemplo: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Consulte <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">Recopilación de métricas personalizadas de PostgreSQL</a> para obtener más información. </div>

### Cree la función de plan de explicación {#create-the-explain-plan-function}

Cree la siguiente función **en cada base de datos** para permitir que el Agent recopile planes de explicación:

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

### Cree la función de estadísticas de columna {#create-the-column-statistics-function}

Cree la siguiente función **en cada base de datos** para permitir que el Agent recopile estadísticas de tablas a nivel de columna de `pg_stats`:

```SQL
CREATE OR REPLACE FUNCTION datadog.column_statistics()
RETURNS TABLE (
    schemaname name, tablename name, attname name,
    n_distinct real, avg_width integer, null_frac real,
    inherited boolean, correlation real, most_common_freqs real[]
) AS
$$ SELECT schemaname, tablename, attname, n_distinct, avg_width, null_frac,
          inherited, correlation, most_common_freqs
          FROM pg_catalog.pg_stats
          WHERE schemaname NOT IN ('pg_catalog', 'information_schema'); $$
LANGUAGE sql
SECURITY DEFINER
SET search_path = pg_catalog, pg_temp;
```

Una vez que exista la función, habilite la recopilación en la configuración de su instancia de Postgres:

```yaml
instances:
  - dbm: true
    ...
    collect_column_statistics:
      enabled: true
```

Para ver opciones de ajuste, consulte [Configuración avanzada][15].

### Almacene su contraseña de forma segura {#securely-store-your-password}
{{% dbm-secret %}}

### Verifique los permisos de la base de datos {#verify-database-permissions}

Para verificar que los permisos sean correctos, ejecute los siguientes comandos para confirmar que el usuario del Agent pueda conectarse a la base de datos y leer las tablas principales:
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

Cuando le solicite una contraseña, utilice la contraseña que ingresó al crear el usuario `datadog`.

## Instale y configure el Agent {#install-and-configure-the-agent}

Para hacer un seguimiento de los servidores RDS, instale el Datadog Agent en su infraestructura y configúrelo para conectarse a cada punto de conexión de instancia de forma remota. El Agent no necesita ejecutarse en la base de datos, solo necesita conectarse a ella. Para obtener métodos de instalación del Agent adicionales no mencionados aquí, consulte las [instrucciones de instalación del Agent][10].

{{< tabs >}}
{{% tab "Servidor" %}}
Para configurar la recopilación de métricas de Database Monitoring para un Agent que se ejecuta en un servidor, por ejemplo, cuando usted aprovisiona una instancia EC2 pequeña para que el Agent recopile datos de una base de datos RDS:

1. Edite el archivo `postgres.d/conf.yaml` para apuntar a su `host` / `port` y establezca los maestros que desea hacer un seguimiento. Consulte el [sample postgres.d/conf.yaml][1] para ver todas las opciones de configuración disponibles.

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

   Para las versiones del Agent `≤ 7.49`, agregue la siguiente configuración a la configuración de la instancia donde se especifican `host` y `port`:

   ```yaml
   ssl: allow
   ```

   Si desea autenticarse con IAM, especifique los parámetros `region` y `instance_endpoint`, y establezca `managed_authentication.enabled` en `true`.

   **Nota**: solo habilite `managed_authentication` si desea utilizar la autenticación IAM. La autenticación IAM tiene prioridad sobre el campo `password`.

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

   Para obtener información sobre cómo configurar la autenticación IAM en su instancia de RDS, consulte [Conexión con autenticación administrada][3].

2. [Reinicie el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /es/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Docker" %}}
Para configurar una integración para un Agent que se ejecuta en un contenedor Docker, como en ECS o Fargate, tiene un par de métodos disponibles, todos los cuales se tratan en detalle en la [Documentación de configuración de Docker][1].

Los ejemplos a continuación muestran cómo usar [Docker Labels][2] y [Autodiscovery Templates][3] para configurar la integración de Postgres.

**Nota**: El Agent debe tener permiso de lectura en el socket de Docker para que funcione Autodiscovery de etiquetas.

### Línea de comandos {#command-line}

Ejecute el siguiente comando desde su [línea de comandos][4] para iniciar el Agent. Reemplace los valores de marcador de posición con los de su cuenta y entorno.

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

Para Postgres 9.6, agregue la siguiente configuración a la configuración de la instancia donde se especifican el servidor y el puerto:

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

### Dockerfile {#dockerfile}

También puede especificar etiquetas en un `Dockerfile`, lo que le permite compilar e implementar un Agent personalizado sin modificar la configuración de su infraestructura:

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]","aws": {"instance_endpoint": "<AWS_INSTANCE_ENDPOINT>", "region": "<REGION>"}, "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]}]'
```

Para Postgres 9.6, agregue la siguiente configuración a la configuración de la instancia donde se especifican el servidor y el puerto:

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

Para evitar exponer la contraseña del usuario `datadog` en texto plano, utilice el [paquete de gestión de secretos][5] del Agent y declare la contraseña utilizando la sintaxis `ENC[]`. Alternativamente, consulte la [documentación de variables de plantilla de Autodiscovery][6] para proporcionar la contraseña como una variable de entorno.

[1]: /es/containers/docker/integrations/?tab=labels#configuration
[2]: https://docs.docker.com/engine/manage-resources/labels/
[3]: /es/getting_started/containers/autodiscovery/
[4]: /es/containers/docker/integrations/?tab=labels#using-docker-run-nerdctl-run-or-podman-run
[5]: /es/agent/configuration/secrets-management
[6]: /es/agent/faq/template_variables/
{{% /tab %}}

{{% tab "Kubernetes" %}}
Si está ejecutando un clúster de Kubernetes, utilice el [Datadog Cluster Agent][1] para habilitar Database Monitoring.

**Nota**: Asegúrese de que las [verificaciones de clúster][2] estén habilitadas para su Datadog Cluster Agent antes de continuar.

A continuación se presentan instrucciones por pasos para configurar la integración de Postgres utilizando diferentes métodos de implementación del Datadog Cluster Agent.

### Datadog Operator {#operator}

Utilizando las [instrucciones de Datadog Operator en Kubernetes e Integrations][3] como referencia, siga los pasos a continuación para configurar la integración de Postgres:

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

Utilizando las [instrucciones de Helm en Kubernetes e Integrations][4] como referencia, siga los pasos a continuación para configurar la integración de Postgres:

1. Actualice su archivo `datadog-values.yaml` (utilizado en las instrucciones de instalación del Cluster Agent) con la siguiente configuración:

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

2. Implemente el Agent con el archivo de configuración anterior utilizando el siguiente comando:

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Para Windows, añada <code>--set targetSystem=windows</code> al <code>helm install</code> comando.
</div>

### Configure con archivos montados {#configure-with-mounted-files}

Para configurar una verificación de clúster con un archivo de configuración montado, monte el archivo de configuración en el contenedor del Cluster Agent en la ruta: `/conf.d/postgres.yaml`:

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

### Configure con anotaciones de servicio de Kubernetes {#configure-with-kubernetes-service-annotations}

En lugar de montar un archivo, puede declarar la configuración de la instancia como un servicio de Kubernetes. Para configurar esta verificación para un Agent que se ejecuta en Kubernetes, cree un servicio utilizando la siguiente sintaxis:

#### Anotaciones de Autodiscovery v2 {#autodiscovery-annotations-v2}

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

Para obtener más información, consulte [Anotaciones de Autodiscovery][5].

Si utiliza Postgres 9.6, añada lo siguiente a la configuración de la instancia:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar la verificación de Postgres.

Para evitar exponer la contraseña del usuario `datadog` en texto plano, utilice el [paquete de gestión de secretos][6] del Agent y declare la contraseña utilizando la sintaxis `ENC[]`.

[1]: /es/containers/cluster_agent/setup/
[2]: /es/containers/cluster_agent/clusterchecks/
[3]: /es/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /es/containers/kubernetes/integrations/?tab=helm
[5]: /es/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /es/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### Verifique la configuración del Agent {#verify-agent-setup}

[Ejecute el subcomando de estado del Agent][11] y busque `postgres` en la sección de verificaciones. O visite la página de [Databases][12] para comenzar.

## Ejemplos de configuraciones de Agent {#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## Instale la integración de RDS {#install-the-rds-integration}

Para ver las métricas de infraestructura de AWS, como la CPU, junto con la telemetría de la base de datos en DBM, instale la [integración de RDS][13] (opcional).

## Solución de problemas {#troubleshooting}

Si ha instalado y configurado las integraciones y el Agent como se describe y no funciona como se espera, consulte [Troubleshooting][14].

## Lecturas adicionales {#further-reading}

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
[15]: /es/database_monitoring/setup_postgres/advanced_configuration/#configuring-column-statistics-collection
[15]: https://www.postgresql.org/docs/current/sql-explain.html
[16]: https://www.postgresql.org/docs/current/auto-explain.html
[17]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.PostgreSQL.overview.parameter-groups.html
[18]: /es/integrations/amazon-rds/?tab=standard#log-collection