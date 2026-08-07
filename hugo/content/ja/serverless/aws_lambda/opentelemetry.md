---
further_reading:
- link: /opentelemetry/
  tag: ドキュメント
  text: Datadog の OpenTelemetry
title: AWS Lambda と OpenTelemetry
---

[OpenTelemetry][1] は、テレメトリーデータの収集とルーティングのための標準化されたプロトコルとツールを IT チームに提供するオープンソースの可観測性フレームワークです。

このページでは、Datadog Serverless Monitoring for AWS Lambda での OpenTelemetry の使用について説明します。非サーバーレス環境での OpenTelemetry の使用方法など、詳細については [Datadog における OpenTelemetry][2] を参照してください。

## OpenTelemetry による AWS Lambda のインスツルメンテーション

AWS の Lambda 関数を OpenTelemetry でインスツルメンテーションし、Datadog にデータを送信する方法は複数あります。

- [Datadog トレーサーでの OpenTelemetry API サポート](#opentelemetry-api-support-within-datadog-tracer) (推奨)
- [任意の OpenTelemetry SDK から Datadog Lambda 拡張機能を通して OpenTelemetry トレースを送信する](#sdk) (プレビュー)

### Datadog トレーサー内での OpenTelemetry API サポート

Datadog Lambda 拡張機能のインストール時に含まれる Datadog トレーシングライブラリは、OpenTelemetry でインスツルメンテーションされたコードで作成されたカスタムスパンとトレースを受け入れ、テレメトリーを処理し、Datadog に送信します。

例えば、すでに OpenTelemetry API でインスツルメンテーションされたコードが主な目的であれば、このアプローチを使用することができます。これは、Datadog のネイティブな実装、タグ付け、機能を利用しながら、すべてのサービスのインスツルメンテーションをベンダーニュートラルに維持できることを意味します。

AWS Lambda を OpenTelemetry API でインスツルメンテーションするには、Lambda 関数内で環境変数 `DD_TRACE_OTEL_ENABLED` を `true` に設定し、ランタイム固有の手順については [OpenTelemetry API によるカスタムインスツルメンテーション][3]を参照してください。


### 任意の OpenTelemetry SDK から、Datadog Lambda 拡張機能を通して OpenTelemetry トレースを送信する {#sdk}

このアプローチは、[Datadog Agent の OLTP 取り込み][4]に似ています。例えば Rust や PHP などのランタイムでトレースサポートが利用できない場合に推奨します。

**注**: 拡張機能内の OTLP エンドポイントからカスタムメトリクスを送信することはサポートされていません。

1. Datadog の Lambda 拡張機能にスパンをエクスポートするように OpenTelemetry に指示します。そして、AWS Lambda 用の OpenTelemetry のインスツルメンテーションを追加します。

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

1. 1. `serverless.yml` を修正して、ランタイムでインスツルメンテーションを適用し、Datadog 拡張機能 v53 以降を追加し、環境変数 `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` を `localhost:4318` (HTTP 用) または `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` を `localhost:4317` (gRPC 用) に設定して、Datadog 拡張機能で OpenTelemetry を有効にします。Datadog トレーシングレイヤーを**追加しない**でください。

   {{< tabs >}}
   {{% tab "Python" %}}
   ```yaml
   service: <YOUR_SERVICE_NAME>

   provider:
     name: aws
     region: <YOUR_REGION>
     runtime: python3.8  # または使用している Python のバージョン
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

それに従って Python のコードを更新してください。例えば、`handler.py` では以下のようになります。

   ```py
   import os

   def handler(event, context):
       if os.environ.get('INSTRUMENTATION_FLAG') == 'true':
           # インスツルメンテーションロジックをここに記述
           print("Instrumentation is enabled")

       # 通常のハンドラーロジックをここに記述
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
     runtime: nodejs18.x # または使用している Node.js のバージョン
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

1. デプロイします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: /ja/opentelemetry
[3]: /ja/tracing/trace_collection/otel_instrumentation/
[4]: /ja/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host