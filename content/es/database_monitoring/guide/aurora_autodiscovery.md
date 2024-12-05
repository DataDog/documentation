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

Por defecto, el receptor descubre todos los clústeres de Aurora de la cuenta y la región en la que se ejecuta el Agent que tengan aplicado la etiqueta `datadoghq.com/scrape:true`. También puedes configurar el Agent para descubrir clústeres con etiquetas específicas.

Debes aplicar estas etiquetas al clúster de base de datos (Rol: `Regional cluster`). Para obtener más información sobre etiquetado de recursos de RDS, consulta la [documentación de AWS][7].

### Configurar el Datadog Agent

Autodiscovery utiliza un receptor de servicios del Agent, que descubre todos los endpoints de host de la base de datos en un clúster de Aurora y reenvía los endpoints descubiertos al pipeline de programación de check del Agent existente. Puedes configurar el receptor en el archivo `datadog.yaml`:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

**Nota**: Agent solo descubre instancias de Aurora que se ejecutan en la misma región que el Agent. Para determinar la región de la instancia, el Agent utiliza [IMDS (Instance Metadata Service)][8]. Si tu instancia EC2 requiere `IMDSv2`, debes configurar el Agent para utilizar `IMDSv2` estableciendo `ec2_prefer_imdsv2: true` en `datadog.yaml`, como se muestra a continuación:

```yaml
ec2_prefer_imdsv2: true
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

Por defecto, el receptor solo descubre clústeres de Aurora en la cuenta y la región donde se ejecuta el Agent, y solo aquellos con la etiqueta `datadoghq.com/scrape:true`. También puedes configurar el receptor para descubrir clústeres con etiquetas específicas.

Para especificar etiquetas personalizadas para el descubrimiento de clústeres de Aurora en el archivo `datadog.yaml`:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags:
        - "my-cluster-tag-key:value"
```

El receptor consulta la API de AWS para la lista de hosts en un bucle. La frecuencia con la que el receptor consulta la API de AWS, en segundos, es configurable en el archivo `datadog.yaml`:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      discovery_interval: 300
```

### Crear una plantilla de configuración

Datadog Agent admite plantillas de configuración para integraciones de Postgres y MySQL. Define una plantilla de configuración para los clústeres de Aurora que desees monitorizar.

{{< tabs >}}
{{% tab "Postgres" %}}

En primer lugar, añade un `ad_identifier` para Postgres gestionado por Aurora a tu archivo de plantilla de configuración (`postgres.d/conf_aws_aurora.yaml`):

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
```

A continuación, define el resto de la plantilla. Utiliza [variables de plantilla](#supported-template-variables) para los parámetros que pueden cambiar, como `host` y `port`.

El siguiente ejemplo de plantilla de configuración se aplica a cada instancia descubierta en el clúster de Aurora:

```yaml
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
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

En este ejemplo, las variables de plantilla `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%` y `%%extra_region%%` se rellenan dinámicamente con información del clúster de Aurora.

Para utilizar la [autenticación de IAM][2] para conectarte a tu clúster de Aurora, utiliza la siguiente plantilla:

```yaml
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

{{% /tab %}}
{{% tab "MySQL" %}}

En primer lugar, añade un `ad_identifier` para MySQL gestionado por Aurora a tu archivo de plantilla de configuración (`mysql.d/conf_aws_aurora.yaml`):

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
```

A continuación, define el resto de la plantilla. Utiliza [variables de plantilla](#supported-template-variables) para los parámetros que pueden cambiar, como `host` y `port`.

El siguiente ejemplo de plantilla de configuración se aplica a cada instancia descubierta en el clúster de Aurora:

```yaml
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
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

En este ejemplo, las variables de plantilla `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%` y `%%extra_region%%` se rellenan dinámicamente con información del clúster de Aurora.

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
| %%extra_managed_authentication_enabled%% | Si la autenticación de IAM está habilitada en clúster. <br/>Se utiliza para determinar si se debe utilizar la autenticación gestionada para Postgres. |

[1]: /es/database_monitoring/setup_postgres/aurora/?tab=postgres10
[2]: /es/database_monitoring/guide/managed_authentication/#configure-iam-authentication
[3]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonRDSReadOnlyAccess.html
[4]: /es/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[5]: /es/containers/docker/integrations/?tab=dockeradv2
[6]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html#Tagging.HowTo
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[9]: https://yum.datadoghq.com/beta/7/x86_64/datadog-agent-7.52.0~dbm~aurora~autodiscovery~beta~0.3-1.x86_64.rpm
[10]: https://docs.datadoghq.com/es/agent/basic_agent_usage/amazonlinux/?tab=agentv6v7
[11]: /es/database_monitoring/setup_mysql/aurora?tab=mysql56