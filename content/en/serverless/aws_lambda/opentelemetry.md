---
title: AWS Lambda and OpenTelemetry
kind: documentation
further_reading:
  - link: '/opentelemetry/'
    tag: 'Documentation'
    text: 'OpenTelemetry in Datadog'
---

[OpenTelemetry][1] is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data.

This page discusses using OpenTelemetry with Datadog Serverless Monitoring for AWS Lambda. For more information, including how to use OpenTelemetry in non-serverless environments, see [OpenTelemetry in Datadog][2].

## Instrument AWS Lambda with OpenTelemetry

There are multiple ways to instrument AWS Lambda functions with OpenTelemetry and send the data to Datadog:

- [OpenTelemetry API support in the Datadog tracers](#opentelemetry-api-support-within-datadog-tracers) (recommended)
- [Send OpenTelemetry traces from any OpenTelemetry SDK through the Datadog Lambda Extension](#sdk) (beta)

### OpenTelemetry API support within Datadog tracers

The Datadog tracing library, which is included in the Datadog Lambda Extension upon installation, accepts custom spans and traces created with OpenTelemetry-instrumented code, processes the telemetry, and sends it to Datadog.

You can use this approach if, for example, your main goal is to code has already been instrumented with the OpenTelemetry API. This means you can maintain vendor-neutral instrumentation of all your services, while still taking advantage of Datadog’s native implementation, tagging, and features. 

To instrument AWS Lambda with the OpenTelemetry API, set the environment variable `DD_TRACE_OTEL_ENABLED` to `true` in your Lambda function, and see [Custom instrumentation with the OpenTelemetry API][3] for runtime-specific instructions.


### Send OpenTelemetry traces from any OpenTelemetry SDK through the Datadog Lambda Extension {#sdk}

<div class="alert alert-warning">This feature is in beta.</div>

This approach is analogous to [OLTP Ingest in the Datadog Agent][4]. It is recommended in situations where tracing support may not be available for your runtime (for example, Rust or PHP). 

1. Tell OpenTelemetry to export spans to the Datadog Lambda Extension. Then, add OpenTelemetry's instrumentation for AWS Lambda.

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

1. Modify `serverless.yml` to apply instrumentation at runtime, add the Datadog Extension v53+, and enable OpenTelemetry in the Datadog Extension with the environment variable `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` set to `localhost:4318` (for HTTP) or `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` set to `localhost:4317` (for gRPC). Do **not** add the Datadog tracing layer.

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

   Then, update your Python code accordingly. For example, in `handler.py`:

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

1. Deploy.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: /opentelemetry
[3]: /tracing/trace_collection/otel_instrumentation/
[4]: /opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host