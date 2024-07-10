---
further_reading:
- link: /opentelemetry/
  tag: Documentación
  text: OpenTelemetry en Datadog
kind: documentación
title: AWS Lambda y OpenTelemetry
---

[OpenTelemetry][1] es un marco de observabilidad de código abierto que proporciona a los equipos de TI protocolos y herramientas estandarizados para recopilar y enrutar datos de telemetría.

Esta página trata sobre el uso de OpenTelemetry con Datadog Serverless Monitoring para AWS Lambda. Para obtener más información, incluido cómo utilizar OpenTelemetry en entornos que no son serverless, consulta [OpenTelemetry en Datadog][2].

## Instrumentar AWS Lambda con OpenTelemetry

Existen varias formas de instrumentar las funciones de AWS Lambda con OpenTelemetry y enviar los datos a Datadog:

- [Compatibilidad de la API de OpenTelemetry en los rastreadores de Datadog](#opentelemetry-api-support-within-datadog-tracers) (recomendado)
- [Enviar trazas de OpenTelemetry desde cualquier SDK de OpenTelemetry a través de la extensión Datadog Lambda](#sdk) (beta)

### Compatibilidad de la API de OpenTelemetry en los rastreadores de Datadog

La biblioteca de rastreo de Datadog, que se incluye en la extensión Lambda Datadog tras su instalación, acepta tramos (spans) y trazas (traces) personalizados creados con código instrumentado con OpenTelemetry, procesa la telemetría y la envía a Datadog.

Puedes utilizar este enfoque si, por ejemplo, tu objetivo principal es el código que ya se ha instrumentado con la API de OpenTelemetry. Esto significa que puedes mantener una instrumentación independiente del proveedor para todos tus servicios, sin dejar de aprovechar la implementación, el etiquetado y las características nativos de Datadog. 

Para instrumentar AWS Lambda con la API de OpenTelemetry, define la variable de entorno `DD_TRACE_OTEL_ENABLED` como `true` en tu función de Lambda. Consulta [Instrumentación personalizada con la API de OpenTelemetry][3] para obtener instrucciones específicas del tiempo de ejecución.


### Enviar trazas de OpenTelemetry desde cualquier SDK de OpenTelemetry a través de la extensión Datadog Lambda {#sdk}

<div class="alert alert-warning">Esta característica está en fase beta.</div>

Este enfoque es análogo a la [Ingesta de OLTP en el Datadog Agent][4]. Se recomienda en situaciones en las que la compatibilidad del rastreo puede no estar disponible para un tiempo de ejecución (por ejemplo, Rust o PHP). 

1. Pídele a OpenTelemetry que exporte tramos a la extensión Datadog Lambda. Luego, añade la instrumentación de OpenTelemetry para AWS Lambda.

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

1. Modifica el archivo `serverless.yml` para aplicar la instrumentación en el tiempo de ejecución, añade la versión 53 de la extensión de Datadog o una superior y habilita OpenTelemetry en la extensión de Datadog con la variable de entorno `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` definida como `localhost:4318` (para HTTP) o `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` definida como `localhost:4317` (para gRPC). **No** añadas la capa de rastreo de Datadog.

   {{< tabs >}}
   {{% tab "Python" %}}
   ```yaml
   service: <YOUR_SERVICE_NAME>

   provider:
     name: aws
     region: <YOUR_REGION>
     runtime: python3.8  # o la versión de Python que utilizas
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

   A continuación, actualiza tu código Python según corresponda. Por ejemplo, en `handler.py`:

   ```py
   import os

   def handler(event, context):
       if os.environ.get('INSTRUMENTATION_FLAG') == 'true':
           # Ejecuta aquí la lógica de la instrumentación
           print("Instrumentation is enabled")

       # Ejecuta la lógica normal del controlador aquí
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
     runtime: nodejs18.x # o la versión de Node.js que utilizas
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

1. Despliega.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: /es/opentelemetry
[3]: /es/tracing/trace_collection/otel_instrumentation/
[4]: /es/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host