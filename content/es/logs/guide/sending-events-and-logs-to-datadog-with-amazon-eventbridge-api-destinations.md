---
further_reading:
- link: https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog
  tag: Blog
  text: Blog de AWS con ejemplos de uso de destinos de API
kind: guía
title: Envío de eventos y logs a Datadog con destinos de API de Amazon EventBridge
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">El sitio Datadog para el gobierno no es compatible con Amazon EventBridge.</div>
{{< /site-region >}}

Amazon EventBridge es un bus de eventos serverless que te permite crear aplicaciones basadas en eventos. EventBridge puede integrarse con tus servicios AWS, pero la función de destinos de API te permite enviar y recibir datos fuera de AWS utilizando las API. En esta guía se indican los pasos necesarios para enviar tus eventos y logs desde EventBridge a Datadog. Para obtener más información sobre el envío de tus eventos desde Datadog a EventBridge, consulta la [documentación de la integración EventBridge][1].

## Configuración

Antes de empezar, necesitas una [cuenta Datadog][2] con [una clave de API][3] y también necesitas acceso a [destinos de API Amazon Eventbridge][4].

### Configuración

1. Para añadir Datadog como destino API, sigue los pasos indicados en la [documentación de Amazon Crear un destino de API[5].
    - Utiliza la autorización de clave de API, con `DD-API-KEY` como nombre de tu clave y tu [clave de API Datadog][3] como valor.
    - Para tu endpoint de destino, utiliza `https://{{< region-param key="http_endpoint" code="true" >}}/api/v2/logs` para logs y `https://api.{{< region-param key="dd_site" code="true" >}}/api/v1/events` para eventos, y configura `POST` como método HTTP. Para obtener más información sobre las diferencias entre logs y eventos, consulta [Reducir los riesgos relacionados con los datos][8].
    - Si utiliza el endpoint de eventos, debes incluir `title` y `text` como parámetros `body.field` en la conexión del destino de la API. Estos son los valores necesarios para `POST` al endpoint de eventos. Para obtener más información, consulta la documentación [Publicar un evento][9].
2. Una vez configurado el destino, consulta la documentación de Amazon para [crear una regla EventBridge][10], donde configuras Datadog como tu destino.
3. Una vez configurada la regla con Datadog como destino, activa un evento publicando un evento para EventBridge. Para obtener más información sobre cómo enviar eventos a EventBridge desde Datadog, consulta la documentación [de la integración EventBridge][1]. Por ejemplo, para activar un evento de test [cargando los objetos a un bucket de S3][11] en tu cuenta, utiliza este comando AWS CloudShell:

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. Una vez que se envían los eventos y los logs, al cabo de unos cinco minutos los datos están disponibles en la [consola de logs][12] o el [Explorador de eventos][13] de Datadog, dependiendo del endpoint al que los estés enviando.

## Resolución de problemas

Para ver más detalles sobre las cargas útiles enviadas a Datadog y ver la respuesta de los endpoints de la API, configura una cola de Amazon SQS:  
1. Crea una cola en [Amazon SQS][14].
2. Ve a la [regla EventBridge][15] que has creado en la sección [Configuración](#configuration).
3. Selecciona la pestaña **Targets** (Destinos) y haz clic en **Edit** (Editar).
4. Amplía la sección **Additional settings** (Parámetros adicionales). 
4. En la sección *Dead-letter queue* (Cola de mensajes fallidos), elige **Select an Amazon SQS queue in the current AWS account to use as the dead-letter queue** (Seleccionar una cola de Amazon SQS en la cuenta AWS actual para utilizarla como cola de emnsajes fallidos).
5. Selecciona la cola SQS que acabas de crear.
6. Actualiza la regla.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /es/account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html#eb-api-destination-create
[8]: /es/data_security/#other-sources-of-potentially-sensitive-data/
[9]: https://docs.datadoghq.com/es/api/latest/events/#post-an-event
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[11]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[12]: https://app.datadoghq.com/logs
[13]: https://app.datadoghq.com/event/explorer
[14]: https://console.aws.amazon.com/sqs/
[15]: https://console.aws.amazon.com/events/