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
  text: Explora Datadog APM
- link: /tracing/trace_search_and_analytics/#live-search-for-15-minutes
  tag: Documentación
  text: Búsqueda dinámica
- link: https://www.datadoghq.com/blog/aws-lambda-tracing-go-java-functions/
  tag: Blog
  text: Rastreo distribuido en tiempo real para funciones de Lambda de Go y Java
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: Blog
  text: Monitoriza tu pila serverless en la vista serverless
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: Blog
  text: Monitorización serverless de Datadog para servicios completamente administrados
    de AWS
- link: https://www.datadoghq.com/blog/dotnet-lambda-functions-distributed-tracing/
  tag: Blog
  text: Rastreo distribuido en tiempo real para funciones de Lambda de .NET
kind: documentación
title: Rastreo distribuido con aplicaciones serverless de AWS Lambda
---

{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Rastrear funciones serverless" style="width:100%;">}}

Al conectar tus trazas (traces) serverless a métricas, Datadog brinda una imagen rica en contexto del rendimiento de tu aplicación, lo que te permite solucionar mejor los problemas de rendimiento dada la naturaleza distribuida de las aplicaciones serverless.

Las bibliotecas de rastreo de Python, Node.js, Ruby, Go, Java y .NET de Datadog admiten el rastreo distribuido para AWS Lambda.

## Enviar trazas desde una aplicación serverless

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Diagrama de la arquitectura del rastreo de AWS Lambda con Datadog" >}}

Las bibliotecas de rastreo de Python, Node.js, Ruby, Go, Java y .NET de Datadog admiten el rastreo distribuido para AWS Lambda. Puedes instalar el rastreador siguiendo las [instrucciones de instalación][5]. Si ya tienes instalada la extensión, asegúrate de que la variable de entorno `DD_TRACE_ENABLED` esté definida como `true`.

### Recomendaciones sobre el tiempo de ejecución

{{< partial name="serverless/serverless-apm-recommendations.html" >}}

#### Python y Node.js

La Biblioteca de Lambda de Datadog y las bibliotecas de rastreo para Python y Node.js admiten lo siguiente:
- Correlación automática de logs y trazas de Lambda con el ID de traza y la inyección de etiquetas (tags).
- Instalación sin cambios en el código mediante las integraciones de Serverless Framework, AWS SAM y AWS CDK.
- Rastreo de solicitudes HTTP que invocan contenedores o funciones de Lambda.
- Rastreo de invocaciones de Lambda consecutivas realizadas a través de AWS SDK.
- Rastreo de arranque en frío
- Rastreo de invocaciones de Lambda asíncronas a través de AWS Managed Services
  - API Gateway
  - SQS
  - SNS
  - Integración directa de SNS y SQS
  - Kinesis
  - EventBridge
- Rastreo de decenas de bibliotecas de [Python][3] y [Node.js][4] adicionales listas para usar.

En el caso de las aplicaciones serverless de Python y Node.js, Datadog recomienda [instalar bibliotecas de rastreo de Datadog][5].

*¿Quieres efectuar rastreos a través de recursos serverless que no figuran en la lista anterior? [Abre una solicitud de característica][7].*

#### Ruby

La Biblioteca de Lambda de Datadog y las bibliotecas de rastreo para Ruby admiten lo siguiente:
- Correlación automática de logs y trazas de Lambda con ID de traza e inyección de etiquetas.
- Rastreo de solicitudes HTTP que invocan contenedores o funciones de Lambda.
- Rastreo de decenas de bibliotecas de [Ruby][8] adicionales listas para usar.

Puedes rastrear funciones serverless en Datadog con [bibliotecas de rastreo de Datadog][5].

*¿Quieres efectuar rastreos a través de recursos serverless que no figuran en la lista anterior? [Abre una solicitud de característica][7].*

#### Go

La Biblioteca de Lambda de Datadog y las bibliotecas de rastreo para Go admiten lo siguiente:
- Correlación manual de logs y trazas de Lambda con ID de traza e inyección de etiquetas.
- Rastreo de solicitudes HTTP que invocan contenedores o funciones de Lambda.
- Rastreo de decenas de bibliotecas de [Go][9] adicionales listas para usar.

En el caso de las aplicaciones serverless de Go, Datadog recomienda instalar [bibliotecas de rastreo de Datadog][5].

*¿Quieres efectuar rastreos a través de recursos serverless que no figuran en la lista anterior? [Abre una solicitud de característica][7].*

#### Java

La Biblioteca de Lambda de Datadog y las bibliotecas de rastreo para Java admiten lo siguiente:
- Correlación de logs y trazas de Lambda con ID de traza e inyección de etiquetas. Consulta [Conexión de logs y trazas de Java][10] para obtener más detalles.
- Rastreo de solicitudes HTTP que invocan contenedores o funciones de Lambda.
- Rastreo de decenas de bibliotecas de [Java][11] adicionales listas para usar.

En el caso de las aplicaciones serverless de Java, Datadog recomienda [instalar bibliotecas de rastreo de Datadog][5].

*¿Tienes comentarios sobre las bibliotecas de rastreo de Datadog para las funciones de Lambda de Java? Asegúrate de consultar las discusiones en el canal [#serverless][12] de la [Comunidad de Slack de Datadog][13].*

#### .NET

La biblioteca de rastreo para .NET admite lo siguiente:
- Rastreo de solicitudes HTTP que invocan contenedores o funciones de Lambda.
- Rastreo de decenas de bibliotecas de [.NET][14] adicionales listas para usar.

En el caso de las aplicaciones serverless de .NET, Datadog recomienda [instalar bibliotecas de rastreo de Datadog][5].

Obtén más información sobre el [rastreo a través de aplicaciones serverless de Azure de .NET][15].

### Entornos híbridos

Si instalaste las bibliotecas de rastreo de Datadog (`dd-trace`) en tus hosts y funciones de Lambda, tus trazas te mostrarán automáticamente la imagen completa de las solicitudes que cruzan los límites de la infraestructura, ya sea de AWS Lambda, contenedores, hosts on-prem o servicios administrados.

Si `dd-trace` está instalado en tus hosts con el Datadog Agent y tus funciones serverless se rastrean con AWS X-Ray, es necesario fusionar las trazas para ver una traza única y conectada de toda la infraestructura. Consulta la documentación [Fusión de trazas serverless][6] para obtener más información sobre la fusión de trazas de `dd-trace` y AWS X-Ray.

La [integración de AWS X-Ray][2] de Datadog solo ofrece trazas para las funciones de Lambda. Consulta la [documentación de Datadog APM][16] para obtener más información sobre el rastreo en entornos basados en contenedores o hosts.

## Creación de perfiles para las funciones de Lambda (beta pública)

<div class="alert alert-info">Durante el periodo beta, la creación de perfiles está disponible sin coste adicional.</div>

[Continuous Profiler][27] de Datadog está disponible en beta para Python en la versión 4.62.0 y la versión de capa 62 y superiores. Esta característica opcional se habilita mediante la definición de la variable de entorno `DD_PROFILING_ENABLED` como `true`. 

Continuous Profiler genera un subproceso que se activa periódicamente y toma una snapshot de la CPU y el montículo de todo el código de Python en ejecución. Esto puede incluir el propio generador de perfiles. Si quieres que el generador de perfiles se ignore a sí mismo, define `DD_PROFILING_IGNORE_PROFILER` como `true`.

## Fusión de trazas

### Casos de uso

Datadog recomienda usar solo la biblioteca de rastreo de Datadog APM (`dd-trace`), pero en algunas situaciones avanzadas los usuarios pueden combinar el rastreo de Datadog y AWS X-Ray mediante la fusión de trazas. La fusión de trazas está disponible para las funciones de AWS Lambda de Node.js y Python. Si no estás seguro de qué biblioteca de rastreo usar, lee sobre [cómo elegir una biblioteca de rastreo][17].

Hay dos razones principales para instrumentar las bibliotecas de rastreo de `dd-trace` y AWS X-Ray:
- En un entorno serverless de AWS, ya rastreas tus funciones de Lambda con `dd-trace`, necesitas el rastreo activo de AWS X-Ray para los servicios administrados de AWS como AppSync y Step Functions, y quieres visualizar los tramos (spans) de `dd-trace` y AWS X-Ray en un sola traza.
- En un entorno híbrido con hosts y funciones de Lambda, `dd-trace` instrumenta tus hosts, AWS X-Ray instrumenta tus funciones de Lambda, y quieres visualizar las trazas conectadas sobre las transacciones entre los hosts y las funciones de Lambda.

**Nota:** Esto puede dar lugar a facturas de uso más elevadas. Los tramos de X-Ray siguen estando disponibles en tus trazas fusionadas después de 2 o 5 minutos. En muchos casos, Datadog recomienda utilizar una sola biblioteca de rastreo. Obtén más información sobre [cómo elegir una biblioteca de rastreo][17].

A continuación se ofrecen instrucciones de configuración para cada uno de los casos de uso mencionados:

- [Fusión de trazas en un entorno serverless](#trace-merging-in-an-AWS-serverless-environment)
- [Fusión de trazas entre AWS Lambda y hosts](#tracing-across-aws-lambda-and-hosts)

### Fusión de trazas en un entorno serverless de AWS

AWS X-Ray ofrece tanto un servicio backend de AWS (el rastreo activo de AWS X-Ray) como un conjunto de bibliotecas de clientes. La [Habilitación de solo el servicio backend de AWS en la consola de Lambda][18] te otorga los tramos `Initialization` e `Invocation` para tus funciones de AWS Lambda. También puedes habilitar el rastreo activo de AWS X-Ray desde las consolas de API Gateway y Step Functions.

Tanto el SDK de AWS X-Ray como las bibliotecas de clientes de Datadog APM (`dd-trace`) añaden metadatos y tramos para las llamadas descendentes mediante el acceso directo a la función. Suponiendo que utilizas `dd-trace` para rastrear en el nivel de controlador, tu configuración debe ser similar a la siguiente:

1. Habilitaste el [rastreo activo de AWS X-Ray][18] en tus funciones de Lambda desde la consola de AWS Lambda y nuestra [integración de AWS X-Ray dentro de Datadog][19].
2. Instrumentaste tus funciones de Lambda con Datadog APM (`dd-trace`) siguiendo las [instrucciones de instalación de tu tiempo de ejecución de Lambda][5].
3. `dd-trace` parchea automáticamente las bibliotecas de terceros, por lo que no es necesario instalar las bibliotecas de clientes de AWS X-Ray.
4. Define la variable de entorno `DD_MERGE_XRAY_TRACES` como `true` en tus funciones de Lambda para fusionar las trazas de X-Ray y `dd-trace` (`DD_MERGE_DATADOG_XRAY_TRACES` en Ruby).

### Rastreo entre AWS Lambda y hosts

Si instalaste las bibliotecas de rastreo de Datadog (`dd-trace`) en tus hosts y funciones de Lambda, tus trazas te mostrarán automáticamente la imagen completa de las solicitudes que cruzan los límites de la infraestructura, ya sea de AWS Lambda, contenedores, hosts on-prem o servicios administrados.

Si `dd-trace` está instalado en tus hosts con el Datadog Agent y tus funciones serverless de Node.js o Python se rastrean con AWS X-Ray, tu configuración debe ser similar a la siguiente:

1. Instalaste la [integración de AWS X-Ray][18] para rastrear tus funciones de Lambda, para lo cual habilitaste el rastreo activo de AWS X-Ray e instalaste las bibliotecas de clientes de X-Ray.
2. Instalaste la [Biblioteca de Lambda de Datadog para tu tiempo de ejecución de Lambda][5] y definiste la variable de entorno `DD_TRACE_ENABLED` como `false`.
3. [Datadog APM][20] está configurado en tu infraestructura basada en hosts y contenedores.

Entonces, para que las trazas de X-Ray y Datadog APM aparezcan en el mismo gráfico de llamas, todos los servicios deben tener la misma etiqueta `env`.

**Nota**: El rastreo distribuido es compatible con cualquier tiempo de ejecución de las aplicaciones basadas en hosts o contenedores. No es necesario que los hosts y las funciones de Lambda estén en el mismo tiempo de ejecución.

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="traza de una solicitud de un host a una función de Lambda" >}}

## Propagación de trazas
{{< img src="serverless/lambda-non-http-trace.png" alt="Traza serverless distribuida no HTTP" style="width:100%;" >}}

### Configuración necesaria

A veces es necesario aplicar instrumentación adicional para ver una traza única y conectada en aplicaciones serverless de Node y Python que activan funciones de Lambda de forma asíncrona. Si recién estás empezando con la monitorización de aplicaciones serverless en Datadog, [sigue nuestros pasos de instalación principales][21] y [lee esta página sobre cómo elegir una biblioteca de rastreo][22]. Una vez que ya estés enviando trazas desde tus funciones de Lambda a Datadog mediante la [Biblioteca de Lambda de Datadog][23], quizás quieras seguir estos pasos para conectar trazas entre dos funciones de Lambda en casos como los siguientes:
- Activación de funciones de Lambda a través de Step Functions
- Invocación de funciones de Lambda a través de protocolos no HTTP como MQTT

El rastreo de muchos de los servicios administrados de AWS (enumerados [aquí][24]) ya está listo para usar y no requiere seguir los pasos descritos en esta página.

Para conectar correctamente el contexto de rastreo entre los recursos que envían trazas, debes hacer lo siguiente:
- Incluye el contexto de rastreo de Datadog en los eventos salientes. El evento saliente puede originarse en un host o en función de Lambda con `dd-trace` instalado.
- Extrae el contexto de rastreo en la función de Lambda del consumidor.

### Traspaso del contexto de rastreo

Los siguientes ejemplos de código describen cómo pasar el contexto de rastreo en las cargas útiles salientes a servicios que no admiten encabezados HTTP o a servicios administrados que Datadog no admite [de forma nativa][24] en Node y Python:

{{< tabs >}}
{{% tab "Python" %}}

En Python, puedes utilizar la función auxiliar `get_dd_trace_context` para pasar el contexto de rastreo a los eventos salientes en una función de Lambda:

```py
import json
import boto3
import os

from datadog_lambda.tracing import get_dd_trace_context  # Función auxiliar de rastreo de Datadog

def handler(event, context):
    my_custom_client.sendRequest(
        {
          'myCustom': 'data',
          '_datadog': {
              'DataType': 'String',
              'StringValue': json.dumps(get_dd_trace_context()) # Incluye el contexto de rastreo en la carga útil saliente.
          },
        },
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

En Node, puedes utilizar la función auxiliar `getTraceHeaders` para pasar el contexto de rastreo a los eventos salientes en una función de Lambda:

```js
const { getTraceHeaders } = require("datadog-lambda-js"); // Función auxiliar de rastreo de Datadog

module.exports.handler = async event => {
  const _datadog = getTraceHeaders(); // Captura el contexto de rastreo de Datadog actual.

  var payload = JSON.stringify({ data: 'sns', _datadog });
  await myCustomClient.sendRequest(payload)
```

{{% /tab %}}
{{< /tabs >}}

#### Desde hosts

Si no pasas el contexto de rastreo desde tus funciones de Lambda, puedes utilizar la siguiente plantilla de código en lugar de las funciones auxiliares `getTraceHeaders` y `get_dd_trace_context` para obtener el contexto del tramo actual. Las instrucciones sobre cómo hacer esto según cada tiempo de ejecución se describen [aquí][25].

```js
const tracer = require("dd-trace");

exports.handler = async event => {
  const span = tracer.scope().active();
  const _datadog = {}
  tracer.inject(span, 'text_map', _datadog)

  // ...
```

### Extracción del contexto de rastreo

Para extraer el contexto de rastreo anterior de la función de Lambda del consumidor, debes definir una función de extracción que capture el contexto de rastreo antes de la ejecución del controlador de tu función de Lambda. Para ello, configura la variable de entorno `DD_TRACE_EXTRACTOR` de modo que apunte a la localización de la función de extracción. El formato es `<NOMBRE DE ARCHIVO>.<NOMBRE DE FUNCIÓN>`. Por ejemplo, `extractors.json` si el extractor `json` se encuentra en el archivo `extractors.js`. Datadog te recomienda colocar todos los métodos de extracción en un archivo, ya que los extractores pueden reutilizarse en múltiples funciones de Lambda. Estos extractores son completamente personalizables para adaptarse a cualquier caso de uso.

**Notas**:
- Si usas TypeScript o un bundler como webpack, debes aplicar `import` o `require` en el módulo Node.js donde se definen los extractores. Esto garantiza que el módulo se compile y se incluya en el paquete de despliegue de Lambda.
- Si tu función de Lambda de Node.js se ejecuta en `arm64`, debes [definir el extractor en el código de tu función][26] en lugar de utilizar la variable de entorno `DD_TRACE_EXTRACTOR`.

#### Extractores de ejemplo

Los siguientes ejemplos de código describen extractores de ejemplo que puedes utilizar para propagar el contexto de rastreo a través de un sistema de terceros o una API que no admita encabezados HTTP estándar.

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

    // Se usa SQS como activador con batchSize=1, por lo que es importante que verifiquemos
  // esto como un solo mensaje SQS que iniciará la ejecución del controlador.
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

## Envío de trazas a Datadog con la integración de X-Ray

Si ya rastreas tu aplicación serverless con X-Ray y quieres seguir utilizándolo, puedes [instalar la integración de AWS X-Ray][2] para enviar trazas de X-Ray a Datadog.

## Referencias adicionales

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