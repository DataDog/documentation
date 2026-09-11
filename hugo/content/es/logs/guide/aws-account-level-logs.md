---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
title: Suscripciones a logs a nivel de la cuenta de AWS
---

## Información general

Puedes utilizar suscripciones a logs a nivel de una cuenta en tu entorno AWS para reenviar automáticamente todos tus logs de CloudWatch Logs a Datadog. Con una suscripción a logs a nivel de cuenta, no necesitas configurar manualmente el reenvío de logs cuando tienes una nueva fuente de logs o cuando AWS publica un nuevo servicio. También puedes definir tus propios criterios de selección o patrón de filtrado para tener más control sobre los logs que se reenvían.

## Crear una suscripción a logs a nivel de una cuenta

Existen dos formas de crear una suscripción a logs a nivel de una cuenta: a través de [CloudFormation](#cloudformation-recommended) y a través de la [configuración manual](#manual). Para una configuración más sencilla, utiliza CloudFormation para crear una Amazon Data Firehose y los recursos asociados en cada una de las regiones seleccionadas.

### CloudFormation (recomendado)

1. Copia la URL de la plantilla de CloudFormation:

{{< code-block lang="bash" filename="" disable_copy="false" >}}
https://datadog-cloudformation-template.s3.amazonaws.com/aws_account_level_logs/main.yaml
{{< /code-block >}}

2. Ve a [CloudFormation][1] en la consola de AWS.
3. Haz clic en **Create stack* (Crear stack tecnológico).
    - Selecciona `With new resources (standard)`.
4. Deja marcadas las opciones de **Elegir una plantilla existente** y **URL de Amazon S3**.
5. En el campo **URL de Amazon S3**, pega la URL de la plantilla de CloudFormation.
6. Haz clic en **Next** (Siguiente).
7. En el campo **Nombre del stack tecnológico**, indica un nombre descriptivo como `datadog-account-level-logs-stack`.
8. En el campo **ApiKey**, pega un valor válido de [clave de API de Datadog][4].
9. En el campo **Regiones**, introduce una lista separada por comas de los códigos de región AWS (por ejemplo, `us-east-1`), correspondiente a las regiones que se incluirán para la suscripción a logs a nivel de una cuenta.
10. En el campo **DatadogHttpEndpointUrl**, selecciona la URL correspondiente a tu [sitio Datadog][5].
11. Haz clic en **Next** (Siguiente).
12. Configura opciones de stack tecnológico adicionales, según prefieras.
13. Haz clic en **Next** (Siguiente).
14. Revisa las opciones de stack tecnológico y haz clic en la casilla que indica `Reconozco que AWS CloudFormation podría crear recursos IAM con nombres personalizados`.
15. Haz clic en **Submit** (Enviar).

### Manual

{{< tabs >}}
{{% tab "Lambda Forwarder" %}}

1. Si aún no lo has hecho, configura la función Lambda del [Datadog Forwarder][101].
2. Utiliza la [CLI AWS][102] para conceder a CloudWatch Logs el permiso para ejecutar tu función.
   - Sustituye `<REGION>` por la región que contiene tu función Lambda del Datadog Forwarder.
   - Sustituye `<ACCOUNT_ID>` por tu ID de cuenta de 12 dígitos de AWS (sin guiones).

```bash
aws lambda add-permission \
  --region "<REGION>" \
    --function-name "forwarder-function" \
    --statement-id "forwarder-function" \
    --principal "logs.amazonaws.com" \
    --action "lambda:InvokeFunction" \
    --source-arn "arn:aws:logs:<REGION>:<ACCOUNT_ID>:log-group:*" \
    --source-account "<ACCOUNT_ID>"
```

3. Crea una política de filtrado de suscripciones a nivel de la cuenta. En el ejemplo que se muestra a continuación, se transmiten todos los eventos de logs que contienen la cadena `ERROR`, excepto aquellos de los grupos de logs denominados `LogGroupToExclude1` y `LogGroupToExclude2`.
   - Sustituye `FORWARDER_ARN` por el ARN de la función Lambda del Datadog Forwarder.

```bash
aws logs put-account-policy \
  --policy-name "ExamplePolicyLambda" \
  --policy-type "SUBSCRIPTION_FILTER_POLICY" \
  --policy-document '{"DestinationArn":"<FORWARDER_ARN>", "FilterPattern": "", "Distribution": "Random"}' \
  --scope "ALL"
```

**Nota**: Para excluir ciertos grupos de logs del reenvío de logs, utiliza la opción `--selection-criteria` tal y como se indica en la [referencia del comando][103].

[101]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[102]: https://aws.amazon.com/cli/
[103]: https://docs.aws.amazon.com/cli/latest/reference/logs/put-account-policy.html
{{% /tab %}}
{{% tab "Amazon Data Firehose" %}}

#### Crear un bucket de S3 y un rol para Amazon Data Firehose

Los siguientes pasos te guiarán en la creación de un bucket y un rol IAM. Esta función concede a Amazon Data Firehose permiso para colocar datos en tu bucket de Amazon S3 en caso de fallos de entrega.

1. Utiliza la [CLI AWS][201] para crear un bucket de S3. También puedes utilizar un bucket existente.
   - Sustituye `<BUCKET_NAME>` por el nombre de tu bucket de S3.
   - Sustituye `<REGION>` por la región de tu bucket de S3.

```
aws s3api create-bucket \
  --bucket MY-BUCKET \
  --create-bucket-configuration LocationConstraint=<REGION>
```

2. Crea un archivo `TrustPolicyForFirehose.json` con la siguiente sentencia:

```bash
{
  "Statement": {
    "Effect": "Allow",
    "Principal": { "Service": "firehose.amazonaws.com" },
    "Action": "sts:AssumeRole"
    } 
}
```

3. Crea un rol IAM, especificando el archivo de la política de confianza:
   **Nota**: El valor **Role.Arn** devuelto se utiliza en un paso posterior.

```bash
aws iam create-role \
  --role-name FirehosetoS3Role \
  --assume-role-policy-document file://./TrustPolicyForFirehose.json
```

4. Crea un archivo `PermissionsForFirehose.json` con la siguiente sentencia:
   - Sustituye `<BUCKET_NAME>` por el nombre de tu bucket de S3.

```bash
{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [ 
          "s3:AbortMultipartUpload", 
          "s3:GetBucketLocation", 
          "s3:GetObject", 
          "s3:ListBucket", 
          "s3:ListBucketMultipartUploads", 
          "s3:PutObject" ],
      "Resource": [ 
          "arn:aws:s3:::<BUCKET_NAME>", 
          "arn:aws:s3:::<BUCKET_NAME>/*" ]
    }
  ]
}
```
5. Asocia la política de permisos al rol:

```bash
aws iam put-role-policy \
  --role-name FirehosetoS3Role \
  --policy-name Permissions-Policy-For-Firehose \
  --policy-document file://./PermissionsForFirehose.json
```

#### Crear el flujo (stream) de entrega de Amazon Data Firehose

Los siguientes pasos te guiarán en la creación y configuración de un flujo de entrega de Amazon Data Firehose.

1. Ve a [Amazon Data Firehose][202] en la consola de AWS.
2. Haz clic en **Create Firehose stream** (Crear flujo de Firehose).
3. En el campo **Fuente**, selecciona la fuente de tus logs:
   - Selecciona `Amazon Kinesis Data Streams` si tus logs provienen de un flujo de datos de Kinesis.
   - Selecciona `Direct PUT` si tus logs provienen directamente de un grupo de CloudWatch Logs.
4. En el campo **Destino**, selecciona `Datadog`.
5. Si tu **Fuente** es `Amazon Kinesis Data Streams`, selecciona tu flujo de datos de Kinesis en **Parámetros de la fuente**.
6. Si lo prefieres, puedes darle un nombre descriptivo al flujo de Firehose.
7. En la sección **Configuración del destino**, elige la URL del endpoint HTTP de los logs de Datadog correspondiente a tu [sitio Datadog][203].
8. Para la **Autenticación**, se necesita una [clave de API Datadog][204] válida. Puedes:
     - Seleccionar **Utilizar clave de API** y pegar el valor de la clave en el campo **Clave de API**.
     - Selecciona **Utilizar AWS Secrets Manager** y elige un secreto que contenga el valor válido de tu clave de API Datadog en el desplegable **Nombre del secreto**.
9. Para la **Codificación del contenido**, selecciona `GZIP`.
10. También puedes configurar la **Duración del reintento**, los parámetros de buffer o añadir **Parámetros** (que se adjuntan como etiquetas (tags) a tus logs).  
    **Nota**: Datadog recomienda configurar el **Tamaño de buffer** en `2` MiB, si los logs son mensajes de una sola línea.
11. En la sección **Parámetros de la copia de seguridad**, selecciona el bucket de S3 para recibir cualquier evento fallido que supere la duración del reintento.
    **Nota**: Para asegurarte de que cualquier log que no pueda ser entregado por el flujo de entrega se envíe eventualmente a Datadog, configura la función Lambda del Datadog Forwarder para [reenviar logs desde este bucket de S3][205].
12. Haz clic en **Create Firehose stream** (Crear flujo de Firehose).

#### Crear rol para CloudWatch Logs

Los siguientes pasos te guiarán en la creación de un rol IAM para CloudWatch Logs. Este rol otorga a CloudWatch Logs permiso para colocar datos en tu flujo de entrega de Firehose.

1. Crea un archivo `./TrustPolicyForCWL.json` con la siguiente sentencia:
   - Sustituye `<ACCOUNT_ID>` por tu ID de cuenta de 12 dígitos de AWS (sin guiones).
   - Sustituye `<REGION>` por la región de tu CloudWatch Logs.

```bash
{
  "Statement": {
    "Effect": "Allow",
    "Principal": { "Service": "logs.amazonaws.com" },
    "Action": "sts:AssumeRole",
    "Condition": { 
         "StringLike": { 
             "aws:SourceArn": "arn:aws:logs:<REGION>:<ACCOUNT_ID>:*"
         } 
     }
  }
}
```
2. Crea un rol IAM, especificando el archivo de la política de confianza:

```bash
aws iam create-role \
  --role-name CWLtoKinesisFirehoseRole \
  --assume-role-policy-document file://./TrustPolicyForCWL.json
```
**Nota**: El valor **Role.Arn** devuelto se utiliza en un paso posterior.

3. Crea un archivo `./PermissionsForCWL.json` con la siguiente sentencia:
   - Sustituye `<REGION>` por la región que contiene tu función Lambda del Datadog Forwarder.
   - Sustituye `<ACCOUNT_ID>` por tu ID de cuenta de 12 dígitos de AWS (sin guiones).
   - Sustituye `<DELIVERY_STREAM_NAME>` por el nombre de tu flujo de entrega.

```bash
{
    "Statement":[
      {
        "Effect":"Allow",
        "Action":["firehose:PutRecord"],
        "Resource":[
            "arn:aws:firehose:<REGION>:<ACCOUNT_ID>:deliverystream/<DELIVERY_STREAM_NAME>"]
      }
    ]
}
```

4. Asocia la política de permisos al rol:

```bash
aws iam put-role-policy \
  --role-name CWLtoKinesisFirehoseRole \
  --policy-name Permissions-Policy-For-CWL \
  --policy-document file://./PermissionsForCWL.json
```

#### Crear la política de filtrado de suscripciones a nivel de una cuenta de CloudWatch Logs

Antes de completar este paso, el flujo de entrega de Amazon Data Firehose debe estar en el estado `Active`.

1. Crea la política de filtrado de suscripciones a nivel de una cuenta de CloudWatch Logs. La política inicia inmediatamente el flujo de datos de logs en tiempo real, desde el grupo de logs elegido a tu flujo de entrega de Amazon Data Firehose:
   - Sustituye `<POLICY_NAME>` por un nombre para la política de filtrado de suscripciones.
   - Sustituye `<CLOUDWATCH_LOGS_ROLE>` por el ARN del rol de CloudWatch Logs.
   - Sustituye `<DELIVERY_STREAM_ARN>` por el ARN del flujo de entrega de Amazon Data Firehose.

```bash
aws logs put-account-policy \
    --policy-name "<POLICY_NAME>" \
    --policy-type "SUBSCRIPTION_FILTER_POLICY" \
    --policy-document '{"RoleArn":"<CLOUDWATCH_LOGS_ROLE>", "DestinationArn":"<DELIVERY_STREAM_ARN>", "FilterPattern": "", "Distribution": "Random"}' \
    --scope "ALL"
```

**Nota**: Para excluir ciertos grupos de logs del reenvío de logs, utiliza la opción `--selection-criteria` tal y como se indica en la [referencia del comando][206].

[201]: https://aws.amazon.com/cli/
[202]: https://console.aws.amazon.com/firehose/home
[203]: /es/getting_started/site/
[204]: https://app.datadoghq.com/organization-settings/api-keys
[205]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[206]: https://docs.aws.amazon.com/cli/latest/reference/logs/put-account-policy.html
{{% /tab %}}
{{< /tabs >}}

### Validación

Ve al [Explorador de logs][2] e introduce la consulta de búsqueda `@aws.firehose.arn:"<FIREHOSE_ARN>"` para ver los logs reenviados por Amazon Data Firehose.
   - Sustituye `<FIREHOSE_ARN>` por el ARN del [Firehose][3] de transmisión de logs.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudformation/home
[2]: https://app.datadoghq.com/logs
[3]: https://console.aws.amazon.com/firehose/home
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /es/getting_started/site/