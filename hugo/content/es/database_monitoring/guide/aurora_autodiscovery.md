---
aliases:
- /es/database_monitoring/aurora_autodiscovery
title: Configuración de Database Monitoring para clústeres de bases de datos de Amazon
  Aurora
---
Esta guía asume que ha configurado Database Monitoring para sus bases de datos de Amazon Aurora [Postgres][1] o [MySQL][11].

## Antes de comenzar {#before-you-begin}

Bases de datos compatibles
: Postgres, MySQL

Versiones de agente compatibles
: 7.53.0+

## Descripción general {#overview}

La [Autodiscovery][4] de Datadog le permite configurar la supervisión en infraestructuras dinámicas. Puede utilizar esta función para supervisar sus clústeres de Aurora sin tener que listar los puntos finales de host de base de datos individuales (por ejemplo, `postgres.d/conf.yaml`). Esto es especialmente útil para clústeres que utilizan [Aurora Auto Scaling][6], que ajusta dinámicamente el número de réplicas de Aurora en respuesta a variaciones en la conectividad o la carga de trabajo. La autodetección descubre y supervisa automáticamente tanto las instancias de punto final primario como las de réplica.

Con la autodetección y la supervisión de bases de datos, puede definir plantillas de configuración para verificaciones de Postgres o MySQL y especificar a qué clústeres aplicar cada verificación.

## Habilitando la autodetección para clústeres de Aurora {#enabling-autodiscovery-for-aurora-clusters}

1. [Conceder permisos de AWS](#grant-aws-permissions)
2. [Configurar etiquetas de Aurora](#configure-aurora-tags)
3. [Configurar el agente de Datadog](#configure-the-datadog-agent)
4. [Crear una plantilla de configuración](#create-a-configuration-template)

### Conceder permisos de AWS {#grant-aws-permissions}

El agente de Datadog requiere permiso para ejecutar `rds:DescribeDBClusters` y `rds:DescribeDBInstances` en su cuenta de AWS. Datadog recomienda que adjunte una política de rol IAM a la instancia EC2 donde se está ejecutando el Agente.

Un ejemplo de política que otorga estos permisos:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:DescribeDBClusters",
        "rds:DescribeDBInstances"
      ],
      "Resource": [
        "arn:aws:rds:<region>:<account>:cluster:*",
        "arn:aws:rds:<region>:<account>:db:*"
      ]
    }
  ]
}
```

También puede adjuntar la política [`AmazonRDSReadOnlyAccess`][3].

### Configurar etiquetas de Aurora {#configure-aurora-tags}

El listener descubre todos los clústeres de Aurora en la cuenta y región donde se está ejecutando el Agente que tienen la etiqueta `datadoghq.com/scrape:true` aplicada. También puede configurar el Agente para descubrir clústeres con etiquetas específicas.

Debe aplicar estas etiquetas al clúster de base de datos (Rol: `Regional cluster`). Para obtener más información sobre la etiquetación de recursos RDS, consulte la [documentación de AWS][7].

Si configura `tags` como un arreglo vacío, la Autodiscovery descubrirá todos los clústeres en la cuenta y región.

### Configurar el Agente de Datadog {#configure-the-datadog-agent}

La Autodiscovery utiliza un listener de servicio del Agent, que descubre todos los puntos finales de host de base de datos en un clúster de Aurora y reenvía los puntos finales descubiertos a la canalización de programación de verificación existente del Agent. Puede configurar el escuchador en el archivo `datadog.yaml`:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

**Nota**: El Agente solo descubre instancias de Aurora que se ejecutan en la misma región que el Agente. Para determinar la región de la instancia, el Agente utiliza [IMDS (Servicio de Metadatos de Instancia)][8]. Si su instancia EC2 requiere `IMDSv2`, debe configurar el Agente para usar `IMDSv2` estableciendo `ec2_prefer_imdsv2: true` en `datadog.yaml`, como se muestra a continuación:

``` yaml {hl_lines=[1]}
ec2_prefer_imdsv2: true
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true

```

By default, the listener only discovers Aurora clusters in the account and region where the Agent is running, and only those with the `datadoghq.com/scrape:true` tag. You can also configure the listener to discover clusters with specific tags.

To specify custom tags for Aurora cluster discovery in the `datadog.yaml` file:

``` yaml {hl_lines=["5-6"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags:
        - "my-cluster-tag-key:value"
```

To monitor all clusters in the account and region:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags: []

```

The listener queries the AWS API for the list of hosts in a loop. The frequency with which the listener queries the AWS API, in seconds, is configurable in the `datadog.yaml` file:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      discovery_interval: 300
```

The listener provides an `%%extra_dbm%%` variable that can be used to enable or disable DBM for the instance. This value defaults to `true` if the tag `datadoghq.com/dbm:true` is present. To specify a custom tag for this value use `dbm_tag`:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      dbm_tag: "use_dbm:true"

```

The `%%extra_dbm%%` value is true if the tag is present, and false otherwise. It does not set its value to the value of the tag.

The listener provides an `%%extra_global_view_db%%` variable that can be used to set the `global_view_db` for the instance. This value defaults to the value of the tag `datadoghq.com/global_view_db`. To specify a custom tag for this value use `global_view_db_tag`:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      global_view_db_tag: "my_db_tag"
```

### Create a configuration template 

The Datadog Agent supports configuration templates for the Postgres and MySQL integrations. Define a configuration template for the Aurora clusters you wish to monitor.

{{< tabs >}}
{{% tab "Postgres" %}}

Primero, agregue un `ad_identifier` para Postgres administrado por Aurora a su archivo de plantilla de configuración (`postgres.d/conf_aws_aurora.yaml`):

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
```

Luego, defina el resto de la plantilla. Utilice [variables de plantilla](#supported-template-variables) para parámetros que pueden cambiar, como `host` y `port`.

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: "%%extra_dbm%%"
    database_autodiscovery:
      enabled: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

En este ejemplo, las variables de plantilla `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, `%%extra_dbm%%` y `%%extra_region%%` se llenan dinámicamente con información del clúster de Aurora.

#### Autenticación {#authentication}

Si está utilizando una contraseña para la autenticación, tenga en cuenta que la contraseña proporcionada en este archivo de plantilla se utilizará en cada base de datos descubierta.

{{% collapse-content title="Almacene su contraseña de forma segura" level="h5" id="securely-store-your-password" %}}
##### Almacene su contraseña de forma segura {#securely-store-your-password}
{{% dbm-secret %}}

La siguiente plantilla de configuración de ejemplo se aplica a cada instancia descubierta en el clúster de Aurora:

``` yaml {hl_lines=[8]}
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    password: "ENC[datadog_user_database_password]"
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"

```
{{% /collapse-content %}}

{{% collapse-content title="IAM Authentication" level="h5" id="iam-authentication" %}}
##### IAM Authentication

To use [IAM authentication][2] to connect to your Aurora cluster, use the following template:

``` yaml {hl_lines=["12-13"]}
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
      managed_authentication:
        enabled: "%%extra_managed_authentication_enabled%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"
```

The template variable `%%extra_managed_authentication_enabled%%` resolves to `true` if the instance is using IAM authentication.

[2]: /es/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}}
{{% collapse-content title="Vista global personalizada (7.75.0+)" level="h5" id="global-view-db" %}}
##### Base de datos de vista global personalizada {#custom-global-view-database}

Para establecer una base de datos de vista global personalizada para la autodetección de bases de datos, asegúrese de que está utilizando la versión del Agente 7.75.0 o superior y use la siguiente plantilla:

``` yaml {hl_lines=["11"]}
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    database_autodiscovery:
      enabled: true
      global_view_db: "%%extra_global_view_db%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"

```
{{% /collapse-content %}}
{{% /tab %}}

{{% tab "MySQL" %}}
First, add an `ad_identifier` for Aurora-managed MySQL to your configuration template (`mysql.d/conf_aws_aurora.yaml`) file:

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
```

Then, define the remainder of the template. Use [template variables](#supported-template-variables) for parameters that may change, such as `host` and `port`.

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

In this example, the template variables `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, `%%extra_dbm%%`, and `%%extra_region%%` are dynamically populated with information from the Aurora cluster.

#### Authentication 

If you are using password for authentication note that the password provided in this template file will be used across every database discovered.

{{% collapse-content title="Almacene su contraseña de forma segura" level="h5" id="securely-store-your-password" %}}
##### Almacene su contraseña de forma segura {#securely-store-your-password-1}
{{% dbm-secret %}}

La siguiente plantilla de configuración de ejemplo se aplica a cada instancia descubierta en el clúster de Aurora:

``` yaml {hl_lines=[8]}
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    password: "ENC[datadog_user_database_password]"
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"

```
{{% /collapse-content %}}

{{% collapse-content title="IAM Authentication (7.67.0+)" level="h5" id="iam-authentication" %}}
##### IAM Authentication

To use [IAM authentication][2] to connect to your RDS instance, make sure that you are using Agent version 7.67.0 or above and use the following template:

``` yaml {hl_lines=["12-13"]}
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
      managed_authentication:
        enabled: "%%extra_managed_authentication_enabled%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"
```

The template variable `%%extra_managed_authentication_enabled%%` resolves to `true` if the instance is using IAM authentication.

[2]: /es/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}

Para obtener más información sobre la configuración de la Autodetección con integraciones, consulte la [documentación de Autodetección][5].

#### Variables de plantilla soportadas {#supported-template-variables}

| Variable de plantilla                        | Fuente                                                                                                                                        |
|:-----------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| %%host%%                                 | El punto de conexión de la instancia de Aurora                                                                                                                  |
| %%port%%                                 | El puerto de la instancia de Aurora                                                                                                               |
| %%extra_region%%                         | La región de AWS donde se encuentra la instancia                                                                                                  |
| %%extra_dbclusteridentifier%%            | El identificador del clúster de Aurora descubierto                                                                                       |
| %%extra_dbm%% | Si DBM está habilitado en el clúster. Determinado por la presencia de `dbm_tag`, que por defecto es `datadoghq.com/dbm:true`.                                              |
| %%extra_managed_authentication_enabled%% | Si la autenticación IAM está habilitada en el clúster. <br/>Esto se utiliza para determinar si se debe usar autenticación administrada para la conexión. |
| %%extra_global_view_db%%                       | El valor de `global_view_db_tag`, que por defecto es `datadoghq.com/global_view_db`.                                                      |

[1]: /es/database_monitoring/setup_postgres/aurora/?tab=postgres10
[3]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonRDSReadOnlyAccess.html
[4]: /es/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[5]: /es/containers/docker/integrations/?tab=dockeradv2
[6]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html#Tagging.HowTo
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[9]: https://yum.datadoghq.com/beta/7/x86_64/datadog-agent-7.52.0~dbm~aurora~autodiscovery~beta~0.3-1.x86_64.rpm
[10]: https://docs.datadoghq.com/es/agent/basic_agent_usage/amazonlinux/?tab=agentv6v7
[11]: /es/database_monitoring/setup_mysql/aurora?tab=mysql56