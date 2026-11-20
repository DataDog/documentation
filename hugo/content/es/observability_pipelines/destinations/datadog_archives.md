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

Utilice el destino de Datadog Archives para enviar registros a Amazon S3 para [archivado][1] en formato rehidratable de Datadog. Luego puede consultar estos registros con [Archive Search][16]. Utilice el modo {{< ui >}}Search & Rehydration{{< /ui >}} de Archive Search cuando necesite reindexar resultados para obtener acceso completo a la plataforma.

**Nota**: Utilice el destino [Amazon S3][12] para enviar sus registros a Amazon S3 en formato JSON o Parquet.

También puede [enviar registros a Snowflake utilizando el destino de Datadog Archives](#route-logs-to-snowflake-using-the-datadog-archives-destination).

## Requisitos previos {#prerequisites}

Para utilizar el Datadog Archives destination, debe instalar la [integración de AWS][3] de Datadog para poder configurar [Datadog Log Archives](#configure-log-archives).

## Configurar Log Archives {#configure-log-archives}

Si ya tiene configurado Datadog Log Archives, pase a [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).

{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}

### Configure una política de IAM que permita a los Workers escribir en el bucket de S3 {#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket}

1. Navegue a la [consola de IAM][11].
1. Seleccione **Policies** en el menú del lado izquierdo.
1. Haga clic en **Create policy**.
1. Haga clic en **JSON** en la sección **Specify permissions**.
1. Copie la siguiente política y péguela en el **Policy editor**. Reemplace `<MY_BUCKET_NAME_1>` y `<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>` con la información del bucket de S3 que creó en la sección anterior.
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
1. Haga clic en **Siguiente**.
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

1. Vaya a [Log Forwarding][17] de Datadog.
1. Haga clic en **New archive**.
1. Ingrese un nombre descriptivo para el archivo.
1. Agregue una consulta que filtre todos los registros que pasan por las canalizaciones de registros para que ninguno de esos registros vaya a este archivo. Por ejemplo, agregue la consulta `observability_pipelines_read_only_archive`, asumiendo que ningún registro que pase por la canalización tiene esa etiqueta agregada.
1. Seleccione **AWS S3**.
1. Seleccione la cuenta de AWS en la que se encuentra su bucket.
1. Ingrese el nombre del bucket de S3.
1. Opcionalmente, ingrese una ruta.
1. Marque la declaración de confirmación.
1. Opcionalmente, agregue etiquetas y defina el tamaño máximo de escaneo para la rehidratación. Consulte [Advanced settings][18] para obtener más información.
1. Haga clic en **Guardar**.

Consulte la [documentación de Log Archives][1] para obtener información adicional.

## Configure el destino para su pipeline {#set-up-the-destination-for-your-pipeline}

Configure el Datadog Archives destination cuando [set up an Archive Logs pipeline][4]. Puede configurar un pipeline en la [UI][13], utilizando la [API][14] o con [Terraform][15]. Los pasos en esta sección se configuran en la interfaz de usuario.

Después de seleccionar el Datadog Archives destination en la UI del pipeline:

1. Ingrese el nombre de su bucket de S3. Si configuró Log Archives, es el nombre del bucket que creó anteriormente.
1. Ingrese la región de AWS en la que se encuentra el bucket de S3.
1. Ingrese el prefijo de clave.
    - Los prefijos son útiles para particionar objetos. Por ejemplo, puede usar un prefijo como clave de objeto para almacenar objetos en un directorio particular. Si usa un prefijo para este propósito, debe terminar en `/` para actuar como una ruta de directorio; no se añade automáticamente un `/` al final.
    - Consulte la [sintaxis de plantilla][8] si desea enrutar registros a diferentes claves de objeto según campos específicos en sus registros.
     - **Nota**: Datadog recomienda que comience sus prefijos con el nombre del directorio y sin una barra diagonal inicial (`/`). Por ejemplo, `app-logs/` o `service-logs/`.
1. Seleccione la clase de almacenamiento para su bucket de S3 en el menú desplegable {{< ui >}}Storage Class{{< /ui >}}. Si va a archivar y rehidratar sus registros:
    - **Nota**: La rehidratación solo admite las siguientes [clases de almacenamiento][9]:
        - Estándar
        - Intelligent-Tiering, solo si [los niveles de acceso de archivo asíncrono opcionales][10] están ambos deshabilitados.
        - Standard-IA
        - One Zone-IA
    - Si desea rehidratar desde archivos en otra clase de almacenamiento, primero debe moverlos a una de las clases de almacenamiento admitidas anteriormente.
    - Consulte la sección [Example destination and Log Archives setup](#example-destination-and-log-archive-setup) de esta página para saber cómo configurar su Log Archives según su configuración de destino de Amazon S3.

### Configuración opcional {#optional-settings}

#### Compresión {#compression}

1. En el menú desplegable {{< ui >}}Compression - Algorithm{{< /ui >}}, seleccione el algoritmo de compresión para sus registros archivados ({{< ui >}}gzip{{< /ui >}} o {{< ui >}}zstd{{< /ui >}}).
    - **Nota**: Si no se especifica un algoritmo de compresión, se utiliza gzip con un nivel de compresión de `6`.
1. En el campo {{< ui >}}Compression - Level {{< /ui >}}, debe ingresar un nivel de compresión. Datadog recomienda `6` para gzip y `3` para zstd.

#### Cifrado del lado del servidor {#server-side-encryption}

Seleccione un tipo de cifrado para su bucket de S3 en el menú desplegable {{< ui >}}Server-Side Encryption{{< /ui >}} ({{< ui >}}AWS KMS{{< /ui >}} o {{< ui >}}AES256{{< /ui >}}). Si seleccionó {{< ui >}}AWS KMS{{< /ui >}}, ingrese el ID de la clave de AWS KMS.

#### Autenticación de AWS {#aws-authentication}

Seleccione una opción de autenticación de AWS. Si solo está utilizando el [usuario o rol que creó anteriormente](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) para la autenticación, no seleccione {{< ui >}}Assume role{{< /ui >}}. Seleccione {{< ui >}}Assume role{{< /ui >}} solo si el usuario o rol que creó anteriormente necesita asumir un rol diferente para acceder al recurso de AWS. Los permisos del rol asumido deben estar definidos explícitamente.<br>Si selecciona {{< ui >}}Assume role{{< /ui >}}:
1. Ingrese el ARN del rol de IAM que desea asumir.
    - **Nota:** El [usuario o rol que creó anteriormente](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) debe tener permiso para asumir este rol para que el Worker pueda autenticarse con AWS.
1. (Opcional) Ingrese el nombre de la sesión del rol asumido y el ID externo.

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

### Example destination and Log Archives setup {#example-destination-and-log-archive-setup}

Si ingresa los siguientes valores para su Datadog Archives destination:
- S3 Bucket Name: `test-op-bucket`
- Prefix to apply to all object keys: `op-logs`
- Storage class for the created objects: `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_destination.png" alt="La configuración del Datadog Archives destination con los valores de ejemplo" style="width:40%;" >}}

Entonces estos son los valores que ingresa para configurar el bucket de S3 para Log Archives:

- S3 bucket: `test-op-bucket`
- Path: `op-logs`
- Storage class: `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_archive.png" alt="La configuración de Log Archives con los valores de ejemplo" style="width:70%;" >}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

No hay identificadores de secretos para configurar.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Enrutar registros a Snowflake usando el destino de Datadog Archives {#route-logs-to-snowflake-using-the-datadog-archives-destination}

Puede enrutar registros desde Observability Pipelines a Snowflake usando el destino de Datadog Archives configurando Snowpipe en Snowflake para ingerir automáticamente esos registros. Snowpipe monitorea continuamente su bucket de S3 en busca de archivos nuevos y los ingiere automáticamente en sus tablas de Snowflake, asegurando la disponibilidad de datos casi en tiempo real para análisis o procesamiento adicional. Cuando los registros son recopilados por Observability Pipelines, se escriben en un bucket de S3. Para configurar esto:
1. Configurar [Log Archives](#configure-log-archives).
1. [Set up a pipeline][5] para usar Datadog Archives como destino de registros. Utilice la configuración detallada en [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).
1. Configure Snowpipe en Snowflake. Consulte [Automating Snowpipe for Amazon S3][6] para obtener instrucciones.

## Cómo funciona el destino {#how-the-destination-works}

### AWS Authentication {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### Permisos {#permissions}

El Observability Pipelines Worker requiere estos permisos de política para enviar registros a Amazon S3:

- `s3:ListBucket`
- `s3:PutObject`
- `s3:GetObject`

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Destinations event batching][7] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 100               | 900                 |

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