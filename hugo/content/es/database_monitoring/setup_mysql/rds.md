---
description: Instale y configure Database Monitoring para MySQL administrado en Amazon
  RDS.
further_reading:
- link: /integrations/mysql/
  tag: Documentación
  text: Integración básica de MySQL
- link: /database_monitoring/guide/rds_autodiscovery
  tag: Documentación
  text: Autodiscovery para RDS
title: Configuración de Database Monitoring para MySQL administrado en Amazon RDS
---
Database Monitoring proporciona una visibilidad profunda de sus bases de datos MySQL al exponer métricas de consultas, muestras de consultas, planes de explicación, datos de conexión, métricas del sistema y telemetría para el motor de almacenamiento InnoDB.

**Nota**: Si utiliza MariaDB, consulte [Configuración de MariaDB][13] en su lugar.

El Agent recopila telemetría directamente de la base de datos iniciando sesión como un usuario de solo lectura. Realice la siguiente configuración para habilitar Database Monitoring con su base de datos MySQL:

1. [Configure la integración de AWS](#configure-the-aws-integration)
1. [Configure los parámetros de la base de datos](#configure-mysql-settings)
1. [Otorgue al Agent acceso a la base de datos](#grant-the-agent-access)
1. [Instale y configure el Agent](#install-and-configure-the-agent)
1. [Instale la integración de RDS](#install-the-rds-integration)

## Antes de comenzar {#before-you-begin}

Versiones de MySQL compatibles
: 5.6, 5.7 o 8.0+

Versiones de Agent compatibles
: 7.36.1+

Impacto en el rendimiento
: La configuración predeterminada del Agent para Database Monitoring es conservadora, pero puede ajustar configuraciones como el intervalo de recopilación y la tasa de muestreo de consultas para que se adapten mejor a sus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agent base ([consulte los puntos de referencia][1]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Datadog Agent debe conectarse directamente al servidor que se está monitoreando, preferiblemente a través del punto de conexión de la instancia. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones. Si el Agent se conecta a diferentes servidores mientras se ejecuta (como en el caso de conmutación por error, equilibrio de carga, etc.), el Agent calcula la diferencia en las estadísticas entre dos servidores, lo que produce métricas inexactas.

Consideraciones de seguridad de los datos
: Consulte [Información confidencial][2] para obtener información sobre qué datos recopila el Agent de sus bases de datos y cómo garantizar que estén seguros.

## Configure la integración de AWS {#configure-the-aws-integration}

Habilite {{< ui >}}Standard Collection{{< /ui >}} en la sección {{< ui >}}Resource Collection{{< /ui >}} de su [Amazon Web Services integration tile][10].

## Configure los ajustes de MySQL {#configure-mysql-settings}

Configure lo siguiente en el [grupo de parámetros de base de datos][3] y luego **reinicie el servidor** para que los ajustes surtan efecto:

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `performance_schema` | `1` | Obligatorio. Habilita el [Performance Schema][1]. |
| `max_digest_length` | `4096` | Requerido para la recopilación de consultas más grandes. Aumenta el tamaño del texto de resumen SQL en las tablas `events_statements_*`. Si se deja en el valor predeterminado, las consultas de más de `1024` caracteres no se recopilarán. |
| `performance_schema_max_digest_length` | `4096` | Debe coincidir con `max_digest_length`. |
| `performance_schema_max_sql_text_length` | `4096` | Debe coincidir con `max_digest_length`. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `performance_schema` | `1` | Obligatorio. Habilita el [Performance Schema][1]. |
| `max_digest_length` | `4096` | Requerido para la recopilación de consultas más grandes. Aumenta el tamaño del texto de resumen SQL en las tablas `events_statements_*`. Si se deja en el valor predeterminado, las consultas de más de `1024` caracteres no se recopilarán. |
| `performance_schema_max_digest_length` | `4096` | Debe coincidir con `max_digest_length`. |


[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

## Otorgue al Agent acceso {#grant-the-agent-access}

El Datadog Agent requiere acceso de solo lectura a la base de datos para recopilar estadísticas y consultas.

Las siguientes instrucciones otorgan al Agent permiso para iniciar sesión desde cualquier host usando `datadog@'%'`. Puede restringir al usuario `datadog` para que solo se le permita iniciar sesión desde localhost usando `datadog@'localhost'`. Consulte la [documentación de MySQL][4] para obtener más información.

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}

Cree el usuario `datadog` y otorgue permisos básicos:

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6" %}}

Cree el usuario `datadog` y otorgue permisos básicos:

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

Cree el siguiente esquema:

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
```

Cree el procedimiento `explain_statement` para permitir que el Agent recopile planes de ejecución:

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

Además, cree este procedimiento **en cada esquema** del cual desee recopilar planes de ejecución. Reemplace `<YOUR_SCHEMA>` con su esquema de base de datos:

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

Para recopilar métricas de índice, otorgue al usuario `datadog` un privilegio adicional:

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

A partir del Agent v7.65, el Datadog Agent puede recopilar información de esquema de bases de datos MySQL. Consulte la sección [Collecting schemas][12] a continuación para obtener más información sobre cómo otorgar al Agent los permisos para esta recopilación.

### Consumidores de configuración en tiempo de ejecución {#runtime-setup-consumers}
Con RDS, los consumidores de performance schema no se pueden habilitar de forma permanente en una configuración. Cree el siguiente procedimiento para darle al Agent la capacidad de habilitar consumidores `performance_schema.events_*` en tiempo de ejecución.

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

### Almacene su contraseña de forma segura {#securely-store-your-password}
{{% dbm-secret %}}

## Instale y configure el Agent {#install-and-configure-the-agent}

Para hacer un seguimiento de los servidores RDS, instale el Datadog Agent en su infraestructura y configúrelo para conectarse a cada punto de conexión de instancia de forma remota. El Agent no necesita ejecutarse en la base de datos, solo necesita conectarse a ella. Para obtener métodos de instalación del Agent adicionales no mencionados aquí, consulte las [instrucciones de instalación del Agent][5].

{{< tabs >}}
{{% tab "Servidor" %}}

Para configurar esta comprobación para un Agent que se ejecuta en un servidor, por ejemplo, cuando usted aprovisiona una instancia EC2 pequeña para que el Agent recopile datos de una base de datos RDS:

Edite el archivo `mysql.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de su [directorio de configuración del Agent][1] para comenzar a recopilar sus métricas de MySQL. Consulte el [sample mysql.d/conf.yaml][2] para ver todas las opciones de configuración disponibles, incluidas las de métricas personalizadas.

Agregue este bloque de configuración a su `mysql.d/conf.yaml` para recopilar métricas de MySQL:

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

Si desea autenticarse con IAM, especifique los parámetros `region` y `instance_endpoint`, y establezca `managed_authentication.enabled` en `true`.

**Nota**: solo habilite `managed_authentication` si desea utilizar la autenticación IAM. La autenticación IAM tiene prioridad sobre el campo `password`.

```yaml
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
      region: <AWS_REGION>
      managed_authentication:
        enabled: true
```

Para obtener información sobre cómo configurar la autenticación IAM en su instancia de RDS, consulte [Conexión con autenticación administrada][3].

[Reinicie el Agent][4] para comenzar a enviar métricas de MySQL a Datadog.


[1]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /es/database_monitoring/guide/managed_authentication/?tab=mysql#configure-iam-authentication
[4]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Para configurar el Database Monitoring Agent que se ejecuta en un contenedor Docker, como en ECS o Fargate, puede establecer las [Autodiscovery Integration Templates][1] como etiquetas de Docker en su contenedor del Agent.

**Nota**: El Agent debe tener permiso de lectura en el socket de Docker para que funcione Autodiscovery de etiquetas.

### Línea de comandos {#command-line}

Comience a trabajar rápidamente ejecutando el siguiente comando para ejecutar el Agent desde su línea de comandos. Reemplace los valores para que coincidan con su cuenta y entorno:

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
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

### Dockerfile {#dockerfile}

Las etiquetas también se pueden especificar en un `Dockerfile`, por lo que puede compilar e implementar un Agent personalizado sin cambiar ninguna configuración de infraestructura:

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": <PORT>,"username": "datadog","password": "ENC[datadog_user_database_password]", "aws": {"instance_endpoint": "<AWS_INSTANCE_ENDPOINT>", "region": "<AWS_REGION>"}}]'
```

[1]: /es/agent/docker/integrations/?tab=docker
{{% /tab %}}
{{% tab "Kubernetes" %}}

Si tiene un clúster de Kubernetes, utilice el [Datadog Cluster Agent][1] para Database Monitoring.

Siga las instrucciones para [habilitar las verificaciones de clúster][2] si aún no están habilitadas en su clúster de Kubernetes. Puede declarar la configuración de MySQL con archivos estáticos montados en el contenedor del Cluster Agent o utilizando anotaciones de servicio:

### Datadog Operator {#operator}

Utilizando las [instrucciones de Datadog Operator en Kubernetes e Integrations][3] como referencia, siga los pasos a continuación para configurar la integración de MySQL:

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

2. Aplique los cambios al Datadog Operator utilizando el siguiente comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

1. Complete las [instrucciones de instalación del Datadog Agent][4] para Helm.
2. Actualice su archivo de configuración YAML (`datadog-values.yaml` en las instrucciones de instalación del Cluster Agent) para incluir lo siguiente:
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

3. Implemente el Agent con el archivo de configuración anterior desde la línea de comandos:

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Para Windows, añada <code>--set targetSystem=windows</code> al <code>helm install</code> comando.
</div>

### Configure con archivos montados {#configure-with-mounted-files}

Para configurar una verificación de clúster con un archivo de configuración montado, monte el archivo de configuración en el contenedor del Cluster Agent en la ruta `/conf.d/mysql.yaml`:

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

### Configure con anotaciones de servicio de Kubernetes {#configure-with-kubernetes-service-annotations}

En lugar de montar un archivo, puede declarar la configuración de la instancia como un servicio de Kubernetes. Para configurar esta verificación para un Agent que se ejecuta en Kubernetes, cree un servicio utilizando la siguiente sintaxis:


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

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar la verificación de MySQL.

Para evitar exponer la contraseña del usuario `datadog` en texto plano, utilice el [paquete de gestión de secretos][6] del Agent y declare la contraseña utilizando la sintaxis `ENC[]`.

[1]: /es/containers/cluster_agent/setup/
[2]: /es/containers/cluster_agent/clusterchecks/
[3]: /es/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /es/containers/kubernetes/integrations/?tab=helm
[5]: /es/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /es/agent/configuration/secrets-management

{{% /tab %}}
{{< /tabs >}}

### Validar {#validate}

[Ejecute el subcomando de estado del Agent][6] y busque `mysql` en la sección de verificaciones, o consulte la página [Bases de datos][7] para comenzar.

## Ejemplos de configuraciones de Agent {#example-agent-configurations}
{{% dbm-mysql-agent-config-examples %}}

## Instale la integración de RDS {#install-the-rds-integration}

Para ver las métricas de infraestructura de AWS, como la CPU, junto con la telemetría de la base de datos en DBM, instale la [integración de RDS][8] (opcional).

## Solución de problemas {#troubleshooting}

Si ha instalado y configurado las integraciones y el Agent como se describe y no funciona como se espera, consulte [Troubleshooting][9].

## Lecturas adicionales {#further-reading}

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
[12]: /es/database_monitoring/setup_mysql/rds?tab=mysql57#collecting-schemas
[13]: /es/database_monitoring/setup_mariadb/