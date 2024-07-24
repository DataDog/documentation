---
aliases:
- /es/serverless/real-time-enhanced-metrics
- /es/serverless/real_time_enhanced_metrics
title: Métricas de Lambda mejoradas
---

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Dashboard predeterminado para las métricas mejoradas de Lambda" >}}

## Información general

Datadog genera métricas de Lambda mejoradas a partir del tiempo de ejecución de Lambda de forma inmediata con baja latencia, granularidad de varios segundos y metadatos detallados para arranques en frío y etiquetas (tags) personalizadas.

Las métricas de Lambda mejoradas ofrecen una visión que va más allá de las [métricas de Lambda][1] predeterminadas que se habilitan con la integración de AWS Lambda. Estas métricas se distinguen por estar en el espacio de nombres `aws.lambda.enhanced.*`, y son la práctica recomendada de Datadog para configurar monitores en tiempo real para el estado de las aplicaciones serverless.

### Métricas de Lambda mejoradas en tiempo real

Están disponibles las siguientes métricas de Lambda mejoradas en tiempo real, con las etiquetas `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource` y `runtime`. Estas métricas son [distribuciones][2], y puedes consultarlas mediante las agregaciones `count`, `min`, `max`, `sum` y `avg`.


`aws.lambda.enhanced.invocations`
: Mide el número de veces que se invoca una función en respuesta a un evento o a la invocación de una llamada a la API.

`aws.lambda.enhanced.errors`
: Mide el número de invocaciones que fallaron debido a errores en la función.

`aws.lambda.enhanced.max_memory_used`
: Mide la cantidad máxima de memoria (en MB) utilizada por la función.

`aws.lambda.enhanced.duration`
: Mide los segundos transcurridos desde que el código de la función comienza a ejecutarse como resultado de una invocación hasta que deja de ejecutarse.

`aws.lambda.enhanced.billed_duration`
: Mide el tiempo de funcionamiento facturado de la función (en incrementos de 100 ms).

`aws.lambda.enhanced.init_duration`
: Mide el tiempo de inicialización (en segundos) de una función durante un arranque en frío.

`aws.lambda.enhanced.runtime_duration`
: Mide los milisegundos transcurridos desde que el código de la función comienza a ejecutarse hasta que devuelve la respuesta al cliente, sin contar la duración posterior al tiempo de ejecución añadida por las ejecuciones de la extensión de Lambda.

`aws.lambda.enhanced.post_runtime_duration`
: Mide los milisegundos transcurridos desde que el código de la función devuelve la respuesta al cliente hasta que la función deja de ejecutarse, lo que representa la duración añadida por las ejecuciones de la extensión de Lambda.

`aws.lambda.enhanced.response_latency`
: Mide el tiempo transcurrido en milisegundos desde que se recibe la solicitud de invocación hasta que se envía el primer byte de respuesta al cliente.

`aws.lambda.enhanced.response_duration`
: Mide el tiempo transcurrido en milisegundos desde que se envía al cliente el primer byte de respuesta hasta el último byte de respuesta.

`aws.lambda.enhanced.produced_bytes`
: Mide el número de bytes devueltos por una función.

`aws.lambda.enhanced.estimated_cost`
: Mide el coste total estimado de la invocación a la función (en dólares estadounidenses).

`aws.lambda.enhanced.timeouts`
: Mide el número de veces que se agota el tiempo de espera de una función.

`aws.lambda.enhanced.out_of_memory`
: Mide el número de veces que una función se queda sin memoria.

## Habilitar métricas de Lambda mejoradas

{{< img src="serverless/serverless_custom_metrics.png" alt="Recopilación de métricas mejoradas desde AWS Lambda" >}}

Sigue las [instrucciones de instalación][3] para configurar la instrumentación de tus aplicaciones serverless. Las métricas de Lambda mejoradas están habilitadas por defecto.

## Visualización del dashboard

Una vez que hayas habilitado las métricas de Lambda mejoradas, consulta tu [dashboard predeterminado en la aplicación de Datadog][4].

[1]: /es/integrations/amazon_lambda/#metric-collection
[2]: /es/metrics/distributions/
[3]: /es/serverless/installation/
[4]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics