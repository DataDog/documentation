---
aliases:
- /es/observability_pipelines/guide/ingest_aws_s3_logs_with_the_observability_pipelines_worker/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: Documentación
  text: Trabajar con datos utilizando Observability Pipelines
- link: /observability_pipelines/legacy/configurations/
  tag: Documentación
  text: Más información sobre las configuraciones de Observability Pipelines
title: (LEGACY) Ingesta de logs de Amazon S3 con Observability Pipelines Worker
---

## Información general

El [Observability Pipelines Worker][1] puede ingerir logs de muchas fuentes diferentes. Si tienes un bucket de Amazon S3 que recibe logs de un sistema externo, como AWS CloudTrail o CloudWatch, puedes configurar el Worker para ingerir esos logs. La configuración utiliza la fuente Amazon S3 de Observability Pipelines Worker, que requiere configurar una cola Amazon SQS para recibir notificaciones de eventos del bucket S3. La notificación de eventos informa entonces al Worker para que recopile los nuevos eventos de logs en el bucket S3. 

En esta guía se te explican los siguientes pasos:

1. [Crear un tema de Amazon SQS para recibir notificaciones de eventos S3](#create-an-amazon-sqs-topic-to-receive-s3-notifications)
2. [Habilitar notificaciones de eventos en el bucket S3](#enable-event-notifications-on-the-s3-bucket)
3. [Crear un rol IAM para proporcionar al Worker sólo los permisos necesarios](#create-an-iam-role-for-the-worker)
4. [Configurar el Worker para recibir notificaciones de la cola de SQS y recopilar logs del bucket S3](#Configure-the-worker-to-receive-notifications-from-the-sqs-queue)
5. [Configurar el Worker para separar eventos de logs S3 por lotes ](#Configure-the-worker-to-separate-out-batched-aws-s3-log-events)

## Requisitos previos
- Has [instalado][2] y [configurado][3] el Observability Pipelines Worker para recopilar datos de tus fuentes y dirigirlos a tus destinos.
- Estás familiarizado con [los aspectos básicos de la configuración de Observability Pipelines][3].

## Crear un tema de Amazon SQS para recibir notificaciones S3

En la consola de Amazon SQS, aprovisiona una nueva cola específica para esta configuración. De este modo, los cambios que realices en ella se mantendrán separados de cualquier otra herramienta de análisis de logs que estés utilizando.

1. Ve a la [consola de Amazon SQS][4].
2. Haz clic en **Crear cola** para aprovisionar una nueva cola específica para esta configuración.
3. Introduce un nombre para la cola.
4. En la sección **Política de acceso**, haz clic en el botón **Avanzado**.
5. Copia y pega el siguiente objeto JSON de ejemplo en la sección de la política de acceso avanzado. Configura la cola y permite que el bucket S3 envíe notificaciones de eventos. Sustituye `${REGION}`, `${AWS_ACCOUNT_ID}`, `${QUEUE_NAME}` y `${BUCKET_NAME}` por la información de la cuenta AWS correspondiente, el nombre de la cola y el nombre del bucket que acabas de introducir.
{{< code-block lang="json">}}
  {
  "Versión": "17-10-2008",
  "Id": "__default_policy_ID",
  "Declaración": [
    {
      "Efecto": "Permitir",
      "Principal": {
        "Servicio": " s3.amazonaws.com "
      },
      "Acción": "SQS:SendMessage",
      "Recurso": "arn:aws:sqs:${REGION}:${AWS_ACCOUNT_ID}:${QUEUE_NAME}",
      "Condición": {
        "StringEquals": {
          "aws:SourceAccount": "${AWS_ACCOUNT_ID}"
        },
        "StringLike": {
          "aws:SourceArn": "arn:aws:s3:*:*:${BUCKET_NAME}"
        }
      }
    }
  ]
  }
{{< /code-block >}}
6. Deja las demás opciones de cola como predeterminadas.
7. Haz clic en **Crear cola**.

## Habilitar notificaciones de eventos en el bucket S3

1. En la [consola de Amazon S3][5], ve al bucket de S3 que está recopilando los logs que deseas que ingiera el Worker.
2. Haz clic en la pestaña **Propiedades**.
3. Ve a la sección **Notificaciones de eventos** y haz clic en **Crear una notificación de evento**.
4. Introduce un nombre para el evento.
5. En la sección **Tipos de eventos**, haz clic en **Todos eventos de creación de objetos**. El Worker sólo responde a los eventos de creación de objetos por lo que son los únicos eventos a los que necesitas suscribirte.
6. En la sección **Destino**, selecciona **Cola SQS** y, a continuación, elige la cola SQS que creaste anteriormente.
7. Haz clic en **Guardar cambios**.

La cola SQS debería estar ahora recibiendo mensajes para que procese el Worker.

Si te encuentras con el error "Imposible validar las siguientes configuraciones de destino", check que la política de acceso SQS esté configurada correctamente.

## Crear un rol IAM para el Worker

Crea un rol IAM independiente para el Worker, de modo que sólo se proporcionen los permisos necesarios.

1. Ve a la [consola de AWS IAM][6].
2. En el panel de navegación, haz clic en **Roles**.
3. Haz clic en **Crear rol**.
4. Selecciona el tipo de entidad de confianza al que está vinculado el rol. 
5. Haz clic en **Next** (Siguiente).
6. Haz clic en **Create policy** (Crear política).
7. Haz clic en la pestaña **JSON**. Copia y pega los permisos mínimos que deben vincularse al rol:
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "sqs:DeleteMessage",
                  "s3:GetObject",
                  "sqs:ReceiveMessage",
                  "s3:ListBucket"
              ],
              "Resource": [
                  "arn:aws:s3:::${BUCKET_NAME}/*",
                  "arn:aws:s3:::${BUCKET_NAME}",
                  "arn:aws:sqs:${REGION}:${ACCOUNT_ID}:${QUEUE_NAME}"
              ]
          }
      ]
    }
    ```
8. Sustituye `${REGION`}, `${AWS_ACCOUNT_ID}`, `${QUEUE_NAME}` y `${BUCKET_NAME}` por la información relevante de la cuenta AWS y los nombres de la cola y del bucket que estés utilizando. Deberás modificar los permisos del rol si deseas que el rol se pueda vincular a instancias EC2, que pueda ser asumido por usuarios, etc.
9. Haz clic en **Siguiente: Etiquetas (tags)**. Opcionalmente, añade etiquetas (tags).
10. Haz clic en **Siguiente: Revisar**.
11. Introduce un nombre para la política.
12. Haz clic en **Create policy** (Crear política).

Aplica el rol al proceso de Observability Pipelines en ejecución. Puedes hacerlo vinculando el rol a una instancia EC2 o asumiendo un rol de un perfil de usuario determinado.

## Configurar el Worker para recibir notificaciones de la cola SQS

1. Utiliza el siguiente ejemplo de configuración de fuente para configurar el Worker para:  
      a. Recibir notificaciones de eventos SQS.   
      b. Leer los logs asociados en el bucket S3.  
      c. Emitir los logs a la consola.
    ```yaml
        sources:
          cloudtrail:
            type: aws_s3
            region: ${REGION}
            sqs:
              queue_url: ${SQS_URL}
      ```
2. Sustituye `${REGION}` por la región de la cuenta AWS. Sustituye `${SQS_URL}` por la URL HTTP proporcionada en la sección **Detalles** de la cola SQS en la consola.

Consulta la [Documentación de fuentes de Amazon S3][7] para obtener más opciones.

Con la fuente de Amazon S3 configurada, ahora puedes añadir [transformaciones][8] para manipular los datos y [receptores][9] para enviar logs a destinos basados en tu caso de uso. Consulta [Configuraciones][3] para obtener más información sobre fuentes, transformaciones y receptores. 

## Configurar el Worker para separar eventos de logs de Amazon S3 por lotes


La mayoría de los servicios (por ejemplo, CloudTrail) envía logs a S3 por lotes, lo que significa que cada evento que recibe el Worker está compuesto de varios logs. En el siguiente ejemplo, `Records` hay una matriz de tres eventos de logs por lotes juntos.

```json
{
  "Records": [
    {
      "log event 1": "xxxx"
    },
    {
      "log event 2": "xxxx"
    },
    {
      "log event 3": "xxxx"
    }
  ]
}
```

Añade las siguientes transformaciones `explode` y `map` para separar los eventos de logs por lotes en eventos individuales para el procesamiento correcto de los receptores:

```json
transforms:
 explode:
   type: remap
   inputs:
     - cloudtrail
   source: |-
     .message = parse_json!(.message)
     . = unnest!(.message.Records)

 map:
   type: remap
   inputs:
     - explode
   source: |-
     merge!(., .message.Records)
     del(.message)
```

En este ejemplo, la función `parse_json` analiza la cadena en JSON.

La función `unnest` separa los eventos de logs por lotes en una matriz de eventos de logs individuales.

```
[
   {"Records": {"log event 1": "xxx"}},
   {"Records": {"log event 2": "xxx"}},
   {"Records": {"log event 3": "xxx"}}
]
```

A continuación, la función `merge` contrae los datos de `.Records` al nivel superior, de modo que cada evento de logs sea una línea de logs individual. La función `del` elimina el campo externo.

```
{"log event 1": "xxx"}
```
```
{"log event 2": "xxx"}
```
```
{"log event 3": "xxx"}
```

### Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/legacy/#observability-pipelines-worker
[2]: /es/observability_pipelines/legacy/setup/
[3]: /es/observability_pipelines/legacy/configurations/
[4]: https://console.aws.amazon.com/sqs/home
[5]: https://console.aws.amazon.com/s3/
[6]: https://console.aws.amazon.com/iam/
[7]: /es/observability_pipelines/legacy/reference/sources/#awss3
[8]: /es/observability_pipelines/legacy/reference/transforms/
[9]: /es/observability_pipelines/legacy/reference/sinks/