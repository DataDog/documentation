---
description: Aprenda a configurar el destino de Amazon S3.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Amazon S3.
---
{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="false">}}
El destino de Amazon S3 está en versión preliminar. Comuníquese con su administrador de cuenta para obtener acceso.
{{< /callout >}}

## Descripción general
 {#overview}

Utilice el destino de Amazon S3 para enviar registros en formato JSON o Parquet a Amazon S3. Consulte [Esquema de Parquet generado automáticamente](#automatically-generated-parquet-schema).

También puede [enrutar registros a Snowflake utilizando el destino de Amazon S3](#route-logs-to-snowflake-using-the-amazon-s3-destination).

**Nota**: Si desea enviar registros a un bucket de S3 y posteriormente poder [rehidratarlos][1] para su análisis e investigación en Datadog, utilice el destino [Datadog Archives][2].

## Configure un bucket de Amazon S3
 {#set-up-an-amazon-s3-bucket}

{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}


### Configure una política de IAM que permita a los Workers escribir en el bucket de S3
 {#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket}

1. Navegue a la [consola de IAM][3].
1. Seleccione **Policies** en el menú del lado izquierdo.
1. Haga clic en **Create policy**.
1. Haga clic en **JSON** en la sección **Specify permissions**.
1. Copie la siguiente política y péguela en el **Policy editor**. Reemplace `<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>` con la información del bucket de S3 que creó en la sección anterior.
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "DatadogOPUpload",
                "Effect": "Allow",
                "Action": [
                    "s3:PutObject"
                ],
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>/*"
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

## Configure el destino para su pipeline
 {#set-up-the-destination-for-your-pipeline}

Configure el destino de Amazon S3 cuando [configure un pipeline][11]. Puede configurar un pipeline en la [UI][8], utilizando la [API][9] o con [Terraform][10]. Los pasos en esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de Amazon S3 en la UI del pipeline:

1. Ingrese el nombre de su bucket de S3. Si configuró Log Archives, es el nombre del bucket que creó anteriormente.
1. Ingrese la región de AWS en la que se encuentra el bucket de S3.
1. (Opcional) Ingrese el prefijo de clave.
    - Los prefijos son útiles para particionar objetos. Por ejemplo, puede usar un prefijo como clave de objeto para almacenar objetos en un directorio particular. Si usa un prefijo para este propósito, debe terminar en `/` para actuar como una ruta de directorio; no se añade automáticamente un `/` al final.
      - Consulte la [sintaxis de plantilla][4] si desea enrutar registros a diferentes claves de objeto según campos específicos en sus registros.
    - **Notas**:
        - Datadog recomienda que comience sus prefijos con el nombre del directorio y sin una barra diagonal inicial (`/`). Por ejemplo, `app-logs/` o `service-logs/`.
        - No**utilice** el mismo prefijo de S3 que un destino de [Datadog Archives][2]. El destino de Amazon S3 escribe archivos en un formato diferente y tener ambos tipos de archivo en el mismo prefijo puede provocar problemas de rehidratación.
1. Seleccione la clase de almacenamiento para su bucket de S3 en el menú desplegable {{< ui >}}Storage Class{{< /ui >}}.
1. Seleccione la codificación que desea utilizar en el menú desplegable {{< ui >}}Encoding{{< /ui >}} ({{< ui >}}JSON{{< /ui >}} o {{< ui >}}Parquet{{< /ui >}}).
    - **Nota**: Para {{< ui >}}Parquet{{< /ui >}}, el esquema se genera por lote y puede variar. Consulte [Esquema de Parquet generado automáticamente](#automatically-generated-parquet-schema).
1. Seleccione un algoritmo de compresión en el menú desplegable {{< ui >}}Compression - Algorithm{{< /ui >}}. Si seleccionó:
    - {{< ui >}}Parquet{{< /ui >}}: Datadog recomienda `snappy` o un nivel de compresión bajo si elige `zstd`.
    - {{< ui >}}JSON{{< /ui >}}: Datadog recomienda `gzip`.

### Configuración opcional
 {#optional-settings}

#### Procesamiento por lotes
 {#batching}

1. Ingrese un tamaño máximo de procesamiento por lotes y seleccione la unidad ({{< ui >}}MB{{< /ui >}} o {{< ui >}}GB{{< /ui >}}) en el menú desplegable. Si no se configura, el valor predeterminado es `100` MB.
1. Ingrese un tiempo de espera de procesamiento por lotes en segundos. Si no se configura, el valor predeterminado es `900` segundos.

#### Cifrado del lado del servidor
 {#server-side-encryption}

1. Seleccione un tipo de cifrado para su bucket de S3 en el menú desplegable {{< ui >}}Server-Side Encryption{{< /ui >}}: {{< ui >}}AWS KMS{{< /ui >}} o {{< ui >}}AES256{{< /ui >}}.
1. Si seleccionó {{< ui >}}AWS KMS{{< /ui >}}, ingrese el ID de clave de AWS KMS.

#### Autenticación de AWS
 {#aws-authentication}

Seleccione una opción de autenticación de AWS. Si solo está utilizando el [usuario o rol que creó anteriormente](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) para la autenticación, no seleccione {{< ui >}}Assume role{{< /ui >}}. Seleccione {{< ui >}}Assume role{{< /ui >}} solo si el usuario o rol que creó anteriormente necesita asumir un rol diferente para acceder al recurso de AWS. Los permisos del rol asumido deben estar definidos explícitamente.<br>Si selecciona {{< ui >}}Assume role{{< /ui >}}:
1. Ingrese el ARN del rol de IAM que desea asumir.
    - **Nota:** El [usuario o rol que creó anteriormente](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) debe tener permiso para asumir este rol para que el Worker pueda autenticarse con AWS.
1. (Opcional) Ingrese el nombre de la sesión del rol asumido y el ID externo.

#### Almacenamiento en búfer
 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de secretos
 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

No hay identificadores de secretos para configurar.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Enrute registros a Snowflake utilizando el destino de Amazon S3
 {#route-logs-to-snowflake-using-the-amazon-s3-destination}

Puede enrutar registros desde Observability Pipelines a Snowflake utilizando el destino de Amazon S3 mediante la configuración de Snowpipe en Snowflake para ingerir esos registros automáticamente. Snowpipe monitorea continuamente su bucket de S3 en busca de archivos nuevos y los ingiere automáticamente en sus tablas de Snowflake, asegurando la disponibilidad de datos casi en tiempo real para análisis o procesamiento adicional. Cuando los registros son recopilados por Observability Pipelines, se escriben en un bucket de S3. Para configurar esto:
1. [Configure un pipeline][5] para usar Amazon S3 como destino de registros. Utilice la configuración detallada en [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).
1. Configure Snowpipe en Snowflake. Consulte [Automating Snowpipe for Amazon S3][6] para obtener instrucciones.

## Métricas
 {#health-metrics}

Para [métricas de componentes][12] y [métricas de búfer de destino][13] emitidas por todos los destinos, consulte la documentación de [Métricas de uso de Pipelines][14]. Para filtrar o agrupar por métricas de destino de Amazon S3, utilice la etiqueta `component_type:amazon_s3_generic`.

## Cómo funciona el destino
 {#how-the-destination-works}

### Autenticación de AWS
 {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### Permisos
 {#permissions}

El Observability Pipelines Worker requiere estos permisos de política para enviar registros a Amazon S3:

- `s3:PutObject`

### Esquema de Parquet generado automáticamente
 {#automatically-generated-parquet-schema}

El Observability Pipelines Worker recopila un lote de eventos, genera un esquema para esos eventos y luego vacía el lote en S3. El esquema puede variar entre lotes porque se basa únicamente en el lote actual de eventos.

### Procesamiento por lotes de eventos
 {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Destinations event batching][7] para obtener más información.

| Máx. de eventos     | Máx. de bytes       | Tiempo de espera (segundos)   |
|----------------| ----------------| --------------------|
| Ninguno           | 100,000,000     | 900                 |

[1]: /es/logs/log_configuration/rehydrating/

[2]: /es/observability_pipelines/destinations/datadog_archives/

[3]: https://console.aws.amazon.com/iam/

[4]: /es/observability_pipelines/destinations/#template-syntax

[5]: /es/observability_pipelines/configuration/set_up_pipelines/

[6]: https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3

[7]: /es/observability_pipelines/destinations/#event-batching

[8]: https://app.datadoghq.com/observability-pipelines

[9]: /es/api/latest/observability-pipelines/

[10]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline

[11]: /es/observability_pipelines/configuration/set_up_pipelines/

[12]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics

[13]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics

[14]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/