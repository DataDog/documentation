---
further_reading:
- link: https://www.datadoghq.com/blog/aws-lambda-telemetry-api/
  tag: Blog
  text: Capacidades ampliadas de la extensión de Datadog Lambda con la API de telemetría
    de AWS Lambda
title: Guía de solución de problemas de recolección de registros de funciones Lambda
---
Si no ve los registros reenviados desde una función Lambda de Datadog Forwarder en el Log Explorer, siga los pasos de solución de problemas a continuación. Si continúa teniendo problemas después de seguir estos pasos, [comuníquese con el soporte de Datadog][1] para obtener más ayuda.

## ¿Se envían sus registros a Datadog? {#are-your-logs-sent-to-datadog}

1. Navegue a la [vista Live Tail del Log Explorer][2].
2. En la barra de búsqueda, use un filtro para limitar la vista Live Tail solo a los registros que provienen de su función Lambda. Algunas consultas de búsqueda comunes son:
    * Por fuente: la fuente a menudo se establece en `source:lambda`, `source:aws`, `source:s3` o `source:cloudwatch`.
    * Por nombre del Forwarder: la función Lambda agrega una etiqueta `forwardername` a todos los registros que reenvía. Puede filtrar por esta etiqueta buscando `forwardername:*` o `forwardername:<FORWARDER_FUNCTION_NAME>`.
3. Si los registros aparecen en Live Tail pero no aparecen en el Log Explorer, la discrepancia probablemente se deba a una de las siguientes razones (consulte el [documento de solución de problemas de registros para obtener más detalles][4]):
   * Su índice de registros tiene filtros de exclusión que están filtrando activamente estos registros.
   * Ha excedido su cuota diaria de registros.
   * Los registros tienen una marca de tiempo de hace más de 18 horas.
4. Si no ve los registros en Live Tail, los registros no están llegando a Datadog.

## Verifique los permisos de la función Lambda {#check-the-lambda-function-permissions}

Los problemas de permisos también pueden afectar la capacidad del Forwarder para acceder a las fuentes de registros. La función Lambda utiliza una política basada en recursos (no relacionada con la política de Datadog Integration Role) para otorgar acceso a las fuentes de registros.

Verifique la política del Forwarder ejecutando el siguiente comando:
   ```
   get-policy command aws lambda get-policy --function-name <FUNCTION_NAME>
   ```

Este comando devuelve una política basada en recursos que especifica qué servicios y recursos de AWS (como buckets de S3 específicos) pueden invocar la función del Forwarder.

<div class="alert alert-danger">
Los elementos Action y Resource en el documento de política <strong>deben coincidir exactamente</strong> con las especificaciones en los <a href="/logs/guide/forwarder/?tab=cloudformation#permissions">permisos de Datadog Forwarder</a>.
</div>

## Verifique la pestaña de monitoreo de la función Lambda {#check-the-lambda-function-monitoring-tab}

[Desde la consola de AWS][6]

1. Abra su función Lambda del Forwarder.

2. Haga clic en la pestaña {{< ui >}}Monitoring{{< /ui >}}.

    {{< img src="logs/guide/lambda-monitoring-tab.png" alt="Pestaña de monitoreo" style="width:80%;" >}}

3. La pestaña de monitoreo muestra una serie de gráficos que indican la siguiente información sobre su función Lambda:
    * invocaciones
    * errores
    * registros

4. Si no ve ningún punto de datos en el gráfico {{< ui >}}Invocations{{< /ui >}}, es posible que haya un problema con los activadores que configuró para su función. Consulte [Administrar los activadores de su función](#manage-your-function-triggers). Para obtener información sobre sus invocaciones de Lambda sin usar la pestaña de monitoreo, consulte [Visualización de métricas de Lambda en Datadog](#viewing-lambda-metrics-in-datadog).
5. Si ve puntos de datos en la gráfica "Error count and success rate", [verifique los registros de la función Lambda](#check-the-lambda-function-logs) para ver qué mensajes de error se reportan.

### Visualización de métricas de Lambda en Datadog {#viewing-lambda-metrics-in-datadog}

Si ha habilitado las métricas de AWS Lambda, puede ver las métricas relacionadas con las invocaciones y errores de Lambda dentro de Datadog. Las siguientes métricas están todas etiquetadas con la etiqueta `functionname`:

| Métrica                        | Descripción                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.lambda.invocations `     | Cantidad de veces que se ha activado/invocado la función Lambda                                      |
| `aws.lambda.errors `          | Cantidad de errores que ocurrieron cuando se invocó la función                                        |
| `aws.lambda.duration `        | Cantidad promedio de tiempo (en milisegundos) que le tomó a la función Lambda terminar de ejecutarse  |
| `aws.lambda.duration.maximum` | Cantidad máxima de tiempo (en milisegundos) que le tomó a la función Lambda terminar de ejecutarse  |
| `aws.lambda.throttles`        | Cantidad de intentos de invocación que fueron limitados debido a que las tasas de invocación excedieron los límites del cliente |

Para obtener más información sobre estas y otras métricas de AWS Lambda, consulte [Métricas de AWS Lambda][7].

### Administre los activadores de su función {#manage-your-function-triggers}

Para que se reenvíen los registros, la función Lambda del Forwarder debe tener activadores configurados (CloudWatch Logs o S3). Siga los pasos a continuación para asegurarse de que los activadores estén configurados correctamente.

1. ¿Aparece la fuente de sus registros (grupo de registros de CloudWatch o bucket de S3) en la lista "Triggers" (Activadores) de la consola de la función Lambda del Forwarder? Si es así, asegúrese de que esté habilitado. De lo contrario, siga los pasos a continuación para verificarlo en la consola del bucket de S3 o del grupo de registros de CloudWatch, ya que se sabe que la lista "Triggers" (Activadores) que se muestra en la consola de Lambda no es exhaustiva.

2. Para un bucket de S3, vaya a la pestaña "Properties" (Propiedades) del bucket y desplácese hacia abajo hasta "Advanced settings" (Configuración avanzada) y el recuadro "Events" (Eventos), o realice una consulta con el comando de la CLI de AWS que aparece a continuación. ¿Ve alguna notificación de evento configurada para activar la función Lambda del Forwarder? Si no es así, debe configurar un activador.
   ```
   aws s3api get-bucket-notification-configuration --bucket <BUCKET_NAME>
   ```

3. Para el grupo de registros de CloudWatch, navegue al campo "Subscriptions" de la consola del grupo de registros en la sección "Log group details". Alternativamente, puede realizar una consulta utilizando el comando de AWS CLI a continuación. Si el grupo de registros no está suscrito a la función Lambda del Forwarder, debe configurar un activador.
   ```
   aws logs describe-subscription-filters --log-group-name <LOG_GROUP_NAME>
   ```

4. Configure los activadores [automáticamente][8] o [manualmente][9].

Para el grupo de registros de CloudWatch, puede utilizar las siguientes métricas en la plataforma Datadog para confirmar si los registros se entregan desde el grupo de registros a la función Lambda del Forwarder. Utilice la etiqueta `log_group` para filtrar los datos al ver las métricas.

| Métrica                          | Descripción                                                                                        |
|---------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.logs.incoming_log_events`  | La cantidad de eventos de registro cargados en CloudWatch Logs                                               |
| `aws.logs.forwarded_log_events` | La cantidad de eventos de registro reenviados al destino de la suscripción                                 |
| `aws.logs.delivery_errors`      | La cantidad de eventos de registro que no se pudieron entregar al destino de la suscripción                    |
| `aws.logs.delivery_throttling`  | La cantidad de eventos de registro cuya entrega al destino de la suscripción se limitó por control de tasa                  |

### Activador automático {#automatic-trigger}

Si Datadog no logra crear activadores automáticamente, siga esta lista de verificación de solución de problemas:

1. Verifique que el ARN del Forwarder aparezca en la pestaña Log Collection de la integración de AWS.
2. Verifique que los [permisos requeridos][10] estén asignados al rol de integración.
3. Si la fuente de registro es un grupo de registros de Lambda, verifique que la función Lambda tenga la [extensión][11] instalada.
4. Si la fuente de registro es un grupo de registros de CloudWatch, verifique que no tenga ya dos suscriptores (el máximo permitido).

## Verifique los registros de la función Lambda {#check-the-lambda-function-logs}

1. Desde la pestaña de monitoreo, haga clic en {{< ui >}}View logs in Cloudwatch{{< /ui >}}.

{{< img src="logs/guide/lambda-logs-cloudwatch.png" alt="Registros de Lambda en CloudWatch" style="width:80%;" >}}

2. Encuentre el flujo de registros más reciente.

3. ¿Ve algún error? Intente buscar "?ERROR ?Error ?error".

4. Establezca la variable de entorno "DD_LOG_LEVEL" en "debug" en la función Lambda del Forwarder para habilitar los registros de depuración y realizar un análisis más detallado. Los registros de depuración son bastante detallados; recuerde desactivar el registro de depuración cuando termine de depurar.

### Registros filtrados por la función Lambda {#logs-filtered-by-the-lambda-function}

El reenviador Lambda utiliza las siguientes [variables de entorno][12] para filtrar los registros:

* INCLUDE_AT_MATCH
* EXCLUDE_AT_MATCH

Puede buscar estas variables en los registros DEBUG del reenviador, los cuales indican si ciertos registros se descartan o no debido al filtro.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/help
[2]: /es/logs/live_tail/#live-tail-view
[3]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[4]: /es/logs/troubleshooting/
[5]: /es/logs/guide/forwarder/?tab=cloudformation#permissions
[6]: https://console.aws.amazon.com/lambda/home
[7]: /es/integrations/amazon_lambda/?tab=awsconsole#metrics
[8]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[9]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers
[10]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[11]: /es/serverless/libraries_integrations/extension/
[12]: /es/logs/guide/forwarder/?tab=cloudformation#log-filtering-optional