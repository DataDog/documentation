---
further_reading:
- link: /opentelemetry/
  tag: ドキュメント
  text: Datadog の OpenTelemetry
title: サーバーレスと OpenTelemetry
---

[OpenTelemetry][1] はオープンソースの観測可能性フレームワークで、テレメトリーデータの収集とルーティングのための標準化されたプロトコルとツールを IT チームに提供します。

コードが [OpenTelemetry API][2] でカスタムインスツルメントされている場合や、ベンダーに依存しないカスタムインスツルメンテーションコードを記述したい場合は、Datadog スタイルのスパンとトレースを生成するように構成することができます。そして、これらのスパンやトレースをお使いの言語の Datadog トレーシング ライブラリで処理し、データを Datadog に送信することができます。

### AWS Lambda

[AWS Lambda と OpenTelemetry][4] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://opentelemetry.io/docs/reference/specification/trace/api
[3]: /ja/tracing/trace_collection/otel_instrumentation/
[4]: /ja/serverless/aws_lambda/opentelemetry