---
aliases:
- /es/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
- /es/integrations/faq/aws-integration-and-cloudwatch-faq
title: FAQ de la integración AWS y CloudWatch
---

### ¿Puedo recopilar métricas personalizadas de AWS a través de esta integración?

Sí. Activa **Recopilar métricas personalizadas** en la pestaña **Recopilación de métricas** de la página de la [integración AWS][1].

### ¿Cómo puedo recopilar métricas de un servicio para el que Datadog no tiene una integración oficial?

Las métricas de AWS procedentes de un `AWS/<namespace>` para el que no existe una integración oficial también se introducen en el espacio de nombres personalizado cuando la opción `Collect custom metrics` está activada. Puedes filtrar estas métricas y conservar sólo aquellas que prefieras utilizando la cadena de filtros en el espacio de nombres personalizado con la API de [configuración de un filtro de etiquetas (tags) de AWS][2].

### ¿Cómo la integración AWS Datadog utiliza CloudWatch?

Datadog utiliza las API de monitorización de CloudWatch para monitorizar tus recursos AWS. Nuestro uso principal de estas API es para la recopilación de datos de métricas sin procesar a través del endpoint `GetMetricData`.

Otras API se utilizan para enriquecer datos de métricas. Algunos ejemplos son:

 * Recopilación de etiquetas personalizadas para añadir a las métricas

 * Recopilación de información sobre el estado o la salud de los recursos, como el silenciado automático

 * Recopilación de flujos de logs

### ¿Cuántas solicitudes API se realizan y cómo puedo monitorizar mi uso de CloudWatch?

Datadog reúne las métricas disponibles cada 10 minutos de cada subintegración AWS que hayas instalado. Si tienes un gran número de recursos AWS para una determinada subintegración (SQS, ELB, DynamoDB, métricas personalizadas de AWS), esto puede reflejarse en tu factura de AWS CloudWatch.

Puedes monitorizar tu uso de la API CloudWatch utilizando la [integración de la facturación AWS][3].

### ¿Cómo puedo reducir el tiempo que tardan mis métricas de CloudWatch en llegar a Datadog?

Por defecto, Datadog recopila métricas de AWS cada 10 minutos. Para obtener más información, consulta [Retraso de las métricas de nube][4]. Si necesitas reducir la latencia, ponte en contacto con el [servicio de asistencia de Datadog][5] para obtener ayuda. Para obtener métricas de CloudWatch en Datadog más rápido con una latencia de 2 a 3 minutos, se recomienda utilizar [Amazon CloudWatch Metric Streams y Amazon Data Firehose][6]. 


### ¿Por qué sólo veo los valores medios de mis métricas personalizadas de AWS/CloudWatch?

Por defecto, Datadog sólo recopila los valores medios de tus métricas personalizadas de AWS/CloudWatch. Sin embargo, puedes obtener valores adicionales poniéndote en contacto con el [servicio de asistencia de Datadog][5]. Entre ellos se incluyen (si están disponibles) el mínimo, el máximo, la suma y el recuento de muestras.

### ¿Existe alguna discrepancia entre mis datos en CloudWatch y Datadog?

Algunas distinciones importantes que hay que tener en cuenta:

- Datadog recopila una única estadística de CloudWatch para la métrica de CloudWatch equivalente en Datadog. La comparación de `Sum` en CloudWatch con `Average` en Datadog da lugar a discrepancias. Para algunas métricas de CloudWatch pueden ser útiles múltiples estadísticas y Datadog crea diferentes nombres de métricas para la misma métrica de CloudWatch con diferentes estadísticas. Por ejemplo, `aws.elb.latency` y `aws.elb.latency.maximum`.
- En AWS para contadores, un gráfico configurado en `sum` `1 minute` muestra el número total de ocurrencias en un minuto hasta ese punto (la frecuencia por un minuto). Datadog muestra los datos sin procesar de AWS normalizados a valores por segundo, independientemente del periodo de tiempo seleccionado en AWS. Por lo tanto, es posible que veas un valor más bajo en Datadog.
- En general, `min`, `max` y `avg` tienen distintos significados en AWS. AWS recopila específicamente la latencia media, la latencia mínima y la latencia máxima. Cuando se extraen métricas de AWS CloudWatch, Datadog sólo recibe la latencia media como una única serie temporal por ELB. En Datadog, cuando se selecciona `min`, `max` o `avg`, se controla cómo se combinan las series temporales múltiples. Por ejemplo, al solicitar `system.cpu.idle` sin ningún filtro se obtiene una serie por cada host que informa esa métrica. Datadog combina estas series temporales utilizando la [agregación espacial][7]. De lo contrario, si solicitas `system.cpu.idle` a partir de un único host, no es necesaria ninguna agregación y el cambio entre `avg` y `max` produce el mismo resultado.

### ¿Cómo ajusto mis datos en Datadog para que coincidan con los que aparecen en CloudWatch?

AWS CloudWatch informa métricas con una granularidad de un minuto normalizada a datos por minuto. Datadog informa métricas con una granularidad de un minuto normalizada a datos por segundo. Para ajustar los datos en Datadog, multiplica por 60.  Asegúrate también de que la estadística de la métrica es la misma. Por ejemplo, la métrica `IntegrationLatency` obtiene una cantidad de estadísticas diferentes": Medio, Máximo, Mínimo, así como percentiles. En Datadog, estas estadísticas se representan cada uno como sus propias métricas:
  ```
aws.apigateway.integration_latency (average)
aws.apigateway.integration_latency.maximum
aws.apigateway.integration_latency.minimum
aws.apigateway.integration_latency.p50
  ```


#### ¿Ajustará mis datos un rollup()?

Los rollups no muestran resultados similares. Para una llamada a rollup de `rollup(sum, 60)`, el servidor agrupa todos los puntos de datos en intervalos de minutos y devuelve la suma de cada intervalo como un punto de datos. Sin embargo, la granularidad de las métricas de AWS es de un minuto, por lo que sólo hay un punto de datos por intervalo y no se produce ningún cambio.

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/es/api/latest/aws-integration/#set-an-aws-tag-filter
[3]: /es/integrations/amazon_billing/
[4]: /es/integrations/guide/cloud-metric-delay/
[5]: /es/help/
[6]: https://docs.datadoghq.com/es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[7]: /es/metrics/introduction/#space-aggregation