---
description: Conecte AWS Glue a Datadog Data Observability para hacer un seguimiento
  de los metadatos, la frescura y la calidad de la tabla Iceberg.
further_reading:
- link: /data_observability/
  tag: Documentación
  text: Descripción general de Data Observability
- link: /integrations/amazon-web-services/
  tag: Documentación
  text: Integración de AWS
- link: /monitors/types/data_observability/
  tag: Documentación
  text: Monitores de Data Observability
title: Tablas Iceberg (AWS Glue)
---
## Descripción general {#overview}

Si [utiliza el framework Iceberg en AWS Glue][5], puede ver los metadatos de sus tablas Iceberg en Datadog a través de la [integración de AWS Glue][6]. Utilice estos datos para hacer un seguimiento de los esquemas de las tablas, la frescura de los datos, el recuento de filas y los tamaños de las tablas.

## Requisitos previos {#prerequisites}

Antes de comenzar, asegúrese de tener:

- Una cuenta de AWS con tablas Iceberg de Glue que desee hacer un seguimiento.
- Una [cuenta de AWS conectada en Datadog][1].
  - El reenvío de registros no es necesario para Data Observability.
- Permisos de IAM para modificar las políticas del rol de Datadog.
- (Opcional) Acceso a AWS Lake Formation si lo utiliza para administrar los permisos de las tablas.

## Configure la cuenta de AWS {#configure-the-aws-account}

1. Navegue a [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][2].
2. Haga clic en {{< ui >}}Configure{{< /ui >}} junto a AWS Glue.

   {{< img src="data_observability/aws_glue/settings-configure-button.png" alt="Opción de configuración de AWS Glue en la página de Configuración de Data Observability" style="width:100%;" >}}

3. Seleccione una cuenta de AWS existente que ya esté conectada a Datadog, o agregue una nueva. Para obtener ayuda sobre cómo agregar una cuenta nueva, consulte la [documentación de integración de AWS][1].

   {{< img src="data_observability/aws_glue/account-selection.png" alt="Menú desplegable de selección de cuenta de AWS en el flujo de configuración" style="width:100%;" >}}

## Agregue los permisos de IAM requeridos {#add-required-iam-permissions}

El rastreador de Data Observability requiere permisos adicionales para hacer un seguimiento de las tablas Iceberg de Glue. Adjunte la siguiente política al rol de IAM de Datadog configurado para su integración de AWS:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "glue:GetCatalog",
        "glue:GetDatabase",
        "glue:GetDatabases",
        "glue:GetJobRun",
        "glue:GetJobRuns",
        "glue:GetJob",
        "glue:GetJobs",
        "glue:GetTable",
        "glue:GetTables",
        "glue:GetTags",
        "glue:ListJobs",
        "s3:ListBucket",
        "kms:Decrypt",
        "lakeformation:GetDataAccess"
      ],
      "Resource": ["*"]
    },
    {
      "Sid": "AllowIcebergMetadataOnly",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion"
      ],
      "Resource": [
        "arn:aws:s3:::*/metadata/*"
      ]
    }
  ]
}
```

### (Opcional) Restrinja el acceso a bases de datos y tablas específicas {#optional-restrict-access-to-specific-databases-and-tables}

La política anterior otorga acceso a todos los recursos de Glue. Para hacer un seguimiento solo de bases de datos o tablas específicas, reemplace `Resource: ["*"]` en la política de ejemplo anterior con los ARN explícitos de las bases de datos o tablas que desea hacer un seguimiento.

Los permisos de IAM de AWS Glue son jerárquicos. Para acceder a una tabla, la política debe incluir el catálogo, la base de datos y la tabla. Omitir cualquier nivel resulta en un error de acceso denegado.

| Recurso | Formato de ARN | Ejemplo |
|----------|------------|---------|
| Catálogo | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:catalog` | `arn:aws:glue:us-east-1:123456789012:catalog` |
| Base de datos | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:database/<DB_NAME>` | `arn:aws:glue:us-east-1:123456789012:database/analytics` |
| Tabla | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:table/<DB_NAME>/<TABLE_NAME>` | `arn:aws:glue:us-east-1:123456789012:table/analytics/events` |

#### Ejemplos de políticas {#example-policies}

{{< tabs >}}
{{% tab "Bases de datos específicas" %}}

Para hacer un seguimiento de todas las tablas en bases de datos específicas, incluya el catálogo, cada base de datos y un comodín para las tablas en esas bases de datos:

```json
{
  "Effect": "Allow",
  "Action": [
    "glue:GetCatalog",
    "glue:GetDatabase",
    "glue:GetDatabases",
    "glue:GetTable",
    "glue:GetTables"
  ],
  "Resource": [
    "arn:aws:glue:us-east-1:123456789012:catalog",
    "arn:aws:glue:us-east-1:123456789012:database/production_db",
    "arn:aws:glue:us-east-1:123456789012:database/analytics_db",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/*",
    "arn:aws:glue:us-east-1:123456789012:table/analytics_db/*"
  ]
}
```

{{% /tab %}}
{{% tab "Tablas específicas" %}}

Para hacer un seguimiento solo de tablas específicas, liste cada tabla explícitamente. También puede usar comodines para coincidir con patrones de nombres de tablas:

```json
{
  "Effect": "Allow",
  "Action": [
    "glue:GetCatalog",
    "glue:GetDatabase",
    "glue:GetDatabases",
    "glue:GetTable",
    "glue:GetTables"
  ],
  "Resource": [
    "arn:aws:glue:us-east-1:123456789012:catalog",
    "arn:aws:glue:us-east-1:123456789012:database/production_db",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/orders",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/customers",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/events_*"
  ]
}
```

El comodín `events_*` coincide con tablas como `events_clicks`, `events_purchases` y cualquier otra tabla que comience con `events_`.

{{% /tab %}}
{{< /tabs >}}

Para obtener más información, consulte los [ejemplos de políticas basadas en identidad de AWS Glue][4].

## (Opcional) Configure el acceso a Lake Formation {#optional-configure-lake-formation-access}

Si utiliza AWS Lake Formation para administrar el acceso a sus tablas de Glue Catalog, otorgue al rol de Datadog acceso a las bases de datos y tablas que desea hacer un seguimiento.

{{< tabs >}}
{{% tab "AWS CLI" %}}

Utilice los siguientes comandos, reemplazando los valores de marcador de posición con su ID de cuenta, nombre de rol, nombre de base de datos y bucket de S3 reales:

```bash
PRINCIPAL=arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/<YOUR_DATADOG_ROLE_NAME>

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"Database":{"Name":"<YOUR_DATABASE_NAME>"}}' \
  --permissions DESCRIBE SELECT

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"TableWildcard":{"DatabaseName":"<YOUR_DATABASE_NAME>"}}' \
  --permissions DESCRIBE SELECT

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"DataLocation":{"ResourceArn":"arn:aws:s3:::<YOUR_S3_BUCKET_NAME>"}}' \
  --permissions DATA_LOCATION_ACCESS
```

{{% /tab %}}
{{% tab "Consola de AWS" %}}

1. En la consola de AWS, navegue a {{< ui >}}Lake Formation{{< /ui >}} > {{< ui >}}Data lake permissions{{< /ui >}}.
2. Haga clic en {{< ui >}}Grant{{< /ui >}}.
3. En {{< ui >}}Principals{{< /ui >}}, seleccione {{< ui >}}IAM users and roles{{< /ui >}} y elija su rol de Datadog.
4. En {{< ui >}}LF-Tags or catalog resources{{< /ui >}}, seleccione la base de datos y las tablas que desea hacer un seguimiento.
5. En {{< ui >}}Permissions{{< /ui >}}, seleccione {{< ui >}}DESCRIBE{{< /ui >}} y {{< ui >}}SELECT{{< /ui >}}.
6. Haga clic en {{< ui >}}Grant{{< /ui >}}.

{{< img src="data_observability/aws_glue/lakeformation-permissions.png" alt="Cuadro de diálogo de concesión de permisos de Lake Formation en la consola de AWS" style="width:90%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Configure el crawler {#configure-the-crawler}

1. Seleccione las regiones de AWS donde se encuentran sus tablas de Glue Iceberg.
2. Habilite el interruptor {{< ui >}}Quality Monitoring for Apache Iceberg{{< /ui >}}.
3. (Opcional) Habilite el interruptor {{< ui >}}Job Monitoring{{< /ui >}} si también desea hacer un seguimiento del estado y el rendimiento de los trabajos de Glue.
4. Elija una frecuencia de sincronización.

   {{< img src="data_observability/aws_glue/crawler-configuration.png" alt="Configuración del crawler que muestra la selección de región y las opciones de frecuencia de sincronización" style="width:100%;" >}}

5. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Próximos pasos {#next-steps}

Después de completar la configuración, Datadog comienza a sincronizar los metadatos de sus tablas de Glue Iceberg en segundo plano. Las sincronizaciones iniciales pueden tardar hasta una hora dependiendo de la cantidad de tablas en su catálogo.

Una vez completada la sincronización, sus tablas aparecen en el [Data Catalog][3]. También puede crear un [Data Observability monitor][7] para comenzar a recibir alertas sobre la frescura y el recuento de filas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/amazon-web-services/
[2]: https://app.datadoghq.com/data-obs/settings/integrations
[3]: https://app.datadoghq.com/data-obs/catalog?integration=awsglue%2Fdatabase_account
[4]: https://docs.aws.amazon.com/glue/latest/dg/security_iam_id-based-policy-examples.html
[5]: https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-iceberg.html
[6]: /es/integrations/amazon-glue/
[7]: /es/monitors/types/data_observability/