---
aliases:
- /es/tracing/serverless_functions
- /es/tracing/setup_overview/serverless_functions/
- /es/serverless/troubleshooting/serverless_apm_metrics/
- /es/serverless/distributed_tracing/serverless_trace_merging
- /es/serverless/distributed_tracing/serverless_trace_propagation
- /es/serverless/distributed_tracing
further_reading:
- link: /tracing/
  tag: Documentación
  text: Explorar Datadog APM
- link: /tracing/trace_search_and_analytics/#live-search-for-15-minutes
  tag: Documentación
  text: Búsqueda en vivo
- link: https://www.datadoghq.com/blog/aws-lambda-tracing-go-java-functions/
  tag: Blog
  text: Trazado distribuido en tiempo real para funciones Lambda de Go y Java
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: Blog
  text: Monitoree su pila Serverless en la visualización Serverless
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: Blog
  text: Serverless Monitoring de Datadog para servicios completamente administrados
    de AWS
- link: https://www.datadoghq.com/blog/dotnet-lambda-functions-distributed-tracing/
  tag: Blog
  text: Trazado distribuido en tiempo real para funciones Lambda de .NET
title: Trazado distribuido con aplicaciones Serverless de AWS Lambda
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Trace funciones Serverless" style="width:100%;">}}

Al conectar sus trazas Serverless con métricas, Datadog proporciona una imagen rica en contexto del rendimiento de su aplicación, permitiéndole resolver de forma más efectiva los problemas de rendimiento dada la naturaleza distribuida de las aplicaciones Serverless.

Los SDK de Datadog para Python, Node.js, Ruby, Go, Java y .NET soportan trazado distribuido para AWS Lambda.

## Envíe trazas desde su aplicación Serverless {#send-traces-from-your-serverless-application}

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Diagrama de arquitectura para la traza de AWS Lambda con Datadog" >}}

Los SDK de Datadog para Python, Node.js, Ruby, Go, Java y .NET soportan trazado distribuido para AWS Lambda. Puede instalar el SDK siguiendo las [instrucciones de instalación][5].

### Recomendaciones de tiempo de ejecución {#runtime-recommendations}

{{< card-grid card_width="30%" image_width="200">}}
  {{< image-card href="/serverless/distributed_tracing#python-and-nodejs" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/distributed_tracing#python-and-nodejs" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/distributed_tracing#ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/distributed_tracing#java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/distributed_tracing#go" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/serverless/distributed_tracing#net" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

#### Python y Node.js {#python-and-nodejs}

La biblioteca y SDKs de Datadog Lambda para Python y Node.js soportan:
- Correlación automática de registros y trazas de Lambda con ID de traza e inyección de etiquetas.
- Instalación sin cambios en el código utilizando Serverless Framework, AWS SAM e integraciones de AWS CDK.
- Trazado de solicitudes HTTP que invocan funciones Lambda o contenedores descendentes.
- Trazado de invocaciones consecutivas de Lambda realizadas a través del SDK de AWS.
- Trazado de inicio en frío
- Trazado de invocaciones asíncronas de Lambda a través de Servicios Administrados de AWS
  - API Gateway
  - SQS
  - SNS
  - Integración directa de SNS y SQS
  - Kinesis
  - EventBridge
  - DynamoDB
  - S3
  - Step Functions
- Trazado de docenas de bibliotecas adicionales listas para usar [Python][3] y [Node.js][4].

Para aplicaciones Serverless en Python y Node.js, Datadog recomienda que [instale los SDKs de Datadog][5].

*¿Busca trazar recursos Serverless que no están listados arriba? [Abra una solicitud de función][7].*

#### Ruby {#ruby}

La Biblioteca Lambda de Datadog y los SDKs para Ruby soportan:
- Correlación automática de logs y trazas de Lambda con ID de traza e inyección de etiquetas.
- Trazado de solicitudes HTTP que invocan funciones Lambda o contenedores descendentes.
- Trazado de docenas de bibliotecas adicionales de [Ruby][8] listas para usar.

Puede trazar sus funciones Serverless en Datadog con [los SDK de Datadog][5].

*¿Busca trazar recursos Serverless que no están listados arriba? [Abra una solicitud de función][7].*

#### Go {#go}

La Biblioteca Lambda de Datadog y los SDKs para Go soportan:
- Correlación manual de registros y trazas de Lambda con ID de traza e inyección de etiquetas.
- Trazado de solicitudes HTTP que invocan funciones Lambda o contenedores descendentes.
- Trazado de docenas de bibliotecas adicionales de [Go][9] listas para usar.

Para aplicaciones Serverless en Go, Datadog recomienda instalar [los SDK de Datadog][5].

*¿Busca trazar recursos Serverless que no están listados arriba? [Abra una solicitud de función][7].*

#### Java {#java}

La Biblioteca Lambda de Datadog y los SDKs para Java soportan:
- Correlación de los registros y trazas de Lambda con el ID de traza y la inyección de etiquetas. Consulte [Conectando registros y trazas de Java][10] para más detalles.
- Trazado de solicitudes HTTP que invocan funciones Lambda o contenedores descendentes.
- Trazado de docenas de bibliotecas adicionales de [Java][11] listas para usar.

Para aplicaciones Serverless en Java, Datadog recomienda [instalar los SDK de Datadog][5].

*¿Tiene comentarios sobre los SDK de Datadog para funciones Lambda en Java? Asegúrese de revisar las discusiones que se están llevando a cabo en el canal [#serverless][12] de la [comunidad de Datadog en Slack][13].*

#### .NET {#net}

El SDK para .NET soporta:
- Trazado de solicitudes HTTP que invocan funciones Lambda o contenedores descendentes.
- Trazado de docenas de bibliotecas adicionales de [.NET][14] listas para usar.

Para aplicaciones sin servidor en .NET, Datadog recomienda [instalar los SDK de Datadog][5].

Aprenda más sobre [el trazado a través de aplicaciones Serverless en .NET Azure][15].

## Auto-enlazado de tramos {#span-auto-linking}
{{< img src="serverless/lambda/tracing/autolink.png" alt="En Datadog, una traza de DynamoDB. En la parte superior, un mensaje dice 'Esta traza está vinculada a otras trazas'. La pestaña Span Links está abierta y muestra un enlace clicable a otra traza de DynamoDB." style="width:100%;" >}}

Datadog detecta automáticamente los tramos vinculados cuando los segmentos de sus solicitudes asíncronas no pueden propagar el contexto de la traza. Por ejemplo, esto puede ocurrir cuando una solicitud activa un [Evento de Cambio de S3][28] o [Flujos de DynamoDB][29]. Puede ver que los tramos auto-enlazados aparecen en la pestaña [Enlaces de Tramos][30]. Estos aparecen como **Hacia Atrás** o **Hacia Adelante**.

_Hacia Atrás_: El tramo enlazado fue causado por la traza que está visualizando.

_Hacia Adelante_: El tramo enlazado causó la traza que está visualizando.


<div class="alert alert-info">Los filtros de muestreo y <a href="/tracing/trace_pipeline/trace_retention/">retención de trazas</a> pueden interferir con el auto-enlazado. Para mejorar sus posibilidades de ver tramos auto-enlazados, aumente su tasa de muestreo o ajuste sus filtros de retención de trazas.</div>

### Tecnologías soportadas {#supported-technologies}

El auto-enlazado de tramos está disponible para:
- Funciones de Python AWS Lambda instrumentadas con [`datadog-lambda-python`][33] capa v101+
- Aplicaciones de Python instrumentadas con [`dd-trace-py`][31] v2.16+
- Funciones de Node.js AWS Lambda instrumentadas con [`datadog-lambda-js`][34] capa 118+
- Aplicaciones de Node.js instrumentadas con [`dd-trace-js`][32] v4.53.0+ o v5.29.0+

### Auto-enlazado de DynamoDB Change Stream {#dynamodb-change-stream-auto-linking}

Para [DynamoDB Change Streams][29], el auto-enlazado de tramos soporta las siguientes operaciones:

- `PutItem`
- `UpdateItem`
- `DeleteItem`
- `BatchWriteItem`
- `TransactWriteItems`

<div class="alert alert-info">El <code>PutItem</code> la operación requiere configuración adicional. Para más información, consulte <a href="/serverless/aws_lambda/installation/python/#span-auto-linking">Instrumentando Aplicaciones Serverless en Python</a> o <a href="/serverless/aws_lambda/installation/nodejs/#span-auto-linking">Instrumentando Aplicaciones Serverless en Node.js</a>.</div>

### Auto-enlazado de Notificaciones de Cambio en S3 {#s3-change-notification-auto-linking}

Para [Notificaciones de Cambio en S3][28], el auto-enlazado de tramos soporta las siguientes operaciones:

- `PutObject`
- `CompleteMultipartUpload`
- `CopyObject`


## Entornos híbridos {#hybrid-environments}

Para visibilidad de extremo a extremo a través de funciones Lambda, hosts, contenedores y servicios administrados, instale los SDKs de Datadog (`dd-trace`) tanto en sus funciones Lambda como en sus hosts. Sus trazas mostrarán entonces una imagen completa de las solicitudes que cruzan los límites de infraestructura.

En Lambda, instale `dd-trace` con la [Extensión de Lambda de Datadog][35], que ejecuta el Agente de Datadog dentro del entorno de ejecución de Lambda y envía trazas directamente a Datadog con un mínimo de sobrecarga. La Extensión de Lambda es el método de instalación recomendado para nuevas y existentes aplicaciones Serverless.

Consulte la [documentación de APM de Datadog][16] para la configuración de trazado en entornos basados en contenedores y hosts.

## Perfilando sus Funciones Lambda {#profiling-your-lambda-functions}

El [Continuous Profiler][27] de Datadog está disponible en versión preliminar para Python en la versión 4.62.0 y las versiones de capa 62 y superiores. Esta función opcional se habilita configurando la variable de entorno `DD_PROFILING_ENABLED` a `true`.

El Continuous Profiler funciona creando un hilo que se despierta periódicamente y toma una instantánea de la CPU y el heap de todo el código Python en ejecución. Esto puede incluir el propio Continuous Profiler. Si desea que el Continuous Profiler se ignore a sí mismo, configure `DD_PROFILING_IGNORE_PROFILER` a `true`.

## Fusión de Trazas {#trace-merging}

### Casos de uso {#use-cases}

Datadog recomienda usar solo la biblioteca de traza de Datadog APM (`dd-trace`), pero en algunas situaciones avanzadas, los usuarios pueden combinar Datadog tracing y AWS X-Ray utilizando la fusión de trazas. La fusión de trazas está disponible para funciones de AWS Lambda en Node.js y Python. Si no está seguro de qué SDK usar, lea sobre [elegir su SDK][17].

<div class="alert alert-info">El trazado de AWS Step Functions es compatible de forma nativa con Datadog y ya no requiere X-Ray. Vea <a href="/serverless/step_functions/">Serverless Monitoring para AWS Step Functions</a> y <a href="/serverless/step_functions/merge-step-functions-lambda/">Merge Step Functions and Lambda Traces</a>.</div>

Hay dos razones principales para instrumentar tanto `dd-trace` como las bibliotecas de traza de AWS X-Ray:
- En un entorno serverless de AWS, ya está trazando sus funciones Lambda con `dd-trace`, necesita la traza activa de AWS X-Ray para un servicio administrado por AWS que Datadog APM aún no instrumenta (como AppSync), y desea visualizar los `dd-trace` y los tramos de AWS X-Ray en una sola traza.
- En un entorno híbrido con funciones Lambda y servidores, `dd-trace` instrumenta sus servidores, AWS X-Ray instrumenta sus funciones Lambda, y desea visualizar trazas conectadas para transacciones a través de funciones Lambda y servidores.

**Nota:** Esto puede resultar en facturas de uso más altas. Los tramos de X-Ray continúan disponibles en sus trazas fusionadas después de 2-5 minutos. En muchos casos, Datadog recomienda usar un solo SDK. Aprenda más sobre [elegir su SDK][17].

Puede encontrar instrucciones de configuración para cada uno de los casos de uso anteriores a continuación:

- [Fusión de trazas en un entorno orientado a serverless](#trace-merging-in-an-AWS-serverless-environment)
- [Fusión de trazas entre AWS Lambda y servidores](#tracing-across-aws-lambda-and-hosts)

### Fusión de trazas en un entorno serverless de AWS {#trace-merging-in-an-aws-serverless-environment}

AWS X-Ray proporciona tanto un servicio backend de AWS (AWS X-Ray active tracing) como un conjunto de bibliotecas de cliente. [Habilitar solo el servicio backend de AWS en la consola de Lambda][18] le brinda `Initialization` y `Invocation` tramos para sus funciones de AWS Lambda. También puede habilitar AWS X-Ray active tracing desde las consolas de API Gateway y Step Function.

Tanto el SDK de AWS X-Ray como las bibliotecas de clientes de Datadog APM (`dd-trace`) añaden metadatos y tramos para llamadas descendentes accediendo a la función directamente. Suponiendo que está utilizando `dd-trace` para rastrear a nivel de controlador, su configuración debería ser similar a la siguiente:

1. Ha habilitado el [rastreo activo de AWS X-Ray][18] en sus funciones Lambda desde la consola de AWS Lambda y nuestra [integración de AWS X-Ray dentro de Datadog][19].
2. Ha instrumentado sus funciones Lambda con Datadog APM (`dd-trace`) siguiendo las [instrucciones de instalación para su entorno de ejecución de Lambda][5].
3. Las bibliotecas de terceros son parcheadas automáticamente por `dd-trace`, por lo que no es necesario instalar las bibliotecas de clientes de AWS X-Ray.
4. Establezca la variable de entorno `DD_MERGE_XRAY_TRACES` en `true` en sus funciones Lambda para fusionar las trazas de X-Ray y `dd-trace` (`DD_MERGE_DATADOG_XRAY_TRACES` en Ruby).

### Rastreo a través de AWS Lambda y servidores {#tracing-across-aws-lambda-and-hosts}

#### Propagación de contexto con los SDK de Datadog (recomendado) {#context-propagation-with-the-datadog-sdks-recommended}
Instale los SDK de Datadog (`dd-trace`) tanto en sus funciones Lambda como en los servidores. Sus trazas luego muestran automáticamente una imagen completa de las solicitudes que cruzan los límites de infraestructura, ya sea AWS Lambda, contenedores, servidores locales o servicios administrados.

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="traza de una solicitud de un servidor a una función Lambda" >}}

## Propagación de traza {#trace-propagation}
{{< img src="serverless/lambda-non-http-trace.png" alt="Traza distribuida no-HTTP en entornos Serverless" style="width:100%;" >}}

### Configuración requerida {#required-setup}

A veces se requiere instrumentación adicional para ver una sola traza conectada en aplicaciones Serverless de Node y Python que activan funciones Lambda de forma asíncrona. Si recién está comenzando a monitorear aplicaciones Serverless en Datadog, [siga nuestros pasos principales de instalación][21] y [lea esta página sobre cómo elegir su SDK][22]. Una vez que esté enviando trazas desde sus funciones Lambda a Datadog utilizando la [Biblioteca Lambda de Datadog][23], puede seguir estos pasos para conectar trazas entre dos funciones Lambda en casos como:
- Activando funciones Lambda a través de Step Functions
- Invocando funciones Lambda a través de protocolos no-HTTP como MQTT

El trazado de muchos servicios administrados de AWS (listados [aquí][24]) es compatible de forma predeterminada y no requiere seguir los pasos descritos en esta página.

Para conectar con éxito el contexto de traza entre los recursos que envían trazas, necesitas:
- Incluir el contexto de traza de Datadog en los eventos salientes. El evento saliente puede originarse de un host o de una función Lambda con `dd-trace` instalado.
- Extraer el contexto de traza en la función Lambda consumidora.

### Pasando el contexto de traza {#passing-trace-context}

Los siguientes ejemplos de código describen cómo pasar el contexto de traza en las cargas útiles salientes a servicios que no soportan encabezados HTTP, o servicios administrados que no son soportados [nativamente][24] por Datadog en Node y Python:

{{< tabs >}}
{{% tab "Python" %}}

En Python, puede usar la función auxiliar `get_dd_trace_context` para pasar el contexto de traza a los eventos salientes en funciones Lambda:

```py
import json
import boto3
import os

from datadog_lambda.tracing import get_dd_trace_context  # Datadog tracing helper function

def handler(event, context):
    my_custom_client.sendRequest(
        {
          'myCustom': 'data',
          '_datadog': {
              'DataType': 'String',
              'StringValue': json.dumps(get_dd_trace_context()) # Includes trace context in outgoing payload.
          },
        },
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

En Node, puede usar la función auxiliar `getTraceHeaders` para pasar el contexto de traza a los eventos salientes en una función Lambda:

```js
const { getTraceHeaders } = require("datadog-lambda-js"); // Datadog tracing helper function

module.exports.handler = async event => {
  const _datadog = getTraceHeaders(); // Captures current Datadog trace context.

  var payload = JSON.stringify({ data: 'sns', _datadog });
  await myCustomClient.sendRequest(payload)
```

{{% /tab %}}
{{< /tabs >}}

#### Desde servidores {#from-hosts}

Si no está pasando el contexto de traza desde sus funciones Lambda, puede usar la siguiente plantilla de código en lugar de las funciones auxiliares `getTraceHeaders` y `get_dd_trace_context` para obtener el contexto de tramo actual. Las instrucciones sobre cómo hacer esto en cada entorno de ejecución están descritas [aquí][25].

```js
const tracer = require("dd-trace");

exports.handler = async event => {
  const span = tracer.scope().active();
  const _datadog = {}
  tracer.inject(span, 'text_map', _datadog)

  // ...
```

### Extrayendo el contexto de traza {#extracting-trace-context}

Para extraer el contexto de traza mencionado anteriormente de la función Lambda consumidora, necesita definir una función extractora que capture el contexto de traza antes de la ejecución del controlador de su función Lambda. Para hacer esto, configure la variable de entorno `DD_TRACE_EXTRACTOR` para apuntar a la ubicación de su función extractora. El formato para esto es `<FILE NAME>.<FUNCTION NAME>`. Por ejemplo, `extractors.json` si el extractor `json` está en el archivo `extractors.js`. Datadog recomienda que coloque todos sus métodos extractores en un solo archivo, ya que los extractores pueden ser reutilizados en múltiples funciones Lambda. Estos extractores son completamente personalizables para adaptarse a cualquier caso de uso.

**Notas**:
- Si está usando TypeScript o un empaquetador como webpack, debe `import` o `require` su módulo de Node.js donde se definen los extractores. Esto asegura que el módulo se compile y se incluya en su paquete de implementación de Lambda.
- Si su función de Lambda en Node.js se ejecuta en `arm64`, debe [definir el extractor en el código de su función][26] en lugar de usar la variable de entorno `DD_TRACE_EXTRACTOR`.

#### Extractores de muestra {#sample-extractors}

El siguiente código muestra extractores de muestra que podrías usar para propagar el contexto de traza a través de un sistema de terceros o una API que no soporta encabezados HTTP estándar.

{{< tabs >}}
{{% tab "Python" %}}

```py
def extractor(payload):
    trace_headers = json.loads(payload["_datadog"]);
    trace_id = trace_headers["x-datadog-trace-id"];
    parent_id = trace_headers["x-datadog-parent-id"];
    sampling_priority = trace_headers["x-datadog-sampling-priority"];
    return trace_id, parent_id, sampling_priority
```
{{% /tab %}}
{{% tab "Node.js" %}}

```js
exports.json = (payload) => {
    const traceData = payload._datadog
    const traceID = traceData["x-datadog-trace-id"];
    const parentID = traceData["x-datadog-parent-id"];
    const sampledHeader = traceData["x-datadog-sampling-priority"];
    const sampleMode = parseInt(sampledHeader, 10);

    return {
      parentID,
      sampleMode,
      source: 'event',
      traceID,
    };
};
```
{{% /tab %}}
{{% tab "Go" %}}

```go
var exampleSQSExtractor = func(ctx context.Context, ev json.RawMessage) map[string]string {
	eh := events.SQSEvent{}

	headers := map[string]string{}

	if err := json.Unmarshal(ev, &eh); err != nil {
		return headers
	}

	// Using SQS as a trigger with a batchSize=1 so it's important we check
  // for this as a single SQS message will drive the execution of the handler.
	if len(eh.Records) != 1 {
		return headers
	}

	record := eh.Records[0]

	lowercaseHeaders := map[string]string{}
	for k, v := range record.MessageAttributes {
		if v.StringValue != nil {
			lowercaseHeaders[strings.ToLower(k)] = *v.StringValue
		}
	}

	return lowercaseHeaders
}

cfg := &ddlambda.Config{
    TraceContextExtractor: exampleSQSExtractor,
}
ddlambda.WrapFunction(handler, cfg)
```
{{% /tab %}}
{{< /tabs >}}

## Enviando trazas a Datadog con la integración de X-Ray {#sending-traces-to-datadog-with-the-x-ray-integration}

Si tiene instrumentación de X-Ray existente y desea seguir usándola, [instale la integración de AWS X-Ray][2] para enviar trazas de X-Ray a Datadog. Para nuevas aplicaciones Serverless, Datadog recomienda instrumentar funciones Lambda con la [Datadog Lambda Extension][35] en su lugar.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/distributed_tracing#distributed-tracing-with-datadog-apm
[2]: /es/integrations/amazon_xray/#overview
[3]: /es/tracing/trace_collection/compatibility/python
[4]: /es/tracing/trace_collection/compatibility/nodejs
[5]: /es/serverless/installation/
[6]: /es/serverless/distributed_tracing/#trace-merging
[7]: https://docs.datadoghq.com/es/help/
[8]: /es/tracing/trace_collection/compatibility/ruby
[9]: /es/tracing/trace_collection/compatibility/go
[10]: /es/tracing/other_telemetry/connect_logs_and_traces/java/
[11]: /es/tracing/trace_collection/compatibility/java
[12]: https://datadoghq.slack.com/archives/CFDPB83M4
[13]: https://chat.datadoghq.com/
[14]: /es/tracing/trace_collection/compatibility/dotnet-core
[15]: /es/serverless/azure_app_services
[16]: /es/tracing/trace_collection/
[17]: /es/serverless/distributed_tracing/
[18]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[19]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[20]: /es/tracing/send_traces/
[21]: /es/serverless/installation
[22]: /es/serverless/distributed_tracing
[23]: /es/serverless/datadog_lambda_library
[24]: /es/serverless/distributed_tracing#runtime-recommendations
[25]: /es/tracing/trace_collection/custom_instrumentation/
[26]: /es/serverless/guide/handler_wrapper/
[27]: /es/profiler/
[28]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html
[29]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[30]: https://docs.datadoghq.com/es/tracing/trace_explorer/trace_view/?tab=spanlinksbeta
[31]: https://github.com/DataDog/dd-trace-py/
[32]: https://github.com/DataDog/dd-trace-js/
[33]: https://github.com/DataDog/datadog-lambda-python
[34]: https://github.com/DataDog/datadog-lambda-js
[35]: /es/serverless/libraries_integrations/extension/