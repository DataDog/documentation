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
{{% site-region region="us3,gov" %}}
AWS CloudWatch Metric Streams con Amazon Data Firehose no está disponible para el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).
{{% /site-region %}}

Con Amazon CloudWatch Metric Streams y Amazon Data Firehose, puedes obtener métricas de CloudWatch en Datadog con una latencia de solo dos a tres minutos. Esto es significativamente más rápido que el enfoque de sondeo de API predeterminado de Datadog, que proporciona métricas actualizadas cada 10 minutos. Puedes obtener más información sobre el enfoque de sondeo de API en la [documentación de Cloud Metric Delay][1].

## Información general

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric_streaming_diagram.png" alt="Diagrama del flujo de métricas" responsive="true">}}

1. Crea un CloudWatch Metric Stream en cada cuenta y región de AWS para la que desees transmitir métricas.
   - Opcionalmente, especifica un conjunto limitado de espacios de nombres o métricas para transmitir.
2. Una vez que creas el Metric Stream, Datadog comienza a recibir inmediatamente las métricas transmitidas y las muestra en el sitio de Datadog sin necesidad de configuración adicional.


### Metric Streaming versus sondeo de API {#streaming-vs-polling}

A continuación se indican las principales diferencias entre el uso de CloudWatch Metric Streams y el sondeo de API.

- **Filtrado de espacios de nombres en AWS**: los valores predeterminados por espacio de nombres y las configuraciones a nivel de cuenta en la página de integración de AWS solo se aplican al enfoque de sondeo de API. Gestiona todas las reglas para incluir y excluir espacios de nombres/métricas en los flujos mediante la configuración de CloudWatch Metric Streams en tus cuentas de AWS.

- **Métricas que informan con un retraso de más de dos horas**: el sondeo de API continúa recopilando métricas como `aws.s3.bucket_size_bytes` y `aws.billing.estimated_charges` después de que se habilita la transmisión de métricas, ya que estas no se pueden enviar a través de CloudWatch Metric Stream.

#### Cambio del sondeo de API a los flujos de métricas
Si ya recibes métricas para un espacio de nombres de CloudWatch determinado a través del método de sondeo de API, Datadog lo detecta automáticamente y deja de sondear las métricas para ese espacio de nombres una vez que comienzas a transmitirlas. Deja la configuración en la página de integración de AWS sin cambios, ya que Datadog continúa usando el sondeo de API para recopilar etiquetas (tags) personalizadas y otros metadatos para las métricas transmitidas.

#### Cambio de los flujos de métricas al sondeo de API

Si más adelante decides que no deseas transmitir métricas para una cuenta y una región de AWS determinadas, o incluso solo para un espacio de nombres específico, Datadog comienza automáticamente a recopilar esas métricas mediante el sondeo de API nuevamente según los ajustes de configuración de la página de integración de AWS. Si deseas dejar de transmitir todas las métricas para una cuenta y una región de AWS, sigue las instrucciones de la [sección Deshabilitar la transmisión de métricas](#disable-metric-streaming) de este documento.

### Facturación

Datadog no cobra ningún cargo adicional por transmitir métricas.

AWS cobra en función de la cantidad de actualizaciones de métricas en CloudWatch Metric Stream y el volumen de datos enviados a Amazon Data Firehose. Por lo tanto, existe la posibilidad de ver un aumento en el coste de CloudWatch para el subconjunto de métricas que estás transmitiendo. Por este motivo, Datadog recomienda usar flujos (streams) de métricas para las métricas, los servicios, las regiones y las cuentas de AWS donde más necesitas la latencia baja, y sondeos para los demás. Para obtener más información, consulta [Precios de Amazon CloudWatch][1].

Las métricas de EC2 o Lambda en la transmisión podrían aumentar la cantidad de hosts e invocaciones de Lambda facturables (si esos hosts y funciones aún no se monitorizan con la integración de AWS o el Datadog Agent en el caso de EC2).

## Configuración

### Antes de empezar

1. Lee atentamente la sección [Metric Streaming versus sondeo de API](#streaming-vs-polling) para comprender las diferencias antes de habilitar Metric Streaming.

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

Para configurar flujos de métricas utilizando la Consola de AWS, crea un [CloudWatch Metric Stream][2] para cada región de AWS.

**Nota**: Actualmente, la transmisión de métricas a Datadog solo admite el formato de salida OpenTelemetry v0.7.

1. Elige **Quick AWS Partner Setup** y selecciona **Datadog** como AWS Partner de destino en el menú desplegable.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-partner-setup.png" alt="Configuración rápida de socios de Cloudwatch Metric Stream" responsive="true" style="width:60%;">}}
2. Selecciona el sitio de Datadog al que deseas transmitir métricas e ingresa tu [clave de API de Datadog][1].
3. Elige si deseas transmitir todas las métricas de CloudWatch o solo espacios de nombres específicos. También tienes la opción de excluir métricas específicas. Si estás es una Monitoring Account, también puedes optar por habilitar la [transmisión entre cuentas][5].
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-namespace-filter.png" alt="Cloudwatch Metric Stream" responsive="true" style="width:60%;">}}
4. En **Add additional statistics**, incluye las métricas de percentil de AWS para enviarlas a Datadog. Consulta la [plantilla de CloudFormation][3] para obtener una lista de las métricas de percentil que Datadog admite mediante sondeo.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/percentiles.png" alt="Percentiles" responsive="true" style="width:60%;">}}
5. Asigna un nombre a tu flujo de métricas.
6. Haz clic en **Create metric stream**.

### Resultados

Una vez que veas que el recurso Metric Stream se creó correctamente, espera cinco minutos para que Datadog reconozca el cambio. Para validar la finalización, ve a la pestaña **Metric Collection** en la [página AWS integration][4] de Datadog y verifica que las regiones activadas estén habilitadas en **CloudWatch Metric Streams** para la cuenta de AWS especificada.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="La sección CloudWatch Metric Streams de la pestaña Metric Collection de la página AWS integration con una región activada" responsive="true" style="width:60%;">}}
**Nota**: Si ya has habilitado el sondeo de API de CloudWatch, la transición a la transmisión podría provocar un breve período (de hasta cinco minutos) en el que las métricas específicas que estás transmitiendo se cuenten dos veces en Datadog. Esto se debe a la diferencia de tiempo entre el momento en que los rastreadores de Datadog se ejecutan y envían tus métricas de CloudWatch, y el momento en que Datadog reconoce que ha comenzado a transmitir esas métricas y desactiva los rastreadores.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws_streams/streams_single_region.yaml#L168-L249
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.datadoghq.com/es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/#cross-account-metric-streaming
{{% /tab %}}
{{< /tabs >}}

### Transmisión de métricas entre cuentas
Utiliza la transmisión de métricas entre cuentas para incluir métricas en un único Metric Stream que abarque varias cuentas de AWS dentro de una región de AWS. Esto ayuda a reducir la cantidad de transmisiones necesarias a fin de recopilar métricas para un destino común. Para ello, [conecta tus cuentas de origen][5] con tu cuenta de monitorización y habilita la transmisión entre cuentas a Datadog en tu cuenta de monitorización de AWS.

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

Una vez que se hayan eliminado los recursos, espera cinco minutos para que Datadog reconozca el cambio. Para validar la finalización, ve a la pestaña **Metric Collection** en la [página integration page][4] de Datadog y verifica que las regiones deshabilitadas no aparezcan en **CloudWatch Metric Streams** para la cuenta de AWS especificada.

## Solucionar problemas

Para resolver cualquier problema que surja al configurar Metric Streams o los recursos asociados, consulta [Solución de problemas de AWS][5].

## Leer más
 {{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/cloudwatch/pricing/
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/?tab=roledelegation#setup
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-troubleshoot.html
[5]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account-Setup.html