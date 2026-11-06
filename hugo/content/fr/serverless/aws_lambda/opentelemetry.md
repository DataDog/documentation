---
further_reading:
- link: /opentelemetry/
  tag: Documentation
  text: OpenTelemetry dans Datadog
- link: https://www.datadoghq.com/architecture/enhancing-observability-in-aws-lambda-with-otel/
  tag: Architecture Center
  text: Amélioration de l'observabilité des applications dans AWS Lambda avec Datadog
    et OpenTelemetry
title: AWS Lambda et OpenTelemetry
---
[OpenTelemetry][1] est un framework d'observabilité open source qui fournit aux équipes informatiques des protocoles et des outils normalisés pour recueillir et acheminer des données de télémétrie.

Cette page traite de l'utilisation d'OpenTelemetry avec Datadog Serverless Monitoring pour AWS Lambda. Pour plus d'informations, notamment sur la façon d'utiliser OpenTelemetry dans des environnements non serverless, consultez [OpenTelemetry dans Datadog][2] .

## Instrumenter AWS Lambda avec OpenTelemetry {#instrument-aws-lambda-with-opentelemetry}

Il existe plusieurs façons d'instrumenter les fonctions AWS Lambda avec OpenTelemetry et d'envoyer les données à Datadog :

- [Prise en charge de l'API OpenTelemetry dans les SDK Datadog](#opentelemetry-api-support-within-datadog-sdks) (recommandé)
- [Envoyer des traces OpenTelemetry depuis n'importe quel SDK OpenTelemetry via la Datadog Lambda Extension](#sdk) (Aperçu)

### Prise en charge de l'API OpenTelemetry dans les SDK Datadog {#opentelemetry-api-support-within-datadog-sdks}

Le SDK Datadog, qui est inclus dans la Datadog Lambda Extension lors de l'installation, accepte les spans et les traces personnalisés créés avec du code instrumenté par OpenTelemetry, traite la télémétrie et l'envoie à Datadog.

Vous pouvez utiliser cette approche si, par exemple, le code a déjà été instrumenté avec l'API OpenTelemetry. Cela signifie que vous pouvez conserver une instrumentation indépendante du fournisseur pour tous vos services, tout en profitant de l'implémentation, du tagging et des fonctionnalités natifs de Datadog. 

Pour instrumenter AWS Lambda avec l'API OpenTelemetry, définissez la variable d'environnement `DD_TRACE_OTEL_ENABLED` sur `true` dans votre fonction Lambda, et consultez [Instrumentation personnalisée avec l'API OpenTelemetry][3] pour obtenir des instructions spécifiques au runtime.


### Envoyer des traces OpenTelemetry depuis n'importe quel SDK OpenTelemetry via la Datadog Lambda Extension {#sdk}

Cette approche est analogue à [OLTP Ingest in the Datadog Agent][4]. Elle est recommandée dans les situations où la prise en charge du traçage peut ne pas être disponible pour votre runtime (par exemple, Rust ou PHP). 

**Remarque** : L'envoi de métriques personnalisées depuis l'endpoint OTLP dans l'extension n'est pas pris en charge.

1. Indiquez à OpenTelemetry d'exporter les spans vers la Datadog Lambda Extension. Ensuite, ajoutez l'instrumentation OpenTelemetry pour AWS Lambda.

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

1. Modifiez `serverless.yml` pour appliquer l'instrumentation au moment de l'exécution, ajoutez l'extension Datadog v53+ et activez OpenTelemetry dans l'extension Datadog avec la variable d'environnement `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` définie sur `localhost:4318` (pour HTTP) ou `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` définie sur `localhost:4317` (pour gRPC). N'ajoutez pas **la couche de traçage Datadog**.

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

   Ensuite, mettez à jour votre code Python en conséquence. Par exemple, dans `handler.py` :

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

1. Déployez.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: /fr/opentelemetry
[3]: /fr/tracing/trace_collection/otel_instrumentation/
[4]: /fr/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host