---
further_reading:
- link: https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog
  tag: Blog
  text: Blog de AWS con casos de uso de ejemplo de destinos de API
- link: /logs/guide/reduce_data_transfer_fees
  tag: Guía
  text: Cómo enviar registros a Datadog mientras reduce las tarifas de transferencia
    de datos
site_support_id: amazon-event-bridge
title: Envío de eventos y registros a Datadog con Amazon EventBridge API Destinations
---
Amazon EventBridge es un bus de eventos sin servidor que le permite crear aplicaciones basadas en eventos. EventBridge puede integrarse con sus servicios de AWS, pero la función de destinos de API le permite enviar datos fuera de AWS y obtener datos de fuentes externas a AWS mediante API. Esta guía ofrece pasos para enviar sus eventos y registros desde EventBridge a Datadog. Para obtener más información sobre cómo enviar sus eventos desde Datadog a EventBridge, [consulte la documentación de integración de EventBridge][1].

## Configuración {#setup}

Antes de comenzar, necesita una [cuenta de Datadog][2], con [una clave de API][3], y necesita acceso a los [destinos de API de Amazon EventBridge][4].

### Configuración {#configuration}

1. Siga los pasos en la [documentación de creación de un destino de API de Amazon][5] para agregar a Datadog como destino de API.
    - Utilice la autorización con clave de API, con `DD-API-KEY` como nombre de su clave y su [clave de Datadog API][3] como valor.
    - Para su punto de conexión de destino, utilice `https://{{< region-param key="http_endpoint" code="true" >}}/api/v2/logs` for logs and `https://event-management-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/events` for events, and set `POST` como método HTTP. Para obtener más información sobre las diferencias entre registros y eventos, consulte [Reducción de riesgos relacionados con los datos][8].
2. Una vez que haya configurado el destino, consulte la documentación de Amazon para [crear una regla de EventBridge][10], donde establecerá a Datadog como su destino.

    If you're using the events endpoint, configure an [input transformer][16] on the target so the rule sends events in the format the endpoint expects. Use the following input path to extract values from the original event:

    ```json
    {
      "detailType": "$.detail-type",
      "source": "$.source",
      "time": "$.time"
    }
    ```

    Then, use the following input template to build the request body:

    ```json
    {
      "data": {
        "type": "event",
        "attributes": {
          "title": <detailType>,
          "message": "<detailType> from <source>",
          "category": "alert",
          "timestamp": <time>,
          "tags": ["source:<source>"],
          "attributes": {
            "status": "ok"
          }
        }
      }
    }
    ```

    Set `status` to `warn` or `error` for events that represent a problem. For AWS events that represent a configuration change, you can instead send `"category": "change"` with a `changed_resource` object. For the full list of accepted fields, see [Post an event][9].
3. Una vez que haya configurado la regla con Datadog como destino, active un evento enviando un evento a EventBridge. Para obtener más información sobre cómo enviar eventos a EventBridge desde Datadog, consulte la [documentación de integración de EventBridge][1]. Por ejemplo, para activar un evento de prueba [cargando los objetos en un bucket de S3][11] en su cuenta, utilice este comando de AWS CloudShell:

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. Una vez que se envíen los eventos y registros, los datos estarán disponibles al cabo de unos cinco minutos en [Logs Console][12] o [Events Explorer][13] de Datadog, según el punto de conexión al que los envíe.

## Solución de problemas {#troubleshooting}

Para ver más detalles sobre las cargas útiles enviadas a Datadog y visualizar la respuesta de los puntos de conexión de la API, configure una cola de Amazon SQS:  
1. Cree una cola en [Amazon SQS][14].
2. Vaya a la [regla de EventBridge][15] que creó en la sección [Configuration](#configuration).
3. Seleccione la pestaña {{< ui >}}Targets{{< /ui >}} y haga clic en {{< ui >}}Edit{{< /ui >}}.
4. Expanda la sección {{< ui >}}Additional settings{{< /ui >}}. 
4. En la sección {{< ui >}}Dead-letter queue{{< /ui >}}, elija {{< ui >}}Select an Amazon SQS queue in the current AWS account to use as the dead-letter queue{{< /ui >}}.
5. Seleccione la cola de SQS que acaba de crear.
6. Actualice la regla.

## Lecturas adicionales {#further-reading}

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
[16]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html