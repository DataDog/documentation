---
title: Configuración de la Monitorización de base de datos para clústeres de base
  de datos de Amazon Aurora
---

Esta guía asume que has configurado la Monitorización de base de datos para tus bases de datos de Amazon Aurora [Postgres][1] o [MySQL][11].

## Antes de empezar

Bases de datos compatibles
: Postgres, MySQL

Versiones compatibles del Agent 
: 7.53.0+

## Información general

[Autodiscovery][4] de Datadog te permite configurar la monitorización en infraestructuras dinámicas. Puedes utilizar esta función para monitorizar tus clústeres de Aurora sin tener que enumerar endpoints de host de base de datos individuales (por ejemplo, `postgres.d/conf.yaml`). Esto es especialmente útil para clústeres que utilizan [Aurora Auto Scaling][6], que ajusta dinámicamente el número de réplicas de Aurora en respuesta a variaciones en la conectividad o la carga de trabajo. Autodiscovery descubre y monitoriza automáticamente tanto las instancias de endpoint primario como las de réplica.

Con Autodiscovery y la Monitorización de base de datos, puedes definir plantillas de configuración para checks de Postgres o MySQL y especificar a qué clústeres aplicar cada check.

## Habilitación de Autodiscovery para clústeres de Aurora

1. [Conceder permisos de AWS](#grant-aws-permissions)
2. [Configurar etiquetas de Aurora](#configure-aurora-tags)
3. [Configurar el Datadog Agent ](#configure-the-datadog-agent)
4. [Crear una plantilla de configuración ](#create-a-configuration-template)

### Conceder permisos a AWS

Datadog Agent requiere permiso para ejecutar `rds:DescribeDBClusters` y `rds:DescribeDBInstances` en tu cuenta de AWS. Datadog recomienda que adjuntes una política de rol de IAM a la instancia EC2 donde se ejecuta el Agent.

Una política de ejemplo que concede estos permisos:

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

También puedes adjuntar la política [`AmazonRDSReadOnlyAccess`][3].

### Configurar etiquetas de Aurora

El listener detecta todos los clústeres de Aurora en la cuenta y región donde se está ejecutando el Agent que tienen la etiqueta `datadoghq.com/scrape:true` aplicada. También puedes configurar el Agent para detectar clústeres con etiquetas específicas.

Debes aplicar estas etiquetas al clúster de base de datos (Rol: `Regional cluster`). Para obtener más información sobre etiquetado de recursos de RDS, consulta la [documentación de AWS][7].

Si configuras `tags` como una matriz vacía, Autodiscovery detectará todos los clústeres de la cuenta y la región.

### Configurar el Datadog Agent

Autodiscovery utiliza un receptor de servicios del Agent, que descubre todos los endpoints de host de la base de datos en un clúster de Aurora y reenvía los endpoints descubiertos al pipeline de programación de check del Agent existente. Puedes configurar el receptor en el archivo `datadog.yaml`:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

**Nota**: Agent solo descubre instancias de Aurora que se ejecutan en la misma región que el Agent. Para determinar la región de la instancia, el Agent utiliza [IMDS (Instance Metadata Service)][8]. Si tu instancia EC2 requiere `IMDSv2`, debes configurar el Agent para utilizar `IMDSv2` estableciendo `ec2_prefer_imdsv2: true` en `datadog.yaml`, como se muestra a continuación:

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

Para monitorizar todos los clústeres de la cuenta y la región:

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

El listener proporciona una variable `%%extra_dbm%%` que puede utilizarse para activar o desactivar DBM para la instancia. Este valor es por defecto `true` si la etiqueta `datadoghq.com/dbm:true` está presente. Para especificar una etiqueta personalizada para este valor, utiliza `dbm_tag`:

``` yaml {hl_lines=["5-6"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      dbm_tag:
        - "use_dbm:true"
```

The `%%extra_dbm%%` value is true if the tag is present, and false otherwise. It does not set its value to the value of the tag.

### Create a configuration template

The Datadog Agent supports configuration templates for the Postgres and MySQL integrations. Define a configuration template for the Aurora clusters you wish to monitor.

{{< tabs >}}
{{% tab "Postgres" %}}

First, add an `ad_identifier` for Aurora-managed Postgres to your configuration template (`postgres.d/conf_aws_aurora.yaml`) file:

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
```

A continuación, define el resto de la plantilla. Utiliza [variables de plantilla](#supported-template-variables) para los parámetros que pueden cambiar, como `host` y `port`.

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
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

En este ejemplo, las variables de plantilla `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, `%%extra_dbm%%` y `%%extra_region%%` se rellenan dinámicamente con información del clúster de Aurora.

#### Autenticación

Si utilizas una contraseña para la autenticación, ten en cuenta que la contraseña proporcionada en este archivo de plantilla se utilizará en todas las bases de datos que se detecten.

{{% collapse-content title="Guardar tu contraseña de forma segura" level="h5" id="securely-store-your-password" %}}
##### Guarda tu contraseña de forma segura
{{% dbm-secret %}}

El siguiente ejemplo de plantilla de configuración se aplica a cada instancia descubierta en el clúster de Aurora:

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

{{% collapse-content title="Autenticación de IAM" level="h5" id="iam-authentication" %}}
##### Autenticación de IAM

Para utilizar la [autenticación de IAM][2] para conectarte a tu clúster de Aurora, utiliza la siguiente plantilla:

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

La variable de plantilla `%%extra_managed_authentication_enabled%%` se resuelve en `true` si la instancia utiliza autenticación de IAM.

[2]: /es/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}} 
{{% /tab %}}

{{% tab "MySQL" %}}
En primer lugar, añade un `ad_identifier` para MySQL administrado por Aurora a tu archivo de plantilla de configuración (`MySQL.d/conf_aws_aurora.yaml`):

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
```

A continuación, define el resto de la plantilla. Utiliza [variables de plantilla](#supported-template-variables) para los parámetros que pueden cambiar, como `host` y `port`.

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

En este ejemplo, las variables de plantilla `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, `%%extra_dbm%%` y `%%extra_region%%` se rellenan dinámicamente con información del clúster de Aurora.

#### Autenticación

Si utilizas una contraseña para la autenticación, ten en cuenta que la contraseña proporcionada en este archivo de plantilla se utilizará en todas las bases de datos que se detectan. 

{{% collapse-content title="Guardar tu contraseña de forma segura" level="h5" id="securely-store-your-password" %}}
##### Guarda tu contraseña de forma segura
{{% dbm-secret %}}

El siguiente ejemplo de plantilla de configuración se aplica a cada instancia descubierta en el clúster de Aurora:

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

{{% collapse-content title="Autenticación de IAM (7.67.0+)" level="h5" id="iam-authentication" %}}
##### Autenticación de IAM

Para utilizar la [autenticación de IAM][2] para conectarte a tu instancia RDS, asegúrate de que estás utilizando el Agent versión 7.67.0 o posterior y utiliza la siguiente plantilla:

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

La variable de plantilla `%%extra_managed_authentication_enabled%%` se resuelve en `true` si la instancia utiliza autenticación de IAM.

[2]: /es/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}} 
{{% /tab %}}
{{< /tabs >}}

Para obtener más información sobre la configuración de Autodiscovery con integraciones, consulta la [documentación deAutodiscovery ][5].

#### Variables de plantilla compatibles

| Variable de plantilla                        | Fuente                                                                                                                                        |
|:-----------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| %%host%%                                 | Endpoint de la instancia de Aurora                                                                                                                  |
| %%puerto%%                                 | El puerto de la instancia de Aurora                                                                                                               |
| %%extra_region%%                         | La región de AWS en la que se encuentra la instancia                                                                                                  |
| %%extra_dbclusteridentifier%%            | El identificador de clúster del clúster de Aurora descubierto                                                                                       |
| %%extra_dbm%% | Si DBM está habilitado en el clúster. Determinado por la presencia de `dbm_tag`, que por defecto es `datadoghq.com/dbm:true`.                                              |
| %%extra_managed_authentication_enabled%% | Si la autenticación de IAM está habilitada en el clúster. <br/>Se utiliza para determinar si se debe utilizar la autenticación gestionada para la conexión. |

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