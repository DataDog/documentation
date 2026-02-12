---
aliases:
- /es/integrations/awslambda/
- /es/serverless/real-time-enhanced-metrics/
app_id: amazon_lambda
categories:
- aws
- nube
- recopilación de logs
- rastreo
custom_kind: integración
description: Rastrea tiempos de ejecución de lambda, errores, counts de invocación
  y mucho más.
further_reading:
- link: https://www.datadoghq.com/blog/how-to-monitor-lambda-functions/
  tag: Blog
  text: Cómo monitorizar funciones de Lambda
- link: https://www.datadoghq.com/blog/datadog-lambda-layer/
  tag: Blog
  text: 'Lambda Layer de Datadog: Monitoriza métricas personalizadas serverless '
- link: https://www.datadoghq.com/blog/datadog-lambda-extension/
  tag: Blog
  text: Presentación de la extensión Lambda de Datadog
title: AWS Lambda
---
<div class="alert alert-warning">Esta página se limita a la documentación para la ingesta de métricas AWS Lambda desde Amazon CloudWatch. Ppara recopilar telemetría directamente de tus funciones Lambda en tiempo real, consulta la <a href="/serverless">documentación de Datadog serverless</a>.</div>

## Información general

AWS Lambda es un sistema informático servicio que ejecuta código en respuesta a eventos y gestiona automáticamente los recursos informáticos que requiere ese código.

Habilita esta integración para empezar a recopilar métricas CloudWatch. En esta página también se describe cómo configurar métricas personalizadas, generar logs y rastrear tus funciones Lambda.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

#### Métricas AWS Lambda

1. En la [page (página) de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Lambda` esté activada en la pestaña `Metric Collection`.

1. Añade los siguientes permisos a tu [política de Datadog política](https://docs.datadoghq.com/integrations/amazon_web_services/#aws-integration-iam-policy) para recopilar métricas de AWS Lambda. Para obtener más información, consulta las [políticas de Lambda](https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html) en el sitio web AWS.

   | Permiso de AWS | Descripción |
   | ------------------ | -------------------------------------------- |
   | `lambda:List*` | Lista de funciones, metadatos y tags (etiquetas) de Lambda.   |
   | `tag:GetResources` | Obtén tags (etiquetas) personalizadas aplicadas a funciones de Lambda. |
   | `cloudtrail:LookupEvents` | Utiliza CloudTrail History para detectar cambios en las funciones de lambda |

1. Instala la [integración de Datadog y AWS Lambda](https://app.datadoghq.com/integrations/amazon-lambda).

Una vez finalizado esto, visualiza todas tus funciones Lambda en la [vista Datadog Serverless](https://app.datadoghq.com/functions). Esta page (página) reúne métricas, traces (trazas) y logs de tus funciones de AWS Lambda que ejecutan aplicaciones serverless en una sola vista. Puedes encontrar documentación detallada sobre esta función en la [documentación de Datadog Serverless](https://docs.datadoghq.com/serverless/).

## Datos recopilados

<div class="alert alert-warning">Cuando se utilizan extensiones AWS Lambda, la métrica de <em>duración</em> informada por AWS incluye la <em>post_runtime_extensions_duration</em> consumida por las extensiones Lambda <a href="https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/">que realizan actividades después de que se devuelve la respuesta de la función</a>. Para monitorizar el rendimiento real de la función, utiliza <em>duration - post_runtime_extensions_duration</em> o la <a href="https://docs.datadoghq.com/serverless/enhanced_lambda_metrics/">métrica Datadog mejorada</a> <em>aws.lambda.enhanced.runtime_duration</em>.</div>

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, incluyendo, entre otras, el nombre de la función, los grupos de seguridad, etc.

### Métricas

| | |
| --- | --- |
| **aws.lambda.async_event_age** <br>(gauge) | Mide el tiempo medio de la diferencia entre el momento en que un evento se pone por primera vez en la cola interna y el momento en que el servicio Lambda invoca la función.<br>_Mostrado como milisegundo_ |
| **aws.lambda.async_event_age.maximum** <br>(gauge) | Mide el tiempo medio de la diferencia entre el momento en que un evento se pone por primera vez en la cola interna y el momento en que el servicio Lambda invoca la función.<br>_Mostrado como milisegundo_ |
| **aws.lambda.async_event_age.minimum** <br>(gauge) | Mide el tiempo mínimo de la diferencia entre el momento en que un evento se pone por primera vez en la cola interna y el momento en que el servicio Lambda invoca la función.<br>_Mostrado como milisegundo_ |
| **aws.lambda.async_event_age.sum** <br>(gauge) | Mide la suma de los tiempos de las diferencias entre el momento en que un evento se pone por primera vez en la cola interna y el momento en que el servicio Lambda invoca la función.<br>_Mostrado como milisegundo_ |
| **aws.lambda.async_events_dropped** <br>(count) | Mide el número de eventos abandonados sin ejecutar correctamente la función.<br>_Mostrado como evento_ |
| **aws.lambda.async_events_received** <br>(count) | Mide el número de eventos que Lambda pone en cola con éxito para su procesamiento.<br>_Mostrado como evento_ |
| **aws.lambda.claimed_account_concurrency** <br>(count) | Mide la cantidad de concurrencia que no está disponible para invocaciones bajo demanda para una región.<br>_Mostrado como invocación_ |
| **aws.lambda.concurrent_executions** <br>(gauge) | Mide la media de ejecuciones concurrentes de una función determinada en un momento dado.<br>_Mostrado como ejecución_ |
| **aws.lambda.concurrent_executions.maximum** <br>(gauge) | Mide el máximo de ejecuciones concurrentes para una función dada en un momento dado.<br>_Mostrado como ejecución_ |
| **aws.lambda.concurrent_executions.minimum** <br>(gauge) | Mide el mínimo de ejecuciones concurrentes para una función determinada en un momento dado.<br>_Mostrado como ejecución_ |
| **aws.lambda.concurrent_executions.sum** <br>(gauge) | Mide la suma de ejecuciones concurrentes para una función determinada en un momento dado.<br>_Mostrado como ejecución_ |
| **aws.lambda.concurrent_executions_global** <br>(gauge) | Mide la media de ejecuciones concurrentes de todas las funciones de una cuenta en un momento dado.<br>_Mostrado como ejecución_ |
| **aws.lambda.concurrent_executions_global.maximum** <br>(gauge) | Mide el máximo de ejecuciones concurrentes para todas las funciones de una cuenta en un momento dado.<br>_Mostrado como ejecución_ |
| **aws.lambda.concurrent_executions_global.minimum** <br>(gauge) | Mide el mínimo de ejecuciones concurrentes para todas las funciones de una cuenta en un momento dado.<br>_Mostrado como ejecución_ |
| **aws.lambda.concurrent_executions_global.sum** <br>(gauge) | Mide la suma de ejecuciones concurrentes de todas las funciones de una cuenta en un momento dado.<br>_Mostrado como ejecución_ |
| **aws.lambda.dead_letter_errors** <br>(count) | Mide la suma de veces que Lambda es incapaz de escribir la carga útil del evento fallido en las colas de letra muerta configuradas.<br>_Mostrado como error_ |
| **aws.lambda.deleted_event_count** <br>(count) | Count de eventos eliminados por Lambda al procesarlos con éxito.<br>_Mostrado como evento_ |
| **aws.lambda.destination_delivery_failures** <br>(count) | Mide el número de veces que Lambda intenta enviar un evento a un destino pero falla.|
| **aws.lambda.dropped_event_count** <br>(count) | Count de eventos abandonados por Lambda debido a la expiración del evento.<br>_Mostrado como evento_ |
| **aws.lambda.duration** <br>(gauge) | Mide el tiempo medio de reloj de pared transcurrido desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse, incluido `post_runtime_extensions_duration` consumido por las extensiones Lambda que realizan actividades después de que se devuelve la respuesta de la función.<br>_Mostrado como milisegundo_. |
| **aws.lambda.duration.maximum** <br>(gauge) | Mide el tiempo de reloj de pared máximo transcurrido desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse, incluido `post_runtime_extensions_duration` consumido por las extensiones Lambda que realizan actividades después de que se devuelve la respuesta de la función.<br>_Mostrado como milisegundo_. |
| **aws.lambda.duration.minimum** <br>(gauge) | Mide el tiempo de reloj de pared mínimo transcurrido desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse, incluido `post_runtime_extensions_duration` consumido por las extensiones Lambda que realizan actividades después de que se devuelve la respuesta de la función.<br>_Mostrado como milisegundo_. |
| **aws.lambda.duration.p50** <br>(gauge) | Mide el p50 tiempo de reloj de pared transcurrido desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse, incluido `post_runtime_extensions_duration` consumido por las extensiones Lambda que realizan actividades después de que se devuelve la respuesta de la función.<br>_Mostrado como milisegundo_ |
| **aws.lambda.duration.p80** <br>(gauge) | Mide el p80 tiempo de reloj de pared transcurrido desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse, incluido `post_runtime_extensions_duration` consumido por las extensiones Lambda que realizan actividades después de que se devuelve la respuesta de la función.<br>_Mostrado como milisegundo_. |
| **aws.lambda.duration.p95** <br>(gauge) | Mide el p95 tiempo de reloj de pared transcurrido desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse, incluido `post_runtime_extensions_duration` consumido por las extensiones Lambda que realizan actividades después de que se devuelve la respuesta de la función.<br>_Mostrado como milisegundo_ |
| **aws.lambda.duration.p99** <br>(gauge) | Mide el p99 tiempo de reloj de pared transcurrido desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse, incluido `post_runtime_extensions_duration` consumido por las extensiones Lambda que realizan actividades después de que se devuelve la respuesta de la función.<br>_Mostrado como milisegundo_ |
| **aws.lambda.duration.p99.9** <br>(gauge) | Mide el p99.9 tiempo transcurrido en el reloj de pared desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse, incluido `post_runtime_extensions_duration` consumido por las extensiones Lambda que realizan actividades después de que se devuelve la respuesta de la función.<br>_Mostrado como milisegundo_ |
| **aws.lambda.duration.sum** <br>(gauge) | Mide el tiempo total de ejecución de la función Lambda que se está ejecutando, incluido `post_runtime_extensions_duration` consumido por las extensiones Lambda que realizan actividades después de que se devuelve la respuesta de la función.<br>_Mostrado como milisegundo_ |
| **aws.lambda.enhanced.billed_duration** <br>(gauge) | Mide el tiempo facturado de ejecución de la función.<br>_Mostrado como segundo_ |
| **aws.lambda.enhanced.cpu_max_utilization** <br>(gauge) | Mide la utilización de la CPU en el núcleo utilizado al máximo.<br>_Mostrado como porcentaje_ |
| **aws.lambda.enhanced.cpu_min_utilization** <br>(gauge) | Mide la utilización de la CPU en el núcleo mínimamente utilizado.<br>_Mostrado como porcentaje_ |
| **aws.lambda.enhanced.cpu_system_time** <br>(gauge) | Mide la cantidad de tiempo de funcionamiento de la CPU en modo kernel.<br>_Mostrado como milisegundo_ |
| **aws.lambda.enhanced.cpu_total_time** <br>(gauge) | Mide el tiempo total de funcionamiento de la CPU.<br>_Mostrado en milisegundos_ |
| **aws.lambda.enhanced.cpu_total_utilization** <br>(gauge) | Mide la utilización total de la CPU de la función como número de núcleos.<br>_Mostrado como núcleo_ |
| **aws.lambda.enhanced.cpu_total_utilization_pct** <br>(gauge) | Mide la utilización total de la CPU de la función como un porcentaje.<br>_Mostrado como porcentaje_ |
| **aws.lambda.enhanced.cpu_user_time** <br>(gauge) | Mide el tiempo de funcionamiento de la CPU en modo usuario.<br>_Mostrado en milisegundos_ |
| **aws.lambda.enhanced.duration** <br>(gauge) | Mide los segundos transcurridos desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse, incluido `post_runtime_duration` consumido por las extensiones Lambda que realizan actividades después de que se devuelve la respuesta de la función.<br>_Mostrado como segundo_ |
| **aws.lambda.enhanced.errors** <br>(count) | Mide el número de invocaciones que fallaron debido a errores en la función.<br>_Mostrado como error_ |
| **aws.lambda.enhanced.estimated_cost** <br>(gauge) | Mide el costo total estimado de la invocación de la función (en dólares estadounidenses).<br>_Mostrado en dólares_ |
| **aws.lambda.enhanced.init_duration** <br>(gauge) | Mide el tiempo de inicialización (segundo) de una función durante un arranque en frío.<br>_Mostrado como segundo_ |
| **aws.lambda.enhanced.invocations** <br>(count) | Mide el número de veces que se invoca una función en respuesta a un evento o llamada a la API de invocación.<br>_Mostrado como invocación_ |
| **aws.lambda.enhanced.max_memory_used** <br>(gauge) | Mide la cantidad máxima de memoria (mb) utilizada por la función.<br>_Mostrado como mebibyte_ |
| **aws.lambda.enhanced.memorysize** <br>(gauge) | Mide la cantidad de memoria asignada (mb) disponible para la función durante la ejecución.<br>_Mostrado como mebibyte_ |
| **aws.lambda.enhanced.num_cores** <br>(gauge) | Mide el número de núcleos disponibles.<br>_Mostrado como núcleo_ |
| **aws.lambda.enhanced.out_of_memory** <br>(count) | Mide el número de veces que una función se queda sin memoria.<br>_Mostrado como error_ |
| **aws.lambda.enhanced.post_runtime_duration** <br>(gauge) | Mide los milisegundos transcurridos desde que la función devuelve la respuesta hasta que las extensiones terminan de realizar actividades como el envío de datos de telemetría a un destino preferido tras la devolución de la respuesta de la función.<br>_Mostrado como milisegundo_ |
| **aws.lambda.enhanced.produced_bytes** <br>(gauge) | Mide el número de bytes devueltos por una función.<br>_Mostrado como byte_ |
| **aws.lambda.enhanced.response_duration** <br>(gauge) | Mide el tiempo transcurrido en milisegundos desde que se envía al cliente el primer byte de respuesta hasta el último byte de respuesta.<br>_Mostrado como milisegundo_ |
| **aws.lambda.enhanced.response_latency** <br>(gauge) | Mide el tiempo transcurrido en milisegundos desde que se recibe la solicitud de invocación hasta que se envía el primer byte de respuesta al cliente.<br>_Mostrado como milisegundo_ |
| **aws.lambda.enhanced.runtime_duration** <br>(gauge) | Mide los milisegundos transcurridos desde que se inicia el código de la función hasta que devuelve la respuesta.<br>_Se muestra como milisegundo_ |
| **aws.lambda.enhanced.rx_bytes** <br>(gauge) | Mide los bytes recibidos por la función.<br>_Mostrado como byte_ |
| **aws.lambda.enhanced.time_to_first_byte** <br>(gauge) | Mide el tiempo transcurrido en milisegundos desde que comienza el código de la función hasta que devuelve el primer byte.<br>_Mostrado como milisegundo_ |
| **aws.lambda.enhanced.timeouts** <br>(count) | Mide el número de veces que se agota el tiempo de espera de una función.<br>_Mostrado como tiempo de espera_ |
| **aws.lambda.enhanced.tmp_max** <br>(gauge) | Mide el espacio total disponible en el directorio /tmp.<br>_Mostrado como byte_ |
| **aws.lambda.enhanced.tmp_used** <br>(gauge) | Mide el espacio utilizado en el directorio /tmp.<br>_Mostrado como byte_ |
| **aws.lambda.enhanced.total_network** <br>(gauge) | Mide los bytes enviados y recibidos por la función.<br>_Mostrado como byte_ |
| **aws.lambda.enhanced.tx_bytes** <br>(gauge) | Mide los bytes enviados por la función.<br>_Mostrado como byte_ |
| **aws.lambda.errors** <br>(count) | Mide el número de invocaciones que fallaron debido a errores en la función.<br>_Mostrado como error_ |
| **aws.lambda.failed_invoke_event_count** <br>(count) | Count de eventos enviados como carga útil de invocación a la función Lambda de destino que han provocado un fallo total o parcial.<br>_Mostrado como evento_ |
| **aws.lambda.filtered_out_event_count** <br>(count) | Para asignaciones de source (fuente) de eventos con FilterCriteria, count de eventos filtrados por Lambda.<br>_Mostrado como evento_ |
| **aws.lambda.invocations** <br>(count) | Mide el número de veces que se invoca una función en respuesta a un evento o llamada a la API de invocación.<br>_Mostrado como invocación_ |
| **aws.lambda.invoked_event_count** <br>(count) | Count de eventos que Lambda envió como carga útil de invocación a la función Lambda de destino.<br>_Mostrado como evento_ |
| **aws.lambda.iterator_age** <br>(gauge) | Mide la antigüedad del último registro de cada lote de registros procesados<br>_Mostrado en milisegundos_ |
| **aws.lambda.iterator_age.maximum** <br>(gauge) | Mide la antigüedad máxima del último registro de cada lote de registros procesados<br>_Mostrado en milisegundos_ |
| **aws.lambda.iterator_age.minimum** <br>(gauge) | Mide la antigüedad mínima del último registro de cada lote de registros procesados<br>_Mostrado en milisegundos_ |
| **aws.lambda.iterator_age.sum** <br>(gauge) | Mide la suma de las antigüedades del último registro de cada lote de registros procesados<br>_Mostrado en milisegundos_ |
| **aws.lambda.memorysize** <br>(gauge) | Mide la cantidad de memoria asignada disponible para la función durante la ejecución.<br>_Mostrado como mebibyte_ |
| **aws.lambda.on_failure_destination_delivered_event_count** <br>(count) | Para las asignaciones de source (fuente) de eventos con DestinationConfig, el count de eventos que se enviaron con éxito al destino tras el fallo.<br>_Mostrado como evento_ |
| **aws.lambda.polled_event_count** <br>(count) | Count de eventos que Lambda ha sondeado con éxito desde la source (fuente) de eventos.<br>_Mostrado como evento_ |
| **aws.lambda.post_runtime_extensions_duration** <br>(gauge) | Mide la cantidad media de tiempo que el tiempo de ejecución pasa ejecutando el código para extensiones después de que el código de la función se ha completado.<br>_Mostrado como milisegundo_ |
| **aws.lambda.post_runtime_extensions_duration.maximum** <br>(gauge) | Mide la cantidad máxima de tiempo que el tiempo de ejecución pasa ejecutando el código para extensiones después de que el código de la función ha finalizado.<br>_Mostrado como milisegundo_ |
| **aws.lambda.post_runtime_extensions_duration.minimum** <br>(gauge) | Mide la cantidad mínima de tiempo que el tiempo de ejecución pasa ejecutando el código para extensiones después de que el código de la función se ha completado.<br>_Mostrado como milisegundo_ |
| **aws.lambda.post_runtime_extensions_duration.p50** <br>(gauge) | Mide el p50 tiempo de reloj de pared transcurrido del tiempo de ejecución del código para extensiones después de que el código de la función ha finalizado.<br>_Mostrado como milisegundo_ |
| **aws.lambda.post_runtime_extensions_duration.p99** <br>(gauge) | Mide el p90 tiempo de reloj de pared transcurrido del tiempo de ejecución del código para extensiones después de que el código de la función ha finalizado.<br>_Mostrado como milisegundo_ |
| **aws.lambda.post_runtime_extensions_duration.sum** <br>(gauge) | Mide la cantidad acumulada de tiempo del tiempo de ejecución del código para extensiones después de que el código de la función ha finalizado.<br>_Mostrado como milisegundo_ |
| **aws.lambda.provisioned_concurrency_invocations** <br>(count) | Mide el número de invocaciones que se ejecutan en la concurrencia aprovisionada<br>_Mostrado como invocación_ |
| **aws.lambda.provisioned_concurrency_spillover_invocations** <br>(count) | Mide el número de invocaciones que se ejecutan en concurrencia no aprovisionada cuando toda la concurrencia aprovisionada está en uso<br>_Mostrado como invocación_ |
| **aws.lambda.provisioned_concurrency_utilization** <br>(gauge) | Mide la fracción media de concurrencia aprovisionada en uso para una función determinada en un momento dado<br>_Mostrado como porcentaje_. |
| **aws.lambda.provisioned_concurrency_utilization.maximum** <br>(gauge) | Mide la fracción máxima de concurrencia aprovisionada en uso para una función determinada en un momento dado<br>_Mostrado como porcentaje_. |
| **aws.lambda.provisioned_concurrency_utilization.minimum** <br>(gauge) | Mide la fracción mínima de concurrencia aprovisionada en uso para una función determinada en un momento dado<br>_Se muestra como porcentaje_. |
| **aws.lambda.provisioned_concurrent_executions** <br>(gauge) | Mide el número medio de eventos que se están procesando en la concurrencia aprovisionada<br>_Mostrado como ejecución_ |
| **aws.lambda.provisioned_concurrent_executions.maximum** <br>(gauge) | Mide el número máximo de eventos que se están procesando en la concurrencia aprovisionada<br>_Mostrado como ejecución_ |
| **aws.lambda.provisioned_concurrent_executions.minimum** <br>(gauge) | Mide el número mínimo de eventos que se están procesando en la concurrencia aprovisionada<br>_Mostrado como ejecución_ |
| **aws.lambda.recursive_invocations_dropped** <br>(count) | Mide el número de veces que Lambda ha detenido la invocación de tu función porque ha detectado que tu función forma parte de un bucle recursivo infinito.<br>_Mostrado como invocación_ |
| **aws.lambda.signature_validation_errors** <br>(count) | Mide el número de veces que una función se despliega correctamente pero falla un check de firma<br>_Mostrado como error_ |
| **aws.lambda.streamed_outbound_bytes** <br>(gauge) | Mide el número de bytes de salida devueltos por una función de respuesta de streaming.<br>_Mostrado como byte_ |
| **aws.lambda.streamed_outbound_throughput** <br>(rate) | Mide el número de bytes devueltos por segundo por una función de respuesta de streaming.<br>_Mostrado como byte_ |
| **aws.lambda.throttles** <br>(count) | Mide el número de intentos de invocación de la función Lambda que se han limitado debido a que las tasas de invocación superan los límites concurrentes del cliente (código de error 429). Las invocaciones fallidas pueden activar un intento de reintento que tenga éxito.<br>_Mostrado como limitación_ |
| **aws.lambda.timeout** <br>(gauge) | Mide la cantidad de tiempo de ejecución permitida para la función antes de que el tiempo de ejecución de Lambda la detenga.<br>_Mostrado como segundo_ |
| **aws.lambda.unreserved_concurrent_executions** <br>(gauge) | Mide la suma de la concurrencia de las funciones que no tienen especificado un límite de concurrencia personalizado.<br>_Mostrado como ejecución_ |
| **aws.lambda.url_4xx_count** <br>(count) | Número de solicitudes que han devuelto un código de estado HTTP 4xx.<br>_Mostrado como error_ |
| **aws.lambda.url_5xx_count** <br>(count) | El número de solicitudes que han devuelto un código de estado HTTP 5xx.<br>_Mostrado como error_ |
| **aws.lambda.url_request_count** <br>(count) | El número de solicitudes que han llegado a esta URL de función.<br>_Mostrado como solicitud_ |
| **aws.lambda.url_request_latency** <br>(gauge) | El tiempo transcurrido entre el momento en que la URL de la función recibió una solicitud y el momento en que recibe una respuesta de la función<br>_Mostrado como milisegundo_. |
| **aws.lambda.url_request_latency.maximum** <br>(gauge) | El tiempo máximo transcurrido entre el momento en que la URL de la función recibió una solicitud y el momento en que recibe una respuesta de la función<br>_Mostrado como milisegundo_. |

### Eventos

La integración de AWS Lambda recopila eventos de despliegue de Lambda de AWS CloudTrail si el [rastreo del despliegue serverless de Datadog](https://docs.datadoghq.com/serverless/aws_lambda/deployment_tracking/) está habilitado.

### Checks de servicio

La integración AWS Lambda no incluye checks de servicios.

### Métricas Lambda mejoradas en tiempo real

Consulta la [Documentación serverless](https://docs.datadoghq.com/serverless/aws_lambda/metrics/#enhanced-lambda-metrics) para obtener más información.

### Métricas personalizadas

Consulta la [Documentación serverless](https://docs.datadoghq.com/serverless/aws_lambda/metrics/#submit-custom-metrics) para obtener más información.

### Recopilación de logs

Consulta la [Documentación serverless](https://docs.datadoghq.com/logs/guide/forwarder/) para obtener más información.

### Recopilación de trazas

Consulta la [Documentación serverless](https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/) para obtener más información.

### Lambda@Edge

Datadog añade automáticamente etiquetas `at_edge`, `edge_master_name` y `edge_master_arn` sobre tus métricas Lambda para ofrecer una vista agregada de las métricas y los logs de tu función Lambda a medida que se ejecutan en localizaciones de Edge.

El rastreo distribuido no es compatible con las funciones Lambda@Edge.

## Monitorización predefinida

La integración AWS Lambda proporciona funciones de monitorización listas para utilizar, para monitorizar y optimizar el rendimiento.

- Dashboard de AWS Lambda: Obtén una visión general amplia de tus funciones Lambda con el [dashboard predefinido de AWS Lambda](https://app.datadoghq.com/screen/integration/98/aws-lambda).
- Monitores recomendados: Activa [Monitores recomendados de AWS Lambda](https://app.datadoghq.com/monitors/recommended) para detectar problemas de forma proactiva y recibir alertas oportunas.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}