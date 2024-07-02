---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de los logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-data-firehose-and-datadog/
  tag: Blog
  text: Envía los logs del flujo de Amazon VPC a Amazon Kinesis Data Firehose y Datadog
kind: documentación
title: Enviar logs de servicios de AWS con el destino Datadog Amazon Data Firehose
---

## Información general

Puede reenviar tus logs de servicio de AWS almacenados en grupos de CloudWatch Log a un Amazon Kinesis Data Stream, para su posterior entrega a través de Amazon Data Firehose a uno o varios destinos. Datadog es uno de los destinos predeterminados para las transmisiones de entrega de Amazon Data Firehose.

AWS administra completamente Amazon Data Firehose, por lo que no necesitas mantener ninguna infraestructura adicional ni reenviar configuraciones para transmitir logs. Puedes configurar un flujo (stream) de entrega de Amazon Data Firehose en la consola de AWS Firehose o configurar automáticamente el destino mediante una plantilla de CloudFormation.

## Configuración

{{< tabs >}}
{{% tab "Amazon Data Firehose Delivery stream" %}}

Datadog recomienda utilizar un Kinesis Data Stream como entrada al utilizar el destino de Datadog con Amazon Data Firehose. Te ofrece la posibilidad de reenviar tus logs a varios destinos, en caso de que Datadog no sea el único consumidor de esos logs. Si Datadog es el único destino para tus logs, o si ya tienes un Kinesis Data Stream con tus logs, puedes ignorar el paso uno.

1. Opcionalmente, utiliza la sección [Crear un flujo de datos][1] de la guía para desarrolladores de Amazon Kinesis Data Streams en AWS para crear un nuevo flujo de datos de Kinesis. Nombra el flujo de forma descriptiva, como `DatadogLogStream`.
2. Ve a [Amazon Data Firehose][2].
3. Haz clic en **Create Firehose stream** (Crear flujo de Firehose).
   a. Establece la fuente:
      - `Amazon Kinesis Data Streams` si tus logs provienen de un Kinesis Data Stream
      - `Direct PUT` si tus logs proceden directamente de un grupo de log de CloudWatch

   b. Establece el destino como `Datadog`.
   c. Indica un nombre para el flujo de entrega.
   d. En **Destination settings** (Configuración del destino), elige la URL del endpoint HTTP de `Datadog logs` que corresponda a tu [sitio de Datadog][5].
   e. Pega tu clave de API en el campo **API key** (Clave de API). Puedes obtener o crear una clave de API en la [página claves de API de Datadog][3].
   f. Opcionalmente, configura *Retry duration** (Duración de los reintentos), los ajustes de buffer, o añade **Parameters** (Parámetros), que se adjuntan como etiquetas a tus logs.  
   **Nota**: Datadog recomienda establecer el **Buffer size** (Tamaño de buffer) en `2 MiB` si los logs son mensajes de una sola línea.
   g. En **Backup settings** (Configuración de copia de seguridad), selecciona un bucket de copia de seguridad de S3 para recibir cualquier evento fallido que supere la duración de los reintentos.
     **Nota**: Para asegurarte de que cualquier log que falle a través del flujo de entrega todavía se envía a Datadog, establece la función de Lambda Datadog Forwarder en [forward logs][4] (reenviar logs) desde este bucket de S3.
   h. Haz clic en **Create Firehose stream** (Crear flujo de Firehose).

[1]: https://docs.aws.amazon.com/streams/latest/dev/tutorial-stock-data-kplkcl-create-stream.html
[2]: https://console.aws.amazon.com/firehose/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[5]: /es/getting_started/site/
{{% /tab %}}

{{% tab "CloudFormation template" %}}

Personaliza la [plantilla completa de Kinesis CloudFormation][1] e instálala desde la consola de AWS.

[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## Envía logs de AWS a tu flujo de Firehose

CloudWatch Logs necesita permiso para poner datos en tu flujo de entrega de Kinesis Data Stream o Amazon Data Firehose, según el enfoque que estés utilizando. [Crea un rol y política de IAM](#create-an-iam-role-and-policy). A continuación, suscribe tu nuevo flujo de Kinesis o flujo de entrega de Amazon Data Firehose a los grupos de log de CloudWatch que desees ingestar en Datadog. Las suscripciones pueden crearse a través de la [consola de AWS](#console) o la [CLI](#cli).  
   **Nota**: Cada grupo de CloudWatch Log solo puede tener dos suscripciones.

### Crear un rol y política de IAM

Crea un rol de IAM y una política de permisos para permitir que CloudWatch Logs introduzca datos en tu flujo de Kinesis.
  1. Asegúrate de que `logs.amazonaws.com` o `logs.<region>.amazonaws.com` está configurado como la entidad principal del servicio en las **Relaciones de confianza** del rol. Por ejemplo:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Effect": "Allow",
      "Principal": {
        "Service": "logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
  2. Asegúrate de que la política de permisos adjuntos del rol permita las acciones `firehose:PutRecord` `firehose:PutRecordBatch` , `kinesis:PutRecord` y `kinesis:PutRecords`. Si estás utilizando un Kinesis Data Stream, especifica tu ARN en el campo **Resource** (Recurso). Si **no** utilizas Kinesis Data Stream, especifica el ARN de tu flujo de Amazon Data Firehose en el campo **Resource** (Recurso).
  Por ejemplo:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "firehose:PutRecord",
        "firehose:PutRecordBatch",
        "kinesis:PutRecord",
        "kinesis:PutRecords"
      ],
      "Resource": "arn:aws:kinesis:<REGION>:<ACCOUNT_ID>:stream/<DELIVERY_STREAM>
    }
  ]
}
```
Utiliza el ejemplo [Filtros de suscripción con Kinesis Data Streams][2] (pasos 3 a 6) para ver un ejemplo de configuración con la CLI de AWS.

### Crear un filtro de suscripción

#### Interfaz de línea de comandos (CLI)

El siguiente ejemplo crea un filtro de suscripción a través de la CLI de AWS:

```
  aws logs put-subscription-filter \
    --log-group-name "<MYLOGGROUPNAME>" \
    --filter-name "<MyFilterName>" \
    --filter-pattern "" \
    --destination-arn "<DESTINATIONARN> (data stream or delivery stream)" \
    --role-arn "<MYROLEARN>"
```

#### Consola

Sigue estos pasos para crear un filtro de suscripción a través de la consola de AWS.

1. Ve a tu grupo de log en [CloudWatch][1] y haz clic en la pestaña **Subscription filters** (Filtros de suscripción), luego en **Create** (Crear).
   - Si envías logs a través de un Kinesis Data Stream, selecciona `Create Kinesis subscription filter`.
   - Si vas a enviar logs directamente desde tu grupo de log a tu flujo de entrega de Amazon Data Firehose, selecciona `Create Amazon Data Firehose subscription filter`.

2. Selecciona el flujo de datos o el flujo de entrega de Firehose según corresponda, así como el [rol de IAM](#create-an-iam-role-and-policy) creado previamente.

3. Introduce un nombre para el filtro de suscripción y haz clic en **Start streaming** (Iniciar transmisión).

**Nota importante**: El destino del filtro de suscripción debe estar en la misma cuenta que el grupo de log, tal y como se describe en la [Referencia de la API de Amazon CloudWatch Logs][3].

### Validación

Comprueba la pestaña **Subscription filters** (Filtros de suscripción) de la página de detalles de tu grupo de log en [CloudWatch][1] para confirmar que el nuevo flujo de Kinesis o flujo de Amazon Data Firehose está suscrito a tu grupo de log.

### Encuentra tus logs en Datadog

Una vez configurado el flujo de entrega de Amazon Data Firehose, puedes analizar los logs suscritos a tu flujo de entrega en Datadog.

Para rellenar todos los logs por ARN:

1. Ve al [Log Explorer][5] en Datadog.
2. En la barra de búsqueda, escribe `@aws.firehose.arn:"<ARN>"`, sustituye `<ARN>` por tu ARN de Amazon Data Firehose y pulsa **Enter** (Intro) para ver todos tus logs suscritos.

**Nota**: Una sola carga útil de Kinesis no debe superar los 65.000 mensajes de log. Los mensajes de log que superen ese límite se descartarán.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
[5]: /es/logs/explorer/