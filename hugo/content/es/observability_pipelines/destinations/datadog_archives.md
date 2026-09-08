---
description: Aprenda a enviar registros a Amazon S3 en formato rehidratable de Datadog
  para archivado y rehidratación.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Datadog Archives
---
{{< product-availability >}}

## Descripción general {#overview}

Use el destino de Datadog Archives para enviar registros a Amazon S3 para [archivado][1] en formato rehidratable de Datadog. Luego puede consultar estos registros con [Archive Search][16]. Use el modo {{< ui >}}Search & Rehydration{{< /ui >}} de Archive Search cuando necesite volver a indexar los resultados para obtener acceso completo a la plataforma.

**Notas**: 
- El destino de Datadog Archives comprime los registros usando gzip.
- Use el destino de [Amazon S3][12] si desea enviar sus registros a Amazon S3 en formato JSON o Parquet.

También puede [enviar registros a Snowflake usando el destino de Datadog Archives](#route-logs-to-snowflake-using-the-datadog-archives-destination).

## Requisitos previos {#prerequisites}

Para usar el destino de Datadog Archives, debe instalar la [integración de AWS][3] de Datadog para poder configurar [Datadog Log Archives](#configure-log-archives).

## Configurar Log Archives {#configure-log-archives}

Si ya tiene configurados Datadog Log Archives, vaya a [Configurar el destino para su canalización](#set-up-the-destination-for-your-pipeline).

{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}

### Configure una política de IAM que permita a los Workers escribir en el bucket de S3 {#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket}

1. Navegue a la [consola de IAM][11].
1. Seleccione **Políticas** en el menú del lado izquierdo.
1. Haga clic en **Crear política**.
1. Haga clic en **JSON** en la sección **Especificar permisos**.
1. Copie la siguiente política y péguela en el **Editor de políticas**. Reemplace `<MY_BUCKET_NAME_1>` y `<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>` con la información del bucket de S3 que creó en la sección anterior.
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "DatadogUploadAndRehydrateLogArchives",
                "Effect": "Allow",
                "Action": ["s3:PutObject", "s3:GetObject"],
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>/*"
            },
            {
                "Sid": "DatadogRehydrateLogArchivesListBucket",
                "Effect": "Allow",
                "Action": "s3:ListBucket",
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>"
            }
        ]
    }
    ```
1. Haga clic en **Next**.
1. Ingrese un nombre descriptivo para la política.
1. Opcionalmente, agregue etiquetas.
1. Haga clic en **Create policy**.

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/amazon_eks %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_rpm %}}

{{% /tab %}}
{{< /tabs >}}

### Conecte el bucket de S3 a Datadog Log Archives {#connect-the-s3-bucket-to-datadog-log-archives}

1. Vaya a Datadog [Log Forwarding][17].
1. Haga clic en **Nuevo archivo**.
1. Ingrese un nombre descriptivo para el archivo.
1. Agregue una consulta que filtre todos los registros que pasan por los pipelines para que ninguno de esos registros vaya a este archive. Por ejemplo, agregue la consulta `observability_pipelines_read_only_archive`, suponiendo que a ningún registro que pase por el pipeline se le haya agregado esa etiqueta.
1. Seleccione **AWS S3**.
1. Seleccione la cuenta de AWS en la que se encuentra su bucket.
1. Ingrese el nombre del bucket de S3.
1. Opcionalmente, ingrese una ruta.
1. Marque la declaración de confirmación.
1. Opcionalmente, agregue etiquetas y defina el tamaño máximo de escaneo para la rehidratación. Consulte [Configuración avanzada][18] para obtener más información.
1. Haga clic en **Save**.

Consulte la [Log Archives documentation][1] para obtener información adicional.

## Configure el destino para su pipeline {#set-up-the-destination-for-your-pipeline}

Configure el destino de Datadog Archives cuando [set up an Archive Logs pipeline][4]. Puede configurar un pipeline en la [UI][13], usando la [API][14] o con [Terraform][15]. Los pasos en esta sección se configuran en la UI.

Después de seleccionar el destino de Datadog Archives en la UI del pipeline:

1. Ingrese el nombre de su bucket de S3. Si configuró Log Archives, es el nombre del bucket que creó anteriormente.
1. Ingrese la región de AWS en la que se encuentra el bucket de S3.
1. Ingrese el prefijo de clave.
    - Los prefijos son útiles para particionar objetos. Por ejemplo, puede usar un prefijo como clave de objeto para almacenar objetos en un directorio en particular. Si usa un prefijo para este propósito, debe terminar en `/` para actuar como una ruta de directorio; no se agrega automáticamente una `/` al final.
    - Consulte la [sintaxis de plantilla][8] si desea enrutar logs a diferentes claves de objeto según campos específicos en sus logs.
     - **Nota**: Datadog recomienda que comience sus prefijos con el nombre del directorio y sin una barra diagonal inicial (`/`). Por ejemplo, `app-logs/` o `service-logs/`.
1. Seleccione la clase de almacenamiento para su bucket de S3 en el menú desplegable {{< ui >}}Storage Class{{< /ui >}}. Si va a archivar y rehidratar sus logs:
    - **Nota**: La rehidratación solo admite las siguientes [clases de almacenamiento][9]:
        - Estándar
        - Intelligent-Tiering, solo si [los niveles de acceso de archivo asíncronos opcionales][10] están ambos deshabilitados.
        - Standard-IA
        - One Zone-IA
    - Si desea rehidratar desde archivos en otra clase de almacenamiento, primero debe moverlos a una de las clases de almacenamiento admitidas anteriormente.
    - Consulte la sección [Ejemplo de configuración de destino y archivo de registros](#example-destination-and-log-archive-setup) de esta página para saber cómo configurar su Archivo de registros según la configuración de su destino de Amazon S3.

### Configuración opcional {#optional-settings}

#### Autenticación de AWS {#aws-authentication}

Seleccione una opción de autenticación de AWS. Si solo está utilizando el [usuario o rol que creó anteriormente](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) para la autenticación, no seleccione {{< ui >}}Assume role{{< /ui >}}. Seleccione {{< ui >}}Assume role{{< /ui >}} solo si el usuario o rol que creó anteriormente necesita asumir un rol diferente para acceder al recurso de AWS. Los permisos del rol asumido deben estar definidos explícitamente.<br>Si selecciona {{< ui >}}Assume role{{< /ui >}}:
1. Ingrese el ARN del rol de IAM que desea asumir.
    - **Nota:** El [usuario o rol que creó anteriormente](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) debe tener permiso para asumir este rol para que el Worker pueda autenticarse con AWS.
1. (Opcional) Ingrese el nombre de la sesión del rol asumido y el ID externo.

#### Buffering {#buffering}

{{% observability_pipelines/destination_buffer %}}

### Example destination and Log Archive setup {#example-destination-and-log-archive-setup}

Si ingresa los siguientes valores para su destino de Datadog Archives:
- S3 Bucket Name: `test-op-bucket`
- Prefix to apply to all object keys: `op-logs`
- Storage class for the created objects: `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_destination.png" alt="La configuración de destino de Datadog Archives con los valores de ejemplo" style="width:40%;" >}}

Entonces, estos son los valores que debe ingresar para configurar el bucket de S3 para Log Archives:

- S3 bucket: `test-op-bucket`
- Path: `op-logs`
- Storage class: `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_archive.png" alt="La configuración de archivo de registros con los valores de ejemplo" style="width:70%;" >}}

## Secret defaults {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

There are no secret identifiers to configure.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Route registros to Snowflake using the Datadog Archives destination {#route-logs-to-snowflake-using-the-datadog-archives-destination}

Puede enrutar registros desde Observability Pipelines a Snowflake usando el destino de Datadog Archives configurando Snowpipe en Snowflake para ingerir automáticamente esos registros. Snowpipe monitorea continuamente su bucket de S3 en busca de archivos nuevos y los ingiere automáticamente en sus tablas de Snowflake, lo que garantiza la disponibilidad de datos casi en tiempo real para análisis o procesamiento posterior. Cuando los registros son recopilados por Observability Pipelines, se escriben en un bucket de S3. Para configurar esto:
1. Configure [Log Archives](#configure-log-archives).
1. [Set up a pipeline][5] to use Datadog Archives as the log destination. Use the configuration detailed in [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).
1. Configure Snowpipe en Snowflake. Consulte [Automatización de Snowpipe para Amazon S3][6] para obtener instrucciones.

## Cómo funciona el destino {#how-the-destination-works}

### AWS Authentication {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### Permissions {#permissions}

El Observability Pipelines Worker requiere estos permisos de política para enviar registros a Amazon S3:

- `s3:ListBucket`
- `s3:PutObject`
- `s3:GetObject`

### Event batching {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. See [Destinations event batching][7] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 100               | 900                 |

[1]: /es/logs/log_configuration/archives/
[2]: /es/logs/log_configuration/rehydrating/
[3]: /es/integrations/amazon_web_services/#setup
[4]: /es/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /es/observability_pipelines/configuration/set_up_pipelines/
[6]: https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3
[7]: /es/observability_pipelines/destinations/#event-batching
[8]: /es/observability_pipelines/destinations/#template-syntax
[9]: /es/logs/log_configuration/archives/?tab=awss3#storage-class
[10]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
[11]: https://console.aws.amazon.com/iam/
[12]: /es/observability_pipelines/destinations/amazon_s3/
[13]: https://app.datadoghq.com/observability-pipelines
[14]: /es/api/latest/observability-pipelines/
[16]: /es/logs/explorer/archive_search/
[15]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[17]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[18]: /es/logs/log_configuration/archives/?tab=awss3#advanced-settings