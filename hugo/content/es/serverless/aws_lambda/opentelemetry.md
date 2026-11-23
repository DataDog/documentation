---
further_reading:
- link: /opentelemetry/
  tag: Documentación
  text: OpenTelemetry en Datadog
- link: https://www.datadoghq.com/architecture/enhancing-observability-in-aws-lambda-with-otel/
  tag: Centro de arquitectura
  text: Mejorando la observabilidad de las aplicaciones en AWS Lambda con Datadog
    y OpenTelemetry
title: AWS Lambda y OpenTelemetry
---
[OpenTelemetry][1] es un framework de observabilidad de código abierto que proporciona a los equipos de TI protocolos y herramientas estandarizados para recopilar y enrutar datos de telemetría.

Esta página trata sobre el uso de OpenTelemetry con Datadog Serverless Monitoring para AWS Lambda. Para obtener más información, incluido cómo usar OpenTelemetry en entornos que no son serverless, consulte [OpenTelemetry en Datadog][2].

## Instrumente AWS Lambda con OpenTelemetry {#instrument-aws-lambda-with-opentelemetry}

Existen varias formas de instrumentar funciones de AWS Lambda con OpenTelemetry y enviar los datos a Datadog:

- [Compatibilidad con la API de OpenTelemetry en los SDK de Datadog](#opentelemetry-api-support-within-datadog-sdks) (recomendado)
- [Enviar trazas de OpenTelemetry desde cualquier SDK de OpenTelemetry a través de Datadog Lambda Extension](#sdk) (versión preliminar)

### Uso de la compatibilidad con la API de OpenTelemetry en los SDK de Datadog {#opentelemetry-api-support-within-datadog-sdks}

El SDK de Datadog, que se incluye en Datadog Lambda Extension durante la instalación, acepta spans y trazas personalizados creados con código instrumentado con OpenTelemetry, procesa la telemetría y los envía a Datadog.

Puede utilizar este enfoque si, por ejemplo, su objetivo principal es que el código ya haya sido instrumentado con la API de OpenTelemetry. Esto significa que puede mantener una instrumentación neutral respecto al proveedor en todos sus servicios, mientras sigue aprovechando la implementación, el etiquetado y las funciones nativas de Datadog. 

Para instrumentar AWS Lambda con la API de OpenTelemetry, establezca la variable de entorno `DD_TRACE_OTEL_ENABLED` en `true` en su función Lambda y consulte [Instrumentación personalizada con la API de OpenTelemetry][3] para obtener instrucciones específicas del tiempo de ejecución.


### Enviar trazas de OpenTelemetry desde cualquier SDK de OpenTelemetry a través de Datadog Lambda Extension {#sdk}

Este enfoque es análogo a [Ingesta de OTLP en Datadog Agent][4]. Se recomienda en situaciones en las que la compatibilidad con el rastreo puede no estar disponible para su tiempo de ejecución (por ejemplo, Rust o PHP). 

**Nota**: No se admite el envío de métricas personalizadas desde el punto de conexión OTLP en la extensión.

1. Indique a OpenTelemetry que exporte los spans a Datadog Lambda Extension. Luego, agregue la instrumentación de OpenTelemetry para AWS Lambda.

   {{< tabs >}}
   {{% tab "Python" %}}
   ```py
   from opentelemetry.instrumentation.botocore import BotocoreInstrumentor
   from opentelemetry.instrumentation.aws_lambda import AwsLambdaInstrumentor
   from opentelemetry import trace
   from opentelemetry.sdk.trace import TracerProvider
   from opentelemetry.exporter.otlp.trace_exporter import OTLPExporter
   from opentelemetry.sdk.trace.export import SimpleSpanProcessor
   from opentelemetry.resource import Resource
   from opentelemetry.semconv.resource import (
       SERVICE_NAME,
       SemanticResourceAttributes,
   )

   # Create a TracerProvider
   tracer_provider = TracerProvider(resource=Resource.create({SERVICE_NAME: <YOUR_SERVICE_NAME>}))

   # Add a span processor with an OTLP exporter
   tracer_provider.add_span_processor(
       SimpleSpanProcessor(
           OTLPExporter(endpoint="http://localhost:4318/v1/traces")
       )
   )

   # Register the provider
   trace.set_tracer_provider(tracer_provider)

   # Instrument AWS SDK and AWS Lambda
   BotocoreInstrumentor().instrument(tracer_provider=tracer_provider)
   AwsLambdaInstrumentor().instrument(tracer_provider=tracer_provider)
   ```
   {{% /tab %}}
   {{% tab "Node.js" %}}
   ```js
   // instrument.js

   const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
   const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
   const { Resource } = require('@opentelemetry/resources');
   const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
   const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
   const provider = new NodeTracerProvider({
       resource: new Resource({
           [ SemanticResourceAttributes.SERVICE_NAME ]: 'rey-app-otlp-dev-node',
       })
   });
   provider.addSpanProcessor(
       new SimpleSpanProcessor(
           new OTLPTraceExporter(
               { url: 'http://localhost:4318/v1/traces' },
           ),
       ),
   );
   provider.register();

   const { AwsInstrumentation } = require('@opentelemetry/instrumentation-aws-sdk');
   const { AwsLambdaInstrumentation } = require('@opentelemetry/instrumentation-aws-lambda');
   const { registerInstrumentations } = require('@opentelemetry/instrumentation');

   registerInstrumentations({
       instrumentations: [
           new AwsInstrumentation({
               suppressInternalInstrumentation: true,
           }),
           new AwsLambdaInstrumentation({
               disableAwsContextPropagation: true,
           }),
       ],
   });

   ```
   {{% /tab %}}
   {{< /tabs >}}

1. Modifique `serverless.yml` para aplicar la instrumentación en tiempo de ejecución, agregue Datadog Lambda Extension v53+ y habilite OpenTelemetry en Datadog Lambda Extension con la variable de entorno `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` establecida en `localhost:4318` (para HTTP) o `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` establecida en `localhost:4317` (para gRPC). No **agregue** la capa de rastreo de Datadog.

   {{< tabs >}}
   {{% tab "Python" %}}
   ```yaml
   service: <YOUR_SERVICE_NAME>

   provider:
     name: aws
     region: <YOUR_REGION>
     runtime: python3.8  # or the Python version you are using
     environment:
       DD_API_KEY: ${env:DD_API_KEY}
       DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT: localhost:4318
     layers:
       - arn:aws:lambda:sa-east-1:464622532012:layer:Datadog-Extension:53

   functions:
     python:
       handler: handler.handler
       environment:
         INSTRUMENTATION_FLAG: true
   ```

   Luego, actualice su código de Python según corresponda. Por ejemplo, en `handler.py`:

   ```py
   import os

   def handler(event, context):
       if os.environ.get('INSTRUMENTATION_FLAG') == 'true':
           # Perform instrumentation logic here
           print("Instrumentation is enabled")
       
       # Your normal handler logic here
       print("Handling the event")
   ```
   {{% /tab %}}
   {{% tab "Node.js" %}}
   ```yaml
   # serverless.yml

   service: <YOUR_SERVICE_NAME>

   provider:
     name: aws
     region: <YOUR_REGION>
     runtime: nodejs18.x # or the Node.js version you are using
     environment:
       DD_API_KEY: ${env:DD_API_KEY}
       DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT: localhost:4318
     layers:
       - arn:aws:lambda:sa-east-1:464622532012:layer:Datadog-Extension:53

   functions:
     node:
       handler: handler.handler
       environment:
         NODE_OPTIONS: --require instrument
   ```
   {{% /tab %}}
   {{< /tabs >}}

1. Implemente.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: /es/opentelemetry
[3]: /es/tracing/trace_collection/otel_instrumentation/
[4]: /es/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host