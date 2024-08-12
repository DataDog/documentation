---
description: Instala y configura Database Monitoring para Postgres en Amazon Aurora.
further_reading:
- link: /integrations/postgres/
  tag: Documentación
  text: Integración Postgres básica
title: Configuración de Database Monitoring para Postgres gestionado por Aurora
---

Database Monitoring te proporciona una amplia visibilidad de tus bases de datos Postgres mediante la exposición de métricas de consultas, muestras de consultas, explain-plans, estados de bases de datos, conmutaciones por error y eventos.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como usuario de sólo lectura. Realiza la siguiente configuración para habilitar Database Monitoring con tu base de datos Postgres:

1. [Configurar parámetros de bases de datos](#configure-postgres-settings)
1. [Conceder al Agent acceso a la base de datos](#grant-the-agent-access)
1. [Instalar y configurar el Agent](#install-and-configure-the-agent)
1. [Instalar la integración RDS](#install-the-rds-integration)

## Antes de empezar

Versiones de PostgreSQL compatibles
: 9.6, 10, 11, 12, 13, 14, 15, 16

Versiones del Agent compatibles
: 7.36.1 o posterior

Impacto del rendimiento
: La configuración de Database Monitoring predeterminada del Agent es conservadora, pero puedes ajustar algunos parámetros como el intervalo de recopilación y la frecuencia de muestreo de consultas según tus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de la consulta en la base de datos y menos del uno por ciento del uso de CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agent de base ([consulta las referencias][1]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al host que se está monitorizando. Para las bases de datos autoalojadas, se prefiere `127.0.0.1` o el socket. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones como `pgbouncer` o del **endpoint del clúster de Aurora**. Si el Agent se conecta al endpoint del clúster, recopila datos de una réplica aleatoria y sólo proporciona una visibilidad de esa réplica. Si el Agent se conecta a diferentes hosts mientras se ejecuta (como en el caso de la conmutación por error, el balanceo de carga, etc.), calcula la diferencia en las estadísticas entre dos hosts, lo que produce inexactitudes en las métricas.

Consideraciones sobre la seguridad de los datos
: Para saber qué datos recopila el Agent de tus bases de datos y cómo garantizar tu seguridad, consulta [Información confidencial][2].

## Configuración de parámetros de Postgres

Configura los siguientes [parámetros][3] en el [grupo de parámetros de bases de datos][4] y luego **reinicia el servidor** para que la configuración surta efecto. Para obtener más información sobre estos parámetros, consulta la [documentación de Postgres][5].

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Necesario para métricas `postgresql.queries.*`. Habilita la recopilación de métricas de consultas utilizando la extensión [pg_stat_statements][5] Esto sólo es así por defecto en Aurora.. |
| `track_activity_query_size` | `4096` | Necesario para recopilar consultas de mayor tamaño. Aumenta el tamaño del texto SQL en `pg_stat_activity`. Si se deja con el valor predeterminado, las consultas de más de `1024` caracteres no se recopilan. |
| `pg_stat_statements.track` | `ALL` | Opcional. Habilita el seguimiento de sentencias dentro de procedimientos almacenados y funciones. |
| `pg_stat_statements.max` | `10000` | Opcional. Aumenta el número de consultas normalizadas rastreadas en `pg_stat_statements`. Este parámetro se recomienda para bases de datos de gran volumen que reciben muchos tipos diferentes de consultas de muchos clientes distintos. |
| `pg_stat_statements.track_utility` | `off` | Opcional. Deshabilita comandos de utilidad como PREPARE y EXPLAIN. Configurar este valor en `off` significa que sólo se rastrean consultas como SELECT, UPDATE y DELETE. |
| `track_io_timing` | `on` | Opcional. Habilita la recopilación de los tiempos de lectura y escritura de bloques para las consultas. |


## Concesión de acceso al Agent 

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

**Nota:** La autenticación IAM también es compatible. Para saber cómo configurar esto para tu instancia de Aurora, consulta [la guía][13].

{{< tabs >}}
{{% tab "Postgres v10 o anterior" %}}

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

### Verificación

Para verificar que los permisos son correctos, ejecuta los siguientes comandos para confirmar que el usuario del Agent puede conectarse a la base de datos y leer las tablas principales:

{{< tabs >}}
{{% tab "Postgres v10 o anterior" %}}

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

## Instalación y configuración del Agent

Para monitorizar hosts de Aurora, instala el Datadog Agent en tu infraestructura y configúralo para conectarse a cada endpoint de instancia de forma remota. El Agent no necesita ejecutarse en la base de datos, sólo necesita conectarse a ella. Para conocer otros métodos de instalación del Agent no mencionados aquí, consulta las [instrucciones de instalación del Agent][8].

{{< tabs >}}
{{% tab "Host" %}}

### Configuración de Autodiscovery (recomendada)

El Datadog Agent admite la detección automática de todos los endpoints de Aurora en un clúster. A menos que quieras diferentes configuraciones para diferentes instancias o que quieras encontrar y listar los endpoints de Aurora manualmente, consulta las [instrucciones de configuración de Autodiscovery para clústeres de bases de datos de Aurora][3], en lugar de la sección de configuración manual que se muestra a continuación.

### Configuración manual

Para configurar la recopilación de métricas de Database Monitoring para un Agent que se ejecuta en un host, por ejemplo cuando se aprovisiona una pequeña instancia de EC2 para que el Agent recopile de una base de datos Aurora:

1. Edita el archivo `postgres.d/conf.yaml` para que apunte a tu `host` / `port` y configura los principales para la monitorización. Para conocer todas las opciones de configuración disponibles, consulta la [muestra postgres.d/conf.yaml][1].

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       password: '<PASSWORD>'
       aws:
         instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
         region: '<REGION>'
       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

<div class="alert alert-warning"><strong>Importante</strong>: Utiliza aquí el endpoint de la instancia de Aurora, no el endpoint del clúster.</div>


2. [Reinicia el Agent][2].


[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /es/database_monitoring/guide/aurora_autodiscovery/?tab=postgres
{{% /tab %}}
{{% tab "Docker" %}}

Para configurar el Database Monitoring Agent que se ejecuta en un contenedor de Docker, como en ECS o en Fargate, puedes definir las [plantillas de integración Autodiscovery][1] como etiquetas (labels) de Docker en tu contenedor del Agent.

**Nota**: El Agent debe tener permiso de lectura en el socket de Docker para que las etiquetas de Autodiscovery funcionen.

### Línea de comandos

Ponte en marcha rápidamente con el siguiente comando para ejecutar el Agent desde tu línea de comandos. Sustituye los valores para que coincidan con tu cuenta y tu entorno:

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["postgres"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AWS_INSTANCE_ENDPOINT>",
    "port": 5432,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>"
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

Para Postgres v9.6, añade los siguientes parámetros a la configuración de la instancia donde se especifican el host y el puerto:

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

### Archivo Docker

Las etiquetas también pueden especificarse en un `Dockerfile`, por lo que puedes crear y desplegar un Agent personalizado sin cambiar la configuración de tu infraestructura:

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 5432,"username": "datadog","password": "<UNIQUEPASSWORD>"}]'
```

<div class="alert alert-warning"><strong>Importante</strong>: Utiliza el endpoint de la instancia de Aurora como host, no el endpoint del clúster.</div>

Para Postgres v9.6, añade los siguientes parámetros a la configuración de la instancia donde se especifican el host y el puerto:

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

Para evitar exponer la contraseña del usuario `datadog` en texto sin formato, utiliza el [paquete de gestión de secretos][2] del Agent y declara la contraseña utilizando la sintaxis `ENC[]` o consulta la [documentación de variables de plantilla Autodiscovery][3] para saber cómo pasar la contraseña como una variable de entorno.


[1]: /es/agent/docker/integrations/?tab=docker
[2]: /es/agent/configuration/secrets-management
[3]: /es/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

Si tienes un clúster de Kubernetes, utiliza el [Datadog Cluster Agent][1] para Database Monitoring.

Sigue las instrucciones para [habilitar checks de clúster][2], si no están habilitados en tu clúster de Kubernetes. Puedes declarar la configuración de Postgres mediante archivos estáticos montados en el contenedor del Cluster Agent o utilizando anotaciones de servicios:

### Helm

Realiza los siguientes pasos para instalar el [Datadog Cluster Agent][1] en tu clúster de Kubernetes. Sustituye los valores para que coincidan con tu cuenta y tu entorno.

1. Sigue las [instrucciones de instalación del Datadog Agent][3] para Helm.
2. Actualiza tu archivo de configuración YAML (`datadog-values.yaml` en las instrucciones de instalación del Cluster Agent) para incluir lo siguiente:
    ```yaml
    clusterAgent:
      confd:
        postgres.yaml: -|
          cluster_check: true
          init_config:
            instances:
            - dbm: true
              host: '<AWS_INSTANCE_ENDPOINT>'
              port: 5432
              username: datadog
              password: '<PASSWORD>'
              ## Required: For Postgres 9.6, uncomment these lines to use the functions created in the setup
              # pg_stat_statements_view: datadog.pg_stat_statements()
              # pg_stat_activity_view: datadog.pg_stat_activity()

    clusterChecksRunner:
      enabled: true
    ```

   Para Postgres v9.6, añade los siguientes parámetros a la configuración de la instancia donde se especifican el host y el puerto:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

3. Despliega el Agent con el archivo de configuración anterior desde la línea de comandos:
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Para Windows, añade <code>--set targetSystem=Windows</code> al comando <code>helm install</code>.
</div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site
[3]: /es/containers/kubernetes/installation/?tab=helm#installation

### Configurar con anotaciones de servicios de Kubernetes

En lugar de montar un archivo, puedes declarar la configuración de la instancia como servicio Kubernetes. Para configurar este check en un Agent que se ejecuta en Kubernetes, crea un servicio en el mismo espacio de nombres que el Datadog Cluster Agent:

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
          "host": "<AWS_INSTANCE_ENDPOINT>",
          "port": 5432,
          "username": "datadog",
          "password": "<UNIQUE_PASSWORD>"
        }
      ]
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```
<div class="alert alert-warning"><strong>Importante</strong>: Utiliza aquí el endpoint de la instancia de Aurora, no el endpoint del clúster.</div>

Para configurar más de una instancia, puedes utilizar el siguiente formato:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    ad.datadoghq.com/service.checks: |
      { 
        "postgres": 
        { "instances": 
          [ 
            { 
              "dbm":true, 
              "host":"your-host-1.us-east-2.rds.amazonaws.com", 
              "password":"<UNIQUE_PASSWORD>", 
              "port":5432, 
              "username":"<USERNAME>" 
            }, 
            { 
              "dbm":true, 
              "host":"your-host-2.us-east-2.rds.amazonaws.com", 
              "password":"<UNIQUE_PASSWORD>", 
              "port":5432, 
              "username": "<USERNAME>" 
            } 
          ] 
        } 
      }
```

Para Postgres v9.6, añade los siguientes parámetros a la configuración de la instancia donde se especifican el host y el puerto:

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar el check de Postgres.

Para evitar exponer la contraseña del usuario `datadog` en texto sin formato, utiliza el [paquete de gestión de secretos][4] del Agent y declara la contraseña utilizando la sintaxis `ENC[]`.

[1]: /es/agent/cluster_agent
[2]: /es/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /es/agent/configuration/secrets-management
{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `postgres` en la sección Checks o visita la página [Bases de datos][10] para empezar.
## Ejemplo de configuraciones del Agent
{{% dbm-postgres-agent-config-examples %}}
## Instalar la integración RDS

Para ver métricas de infraestructura de AWS, como la CPU, junto con la telemetría de la base de datos en DBM, instala la [integración RDS][11] (opcional).


## Solucionar problemas

Si has instalado y configurado las integraciones y el Agent como se describe, pero no funcionan como se esperaba, consulta [Solucionar problemas][12].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /es/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /es/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: /es/agent/configuration/agent-commands/#agent-status-and-information
[10]: https://app.datadoghq.com/databases
[11]: /es/integrations/amazon_rds
[12]: /es/database_monitoring/troubleshooting/?tab=postgres
[13]: /es/database_monitoring/guide/managed_authentication