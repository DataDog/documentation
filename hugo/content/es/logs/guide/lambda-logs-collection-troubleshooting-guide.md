---
further_reading:
- link: https://www.datadoghq.com/blog/aws-lambda-telemetry-api/
  tag: Blog
  text: Ampliación de las capacidades de extensión Lambda de Datadog con la API de
    telemetría de AWS Lambda
title: Guía para la resolución de problemas de recopilación de logs de la función
  Lambda
---

Si no ves logs reenviados desde una función Lambda del Datadog Forwarder en el Explorador de logs, sigue los pasos para solucionar problemas que se indican a continuación. Si sigues teniendo problemas después de seguir estos pasos, [ponte en contacto con el servicio de asistencia de Datadog][1] para obtener más ayuda.

## ¿Se envían tus logs a Datadog?

1. Ve a la [vista de Live Tail del Explorador de logs][2].
2. En la barra de búsqueda, utiliza un filtro para limitar la vista de Live Tail sólo a la logs procedentes de tu función Lambda. Algunas consultas comunes de búsqueda son:
    * Por fuente: la fuente suele estar configurada como`source:lambda`, `source:aws` o `source:cloudwatch`, pero puedes encontrar otras fuentes posibles en la función`parse_event_source` en la [función Lambda][3]. 
    * Por nombre de Forwarder: la función Lambda añade una etiqueta (tag) `forwardername` a todos los logs que reenvía. Puedes filtrar a través de esta etiqueta buscando `forwardername:*` o `forwardername:<Forwarder_FUNCTION_NAME>`.
3. Si ves logs en Live Tail, pero no en el Explorador de logs, significa que tu índice de logs tiene configurados algunos [filtros de exclusión][4]. Estos filtros están filtrando tus logs.
4. Si no ves logs en Live Tail, los logs no están llegando a Datadog.

## Comprobar la pestaña Monitoring (Monitorización) de la función Lambda

[Desde la consola AWS][5]

1. Abre la función Lambda de tu Forwarder.

2. Haz clic en la pestaña Monitoring (Monitorización).

    {{< img src="logs/guide/lambda-monitoring-tab.png" alt="Pestaña de monitorización" style="width:80%;" >}}

3. La pestaña Monitoring (Monitorización) muestra una serie de gráficos que indican la siguiente información sobre tu función Lambda: 
    * invocaciones
    * errores
    * logs

4. Si no ves ningún punto de datos en el gráfico **Invocations** (Invocaciones), puede que haya un problema con los activadores que has configurado para tu función. Consulte [Gestionar los activadores de tu función](#manage-your-function-triggers). Para obtener más información sobre las invocaciones de tu Lambda sin utilizar la pestaña de monitorización, consulta [Visualización de métricas Lambda en Datadog](#viewing-lambda-metrics-in-datadog).
5. Si ves puntos de datos en el gráfico "Error count and success rate" (Recuento de errores y tasa de éxito), [comprueba los logs de la función Lambda](#check-the-lambda-function-logs) para ver de qué mensajes de error se están informando.

### Visualización de métricas Lambda en Datadog

Si has habilitado métricas AWS Lambda, puedes ver métricas relacionadas con invocaciones de Lambda y errores en Datadog. Todas las siguientes métricas tienen la etiqueta `functionname`: 

| Métrica                        | Descripción                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.lambda.invocations `     | Número de veces que se ha activado/invocado la función Lambda                                      |
| `aws.lambda.errors `          | Número de errores que se han producido al invocar la función                                        |
| `aws.lambda.duration `        | Tiempo promedio (en milisegundos) que ha tardado en terminar de ejecutarse la función Lambda  |
| `aws.lambda.duration.maximum` | Tiempo máximo (en milisegundos) que ha tardado en terminar de ejecutarse la función Lambda  |
| `aws.lambda.throttles`        | Número de intentos de invocación que se limitaron debido a que los índices de invocación excedían los límites del cliente |

Para obtener más información sobre éstas y otras métricas de AWS Lambda, consulta las [métricas AWS Lambda][6].

### Gestionar los activadores de tu función

Para que los logs se reenvíen, la función Lambda del Forwarder debe tener configurados los activadores (CloudWatch Logs o S3). Sigue los pasos que se indican a continuación para asegurarte de que los activadores están configurados correctamente.

1. ¿Aparece la fuente de tu log (bucket S3 o grupo de logs de CloudWatch) en la lista de "Activadores" en la consola Lambda del Forwarder? Si aparece, asegúrate de que está habilitada. De lo contrario, sigue los pasos que se indican a continuación para buscar en el bucket S3 o en la consola de grupos de logs de CloudWatch, ya que se sabe que la lista de "Activadores" en la consola Lambda es incomprensible.

2. Para el bucket S3, ve a la pestaña "Properties" (Propiedades) y desplázate hasta "Advanced settings" (Configuración avanzada) y el mosaico "Events" (Eventos), o realiza una consulta utilizando la interfaz de línea de comandos (CLI) de AWS que se indica a continuación. ¿Ves alguna notificación de eventos configurada para activar la función Lambda del Forwarder? Si no es así, necesitas configurar un activador.
   ```
   aws s3api get-bucket-notification-configuration --bucket <BUCKET_NAME>
   ```

3. Para el grupo de logs de CloudWatch, ve al campo "Subscriptions" (Suscripciones) de la consola del grupo de logs, en la sección "Log group details" (Detalles del grupo de logs). También puedes realizar una consulta utilizando la interfaz de línea de comandos (CLI) de AWS que se indica a continuación. Si el grupo de logs no está suscrito por la función Lambda del Forwarder, necesitas configurar un activador.
   ```
   aws logs describe-subscription-filters --log-group-name <LOG_GROUP_NAME>
   ```

4. Ajusta los activadores [automáticamente][7] o [manualmente][8].

Para el grupo de logs de CloudWatch, puedes utilizar las siguientes métricas de la plataforma Datadog, para confirmar si los logs se envían desde el grupo de logs a la función Lambda del Forwarder. Utiliza la etiqueta `log_group` para filtrar los datos al visualizar las métricas.

| Métrica                          | Descripción                                                                                        |
|---------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.logs.incoming_log_events`  | Número de eventos de logs cargados en CloudWatch Logs                                               |
| `aws.logs.forwarded_log_events` | Número de eventos de logs reenviados al destino de la suscripción                                 |
| `aws.logs.delivery_errors`      | Número de eventos de logs que no se han podido enviar al destino de la suscripción                    |
| `aws.logs.delivery_throttling`  | Número de eventos de logs con límites para el envío al destino de suscripción                  |

## Comprobar logs de la función Lambda

1. En la pestaña de monitorización, haz clic en **View logs in Cloudwatch** (Ver logs en CloudWatch).

{{< img src="logs/guide/lambda-logs-cloudwatch.png" alt="Logs de Lambda en Cloudwatch" style="width:80%;" >}}

2. Encuentra el flujo (stream) de logs más reciente.

3. ¿Ves algún error? Intenta buscar "?ERROR ?Error ?error".

4. Configura la variable de entorno "DD_LOG_LEVEL" para "debug" (depurar), en la función Lambda del Forwarder, para habilitar la posterior depuración de logs. Los logs depurados son bastante verbosos, así que recuerda deshabilitar la función después de la depuración.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/es/help
[2]: https://docs.datadoghq.com/es/logs/live_tail/#live-tail-view
[3]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[4]: https://docs.datadoghq.com/es/logs/indexes/#exclusion-filters
[5]: https://console.aws.amazon.com/lambda/home
[6]: https://docs.datadoghq.com/es/integrations/amazon_lambda/?tab=awsconsole#metrics
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[8]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers