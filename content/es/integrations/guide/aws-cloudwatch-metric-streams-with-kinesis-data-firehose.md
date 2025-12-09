---
further_reading:
- link: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
  tag: Documentación
  text: Metric Streams - Amazon CloudWatch
- link: https://www.datadoghq.com/blog/amazon-cloudwatch-metric-streams-datadog/
  tag: Blog
  text: Recopilación de métricas de Amazon CloudWatch con Metric Streams
title: AWS CloudWatch Metric Streams con Amazon Data Firehose
---

Con Amazon CloudWatch Metric Streams y Amazon Data Firehose, puedes obtener métricas de CloudWatch en Datadog con una latencia de solo dos a tres minutos. Esto es significativamente más rápido que el enfoque de sondeo de API predeterminado de Datadog, que proporciona métricas actualizadas cada 10 minutos. Puedes obtener más información sobre el enfoque de sondeo de API en la [documentación de Cloud Metric Delay][1].

## Información general

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric_streaming_diagram.png" alt="Diagrama del flujo de métricas" responsive="true">}}

1. Crea un CloudWatch Metric Stream en cada cuenta y región de AWS para la que desees transmitir métricas.
   - Opcionalmente, especifica un conjunto limitado de espacios de nombres o métricas para transmitir.
2. Una vez que creas el Metric Stream, Datadog comienza a recibir inmediatamente las métricas transmitidas y las muestra en el sitio de Datadog sin necesidad de configuración adicional.

<div class="alert alert-warning">El filtrado por espacio de nombres configurado en el cuadro de integración de AWS <b>también se</b> aplica a CloudWatch Metric Streams.</div>

### Transmisión de métricas versus sondeo de API {#streaming-vs-polling}

A continuación se indican las principales diferencias entre el uso de CloudWatch Metric Streams y el sondeo de API.

- **Métricas que informan con un retraso de más de dos horas**: el sondeo de API continúa recopilando métricas como `aws.s3.bucket_size_bytes` y `aws.billing.estimated_charges` después de que se habilita la transmisión de métricas, ya que estas no se pueden enviar a través de CloudWatch Metric Stream.

- **Metadatos de métricas**: Datadog sigue utilizando el sondeo de la API para recopilar etiquetas (tags) personalizadas y otros metadatos de tus métricas transmitidas. Para asegurarte de que sigues recibiendo estas métricas, no cambies la configuración en la integración AWS.

#### Cambio del sondeo de API a los flujos de métricas
Si ya recibes métricas para un espacio de nombres de CloudWatch determinado a través del método de sondeo de API, Datadog lo detecta automáticamente y deja de sondear las métricas para ese espacio de nombres una vez que comienzas a transmitirlas. Deja la configuración en la página de integración de AWS sin cambios, ya que Datadog continúa usando el sondeo de API para recopilar etiquetas personalizadas y otros metadatos para las métricas transmitidas.

#### Cambio de los flujos de métricas al sondeo de API

Si más adelante decides que no deseas transmitir métricas para una cuenta y una región de AWS determinadas, o incluso solo para un espacio de nombres específico, Datadog comienza automáticamente a recopilar esas métricas mediante el sondeo de API nuevamente según los ajustes de configuración de la página de integración de AWS. Si deseas dejar de transmitir todas las métricas para una cuenta y una región de AWS, sigue las instrucciones de la sección [Deshabilitar la transmisión de métricas](#disable-metric-streaming) de este documento.

### Facturación

Datadog no cobra ningún cargo adicional por transmitir métricas.

AWS factura en función del número de actualizaciones de métricas en CloudWatch Metric Streams y del volumen de datos enviados a Amazon Data Firehose. Por lo tanto, existe la posibilidad de que aumente el coste de CloudWatch para el subconjunto de datos que estás transmitiendo. métricas que esté transmitiendo. Por esta razón, Datadog recomienda el uso de flujos de métricas, para métricas, servicios, regiones y cuentas de AWS en los que más necesites una latencia más baja, y el sondeo, para los demás. Para obtener más información, consulta la [facturación de Amazon CloudWatch][2].

Las métricas de EC2 o Lambda en la transmisión podrían aumentar la cantidad de hosts e invocaciones de Lambda facturables (si esos hosts y funciones aún no se monitorizan con la integración de AWS o el Datadog Agent en el caso de EC2).

**Nota**: Puedes crear filtros en CloudWatch para transmitir sólo las métricas especificadas. Para obtener más información, consulta la [Guía del usuario de Amazon CloudWatch][7].

## Instalación

### Antes de empezar

1. Lea atentamente la sección [Transmisión de métricas versus sondeo de la API](#streaming-vs-polling) para comprender las diferencias antes de activar la transmisión de métricas.

2. Si aún no lo has hecho, conecta tu cuenta de AWS a Datadog. Para obtener más información, consulta las [Instrucciones de configuración de CloudFormation][3].

### Instalación

{{< tabs >}}
{{% tab "CloudFormation" %}}

Datadog recomienda utilizar CloudFormation porque es automático y más sencillo si se utilizan varias regiones de AWS.

**Nota**: Actualmente, la transmisión de métricas a Datadog solo admite el formato de salida OpenTelemetry v0.7.

1. En tu sitio de Datadog, ve a la pestaña **Configuration** de la [página de integración de AWS][1].
2. Haz clic en la cuenta de AWS para configurar la transmisión de métricas.
3. En **Metric Collection**, haz clic en **Automatically Using CloudFormation** en **CloudWatch Metric Streams** para iniciar un stack tecnológico en la consola de AWS.
 {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-setup.png" alt="La sección CloudWatch Metric Streams de la pestaña Metric Collection de la página de integración de AWS con el botón Automatically Using CloudFormation resaltado" responsive="true" style="width:60%;" >}}
4. Completa los parámetros necesarios:
   - **ApiKey**: añade tu [clave de API de Datadog][2].
   - **DdSite**: selecciona tu [sitio de Datadog][3]. Tu sitio es: {{< region-param key="dd_site" code="true" >}}
   - **Regions**: una lista separada por comas de las regiones que deseas configurar para la transmisión de métricas. Para obtener una lista completa de las regiones admitidas, consulta la documentación de AWS sobre el [uso de flujos de métricas][4].
5. Completa los parámetros opcionales:
   - **FilterMethod**: incluye o excluye la lista de espacios de nombres para la transmisión de métricas.
   - **First/Second/Third Namespace**: especifica los espacios de nombres que deseas incluir o excluir. Nota: Los valores de los espacios de nombres deben coincidir exactamente con los valores de la columna de espacios de nombres de la documentación de AWS. Por ejemplo, AWS/EC2.
6. Marca la casilla de reconocimiento que dice: "I acknowledge that AWS CloudFormation might create IAM resources with custom names".
7. Haz clic en **Create Stack**.

### Resultados

Una vez que el stack tecnológico se haya creado correctamente, espera cinco minutos para que Datadog reconozca el cambio. Para validar la finalización, ve a la pestaña **Metric Collection** en la [página de integración de AWS][1] de Datadog y verifica que las regiones activadas aparezcan para la cuenta seleccionada.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="La sección CloudWatch Metric Streams de la pestaña Metric Collection de la página de integración de AWS con una región activada" responsive="true" style="width:60%;">}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/getting_started/site/
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
{{% /tab %}}
{{% tab "Consola de AWS" %}}

Para configurar flujos de métricas utilizando la consola AWS, crea un flujo de métricas de [CloudWatch][1] para cada región AWS.

**Nota**: Actualmente, la transmisión de métricas a Datadog solo admite el formato de salida OpenTelemetry v0.7.

1. Elige **Quick AWS Partner Setup** y selecciona **Datadog** como AWS Partner de destino en el menú desplegable.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-partner-setup.png" alt="Configuración rápida de socios de CloudWatch Metric Stream" responsive="true" style="width:60%;">}}
2. Elige el sitio Datadog al que quieres transmitir flujos de métricas e introduce tu [clave de API Datadog][2].
3. Elige si quieres transmitir todas las métricas de CloudWatch o sólo determinados espacios de nombres. También tienes la opción de excluir determinadas métricas. Si te encuentras en una cuenta de monitorización, también puedes optar por activar la [transmisión entre cuentas][3].
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-namespace-filter.png" alt="CloudWatch Metric Stream" responsive="true" style="width:60%;">}}
4. En **Añadir estadísticas adicionales**, incluye las métricas de percentiles de AWS que se van a enviar a Datadog. Para obtener una lista de las métricas de percentiles compatibles con Datadog mediante el sondeo, consulta la [plantilla de CloudFormation][4].
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/percentiles.png" alt="Percentiles" responsive="true" style="width:60%;">}}
5. Asigna un nombre a tu flujo de métricas.
6. Haz clic en **Create metric stream**.

### Resultados

Tras comprobar que el recurso Flujos de métricas se ha creado correctamente, espera cinco minutos para que Datadog reconozca el cambio. Para confirmar la finalización, ve a la pestaña **Recopilación de métricas** en la [página de la integración de AWS][5] de Datadog y comprueba que las regiones activadas están habilitadas en **CloudWatch Metric Streams** para la cuenta AWS especificada.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="La sección CloudWatch Metric Streams de la pestaña Metric Collection de la página de integración de AWS con una región activada" responsive="true" style="width:60%;">}}

**Nota**: Si ya has activado el sondeo de las API de CloudWatch, la transición hacia la transmisión puede generar un breve período (de hasta cinco minutos) en el que las métricas específicas que estás transmitiendo se contabilizan dos veces en Datadog. Esto se debe a la diferencia de tiempo entre el momento en que los rastreadores de Datadog ejecutan y envían tus métricas de CloudWatch y el momento en que Datadog reconoce que has empezado a transmitirlas y desactiva los rastreadores.

[1]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/#cross-account-metric-streaming
[4]: https://github.com/DataDog/cloudformation-template/blob/master/aws_streams/streams_single_region.yaml#L168-L249
[5]: https://app.datadoghq.com/integrations/amazon-web-services
{{% /tab %}}
{{< /tabs >}}

### Transmisión de métricas entre cuentas
Utiliza la transmisión de métricas entre cuentas para incluir las métricas en un único flujo de métricas a través de varias cuentas AWS dentro de una región AWS. Esto ayuda a reducir el número de flujos necesarios para recopilar métricas para un destino común. Para ello, [conecta tus cuentas de origen][4] con tu cuenta de monitorización y activa la transmisión entre cuentas a Datadog en tu cuenta de monitorización AWS.

Tu cuenta de monitorización debe tener los siguientes permisos para que esta característica funcione correctamente:
   * oam:ListSinks
   * oam:ListAttachedLinks

**Nota:** Para recopilar etiquetas personalizadas y otros metadatos para tus métricas transmitidas, integra tus cuentas de origen con Datadog.

### Deshabilitar la transmisión de métricas

Para deshabilitar por completo la transmisión de métricas para una cuenta y una región de AWS determinadas, debes eliminar AWS Metric Stream y sus recursos relacionados. Para evitar la pérdida de métricas en Datadog, es importante seguir con atención estos pasos para la eliminación:

Si configuras la transmisión con [CloudFormation](?tab=cloudformation#installation):
1. Borra el stack tecnológico que se creó durante la configuración.

Si configuras la transmisión a través de la [Consola de AWS](?tab=awsconsole#installation):
1. Borra el CloudWatch Metric Stream vinculado a tu flujo de entrega.
2. Elimina todos los recursos que se crearon al configurar el flujo, incluidos los roles de IAM de S3 y Firehose que están asociados con el flujo.

Una vez que se hayan eliminado los recursos, espera cinco minutos para que Datadog reconozca el cambio. Para validar la finalización, ve a la pestaña **Recopilación de métricas** en la [página de la integración de AWS][5] de Datadog y verifica que las regiones deshabilitadas no aparezcan en **CloudWatch Metric Streams** para la cuenta AWS especificada.

## Solucionar problemas

Para resolver cualquier problema que surja al configurar Metric Streams o los recursos asociados, consulta [Solución de problemas de AWS][6].

## Referencias adicionales
 {{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/guide/cloud-metric-delay/
[2]: https://aws.amazon.com/cloudwatch/pricing/
[3]: /es/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account-Setup.html
[5]: https://app.datadoghq.com/integrations/amazon-web-services
[6]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-troubleshoot.html
[7]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html