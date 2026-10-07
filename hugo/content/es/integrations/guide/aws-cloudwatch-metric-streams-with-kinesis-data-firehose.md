---
description: Transmita métricas de CloudWatch a Datadog a través de Amazon Data Firehose
  para una ingesta de baja latencia.
further_reading:
- link: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
  tag: Documentación
  text: Transmisión de métricas - Amazon CloudWatch
- link: https://www.datadoghq.com/blog/amazon-cloudwatch-metric-streams-datadog/
  tag: Blog
  text: Recopile métricas de Amazon CloudWatch mediante Metric Streams
title: AWS CloudWatch Metric Streams con Amazon Data Firehose
---
Al utilizar Amazon CloudWatch Metric Streams y Amazon Data Firehose, puede obtener métricas de CloudWatch en Datadog con solo dos a tres minutos de latencia. Esto es significativamente más rápido que el enfoque de sondeo de API predeterminado de Datadog, que proporciona métricas actualizadas cada 10 minutos. Puede obtener más información sobre el enfoque de sondeo de API en la [documentación de retraso de métricas en la nube][1].

## Descripción general {#overview}

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric_streaming_diagram.png" alt="Diagrama del flujo de métricas" responsive="true">}}

1. Cree un Metric Stream de CloudWatch en cada cuenta y región de AWS para las que desee transmitir métricas.
   - Opcionalmente, especifique un conjunto limitado de espacios de nombres o métricas para transmitir.
2. Una vez que cree el Metric Stream, Datadog comienza a recibir inmediatamente las métricas transmitidas y las muestra en el sitio de Datadog sin necesidad de configuración adicional.

<div class="alert alert-warning">El filtrado de etiquetas configurado en el mosaico de integración de AWS <b>también se aplica</b> a CloudWatch Metric Streams.</div>

### Diferencias entre la transmisión de métricas y el sondeo de API {#streaming-vs-polling}

Las siguientes son diferencias clave entre el uso de Amazon CloudWatch Metric Streams y el sondeo de API.

- **Métricas que se reportan con más de dos horas de retraso**: el sondeo de API continúa recopilando métricas como `aws.s3.bucket_size_bytes` y `aws.billing.estimated_charges` después de que se habilita la transmisión de métricas, ya que estas no se pueden enviar a través de Amazon CloudWatch Metric Stream.

- **Metadatos de métricas**: Datadog continúa utilizando el sondeo de API para recopilar etiquetas personalizadas y otros metadatos para sus métricas transmitidas. Para asegurarse de seguir recibiendo estas métricas, no cambie la configuración en la integración de AWS.

#### Cambio del sondeo de API a transmisión de métricas {#switching-from-api-polling-to-metric-streams}
Si ya recibe métricas para un espacio de nombres de CloudWatch determinado a través del método de sondeo de API, Datadog lo detecta automáticamente y deja de sondear métricas para ese espacio de nombres una vez que comienza a transmitirlas. Deje sin cambios sus ajustes de configuración en la página de integración de AWS; ya que Datadog continúa utilizando el sondeo de API para recopilar etiquetas personalizadas y otros metadatos para sus métricas transmitidas.

#### Volver a cambiar de transmisión de métricas a sondeo de API {#switching-back-from-metric-streams-to-api-polling}

Si más adelante decide que no desea transmitir métricas para una cuenta y región de AWS determinadas, o incluso solo para un espacio de nombres específico, Datadog comienza automáticamente a recopilar esas métricas utilizando el sondeo de API nuevamente según la configuración en la página de integración de AWS. Si desea dejar de transmitir todas las métricas para una cuenta y región de AWS, siga las instrucciones en la sección [Deshabilitar la transmisión de métricas](#disable-metric-streaming) de este documento.

#### Evitar métricas duplicadas durante la migración {#avoiding-duplicate-metrics-during-migration}

Al realizar la transición del sondeo de API a Metric Streams, hay un periodo de superposición donde ambos métodos de recopilación pueden enviar datos para las mismas métricas. Esto puede causar que los valores de las métricas aparezcan duplicados en Datadog.

Para minimizar la duplicación:
1. Habilite Metric Streams para los espacios de nombres y regiones deseados.
2. Espere a que Datadog detecte la transmisión de métricas y detenga el sondeo para esos espacios de nombres. Esta detección puede tardar hasta cinco minutos, pero en la práctica el periodo de superposición puede durar más dependiendo del tiempo de los rastreadores de sondeo activos.
3. Verifique que la transición se haya completado revisando la pestaña **Recopilación de métricas** en la [página de integración de AWS][5] para las regiones en las que la transmisión de métricas esté activada.
4. No modifique su configuración de integración de AWS existente durante la transición. Datadog continúa utilizando el sondeo de API para recopilar etiquetas personalizadas y metadatos para las métricas transmitidas.

<div class="alert alert-info">
Algunas métricas no se pueden enviar a través de CloudWatch Metric Streams, incluyendo <code>aws.s3.bucket_size_bytes</code> y <code>aws.billing.estimated_charges</code>. Datadog continúa recopilándolas mediante sondeo de API independientemente de su configuración de Metric Streams.
</div>

### Facturación {#billing}

No hay cargo adicional de Datadog por transmitir métricas.

AWS cobra según la cantidad de actualizaciones de métricas en CloudWatch Metric Streams y el volumen de datos enviado a Amazon Data Firehose. Como tal, existe la posibilidad de ver un aumento en el costo de CloudWatch para el subconjunto de métricas que está transmitiendo. Por esta razón, Datadog recomienda utilizar la transmisión de métricas para las métricas, servicios, regiones y cuentas de AWS donde más necesite la latencia más baja, y sondeo para los demás. Para obtener más información, consulte [Amazon CloudWatch pricing][2].

Las métricas de EC2 o Lambda en la transmisión de métricas podrían aumentar el número de hosts facturables e invocaciones de Lambda (si esos hosts y funciones aún no se supervisan con la integración de AWS o el Datadog Agent en el caso de EC2).

**Nota**: Puede crear filtros en CloudWatch para transmitir solo las métricas especificadas. Consulte la [guía del usuario de Amazon CloudWatch][7] para obtener más información.

## Configuración {#setup}

### Antes de comenzar {#before-you-begin}

1. Lea atentamente la sección [Diferencias entre la transmisión de métricas y el sondeo ed API](#streaming-vs-polling) para comprender las diferencias antes de habilitar la transmisión de métricas.

2. Si aún no lo ha hecho, conecte su cuenta de AWS a Datadog. Para obtener más información, consulte las [instrucciones de configuración de CloudFormation][3].

### Instalación {#installation}

{{< tabs >}}
{{% tab "CloudFormation" %}}

Datadog recomienda usar CloudFormation porque es automático y más sencillo si utiliza varias regiones de AWS.

**Nota**: La transmisión de métricas solo admite el formato de salida OpenTelemetry. La versión más reciente es la v1.0; la v0.7 es compatible, pero puede provocar la pérdida de métricas.

1. En su sitio de Datadog, vaya a la pestaña **Configuration** de la [página de integración de AWS][1].
2. Haga clic en la cuenta de AWS para configurar transmisión de métricas.
3. En **Metric Collection**, haga clic en **Automatically Using CloudFormation** bajo **CloudWatch Metric Streams** para iniciar una pila en la consola de AWS.
 {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-setup.png" alt="La sección CloudWatch Metric Streams de la pestaña Metric Collection de la página de integración de AWS con el botón Automatically Using CloudFormation resaltado" responsive="true" style="width:60%;" >}}
4. Complete los parámetros requeridos:
   - **ApiKey**: Agregue su [clave de Datadog API][2].
   - **DdSite**: Seleccione su [sitio de Datadog][3]. Su sitio es: {{< region-param key="dd_site" code="true" >}}
   - **Regiones**: Una lista separada por comas de las regiones que desea configurar para transmisión de métricas. Para obtener una lista completa de las regiones admitidas, consulte la documentación de AWS sobre [Uso de transmisión de métricas][4].
5. Complete los parámetros opcionales:
   - **FilterMethod**: Lista de inclusión o exclusión de espacios de nombres para incluir en la transmisión de métricas.
   - **Primer/Segundo/Tercer espacio de nombres**: Especifique los espacios de nombres que desea incluir o excluir. Nota: Los valores de los espacios de nombres deben coincidir exactamente con los valores de la columna de espacios de nombres en la documentación de AWS. Por ejemplo, AWS/EC2.
6. Marque la casilla de confirmación que indica: \"Reconozco que AWS CloudFormation podría crear recursos de IAM con nombres personalizados\".
7. Haga clic en **Create Stack**.

### Resultados {#results}

Una vez que la pila se haya creado correctamente, espere cinco minutos para que Datadog reconozca el cambio. Para validar la finalización, vaya a la pestaña **Recopilación de métricas** en la [página de integración de AWS][1] de Datadog y verifique que las regiones activadas aparezcan para la cuenta seleccionada.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="La sección CloudWatch Metric Streams de la pestaña Recopilación de métricas de la página de integración de AWS con una región activada" responsive="true" style="width:60%;">}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/getting_started/site/
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
{{% /tab %}}
{{% tab "Consola de AWS" %}}

Para configurar transmisiones de métricas mediante la consola de AWS, cree un [CloudWatch Metric Stream][1] para cada región de AWS.

**Nota**: La transmisión de métricas solo admite el formato de salida OpenTelemetry. La versión más reciente es la v1.0; la v0.7 es compatible, pero puede provocar la pérdida de métricas.

1. Elija la **Configuración rápida de socio de AWS** y seleccione **Datadog** como destino del socio de AWS en el menú desplegable.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-partner-setup.png" alt="Configuración rápida de socio para el flujo de métricas de Cloudwatch" responsive="true" style="width:60%;">}}
2. Elija el sitio de Datadog al que desea transmitir las métricas e ingrese su [clave de Datadog API][2].
3. Elija si desea transmitir todas las métricas de CloudWatch o solo espacios de nombres específicos. También tiene la opción de excluir métricas específicas. Si se encuentra en una cuenta de monitoreo, también puede optar por habilitar la [transmisión entre cuentas][3].
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-namespace-filter.png" alt="Flujo de métricas de Cloudwatch" responsive="true" style="width:60%;">}}
4. En **Agregar estadísticas adicionales**, incluya las métricas de percentiles de AWS para enviar a Datadog. Consulte la [plantilla de CloudFormation][4] para obtener una lista de las métricas de percentiles que Datadog admite mediante sondeo.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/percentiles.png" alt="Percentiles" responsive="true" style="width:60%;">}}
5. Asigne un nombre a su flujo de métricas.
6. Haga clic en **Crear transmisión de métrica**.

### Resultados {#results-1}

Después de ver que el recurso Metric Stream se ha creado correctamente, espere cinco minutos para que Datadog reconozca el cambio. Para validar la finalización, vaya a la pestaña **Metric Collection** en la [página de integración de AWS][5] de Datadog y verifique que las regiones activadas estén habilitadas en **CloudWatch Metric Streams** para la cuenta de AWS especificada.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="La sección CloudWatch Metric Streams de la pestaña Recopilación de métricas de la página de integración de AWS con una región activada" responsive="true" style="width:60%;">}}

**Nota**: Si ya ha habilitado el sondeo de las API de CloudWatch, la transición al streaming podría causar un breve período (de hasta cinco minutos) en el que las métricas específicas que está transmitiendo se contabilicen por duplicado en Datadog. Esto se debe a la diferencia de tiempo entre el momento en que los rastreadores de Datadog se ejecutan y envían sus métricas de CloudWatch, y el momento en que Datadog reconoce que usted ha comenzado a transmitir esas métricas y desactiva los rastreadores.

[1]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/#cross-account-metric-streaming
[4]: https://github.com/DataDog/cloudformation-template/blob/master/aws_streams/streams_single_region.yaml#L168-L249
[5]: https://app.datadoghq.com/integrations/amazon-web-services
{{% /tab %}}
{{< /tabs >}}

### Transmisión de métricas entre cuentas {#cross-account-metric-streaming}
Utilice la transmisión de métricas entre cuentas para incluir métricas en una única Metric Stream que abarque varias cuentas de AWS dentro de una región de AWS. Esto ayuda a reducir la cantidad de transmisiones de métricas necesarias para recopilar métricas para un destino común. Para hacer esto, [conecte sus cuentas de fuente][4] con su cuenta de monitoreo y habilite la transmisión entre cuentas a Datadog en su cuenta de monitoreo de AWS.

Su cuenta de monitoreo necesita tener los siguientes permisos para que esta función funcione correctamente:
   * oam:ListSinks
   * oam:ListAttachedLinks

**Nota:** Para recopilar etiquetas personalizadas y otros metadatos para sus métricas transmitidas, integre sus cuentas de fuente con Datadog.

### Deshabilitar la transmisión de métricas{#disable-metric-streaming}

Para deshabilitar la transmisión de métricas por completo para una cuenta y región de AWS determinadas, debe eliminar el AWS Metric Stream y sus recursos relacionados. Para evitar la pérdida de métricas en Datadog, es importante seguir estos pasos de eliminación cuidadosamente:

Si configuró la transmisión con [CloudFormation](?tab=cloudformation#installation):
1. Elimine la pila que se creó durante la configuración.

Si configuró la transmisión a través de la [Consola de AWS](?tab=awsconsole#installation):
1. Elimine el CloudWatch Metric Stream vinculado a su transmisión de entrega.
2. Elimine todos los recursos que se crearon al configurar el flujo, incluidos los roles de IAM de S3 y Firehose que están asociados con el flujo.

Una vez eliminados los recursos, espere cinco minutos para que Datadog reconozca el cambio. Para validar la finalización, vaya a la pestaña **Recopilación de métricas** en la [página de integración de AWS][5] de Datadog y verifique que las regiones deshabilitadas no se muestren en **Transmisiones de métricas de CloudWatch** para la cuenta de AWS especificada.

### Hacer un seguimiento del estado de la transmisión {#monitor-stream-health}

Datadog envía la métrica `datadog.aws_metric_streams.data_received` cuando recibe datos de una transmisión de métricas de CloudWatch. Utilice esta métrica para confirmar que AWS está enviando métricas y que Datadog las está recibiendo.

`datadog.aws_metric_streams.data_received`
: **Tipo**: Gauge<br>
Informa un valor de `1` cuando Datadog recibe datos de un CloudWatch Metric Stream, y no informa cuando Datadog no recibe datos. Etiquetado con `stream_arn`, `stream_name`, `aws_account` y `region`. La frecuencia con la que informa la métrica depende de su volumen de datos y de la configuración de almacenamiento en búfer de su flujo de entrega de Firehose.

Para un flujo entre cuentas, el flujo de métricas y el flujo de entrega de Firehose se encuentran en la cuenta de monitoreo. La etiqueta `aws_account` identifica la cuenta de monitoreo, no las cuentas fuente de las que provienen las métricas.

Para verificar si un stream está entregando datos, consulte esta métrica en el [Metrics Explorer][8] y agrúpela por `stream_name` o `stream_arn`.

Debido a que la métrica no informa cuando un flujo deja de entregar datos, haga un seguimiento para detectar la transición de informar a no tener datos. Cree un [monitor de métricas][9] en `datadog.aws_metric_streams.data_received`, agrúpelo por `stream_arn` y habilite las notificaciones de datos faltantes. Para conocer los pasos de configuración, consulte [Configurar una alerta para cuando una etiqueta específica deja de informar][10].

## Solución de problemas {#troubleshooting}

Si encuentra problemas al configurar Metric Streams o los recursos asociados, consulte [Solución de problemas de AWS][6]. Si las métricas de CloudWatch dejan de aparecer después de que Metric Streams haya estado funcionando correctamente, el problema puede deberse a errores de destino de Firehose.

### Errores persistentes de destino de Firehose {#persistent-firehose-destination-errors}

Si las métricas de CloudWatch dejan de aparecer en Datadog, el flujo de métricas de CloudWatch y el flujo de entrega de Amazon Data Firehose aún pueden mostrar un estado de `running`. Esto puede suceder incluso cuando Firehose ya no entrega registros.

Esto puede suceder cuando Firehose no puede entregar registros al punto de conexión HTTP de Datadog dentro de su [período de reintento][11], ni escribir los registros en su respaldo de S3. Cuando ambas rutas de entrega fallan, es posible que el flujo de entrega no reanude automáticamente la entrega HTTP después de que el punto de conexión vuelva a estar disponible.

Para diagnosticar y restaurar la entrega:

1. Localice el flujo de entrega de Firehose asociado con el flujo de métricas de CloudWatch afectado. Ejecute el siguiente comando de AWS CLI para encontrar el `FirehoseArn` en la respuesta:

   ```shell
   aws cloudwatch get-metric-stream \
     --name <METRIC_STREAM_NAME> \
     --region <AWS_REGION>
   ```

2. Revise los [registros de errores de entrega de Firehose][12] en CloudWatch Logs. Si el registro de errores de entrega no está habilitado, habilítelo para que pueda capturar futuros errores de entrega. Los errores relevantes incluyen `HttpEndpoint.DestinationException` (como respuestas HTTP 408) y `S3.AccessDenied`.
3. Inspeccione las [métricas de CloudWatch de Firehose][13] en la consola de CloudWatch (es posible que Datadog no muestre estas métricas mientras la entrega esté interrumpida). Verifique `DeliveryToHttpEndpoint.Success`, `DeliveryToHttpEndpoint.DataFreshness`, `DeliveryToHttpEndpoint.Records` y `IncomingRecords`.
4. Si Firehose recibe registros pero no los entrega, verifique la configuración de respaldo de S3 y el rol de IAM:
   - Confirme que Firehose pueda asumir el rol configurado y escribir en el bucket de respaldo.
   - Verifique que la política del bucket, el límite de permisos, las políticas de control de servicio (SCP) y la política de claves KMS no denieguen el acceso requerido.
5. Verifique si los registros están llegando a S3 buscando en el bucket de respaldo bajo el prefijo configurado en la configuración de respaldo de S3 de su flujo de entrega de Firehose. Si no se están escribiendo objetos, esto confirma un problema de permisos o configuración con la ruta de respaldo de S3. Si los registros de errores de entrega del paso 2 muestran un error de permisos de S3, corríjalo antes de continuar.
6. Actualice la configuración de destino HTTP de Firehose usando la [API UpdateDestination][14] de Firehose; por ejemplo, cambiando su duración de reintento. Una actualización de configuración como esta puede reiniciar un destino estancado.

Si la entrega no se recupera, contacte a [Datadog Support][15] y proporcione:
   - El ID de la cuenta de AWS y la región
   - Los ARN del flujo de métricas de CloudWatch y del flujo de entrega de Firehose
   - La hora aproximada en que se detuvo la entrega
   - Registros de errores relevantes de Firehose

**Nota**: Reiniciar la entrega afecta solo a los registros nuevos y no rellena los registros que fallaron durante la interrupción. Los registros escritos en la copia de seguridad de S3 no se ingieren automáticamente en Datadog.

## Lecturas adicionales {#further-reading}
 {{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/guide/cloud-metric-delay/
[2]: https://aws.amazon.com/cloudwatch/pricing/
[3]: /es/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account-Setup.html
[5]: https://app.datadoghq.com/integrations/amazon-web-services
[6]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-troubleshoot.html
[7]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
[8]: https://app.datadoghq.com/metric/explorer
[9]: /es/monitors/types/metric/
[10]: /es/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/
[11]: https://docs.aws.amazon.com/firehose/latest/dev/retry.html
[12]: https://docs.aws.amazon.com/firehose/latest/dev/monitoring-with-cloudwatch-logs.html
[13]: https://docs.aws.amazon.com/firehose/latest/dev/monitoring-with-cloudwatch-metrics.html#fh-http-metrics
[14]: https://docs.aws.amazon.com/firehose/latest/APIReference/API_UpdateDestination.html
[15]: /es/help/