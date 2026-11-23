---
aliases:
- /es/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
- /es/integrations/faq/aws-integration-and-cloudwatch-faq
description: Preguntas frecuentes sobre la integración de Datadog con AWS y la recopilación
  de métricas de CloudWatch.
title: Preguntas frecuentes sobre la integración de AWS y CloudWatch
---
### ¿Puedo recopilar Custom Metrics de AWS a través de la integración? {#can-i-collect-aws-custom-metrics-through-the-integration}

Sí Habilite **Collect Custom Metrics** en la pestaña **Recopilación de métricas** en la [página de integración de AWS][1].

### ¿Puedo filtrar las métricas de AWS por nombre de métrica? {#can-i-filter-aws-metrics-by-metric-name}

Sí En la [página de integración de AWS][1], abra la pestaña **Recopilación de métricas**, expanda un espacio de nombres de CloudWatch y agregue filtros de nombres de métricas. Utilice **Incluir** para recopilar solo los nombres de métricas de Datadog que coincidan para ese espacio de nombres, o **Excluir** para recopilar todo excepto los nombres de métricas que coincidan.

Para obtener más información sobre la sintaxis y las métricas requeridas, consulte [Introducción a AWS][14]. Para administrar los filtros de nombres de métricas mediante programación, consulte [Configurar filtros de nombres de métricas de AWS con la API][15].

### ¿Cómo recopilo métricas de un servicio para el cual Datadog no tiene una integración oficial? {#how-do-i-collect-metrics-from-a-service-for-which-datadog-doesnt-have-an-official-integration}

Las métricas de AWS que provienen de un `AWS/<namespace>` para el cual no existe una integración oficial también se incluyen en el espacio de nombres personalizado cuando la opción `Collect custom metrics` está habilitada. Puede filtrar estas métricas y conservar solo las que desee utilizando la cadena de filtro en el espacio de nombres personalizado con la API [Establecer un filtro de etiquetas de AWS][2].

### ¿Cómo utiliza la integración de Datadog con AWS CloudWatch? {#how-does-the-datadog-aws-integration-use-cloudwatch}

Datadog utiliza las API de monitoreo de CloudWatch para hacer un seguimiento de sus recursos de AWS. Nuestro uso principal de estas API es recopilar datos de métricas sin procesar a través del punto de conexión `GetMetricData`.

Se utilizan otras API para enriquecer los datos de las métricas. Algunos ejemplos incluyen:

 * Recopilando etiquetas personalizadas para agregar a las métricas

 * Recopilando información sobre el estado o la salud de los recursos, como el silenciamiento automático

 * Recopilando flujos de registros

### ¿Cuántas solicitudes de API se realizan y cómo puedo hacer un seguimiento de mi uso de CloudWatch? {#how-many-api-requests-are-made-and-how-can-i-monitor-my-cloudwatch-usage}

Datadog recopila las métricas disponibles cada 10 minutos para cada subintegración de AWS que tenga instalada. Si tiene una gran cantidad de recursos de AWS para una subintegración en particular (SQS, ELB, DynamoDB, Custom Metrics de AWS), esto puede afectar su factura de AWS CloudWatch.

Puede hacer un seguimiento de su uso de la API de CloudWatch utilizando la [integración de facturación de AWS][3].

### ¿Cómo puedo reducir el retraso en la recepción de mis métricas de CloudWatch en Datadog? {#how-can-i-reduce-the-delay-of-receiving-my-cloudwatch-metrics-to-datadog}

De forma predeterminada, Datadog recopila métricas de AWS cada 10 minutos. Consulte [Cloud Metric Delay][4] para obtener más información. Si necesita reducir la latencia, comuníquese con el [soporte de Datadog][5] para obtener asistencia. Para obtener métricas de CloudWatch en Datadog más rápido con una latencia de 2 a 3 minutos, recomendamos usar [Amazon CloudWatch Metric Streams y Amazon Data Firehose][6]. 


### ¿Por qué solo veo los valores promedio de mis métricas personalizadas de AWS/CloudWatch? {#why-am-i-only-seeing-the-average-values-of-my-custom-awscloudwatch-metrics}

De forma predeterminada, Datadog solo recopila los valores promedio de sus métricas personalizadas de AWS/CloudWatch. Sin embargo, hay valores adicionales disponibles comunicándose con el [soporte de Datadog][5]. Estos incluyen (donde estén disponibles) el mínimo, máximo, suma y recuento de muestras.

### ¿Existe una discrepancia entre mis datos en CloudWatch y Datadog? {#is-there-a-discrepancy-between-my-data-in-cloudwatch-and-datadog}

Algunas distinciones importantes que debe tener en cuenta:

- Datadog recopila una única estadística de CloudWatch para la métrica de CloudWatch equivalente en Datadog. Comparar `Sum` en CloudWatch con `Average` en Datadog resulta en discrepancias. Para algunas métricas de CloudWatch, varias estadísticas pueden ser útiles y Datadog crea diferentes nombres de métricas para la misma métrica de CloudWatch con diferentes estadísticas. Por ejemplo, `aws.elb.latency` y `aws.elb.latency.maximum`.
- En AWS para contadores, un gráfico configurado en `sum` `1 minute` muestra el número total de ocurrencias en un minuto hasta ese punto (la tasa por un minuto). Datadog muestra los datos sin procesar de AWS normalizados a valores por segundo, independientemente del marco de tiempo seleccionado en AWS. Por lo tanto, es posible que vea un valor más bajo en Datadog.
- En general, `min`, `max` y `avg` tienen significados diferentes dentro de AWS. AWS recopila de forma distinta la latencia promedio, la latencia mínima y la latencia máxima. Al extraer métricas de AWS CloudWatch, Datadog solo recibe la latencia promedio como una única serie temporal por ELB. Dentro de Datadog, cuando selecciona `min`, `max` o `avg`, usted controla cómo se combinan varias series temporales. Por ejemplo, solicitar `system.cpu.idle` sin ningún filtro devuelve una serie para cada servidor que informa esa métrica. Datadog combina estas series temporales mediante [desglose espacial][7]. De lo contrario, si solicitó `system.cpu.idle` desde un solo servidor, no es necesaria ninguna agregación y cambiar entre `avg` y `max` produce el mismo resultado.

### ¿Cómo ajusto mis datos en Datadog para que coincidan con los datos mostrados en CloudWatch? {#how-do-i-adjust-my-data-on-datadog-to-match-the-data-displayed-in-cloudwatch}

AWS CloudWatch informa métricas con una granularidad de un minuto normalizadas a datos por minuto. Datadog informa métricas con una granularidad de un minuto normalizadas a datos por segundo. Para ajustar los datos en Datadog, multiplique por 60. Asegúrese también de que la estadística de la métrica sea la misma. Por ejemplo, la métrica `IntegrationLatency` obtiene una serie de estadísticas diferentes: promedio, máximo, mínimo, así como percentiles. En Datadog, cada una de estas estadísticas se representa como sus propias métricas:
  ```
aws.apigateway.integration_latency (average)
aws.apigateway.integration_latency.maximum
aws.apigateway.integration_latency.minimum
aws.apigateway.integration_latency.p50
  ```


#### ¿Un rollup() ajustará mis datos? {#will-a-rollup-adjust-my-data}

Los rollups no muestran resultados similares. Para una llamada de rollup de `rollup(sum, 60)`, el servidor agrupa todos los puntos de datos en contenedores de un minuto y devuelve la suma de cada contenedor como un punto de datos. Sin embargo, la granularidad de las métricas de AWS es de un minuto, por lo que solo hay un punto de datos por contenedor, lo que no genera cambios.

### ¿Por qué no veo métricas para un nuevo servicio de AWS que habilité? {#why-dont-i-see-metrics-for-a-new-aws-service-i-enabled}

Si habilitó recientemente una nueva integración de servicio de AWS pero no ve las métricas en Datadog, verifique lo siguiente:

1. **Permisos de IAM**: Confirme que el rol de IAM o el usuario de IAM asociado con la integración de Datadog incluya los permisos requeridos por el servicio. Consulte las [páginas de integración de AWS][8] individuales para conocer los requisitos de permisos específicos del servicio.
2. **Región**: Confirme que la región de AWS donde están implementados sus recursos esté habilitada en la [página de integración de AWS][1].
3. **Disponibilidad de CloudWatch**: Abra la consola de CloudWatch en AWS y confirme que existan las métricas esperadas. Algunos servicios no emiten métricas de CloudWatch hasta que se cumplen condiciones específicas (por ejemplo, un ELB sin instancias adjuntas no emite métricas).
4. **Retraso de sondeo**: El sondeo de API recopila métricas aproximadamente cada 10 minutos. Si utiliza [CloudWatch Metric Streams][6], espere un retraso de 2 a 3 minutos. Espere al menos un ciclo de sondeo antes de investigar más a fondo.

### ¿Cuál es la diferencia entre el sondeo de API y CloudWatch Metric Streams? {#what-is-the-difference-between-api-polling-and-cloudwatch-metric-streams}

| &nbsp; | Sondeo de API (predeterminado) | CloudWatch Metric Streams |
|---|---|---|
| **Latencia típica** | ~10 minutos | 2-3 minutos |
| **Configuración** | Incluida con la integración de AWS | Requiere configuración por separado con [Amazon Data Firehose][6] |
| **Costo de AWS** | CloudWatch `GetMetricData` llamadas a la API | Cargos de entrega de CloudWatch Metric Streams y Firehose |
| **Cobertura** | Todos los espacios de nombres estándar de CloudWatch; los espacios de nombres personalizados requieren que **Collect Custom Metrics** esté habilitado | La mayoría de los espacios de nombres de CloudWatch (se aplican algunas exclusiones) |
| **Espacios de nombres personalizados** | Admitidos con **Collect Custom Metrics** habilitado | Admitidos al incluir el espacio de nombres en la configuración de la transmisión |

Para obtener más detalles, consulte [Cloud Metric Delay][4] y la [guía de CloudWatch Metric Streams][6].

### ¿Por qué mis valores de métricas parecen duplicados después de habilitar Metric Streams? {#why-do-my-metric-values-look-doubled-after-enabling-metric-streams}

Al realizar la transición del sondeo de API a CloudWatch Metric Streams, hay un periodo de superposición donde ambos métodos de recopilación envían datos para las mismas métricas. Esto puede causar que los valores de las métricas aparezcan duplicados en Datadog.

Datadog detecta automáticamente los espacios de nombres transmitidos y deja de consultarlos, por lo que no necesita deshabilitar manualmente el sondeo de API. Deje su configuración en la [página de integración de AWS][1] sin cambios, ya que Datadog continúa utilizando el sondeo de API para recopilar etiquetas personalizadas, metadatos y métricas que no se pueden enviar a través de Metric Streams (como `aws.s3.bucket_size_bytes` y `aws.billing.estimated_charges`).

La detección suele tardar hasta cinco minutos, pero el periodo de superposición puede durar más dependiendo del tiempo de los rastreadores de sondeo activos. Si los valores siguen apareciendo duplicados después de varios minutos, consulte la [guía de CloudWatch Metric Streams][6] para solucionar problemas.

### ¿Qué servicios de AWS requieren configuración adicional más allá de la integración principal? {#which-aws-services-require-additional-setup-beyond-the-core-integration}

Algunos servicios de AWS no emiten métricas a CloudWatch por defecto y requieren una configuración adicional:

| Servicio | Configuración adicional necesaria |
|---|---|
| Amazon RDS (métricas a nivel de SO) | Habilite [Enhanced Monitoring][9] en la consola de RDS |
| Amazon S3 (métricas de Storage Lens) | Configure [Storage Lens][10] en la consola de S3 |
| Métricas de facturación de AWS | Habilite `Billing` en la [Metric Collection tab][1], agregue el permiso `budgets:ViewBudget` y [habilite las métricas de facturación][11] en la consola de AWS. Consulte [Haga un seguimiento de los detalles de facturación de AWS][13] para obtener instrucciones completas. |
| Espacios de nombres personalizados de CloudWatch | Habilitar **Collect Custom Metrics** en la [Metric Collection tab][1] |
| Monitoreo detallado de EC2 | Habilite el [detailed monitoring][12] por instancia en la consola de EC2 |

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/es/api/latest/aws-integration/#set-an-aws-tag-filter
[3]: /es/integrations/amazon_billing/
[4]: /es/integrations/guide/cloud-metric-delay/
[5]: /es/help/
[6]: https://docs.datadoghq.com/es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[7]: /es/metrics/introduction/#space-aggregation
[8]: /es/integrations/#cat-aws
[9]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.Enabling.html
[10]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html
[11]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[12]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch-new.html
[13]: /es/integrations/guide/monitor-your-aws-billing-details/
[14]: /es/getting_started/integrations/aws/#filter-metrics-by-metric-name
[15]: /es/integrations/guide/aws-metric-name-filters/