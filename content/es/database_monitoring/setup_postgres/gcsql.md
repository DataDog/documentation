---
description: Instala y configura Database Monitoring para PostgreSQL gestionado en
  Google Cloud SQL.
further_reading:
- link: /integrations/postgres/
  tag: Documentación
  text: Integración Postgres básica
title: Configuración de Database Monitoring para Postgres gestionado por Google Cloud
  SQL
---

Database Monitoring te proporciona una amplia visibilidad de tus bases de datos Postgres mediante la exposición de métricas de consultas, muestras de consultas, explain-plans, estados de bases de datos, conmutaciones por error y eventos.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como usuario de sólo lectura. Realiza la siguiente configuración para habilitar Database Monitoring con tu base de datos Postgres:

1. [Configura parámetros de bases de datos](#configure-postgres-settings).
1. [Concede al Agent acceso a la base de datos](#grant-the-agent-access).
1. [Instala y configura el Agent](#install-and-configure-the-agent).
1. [Instala la integración Cloud SQL](#install-the-cloud-sql-integration)

## Antes de empezar

Versiones de PostgreSQL compatibles
: 10, 11, 12, 13, 14, 15

Versiones del Agent compatibles
: v7.36.1 o posterior

Impacto en el rendimiento
: La configuración de Database Monitoring predeterminada del Agent es conservadora, pero puedes ajustar algunos parámetros como el intervalo de recopilación y la frecuencia de muestreo de consultas según tus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de la consulta en la base de datos y menos del uno por ciento del uso de CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agent de base ([consulta las referencias][1]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al host que se está monitorizando. Para las bases de datos autoalojadas, se prefiere `127.0.0.1` o el socket. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones como `pgbouncer`. Si el Agent se conecta a diferentes hosts mientras se ejecuta (como en el caso de la conmutación por error, el balanceo de carga, etc.), el Agent calcula la diferencia en las estadísticas entre dos hosts, lo que produce inexactitudes en las métricas.

Consideraciones sobre la seguridad de los datos
: Para saber qué datos recopila el Agent de tus bases de datos y cómo garantizar su seguridad, consulta [Información confidencial][2].

## Configuración de parámetros de Postgres

Configura los siguientes [parámetros][3] en las [marcas de bases de datos][4] y luego **reinicia el servidor** para que la configuración surta efecto. Para obtener más información sobre estos parámetros, consulta la [documentación de Postgres][5].

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `track_activity_query_size` | `4096` | Necesario para recopilar consultas de mayor tamaño. Aumenta el tamaño del texto SQL en `pg_stat_activity`. Si se deja con el valor predeterminado, las consultas de más de `1024` caracteres no se recopilan. |
| `pg_stat_statements.track` | `all` | Opcional. Habilita el seguimiento de sentencias dentro de procedimientos almacenados y funciones. |
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

Crea el siguiente esquema **en cada base de datos**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

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

Cuando se te pida una contraseña, utiliza la que introdujiste al crear el usuario `datadog`.

## Instalación y configuración del Agent

Para monitorizar hosts de Cloud SQL, instala el Datadog Agent en tu infraestructura y configúralo para conectarse a cada endpoint de instancia de forma remota. El Agent no necesita ejecutarse en la base de datos, sólo necesita conectarse a ella. Para conocer otros métodos de instalación del Agent no mencionados aquí, consulta las [instrucciones de instalación del Agent][8].

{{< tabs >}}
{{% tab "Host" %}}

Para configurar la recopilación de métricas de Database Monitoring para un Agent que se ejecuta en un host, por ejemplo cuando se aprovisiona una pequeña instancia de GCE para que el Agent recopile desde una base de datos Cloud SQL:

1. Edita el archivo `postgres.d/conf.yaml` para que apunte a tu `host` / `port` y configura los principales para monitorizar. Ppara conocer todas las opciones de configuración disponibles, consulta la [muestra de postgres.d/conf.yaml][1]. La localización del directorio `postgres.d` depende de tu sistema operativo. Para obtener más información, consulta el [directorio de configuración del Agent][4].
   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<INSTANCE_ADDRESS>'
       port: 5432
       username: datadog
       password: 'ENC[datadog_user_database_password]'
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'

       # After adding your project and instance, configure the Datadog Google Cloud (GCP) integration to pull additional cloud data such as CPU, Memory, etc.
       gcp:
        project_id: '<PROJECT_ID>'
        instance_id: '<INSTANCE_ID>'
   ```
2. [Reinicia el Agent][2].

Para obtener información adicional sobre la configuración de los campos `project_id` y `instance_id`, consulta las [especificaciones para la integración Postgres][3].

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L417-L444
[4]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
{{% /tab %}}
{{% tab "Docker" %}}

Para configurar el Database Monitoring Agent que se ejecuta en un contenedor de Docker, como en Google Cloud Run, puedes definir las [plantillas de integración Autodiscovery][1] como etiquetas (labels) de Docker en tu contenedor del Agent.

**Nota**: El Agent debe tener permiso de lectura en el socket de Docker para que las etiquetas (labels) de Autodiscovery funcionen.

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
    "host": "<INSTANCE_ADDRESS>",
    "port": 5432,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "gcp": {
      "project_id": "<PROJECT_ID>",
      "instance_id": "<INSTANCE_ID>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

### Archivo Docker

Las etiquetas también pueden especificarse en un `Dockerfile`, por lo que puedes crear y desplegar un Agent personalizado sin cambiar la configuración de tu infraestructura:

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<INSTANCE_ADDRESS>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]", "gcp": {"project_id": "<PROJECT_ID>", "instance_id": "<INSTANCE_ID>"}}]'
```

Para obtener información adicional sobre la configuración de los campos `project_id` y `instance_id`, consulta las [especificaciones para la integración Postgres][2].

[1]: /es/agent/docker/integrations/?tab=docker
[2]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L417-L444
{{% /tab %}}
{{% tab "Kubernetes" %}}

Si tienes un clúster de Kubernetes, utiliza el [Datadog Cluster Agent][1] para la Monitorización de base de datos.

Sigue las instrucciones para [habilitar checks de clúster][2], si no están habilitados en tu clúster de Kubernetes. Puedes declarar la configuración de Postgres mediante archivos estáticos montados en el contenedor del Cluster Agent o utilizando anotaciones de servicios:

### Helm

Realiza los siguientes pasos para instalar el [Datadog Cluster Agent][1] en tu clúster de Kubernetes. Sustituye los valores para que coincidan con tu cuenta y tu entorno.

1. Sigue las [instrucciones de instalación del Datadog Agent][3] para Helm.
2. Actualiza tu archivo de configuración YAML (`datadog-values.yaml` en las instrucciones de instalación del Cluster Agent) para incluir lo siguiente:
    ```yaml
    clusterAgent:
      confd:
        postgres.yaml: |-
          cluster_check: true
          init_config:
          instances:
          - dbm: true
            host: <INSTANCE_ADDRESS>
            port: 5432
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            gcp:
              project_id: '<PROJECT_ID>'
              instance_id: '<INSTANCE_ID>'

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

### Configurar con archivos integrados

Para configurar un check de clúster con un archivo de configuración montado, monta el archivo de configuración del contenedor del Cluster Agent en la ruta: `/conf.d/postgres.yaml`:

```yaml
cluster_check: true  # Asegúrate de incluir esta marca
init_config:
instances:
  - dbm: true
    host: '<INSTANCE_ADDRESS>'
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    # Después de añadir tu proyecto e instancia, configura la integración de Datadog con GCP para extraer datos de nube adicionales, como CPU y memoria, entre otros.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

### Configurar con anotaciones de servicios de Kubernetes

En lugar de integrar un archivo, puedes declarar la configuración de la instancia como servicio de Kubernetes. Para configurar este check en un Agent que se ejecuta en Kubernetes, crea un servicio en el mismo espacio de nombres que el Datadog Cluster Agent:

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
          "host": "<INSTANCE_ADDRESS>",
          "port": 5432,
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "gcp": {
            "project_id": "<PROJECT_ID>",
            "instance_id": "<INSTANCE_ID>"
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

Para obtener información adicional sobre la configuración de los campos `project_id` y `instance_id`, consulta las [especificaciones para la integración Postgres][4].

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar el check de Postgres.


[1]: /es/agent/cluster_agent
[2]: /es/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L417-L444
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `postgres` en la sección Checks o visita la página [Bases de datos][10] para empezar.
## Ejemplo de configuraciones del Agent
{{% dbm-postgres-agent-config-examples %}}

## Instalar la integración Cloud SQL

Para recopilar métricas de base de datos más completas de Cloud SQL, instala la [integración Cloud SQL][11] (opcional).

## Solucionar problemas

Si has instalado y configurado las integraciones y el Agent como se describe, pero no funcionan como se esperaba, consulta [Solucionar problemas][12].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /es/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://cloud.google.com/sql/docs/postgres/flags
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /es/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: /es/agent/configuration/agent-commands/#agent-status-and-information
[10]: https://app.datadoghq.com/databases
[11]: /es/integrations/google_cloudsql
[12]: /es/database_monitoring/troubleshooting/?tab=postgres