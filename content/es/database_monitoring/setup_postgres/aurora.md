---
description: Instale y configure Database Monitoring para Postgres en Amazon Aurora.
further_reading:
- link: /integrations/postgres/
  tag: Documentación
  text: Integración básica de Postgres
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentación
  text: Capturando valores de parámetros de consultas SQL
title: Configurando Database Monitoring para Postgres administrado por Aurora
---
Database Monitoring proporciona una visibilidad profunda de sus bases de datos Postgres al exponer métricas de consultas, muestras de consultas, planes de explicación, estados de bases de datos, conmutaciones por error y eventos.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como un usuario de solo lectura. Realice la siguiente configuración para habilitar Database Monitoring con su base de datos Postgres:

1. [Configure los parámetros de la base de datos](#configure-postgres-settings)
1. [Otorgue al Agent acceso a la base de datos](#grant-the-agent-access)
1. [Instale y configure el Agent](#install-and-configure-the-agent)
1. [Instale la integración de RDS](#install-the-rds-integration)

## Antes de comenzar {#before-you-begin}

Versiones de PostgreSQL soportadas
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17

Versiones de Agent soportadas
: 7.36.1+

Impacto en el rendimiento
: La configuración predeterminada del Agent para Database Monitoring es conservadora, pero puede ajustar configuraciones como el intervalo de recolección y la tasa de muestreo de consultas para adaptarse mejor a sus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agent base ([ver benchmarks][1]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al servidor que se está monitoreando. Para bases de datos autoalojadas, use `127.0.0.1` o el socket. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga, agrupador de conexiones como `pgbouncer`, o el **punto de conexión del clúster de Aurora**. Si se conecta al punto de conexión del clúster, el Agent recopila datos de una réplica aleatoria y solo proporciona visibilidad en esa réplica. Si el Agent se conecta a diferentes hosts mientras está en funcionamiento (como en el caso de conmutación por error, balanceo de carga, etc.), el Agent calcula la diferencia en estadísticas entre dos hosts, produciendo métricas inexactas.

Consideraciones de seguridad de datos
: Consulte [Información sensible][2] para obtener información sobre qué datos recopila el Agent de sus bases de datos y cómo asegurarse de que estén seguros.

## Configure los ajustes de Postgres {#configure-postgres-settings}

Configure los siguientes [parámetros][3] en el [grupo de parámetros de DB][4] y luego **reinicie el servidor** para que la configuración surta efecto. Para obtener más información sobre estos parámetros, consulte la [documentación de Postgres][5].

**Parámetros requeridos**

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Requerido para `postgresql.queries.*` métricas. Habilita la recopilación de métricas de consulta utilizando la extensión [pg_stat_statements][5]. Activado por defecto en Aurora. |
| `track_activity_query_size` | `4096` | Requerido para la recolección de consultas más grandes. Aumenta el tamaño del texto SQL en `pg_stat_activity`. Si se deja en el valor predeterminado, las consultas más largas que `1024` caracteres no serán recolectadas. |

**Parámetros opcionales**

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `pg_stat_statements.track` | `ALL` | Habilita el seguimiento de declaraciones dentro de procedimientos almacenados y funciones. |
| `pg_stat_statements.max` | `10000` | Aumenta el número de consultas normalizadas rastreadas en `pg_stat_statements`. Recomendado para bases de datos de alto volumen que reciben muchos tipos diferentes de consultas de muchos clientes diferentes. |
| `pg_stat_statements.track_utility` | `off` | Desactiva comandos de utilidad como PREPARE y EXPLAIN. Establecer este valor en `off` significa que solo se rastrean consultas como SELECT, UPDATE y DELETE. |
| `track_io_timing` | `on` | Habilita la recolección de tiempos de lectura y escritura de bloques para consultas. |


## Otorgue al Agent acceso {#grant-the-agent-access}

El Datadog Agent requiere acceso de solo lectura al servidor de base de datos para recolectar estadísticas y consultas.

Ejecuta los siguientes comandos SQL en el servidor de base de datos **primario** (el escritor) en el clúster si Postgres está replicado. El Agent puede recopilar telemetría de todas las bases de datos en el servidor, independientemente de a qué base de datos se conecte. Utilice la base de datos `postgres` por defecto, a menos que necesite que el Agent ejecute [consultas personalizadas contra datos únicos de otra base de datos][6].

Conéctese a la base de datos elegida como superusuario (o otro usuario con permisos suficientes). Por ejemplo, para conectarse a la base de datos `postgres` usando [psql][7]:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Cree el usuario `datadog`:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

**Nota:** La autenticación IAM también es compatible. Consulte [la guía][14] sobre cómo configurar esto para su instancia de Aurora.

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

Cree el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
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

<div class="alert alert-info">Para la recopilación de datos o métricas personalizadas que requieran consultar tablas adicionales, es posible que deba otorgar la <code>SELECT</code> permiso en esas tablas para el <code>datadog</code> usuario. Ejemplo: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Consulte <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">la recopilación de métricas personalizadas de PostgreSQL</a> para más información. </div>

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

### Almacene su contraseña de forma segura {#securely-store-your-password}
{{% dbm-secret %}}

### Verifique los permisos de la base de datos {#verify-database-permissions}

Para verificar que los permisos son correctos, ejecute los siguientes comandos para confirmar que el usuario del Agent puede conectarse a la base de datos y leer las tablas principales:

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

Cuando se le pida una contraseña, use la contraseña que ingresó al crear el usuario `datadog`.

## Instale y configure el Agent {#install-and-configure-the-agent}

Para monitorear hosts de Aurora, instale el Datadog Agent en su infraestructura y configúrelo para conectarse a cada punto de conexión de instancia de forma remota. El Agent no necesita ejecutarse en la base de datos, solo necesita conectarse a ella. Para métodos adicionales de instalación del Agent no mencionados aquí, consulte las [instrucciones de instalación del Agent][8].

### Autodiscovery setup (recommended) {#autodiscovery-setup-recommended}

El Datadog Agent admite Autodiscovery para todos los puntos de conexión de Aurora dentro de un clúster.

Si requiere configuraciones diferentes para instancias específicas, o prefiere especificar manualmente los puntos de conexión de Aurora, siga la sección de configuración manual a continuación.
De lo contrario, Datadog recomienda usar las [instrucciones de configuración de Autodiscovery para clústeres de DB de Aurora][9].

{{< tabs >}}
{{% tab "Host" %}}

Para configurar la recolección de métricas de Database Monitoring para un Agent que se ejecuta en un host, por ejemplo, cuando provisiona una pequeña instancia de EC2 para que el Agent recolecte de una base de datos de Aurora:

1. Edite el archivo `postgres.d/conf.yaml` para apuntar a su `host` / `port` y establecer los maestros a monitorear. Consulte el [ejemplo postgres.d/conf.yaml][1] para todas las opciones de configuración disponibles.

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

       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

<div class="alert alert-danger">Utilice el punto de conexión de la instancia de Aurora aquí, no el punto de conexión del clúster.</div>

2. [Reiniciar el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Docker" %}}
Para configurar una integración para un Agent que se ejecuta en un contenedor Docker, como en ECS o Fargate, tienes un par de métodos disponibles, todos los cuales se cubren en detalle en la [Documentación de Configuración de Docker][1].

Los ejemplos a continuación muestran cómo usar [Etiquetas de Docker][2] y [Plantillas de Autodescubrimiento][3] para configurar la integración de Postgres.

**Nota**: El Agent debe tener permiso de lectura en el socket de Docker para que Autodiscovery de etiquetas funcione.

### Línea de comandos {#command-line}

Ejecuta el siguiente comando desde tu [línea de comandos][4] para iniciar el Agent. Reemplaza los valores de marcador de posición con los de tu cuenta y entorno.

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

Para Postgres 9.6, agrega la siguiente configuración a la configuración de la instancia donde se especifican el host y el puerto:

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

### Dockerfile {#dockerfile}

También puedes especificar etiquetas en un `Dockerfile`, lo que te permite construir y desplegar un Agente personalizado sin modificar la configuración de tu infraestructura:

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]","aws": {"instance_endpoint": "<AWS_INSTANCE_ENDPOINT>", "region": "<REGION>"}, "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]}]'
```

Para Postgres 9.6, agrega la siguiente configuración a la configuración de la instancia donde se especifican el host y el puerto:

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

Para evitar exponer la contraseña del `datadog` usuario en texto plano, utiliza el [paquete de gestión de secretos][5] del Agente y declara la contraseña utilizando la sintaxis `ENC[]`. Alternativamente, consulta la [documentación de variables de plantilla de Autodiscovery][6] para proporcionar la contraseña como una variable de entorno.

[1]: /es/containers/docker/integrations/?tab=labels#configuration
[2]: https://docs.docker.com/engine/manage-resources/labels/
[3]: /es/getting_started/containers/autodiscovery/
[4]: /es/containers/docker/integrations/?tab=labels#using-docker-run-nerdctl-run-or-podman-run
[5]: /es/agent/configuration/secrets-management
[6]: /es/agent/faq/template_variables/
{{% /tab %}}

{{% tab "Kubernetes" %}}
Si estás ejecutando un clúster de Kubernetes, utiliza el [Datadog Cluster Agent][1] para habilitar Database Monitoring.

**Nota**: Asegúrate de que las [verificaciones de clúster][2] estén habilitadas para tu Datadog Cluster Agent antes de continuar.

A continuación se presentan instrucciones paso a paso para configurar la integración de Postgres utilizando diferentes métodos de despliegue del Datadog Cluster Agent.

### Datadog Operator {#operator}

Usando las [instrucciones del Datadog Operator en Kubernetes e Integrations][3] como referencia, sigue los pasos a continuación para configurar la integración de Postgres:

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

2. Aplica los cambios al Datadog Operator usando el siguiente comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

Usando las [instrucciones de Helm en Kubernetes e Integraciones][4] como referencia, sigue los pasos a continuación para configurar la integración de Postgres:

1. Actualiza tu archivo `datadog-values.yaml` (utilizado en las instrucciones de instalación del Datadog Cluster Agent) con la siguiente configuración:

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

2. Despliega el Agent con el archivo de configuración anterior usando el siguiente comando:

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Para Windows, agrega <code>--set targetSystem=windows</code> al <code>helm install</code> comando.
</div>

### Configura con archivos montados {#configure-with-mounted-files}

Para configurar una verificación de clúster con un archivo de configuración montado, monta el archivo de configuración en el contenedor del Datadog Cluster Agent en la ruta: `/conf.d/postgres.yaml`:

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

```

### Configura con anotaciones de servicio de Kubernetes {#configure-with-kubernetes-service-annotations}

En lugar de montar un archivo, puedes declarar la configuración de la instancia como un servicio de Kubernetes. Para configurar esta verificación para un Agente que se ejecuta en Kubernetes, crea un servicio usando la siguiente sintaxis:

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

Para más información, consulta [Anotaciones de Autodiscovery][5].

Si estás usando Postgres 9.6, agrega lo siguiente a la configuración de la instancia:

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

El Datadog Cluster Agent registra automáticamente esta configuración y comienza a ejecutar la verificación de Postgres.

Para evitar exponer la contraseña del `datadog` usuario en texto plano, utiliza el [paquete de gestión de secretos del Agente][6] y declara la contraseña utilizando la sintaxis `ENC[]`.

[1]: /es/containers/cluster_agent/setup/
[2]: /es/containers/cluster_agent/clusterchecks/
[3]: /es/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /es/containers/kubernetes/integrations/?tab=helm
[5]: /es/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /es/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### Verificar la configuración del Agente {#verify-agent-setup}

[Ejecuta el subcomando de estado del Agente][10] y busca `postgres` en la sección de Verificaciones. ¡O visita la página de [Bases de datos][11] para comenzar!

## Ejemplos de configuraciones del Agente {#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## Instalar la Integración RDS {#install-the-rds-integration}

Para ver métricas de infraestructura de AWS, como CPU, junto con la telemetría de la base de datos directamente en DBM, instala la [integración RDS][12] (opcional).

## Solución de problemas {#troubleshooting}

Si has instalado y configurado las integraciones y el Agente como se describe y no está funcionando como se esperaba, consulta [Solución de problemas][13].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /es/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /es/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: /es/database_monitoring/guide/aurora_autodiscovery/?tab=postgres
[10]: /es/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
[12]: /es/integrations/amazon_rds
[13]: /es/database_monitoring/troubleshooting/?tab=postgres
[14]: /es/database_monitoring/guide/managed_authentication