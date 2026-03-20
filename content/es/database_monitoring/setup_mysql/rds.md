---
description: Instalar y configurar la monitorización de bases de datos para MySQL
  gestionado en Amazon RDS
further_reading:
- link: /integrations/mysql/
  tag: Documentación
  text: Integración básica de MySQL
- link: /database_monitoring/guide/rds_autodiscovery
  tag: Documentación
  text: Autodiscovery para RDS
title: Configuración de la monitorización de bases de datos para MySQL gestionado
  por Amazon RDS
---

La monitorización de bases de datos proporciona una amplia visibilidad de tus bases de datos MySQL mediante la exposición de métricas de consultas, ejemplos de consultas, planes de explicación, datos de conexión, métricas de sistemas y telemetría para el motor de almacenamiento InnoDB.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como usuario de solo lectura. Realiza la siguiente configuración para habilitar la monitorización de bases de datos con tu base de datos MySQL:

1. [Configura la integración AWS](#configure-the-aws-integration).
1. [Configura parámetros de bases de datos](#configure-mysql-settings).
1. [Concede al Agent acceso a la base de datos](#grant-the-agent-access).
1. [Instala y configura el Agent](#install-and-configure-the-agent).
1. [Instala la integración RDS](#install-the-rds-integration).

## Antes de empezar

Versiones de MySQL compatibles
: 5.6, 5.7, o 8.0+

Versiones de MariaDB compatibles
: v10.5, v10.6 o v10.11 <br/><br/>
La monitorización de bases de datos para MariaDB es compatible con [limitaciones conocidas][11].

Versiones del Agent compatibles
: 7.36.1 o posteriores

Impacto en el rendimiento
: El valor predeterminado de configuración del Agent para la monitorización de bases de datos es conservador, pero puedes ajustar parámetros como el intervalo de recopilación y la frecuencia de muestreo de consultas para que se adapten mejor a tus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
La monitorización de bases de datos se ejecuta como integración junto con el Agent de base ([consulta los valores de referencia][1]).

Proxies, equilibradores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al host que está siendo monitorizado, preferiblemente a través del endpoint de la instancia. El Agent no debe conectarse a la base de datos a través de un proxy, equilibrador de carga o agrupador de conexiones. Si el Agent se conecta a diferentes hosts mientras se está ejecutando (como en el caso de la conmutación por error, el equilibrio de carga, etc.), el Agent calcula la diferencia en las estadísticas entre dos hosts, produciendo métricas inexactas.

Consideraciones sobre la seguridad de los datos
: Para saber qué datos recopila el Agent de tus bases de datos y cómo garantizar su seguridad, consulta [Información confidencial][2].

## Configuración de la integración AWS

Habilita la **Recopilación estándar** en la sección **Resource Collection** (Recopilación de recursos) de tu [cuadro de integración de Amazon Web Services][10].

## Configurar los parámetros de MySQL

Configura lo siguiente en el [grupo de parámetros de base de datos][3] y luego **reinicia el servidor** para que los ajustes surtan efecto:

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| Parámetro | Valor | Descripción
| --- | --- | --- |
| `performance_schema` | `1` | Obligatorio. Habilita el [esquema de rendimiento][1]. |
| `max_digest_length` | `4096` | Obligatorio para la recopilación de consultas más grandes. Aumenta el tamaño del texto del resumen SQL en las tablas de `events_statements_*`. Si se deja en el valor por defecto, no se recopilarán las consultas de más de `1024` caracteres. |
| `performance_schema_max_digest_length` | `4096` | Debe coincidir con `max_digest_length`. |
| `performance_schema_max_sql_text_length` | `4096` | Debe coincidir con `max_digest_length`. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `performance_schema` | `1` | Obligatorio. Habilita el [esquema de rendimiento][1]. |
| `max_digest_length` | `4096` | Obligatorio para la recopilación de grandes consultas. Aumenta el tamaño del texto de compendio SQL en tablas `events_statements_*`.  Si se deja en el valor por defecto, no se recopilarán las consultas de más de `1024` caracteres. |
| `performance_schema_max_digest_length` | `4096` | Debe coincidir con `max_digest_length`. |


[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

## Conceder acceso al Agent

El Datadog Agent requiere acceso de solo lectura a la base de datos para poder recopilar estadísticas y realizar consultas.

Las siguientes instrucciones conceden permiso al Agent para iniciar sesión desde cualquier host que utilice `datadog@'%'`. Puedes restringir al usuario `datadog` para que solo pueda iniciar sesión desde el host local utilizando `datadog@'localhost'`. Para obtener más información, consulta la [documentación de MySQL][4].

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}

Crea el usuario `datadog` y concédele permisos básicos:

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6" %}}

Crea el usuario `datadog` y concédele permisos básicos:

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

Crea el siguiente esquema:

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
```

Crea el procedimiento `explain_statement` para que el Agent pueda recopilar planes de explicación:

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```

Además, crea este procedimiento **en cada esquema** del que quieras recopilar planes de explicación. Sustituye `<YOUR_SCHEMA>` por el esquema de tu base de datos:

```sql
DELIMITER $$
CREATE PROCEDURE <YOUR_SCHEMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <YOUR_SCHEMA>.explain_statement TO datadog@'%';
```

Para recopilar métricas de índices, concede al usuario `datadog` un privilegio adicional:

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

A partir del Agent v7.65, el Datadog Agent puede recopilar información de esquemas de bases de datos MySQL. Consulta la sección [Recopilación de esquemas][12] a continuación para obtener más información sobre cómo conceder al Agent permisos para esta recopilación.

### Consumidores de configuración en tiempo de ejecución
Con RDS, los consumidores de esquemas de rendimiento no pueden habilitarse permanentemente en una configuración. Crea el siguiente procedimiento para dar al Agent la capacidad de habilitar consumidores de `performance_schema.events_*` en tiempo de ejecución.

```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name = 'events_waits_current';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

### Guardar tu contraseña de forma segura
{{% dbm-secret %}}

## Instala y configura el Agent

Para monitorizar hosts de RDS, instala el Datadog Agent en tu infraestructura y configúralo para conectarse a cada endpoint de instancia de forma remota. El Agent no necesita ejecutarse en la base de datos, solo necesita conectarse a ella. Para conocer otros métodos de instalación del Agent no mencionados aquí, consulta las [instrucciones de instalación del Agent][5].

{{< tabs >}}
{{% tab "Host" %}}

Para configurar este check para un Agent que se ejecuta en un host, por ejemplo, cuando se aprovisiona una pequeña instancia EC2 para que el Agent recopile de la base de datos de RDS:

Edita el archivo `mysql.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1], para empezar a recopilar tus métricas de MySQL. Para conocer todas las opciones de configuración disponibles, consulta el [mysql.d/conf.yaml de ejemplo][2].

Añade este bloque de configuración a tu `mysql.d/conf.yaml` para recopilar métricas de MySQL:

```yaml
init_config:

instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier, stored as a secret

    # After adding your project and instance, configure the Datadog AWS integration to pull additional cloud data such as CPU and Memory.
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
      region: <AWS_REGION>
```

[Reinicia el Agent][3] para empezar a enviar métricas de MySQL a Datadog.


[1]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Para configurar el Agent de monitorización de bases de datos que se ejecuta en un contenedor Docker, como en ECS o en Fargate, puedes definir las [plantillas de integración Autodiscovery][1] como etiquetas (labels) de Docker en tu contenedor del Agent.

**Nota**: El Agent debe tener permiso de lectura en el socket Docker para que las etiquetas de Autodiscovery funcionen.

### Línea de comandos

Ponte en marcha rápidamente con el siguiente comando para ejecutar el Agent desde tu línea de comandos. Sustituye los valores para que coincidan con tu cuenta y tu entorno:

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AWS_INSTANCE_ENDPOINT>",
    "port": <PORT>,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "aws": {
      "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
      "region": "<AWS_REGION>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

### Archivo de Docker

Las etiquetas también pueden especificarse en un `Dockerfile`, por lo que puedes crear y desplegar un Agent personalizado sin cambiar la configuración de tu infraestructura:

```Dockerfile
FROM gcr.io/datadoghq/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": <PORT>,"username": "datadog","password": "ENC[datadog_user_database_password]", "aws": {"instance_endpoint": "<AWS_INSTANCE_ENDPOINT>", "region": "<AWS_REGION>"}}]'
```

[1]: /es/agent/docker/integrations/?tab=docker
{{% /tab %}}
{{% tab "Kubernetes" %}}

Si tienes un clúster Kubernetes, utiliza el [Datadog Cluster Agent][1] para la monitorización de bases de datos.

Sigue las instrucciones para [habilitar checks de clúster][2], si no están habilitados en tu clúster Kubernetes. Puedes declarar la configuración de MySQL mediante archivos estáticos integrados en el contenedor del Cluster Agent o utilizando anotaciones de servicios:

### Operator

Utilizando como referencia las [Instrucciones para operadores en Kubernetes e integraciones][3], sigue los pasos que se indican a continuación para configurar la integración de MySQL:

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
              mysql.yaml: |-
                cluster_check: true
                init_config:
                instances:
                - host: <AWS_INSTANCE_ENDPOINT>
                  port: <PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
                  aws:
                    instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                    region: <AWS_REGION>
    ```

2. Aplica los cambios al Datadog Operator utilizando el siguiente comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm

1. Complete las [instrucciones de instalación del Datadog Agent][4] para Helm.
2. Actualiza tu archivo de configuración YAML (`datadog-values.yaml` en las instrucciones de instalación del Cluster Agent) para incluir lo siguiente:
    ```yaml
    clusterAgent:
      confd:
        mysql.yaml: |-
          cluster_check: true
          init_config:
          instances:
            - dbm: true
              host: <AWS_INSTANCE_ENDPOINT>
              port: <PORT>
              username: datadog
              password: 'ENC[datadog_user_database_password]'
              aws:
                instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                region: <AWS_REGION>

    clusterChecksRunner:
      enabled: true
    ```

3. Despliega el Agent con el archivo de configuración anterior desde la línea de comandos:

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
</div>

### Configuración con archivos integrados

Para configurar un check de clúster con un archivo de configuración integrado, integra el archivo de configuración del contenedor del Cluster Agent en la ruta `/conf.d/mysql.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: <AWS_INSTANCE_ENDPOINT>
      region: <AWS_REGION>
```

### Configuración con anotaciones de servicios de Kubernetes

En lugar de montar un archivo, puedes declarar la configuración de la instancia como un servicio de Kubernetes. Para configurar este check para un Agent que se ejecuta en Kubernetes, crea un servicio utilizando la siguiente sintaxis:


```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["mysql"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<AWS_INSTANCE_ENDPOINT>",
          "port": <PORT>,
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "aws": {
            "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
            "region": "<AWS_REGION>"
          }
        }
      ]
spec:
  ports:
  - port: <PORT>
    protocol: TCP
    targetPort: <PORT>
    name: mysql
```

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar el check de SQL Server.

Para evitar exponer la contraseña del usuario de `datadog` en texto plano, utilice el [paquete de gestión de secretos][6] de Agent y declare la contraseña utilizando la sintaxis de `ENC[]`.

[1]: /es/containers/cluster_agent/setup/
[2]: /es/containers/cluster_agent/clusterchecks/
[3]: /es/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /es/containers/kubernetes/integrations/?tab=helm
[5]: /es/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /es/agent/configuration/secrets-management

{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `mysql` en la sección Checks. Si no, consulta la página [Bases de datos][7] para empezar.

## Configuraciones del Agent de ejemplo
{{% dbm-mysql-agent-config-examples %}}

## Instalar la integración de RDS

Para ver métricas de infraestructura de AWS, como la CPU, junto con la telemetría de la base de datos en DBM, instala la [integración RDS][8] (opcional).

## Solucionar problemas

Si has instalado y configurado las integraciones y el Agent como se describe, pero no funcionan como esperabas, consulta [Solucionar problemas][9].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /es/database_monitoring/data_collected/#sensitive-information
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /es/agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /es/integrations/amazon_rds
[9]: /es/database_monitoring/troubleshooting/?tab=mysql
[10]: https://app.datadoghq.com/integrations/amazon-web-services
[11]: /es/database_monitoring/setup_mysql/troubleshooting/#mariadb-known-limitations
[12]: /es/database_monitoring/setup_mysql/rds?tab=mysql57#collecting-schemas