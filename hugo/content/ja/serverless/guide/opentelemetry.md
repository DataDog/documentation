---
further_reading:
- link: /opentelemetry/
  tag: ドキュメント
  text: Datadog の OpenTelemetry
- link: https://www.datadoghq.com/architecture/enhancing-observability-in-aws-lambda-with-otel/
  tag: Architecture Center
  text: DatadogとOpenTelemetryを使用したAWS Lambdaにおけるアプリケーションの可観測性の向上
title: ServerlessとOpenTelemetry
---
[OpenTelemetry][1] は、テレメトリーデータの収集とルーティングのための標準化されたプロトコルとツールを IT チームに提供するオープンソースの可観測性フレームワークです。

[OpenTelemetry API][2]を使用してコードをカスタムインスツルメンテーションしている場合、またはベンダーに依存しないカスタムインスツルメンテーションコードを作成したい場合は、Datadog形式のスパンとトレースを生成するように設定できます。その後、使用している言語用のDatadog SDKでこれらのスパンとトレースを処理し、データをDatadogに送信できます。

### AWS Lambda {#aws-lambda}

[AWS Lambda と OpenTelemetry][4] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://opentelemetry.io/docs/reference/specification/trace/api
[3]: /ja/tracing/trace_collection/otel_instrumentation/
[4]: /ja/serverless/aws_lambda/opentelemetry