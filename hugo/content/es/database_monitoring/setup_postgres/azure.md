---
description: Instala y configura Database Monitoring para PostgreSQL gestionado en
  Azure.
further_reading:
- link: /integrations/postgres/
  tag: Documentación
  text: Integración Postgres básica
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentación
  text: Captura de valores de parámetros de consulta SQL
title: Configuración de Database Monitoring para bases de datos Azure para PostgreSQL
---

Database Monitoring te proporciona una amplia visibilidad de tus bases de datos Postgres mediante la exposición de métricas de consultas, muestras de consultas, explain-plans, estados de bases de datos, conmutaciones por error y eventos.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como usuario de sólo lectura. Realiza la siguiente configuración para habilitar Database Monitoring con tu base de datos Postgres:

1. [Configura parámetros de bases de datos](#configure-postgres-settings).
1. [Concede al Agent acceso a la base de datos](#grant-the-agent-access).
1. [Instala y configura el Agent](#install-and-configure-the-agent).
1. [Instala la integración Azure PostgreSQL](#install-the-azure-postgresql-integration).

## Antes de empezar

Versiones de PostgreSQL compatibles
: 9.6, 10, 11, 12, 13, 14, 15, 16

Tipos de despliegues de Azure PostgreSQL compatibles
: PostgreSQL en máquinas virtuales Azure, servidor único, servidor flexible

Versiones del Agent compatibles
: 7.36.1 o posteriores

Impacto en el rendimiento
: El valor predeterminado de configuración del Agent para la monitorización de bases de datos es conservador, pero puedes ajustar parámetros como el intervalo de recopilación y la frecuencia de muestreo de consultas para que se adapten mejor a tus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
La monitorización de bases de datos se ejecuta como integración junto con el Agent de base ([consulta los valores de referencia][1]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al host que se está monitorizando. Para las bases de datos autoalojadas, se prefiere `127.0.0.1` o el socket. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones como `pgbouncer`. Si el Agent se conecta a diferentes hosts mientras se ejecuta (como en el caso de la conmutación por error, el balanceo de carga, etc.), el Agent calcula la diferencia en las estadísticas entre dos hosts, lo que produce inexactitudes en las métricas.

Consideraciones sobre la seguridad de los datos
: Para saber qué datos recopila el Agent de tus bases de datos y cómo garantizar su seguridad, consulta [Información confidencial][2].

## Configuración de parámetros de Postgres

Configura los siguientes [parámetros][3] en los [parámetros del servidor][4] y, a continuación, **reinicia el servidor** para que los ajustes surtan efecto.

{{< tabs >}}
{{% tab "Servidor único" %}}

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `track_activity_query_size` | `4096` | Necesario para recopilar consultas de mayor tamaño. Aumenta el tamaño del texto SQL en `pg_stat_activity`. Si se deja con el valor predeterminado, las consultas de más de `1024` caracteres no se recopilan. |
| `pg_stat_statements.track` | `ALL` | Opcional. Habilita el seguimiento de sentencias dentro de procedimientos almacenados y funciones. |
| `pg_stat_statements.max` | `10000` | Opcional. Aumenta el número de consultas normalizadas rastreadas en `pg_stat_statements`. Este parámetro se recomienda para bases de datos de gran volumen que reciben muchos tipos diferentes de consultas de muchos clientes distintos. |
| `pg_stat_statements.track_utility` | `off` | Opcional. Deshabilita comandos de utilidad como PREPARE y EXPLAIN. Configurar este valor en `off` significa que sólo se rastrearán consultas como SELECT, UPDATE y DELETE. |
| `track_io_timing` | `on` | Opcional. Habilita la recopilación de los tiempos de lectura y escritura de bloques para las consultas. |

{{% /tab %}}
{{% tab "Servidor flexible" %}}

| Parámetro            | Valor | Descripción |
|----------------------| -- | --- |
| `azure.extensions` | `pg_stat_statements` | Necesario para métricas `postgresql.queries.*`. Habilita la recopilación de métricas de consultas utilizando la extensión [pg_stat_statements][1]. |
| `track_activity_query_size` | `4096` | Necesario para recopilar consultas de mayor tamaño. Aumenta el tamaño del texto SQL en `pg_stat_activity`. Si se deja con el valor predeterminado, las consultas de más de `1024` caracteres no se recopilan. |
| `pg_stat_statements.track` | `ALL` | Opcional. Habilita el seguimiento de sentencias dentro de procedimientos almacenados y funciones. |
| `pg_stat_statements.max` | `10000` | Opcional. Aumenta el número de consultas normalizadas rastreadas en `pg_stat_statements`. Este parámetro se recomienda para bases de datos de gran volumen que reciben muchos tipos diferentes de consultas de muchos clientes distintos. |
| `pg_stat_statements.track_utility` | `off` | Opcional. Deshabilita comandos de utilidad como PREPARE y EXPLAIN. Configurar este valor en `off` significa que sólo se rastrearán consultas como SELECT, UPDATE y DELETE. |
| `track_io_timing` | `on` | Opcional. Habilita la recopilación de los tiempos de lectura y escritura de bloques para las consultas. |

[1]: https://www.postgresql.org/docs/current/pgstatstatements.html
{{% /tab %}}
{{< /tabs >}}

## Conceder acceso al Agent

El Datadog Agent requiere acceso de sólo lectura al servidor de la base de datos para recopilar estadísticas y consultas.

Los siguientes comandos SQL deben ejecutarse en el servidor de base de datos **primario** (el escritor) en el clúster, si Postgres está replicado. Elige una base de datos PostgreSQL en el servidor de base de datos para que el Agent se conecte a ella. El Agent puede recopilar telemetría de todas las bases de datos del servidor de bases de datos independientemente de a cuál se conecte, por lo que una buena opción es utilizar la base de datos predeterminada `postgres`. Elige una base de datos diferente sólo si necesitas que el Agent ejecute [consultas personalizadas con datos exclusivos de esa base de datos][5].

Conéctate a la base de datos elegida como superusuario (u otro usuario con permisos suficientes). Por ejemplo, si la base de datos elegida es `postgres`, conéctate como el usuario `postgres` a través de [psql][6] ejecutando:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Crea el usuario `datadog`:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

**Nota:** También se admite la autenticación de identidad gestionada por Microsoft Entra ID. Para saber cómo configurarla en tu instancia de Azure, consulta [la guía][13].


{{< tabs >}}
{{% tab "Postgres v16 o posterior" %}}

Crea el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_read_all_settings TO datadog;
GRANT pg_read_all_stats TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres v15" %}}

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
```

{{% /tab %}}
{{% tab "Postgres v9.6" %}}

Crea el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
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

Crea la función **en cada base de datos** para permitir al Agent recopilar planes de explicación.

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

### Guarda tu contraseña de forma segura
{{% dbm-secret %}}

### Verificación

Para verificar que los permisos son correctos, ejecuta los siguientes comandos para confirmar que el usuario del Agent puede conectarse a la base de datos y leer las tablas principales:
{{< tabs >}}
{{% tab "Postgres v10 o posterior" %}}

```shell
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```
{{% /tab %}}
{{% tab "Postgres v9.6" %}}

```shell
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

Cuando se te pida una contraseña, utiliza la que introdujiste al crear el usuario `datadog`.

## Instala y configura el Agent

Para monitorizar bases de datos Postgres de Azure, instala el Datadog Agent en tu infraestructura y configúralo para conectarse a cada endpoint de instancia de forma remota. El Agent no necesita ejecutarse en la base de datos, sólo necesita conectarse a ella. Para conocer otros métodos de instalación del Agent no mencionados aquí, consulta las [instrucciones de instalación del Agent][8].

{{< tabs >}}
{{% tab "Host" %}}
Para configurar la recopilación de métricas de monitorización de Database Monitoring para un Agent que se ejecuta en un host, por ejemplo cuando se aprovisiona una pequeña máquina virtual para que el Agent recopile de una base de datos Azure:

1. Edita el archivo `postgres.d/conf.yaml` para que apunte a tu `host` / `port` y configura los principales para la monitorización. Para conocer todas las opciones de configuración disponibles, consulta la [muestra postgres.d/conf.yaml][1].
   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AZURE_INSTANCE_ENDPOINT>'
       port: 5432
       username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
       password: 'ENC[datadog_user_database_password]'
       ssl: 'require'

       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'

       # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
       azure:
        deployment_type: '<DEPLOYMENT_TYPE>'
        fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
   ```
2. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Docker" %}}
Para configurar el Agent de Database Monitoring que se ejecuta en un contenedor de Docker, puedes establecer las [plantillas de integración de Autodiscovery][1] como etiquetas (label) de Docker en tu contenedor del Agent.

**Nota**: El Agent debe tener permiso de lectura en el socket Docker para que las etiquetas (labels) de Autodiscovery funcionen.

### Línea de comandos

Ejecuta el siguiente comando para ejecutar el Agent desde tu línea de comandos. Sustituye los valores para que coincidan con tu cuenta y tu entorno:

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["postgres"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AZURE_INSTANCE_ENDPOINT>",
    "port": 5432,
    "username": "datadog@<AZURE_INSTANCE_ENDPOINT>",
    "password": "<UNIQUEPASSWORD>",
    "ssl": "require",
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "name": "<AZURE_INSTANCE_ENDPOINT>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

Para Postgres v9.6, añade los siguientes parámetros a la configuración de la instancia donde se especifican el host y el puerto:

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

### Dockerfile

Las etiquetas también pueden especificarse en un `Dockerfile`, por lo que puedes crear y desplegar un Agent personalizado sin cambiar la configuración de tu infraestructura:

```Dockerfile
FROM datadog/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AZURE_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog@<AZURE_INSTANCE_ENDPOINT>","password": "ENC[datadog_user_database_password]", "ssl": "require", "azure": {"deployment_type": "<DEPLOYMENT_TYPE>", "name": "<AZURE_INSTANCE_ENDPOINT>"}}]'
```

Para Postgres v9.6, añade los siguientes parámetros a la configuración de la instancia donde se especifican el host y el puerto:

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

[1]: /es/agent/docker/integrations/?tab=docker
{{% /tab %}}

{{% tab "Kubernetes" %}}
Si está ejecutando un clúster Kubernetes, utilice el [Datadog Clúster Agent][1] para activar Database Monitoring.

**Nota**: Asegúrate de que los [checks del clúster][2] estén activados para tu Datadog Cluster Agent antes de continuar.

A continuación encontrarás instrucciones paso a paso para configurar la integración de Postgres mediante diferentes métodos de despliegue del Datadog Cluster Agent.

### Operador

Tomando como referencia las [Instrucciones para operadores en Kubernetes e integraciones][3], sigue los steps (UI) / pasos (generic) que se indican a continuación para configurar la integración de Postgres:

1. Crea o actualiza el archivo `Datadog-Agent.yaml` con la siguiente configuración:

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
                  - host: <AZURE_INSTANCE_ENDPOINT>
                    port: 5432
                    username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
                    password: 'ENC[datadog_user_database_password]'
                    ssl: 'require'
                    dbm: true
                    azure:
                      deployment_type: '<DEPLOYMENT_TYPE>'
                      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
                    tags:
                      - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

    ```

    **Nota**: Para Postgres 9.6, añada las siguientes líneas a la configuración de la instancia donde se especifican el host y el puerto:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Aplica los cambios al Datadog Operator con el siguiente comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm

Tomando como referencia las [instrucciones de Helm en Kubernetes e integraciones][4], sigue los steps (UI) / pasos (generic) que se indican a continuación para configurar la integración de Postgres:

1. Actualiza tu archivo `Datadog-values.yaml` (utilizado en las instrucciones de instalación del Cluster Agent) con la siguiente configuración:

    ```yaml
    clusterAgent:
      confd:
        postgres.yaml: |-
          cluster_check: true
          init_config:
          instances:
            - dbm: true
              host: <AZURE_INSTANCE_ENDPOINT>
              port: 5432
              username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
              password: 'ENC[datadog_user_database_password]'
              ssl: 'require'
              azure:
                deployment_type: '<DEPLOYMENT_TYPE>'
                fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'

    clusterChecksRunner:
      enabled: true
    ```

   Para Postgres v9.6, añade los siguientes parámetros a la configuración de la instancia donde se especifican el host y el puerto:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Despliega el Agent con el archivo de configuración anterior con el siguiente comando:

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Para Windows, adjunta <code>--set targetSystem=windows</code> al comando de <code>instalación de Helm</code>.
</div>

### Configuración con archivos integrados

Para configurar un check de clúster con un archivo de configuración montado, monta el archivo de configuración en el contenedor del Cluster Agent en la ruta: `/conf.d/postgres.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AZURE_INSTANCE_ENDPOINT>'
    port: 5432
    username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
    password: 'ENC[datadog_user_database_password]'
    ssl: "require"
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
```

### Configuración con anotaciones de servicios de Kubernetes

En lugar de montar un archivo, puedes declarar la configuración de la instancia como servicio Kubernetes. Para configurar este check para un Agent que se ejecuta en Kubernetes, crea un servicio con la siguiente sintaxis:

#### Autodiscovery Annotations v2

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["postgres"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<AZURE_INSTANCE_ENDPOINT>",
          "port": 5432,
          "username": "datadog@<AZURE_INSTANCE_ENDPOINT>",
          "password": "ENC[datadog_user_database_password]",
          "ssl": "require",
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "fully_qualified_domain_name": "<AZURE_INSTANCE_ENDPOINT>"
          }
        }
      ]
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```

Para Postgres v9.6, añade los siguientes parámetros a la configuración de la instancia donde se especifican el host y el puerto:

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

Para obtener más información, consulta [Autodiscovery Annotations][5].

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar el check de Postgres.

Para evitar exponer la contraseña del usuario de `datadog` en texto plano, utilice el [paquete de gestión de secretos][6] de Agent y declare la contraseña utilizando la sintaxis de `ENC[]`.

[1]: /es/containers/cluster_agent/setup/
[2]: /es/containers/cluster_agent/clusterchecks/
[3]: /es/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /es/containers/kubernetes/integrations/?tab=helm
[5]: /es/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /es/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

Para obtener información adicional sobre la configuración de los campos `deployment_type` y `name`, consulta las [especificaciones para la integración de Postgres][7].

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `postgres` en la sección Checks o visita la página [Bases de datos][10] para empezar.
## Configuraciones del Agent de ejemplo
{{% dbm-postgres-agent-config-examples %}}
## Instalación de la integración Azure PostgreSQL

Para recopilar métricas de bases de datos más completas desde Azure, instala la [integración de Azure PostgreSQL][11] (opcional).

## Problemas conocidos

Para las bases de datos Postgres v16, los siguientes mensajes de error se escriben en el archivo de logs:

```
psycopg2.errors.InsufficientPrivilege: permission denied for function pg_ls_waldir
2024-03-05 12:36:16 CET | CORE | ERROR | (pkg/collector/python/datadog_agent.go:129 in LogMessage) | - | (core.py:94) | Error querying wal_metrics: permission denied for function pg_ls_waldir
2024-03-05 12:36:30 CET | CORE | ERROR | (pkg/collector/python/datadog_agent.go:129 in LogMessage) | postgres:cc861f821fbbc2ae | (postgres.py:239) | Unhandled exception while using database connection postgres
Traceback (most recent call last):
  File "/opt/datadog-agent/embedded/lib/python3.11/site-packages/datadog_checks/postgres/postgres.py", line 224, in db
    yield self._db
  File "/opt/datadog-agent/embedded/lib/python3.11/site-packages/datadog_checks/postgres/postgres.py", line 207, in execute_query_raw
    cursor.execute(query)
psycopg2.errors.InsufficientPrivilege: permission denied for function pg_ls_waldir
```

En consecuencia, el Agent no recopila las siguientes métricas para Postgres v16: `postgresql.wal_count`, `postgresql.wal_size` y `postgresql.wal_age`.

## Solucionar problemas

Si has instalado y configurado las integraciones y el Agent como se describe y no funciona como se esperaba, consulta [Solucionar problemas][12].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /es/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal
[5]: /es/integrations/faq/postgres-custom-metric-collection-explained/
[6]: https://www.postgresql.org/docs/current/app-psql.html
[7]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L664-L711
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: /es/agent/configuration/agent-commands/#agent-status-and-information
[10]: https://app.datadoghq.com/databases
[11]: /es/integrations/azure_db_for_postgresql/
[12]: /es/database_monitoring/setup_postgres/troubleshooting/
[13]: /es/database_monitoring/guide/managed_authentication